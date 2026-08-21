export type InvoiceSummaryProduct = {
  totalAmount?: string | number | null;
  gstAmount?: string | number | null;
  gstRate?: string | number | null;
  gstMode?: "inclusive" | "exclusive" | null;
};

function amount(value: string | number | null | undefined) {
  return Number(value ?? 0);
}

export function calculateInvoiceSummaryGst(
  primaryGstAmount: string | number | null | undefined,
  products: InvoiceSummaryProduct[],
) {
  return amount(primaryGstAmount) + products.reduce((sum, product) => {
    const total = amount(product.totalAmount);
    const rate = amount(product.gstRate) / 100;
    const gst = product.gstAmount == null
      ? (product.gstMode === "inclusive" ? total - total / (1 + rate) : total * rate)
      : amount(product.gstAmount);
    return sum + gst;
  }, 0);
}
