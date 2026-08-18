import { describe, expect, it } from "vitest";
import { DEFAULT_INVOICE_SETTINGS, DEFAULT_RECEIPT_SETTINGS } from "./billing";
import { invoiceInput, invoiceSettingsInput, receiptInput, receiptSettingsInput } from "./routers";

describe("billing defaults and input contracts", () => {
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

  it("coerces Invoice settings numeric strings from HTML controls", () => {
    const parsed = invoiceSettingsInput.parse({ companyGst: "GSTIN", companyAddress: "Address", invoicePrefix: "INV", invoiceNumberStart: "12", gstRate: "18", gstMode: "exclusive", defaultDueDays: "15", terms: "Terms" });
    expect(parsed.invoiceNumberStart).toBe(12);
    expect(parsed.gstRate).toBe(18);
    expect(parsed.defaultDueDays).toBe(15);
  });

  it("coerces Receipt settings, amount, and Invoice item numeric strings", () => {
    const receiptSettings = receiptSettingsInput.parse({ companyGst: "GSTIN", companyAddress: "Address", receiptPrefix: "RCT", receiptNumberStart: "4", terms: "Terms" });
    const receipt = receiptInput.parse({ clientName: "Client", clientAddress: "Address", receiptDate: "2026-01-01", paymentDate: "2026-01-01", amount: "1250.50", paymentMode: "UPI", receivedFor: "Subscription" });
    const invoice = invoiceInput.parse({ clientName: "Client", clientAddress: "Address", invoiceDate: "2026-01-01", dueDate: "2026-01-15", gstRate: "18", items: [{ itemName: "ERP", quantity: "2", unitPrice: "500" }] });
    expect(receiptSettings.receiptNumberStart).toBe(4);
    expect(receipt.amount).toBe(1250.5);
    expect(invoice.gstRate).toBe(18);
    expect(invoice.items[0].quantity).toBe(2);
    expect(invoice.items[0].unitPrice).toBe(500);
  });
});
