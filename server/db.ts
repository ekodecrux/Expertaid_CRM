import { and, desc, eq, gte, like, lte, lt, or, sql } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { agreements, InsertAgreement, InsertUser, sessions, users } from "../drizzle/schema";
import { DEFAULT_BRANDING, normalizeBranding } from "@shared/branding";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
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

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);
  return result[0];
}

export async function getUserByEmail(email: string) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(users).where(eq(users.email, email)).limit(1);
  return result[0];
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
