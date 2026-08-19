export function formatProjectClientId(prefix: string, sequence: number): string {
  const normalizedPrefix = prefix.trim();
  if (!normalizedPrefix) throw new Error("Client ID prefix is required");
  if (!Number.isInteger(sequence) || sequence < 1) throw new Error("Client ID sequence must be a positive integer");
  return `${normalizedPrefix}${sequence}`;
}
