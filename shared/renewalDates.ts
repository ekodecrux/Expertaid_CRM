export type RenewalStartRule = "continuous" | "sixMonths" | "oneYear";

function addMonths(value: string, months: number) {
  const date = new Date(`${value}T00:00:00Z`);
  date.setUTCMonth(date.getUTCMonth() + months);
  return date.toISOString().slice(0, 10);
}

export function renewalDates(input: {
  previousStartDate: string;
  previousEndDate: string;
  planYears: number;
  renewalType: RenewalStartRule;
  today: string;
  startDate?: string;
  endDate?: string;
}) {
  const expiryPlusThreeMonths = addMonths(input.previousEndDate, 3);
  const gapExceedsThreeMonths = input.today > expiryPlusThreeMonths;
  const defaultStartDate = gapExceedsThreeMonths
    ? input.today
    : input.renewalType === "continuous"
      ? input.previousStartDate
      : addMonths(input.previousEndDate, input.renewalType === "sixMonths" ? 6 : 12);
  const resolvedStartDate = input.startDate ?? defaultStartDate;
  const resolvedEndDate = input.endDate ?? addMonths(resolvedStartDate, Math.max(1, input.planYears) * 12);
  return { startDate: resolvedStartDate, endDate: resolvedEndDate, gapExceedsThreeMonths };
}
