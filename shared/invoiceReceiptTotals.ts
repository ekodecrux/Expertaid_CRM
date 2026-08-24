export function invoiceReceiptValues(invoice: { subtotal?: string | null; gstRate?: string | null; gstMode?: string | null; gstAmount?: string | null; grandTotal?: string | null }, calculated: { subtotal: string; gstRate: string; gstMode: "inclusive" | "exclusive"; gstAmount: string; grandTotal: string }) {
  return {
    subtotal: invoice.subtotal ?? calculated.subtotal,
    gstRate: invoice.gstRate ?? calculated.gstRate,
    gstMode: invoice.gstMode === "inclusive" ? "inclusive" as const : invoice.gstMode === "exclusive" ? "exclusive" as const : calculated.gstMode,
    gstAmount: invoice.gstAmount ?? calculated.gstAmount,
    grandTotal: invoice.grandTotal ?? calculated.grandTotal,
  };
}
