import fs from 'node:fs';
const source = fs.readFileSync('client/src/pages/ClientPaymentPlan.tsx', 'utf8');
for (const needle of ['const payment =', 'const productsQuery', 'const productsPaid']) {
  const index = source.indexOf(needle);
  console.log(`\n=== ${needle} @ ${index} ===\n`);
  console.log(source.slice(Math.max(0, index - 1200), index + 2200));
}
