import { describe, expect, it } from "vitest";
import { buildReminderItems } from "./reminders";

describe("reminder aggregation", () => {
  const client = { id: -3, clientId: "ERP26003", clientName: "Add client ERP" };
  it("keeps only open plan terms after collected payments", () => {
    const items = buildReminderItems({ clients: [client], products: [], plans: [{ id: 1, clientId: "ERP26003", terms: [{ label: "Installment 1", dueDate: "2026-08-01", amount: "500" }, { label: "Installment 2", dueDate: "2026-09-01", amount: "500" }] }], invoices: [], receipts: [{ clientId: "ERP26003", status: "Completed", amount: "500" }], now: new Date("2026-08-24") });
    expect(items).toHaveLength(1);
    expect(items[0]).toMatchObject({ label: "Installment 2", urgency: "Upcoming", amount: 500 });
  });
  it("uses receipt product allocations to close stale product balances", () => {
    const items = buildReminderItems({ clients: [client], products: [{ id: 9, clientId: "ERP26003", productName: "Biometric", totalAmount: "1000", paidAmount: "0", dueDate: "2026-08-01" }], plans: [], invoices: [], receipts: [{ clientId: "ERP26003", status: "Completed", amount: "1000", itemsJson: JSON.stringify([{ productId: 9, collectionAmount: 1000 }]) }], now: new Date("2026-08-24") });
    expect(items).toEqual([]);
  });

  it("uses legacy product receipt names to close remaining balances", () => {
    const items = buildReminderItems({ clients: [client], products: [{ id: 9, clientId: "ERP26003", productName: "Biometric", totalAmount: "1000", paidAmount: "0", dueDate: "2026-08-01" }], plans: [], invoices: [], receipts: [{ clientId: "ERP26003", status: "Issued", amount: "1000", receivedFor: "Biometric", itemsJson: JSON.stringify([{ itemName: "Biometric", unitPrice: 1000 }]) }], now: new Date("2026-08-24") });
    expect(items).toEqual([]);
  });

  it("includes overdue invoices and product balances", () => {
    const items = buildReminderItems({ clients: [client], products: [{ id: 9, clientId: "ERP26003", productName: "Biometric", totalAmount: "1000", paidAmount: "250", dueDate: "2026-08-01" }], plans: [], invoices: [{ id: 4, clientId: "ERP26003", clientName: "Add client ERP", invoiceNumber: "INV-4", status: "Due", grandTotal: "800", dueDate: "2026-08-10" }], receipts: [], now: new Date("2026-08-24") });
    expect(items.map((item) => item.source)).toEqual(["Product", "Invoice"]);
    expect(items.every((item) => item.urgency === "Overdue")).toBe(true);
  });
});
