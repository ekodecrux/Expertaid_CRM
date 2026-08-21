import { describe, expect, it } from "vitest";
import { mergeUpcomingPaymentItems } from "./paymentHistory";

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
});
