export function isAgreementAcceptanceReady(input: {
  termsAccepted: boolean;
  signatureDataUrl: string | null;
  signatureDate: string;
}): boolean {
  return Boolean(input.termsAccepted && input.signatureDataUrl && input.signatureDate);
}
