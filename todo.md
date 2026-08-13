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
