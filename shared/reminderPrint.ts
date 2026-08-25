export const REMINDERS_PRINT_BODY_CLASS = "reminders-printing";
export const REMINDERS_PRINT_TARGET_ID = "reminders-print";

import type { ReminderUrgency } from "./reminders";

export type ReminderPrintStatus = "all" | ReminderUrgency;

export function buildRemindersPrintTitle(status: ReminderPrintStatus) {
  return status === "all" ? "All Reminders" : `${status} Reminders`;
}
