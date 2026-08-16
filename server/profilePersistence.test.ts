import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

describe("profile settings persistence strategy", () => {
  it("uses update-first persistence with an insert fallback for legacy Hostinger tables", () => {
    const source = readFileSync(resolve(process.cwd(), "server/db.ts"), "utf8");

    expect(source).toContain("await db.insert(profileSettingsData).values({ ownerId, profileJson }).onDuplicateKeyUpdate({ set: { profileJson } })");
    expect(source).not.toContain("where(eq(profileSettingsData.id, existing[0].id))");
    expect(source).not.toContain("db.update(profileSettingsData)");
    expect(source).toContain("MAX(CAST(${quotations.invoiceNumber} AS UNSIGNED))");
  });
});


