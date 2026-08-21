export type ProductFinancialInput = {
  subtotal?: string | number | null;
  totalAmount?: string | number | null;
  gstAmount?: string | number | null;
  gstMode?: "inclusive" | "exclusive" | null;
};

function numeric(value: string | number | null | undefined) {
  const parsed = Number(value ?? 0);
  return Number.isFinite(parsed) ? parsed : 0;
}

export function productFinancials(product: ProductFinancialInput) {
  const totalAmount = numeric(product.totalAmount);
  const gstAmount = numeric(product.gstAmount);
  const storedSubtotal = product.subtotal == null ? undefined : numeric(product.subtotal);
  const subtotal = storedSubtotal ?? Math.max(0, totalAmount - gstAmount);
  const amountBeforeGst = product.gstMode === "inclusive" ? Math.max(0, subtotal - gstAmount) : subtotal;

  return { amountBeforeGst, gstAmount, totalAmount };
}
