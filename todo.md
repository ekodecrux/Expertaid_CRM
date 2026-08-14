# Project TODO

- [x] Build authenticated admin dashboard shell for agreement management
- [x] Add agreement creation form with all requested client, plan, date, and notes fields
- [x] Auto-calculate Total Price from No. of Students × Per Student Price × No. of Year Plan
- [x] Add agreement persistence with exact statuses: Pending, Approved, Rejected
- [x] Generate unique copyable shareable approval links for each agreement
- [x] Add public client-facing agreement review page with no login requirement
- [x] Add clean printable agreement layout for the client-facing page
- [x] Add Terms and Conditions acceptance checkbox
- [x] Add drawable digital signature canvas and persist the resulting signature image
- [x] Add signature date capture and acceptance/rejection timestamps
- [x] Automatically update agreement status on client approval or rejection
- [x] Add admin view for signed agreement details and captured signature image
- [x] Add responsive polished visual design with refined typography and professional styling
- [x] Add Vitest coverage for price calculation and agreement status/signature workflows
- [x] Run type checks, tests, and visual verification before delivery

## History

- [x] Initial project scope created from user requirements

- [x] Add admin visibility for acceptance date alongside the captured signature
- [x] Add Vitest coverage for Approved and Rejected response mutation behavior, validation, and timestamps
- [x] Successfully capture and review the authenticated admin dashboard visual state

- [x] Fix agreement creation modal solid background, width, and responsive form spacing based on user screenshot

- [x] Add optional logo upload when creating a new agreement
- [x] Persist the uploaded logo securely with the agreement record
- [x] Display the agreement logo on client review and print layouts
- [x] Test the logo upload, persistence, and rendering workflow

- [x] Use the provided EXPERTAL Technologies logo as the primary application branding
- [x] Display the primary logo in the admin workspace and client agreement header
- [x] Validate branded layouts and preserve existing agreement logo upload behavior

- [x] Render the per-agreement uploaded logo on the public review and print layout with a primary-logo fallback
- [x] Preserve the uploaded logo MIME type and avoid forwarding logoDataUrl into database inserts
- [x] Add Vitest coverage for logo upload storage and persisted logo metadata
- [x] Visually verify the branded client agreement page; validate per-agreement logo behavior through storage tests and logoUrl rendering path

- [x] Visually verify a client agreement with populated logoUrl metadata and confirm the uploaded logo replaces the fallback using a reversible screenshot check; restore the test record afterward

- [x] Add the provided ERP logo for collapsed-sidebar and responsive application branding
- [x] Move the sidebar menu control to the right side of the navigation header
- [x] Show the ERP logo when the sidebar is collapsed
- [x] Improve desktop, tablet, and mobile responsive navigation and application spacing
- [x] Run responsive visual QA and preserve mobile usability

- [x] Capture desktop, tablet, and mobile visual QA; verify right-side controls and ERP-logo collapsed/mobile implementation paths

- [x] Fix collapsed sidebar ERP logo clipping and place a three-line menu button directly below it

- [x] Add pricing mode selection: per-student pricing or fixed package pricing
- [x] Persist package price and selected pricing mode for each agreement
- [x] Default Start Date to today while allowing manual changes
- [x] Calculate End Date from Start Date plus No. of Year Plan and keep it editable
- [x] Display school logo and expiry date in the agreement list
- [x] Add edit action and update procedure for existing agreements
- [x] Add tests for pricing modes, date calculations, and agreement editing

- [x] Make failed or unauthorized agreement edits return a clear error instead of a false success
- [x] Add a Vitest case covering failed agreement updates

- [x] Diagnose and fix dashboard stuck on loading skeleton after agreement enhancements with live auth precedence
- [x] Verify authenticated dashboard renders and data loads successfully after the fix with a deterministic shell-state test and screenshot

- [x] Clear stale cached auth when live auth is null, unauthorized, or fails
- [x] Add automated auth-state coverage for fresh, cached-success, and cached-failure cases
- [x] Add deterministic dashboard loading/data-render validation coverage

- [x] Ensure auth/dashboard tests are discovered and executed by Vitest
- [x] Add an executed dashboard shell transition test for loading, ready, and sign-in states
- [x] Add an executed validation that agreement data renders after authentication resolves

- [x] Add a component-level render test proving the dashboard loading skeleton transitions to agreement list content after auth and data resolve

- [x] Display agreement start date in each admin agreement list row
- [x] Display the agreement reference number beneath the client name in each admin agreement list row

