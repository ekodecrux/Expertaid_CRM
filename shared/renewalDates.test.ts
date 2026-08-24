import { describe, expect, it } from "vitest";
import { renewalDates } from "./renewalDates";

describe("renewalDates", () => {
  it("uses the current date when the expiry gap exceeds three months", () => {
    expect(renewalDates({ previousStartDate: "2025-04-01", previousEndDate: "2026-03-31", planYears: 1, renewalType: "continuous", today: "2026-08-01" })).toMatchObject({ startDate: "2026-08-01", endDate: "2027-08-01", gapExceedsThreeMonths: true });
  });
  it("keeps the continuous start when the gap is within three months", () => {
    expect(renewalDates({ previousStartDate: "2026-04-01", previousEndDate: "2027-03-31", planYears: 1, renewalType: "continuous", today: "2027-05-01" })).toMatchObject({ startDate: "2026-04-01", endDate: "2027-04-01", gapExceedsThreeMonths: false });
  });
  it("allows explicit six-month and one-year rules", () => {
    expect(renewalDates({ previousStartDate: "2026-04-01", previousEndDate: "2027-03-31", planYears: 1, renewalType: "sixMonths", today: "2027-04-01" }).startDate).toBe("2027-10-01");
    expect(renewalDates({ previousStartDate: "2026-04-01", previousEndDate: "2027-03-31", planYears: 1, renewalType: "oneYear", today: "2027-04-01" }).startDate).toBe("2028-03-31");
  });
  it("preserves manually selected dates", () => {
    expect(renewalDates({ previousStartDate: "2026-04-01", previousEndDate: "2027-03-31", planYears: 1, renewalType: "continuous", today: "2027-04-01", startDate: "2027-06-15", endDate: "2028-06-14" })).toMatchObject({ startDate: "2027-06-15", endDate: "2028-06-14" });
  });
});
