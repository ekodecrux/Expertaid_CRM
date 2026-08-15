import { afterEach, describe, expect, it } from "vitest";
import fs from "fs/promises";
import { BRANDING_FILE, getLocalBranding, saveLocalBranding } from "./localSettings";

let previous: string | null = null;

async function readExisting() {
  try {
    return await fs.readFile(BRANDING_FILE, "utf8");
  } catch {
    return null;
  }
}

afterEach(async () => {
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
});
