import fs from "node:fs";
const source = fs.readFileSync("client/src/pages/ClientPaymentPlan.tsx", "utf8");
for (const pattern of ["renewalType", "Renewal start rule", "Create renewal agreement", "const renewAgreement", "agreementId", "setRenewalOpen"]) {
  const index = source.indexOf(pattern);
  console.log(`\n=== ${pattern} @ ${index} ===`);
  console.log(index >= 0 ? source.slice(Math.max(0, index - 1800), Math.min(source.length, index + 2600)) : "not found");
}
