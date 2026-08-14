export type ApprovedAgreementLike = {
  status: string;
};

export function filterApprovedClients<T extends ApprovedAgreementLike>(agreements: T[]): T[] {
  return agreements.filter((agreement) => agreement.status === "Approved");
}
