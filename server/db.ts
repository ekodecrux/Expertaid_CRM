import { and, desc, eq, gte, like, lte, lt, or, sql } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import { agreements, InsertAgreement, InsertQuotation, InsertQuotationSettings, InsertUser, quotationEditHistory, quotations, quotationSettings, sessions, users, type User } from "../drizzle/schema";
import { DEFAULT_QUOTATION_ADDRESS, DEFAULT_QUOTATION_GST, DEFAULT_QUOTATION_PRODUCTS, DEFAULT_QUOTATION_TERMS, type QuotationProduct } from "@shared/quotation";
import { DEFAULT_BRANDING, normalizeBranding } from "@shared/branding";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

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
  const db = await getDb();
  if (!db) return { ...DEFAULT_BRANDING };
  const rows = await db.select({
    companyLogoUrl: users.companyLogoUrl,
    companyName: users.companyName,
    serviceCaption: users.serviceCaption,
    footerCompanyName: users.footerCompanyName,
  }).from(users).where(eq(users.id, ownerId)).limit(1);
  return normalizeBranding(rows[0]);
}

export async function getSessionSettings(ownerId: number) {
  const db = await getDb();
  if (!db) return { sessionMode: "single" as const, currentSession: "2026-2027" };
  const rows = await db.select({ sessionMode: users.sessionMode, currentSession: users.currentSession }).from(users).where(eq(users.id, ownerId)).limit(1);
  return { sessionMode: rows[0]?.sessionMode ?? "single", currentSession: rows[0]?.currentSession ?? "2026-2027" };
}

export async function updateSessionSettings(ownerId: number, values: { sessionMode: "all" | "single"; currentSession: string }) {
  const db = await getDb();
  if (!db) throw new Error("Database is not available");
  await db.update(users).set(values).where(eq(users.id, ownerId));
  return getSessionSettings(ownerId);
}

export async function updateBrandingForOwner(ownerId: number, values: {
  companyLogoUrl?: string | null;
  companyLogoKey?: string | null;
  companyName: string;
  serviceCaption: string;
  footerCompanyName: string;
}) {
  const db = await getDb();
  if (!db) throw new Error("Database is not available");
  await db.update(users).set(values).where(eq(users.id, ownerId));
  return getBrandingForOwner(ownerId);
}

const AUTH_USER_FIELDS = {
  id: users.id,
  openId: users.openId,
  name: users.name,
  email: users.email,
} as const;

type AuthUserRow = Pick<User, "id" | "openId" | "name" | "email">;

const asAuthUser = (row: AuthUserRow | undefined): User | undefined => row ? ({
  ...row,
  loginMethod: "email",
  role: "admin",
} as User) : undefined;

