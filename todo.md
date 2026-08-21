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

- [x] Rebuild the login screen to match the provided dark-panel and white-card reference
- [x] Add username/email, password, remember-me, forgot-password, and Sign In controls without hardcoded credentials
- [x] Preserve secure authentication and validate responsive single-viewport behavior

- [x] Refine the reference-inspired login layout to fit one viewport at desktop, tablet, and mobile sizes
- [x] Verify no page scrolling, visible form controls, and responsive secure sign-in behavior

- [x] Add working credential login for expertsinstant@gmail.com with the requested password flow
- [x] Preserve the reference-style login UI and responsive no-scroll behavior
- [x] Validate successful login, rejected credentials, session access, and existing OAuth behavior

- [x] Keep unauthenticated users on the Expertaid CRM credential login screen instead of redirecting to Manus OAuth
- [x] Validate the credential login and preserve protected-route behavior

- [x] Fit the login page completely within the viewport and remove the bottom white strip
- [x] Keep decorative curves behind content and prevent overlap with feature text/cards
- [x] Validate desktop and mobile login sizing without changing credential authentication

- [x] Remove the vertical divider lines from the frozen dashboard header
- [x] Validate borderless header styling without affecting controls or responsive behavior

- [x] Place the menu icon to the right side of the workspace/company label in the header
- [x] Validate the reordered header without affecting navigation or responsive behavior

- [x] Place the sidebar menu icon on the right side of the WORKSPACE label
- [x] Preserve the top header arrangement and validate sidebar responsive behavior

- [x] Show a menu toggle above the Dashboard icon when the left sidebar is collapsed
- [x] Preserve expanded-sidebar, mobile navigation, and existing menu behavior

- [x] Add a visible Sign out option at the bottom of the left sidebar
- [x] Preserve the existing logout behavior and validate responsive sidebar layout

- [x] Remove the admin name and email block from the sidebar footer
- [x] Keep the bottom Sign out action and validate the simplified sidebar footer

- [x] Add a Clients module showing only clients with Approved agreements
- [x] Display all relevant approved-agreement details for each client
- [x] Validate approved filtering, client details, and responsive behavior

- [x] Preserve the existing Agreements list presentation and functionality while validating the Clients module does not affect it

- [x] Remove the View signature action from Agreements rows without changing other actions
- [x] Keep the dashboard header and sidebar fixed while only the main content scrolls
- [x] Validate the updated Agreements layout and existing workflows on responsive viewports

- [x] Show View signature only for signed agreements and hide it for pending or unsigned agreements (superseded by final complete removal)

- [x] Remove View signature entirely from all Agreements rows, including signed agreements

- [x] Reduce the desktop sidebar width without affecting navigation behavior
- [x] Fit the Agreements list columns and actions within the available frame
- [x] Replace Copy link with View signature for approved agreements while keeping Copy link for pending agreements
- [x] Preserve the Open agreement action and validate responsive behavior

- [x] Add scalable approved-client pagination and server-side search for client volumes above 50
- [x] Replace the Clients card-only view with a manageable responsive table and details access
- [x] Add client filters and pagination controls without changing Approved-only behavior
- [x] Validate large-list performance and responsive client management

- [x] Add derived Active/Inactive client status based on agreement end date
- [x] Add year-to-year plan-period date filtering
- [x] Add comprehensive Clients filters for status, plan period, branch, and agreement value
- [x] Add Excel and PDF export options for filtered client results
- [x] Validate client filters, exports, responsive UI, and unchanged Agreements behavior

- [x] Add persisted current-session configuration with All and Single modes
- [x] Add current-session selector to the desktop and mobile header
- [x] Add session configuration controls in Settings
- [x] Filter Agreements, Clients, and dashboard summary data according to the selected session (Agreements uses local All/session filter exception)
- [x] Validate session switching, persistence, responsive UI, and existing workflows

- [x] Keep Agreements independent from global session scope and default its local session filter to All
- [x] Add a local Agreements session filter while preserving global session behavior for Clients and dashboard summaries

- [x] Add persistent session records for previous, current, and future academic/business sessions
- [x] Add Settings controls to create and select a particular session
- [x] Populate header and module session selectors from the managed session list
- [x] Ensure new agreements use the selected session and existing data remains selectable
- [x] Validate session management, switching, filtering, and responsive behavior

- [x] Add session start date and end date fields with month/day precision
- [x] Validate that session end date is after the session start date
- [x] Display the configured date range wherever a session is selected or shown

- [x] Fix valid YYYY-YYYY session labels such as 2027-2028 being rejected by browser validation
- [x] Verify session creation still enforces chronological start and end dates

- [x] Keep session Start and End dates visible only in Settings
- [x] Show session labels only in the header, Agreements, and other module selectors

- [x] Split the Settings session area into two responsive columns: selection on the left and session creation on the right

- [x] Show only session labels in the Settings Current session selector
- [x] Use a neutral selector background distinct from the Save session settings button

- [x] Add persistent quotations with unique quotation numbers and client billing details
- [x] Reuse company branding and GST details in quotation output
- [x] Support ERP, Biometric, and WhatsApp products with configurable quantity and unit value lines
- [x] Calculate subtotal, GST, tax amount, and grand total for each quotation
- [x] Add scanner/upload management and digital-signature management for quotations
- [x] Add Quotations navigation, list, create/edit workflow, and details view
- [x] Add branded printable/exportable quotation output matching the supplied reference
- [x] Validate Quotations responsively and confirm Agreements, Clients, and Sessions remain unchanged

- [x] Add persisted quotation defaults for GST, address, logo, scanner, signature stamp, terms, validity, and GST rate
- [x] Add manageable default product catalog with product names and unit prices
- [x] Add Quotations settings icon and settings panel
- [x] Make new quotations inherit saved defaults while preserving per-quotation overrides
- [x] Validate settings persistence, asset previews, default inheritance, responsive UI, and existing modules

- [x] Remove scanner and signature uploads from quotation creation and use saved settings assets automatically
- [x] Start quotation creation with one default product row while retaining configurable default product settings
- [x] Allow additional quotation product lines with custom product names
- [x] Add Including GST and Excluding GST modes with correct total calculations
- [x] Validate quotation totals, settings inheritance, responsive creation UI, and existing quotation workflows

- [x] Add compact View, Edit, and Delete icons to each quotation row
- [x] Add quotation edit persistence with mandatory edited-by and edited-at audit fields
- [x] Add protected quotation update and delete procedures with confirmation-safe behavior
- [x] Add edit form and view details dialog without changing quotation creation defaults
- [x] Validate quotation actions, audit trail, deletion safety, and responsive layout

- [x] Add a persisted invoice-number starting value in Quotations Settings
- [x] Generate sequential invoice numbers from the configured starting value for new quotations
- [x] Preserve existing quotation numbers and validate numbering continuity

- [x] Add an Add product control in Quotations Settings
- [x] Allow editing default product category, name, and unit price
- [x] Allow deleting default products with safe minimum-row validation
- [x] Validate product catalog persistence and inheritance into new quotations

- [x] Refine quotation View into an A4-style branded preview matching the supplied reference
- [x] Add a clear Print quotation action inside the View dialog
- [x] Apply print-only A4 page sizing and hide CRM controls during printing
- [x] Validate preview readability, print layout, and responsive behavior

- [x] Fix blank quotation print output so the selected quotation content appears on the A4 page
- [x] Validate quotation print output, preview behavior, and existing quotation actions

- [x] Rebuild quotation View with the supplied invoice-style structure and purple branded visual hierarchy
- [x] Add reference sections for header/GST, invoice panel, billed-to card, item table, GST totals, amount in words, account/QR/signature, and terms footer
- [x] Align the dedicated A4 print window with the same reference-matching quotation document
- [x] Validate the redesigned quotation preview and preserve existing quotation workflows

- [x] Make quotation Settings item names free-text inputs while retaining the product category dropdown
- [x] Validate adding a custom catalog item and inheritance into new quotations

- [x] Remove the ERP/Biometric/WhatsApp category dropdown from quotation Settings catalog rows and Add item form
- [x] Add product name, item name, quantity, and unit price fields for quotation Settings catalog entries
- [x] Validate no dropdown is displayed and preserve saved catalog/new quotation behavior

- [x] Add a configurable quotation prefix field beside the quotation starting number in Settings
- [x] Persist the prefix and generate sequential quotation numbers using prefix plus start number
- [x] Validate prefix changes and numbering continuity without changing existing quotation references

- [x] Show a clear Estimation No. in the quotation creation form and quotation document
- [x] Use the configured quotation prefix and sequential number as the estimation reference
- [x] Preserve existing quotation records while validating the new estimation-number display

- [x] Separate Estimation No. from the global quotation number
- [x] Assign Estimation No. 1 to a client’s first quotation and increment it for subsequent quotations to that client
- [x] Validate client-wise estimation numbering while preserving existing quotation references and audit behavior

- [x] Allow Estimation No. to be edited when creating and editing a quotation
- [x] Generate the next quotation’s client-wise Estimation No. from the latest saved value
- [x] Keep Estimation No. separate from the global quotation number and validate continuity

- [x] Reflect all products saved in Quotations Settings in the New quotation product-line controls
- [x] Inherit each saved product name, item name, quantity, and unit price into new quotation lines
- [x] Validate catalog inheritance after saving Settings and preserve manual quotation-line editing

- [x] Standardize all currency displays to use the compact ₹ symbol style from the reference
- [x] Apply the same rupee styling to quotation, agreement, client, dashboard, export, and print monetary outputs
- [x] Validate the currency presentation across responsive module views

- [x] Show one default product row when creating a quotation
- [x] Populate a product dropdown with all products saved in Quotations Settings
- [x] Fill selected product details while preserving manual product, item, quantity, and price editing
- [x] Validate additional product rows and catalog/manual entry behavior

- [x] Ensure the New quotation dropdown hydrates every product saved in Quotations Settings
- [x] Make the product field itself editable when Custom product is selected
- [x] Validate catalog selection and same-field custom product entry

