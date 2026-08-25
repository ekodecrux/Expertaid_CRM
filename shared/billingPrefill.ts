import { formatWholeRupees } from "./displayCurrency";
import { getPaymentTermStates } from "./paymentPlan";

export function clientPendingAmount(total: string | number | null | undefined, paid: string | number | null | undefined) {
  const pending = Math.max(0, Number(total ?? 0) - Number(paid ?? 0));
  return formatWholeRupees(pending);
}

export type ClientPrefillProduct = {
  id?: number | null;
  productName?: string | null;
  description?: string | null;
  totalAmount?: string | number | null;
  paidAmount?: string | number | null;
};

export type ClientPrefillTerm = {
  label?: string | null;
  dueDate?: string | null;
  amount?: string | number | null;
};

export type ClientPrefillPrimary = {
  productName: string;
  totalAmount: string | number;
  paidAmount: string | number;
};

export type ClientReceiptPrefillItem = {
  itemName: string;
  description: string;
  quantity: string;
  unitPrice: string;
  productId?: number;
  collectionAmount?: string;
  isPrimary?: boolean;
  isPaid?: boolean;
};

export function buildClientReceiptPrefillItems({
  terms,
  products,
  primary,
  paidAmount = 0,
}: {
  terms?: ClientPrefillTerm[] | null;
  products?: ClientPrefillProduct[] | null;
  primary?: ClientPrefillPrimary | null;
  paidAmount?: string | number | null;
}): ClientReceiptPrefillItem[] {
  const additionalItems = (products ?? [])
    .map((product) => {
      const pending = clientPendingAmount(product.totalAmount, product.paidAmount);
      return {
        itemName: String(product.productName ?? ""),
        description: String(product.description ?? ""),
        quantity: "1",
        unitPrice: String(pending),
        productId: product.id == null ? undefined : Number(product.id),
        collectionAmount: String(pending),
      };
    })
    .filter((item) => item.itemName && Number(item.unitPrice) > 0);

  const installmentItems = getPaymentTermStates((terms ?? []).map((term) => ({ label: String(term.label ?? "Installment"), dueDate: String(term.dueDate ?? ""), amount: String(term.amount ?? "0") })), Number(paidAmount ?? 0))
    .map((term) => {
      const amount = Math.max(0, Number(term.amount ?? 0));
      return {
        itemName: String(term.label ?? "Installment"),
        description: term.dueDate ? `Due ${term.dueDate}` : "Client payment installment",
        quantity: "1",
        unitPrice: String(amount),
        collectionAmount: String(amount),
        isPaid: term.isPaid,
      };
    })
    .filter((item) => Number(item.unitPrice) > 0);

  if (installmentItems.length) return [...installmentItems, ...additionalItems];
  if (!primary) return additionalItems;

  const pending = clientPendingAmount(primary.totalAmount, primary.paidAmount);
  return pending > 0
    ? [{ itemName: primary.productName, description: "Primary client service", quantity: "1", unitPrice: String(pending), collectionAmount: String(pending), isPrimary: true }, ...additionalItems]
    : additionalItems;
}

