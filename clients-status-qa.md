# Clients Status QA

The desktop preview at 1366×768 renders the full Clients shell with four KPI cards, the expanded status filter, and the client table using the available content width beside the sidebar. The table includes the Status column with project-aware editable controls and retains the contained horizontal-scroll behavior.

The mobile preview at 390×844 stacks the page header actions and KPI cards cleanly without page-level horizontal overflow. The table remains lower on the page within its own scroll container, preserving access to wide row content and status controls.

Validation completed during this change: `pnpm exec tsc --noEmit` passed; `pnpm test -- --run` passed with 25 files and 72 tests; `pnpm build` passed; the reviewed migration was applied to the connected development database; the Hostinger repair SQL was updated with guarded lifecycle-status schema changes.

Note: the automatic status label is computed from each client end date at render time: Expired after the end date, Ready to Expire during the five days before it, and Active otherwise, unless a manual lifecycle status such as Hold, Cancelled, Renewal, Extended, or Closed is persisted.