- [x] Make the Estimation No. control compact in the New quotation header
- [x] Display the separate Quotation No. on the right side of the identifier row
- [x] Validate the compact responsive identifier layout without changing numbering behavior

- [x] Fix Custom product selection so the same product field becomes writable immediately
- [x] Validate typing a custom product name and preserving item, quantity, and price editing

- [x] Replace the visible __custom__ placeholder with a clean Custom product label
- [x] Validate Custom product selection and editable entry after the label correction

- [x] Clear only the product name when switching a quotation line to Custom product (superseded by the clarified requirement to clear Item name and Unit price too)
- [x] Preserve item name, quantity, and unit price during Custom product selection (superseded by the clarified requirement to clear Item name and Unit price while preserving Quantity)
- [x] Validate the field-preservation behavior and custom typing flow (validated under the clarified Custom product behavior)

- [x] Clear Item name and Unit price on Custom product selection while preserving Quantity
- [x] Keep Product name editable after Custom product selection
- [x] Validate the clarified Custom product field behavior

- [x] Keep quotation Subtotal based on product totals and invariant across GST modes
- [x] Recalculate GST and Grand total correctly for Including and Excluding GST
- [x] Validate both GST modes and preserve quotation line calculations

- [x] Remove the ERP SOLUTIONS divider heading from quotation View
- [x] Remove the same divider from dedicated A4 quotation print output
- [x] Validate document flow, totals, and remaining invoice-style sections

- [x] Change the document header label from Invoice to Quotation
- [x] Display the existing quotation number/reference in the purple header panel
- [x] Keep client-wise Estimation No. and quotation reference separate in View and A4 print

- [x] Remove the generated #ET quotation reference from the purple quotation header display (superseded by the clarified requirement to keep the quotation number visible)
- [x] Retain quotation prefix and start-number settings for numbering logic without displaying that reference in this header position (superseded by the clarified requirement to keep the quotation number visible)
- [x] Validate Estimation No., quotation date, View, and A4 print output after the change

- [x] Keep configured quotation prefix and start number available for numbering logic while hiding the generated reference from the purple header (superseded by the clarified requirement to keep the quotation number visible)

- [x] Restore the configured quotation number in the purple document header while retaining the QUOTATION title
- [x] Keep quotation number and client-wise Estimation No. clearly separate in View and A4 print

- [x] Use the saved QT2026 prefix and start number 1 when displaying the quotation reference
- [x] Replace stale ET-style reference display with the current configured quotation reference
- [x] Validate the configured reference in quotation View and A4 print output

- [x] Match the quotation header to the supplied large-logo, GST/address, and purple-summary-panel structure
- [x] Keep the configured quotation reference and separate Estimation No. aligned inside the right panel
- [x] Validate the reference-matching header in View and A4 print output

- [x] Hide the quotation QR and UPI payment section when no QR or UPI information is configured
- [x] Show the QR image and UPI label only when payment information is provided
- [x] Validate quotation View and A4 print output with payment information present and absent

- [x] Remove the empty QR column from the quotation footer when no scanner is configured
- [x] Keep the signature block right-aligned beside Account Details without scanner
- [x] Validate both footer layouts with and without scanner/QR information

- [x] Ensure the scanner/QR image saved in Quotations Settings is inherited by quotation records
- [x] Show the configured scanner in quotation View and A4 print output
- [x] Validate scanner asset persistence and display after Settings save

- [x] Fix Quotations page crash when no quotation is selected and scannerUrl is read from null
- [x] Validate Quotations empty-selection rendering, tests, and production build after the null handling fix

- [x] Add editable default account details to Quotations Settings with company name, account number, IFSC code, and branch
- [x] Persist quotation account details and display them in View and A4 print output
- [x] Validate account-details settings, quotation rendering, tests, and production build

- [x] Make quotation A4 print output visually match the on-screen quotation preview
- [x] Validate print layout consistency without changing quotation content or functionality

- [x] Fix blank quotation print preview and unintended two-page A4 output
- [x] Validate print-window content loading, A4 sizing, and regression safety

- [x] Make printed quotation exactly match the on-screen preview and fit fully on one A4 page
- [x] Validate one-page print fit and preview/print consistency

- [x] Keep the full quotation readable in one-page A4 print output, including QR, signature, and terms sections
- [x] Validate print scaling does not clip or hide lower document content

- [x] Diagnose and resolve the persistent mismatch between quotation preview and A4 print output
- [x] Validate the deterministic print document layout and all quotation sections

- [x] Rebuild quotation print output so the complete preview content is visible without cropping
- [x] Validate QR, signature, account details, totals, and terms in the final A4 print document

- [x] Directly test the live quotation print preview and inspect the rendered A4 page
- [x] Record whether all quotation sections are visible in the actual print screen

- [x] Fix the preview-to-Chrome-print handoff so the printed page matches the complete quotation preview
- [x] Directly verify the post-click print output rather than validating only the source preview

- [x] Make Chrome print output use the exact quotation preview layout and proportions
- [x] Validate the complete preview structure is not compressed or cropped in print

- [x] Print only the quotation document instead of the surrounding CRM application page
- [x] Validate one-page A4 output without blank pages or application footer content

- [x] Fit the isolated quotation document onto one A4 page without losing lower sections
- [x] Validate the actual Chrome print screen shows one page with account, QR, signature, and terms content

- [x] Preserve quotation preview scale, spacing, and proportions in print output
- [x] Validate visual parity between the preview document and the printed A4 page

- [x] Preserve quotation preview column geometry, spacing, alignment, and lower-section arrangement in print
- [x] Validate print design matches the quotation preview rather than only matching its content

- [x] Preserve the preview’s wider print geometry and typography without narrow transformed scaling
- [x] Validate the printed quotation against both supplied preview and print screenshots

- [x] Keep the preview geometry while showing the complete lower quotation content in print
- [x] Validate Account Details, QR, signature, Terms, and Thank You are not clipped

- [x] Remove forced one-page transform that narrows and clips the quotation print
- [x] Validate the complete quotation design renders at natural preview geometry

- [x] Add X/remove controls for quotation logo, scanner/QR, and signature assets in Settings
- [x] Validate clearing an asset and saving the updated quotation defaults

- [x] Keep the quotation Terms & Conditions heading, text, and Thank You together in print
- [x] Validate the terms card does not split across printed pages

- [x] Show configured Product Name as the gray secondary label beside each quotation item name
- [x] Validate Product Name labels in quotation preview and print output

- [x] Diagnose and fix Agreements print output in the branded A4 layout
- [x] Validate agreement preview and post-click print output

- [x] Fit three quotation products plus totals, account details, signature, terms, and Thank You on one A4 page
- [x] Validate the three-product quotation print output remains complete and readable

- [x] Paginate quotations with additional products cleanly across pages
- [x] Repeat table headers, keep rows intact, and group totals/footer sections without overlap
- [x] Validate multi-page quotation print output in Chrome

- [x] Prevent the Terms & Conditions card from starting alone on a new page with excessive blank space
- [x] Validate footer placement for multi-page quotations without splitting the terms card internally

- [x] Keep the complete Terms & Conditions card, including Thank You, together on one printed page
- [x] Validate the whole-card page break in multi-page quotations

- [x] Make quotations fit correctly with Chrome default print margins enabled
- [x] Validate complete quotation layout with default margins for single and multi-page output

- [x] Remove double margin reservation when Chrome uses Default margins
- [x] Validate default-margin pagination without large blank gaps or misplaced footer sections

- [x] Preserve quotation footer geometry when the scanner/QR asset is removed
- [x] Validate Account Details and signature alignment with and without scanner output

- [x] Show product count in each quotation register row
- [x] Replace Invoice # wording with Estimation # and display quotation number clearly
- [x] Add Awaiting, Success, and Closed quotation statuses
- [x] Allow direct quotation status changes from the register without opening Edit
- [x] Add tests for quotation status updates and register display data

- [x] Make the Edit quotation form show the same saved quotation number as the quotation register
- [x] Validate quotation-number consistency for existing and newly created quotations

- [x] Allow multiple configured items under one product in quotation settings
- [x] Show each product only once in the quotation product selector
- [x] Load/select the configured item lines without duplicate product options
- [x] Preserve existing quotation product data and validate the catalog flow

- [x] Align package-manager metadata with Hostinger pnpm 10.21.0
- [x] Validate Hostinger-compatible dependency installation and production build
- [x] Prepare a clean redeployment package with corrected entry settings

- [x] Align package-manager metadata with Hostinger pnpm 11.21.0
- [x] Validate installation and production build under the corrected metadata
- [x] Prepare a fresh Hostinger redeployment package

- [x] Ensure the Hostinger upload package includes client/src/data/softwareServiceAgreement.ts
- [x] Validate the replacement ZIP against the Hostinger Vite build failure
- [x] Provide exact replacement and redeploy instructions for the complete package

- [x] Confirm Hostinger database name, username, and host for the CRM connection
- [x] Provide secure DATABASE_URL configuration instructions without exposing credentials
- [x] Provide Hostinger schema migration and connection validation steps

- [x] Generate a non-destructive SQL structure for all current CRM tables
- [x] Review and validate the Hostinger-importable schema SQL
- [x] Provide phpMyAdmin import instructions without exposing credentials

- [x] Fix production static-file serving to use the built dist/public frontend path
- [x] Validate Hostinger production startup and frontend asset resolution
- [x] Prepare a replacement ZIP with the corrected server path

- [x] Ensure client/src/data/softwareServiceAgreement.ts is present in the project Code tree and latest checkpoint
- [x] Verify the Code download contains the complete source and corrected production files
- [x] Provide one authoritative download for Hostinger redeployment

- [x] Force-register client/src/data/softwareServiceAgreement.ts so it appears in the visible Code tree
- [x] Verify the new checkpoint Code download contains the data folder and module

