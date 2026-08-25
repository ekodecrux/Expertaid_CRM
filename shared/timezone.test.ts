import { describe, expect, it } from "vitest";
import { formatIndiaDate, formatIndiaDateTime, formatIndiaTime, timestampMs } from "./timezone";

describe("Indian Standard Time formatting", () => {
  it("converts UTC timestamps to Asia/Kolkata date and time", () => {
    const timestamp = "2026-08-25T06:42:00.000Z";
    expect(formatIndiaDate(timestamp)).toBe("25 Aug 2026");
    expect(formatIndiaTime(timestamp)).toBe("12:12 pm");
    expect(formatIndiaDateTime(timestamp)).toBe("25 Aug 2026 · 12:12 pm");
  });

  it("orders recent activity by the event timestamp", () => {
    expect(timestampMs("2026-08-25T06:42:00.000Z")).toBeGreaterThan(timestampMs("2026-08-25T06:41:00.000Z"));
    expect(timestampMs(null)).toBe(0);
  });
});

