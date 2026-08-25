import { describe, expect, it } from "vitest";
import { buildGlobalClientSearchDetails, findGlobalClientSearchMatches } from "./globalClientSearch";

describe("global client search", () => {
  const client = {
    id: 200,
    clientId: "ERP261",
    clientName: "Expertaid Test School",
    clientOwnerName: "Principal",
    email: "school@example.com",
    contactNumber: "9876543210",
    session: "2026-2027",
    startDate: "2026-08-25",
    endDate: "2027-08-25",
    totalPrice: "7080.00",
    paymentTrackingStartedAt: "2026-08-25T10:00:00.000Z",
  };

  it("matches client identifiers, names, and related payment references", () => {
    expect(findGlobalClientSearchMatches("ERP261", [client])).toHaveLength(1);
    expect(findGlobalClientSearchMatches("expertaid test", [client])).toHaveLength(1);
    expect(findGlobalClientSearchMatches("receipt-previous", [client], [], [], [{ clientId: "ERP261", receiptNumber: "receipt-previous" }])).toHaveLength(1);
    expect(findGlobalClientSearchMatches("unknown", [client])).toHaveLength(0);
  });

  it("separates active-cycle payments from historical payments and exposes plan history", () => {
    const match = findGlobalClientSearchMatches("ERP261", [client], [
      { id: 20, clientId: "ERP261", status: "Approved", session: "2026-2027", startDate: "2026-08-25", endDate: "2027-08-25", totalPrice: "7080.00", createdAt: "2026-08-25T10:01:00.000Z" },
      { id: 19, clientId: "ERP261", status: "Approved", session: "2025-2026", startDate: "2025-08-25", endDate: "2026-08-24", totalPrice: "7080.00", createdAt: "2025-08-25T10:01:00.000Z" },
    ], [], [
      { clientId: "ERP261", receiptNumber: "R-NEW", amount: "1000", paymentDate: "2026-08-26", createdAt: "2026-08-26T10:00:00.000Z" },
      { clientId: "ERP261", receiptNumber: "R-OLD", amount: "7080", paymentDate: "2026-08-20", createdAt: "2026-08-20T10:00:00.000Z" },
    ]);
    expect(match).toHaveLength(1);
    const details = buildGlobalClientSearchDetails(match[0], [], []);
    expect(details.currentAgreement?.id).toBe(20);
    expect(details.historicalAgreements.map((row) => row.id)).toEqual([19]);
    expect(details.currentReceipts.map((row) => row.receiptNumber)).toEqual(["R-NEW"]);
    expect(details.historicalReceipts.map((row) => row.receiptNumber)).toEqual(["R-OLD"]);
    expect(details.paid).toBe(1000);
    expect(details.due).toBe(6080);
  });
});
