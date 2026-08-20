import { and, desc, eq, gte, like, lte, lt, or, sql } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import { agreements, clients, InsertAgreement, InsertClient, InsertQuotation, InsertQuotationSettings, InsertUser, profileSettingsData, projects, quotationEditHistory, quotations, quotationSettings, quotationSettingsData, sessions, users, type InsertProject, type User } from "../drizzle/schema";
import { DEFAULT_QUOTATION_ADDRESS, DEFAULT_QUOTATION_GST, DEFAULT_QUOTATION_TERMS, type QuotationProduct } from "@shared/quotation";
import { DEFAULT_BRANDING, normalizeBranding, type CompanyBranding } from "@shared/branding";
import { formatProjectClientId, nextFutureProjectClientNumber } from "@shared/project";
import { ENV } from './_core/env';
import { nanoid } from "nanoid";
import { addLocalSession, getLocalBranding, getLocalQuotationSettings, getSavedLocalQuotationSettings, getLocalSessionSettings, listLocalSessions, saveLocalBranding, saveLocalQuotationSettings, saveLocalSessionSettings, listLocalQuotations, createLocalQuotation, updateLocalQuotation, deleteLocalQuotation, type LocalQuotationSettings } from './localSettings';

let _db: ReturnType<typeof drizzle> | null = null;

function hasConfiguredDatabase() {
  return Boolean(process.env.DATABASE_URL?.trim());
}

function describeDatabaseError(error: unknown): string {
  const candidate = error as { message?: string; code?: string; errno?: number; sqlState?: string; cause?: { message?: string; code?: string; errno?: number; sqlState?: string } };
  const cause = candidate.cause;
  const message = cause?.message || candidate.message || String(error);
  const code = cause?.code || candidate.code;
  const errno = cause?.errno ?? candidate.errno;
  const sqlState = cause?.sqlState || candidate.sqlState;
  return [message, code && `code=${code}`, errno !== undefined && `errno=${errno}`, sqlState && `sqlState=${sqlState}`].filter(Boolean).join(" | ");
}

export type ProfileSettings = {
  displayName: string;
  avatarInitials: string;
  avatarColor: string;
  roleLabel: string;
  department: string;
  phone: string;
  avatarUrl: string | null;
  avatarKey: string | null;
};

function defaultProfileSettings(fallback: { name?: string | null; role?: string | null }): ProfileSettings {
  const displayName = fallback.name?.trim() || "Workspace administrator";
  return {
    displayName,
    avatarInitials: displayName.split(/\s+/).filter(Boolean).map(part => part[0]).join("").slice(0, 2).toUpperCase() || "AD",
    avatarColor: "#4b43a8",
    roleLabel: fallback.role === "admin" ? "Super Admin" : "Administrator",
    department: "Workspace",
    phone: "",
    avatarUrl: null,
    avatarKey: null,
  };
}

type SettingsEnvelope = {
  profile?: unknown;
  branding?: unknown;
};

function readSettingsEnvelope(profileJson: string): SettingsEnvelope {
  const parsed = JSON.parse(profileJson) as unknown;
  if (parsed && typeof parsed === "object" && ("profile" in parsed || "branding" in parsed)) return parsed as SettingsEnvelope;
  return { profile: parsed };
}

function writeSettingsEnvelope(envelope: SettingsEnvelope): string {
  return JSON.stringify(envelope);
}

async function getSettingsEnvelope(db: NonNullable<Awaited<ReturnType<typeof getDb>>>, ownerId: number): Promise<SettingsEnvelope> {
  const rows = await db.select({ profileJson: profileSettingsData.profileJson }).from(profileSettingsData).where(eq(profileSettingsData.ownerId, ownerId)).limit(1);
  return rows[0] ? readSettingsEnvelope(rows[0].profileJson) : {};
}

function normalizeProfileSettings(value: unknown, fallback: { name?: string | null; role?: string | null }): ProfileSettings {
  const base = defaultProfileSettings(fallback);
  if (!value || typeof value !== "object") return base;
  const candidate = value as Partial<ProfileSettings>;
  return {
    displayName: String(candidate.displayName ?? base.displayName).trim() || base.displayName,
    avatarInitials: String(candidate.avatarInitials ?? base.avatarInitials).trim().slice(0, 3).toUpperCase() || base.avatarInitials,
    avatarColor: /^#[0-9a-f]{6}$/i.test(String(candidate.avatarColor ?? "")) ? String(candidate.avatarColor) : base.avatarColor,
    roleLabel: String(candidate.roleLabel ?? base.roleLabel).trim() || base.roleLabel,
    department: String(candidate.department ?? base.department).trim() || base.department,
    phone: String(candidate.phone ?? "").trim(),
    avatarUrl: typeof candidate.avatarUrl === "string" ? candidate.avatarUrl : null,
    avatarKey: typeof candidate.avatarKey === "string" ? candidate.avatarKey : null,
  };
}

export async function getProfileSettingsForOwner(ownerId: number, fallback: { name?: string | null; role?: string | null }): Promise<ProfileSettings> {
  const base = defaultProfileSettings(fallback);
  const db = await getDb();
  if (!db) return base;
  try {
    const envelope = await getSettingsEnvelope(db, ownerId);
    return normalizeProfileSettings(envelope.profile, fallback);
  } catch (error) {
    if (hasConfiguredDatabase()) throw new Error(`Profile settings database load failed: ${describeDatabaseError(error)}`);
    console.warn("[Profile settings] Could not load profile settings:", error);
    return base;
  }
}

