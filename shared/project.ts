export function formatProjectClientId(prefix: string, sequence: number): string {
  const normalizedPrefix = prefix.trim();
  if (!normalizedPrefix) throw new Error("Client ID prefix is required");
  if (!Number.isInteger(sequence) || sequence < 1) throw new Error("Client ID sequence must be a positive integer");
  return `${normalizedPrefix}${sequence}`;
}

/**
 * Project edits may move the next number forward, but never backward over
 * numbers that may already have been allocated to existing agreements.
 */
export function nextFutureProjectClientNumber(currentNext: number, configuredStart: number): number {
  const current = Math.max(1, Math.trunc(Number(currentNext)));
  const start = Math.max(1, Math.trunc(Number(configuredStart)));
  return Math.max(current, start);
}
