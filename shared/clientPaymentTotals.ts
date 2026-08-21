export type ClientPaymentTotalsInput = {
  totalPrice?: string | number | null;
  paidAmount?: string | number | null;
};

function numeric(value: string | number | null | undefined) {
  const parsed = Number(value ?? 0);
  return Number.isFinite(parsed) ? parsed : 0;
}

export function sumReceiptCollections(receipts: Array<{ amount?: string | number | null; grandTotal?: string | number | null; status?: string | null }>) {
  return receipts
    .filter((receipt) => receipt.status !== "Cancelled")
    .reduce((sum, receipt) => sum + numeric(receipt.amount ?? receipt.grandTotal), 0);
}

export function clientPaymentTotals(input: ClientPaymentTotalsInput) {
  const grandTotal = Math.max(0, numeric(input.totalPrice));
  const paid = Math.min(grandTotal, Math.max(0, numeric(input.paidAmount)));
  const pending = Math.max(grandTotal - paid, 0);
  return { grandTotal, paid, pending };
}
