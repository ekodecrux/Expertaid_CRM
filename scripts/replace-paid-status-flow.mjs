import fs from "node:fs";
const path = "server/billing.ts";
const source = fs.readFileSync(path, "utf8");
const start = source.indexOf("export async function updateInvoiceStatusForOwner");
const end = source.indexOf("export async function deleteInvoiceForOwner", start);
if (start < 0 || end < 0) throw new Error("Could not locate invoice status function boundaries");
const replacement = `export async function updateInvoiceStatusForOwner(ownerId: number, id: number, status: "Draft" | "Due" | "Paid" | "Cancelled") {
  const db = await requireDb();
  const invoiceRows = await db.select().from(invoices).where(and(eq(invoices.ownerId, ownerId), eq(invoices.id, id))).limit(1);
  const invoice = invoiceRows[0];
  if (!invoice) throw new Error("Invoice not found");
  await db.update(invoices).set({ status }).where(and(eq(invoices.ownerId, ownerId), eq(invoices.id, id)));
  const rows = await db.select().from(invoices).where(and(eq(invoices.ownerId, ownerId), eq(invoices.id, id))).limit(1);
  return { invoice: rows[0], receipt: undefined };
}
`;
fs.writeFileSync(path, source.slice(0, start) + replacement + source.slice(end));
