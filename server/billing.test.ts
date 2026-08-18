import { describe, expect, it } from "vitest";
import { DEFAULT_INVOICE_SETTINGS, DEFAULT_RECEIPT_SETTINGS } from "./billing";
import { invoiceInput, invoiceSettingsInput, invoiceStatusInput, receiptInput, receiptSettingsInput } from "./routers";
import { receipts } from "../drizzle/schema";

describe("billing defaults and input contracts", () => {
  it("starts invoices with a stable INV numbering contract", () => {
    expect(DEFAULT_INVOICE_SETTINGS.invoicePrefix).toBe("INV");
    expect(DEFAULT_INVOICE_SETTINGS.invoiceNumberStart).toBe(1);
    expect(DEFAULT_INVOICE_SETTINGS.invoiceNumberNext).toBe(1);
    expect(DEFAULT_INVOICE_SETTINGS.gstMode).toBe("exclusive");
    expect(DEFAULT_INVOICE_SETTINGS.scannerUrl).toBeNull();
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
    expect("gstMode" in parsed).toBe(false);
  });

  it("accepts persisted Invoice asset references in settings", () => {
    const parsed = invoiceSettingsInput.parse({ companyGst: "GSTIN", companyAddress: "Address", invoicePrefix: "INV", invoiceNumberStart: 1, gstRate: 18, defaultDueDays: 15, terms: "Terms", logoDataUrl: "https://cdn.example/logo.png", scannerDataUrl: "https://cdn.example/qr.png", signatureDataUrl: "https://cdn.example/signature.png" });
    expect(parsed.logoDataUrl).toBe("https://cdn.example/logo.png");
    expect(parsed.scannerDataUrl).toBe("https://cdn.example/qr.png");
    expect(parsed.signatureDataUrl).toBe("https://cdn.example/signature.png");
  });

  it("supports invoice-linked receipt detail columns", () => {
    expect(receipts.invoiceId).toBeDefined();
    expect(receipts.invoiceNumber).toBeDefined();
    expect(receipts.itemsJson).toBeDefined();
    expect(receipts.gstAmount).toBeDefined();
  });

  it("accepts the editable Invoice status lifecycle", () => {
    expect(invoiceStatusInput.parse("Draft")).toBe("Draft");
    expect(invoiceStatusInput.parse("Due")).toBe("Due");
    expect(invoiceStatusInput.parse("Paid")).toBe("Paid");
    expect(invoiceStatusInput.parse("Cancelled")).toBe("Cancelled");
    expect(() => invoiceStatusInput.parse("Sent")).toThrow();
  });

  it("coerces Receipt settings, amount, and Invoice item numeric strings", () => {
    const receiptSettings = receiptSettingsInput.parse({ companyGst: "GSTIN", companyAddress: "Address", receiptPrefix: "RCT", receiptNumberStart: "4", terms: "Terms" });
    const receipt = receiptInput.parse({ clientName: "Client", clientAddress: "Address", receiptDate: "2026-01-01", paymentDate: "2026-01-01", amount: "1250.50", paymentMode: "UPI", receivedFor: "Subscription" });
    const invoice = invoiceInput.parse({ clientName: "Client", clientAddress: "Address", invoiceDate: "2026-01-01", dueDate: "2026-01-15", gstRate: "18", items: [{ itemName: "ERP", quantity: "2", unitPrice: "500" }] });
    expect(receiptSettings.receiptNumberStart).toBe(4);
    expect(receipt.amount).toBe(1250.5);
    expect(invoice.gstRate).toBe(18);
    expect(invoice.gstMode).toBe("exclusive");
    expect(invoice.items[0].quantity).toBe(2);
    expect(invoice.items[0].unitPrice).toBe(500);
  });
});
