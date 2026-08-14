import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { nanoid } from "nanoid";
import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { protectedProcedure, publicProcedure, router } from "./_core/trpc";
import { createAgreement, getAgreementByToken, listAgreementsForOwner, listApprovedClientsForOwner, updateAgreement, updateAgreementDecision, getBrandingForOwner, updateBrandingForOwner, getUserByEmail } from "./db";
import { storagePut } from "./storage";
import { sdk } from "./_core/sdk";
import { validateCredentialLogin } from "./credentialLogin";
import { calculateAgreementEndDate, calculateAgreementTotal, PricingMode } from "@shared/pricing";

const dataUrlSchema = z.string().regex(/^data:image\/(png|jpeg|jpg|webp);base64,[A-Za-z0-9+/=]+$/).max(2_500_000);
const brandingInput = z.object({
  companyName: z.string().trim().min(1).max(255),
  serviceCaption: z.string().trim().min(1).max(255),
  footerCompanyName: z.string().trim().min(1).max(255),
  logoDataUrl: dataUrlSchema.optional(),
});

const agreementInput = z.object({
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
  startDate: z.string().min(1),
  endDate: z.string().min(1),
  description: z.string().optional(),
  logoDataUrl: dataUrlSchema.optional(),
}).superRefine((value, ctx) => {
  if (value.pricingMode === "perStudent" && value.perStudentPrice == null) ctx.addIssue({ code: "custom", path: ["perStudentPrice"], message: "Per-student price is required" });
  if (value.pricingMode === "package" && value.packagePrice == null) ctx.addIssue({ code: "custom", path: ["packagePrice"], message: "Package price is required" });
  if (value.branchCoverage === "individual" && value.branchCount !== 1) ctx.addIssue({ code: "custom", path: ["branchCount"], message: "Individual agreements must have one branch" });
  if (value.branchCoverage === "multiple" && value.branchCount < 2) ctx.addIssue({ code: "custom", path: ["branchCount"], message: "Multiple-branch agreements must have at least two branches" });
});

type AgreementInput = z.infer<typeof agreementInput>;

async function uploadLogo(logoDataUrl: string | undefined) {
  if (!logoDataUrl) return { logoUrl: null, logoKey: null };
  const [header, encoded] = logoDataUrl.split(",");
  const mimeType = header.match(/^data:(image\/(?:png|jpeg|jpg|webp));base64$/)?.[1] ?? "image/png";
  const extension = mimeType === "image/jpeg" || mimeType === "image/jpg" ? "jpg" : mimeType.split("/")[1];
  const stored = await storagePut(`agreements/${nanoid(10)}/logo.${extension}`, Buffer.from(encoded, "base64"), mimeType);
  return { logoUrl: stored.url, logoKey: stored.key };
}

function buildAgreementValues(input: AgreementInput) {
  const totalPrice = calculateAgreementTotal(input.pricingMode as PricingMode, input.noOfStudents, input.perStudentPrice, input.packagePrice, input.noOfYearPlan);
  return {
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
    startDate: input.startDate,
    endDate: input.endDate,
    totalPrice: totalPrice.toFixed(2),
    description: input.description || null,
  };
}

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    loginWithCredentials: publicProcedure.input(z.object({ email: z.string().trim().email(), password: z.string().min(1) })).mutation(async ({ ctx, input }) => {
      if (!validateCredentialLogin(input.email, input.password)) {
        throw new TRPCError({ code: "UNAUTHORIZED", message: "Invalid email or password." });
      }
      const user = await getUserByEmail(input.email.trim().toLowerCase());
      if (!user) {
        throw new TRPCError({ code: "UNAUTHORIZED", message: "Invalid email or password." });
      }
      const sessionToken = await sdk.createSessionToken(user.openId, { name: user.name ?? "" });
      ctx.res.cookie(COOKIE_NAME, sessionToken, getSessionCookieOptions(ctx.req));
      return user;
    }),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true } as const;
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
  clients: router({
    list: protectedProcedure.input(z.object({ page: z.number().int().min(1).default(1), pageSize: z.number().int().min(10).max(1000).default(25), search: z.string().trim().max(100).optional(), instituteType: z.enum(["School", "College", "Academy"]).optional(), clientStatus: z.enum(["Active", "Inactive"]).optional(), startDate: z.string().regex(/^\\d{4}-\\d{2}-\\d{2}$/).optional(), endDate: z.string().regex(/^\\d{4}-\\d{2}-\\d{2}$/).optional(), branchCoverage: z.enum(["individual", "multiple"]).optional(), minValue: z.number().nonnegative().optional(), maxValue: z.number().nonnegative().optional() })).query(({ ctx, input }) => listApprovedClientsForOwner(ctx.user.id, input)),
  }),
  agreements: router({
    list: protectedProcedure.query(({ ctx }) => listAgreementsForOwner(ctx.user.id)),
    create: protectedProcedure.input(agreementInput).mutation(async ({ ctx, input }) => {
      const { logoDataUrl, ...fields } = input;
      const logo = await uploadLogo(logoDataUrl);
      return createAgreement({ ...buildAgreementValues(fields as AgreementInput), ...logo, ownerId: ctx.user.id, publicToken: nanoid(24), status: "Pending" });
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
