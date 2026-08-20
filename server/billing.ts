import { and, desc, eq } from "drizzle-orm";
import { getDb } from "./db";
import { invoiceSettings, invoices, receiptSettings, receipts } from "../drizzle/schema";

type ReceiptProduct = {
  itemName: string;
  description?: string;
  quantity: number;
  unitPrice: number;
};

function parseReceiptProducts(value: unknown): ReceiptProduct[] {
  if (typeof value !== "string") return [];
  try {
    const parsed = JSON.parse(value);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      item =>
        item &&
        typeof item.itemName === "string" &&
        item.itemName.trim() &&
        Number.isFinite(Number(item.quantity)) &&
        Number(item.quantity) > 0 &&
        Number.isFinite(Number(item.unitPrice)) &&
        Number(item.unitPrice) >= 0
    ).map(item => ({
      itemName: item.itemName.trim(),
      description: typeof item.description === "string" ? item.description.trim() : undefined,
      quantity: Number(item.quantity),
      unitPrice: Number(item.unitPrice),
    }));
  } catch {
    return [];
  }
}

export const DEFAULT_INVOICE_SETTINGS = {
  companyGst: "Expertaid Technologies Pvt. Ltd.",
  companyAddress: "",
  invoicePrefix: "INV",
  invoiceNumberStart: 1,
  invoiceNumberNext: 1,
  gstRate: "18.00",
  gstMode: "exclusive" as const,
  defaultDueDays: 15,
  terms: "Payment is due within the agreed due date. Thank you for your business.",
  accountCompanyName: "Expertaid Technologies Pvt Ltd.",
  accountNumber: "",
  accountIfsc: "",
  accountBranch: "",
  logoUrl: null,
  logoKey: null,
  scannerUrl: null,
  scannerKey: null,
  signatureUrl: null,
  signatureKey: null,
};

export const DEFAULT_RECEIPT_SETTINGS = {
  companyGst: "Expertaid Technologies Pvt. Ltd.",
  companyAddress: "",
  receiptPrefix: "RCT",
  receiptNumberStart: 1,
  receiptNumberNext: 1,
  terms: "This receipt is issued against the payment described above.",
  accountCompanyName: "Expertaid Technologies Pvt Ltd.",
  accountNumber: "",
  accountIfsc: "",
  accountBranch: "",
  logoUrl: null,
  logoKey: null,
  signatureUrl: null,
  signatureKey: null,
  footerCompanyName: "FOR EXPERTAID TECHNOLOGIES PVT LTD.",
  footerMessage: "Thank you for your business!",
  qrLabel: "SCAN & PAY",
  defaultProducts: [] as ReceiptProduct[],
};

async function requireDb() {
  const db = await getDb();
  if (!db) throw new Error("Database is not available");
  return db;
}

export async function getInvoiceSettingsForOwner(ownerId: number) {
  const db = await getDb();
  if (!db) return { ownerId, ...DEFAULT_INVOICE_SETTINGS };
  const rows = await db.select().from(invoiceSettings).where(eq(invoiceSettings.ownerId, ownerId)).limit(1);
  return rows[0] ?? { ownerId, ...DEFAULT_INVOICE_SETTINGS };
}

export async function updateInvoiceSettingsForOwner(ownerId: number, values: Record<string, unknown>) {
  const db = await requireDb();
  const existing = await db.select({ id: invoiceSettings.id }).from(invoiceSettings).where(eq(invoiceSettings.ownerId, ownerId)).limit(1);
  const payload = { ...DEFAULT_INVOICE_SETTINGS, ...values, ownerId } as any;
  if (existing[0]) await db.update(invoiceSettings).set(payload).where(eq(invoiceSettings.ownerId, ownerId));
  else await db.insert(invoiceSettings).values(payload);
  return getInvoiceSettingsForOwner(ownerId);
}

export async function listInvoicesForOwner(ownerId: number) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(invoices).where(eq(invoices.ownerId, ownerId)).orderBy(desc(invoices.createdAt));
}

async function nextAvailableNumber(db: any, table: any, ownerId: number, prefix: string, startingNumber: unknown, field: any) {
  let counter = Math.max(1, Number(startingNumber) || 1);
  for (let attempt = 0; attempt < 10000; attempt += 1) {
    const number = `${prefix}-${String(counter).padStart(4, "0")}`;
    const existing = await db.select({ id: table.id }).from(table).where(and(eq(table.ownerId, ownerId), eq(field, number))).limit(1);
    if (!existing[0]) return { number, nextCounter: counter + 1 };
    counter += 1;
  }
  throw new Error(`Unable to allocate a unique ${prefix} document number.`);
}