export async function updateProfileSettingsForOwner(ownerId: number, values: Partial<ProfileSettings>, fallback: { name?: string | null; role?: string | null }): Promise<ProfileSettings> {
  const current = await getProfileSettingsForOwner(ownerId, fallback);
  const next = normalizeProfileSettings({ ...current, ...values }, fallback);
  const db = await getDb();
  if (!db) throw new Error("Database is not available");
  try {
    const envelope = await getSettingsEnvelope(db, ownerId);
    const profileJson = writeSettingsEnvelope({ ...envelope, profile: next });
    await db.insert(profileSettingsData).values({ ownerId, profileJson }).onDuplicateKeyUpdate({ set: { profileJson } });
  } catch (error) {
    throw new Error(`Profile settings database save failed: ${describeDatabaseError(error)}`);
  }
  return next;
}

/** Normalize the URL and preserve secure transport for sandbox TiDB connections. */
export function normalizeDatabaseUrl(rawUrl: string): string {
  const cleaned = rawUrl.trim().replace(/^['"]|['"]$/g, "").replace(/^DATABASE_URL\s*=\s*/i, "");
  const withScheme = /^[a-z][a-z\d+.-]*:\/\//i.test(cleaned) ? cleaned : `mysql://${cleaned}`;
  const parsed = new URL(withScheme);
  if (parsed.protocol !== "mysql:" && parsed.protocol !== "mysql2:") {
    throw new Error(`Unsupported DATABASE_URL protocol: ${parsed.protocol}`);
  }
  parsed.protocol = "mysql:";
  parsed.searchParams.delete("ssl");
  parsed.searchParams.delete("ssl-mode");
  return parsed.toString();
}

function createDatabasePool(rawUrl: string): ReturnType<typeof mysql.createPool> {
  let normalizedUrl: string;
  try {
    normalizedUrl = normalizeDatabaseUrl(rawUrl);
  } catch (error) {
    throw new Error(`Invalid DATABASE_URL: ${error instanceof Error ? error.message : String(error)}. Expected mysql://USER:PASSWORD@HOST:3306/DATABASE`);
  }
  const parsed = new URL(normalizedUrl);
  const requiresSecureTransport = parsed.hostname.includes("tidbcloud") || rawUrl.includes("ssl=");
  return mysql.createPool({
    host: parsed.hostname,
    port: parsed.port ? Number(parsed.port) : 3306,
    user: decodeURIComponent(parsed.username),
    password: decodeURIComponent(parsed.password),
    database: decodeURIComponent(parsed.pathname.replace(/^\//, "")),
    ssl: requiresSecureTransport ? { rejectUnauthorized: true } : undefined,
  });
}

export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(createDatabasePool(process.env.DATABASE_URL) as any);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) throw new Error("User openId is required for upsert");
  const db = await getDb();
  if (!db) return;

  const values: InsertUser = { openId: user.openId };
  const updateSet: Record<string, unknown> = {};
  const textFields = ["name", "email", "loginMethod"] as const;
  for (const field of textFields) {
    if (user[field] !== undefined) {
      values[field] = user[field] ?? null;
      updateSet[field] = user[field] ?? null;
    }
  }
  if (user.lastSignedIn !== undefined) {
    values.lastSignedIn = user.lastSignedIn;
    updateSet.lastSignedIn = user.lastSignedIn;
  }
  if (user.role !== undefined) {
    values.role = user.role;
    updateSet.role = user.role;
  } else if (user.openId === ENV.ownerOpenId) {
    values.role = 'admin';
    updateSet.role = 'admin';
  }
  if (!values.lastSignedIn) values.lastSignedIn = new Date();
  if (Object.keys(updateSet).length === 0) updateSet.lastSignedIn = new Date();
  await db.insert(users).values(values).onDuplicateKeyUpdate({ set: updateSet });
}

export async function getBrandingForOwner(ownerId: number) {
  const localFallback = await getLocalBranding(ownerId);
  const db = await getDb();
  if (!db) return localFallback;
  try {
    const envelope = await getSettingsEnvelope(db, ownerId);
    return normalizeBranding((envelope.branding ?? {}) as Partial<CompanyBranding>);
  } catch (error) {
    if (hasConfiguredDatabase()) throw new Error(`Branding database load failed: ${describeDatabaseError(error)}`);
    console.warn("[Branding] Could not load database branding; using local fallback:", error);
    return localFallback;
  }
}

export async function getSessionSettings(ownerId: number) {
  const db = await getDb();
  if (!db) {
    if (hasConfiguredDatabase()) throw new Error("Session settings database is unavailable");
    return getLocalSessionSettings(ownerId);
  }
  try {
    const rows = await db.select({ sessionMode: users.sessionMode, currentSession: users.currentSession }).from(users).where(eq(users.id, ownerId)).limit(1);
    const stored = rows[0];
    if (!stored) throw new Error(`User ${ownerId} was not found`);
    return { sessionMode: stored.sessionMode, currentSession: stored.currentSession };
  } catch (error) {
    throw new Error(`Session settings database load failed: ${describeDatabaseError(error)}`);
  }
}

export async function updateSessionSettings(ownerId: number, values: { sessionMode: "all" | "single"; currentSession: string }) {
  const db = await getDb();
  if (!db) {
    if (hasConfiguredDatabase()) throw new Error("Session settings database is unavailable");
    return saveLocalSessionSettings(ownerId, values);
  }
  try {
    await db.update(users).set(values).where(eq(users.id, ownerId));
    return values;
  } catch (error) {
    throw new Error(`Session settings database save failed: ${describeDatabaseError(error)}`);
  }
}

export async function updateBrandingForOwner(ownerId: number, values: {
  companyLogoUrl?: string | null;
  companyLogoKey?: string | null;
  companyName: string;
  serviceCaption: string;
  footerCompanyName: string;
}) {
  const current = await getBrandingForOwner(ownerId);
  const next = normalizeBranding({ ...current, ...values });
  const db = await getDb();
  if (!db) {
    if (hasConfiguredDatabase()) throw new Error("Branding database is unavailable");
    return saveLocalBranding(ownerId, next);
  }
  try {
    const envelope = await getSettingsEnvelope(db, ownerId);
    const profileJson = writeSettingsEnvelope({ ...envelope, branding: next });
    await db.insert(profileSettingsData).values({ ownerId, profileJson }).onDuplicateKeyUpdate({ set: { profileJson } });
    return next;
  } catch (error) {
    throw new Error(`Branding database save failed: ${describeDatabaseError(error)}`);
  }
}

const AUTH_USER_FIELDS = {
  id: users.id,
  email: users.email,
} as const;

type AuthUserRow = Pick<User, "id" | "email">;

const asAuthUser = (row: AuthUserRow | undefined): User | undefined => row ? ({
  ...row,
  openId: `credential:${row.id}`,
  name: row.email,
  loginMethod: "email",
  role: "admin",
} as User) : undefined;

function getCredentialSessionUser(openId: string): User | undefined {
  if (openId !== "credential-admin" && !openId.startsWith("credential:")) return undefined;
  const parsedId = openId.startsWith("credential:") ? Number(openId.slice("credential:".length)) : 1;
  return {
    id: Number.isFinite(parsedId) && parsedId > 0 ? parsedId : 1,
    openId,
    name: "Workspace administrator",
    email: ENV.crmLoginEmail || "",
    loginMethod: "email",
    role: "admin",
  } as User;
}

export async function getUserByOpenId(openId: string) {
  const credentialUser = getCredentialSessionUser(openId);
  if (credentialUser) return credentialUser;
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select(AUTH_USER_FIELDS).from(users).where(eq(users.openId, openId)).limit(1);
  return asAuthUser(result[0]);
}

export async function getUserByEmail(email: string) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select(AUTH_USER_FIELDS).from(users).where(eq(users.email, email)).limit(1);
  return asAuthUser(result[0]);
}

function normalizeStoredQuotationSettings(value: unknown): LocalQuotationSettings | undefined {
  if (!value || typeof value !== "object") return undefined;
  const candidate = value as Partial<LocalQuotationSettings>;
  if (typeof candidate.companyGst !== "string" || typeof candidate.companyAddress !== "string" || !Array.isArray(candidate.products)) return undefined;
  return {
    companyGst: candidate.companyGst,
    companyAddress: candidate.companyAddress,
    validityDays: Number(candidate.validityDays ?? 15),
    gstRate: String(candidate.gstRate ?? "18.00"),
    gstMode: candidate.gstMode === "inclusive" ? "inclusive" : "exclusive",
    quotationPrefix: String(candidate.quotationPrefix ?? "QT"),
    invoiceNumberStart: Number(candidate.invoiceNumberStart ?? 129),
    invoiceNumberNext: Number(candidate.invoiceNumberNext ?? candidate.invoiceNumberStart ?? 129),
    terms: String(candidate.terms ?? DEFAULT_QUOTATION_TERMS),
    products: candidate.products as QuotationProduct[],
    logoUrl: candidate.logoUrl ?? null,
    logoKey: candidate.logoKey ?? null,
    scannerUrl: candidate.scannerUrl ?? null,
    scannerKey: candidate.scannerKey ?? null,
    signatureUrl: candidate.signatureUrl ?? null,
    signatureKey: candidate.signatureKey ?? null,
    accountCompanyName: String(candidate.accountCompanyName ?? "Expertaid Technologies Pvt Ltd."),
    accountNumber: String(candidate.accountNumber ?? "502000055251128"),
    accountIfsc: String(candidate.accountIfsc ?? "HDFC0009147"),
    accountBranch: String(candidate.accountBranch ?? "Ameerpur Branch, Hyd, TS-502032"),
  };
}

function quotationSettingsRowToLocal(row: typeof quotationSettings.$inferSelect): LocalQuotationSettings {
  let products: QuotationProduct[] = [];
  try {
    products = JSON.parse(row.productsJson) as QuotationProduct[];
  } catch {
    products = [];
  }
  const parsed = normalizeStoredQuotationSettings({ ...row, products });
  if (!parsed) throw new Error("Stored quotationSettings row is incomplete");
  return parsed;
}

async function saveQuotationSettingsToDatabase(ownerId: number, settings: LocalQuotationSettings) {
  const db = await getDb();
  if (!db) return false;
  try {
    const values: InsertQuotationSettings = {
      ownerId,
      companyGst: settings.companyGst,
      companyAddress: settings.companyAddress,
      validityDays: settings.validityDays,
      gstRate: settings.gstRate,
      gstMode: settings.gstMode,
      quotationPrefix: settings.quotationPrefix,
      invoiceNumberStart: settings.invoiceNumberStart,
      invoiceNumberNext: settings.invoiceNumberNext,
      terms: settings.terms,
      productsJson: JSON.stringify(settings.products),
      logoUrl: settings.logoUrl,
      logoKey: settings.logoKey,
      scannerUrl: settings.scannerUrl,
      scannerKey: settings.scannerKey,
      signatureUrl: settings.signatureUrl,
      signatureKey: settings.signatureKey,
      accountCompanyName: settings.accountCompanyName,
      accountNumber: settings.accountNumber,
      accountIfsc: settings.accountIfsc,
      accountBranch: settings.accountBranch,
    };
    await db.transaction(async (tx) => {
      await tx.delete(quotationSettings).where(eq(quotationSettings.ownerId, ownerId));
      await tx.insert(quotationSettings).values(values);
    });
    return true;
  } catch (error) {
    throw new Error(`Quotation settings database save failed: ${describeDatabaseError(error)}`);
  }
}

export async function getQuotationSettingsForOwner(ownerId: number) {
  const db = await getDb();
  if (!db) {
    if (hasConfiguredDatabase()) throw new Error("Quotation settings database is unavailable");
    return getLocalQuotationSettings(ownerId);
  }

  try {
    const storedRows = await db.select().from(quotationSettings).where(eq(quotationSettings.ownerId, ownerId)).limit(1);
    const stored = storedRows[0];
    if (stored) return quotationSettingsRowToLocal(stored);
  } catch (error) {
    throw new Error(`Quotation settings database load failed: ${describeDatabaseError(error)}`);
  }

  const saved = await getSavedLocalQuotationSettings(ownerId);
  const defaults = saved ?? await getLocalQuotationSettings(ownerId);
  if (!(await saveQuotationSettingsToDatabase(ownerId, defaults))) {
    await saveLocalQuotationSettings(ownerId, defaults);
  }
  return defaults;
}

export async function allocateInvoiceNumberForOwner(ownerId: number) {
  const current = await getQuotationSettingsForOwner(ownerId);
  const configuredNext = Number(current.invoiceNumberNext ?? current.invoiceNumberStart ?? 129);
  const db = await getDb();
  let highestExisting = 0;
  if (db) {
    try {
      const rows = await db.select({ latest: sql<number>`MAX(CAST(${quotations.invoiceNumber} AS UNSIGNED))` }).from(quotations).where(eq(quotations.ownerId, ownerId));
      highestExisting = Number(rows[0]?.latest ?? 0);
    } catch {
      // Keep the configured counter when a legacy quotations table cannot be queried.
    }
  } else {
    highestExisting = (await listLocalQuotations(ownerId)).reduce((max, row) => Math.max(max, Number(row.invoiceNumber ?? 0)), 0);
  }
  const next = Math.max(configuredNext, highestExisting + 1);
  const updated = { ...current, invoiceNumberNext: next + 1 };
  if (!(await saveQuotationSettingsToDatabase(ownerId, updated))) await saveLocalQuotationSettings(ownerId, updated);
  return String(next);
}

export async function updateQuotationSettingsForOwner(ownerId: number, values: Partial<Omit<InsertQuotationSettings, "ownerId" | "productsJson">> & { products: QuotationProduct[] }) {
  const current = await getQuotationSettingsForOwner(ownerId);
  const { products, ...fields } = values;
  const nextStart = fields.invoiceNumberStart ?? current.invoiceNumberStart;
  const nextNumber = fields.invoiceNumberNext ?? (fields.invoiceNumberStart !== undefined && Number(current.invoiceNumberNext) === Number(current.invoiceNumberStart) ? nextStart : current.invoiceNumberNext);
  const completeFields: LocalQuotationSettings = {
    companyGst: fields.companyGst ?? current.companyGst,
    companyAddress: fields.companyAddress ?? current.companyAddress,
    validityDays: fields.validityDays ?? current.validityDays,
    gstRate: fields.gstRate ?? current.gstRate,
    gstMode: fields.gstMode ?? current.gstMode,
    quotationPrefix: fields.quotationPrefix ?? current.quotationPrefix ?? "QT",
    invoiceNumberStart: nextStart,
    invoiceNumberNext: nextNumber,
    terms: fields.terms ?? current.terms,
    products,
    logoUrl: fields.logoUrl !== undefined ? fields.logoUrl : current.logoUrl,
    logoKey: fields.logoKey !== undefined ? fields.logoKey : current.logoKey,
    scannerUrl: fields.scannerUrl !== undefined ? fields.scannerUrl : current.scannerUrl,
    scannerKey: fields.scannerKey !== undefined ? fields.scannerKey : current.scannerKey,
    signatureUrl: fields.signatureUrl !== undefined ? fields.signatureUrl : current.signatureUrl,
    signatureKey: fields.signatureKey !== undefined ? fields.signatureKey : current.signatureKey,
    accountCompanyName: fields.accountCompanyName ?? current.accountCompanyName,
    accountNumber: fields.accountNumber ?? current.accountNumber,
    accountIfsc: fields.accountIfsc ?? current.accountIfsc,
    accountBranch: fields.accountBranch ?? current.accountBranch,
  };
  if (!(await saveQuotationSettingsToDatabase(ownerId, completeFields))) throw new Error("Database is not available");
  return completeFields;
}

export async function updateQuotationForOwner(ownerId: number, quotationId: number, values: Partial<InsertQuotation>, editor: { id: number; name: string }) {
  const db = await getDb();
  if (!db) {
    const localExisting = (await listLocalQuotations(ownerId)).find((row) => row.id === quotationId);
    if (!localExisting) throw new Error("Quotation not found");
    return updateLocalQuotation(ownerId, quotationId, { ...values, lastEditedBy: editor.id, lastEditedByName: editor.name, lastEditedAt: new Date().toISOString() });
  }
  const rows = await db.select().from(quotations).where(and(eq(quotations.id, quotationId), eq(quotations.ownerId, ownerId))).limit(1);
  const existing = rows[0];
  if (!existing) throw new Error("Quotation not found");
  const snapshot = { ...existing, items: JSON.parse(existing.itemsJson) };
  await db.update(quotations).set({ ...values, lastEditedBy: editor.id, lastEditedByName: editor.name, lastEditedAt: new Date() }).where(and(eq(quotations.id, quotationId), eq(quotations.ownerId, ownerId)));
  await db.insert(quotationEditHistory).values({ quotationId, ownerId, editedBy: editor.id, editedByName: editor.name, snapshotJson: JSON.stringify(snapshot) });
  const updated = await db.select().from(quotations).where(eq(quotations.id, quotationId)).limit(1);
  return updated[0] ? { ...updated[0], items: JSON.parse(updated[0].itemsJson) as unknown[] } : null;
}

export async function deleteQuotationForOwner(ownerId: number, quotationId: number) {
  const db = await getDb();
  if (!db) {
    if (await deleteLocalQuotation(ownerId, quotationId)) return { success: true };
    throw new Error("Database is not available");
  }
  await db.delete(quotations).where(and(eq(quotations.id, quotationId), eq(quotations.ownerId, ownerId)));
  return { success: true };
}

export async function listQuotationEditHistoryForOwner(ownerId: number, quotationId: number) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(quotationEditHistory).where(and(eq(quotationEditHistory.ownerId, ownerId), eq(quotationEditHistory.quotationId, quotationId))).orderBy(desc(quotationEditHistory.editedAt));
}

