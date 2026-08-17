import { beforeEach, describe, expect, it, vi } from "vitest";
import { calculateAgreementEndDate, calculateAgreementTotal } from "@shared/pricing";

const { createAgreement, getAgreementByToken, updateAgreement, updateAgreementDecision, storagePut } = vi.hoisted(() => ({
  createAgreement: vi.fn(),
  getAgreementByToken: vi.fn(),
  updateAgreement: vi.fn(),
  updateAgreementDecision: vi.fn(),
  storagePut: vi.fn(),
}));

vi.mock("./db", () => ({
  createAgreement,
  listAgreementsForOwner: vi.fn(),
  getAgreementByToken,
  updateAgreement,
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
    expect(calculateAgreementTotal("perStudent", 250, 499, null, 3)).toBe(374250);
    expect(calculateAgreementTotal("perStudent", 125, 499.5, null, 1)).toBe(62437.5);
    expect(calculateAgreementTotal("package", 250, null, 125000, 2)).toBe(250000);
  });

  it("calculates expiry dates from the editable start date and year plan", () => {
    expect(calculateAgreementEndDate("2026-08-13", 1)).toBe("2027-08-12");
    expect(calculateAgreementEndDate("2026-02-28", 2)).toBe("2028-02-27");
  });

  it("stores an uploaded JPEG logo with its MIME type and excludes the data URL from persistence", async () => {
    createAgreement.mockResolvedValue({ id: 8, publicToken: "new-public-token-123", status: "Pending", logoUrl: "/manus-storage/logo.jpg" });
    storagePut.mockResolvedValue({ key: "agreements/logo/logo.jpg", url: "/manus-storage/logo.jpg" });
    const caller = appRouter.createCaller({ user: { id: 1 } as any, req: {} as any, res: {} as any });
    await caller.agreements.create({
      clientName: "Test School",
      clientOwnerName: "Principal",
      instituteType: "School",
      branchCoverage: "individual",
      branchCount: 1,
      contactNumber: "9876543210",
      email: "principal@test.school",
      address: "Test Address",
      noOfStudents: 100,
      pricingMode: "perStudent",
      perStudentPrice: 499,
      packagePrice: null,
      noOfYearPlan: 1,
      startDate: "2026-08-13",
      endDate: "2027-08-12",
      description: "Logo test",
      logoDataUrl: "data:image/jpeg;base64,YWJj",
    });
    expect(storagePut).toHaveBeenCalledWith(expect.stringMatching(/^agreements\/.+\/logo\.jpg$/), expect.any(Buffer), "image/jpeg");
    expect(createAgreement).toHaveBeenCalledWith(expect.objectContaining({ logoUrl: "/manus-storage/logo.jpg", logoKey: "agreements/logo/logo.jpg", instituteType: "School", branchCoverage: "individual", branchCount: 1 }));
    expect(createAgreement.mock.calls[0][0]).not.toHaveProperty("logoDataUrl");
  });

  it("updates an existing agreement using the selected package pricing mode", async () => {
    updateAgreement.mockResolvedValue({ id: 8, publicToken: "new-public-token-123", pricingMode: "package", packagePrice: "125000.00", totalPrice: "250000.00" });
    const caller = appRouter.createCaller({ user: { id: 1 } as any, req: {} as any, res: {} as any });
    const result = await caller.agreements.update({
      publicToken: "new-public-token-123",
      clientName: "Updated School",
      clientOwnerName: "Chairman",
      instituteType: "College",
      branchCoverage: "multiple",
      branchCount: 3,
      contactNumber: "9876543210",
      email: "chairman@updated.school",
      address: "Updated Address",
      noOfStudents: 200,
      pricingMode: "package",
      perStudentPrice: null,
      packagePrice: 125000,
      noOfYearPlan: 2,
      startDate: "2026-08-13",
      endDate: "2028-08-12",
      description: "Updated package",
    });
    expect(updateAgreement).toHaveBeenCalledWith("new-public-token-123", 1, expect.objectContaining({ pricingMode: "package", packagePrice: "125000.00", perStudentPrice: null, subtotal: "250000.00", gstRate: "18.00", gstMode: "exclusive", gstAmount: "45000.00", totalPrice: "295000.00", endDate: "2028-08-12", instituteType: "College", branchCoverage: "multiple", branchCount: 3 }));
    expect(result.pricingMode).toBe("package");
  });

  it("rejects multiple-branch agreements with fewer than two branches", async () => {
    const caller = appRouter.createCaller({ user: { id: 1 } as any, req: {} as any, res: {} as any });
    await expect(caller.agreements.create({
      clientName: "Branch Test Academy",
      clientOwnerName: "Owner",
      instituteType: "Academy",
      branchCoverage: "multiple",
      branchCount: 1,
      contactNumber: "9876543210",
      email: "owner@academy.test",
      address: "Academy Address",
      noOfStudents: 100,
      pricingMode: "package",
      perStudentPrice: null,
      packagePrice: 50000,
      noOfYearPlan: 1,
      startDate: "2026-08-13",
      endDate: "2027-08-12",
      description: "Invalid branch count",
    })).rejects.toThrow();
  });

  it("rejects an edit when the agreement is not found for the current owner", async () => {
    updateAgreement.mockResolvedValue(undefined);
    const caller = appRouter.createCaller({ user: { id: 99 } as any, req: {} as any, res: {} as any });
    await expect(caller.agreements.update({
      publicToken: "missing-public-token-123",
      clientName: "Unknown School",
      clientOwnerName: "Owner",
      instituteType: "Academy",
      branchCoverage: "multiple",
      branchCount: 2,
      contactNumber: "9876543210",
      email: "owner@unknown.school",
      address: "Unknown Address",
      noOfStudents: 100,
      pricingMode: "package",
      perStudentPrice: null,
      packagePrice: 50000,
      noOfYearPlan: 1,
      startDate: "2026-08-13",
      endDate: "2027-08-12",
      description: "Unauthorized edit",
    })).rejects.toThrow("Agreement not found or you do not have permission to edit it.");
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
