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

export function calculateAgreementPricing(baseTotal: number, gstMode: "inclusive" | "exclusive", gstRate: number) {
  const rate = Math.max(0, Number(gstRate) || 0);
  const entered = Math.max(0, Number(baseTotal) || 0);
  const subtotal = gstMode === "inclusive" ? entered / (1 + rate / 100) : entered;
  const gstAmount = gstMode === "inclusive" ? entered - subtotal : subtotal * rate / 100;
  const total = gstMode === "inclusive" ? entered : subtotal + gstAmount;
  return { subtotal: Number(subtotal.toFixed(2)), gstAmount: Number(gstAmount.toFixed(2)), total: Number(total.toFixed(2)) };
}

export function calculateAgreementEndDate(startDate: string, noOfYearPlan: number) {
  const date = new Date(`${startDate}T00:00:00`);
  if (Number.isNaN(date.getTime())) return startDate;
  date.setFullYear(date.getFullYear() + noOfYearPlan);
  date.setDate(date.getDate() - 1);
  return date.toISOString().slice(0, 10);
}
