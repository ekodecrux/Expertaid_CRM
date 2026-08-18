import { and, desc, eq } from "drizzle-orm";
import { getDb } from "./db";
import { invoiceSettings, invoices, receiptSettings, receipts } from "../drizzle/schema";

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

export async function createInvoiceForOwner(ownerId: number, input: Record<string, unknown>) {
  const db = await requireDb();
  const settings = await getInvoiceSettingsForOwner(ownerId);
  const number = String(input.invoiceNumber || `${settings.invoicePrefix}-${String(settings.invoiceNumberNext).padStart(4, "0")}`);
  const { invoiceNumber: _ignored, items: _items, ...values } = input;
  await db.insert(invoices).values({ ...values, ownerId, invoiceNumber: number } as any);
  await db.update(invoiceSettings).set({ invoiceNumberNext: Number(settings.invoiceNumberNext) + 1 }).where(eq(invoiceSettings.ownerId, ownerId));
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

export async function updateInvoiceStatusForOwner(ownerId: number, id: number, status: "Draft" | "Sent" | "Paid" | "Cancelled") {
  const db = await requireDb();
  await db.update(invoices).set({ status }).where(and(eq(invoices.ownerId, ownerId), eq(invoices.id, id)));
  const rows = await db.select().from(invoices).where(and(eq(invoices.ownerId, ownerId), eq(invoices.id, id))).limit(1);
  return rows[0];
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
  return rows[0] ?? { ownerId, ...DEFAULT_RECEIPT_SETTINGS };
}

export async function updateReceiptSettingsForOwner(ownerId: number, values: Record<string, unknown>) {
  const db = await requireDb();
  const existing = await db.select({ id: receiptSettings.id }).from(receiptSettings).where(eq(receiptSettings.ownerId, ownerId)).limit(1);
  const payload = { ...DEFAULT_RECEIPT_SETTINGS, ...values, ownerId } as any;
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
  const number = String(input.receiptNumber || `${settings.receiptPrefix}-${String(settings.receiptNumberNext).padStart(4, "0")}`);
  const { receiptNumber: _ignored, ...values } = input;
  await db.insert(receipts).values({ ...values, ownerId, receiptNumber: number } as any);
  await db.update(receiptSettings).set({ receiptNumberNext: Number(settings.receiptNumberNext) + 1 }).where(eq(receiptSettings.ownerId, ownerId));
  const rows = await db.select().from(receipts).where(and(eq(receipts.ownerId, ownerId), eq(receipts.receiptNumber, number))).limit(1);
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
