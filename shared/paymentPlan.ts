export type PaymentTermDraft = { label: string; dueDate: string; amount: string };

export function calculateRemainingPayment(totalAmount: number, initialPayment: number) {
  return Math.max(totalAmount - initialPayment, 0);
}

export function distributeRemainingPayment(terms: PaymentTermDraft[], remaining: number): PaymentTermDraft[] {
  if (!terms.length) return terms;
  const totalCents = Math.max(0, Math.round(remaining * 100));
  const baseCents = Math.floor(totalCents / terms.length);
  const remainderCents = totalCents - baseCents * terms.length;
  return terms.map((term, index) => ({
    ...term,
    amount: ((baseCents + (index === terms.length - 1 ? remainderCents : 0)) / 100).toFixed(2),
  }));
}

export function calculateScheduleDifference(terms: PaymentTermDraft[], remaining: number) {
  return remaining - terms.reduce((sum, term) => sum + Number(term.amount || 0), 0);
}

export function filterOpenPaymentTerms(terms: PaymentTermDraft[], paidAmount: number) {
  let remainingPaid = Math.max(0, Number(paidAmount) || 0);
  return terms.filter((term) => {
    const amount = Math.max(0, Number(term.amount) || 0);
    if (amount <= 0) return false;
    if (remainingPaid + 0.005 >= amount) {
      remainingPaid -= amount;
      return false;
    }
    return true;
  });
}
