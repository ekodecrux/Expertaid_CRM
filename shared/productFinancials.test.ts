import { describe, expect, it } from "vitest";
import { productFinancials } from "./productFinancials";

describe("productFinancials", () => {
  it("keeps an exclusive product subtotal as the pre-GST amount", () => {
    expect(productFinancials({ subtotal: "10000.00", gstAmount: "1800.00", totalAmount: "11800.00", gstMode: "exclusive" })).toEqual({
      amountBeforeGst: 10000,
      gstAmount: 1800,
      totalAmount: 11800,
    });
  });

  it("removes GST from an inclusive subtotal for the pre-GST amount", () => {
    expect(productFinancials({ subtotal: "11800.00", gstAmount: "1800.00", totalAmount: "11800.00", gstMode: "inclusive" })).toEqual({
      amountBeforeGst: 10000,
      gstAmount: 1800,
      totalAmount: 11800,
    });
  });
});
