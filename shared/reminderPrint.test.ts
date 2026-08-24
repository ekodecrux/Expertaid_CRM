import { describe, expect, it } from "vitest";
import { buildRemindersPrintTitle, REMINDERS_PRINT_BODY_CLASS, REMINDERS_PRINT_TARGET_ID } from "./reminderPrint";

describe("Reminders print metadata", () => {
  it("uses a dedicated body class and report target", () => {
    expect(REMINDERS_PRINT_BODY_CLASS).toBe("reminders-printing");
    expect(REMINDERS_PRINT_TARGET_ID).toBe("reminders-print");
  });

  it("describes the active reminder filter in the print heading", () => {
    expect(buildRemindersPrintTitle("all")).toBe("All Reminders");
    expect(buildRemindersPrintTitle("Overdue")).toBe("Overdue Reminders");
    expect(buildRemindersPrintTitle("Upcoming")).toBe("Upcoming Reminders");
  });
});
