import { describe, expect, it } from "vitest";
import { normalizeDatabaseUrl } from "./db";

describe("normalizeDatabaseUrl", () => {
  it("removes malformed SSL query parameters without changing credentials or database", () => {
    const input =
      "mysql://u559264694:Instantexpert%402026@auth-db663.hstgr.io:3306/u559264694_ExpertErpCRM?ssl=%7B%22rejectUnauthorized%22%3Atrue%7D";
    const normalized = new URL(normalizeDatabaseUrl(input));

    expect(normalized.protocol).toBe("mysql:");
    expect(normalized.username).toBe("u559264694");
    expect(normalized.password).toBe("Instantexpert%402026");
    expect(normalized.hostname).toBe("auth-db663.hstgr.io");
    expect(normalized.port).toBe("3306");
    expect(normalized.pathname).toBe("/u559264694_ExpertErpCRM");
    expect(normalized.search).toBe("");
  });

  it("accepts the Hostinger value with or without a mysql scheme", () => {
    const value = "mysql://u559264694_ExpertCRM:ExpertCRM2026Test@127.0.0.1:3306/u559264694_ExpertCRM";
    const normalized = new URL(normalizeDatabaseUrl(value));
    expect(normalized.protocol).toBe("mysql:");
    expect(normalized.username).toBe("u559264694_ExpertCRM");
    expect(normalized.password).toBe("ExpertCRM2026Test");
    expect(normalized.hostname).toBe("127.0.0.1");
    expect(normalized.pathname).toBe("/u559264694_ExpertCRM");
    expect(normalizeDatabaseUrl(value.replace("mysql://", ""))).toBe(normalizeDatabaseUrl(value));
    expect(normalizeDatabaseUrl(`DATABASE_URL=${value}`)).toBe(normalizeDatabaseUrl(value));
  });
});
