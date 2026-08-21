import { describe, expect, it } from "vitest";
import { calculateInvoiceSummaryGst } from "./invoiceSummary";

describe("calculateInvoiceSummaryGst", () => {
  it("adds primary GST and exclusive additional-product GST", () => {
    expect(calculateInvoiceSummaryGst("1800", [
      { totalAmount: "11800", gstAmount: "1800", gstRate: "18", gstMode: "exclusive" },
    ])).toBeCloseTo(3600, 2);
  });

  it("extracts GST from inclusive additional-product totals", () => {
    expect(calculateInvoiceSummaryGst(1800, [
      { totalAmount: 1180, gstRate: 18, gstMode: "inclusive" },
    ])).toBeCloseTo(1980, 2);
  });
});
