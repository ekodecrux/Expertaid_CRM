import { calculateQuotationTotals, type GstMode, type QuotationItem } from "./quotation";

export type QuotationExportInput = {
  quotationNumber?: string | null;
  estimationNumber?: number | null;
  clientName: string;
  clientAddress: string;
  clientContact: string;
  clientEmail?: string | null;
  clientGst?: string | null;
  quotationDate: string;
  validityDays: number;
  gstRate: number;
  gstMode: GstMode;
  companyGst: string;
  companyAddress: string;
  terms?: string | null;
  status?: string | null;
  items: QuotationItem[];
};

function lineFinancials(item: QuotationItem, gstRate: number, gstMode: GstMode) {
  const entered = Number(item.quantity || 0) * Number(item.unitPrice || 0);
  if (gstMode === "inclusive") {
    const gst = gstRate > 0 ? entered * (gstRate / (100 + gstRate)) : 0;
    return { amountBeforeGst: entered - gst, gstAmount: gst, totalAmount: entered };
  }
  const gst = entered * (gstRate / 100);
  return { amountBeforeGst: entered, gstAmount: gst, totalAmount: entered + gst };
}

export function buildQuotationExportRows(quotation: QuotationExportInput) {
  const items = quotation.items ?? [];
  const totals = calculateQuotationTotals(items, quotation.gstRate, quotation.gstMode);
  return items.map((item, index) => {
    const financials = lineFinancials(item, quotation.gstRate, quotation.gstMode);
    return {
      "Quotation No": quotation.quotationNumber ?? "—",
      "Estimation No": quotation.estimationNumber ?? "—",
      "Quotation Date": quotation.quotationDate,
      "Validity (Days)": quotation.validityDays,
      Status: quotation.status ?? "—",
      "Client Name": quotation.clientName,
      "Client Address": quotation.clientAddress,
      "Client Contact": quotation.clientContact,
      "Client Email": quotation.clientEmail ?? "",
      "Client GSTIN": quotation.clientGst ?? "",
      "Company GSTIN": quotation.companyGst,
      "Company Address": quotation.companyAddress,
      "Product No": index + 1,
      Product: item.productName ?? item.product,
      "Item Name": item.itemName,
      Quantity: Number(item.quantity || 0),
      "Unit Price": Number(item.unitPrice || 0),
      "Amount Before GST": financials.amountBeforeGst,
      "GST Rate": quotation.gstRate,
      "GST Mode": quotation.gstMode === "inclusive" ? "Inclusive" : "Exclusive",
      "Product GST Amount": financials.gstAmount,
      "Product Total Amount": financials.totalAmount,
      "Quotation Subtotal": totals.subtotal,
      "Quotation GST Amount": totals.gstAmount,
      "Grand Total": totals.grandTotal,
      Terms: quotation.terms ?? "",
    };
  });
}
