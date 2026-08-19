# Receipt multi-item implementation findings

The Receipt form currently stores only client/payment fields in `receiptForm`; it has no item array editor. The Invoice form already has a reusable item editor pattern with item name, description, quantity, unit price, add, and remove controls.

The Receipt document renderer already reads `selected.itemsJson` when present and falls back to one item from `receivedFor` and `amount`. Therefore, manual Receipt itemized data can be preserved by sending an `items` array through the Receipt create/update input and serializing it into `itemsJson` on the server.

Receipt Settings currently has company details, numbering, terms, and footer/reference configuration. The Receipt settings schema in `server/routers.ts` currently excludes default product configuration, so a new persistent JSON field must be added to the existing receipt settings table/schema rather than creating a duplicate table. The UI should expose a Receipt-only default-products editor, while Invoice Settings remains unchanged.
