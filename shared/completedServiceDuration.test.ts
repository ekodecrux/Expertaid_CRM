import { describe, expect, it } from "vitest";
import { completedServiceDuration, completedServiceMonths } from "./completedServiceDuration";

describe("completed service duration", () => {
  it("reports zero completed months before the plan starts", () => {
    expect(completedServiceDuration("2026-08-19", "2027-08-17", "2026-08-18")).toBe("0 months completed");
  });
  it("reports elapsed calendar months rather than contracted tenure", () => {
    expect(completedServiceMonths("2026-08-19", "2028-08-17", "2027-08-24")).toBe(12);
    expect(completedServiceDuration("2026-08-19", "2028-08-17", "2027-08-24")).toBe("1y");
  });
  it("caps completed service at the plan end date", () => {
    expect(completedServiceDuration("2026-08-19", "2027-08-17", "2028-01-01")).toBe("11 months completed");
  });
});
