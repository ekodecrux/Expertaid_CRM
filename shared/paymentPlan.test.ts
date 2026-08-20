import { describe, expect, it } from "vitest";
import { calculateRemainingPayment, calculateScheduleDifference, distributeRemainingPayment } from "./paymentPlan";

describe("payment plan utilities", () => {
  it("calculates the remaining balance after an initial payment", () => {
    expect(calculateRemainingPayment(11800, 5000)).toBe(6800);
    expect(calculateRemainingPayment(1000, 1400)).toBe(0);
  });

  it("distributes the remaining balance across terms without losing paise", () => {
    const terms = [{ label: "Term 1", dueDate: "2026-09-01", amount: "0" }, { label: "Term 2", dueDate: "2026-10-01", amount: "0" }, { label: "Term 3", dueDate: "2026-11-01", amount: "0" }];
    const distributed = distributeRemainingPayment(terms, 1000);
    expect(distributed.map((term) => term.amount)).toEqual(["333.33", "333.33", "333.34"]);
    expect(calculateScheduleDifference(distributed, 1000)).toBeCloseTo(0, 8);
  });
});
