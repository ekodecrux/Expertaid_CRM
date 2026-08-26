import { readFileSync } from "fs";
import { resolve } from "path";
import { describe, expect, it } from "vitest";

describe("branding persistence strategy", () => {
  it("reads and writes branding through the existing profile settings database record", () => {
    const source = readFileSync(resolve(process.cwd(), "server/db.ts"), "utf8");
    const brandingSection = source.slice(source.indexOf("export async function getBrandingForOwner"), source.indexOf("const AUTH_USER_FIELDS"));

    expect(brandingSection).toContain("getSettingsEnvelope(db, ownerId)");
    expect(brandingSection).toContain("branding: next");
    expect(brandingSection).toContain("await db.insert(profileSettingsData).values({ ownerId, profileJson }).onDuplicateKeyUpdate({ set: { profileJson } })");
    expect(brandingSection).not.toContain("await tx.delete(profileSettingsData)");
    expect(brandingSection).toContain("saveLocalBranding(ownerId, next)");
  });

  it("uses database branding as authoritative when MySQL is available", () => {
    const source = readFileSync(resolve(process.cwd(), "server/db.ts"), "utf8");
    expect(source).toContain("normalizeBranding((envelope.branding ?? {})");
    expect(source).toContain("if (!db) return localFallback");
  });

  it("preserves legacy plain profile JSON while adding branding as an envelope field", () => {
    const source = readFileSync(resolve(process.cwd(), "server/db.ts"), "utf8");
    expect(source).toContain("return { profile: parsed }");
    expect(source).toContain("writeSettingsEnvelope({ ...envelope, profile: next })");
    expect(source).toContain("writeSettingsEnvelope({ ...envelope, branding: next })");
  });

  it("does not silently use local files when MySQL is configured but unavailable", () => {
    const source = readFileSync(resolve(process.cwd(), "server/db.ts"), "utf8");
    expect(source).toContain("function hasConfiguredDatabase()");
    expect(source).toContain('if (hasConfiguredDatabase()) throw new Error("Branding database is unavailable")');
    expect(source).toContain('if (hasConfiguredDatabase()) throw new Error("Quotation settings database is unavailable")');
    expect(source).toContain('if (hasConfiguredDatabase()) throw new Error("Session settings database is unavailable")');
    expect(source).toContain("if (hasConfiguredDatabase()) throw new Error(`Profile settings database load failed");
  });

  it("exposes a read-only public branding path for the pre-login page", () => {
    const routerSource = readFileSync(resolve(process.cwd(), "server/routers.ts"), "utf8");
    const layoutSource = readFileSync(resolve(process.cwd(), "client/src/components/DashboardLayout.tsx"), "utf8");
    expect(routerSource).toContain("public: publicProcedure.query(() => getPublicBranding())");
    expect(layoutSource).toContain("trpc.branding.public.useQuery(undefined)");
    expect(layoutSource).toContain("branding.data ?? publicBranding.data ?? DEFAULT_BRANDING");
  });

  it("serves managed storage URLs through the preview proxy", () => {
    const source = readFileSync(resolve(process.cwd(), "server/_core/storageProxy.ts"), "utf8");
    expect(source).toContain('app.get("/manus-storage/*"');
    expect(source).toContain("storageGetSignedUrl(key)");
  });
});

