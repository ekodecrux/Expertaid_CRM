import { describe, expect, it } from "vitest";
import { matchesClientId, matchesClientSearch } from "./clientSearch";

describe("client search matching", () => {
  it("matches saved numeric and string Client IDs for edit hydration", () => {
    expect(matchesClientId(26003, "26003")).toBe(true);
    expect(matchesClientId("ERP26003", "ERP26003")).toBe(true);
    expect(matchesClientId("ERP26003", "ERP26004")).toBe(false);
  });

  const client = {
    clientId: "ERP26003",
    clientName: "Add client ERP",
    clientOwnerName: "Principal Owner",
    email: "client@example.com",
    contactNumber: "2472047247",
  };

  it("matches Client ID case-insensitively", () => {
    expect(matchesClientSearch(client, "erp26003")).toBe(true);
  });

  it("matches the other searchable client fields", () => {
    expect(matchesClientSearch(client, "add client")).toBe(true);
    expect(matchesClientSearch(client, "CLIENT@EXAMPLE.COM")).toBe(true);
    expect(matchesClientSearch(client, "2472047")).toBe(true);
  });

  it("does not match unrelated values", () => {
    expect(matchesClientSearch(client, "ERP99999")).toBe(false);
  });
});