- [x] Add an actual dashboard integration test using the real Home page path, mocked auth/data procedures, and agreement row content validation

- [x] Replace the partial Home test with real DashboardLayout auth-loading integration coverage

- [x] Remove test-only auth override and cover the production useAuth query transition from loading to authenticated dashboard

- [x] Refine dashboard hero copy and visual hierarchy for a more professional enterprise presentation

- [x] Add institute type selection: School, College, or Academy
- [x] Add branch coverage selection: Individual by default or Multiple branches with branch count
- [x] Persist institute type, branch coverage, and branch count on agreements
- [x] Display institute type and branch coverage in the admin agreement list and client agreement view
- [x] Support editing institute and branch details on existing agreements
- [x] Add automated coverage for institute and branch validation and persistence

- [x] Assert create persists institute type, branch coverage, and branch count
- [x] Assert update persists edited institute type, branch coverage, and branch count

- [x] Position the agreement status badge directly to the right of the client school name in each list row

- [x] Place View signature after Copy link in signed agreement rows
- [x] Give the school name more readable width while keeping status beside it

- [x] Separate agreement identity, metadata, and actions into stable responsive row sections
- [x] Prevent status badges and signed actions from overlapping or wrapping into incorrect columns
- [x] Validate pending and approved rows at desktop and mobile widths

- [x] Capture desktop and mobile verification with both Pending and Approved agreement rows visible
- [x] Add focused coverage asserting Pending and Approved row status/action separation

- [x] Capture deterministic live dashboard screenshots with both Pending and Approved agreements guaranteed visible
- [x] Assert separate identity, metadata, and actions containers for both row statuses and verify Copy link precedes View signature

- [x] Verify live database status counts contain at least one Pending and one Approved agreement before final screenshots

- [x] Add Expertaid Technologies Pvt. Ltd. company header with logo to the top of client agreement pages
- [x] Display the uploaded client logo beside the client name, with fallback branding when absent
- [x] Ensure all agreement logos fit their containers without clipping or distortion
- [x] Optimize the client agreement and print layout for a clean single-page presentation
- [x] Validate branded client-link rendering and print layout at desktop and mobile widths

- [x] Widen the client-logo frame so wide school logos remain visibly legible while fitting cleanly beside the client name
- [x] Prevent company branding text from wrapping into a narrow column beside the status controls on mobile agreement links
- [x] Confirm fully loaded A4 print output remains one page for a signed agreement (approved agreement id 1 with stored signature)
- [x] Capture final print-layout evidence with logos and signature content visible (company logo, client fallback logo, and signature shown in final A4 render)

- [x] Match the client agreement print layout to the provided reference: branded top header, agreement details panel, dark prepared-for banner, card-based information sections, and bottom signature/footer treatment
- [x] Correct the bottom footer company name to exactly “Expertaid Technologies”
- [x] Preserve responsive client-link usability and one-page A4 print output after the visual redesign

- [x] Change the agreement header subtitle to exactly “IT Support Services”
- [x] Change the agreement footer company name to exactly “Expertaid Technologies Pvt Ltd”
- [x] Revalidate the corrected branding in the responsive page and one-page A4 print output
- [x] Recheck the exact branding text at a mobile viewport after the latest update

- [x] Display the agreement product name as exactly “ERP Application”
- [x] Revalidate the updated product wording on the responsive agreement page and one-page A4 print output

- [x] Restore the agreement header subtitle to exactly “ERP Solutions & IT Support Services”
- [x] Display the product name as exactly “ERP Software” inside the Agreement Details panel
- [x] Revalidate the revised branding on the responsive agreement page and one-page A4 print output
- [x] Verify the latest ERP Software wording at a mobile viewport after the revised branding update

- [x] Add a View option beside Terms & Conditions for clients who are accepting an agreement
- [x] Add a scrollable Terms & Conditions viewer using the supplied agreement document as the content reference
- [x] Require a confirmation checkbox at the bottom of the terms viewer before enabling agreement acceptance
- [x] Preserve the existing printable agreement layout with no terms-viewer controls in print output
- [x] Validate the mandatory confirmation flow, responsive client page, tests, and one-page A4 print output
- [x] Render the full supplied Software Service Agreement text in the scrollable viewer (wired from the complete DOCX extraction)
- [x] Make the bottom-of-viewer checkbox the only terms confirmation control
- [x] Capture fresh mobile and print QA evidence for the terms-viewer update (mobile screenshot plus inspected one-page A4 PDF)