export async function getUserByOpenId(openId: string) {
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

export async function getQuotationSettingsForOwner(ownerId: number) {
  const db = await getDb();
  const fallback = { companyGst: DEFAULT_QUOTATION_GST, companyAddress: DEFAULT_QUOTATION_ADDRESS, validityDays: 15, gstRate: "18.00", gstMode: "exclusive" as const, quotationPrefix: "QT", invoiceNumberStart: 129, invoiceNumberNext: 129, terms: DEFAULT_QUOTATION_TERMS, products: DEFAULT_QUOTATION_PRODUCTS, logoUrl: null, logoKey: null, scannerUrl: null, scannerKey: null, signatureUrl: null, signatureKey: null, accountCompanyName: "Expertaid Technologies Pvt Ltd.", accountNumber: "502000055251128", accountIfsc: "HDFC0009147", accountBranch: "Ameerpur Branch, Hyd, TS-502032" };
  if (!db) return fallback;
  const rows = await db.select().from(quotationSettings).where(eq(quotationSettings.ownerId, ownerId)).limit(1);
  const row = rows[0];
  if (!row) return fallback;
  return { ...row, products: JSON.parse(row.productsJson) as QuotationProduct[] };
}

export async function allocateInvoiceNumberForOwner(ownerId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database is not available");
  const current = await getQuotationSettingsForOwner(ownerId);
  const next = Number(current.invoiceNumberNext ?? current.invoiceNumberStart ?? 129);
  const existing = await db.select({ id: quotationSettings.id }).from(quotationSettings).where(eq(quotationSettings.ownerId, ownerId)).limit(1);
  if (existing[0]) {
    await db.update(quotationSettings).set({ invoiceNumberNext: next + 1 }).where(eq(quotationSettings.ownerId, ownerId));
  } else {
    await db.insert(quotationSettings).values({ ownerId, companyGst: current.companyGst, companyAddress: current.companyAddress, validityDays: current.validityDays, gstRate: current.gstRate, gstMode: current.gstMode, quotationPrefix: current.quotationPrefix ?? "QT", invoiceNumberStart: current.invoiceNumberStart, invoiceNumberNext: next + 1, terms: current.terms, productsJson: JSON.stringify(current.products), accountCompanyName: current.accountCompanyName, accountNumber: current.accountNumber, accountIfsc: current.accountIfsc, accountBranch: current.accountBranch });
  }
  return String(next);
}

export async function updateQuotationSettingsForOwner(ownerId: number, values: Partial<Omit<InsertQuotationSettings, "ownerId" | "productsJson">> & { products: QuotationProduct[] }) {
  const db = await getDb();
  if (!db) throw new Error("Database is not available");
  const current = await getQuotationSettingsForOwner(ownerId);
  const { products, ...fields } = values;
  const nextStart = fields.invoiceNumberStart ?? current.invoiceNumberStart;
  const nextNumber = fields.invoiceNumberNext ?? (fields.invoiceNumberStart !== undefined && Number(current.invoiceNumberNext) === Number(current.invoiceNumberStart) ? nextStart : current.invoiceNumberNext);
  const completeFields = { companyGst: fields.companyGst ?? current.companyGst, companyAddress: fields.companyAddress ?? current.companyAddress, validityDays: fields.validityDays ?? current.validityDays, gstRate: fields.gstRate ?? current.gstRate, gstMode: fields.gstMode ?? current.gstMode, quotationPrefix: fields.quotationPrefix ?? current.quotationPrefix ?? "QT", invoiceNumberStart: nextStart, invoiceNumberNext: nextNumber, terms: fields.terms ?? current.terms, logoUrl: fields.logoUrl !== undefined ? fields.logoUrl : current.logoUrl, logoKey: fields.logoKey !== undefined ? fields.logoKey : current.logoKey, scannerUrl: fields.scannerUrl !== undefined ? fields.scannerUrl : current.scannerUrl, scannerKey: fields.scannerKey !== undefined ? fields.scannerKey : current.scannerKey, signatureUrl: fields.signatureUrl !== undefined ? fields.signatureUrl : current.signatureUrl, signatureKey: fields.signatureKey !== undefined ? fields.signatureKey : current.signatureKey, accountCompanyName: fields.accountCompanyName ?? current.accountCompanyName, accountNumber: fields.accountNumber ?? current.accountNumber, accountIfsc: fields.accountIfsc ?? current.accountIfsc, accountBranch: fields.accountBranch ?? current.accountBranch };
  await db.insert(quotationSettings).values({ ...completeFields, ownerId, productsJson: JSON.stringify(products) }).onDuplicateKeyUpdate({ set: { ...completeFields, productsJson: JSON.stringify(products) } });
  return getQuotationSettingsForOwner(ownerId);
}

export async function updateQuotationForOwner(ownerId: number, quotationId: number, values: Partial<InsertQuotation>, editor: { id: number; name: string }) {
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
  if (!db) return [];
  const rows = await db.select().from(quotations).where(eq(quotations.ownerId, ownerId)).orderBy(desc(quotations.createdAt));
  return rows.map((row) => ({ ...row, items: JSON.parse(row.itemsJson) as unknown[] }));
}

export async function getNextEstimationNumberForClient(ownerId: number, clientName: string) {
  const db = await getDb();
  if (!db) return 1;
  const rows = await db.select({ latest: sql<number>`MAX(${quotations.estimationNumber})` }).from(quotations).where(and(eq(quotations.ownerId, ownerId), eq(quotations.clientName, clientName.trim())));
  return Number(rows[0]?.latest ?? 0) + 1;
}

export async function createQuotation(input: InsertQuotation & { quotationPrefix?: string }) {
  const db = await getDb();
  if (!db) throw new Error("Database is not available");
  const { quotationPrefix, ...quotationInput } = input;
  const result = await db.insert(quotations).values(quotationInput);
  const id = Number(result[0].insertId);
  const quotationNumber = quotationInput.invoiceNumber ? `${String(quotationPrefix || "QT").trim()}${quotationInput.invoiceNumber}` : `QT${new Date().getFullYear()}${id.toString().padStart(4, "0")}`;
  await db.update(quotations).set({ quotationNumber }).where(eq(quotations.id, id));
  const rows = await db.select().from(quotations).where(eq(quotations.id, id)).limit(1);
  return rows[0] ? { ...rows[0], items: JSON.parse(rows[0].itemsJson) as unknown[] } : undefined;
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
  const db = await getDb();
  const settings = await getSessionSettings(ownerId);
  if (!db) {
    const dates = defaultSessionDates(settings.currentSession);
    return [{ id: 0, ownerId, sessionLabel: settings.currentSession, ...dates }];
  }
  const rows = await db.select().from(sessions).where(eq(sessions.ownerId, ownerId)).orderBy(sessions.startDate);
  if (rows.some((row) => row.sessionLabel === settings.currentSession)) return rows;
  const dates = defaultSessionDates(settings.currentSession);
  return [{ id: 0, ownerId, sessionLabel: settings.currentSession, ...dates }, ...rows];
}

export async function createSessionForOwner(ownerId: number, values: { sessionLabel: string; startDate: string; endDate: string }) {
  const db = await getDb();
  if (!db) throw new Error("Database is not available");
  const existing = await db.select({ id: sessions.id }).from(sessions).where(and(eq(sessions.ownerId, ownerId), eq(sessions.sessionLabel, values.sessionLabel))).limit(1);
  if (existing.length) throw new Error("That session already exists.");
  await db.insert(sessions).values({ ownerId, ...values });
  return listSessionsForOwner(ownerId);
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
