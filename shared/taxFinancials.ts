export type TaxFinancialInput = {
  subtotal?: string | number | null;
  totalAmount?: string | number | null;
  totalPrice?: string | number | null;
  gstAmount?: string | number | null;
  gstRate?: string | number | null;
  gstMode?: "inclusive" | "exclusive" | null;
};

function numeric(value: string | number | null | undefined) {
  const parsed = Number(value ?? 0);
  return Number.isFinite(parsed) ? parsed : 0;
}

export function taxFinancials(input: TaxFinancialInput) {
  const totalAmount = Math.max(0, numeric(input.totalAmount ?? input.totalPrice));
  const gstRate = Math.max(0, numeric(input.gstRate));
  const gstMode = input.gstMode === "inclusive" ? "inclusive" : "exclusive";
  const storedGstAmount = numeric(input.gstAmount);
  const storedSubtotal = input.subtotal == null ? 0 : Math.max(0, numeric(input.subtotal));
  const divisor = 1 + gstRate / 100;
  const subtotal = input.subtotal != null && storedSubtotal > 0
    ? (gstMode === "inclusive" ? Math.max(0, totalAmount - storedGstAmount) : storedSubtotal)
    : gstMode === "inclusive" && divisor > 0
      ? totalAmount / divisor
      : Math.max(0, totalAmount - storedGstAmount);
  const gstAmount = storedGstAmount > 0
    ? storedGstAmount
    : gstMode === "inclusive" && divisor > 0
      ? totalAmount - subtotal
      : subtotal * gstRate / 100;

  return {
    subtotal: Math.max(0, subtotal),
    gstRate,
    gstMode,
    gstAmount: Math.max(0, gstAmount),
    totalAmount,
  };
}
