import fs from "node:fs";
const source = fs.readFileSync("client/src/pages/Clients.tsx", "utf8");
const marker = "open={Boolean(selected)}";
const index = source.indexOf(marker);
console.log(index);
console.log(source.slice(Math.max(0, index - 250), index + 4500));