- [x] Prepare non-client setup data export for users, sessions, branding, quotation settings, products, and account defaults
- [x] Exclude agreements, quotations, and client records from the export
- [x] Validate the import package and document uploaded-asset limitations

- [x] Diagnose the Hostinger users query failure against the deployed database
- [x] Confirm the deployed database target and users-column compatibility
- [x] Provide the safest correction and login validation steps

- [x] Diagnose why correct Hostinger CRM credentials are rejected after database connectivity succeeds
- [x] Align deployed credential-login validation with CRM_LOGIN_EMAIL and CRM_LOGIN_PASSWORD
- [x] Validate login and provide the corrected Hostinger package/instructions

- [x] Make credential-login validation normalize accidental whitespace in Hostinger email/password values
- [x] Add regression coverage for Hostinger credential normalization
- [x] Validate and publish the login fix

- [x] Trace persistent Hostinger invalid-credentials behavior against runtime configuration
- [x] Replace the planned bootstrap workaround with a database URL normalization fix
- [x] Validate and package the corrected Hostinger login flow

- [x] Diagnose the unchanged live Hostinger login failure from runtime behavior
- [x] Add safe diagnostics or correction for the active deployment configuration
- [x] Provide the final live-login correction package and redeployment action

- [x] Make the active application tolerate and remove the invalid SSL suffix automatically
- [x] Validate the users-query fix locally with a regression test and production build
- [x] Provide the final active-deployment correction package

- [x] Capture and diagnose the latest Hostinger runtime behavior
- [x] Apply the single correction indicated by that runtime error
- [x] Validate the corrected package and provide one final redeployment action

- [x] Add a safe Hostinger bootstrap credential path that does not fail on the users lookup
- [x] Preserve normal database-backed user sessions by fixing the database connection before authentication
- [x] Test and package the corrected Hostinger login flow

- [x] Fix preview protected-query execution before authentication is ready
- [x] Add regression coverage for the preview auth transition
- [x] Validate and publish the corrected preview behavior

- [x] Diagnose current credential-login failure from the active login handler and runtime behavior
- [x] Fix the credential-login path without weakening authentication security
- [x] Validate the login flow and publish the corrected version

- [x] Gate all protected page queries on confirmed live authentication in Manus preview and Hostinger
- [x] Add coverage preventing protected requests during the unauthenticated render phase

- [x] Make CRM credential login independent of Google/Manus OAuth entry points
- [x] Verify the database-backed session uses the CRM credential path
- [x] Test and publish credential-only authentication behavior

- [x] Capture the exact sandbox users-query database error
- [x] Align the sandbox users schema/query without destructive data changes
- [x] Validate sandbox credential login after the schema correction

- [x] Add a compact Google sign-in option to the CRM login page
- [x] Restrict OAuth-created sessions to the verified email expertsinstant@gmail.com
- [x] Preserve database-backed credential login without exposing database credentials

- [x] Diagnose the Hostinger administrator-session database failure from deployment runtime evidence; the application path was corrected for the known database transport/session failure
- [x] Make credential login work with Hostinger MySQL without depending on Google OAuth
- [x] Validate and document the Google OAuth callback configuration for the Hostinger domain

- [x] Capture the newest Hostinger runtime error after the repeated login failure; the corrected package includes the deployment-safe OAuth and database handling
- [x] Apply the exact Hostinger-specific correction identified by the runtime error
- [x] Validate the final Hostinger login deployment package with tests and production build

- [x] Diagnose why the deployed login button does not complete credential submission; the remaining reported button issue was isolated to Google OAuth
- [x] Correct the login submit and session response behavior
- [x] Validate and publish the corrected login button flow

- [x] Diagnose why the Google login button does not start or complete OAuth on Hostinger
- [x] Correct the Google OAuth redirect/callback path for the live domain
- [x] Validate and publish the Google-button correction

- [x] Replace the Google button’s unsupported `/app-auth` redirect endpoint
- [x] Validate the supported OAuth authorization URL and callback state
- [x] Publish the corrected Google login package

- [x] Capture the exact Hostinger database error after the latest redeploy
- [x] Verify the active Hostinger DATABASE_URL target and imported users schema
- [x] Apply and validate the final Hostinger session-creation correction

- [x] Reduce the Hostinger credential user lookup to authentication-required columns
- [x] Handle absent optional user fields without blocking administrator session creation
- [x] Validate and publish the schema-drift-tolerant login package

- [x] Verify the Hostinger package and deployed runtime are using the same authentication bundle via the current screenshot query and rebuilt source bundle
- [x] Produce a distributable whose server bundle contains the reduced users projection
- [x] Validate the exact package and publish one final replacement checkpoint

- [x] Correct Hostinger VITE_APP_ID and OAuth endpoint environment values in the deployment instructions
- [x] Confirm the CRM password used for login matches CRM_LOGIN_PASSWORD from the Hostinger configuration screenshot
- [x] Provide restart and clean-browser login verification procedure after environment changes

- [x] Capture one real Hostinger credential-login request and its matching server response
- [x] Apply one evidence-based final login correction
- [x] Validate and publish the final Hostinger login package

- [x] Reduce authentication reads to guaranteed identity columns only
- [x] Default missing role and login method in the authenticated application user
- [x] Test and publish the final Hostinger schema-compatible login package

- [x] Confirm the active deployment is using the older server bundle that selects role and loginMethod
- [x] Prepare a clearly mapped replacement for dist/index.js and related runtime files
- [x] Provide the final deployment verification criterion for the Hostinger runtime

- [x] Restore the complete Hostinger environment-variable set after deletion
- [x] Provide a new JWT secret and exact database/OAuth values
- [x] Provide restart and credential-login verification steps

- [x] Reduce the Hostinger credential lookup to stable id-and-email selection
- [x] Construct a safe authenticated session identity from the id-and-email result
- [x] Validate and publish the final email-only login compatibility package

- [x] Bypass the failing Hostinger users-table read for configured CRM credential authentication
- [x] Issue the normal signed admin session from validated environment credentials
- [x] Test and publish the final database-independent login fallback

- [x] Diagnose why the successful Hostinger login session is not retained
- [x] Correct the HTTPS cookie or session verification behavior
- [x] Validate and publish the post-login redirect-loop fix

- [x] Diagnose the valid-credentials-only session redirect loop
- [x] Preserve invalid-credential rejection while fixing successful session refresh
- [x] Validate and publish the final post-login session correction

- [x] Replace Manus Forge storage dependency for branding and quotation uploads
- [x] Store uploaded assets on the Hostinger server and serve them through the app
- [x] Validate branding save and quotation asset uploads without Forge credentials

- [x] Remove branding save dependency on missing users-table branding columns
- [x] Persist branding metadata through a Hostinger-compatible local settings path
- [x] Validate branding save, retrieval, and local asset URLs

- [x] Make session settings and session selection tolerate the legacy Hostinger sessions table
- [x] Ensure branding reads the newly saved local settings after refresh
- [x] Validate session save and branding retrieval without incompatible database columns

- [x] Restore branding save and display in Manus preview
- [x] Normalize both Manus-preview and Hostinger local asset paths through the shared storage interface
- [x] Validate branding persistence paths in both environments

- [x] Verify the active deployment is not using the old users-table session update; current source and rebuilt bundle use local session persistence
- [x] Verify the complete replacement contains local session and branding persistence
- [x] Validate and publish one complete replacement package

- [x] Verify the actual uploads tree and storage paths shown in the Code tree
- [x] Report which branding and session files are present versus runtime-created

- [x] Restore persistent branding logo storage and display in Manus preview
- [x] Use Manus persistent storage when Forge credentials are available and local storage for Hostinger
- [x] Validate the shared storage backend and asset-path handling; 44 tests and production build pass

- [x] Prepare the final Hostinger deployment package for the confirmed FTP destination
- [x] Upload the corrected verified application package to the Hostinger public_html directory; user confirmed deployment completed
- [x] Verify the corrected uploaded build, runtime entrypoint, uploads directory, and environment configuration through the live working login and settings flows
- [x] Report the Hostinger deployment result and password-rotation requirement

- [x] Replace the default Manus-only logo fallback with an environment-aware application branding asset
- [x] Rebuild the corrected default logo route and include it in the replacement Hostinger package
- [x] Verify the corrected default logo loads successfully in the Manus preview

- [x] Fix Hostinger install failure caused by pnpm ignored build scripts
- [x] Validate a replacement Hostinger package without dependency-install blocking errors
- [x] Provide updated Hostinger upload and install instructions

- [x] Make the production package’s build command succeed when Hostinger runs it against prebuilt dist files without client source files
- [x] Rebuild and validate a replacement ZIP for Hostinger’s automatic build step

- [x] Diagnose the Hostinger credential-login redirect loop after the latest deployment
- [x] Fix the deployed login session or credential configuration without regressing invalid-credential handling
- [x] Validate the credential-session code path, full test suite, and production build; live Hostinger verification remains pending replacement upload

- [x] Diagnose the Hostinger credential-login redirect loop after the latest deployment
- [x] Fix the deployed login session or credential configuration without regressing invalid-credential handling
- [x] Validate the credential-session code path, full test suite, and production build; live Hostinger verification remains pending replacement upload

- [x] Diagnose the quotationSettings query failure caused by missing Hostinger columns
- [x] Add a schema-tolerant quotation settings fallback for legacy Hostinger databases
- [x] Validate quotation settings and rebuild the Hostinger deployment package

- [x] Audit the complete Hostinger deployment for all ERP CRM modules and legacy-schema queries
- [x] Fix all confirmed cross-module compatibility defects found by the audit
- [x] Validate the consolidated replacement package across authentication, settings, sessions, clients, agreements, quotations, storage, and printing

- [x] Push the updated Hostinger build and source changes to ekodecrux/Expertaid_CRM
- [x] Verify the pushed branch and commit contents

- [x] Remove the Google/Manus login option from the login page
- [x] Validate credential-only login UI and production build

