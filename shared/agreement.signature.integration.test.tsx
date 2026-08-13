import React from "react";
import { describe, expect, it, vi } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";

const queryState = vi.hoisted(() => ({
  data: {
    id: 1,
    publicToken: "pending-signature-token",
    clientName: "Signature Test School",
    clientOwnerName: "Principal",
    contactNumber: "9876543210",
    email: "principal@example.com",
    address: "School Road",
    noOfStudents: 10,
    pricingMode: "perStudent",
    perStudentPrice: "400.00",
    packagePrice: null,
    noOfYearPlan: 1,
    startDate: "2026-08-13",
    endDate: "2027-08-12",
    totalPrice: "4000.00",
    description: null,
    logoUrl: null,
    status: "Pending",
    signatureUrl: null,
    signatureDate: null,
    decidedAt: null,
    createdAt: new Date("2026-08-13T00:00:00Z"),
  },
  isLoading: false,
}));

vi.mock("wouter", () => ({ useRoute: () => [true, { token: "pending-signature-token" }] }));
vi.mock("sonner", () => ({ toast: { success: vi.fn(), error: vi.fn() } }));
vi.mock("@/lib/trpc", () => ({
  trpc: {
    agreements: {
      byToken: { useQuery: () => queryState },
      respond: { useMutation: () => ({ isPending: false, mutate: vi.fn() }) },
    },
  },
}));

import AgreementPage from "../client/src/pages/AgreementPage";

describe("AgreementPage signature controls", () => {
  it("renders both signature modes and safe upload guidance for pending agreements", () => {
    const markup = renderToStaticMarkup(<AgreementPage />);
    expect(markup).toContain("Draw signature");
    expect(markup).toContain("Upload signature");
    expect(markup).toContain("Accept &amp; sign agreement");
    expect(markup).toContain("disabled");
  });
});
