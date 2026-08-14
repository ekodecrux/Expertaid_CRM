export type ApprovedAgreementLike = {
  status: string;
};

export function filterApprovedClients<T extends ApprovedAgreementLike>(agreements: T[]): T[] {
  return agreements.filter((agreement) => agreement.status === "Approved");
}

export function getClientLifecycleStatus(endDate: string, today = new Date().toISOString().slice(0, 10)): "Active" | "Inactive" {
  return endDate >= today ? "Active" : "Inactive";
}
