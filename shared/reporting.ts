import { currentCycleReceipts } from "./paymentTracking";

export type ReportPeriod = "daily" | "monthly" | "range";
export type SessionScope = "current" | "all" | "custom";
export type MonthScope = "single" | "multiple" | "all";

type CollectionProduct = {
  clientId?: string | null;
  id?: number | string;
  productName?: string | null;
  gstRate?: number | string | null;
  gstMode?: string | null;
};

function numeric(value: unknown) {
  const parsed = Number(value ?? 0);
  return Number.isFinite(parsed) ? parsed : 0;
}

function parseReceiptItems(value: unknown) {
  if (typeof value !== "string") return [];
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function findCollectionProduct(receipt: any, client: any, products: CollectionProduct[]) {
  const clientId = String(receipt.clientId ?? "");
  const clientProducts = products.filter((product) => String(product.clientId ?? "") === clientId);
  if (!clientProducts.length) return null;
  const items = parseReceiptItems(receipt.itemsJson);
  const productId = items.find((item) => item?.productId != null)?.productId;
  if (productId != null) {
    const byId = clientProducts.find((product) => String(product.id) === String(productId));
    if (byId) return byId;
  }
  const names = [
    ...items.map((item) => String(item?.itemName ?? item?.productName ?? "").trim().toLowerCase()),
    ...String(receipt.receivedFor ?? "").split(",").map((item) => item.trim().toLowerCase()),
  ].filter(Boolean);
  return clientProducts.find((product) => names.includes(String(product.productName ?? "").trim().toLowerCase())) ?? null;
}

export function normalizeCollectionReceipt(receipt: any, client?: any, products: CollectionProduct[] = []) {
  const storedSubtotal = numeric(receipt.subtotal);
  const storedGst = numeric(receipt.gstAmount);
  const storedAmount = numeric(receipt.amount ?? receipt.grandTotal);
  const storedGrandTotal = numeric(receipt.grandTotal ?? receipt.amount);
  const storedRate = receipt.gstRate == null || String(receipt.gstRate).trim() === "" ? null : numeric(receipt.gstRate);
  const storedMode = receipt.gstMode === "inclusive" || receipt.gstMode === "exclusive" ? receipt.gstMode : null;
  const product = findCollectionProduct(receipt, client, products);
  const productRate = product ? numeric(product.gstRate) : numeric(client?.gstRate);
  const productMode = product?.gstMode === "inclusive" || product?.gstMode === "exclusive" ? product.gstMode : client?.gstMode === "inclusive" || client?.gstMode === "exclusive" ? client.gstMode : null;
  const hydrateFromProduct = productRate > 0 && (storedRate == null || (storedRate === 0 && storedGst === 0));
  const gstRate = hydrateFromProduct ? productRate : storedRate ?? productRate;
  const gstMode = hydrateFromProduct ? productMode ?? storedMode ?? "exclusive" : storedMode ?? productMode ?? "exclusive";
  let subtotal = storedSubtotal || storedAmount || storedGrandTotal;
  let gstAmount = storedGst;
  let grandTotal = storedGrandTotal || storedAmount || subtotal;

  if (hydrateFromProduct && gstMode === "inclusive") {
    grandTotal = storedGrandTotal || storedAmount || subtotal;
    subtotal = gstRate > 0 ? grandTotal / (1 + gstRate / 100) : grandTotal;
    gstAmount = grandTotal - subtotal;
  } else if (hydrateFromProduct && gstMode === "exclusive") {
    subtotal = storedSubtotal || storedAmount || storedGrandTotal;
    gstAmount = subtotal * gstRate / 100;
    grandTotal = subtotal + gstAmount;
  } else if (gstMode === "exclusive" && !grandTotal) {
    grandTotal = subtotal + gstAmount;
  }

  return { subtotal, gstRate, gstMode, gstAmount, amount: grandTotal, grandTotal };
}

export function paginateReportRows<T>(rows: T[], page: number, pageSize: number) {
  const safePageSize = Math.max(1, pageSize);
  const pageCount = Math.max(1, Math.ceil(rows.length / safePageSize));
  const safePage = Math.min(Math.max(1, page), pageCount);
  return { pageRows: rows.slice((safePage - 1) * safePageSize, safePage * safePageSize), page: safePage, pageCount, serialOffset: (safePage - 1) * safePageSize };
}

export function visibleReportColumns(columns: string[], hiddenColumns: string[]) { const visible = columns.filter((column) => !hiddenColumns.includes(column)); return visible.length ? visible : columns; }

export function matchesSession(session: unknown, scope: SessionScope, currentSession: string, selectedSessions: string[]) {
  if (scope === "all") return true;
  if (scope === "custom") return selectedSessions.includes(String(session ?? ""));
  return String(session ?? "") === currentSession;
}

export function inCollectionPeriod(value: unknown, period: ReportPeriod, today = new Date(), rangeStart?: string, rangeEnd?: string, monthScope: MonthScope = "single", selectedMonths: string[] = []) {
  const date = String(value ?? "").slice(0, 10);
  if (!date) return false;
  if (period === "range") return Boolean(rangeStart && rangeEnd && date >= rangeStart && date <= rangeEnd);
  const reference = today.toISOString().slice(0, 10);
  if (period === "daily") return date === reference;
  const month = date.slice(0, 7);
  if (monthScope === "all") return true;
  if (monthScope === "multiple") return selectedMonths.includes(month);
  return month === (selectedMonths[0] ?? reference.slice(0, 7));
}

export function buildCollectionReportRows(receipts: any[], clients: any[], options: { period: ReportPeriod; scope: SessionScope; currentSession: string; selectedSessions: string[]; today?: Date; rangeStart?: string; rangeEnd?: string; monthScope?: MonthScope; selectedMonths?: string[] }, products: CollectionProduct[] = []) {
  const clientsById = new Map(clients.map((client) => [String(client.clientId ?? ""), client]));
  return receipts
    .filter((receipt) => receipt.status !== "Cancelled" && inCollectionPeriod(receipt.paymentDate, options.period, options.today, options.rangeStart, options.rangeEnd, options.monthScope, options.selectedMonths))
    .filter((receipt) => {
      const client = clientsById.get(String(receipt.clientId ?? ""));
      return matchesSession(client?.session, options.scope, options.currentSession, options.selectedSessions) && currentCycleReceipts([receipt], client?.paymentTrackingStartedAt, client?.startDate).length > 0;
    })
    .map((receipt) => {
      const client = clientsById.get(String(receipt.clientId ?? ""));
      const financials = normalizeCollectionReceipt(receipt, client, products);
      return {
        receiptNumber: receipt.receiptNumber,
        clientId: receipt.clientId ?? "—",
        clientName: receipt.clientName ?? client?.clientName ?? "—",
        paymentDate: receipt.paymentDate,
        projectId: client?.projectId ?? null,
        project: client?.projectName ?? client?.project ?? "—",
        paymentMode: receipt.paymentMode ?? "—",
        transactionId: receipt.transactionReference ?? "—",
        receivedFor: receipt.receivedFor ?? "—",
        gstMode: financials.gstMode,
        gstRate: financials.gstRate,
        subtotal: financials.subtotal,
        gstAmount: financials.gstAmount,
        amount: financials.amount,
        grandTotal: financials.grandTotal,
        session: client?.session ?? "—",
      };
    });
}

export function buildDueReportRows(clients: any[], receipts: any[], options: { scope: SessionScope; currentSession: string; selectedSessions: string[] }, products: CollectionProduct[] = []) {
  const paidByClient = new Map<string, number>();
  const clientsById = new Map(clients.map((client) => [String(client.clientId ?? ""), client]));
  receipts.filter((receipt) => {
    if (receipt.status === "Cancelled") return false;
    const client = clientsById.get(String(receipt.clientId ?? ""));
    return currentCycleReceipts([receipt], client?.paymentTrackingStartedAt, client?.startDate).length > 0;
  }).forEach((receipt) => {
    const key = String(receipt.clientId ?? receipt.clientName ?? "").toLowerCase();
    const financials = normalizeCollectionReceipt(receipt, clientsById.get(String(receipt.clientId ?? "")), products);
    paidByClient.set(key, (paidByClient.get(key) ?? 0) + financials.amount);
  });
  return clients
    .filter((client) => matchesSession(client.session, options.scope, options.currentSession, options.selectedSessions))
    .map((client) => {
      const assigned = numeric(client.totalPrice);
      const paid = paidByClient.get(String(client.clientId ?? client.clientName ?? "").toLowerCase()) ?? 0;
      return { clientId: client.clientId ?? `ERP${Math.abs(Number(client.id ?? 0))}`, clientName: client.clientName, projectId: client.projectId ?? null, project: client.projectName ?? client.project ?? "—", session: client.session ?? "—", assigned, paid, due: Math.max(assigned - paid, 0) };
    })
    .filter((row) => row.due > 0.005);
}

export function formatGstRate(value: unknown) { if (value == null || String(value).trim() === "") return "—"; const number = Number(value); return Number.isFinite(number) ? `${number % 1 === 0 ? number.toFixed(0) : number.toFixed(2)}%` : "—"; }