export async function createInvoiceForOwner(ownerId: number, input: Record<string, unknown>) {
  const db = await requireDb();
  const settings = await getInvoiceSettingsForOwner(ownerId);
  const allocated = await nextAvailableNumber(db, invoices, ownerId, String(settings.invoicePrefix), settings.invoiceNumberNext, invoices.invoiceNumber);
  const number = String(input.invoiceNumber || allocated.number);
  const { invoiceNumber: _ignored, items: _items, ...values } = input;
  await db.insert(invoices).values({ ...values, ownerId, invoiceNumber: number } as any);
  await db.update(invoiceSettings).set({ invoiceNumberNext: allocated.nextCounter }).where(eq(invoiceSettings.ownerId, ownerId));
  const rows = await db.select().from(invoices).where(and(eq(invoices.ownerId, ownerId), eq(invoices.invoiceNumber, number))).limit(1);
  return rows[0];
}

export async function updateInvoiceForOwner(ownerId: number, id: number, input: Record<string, unknown>) {
  const db = await requireDb();
  const { invoiceNumber: _invoiceNumber, id: _id, items: _items, ...values } = input;
  await db.update(invoices).set(values as any).where(and(eq(invoices.ownerId, ownerId), eq(invoices.id, id)));
  const rows = await db.select().from(invoices).where(and(eq(invoices.ownerId, ownerId), eq(invoices.id, id))).limit(1);
  return rows[0];
}

export async function updateInvoiceStatusForOwner(ownerId: number, id: number, status: "Draft" | "Due" | "Paid" | "Cancelled") {
  const db = await requireDb();
  const invoiceRows = await db.select().from(invoices).where(and(eq(invoices.ownerId, ownerId), eq(invoices.id, id))).limit(1);
  const invoice = invoiceRows[0];
  if (!invoice) throw new Error("Invoice not found");
  await db.update(invoices).set({ status }).where(and(eq(invoices.ownerId, ownerId), eq(invoices.id, id)));
  let receipt;
  if (status === "Paid") {
    const existingReceipt = await db.select().from(receipts).where(and(eq(receipts.ownerId, ownerId), eq(receipts.invoiceId, id))).limit(1);
    if (!existingReceipt[0]) {
      const settings = await getReceiptSettingsForOwner(ownerId);
      const allocated = await nextAvailableNumber(db, receipts, ownerId, String(settings.receiptPrefix), settings.receiptNumberNext, receipts.receiptNumber);
      const receiptNumber = allocated.number;
      await db.insert(receipts).values({
        ownerId,
        receiptNumber,
        status: "Issued",
        invoiceId: invoice.id,
        invoiceNumber: invoice.invoiceNumber,
        clientId: invoice.clientId,
        clientName: invoice.clientName,
        clientAddress: invoice.clientAddress,
        clientContact: invoice.clientContact,
        clientEmail: invoice.clientEmail,
        clientGst: invoice.clientGst,
        receiptDate: new Date().toISOString().slice(0, 10),
        paymentDate: new Date().toISOString().slice(0, 10),
        amount: invoice.grandTotal,
        itemsJson: invoice.itemsJson,
        subtotal: invoice.subtotal,
        gstRate: invoice.gstRate,
        gstMode: invoice.gstMode,
        gstAmount: invoice.gstAmount,
        grandTotal: invoice.grandTotal,
        paymentMode: "Bank Transfer",
        receivedFor: invoice.invoiceNumber,
        notes: invoice.notes,
        terms: invoice.terms || settings.terms,
        companyGst: invoice.companyGst || settings.companyGst,
        companyAddress: invoice.companyAddress || settings.companyAddress,
        accountCompanyName: invoice.accountCompanyName || settings.accountCompanyName,
        accountNumber: invoice.accountNumber || settings.accountNumber,
        accountIfsc: invoice.accountIfsc || settings.accountIfsc,
        accountBranch: invoice.accountBranch || settings.accountBranch,
        logoUrl: invoice.logoUrl || settings.logoUrl,
        logoKey: invoice.logoKey || settings.logoKey,
        signatureUrl: invoice.signatureUrl || settings.signatureUrl,
        signatureKey: invoice.signatureKey || settings.signatureKey,
        footerCompanyName: settings.footerCompanyName,
        footerMessage: settings.footerMessage,
        qrLabel: settings.qrLabel,
      } as any);
      await db.update(receiptSettings).set({ receiptNumberNext: allocated.nextCounter }).where(eq(receiptSettings.ownerId, ownerId));
    }
    const receiptRows = await db.select().from(receipts).where(and(eq(receipts.ownerId, ownerId), eq(receipts.invoiceId, id))).limit(1);
    receipt = receiptRows[0];
  }
  const rows = await db.select().from(invoices).where(and(eq(invoices.ownerId, ownerId), eq(invoices.id, id))).limit(1);
  return { invoice: rows[0], receipt };
}

