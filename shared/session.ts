export function isValidSessionDateRange(startDate: string, endDate: string) {
  return Boolean(startDate && endDate && endDate > startDate);
}

export function formatSessionRange(startDate: string, endDate: string) {
  return `${startDate} – ${endDate}`;
}
