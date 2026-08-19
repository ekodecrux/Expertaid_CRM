import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { nanoid } from "nanoid";
import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { ENV } from "./_core/env";
import { systemRouter } from "./_core/systemRouter";
import { protectedProcedure, publicProcedure, router } from "./_core/trpc";
import { createAgreement, createQuotation, allocateInvoiceNumberForOwner, getNextEstimationNumberForClient, getAgreementByToken, createSessionForOwner, updateSessionRecordForOwner, deleteSessionForOwner, listQuotationsForOwner, getQuotationSettingsForOwner, updateQuotationSettingsForOwner, updateQuotationForOwner, deleteQuotationForOwner, listQuotationEditHistoryForOwner, getSessionSettings, listSessionsForOwner, listAgreementsForOwner, listApprovedClientsForOwner, updateAgreement, updateAgreementDecision, getBrandingForOwner, updateBrandingForOwner, updateSessionSettings, getProfileSettingsForOwner, updateProfileSettingsForOwner, getUserByEmail, upsertUser, listProjectsForOwner, createProjectForOwner, updateProjectForOwner, deleteProjectForOwner, setMainProjectForOwner, createAgreementForProject } from "./db";
import { storagePut } from "./storage";
import { sdk } from "./_core/sdk";
import { validateCredentialLogin } from "./credentialLogin";
import { calculateAgreementEndDate, calculateAgreementPricing, calculateAgreementTotal, PricingMode } from "@shared/pricing";
import { calculateQuotationTotals, DEFAULT_QUOTATION_ADDRESS, DEFAULT_QUOTATION_GST, DEFAULT_QUOTATION_TERMS, QUOTATION_STATUSES, type QuotationItem } from "@shared/quotation";
import { createInvoiceForOwner, createReceiptForOwner, updateReceiptForOwner, deleteInvoiceForOwner, deleteReceiptForOwner, getInvoiceSettingsForOwner, getReceiptSettingsForOwner, listInvoicesForOwner, listReceiptsForOwner, updateInvoiceForOwner, updateInvoiceSettingsForOwner, updateInvoiceStatusForOwner, updateReceiptSettingsForOwner, updateReceiptStatusForOwner } from "./billing";

const dataUrlSchema = z.string().max(2_500_000).transform((value) => value.trim().replace(/[\r\n\t\s]+/g, "")).refine((value) => /^data:image\/[a-z0-9.+-]+(?:;[^,]*)?,[\s\S]+$/i.test(value), "Invalid image data URL");
export const quotationAssetInput = z.preprocess((value) => typeof value === "string" && value.trim() === "" ? undefined : value, z.union([dataUrlSchema, z.string().trim().min(1).max(4096), z.null()]).optional());
const isImageDataUrl = (value: string | null | undefined): value is string => Boolean(value && /^data:image\/[a-z0-9.+-]+(?:;[^,]*)?,[\s\S]+$/i.test(value));
const brandingInput = z.object({
  companyName: z.string().trim().min(1).max(255),
  serviceCaption: z.string().trim().min(1).max(255),
  footerCompanyName: z.string().trim().min(1).max(255),
  logoDataUrl: dataUrlSchema.optional(),
});

const agreementInput = z.object({
  projectId: z.number().int().positive().optional(),
  clientName: z.string().trim().min(1).max(255),
  clientOwnerName: z.string().trim().min(1).max(255),
  instituteType: z.enum(["School", "College", "Academy"]),
  branchCoverage: z.enum(["individual", "multiple"]),
  branchCount: z.number().int().positive(),
  contactNumber: z.string().trim().min(3).max(64),
  email: z.string().trim().email().max(320),
  address: z.string().trim().min(1),
  noOfStudents: z.number().int().positive(),
  pricingMode: z.enum(["perStudent", "package"]),
  perStudentPrice: z.number().nonnegative().nullable(),
  packagePrice: z.number().nonnegative().nullable(),
  noOfYearPlan: z.number().int().positive(),
  session: z.string().regex(/^\d{4}-\d{4}$/).default("2026-2027"),
  startDate: z.string().min(1),
  endDate: z.string().min(1),
  gstRate: z.number().nonnegative().max(100).default(18),
  gstMode: z.enum(["inclusive", "exclusive"]).default("exclusive"),
  description: z.string().optional(),
  logoDataUrl: dataUrlSchema.optional(),
}).superRefine((value, ctx) => {
  if (value.pricingMode === "perStudent" && value.perStudentPrice == null) ctx.addIssue({ code: "custom", path: ["perStudentPrice"], message: "Per-student price is required" });
  if (value.pricingMode === "package" && value.packagePrice == null) ctx.addIssue({ code: "custom", path: ["packagePrice"], message: "Package price is required" });
  if (value.branchCoverage === "individual" && value.branchCount !== 1) ctx.addIssue({ code: "custom", path: ["branchCount"], message: "Individual agreements must have one branch" });
  if (value.branchCoverage === "multiple" && value.branchCount < 2) ctx.addIssue({ code: "custom", path: ["branchCount"], message: "Multiple-branch agreements must have at least two branches" });
});

