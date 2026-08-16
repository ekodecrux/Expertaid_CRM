import { afterEach, describe, expect, it } from "vitest";
import fs from "fs/promises";
import { BRANDING_FILE, createLocalQuotation, deleteLocalQuotation, getLocalBranding, getLocalQuotationSettings, listLocalQuotations, QUOTATION_SETTINGS_FILE, QUOTATIONS_FILE, saveLocalBranding, saveLocalQuotationSettings, updateLocalQuotation } from "./localSettings";

let previous: string | null = null;
let previousQuotation: string | null = null;
let previousQuotations: string | null = null;

async function readQuotationExisting() {
  try {
    return await fs.readFile(QUOTATION_SETTINGS_FILE, "utf8");
  } catch {
    return null;
  }
}

async function readQuotationsExisting() {
  try {
    return await fs.readFile(QUOTATIONS_FILE, "utf8");
  } catch {
    return null;
  }
}

async function readExisting() {
  try {
    return await fs.readFile(BRANDING_FILE, "utf8");
  } catch {
    return null;
  }
}

afterEach(async () => {
  if (previousQuotation === null) {
    await fs.rm(QUOTATION_SETTINGS_FILE, { force: true });
  } else {
    await fs.mkdir(new URL(".", `file://${QUOTATION_SETTINGS_FILE}`).pathname, { recursive: true }).catch(() => undefined);
    await fs.writeFile(QUOTATION_SETTINGS_FILE, previousQuotation, "utf8");
  }
  previousQuotation = null;

  if (previousQuotations === null) {
    await fs.rm(QUOTATIONS_FILE, { force: true });
  } else {
    await fs.mkdir(new URL(".", `file://${QUOTATIONS_FILE}`).pathname, { recursive: true }).catch(() => undefined);
    await fs.writeFile(QUOTATIONS_FILE, previousQuotations, "utf8");
  }
  previousQuotations = null;

  if (previous === null) {
    await fs.rm(BRANDING_FILE, { force: true });
  } else {
    await fs.mkdir(new URL(".", `file://${BRANDING_FILE}`).pathname, { recursive: true }).catch(() => undefined);
    await fs.writeFile(BRANDING_FILE, previous, "utf8");
  }
  previous = null;
});

describe("local branding settings", () => {
  it("saves and retrieves branding independently of the users table", async () => {
    previous = await readExisting();
    const saved = await saveLocalBranding(1, {
      companyLogoUrl: "/local-storage/branding/logo.png",
      companyName: "Expertaid Test",
      serviceCaption: "ERP Support",
      footerCompanyName: "Expertaid Test Pvt Ltd",
    });

    await expect(getLocalBranding(1)).resolves.toEqual(saved);
  });

  it("persists quotation records for create, list, update, and delete fallback flows", async () => {
    previousQuotations = await readQuotationsExisting();
    const created = await createLocalQuotation(1, { quotationNumber: "QT500", clientName: "Fallback School", itemsJson: "[]", status: "Awaiting" });
    await expect(listLocalQuotations(1)).resolves.toHaveLength(1);
    const updated = await updateLocalQuotation(1, created.id, { status: "Success" });
    expect(updated?.status).toBe("Success");
    await expect(deleteLocalQuotation(1, created.id)).resolves.toBe(true);
    await expect(listLocalQuotations(1)).resolves.toHaveLength(0);
  });

  it("saves and retrieves quotation settings independently of the quotationSettings table", async () => {
    previousQuotation = await readQuotationExisting();
    const defaults = await getLocalQuotationSettings(1);
    const saved = await saveLocalQuotationSettings(1, { ...defaults, quotationPrefix: "ET", invoiceNumberStart: 500, invoiceNumberNext: 500 });

    await expect(getLocalQuotationSettings(1)).resolves.toMatchObject({ quotationPrefix: "ET", invoiceNumberStart: 500, invoiceNumberNext: 500 });
    expect(saved.products.length).toBeGreaterThan(0);
  });
});
