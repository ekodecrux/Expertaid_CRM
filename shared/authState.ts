export type AuthStateInput<User> = {
  isFetched: boolean;
  isLoading: boolean;
  liveUser: User | null | undefined;
  cachedUser: User | null;
  logoutPending: boolean;
};

export function resolveAuthState<User>({ isFetched, isLoading, liveUser, cachedUser, logoutPending }: AuthStateInput<User>) {
  const hasLiveResult = isFetched;
  // A cached identity is display-only until the live session check completes.
  // Treating it as authenticated lets protected queries fire without the
  // preview cookie/Bearer token and produces a misleading "Please login" error.
  const user = hasLiveResult ? liveUser ?? null : null;
  return {
    user,
    loading: !hasLiveResult || logoutPending,
    isAuthenticated: Boolean(user),
    shouldClearCache: hasLiveResult && !liveUser,
  };
}
