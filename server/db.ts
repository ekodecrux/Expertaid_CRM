import { and, desc, eq, gte, like, lte, lt, or, sql } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import { agreements, InsertAgreement, InsertQuotation, InsertQuotationSettings, InsertUser, profileSettingsData, quotationEditHistory, quotations, quotationSettings, quotationSettingsData, sessions, users, type User } from "../drizzle/schema";
import { DEFAULT_QUOTATION_ADDRESS, DEFAULT_QUOTATION_GST, DEFAULT_QUOTATION_PRODUCTS, DEFAULT_QUOTATION_TERMS, type QuotationProduct } from "@shared/quotation";
import { DEFAULT_BRANDING, normalizeBranding } from "@shared/branding";
import { ENV } from './_core/env';
import { addLocalSession, getLocalBranding, getLocalQuotationSettings, getSavedLocalQuotationSettings, getLocalSessionSettings, listLocalSessions, saveLocalBranding, saveLocalQuotationSettings, saveLocalSessionSettings, listLocalQuotations, createLocalQuotation, updateLocalQuotation, deleteLocalQuotation, type LocalQuotationSettings } from './localSettings';

let _db: ReturnType<typeof drizzle> | null = null;

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
    const rows = await db.select({ profileJson: profileSettingsData.profileJson }).from(profileSettingsData).where(eq(profileSettingsData.ownerId, ownerId)).limit(1);
    if (!rows[0]) return base;
    return normalizeProfileSettings(JSON.parse(rows[0].profileJson), fallback);
  } catch (error) {
    console.warn("[Profile settings] Could not load profile settings:", error);
    return base;
  }
}

export async function updateProfileSettingsForOwner(ownerId: number, values: Partial<ProfileSettings>, fallback: { name?: string | null; role?: string | null }): Promise<ProfileSettings> {
  const current = await getProfileSettingsForOwner(ownerId, fallback);
  const next = normalizeProfileSettings({ ...current, ...values }, fallback);
  const db = await getDb();
  if (!db) throw new Error("Database is not available");
  const profileJson = JSON.stringify(next);
  try {
    const updated = await db.update(profileSettingsData).set({ profileJson }).where(eq(profileSettingsData.ownerId, ownerId));
    if (Number((updated as { affectedRows?: number }).affectedRows ?? 0) > 0) return next;
  } catch {
    // Some legacy deployments reject the update shape; the insert path below remains safe.
  }
  try {
    await db.insert(profileSettingsData).values({ ownerId, profileJson });
  } catch (error) {
    // A concurrent request can win the insert race. Retry by ownerId without relying on the id column.
    const retry = await db.update(profileSettingsData).set({ profileJson }).where(eq(profileSettingsData.ownerId, ownerId));
    if (Number((retry as { affectedRows?: number }).affectedRows ?? 0) === 0) throw error;
  }
  return next;
}

/** Normalize the URL and preserve secure transport for sandbox TiDB connections. */
export function normalizeDatabaseUrl(rawUrl: string): string {
  try {
    const parsed = new URL(rawUrl);
    parsed.searchParams.delete("ssl");
    parsed.searchParams.delete("ssl-mode");
    return parsed.toString();
  } catch {
    return rawUrl;
  }
}

function createDatabasePool(rawUrl: string): ReturnType<typeof mysql.createPool> {
  const normalizedUrl = normalizeDatabaseUrl(rawUrl);
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
  return getLocalBranding(ownerId);
}

export async function getSessionSettings(ownerId: number) {
  return getLocalSessionSettings(ownerId);
}

export async function updateSessionSettings(ownerId: number, values: { sessionMode: "all" | "single"; currentSession: string }) {
  return saveLocalSessionSettings(ownerId, values);
}

