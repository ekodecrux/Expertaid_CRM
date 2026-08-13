import React, { type ReactNode } from "react";

export function DashboardShell({
  loading,
  hasUser,
  loadingFallback,
  unauthenticatedFallback,
  children,
}: {
  loading: boolean;
  hasUser: boolean;
  loadingFallback: ReactNode;
  unauthenticatedFallback: ReactNode;
  children: ReactNode;
}) {
  if (loading) return <>{loadingFallback}</>;
  if (!hasUser) return <>{unauthenticatedFallback}</>;
  return <>{children}</>;
}
