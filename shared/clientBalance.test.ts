import { describe, expect, it } from "vitest";
import { clientPrimaryTotal, clientPaymentPosition } from "./clientBalance";

describe("client balance totals", () => {
  it("uses the stored final total for an invoice due balance", () => {
    expect(clientPrimaryTotal({ price: "10.00", gstAmount: "1.80", gstMode: "exclusive", totalPrice: "12.00" })).toBe(12);
    expect(clientPaymentPosition({ price: "10.00", gstAmount: "1.80", gstMode: "exclusive", totalPrice: "12.00" }, [], 5)).toEqual({ total: 12, paid: 5, due: 7, progress: 5 / 12 * 100 });
  });

  it("falls back to the calculated total when no stored total exists", () => {
    expect(clientPrimaryTotal({ price: "10.00", gstAmount: "1.80", gstMode: "exclusive", totalPrice: "0.00" })).toBeCloseTo(11.8, 2);
  });
});