export async function updateBrandingForOwner(ownerId: number, values: {
  companyLogoUrl?: string | null;
  companyLogoKey?: string | null;
  companyName: string;
  serviceCaption: string;
  footerCompanyName: string;
}) {
  const current = await getLocalBranding(ownerId);
  return saveLocalBranding(ownerId, normalizeBranding({
    ...current,
    ...values,
  }));
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

async function saveQuotationSettingsToDatabase(ownerId: number, settings: LocalQuotationSettings) {
  const db = await getDb();
  if (!db) return false;
  try {
    await db.insert(quotationSettingsData).values({ ownerId, settingsJson: JSON.stringify(settings) }).onDuplicateKeyUpdate({ set: { settingsJson: JSON.stringify(settings) } });
    return true;
  } catch (error) {
    console.warn("[Quotation settings] Database settings table is unavailable; retaining server-side fallback:", error);
    return false;
  }
}

export async function getQuotationSettingsForOwner(ownerId: number) {
  const db = await getDb();
  if (!db) return getLocalQuotationSettings(ownerId);

  let stored: { settingsJson: string } | undefined;
  try {
    const storedRows = await db.select({ settingsJson: quotationSettingsData.settingsJson }).from(quotationSettingsData).where(eq(quotationSettingsData.ownerId, ownerId)).limit(1);
    stored = storedRows[0];
  } catch {
    stored = undefined;
  }
  if (stored) {
    try {
      const parsed = normalizeStoredQuotationSettings(JSON.parse(stored.settingsJson));
      if (parsed) return parsed;
    } catch {
      console.warn("[Quotation settings] Stored settings JSON is invalid; rebuilding from available defaults.");
    }
  }

  const saved = await getSavedLocalQuotationSettings(ownerId);
  if (saved) {
    await saveQuotationSettingsToDatabase(ownerId, saved);
    return saved;
  }

  try {
    const baseRows = await db.select({
      companyGst: quotationSettings.companyGst,
      companyAddress: quotationSettings.companyAddress,
      validityDays: quotationSettings.validityDays,
      gstRate: quotationSettings.gstRate,
      gstMode: quotationSettings.gstMode,
      terms: quotationSettings.terms,
      productsJson: quotationSettings.productsJson,
    }).from(quotationSettings).where(eq(quotationSettings.ownerId, ownerId)).limit(1);
    const base = baseRows[0];
    if (!base) return getLocalQuotationSettings(ownerId);

    const readOptional = async (selection: any): Promise<Record<string, any>> => {
      try {
        const rows = await db.select(selection).from(quotationSettings).where(eq(quotationSettings.ownerId, ownerId)).limit(1);
        return (rows[0] ?? {}) as Record<string, any>;
      } catch {
        return {};
      }
    };
    const [numbering, assets, accounts] = await Promise.all([
      readOptional({ quotationPrefix: quotationSettings.quotationPrefix, invoiceNumberStart: quotationSettings.invoiceNumberStart, invoiceNumberNext: quotationSettings.invoiceNumberNext }),
      readOptional({ logoUrl: quotationSettings.logoUrl, logoKey: quotationSettings.logoKey, scannerUrl: quotationSettings.scannerUrl, scannerKey: quotationSettings.scannerKey, signatureUrl: quotationSettings.signatureUrl, signatureKey: quotationSettings.signatureKey }),
      readOptional({ accountCompanyName: quotationSettings.accountCompanyName, accountNumber: quotationSettings.accountNumber, accountIfsc: quotationSettings.accountIfsc, accountBranch: quotationSettings.accountBranch }),
    ]);

    let products: QuotationProduct[] = DEFAULT_QUOTATION_PRODUCTS;
    try {
      const parsed = JSON.parse(base.productsJson);
      if (Array.isArray(parsed) && parsed.length) products = parsed as QuotationProduct[];
    } catch {
      // Keep the supported default product catalog when legacy JSON is invalid.
    }
    const migrated = {
      companyGst: base.companyGst,
      companyAddress: base.companyAddress,
      validityDays: base.validityDays,
      gstRate: base.gstRate,
      gstMode: base.gstMode,
      quotationPrefix: numbering.quotationPrefix ?? "QT",
      invoiceNumberStart: numbering.invoiceNumberStart ?? 129,
      invoiceNumberNext: numbering.invoiceNumberNext ?? numbering.invoiceNumberStart ?? 129,
      terms: base.terms,
      products,
      logoUrl: assets.logoUrl ?? null,
      logoKey: assets.logoKey ?? null,
      scannerUrl: assets.scannerUrl ?? null,
      scannerKey: assets.scannerKey ?? null,
      signatureUrl: assets.signatureUrl ?? null,
      signatureKey: assets.signatureKey ?? null,
      accountCompanyName: accounts.accountCompanyName ?? "Expertaid Technologies Pvt Ltd.",
      accountNumber: accounts.accountNumber ?? "502000055251128",
      accountIfsc: accounts.accountIfsc ?? "HDFC0009147",
      accountBranch: accounts.accountBranch ?? "Ameerpur Branch, Hyd, TS-502032",
    } satisfies LocalQuotationSettings;
    await saveQuotationSettingsToDatabase(ownerId, migrated);
    return migrated;
  } catch (error) {
    console.warn("[Quotation settings] Legacy table unavailable; using local defaults:", error);
    return getLocalQuotationSettings(ownerId);
  }
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
  if (!(await saveQuotationSettingsToDatabase(ownerId, completeFields))) await saveLocalQuotationSettings(ownerId, completeFields);
  return completeFields;
}

export async function updateQuotationForOwner(ownerId: number, quotationId: number, values: Partial<InsertQuotation>, editor: { id: number; name: string }) {
  const localExisting = (await listLocalQuotations(ownerId)).find((row) => row.id === quotationId);
  if (localExisting) {
    const updated = await updateLocalQuotation(ownerId, quotationId, { ...values, lastEditedBy: editor.id, lastEditedByName: editor.name, lastEditedAt: new Date().toISOString() });
    return updated;
  }
  const db = await getDb();
  if (!db) throw new Error("Database is not available");
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
  if (await deleteLocalQuotation(ownerId, quotationId)) return { success: true };
  const db = await getDb();
  if (!db) throw new Error("Database is not available");
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
  if (!db) return listLocalQuotations(ownerId);
  try {
    const rows = await db.select().from(quotations).where(eq(quotations.ownerId, ownerId)).orderBy(desc(quotations.createdAt));
    return [...rows.map((row) => ({ ...row, items: JSON.parse(row.itemsJson) as unknown[] })), ...(await listLocalQuotations(ownerId))];
  } catch (error) {
    console.warn("[Quotations] Database table is unavailable; using persistent local fallback:", error);
    return listLocalQuotations(ownerId);
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
    const local = await listLocalQuotations(input.ownerId);
    const id = local.reduce((max, row) => Math.max(max, row.id), 0) + 1;
    const quotationNumber = quotationInput.invoiceNumber ? `${String(quotationPrefix || "QT").trim()}${quotationInput.invoiceNumber}` : `QT${new Date().getFullYear()}${id.toString().padStart(4, "0")}`;
    console.warn("[Quotations] Database insert failed; saved quotation to persistent local fallback:", error);
    return createLocalQuotation(input.ownerId, { ...quotationInput, quotationNumber });
  }
}

export async function createAgreement(input: InsertAgreement) {
  const db = await getDb();
  if (!db) throw new Error("Database is not available");
  const result = await db.insert(agreements).values(input);
  const id = Number(result[0].insertId);
  const rows = await db.select().from(agreements).where(eq(agreements.id, id)).limit(1);
  return rows[0];
}

function defaultSessionDates(label: string) {
  const [startYear, endYear] = label.split("-").map(Number);
  return { startDate: `${startYear}-04-01`, endDate: `${endYear}-03-31` };
}

export async function listSessionsForOwner(ownerId: number) {
  const settings = await getSessionSettings(ownerId);
  const rows = await listLocalSessions(ownerId);
  if (rows.some((row) => row.sessionLabel === settings.currentSession)) return rows;
  const dates = defaultSessionDates(settings.currentSession);
  return [{ id: 0, ownerId, sessionLabel: settings.currentSession, ...dates }, ...rows];
}

export async function createSessionForOwner(ownerId: number, values: { sessionLabel: string; startDate: string; endDate: string }) {
  return addLocalSession(ownerId, values);
}

export async function listAgreementsForOwner(ownerId: number, scope?: { sessionMode: "all" | "single"; currentSession: string }) {
  const db = await getDb();
  if (!db) return [];
  const where = scope?.sessionMode === "single" ? and(eq(agreements.ownerId, ownerId), eq(agreements.session, scope.currentSession)) : eq(agreements.ownerId, ownerId);
  return db.select().from(agreements).where(where).orderBy(desc(agreements.createdAt));
}

export async function listApprovedClientsForOwner(ownerId: number, options: { page: number; pageSize: number; search?: string; instituteType?: "School" | "College" | "Academy"; clientStatus?: "Active" | "Inactive"; startDate?: string; endDate?: string; branchCoverage?: "individual" | "multiple"; minValue?: number; maxValue?: number; sessionMode?: "all" | "single"; currentSession?: string }) {
  const db = await getDb();
  if (!db) return { items: [], total: 0, page: options.page, pageSize: options.pageSize, totalPages: 0, summary: { students: 0, value: 0 } };
  const search = options.search?.trim();
  const filters = [eq(agreements.ownerId, ownerId), eq(agreements.status, "Approved" as const)];
  if (options.sessionMode === "single" && options.currentSession) filters.push(eq(agreements.session, options.currentSession));
  if (options.instituteType) filters.push(eq(agreements.instituteType, options.instituteType));
  if (options.clientStatus === "Active") filters.push(gte(agreements.endDate, new Date().toISOString().slice(0, 10)));
  if (options.clientStatus === "Inactive") filters.push(lt(agreements.endDate, new Date().toISOString().slice(0, 10)));
  if (options.startDate) filters.push(gte(agreements.startDate, options.startDate));
  if (options.endDate) filters.push(lte(agreements.endDate, options.endDate));
  if (options.branchCoverage) filters.push(eq(agreements.branchCoverage, options.branchCoverage));
  if (options.minValue !== undefined) filters.push(gte(agreements.totalPrice, options.minValue.toFixed(2)));
  if (options.maxValue !== undefined) filters.push(lte(agreements.totalPrice, options.maxValue.toFixed(2)));
  if (search) {
    const pattern = `%${search}%`;
    filters.push(or(like(agreements.clientName, pattern), like(agreements.clientOwnerName, pattern), like(agreements.email, pattern), like(agreements.contactNumber, pattern), like(agreements.instituteType, pattern))!);
  }
  const where = and(...filters);
  const [items, countRows, summaryRows] = await Promise.all([
    db.select().from(agreements).where(where).orderBy(desc(agreements.createdAt)).limit(options.pageSize).offset((options.page - 1) * options.pageSize),
    db.select({ total: sql<number>`count(*)` }).from(agreements).where(where),
    db.select({ students: sql<number>`coalesce(sum(${agreements.noOfStudents}), 0)`, value: sql<number>`coalesce(sum(${agreements.totalPrice}), 0)` }).from(agreements).where(where),
  ]);
  const total = Number(countRows[0]?.total ?? 0);
  return { items, total, page: options.page, pageSize: options.pageSize, totalPages: Math.ceil(total / options.pageSize), summary: { students: Number(summaryRows[0]?.students ?? 0), value: Number(summaryRows[0]?.value ?? 0) } };
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
