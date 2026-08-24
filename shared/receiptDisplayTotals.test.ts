import { describe, expect, it } from "vitest";
import { receiptDisplayTotal } from "./receiptDisplayTotals";

describe("receipt display total", () => {
  it("shows the exact inclusive grand total", () => {
    expect(receiptDisplayTotal({ mode: "inclusive", subtotal: "5.93", grandTotal: "7.00", amount: "7.00" })).toBe(7);
  });
  it("shows the exclusive taxable subtotal", () => {
    expect(receiptDisplayTotal({ mode: "exclusive", subtotal: "7.00", grandTotal: "8.26", amount: "8.26" })).toBe(7);
  });
  it("keeps an ERP Primary inclusive reminder collection at ₹7", () => {
    expect(receiptDisplayTotal({ mode: "inclusive", subtotal: "5.93", grandTotal: "7.00", amount: "7.00" })).toBe(7);
    expect(receiptDisplayTotal({ mode: "inclusive", subtotal: "6.80", grandTotal: "8.02", amount: "7.00" })).toBe(8.02);
  });
});
