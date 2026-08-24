import fs from "node:fs";
const source = fs.readFileSync("client/src/pages/Clients.tsx", "utf8");
const start = source.indexOf("<Dialog open={Boolean(selected)}");
const end = source.indexOf("</DialogContent></Dialog>", start);
console.log(source.slice(end - 3000, end + 80));
