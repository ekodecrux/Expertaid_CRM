export type ClientBalanceSource = {
  price?: string | number | null;
  gstAmount?: string | number | null;
  gstMode?: "inclusive" | "exclusive" | string | null;
  totalPrice?: string | number | null;
};

export function clientPrimaryTotal(client: ClientBalanceSource): number {
  const entered = Number(client.price ?? 0);
  const gst = Number(client.gstAmount ?? 0);
  if (entered > 0) {
    return client.gstMode === "inclusive" ? entered : entered + gst;
  }
  return Number(client.totalPrice ?? 0);
}

export function clientPaymentPosition(client: ClientBalanceSource, productTotals: number[], paid: number) {
  const total = clientPrimaryTotal(client) + productTotals.reduce((sum, value) => sum + Math.max(0, Number(value) || 0), 0);
  const safePaid = Math.max(0, Number(paid) || 0);
  return { total, paid: safePaid, due: Math.max(0, total - safePaid), progress: total > 0 ? Math.min(100, safePaid / total * 100) : 0 };
}