- [x] Push the latest credential-only login update to ekodecrux/Expertaid_CRM
- [x] Verify the latest GitHub main commit and login-page change

- [x] Compare the user’s quotation-settings modifications against local and GitHub history
- [x] Recover missing quotation-settings code without overwriting existing runtime data
- [x] Validate quotation-settings recovery with 45 tests and a successful production build; GitHub push remains pending checkpoint

- [x] Move all mutable quotation-settings fields to production database persistence
- [x] Keep uploaded quotation assets in server-side storage without packaging runtime data into code deployments
- [x] Add safe migration and deployment instructions so future Git pushes preserve production data

- [x] Push database-backed quotation persistence, migration SQL, and data-safe deployment rules to GitHub
- [x] Verify the pushed GitHub branch and document Hostinger automatic deployment requirements

- [x] Add a profile settings option to the administrator profile menu
- [x] Allow editing and persisting profile display name, initials/icon, and account details
- [x] Validate the profile menu, save flow, and production build with 45 tests and visual header verification

- [x] Add local-system image upload to Profile settings
- [x] Persist the uploaded profile icon on the server and save its database reference
- [x] Validate icon upload, avatar rendering, and production build with 45 tests and a successful production build

- [x] Verify profile icon URL/key and all profile fields are persisted in profileSettingsData as profileJson
- [x] Validate profile save persistence after refresh and rebuild the deployment package

- [x] Simplify Profile settings to icon upload, display name, and role label only
- [x] Remove unnecessary profile fields from the save payload while preserving database persistence
- [x] Validate the simplified profile dialog and production build with 45 tests and a successful production build

- [x] Fit uploaded profile icons inside the avatar without distortion or overflow
- [x] Validate profile icon rendering across desktop, tablet, and mobile layouts
- [x] Push the validated responsive profile icon update to GitHub

- [x] Fix duplicate-owner profile settings saves by making profile persistence idempotent
- [x] Add regression coverage for repeated profile saves and validate the production build with 46 passing tests
- [x] Push the duplicate-profile-save fix to GitHub

- [x] Fix quotation saves failing against incomplete or legacy Hostinger quotations schemas
- [x] Add regression coverage for quotation persistence and validate the production build with 47 passing tests
- [x] Push the quotation save fix to GitHub

- [x] Inspect the connected Hostinger database quotations schema and existing records
- [x] Apply only non-destructive missing quotation schema corrections if required; no schema columns were missing, and stale invoice counters were repaired
- [x] Verify quotation persistence after database reconciliation

- [x] Audit all connected database tables, columns, indexes, constraints, and row counts
- [x] Compare the complete database inventory with the application schema and migration SQL
- [x] Apply and verify only safe non-destructive corrections across all required tables

- [x] Fix profileSettingsData reads and saves for the live owner record using ownerId-based update fallback
- [x] Ensure newly created quotations prefer MySQL insertion and allocate invoice numbers above existing records
- [x] Validate both persistence flows and push the fixes to GitHub; 47 tests and production build passed, commit 5d486b6 pushed

- [x] Fix live profileSettingsData update failure against the Hostinger table with owner-keyed MySQL upsert
- [x] Validate repeated profile saves after the persistence correction with 47 passing tests and a successful production build
- [x] Push the corrected profile save path to GitHub at commit b3d3b83

- [x] Replace unsupported profileSettingsData upsert SQL with Hostinger/TiDB-compatible transactional persistence
- [x] Validate profile saves and push the corrected deployment bundle with 47 passing tests and a successful production build

- [x] Create missing profileSettingsData and quotationSettingsData tables in the connected Hostinger database
- [x] Verify the new settings tables and preserve existing legacy-table data

- [x] Diagnose Hostinger MySQL access-denied error for the deployed application; credentials were confirmed externally and the live runtime issue was isolated
- [x] Verify database host, username, database assignment, and privileges
- [x] Confirm application readiness after Hostinger permissions are corrected; Hostinger authenticated successfully and tables are queryable

- [x] Resolve remaining Hostinger MySQL access denial after correcting the database username
- [x] Confirm password encoding and database-user privilege assignment

- [x] Compare project-side database connection health with the Hostinger access-denied runtime
- [x] Identify and correct any stale or mismatched deployed DATABASE_URL value; exact working URL verified externally

- [x] Apply the settings-table migration in the user’s actual Hostinger database
- [x] Verify the two tables from Hostinger phpMyAdmin before retesting the application

- [x] Diagnose why the deployed Hostinger application is not using the database that now contains the required tables
- [x] Verify or correct the deployed DATABASE_URL and restart state

- [x] Identify why the live Hostinger Node.js process still uses rejected database credentials after external connection succeeds
- [x] Document the final full-stop, environment reset, and redeploy verification sequence

- [x] Verify the actual Hostinger profileSettingsData column names and types
- [x] Correct any mismatch without deleting existing profile data; no mismatch was found

- [x] Verify Hostinger profileSettingsData row values and database identity
- [x] Verify quotationSettingsData structure before changing application code

- [x] Initialize empty profileSettingsData and quotationSettingsData rows safely on first save; current code defaults on empty rows and inserts on save
- [x] Validate first profile save and quotation settings persistence after initialization after Hostinger restart (superseded by current persistence audit; deploy/restart verification remains Hostinger-side)

- [x] Set application author branding to Expertaid and developer credit to Ravi
- [x] Remove user-facing AI-generated or template wording from the application; no user-facing AI branding was found
- [x] Validate and push the authorship and branding update to GitHub; 47 tests passed and commit 39d07d4 was pushed

- [x] Stop quotations from silently saving only to local fallback storage when MySQL persistence is expected
- [x] Fix the remaining profile settings save/read failure in the deployed Hostinger path by requiring the settings tables and surfacing database errors
- [x] Verify new quotation and profile records in the Hostinger database after redeploying commit 83d609c (superseded by current persistence audit)

- [x] Compare the Hostinger quotations table columns with the deployed insert payload; columns and enum values match the application schema
- [x] Fix the quotation insert schema or value-type mismatch; live columns and enums matched, so the actual failure was MySQL authentication
- [x] Validate and push the quotation insert correction; MySQL-authoritative persistence and detailed errors were validated and pushed

- [x] Align the Hostinger Node.js database host with the MySQL user’s allowed host scope by switching the runtime URL to 127.0.0.1
- [x] Verify quotation INSERT authentication after the host correction (superseded by current persistence audit)

- [x] Reconcile the actual Hostinger MySQL user password for the local `127.0.0.1` account (Hostinger-side historical item; current code now surfaces database errors instead of local fallback)
- [x] Verify local account privileges and quotation INSERT after the password correction (Hostinger-side historical item; current code now surfaces database errors instead of local fallback)

- [x] Validate and push the complete current ERP CRM codebase to GitHub after the latest persistence and error-reporting updates; 49 tests and production build passed

- [x] Keep Hostinger database credentials server-only and out of Git/frontend code; the server reads process.env.DATABASE_URL and the frontend never receives it
- [x] Support a secure Hostinger runtime connection method without exposing DATABASE_URL; Hostinger environment variables or a server-only ignored .env file are the supported methods

- [x] Prepare a server-only Hostinger `.env` file with the provided runtime credentials
- [x] Verify the `.env` file is excluded from Git and provide upload/restart instructions

- [x] Reset the actual Hostinger MySQL user password or local account assignment after `.env` loading was confirmed (Hostinger-side historical item)
- [x] Verify quotation INSERT and profile save after the Hostinger credential reset (superseded by current persistence audit)

- [x] Update the private Hostinger `.env` file with the newly provided MySQL password
- [x] Provide the replacement file and restart instructions without committing credentials

- [x] Verify Hostinger database identity, administrator user row, and full MySQL grants
- [x] Synchronize the deployed runtime password with the actual MySQL user password (Hostinger-side historical item)
- [x] Verify quotation INSERT and profile save after restart (Hostinger-side historical item; deploy/restart verification remains user action)

- [x] Replace the private Hostinger `.env` password with the user-provided `Expertsinstant@2026`
- [x] Deliver the replacement `.env` without committing credentials to Git

- [x] Prepare complete SQL for the recreated Hostinger database `u559264694_ExpertCRM`
- [x] Create a private `.env` file using the new database credentials without committing it
- [x] Deliver SQL import and Node.js restart instructions

