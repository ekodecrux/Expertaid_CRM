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
