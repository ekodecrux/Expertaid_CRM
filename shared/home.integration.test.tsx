import React from "react";
import { describe, expect, it, vi } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";

const { listResult, mutationResult, authQueryState } = vi.hoisted(() => ({
  listResult: {
    data: [{
      id: 42,
      publicToken: "integration-public-token-123",
      clientName: "Greenfield Public School",
      clientOwnerName: "Principal",
      contactNumber: "9876543210",
      email: "principal@greenfield.school",
      address: "School Road",
      noOfStudents: 250,
      pricingMode: "perStudent",
      perStudentPrice: "499.00",
      packagePrice: null,
      noOfYearPlan: 1,
      startDate: "2026-08-13",
      endDate: "2027-08-12",
      totalPrice: "124750.00",
      description: null,
      logoUrl: null,
      logoKey: null,
      status: "Pending",
      signatureUrl: null,
      signatureKey: null,
      signatureDate: null,
      decidedAt: null,
      createdAt: new Date("2026-08-13T00:00:00Z"),
      updatedAt: new Date("2026-08-13T00:00:00Z"),
    }],
    isLoading: false,
    refetch: vi.fn(),
  },
  mutationResult: { isPending: false, mutate: vi.fn() },
  authQueryState: { data: null as any, isLoading: true, isFetched: false, error: null },
}));

vi.mock("wouter", () => ({ useLocation: () => ["/", vi.fn()] }));
vi.mock("@/lib/trpc", () => ({ trpc: { auth: { me: { useQuery: () => authQueryState }, logout: { useMutation: () => mutationResult } }, agreements: { list: { useQuery: () => listResult }, create: { useMutation: () => mutationResult }, update: { useMutation: () => mutationResult } }, useUtils: () => ({ auth: { me: { setData: vi.fn(), invalidate: vi.fn() } } }) } }));
vi.mock("sonner", () => ({ toast: { success: vi.fn(), error: vi.fn() } }));
vi.mock("@/components/ui/dialog", async () => {
  const actual = await vi.importActual<typeof import("@/components/ui/dialog")>("@/components/ui/dialog");
  return { ...actual, Dialog: ({ children }: { children: React.ReactNode }) => <>{children}</>, DialogContent: ({ children }: { children: React.ReactNode }) => <div>{children}</div>, DialogHeader: ({ children }: { children: React.ReactNode }) => <div>{children}</div>, DialogTitle: ({ children }: { children: React.ReactNode }) => <h2>{children}</h2>, DialogTrigger: ({ children }: { children: React.ReactNode }) => <>{children}</> };
});

import DashboardLayout from "../client/src/components/DashboardLayout";
import Home from "../client/src/pages/Home";

globalThis.localStorage = { getItem: () => null, setItem: () => undefined, removeItem: () => undefined, clear: () => undefined, key: () => null, length: 0 } as Storage;

describe("Home dashboard integration", () => {
  it("renders the real dashboard shell and Home agreement data after auth resolves", () => {
    const loadingMarkup = renderToStaticMarkup(<DashboardLayout><Home /></DashboardLayout>);
    expect(loadingMarkup).toContain("animate-pulse");

    authQueryState.data = { id: 7, name: "Test Admin", email: "admin@test.local" };
    authQueryState.isLoading = false;
    authQueryState.isFetched = true;
    const markup = renderToStaticMarkup(<DashboardLayout><Home /></DashboardLayout>);
    expect(markup).toContain("Greenfield Public School");
    expect(markup).toContain("Ref #00042");
    expect(markup).toContain("2026-08-13");
    expect(markup).toContain("2027-08-12");
    expect(markup).toContain("Copy link");
  });
});