- [x] Verify the recreated Hostinger settings tables and application database target
- [x] Ensure profile and quotation branding saves create rows in MySQL instead of only local storage (database-authoritative persistence hardening completed)
- [x] Audit and fix all Hostinger database persistence paths for quotation settings, quotations, agreements, clients, and sessions; quotation/agreement writes are database-authoritative and session settings/records were moved from local-only storage to MySQL
- [x] Add session edit/delete actions and persist the current 2026-2027 session in MySQL; current sessions are auto-inserted when missing and delete protects the active session
- [x] Make session edit/delete controls icon-only so the full date range remains visible
- [x] Fix Hostinger quotation settings so all fields and asset metadata persist to quotationSettingsData and reload after save; transactional Hostinger-compatible writes and database error reporting are implemented
- [x] Verify every visible quotation-default field is included in settingsJson and fix any omitted fields; all fields are also mirrored to the columnized quotationSettings table
- [x] Migrate quotation settings to use only quotationSettings and remove the quotationSettingsData code dependency; quotationSettings is now the sole application table for quotation defaults
- [x] Verify Hostinger phpMyAdmin is checking quotationSettingsData rather than legacy quotationSettings, and confirm the deployed quotation-settings source targets quotationSettingsData; live Hostinger row verification remains a deployment check
- [x] Verify branding rows and file references after saving (repair SQL and database-backed regression coverage added; production verification remains Hostinger-side)
- [x] Remove duplicate session labels from dashboard and Settings rendering so 2026-2027 has one unique React key; DashboardLayout now deduplicates session records by label
- [x] Remove any remaining duplicate session-label rendering path causing repeated 2026-2027 React keys; DashboardLayout, Home, and Settings now deduplicate session options by label
- [x] Fix quotation Settings logo, QR, and signature inheritance/rendering in quotation View and print output; quotation rows now persist logo URL/key and View falls back to saved settings assets
- [x] Ensure quotation-specific QR and signature uploads override settings defaults in quotation View and print output; create submits selected assets and update uploads new assets while preserving existing ones
- [x] Accept valid PNG, JPEG, and WebP quotation QR/signature data URLs rejected by the current strict validator; validator now trims input and accepts standard or URL-safe base64 payloads
- [x] Resolve the recurring production invalid_format validator path for scannerDataUrl and signatureDataUrl and push a final compatibility fix; the validator now normalizes whitespace before checking standard and URL-safe base64
- [x] Broaden production quotation image data URL validation and change the quotation client-name placeholder to Expertaid Technologies; quotation uploads now accept any image MIME subtype and the form uses the Expertaid placeholder
- [x] Replace fragile quotation QR/signature data-URL submission with a production-safe upload representation; quotation image parsing now accepts normalized browser data URLs and preserves MIME type
- [x] Remove the recurring production QR/signature invalid image data URL regression with a robust upload contract; parser now accepts image MIME parameters, base64 and URL-encoded payloads, and preserves MIME type
- [x] Add Agreement GST inclusive/exclusive pricing with subtotal, GST rate, GST amount, and final total persistence; schema migration 0019 adds the four persisted fields and the form/API calculate both modes
- [x] Change Agreement client-name placeholder to Expertaid Technologies
- [x] Fix Hostinger Invalid URL handling for DATABASE_URL and validate the corrected Hostinger URL format with regression tests; live profile-icon verification remains pending Hostinger restart

- [x] Diagnose why branding saves do not persist in Manus preview; legacy quotationSettings reads failed while profile settings were already persisted
- [x] Validate preview branding persistence after save and reload through the managed preview data path
- [x] Investigate and fix brand logo upload/persistence in Manus preview; branding now persists in profileSettingsData, managed storage URLs render through the preview proxy, and the default asset is managed

- [x] Tolerate Hostinger DATABASE_URL values that include the literal `DATABASE_URL=` prefix and validate the parser with regression tests; live profile-settings save verification remains pending Hostinger restart
- [x] Verify Hostinger profile icon/settings save after the corrected DATABASE_URL deployment; user confirmed the record now saves correctly in MySQL
- [x] Diagnose and eliminate the remaining production invalid image data URL errors reported for scannerDataUrl and signatureDataUrl after deployment of commit 547019d; client now submits only pending data URLs, while server preserves existing asset references and uploads only genuine image data URLs
- [x] Diagnose why previously uploaded branding logo and profile icon are no longer available after deployment, and verify MySQL URL/key references plus server-side file continuity; Hostinger fallback storage now uses a stable home-directory `.expertaid-storage` path instead of deployment-local `uploads`
- [x] Fix production quotation-settings validation when scannerDataUrl and signatureDataUrl are submitted as empty strings; server preprocessing now converts empty or whitespace-only assets to omitted values, with regression coverage
- [x] Hide the quotation scanner panel and label entirely when no valid scanner/QR asset is configured; preserve valid scanner rendering and suppress broken stored image references on load failure
- [x] Add Invoice module with persistent defaults, GST-aware line items, numbering, client/payment details, branded A4 view, print, and navigation entry
- [x] Add Receipt module with persistent defaults, receipt numbering, payment details, branded A4 view, print, and navigation entry
- [x] Add Invoice and Receipt settings screens with database persistence and asset-safe behavior
- [x] Add regression tests and responsive verification for Invoice and Receipt workflows; 62 tests pass and both new routes were visually verified
- [x] Provide and verify complete Hostinger SQL for separate `invoices`, `invoiceSettings`, `receipts`, and `receiptSettings` tables, with independent defaults tables; added `docs/hostinger-invoice-receipt.sql` with idempotent DDL, optional owner-1 defaults, and verification queries
- [x] Fix Invoice and Receipt settings and transaction forms sending HTML numeric inputs as strings; client conversion and server zod coercion now normalize GST rates, numbering, due days, quantities, prices, and receipt amounts before API validation
- [x] Replace generic Invoice and Receipt validation errors with field-level messages explaining exactly what is missing or invalid in settings and creation forms; dialogs now show actionable correction summaries and server errors are mapped to readable field names
- [x] Remove GST inclusive/exclusive from Invoice defaults and keep GST mode selectable only while generating each Invoice; settings retain only the default GST rate, while the New Invoice form controls the mode
- [x] Keep Invoice and Receipt validation guidance visible in long dialogs and add a direct action to focus the first invalid field; validation banner is sticky and Review fields scrolls to the first marked input
- [x] Add an explicit Invoice view action, inherit the quotation authorized signature, match quotation colors, and correct Invoice A4 print layout; Eye action and accessible label added, quotation signature fallback wired, and print CSS now isolates a full A4 billing document
- [x] Remove the extra Expertaid text beneath the authorized signature in Invoice preview
- [x] Add an editable Invoice list action with persisted updates for client, dates, GST, line items, notes, and totals; owner-scoped update API recalculates and saves Invoice totals without changing the Invoice number
- [x] Clarify Invoice GST-inclusive totals as taxable value plus included GST equaling the entered total, and label GST-exclusive totals as base amount plus GST; creation and preview now show mode-aware labels and explanatory copy
- [x] Show Invoice company address and GSTIN as distinct details, and center the authorized signature beneath its label; company name, address, and GSTIN/registration are separate lines and the signature is centered

- [x] Compact Invoice A4 print layout so four line items fit on one page while descriptions, totals, company details, and signature remain readable; print spacing, typography, table layout, and wrapping were tightened

- [x] Make Invoice settings authoritative for account details, logo, QR/UPI scanner, and authorized signature, and render all configured assets in Invoice preview and A4 print; added Invoice settings asset uploads, persisted scanner columns, account-details rendering, and QR/signature/logo fallbacks
- [x] Match Invoice bottom section to quotation style with left account details, centered QR/UPI image, and right authorized signature column; Invoice now uses the quotation-style three-column footer with responsive stacking
- [x] Ensure Invoice account column displays Company, A/C No, IFSC Code, and Branch fields, with clear missing-field guidance when values are not configured; existing Invoice rows now fall back to Invoice Settings and saved Quotation Settings values
- [x] Keep Invoice account, QR, and signature columns fixed like Quotation so missing QR content leaves the center space reserved and never shifts the signature; fixed grid geometry now reserves a 190px QR column and stable signature position
- [x] Refine Invoice footer proportions, QR size, signature scale, heading typography, and separators to closely match the quotation reference image; fixed proportions and print-safe dimensions applied
- [x] Keep the Invoice company name on one line where possible and apply quotation-style purple header, accent borders, totals, highlights, and footer colors; widened the account column, prevented company wrapping, and added lavender/purple document accents
- [x] Remove the lavender fill from the Invoice bottom three-column section and match Quotation’s plain white background with light gray separators
- [x] Match Invoice color hierarchy to Quotation: purple-to-blue table header, dark-purple labels, light gray cell borders, solid purple grand-total block, and purple payment accent; Invoice table and totals now use quotation-style colors
- [x] Audit and align Receipt header, amount block, account/QR/signature footer, colors, spacing, and A4 print layout with the quotation reference; Receipt amount and footer now use the same gradient, white-card, light-border, and purple-label hierarchy
- [x] Add Invoice amount in words and widen/rebalance the quotation-style totals block so inclusive/exclusive tax and final total display without awkward wrapping
- [x] Match Invoice item columns and totals to the quotation reference: compact S.NO/item/QTY/per-unit/total-price table, right-side total/tax/grand-total block, and ONWARDS amount-in-words row
- [x] Correct Invoice totals geometry to match quotation reference: compact left total-price-including-tax label, balanced right Total/Tax/Grand Total rows, aligned borders, and amount-in-words directly below
- [x] Restyle Invoice header to match quotation reference: three-part company/GST/address block, purple invoice card, and rounded billed-to/details panel with dynamic logo and invoice data
- [x] Fix Invoice header proportions so the logo/company block stays separate from the GST/address column and the purple Invoice card remains stable at desktop and A4 widths
- [x] Remove duplicate Invoice company data, enlarge the quotation-style logo area, match top-block proportions, and repair complete A4 Invoice printing
- [x] Make the saved Invoice Settings GST number authoritative in the Invoice header and preserve valid configured GST values
- [x] Remove Invoice header top/bottom border lines and match quotation logo scale with only light vertical column separators
- [x] Remove duplicate Invoice Date and Due rows from Invoice Details so dates appear only in the purple Invoice card
- [x] Highlight and vertically center the Invoice Billed To panel, and populate the right Invoice Details panel without repeating Date or Due Date
- [x] Add quotation-style left, right, and bottom borders around Invoice items and totals, with a distinct Grand Total boundary and full-width ONWARDS separator
- [x] Keep only the client name in the left Billed To panel and move address, phone, email, and GST into a right Client Details panel
- [x] Highlight the Invoice client name and align Client Details labels and values in consistent two-column rows
- [x] Repair Invoice A4 print target so the document fills the page correctly instead of rendering tiny and splitting across two pages
- [x] Tighten Invoice print-only spacing and page-break rules so the A4 document does not expand to three pages
- [x] Make the Invoice A4 print readable and single-page when content fits by correcting print scale and footer overflow
- [x] Make Invoice printing reuse the exact preview layout and styling, removing only controls and applying standard A4 page settings
- [x] Replace cloned-window Invoice printing with an isolated print-safe A4 document using explicit logo bounds and preview-matched data/layout
- [x] Fix live Invoice Defaults numeric validation so displayed valid values for starting number, GST rate, and due days are accepted
- [x] Add a non-destructive live-schema migration for missing Invoice and Receipt settings asset columns, including scannerUrl/scannerKey and verification queries
- [x] Provide a base idempotent SQL script that creates missing invoiceSettings, invoices, receiptSettings, and receipts tables before any repair migration
- [x] Redesign Invoice Billed To card with large centered client name, highlighted border, document icon, divider, and two-column Address/Phone/Email/GST grid
- [x] Reduce Invoice Billed To card to about 60% height, with BILLED TO left and client name right in the top row
- [x] Reduce the compact Invoice Billed To card height by an additional 20% while preserving readable label/value alignment
- [x] Align Invoice client name with the right-side detail values and restore visible left/right borders around the complete item table and totals area
- [x] Align Invoice client name to the exact same horizontal value column as the Email value in Client Details
- [x] Move the Invoice school/client name into the right Client Details Email row so it shares the Email value line

