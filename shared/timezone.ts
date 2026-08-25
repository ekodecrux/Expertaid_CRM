const INDIA_TIME_ZONE = "Asia/Kolkata";

export function parseTimestamp(value: unknown): Date | null {
  if (!value) return null;
  const candidate = value instanceof Date ? value : new Date(String(value));
  return Number.isFinite(candidate.getTime()) ? candidate : null;
}

export function timestampMs(value: unknown): number {
  return parseTimestamp(value)?.getTime() ?? 0;
}

export function formatIndiaDate(value: unknown): string {
  const date = parseTimestamp(value);
  return date ? date.toLocaleDateString("en-IN", { timeZone: INDIA_TIME_ZONE, day: "2-digit", month: "short", year: "numeric" }) : "—";
}

export function formatIndiaTime(value: unknown): string {
  const date = parseTimestamp(value);
  return date ? date.toLocaleTimeString("en-IN", { timeZone: INDIA_TIME_ZONE, hour: "2-digit", minute: "2-digit" }) : "—";
}

export function formatIndiaDateTime(value: unknown): string {
  const date = parseTimestamp(value);
  return date ? `${formatIndiaDate(date)} · ${formatIndiaTime(date)}` : "—";
}

export { INDIA_TIME_ZONE };

