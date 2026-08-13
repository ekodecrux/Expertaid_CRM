export const SIGNATURE_UPLOAD_MAX_BYTES = 2_000_000;
export const SUPPORTED_SIGNATURE_TYPES = ["image/png", "image/jpeg", "image/webp"] as const;

export function isSupportedSignatureType(type: string): boolean {
  return SUPPORTED_SIGNATURE_TYPES.includes(type as (typeof SUPPORTED_SIGNATURE_TYPES)[number]);
}

export function isSignatureUploadSizeAllowed(size: number): boolean {
  return size <= SIGNATURE_UPLOAD_MAX_BYTES;
}