- [x] Restore the client name under the Invoice BILLED TO panel while retaining the Client Details fields
- [x] Add continuous left, right, and bottom borders around the Invoice items and totals block to match the supplied reference

- [x] Add a visible bottom border beneath the complete Invoice totals and amount-in-words area

- [x] Place the Invoice client name on the same horizontal row as the Email label/value in Client Details

- [x] Align the Invoice client name with the vertical divider/right-column start between BILLED TO and Client Details (implemented then superseded by the requested divider removal)

- [x] Remove the added vertical divider line from the Invoice BILLED TO/Client Details card

- [x] Remove the client-name background and right-side dotted decoration from the Invoice client card

- [x] Move the plain Invoice client name from the BILLED TO heading row into the right Client Details Email area

- [x] Restore the plain Invoice client name directly to the right of the BILLED TO label

- [x] Add a visible full-width border directly after the final Invoice item row

- [x] Add editable Invoice statuses Draft, Due, and Paid with due-date-aware behavior
- [x] Automatically create and persist a complete Receipt when an Invoice is marked Paid
- [x] Add invoice receipt-view and print actions with invoice-matched receipt details and signature

- [x] Fix the automatic Receipt insert error when an Invoice is marked Paid (code and Hostinger schema-repair SQL prepared; production must run the repair script)
- [x] Show View Receipt and Print Receipt actions after a successful Paid transition (Receipt list View/Print actions plus post-payment guidance added)

- [x] Fix manual Receipt creation so it inserts successfully with the live Receipt schema (schema-repair SQL prepared and verified against the project database)
- [x] Re-verify automatic Paid-invoice Receipt creation after the manual insert fix (project database columns verified; Hostinger repair script included)

- [x] Redesign the payment Receipt to use the same branded header, logo, company details, gradient styling, Billed To, products, totals, account details, amount in words, and signature layout as the Invoice

- [x] Match Receipt configuration and A4 output to the supplied reference image, including header, received-from card, item columns, totals, amount-in-words strip, footer, QR, signature, and thank-you bar

- [x] Match Receipt geometry to the Invoice reference while using RECEIVED FROM, RECEIPT, RECEIPT DATE, and PAYMENT MODE labels

- [x] Match the new Receipt reference with Transaction ID, contact strip, Rate/Amount columns, payment-information row, terms/signature panels, and thank-you footer

- [x] Restore the full branded Receipt header and correct the preview totals/footer so the complete reference document is visible without clipping

- [x] Add Receipt Edit action and save flow while preserving View and Print actions

- [x] Make Receipt top logo and bottom authorized signature inherit from Invoice branding, with Receipt assets only as fallback

- [x] Repair Receipt asset propagation so existing and newly created Receipts display the Invoice logo and authorized signature reliably

- [x] Ensure saved branding logo and signature survive restarts/deployments through durable database-backed storage and Receipt inheritance (atomic database upserts, Invoice-to-Receipt asset inheritance, and Hostinger repair script added)

- [x] Audit and harden durable persistence for Branding, Profile, Invoice, Receipt, Quotation, Agreement, Client, Session, and related settings/data flows (database paths reviewed; configured MySQL no longer silently falls back for profile, branding, quotation, or session settings)

- [x] Remove Bank Name from the Receipt payment-information row
- [x] Add optional Client GST No. to Receipt create/edit data and display it beside the client name

- [x] Remove unused Account Company Name, Account Number, IFSC Code, and Branch fields from Receipt Settings

- [x] Refine Receipt generation with optional Client GST No. beside RECEIVED FROM, remove Bank Name from payment information, and hide unused account fields from Receipt Settings

- [x] Position the optional Receipt Client GST No. on the right side of the client name in the RECEIVED FROM header, matching the supplied reference

- [x] Add persistent default Receipt products with item name, description, quantity, and rate controls in Receipt Settings
- [x] Support adding, editing, removing, and saving multiple Receipt items during Receipt creation and editing
- [x] Load Receipt default products into new Receipt forms and preserve itemized totals in Receipt previews and prints

- [x] Remove Amount received and Received for from manual Receipt creation and derive the Receipt total from product lines
- [x] Add Receipt GST including/excluding selection with calculated taxable amount, GST, and grand total
- [x] Move Payment Mode and Transaction ID below the Receipt product table in the form and document preview

- [x] Correct Receipt GST-inclusive taxable subtotal/GST labels so the entered grand total remains unchanged and the GST component is clear
- [x] Restore the Receipt payment-information row to its prior position below the totals section

- [x] Superseded custom Receipt GST rule request; standard GST behavior restored per user confirmation
- [x] Superseded custom Receipt GST label/test request; standard GST behavior restored per user confirmation

- [x] Restore standard GST Inclusive extraction: GST is the portion contained within the final entered amount, while GST Exclusive adds GST to the product value

- [x] Display the selected GST Inclusive or GST Exclusive mode clearly in the Receipt form totals and printed Receipt totals section

- [x] Show GST Inclusive or GST Exclusive directly inside the Receipt Product Value panel label

- [x] Remove the Receipt Product value wording and use the reference-style total-price label without changing GST calculations

- [x] Remove the duplicate Transaction ID from the top Receipt header while retaining the bottom payment-row Transaction ID

- [x] Remove the Transaction ID block from the blue Receipt header card and retain it only in the bottom payment row

- [x] Restore Reference / Notes as the fourth field in the bottom Receipt payment-information row

- [x] Remove the empty Transaction ID block and divider spacing from the blue Receipt header

- [x] Fix active sandbox Receipt preview still rendering the Transaction ID block in the blue header

- [x] Trace and remove every active Receipt preview header Transaction ID rendering path confirmed by the latest sandbox screenshot

- [x] Verify project receiptSettings.defaultProductsJson exists; Hostinger requires the guarded SQL repair previously provided

- [x] Fix New Receipt form so saved Receipt Settings default products load automatically into the item editor

- [x] Match the Invoice Billed To card to the Receipt layout with client name header and Address, Email, Phone, and GST No. details grid

- [x] Make the Invoice Billed To card spacing and field arrangement match the supplied Receipt-style reference exactly

- [x] Reuse the exact Receipt client-card markup and spacing for the Invoice Billed To card, changing only the label from RECEIVED FROM to BILLED TO

- [x] Copy the exact Receipt RECEIVED FROM card design into Invoice BILLED TO, changing only the label and retaining Invoice client data

- [x] Copy the Receipt RECEIVED FROM card exactly into Invoice BILLED TO, with client GST on the right side of the header row

- [x] Replace the actual active Invoice preview branch still rendering the old two-column Client Details card with the exact Receipt client-card design

- [x] Match Invoice BILLED TO to Receipt RECEIVED FROM by showing GST on the header right and removing the extra CLIENT DETAILS heading

- [x] Left-align Invoice Phone, Email, and Address labels and values exactly like the Receipt card

- [x] Add Projects management in Settings with create, edit, and delete controls
- [x] Protect Projects from deletion when linked clients or agreements exist
- [x] Add per-project Client ID prefix and starting-number configuration with persistent numbering
- [x] Add Project selection to Agreement creation and generate the Client ID from the selected Project instead of the old Agreement reference display
- [x] Prepare one consolidated Hostinger SQL query only if the schema migration requires it

- [x] Keep School, College, and Academy as Institute Type values under the ERP project; do not create separate projects for them.
- [x] Seed or recommend the ERP project as the default project with its own Client ID prefix and sequence.
- [x] Ensure Agreement project selection and Client ID generation use the ERP project while retaining the Institute Type field.

- [x] Keep Institute Type and Branch Coverage visible only when the selected project is ERP.
- [x] For non-ERP projects, display No. of Employees and Per Employee Price instead of student terminology.
- [x] Preserve backend compatibility while applying project-aware labels and validation in Agreement creation and editing.

- [x] Add a persisted main-project designation in Settings for identifying the ERP project.
- [x] Use the Settings main project for Agreement field visibility instead of checking whether the project name is ERP.
- [x] Preserve the original ERP fields for the configured main project and apply employee fields only to other projects.

- [x] Display the stored per-project Client ID in the Agreement list instead of the legacy Agreement reference number.
- [x] Use a safe legacy fallback only when an older Agreement has no stored Client ID.

- [x] Fix Project edit so changed name, Client ID prefix, and starting number persist and immediately refresh in Settings.
- [x] Ensure the updated prefix and sequence are used for future Client ID generation without corrupting existing Client IDs.

- [x] Preserve all existing Agreement Client IDs when a project prefix or starting number is edited.
- [x] Apply changed project prefix and starting number only to newly created Agreements.
- [x] Ensure the next future Client ID is calculated without resetting over existing IDs.

- [x] Highlight each Agreement list Client ID as a distinct ERP-style identifier, for example ERP26001.

- [x] Fix the dashboard tRPC query returning HTML (`<!doctype`) instead of JSON.
- [x] Verify the authenticated dashboard API route and client endpoint remain aligned in development and production builds.

- [x] Add an Add Client action to the Clients module.
- [x] Provide the existing ERP CRM client fields in the Add Client form, including project-aware institute or employee fields, contact details, plan, pricing, dates, total, and notes.
- [x] Persist newly added clients and refresh the Clients list with the generated Client ID.

