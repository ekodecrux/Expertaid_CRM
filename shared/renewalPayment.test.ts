import { describe, expect, it } from "vitest";
import { isPaymentClearedForRenewal, renewalPaymentDue } from "./renewalPayment";

describe("renewal payment gate", () => {
  it("calculates the outstanding balance", () => {
    expect(renewalPaymentDue("11800.00", "5000.00")).toBe(6800);
  });

  it("allows a fully paid plan with a small rounding remainder", () => {
    expect(isPaymentClearedForRenewal(11800, 11800)).toBe(true);
    expect(isPaymentClearedForRenewal(11800, 11799.997)).toBe(true);
  });

  it("blocks renewal when a meaningful balance remains", () => {
    expect(isPaymentClearedForRenewal(11800, 11799)).toBe(false);
  });
});
