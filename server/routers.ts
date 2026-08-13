import { z } from "zod";
import { nanoid } from "nanoid";
import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { protectedProcedure, publicProcedure, router } from "./_core/trpc";
import { createAgreement, getAgreementByToken, listAgreementsForOwner, updateAgreementDecision } from "./db";
import { storagePut } from "./storage";
import { calculateAgreementTotal } from "@shared/pricing";

const agreementInput = z.object({
  clientName: z.string().trim().min(1).max(255),
  clientOwnerName: z.string().trim().min(1).max(255),
  contactNumber: z.string().trim().min(3).max(64),
  email: z.string().trim().email().max(320),
  address: z.string().trim().min(1),
  noOfStudents: z.number().int().positive(),
  perStudentPrice: z.number().nonnegative(),
  noOfYearPlan: z.number().int().positive(),
  startDate: z.string().min(1),
  endDate: z.string().min(1),
  description: z.string().optional(),
});

const dataUrlSchema = z.string().regex(/^data:image\/(png|jpeg|jpg);base64,[A-Za-z0-9+/=]+$/).max(2_500_000);

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true } as const;
    }),
  }),
  agreements: router({
    list: protectedProcedure.query(({ ctx }) => listAgreementsForOwner(ctx.user.id)),
    create: protectedProcedure.input(agreementInput).mutation(async ({ ctx, input }) => {
      const totalPrice = calculateAgreementTotal(input.noOfStudents, input.perStudentPrice, input.noOfYearPlan);
      const agreement = await createAgreement({
        ...input,
        ownerId: ctx.user.id,
        publicToken: nanoid(24),
        perStudentPrice: input.perStudentPrice.toFixed(2),
        totalPrice: totalPrice.toFixed(2),
        description: input.description || null,
        status: "Pending",
      });
      return agreement;
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
      if (input.decision === "Approved" && (!input.termsAccepted || !input.signatureDataUrl || !input.signatureDate)) {
        throw new Error("Terms acceptance, signature, and signature date are required");
      }

      let signatureUrl: string | null = null;
      let signatureKey: string | null = null;
      if (input.decision === "Approved" && input.signatureDataUrl) {
        const [, encoded] = input.signatureDataUrl.split(",");
        const buffer = Buffer.from(encoded, "base64");
        const stored = await storagePut(`agreements/${input.token}/signature.png`, buffer, "image/png");
        signatureUrl = stored.url;
        signatureKey = stored.key;
      }

      return updateAgreementDecision(input.token, {
        status: input.decision,
        signatureUrl,
        signatureKey,
        signatureDate: input.decision === "Approved" ? input.signatureDate : null,
        decidedAt: new Date(),
      });
    }),
  }),
});

export type AppRouter = typeof appRouter;
