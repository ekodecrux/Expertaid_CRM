import { describe, expect, it } from "vitest";
import { buildCollectionReportRows, buildDueReportRows, inCollectionPeriod, matchesSession, paginateReportRows } from "./reporting";

describe("reporting helpers", () => {
  it("paginates report rows with continuous serial offsets", () => {
    const result = paginateReportRows(["one", "two", "three", "four", "five"], 2, 2);
    expect(result.pageRows).toEqual(["three", "four"]);
    expect(result.page).toBe(2);
    expect(result.pageCount).toBe(3);
    expect(result.serialOffset).toBe(2);
  });
  it("supports current, custom, and all session scopes", () => {
    expect(matchesSession("2026-2027", "current", "2026-2027", [])).toBe(true);
    expect(matchesSession("2025-2026", "current", "2026-2027", [])).toBe(false);
    expect(matchesSession("2025-2026", "custom", "2026-2027", ["2025-2026"])).toBe(true);
    expect(matchesSession("2025-2026", "all", "2026-2027", [])).toBe(true);
  });
  it("matches daily, monthly, and range collection periods", () => {
    const today = new Date("2026-08-24T12:00:00Z");
    expect(inCollectionPeriod("2026-08-24", "daily", today)).toBe(true);
    expect(inCollectionPeriod("2026-08-23", "daily", today)).toBe(false);
    expect(inCollectionPeriod("2026-08-01", "monthly", today)).toBe(true);
    expect(inCollectionPeriod("2026-07-31", "monthly", today)).toBe(false);
    expect(inCollectionPeriod("2026-08-10", "range", today, "2026-08-01", "2026-08-15")).toBe(true);
  });
  it("supports single, multiple, and all month scopes", () => {
    const today = new Date("2026-08-24T12:00:00Z");
    expect(inCollectionPeriod("2026-08-12", "monthly", today, undefined, undefined, "single", ["2026-08"])).toBe(true);
    expect(inCollectionPeriod("2026-07-12", "monthly", today, undefined, undefined, "single", ["2026-08"])).toBe(false);
    expect(inCollectionPeriod("2026-07-12", "monthly", today, undefined, undefined, "multiple", ["2026-07", "2026-08"])).toBe(true);
    expect(inCollectionPeriod("2026-06-12", "monthly", today, undefined, undefined, "multiple", ["2026-07", "2026-08"])).toBe(false);
    expect(inCollectionPeriod("2026-06-12", "monthly", today, undefined, undefined, "all", [])).toBe(true);
  });
  it("builds session-filtered collection rows", () => {
    const rows = buildCollectionReportRows([{ receiptNumber: "RCT1", clientId: "ERP1", clientName: "One", paymentDate: "2026-08-24", amount: "7", status: "Issued" }], [{ clientId: "ERP1", clientName: "One", session: "2026-2027" }], { period: "daily", scope: "current", currentSession: "2026-2027", selectedSessions: [], today: new Date("2026-08-24T12:00:00Z") });
    expect(rows).toHaveLength(1);
    expect(rows[0].amount).toBe(7);
  });
  it("retains complete payment details for collection reports", () => {
    const rows = buildCollectionReportRows([{ receiptNumber: "RCT2", clientId: "ERP2", clientName: "Two", paymentDate: "2026-08-24", amount: "100", grandTotal: "100", subtotal: "84.75", gstRate: "18", gstAmount: "15.25", gstMode: "inclusive", paymentMode: "UPI", transactionReference: "TXN-42", receivedFor: "ERP Primary", status: "Issued" }], [{ clientId: "ERP2", clientName: "Two", projectName: "ERP", projectId: 3, session: "2026-2027" }], { period: "daily", scope: "current", currentSession: "2026-2027", selectedSessions: [], today: new Date("2026-08-24T12:00:00Z") });
    expect(rows[0]).toMatchObject({ project: "ERP", paymentMode: "UPI", transactionId: "TXN-42", receivedFor: "ERP Primary", gstMode: "inclusive", gstRate: 18, subtotal: 84.75, gstAmount: 15.25, grandTotal: 100 });
  });
  it("keeps an exclusive receipt's stored zero-tax amount distinct from inclusive totals", () => {
    const rows = buildCollectionReportRows([{ receiptNumber: "RCT3", clientId: "ERP3", clientName: "Three", paymentDate: "2026-08-24", amount: "1000", grandTotal: "1000", subtotal: "1000", gstRate: "0", gstAmount: "0", gstMode: "exclusive", status: "Issued" }], [{ clientId: "ERP3", clientName: "Three", session: "2026-2027" }], { period: "daily", scope: "current", currentSession: "2026-2027", selectedSessions: [], today: new Date("2026-08-24T12:00:00Z") });
    expect(rows[0]).toMatchObject({ gstMode: "exclusive", gstRate: 0, subtotal: 1000, gstAmount: 0, amount: 1000, grandTotal: 1000 });
  });
  it("reconciles a product collection saved without GST using the client product tax settings", () => {
    const rows = buildCollectionReportRows([{ receiptNumber: "RCT4", clientId: "ERP4", clientName: "Four", paymentDate: "2026-08-24", amount: "1000", grandTotal: "1000", subtotal: "1000", gstRate: "0", gstAmount: "0", gstMode: "exclusive", receivedFor: "Biometric", itemsJson: JSON.stringify([{ itemName: "Biometric", productId: 901, quantity: 1, unitPrice: 1000 }]), status: "Issued" }], [{ clientId: "ERP4", clientName: "Four", session: "2026-2027" }], { period: "daily", scope: "current", currentSession: "2026-2027", selectedSessions: [], today: new Date("2026-08-24T12:00:00Z") }, [{ id: 901, clientId: "ERP4", productName: "Biometric", gstRate: "18", gstMode: "exclusive" }]);
    expect(rows[0]).toMatchObject({ gstMode: "exclusive", gstRate: 18, subtotal: 1000, gstAmount: 180, amount: 1180, grandTotal: 1180 });
  });
  it("keeps prior-cycle receipts from reducing a renewed client in due and collection reports", () => {
    const client = { id: 1, clientId: "ERP261", clientName: "Expertaid Test School", session: "2026-2027", startDate: "2026-08-25", paymentTrackingStartedAt: "2026-08-25T08:00:00.000Z", totalPrice: "7080" };
    const receipts = [
      { receiptNumber: "OLD", clientId: "ERP261", paymentDate: "2026-08-25", createdAt: "2026-08-25T07:00:00.000Z", amount: "7080", status: "Issued" },
      { receiptNumber: "NEW", clientId: "ERP261", paymentDate: "2026-08-25", createdAt: "2026-08-25T09:00:00.000Z", amount: "1000", status: "Issued" },
    ];
    const options = { scope: "current" as const, currentSession: "2026-2027", selectedSessions: [] };
    expect(buildDueReportRows([client], receipts, options)[0].due).toBe(6080);
    expect(buildCollectionReportRows(receipts, [client], { ...options, period: "daily" as const, today: new Date("2026-08-25T12:00:00.000Z") }).map((row) => row.receiptNumber)).toEqual(["NEW"]);
  });

  it("returns only clients with an outstanding due balance", () => {
    const rows = buildDueReportRows([{ id: 1, clientId: "ERP1", clientName: "One", session: "2026-2027", totalPrice: "100" }, { id: 2, clientId: "ERP2", clientName: "Two", session: "2026-2027", totalPrice: "50" }], [{ clientId: "ERP1", amount: "40", status: "Issued" }, { clientId: "ERP2", amount: "50", status: "Cancelled" }], { scope: "current", currentSession: "2026-2027", selectedSessions: [] });
    expect(rows.map((row) => row.due)).toEqual([60, 50]);
  });
});
