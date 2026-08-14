import { describe, expect, it } from "vitest";
import { calculateQuotationTotals } from "./quotation";

describe("quotation totals", () => {
  it("calculates subtotal, GST, and grand total from product quantities", () => {
    expect(calculateQuotationTotals([
      { product: "ERP", itemName: "ERP Software", quantity: 1, unitPrice: 7000 },
      { product: "Biometric", itemName: "Biometric Device", quantity: 2, unitPrice: 2000 },
    ], 18)).toEqual({ subtotal: 11000, gstAmount: 1980, grandTotal: 12980 });
  });

  it("supports zero GST for tax-exempt quotations", () => {
    expect(calculateQuotationTotals([{ product: "WhatsApp", itemName: "WhatsApp", quantity: 3, unitPrice: 500 }], 0)).toEqual({ subtotal: 1500, gstAmount: 0, grandTotal: 1500 });
  });
});