export async function listQuotationsForOwner(ownerId: number) {
  const db = await getDb();
  if (!db) {
    if (hasConfiguredDatabase()) throw new Error("Quotation database is unavailable");
    return listLocalQuotations(ownerId);
  }
  try {
    const rows = await db.select().from(quotations).where(eq(quotations.ownerId, ownerId)).orderBy(desc(quotations.createdAt));
    return rows.map((row) => ({ ...row, items: JSON.parse(row.itemsJson) as unknown[] }));
  } catch (error) {
    console.error("[Quotations] Database listing failed:", error);
    throw error;
  }
}

export async function getNextEstimationNumberForClient(ownerId: number, clientName: string) {
  const db = await getDb();
  const local = await listLocalQuotations(ownerId);
  const localLatest = local.filter((row) => row.clientName === clientName.trim()).reduce((max, row) => Math.max(max, Number(row.estimationNumber ?? 0)), 0);
  if (!db) return localLatest + 1;
  try {
    const rows = await db.select({ latest: sql<number>`MAX(${quotations.estimationNumber})` }).from(quotations).where(and(eq(quotations.ownerId, ownerId), eq(quotations.clientName, clientName.trim())));
    return Math.max(Number(rows[0]?.latest ?? 0), localLatest) + 1;
  } catch {
    return localLatest + 1;
  }
}

