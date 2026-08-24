import { describe, expect, it } from "vitest";
import { formatWholeRupees } from "./displayCurrency";

describe("whole rupee display", () => {
  it("rounds the client summary values for display only", () => {
    expect(formatWholeRupees("11.80")).toBe(12);
    expect(formatWholeRupees("6.80")).toBe(7);
  });
  it("does not change whole values or invalid values unexpectedly", () => {
    expect(formatWholeRupees(12)).toBe(12);
    expect(formatWholeRupees("not-a-number")).toBe(0);
  });
});
