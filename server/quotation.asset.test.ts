import { describe, expect, it } from "vitest";
import { quotationAssetInput } from "./routers";

describe("quotation asset input normalization", () => {
  it("treats empty strings as omitted assets", () => {
    expect(quotationAssetInput.parse("")).toBeUndefined();
    expect(quotationAssetInput.parse("   ")).toBeUndefined();
  });

  it("preserves null and persisted asset references", () => {
    expect(quotationAssetInput.parse(null)).toBeNull();
    expect(quotationAssetInput.parse("/local-storage/quotations/scanner.png")).toBe("/local-storage/quotations/scanner.png");
  });

  it("accepts a browser image data URL", () => {
    expect(quotationAssetInput.parse("data:image/png;base64,AAAA")).toBe("data:image/png;base64,AAAA");
  });
});