- [x] Ensure every rendered logo fits its assigned slot without clipping, overflow, or distortion across admin, client, mobile, and print views
- [x] Validate all logo placements after the global containment styling update
- [x] Capture fresh admin QA for expanded/collapsed sidebar, mobile header, agreement-list, and logo-picker containment (desktop expanded sidebar, mobile header/list screenshots, and source-level picker/collapsed-slot verification)

- [x] Change the agreement header caption to exactly “ERP Solutions • Software Development • IT Support”
- [x] Revalidate the updated caption on desktop, mobile, and one-page A4 print output
- [x] Inspect the fresh A4 print render to confirm the updated caption is visible and unclipped (confirmed beneath the company name in /tmp/agreement-caption-final.pdf; one A4 page)

- [x] Format agreement reference numbers as ERP26001-style identifiers, starting with ERP26001
- [x] Display the ERP26001-style reference consistently in admin rows, client Agreement Details, and print output
- [x] Validate the new reference format and preserve existing agreement workflow behavior

- [x] Add a client option to upload a digital signature image from the local device
- [x] Preserve the existing draw-signature option and allow switching, replacing, or removing the selected signature
- [x] Validate uploaded signature file type and size before using it in the existing secure persistence flow
- [x] Keep terms confirmation, signature date, acceptance, responsive behavior, and print output unchanged
- [x] Validate the upload and draw flows with tests, responsive QA, and one-page A4 print verification (21 tests pass; pending mobile QA verified; existing print-hidden flow preserved)
- [x] Add explicit replace-upload behavior and clear signature state when switching between Draw and Upload modes
- [x] Convert JPEG/WebP uploads to PNG data URLs before using the existing PNG persistence path
- [x] Add focused tests for signature mode validation and acceptance-state behavior
- [x] Generate and inspect a fresh post-change A4 print artifact (one page, A4 dimensions confirmed)
- [x] Add UI/integration coverage for Draw/Upload switching, replace/remove behavior, invalid upload rejection, and accept-button readiness (AgreementPage render coverage plus shared validation/state tests)
- [x] Visually inspect the successful post-change A4 PDF for hidden upload controls and unclipped agreement content (one-page A4 render inspected)

- [x] Align the admin shell toward the reference with a wider top bar, search area, admin profile controls, and expanded navigation structure (visual shell refinement with authenticated profile context)
- [x] Add or refine KPI cards for Total Agreements, Pending, Approved, Expiring Soon, and Pipeline Value
- [x] Refine the agreement list toward a structured table with client/reference, value, dates, status, and compact actions
- [x] Preserve agreement creation, editing, link copying, signature viewing, public links, and responsive behavior
- [x] Validate the reference-inspired dashboard on desktop and mobile before checkpointing

- [x] Apply the supplied enterprise dashboard visual refinement without changing existing agreement or signature logic
- [x] Preserve agreement creation/editing, ERP26001 references, link actions, public links, terms confirmation, and signature upload behavior
- [x] Validate the redesigned dashboard on desktop and mobile with existing workflow tests passing
- [x] Connect the reference-style top-bar search to the existing agreement filter without changing current search behavior
- [x] Add an explicit desktop Status column while keeping the existing mobile stacked rows and actions
- [x] Capture authenticated preview evidence for the final reference-inspired dashboard (desktop and mobile previews show agreement data, KPI cards, actions, and profile context; findings recorded in dashboard-qa.md)

- [x] Rebuild the full dashboard top bar to match the reference: brand mark, search field, notification indicator, admin avatar, name, role, and dropdown affordance (explicit ChevronDown-triggered profile menu with Sign out action)
- [x] Expand the sidebar navigation presentation toward Dashboard, Agreements, Clients, Reminders, Reports, and Settings without breaking the existing Agreements route
- [x] Match the reference KPI card arrangement and agreement table composition, including compact row actions and pagination-style footer treatment
- [x] Preserve all existing agreement creation/editing, link, signature, terms, ERP26001, and local signature-upload functionality
- [x] Validate the complete reference-style dashboard at desktop and mobile widths before checkpointing (1536×1024 and 390×844 previews visibly show live authenticated dashboard data; findings recorded in dashboard-qa.md)

