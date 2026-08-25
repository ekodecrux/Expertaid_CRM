export type PaymentTermDraft = { label: string; dueDate: string; amount: string; locked?: boolean };

export type PaymentTermState = PaymentTermDraft & {
  isPaid: boolean;
  appliedPaidAmount: number;
};

export function calculateRemainingPayment(totalAmount: number, initialPayment: number) {
  return Math.max(totalAmount - initialPayment, 0);
}

export function getPaymentTermStates(terms: PaymentTermDraft[], paidAmount: number): PaymentTermState[] {
  let remainingPaid = Math.max(0, Number(paidAmount) || 0);
  return terms.map((term) => {
    const amount = Math.max(0, Number(term.amount) || 0);
    const appliedPaidAmount = Math.min(amount, remainingPaid);
    const isPaid = amount > 0 && appliedPaidAmount + 0.005 >= amount;
    remainingPaid = Math.max(0, remainingPaid - appliedPaidAmount);
    return { ...term, isPaid, appliedPaidAmount };
  });
}

export function distributeRemainingPayment(terms: PaymentTermDraft[], remaining: number, paidAmount = 0): PaymentTermDraft[] {
  if (!terms.length) return terms;
  const states = getPaymentTermStates(terms, paidAmount);
  const editableIndexes = states.map((term, index) => ({ term, index })).filter(({ term }) => !term.isPaid).map(({ index }) => index);
  if (!editableIndexes.length) return terms;
  const lockedCents = states.filter((term) => term.isPaid).reduce((sum, term) => sum + Math.max(0, Math.round(Number(term.amount || 0) * 100)), 0);
  const totalCents = Math.max(0, Math.round(remaining * 100) - lockedCents);
  const baseCents = Math.floor(totalCents / editableIndexes.length);
  const remainderCents = totalCents - baseCents * editableIndexes.length;
  const editablePosition = new Map(editableIndexes.map((index, position) => [index, position]));
  return terms.map((term, index) => {
    if (!editablePosition.has(index)) return term;
    const position = editablePosition.get(index)!;
    return {
      ...term,
      amount: ((baseCents + (position === editableIndexes.length - 1 ? remainderCents : 0)) / 100).toFixed(2),
    };
  });
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
