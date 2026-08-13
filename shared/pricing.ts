export type PricingMode = "perStudent" | "package";

export function calculateAgreementTotal(
  pricingMode: PricingMode,
  noOfStudents: number,
  perStudentPrice: number | null | undefined,
  packagePrice: number | null | undefined,
  noOfYearPlan: number,
) {
  const basePrice = pricingMode === "package" ? Number(packagePrice ?? 0) : noOfStudents * Number(perStudentPrice ?? 0);
  return Number((basePrice * noOfYearPlan).toFixed(2));
}

export function calculateAgreementEndDate(startDate: string, noOfYearPlan: number) {
  const date = new Date(`${startDate}T00:00:00`);
  if (Number.isNaN(date.getTime())) return startDate;
  date.setFullYear(date.getFullYear() + noOfYearPlan);
  date.setDate(date.getDate() - 1);
  return date.toISOString().slice(0, 10);
}
