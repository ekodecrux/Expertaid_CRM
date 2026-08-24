import { describe, expect, it } from "vitest";
import { buildReminderClientPath, buildReminderPayPath } from "./reminderNavigation";

describe("reminder navigation", () => {
  it("opens the correct client edit record", () => {
    expect(buildReminderClientPath(-3)).toBe("/clients/edit/-3");
  });
  it("prefills the receipt with the selected reminder payment", () => {
    const url = buildReminderPayPath({ clientId: "ERP26003", clientName: "Add client ERP", item: "Biometric", amount: 1000, projectId: 1, productId: 90001 });
    expect(url).toContain("/receipts?");
    expect(url).toContain("reminderClient=ERP26003");
    expect(url).toContain("reminderAmount=1000");
    expect(url).toContain("reminderProductId=90001");
  });
});
