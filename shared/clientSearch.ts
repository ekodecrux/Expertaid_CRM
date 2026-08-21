export type ClientSearchRecord = {
  clientId?: string | null;
  clientName?: string | null;
  clientOwnerName?: string | null;
  email?: string | null;
  contactNumber?: string | null;
};

export function normalizeClientSearchTerm(value: string): string {
  return value.trim().toLocaleLowerCase();
}

export function matchesClientId(recordClientId: string | number | null | undefined, selectedClientId: string | number | null | undefined): boolean {
  return String(recordClientId ?? "") === String(selectedClientId ?? "");
}

export function matchesClientSearch(record: ClientSearchRecord, value: string): boolean {
  const term = normalizeClientSearchTerm(value);
  if (!term) return true;
  return [record.clientId, record.clientName, record.clientOwnerName, record.email, record.contactNumber]
    .some((field) => String(field ?? "").toLocaleLowerCase().includes(term));
}
