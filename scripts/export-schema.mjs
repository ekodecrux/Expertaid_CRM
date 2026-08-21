import fs from "node:fs/promises";
import mysql from "mysql2/promise";

const connection = await mysql.createConnection(process.env.DATABASE_URL);
try {
  const [tables] = await connection.query("SHOW TABLES");
  const tableNames = tables.map((row) => Object.values(row)[0]).filter(Boolean).sort();
  const statements = [];
  statements.push("-- Expertaid ERP CRM overall database schema");
  statements.push("-- Generated from the current MySQL database. No application data is included.");
  statements.push("-- Review this file against the Hostinger database before execution.");
  statements.push("SET FOREIGN_KEY_CHECKS = 0;");
  for (const tableName of tableNames) {
    const [rows] = await connection.query(`SHOW CREATE TABLE \`${String(tableName).replaceAll("`", "``")}\``);
    const createSql = rows[0]?.["Create Table"];
    if (createSql) statements.push(`${createSql.replace(/^CREATE TABLE /, "CREATE TABLE IF NOT EXISTS ")};`);
  }
  statements.push("SET FOREIGN_KEY_CHECKS = 1;");
  await fs.mkdir("database", { recursive: true });
  await fs.writeFile("database/expertaid_overall_database.sql", `${statements.join("\n\n")}\n`, "utf8");
  console.log(`Exported ${tableNames.length} tables to database/expertaid_overall_database.sql`);
} finally {
  await connection.end();
}
