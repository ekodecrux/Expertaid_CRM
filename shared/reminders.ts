import { filterOpenPaymentTerms } from "./paymentPlan";

export type ReminderUrgency = "Overdue" | "Due soon" | "Upcoming";
export type ReminderItem = { id: string; clientId: string; clientName: string; source: "Payment plan" | "Product" | "Invoice"; label: string; dueDate: string; amount: number; urgency: ReminderUrgency };

const sameClient = (client: any, row: any) => client.clientId && row.clientId ? String(client.clientId).toLowerCase() === String(row.clientId).toLowerCase() : String(client.clientName ?? "").trim().toLowerCase() === String(row.clientName ?? "").trim().toLowerCase();
const positive = (value: unknown) => Math.max(0, Number(value ?? 0) || 0);
export function reminderPayAmount(row: Pick<ReminderItem, "source" | "amount">) { return row.source === "Payment plan" ? Math.round(row.amount) : row.amount; }

function reminderUrgency(dueDate: string, now: Date): ReminderUrgency {
  const dueDay = new Date(dueDate);
  const todayTime = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
  const dueDayTime = new Date(dueDay.getFullYear(), dueDay.getMonth(), dueDay.getDate()).getTime();
  const windowEnd = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 15).getTime();
  if (dueDayTime < todayTime) return "Overdue";
  if (dueDayTime <= windowEnd) return "Due soon";
  return "Upcoming";
}

export function buildReminderItems({ clients, products, plans, invoices, receipts, now = new Date() }: { clients: any[]; products: any[]; plans: any[]; invoices: any[]; receipts: any[]; now?: Date }) {
  const rows: ReminderItem[] = [];
  clients.forEach((client) => {
    const clientId = String(client.clientId ?? client.id ?? "");
    const clientProducts = products.filter((product) => String(product.clientId) === clientId);
    const clientReceipts = receipts.filter((receipt) => sameClient(client, receipt) && receipt.status !== "Cancelled");
    const collected = clientReceipts.reduce((sum, receipt) => sum + positive(receipt.amount ?? receipt.grandTotal), 0);
    const allocatedByProduct = new Map<number, number>();
    const legacyProductPayments = new Map<string, number>();
    clientReceipts.forEach((receipt) => {
      try {
        const items = receipt.itemsJson ? JSON.parse(receipt.itemsJson) : [];
        const hasAllocation = Array.isArray(items) && items.some((item: any) => Number(item?.productId) > 0 && positive(item?.collectionAmount) > 0);
        if (Array.isArray(items)) items.forEach((item: any) => { const productId = Number(item?.productId); const allocation = positive(item?.collectionAmount); if (Number.isFinite(productId) && productId > 0 && allocation > 0) allocatedByProduct.set(productId, (allocatedByProduct.get(productId) ?? 0) + allocation); });
        if (!hasAllocation) { const receivedFor = String(receipt.receivedFor ?? "").toLowerCase(); clientProducts.forEach((product) => { if (receivedFor.includes(String(product.productName ?? "").toLowerCase())) legacyProductPayments.set(String(product.id), (legacyProductPayments.get(String(product.id)) ?? 0) + positive(receipt.amount ?? receipt.grandTotal)); }); }
      } catch { /* ignore malformed legacy receipt item JSON */ }
    });
    if (clientProducts.length) {
      clientProducts.forEach((product) => {
        const paid = Math.max(positive(product.paidAmount), (allocatedByProduct.get(Number(product.id)) ?? 0) + (legacyProductPayments.get(String(product.id)) ?? 0));
        const amount = Math.max(positive(product.totalAmount) - paid, 0);
        if (amount > 0 && product.dueDate) rows.push({ id: `product-${product.id}`, clientId, clientName: client.clientName, source: "Product", label: product.productName, dueDate: String(product.dueDate), amount, urgency: reminderUrgency(String(product.dueDate), now) });
      });
    } else {
      const plan = [...plans].filter((row) => String(row.clientId) === clientId).sort((a, b) => Number(b.id) - Number(a.id))[0];
      const openTerms = filterOpenPaymentTerms(plan?.terms ?? [], collected);
      openTerms.forEach((term) => rows.push({ id: `plan-${clientId}-${term.label}-${term.dueDate}`, clientId, clientName: client.clientName, source: "Payment plan", label: term.label, dueDate: String(term.dueDate), amount: positive(term.amount), urgency: reminderUrgency(String(term.dueDate), now) }));
    }
    invoices.filter((invoice) => sameClient(client, invoice) && ["Draft", "Due"].includes(invoice.status) && positive(invoice.grandTotal) > 0).forEach((invoice) => rows.push({ id: `invoice-${invoice.id}`, clientId, clientName: client.clientName, source: "Invoice", label: invoice.invoiceNumber, dueDate: String(invoice.dueDate || invoice.invoiceDate || ""), amount: positive(invoice.grandTotal), urgency: reminderUrgency(String(invoice.dueDate || invoice.invoiceDate), now) }));
  });
  const reminderWindowEnd = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 15).getTime();
  return rows
    .filter((row) => {
      if (!row.dueDate) return false;
      const dueTime = new Date(row.dueDate).getTime();
      if (!Number.isFinite(dueTime)) return false;
      const dueDay = new Date(row.dueDate);
      const dueDayTime = new Date(dueDay.getFullYear(), dueDay.getMonth(), dueDay.getDate()).getTime();
      return dueDayTime <= reminderWindowEnd;
    })
    .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());
}
