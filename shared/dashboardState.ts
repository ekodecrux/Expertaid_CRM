export type DashboardShellView = "loading" | "signin" | "ready";

export function resolveDashboardShellView(input: { loading: boolean; hasUser: boolean }): DashboardShellView {
  if (input.loading) return "loading";
  return input.hasUser ? "ready" : "signin";
}

export function resolveAgreementListView<T>(input: { loading: boolean; agreements: T[] | undefined }) {
  if (input.loading && !input.agreements) return "loading" as const;
  if ((input.agreements ?? []).length === 0) return "empty" as const;
  return "ready" as const;
}
