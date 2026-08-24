import { describe, expect, it } from "vitest";
import { buildClientPaymentItems, calculateClientPaymentAging } from "./dashboardPaymentAging";

describe("client payment dashboard aging", () => {
  it("uses the unpaid balance of client products", () => {
    const items = buildClientPaymentItems(
      [{ clientId: "EXP26001", clientName: "Bright Future School" }],
      [{ clientId: "EXP26001", productName: "ERP", totalAmount: "1000.00", paidAmount: "250.00", dueDate: "2026-08-30" }],
      [],
    );
    const result = calculateClientPaymentAging(items, new Date("2026-08-24T00:00:00Z"));
    expect(result.dueClientPayments).toHaveLength(1);
    expect(result.dueTotal).toBe(750);
    expect(result.aging[1]).toMatchObject({ amount: 750, count: 1 });
  });

  it("falls back to the latest client payment-plan terms when products are absent", () => {
    const items = buildClientPaymentItems(
      [{ clientId: "EXP26002", clientName: "Green Valley School" }],
      [],
      [{ id: 1, clientId: "EXP26002", terms: [{ dueDate: "2026-08-10", amount: "400.00" }] }],
    );
    const result = calculateClientPaymentAging(items, new Date("2026-08-24T00:00:00Z"));
    expect(result.dueTotal).toBe(400);
    expect(result.aging[0]).toMatchObject({ amount: 400, count: 1 });
  });
});
