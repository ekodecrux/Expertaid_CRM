import { describe, expect, it } from "vitest";
import { invoiceReceiptValues } from "./invoiceReceiptTotals";

describe("invoice receipt values", () => {
  it("preserves stored invoice totals instead of recalculating from client totals", () => {
    expect(invoiceReceiptValues({ subtotal: "10000.00", gstRate: "18.00", gstMode: "inclusive", gstAmount: "1525.42", grandTotal: "10000.00" }, { subtotal: "12000.00", gstRate: "18.00", gstMode: "exclusive", gstAmount: "2160.00", grandTotal: "14160.00" })).toEqual({ subtotal: "10000.00", gstRate: "18.00", gstMode: "inclusive", gstAmount: "1525.42", grandTotal: "10000.00" });
  });
});
