export type PaymentTrackingBoundary = string | Date | null | undefined;

export type PaymentRecord = {
  createdAt?: string | Date | null;
  paymentDate?: string | null;
  invoiceDate?: string | null;
};

function timestamp(value: string | Date | null | undefined) {
  if (!value) return null;
  const parsed = value instanceof Date ? value.getTime() : new Date(value).getTime();
  return Number.isFinite(parsed) ? parsed : null;
}

/**
 * Uses the renewal timestamp when available. Older records without a boundary
 * retain the existing YYYY-MM-DD start-date behavior.
 */
export function belongsToCurrentPaymentCycle(
  record: PaymentRecord,
  boundary: PaymentTrackingBoundary,
  legacyStartDate?: string | null,
  dateField: "paymentDate" | "invoiceDate" = "paymentDate",
) {
  const boundaryMs = timestamp(boundary);
  if (boundaryMs !== null) {
    const createdMs = timestamp(record.createdAt);
    if (createdMs !== null) return createdMs >= boundaryMs;
  }
  const date = String(record[dateField] ?? "").slice(0, 10);
  return !legacyStartDate || date >= legacyStartDate;
}

export function currentCycleReceipts<T extends PaymentRecord>(records: T[], boundary: PaymentTrackingBoundary, legacyStartDate?: string | null) {
  return records.filter((record) => belongsToCurrentPaymentCycle(record, boundary, legacyStartDate, "paymentDate"));
}

export function currentCycleInvoices<T extends PaymentRecord>(records: T[], boundary: PaymentTrackingBoundary, legacyStartDate?: string | null) {
  return records.filter((record) => belongsToCurrentPaymentCycle(record, boundary, legacyStartDate, "invoiceDate"));
}

export function currentCycleProducts<T extends PaymentRecord>(records: T[], boundary: PaymentTrackingBoundary) {
  const boundaryMs = timestamp(boundary);
  if (boundaryMs === null) return records;
  return records.filter((record) => {
    const createdMs = timestamp(record.createdAt);
    return createdMs === null || createdMs >= boundaryMs;
  });
}

export function recordBelongsToClientCycle(record: PaymentRecord, client: { paymentTrackingStartedAt?: PaymentTrackingBoundary; startDate?: string | null }, dateField: "paymentDate" | "invoiceDate" = "paymentDate") {
  return belongsToCurrentPaymentCycle(record, client.paymentTrackingStartedAt, client.startDate, dateField);
}

export function paymentTrackingTimestamp(value: string | Date | null | undefined) {
  return timestamp(value);
}
