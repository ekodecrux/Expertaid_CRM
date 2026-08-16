import type { Express } from "express";
import fs from "fs";
import path from "path";
import { LOCAL_STORAGE_ROOT, resolveStoragePath } from "../storage";

const MIME_TYPES: Record<string, string> = {
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
};

export function registerStorageProxy(app: Express) {
  app.get("/app-branding/default-logo", (_req, res) => {
    const filePath = resolveStoragePath("branding/default-logo.png");
    if (!fs.existsSync(filePath)) {
      res.status(404).send("Default branding asset not found");
      return;
    }
    res.setHeader("Content-Type", "image/png");
    res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
    res.sendFile(filePath, { root: LOCAL_STORAGE_ROOT });
  });

  app.get("/local-storage/*", (req, res) => {
    const key = (req.params as Record<string, string>)[0];
    if (!key) {
      res.status(400).send("Missing storage key");
      return;
    }

    try {
      const filePath = resolveStoragePath(key);
      if (!fs.existsSync(filePath)) {
        res.status(404).send("Asset not found");
        return;
      }
      const extension = path.extname(filePath).toLowerCase();
      res.setHeader("Content-Type", MIME_TYPES[extension] || "application/octet-stream");
      res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
      res.sendFile(filePath, { root: LOCAL_STORAGE_ROOT });
    } catch (error) {
      console.error("[LocalStorage] failed:", error);
      res.status(400).send("Invalid storage path");
    }
  });
}
