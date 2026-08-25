export type SearchableQuotation = {
  quotationNumber?: string | number | null;
  estimationNumber?: string | number | null;
  clientName?: string | null;
  clientEmail?: string | null;
  clientContact?: string | null;
};

export function filterQuotations<T extends SearchableQuotation>(quotations: T[], search: string): T[] {
  const query = search.trim().toLowerCase();
  if (!query) return quotations;

  return quotations.filter((quotation) =>
    [
      quotation.quotationNumber,
      quotation.estimationNumber,
      quotation.clientName,
      quotation.clientEmail,
      quotation.clientContact,
    ]
      .filter((value) => value !== null && value !== undefined)
      .join(" ")
      .toLowerCase()
      .includes(query),
  );
}
