export type AuthStateInput<User> = {
  isFetched: boolean;
  isLoading: boolean;
  liveUser: User | null | undefined;
  cachedUser: User | null;
  logoutPending: boolean;
};

export function resolveAuthState<User>({ isFetched, isLoading, liveUser, cachedUser, logoutPending }: AuthStateInput<User>) {
  const hasLiveResult = isFetched;
  const user = hasLiveResult ? liveUser ?? null : cachedUser;
  return {
    user,
    loading: (!hasLiveResult && isLoading && !cachedUser) || logoutPending,
    isAuthenticated: Boolean(user),
    shouldClearCache: hasLiveResult && !liveUser,
  };
}