type AgreementInput = z.infer<typeof agreementInput>;

const quotationInput = z.object({
  clientName: z.string().trim().min(1).max(255),
  clientAddress: z.string().trim().min(1),
  clientContact: z.string().trim().min(3).max(64),
  clientEmail: z.string().trim().email().max(320).optional(),
  clientGst: z.string().trim().max(32).optional(),
  estimationNumber: z.number().int().positive().max(999999999).optional(),
  quotationDate: z.string().min(1),
  validityDays: z.number().int().positive().max(365).default(15),
  companyGst: z.string().trim().min(1).max(32).default(DEFAULT_QUOTATION_GST),
  companyAddress: z.string().trim().min(1).default(DEFAULT_QUOTATION_ADDRESS),
  accountCompanyName: z.string().trim().min(1).max(255).optional(),
  accountNumber: z.string().trim().max(128).optional(),
  accountIfsc: z.string().trim().max(64).optional(),
  accountBranch: z.string().trim().max(255).optional(),
  items: z.array(z.object({ product: z.enum(["ERP", "Biometric", "WhatsApp"]).default("ERP"), productName: z.string().trim().min(1).max(255).optional(), itemName: z.string().trim().min(1).max(255), quantity: z.number().int().positive(), unitPrice: z.number().nonnegative() })).min(1),
  gstRate: z.number().nonnegative().max(100).default(18),
  gstMode: z.enum(["inclusive", "exclusive"]).default("exclusive"),
  terms: z.string().max(2000).default(DEFAULT_QUOTATION_TERMS),
  scannerDataUrl: quotationAssetInput,
  signatureDataUrl: quotationAssetInput,
});

type QuotationInput = z.infer<typeof quotationInput>;
export const billingItemInput = z.object({ itemName: z.string().trim().min(1).max(255), description: z.string().trim().max(500).optional(), quantity: z.coerce.number().positive(), unitPrice: z.coerce.number().nonnegative() });
export const invoiceInput = z.object({ clientName: z.string().trim().min(1).max(255), clientAddress: z.string().trim().min(1), clientContact: z.string().trim().max(64).optional(), clientEmail: z.string().trim().email().max(320).optional(), clientGst: z.string().trim().max(32).optional(), invoiceDate: z.string().min(1), dueDate: z.string().min(1), items: z.array(billingItemInput).min(1), gstRate: z.coerce.number().nonnegative().max(100).default(18), gstMode: z.enum(["inclusive", "exclusive"]).default("exclusive"), notes: z.string().trim().max(2000).optional(), invoiceNumber: z.string().trim().max(32).optional() });
export const invoiceStatusInput = z.enum(["Draft", "Due", "Paid", "Cancelled"]);
export const invoiceSettingsInput = z.object({ companyGst: z.string().trim().min(1).max(32), companyAddress: z.string().trim().min(1), invoicePrefix: z.string().trim().min(1).max(24), invoiceNumberStart: z.coerce.number().int().positive(), gstRate: z.coerce.number().nonnegative().max(100), defaultDueDays: z.coerce.number().int().positive().max(365), terms: z.string().max(4000), accountCompanyName: z.string().trim().max(255).optional(), accountNumber: z.string().trim().max(128).optional(), accountIfsc: z.string().trim().max(64).optional(), accountBranch: z.string().trim().max(255).optional(), logoDataUrl: quotationAssetInput, scannerDataUrl: quotationAssetInput, signatureDataUrl: quotationAssetInput });
export const receiptInput = z.object({ clientName: z.string().trim().min(1).max(255), clientAddress: z.string().trim().min(1), clientContact: z.string().trim().max(64).optional(), clientEmail: z.string().trim().email().max(320).optional(), clientGst: z.string().trim().max(32).optional(), receiptDate: z.string().min(1), paymentDate: z.string().min(1), gstRate: z.coerce.number().nonnegative().max(100).default(18), gstMode: z.enum(["inclusive", "exclusive"]).default("exclusive"), paymentMode: z.enum(["Cash", "UPI", "Bank Transfer", "Card", "Cheque", "Other"]), transactionReference: z.string().trim().max(128).optional(), notes: z.string().trim().max(2000).optional(), items: z.array(billingItemInput).min(1), receiptNumber: z.string().trim().max(32).optional() });
export const receiptSettingsInput = z.object({ companyGst: z.string().trim().min(1).max(32), companyAddress: z.string().trim().min(1), receiptPrefix: z.string().trim().min(1).max(24), terms: z.string().max(4000), footerCompanyName: z.string().trim().max(255).optional(), footerMessage: z.string().trim().max(255).optional(), qrLabel: z.string().trim().max(64).optional(), defaultProducts: z.array(billingItemInput).max(50).optional() });

