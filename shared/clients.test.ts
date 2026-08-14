import { describe, expect, it } from "vitest";
import { filterApprovedClients } from "./clients";

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
});
