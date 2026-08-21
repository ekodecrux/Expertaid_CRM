import { describe, expect, it } from "vitest";
import { clientPaymentTotals } from "./clientPaymentTotals";

describe("client payment totals", () => {
  it("uses the stored GST-inclusive total as the grand total", () => {
    expect(clientPaymentTotals({ totalPrice: "6800.00", paidAmount: "1000.00" })).toEqual({ grandTotal: 6800, paid: 1000, pending: 5800 });
  });

  it("does not allow paid or pending values to exceed the inclusive grand total", () => {
    expect(clientPaymentTotals({ totalPrice: "6800.00", paidAmount: "8000.00" })).toEqual({ grandTotal: 6800, paid: 6800, pending: 0 });
  });
});