export async function uploadQuotationAsset(dataUrl: string | undefined, path: string) {
  if (!dataUrl) return { url: null, key: null };
  const [header, encoded] = dataUrl.split(",", 2);
  const headerMatch = header.match(/^data:(image\/[a-z0-9.+-]+)(?:;([^,]*))?$/i);
  if (!headerMatch || !encoded) throw new TRPCError({ code: "BAD_REQUEST", message: "Invalid quotation image payload." });
  const mimeType = headerMatch[1].toLowerCase();
  const isBase64 = /(?:^|;)base64$/i.test(headerMatch[2] ?? "");
  const bytes = isBase64 ? Buffer.from(encoded, "base64") : Buffer.from(decodeURIComponent(encoded));
  const extension = mimeType === "image/jpeg" || mimeType === "image/jpg" ? "jpg" : (mimeType.split("/")[1]?.replace(/[^a-z0-9]+/g, "") || "png");
  const stored = await storagePut(`quotations/${nanoid(10)}/${path}.${extension}`, bytes, mimeType);
  return { url: stored.url, key: stored.key };
}

async function uploadProfileAvatar(dataUrl: string | undefined) {
  if (!dataUrl) return { url: null, key: null };
  const [header, encoded] = dataUrl.split(",");
  const mimeType = header.match(/^data:(image\/(?:png|jpeg|jpg|webp));base64$/)?.[1] ?? "image/png";
  const extension = mimeType === "image/jpeg" || mimeType === "image/jpg" ? "jpg" : mimeType.split("/")[1];
  const stored = await storagePut(`profiles/${nanoid(10)}/avatar.${extension}`, Buffer.from(encoded, "base64"), mimeType);
  return { url: stored.url, key: stored.key };
}

async function uploadLogo(logoDataUrl: string | undefined) {
  if (!logoDataUrl) return { logoUrl: null, logoKey: null };
  const [header, encoded] = logoDataUrl.split(",");
  const mimeType = header.match(/^data:(image\/(?:png|jpeg|jpg|webp));base64$/)?.[1] ?? "image/png";
  const extension = mimeType === "image/jpeg" || mimeType === "image/jpg" ? "jpg" : mimeType.split("/")[1];
  const stored = await storagePut(`agreements/${nanoid(10)}/logo.${extension}`, Buffer.from(encoded, "base64"), mimeType);
  return { logoUrl: stored.url, logoKey: stored.key };
}

function buildAgreementValues(input: AgreementInput) {
  const baseTotal = calculateAgreementTotal(input.pricingMode as PricingMode, input.noOfStudents, input.perStudentPrice, input.packagePrice, input.noOfYearPlan);
  const pricing = calculateAgreementPricing(baseTotal, input.gstMode, input.gstRate);
  return {
    projectId: input.projectId,
    clientName: input.clientName,
    clientOwnerName: input.clientOwnerName,
    instituteType: input.instituteType,
    branchCoverage: input.branchCoverage,
    branchCount: input.branchCount,
    contactNumber: input.contactNumber,
    email: input.email,
    address: input.address,
    noOfStudents: input.noOfStudents,
    pricingMode: input.pricingMode,
    perStudentPrice: input.pricingMode === "perStudent" ? input.perStudentPrice?.toFixed(2) : null,
    packagePrice: input.pricingMode === "package" ? input.packagePrice?.toFixed(2) : null,
    noOfYearPlan: input.noOfYearPlan,
    session: input.session,
    startDate: input.startDate,
    endDate: input.endDate,
    subtotal: pricing.subtotal.toFixed(2),
    gstRate: input.gstRate.toFixed(2),
    gstMode: input.gstMode,
    gstAmount: pricing.gstAmount.toFixed(2),
    totalPrice: pricing.total.toFixed(2),
    description: input.description || null,
  };
}

