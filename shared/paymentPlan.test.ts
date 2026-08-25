import { describe, expect, it } from "vitest";
import { calculateRemainingPayment, calculateScheduleDifference, distributeRemainingPayment, filterOpenPaymentTerms, getPaymentTermStates } from "./paymentPlan";

describe("payment plan utilities", () => {
  it("calculates the remaining balance after an initial payment", () => {
    expect(calculateRemainingPayment(11800, 5000)).toBe(6800);
    expect(calculateRemainingPayment(1000, 1400)).toBe(0);
  });

  it("hides terms already covered by collected payments", () => {
    const terms = [{ label: "Term 1", dueDate: "2026-09-01", amount: "500" }, { label: "Term 2", dueDate: "2026-10-01", amount: "500" }, { label: "Term 3", dueDate: "2026-11-01", amount: "500" }];
    expect(filterOpenPaymentTerms(terms, 1000).map((term) => term.label)).toEqual(["Term 3"]);
    expect(filterOpenPaymentTerms(terms, 1500)).toEqual([]);
    expect(filterOpenPaymentTerms(terms, 250)).toEqual(terms);
  });

  it("distributes the remaining balance across terms without losing paise", () => {
    const terms = [{ label: "Term 1", dueDate: "2026-09-01", amount: "0" }, { label: "Term 2", dueDate: "2026-10-01", amount: "0" }, { label: "Term 3", dueDate: "2026-11-01", amount: "0" }];
    const distributed = distributeRemainingPayment(terms, 1000);
    expect(distributed.map((term) => term.amount)).toEqual(["333.33", "333.33", "333.34"]);
    expect(calculateScheduleDifference(distributed, 1000)).toBeCloseTo(0, 8);
  });

  it("marks fully covered installments as paid and locked", () => {
    const states = getPaymentTermStates([
      { label: "Installment 1", dueDate: "2026-08-26", amount: "3540" },
      { label: "Installment 2", dueDate: "2027-09-22", amount: "3540" },
      { label: "Installment 3", dueDate: "2027-10-21", amount: "0" },
    ], 3540);
    expect(states.map((term) => term.isPaid)).toEqual([true, false, false]);
  });

  it("preserves a paid installment while distributing only the remaining unpaid balance", () => {
    const terms = [
      { label: "Installment 1", dueDate: "2026-08-26", amount: "3540" },
      { label: "Installment 2", dueDate: "2027-09-22", amount: "3540" },
      { label: "Installment 3", dueDate: "2027-10-21", amount: "0" },
    ];
    const distributed = distributeRemainingPayment(terms, 7080, 3540);
    expect(distributed.map((term) => term.amount)).toEqual(["3540", "1770.00", "1770.00"]);
  });
});
