import fs from "fs/promises";
import path from "path";
import { LOCAL_STORAGE_ROOT } from "./storage";
import { DEFAULT_BRANDING, normalizeBranding, type CompanyBranding } from "@shared/branding";

const BRANDING_FILE = path.join(LOCAL_STORAGE_ROOT, "settings", "branding.json");

type BrandingRecord = Record<string, CompanyBranding>;

async function readBrandingRecords(): Promise<BrandingRecord> {
  try {
    const raw = await fs.readFile(BRANDING_FILE, "utf8");
    const parsed = JSON.parse(raw) as BrandingRecord;
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
}

async function writeBrandingRecords(records: BrandingRecord): Promise<void> {
  await fs.mkdir(path.dirname(BRANDING_FILE), { recursive: true });
  const tempFile = `${BRANDING_FILE}.tmp`;
  await fs.writeFile(tempFile, JSON.stringify(records, null, 2), "utf8");
  await fs.rename(tempFile, BRANDING_FILE);
}

export async function getLocalBranding(ownerId: number): Promise<CompanyBranding> {
  const records = await readBrandingRecords();
  return normalizeBranding(records[String(ownerId)] ?? DEFAULT_BRANDING);
}

export async function saveLocalBranding(ownerId: number, branding: CompanyBranding): Promise<CompanyBranding> {
  const records = await readBrandingRecords();
  const normalized = normalizeBranding(branding);
  records[String(ownerId)] = normalized;
  await writeBrandingRecords(records);
  return normalized;
}

export { BRANDING_FILE };
