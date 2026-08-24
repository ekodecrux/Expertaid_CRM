import { describe, expect, it } from "vitest";
import { DEFAULT_BRANDING, normalizeBranding } from "./branding";

describe("company branding", () => {
  it("provides the established defaults", () => {
    expect(DEFAULT_BRANDING.companyName).toBe("Expertaid Technologies Pvt. Ltd.");
    expect(DEFAULT_BRANDING.serviceCaption).toContain("ERP Solutions");
    expect(DEFAULT_BRANDING.footerCompanyName).toBe("Expertaid Technologies Pvt Ltd");
    expect(DEFAULT_BRANDING.companyLogoUrl).toBe("/manus-storage/expertaid-default-logo_ffdcff11.png");
  });

  it("falls back for empty or nullable stored fields", () => {
    expect(normalizeBranding({ companyName: "  ", serviceCaption: null, footerCompanyName: "", companyLogoUrl: null })).toEqual(DEFAULT_BRANDING);
  });

  it("preserves edited branding values", () => {
    expect(normalizeBranding({ companyName: "Acme ERP", serviceCaption: "Implementation & Support", footerCompanyName: "Acme ERP Pvt Ltd", companyLogoUrl: "https://cdn.example/logo.png" })).toEqual({
      companyName: "Acme ERP",
      serviceCaption: "Implementation & Support",
      footerCompanyName: "Acme ERP Pvt Ltd",
      companyLogoUrl: "https://cdn.example/logo.png",
    });
  });
});
