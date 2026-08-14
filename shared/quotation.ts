export const DEFAULT_QUOTATION_GST = "36AAGCE2615N1ZH";
export const DEFAULT_QUOTATION_ADDRESS = "Plot No. 7, Survey No. 202, Ashoknagar, Quthbullapur, Hyderabad, Telangana 502032";
export const DEFAULT_QUOTATION_TERMS = "Goods Once Sold Will Not be taken back";
export const DEFAULT_QUOTATION_PRODUCTS: QuotationProduct[] = [
  { product: "ERP", itemName: "Instant ERP (Educational Management Software)", unitPrice: 0 },
  { product: "Biometric", itemName: "Biometric Device", unitPrice: 0 },
  { product: "WhatsApp", itemName: "WhatsApp Business Integration", unitPrice: 0 },
];

export type QuotationProduct = {
  /** Legacy category retained for existing saved quotations; new Settings entries use productName. */
  product: "ERP" | "Biometric" | "WhatsApp";
  productName?: string;
  itemName: string;
  quantity?: number;
  unitPrice: number;
};

export type QuotationItem = {
  /** Legacy category retained for existing saved quotations; new entries may provide productName. */
  product: "ERP" | "Biometric" | "WhatsApp";
  productName?: string;
  itemName: string;
  quantity: number;
  unitPrice: number;
};

export type GstMode = "inclusive" | "exclusive";

export function calculateQuotationTotals(items: QuotationItem[], gstRate: number, gstMode: GstMode = "exclusive") {
  const enteredTotal = items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);
  if (gstMode === "inclusive") {
    const gstAmount = gstRate > 0 ? enteredTotal * (gstRate / (100 + gstRate)) : 0;
    return { subtotal: enteredTotal - gstAmount, gstAmount, grandTotal: enteredTotal };
  }
  const gstAmount = enteredTotal * (gstRate / 100);
  return { subtotal: enteredTotal, gstAmount, grandTotal: enteredTotal + gstAmount };
}

export function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 2 }).format(value);
}
