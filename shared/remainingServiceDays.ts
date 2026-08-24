const DAY_MS = 24 * 60 * 60 * 1000;

type CalendarDuration = { years: number; months: number; days: number };

function parseDate(value: string) {
  return new Date(`${value}T00:00:00Z`);
}

function addCalendarMonths(value: Date, months: number) {
  const targetMonth = value.getUTCMonth() + months;
  const targetYear = value.getUTCFullYear() + Math.floor(targetMonth / 12);
  const normalizedMonth = ((targetMonth % 12) + 12) % 12;
  const lastDay = new Date(Date.UTC(targetYear, normalizedMonth + 1, 0)).getUTCDate();
  return new Date(Date.UTC(targetYear, normalizedMonth, Math.min(value.getUTCDate(), lastDay)));
}

export function remainingServiceDays(startDate: string, endDate: string, today = new Date().toISOString().slice(0, 10)) {
  const start = parseDate(startDate);
  const end = parseDate(endDate);
  const current = parseDate(today);
  if (![start, end, current].every((value) => Number.isFinite(value.getTime())) || end < start || current < start || current >= end) return 0;
  return Math.max(0, Math.ceil((end.getTime() - current.getTime()) / DAY_MS));
}

export function remainingServiceDuration(startDate: string, endDate: string, today = new Date().toISOString().slice(0, 10)): CalendarDuration {
  const start = parseDate(startDate);
  const end = parseDate(endDate);
  const current = parseDate(today);
  if (![start, end, current].every((value) => Number.isFinite(value.getTime())) || end < start || current < start || current >= end) return { years: 0, months: 0, days: 0 };

  let years = end.getUTCFullYear() - current.getUTCFullYear();
  let anchor = addCalendarMonths(current, years * 12);
  if (anchor > end) {
    years -= 1;
    anchor = addCalendarMonths(current, years * 12);
  }

  let months = (end.getUTCFullYear() - anchor.getUTCFullYear()) * 12 + end.getUTCMonth() - anchor.getUTCMonth();
  let monthAnchor = addCalendarMonths(anchor, months);
  if (monthAnchor > end) {
    months -= 1;
    monthAnchor = addCalendarMonths(anchor, months);
  }

  const days = Math.max(0, Math.floor((end.getTime() - monthAnchor.getTime()) / DAY_MS));
  return { years: Math.max(0, years), months: Math.max(0, months), days };
}

export function remainingServiceLabel(startDate: string, endDate: string, today?: string) {
  const duration = remainingServiceDuration(startDate, endDate, today);
  const parts = [
    duration.years ? `${duration.years}Y` : "",
    duration.months ? `${duration.months}M` : "",
    duration.days ? `${duration.days}D` : "",
  ].filter(Boolean);
  return parts.length ? parts.join(" ") : "0D";
}