export async function createQuotation(input: InsertQuotation & { quotationPrefix?: string }) {
  const db = await getDb();
  const { quotationPrefix, ...quotationInput } = input;
  if (!db) {
    const local = await listLocalQuotations(input.ownerId);
    const id = local.reduce((max, row) => Math.max(max, row.id), 0) + 1;
    const quotationNumber = quotationInput.invoiceNumber ? `${String(quotationPrefix || "QT").trim()}${quotationInput.invoiceNumber}` : `QT${new Date().getFullYear()}${id.toString().padStart(4, "0")}`;
    return createLocalQuotation(input.ownerId, { ...quotationInput, quotationNumber });
  }
  try {
    const result = await db.insert(quotations).values(quotationInput);
    const id = Number(result[0].insertId);
    const quotationNumber = quotationInput.invoiceNumber ? `${String(quotationPrefix || "QT").trim()}${quotationInput.invoiceNumber}` : `QT${new Date().getFullYear()}${id.toString().padStart(4, "0")}`;
    await db.update(quotations).set({ quotationNumber }).where(eq(quotations.id, id));
    const rows = await db.select().from(quotations).where(eq(quotations.id, id)).limit(1);
    return rows[0] ? { ...rows[0], items: JSON.parse(rows[0].itemsJson) as unknown[] } : undefined;
  } catch (error) {
    const detail = describeDatabaseError(error);
    console.error("[Quotations] Database insert failed; quotation was not saved:", detail);
    throw new Error(`Quotation database save failed: ${detail}`);
  }
}

