import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

describe("profile settings persistence strategy", () => {
  it("uses atomic owner-keyed persistence for legacy Hostinger tables", () => {
    const source = readFileSync(resolve(process.cwd(), "server/db.ts"), "utf8");
    const profileSection = source.slice(source.indexOf("export async function updateProfileSettingsForOwner"), source.indexOf("export function normalizeDatabaseUrl"));

    expect(profileSection).toContain("await db.insert(profileSettingsData).values({ ownerId, profileJson }).onDuplicateKeyUpdate({ set: { profileJson } })");
    expect(profileSection).not.toContain("await tx.delete(profileSettingsData)");
    expect(profileSection).not.toContain("db.update(profileSettingsData)");
    expect(source).toContain("MAX(CAST(${quotations.invoiceNumber} AS UNSIGNED))");
  });
});