export const appRouter = router({
  invoices: router({
    settings: router({
      get: protectedProcedure.query(({ ctx }) => getInvoiceSettingsForOwner(ctx.user.id)),
      update: protectedProcedure.input(invoiceSettingsInput).mutation(async ({ ctx, input }) => { const current = await getInvoiceSettingsForOwner(ctx.user.id); const { logoDataUrl, scannerDataUrl, signatureDataUrl, ...values } = input; const logo = logoDataUrl === null ? { url: null, key: null } : isImageDataUrl(logoDataUrl) ? await uploadQuotationAsset(logoDataUrl, "invoice-logo") : { url: logoDataUrl || current.logoUrl, key: current.logoKey }; const scanner = scannerDataUrl === null ? { url: null, key: null } : isImageDataUrl(scannerDataUrl) ? await uploadQuotationAsset(scannerDataUrl, "invoice-scanner") : { url: scannerDataUrl || current.scannerUrl, key: current.scannerKey }; const signature = signatureDataUrl === null ? { url: null, key: null } : isImageDataUrl(signatureDataUrl) ? await uploadQuotationAsset(signatureDataUrl, "invoice-signature") : { url: signatureDataUrl || current.signatureUrl, key: current.signatureKey }; return updateInvoiceSettingsForOwner(ctx.user.id, { ...values, logoUrl: logo.url, logoKey: logo.key, scannerUrl: scanner.url, scannerKey: scanner.key, signatureUrl: signature.url, signatureKey: signature.key }); }),
    }),
    list: protectedProcedure.query(({ ctx }) => listInvoicesForOwner(ctx.user.id)),
    create: protectedProcedure.input(invoiceInput).mutation(async ({ ctx, input }) => {
      const settings = await getInvoiceSettingsForOwner(ctx.user.id);
      const totals = calculateQuotationTotals(input.items.map((item) => ({ ...item, product: "ERP" as const })), input.gstRate, input.gstMode);
      return createInvoiceForOwner(ctx.user.id, { ...input, items: undefined, itemsJson: JSON.stringify(input.items), subtotal: totals.subtotal.toFixed(2), gstRate: input.gstRate.toFixed(2), gstMode: input.gstMode, gstAmount: totals.gstAmount.toFixed(2), grandTotal: totals.grandTotal.toFixed(2), companyGst: settings.companyGst, companyAddress: settings.companyAddress, terms: settings.terms, accountCompanyName: settings.accountCompanyName, accountNumber: settings.accountNumber, accountIfsc: settings.accountIfsc, accountBranch: settings.accountBranch, logoUrl: settings.logoUrl, logoKey: settings.logoKey, signatureUrl: settings.signatureUrl, signatureKey: settings.signatureKey });
    }),
    update: protectedProcedure.input(invoiceInput.extend({ id: z.number().int().positive() })).mutation(async ({ ctx, input }) => { const { id, items, ...fields } = input; const totals = calculateQuotationTotals(items.map((item) => ({ ...item, product: "ERP" as const })), input.gstRate, input.gstMode); return updateInvoiceForOwner(ctx.user.id, id, { ...fields, itemsJson: JSON.stringify(items), subtotal: totals.subtotal.toFixed(2), gstRate: input.gstRate.toFixed(2), gstMode: input.gstMode, gstAmount: totals.gstAmount.toFixed(2), grandTotal: totals.grandTotal.toFixed(2) }); }),
    updateStatus: protectedProcedure.input(z.object({ id: z.number().int().positive(), status: invoiceStatusInput })).mutation(({ ctx, input }) => updateInvoiceStatusForOwner(ctx.user.id, input.id, input.status)),
    delete: protectedProcedure.input(z.object({ id: z.number().int().positive() })).mutation(({ ctx, input }) => deleteInvoiceForOwner(ctx.user.id, input.id)),
  }),
  receipts: router({
    settings: router({
      get: protectedProcedure.query(({ ctx }) => getReceiptSettingsForOwner(ctx.user.id)),
      update: protectedProcedure.input(receiptSettingsInput).mutation(({ ctx, input }) => updateReceiptSettingsForOwner(ctx.user.id, input)),
    }),
    list: protectedProcedure.query(({ ctx }) => listReceiptsForOwner(ctx.user.id)),
    create: protectedProcedure.input(receiptInput).mutation(async ({ ctx, input }) => {
      const settings = await getReceiptSettingsForOwner(ctx.user.id);
      const { items, ...fields } = input;
      const { subtotal, gstAmount, grandTotal } = calculateQuotationTotals(items as QuotationItem[], input.gstRate, input.gstMode);
      return createReceiptForOwner(ctx.user.id, { ...fields, itemsJson: JSON.stringify(items), subtotal: subtotal.toFixed(2), gstRate: input.gstRate.toFixed(2), gstMode: input.gstMode, gstAmount: gstAmount.toFixed(2), grandTotal: grandTotal.toFixed(2), amount: grandTotal.toFixed(2), receivedFor: items.map(item => item.itemName).join(", ").slice(0, 255), companyGst: settings.companyGst, companyAddress: settings.companyAddress, terms: settings.terms, accountCompanyName: settings.accountCompanyName, accountNumber: settings.accountNumber, accountIfsc: settings.accountIfsc, accountBranch: settings.accountBranch, logoUrl: settings.logoUrl, logoKey: settings.logoKey, signatureUrl: settings.signatureUrl, signatureKey: settings.signatureKey, footerCompanyName: settings.footerCompanyName, footerMessage: settings.footerMessage, qrLabel: settings.qrLabel });
    }),
    update: protectedProcedure.input(receiptInput.extend({ id: z.number().int().positive() })).mutation(async ({ ctx, input }) => {
      const { id, items, ...fields } = input;
      const { subtotal, gstAmount, grandTotal } = calculateQuotationTotals(items as QuotationItem[], input.gstRate, input.gstMode);
      const settings = await getReceiptSettingsForOwner(ctx.user.id);
      return updateReceiptForOwner(ctx.user.id, id, { ...fields, itemsJson: JSON.stringify(items), subtotal: subtotal.toFixed(2), gstRate: input.gstRate.toFixed(2), gstMode: input.gstMode, gstAmount: gstAmount.toFixed(2), grandTotal: grandTotal.toFixed(2), amount: grandTotal.toFixed(2), receivedFor: items.map(item => item.itemName).join(", ").slice(0, 255), companyGst: settings.companyGst, companyAddress: settings.companyAddress, terms: settings.terms, accountCompanyName: settings.accountCompanyName, accountNumber: settings.accountNumber, accountIfsc: settings.accountIfsc, accountBranch: settings.accountBranch, logoUrl: settings.logoUrl, logoKey: settings.logoKey, signatureUrl: settings.signatureUrl, signatureKey: settings.signatureKey, footerCompanyName: settings.footerCompanyName, footerMessage: settings.footerMessage, qrLabel: settings.qrLabel });
    }),
    updateStatus: protectedProcedure.input(z.object({ id: z.number().int().positive(), status: z.enum(["Issued", "Cancelled"]) })).mutation(({ ctx, input }) => updateReceiptStatusForOwner(ctx.user.id, input.id, input.status)),
    delete: protectedProcedure.input(z.object({ id: z.number().int().positive() })).mutation(({ ctx, input }) => deleteReceiptForOwner(ctx.user.id, input.id)),
  }),
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    loginWithCredentials: publicProcedure.input(z.object({ email: z.string().trim().email(), password: z.string().min(1) })).mutation(async ({ ctx, input }) => {
      if (!validateCredentialLogin(input.email, input.password)) {
        throw new TRPCError({ code: "UNAUTHORIZED", message: "Invalid email or password." });
      }
      const normalizedEmail = input.email.trim().toLowerCase();
      // Credential authentication is intentionally independent of the legacy users table.
      // The configured CRM credentials are the source of truth for the initial admin session.
      const user = {
        id: 1,
        openId: "credential-admin",
        name: "Workspace administrator",
        email: normalizedEmail,
        loginMethod: "email" as const,
        role: "admin" as const,
      };
      const sessionToken = await sdk.createSessionToken(user.openId, { name: user.name });
      ctx.res.cookie(COOKIE_NAME, sessionToken, getSessionCookieOptions(ctx.req));
      return user;
    }),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true } as const;
    }),
  }),
  profile: router({
    get: protectedProcedure.query(({ ctx }) => getProfileSettingsForOwner(ctx.user.id, { name: ctx.user.name, role: ctx.user.role })),
    update: protectedProcedure.input(z.object({
      displayName: z.string().trim().min(1).max(120),
      roleLabel: z.string().trim().min(1).max(80),
      avatarDataUrl: z.union([dataUrlSchema, z.null()]).optional(),
    })).mutation(async ({ ctx, input }) => {
      const current = await getProfileSettingsForOwner(ctx.user.id, { name: ctx.user.name, role: ctx.user.role });
      const avatar = input.avatarDataUrl === null ? { url: null, key: null } : input.avatarDataUrl ? await uploadProfileAvatar(input.avatarDataUrl) : { url: current.avatarUrl, key: current.avatarKey };
      const generatedInitials = input.displayName.split(/\s+/).filter(Boolean).map(part => part[0]).join("").slice(0, 2).toUpperCase() || "AD";
      return updateProfileSettingsForOwner(ctx.user.id, { displayName: input.displayName, roleLabel: input.roleLabel, avatarInitials: generatedInitials, avatarUrl: avatar.url, avatarKey: avatar.key }, { name: ctx.user.name, role: ctx.user.role });
    }),
  }),
  quotations: router({
    list: protectedProcedure.query(({ ctx }) => listQuotationsForOwner(ctx.user.id)),
    settings: router({
      get: protectedProcedure.query(({ ctx }) => getQuotationSettingsForOwner(ctx.user.id)),
      update: protectedProcedure.input(z.object({ companyGst: z.string().trim().min(1).max(32), companyAddress: z.string().trim().min(1), validityDays: z.number().int().positive().max(365), gstRate: z.number().nonnegative().max(100), gstMode: z.enum(["inclusive", "exclusive"]), quotationPrefix: z.string().trim().min(1).max(24).default("QT"), invoiceNumberStart: z.number().int().positive().max(999999999).optional(), accountCompanyName: z.string().trim().min(1).max(255), accountNumber: z.string().trim().max(128), accountIfsc: z.string().trim().max(64), accountBranch: z.string().trim().max(255), terms: z.string().max(2000), products: z.array(z.object({ product: z.enum(["ERP", "Biometric", "WhatsApp"]).default("ERP"), productName: z.string().trim().min(1).max(255).optional(), itemName: z.string().trim().min(1).max(255), quantity: z.number().int().positive().default(1), unitPrice: z.number().nonnegative() })).min(1), logoDataUrl: quotationAssetInput, scannerDataUrl: quotationAssetInput, signatureDataUrl: quotationAssetInput })).mutation(async ({ ctx, input }) => {
        const current = await getQuotationSettingsForOwner(ctx.user.id);
        const logo = input.logoDataUrl === null ? { url: null, key: null } : isImageDataUrl(input.logoDataUrl) ? await uploadQuotationAsset(input.logoDataUrl, "logo") : { url: input.logoDataUrl || current.logoUrl, key: current.logoKey };
        const scanner = input.scannerDataUrl === null ? { url: null, key: null } : isImageDataUrl(input.scannerDataUrl) ? await uploadQuotationAsset(input.scannerDataUrl, "scanner") : { url: input.scannerDataUrl || current.scannerUrl, key: current.scannerKey };
        const signature = input.signatureDataUrl === null ? { url: null, key: null } : isImageDataUrl(input.signatureDataUrl) ? await uploadQuotationAsset(input.signatureDataUrl, "signature") : { url: input.signatureDataUrl || current.signatureUrl, key: current.signatureKey };
        return updateQuotationSettingsForOwner(ctx.user.id, { companyGst: input.companyGst, companyAddress: input.companyAddress, validityDays: input.validityDays, gstRate: input.gstRate.toFixed(2), gstMode: input.gstMode, quotationPrefix: input.quotationPrefix, invoiceNumberStart: input.invoiceNumberStart, terms: input.terms, products: input.products, accountCompanyName: input.accountCompanyName, accountNumber: input.accountNumber, accountIfsc: input.accountIfsc, accountBranch: input.accountBranch, logoUrl: logo.url, logoKey: logo.key, scannerUrl: scanner.url, scannerKey: scanner.key, signatureUrl: signature.url, signatureKey: signature.key });
      }),
    }),
    update: protectedProcedure.input(quotationInput.extend({ id: z.number().int().positive() })).mutation(async ({ ctx, input }) => {
      const { id, scannerDataUrl, signatureDataUrl, items, ...fields } = input;
      const { subtotal, gstAmount, grandTotal } = calculateQuotationTotals(items as QuotationItem[], input.gstRate, input.gstMode);
      const scanner = scannerDataUrl ? await uploadQuotationAsset(scannerDataUrl, "scanner") : undefined;
      const signature = signatureDataUrl ? await uploadQuotationAsset(signatureDataUrl, "signature") : undefined;
      return updateQuotationForOwner(ctx.user.id, id, { ...fields, ...(scanner ? { scannerUrl: scanner.url, scannerKey: scanner.key } : {}), ...(signature ? { signatureUrl: signature.url, signatureKey: signature.key } : {}), itemsJson: JSON.stringify(items), subtotal: subtotal.toFixed(2), gstRate: input.gstRate.toFixed(2), gstMode: input.gstMode, gstAmount: gstAmount.toFixed(2), grandTotal: grandTotal.toFixed(2) }, { id: ctx.user.id, name: ctx.user.name || ctx.user.email || "Workspace administrator" });
    }),
    updateStatus: protectedProcedure.input(z.object({ id: z.number().int().positive(), status: z.enum(QUOTATION_STATUSES) })).mutation(({ ctx, input }) => updateQuotationForOwner(ctx.user.id, input.id, { status: input.status }, { id: ctx.user.id, name: ctx.user.name || ctx.user.email || "Workspace administrator" })),
    delete: protectedProcedure.input(z.object({ id: z.number().int().positive() })).mutation(({ ctx, input }) => deleteQuotationForOwner(ctx.user.id, input.id)),
    history: protectedProcedure.input(z.object({ id: z.number().int().positive() })).query(({ ctx, input }) => listQuotationEditHistoryForOwner(ctx.user.id, input.id)),
    create: protectedProcedure.input(quotationInput).mutation(async ({ ctx, input }) => {
      const defaults = await getQuotationSettingsForOwner(ctx.user.id);
      const { scannerDataUrl, signatureDataUrl, items, ...fields } = input;
      const effectiveItems = items.length ? items : defaults.products.map((product) => ({ product: product.product ?? "ERP", productName: product.productName ?? product.product, itemName: product.itemName, quantity: product.quantity ?? 1, unitPrice: product.unitPrice }));
      const effectiveGstRate = input.gstRate ?? Number(defaults.gstRate);
      const { subtotal, gstAmount, grandTotal } = calculateQuotationTotals(effectiveItems as QuotationItem[], effectiveGstRate, input.gstMode);
      const scanner = scannerDataUrl ? await uploadQuotationAsset(scannerDataUrl, "scanner") : { url: defaults.scannerUrl, key: defaults.scannerKey };
      const invoiceNumber = await allocateInvoiceNumberForOwner(ctx.user.id);
      const estimationNumber = input.estimationNumber ?? await getNextEstimationNumberForClient(ctx.user.id, input.clientName);
      const signature = signatureDataUrl ? await uploadQuotationAsset(signatureDataUrl, "signature") : { url: defaults.signatureUrl, key: defaults.signatureKey };
      return createQuotation({ ...fields, quotationPrefix: defaults.quotationPrefix, validityDays: input.validityDays ?? defaults.validityDays, gstMode: input.gstMode ?? defaults.gstMode, companyGst: input.companyGst || defaults.companyGst, companyAddress: input.companyAddress || defaults.companyAddress, accountCompanyName: input.accountCompanyName || defaults.accountCompanyName, accountNumber: input.accountNumber || defaults.accountNumber, accountIfsc: input.accountIfsc || defaults.accountIfsc, accountBranch: input.accountBranch || defaults.accountBranch,         terms: input.terms || defaults.terms, logoUrl: defaults.logoUrl, logoKey: defaults.logoKey, ownerId: ctx.user.id, quotationNumber: `PENDING-${nanoid(10)}`, invoiceNumber, estimationNumber, itemsJson: JSON.stringify(effectiveItems), subtotal: subtotal.toFixed(2), gstRate: effectiveGstRate.toFixed(2), gstAmount: gstAmount.toFixed(2), grandTotal: grandTotal.toFixed(2), scannerUrl: scanner.url, scannerKey: scanner.key, signatureUrl: signature.url, signatureKey: signature.key });
    }),
  }),
  branding: router({
    get: protectedProcedure.query(({ ctx }) => getBrandingForOwner(ctx.user.id)),
    forAgreement: publicProcedure.input(z.object({ token: z.string().min(12).max(32) })).query(async ({ input }) => {
      const agreement = await getAgreementByToken(input.token);
      return agreement ? getBrandingForOwner(agreement.ownerId) : null;
    }),
    update: protectedProcedure.input(brandingInput).mutation(async ({ ctx, input }) => {
      let logoUrl: string | null | undefined;
      let logoKey: string | null | undefined;
      if (input.logoDataUrl) {
        const [header, encoded] = input.logoDataUrl.split(",");
        const mimeType = header.match(/^data:(image\/(?:png|jpeg|jpg|webp));base64$/)?.[1] ?? "image/png";
        const extension = mimeType === "image/jpeg" || mimeType === "image/jpg" ? "jpg" : mimeType.split("/")[1];
        const stored = await storagePut(`branding/${ctx.user.id}/logo.${extension}`, Buffer.from(encoded, "base64"), mimeType);
        logoUrl = stored.url;
        logoKey = stored.key;
      }
      return updateBrandingForOwner(ctx.user.id, {
        companyName: input.companyName,
        serviceCaption: input.serviceCaption,
        footerCompanyName: input.footerCompanyName,
        ...(logoUrl ? { companyLogoUrl: logoUrl, companyLogoKey: logoKey } : {}),
      });
    }),
  }),
  projects: router({
    list: protectedProcedure.query(({ ctx }) => listProjectsForOwner(ctx.user.id)),
    create: protectedProcedure.input(z.object({ name: z.string().trim().min(1).max(255), clientIdPrefix: z.string().trim().min(1).max(24), clientIdStart: z.number().int().positive().max(999999999) })).mutation(({ ctx, input }) => createProjectForOwner(ctx.user.id, input)),
    update: protectedProcedure.input(z.object({ id: z.number().int().positive(), name: z.string().trim().min(1).max(255), clientIdPrefix: z.string().trim().min(1).max(24), clientIdStart: z.number().int().positive().max(999999999) })).mutation(({ ctx, input }) => updateProjectForOwner(ctx.user.id, input.id, input)),
    setMain: protectedProcedure.input(z.object({ id: z.number().int().positive() })).mutation(({ ctx, input }) => setMainProjectForOwner(ctx.user.id, input.id)),
    delete: protectedProcedure.input(z.object({ id: z.number().int().positive() })).mutation(({ ctx, input }) => deleteProjectForOwner(ctx.user.id, input.id)),
  }),
  session: router({
    get: protectedProcedure.query(({ ctx }) => getSessionSettings(ctx.user.id)),
    list: protectedProcedure.query(({ ctx }) => listSessionsForOwner(ctx.user.id)),
    create: protectedProcedure.input(z.object({ sessionLabel: z.string().regex(/^\d{4}-\d{4}$/), startDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/), endDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/) }).superRefine((value, ctx) => { if (value.endDate <= value.startDate) ctx.addIssue({ code: "custom", path: ["endDate"], message: "End date must be after start date." }); })).mutation(({ ctx, input }) => createSessionForOwner(ctx.user.id, input)),
    updateRecord: protectedProcedure.input(z.object({ id: z.number().int().positive(), sessionLabel: z.string().regex(/^\d{4}-\d{4}$/), startDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/), endDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/) }).superRefine((value, ctx) => { if (value.endDate <= value.startDate) ctx.addIssue({ code: "custom", path: ["endDate"], message: "End date must be after start date." }); })).mutation(({ ctx, input }) => updateSessionRecordForOwner(ctx.user.id, input.id, { sessionLabel: input.sessionLabel, startDate: input.startDate, endDate: input.endDate })),
    delete: protectedProcedure.input(z.object({ id: z.number().int().positive() })).mutation(({ ctx, input }) => deleteSessionForOwner(ctx.user.id, input.id)),
    update: protectedProcedure.input(z.object({ sessionMode: z.enum(["all", "single"]), currentSession: z.string().regex(/^\d{4}-\d{4}$/) })).mutation(({ ctx, input }) => updateSessionSettings(ctx.user.id, input)),
  }),
  clients: router({
    list: protectedProcedure.input(z.object({ page: z.number().int().min(1).default(1), pageSize: z.number().int().min(10).max(1000).default(25), search: z.string().trim().max(100).optional(), instituteType: z.enum(["School", "College", "Academy"]).optional(), clientStatus: z.enum(["Active", "Inactive"]).optional(), startDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(), endDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(), branchCoverage: z.enum(["individual", "multiple"]).optional(), minValue: z.number().nonnegative().optional(), maxValue: z.number().nonnegative().optional(), sessionMode: z.enum(["all", "single"]).optional(), currentSession: z.string().regex(/^\d{4}-\d{4}$/).optional() })).query(async ({ ctx, input }) => listApprovedClientsForOwner(ctx.user.id, { ...input, ...(input.sessionMode ? {} : await getSessionSettings(ctx.user.id)) })),
  }),
  agreements: router({
    sessions: protectedProcedure.query(({ ctx }) => listSessionsForOwner(ctx.user.id)),
    list: protectedProcedure.input(z.object({ session: z.string().regex(/^\d{4}-\d{4}$/).optional() }).optional()).query(({ ctx, input }) => listAgreementsForOwner(ctx.user.id, input?.session ? { sessionMode: "single", currentSession: input.session } : { sessionMode: "all", currentSession: "" })),
    create: protectedProcedure.input(agreementInput).mutation(async ({ ctx, input }) => {
      const { logoDataUrl, ...fields } = input;
      const logo = await uploadLogo(logoDataUrl);
      const values: Omit<import("../drizzle/schema").InsertAgreement, "ownerId" | "projectId" | "clientId"> = { ...buildAgreementValues(fields as AgreementInput), ...logo, publicToken: nanoid(24), status: "Pending" as const };
      return input.projectId ? createAgreementForProject(ctx.user.id, input.projectId, values) : createAgreement({ ...values, ownerId: ctx.user.id });
    }),
    update: protectedProcedure.input(agreementInput.safeExtend({ publicToken: z.string().min(12).max(32) })).mutation(async ({ ctx, input }) => {
      const { publicToken, logoDataUrl, ...fields } = input;
      const logo = await uploadLogo(logoDataUrl);
      const updated = await updateAgreement(publicToken, ctx.user.id, { ...buildAgreementValues(fields as AgreementInput), ...(logoDataUrl ? logo : {}) });
      if (!updated) throw new TRPCError({ code: "NOT_FOUND", message: "Agreement not found or you do not have permission to edit it." });
      return updated;
    }),
    byToken: publicProcedure.input(z.object({ token: z.string().min(12).max(32) })).query(({ input }) => getAgreementByToken(input.token)),
    respond: publicProcedure.input(z.object({
      token: z.string().min(12).max(32),
      decision: z.enum(["Approved", "Rejected"]),
      termsAccepted: z.boolean(),
      signatureDataUrl: dataUrlSchema.optional(),
      signatureDate: z.string().min(1).max(32).optional(),
    })).mutation(async ({ input }) => {
      const existing = await getAgreementByToken(input.token);
      if (!existing) throw new Error("Agreement not found");
      if (existing.status !== "Pending") throw new Error("This agreement has already been decided");
      if (input.decision === "Approved" && (!input.termsAccepted || !input.signatureDataUrl || !input.signatureDate)) throw new Error("Terms acceptance, signature, and signature date are required");
      let signatureUrl: string | null = null;
      let signatureKey: string | null = null;
      if (input.decision === "Approved" && input.signatureDataUrl) {
        const [, encoded] = input.signatureDataUrl.split(",");
        const stored = await storagePut(`agreements/${input.token}/signature.png`, Buffer.from(encoded, "base64"), "image/png");
        signatureUrl = stored.url;
        signatureKey = stored.key;
      }
      return updateAgreementDecision(input.token, { status: input.decision, signatureUrl, signatureKey, signatureDate: input.decision === "Approved" ? input.signatureDate : null, decidedAt: new Date() });
    }),
  }),
});

export type AppRouter = typeof appRouter;
