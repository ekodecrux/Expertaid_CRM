export type RenewalStartRule = "continuous" | "sixMonths" | "oneYear";

function addMonths(value: string, months: number) {
  const date = new Date(`${value}T00:00:00Z`);
  date.setUTCMonth(date.getUTCMonth() + months);
  return date.toISOString().slice(0, 10);
}

export function renewalReason(input: { previousEndDate: string; renewalType: RenewalStartRule; today: string; startDate: string }) {
  const expiryPlusThreeMonths = addMonths(input.previousEndDate, 3);
  if (input.today > expiryPlusThreeMonths && input.startDate === input.today) return "The previous plan expired more than 3 months ago, so the renewal starts from today.";
  if (input.renewalType === "continuous") return "Continuous renewal: the plan continues from the previous start date.";
  if (input.renewalType === "sixMonths") return "Six-month gap selected after the previous plan expiry.";
  return "One-year gap selected after the previous plan expiry.";
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

export { addMonths };
