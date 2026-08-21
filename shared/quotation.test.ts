import { describe, expect, it } from "vitest";
import { calculateQuotationTotals, DEFAULT_QUOTATION_PRODUCTS, QUOTATION_STATUSES } from "./quotation";

describe("quotation totals", () => {
  it("calculates subtotal, GST, and grand total from product quantities", () => {
    expect(calculateQuotationTotals([
      { product: "ERP", itemName: "ERP Software", quantity: 1, unitPrice: 7000 },
      { product: "Biometric", itemName: "Biometric Device", quantity: 2, unitPrice: 2000 },
    ], 18)).toEqual({ subtotal: 11000, gstAmount: 1980, grandTotal: 12980 });
  });

  it("separates GST from an entered inclusive total", () => {
    const totals = calculateQuotationTotals([{ product: "ERP", itemName: "ERP Software", quantity: 1, unitPrice: 11000 }], 18, "inclusive");
    expect(totals).toEqual({ subtotal: 9322.033898305085, gstAmount: 1677.9661016949153, grandTotal: 11000 });
    expect(totals.subtotal + totals.gstAmount).toBeCloseTo(totals.grandTotal, 10);
  });

  it("calculates a 1000 inclusive additional-product collection as 847.46 taxable plus 152.54 GST", () => {
    expect(calculateQuotationTotals([{ product: "Biometric", itemName: "Biometric", quantity: 1, unitPrice: 1000 }], 18, "inclusive")).toEqual({ subtotal: 847.457627118644, gstAmount: 152.54237288135593, grandTotal: 1000 });
  });

  it("includes the three configurable default product categories", () => {
    expect(DEFAULT_QUOTATION_PRODUCTS.map((product) => product.product)).toEqual(["ERP", "Biometric", "WhatsApp"]);
  });

  it("supports zero GST for tax-exempt quotations", () => {
    expect(calculateQuotationTotals([{ product: "WhatsApp", itemName: "WhatsApp", quantity: 3, unitPrice: 500 }], 0)).toEqual({ subtotal: 1500, gstAmount: 0, grandTotal: 1500 });
  });

  it("exposes the supported quotation register statuses in workflow order", () => {
    expect(QUOTATION_STATUSES).toEqual(["Awaiting", "Success", "Closed"]);
  });
});
