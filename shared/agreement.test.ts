import { describe, expect, it } from "vitest";
import { formatAgreementReference } from "./agreement";

describe("agreement reference formatting", () => {
  it("starts the sequence at ERP26001", () => {
    expect(formatAgreementReference(1)).toBe("ERP26001");
  });

  it("keeps later references unique and zero-padded", () => {
    expect(formatAgreementReference(42)).toBe("ERP26042");
    expect(formatAgreementReference(1000)).toBe("ERP261000");
  });
});
