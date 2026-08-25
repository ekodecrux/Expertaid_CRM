import { describe, expect, it } from "vitest";
import { buildClientPaymentItems, calculateClientPaymentAging, calculateDashboardBusinessValue, dashboardChartStartYear, filterReceiptsForDashboardSession } from "./dashboardPaymentAging";

describe("client payment dashboard aging", () => {
  it("uses the current calendar year for All sessions chart buckets", () => {
    expect(dashboardChartStartYear("all", "2027-2028", new Date("2026-08-25T00:00:00.000Z"))).toBe(2026);
    expect(dashboardChartStartYear("single", "2027-2028", new Date("2026-08-25T00:00:00.000Z"))).toBe(2027);
  });
  it("counts an approved renewal as new business for the same client", () => {
    expect(calculateDashboardBusinessValue(
      [{ clientId: "ERP261", totalPrice: "7000.00" }],
      [
        { clientId: "ERP261", status: "Approved", totalPrice: "7000.00" },
        { clientId: "ERP261", status: "Approved", renewalOfAgreementId: 10, totalPrice: "7000.00" },
      ],
    )).toBe(14000);
  });
  it("filters Receipts KPI to the selected session clients", () => {
    expect(filterReceiptsForDashboardSession([
      { clientId: "ERP261", status: "Issued", amount: "7000" },
      { clientId: "FEATURE01", status: "Issued", amount: "3000" },
      { clientId: "ERP261", status: "Cancelled", amount: "2000" },
    ], new Set(["FEATURE01"]))).toEqual([{ clientId: "FEATURE01", status: "Issued", amount: "3000" }]);
  });

  it("calculates today and monthly collections from actual receipt dates regardless of session", async () => {
    const { calculateCurrentDateCollections } = await import("./dashboardPaymentAging");
    expect(calculateCurrentDateCollections([
      { status: "Paid", paymentDate: "2026-08-25", amount: "7000.00" },
      { status: "Paid", paymentDate: "2026-08-10", amount: "3000.00" },
      { status: "Paid", paymentDate: "2026-07-31", amount: "2000.00" },
      { status: "Cancelled", paymentDate: "2026-08-25", amount: "5000.00" },
    ], new Date("2026-08-25T12:00:00.000Z"))).toEqual({ today: 7000, month: 10000 });
  });

  it("falls back to the renewed primary assignment when no terms are saved", () => {
    const items = buildClientPaymentItems(
      [{ clientId: "ERP261", clientName: "Expertaid Test School", totalPrice: "7080.00", endDate: "2027-08-25" }],
      [],
      [],
      [],
    );
    expect(items).toEqual([{ clientId: "ERP261", clientName: "Expertaid Test School", dueDate: "2027-08-25", amount: 7080, source: "plan" }]);
  });

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

  it("does not apply prior-cycle receipts to a renewed plan", () => {
    const items = buildClientPaymentItems(
      [{ clientId: "EXP26004", clientName: "Renewed School", startDate: "2026-08-25", paymentTrackingStartedAt: "2026-08-25T12:00:00.000Z" }],
      [],
      [{ id: 3, clientId: "EXP26004", terms: [{ dueDate: "2026-09-01", amount: "1000.00" }, { dueDate: "2026-10-01", amount: "1000.00" }] }],
      [
        { clientId: "EXP26004", status: "Paid", createdAt: "2026-08-25T11:59:59.000Z", paymentDate: "2026-08-25", amount: "2000.00" },
        { clientId: "EXP26004", status: "Paid", createdAt: "2026-08-25T12:00:00.000Z", paymentDate: "2026-08-25", amount: "100.00" },
      ],
    );
    expect(items.map((item) => item.amount)).toEqual([900, 1000]);
  });

  it("removes paid plan installments and keeps only remaining balances", () => {
    const items = buildClientPaymentItems(
      [{ clientId: "EXP26003", clientName: "Expertaid Test School" }],
      [],
      [{ id: 2, clientId: "EXP26003", terms: [
        { dueDate: "2026-08-26", amount: "3540.00" },
        { dueDate: "2027-09-22", amount: "3540.00" },
        { dueDate: "2027-10-21", amount: "3540.00" },
      ] }],
      [{ clientId: "EXP26003", status: "Paid", amount: "5310.00" }],
    );
    const result = calculateClientPaymentAging(items, new Date("2026-08-25T00:00:00Z"));
    expect(result.dueClientPayments.map((item) => item.amount)).toEqual([1770, 3540]);
    expect(result.dueTotal).toBe(5310);
    expect(result.dueClientPayments.every((item) => item.amount > 0)).toBe(true);
  });
});
