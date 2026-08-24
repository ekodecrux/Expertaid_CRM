export type ReportPeriod = "daily" | "monthly" | "range";
export type SessionScope = "current" | "all" | "custom";

function numeric(value: unknown) {
  const parsed = Number(value ?? 0);
  return Number.isFinite(parsed) ? parsed : 0;
}

export function matchesSession(session: unknown, scope: SessionScope, currentSession: string, selectedSessions: string[]) {
  if (scope === "all") return true;
  if (scope === "custom") return selectedSessions.includes(String(session ?? ""));
  return String(session ?? "") === currentSession;
}

export function inCollectionPeriod(value: unknown, period: ReportPeriod, today = new Date(), rangeStart?: string, rangeEnd?: string) {
  const date = String(value ?? "").slice(0, 10);
  if (!date) return false;
  if (period === "range") return Boolean(rangeStart && rangeEnd && date >= rangeStart && date <= rangeEnd);
  const reference = today.toISOString().slice(0, 10);
  return period === "daily" ? date === reference : date.slice(0, 7) === reference.slice(0, 7);
}

export function buildCollectionReportRows(receipts: any[], clients: any[], options: { period: ReportPeriod; scope: SessionScope; currentSession: string; selectedSessions: string[]; today?: Date; rangeStart?: string; rangeEnd?: string }) {
  const clientsById = new Map(clients.map((client) => [String(client.clientId ?? ""), client]));
  return receipts
    .filter((receipt) => receipt.status !== "Cancelled" && inCollectionPeriod(receipt.paymentDate, options.period, options.today, options.rangeStart, options.rangeEnd))
    .filter((receipt) => matchesSession(clientsById.get(String(receipt.clientId ?? ""))?.session, options.scope, options.currentSession, options.selectedSessions))
    .map((receipt) => ({
      receiptNumber: receipt.receiptNumber,
      clientId: receipt.clientId ?? "—",
      clientName: receipt.clientName ?? clientsById.get(String(receipt.clientId ?? ""))?.clientName ?? "—",
      paymentDate: receipt.paymentDate,
      paymentMode: receipt.paymentMode ?? "—",
      amount: numeric(receipt.amount ?? receipt.grandTotal),
      session: clientsById.get(String(receipt.clientId ?? ""))?.session ?? "—",
    }));
}

export function buildDueReportRows(clients: any[], receipts: any[], options: { scope: SessionScope; currentSession: string; selectedSessions: string[] }) {
  const paidByClient = new Map<string, number>();
  receipts.filter((receipt) => receipt.status !== "Cancelled").forEach((receipt) => {
    const key = String(receipt.clientId ?? receipt.clientName ?? "").toLowerCase();
    paidByClient.set(key, (paidByClient.get(key) ?? 0) + numeric(receipt.amount ?? receipt.grandTotal));
  });
  return clients
    .filter((client) => matchesSession(client.session, options.scope, options.currentSession, options.selectedSessions))
    .map((client) => {
      const assigned = numeric(client.totalPrice);
      const paid = paidByClient.get(String(client.clientId ?? client.clientName ?? "").toLowerCase()) ?? 0;
      return { clientId: client.clientId ?? `ERP${Math.abs(Number(client.id ?? 0))}`, clientName: client.clientName, session: client.session ?? "—", assigned, paid, due: Math.max(assigned - paid, 0) };
    })
    .filter((row) => row.due > 0.005);
}
