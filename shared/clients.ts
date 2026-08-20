export type ApprovedAgreementLike = {
  status: string;
};

export function filterApprovedClients<T extends ApprovedAgreementLike>(agreements: T[]): T[] {
  return agreements.filter((agreement) => agreement.status === "Approved");
}

export type ClientManualStatus = "Active" | "Inactive" | "Hold" | "Cancelled" | "Renewal" | "Extended" | "Closed";
export type AutomaticClientStatus = "Active" | "Ready to Expire" | "Expired";

export function getManualClientStatuses(isMainProject: boolean): ClientManualStatus[] {
  return isMainProject ? ["Active", "Inactive", "Hold", "Cancelled"] : ["Active", "Inactive", "Extended", "Renewal", "Closed"];
}

export function getClientLifecycleStatus(endDate: string, today = new Date().toISOString().slice(0, 10)): AutomaticClientStatus {
  const end = new Date(`${endDate}T00:00:00Z`).getTime();
  const current = new Date(`${today}T00:00:00Z`).getTime();
  if (!Number.isFinite(end) || !Number.isFinite(current)) return "Active";
  if (end < current) return "Expired";
  const daysRemaining = Math.ceil((end - current) / 86_400_000);
  return daysRemaining <= 5 ? "Ready to Expire" : "Active";
}

export function filterProjectClients<T extends { projectId?: number | null; clientId?: string | null; clientName?: string | null }>(clients: T[], projectId: number, search = ""): T[] {
  const query = search.trim().toLowerCase();
  return clients.filter((client) => {
    if (Number(client.projectId) !== projectId) return false;
    if (!query) return true;
    return `${client.clientId ?? ""} ${client.clientName ?? ""}`.toLowerCase().includes(query);
  });
}