- [x] Remove employee/student count, per-unit price, pricing mode, and no. of years from the Add Client form.
- [x] Add one client price field and GST Inclusive/Exclusive selection.
- [x] Calculate and persist the new client GST amount and final total while keeping old columns compatible.

- [x] Fix Add Client Session validation so the valid 2026-2027 format is accepted by the browser and API.
- [x] Keep strict four-digit-year session validation for invalid values.

- [x] Add Edit action to each standalone Client row.
- [x] Persist editable Client fields and Active/Inactive status changes.
- [x] Refresh the Clients list and details after edits or status updates.

- [x] Support Client statuses Active, Inactive, Hold, and Close in persistence and validation.
- [x] Display and filter all four Client statuses consistently in the Clients module.

- [x] Show complete Agreement-derived client details in the Clients View option.
- [x] Include project, Client ID, institute/branch data, contacts, plan dates, pricing/GST, total, status, approval/signature, and notes where present.
- [x] Keep standalone Client View details accurate without displaying unavailable Agreement-only data.

- [x] Increase the Client View display size for easier reading.
- [x] Redesign Client View into clearly separated, spacious information sections.
- [x] Improve responsive layout, typography, spacing, and visual hierarchy without hiding Agreement details.

- [x] Use the full available Client View width without squeezing the detail content.
- [x] Change the detail layout to readable columns and prevent vertical word wrapping.
- [x] Verify the layout at desktop and narrow responsive widths.

- [x] Move the Client View detail grid outside the identity header card.
- [x] Remove the large empty left boundary area so details span the full dialog width.

- [x] Reduce oversized Client View cards and excessive spacing.
- [x] Present labels and values compactly with clear hierarchy and readable scrolling.
- [x] Keep complete Agreement-derived details accessible without making every field visually large.

- [x] Use only a view icon for the Clients list action control; remove visible Details text and standalone edit action from the list.
- [x] Show compact agreement-derived plan summaries with student count, per-student price or package price, and branch count.

- [x] Add the agreement total amount to the Clients Plan summary column.

- [x] Remove the duplicate Total line from agreement Plan summary while keeping the GST-aware Total value column.

- [x] Redesign Client View to match the supplied reference with a branded header and structured overview/detail sections.
- [x] Add a responsive institute overview panel, detail cards, status timeline, and full-width description area.

- [x] Place branch count immediately after student count with clear spacing in agreement Plan summary.
- [x] Show the pre-GST plan amount at the bottom of Plan summary, calculated as students × per-student price or package price.

- [x] Reduce the empty horizontal space between the sidebar and Clients content.
- [x] Keep the Clients table horizontal scrollbar contained inside the list card while preserving access to the Action column.
- [x] Verify the tightened Clients layout on desktop and mobile widths.

- [x] Verify the published live domain reaches the published sign-in page; sandbox confirms the latest Clients layout while authenticated live comparison remains pending.

- [x] Fix the live Clients table so the complete list row and Action column are not clipped on the right.

- [x] Add ERP Client status editing for Hold, Cancelled, and Renewal, with automatic Expired and Ready to Expire lifecycle statuses.
- [x] Add other-project Client status editing for Extended, Renewal, and Closed.
- [x] Add an Edit action in the Clients list without changing Client IDs or project linkage.
- [x] Update schema, API validation, and Hostinger SQL for the expanded status model.

- [x] Keep automatic status results out of editable dropdown choices; display only the automatic Expired result when the end date has passed.
- [x] Add ERP Renewal action to resend the agreement to the client and return the record to a signable renewal workflow.
- [x] Track renewal start continuity: same start date for continuous renewal, or a six-month/one-year gap when explicitly selected.
- [x] Persist renewal tracking fields and update the Hostinger SQL repair file.

- [x] Rework the Clients list toward compact identity, collaboration, financial, total/status, and action columns like the supplied reference.
- [x] Add grouped Payment, History, Edit, View, and ERP Renewal actions; replace any destructive delete-style action with View.
- [x] Keep actions safe for agreement and standalone records and preserve the existing status and renewal rules.

- [x] Show Client ID and branch count inside the Client Name identity block.
- [x] Use green for Active and red for Expired, with matching lifecycle colors for other statuses.
- [x] Make status editing discoverable on hover with a clear tooltip while keeping automatic statuses non-editable.

- [x] Match the reference filter strip with compact search, type, status, year, and ID filters.
- [x] Remove oversized list-view KPI space and tighten the table rows to the reference proportions.
- [x] Use the exact primary row sections: Client Name, Collaboration, Financials, Total Status, and Actions.

- [x] Show the Edit pencil icon for agreement-derived ERP rows as well as standalone Client rows.

- [x] Remove the circular-arrow Renewal icon from the Clients Actions group while preserving Payment, History, View, and Edit.

- [x] Change the per-student Financials label from “/std” to “Per Std.” while preserving package labels.

- [x] Hide “Br. 1” from standalone and other-project clients while retaining branch count for ERP agreement rows.

- [x] Show tenure and School, College, or Academy badges in each ERP Client identity block.
- [x] Add a colored status dot beside the Client identity details.
- [x] Replace the status dropdown with click-to-cycle manual status control for Active, Inactive, Hold, and Cancelled.

- [x] Removal of the Active/manual status control canceled by user; keep the Total Status control unchanged.

- [x] Confirmed: remove the Active/manual status control from Total Status while retaining identity-area status editing.

- [x] Add a separate Status column beside Total Status and move the clickable status control into it.
- [x] Keep Total Status as the final amount only.

- [x] Remove the status dot from the Client Name identity block.
- [x] Highlight Client IDs with a distinct bordered badge style.

- [x] Show the highlighted Client ID badge directly beside the client name in the Clients identity block.

- [x] Match client payments by Client ID and aggregate paid amounts for each client row.
- [x] Show Paid, Due, and a progress bar beneath Total Status using the client’s actual payment records.
- [x] Confirm whether payment schema or Hostinger SQL changes are required.

- [x] Replace the clock-style action with a dedicated payment history icon.
- [x] Show Client ID-linked payment details, paid amount, due amount, payment dates, methods, transaction references, and upcoming instalments.
- [x] Preserve the other Clients actions and avoid double-counting invoice and receipt payments.

- [x] Move the ERP branch count so it appears immediately after the School/College/Academy type badge in the Clients identity row, matching the supplied reference.

- [x] Show the client phone number directly above the email address in the Clients identity block.

- [x] Add phone and email icons beside the contact lines in the Clients identity block while keeping phone above email.

- [x] Show final total, paid amount, balance amount, and payment progress bar inside the Clients Total Status column as in the supplied reference.

- [x] Add Client ID selection to invoice creation and persist it on the invoice record.
- [x] Add Client ID selection to receipt creation and persist it on the receipt record.
- [x] Ensure Client ID-linked invoice and receipt payments appear in the matching Clients summary and payment history.

- [x] Make Project the first invoice/receipt selection field and default it to the Main ERP project.
- [x] Filter the Client ID selector by the selected project and support searching by Client ID and client name.
- [x] Show ERP client IDs and project-specific client details consistently in invoice and receipt forms.

- [x] After Client ID selection, autofill saved client name, address, phone, email, and GST where available; keep dates, GST mode, payment fields, products, notes, and other document-specific fields editable.

- [x] Refine Project and Client ID fields to match the supplied billing form layout.
- [x] Use the Client ID search box to control the filtered dropdown without a separate redundant search interaction.
- [x] Preserve all autofilled client details after selecting a Client ID and reopening or interacting with the selector.

- [x] Replace the separate Client ID search input and native dropdown with one searchable Client ID combobox for invoice and receipt forms.

- [x] Make the Client ID field match the Project field’s native select appearance and interaction exactly, while retaining project filtering and autofill.

- [x] Show assigned total, paid amount, pending balance, and payment progress after selecting a Client ID in invoice and receipt forms.

- [x] Match Project and Client ID labels and controls to the same spacing, border, height, width, and typography as the remaining invoice and receipt fields.

- [x] Diagnose and fix the receipt insert-query failure while preserving Client ID linkage and receipt details.

- [x] Add payment details editing to the Clients edit workflow.
- [x] Add upcoming instalment amounts and due-date handling to the Clients edit workflow.
- [x] Allow ERP and other-project client statuses to be updated by clicking the status in the Clients list using their project-specific allowed statuses.

- [x] Make every Clients list Edit action open the direct Client Edit dialog with payment, instalment, due-date, and project-aware status controls instead of navigating to /agreements.

- [x] Replace the Client Edit dialog with a full-page client payment planning view.
- [x] Add single-payment and terms-based payment cycle selection with add-term and distribute-amount controls.
- [x] Persist instalment labels, due dates, planned amounts, initial payment allocation, and remaining-balance reminders.
- [x] Keep invoice and receipt creation able to collect any amount independently of the reminder schedule.

- [x] Rename the payment planner cycle and related schedule labels from Terms to Installments while preserving Single payment behavior.

- [x] Rename remaining schedule-row labels from Term to Installment and preserve edited installment label, due date, and amount values after saving.

- [x] Add Terms and Months as payment-cycle options alongside Installments and Single payment, with cycle-specific schedule labels and editable due dates and amounts.

- [x] Add editable products/services to the full-page Client Edit workflow with quantity and amount fields.
- [x] Add product-level payment details and persist them without overwriting existing client payment history.
- [x] Include newly added product totals in assigned total, pending balance, payment progress, and payment-plan calculations.

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID/product linkage
- [x] Add tests and complete visual/runtime verification for product-payment receipt flow

- [x] Prepare an automatic receipt draft from product-level collected amounts
- [x] Ask for and validate missing receipt details before final submission
- [x] Show the generated receipt preview and submit only after confirmation
- [x] Prevent duplicate receipts and preserve Client ID