export async function listProjectsForOwner(ownerId: number) {
  const db = await getDb();
  if (!db) return [];
  const rows = await db.select().from(projects).where(eq(projects.ownerId, ownerId)).orderBy(desc(projects.createdAt));
  const counts = await db.select({ projectId: agreements.projectId, count: sql<number>`count(*)` }).from(agreements).where(eq(agreements.ownerId, ownerId)).groupBy(agreements.projectId);
  const countMap = new Map(counts.filter((row) => row.projectId != null).map((row) => [Number(row.projectId), Number(row.count)]));
  return rows.map((project) => ({ ...project, linkedClientCount: countMap.get(project.id) ?? 0 }));
}

export async function createProjectForOwner(ownerId: number, values: Pick<InsertProject, "name" | "clientIdPrefix" | "clientIdStart">) {
  const db = await getDb();
  if (!db) throw new Error("Database is not available");
  const start = Math.max(1, Math.trunc(Number(values.clientIdStart ?? 1)));
  const result = await db.insert(projects).values({ ownerId, name: values.name.trim(), clientIdPrefix: values.clientIdPrefix.trim(), clientIdStart: start, nextClientId: start });
  const rows = await db.select().from(projects).where(eq(projects.id, Number(result[0].insertId))).limit(1);
  return rows[0];
}

export async function updateProjectForOwner(ownerId: number, id: number, values: Pick<InsertProject, "name" | "clientIdPrefix" | "clientIdStart">) {
  const db = await getDb();
  if (!db) throw new Error("Database is not available");
  const current = await db.select().from(projects).where(and(eq(projects.ownerId, ownerId), eq(projects.id, id))).limit(1);
  if (!current[0]) throw new Error("Project not found");
  const start = Math.max(1, Math.trunc(Number(values.clientIdStart ?? 1)));
  const nextClientId = nextFutureProjectClientNumber(current[0].nextClientId, start);
  await db.update(projects).set({ name: values.name.trim(), clientIdPrefix: values.clientIdPrefix.trim(), clientIdStart: start, nextClientId }).where(and(eq(projects.ownerId, ownerId), eq(projects.id, id)));
  const rows = await db.select().from(projects).where(eq(projects.id, id)).limit(1);
  return rows[0];
}

export async function setMainProjectForOwner(ownerId: number, id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database is not available");
  return db.transaction(async (tx) => {
    const target = await tx.select().from(projects).where(and(eq(projects.ownerId, ownerId), eq(projects.id, id))).limit(1);
    if (!target[0]) throw new Error("Project not found");
    await tx.update(projects).set({ isMain: false }).where(eq(projects.ownerId, ownerId));
    await tx.update(projects).set({ isMain: true }).where(and(eq(projects.ownerId, ownerId), eq(projects.id, id)));
    const rows = await tx.select().from(projects).where(and(eq(projects.ownerId, ownerId), eq(projects.id, id))).limit(1);
    return rows[0];
  });
}

