export const DEFAULT_QUOTATION_GST = "36AAGCE2615N1ZH";
export const DEFAULT_QUOTATION_ADDRESS = "Plot No. 7, Survey No. 202, Ashoknagar, Quthbullapur, Hyderabad, Telangana 502032";
export const DEFAULT_QUOTATION_TERMS = "Goods Once Sold Will Not be taken back";

export type QuotationItem = {
  product: "ERP" | "Biometric" | "WhatsApp";
  itemName: string;
  quantity: number;
  unitPrice: number;
};

export function calculateQuotationTotals(items: QuotationItem[], gstRate: number) {
  const subtotal = items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);
  const gstAmount = subtotal * (gstRate / 100);
  return { subtotal, gstAmount, grandTotal: subtotal + gstAmount };
}

export function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 2 }).format(value);
}
