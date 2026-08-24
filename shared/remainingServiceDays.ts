const DAY_MS = 24 * 60 * 60 * 1000;

export function remainingServiceDays(startDate: string, endDate: string, today = new Date().toISOString().slice(0, 10)) {
  const start = new Date(`${startDate}T00:00:00Z`);
  const end = new Date(`${endDate}T00:00:00Z`);
  const current = new Date(`${today}T00:00:00Z`);
  if (![start, end, current].every((value) => Number.isFinite(value.getTime())) || end < start || current < start || current >= end) return 0;
  return Math.max(0, Math.ceil((end.getTime() - current.getTime()) / DAY_MS));
}

export function remainingServiceLabel(startDate: string, endDate: string, today?: string) {
  return `${remainingServiceDays(startDate, endDate, today)}D`;
}
