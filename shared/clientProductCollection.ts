export type ClientProductBalance = {
  id: number;
  productName: string;
  quantity: number;
  unitPrice: number;
  gstRate: number;
  gstMode: "inclusive" | "exclusive";
  subtotal: number;
  gstAmount: number;
  totalAmount: number;
  paidAmount: number;
};

export type ProductCollectionAllocation = {
  productId: number;
  amount: number;
};

export function getProductPending(product: Pick<ClientProductBalance, "totalAmount" | "paidAmount">) {
  return Math.max(0, Number(product.totalAmount || 0) - Number(product.paidAmount || 0));
}

export function validateProductAllocations(
  products: ClientProductBalance[],
  allocations: ProductCollectionAllocation[],
) {
  const byId = new Map(products.map(product => [product.id, product]));
  const seen = new Set<number>();
  let total = 0;
  for (const allocation of allocations) {
    if (!Number.isInteger(allocation.productId) || allocation.productId <= 0) {
      throw new Error("Each collection must reference a valid client product.");
    }
    if (seen.has(allocation.productId)) {
      throw new Error("A client product can appear only once in a collection.");
    }
    seen.add(allocation.productId);
    const product = byId.get(allocation.productId);
    if (!product) throw new Error("One selected client product could not be found.");
    const amount = Number(allocation.amount);
    const pending = getProductPending(product);
    if (!Number.isFinite(amount) || amount <= 0) {
      throw new Error(`Collection for ${product.productName} must be greater than zero.`);
    }
    if (amount > pending + 0.005) {
      throw new Error(`Collection for ${product.productName} cannot exceed its pending balance.`);
    }
    total += amount;
  }
  if (!allocations.length) throw new Error("Select at least one client product for this collection.");
  return { total: Math.round(total * 100) / 100 };
}

export function buildCollectionItems(
  products: ClientProductBalance[],
  allocations: ProductCollectionAllocation[],
) {
  const byId = new Map(products.map(product => [product.id, product]));
  return allocations.map(allocation => {
    const product = byId.get(allocation.productId)!;
    return {
      itemName: product.productName,
      description: `Client product collection · ${product.productName}`,
      quantity: 1,
      unitPrice: Number(allocation.amount),
      productId: product.id,
      collectionAmount: Number(allocation.amount),
    };
  });
}
