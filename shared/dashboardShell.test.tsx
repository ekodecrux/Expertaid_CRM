import React from "react";
import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { DashboardShell } from "../client/src/components/DashboardShell";

describe("DashboardShell component", () => {
  it("renders loading first and agreement content after auth resolves", () => {
    const loadingMarkup = renderToStaticMarkup(
      <DashboardShell loading={true} hasUser={false} loadingFallback={<div>Loading dashboard</div>} unauthenticatedFallback={<div>Sign in</div>}>
        <div>Agreement list: Greenfield Public School</div>
      </DashboardShell>,
    );
    expect(loadingMarkup).toContain("Loading dashboard");
    expect(loadingMarkup).not.toContain("Agreement list");

    const readyMarkup = renderToStaticMarkup(
      <DashboardShell loading={false} hasUser={true} loadingFallback={<div>Loading dashboard</div>} unauthenticatedFallback={<div>Sign in</div>}>
        <div>Agreement list: Greenfield Public School</div>
      </DashboardShell>,
    );
    expect(readyMarkup).toContain("Agreement list: Greenfield Public School");
    expect(readyMarkup).not.toContain("Loading dashboard");
  });
});
