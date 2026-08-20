import { describe, expect, it } from "vitest";
import { filterApprovedClients, filterProjectClients, getClientLifecycleStatus } from "./clients";

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

  it("filters billing clients by project and searches Client ID or client name", () => {
    const clients = [
      { projectId: 1, clientId: "ERP26001", clientName: "Nirmala High School" },
      { projectId: 1, clientId: "ERP26002", clientName: "Another School" },
      { projectId: 2, clientId: "EMP26001", clientName: "Acme Ltd" },
    ];
    expect(filterProjectClients(clients, 1).map((client) => client.clientId)).toEqual(["ERP26001", "ERP26002"]);
    expect(filterProjectClients(clients, 1, "erp26002").map((client) => client.clientName)).toEqual(["Another School"]);
    expect(filterProjectClients(clients, 2, "acme").map((client) => client.clientId)).toEqual(["EMP26001"]);
  });

  it("marks clients active, ready to expire within five days, and expired after the end date", () => {
    expect(getClientLifecycleStatus("2026-09-01", "2026-08-14")).toBe("Active");
    expect(getClientLifecycleStatus("2026-08-19", "2026-08-14")).toBe("Ready to Expire");
    expect(getClientLifecycleStatus("2026-08-14", "2026-08-14")).toBe("Ready to Expire");
    expect(getClientLifecycleStatus("2026-08-13", "2026-08-14")).toBe("Expired");
  });
});
