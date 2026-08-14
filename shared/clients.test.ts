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

  it("marks clients active through their end date and inactive afterward", () => {
    expect(getClientLifecycleStatus("2026-08-14", "2026-08-14")).toBe("Active");
    expect(getClientLifecycleStatus("2026-08-13", "2026-08-14")).toBe("Inactive");
  });
});
