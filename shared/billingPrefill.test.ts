import { describe, expect, it } from "vitest";
import { clientPendingAmount } from "./billingPrefill";

describe("client pending amount prefill", () => {
  it("rounds a tax-converted balance back to the displayed whole-rupee pending amount", () => {
    expect(clientPendingAmount("11.80", "5.00")).toBe(7);
    expect(clientPendingAmount("12.00", "5.00")).toBe(7);
  });

  it("never produces a negative pending amount", () => {
    expect(clientPendingAmount("5.00", "7.00")).toBe(0);
  });
});
