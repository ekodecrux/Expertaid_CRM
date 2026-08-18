import { describe, expect, it } from "vitest";
import { DEFAULT_INVOICE_SETTINGS, DEFAULT_RECEIPT_SETTINGS } from "./billing";

describe("billing defaults", () => {
  it("starts invoices with a stable INV numbering contract", () => {
    expect(DEFAULT_INVOICE_SETTINGS.invoicePrefix).toBe("INV");
    expect(DEFAULT_INVOICE_SETTINGS.invoiceNumberStart).toBe(1);
    expect(DEFAULT_INVOICE_SETTINGS.invoiceNumberNext).toBe(1);
    expect(DEFAULT_INVOICE_SETTINGS.gstMode).toBe("exclusive");
  });

  it("starts receipts with a stable RCT numbering contract", () => {
    expect(DEFAULT_RECEIPT_SETTINGS.receiptPrefix).toBe("RCT");
    expect(DEFAULT_RECEIPT_SETTINGS.receiptNumberStart).toBe(1);
    expect(DEFAULT_RECEIPT_SETTINGS.receiptNumberNext).toBe(1);
    expect(DEFAULT_RECEIPT_SETTINGS.accountCompanyName).toContain("Expertaid");
  });
});
