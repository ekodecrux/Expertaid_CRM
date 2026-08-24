import { describe, expect, it } from "vitest";
import { buildCollectionReportRows, buildDueReportRows, inCollectionPeriod, matchesSession } from "./reporting";

describe("reporting helpers", () => {
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
  it("builds session-filtered collection rows", () => {
    const rows = buildCollectionReportRows([{ receiptNumber: "RCT1", clientId: "ERP1", clientName: "One", paymentDate: "2026-08-24", amount: "7", status: "Issued" }], [{ clientId: "ERP1", clientName: "One", session: "2026-2027" }], { period: "daily", scope: "current", currentSession: "2026-2027", selectedSessions: [], today: new Date("2026-08-24T12:00:00Z") });
    expect(rows).toHaveLength(1);
    expect(rows[0].amount).toBe(7);
  });
  it("retains complete payment details for collection reports", () => {
    const rows = buildCollectionReportRows([{ receiptNumber: "RCT2", clientId: "ERP2", clientName: "Two", paymentDate: "2026-08-24", amount: "100", grandTotal: "100", subtotal: "84.75", gstAmount: "15.25", gstMode: "inclusive", paymentMode: "UPI", transactionReference: "TXN-42", receivedFor: "ERP Primary", status: "Issued" }], [{ clientId: "ERP2", clientName: "Two", projectName: "ERP", projectId: 3, session: "2026-2027" }], { period: "daily", scope: "current", currentSession: "2026-2027", selectedSessions: [], today: new Date("2026-08-24T12:00:00Z") });
    expect(rows[0]).toMatchObject({ project: "ERP", paymentMode: "UPI", transactionId: "TXN-42", receivedFor: "ERP Primary", gstMode: "inclusive", subtotal: 84.75, gstAmount: 15.25, grandTotal: 100 });
  });
  it("returns only clients with an outstanding due balance", () => {
    const rows = buildDueReportRows([{ id: 1, clientId: "ERP1", clientName: "One", session: "2026-2027", totalPrice: "100" }, { id: 2, clientId: "ERP2", clientName: "Two", session: "2026-2027", totalPrice: "50" }], [{ clientId: "ERP1", amount: "40", status: "Issued" }, { clientId: "ERP2", amount: "50", status: "Cancelled" }], { scope: "current", currentSession: "2026-2027", selectedSessions: [] });
    expect(rows.map((row) => row.due)).toEqual([60, 50]);
  });
});
