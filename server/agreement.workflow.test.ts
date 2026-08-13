import { beforeEach, describe, expect, it, vi } from "vitest";
import { calculateAgreementTotal } from "@shared/pricing";

const { getAgreementByToken, updateAgreementDecision, storagePut } = vi.hoisted(() => ({
  getAgreementByToken: vi.fn(),
  updateAgreementDecision: vi.fn(),
  storagePut: vi.fn(),
}));

vi.mock("./db", () => ({
  createAgreement: vi.fn(),
  listAgreementsForOwner: vi.fn(),
  getAgreementByToken,
  updateAgreementDecision,
}));
vi.mock("./storage", () => ({ storagePut }));

import { appRouter } from "./routers";

describe("agreement workflow", () => {
  const pendingAgreement = { id: 7, publicToken: "public-token-123", status: "Pending" as const };
  const ctx = { user: null, req: {} as any, res: {} as any };

  beforeEach(() => {
    vi.clearAllMocks();
    getAgreementByToken.mockResolvedValue(pendingAgreement);
    updateAgreementDecision.mockImplementation(async (_token, values) => ({ ...pendingAgreement, ...values }));
    storagePut.mockResolvedValue({ key: "agreements/public-token-123/signature.png", url: "/manus-storage/agreements/public-token-123/signature.png" });
  });

  it("calculates total price from students, unit price, and years", () => {
    expect(calculateAgreementTotal(250, 499, 3)).toBe(374250);
    expect(calculateAgreementTotal(125, 499.5, 1)).toBe(62437.5);
  });

  it("approves with terms, signature, date, storage, and timestamp", async () => {
    const caller = appRouter.createCaller(ctx);
    const result = await caller.agreements.respond({
      token: pendingAgreement.publicToken,
      decision: "Approved",
      termsAccepted: true,
      signatureDataUrl: "data:image/png;base64,YWJj",
      signatureDate: "2026-08-13",
    });

    expect(storagePut).toHaveBeenCalledOnce();
    expect(updateAgreementDecision).toHaveBeenCalledWith(pendingAgreement.publicToken, expect.objectContaining({
      status: "Approved",
      signatureUrl: "/manus-storage/agreements/public-token-123/signature.png",
      signatureKey: "agreements/public-token-123/signature.png",
      signatureDate: "2026-08-13",
      decidedAt: expect.any(Date),
    }));
    expect(result.status).toBe("Approved");
  });

  it("rejects without requiring a signature but records the decision timestamp", async () => {
    const caller = appRouter.createCaller(ctx);
    const result = await caller.agreements.respond({ token: pendingAgreement.publicToken, decision: "Rejected", termsAccepted: false });
    expect(storagePut).not.toHaveBeenCalled();
    expect(updateAgreementDecision).toHaveBeenCalledWith(pendingAgreement.publicToken, expect.objectContaining({ status: "Rejected", decidedAt: expect.any(Date) }));
    expect(result.status).toBe("Rejected");
  });

  it("rejects approval when the required acceptance inputs are missing", async () => {
    const caller = appRouter.createCaller(ctx);
    await expect(caller.agreements.respond({ token: pendingAgreement.publicToken, decision: "Approved", termsAccepted: false })).rejects.toThrow("Terms acceptance, signature, and signature date are required");
    expect(updateAgreementDecision).not.toHaveBeenCalled();
  });
});
