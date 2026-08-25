import { currentCycleProducts, recordBelongsToClientCycle } from "./paymentTracking";

export type GlobalClientSearchMatch = {
  client: any;
  agreements: any[];
  invoices: any[];
  receipts: any[];
};

export type GlobalClientSearchDetails = GlobalClientSearchMatch & {
  currentAgreement: any | null;
  historicalAgreements: any[];
  currentReceipts: any[];
  historicalReceipts: any[];
  currentInvoices: any[];
  historicalInvoices: any[];
  currentProducts: any[];
  paymentPlan: any | null;
  assigned: number;
  paid: number;
  due: number;
};

function normalized(value: unknown) {
  return String(value ?? "").trim().toLowerCase();
}

function clientKey(value: any) {
  return normalized(value?.clientId) || `name:${normalized(value?.clientName)}`;
}

function belongsToClient(row: any, client: any) {
  const rowId = normalized(row?.clientId);
  const currentId = normalized(client?.clientId);
  if (rowId && currentId) return rowId === currentId;
  return normalized(row?.clientName) === normalized(client?.clientName);
}

function sortableDate(value: unknown) {
  const timestamp = new Date(String(value ?? "")).getTime();
  return Number.isFinite(timestamp) ? timestamp : 0;
}

function newestFirst(rows: any[]) {
  return [...rows].sort((left, right) => sortableDate(right.createdAt ?? right.paymentDate ?? right.invoiceDate ?? right.startDate) - sortableDate(left.createdAt ?? left.paymentDate ?? left.invoiceDate ?? left.startDate));
}

function searchableFields(row: any) {
  return [
    row?.clientId,
    row?.clientName,
    row?.clientOwnerName,
    row?.email,
    row?.contactNumber,
    row?.instituteType,
    row?.invoiceNumber,
    row?.receiptNumber,
    row?.receivedFor,
    row?.paymentMode,
    row?.transactionReference,
    row?.transactionId,
    row?.project,
    row?.projectName,
    row?.session,
  ].map(normalized);
}

export function findGlobalClientSearchMatches(term: string, clients: any[], agreements: any[] = [], invoices: any[] = [], receipts: any[] = []) {
  const query = normalized(term);
  if (query.length < 2) return [] as GlobalClientSearchMatch[];
  const matches: GlobalClientSearchMatch[] = [];
  const seen = new Set<string>();
  clients.forEach((client) => {
    const key = clientKey(client);
    if (seen.has(key)) return;
    const clientAgreements = newestFirst(agreements.filter((row) => belongsToClient(row, client)));
    const clientInvoices = newestFirst(invoices.filter((row) => belongsToClient(row, client)));
    const clientReceipts = newestFirst(receipts.filter((row) => belongsToClient(row, client)));
    const relatedRows = [client, ...clientAgreements, ...clientInvoices, ...clientReceipts];
    if (!relatedRows.some((row) => searchableFields(row).some((field) => field.includes(query)))) return;
    seen.add(key);
    matches.push({ client, agreements: clientAgreements, invoices: clientInvoices, receipts: clientReceipts });
  });
  return matches.slice(0, 8);
}

export function buildGlobalClientSearchDetails(match: GlobalClientSearchMatch, products: any[] = [], plans: any[] = []): GlobalClientSearchDetails {
  const { client, agreements, invoices, receipts } = match;
  const boundary = client.paymentTrackingStartedAt ?? (client.renewalOfAgreementId ? client.createdAt : null);
  const activeReceipts = receipts.filter((row) => row.status !== "Cancelled");
  const currentReceipts = activeReceipts.filter((row) => recordBelongsToClientCycle(row, client, "paymentDate"));
  const historicalReceipts = activeReceipts.filter((row) => !recordBelongsToClientCycle(row, client, "paymentDate"));
  const activeInvoices = invoices.filter((row) => row.status !== "Cancelled");
  const currentInvoices = activeInvoices.filter((row) => recordBelongsToClientCycle(row, client, "invoiceDate"));
  const historicalInvoices = activeInvoices.filter((row) => !recordBelongsToClientCycle(row, client, "invoiceDate"));
  const clientProducts = currentCycleProducts(products.filter((row) => belongsToClient(row, client)), boundary);
  const currentAgreement = agreements.find((row) => Number(row.id) === Number(client.id)) ?? agreements[0] ?? null;
  const historicalAgreements = agreements.filter((row) => !currentAgreement || Number(row.id) !== Number(currentAgreement.id));
  const paymentPlan = newestFirst(plans.filter((row) => belongsToClient(row, client)))[0] ?? null;
  const assigned = Math.max(0, Number(client.totalPrice ?? 0));
  const paid = currentReceipts.reduce((sum, row) => sum + Math.max(0, Number(row.amount ?? row.grandTotal ?? 0)), 0);
  return { ...match, currentAgreement, historicalAgreements, currentReceipts, historicalReceipts, currentInvoices, historicalInvoices, currentProducts: clientProducts, paymentPlan, assigned, paid, due: Math.max(0, assigned - paid) };
}

export function globalSearchClientKey(client: any) {
  return clientKey(client);
}
