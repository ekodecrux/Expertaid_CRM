import { describe, expect, it } from "vitest";
import { remainingServiceDays, remainingServiceLabel } from "./remainingServiceDays";

describe("remaining service days", () => {
  it("counts calendar days remaining while a plan is active", () => {
    expect(remainingServiceDays("2026-08-19", "2028-08-17", "2026-08-24")).toBe(724);
    expect(remainingServiceLabel("2026-08-19", "2028-08-17", "2026-08-24")).toBe("724D");
  });
  it("returns zero before a plan starts", () => {
    expect(remainingServiceDays("2026-08-19", "2027-08-17", "2026-08-18")).toBe(0);
  });
  it("returns zero on and after expiry", () => {
    expect(remainingServiceDays("2026-08-19", "2027-08-17", "2027-08-17")).toBe(0);
    expect(remainingServiceDays("2026-08-19", "2027-08-17", "2028-01-01")).toBe(0);
  });
});
