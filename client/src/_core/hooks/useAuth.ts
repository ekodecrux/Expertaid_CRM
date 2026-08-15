import { trpc } from "@/lib/trpc";
import { TRPCClientError } from "@trpc/client";
import { resolveAuthState } from "@shared/authState";
import { useCallback, useEffect, useMemo } from "react";

type UseAuthOptions = {
  redirectOnUnauthenticated?: boolean;
  redirectPath?: string;
};

export function useAuth(options?: UseAuthOptions) {
  // Login is started via startLogin() in the effect below, only when we actually
  // navigate — never during render. startLogin() mints a one-time nonce + writes
  // the state cookie, so calling it per render would overwrite the cookie and
  // desync it from an in-flight login's `state`.
  const { redirectOnUnauthenticated = false, redirectPath } = options ?? {};
  const utils = trpc.useUtils();

  const meQuery = trpc.auth.me.useQuery(undefined, {
    retry: false,
    refetchOnWindowFocus: false,
  });

  const cachedUser = useMemo(() => {
    try {
      const raw = localStorage.getItem("manus-runtime-user-info");
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  }, []);

  const logoutMutation = trpc.auth.logout.useMutation({
    onSuccess: () => {
      utils.auth.me.setData(undefined, null);
    },
  });

  const logout = useCallback(async () => {
    try {
      await logoutMutation.mutateAsync();
    } catch (error: unknown) {
      if (
        error instanceof TRPCClientError &&
        error.data?.code === "UNAUTHORIZED"
      ) {
        return;
      }
      throw error;
    } finally {
      // Clear the Preview auto-login token mirrored into sessionStorage, so
      // header-based sessions (Safari ITP / WebView) are logged out too. The
      // backend cookie is cleared by the logout mutation.
      try {
        sessionStorage.removeItem("manus-cookie");
        localStorage.removeItem("manus-runtime-user-info");
      } catch {}
      utils.auth.me.setData(undefined, null);
      await utils.auth.me.invalidate();
    }
  }, [logoutMutation, utils]);

  const resolvedAuth = resolveAuthState({
    isFetched: meQuery.isFetched,
    isLoading: meQuery.isLoading,
    liveUser: meQuery.data ?? null,
    cachedUser,
    logoutPending: logoutMutation.isPending,
  });

  const state = useMemo(() => ({
    user: resolvedAuth.user,
    loading: resolvedAuth.loading,
    error: meQuery.error ?? logoutMutation.error ?? null,
    isAuthenticated: resolvedAuth.isAuthenticated,
  }), [resolvedAuth, meQuery.error, logoutMutation.error]);

  useEffect(() => {
    if (!meQuery.isFetched) return;
    try {
      if (meQuery.data) localStorage.setItem("manus-runtime-user-info", JSON.stringify(meQuery.data));
      else localStorage.removeItem("manus-runtime-user-info");
    } catch {}
  }, [meQuery.data, meQuery.isFetched]);

  return {
    ...state,
    refresh: () => meQuery.refetch(),
    logout,
  };
}
