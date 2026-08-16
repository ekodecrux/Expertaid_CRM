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

export const sessions = mysqlTable("sessions", {
  id: int("id").autoincrement().primaryKey(),
  ownerId: int("ownerId").notNull(),
  sessionLabel: varchar("sessionLabel", { length: 16 }).notNull(),
  startDate: varchar("startDate", { length: 32 }).notNull(),
  endDate: varchar("endDate", { length: 32 }).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export const quotationSettings = mysqlTable("quotationSettings", {
  id: int("id").autoincrement().primaryKey(),
  ownerId: int("ownerId").notNull().unique(),
  companyGst: varchar("companyGst", { length: 32 }).notNull(),
  companyAddress: text("companyAddress").notNull(),
  validityDays: int("validityDays").default(15).notNull(),
  gstRate: decimal("gstRate", { precision: 5, scale: 2 }).default("18.00").notNull(),
  gstMode: mysqlEnum("gstMode", ["inclusive", "exclusive"]).default("exclusive").notNull(),
  quotationPrefix: varchar("quotationPrefix", { length: 24 }).default("QT").notNull(),
  invoiceNumberStart: int("invoiceNumberStart").default(129).notNull(),
  invoiceNumberNext: int("invoiceNumberNext").default(129).notNull(),
  terms: text("terms").notNull(),
  productsJson: text("productsJson").notNull(),
  logoUrl: text("logoUrl"),
  logoKey: varchar("logoKey", { length: 512 }),
  scannerUrl: text("scannerUrl"),
  scannerKey: varchar("scannerKey", { length: 512 }),
  signatureUrl: text("signatureUrl"),
  signatureKey: varchar("signatureKey", { length: 512 }),
  accountCompanyName: varchar("accountCompanyName", { length: 255 }),
  accountNumber: varchar("accountNumber", { length: 128 }),
  accountIfsc: varchar("accountIfsc", { length: 64 }),
  accountBranch: varchar("accountBranch", { length: 255 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export const quotationSettingsData = mysqlTable("quotationSettingsData", {
  id: int("id").autoincrement().primaryKey(),
  ownerId: int("ownerId").notNull().unique(),
  settingsJson: text("settingsJson").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export const profileSettingsData = mysqlTable("profileSettingsData", {
  id: int("id").autoincrement().primaryKey(),
  ownerId: int("ownerId").notNull().unique(),
  profileJson: text("profileJson").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export const quotationEditHistory = mysqlTable("quotationEditHistory", {
  id: int("id").autoincrement().primaryKey(),
  quotationId: int("quotationId").notNull(),
  ownerId: int("ownerId").notNull(),
  editedBy: int("editedBy").notNull(),
  editedByName: varchar("editedByName", { length: 255 }).notNull(),
  editedAt: timestamp("editedAt").defaultNow().notNull(),
  snapshotJson: text("snapshotJson").notNull(),
});

export const quotations = mysqlTable("quotations", {
  id: int("id").autoincrement().primaryKey(),
  ownerId: int("ownerId").notNull(),
  quotationNumber: varchar("quotationNumber", { length: 32 }).notNull().unique(),
  invoiceNumber: varchar("invoiceNumber", { length: 32 }).unique(),
  estimationNumber: int("estimationNumber").default(1).notNull(),
  status: mysqlEnum("status", ["Awaiting", "Success", "Closed"]).default("Awaiting").notNull(),
  clientName: varchar("clientName", { length: 255 }).notNull(),
  clientAddress: text("clientAddress").notNull(),
  clientContact: varchar("clientContact", { length: 64 }).notNull(),
  clientEmail: varchar("clientEmail", { length: 320 }),
  clientGst: varchar("clientGst", { length: 32 }),
  quotationDate: varchar("quotationDate", { length: 32 }).notNull(),
  validityDays: int("validityDays").default(15).notNull(),
  companyGst: varchar("companyGst", { length: 32 }).notNull(),
  companyAddress: text("companyAddress").notNull(),
  itemsJson: text("itemsJson").notNull(),
  subtotal: decimal("subtotal", { precision: 14, scale: 2 }).notNull(),
  gstRate: decimal("gstRate", { precision: 5, scale: 2 }).notNull(),
  gstMode: mysqlEnum("gstMode", ["inclusive", "exclusive"]).default("exclusive").notNull(),
  gstAmount: decimal("gstAmount", { precision: 14, scale: 2 }).notNull(),
  grandTotal: decimal("grandTotal", { precision: 14, scale: 2 }).notNull(),
  terms: text("terms"),
  scannerUrl: text("scannerUrl"),
  scannerKey: varchar("scannerKey", { length: 512 }),
  signatureUrl: text("signatureUrl"),
  signatureKey: varchar("signatureKey", { length: 512 }),
  accountCompanyName: varchar("accountCompanyName", { length: 255 }),
  accountNumber: varchar("accountNumber", { length: 128 }),
  accountIfsc: varchar("accountIfsc", { length: 64 }),
  accountBranch: varchar("accountBranch", { length: 255 }),
  lastEditedBy: int("lastEditedBy"),
  lastEditedByName: varchar("lastEditedByName", { length: 255 }),
  lastEditedAt: timestamp("lastEditedAt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
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
export type Session = typeof sessions.$inferSelect;
export type InsertSession = typeof sessions.$inferInsert;
export type QuotationSettings = typeof quotationSettings.$inferSelect;
export type InsertQuotationSettings = typeof quotationSettings.$inferInsert;
export type QuotationSettingsData = typeof quotationSettingsData.$inferSelect;
export type ProfileSettingsData = typeof profileSettingsData.$inferSelect;
export type QuotationEditHistory = typeof quotationEditHistory.$inferSelect;
export type InsertQuotationEditHistory = typeof quotationEditHistory.$inferInsert;
export type Quotation = typeof quotations.$inferSelect;
export type InsertQuotation = typeof quotations.$inferInsert;
export type Agreement = typeof agreements.$inferSelect;
export type InsertAgreement = typeof agreements.$inferInsert;
