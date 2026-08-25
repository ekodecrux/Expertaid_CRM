import { describe, expect, it } from "vitest";
import { buildClientReceiptPrefillItems, clientPendingAmount } from "./billingPrefill";

describe("client pending amount prefill", () => {
  it("rounds a tax-converted balance back to the displayed whole-rupee pending amount", () => {
    expect(clientPendingAmount("11.80", "5.00")).toBe(7);
    expect(clientPendingAmount("12.00", "5.00")).toBe(7);
  });

  it("never produces a negative pending amount", () => {
    expect(clientPendingAmount("5.00", "7.00")).toBe(0);
  });

  it("prefers saved client installments over generic receipt defaults", () => {
    expect(buildClientReceiptPrefillItems({
      terms: [
        { label: "Installment 1", dueDate: "2027-08-26", amount: "3540.00" },
        { label: "Installment 2", dueDate: "2027-09-22", amount: "3540.00" },
      ],
      products: [{ id: 4, productName: "Biometric", totalAmount: "4000.00", paidAmount: "1000.00" }],
    })).toMatchObject([
      { itemName: "Installment 1", unitPrice: "3540", collectionAmount: "3540" },
      { itemName: "Installment 2", unitPrice: "3540", collectionAmount: "3540" },
      { itemName: "Biometric", productId: 4, unitPrice: "3000", collectionAmount: "3000" },
    ]);
  });

  it("keeps paid installments visible as reference lines and marks only them as paid", () => {
    expect(buildClientReceiptPrefillItems({
      terms: [
        { label: "Installment 1", dueDate: "2026-08-26", amount: "3540" },
        { label: "Installment 2", dueDate: "2027-09-22", amount: "3540" },
      ],
      paidAmount: 3540,
    })).toMatchObject([
      { itemName: "Installment 1", unitPrice: "3540", isPaid: true },
      { itemName: "Installment 2", unitPrice: "3540", isPaid: false },
    ]);
  });

  it("returns an empty line instead of defaults when a selected client has no open payment data", () => {
    expect(buildClientReceiptPrefillItems({ terms: [], products: [], primary: null })).toEqual([]);
  });
});
