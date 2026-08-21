export function buildClientReceiptPath(receiptNumber: string, clientId: string | number) {
  const params = new URLSearchParams({
    receipt: receiptNumber,
    returnTo: "clients",
    paymentClientId: String(clientId),
  });
  return `/receipts?${params.toString()}`;
}

export function buildReceiptClosePath(search: string) {
  const params = new URLSearchParams(search);
  if (params.get("returnTo") !== "clients") return "/receipts";
  const clientId = params.get("paymentClientId");
  return `/clients?${new URLSearchParams({
    returnTo: "clients",
    paymentClientId: clientId ?? "",
  }).toString()}`;
}
