export function isValidSessionDateRange(startDate: string, endDate: string) {
  return Boolean(startDate && endDate && endDate > startDate);
}

export function formatSessionRange(startDate: string, endDate: string) {
  return `${startDate} – ${endDate}`;
}

export type SessionRecord = { sessionLabel: string; startDate?: string; endDate?: string };

export function sortSessionsNewestFirst<T extends SessionRecord>(sessions: T[]) {
  return [...sessions].sort((a, b) => {
    const startCompare = String(b.startDate ?? b.sessionLabel).localeCompare(String(a.startDate ?? a.sessionLabel));
    return startCompare || String(b.sessionLabel).localeCompare(String(a.sessionLabel));
  });
}
