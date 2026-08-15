import fs from "fs/promises";
import path from "path";
import { randomUUID } from "crypto";

const LOCAL_STORAGE_ROOT = path.resolve(
  process.env.LOCAL_STORAGE_PATH || path.resolve(process.cwd(), "uploads"),
);

function normalizeKey(relKey: string): string {
  return relKey.replace(/^\/+/, "").replace(/\\/g, "/");
}

function appendHashSuffix(relKey: string): string {
  const hash = randomUUID().replace(/-/g, "").slice(0, 8);
  const lastDot = relKey.lastIndexOf(".");
  if (lastDot === -1) return `${relKey}_${hash}`;
  return `${relKey.slice(0, lastDot)}_${hash}${relKey.slice(lastDot)}`;
}

function resolveStoragePath(key: string): string {
  const rawKey = key.replace(/\\/g, "/");
  const localUrlKey = rawKey.replace(/^\/+local-storage\//, "");
  let normalized = normalizeKey(localUrlKey);
  if (path.isAbsolute(rawKey) && rawKey !== `/local-storage/${localUrlKey}`) normalized = path.relative(LOCAL_STORAGE_ROOT, rawKey);
  const resolved = path.resolve(LOCAL_STORAGE_ROOT, normalized);
  if (resolved !== LOCAL_STORAGE_ROOT && !resolved.startsWith(`${LOCAL_STORAGE_ROOT}${path.sep}`)) {
    throw new Error("Invalid storage path");
  }
  return resolved;
}

export async function storagePut(
  relKey: string,
  data: Buffer | Uint8Array | string,
  contentType = "application/octet-stream",
): Promise<{ key: string; url: string }> {
  const key = appendHashSuffix(normalizeKey(relKey));
  const filePath = resolveStoragePath(key);
  await fs.mkdir(path.dirname(filePath), { recursive: true });
  const bytes = typeof data === "string" ? Buffer.from(data) : Buffer.from(data);
  await fs.writeFile(filePath, bytes);
  return { key, url: `/local-storage/${key}` };
}

export async function storageGet(relKey: string): Promise<{ key: string; url: string }> {
  const key = normalizeKey(relKey);
  return { key, url: `/local-storage/${key}` };
}

export async function storageGetSignedUrl(relKey: string): Promise<string> {
  const key = normalizeKey(relKey);
  return `/local-storage/${key}`;
}

export { LOCAL_STORAGE_ROOT, resolveStoragePath };

// Keep the parameter in the upload API for compatibility with existing callers.
void ("contentType" satisfies string);
