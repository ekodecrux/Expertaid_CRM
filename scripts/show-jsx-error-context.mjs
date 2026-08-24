import fs from "node:fs";
const lines = fs.readFileSync("client/src/pages/Clients.tsx", "utf8").split("\n");
const line = lines.find((value) => value.includes("Previous plans")) ?? "";
const position = 38670;
console.log(`length=${line.length}`);
console.log(line.slice(Math.max(0, position - 700), position + 700));
