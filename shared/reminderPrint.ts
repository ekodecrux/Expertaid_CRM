export const REMINDERS_PRINT_BODY_CLASS = "reminders-printing";
export const REMINDERS_PRINT_TARGET_ID = "reminders-print";

export type ReminderPrintStatus = "all" | "Overdue" | "Upcoming";

export function buildRemindersPrintTitle(status: ReminderPrintStatus) {
  return status === "all" ? "All Reminders" : `${status} Reminders`;
}
