import { describe, expect, it } from "vitest";
import { clientPaymentTotals, sumReceiptCollections } from "./clientPaymentTotals";

describe("client payment totals", () => {
  it("uses the stored GST-inclusive total as the grand total", () => {
    expect(clientPaymentTotals({ totalPrice: "6800.00", paidAmount: "1000.00" })).toEqual({ grandTotal: 6800, paid: 1000, pending: 5800 });
  });

  it("does not allow paid or pending values to exceed the inclusive grand total", () => {
    expect(clientPaymentTotals({ totalPrice: "6800.00", paidAmount: "8000.00" })).toEqual({ grandTotal: 6800, paid: 6800, pending: 0 });
  });

  it("counts only non-cancelled receipt amounts as collections", () => {
    expect(sumReceiptCollections([
      { amount: "1000.00", status: "Issued" },
      { grandTotal: "2500.00", status: "Cancelled" },
    ])).toBe(1000);
  });

  it("leaves an invoice amount pending until a receipt is issued", () => {
    const assigned = clientPaymentTotals({ totalPrice: "3500.00", paidAmount: 0 });
    expect(assigned).toEqual({ grandTotal: 3500, paid: 0, pending: 3500 });
    expect(sumReceiptCollections([])).toBe(0);
  });
});
