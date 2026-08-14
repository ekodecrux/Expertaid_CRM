import { describe, expect, it } from "vitest";
import { formatSessionRange, isValidSessionDateRange } from "./session";

describe("session date ranges", () => {
  it("accepts a date range whose end is after its start", () => {
    expect(isValidSessionDateRange("2026-04-01", "2027-03-31")).toBe(true);
  });

  it("rejects missing, same-day, and reversed ranges", () => {
    expect(isValidSessionDateRange("", "2027-03-31")).toBe(false);
    expect(isValidSessionDateRange("2027-03-31", "2027-03-31")).toBe(false);
    expect(isValidSessionDateRange("2027-03-31", "2026-04-01")).toBe(false);
  });

  it("formats the configured range", () => {
    expect(formatSessionRange("2026-04-01", "2027-03-31")).toBe("2026-04-01 – 2027-03-31");
  });
});
