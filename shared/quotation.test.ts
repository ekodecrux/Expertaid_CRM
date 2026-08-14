import { describe, expect, it } from "vitest";
import { calculateQuotationTotals, DEFAULT_QUOTATION_PRODUCTS } from "./quotation";

describe("quotation totals", () => {
  it("calculates subtotal, GST, and grand total from product quantities", () => {
    expect(calculateQuotationTotals([
      { product: "ERP", itemName: "ERP Software", quantity: 1, unitPrice: 7000 },
      { product: "Biometric", itemName: "Biometric Device", quantity: 2, unitPrice: 2000 },
    ], 18)).toEqual({ subtotal: 11000, gstAmount: 1980, grandTotal: 12980 });
  });

  it("keeps subtotal unchanged when GST is inclusive", () => {
    expect(calculateQuotationTotals([{ product: "ERP", itemName: "ERP Software", quantity: 1, unitPrice: 11000 }], 18, "inclusive")).toEqual({ subtotal: 11000, gstAmount: 1677.9661016949153, grandTotal: 11000 });
  });

  it("includes the three configurable default product categories", () => {
    expect(DEFAULT_QUOTATION_PRODUCTS.map((product) => product.product)).toEqual(["ERP", "Biometric", "WhatsApp"]);
  });

  it("supports zero GST for tax-exempt quotations", () => {
    expect(calculateQuotationTotals([{ product: "WhatsApp", itemName: "WhatsApp", quantity: 3, unitPrice: 500 }], 0)).toEqual({ subtotal: 1500, gstAmount: 0, grandTotal: 1500 });
  });
});
