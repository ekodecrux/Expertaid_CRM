import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

describe("quotation database authority", () => {
  it("does not silently mix local quotations into database listings", () => {
    const source = readFileSync(resolve(process.cwd(), "server/db.ts"), "utf8");
    const listSection = source.slice(source.indexOf("export async function listQuotationsForOwner"), source.indexOf("export async function getNextEstimationNumberForClient"));
    expect(listSection).toContain(`return rows.map((row) => ({ ...row, items: JSON.parse(row.itemsJson) as unknown[] }));`);
    expect(listSection).not.toContain("...(await listLocalQuotations(ownerId))");
    expect(listSection).not.toContain("using persistent local fallback");
  });

  it("surfaces database create failures instead of reporting a local-only success", () => {
    const source = readFileSync(resolve(process.cwd(), "server/db.ts"), "utf8");
    const createSection = source.slice(source.indexOf("export async function createQuotation"), source.indexOf("export async function createAgreement"));
    expect(createSection).toContain("console.error(\"[Quotations] Database insert failed; quotation was not saved:\", detail)");
    expect(createSection).toContain("Quotation database save failed: ${detail}");
    const databaseBranch = createSection.slice(createSection.indexOf("  try {"));
    expect(databaseBranch).not.toContain("createLocalQuotation(input.ownerId");
  });

  it("persists every quotation-default field through the single quotationSettings table", () => {
    const source = readFileSync(resolve(process.cwd(), "server/db.ts"), "utf8");
    const settingsSection = source.slice(source.indexOf("function quotationSettingsRowToLocal"), source.indexOf("export async function allocateInvoiceNumberForOwner"));
    expect(settingsSection).toContain("await tx.delete(quotationSettings).where(eq(quotationSettings.ownerId, ownerId))");
    expect(settingsSection).toContain("await tx.insert(quotationSettings).values(values)");
    expect(settingsSection).toContain("Quotation settings database save failed:");
    expect(settingsSection).toContain("Quotation settings database load failed:");
    expect(settingsSection).not.toContain("quotationSettingsData");
    for (const field of ["companyGst", "companyAddress", "validityDays", "gstRate", "gstMode", "quotationPrefix", "invoiceNumberStart", "invoiceNumberNext", "terms", "productsJson", "logoUrl", "logoKey", "scannerUrl", "scannerKey", "signatureUrl", "signatureKey", "accountCompanyName", "accountNumber", "accountIfsc", "accountBranch"]) {
      expect(settingsSection).toContain(field === "productsJson" ? "productsJson: JSON.stringify(settings.products)" : `${field}: settings.${field}`);
    }
  });
});
