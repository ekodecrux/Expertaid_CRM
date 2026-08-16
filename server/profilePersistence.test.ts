import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

describe("profile settings persistence strategy", () => {
  it("uses transactional owner-keyed persistence for legacy Hostinger tables", () => {
    const source = readFileSync(resolve(process.cwd(), "server/db.ts"), "utf8");
    const profileSection = source.slice(source.indexOf("export async function updateProfileSettingsForOwner"), source.indexOf("export function normalizeDatabaseUrl"));

    expect(profileSection).toContain("await db.transaction(async (tx) => {");
    expect(profileSection).toContain("await tx.delete(profileSettingsData).where(eq(profileSettingsData.ownerId, ownerId))");
    expect(profileSection).toContain("await tx.insert(profileSettingsData).values({ ownerId, profileJson })");
    expect(profileSection).not.toContain("onDuplicateKeyUpdate");
    expect(profileSection).not.toContain("db.update(profileSettingsData)");
    expect(source).toContain("MAX(CAST(${quotations.invoiceNumber} AS UNSIGNED))");
  });
});