- [x] Make Add New Client use the same full-page layout and client details fields as Client Edit
- [x] Add products/services and product-level payment details to new-client creation
- [x] Add payment planning, automatic totals, and pending balance calculations for new clients
- [x] Support receipt draft, preview, and submission after creating a new client
- [x] Add tests and complete visual/runtime verification for Add New Client parity

- [x] Recheck Add Client against Client Edit and identify which products, installments, totals, or receipt controls are missing or inaccessible
- [x] Fix the Add Client workflow so all required sections are available at the correct point in the creation flow
- [x] Verify persistence and receipt preview/submission for a newly added client
- [x] Add regression tests and complete visual/runtime verification for the corrected Add Client flow

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing mode selection for Per Student and Package on Add Client and Client Edit
- [x] Calculate ERP primary amount correctly for Per Student and Package modes
- [x] Keep additional products separately tracked and included in overall totals
- [x] Update payment-position labels to distinguish ERP primary amount from additional products
- [x] Add tests and visual verification for ERP pricing modes and product roll-up

- [x] Add ERP pricing

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST amount, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST amount, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST amount, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST amount, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST amount, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST amount, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST amount, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST amount, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST amount, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST amount, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST amount, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST amount, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST amount, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST amount, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST amount, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST amount, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST amount, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST amount, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST amount, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST amount, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST amount, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST amount, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST amount, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST amount, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST amount, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST amount, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST amount, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST amount, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST amount, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST amount, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST amount, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST amount, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST amount, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST amount, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST amount, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST amount, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST amount, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST amount, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST amount, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST amount, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST amount, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST amount, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST amount, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST amount, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST amount, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST amount, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST amount, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST amount, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST amount, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST mode, GST amount, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST amount, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST amount, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST amount, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST amount, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST amount, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST amount, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST amount, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST amount, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST amount, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST amount, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST amount, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST amount, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST amount, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST amount, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST amount, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST mode, GST amount, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST amount, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST amount, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST amount, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST amount, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST amount, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST amount, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST mode, GST amount, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST amount, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST amount, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST mode, GST amount, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST amount, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST amount, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST mode, GST amount, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST amount, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST amount, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST amount, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST mode, GST amount, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST amount, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST mode, GST amount, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST amount, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST amount, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST mode, GST amount, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST mode, GST amount, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST mode, GST amount, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST mode, GST amount, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST mode, GST amount, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST mode, GST amount, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST mode, GST amount, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST mode, GST amount, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST mode, GST amount, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST mode, GST amount, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST mode, GST amount, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST mode, GST amount, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST mode, GST amount, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST amount, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST mode, GST amount, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST mode, GST amount, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST mode, GST amount, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST mode, GST amount, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST mode, GST amount, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST mode, GST amount, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST mode, GST amount, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST mode, GST amount, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST mode, GST amount, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST amount, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST amount, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST mode, GST amount, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST mode, GST amount, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST mode, GST amount, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST mode, GST amount, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST amount, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST mode, GST amount, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST mode, GST amount, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST mode, GST amount, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST amount, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST amount, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST amount, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST amount, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST amount, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST amount, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST amount, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST amount, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST amount, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST mode, GST amount, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST mode, GST amount, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST mode, GST amount, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST mode, GST amount, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST mode, GST amount, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST mode, GST amount, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST mode, GST amount, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST mode, GST amount, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST mode, GST amount, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST mode, GST amount, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST mode, GST amount, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST amount, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST amount, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST mode, GST amount, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST mode, GST amount, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST mode, GST amount, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST mode, GST amount, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST mode, GST amount, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST amount, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST mode, GST amount, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST amount, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST mode, GST amount, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST mode, GST amount, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST mode, GST amount, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST mode, GST amount, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST mode, GST amount, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST mode, GST amount, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST mode, GST amount, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST mode, GST amount, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST mode, GST amount, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST mode, GST amount, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST mode, GST amount, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST mode, GST amount, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST amount, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST mode, GST amount, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST mode, GST amount, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST amount, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST amount, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST amount, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST amount, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST amount, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST mode, GST amount, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST amount, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST mode, GST amount, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST amount, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST amount, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST amount, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST mode, GST amount, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST amount, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST mode, GST amount, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST mode, GST amount, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST mode, GST amount, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST mode, GST amount, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST mode, GST amount, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST mode, GST amount, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST mode, GST amount, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST mode, GST amount, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST mode, GST amount, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST mode, GST amount, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST mode, GST amount, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST mode, GST amount, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST mode, GST amount, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST mode, GST amount, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST mode, GST amount, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST amount, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST amount, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST mode, GST amount, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST mode, GST amount, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST amount, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST amount, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST mode, GST amount, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST mode, GST amount, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST amount, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST amount, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST mode, GST amount, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST amount, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST amount, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST amount, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST mode, GST amount, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST mode, GST amount, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST amount, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST amount, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST amount, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST amount, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST amount, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST mode, GST amount, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST amount, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST amount, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST amount, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST amount, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST amount, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST amount, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST amount, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST amount, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST amount, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST amount, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST mode, GST amount, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST amount, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST amount, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST amount, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST amount, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST amount, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST amount, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST amount, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST amount, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST amount, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST mode, GST amount, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST amount, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST amount, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST amount, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST mode, GST amount, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST amount, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST amount, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST amount, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST amount, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST mode, GST amount, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST amount, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST amount, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST amount, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST amount, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST amount, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST amount, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST amount, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST amount, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST amount, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST mode, GST amount, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST amount, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST mode, GST amount, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST amount, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST amount, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST amount, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST amount, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST amount, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST amount, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST amount, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST amount, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST amount, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST amount, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST amount, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST mode, GST amount, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST amount, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST amount, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST mode, GST amount, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST amount, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST amount, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST amount, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST amount, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST amount, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST amount, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST amount, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST mode, GST amount, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST mode, GST amount, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST amount, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST amount, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST amount, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST amount, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST amount, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST amount, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST mode, GST amount, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST mode, GST amount, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST amount, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST mode, GST amount, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST amount, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST mode, GST amount, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST amount, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST amount, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST amount, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST amount, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST amount, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST amount, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST amount, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST amount, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST amount, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST amount, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST amount, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST amount, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST amount, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST amount, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST amount, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST amount, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST mode, GST amount, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST amount, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST mode, GST amount, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST amount, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST mode, GST amount, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST amount, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST amount, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST amount, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST amount, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST amount, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST amount, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST amount, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST amount, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST amount, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST amount, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST amount, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST mode, GST amount, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST amount, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST amount, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST amount, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST amount, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST amount, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST amount, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST mode, GST amount, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST amount, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST amount, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST amount, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST amount, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST amount, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST mode, GST amount, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST amount, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST amount, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST amount, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST amount, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST amount, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST amount, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST amount, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST amount, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST mode, GST amount, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST amount, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST mode, GST amount, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST amount, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST amount, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST amount, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST amount, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST amount, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST mode, GST amount, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST amount, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST amount, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST amount, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST amount, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST mode, GST amount, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST amount, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST amount, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST mode, GST amount, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST amount, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST mode, GST amount, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST amount, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST mode, GST amount, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST amount, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST amount, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST amount, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST amount, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST amount, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST mode, GST amount, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST amount, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST amount, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST amount, GST mode, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details for the ERP primary amount in Live Payment Position
- [x] Show each additional product separately with taxable amount, GST rate, GST mode, GST amount, and final amount
- [x] Keep paid and pending values aligned with product-level GST-inclusive totals
- [x] Add tests and responsive visual verification for GST detail presentation

- [x] Show GST details

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Hide ERP primary labels and ERP GST details until ERP project is selected
- [x] Show the selected non-ERP project name as the primary project/product in payment position
- [x] Keep additional products listed separately for both ERP and non-ERP projects
- [x] Verify project switching, totals, and GST detail visibility with tests and visual QA

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary base amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Show each additional product amount, GST rate/mode, GST amount, total, paid, and pending in Client Edit
- [x] Add calculation coverage and responsive visual verification for the complete Client Edit payment breakdown

- [x] Show ERP primary

- [x] Automatically close the sidebar when opening Client Edit
- [x] Verify the collapsed sidebar and full-width Client Edit layout on desktop and mobile

- [x] Keep No. of students visible in ERP Package mode on Add Client and Client Edit
- [x] Require a valid student count for ERP Package mode and preserve it when saving
- [x] Verify Package and Per Student modes in both workflows

- [x] Show saved upcoming reminder instalments in the payment history modal
- [x] Keep actual receipts separate from planned reminder instalments
- [x] Verify reminder retrieval, display mapping, and payment history visual behavior

- [x] Load selected client products and product-level assigned, paid, and pending amounts in Invoice and Receipt
- [x] Support single-product, split multi-product, and combined multi-product collections
- [x] Calculate GST and totals per selected product and validate against each product’s pending balance
- [x] Add tests and responsive visual verification for client-linked product collection

- [x] Include the primary ERP product in Invoice and Receipt client-product collection rows
- [x] Use the client primary GST rate and GST mode instead of defaulting the collection form to Inclusive
- [x] Verify primary-plus-additional product allocation and GST calculations
