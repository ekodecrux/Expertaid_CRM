import { describe, expect, it } from "vitest";
import { taxFinancials } from "./taxFinancials";

describe("taxFinancials", () => {
  it("preserves stored exclusive plan subtotal, GST, and total", () => {
    expect(taxFinancials({ subtotal: "6000.00", gstRate: "18.00", gstMode: "exclusive", gstAmount: "1080.00", totalAmount: "7080.00" })).toEqual({
      subtotal: 6000,
      gstRate: 18,
      gstMode: "exclusive",
      gstAmount: 1080,
      totalAmount: 7080,
    });
  });

  it("derives inclusive GST from a tax-inclusive receipt item total", () => {
    expect(taxFinancials({ totalAmount: "3540.00", gstRate: "18.00", gstMode: "inclusive" })).toEqual({
      subtotal: 3000,
      gstRate: 18,
      gstMode: "inclusive",
      gstAmount: 540,
      totalAmount: 3540,
    });
  });
});
