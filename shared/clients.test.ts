import { describe, expect, it } from "vitest";
import { filterApprovedClients, getClientLifecycleStatus } from "./clients";

describe("approved client filtering", () => {
  it("returns only approved agreements", () => {
    const agreements = [
      { id: 1, status: "Pending" },
      { id: 2, status: "Approved" },
      { id: 3, status: "Rejected" },
      { id: 4, status: "Approved" },
    ];

    expect(filterApprovedClients(agreements)).toEqual([
      { id: 2, status: "Approved" },
      { id: 4, status: "Approved" },
    ]);
  });

  it("marks clients active, ready to expire within five days, and expired after the end date", () => {
    expect(getClientLifecycleStatus("2026-09-01", "2026-08-14")).toBe("Active");
    expect(getClientLifecycleStatus("2026-08-19", "2026-08-14")).toBe("Ready to Expire");
    expect(getClientLifecycleStatus("2026-08-14", "2026-08-14")).toBe("Ready to Expire");
    expect(getClientLifecycleStatus("2026-08-13", "2026-08-14")).toBe("Expired");
  });
});
