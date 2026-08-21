import { describe, expect, it } from "vitest";
import { apiResponseContentType, isJsonApiPath, unknownApiPayload, unknownTrpcPayload } from "./apiFallback";

describe("API fallback responses", () => {
  it("returns a JSON error payload for unknown API routes", () => {
    expect(unknownApiPayload("/api/missing")).toEqual({
      error: { message: "Unknown API route: /api/missing" },
    });
  });

  it("identifies API paths and uses a JSON content type", () => {
    expect(isJsonApiPath("/api/trpc/auth.me")).toBe(true);
    expect(isJsonApiPath("/clients")).toBe(false);
    expect(apiResponseContentType()).toContain("application/json");
  });

  it("returns a JSON error payload for unknown tRPC procedures", () => {
    expect(unknownTrpcPayload()).toEqual({
      error: { message: "Unknown tRPC procedure" },
    });
  });
});
