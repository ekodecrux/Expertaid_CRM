export type UpcomingPaymentItem = {
  id: number;
  reference: string;
  date: string | Date | null;
  amount: number;
  status: string;
};

export type PlannedPaymentTerm = {
  label: string;
  dueDate: string;
  amount: string | number;
};

export type PaymentPlanSchedule = {
  totalAmount?: string | number | null;
  initialPayment?: string | number | null;
  terms?: PlannedPaymentTerm[] | null;
};

/**
 * Returns the persisted schedule for display. Older planner saves could persist
 * the reminder dates before distributing the remaining balance, leaving every
 * term at zero. In that case, allocate the plan balance evenly across the
 * dated terms so the client history still shows the upcoming payment schedule.
 */
export function displayPlannedPaymentTerms(plan: PaymentPlanSchedule | null | undefined): PlannedPaymentTerm[] {
  const terms = Array.isArray(plan?.terms) ? plan.terms : [];
  const datedTerms = terms.filter((term) => Boolean(term.dueDate));
  const hasPositiveAmount = datedTerms.some((term) => Number(term.amount) > 0);
  if (hasPositiveAmount || datedTerms.length === 0) return terms;

  const remaining = Math.max(Number(plan?.totalAmount ?? 0) - Number(plan?.initialPayment ?? 0), 0);
  if (remaining <= 0) return terms;

  const base = Math.floor((remaining / datedTerms.length) * 100) / 100;
  let allocated = 0;
  return terms.map((term) => {
    if (!term.dueDate) return term;
    const index = datedTerms.indexOf(term);
    const amount = index === datedTerms.length - 1
      ? Math.max(0, Math.round((remaining - allocated) * 100) / 100)
      : base;
    allocated += amount;
    return { ...term, amount: amount.toFixed(2) };
  });
}

export function fallbackPlannedPaymentTerms(input: { totalAmount: number; paidAmount: number; dueDate: string | null | undefined }): PlannedPaymentTerm[] {
  const remaining = Math.max(Number(input.totalAmount || 0) - Number(input.paidAmount || 0), 0);
  return remaining > 0 && input.dueDate
    ? [{ label: "Installment 1", dueDate: input.dueDate, amount: remaining.toFixed(2) }]
    : [];
}

export function mergeUpcomingPaymentItems(
  invoiceItems: UpcomingPaymentItem[],
  plannedTerms: PlannedPaymentTerm[] = [],
): UpcomingPaymentItem[] {
  const plannedItems = plannedTerms
    .filter((term) => Number(term.amount) > 0 && Boolean(term.dueDate))
    .map((term, index) => ({
      id: -(index + 1),
      reference: term.label,
      date: term.dueDate,
      amount: Number(term.amount),
      status: "Planned",
    }));

  return [...invoiceItems, ...plannedItems].sort(
    (a, b) => new Date(String(a.date)).getTime() - new Date(String(b.date)).getTime(),
  );
}
