# Client Edit Payment Breakdown QA

The desktop preview at `/clients/edit/1` shows the selected MySchool project as the primary product, with a ₹11,800 total, ₹10,000 taxable amount, ₹1,800 GST at 18% exclusive, ₹0 paid, and ₹11,800 pending. The top summary separately shows assigned total, total paid, total pending, and progress.

The mobile preview shows the payment-position summary stacked cleanly below the client identity section, with readable labels and values. The detailed primary breakdown continues below the viewport and remains inside the responsive card rather than overflowing horizontally.

Automated validation: 28 Vitest files passed, 82 tests passed, TypeScript reported 0 errors, and the production build completed successfully.
