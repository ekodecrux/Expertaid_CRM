import { describe, expect, it } from "vitest";
import { currentCycleInvoices, currentCycleProducts, currentCycleReceipts } from "./paymentTracking";

describe("payment tracking cycle boundaries", () => {
  const boundary = "2026-08-25T12:00:00.000Z";

  it("excludes previous receipts even when their business payment date is backdated", () => {
    const result = currentCycleReceipts([
      { createdAt: "2026-08-25T11:59:59.000Z", paymentDate: "2026-08-26", amount: "100" },
      { createdAt: "2026-08-25T12:00:00.000Z", paymentDate: "2026-08-20", amount: "200" },
    ], boundary, "2026-08-01");
    expect(result.map((row) => row.amount)).toEqual(["200"]);
  });

  it("keeps only current-cycle invoices and products when a renewal boundary exists", () => {
    expect(currentCycleInvoices([
      { createdAt: "2026-08-25T11:00:00.000Z", invoiceDate: "2026-08-26" },
      { createdAt: "2026-08-25T12:00:00.000Z", invoiceDate: "2026-08-20" },
    ], boundary, "2026-08-01")).toHaveLength(1);
    expect(currentCycleProducts([
      { createdAt: "2026-08-25T11:00:00.000Z" },
      { createdAt: "2026-08-25T12:00:00.000Z" },
    ], boundary)).toHaveLength(1);
  });

  it("preserves legacy start-date behavior when no renewal boundary is stored", () => {
    expect(currentCycleReceipts([
      { paymentDate: "2026-07-31" },
      { paymentDate: "2026-08-01" },
    ], null, "2026-08-01")).toHaveLength(1);
  });
});
