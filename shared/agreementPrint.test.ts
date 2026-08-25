import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

describe("agreement print controls", () => {
  it("keeps the close control print-hidden and reserves header space for Print", () => {
    const source = readFileSync(resolve(process.cwd(), "client/src/pages/AgreementPage.tsx"), "utf8");
    expect(source).toContain("aria-label=\"Cancel and close agreement\"");
    expect(source).toContain("print:hidden");
    expect(source).toContain("self-end pr-12 print:hidden sm:self-auto");
  });
});
