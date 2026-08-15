import { describe, expect, it } from "vitest";
import { resolveAuthState } from "./authState";
import { resolveAgreementListView, resolveDashboardShellView } from "./dashboardState";

describe("auth and dashboard loading state", () => {
  it("keeps a fresh request loading until live auth resolves", () => {
    const state = resolveAuthState({ isFetched: false, isLoading: true, liveUser: null, cachedUser: null, logoutPending: false });
    expect(state.loading).toBe(true);
    expect(state.user).toBeNull();
    expect(resolveDashboardShellView({ loading: state.loading, hasUser: state.isAuthenticated })).toBe("loading");
  });

  it("keeps protected content blocked while cached identity awaits live auth", () => {
    const state = resolveAuthState({ isFetched: false, isLoading: true, liveUser: null, cachedUser: { id: 1 }, logoutPending: false });
    expect(state.user).toBeNull();
    expect(state.isAuthenticated).toBe(false);
    expect(state.loading).toBe(true);
    expect(resolveDashboardShellView({ loading: state.loading, hasUser: state.isAuthenticated })).toBe("loading");
  });

  it("clears stale identity when live auth resolves without a user", () => {
    const state = resolveAuthState({ isFetched: true, isLoading: false, liveUser: null, cachedUser: { id: 1 }, logoutPending: false });
    expect(state.user).toBeNull();
    expect(state.shouldClearCache).toBe(true);
    expect(resolveDashboardShellView({ loading: state.loading, hasUser: state.isAuthenticated })).toBe("signin");
  });

  it("renders the dashboard after live auth resolves", () => {
    const state = resolveAuthState({ isFetched: true, isLoading: false, liveUser: { id: 1 }, cachedUser: null, logoutPending: false });
    expect(resolveDashboardShellView({ loading: state.loading, hasUser: state.isAuthenticated })).toBe("ready");
  });

  it("transitions the agreement list from loading to data-ready", () => {
    expect(resolveAgreementListView({ loading: true, agreements: undefined })).toBe("loading");
    expect(resolveAgreementListView({ loading: false, agreements: [{ id: 1, clientName: "Test School" }] })).toBe("ready");
    expect(resolveAgreementListView({ loading: false, agreements: [] })).toBe("empty");
  });
});
