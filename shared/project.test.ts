import { describe, expect, it } from "vitest";
import { formatProjectClientId } from "./project";

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
});
