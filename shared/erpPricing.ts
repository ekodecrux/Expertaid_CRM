export type ErpPricingMode = "perStudent" | "package";

export type ErpPricingInput = {
  mode: ErpPricingMode;
  noOfStudents?: number | null;
  perStudentPrice?: number | null;
  packagePrice?: number | null;
  fallbackPrice?: number | null;
  gstRate: number;
  gstMode: "inclusive" | "exclusive";
};

export function calculateErpPricing(input: ErpPricingInput) {
  const entered = input.mode === "perStudent"
    ? Math.max(Number(input.noOfStudents ?? 0), 0) * Math.max(Number(input.perStudentPrice ?? 0), 0)
    : Math.max(Number(input.packagePrice ?? input.fallbackPrice ?? 0), 0);
  const gstRate = Math.max(Number(input.gstRate || 0), 0);
  const divisor = 1 + gstRate / 100;
  const gstAmount = input.gstMode === "inclusive"
    ? entered - (divisor ? entered / divisor : entered)
    : entered * gstRate / 100;
  const totalPrice = input.gstMode === "inclusive" ? entered : entered + gstAmount;
  return {
    entered,
    gstAmount,
    totalPrice,
    noOfStudents: input.mode === "perStudent" ? Math.max(Number(input.noOfStudents ?? 0), 0) : 0,
    perStudentPrice: input.mode === "perStudent" ? Math.max(Number(input.perStudentPrice ?? 0), 0) : null,
    packagePrice: input.mode === "package" ? entered : null,
  };
}

export function calculateAdditionalProductTotal(baseTotal: number, additionalProductsTotal: number) {
  return Math.max(Number(baseTotal || 0), 0) + Math.max(Number(additionalProductsTotal || 0), 0);
}
