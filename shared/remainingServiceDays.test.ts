import { describe, expect, it } from "vitest";
import { remainingServiceDays, remainingServiceDuration, remainingServiceLabel } from "./remainingServiceDays";

describe("remaining service days", () => {
  it("counts calendar days remaining while a plan is active", () => {
    expect(remainingServiceDays("2026-08-19", "2028-08-17", "2026-08-24")).toBe(724);
    expect(remainingServiceDuration("2026-08-19", "2028-08-17", "2026-08-24")).toEqual({ years: 1, months: 11, days: 24 });
    expect(remainingServiceLabel("2026-08-19", "2028-08-17", "2026-08-24")).toBe("1Y 11M 24D");
  });
  it("formats a plan shorter than one year with months and days", () => {
    expect(remainingServiceLabel("2026-08-19", "2027-08-17", "2026-08-24")).toBe("11M 24D");
  });
  it("returns zero before a plan starts", () => {
    expect(remainingServiceDays("2026-08-19", "2027-08-17", "2026-08-18")).toBe(0);
    expect(remainingServiceLabel("2026-08-19", "2027-08-17", "2026-08-18")).toBe("0D");
  });
  it("returns zero on and after expiry", () => {
    expect(remainingServiceDays("2026-08-19", "2027-08-17", "2027-08-17")).toBe(0);
    expect(remainingServiceDays("2026-08-19", "2027-08-17", "2028-01-01")).toBe(0);
  });
});