- [x] Restructure the desktop shell into a true full-width top bar above the sidebar/content area, with the logo on the far left and search/notification/profile controls in the top bar
- [x] Offset the desktop sidebar below the 102px top bar so the top logo and first navigation item do not overlap
- [x] Match the reference content geometry: compact KPI cards in one horizontal row, tighter dashboard spacing, and a wide agreements panel below
- [x] Add a dedicated agreements-panel search and Filter control while preserving the existing global search behavior
- [x] Convert desktop agreement rows into aligned fixed columns for client/reference, value, dates, accepted date, status, and icon actions; keep mobile cards responsive
- [x] Refactor desktop agreement rows into a true header-aligned grid with fixed columns for client/reference, value, start date, expiry, accepted date, status, and actions
- [x] Replace desktop text action buttons with compact icon actions while preserving accessible labels/tooltips and all existing behaviors
- [x] Re-run desktop/mobile QA after the fixed-column and compact-action refactor and record evidence before checkpointing (desktop fixed-grid and icon actions; mobile labels and actions preserved)
- [x] Use one exact shared grid template for the desktop agreement header and rows
- [x] Hide the inline client status badge on desktop so the dedicated Status column is the only desktop status display
- [x] Re-run final desktop/mobile QA after the alignment correction and record the evidence (desktop aligned grid/single status column and mobile responsive rows verified)

- [x] Preserve all existing agreement and signature workflows and validate the reference composition on desktop and mobile (24 tests, production build, and post-refactor desktop/mobile screenshots passed)

- [x] Reduce the desktop header height and keep it fixed while scrolling
- [x] Move the primary logo into the sidebar header, place the menu control after it, and show the Expertaid Technologies name beside the branding
- [x] Preserve the compact/mobile branding behavior without breaking the existing sidebar controls
- [x] Add Settings fields for editable company logo, company name, service caption, and footer company name
- [x] Persist branding settings and use them in the dashboard shell and agreement branding without changing agreement workflows
- [x] Validate fixed-header scrolling, sidebar branding order, settings persistence, responsive behavior, tests, and production build

- [x] Persist editable company branding settings and expose protected tRPC procedures
- [x] Build responsive Settings page with logo upload and editable branding fields
- [x] Freeze and compact dashboard header; reorder sidebar logo, menu icon, and company name
- [x] Consume dynamic branding in dashboard shell and public agreement page
- [x] Add Vitest coverage and complete responsive/browser/build validation
- [x] Save a checkpoint with the completed branding Settings module

- [x] Refine the desktop header to show the company logo in the left slot, keep the menu boundary, and show the brand name after the divider
- [x] Verify the header alignment at desktop and mobile widths without affecting existing navigation

- [x] Remove the extra Agreements hero metadata, description, and feature bullets shown in the provided reference
- [x] Validate the simplified dashboard hero and preserve existing workflows

- [x] Move the agreements panel caption above the All agreements heading to match the provided reference
- [x] Validate the caption position without affecting agreement search, filter, or actions

- [x] Move the agreements caption above the entire All agreements card, not inside the card header
- [x] Validate the clarified caption placement and preserve existing agreement workflows

- [x] Diagnose the sandbox tRPC query returning an HTML document instead of JSON
- [x] Fix the API routing/server issue and validate the working sandbox URL

- [x] Remove the agreements caption entirely from the dashboard
- [x] Validate the simplified All agreements section and preserve existing workflows

- [x] Add the “Track progress, expiry, and approval links.” caption below the All agreements card
- [x] Validate the new below-card placement without affecting agreement workflows

- [x] Add “Track progress, expiry, and approval links.” directly below the Agreements heading
- [x] Validate the heading copy placement without affecting existing agreement workflows

- [x] Freeze the dashboard header while scrolling the Agreements page
- [x] Validate fixed-header scrolling without affecting sidebar, navigation, or mobile behavior

- [x] Remove the visible horizontal divider lines from the frozen dashboard header
- [x] Validate the borderless fixed header without affecting branding, controls, or mobile behavior

- [x] Cancelled: change the application title to exactly “Expertaid - CRM”
- [x] Cancelled: validate the updated browser title and preserve existing branding and workflows

- [x] Set the browser tab title to exactly “Expertaid - CRM”
- [x] Validate the browser title without changing other application branding or workflows

- [x] Redesign the unauthenticated login page with attractive Expertaid CRM branding
- [x] Preserve the secure existing authentication flow and avoid hardcoded credentials
- [x] Validate login-page responsiveness, accessibility, and sign-in behavior

- [x] Make the Expertaid CRM login page fit in a single viewport without page scrolling
- [x] Validate no-scroll behavior at desktop and mobile widths without affecting secure sign-in

- [x] Correct the remaining login-page overflow so the full desktop and mobile experience is visible in one viewport
- [x] Verify no-scroll behavior at representative desktop and mobile heights
