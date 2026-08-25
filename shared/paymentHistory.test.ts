import { describe, expect, it } from "vitest";
import { displayPlannedPaymentTerms, fallbackPlannedPaymentTerms, mergeUpcomingPaymentItems } from "./paymentHistory";

describe("mergeUpcomingPaymentItems", () => {
  it("includes saved planned terms alongside invoice due items in date order", () => {
    const result = mergeUpcomingPaymentItems(
      [{ id: 7, reference: "INV-7", date: "2026-09-15", amount: 5000, status: "Due" }],
      [{ label: "Installment 1", dueDate: "2026-08-30", amount: "10000" }],
    );

    expect(result).toEqual([
      { id: -1, reference: "Installment 1", date: "2026-08-30", amount: 10000, status: "Planned" },
      { id: 7, reference: "INV-7", date: "2026-09-15", amount: 5000, status: "Due" },
    ]);
  });

  it("does not create reminders for empty or zero-value terms", () => {
    expect(mergeUpcomingPaymentItems([], [
      { label: "Empty", dueDate: "2026-08-30", amount: 0 },
      { label: "No date", dueDate: "", amount: 1000 },
    ])).toEqual([]);
  });

  it("shows only the pending balance for planned installments", () => {
    const result = mergeUpcomingPaymentItems([], [
      { label: "Installment 1", dueDate: "2026-08-26", amount: 3540 },
      { label: "Installment 2", dueDate: "2027-09-22", amount: 3540 },
      { label: "Installment 3", dueDate: "2027-10-21", amount: 3540 },
    ], 5310);

    expect(result).toEqual([
      { id: -1, reference: "Installment 2", date: "2027-09-22", amount: 1770, status: "Planned" },
      { id: -2, reference: "Installment 3", date: "2027-10-21", amount: 3540, status: "Planned" },
    ]);
  });
});

describe("displayPlannedPaymentTerms", () => {
  it("reconstructs equal instalments from the remaining plan balance when saved terms are zero", () => {
    const terms = displayPlannedPaymentTerms({
      totalAmount: "23600.00",
      initialPayment: "1000.00",
      terms: [
        { label: "Installment 1", dueDate: "2026-09-01", amount: "0.00" },
        { label: "Installment 2", dueDate: "2026-10-01", amount: "0.00" },
        { label: "Installment 3", dueDate: "2026-11-01", amount: "0.00" },
      ],
    });

    expect(terms.map((term) => term.amount)).toEqual(["7533.33", "7533.33", "7533.34"]);
    expect(mergeUpcomingPaymentItems([], terms).map((item) => item.amount)).toEqual([7533.33, 7533.33, 7533.34]);
  });
});

describe("fallbackPlannedPaymentTerms", () => {
  it("shows the remaining balance on the client end date when no saved terms are returned", () => {
    expect(fallbackPlannedPaymentTerms({ totalAmount: 23600, paidAmount: 1000, dueDate: "2026-08-21" })).toEqual([
      { label: "Installment 1", dueDate: "2026-08-21", amount: "22600.00" },
    ]);
  });
});
