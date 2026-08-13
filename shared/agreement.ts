export function formatAgreementReference(id: number): string {
  return `ERP26${id.toString().padStart(3, "0")}`;
}
