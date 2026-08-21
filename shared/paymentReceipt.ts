export function calculateReceiptCollectionDelta(
  requestedPaid: number,
  previouslyPaid: number,
  productTotal: number,
) {
  const requested = Number.isFinite(requestedPaid) ? requestedPaid : 0;
  const previous = Number.isFinite(previouslyPaid) ? previouslyPaid : 0;
  const total = Number.isFinite(productTotal) ? productTotal : 0;
  const delta = Math.max(requested - previous, 0);
  const remaining = Math.max(total - previous, 0);
  return {
    delta: Math.min(delta, remaining),
    remaining,
    isNewCollection: delta > 0 && delta <= remaining,
    isOverCollection: delta > remaining,
  };
}

export function receiptCollectionSummary(amount: number) {
  const value = Number.isFinite(amount) && amount > 0 ? amount : 0;
  return { amount: value, isValid: value > 0 };
}
