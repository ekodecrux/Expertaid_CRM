import { afterEach, describe, expect, it } from "vitest";
import fs from "fs/promises";
import { LOCAL_STORAGE_ROOT, resolveStoragePath, storageGet, storagePut } from "./storage";

const createdFiles: string[] = [];

afterEach(async () => {
  await Promise.all(createdFiles.splice(0).map((filePath) => fs.rm(filePath, { force: true })));
});

describe("Hostinger-local storage", () => {
  it("writes assets beneath uploads and returns a local URL", async () => {
    const stored = await storagePut("branding/test.txt", Buffer.from("asset"), "text/plain");
    const filePath = resolveStoragePath(stored.key);
    createdFiles.push(filePath);

    expect(filePath.startsWith(`${LOCAL_STORAGE_ROOT}/`)).toBe(true);
    expect(stored.url.startsWith("/local-storage/branding/test_")).toBe(true);
    await expect(fs.readFile(filePath, "utf8")).resolves.toBe("asset");
    await expect(storageGet(stored.key)).resolves.toEqual({ key: stored.key, url: `/local-storage/${stored.key}` });
  });

  it("accepts persisted absolute paths and local-storage URLs without duplicating uploads", () => {
    const relative = "branding/1/logo.png";
    expect(resolveStoragePath(`${LOCAL_STORAGE_ROOT}/${relative}`)).toBe(resolveStoragePath(relative));
    expect(resolveStoragePath(`/local-storage/${relative}`)).toBe(resolveStoragePath(relative));
  });

  it("rejects traversal outside the local storage root", () => {
    expect(() => resolveStoragePath("../outside.txt")).toThrow("Invalid storage path");
  });
});
