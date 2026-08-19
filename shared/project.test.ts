import { describe, expect, it } from "vitest";
import { formatProjectClientId, nextFutureProjectClientNumber } from "./project";

describe("project Client IDs", () => {
  it("combines the configured prefix and sequence", () => {
    expect(formatProjectClientId(" ERP ", 1)).toBe("ERP1");
    expect(formatProjectClientId("ERP", 26)).toBe("ERP26");
  });

  it("rejects an empty prefix or invalid sequence", () => {
    expect(() => formatProjectClientId("", 1)).toThrow("prefix");
    expect(() => formatProjectClientId("ERP", 0)).toThrow("sequence");
    expect(() => formatProjectClientId("ERP", 1.5)).toThrow("sequence");
  });

  it("never moves the future sequence backward over existing Client IDs", () => {
    expect(nextFutureProjectClientNumber(2602, 100)).toBe(2602);
    expect(nextFutureProjectClientNumber(2, 2601)).toBe(2601);
    expect(nextFutureProjectClientNumber(0, 0)).toBe(1);
  });
});
