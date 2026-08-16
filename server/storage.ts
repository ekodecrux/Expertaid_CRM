import fs from "fs/promises";
import path from "path";
import crypto from "crypto";
import { ENV } from "./_core/env";

const LOCAL_STORAGE_ROOT = path.resolve(
  process.env.LOCAL_STORAGE_PATH || path.resolve(process.cwd(), "uploads"),
);

export function hasManusStorage(): boolean {
  const runningTests = process.env.NODE_ENV === "test" || process.env.VITEST === "true" || Boolean(process.env.VITEST_WORKER_ID);
  return !runningTests && Boolean(ENV.forgeApiUrl && ENV.forgeApiKey);
}

function normalizeKey(relKey: string): string {
  return relKey.replace(/^\/+/, "").replace(/\\/g, "/");
}

function appendHashSuffix(relKey: string): string {
  const hash = crypto.randomUUID().replace(/-/g, "").slice(0, 8);
  const lastDot = relKey.lastIndexOf(".");
  return lastDot === -1
    ? `${relKey}_${hash}`
    : `${relKey.slice(0, lastDot)}_${hash}${relKey.slice(lastDot)}`;
}

export function resolveStoragePath(key: string): string {
  let rawKey = key.replace(/\\/g, "/");
  const rootKey = LOCAL_STORAGE_ROOT.replace(/\\/g, "/");
  const rootIndex = rawKey.indexOf(rootKey);
  if (rootIndex >= 0) {
    rawKey = rawKey.slice(rootIndex);
  }
  while (rawKey.startsWith(rootKey)) {
    rawKey = rawKey.slice(rootKey.length);
  }
  const localUrlKey = rawKey.replace(/^\/+local-storage\//, "");
  const normalized = normalizeKey(localUrlKey);
  const resolved = path.resolve(LOCAL_STORAGE_ROOT, normalized);
  if (resolved !== LOCAL_STORAGE_ROOT && !resolved.startsWith(`${LOCAL_STORAGE_ROOT}${path.sep}`)) {
    throw new Error("Invalid storage path");
  }
  return resolved;
}

async function localStoragePut(relKey: string, data: Buffer | Uint8Array | string) {
  const key = appendHashSuffix(normalizeKey(relKey));
  const filePath = resolveStoragePath(key);
  await fs.mkdir(path.dirname(filePath), { recursive: true });
  await fs.writeFile(filePath, typeof data === "string" ? Buffer.from(data) : Buffer.from(data));
  return { key, url: `/local-storage/${key}` };
}

async function manusStoragePut(relKey: string, data: Buffer | Uint8Array | string, contentType: string) {
  const forgeUrl = ENV.forgeApiUrl.replace(/\/+$/, "");
  const key = appendHashSuffix(normalizeKey(relKey));
  const presignUrl = new URL("v1/storage/presign/put", `${forgeUrl}/`);
  presignUrl.searchParams.set("path", key);
  const presignResp = await fetch(presignUrl, {
    headers: { Authorization: `Bearer ${ENV.forgeApiKey}` },
  });
  if (!presignResp.ok) {
    const msg = await presignResp.text().catch(() => presignResp.statusText);
    throw new Error(`Storage presign failed (${presignResp.status}): ${msg}`);
  }
  const { url: s3Url } = (await presignResp.json()) as { url: string };
  if (!s3Url) throw new Error("Forge returned empty presign URL");
  const body = typeof data === "string" ? new Blob([data], { type: contentType }) : new Blob([data as any], { type: contentType });
  const uploadResp = await fetch(s3Url, {
    method: "PUT",
    headers: { "Content-Type": contentType },
    body,
  });
  if (!uploadResp.ok) throw new Error(`Storage upload to S3 failed (${uploadResp.status})`);
  return { key, url: `/manus-storage/${key}` };
}

export async function storagePut(
  relKey: string,
  data: Buffer | Uint8Array | string,
  contentType = "application/octet-stream",
): Promise<{ key: string; url: string }> {
  return hasManusStorage()
    ? manusStoragePut(relKey, data, contentType)
    : localStoragePut(relKey, data);
}

export async function storageGet(relKey: string): Promise<{ key: string; url: string }> {
  const key = normalizeKey(relKey);
  return { key, url: hasManusStorage() ? `/manus-storage/${key}` : `/local-storage/${key}` };
}

export async function storageGetSignedUrl(relKey: string): Promise<string> {
  const key = normalizeKey(relKey);
  if (!hasManusStorage()) return `/local-storage/${key}`;
  const forgeUrl = ENV.forgeApiUrl.replace(/\/+$/, "");
  const getUrl = new URL("v1/storage/presign/get", `${forgeUrl}/`);
  getUrl.searchParams.set("path", key);
  const resp = await fetch(getUrl, {
    headers: { Authorization: `Bearer ${ENV.forgeApiKey}` },
  });
  if (!resp.ok) {
    const msg = await resp.text().catch(() => resp.statusText);
    throw new Error(`Storage signed URL failed (${resp.status}): ${msg}`);
  }
  const { url } = (await resp.json()) as { url: string };
  return url;
}

export { LOCAL_STORAGE_ROOT };
