import { describe, expect, it } from "vitest";
import { isSignatureUploadSizeAllowed, isSupportedSignatureType, SIGNATURE_UPLOAD_MAX_BYTES } from "./signatureUpload";

describe("signature upload validation", () => {
  it("accepts supported image types and rejects unsupported files", () => {
    expect(isSupportedSignatureType("image/png")).toBe(true);
    expect(isSupportedSignatureType("image/jpeg")).toBe(true);
    expect(isSupportedSignatureType("image/webp")).toBe(true);
    expect(isSupportedSignatureType("application/pdf")).toBe(false);
  });

  it("accepts files up to the configured size limit", () => {
    expect(isSignatureUploadSizeAllowed(SIGNATURE_UPLOAD_MAX_BYTES)).toBe(true);
    expect(isSignatureUploadSizeAllowed(SIGNATURE_UPLOAD_MAX_BYTES + 1)).toBe(false);
  });
});