export async function deleteProjectForOwner(ownerId: number, id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database is not available");
  const linked = await db.select({ count: sql<number>`count(*)` }).from(agreements).where(and(eq(agreements.ownerId, ownerId), eq(agreements.projectId, id)));
  const linkedClients = await db.select({ count: sql<number>`count(*)` }).from(clients).where(and(eq(clients.ownerId, ownerId), eq(clients.projectId, id)));
  if (Number(linked[0]?.count ?? 0) + Number(linkedClients[0]?.count ?? 0) > 0) throw new Error("This project cannot be deleted because it has linked clients or agreements.");
  await db.delete(projects).where(and(eq(projects.ownerId, ownerId), eq(projects.id, id)));
  return { success: true } as const;
}

export async function createAgreementForProject(ownerId: number, projectId: number, input: Omit<InsertAgreement, "ownerId" | "projectId" | "clientId">) {
  const db = await getDb();
  if (!db) throw new Error("Database is not available");
  return db.transaction(async (tx) => {
    const projectRows = await tx.select().from(projects).where(and(eq(projects.ownerId, ownerId), eq(projects.id, projectId))).limit(1);
    const project = projectRows[0];
    if (!project) throw new Error("Selected project was not found");
    const number = project.nextClientId;
    const clientId = formatProjectClientId(project.clientIdPrefix, number);
    await tx.update(projects).set({ nextClientId: number + 1 }).where(and(eq(projects.id, projectId), eq(projects.ownerId, ownerId), eq(projects.nextClientId, number)));
    const result = await tx.insert(agreements).values({ ...input, ownerId, projectId, clientId });
    const rows = await tx.select().from(agreements).where(eq(agreements.id, Number(result[0].insertId))).limit(1);
    return rows[0];
  });
}

export async function createAgreement(input: InsertAgreement) {
  const db = await getDb();
  if (!db) throw new Error("Database is not available");
  const result = await db.insert(agreements).values(input);
  const id = Number(result[0].insertId);
  const rows = await db.select().from(agreements).where(eq(agreements.id, id)).limit(1);
  return rows[0];
}

function addMonthsToDate(value: string, months: number) {
  const date = new Date(`${value}T00:00:00Z`);
  date.setUTCMonth(date.getUTCMonth() + months);
  return date.toISOString().slice(0, 10);
}

export async function renewAgreementForOwner(ownerId: number, agreementId: number, renewalType: "continuous" | "sixMonths" | "oneYear") {
  const db = await getDb();
  if (!db) throw new Error("Database is not available");
  return db.transaction(async (tx) => {
    const rows = await tx.select().from(agreements).where(and(eq(agreements.id, agreementId), eq(agreements.ownerId, ownerId))).limit(1);
    const original = rows[0];
    if (!original) throw new Error("Agreement not found or you do not have permission to renew it.");
    if (original.status !== "Approved") throw new Error("Only an approved ERP agreement can be renewed.");
    const project = original.projectId ? (await tx.select().from(projects).where(and(eq(projects.id, original.projectId), eq(projects.ownerId, ownerId))).limit(1))[0] : undefined;
    if (!project?.isMain) throw new Error("Renewal is available only for the Main ERP project.");
    const startDate = renewalType === "continuous" ? original.startDate : addMonthsToDate(original.endDate, renewalType === "sixMonths" ? 6 : 12);
    const endDate = addMonthsToDate(original.endDate, Math.max(1, original.noOfYearPlan) * 12 + (renewalType === "continuous" ? 0 : renewalType === "sixMonths" ? 6 : 12));
    await tx.update(agreements).set({ clientStatus: "Renewal" }).where(eq(agreements.id, original.id));
    const { id: _id, createdAt: _createdAt, updatedAt: _updatedAt, status: _status, clientStatus: _clientStatus, renewalOfAgreementId: _renewalOfAgreementId, renewalType: _renewalType, signatureUrl: _signatureUrl, signatureKey: _signatureKey, signatureDate: _signatureDate, decidedAt: _decidedAt, publicToken: _publicToken, ...copy } = original;
    const result = await tx.insert(agreements).values({ ...copy, ownerId, projectId: original.projectId, clientId: original.clientId, publicToken: nanoid(24), status: "Pending", clientStatus: "Renewal", renewalOfAgreementId: original.id, renewalType, signatureUrl: null, signatureKey: null, signatureDate: null, decidedAt: null, startDate, endDate });
    const created = await tx.select().from(agreements).where(eq(agreements.id, Number(result[0].insertId))).limit(1);
    return created[0];
  });
}

function defaultSessionDates(label: string) {
  const [startYear, endYear] = label.split("-").map(Number);
  return { startDate: `${startYear}-04-01`, endDate: `${endYear}-03-31` };
}

export async function listSessionsForOwner(ownerId: number) {
  const settings = await getSessionSettings(ownerId);
  const db = await getDb();
  if (!db) {
    const rows = await listLocalSessions(ownerId);
    if (rows.some((row) => row.sessionLabel === settings.currentSession)) return rows;
    const dates = defaultSessionDates(settings.currentSession);
    return [{ id: 0, ownerId, sessionLabel: settings.currentSession, ...dates }, ...rows];
  }
  try {
    let rows = await db.select().from(sessions).where(eq(sessions.ownerId, ownerId)).orderBy(desc(sessions.createdAt));
    if (!rows.some((row) => row.sessionLabel === settings.currentSession)) {
      const dates = defaultSessionDates(settings.currentSession);
      await db.insert(sessions).values({ ownerId, sessionLabel: settings.currentSession, ...dates });
      rows = await db.select().from(sessions).where(eq(sessions.ownerId, ownerId)).orderBy(desc(sessions.createdAt));
    }
    return rows;
  } catch (error) {
    throw new Error(`Session database load failed: ${describeDatabaseError(error)}`);
  }
}

