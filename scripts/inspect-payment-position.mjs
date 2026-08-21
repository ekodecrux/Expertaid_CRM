import fs from "node:fs";
const source = fs.readFileSync("client/src/pages/ClientCreatePaymentPlan.tsx", "utf8");
for (const needle of ["Live payment position", "ERP primary", "ERP GST details", "Additional products"]) {
  const index = source.toLowerCase().indexOf(needle.toLowerCase());
  console.log(`\n--- ${needle} @ ${index} ---`);
  if (index >= 0) console.log(source.slice(Math.max(0, index - 900), index + 2600));
}
