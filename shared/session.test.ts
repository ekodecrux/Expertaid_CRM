import { describe, expect, it } from "vitest";
import { formatSessionRange, isValidSessionDateRange, resolveSessionFilter, sortSessionsNewestFirst } from "./session";

describe("session date ranges", () => {
  it("accepts a date range whose end is after its start", () => {
    expect(isValidSessionDateRange("2026-04-01", "2027-03-31")).toBe(true);
  });

  it("rejects missing, same-day, and reversed ranges", () => {
    expect(isValidSessionDateRange("", "2027-03-31")).toBe(false);
    expect(isValidSessionDateRange("2027-03-31", "2027-03-31")).toBe(false);
    expect(isValidSessionDateRange("2027-03-31", "2026-04-01")).toBe(false);
  });

  it("resolves All sessions and selected sessions from global settings", () => {
    expect(resolveSessionFilter({ sessionMode: "all", currentSession: "2027-2028" })).toBe("all");
    expect(resolveSessionFilter({ sessionMode: "single", currentSession: "2027-2028" })).toBe("2027-2028");
    expect(resolveSessionFilter(undefined)).toBe("2026-2027");
  });

  it("sorts sessions newest first", () => {
    expect(sortSessionsNewestFirst([
      { sessionLabel: "2026-2027", startDate: "2026-04-01" },
      { sessionLabel: "2028-2029", startDate: "2028-04-01" },
      { sessionLabel: "2027-2028", startDate: "2027-04-01" },
    ]).map((session) => session.sessionLabel)).toEqual(["2028-2029", "2027-2028", "2026-2027"]);
  });

  it("formats the configured range", () => {
    expect(formatSessionRange("2026-04-01", "2027-03-31")).toBe("2026-04-01 – 2027-03-31");
  });
});