export async function createSessionForOwner(ownerId: number, values: { sessionLabel: string; startDate: string; endDate: string }) {
  const db = await getDb();
  if (!db) {
    if (hasConfiguredDatabase()) throw new Error("Session database is unavailable");
    return addLocalSession(ownerId, values);
  }
  try {
    const existing = await db.select({ id: sessions.id }).from(sessions).where(and(eq(sessions.ownerId, ownerId), eq(sessions.sessionLabel, values.sessionLabel))).limit(1);
    if (existing[0]) throw new Error("That session already exists.");
    const result = await db.insert(sessions).values({ ownerId, ...values });
    const rows = await db.select().from(sessions).where(eq(sessions.id, Number(result[0].insertId))).limit(1);
    return rows[0];
  } catch (error) {
    throw new Error(`Session database save failed: ${describeDatabaseError(error)}`);
  }
}

export async function updateSessionRecordForOwner(ownerId: number, sessionId: number, values: { sessionLabel: string; startDate: string; endDate: string }) {
  const db = await getDb();
  if (!db) throw new Error("Database is not available");
  try {
    const duplicate = await db.select({ id: sessions.id }).from(sessions).where(and(eq(sessions.ownerId, ownerId), eq(sessions.sessionLabel, values.sessionLabel), sql`${sessions.id} <> ${sessionId}`)).limit(1);
    if (duplicate[0]) throw new Error("That session already exists.");
    await db.update(sessions).set(values).where(and(eq(sessions.id, sessionId), eq(sessions.ownerId, ownerId)));
    const rows = await db.select().from(sessions).where(and(eq(sessions.id, sessionId), eq(sessions.ownerId, ownerId))).limit(1);
    if (!rows[0]) throw new Error("Session not found");
    return rows[0];
  } catch (error) {
    throw new Error(`Session database update failed: ${describeDatabaseError(error)}`);
  }
}

export async function deleteSessionForOwner(ownerId: number, sessionId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database is not available");
  try {
    const rows = await db.select({ sessionLabel: sessions.sessionLabel }).from(sessions).where(and(eq(sessions.id, sessionId), eq(sessions.ownerId, ownerId))).limit(1);
    if (!rows[0]) throw new Error("Session not found");
    const settings = await getSessionSettings(ownerId);
    if (rows[0].sessionLabel === settings.currentSession) throw new Error("Change the current session before deleting it.");
    await db.delete(sessions).where(and(eq(sessions.id, sessionId), eq(sessions.ownerId, ownerId)));
    return { success: true };
  } catch (error) {
    throw new Error(`Session database delete failed: ${describeDatabaseError(error)}`);
  }
}

export async function listAgreementsForOwner(ownerId: number, scope?: { sessionMode: "all" | "single"; currentSession: string }) {
  const db = await getDb();
  if (!db) return [];
  const where = scope?.sessionMode === "single" ? and(eq(agreements.ownerId, ownerId), eq(agreements.session, scope.currentSession)) : eq(agreements.ownerId, ownerId);
  return db.select().from(agreements).where(where).orderBy(desc(agreements.createdAt));
}

export async function createClientForOwner(ownerId: number, projectId: number, values: Omit<InsertClient, "ownerId" | "projectId" | "clientId">) {
  const db = await getDb();
  if (!db) throw new Error("Database is not available");
  return db.transaction(async (tx) => {
    const projectRows = await tx.select().from(projects).where(and(eq(projects.ownerId, ownerId), eq(projects.id, projectId))).limit(1);
    const project = projectRows[0];
    if (!project) throw new Error("Project not found");
    const sequence = Math.max(1, Math.trunc(Number(project.nextClientId)));
    const clientId = formatProjectClientId(project.clientIdPrefix, sequence);
    const inserted = await tx.insert(clients).values({ ...values, ownerId, projectId, clientId });
    await tx.update(projects).set({ nextClientId: sequence + 1 }).where(and(eq(projects.ownerId, ownerId), eq(projects.id, projectId)));
    const rows = await tx.select().from(clients).where(eq(clients.id, Number(inserted[0].insertId))).limit(1);
    return rows[0];
  });
}

export async function updateClientForOwner(ownerId: number, clientId: number, values: Partial<Omit<InsertClient, "id" | "ownerId" | "projectId" | "clientId" | "createdAt" | "updatedAt">>) {
  const db = await getDb();
  if (!db) throw new Error("Database is not available");
  await db.update(clients).set(values).where(and(eq(clients.id, clientId), eq(clients.ownerId, ownerId)));
  const rows = await db.select().from(clients).where(and(eq(clients.id, clientId), eq(clients.ownerId, ownerId))).limit(1);
  if (!rows[0]) throw new Error("Client not found or you do not have permission to edit it.");
  return rows[0];
}
export type ClientManualStatus = "Active" | "Inactive" | "Hold" | "Cancelled" | "Renewal" | "Extended" | "Closed";

export async function updateAgreementClientStatus(ownerId: number, agreementId: number, status: ClientManualStatus) {
  const db = await getDb();
  if (!db) throw new Error("Database is not available");
  await db.update(agreements).set({ clientStatus: status }).where(and(eq(agreements.id, agreementId), eq(agreements.ownerId, ownerId)));
  const predicate = and(eq(agreements.id, agreementId), eq(agreements.ownerId, ownerId));
  const rows = await db.select().from(agreements).where(predicate).limit(1);
  if (!rows[0]) throw new Error("Client agreement not found or you do not have permission to edit it.");
  return rows[0];
}

