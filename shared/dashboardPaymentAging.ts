import { getPaymentTermStates } from "./paymentPlan";
import { clientPrimaryTotal } from "./clientBalance";
import { currentCycleProducts, currentCycleReceipts } from "./paymentTracking";
import { INDIA_TIME_ZONE } from "./timezone";

function indiaDateKey(value: unknown) {
  const date = value instanceof Date ? value : new Date(String(value));
  if (!Number.isFinite(date.getTime())) return "";
  return new Intl.DateTimeFormat("en-CA", { timeZone: INDIA_TIME_ZONE, year: "numeric", month: "2-digit", day: "2-digit" }).format(date);
}

export function dashboardChartStartYear(sessionMode: "all" | "single", currentSession: string, now = new Date()) {
  if (sessionMode === "all") return now.getFullYear();
  return Number(currentSession.slice(0, 4)) || now.getFullYear();
}

export function calculateCurrentDateCollections(receipts: any[], now = new Date()) {
  const todayKey = indiaDateKey(now);
  const monthKey = todayKey.slice(0, 7);
  const activeReceipts = receipts.filter((row) => row.status !== "Cancelled");
  const amount = (row: any) => Number(row.amount ?? row.grandTotal ?? 0);
  const dateKey = (row: any) => {
    const businessDate = String(row.paymentDate ?? "").slice(0, 10);
    return /^\d{4}-\d{2}-\d{2}$/.test(businessDate) ? businessDate : indiaDateKey(row.createdAt);
  };
  return {
    today: activeReceipts.filter((row) => dateKey(row) === todayKey).reduce((sum, row) => sum + amount(row), 0),
    month: activeReceipts.filter((row) => dateKey(row).slice(0, 7) === monthKey).reduce((sum, row) => sum + amount(row), 0),
  };
}

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

export function filterReceiptsForDashboardSession(receipts: any[], clientIds: Set<string>) {
  return receipts.filter((row) => row.status !== "Cancelled" && (!row.clientId || clientIds.has(String(row.clientId))));
}

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

export function buildClientPaymentItems(clientRows: any[], products: any[], plans: any[], receipts: any[] = []): DashboardPaymentItem[] {
  const productsByClient = new Map<string, any[]>();
  products.forEach((product) => {
    const existing = productsByClient.get(String(product.clientId)) ?? [];
    existing.push(product);
    productsByClient.set(String(product.clientId), existing);
  });
  return clientRows.flatMap((client): DashboardPaymentItem[] => {
    const clientId = String(client.clientId ?? "");
    const clientProducts = currentCycleProducts(productsByClient.get(clientId) ?? [], client.paymentTrackingStartedAt);
    if (clientProducts.length) {
      return clientProducts
        .map((product): DashboardPaymentItem => ({ clientId, clientName: client.clientName, dueDate: product.dueDate, amount: Math.max(Number(product.totalAmount ?? 0) - Number(product.paidAmount ?? 0), 0), source: "product" }))
        .filter((item: DashboardPaymentItem) => item.amount > 0);
    }
    const plan = [...plans].filter((row) => String(row.clientId) === clientId).sort((a, b) => Number(b.id) - Number(a.id))[0];
    const paidAmount = currentCycleReceipts(receipts.filter((receipt) => String(receipt.clientId ?? "") === clientId && receipt.status !== "Cancelled"), client.paymentTrackingStartedAt, client.startDate).reduce((sum, receipt) => sum + Number(receipt.amount ?? receipt.grandTotal ?? 0), 0);
    const terms = (plan?.terms ?? []).map((term: any) => ({ ...term, amount: String(term.amount ?? 0) }));
    if (!terms.length) {
      const primaryDue = Math.max(clientPrimaryTotal(client) - paidAmount, 0);
      return primaryDue > 0 ? [{ clientId, clientName: client.clientName, dueDate: client.endDate ?? null, amount: primaryDue, source: "plan" as const }] : [];
    }
    return getPaymentTermStates(terms, paidAmount)
      .filter((term) => !term.isPaid)
      .map((term) => ({ clientId, clientName: client.clientName, dueDate: term.dueDate, amount: Math.max(Number(term.amount) - term.appliedPaidAmount, 0), source: "plan" as const }))
      .filter((item: DashboardPaymentItem) => item.amount > 0);
  });
}

export function calculateDashboardBusinessValue(clientRows: any[], agreementRows: any[] = []) {
  const currentValue = clientRows.reduce((sum, row) => sum + Number(row.totalPrice ?? 0), 0);
  const renewalValue = agreementRows
    .filter((row) => row.status === "Approved" && row.renewalOfAgreementId)
    .reduce((sum, row) => sum + Number(row.totalPrice ?? 0), 0);
  return currentValue + renewalValue;
}

export type ClientPaymentSummary = ReturnType<typeof calculateClientPaymentAging>;
