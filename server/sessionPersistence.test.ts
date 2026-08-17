import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

describe("session database authority", () => {
  it("loads and saves session settings through the users table", () => {
    const source = readFileSync(resolve(process.cwd(), "server/db.ts"), "utf8");
    const section = source.slice(source.indexOf("export async function getSessionSettings"), source.indexOf("export async function updateBrandingForOwner"));
    expect(section).toContain("from(users).where(eq(users.id, ownerId))");
    expect(section).toContain("db.update(users).set(values)");
    expect(section).toContain("Session settings database save failed:");
  });

  it("creates and lists session records through the sessions table", () => {
    const source = readFileSync(resolve(process.cwd(), "server/db.ts"), "utf8");
    const section = source.slice(source.indexOf("export async function listSessionsForOwner"), source.indexOf("export async function listAgreementsForOwner"));
    expect(section).toContain("db.select().from(sessions)");
    expect(section).toContain("db.insert(sessions).values");
    expect(section).toContain("Session database save failed:");
    expect(section).toContain("if (!rows.some((row) => row.sessionLabel === settings.currentSession))");
    expect(section).toContain("export async function updateSessionRecordForOwner");
    expect(section).toContain("db.update(sessions).set(values)");
    expect(section).toContain("export async function deleteSessionForOwner");
    expect(section).toContain("db.delete(sessions)");
  });
});
