import { describe, expect, it } from "vitest";
import { buildCollectionItems, getProductPending, validateProductAllocations } from "./clientProductCollection";

const products = [
  { id: 1, productName: "Biometric", quantity: 1, unitPrice: 4000, gstRate: 18, gstMode: "inclusive" as const, subtotal: 3389.83, gstAmount: 610.17, totalAmount: 4000, paidAmount: 1000 },
  { id: 2, productName: "WhatsApp", quantity: 1, unitPrice: 5000, gstRate: 18, gstMode: "exclusive" as const, subtotal: 5000, gstAmount: 900, totalAmount: 5900, paidAmount: 0 },
];

describe("client product collection", () => {
  it("supports a single product collection and maps it to a billing item", () => {
    expect(getProductPending(products[0])).toBe(3000);
    expect(validateProductAllocations(products, [{ productId: 1, amount: 1200 }])).toEqual({ total: 1200 });
    expect(buildCollectionItems(products, [{ productId: 1, amount: 1200 }])[0]).toMatchObject({ itemName: "Biometric", productId: 1, collectionAmount: 1200, unitPrice: 1200 });
  });

  it("supports split collection across multiple products", () => {
    expect(validateProductAllocations(products, [{ productId: 1, amount: 3000 }, { productId: 2, amount: 2500 }])).toEqual({ total: 5500 });
  });

  it("rejects duplicate or over-pending allocations", () => {
    expect(() => validateProductAllocations(products, [{ productId: 1, amount: 3001 }])).toThrow(/pending balance/);
    expect(() => validateProductAllocations(products, [{ productId: 1, amount: 100 }, { productId: 1, amount: 100 }])).toThrow(/only once/);
  });
});
