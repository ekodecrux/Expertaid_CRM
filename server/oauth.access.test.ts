import { describe, expect, it } from "vitest";
import { isApprovedOAuthEmail } from "./_core/oauth";

describe("approved OAuth email", () => {
  it("accepts only the configured Expertaid address", () => {
    expect(isApprovedOAuthEmail("expertsinstant@gmail.com")).toBe(true);
    expect(isApprovedOAuthEmail(" ExpertsInstant@Gmail.com ")).toBe(true);
    expect(isApprovedOAuthEmail("other@example.com")).toBe(false);
    expect(isApprovedOAuthEmail(undefined)).toBe(false);
  });
});

