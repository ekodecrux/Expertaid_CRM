# Client Payment Planner QA

The new full-page route `/clients/edit/:id` renders inside the authenticated DashboardLayout. With live approved agreement ID `270001`, the page displayed Client ID `ERP26002`, client identity/details, assigned total ₹11,800, paid ₹5,000, pending ₹6,800, 42% progress, the payment schedule section, and the reminder-only billing explanation. The Clients list pencil action now navigates to this route rather than `/agreements`.

A manual `/clients/edit/2` check correctly showed the not-found state because `2` is not a live client/agreement row ID; the actual approved row identifier used for visual QA was `270001`.
