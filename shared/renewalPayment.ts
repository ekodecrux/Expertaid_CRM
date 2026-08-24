export function renewalPaymentDue(total: number | string | null | undefined, paid: number | string | null | undefined) {
  return Math.max(0, Number(total ?? 0) - Math.max(0, Number(paid ?? 0)));
}

export function isPaymentClearedForRenewal(total: number | string | null | undefined, paid: number | string | null | undefined) {
  return renewalPaymentDue(total, paid) <= 0.005;
}