export async function deleteInvoiceForOwner(ownerId: number, id: number) {
  const db = await requireDb();
  await db.delete(invoices).where(and(eq(invoices.ownerId, ownerId), eq(invoices.id, id)));
  return { success: true };
}

export async function getReceiptSettingsForOwner(ownerId: number) {
  const db = await getDb();
  if (!db) return { ownerId, ...DEFAULT_RECEIPT_SETTINGS };
  const rows = await db.select().from(receiptSettings).where(eq(receiptSettings.ownerId, ownerId)).limit(1);
  const row = rows[0];
  return row
    ? { ...row, defaultProducts: parseReceiptProducts(row.defaultProductsJson) }
    : { ownerId, ...DEFAULT_RECEIPT_SETTINGS };
}

export async function updateReceiptSettingsForOwner(ownerId: number, values: Record<string, unknown>) {
  const db = await requireDb();
  const existing = await db.select().from(receiptSettings).where(eq(receiptSettings.ownerId, ownerId)).limit(1);
  const { defaultProducts, ...settingsValues } = values;
  const defaultProductsJson = defaultProducts === undefined
    ? existing[0]?.defaultProductsJson ?? "[]"
    : JSON.stringify(Array.isArray(defaultProducts) ? defaultProducts : []);
  const { defaultProducts: _ignoredDefaultProducts, ...defaultSettings } = DEFAULT_RECEIPT_SETTINGS;
  const payload = { ...defaultSettings, ...settingsValues, defaultProductsJson, ownerId } as any;
  if (existing[0]) await db.update(receiptSettings).set(payload).where(eq(receiptSettings.ownerId, ownerId));
  else await db.insert(receiptSettings).values(payload);
  return getReceiptSettingsForOwner(ownerId);
}

export async function listReceiptsForOwner(ownerId: number) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(receipts).where(eq(receipts.ownerId, ownerId)).orderBy(desc(receipts.createdAt));
}

export async function createReceiptForOwner(ownerId: number, input: Record<string, unknown>) {
  const db = await requireDb();
  const settings = await getReceiptSettingsForOwner(ownerId);
  const allocated = await nextAvailableNumber(db, receipts, ownerId, String(settings.receiptPrefix), settings.receiptNumberNext, receipts.receiptNumber);
  const number = String(input.receiptNumber || allocated.number);
  const { receiptNumber: _ignored, items: _items, ...values } = input;
  await db.insert(receipts).values({ ...values, ownerId, receiptNumber: number } as any);
  await db.update(receiptSettings).set({ receiptNumberNext: allocated.nextCounter }).where(eq(receiptSettings.ownerId, ownerId));
  const rows = await db.select().from(receipts).where(and(eq(receipts.ownerId, ownerId), eq(receipts.receiptNumber, number))).limit(1);
  return rows[0];
}

export async function updateReceiptForOwner(ownerId: number, id: number, input: Record<string, unknown>) {
  const db = await requireDb();
  const { receiptNumber: _ignored, ownerId: _ownerIgnored, id: _idIgnored, items: _items, ...values } = input as any;
  await db.update(receipts).set(values).where(and(eq(receipts.ownerId, ownerId), eq(receipts.id, id)));
  const rows = await db.select().from(receipts).where(and(eq(receipts.ownerId, ownerId), eq(receipts.id, id))).limit(1);
  return rows[0];
}

export async function updateReceiptStatusForOwner(ownerId: number, id: number, status: "Issued" | "Cancelled") {
  const db = await requireDb();
  await db.update(receipts).set({ status }).where(and(eq(receipts.ownerId, ownerId), eq(receipts.id, id)));
  const rows = await db.select().from(receipts).where(and(eq(receipts.ownerId, ownerId), eq(receipts.id, id))).limit(1);
  return rows[0];
}

export async function deleteReceiptForOwner(ownerId: number, id: number) {
  const db = await requireDb();
  await db.delete(receipts).where(and(eq(receipts.ownerId, ownerId), eq(receipts.id, id)));
  return { success: true };
}
