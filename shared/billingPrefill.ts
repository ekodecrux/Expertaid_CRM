import { formatWholeRupees } from "./displayCurrency";

export function clientPendingAmount(total: string | number | null | undefined, paid: string | number | null | undefined) {
  const pending = Math.max(0, Number(total ?? 0) - Number(paid ?? 0));
  return formatWholeRupees(pending);
}
