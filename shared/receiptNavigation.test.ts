import { describe, expect, it } from "vitest";
import { buildClientReceiptPath, buildReceiptClosePath } from "./receiptNavigation";

describe("receipt navigation context", () => {
  it("opens a receipt with the Client-list return context", () => {
    expect(buildClientReceiptPath("REC-1001", 42)).toBe("/receipts?receipt=REC-1001&returnTo=clients&paymentClientId=42");
  });

  it("returns to the same Client payment-history context", () => {
    expect(buildReceiptClosePath("?receipt=REC-1001&returnTo=clients&paymentClientId=42")).toBe("/clients?returnTo=clients&paymentClientId=42");
  });

  it("returns to Receipts when no Client context is provided", () => {
    expect(buildReceiptClosePath("?receipt=REC-1001")).toBe("/receipts");
  });
});
