import { describe, expect, it } from "vitest";
import { validateCredentialLogin } from "./credentialLogin";

describe("credential login", () => {
  it("accepts the configured CRM credentials and rejects invalid values", () => {
    expect(validateCredentialLogin("expertsinstant@gmail.com", "123456")).toBe(true);
    expect(validateCredentialLogin("expertsinstant@gmail.com", "wrong-password")).toBe(false);
    expect(validateCredentialLogin("other@example.com", "123456")).toBe(false);
  });
});
