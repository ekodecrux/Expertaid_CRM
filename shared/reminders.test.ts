import { describe, expect, it } from "vitest";
import { buildReminderItems, reminderPayAmount } from "./reminders";

describe("reminder Pay amount", () => {
  it("matches the displayed whole-rupee payment-plan amount", () => {
    expect(reminderPayAmount({ source: "Payment plan", amount: 6.8 })).toBe(7);
  });
  it("preserves exact product balances", () => {
    expect(reminderPayAmount({ source: "Product", amount: 6.8 })).toBe(6.8);
  });
});

describe("reminder aggregation", () => {
  const client = { id: -3, clientId: "ERP26003", clientName: "Add client ERP" };
  it("keeps only open plan terms after collected payments", () => {
    const items = buildReminderItems({ clients: [client], products: [], plans: [{ id: 1, clientId: "ERP26003", terms: [{ label: "Installment 1", dueDate: "2026-08-01", amount: "500" }, { label: "Installment 2", dueDate: "2026-09-01", amount: "500" }] }], invoices: [], receipts: [{ clientId: "ERP26003", status: "Completed", amount: "500" }], now: new Date("2026-08-24") });
    expect(items).toHaveLength(1);
    expect(items[0]).toMatchObject({ label: "Installment 2", urgency: "Due soon", amount: 500 });
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

  it("classifies each due date against today independently", () => {
    const items = buildReminderItems({
      clients: [client],
      products: [],
      plans: [{ id: 2, clientId: "ERP26003", terms: [{ label: "Installment 1", dueDate: "2027-08-26", amount: "3540" }, { label: "Installment 2", dueDate: "2027-09-22", amount: "3540" }] }],
      invoices: [],
      receipts: [],
      now: new Date("2027-09-09T12:00:00"),
    });
    expect(items.map((item) => item.urgency)).toEqual(["Overdue", "Due soon"]);
  });

  it("shows overdue and due-soon items through 15 calendar days only", () => {
    const items = buildReminderItems({
      clients: [client],
      products: [
        { id: 10, clientId: "ERP26003", productName: "Overdue", totalAmount: "100", paidAmount: "0", dueDate: "2026-08-23" },
        { id: 11, clientId: "ERP26003", productName: "Within window", totalAmount: "100", paidAmount: "0", dueDate: "2026-09-08" },
        { id: 12, clientId: "ERP26003", productName: "Outside window", totalAmount: "100", paidAmount: "0", dueDate: "2026-09-09" },
      ],
      plans: [],
      invoices: [],
      receipts: [],
      now: new Date("2026-08-24T12:00:00"),
    });
    expect(items.map((item) => item.label)).toEqual(["Overdue", "Within window"]);
    expect(items.find((item) => item.label === "Within window")?.urgency).toBe("Due soon");
  });
});