export async function listApprovedClientsForOwner(ownerId: number, options: { page: number; pageSize: number; search?: string; instituteType?: "School" | "College" | "Academy"; clientStatus?: ClientManualStatus | "Ready to Expire" | "Expired"; startDate?: string; endDate?: string; branchCoverage?: "individual" | "multiple"; minValue?: number; maxValue?: number; sessionMode?: "all" | "single"; currentSession?: string }) {
  const db = await getDb();
  if (!db) return { items: [], total: 0, page: options.page, pageSize: options.pageSize, totalPages: 0, summary: { students: 0, value: 0 } };
  const search = options.search?.trim();
  const today = new Date().toISOString().slice(0, 10);
  const agreementFilters = [eq(agreements.ownerId, ownerId), eq(agreements.status, "Approved" as const)];
  const clientFilters = [eq(clients.ownerId, ownerId)];
  if (options.sessionMode === "single" && options.currentSession) {
    agreementFilters.push(eq(agreements.session, options.currentSession));
    clientFilters.push(eq(clients.session, options.currentSession));
  }
  if (options.instituteType) {
    agreementFilters.push(eq(agreements.instituteType, options.instituteType));
    clientFilters.push(eq(clients.instituteType, options.instituteType));
  }
  if (options.clientStatus === "Active") {
    agreementFilters.push(gte(agreements.endDate, today), sql`(${agreements.clientStatus} IS NULL OR ${agreements.clientStatus} = 'Active')`);
    clientFilters.push(eq(clients.status, "Active"));
  }
  if (options.clientStatus === "Ready to Expire") {
    agreementFilters.push(sql`${agreements.endDate} BETWEEN ${today} AND DATE_ADD(${today}, INTERVAL 5 DAY)`);
    clientFilters.push(sql`${clients.endDate} BETWEEN ${today} AND DATE_ADD(${today}, INTERVAL 5 DAY)`);
  }
  if (options.clientStatus === "Expired") {
    agreementFilters.push(lt(agreements.endDate, today));
    clientFilters.push(lt(clients.endDate, today));
  }
  if (["Inactive", "Hold", "Cancelled", "Renewal", "Extended", "Closed"].includes(options.clientStatus ?? "")) {
    agreementFilters.push(eq(agreements.clientStatus, options.clientStatus as ClientManualStatus));
    clientFilters.push(eq(clients.status, options.clientStatus as ClientManualStatus));
  }
  if (options.startDate) {
    agreementFilters.push(gte(agreements.startDate, options.startDate));
    clientFilters.push(gte(clients.startDate, options.startDate));
  }
  if (options.endDate) {
    agreementFilters.push(lte(agreements.endDate, options.endDate));
    clientFilters.push(lte(clients.endDate, options.endDate));
  }
  if (options.branchCoverage) {
    agreementFilters.push(eq(agreements.branchCoverage, options.branchCoverage));
    clientFilters.push(eq(clients.branchCoverage, options.branchCoverage));
  }
  if (options.minValue !== undefined) {
    agreementFilters.push(gte(agreements.totalPrice, options.minValue.toFixed(2)));
    clientFilters.push(gte(clients.totalPrice, options.minValue.toFixed(2)));
  }
  if (options.maxValue !== undefined) {
    agreementFilters.push(lte(agreements.totalPrice, options.maxValue.toFixed(2)));
    clientFilters.push(lte(clients.totalPrice, options.maxValue.toFixed(2)));
  }
  if (search) {
    const pattern = `%${search}%`;
    agreementFilters.push(or(like(agreements.clientName, pattern), like(agreements.clientOwnerName, pattern), like(agreements.email, pattern), like(agreements.contactNumber, pattern), like(agreements.instituteType, pattern))!);
    clientFilters.push(or(like(clients.clientName, pattern), like(clients.clientOwnerName, pattern), like(clients.email, pattern), like(clients.contactNumber, pattern), like(clients.instituteType, pattern))!);
  }
  const [agreementItems, standaloneItems] = await Promise.all([
    db.select().from(agreements).where(and(...agreementFilters)).orderBy(desc(agreements.createdAt)),
    db.select().from(clients).where(and(...clientFilters)).orderBy(desc(clients.createdAt)),
  ]);
  const normalizedStandalone = standaloneItems.map((client) => ({ ...client, id: -client.id, signatureDate: null, decidedAt: null }));
  const combined = [...agreementItems, ...normalizedStandalone].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  const total = combined.length;
  const pageItems = combined.slice((options.page - 1) * options.pageSize, options.page * options.pageSize);
  const students = combined.reduce((sum, item) => sum + Number(item.noOfStudents ?? 0), 0);
  const value = combined.reduce((sum, item) => sum + Number(item.totalPrice ?? 0), 0);
  return { items: pageItems, total, page: options.page, pageSize: options.pageSize, totalPages: Math.ceil(total / options.pageSize), summary: { students, value } };
}

export async function getAgreementByToken(publicToken: string) {
  const db = await getDb();
  if (!db) return undefined;
  const rows = await db.select().from(agreements).where(eq(agreements.publicToken, publicToken)).limit(1);
  return rows[0];
}

export async function updateAgreement(publicToken: string, ownerId: number, values: Partial<InsertAgreement>) {
  const db = await getDb();
  if (!db) throw new Error("Database is not available");
  await db.update(agreements).set(values).where(and(eq(agreements.publicToken, publicToken), eq(agreements.ownerId, ownerId)));
  const rows = await db.select().from(agreements).where(and(eq(agreements.publicToken, publicToken), eq(agreements.ownerId, ownerId))).limit(1);
  return rows[0];
}

export async function updateAgreementDecision(publicToken: string, values: Pick<InsertAgreement, "status" | "signatureUrl" | "signatureKey" | "signatureDate" | "decidedAt">) {
  const db = await getDb();
  if (!db) throw new Error("Database is not available");
  await db.update(agreements).set(values).where(eq(agreements.publicToken, publicToken));
  return getAgreementByToken(publicToken);
}
