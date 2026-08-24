export function receiptDisplayTotal(input: { mode: "inclusive" | "exclusive"; subtotal?: string | number | null; grandTotal?: string | number | null; amount?: string | number | null }) {
  const value = input.mode === "inclusive" ? input.grandTotal ?? input.amount : input.subtotal ?? input.amount;
  const numeric = Number(value ?? 0);
  return Number.isFinite(numeric) ? numeric : 0;
}
