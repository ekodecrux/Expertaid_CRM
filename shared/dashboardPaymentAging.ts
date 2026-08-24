export type DashboardPaymentItem = {
  clientId: string;
  clientName?: string | null;
  dueDate?: string | null;
  amount: number;
  source: "product" | "plan";
};

export type DashboardAgingBucket = {
  label: string;
  color: string;
  amount: number;
  count: number;
};

export const CLIENT_PAYMENT_AGING_BUCKETS = [
  { label: "Overdue", color: "bg-rose-500" },
  { label: "1–15 Days", color: "bg-amber-500" },
  { label: "16–30 Days", color: "bg-blue-500" },
  { label: "31+ Days", color: "bg-emerald-500" },
] as const;

export function calculateClientPaymentAging(items: DashboardPaymentItem[], now = new Date()) {
  const aging: DashboardAgingBucket[] = CLIENT_PAYMENT_AGING_BUCKETS.map((bucket) => ({ ...bucket, amount: 0, count: 0 }));
  const dueClientPayments = items.filter((item) => item.dueDate && item.amount > 0);
  dueClientPayments.forEach((item) => {
    const delta = Math.ceil((new Date(String(item.dueDate)).getTime() - now.getTime()) / 86400000);
    const bucket = delta < 0 ? aging[0] : delta <= 15 ? aging[1] : delta <= 30 ? aging[2] : aging[3];
    bucket.amount += item.amount;
    bucket.count += 1;
  });
  return { dueClientPayments, aging, dueTotal: dueClientPayments.reduce((sum, item) => sum + item.amount, 0) };
}

export function buildClientPaymentItems(clientRows: any[], products: any[], plans: any[]): DashboardPaymentItem[] {
  const productsByClient = new Map<string, any[]>();
  products.forEach((product) => {
    const existing = productsByClient.get(String(product.clientId)) ?? [];
    existing.push(product);
    productsByClient.set(String(product.clientId), existing);
  });
  return clientRows.flatMap((client) => {
    const clientId = String(client.clientId ?? "");
    const clientProducts = productsByClient.get(clientId) ?? [];
    if (clientProducts.length) {
      return clientProducts
        .map((product) => ({ clientId, clientName: client.clientName, dueDate: product.dueDate, amount: Math.max(Number(product.totalAmount ?? 0) - Number(product.paidAmount ?? 0), 0), source: "product" as const }))
        .filter((item: DashboardPaymentItem) => item.amount > 0);
    }
    const plan = [...plans].filter((row) => String(row.clientId) === clientId).sort((a, b) => Number(b.id) - Number(a.id))[0];
    return (plan?.terms ?? [])
      .map((term: any) => ({ clientId, clientName: client.clientName, dueDate: term.dueDate, amount: Math.max(Number(term.amount ?? 0), 0), source: "plan" as const }))
      .filter((item: DashboardPaymentItem) => item.amount > 0);
  });
}

export type ClientPaymentSummary = ReturnType<typeof calculateClientPaymentAging>;
