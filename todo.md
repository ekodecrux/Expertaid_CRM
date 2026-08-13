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
