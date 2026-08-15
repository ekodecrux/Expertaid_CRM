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

export type LocalSession = {
  id: number;
  ownerId: number;
  sessionLabel: string;
  startDate: string;
  endDate: string;
};

type SessionSettingsRecord = Record<string, { sessionMode: "all" | "single"; currentSession: string }>;
type SessionsRecord = Record<string, LocalSession[]>;
const SESSION_SETTINGS_FILE = path.join(LOCAL_STORAGE_ROOT, "settings", "session-settings.json");
const SESSIONS_FILE = path.join(LOCAL_STORAGE_ROOT, "settings", "sessions.json");

async function readJsonFile<T>(filePath: string, fallback: T): Promise<T> {
  try {
    const parsed = JSON.parse(await fs.readFile(filePath, "utf8")) as T;
    return parsed ?? fallback;
  } catch {
    return fallback;
  }
}

async function writeJsonFile(filePath: string, value: unknown): Promise<void> {
  await fs.mkdir(path.dirname(filePath), { recursive: true });
  const tempFile = `${filePath}.tmp`;
  await fs.writeFile(tempFile, JSON.stringify(value, null, 2), "utf8");
  await fs.rename(tempFile, filePath);
}

export async function getLocalSessionSettings(ownerId: number) {
  const records = await readJsonFile<SessionSettingsRecord>(SESSION_SETTINGS_FILE, {});
  return records[String(ownerId)] ?? { sessionMode: "single" as const, currentSession: "2026-2027" };
}

export async function saveLocalSessionSettings(ownerId: number, values: { sessionMode: "all" | "single"; currentSession: string }) {
  const records = await readJsonFile<SessionSettingsRecord>(SESSION_SETTINGS_FILE, {});
  records[String(ownerId)] = values;
  await writeJsonFile(SESSION_SETTINGS_FILE, records);
  return values;
}

export async function listLocalSessions(ownerId: number): Promise<LocalSession[]> {
  const records = await readJsonFile<SessionsRecord>(SESSIONS_FILE, {});
  return records[String(ownerId)] ?? [];
}

export async function addLocalSession(ownerId: number, session: Omit<LocalSession, "id" | "ownerId">): Promise<LocalSession[]> {
  const records = await readJsonFile<SessionsRecord>(SESSIONS_FILE, {});
  const current = records[String(ownerId)] ?? [];
  if (current.some((item) => item.sessionLabel === session.sessionLabel)) throw new Error("That session already exists.");
  const nextId = current.reduce((max, item) => Math.max(max, item.id), 0) + 1;
  current.push({ id: nextId, ownerId, ...session });
  records[String(ownerId)] = current;
  await writeJsonFile(SESSIONS_FILE, records);
  return current;
}

export { BRANDING_FILE, SESSION_SETTINGS_FILE, SESSIONS_FILE };
