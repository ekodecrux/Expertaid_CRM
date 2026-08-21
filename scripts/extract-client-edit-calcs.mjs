import fs from 'node:fs';
const source = fs.readFileSync('client/src/pages/ClientPaymentPlan.tsx', 'utf8');
for (const needle of ['primaryTotal', 'const payment', 'productTotal', 'primaryPaid']) {
  const index = source.indexOf(needle);
  console.log(`\n=== ${needle} @ ${index} ===\n`);
  console.log(source.slice(Math.max(0, index - 1000), index + 1800));
}
