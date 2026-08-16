import { readFileSync } from "fs";
import { resolve } from "path";
import { describe, expect, it } from "vitest";

describe("branding persistence strategy", () => {
  it("reads and writes branding through the existing profile settings database record", () => {
    const source = readFileSync(resolve(process.cwd(), "server/db.ts"), "utf8");
    const brandingSection = source.slice(source.indexOf("export async function getBrandingForOwner"), source.indexOf("const AUTH_USER_FIELDS"));

    expect(brandingSection).toContain("getSettingsEnvelope(db, ownerId)");
    expect(brandingSection).toContain("branding: next");
    expect(brandingSection).toContain("await tx.delete(profileSettingsData).where(eq(profileSettingsData.ownerId, ownerId))");
    expect(brandingSection).toContain("await tx.insert(profileSettingsData).values({ ownerId, profileJson })");
    expect(brandingSection).toContain("saveLocalBranding(ownerId, next)");
  });

  it("preserves legacy plain profile JSON while adding branding as an envelope field", () => {
    const source = readFileSync(resolve(process.cwd(), "server/db.ts"), "utf8");
    expect(source).toContain("return { profile: parsed }");
    expect(source).toContain("writeSettingsEnvelope({ ...envelope, profile: next })");
    expect(source).toContain("writeSettingsEnvelope({ ...envelope, branding: next })");
  });

  it("serves managed storage URLs through the preview proxy", () => {
    const source = readFileSync(resolve(process.cwd(), "server/_core/storageProxy.ts"), "utf8");
    expect(source).toContain('app.get("/manus-storage/*"');
    expect(source).toContain("storageGetSignedUrl(key)");
  });
});

