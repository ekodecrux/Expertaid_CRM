import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

describe("profile settings persistence strategy", () => {
  it("uses update-first persistence with an insert fallback for legacy Hostinger tables", () => {
    const source = readFileSync(resolve(process.cwd(), "server/db.ts"), "utf8");

    expect(source).toContain("const existing = await db.select({ id: profileSettingsData.id })");
    expect(source).toContain("await db.update(profileSettingsData).set({ profileJson }).where(eq(profileSettingsData.id, existing[0].id))");
    expect(source).toContain("await db.insert(profileSettingsData).values({ ownerId, profileJson })");
    expect(source).toContain("const duplicate = await db.select({ id: profileSettingsData.id })");
  });
});


