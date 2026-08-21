import fs from "node:fs";
const source = fs.readFileSync("client/src/pages/ClientPaymentPlan.tsx", "utf8");
const start = source.indexOf('<div className="grid gap-3 sm:grid-cols-4">');
const end = source.indexOf('<Card className="border-0 shadow-[0_18px_60px_rgba(30,45,80,0.07)]"><CardHeader><CardTitle className="font-serif text-2xl">Client details', start);
fs.writeFileSync("/tmp/client-payment-card.txt", source.slice(start, end));
console.log({ start, end, length: end - start });
