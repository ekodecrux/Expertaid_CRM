import { describe, expect, it } from "vitest";
import { isAgreementAcceptanceReady } from "./signatureState";

describe("agreement acceptance readiness", () => {
  it("requires terms, a signature data URL, and a date", () => {
    expect(isAgreementAcceptanceReady({ termsAccepted: false, signatureDataUrl: "data:image/png;base64,abc", signatureDate: "2026-08-13" })).toBe(false);
    expect(isAgreementAcceptanceReady({ termsAccepted: true, signatureDataUrl: null, signatureDate: "2026-08-13" })).toBe(false);
    expect(isAgreementAcceptanceReady({ termsAccepted: true, signatureDataUrl: "data:image/png;base64,abc", signatureDate: "" })).toBe(false);
  });

  it("accepts either a drawn or uploaded signature data URL", () => {
    expect(isAgreementAcceptanceReady({ termsAccepted: true, signatureDataUrl: "data:image/png;base64,drawn", signatureDate: "2026-08-13" })).toBe(true);
    expect(isAgreementAcceptanceReady({ termsAccepted: true, signatureDataUrl: "data:image/png;base64,uploaded", signatureDate: "2026-08-13" })).toBe(true);
  });
});
