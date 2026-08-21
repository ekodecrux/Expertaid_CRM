import { describe, expect, it } from "vitest";
import { calculateErpPricing } from "./erpPricing";

describe("ERP pricing breakdown", () => {
  it("calculates per-student taxable amount, GST, and total", () => {
    expect(calculateErpPricing({ mode: "perStudent", noOfStudents: 100, perStudentPrice: 100, gstRate: 18, gstMode: "exclusive" })).toMatchObject({ entered: 10000, gstAmount: 1800, totalPrice: 11800 });
  });

  it("keeps an inclusive entered amount as the total and extracts GST", () => {
    const result = calculateErpPricing({ mode: "package", packagePrice: 10000, gstRate: 18, gstMode: "inclusive" });
    expect(result.entered).toBe(10000);
    expect(result.totalPrice).toBe(10000);
    expect(result.gstAmount).toBeCloseTo(1525.4237, 4);
  });
});
