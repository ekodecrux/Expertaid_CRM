import { describe, expect, it } from "vitest";
import { calculateReceiptCollectionDelta, receiptCollectionSummary } from "./paymentReceipt";

describe("product receipt collection", () => {
  it("returns only the newly collected partial amount", () => {
    expect(calculateReceiptCollectionDelta(2500, 1000, 7500)).toEqual({
      delta: 1500,
      remaining: 6500,
      isNewCollection: true,
      isOverCollection: false,
    });
  });

  it("rejects a duplicate amount without creating another collection", () => {
    expect(calculateReceiptCollectionDelta(1000, 1000, 7500)).toEqual({
      delta: 0,
      remaining: 6500,
      isNewCollection: false,
      isOverCollection: false,
    });
  });

  it("flags a collection above the remaining product balance", () => {
    expect(calculateReceiptCollectionDelta(8000, 1000, 7500)).toEqual({
      delta: 6500,
      remaining: 6500,
      isNewCollection: false,
      isOverCollection: true,
    });
  });

  it("requires a positive receipt amount", () => {
    expect(receiptCollectionSummary(0).isValid).toBe(false);
    expect(receiptCollectionSummary(1250).isValid).toBe(true);
  });
});
