import { int, mysqlEnum, mysqlTable, text, timestamp, varchar, decimal } from "drizzle-orm/mysql-core";

export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
  companyLogoUrl: text("companyLogoUrl"),
  companyLogoKey: varchar("companyLogoKey", { length: 512 }),
  companyName: varchar("companyName", { length: 255 }),
  serviceCaption: varchar("serviceCaption", { length: 255 }),
  footerCompanyName: varchar("footerCompanyName", { length: 255 }),
  sessionMode: mysqlEnum("sessionMode", ["all", "single"]).default("single").notNull(),
  currentSession: varchar("currentSession", { length: 16 }).default("2026-2027").notNull(),
});

export const agreements = mysqlTable("agreements", {
  id: int("id").autoincrement().primaryKey(),
  ownerId: int("ownerId").notNull(),
  publicToken: varchar("publicToken", { length: 32 }).notNull().unique(),
  clientName: varchar("clientName", { length: 255 }).notNull(),
  clientOwnerName: varchar("clientOwnerName", { length: 255 }).notNull(),
  instituteType: mysqlEnum("instituteType", ["School", "College", "Academy"]).default("School").notNull(),
  branchCoverage: mysqlEnum("branchCoverage", ["individual", "multiple"]).default("individual").notNull(),
  branchCount: int("branchCount").default(1).notNull(),
  contactNumber: varchar("contactNumber", { length: 64 }).notNull(),
  email: varchar("email", { length: 320 }).notNull(),
  address: text("address").notNull(),
  noOfStudents: int("noOfStudents").notNull(),
  pricingMode: mysqlEnum("pricingMode", ["perStudent", "package"]).default("perStudent").notNull(),
  perStudentPrice: decimal("perStudentPrice", { precision: 12, scale: 2 }),
  packagePrice: decimal("packagePrice", { precision: 14, scale: 2 }),
  noOfYearPlan: int("noOfYearPlan").notNull(),
  startDate: varchar("startDate", { length: 32 }).notNull(),
  endDate: varchar("endDate", { length: 32 }).notNull(),
  session: varchar("session", { length: 16 }).default("2026-2027").notNull(),
  totalPrice: decimal("totalPrice", { precision: 14, scale: 2 }).notNull(),
  description: text("description"),
  logoUrl: text("logoUrl"),
  logoKey: varchar("logoKey", { length: 512 }),
  status: mysqlEnum("status", ["Pending", "Approved", "Rejected"]).default("Pending").notNull(),
  signatureUrl: text("signatureUrl"),
  signatureKey: varchar("signatureKey", { length: 512 }),
  signatureDate: varchar("signatureDate", { length: 32 }),
  decidedAt: timestamp("decidedAt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;
export type Agreement = typeof agreements.$inferSelect;
export type InsertAgreement = typeof agreements.$inferInsert;
