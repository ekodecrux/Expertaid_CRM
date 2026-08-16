import fs from "fs/promises";
import path from "path";
import { LOCAL_STORAGE_ROOT } from "./storage";
import { DEFAULT_BRANDING, normalizeBranding, type CompanyBranding } from "@shared/branding";
import { DEFAULT_QUOTATION_ADDRESS, DEFAULT_QUOTATION_GST, DEFAULT_QUOTATION_PRODUCTS, DEFAULT_QUOTATION_TERMS, type QuotationProduct } from "@shared/quotation";

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

const defaultQuotationSettings = (): LocalQuotationSettings => ({
  companyGst: DEFAULT_QUOTATION_GST,
  companyAddress: DEFAULT_QUOTATION_ADDRESS,
  validityDays: 15,
  gstRate: "18.00",
  gstMode: "exclusive",
  quotationPrefix: "QT",
  invoiceNumberStart: 129,
  invoiceNumberNext: 129,
  terms: DEFAULT_QUOTATION_TERMS,
  products: DEFAULT_QUOTATION_PRODUCTS,
  logoUrl: null,
  logoKey: null,
  scannerUrl: null,
  scannerKey: null,
  signatureUrl: null,
  signatureKey: null,
  accountCompanyName: "Expertaid Technologies Pvt Ltd.",
  accountNumber: "502000055251128",
  accountIfsc: "HDFC0009147",
  accountBranch: "Ameerpur Branch, Hyd, TS-502032",
});

type QuotationSettingsRecord = Record<string, LocalQuotationSettings>;

export async function getLocalQuotationSettings(ownerId: number): Promise<LocalQuotationSettings> {
  const records = await readJsonFile<QuotationSettingsRecord>(QUOTATION_SETTINGS_FILE, {});
  const saved = records[String(ownerId)];
  return saved ? { ...defaultQuotationSettings(), ...saved, products: saved.products?.length ? saved.products : DEFAULT_QUOTATION_PRODUCTS } : defaultQuotationSettings();
}

export async function saveLocalQuotationSettings(ownerId: number, values: LocalQuotationSettings): Promise<LocalQuotationSettings> {
  const records = await readJsonFile<QuotationSettingsRecord>(QUOTATION_SETTINGS_FILE, {});
  records[String(ownerId)] = { ...defaultQuotationSettings(), ...values, products: values.products };
  await writeJsonFile(QUOTATION_SETTINGS_FILE, records);
  return records[String(ownerId)];
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
export type LocalQuotationSettings = {
  companyGst: string;
  companyAddress: string;
  validityDays: number;
  gstRate: string;
  gstMode: "inclusive" | "exclusive";
  quotationPrefix: string;
  invoiceNumberStart: number;
  invoiceNumberNext: number;
  terms: string;
  products: QuotationProduct[];
  logoUrl: string | null;
  logoKey: string | null;
  scannerUrl: string | null;
  scannerKey: string | null;
  signatureUrl: string | null;
  signatureKey: string | null;
  accountCompanyName: string;
  accountNumber: string;
  accountIfsc: string;
  accountBranch: string;
};

const QUOTATION_SETTINGS_FILE = path.join(LOCAL_STORAGE_ROOT, "settings", "quotation-settings.json");
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

export { BRANDING_FILE, QUOTATION_SETTINGS_FILE, SESSION_SETTINGS_FILE, SESSIONS_FILE };
