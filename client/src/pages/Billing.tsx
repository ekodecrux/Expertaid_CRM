import { useEffect, useMemo, useState } from "react";
import { useLocation } from "wouter";
import {
  Eye,
  FileText,
  IndianRupee,
  Pencil,
  Plus,
  Printer,
  Receipt as ReceiptIcon,
  Settings2,
  X,
} from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { trpc } from "@/lib/trpc";
import {
  calculateQuotationTotals,
  formatCurrency,
  type GstMode,
} from "@shared/quotation";
import { filterProjectClients } from "@shared/clients";
import { matchesClientId } from "@shared/clientSearch";
import { clientPrimaryTotal } from "@shared/clientBalance";
import { buildReceiptClosePath } from "@shared/receiptNavigation";
import { receiptDisplayTotal } from "@shared/receiptDisplayTotals";
import { normalizeCollectionReceipt } from "@shared/reporting";
import { formatWholeRupees } from "@shared/displayCurrency";

type BillingKind = "invoice" | "receipt";

type ClientPaymentSummary = { total: number; paid: number; due: number; progress: number };
const formatRoundedCurrency = (value: number) => new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(formatWholeRupees(value));

function ClientPaymentSummaryPanel({ summary }: { summary: ClientPaymentSummary }) {
  return <div className="sm:col-span-2 rounded-xl border border-[#e3defc] bg-[#faf9ff] p-3"><div className="mb-3 flex items-center justify-between gap-3"><div><p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-400">Client payment position</p><p className="mt-1 text-xs text-slate-500">Use this balance when preparing the invoice or receipt.</p></div><p className="text-xs font-semibold text-[#4f2ad3]">{Math.round(summary.progress)}% paid</p></div><div className="grid gap-3 sm:grid-cols-3"><div><p className="text-[10px] uppercase tracking-[0.12em] text-slate-400">Assigned total</p><p className="mt-1 font-bold text-[#4f2ad3]">{formatRoundedCurrency(summary.total)}</p></div><div><p className="text-[10px] uppercase tracking-[0.12em] text-slate-400">Paid</p><p className="mt-1 font-bold text-emerald-600">{formatRoundedCurrency(summary.paid)}</p></div><div><p className="text-[10px] uppercase tracking-[0.12em] text-slate-400">Pending</p><p className="mt-1 font-bold text-rose-600">{formatRoundedCurrency(summary.due)}</p></div></div><div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-200"><div className="h-full rounded-full bg-[#5b45e5] transition-all" style={{ width: `${summary.progress}%` }} /></div></div>;
}

function ClientSearchSelect({ clients, value, disabled, onChange }: { clients: any[]; value: string; disabled?: boolean; onChange: (value: string) => void }) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const selected = clients.find(client => matchesClientId(client.clientId, value));
  const filtered = clients.filter(client => {
    const text = `${client.clientId ?? ""} ${client.clientName ?? ""}`.toLowerCase();
    return text.includes(query.trim().toLowerCase());
  });
  return <div className="relative mt-1">
    <Input disabled={disabled} value={open ? query : selected ? `${selected.clientId} · ${selected.clientName}` : ""} placeholder="Search Client ID or name" onFocus={() => setOpen(true)} onChange={event => { setQuery(event.target.value); setOpen(true); }} onBlur={() => window.setTimeout(() => setOpen(false), 150)} />
    {open && !disabled && <div className="absolute z-30 mt-1 max-h-56 w-full overflow-auto rounded-md border border-slate-200 bg-white p-1 shadow-lg">
      <button type="button" className="w-full rounded px-3 py-2 text-left text-sm text-slate-500 hover:bg-slate-50" onMouseDown={event => event.preventDefault()} onClick={() => { onChange(""); setQuery(""); setOpen(false); }}>Select Client ID</button>
      {filtered.map(client => <button type="button" key={`${client.projectId}-${client.clientId}`} className="w-full rounded px-3 py-2 text-left text-sm text-slate-700 hover:bg-[#f4f1ff]" onMouseDown={event => event.preventDefault()} onClick={() => { onChange(String(client.clientId)); setQuery(""); setOpen(false); }}>{client.clientId} · {client.clientName}</button>)}
      {!filtered.length && <p className="px-3 py-2 text-sm text-slate-500">No matching clients</p>}
    </div>}
  </div>;
}

type Item = {
  itemName: string;
  description?: string;
  quantity: string;
  unitPrice: string;
  productId?: number;
  collectionAmount?: string;
  isPrimary?: boolean;
};
function ClientProductBalanceLine({ item, products, primary }: { item: Item; products: any[]; primary?: any }) {
  const product = item.productId ? products.find(row => Number(row.id) === item.productId) : item.isPrimary ? primary : null;
  if (!product) return null;
  const assigned = Number(product.totalAmount ?? 0);
  const paid = Number(product.paidAmount ?? 0);
  const pending = Math.max(0, assigned - paid);
  return <div className="sm:col-span-5 rounded-lg bg-slate-50 px-3 py-2 text-xs text-slate-600"><div className="flex flex-wrap items-center justify-between gap-2"><span className="font-semibold text-slate-800">{product.productName}</span><span>Assigned {formatRoundedCurrency(assigned)} · Paid {formatRoundedCurrency(paid)} · Pending {formatRoundedCurrency(pending)} · GST {product.gstRate}% {product.gstMode}</span></div></div>;
}
const today = () => new Date().toISOString().slice(0, 10);
const readImageFile = (file: File) =>
  new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
const emptyItem = (): Item => ({
  itemName: "",
  description: "",
  quantity: "1",
  unitPrice: "0",
});
const emptyInvoice = () => ({
  projectId: "",
  clientId: "",
  clientName: "",
  clientAddress: "",
  clientContact: "",
  clientEmail: "",
  clientGst: "",
  invoiceDate: today(),
  dueDate: today(),
  gstRate: "18",
  gstMode: "exclusive" as GstMode,
  notes: "",
  items: [emptyItem()],
});
const emptyReceipt = () => ({
  invoiceId: undefined as number | undefined,
  projectId: "",
  clientId: "",
  clientName: "",
  clientAddress: "",
  clientContact: "",
  clientEmail: "",
  clientGst: "",
  receiptDate: today(),
  paymentDate: today(),
  gstRate: "18",
  gstMode: "exclusive" as GstMode,
  paymentMode: "Bank Transfer" as const,
  transactionReference: "",
  notes: "",
  items: [emptyItem()],
});

function fieldDate(days: number) {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date.toISOString().slice(0, 10);
}
const numberWords = [
  "Zero",
  "One",
  "Two",
  "Three",
  "Four",
  "Five",
  "Six",
  "Seven",
  "Eight",
  "Nine",
  "Ten",
  "Eleven",
  "Twelve",
  "Thirteen",
  "Fourteen",
  "Fifteen",
  "Sixteen",
  "Seventeen",
  "Eighteen",
  "Nineteen",
];
const tensWords = [
  "",
  "",
  "Twenty",
  "Thirty",
  "Forty",
  "Fifty",
  "Sixty",
  "Seventy",
  "Eighty",
  "Ninety",
];
function indianChunkWords(value: number): string {
  if (value < 20) return numberWords[value];
  if (value < 100)
    return (
      tensWords[Math.floor(value / 10)] +
      (value % 10 ? " " + numberWords[value % 10] : "")
    );
  return (
    numberWords[Math.floor(value / 100)] +
    " Hundred" +
    (value % 100 ? " " + indianChunkWords(value % 100) : "")
  );
}
function amountInWords(value: number) {
  if (!Number.isFinite(value) || value <= 0) return "Rupees Zero Only";
  const rounded = Math.round(value * 100) / 100;
  let rupees = Math.floor(rounded);
  const paise = Math.round((rounded - rupees) * 100);
  const parts: string[] = [];
  const crore = Math.floor(rupees / 10000000);
  if (crore) {
    parts.push(indianChunkWords(crore) + " Crore");
    rupees %= 10000000;
  }
  const lakh = Math.floor(rupees / 100000);
  if (lakh) {
    parts.push(indianChunkWords(lakh) + " Lakh");
    rupees %= 100000;
  }
  const thousand = Math.floor(rupees / 1000);
  if (thousand) {
    parts.push(indianChunkWords(thousand) + " Thousand");
    rupees %= 1000;
  }
  if (rupees) parts.push(indianChunkWords(rupees));
  return (
    "Rupees " +
    (parts.join(" ") || "Zero") +
    (paise ? " and " + paise + "/100 Paise" : "") +
    " Only"
  );
}
function cleanGstValue(value: unknown) {
  const text = String(value ?? "").trim();
  return text && !/expertaid|technologies|pvt\.?\s*\.??\s*ltd/i.test(text)
    ? text
    : "Not configured";
}
function readableFieldName(path: string) {
  return path
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, value => value.toUpperCase())
    .replace(/\.\d+/, " item");
}
function mutationErrorMessage(error: any) {
  const fieldErrors = error?.data?.zodError?.fieldErrors;
  if (fieldErrors)
    return Object.entries(fieldErrors)
      .map(
        ([field, messages]) =>
          `${readableFieldName(field)}: ${(messages as string[]).join(", ")}`
      )
      .join(" | ");
  return (
    error?.message || "Please review the highlighted fields and try again."
  );
}
function ValidationSummary({
  errors,
  onReview,
}: {
  errors: Record<string, string>;
  onReview: () => void;
}) {
  const entries = Object.entries(errors);
  if (!entries.length) return null;
  return (
    <div
      role="alert"
      className="sticky top-0 z-20 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-800 shadow-sm"
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="font-semibold">Please correct the following:</p>
          <ul className="mt-1 list-disc space-y-1 pl-5">
            {entries.map(([field, message]) => (
              <li key={field}>{message}</li>
            ))}
          </ul>
        </div>
        <Button
          type="button"
          size="sm"
          variant="outline"
          className="shrink-0 border-rose-300 bg-white text-rose-800 hover:bg-rose-100"
          onClick={onReview}
        >
          Review fields
        </Button>
      </div>
    </div>
  );
}

export function BillingPage({ kind }: { kind: BillingKind }) {
  const isInvoice = kind === "invoice";
  const [location, navigate] = useLocation();
  const invoiceSettings = trpc.invoices.settings.get.useQuery(undefined, {
    enabled: true,
  });
  const quotationSettings = trpc.quotations.settings.get.useQuery(undefined, {
    enabled: isInvoice,
  });
  const receiptSettings = trpc.receipts.settings.get.useQuery(undefined, {
    enabled: !isInvoice,
  });
  const invoices = trpc.invoices.list.useQuery();
  const receipts = trpc.receipts.list.useQuery();
  const clients = trpc.clients.list.useQuery({ page: 1, pageSize: 200 });
  const clientProducts = trpc.clients.allProducts.useQuery();
  const projects = trpc.projects.list.useQuery();
  const updateInvoiceSettings = trpc.invoices.settings.update.useMutation({
    onSuccess: () => {
      invoiceSettings.refetch();
      setSettingsOpen(false);
      toast.success("Invoice defaults saved.");
    },
    onError: error => {
      const message = mutationErrorMessage(error);
      setFormErrors({ form: message });
      toast.error(message);
    },
  });
  const updateReceiptSettings = trpc.receipts.settings.update.useMutation({
    onSuccess: () => {
      receiptSettings.refetch();
      setSettingsOpen(false);
      toast.success("Receipt defaults saved.");
    },
    onError: error => {
      const message = mutationErrorMessage(error);
      setFormErrors({ form: message });
      toast.error(message);
    },
  });
  const createInvoice = trpc.invoices.create.useMutation({
    onSuccess: () => {
      invoices.refetch();
      setCreateOpen(false);
      toast.success("Invoice created.");
    },
    onError: error => {
      const message = mutationErrorMessage(error);
      setFormErrors({ form: message });
      toast.error(message);
    },
  });
  const updateInvoice = trpc.invoices.update.useMutation({
    onSuccess: () => {
      invoices.refetch();
      setCreateOpen(false);
      setEditingInvoiceId(null);
      toast.success("Invoice updated.");
    },
    onError: error => {
      const message = mutationErrorMessage(error);
      setFormErrors({ form: message });
      toast.error(message);
    },
  });
  const updateInvoiceStatus = trpc.invoices.updateStatus.useMutation({
    onSuccess: result => {
      invoices.refetch();
      receipts.refetch();
      if (result?.invoice?.status === "Paid") {
        toast.success("Invoice marked Paid. Complete the receipt details to issue the receipt.");
        navigate(`/receipts?fromInvoice=${result.invoice.id}`);
      } else {
        toast.success("Invoice status updated.");
      }
    },
    onError: error => showMutationError(error),
  });
  const createReceipt = trpc.receipts.create.useMutation({
    onSuccess: receipt => {
      receipts.refetch();
      invoices.refetch();
      setCreateOpen(false);
      setConversionInvoiceId(null);
      toast.success("Receipt created successfully.");
      if (receipt?.receiptNumber) navigate(`/receipts?receipt=${encodeURIComponent(receipt.receiptNumber)}`);
    },
    onError: error => {
      const message = mutationErrorMessage(error);
      setFormErrors({ form: message });
      toast.error(message);
    },
  });
  const updateReceipt = trpc.receipts.update.useMutation({
    onSuccess: () => {
      receipts.refetch();
      setCreateOpen(false);
      setEditingReceiptId(null);
      toast.success("Receipt updated.");
    },
    onError: error => {
      const message = mutationErrorMessage(error);
      setFormErrors({ form: message });
      toast.error(message);
    },
  });
  const deleteInvoice = trpc.invoices.delete.useMutation({
    onSuccess: () => {
      invoices.refetch();
      setSelected(null);
      toast.success("Invoice deleted.");
    },
    onError: error => {
      const message = mutationErrorMessage(error);
      setFormErrors({ form: message });
      toast.error(message);
    },
  });
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [createOpen, setCreateOpen] = useState(false);
  const [selected, setSelected] = useState<any>(null);
  const [editingInvoiceId, setEditingInvoiceId] = useState<number | null>(null);
  const [editingReceiptId, setEditingReceiptId] = useState<number | null>(null);
  const [settingsForm, setSettingsForm] = useState<any>(null);
  const [invoiceForm, setInvoiceForm] = useState(emptyInvoice());
  const [receiptForm, setReceiptForm] = useState(emptyReceipt());
  const [reminderPrefill, setReminderPrefill] = useState(false);
  const [conversionInvoiceId, setConversionInvoiceId] = useState<number | null>(null);
  const [showSuccessfulInvoices, setShowSuccessfulInvoices] = useState(false);
  const [search, setSearch] = useState("");
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  useEffect(() => {
    if (isInvoice || createOpen || !invoices.data) return;
    const invoiceId = Number(new URLSearchParams(window.location.search).get("fromInvoice"));
    if (Number.isInteger(invoiceId) && invoiceId > 0) {
      const invoice = (invoices.data as any[]).find(row => Number(row.id) === invoiceId);
      if (invoice) {
        let items: any[] = [];
        try { items = invoice.itemsJson ? JSON.parse(invoice.itemsJson) : []; } catch { items = []; }
        window.history.replaceState({}, "", "/receipts");
        setConversionInvoiceId(invoice.id);
        setEditingReceiptId(null);
        setReceiptForm({ ...emptyReceipt(), invoiceId: invoice.id, projectId: String(invoice.projectId ?? ""), clientId: String(invoice.clientId ?? ""), clientName: String(invoice.clientName ?? ""), clientAddress: String(invoice.clientAddress ?? ""), clientContact: String(invoice.clientContact ?? ""), clientEmail: String(invoice.clientEmail ?? ""), clientGst: String(invoice.clientGst ?? ""), gstRate: String(invoice.gstRate ?? "18"), gstMode: invoice.gstMode === "inclusive" ? "inclusive" : "exclusive", notes: String(invoice.notes ?? ""), items: items.length ? items.map(item => ({ itemName: String(item.itemName ?? ""), description: String(item.description ?? ""), quantity: String(item.quantity ?? "1"), unitPrice: String(item.unitPrice ?? "0"), productId: item.productId, collectionAmount: item.collectionAmount })) : [emptyItem()] });
        setFormErrors({});
        setCreateOpen(true);
      }
      return;
    }
    if (selected || !receipts.data) return;
    const receiptNumber = new URLSearchParams(window.location.search).get("receipt");
    if (!receiptNumber) return;
    const receipt = (receipts.data as any[]).find((row) => String(row.receiptNumber) === receiptNumber);
    if (receipt) setSelected(receipt);
  }, [isInvoice, location, receipts.data, selected]);
  useEffect(() => {
    if (isInvoice || createOpen || !clients.data || !projects.data) return;
    const params = new URLSearchParams(window.location.search);
    const reminderClient = params.get("reminderClient");
    const reminderAmount = Number(params.get("reminderAmount"));
    if (!reminderClient || !Number.isFinite(reminderAmount) || reminderAmount <= 0) return;
    const options = ((clients.data as any)?.items ?? []) as any[];
    const client = options.filter((row) => matchesClientId(row.clientId, reminderClient)).sort((a, b) => Number(b.id >= 0) - Number(a.id >= 0))[0];
    if (!client) return;
    const productId = Number(params.get("reminderProductId"));
    const itemName = params.get("reminderItem") || "Payment reminder";
    const projectId = params.get("projectId") || String(client.projectId ?? "");
    window.history.replaceState({}, "", "/receipts");
    setReminderPrefill(true);
    setConversionInvoiceId(null);
    setEditingReceiptId(null);
    setFormErrors({});
    setReceiptForm({ ...emptyReceipt(), projectId, clientId: String(client.clientId ?? reminderClient), clientName: String(client.clientName ?? params.get("reminderName") ?? ""), clientAddress: String(client.address ?? ""), clientContact: String(client.contactNumber ?? ""), clientEmail: String(client.email ?? ""), clientGst: String(client.clientGst ?? ""), gstRate: String(client.gstRate ?? "18"), gstMode: "inclusive", items: [{ itemName, description: "Payment collected against reminder", quantity: "1", unitPrice: reminderAmount.toFixed(2), productId: Number.isInteger(productId) && productId > 0 ? productId : undefined, collectionAmount: reminderAmount.toFixed(2) }] });
    setCreateOpen(true);
  }, [clients.data, projects.data, isInvoice, createOpen, location]);
  const clientOptions: any[] = (clients.data as any)?.items ?? [];
  const projectOptions: any[] = (projects.data as any) ?? [];
  const productBalances: any[] = (clientProducts.data as any) ?? [];
  const finalReceiptValue = (row: any) => {
    const client = clientOptions.find((candidate) => String(candidate.clientId ?? "") === String(row.clientId ?? ""));
    const normalized = normalizeCollectionReceipt(row, client, productBalances);
    return Number(normalized.grandTotal ?? row.grandTotal ?? row.amount ?? 0);
  };
  const selectedProjectId = Number(isInvoice ? invoiceForm.projectId : receiptForm.projectId) || 0;
  const selectedProject = projectOptions.find((project: any) => Number(project.id) === selectedProjectId);
  const selectedClient = clientOptions
    .filter((client: any) => String(client.clientId ?? "") === String(isInvoice ? invoiceForm.clientId : receiptForm.clientId) && Number(client.projectId) === selectedProjectId)
    .sort((a: any, b: any) => Number(b.id >= 0) - Number(a.id >= 0))[0];
  const selectedClientProducts = trpc.clients.products.useQuery({ clientId: String(selectedClient?.clientId ?? "") }, { enabled: Boolean(selectedClient?.clientId) });
  const selectedReceiptProducts = trpc.clients.products.useQuery({ clientId: String(selected?.clientId ?? "") }, { enabled: Boolean(selected && !isInvoice && selected.clientId) });
  const filteredClientOptions = selectedProjectId > 0 ? filterProjectClients(clientOptions, selectedProjectId) : [];
  const selectedClientPayment = useMemo<ClientPaymentSummary | null>(() => {
    if (!selectedClient) return null;
    const matches = (row: any) => selectedClient.clientId && row.clientId
      ? String(row.clientId).toLowerCase() === String(selectedClient.clientId).toLowerCase()
      : String(row.clientName ?? "").trim().toLowerCase() === String(selectedClient.clientName ?? "").trim().toLowerCase();
    const clientInvoices = ((invoices.data ?? []) as any[]).filter(matches);
    const clientReceipts = ((receipts.data ?? []) as any[]).filter((row) => matches(row) && row.status !== "Cancelled");
    const receiptInvoiceIds = new Set(clientReceipts.map((row) => row.invoiceId).filter(Boolean));
    const documentPaid = clientReceipts.reduce((sum, row) => sum + Number(row.amount ?? row.grandTotal ?? 0), 0) + clientInvoices.filter((row) => row.status === "Paid" && !receiptInvoiceIds.has(row.id)).reduce((sum, row) => sum + Number(row.grandTotal ?? 0), 0);
    const clientProductRows = Array.isArray(selectedClientProducts.data) ? selectedClientProducts.data : [];
    const primaryTotal = clientPrimaryTotal({ price: selectedClient.price, gstAmount: selectedClient.gstAmount, gstMode: selectedClient.gstMode, totalPrice: selectedClient.totalPrice });
    const productTotal = clientProductRows.reduce((sum, product) => sum + Number(product.totalAmount ?? 0), 0);
    const productPaid = clientProductRows.reduce((sum, product) => sum + Number(product.paidAmount ?? 0), 0);
    const total = primaryTotal + productTotal;
    const paid = clientProductRows.length ? productPaid : documentPaid;
    const due = Math.max(total - paid, 0);
    return { total, paid, due, progress: total > 0 ? Math.min(100, (paid / total) * 100) : 0 };
  }, [selectedClient, selectedClientProducts.data, invoices.data, receipts.data]);
  const primaryProductBalance = useMemo(() => {
    if (!selectedClient || !selectedProject?.isMain) return null;
    const assigned = clientPrimaryTotal({ price: selectedClient.price, gstAmount: selectedClient.gstAmount, gstMode: selectedClient.gstMode, totalPrice: selectedClient.totalPrice });
    if (assigned <= 0) return null;
    const hasAdditionalProducts = Boolean(selectedClientProducts.data?.length);
    const paid = hasAdditionalProducts ? 0 : Number(selectedClientPayment?.paid ?? 0);
    const pricingMode = selectedClient.pricingMode === "package" ? "Package" : "Per Student";
    const taxable = selectedClient.pricingMode === "package"
      ? Number(selectedClient.packagePrice ?? selectedClient.price ?? 0)
      : Number(selectedClient.noOfStudents ?? 0) * Number(selectedClient.perStudentPrice ?? 0);
    return { productName: `ERP Primary · ${pricingMode}`, totalAmount: assigned, paidAmount: paid, gstRate: Number(selectedClient.gstRate ?? 0), gstMode: String(selectedClient.gstMode ?? "exclusive").toLowerCase(), taxable };
  }, [selectedClient, selectedProject?.isMain, selectedClientProducts.data, selectedClientPayment?.paid]);
  const applyProjectToForm = (projectId: string) => {
    const cleared = { projectId, clientId: "", clientName: "", clientAddress: "", clientContact: "", clientEmail: "", clientGst: "" };
    if (isInvoice) setInvoiceForm(current => ({ ...current, ...cleared }));
    else setReceiptForm(current => ({ ...current, ...cleared }));
  };
  const applyClientToForm = (clientId: string) => {
    const client = clientOptions
      .filter((row: any) => matchesClientId(row.clientId, clientId) && Number(row.projectId) === selectedProjectId)
      .sort((a: any, b: any) => Number(b.id >= 0) - Number(a.id >= 0))[0];
    if (!client) return;
    const details = { clientId, projectId: String(client.projectId ?? selectedProjectId), clientName: client.clientName ?? "", clientAddress: client.address ?? "", clientContact: client.contactNumber ?? "", clientEmail: client.email ?? "", clientGst: client.clientGst ?? "", gstRate: String(client.gstRate ?? 18), gstMode: "inclusive" as GstMode };
    if (isInvoice) setInvoiceForm(current => ({ ...current, ...details }));
    else setReceiptForm(current => ({ ...current, ...details }));
  };
  useEffect(() => {
    if (conversionInvoiceId || reminderPrefill) return;
    if (!createOpen || !selectedClient?.clientId || (!selectedClientProducts.data?.length && !primaryProductBalance)) return;
    const clientProductRows = Array.isArray(selectedClientProducts.data) ? selectedClientProducts.data : [];
    const additionalItems = clientProductRows.map(product => {
      const pending = Math.max(0, Number(product.totalAmount ?? 0) - Number(product.paidAmount ?? 0));
      const collection = isInvoice ? pending : formatWholeRupees(pending);
      return {
        itemName: String(product.productName ?? ""),
        description: String(product.description ?? ""),
        quantity: "1",
        unitPrice: String(collection),
        productId: Number(product.id),
        collectionAmount: String(collection),
      };
    });
    const mappedItems = primaryProductBalance
      ? (() => { const pending = Math.max(0, primaryProductBalance.totalAmount - primaryProductBalance.paidAmount); const collection = isInvoice ? pending : formatWholeRupees(pending); return [{ itemName: primaryProductBalance.productName, description: "Primary ERP service", quantity: "1", unitPrice: String(collection), collectionAmount: String(collection), isPrimary: true }, ...additionalItems]; })()
      : additionalItems;
    const gstSource = clientProductRows.find(product => Math.max(0, Number(product.totalAmount ?? 0) - Number(product.paidAmount ?? 0)) > 0) ?? clientProductRows[0] ?? primaryProductBalance;
    if (isInvoice) setInvoiceForm(current => ({ ...current, items: mappedItems }));
    else setReceiptForm(current => ({ ...current, items: mappedItems, gstRate: gstSource ? String(gstSource.gstRate ?? current.gstRate) : current.gstRate, gstMode: "inclusive" }));
  }, [createOpen, selectedClient?.clientId, selectedClientProducts.data, primaryProductBalance, isInvoice, reminderPrefill]);
  useEffect(() => {
    if (!createOpen || !projectOptions.length) return;
    const mainProject = projectOptions.find((project: any) => project.isMain) ?? projectOptions[0];
    const currentProjectId = isInvoice ? invoiceForm.projectId : receiptForm.projectId;
    if (!currentProjectId && mainProject) {
      if (isInvoice && editingInvoiceId) setInvoiceForm(current => ({ ...current, projectId: String(mainProject.id) }));
      else if (!isInvoice && editingReceiptId) setReceiptForm(current => ({ ...current, projectId: String(mainProject.id) }));
      else applyProjectToForm(String(mainProject.id));
    }
  }, [createOpen, projectOptions.length, isInvoice]);
  const showMutationError = (error: any) => {
    const message = mutationErrorMessage(error);
    setFormErrors({ form: message });
    toast.error(message);
  };

  useEffect(() => {
    const source: any = isInvoice ? invoiceSettings.data : receiptSettings.data;
    if (source) setSettingsForm({ ...source });
  }, [isInvoice, invoiceSettings.data, receiptSettings.data]);
  useEffect(() => {
    if (isInvoice && invoiceSettings.data && createOpen)
      setInvoiceForm(current => ({
        ...current,
        dueDate: fieldDate(Number(invoiceSettings.data.defaultDueDays ?? 15)),
        gstRate: String(invoiceSettings.data.gstRate ?? 18),
      }));
  }, [isInvoice, invoiceSettings.data, createOpen]);

  const convertedInvoiceIds = new Set((receipts.data ?? []).map((row: any) => Number(row.invoiceId)).filter((id: number) => Number.isInteger(id) && id > 0));
  const searchedInvoiceRows = (invoices.data ?? []).filter((row: any) => !search || `${row.invoiceNumber} ${row.clientName}`.toLowerCase().includes(search.toLowerCase()));
  const successfulInvoiceRows = searchedInvoiceRows.filter((row: any) => convertedInvoiceIds.has(Number(row.id)) || row.status === "Paid");
  const invoiceRows = searchedInvoiceRows.filter((row: any) => !successfulInvoiceRows.includes(row));
  const receiptRows = (receipts.data ?? []).filter(
    (row: any) =>
      !search ||
      `${row.receiptNumber} ${row.clientName}`
        .toLowerCase()
        .includes(search.toLowerCase())
  );
  const rows = isInvoice ? (showSuccessfulInvoices ? successfulInvoiceRows : invoiceRows) : receiptRows;
  const selectedSignatureUrl = selected
    ? isInvoice
      ? selected.signatureUrl || quotationSettings.data?.signatureUrl
      : invoiceSettings.data?.signatureUrl || selected.signatureUrl || receiptSettings.data?.signatureUrl || quotationSettings.data?.signatureUrl
    : null;
  const selectedReceiptProduct = useMemo(() => {
    if (!selected || isInvoice) return null;
    let items: any[] = [];
    try { items = selected.itemsJson ? JSON.parse(selected.itemsJson) : []; } catch { items = []; }
    return (selectedReceiptProducts.data as any[] | undefined)?.find((product: any) => items.some((item: any) => Number(item.productId) === Number(product.id) || String(item.itemName ?? item.productName ?? "").trim().toLowerCase() === String(product.productName ?? "").trim().toLowerCase())) ?? null;
  }, [isInvoice, selected, selectedReceiptProducts.data]);
  const selectedReceiptRate = !isInvoice && selectedReceiptProduct && Number(selected?.gstRate ?? 0) === 0
    ? Number(selectedReceiptProduct.gstRate ?? 0)
    : Number(selected?.gstRate ?? 0);
  const selectedReceiptMode = !isInvoice && selectedReceiptProduct && Number(selected?.gstRate ?? 0) === 0
    ? selectedReceiptProduct.gstMode
    : selected?.gstMode;
  const selectedReceiptTotals = useMemo(() => {
    if (!selected || isInvoice) return null;
    if (selected.invoiceId && selected.subtotal != null && selected.grandTotal != null) {
      return { subtotal: Number(selected.subtotal), gstAmount: Number(selected.gstAmount ?? 0), grandTotal: Number(selected.grandTotal) };
    }
    let items: any[] = [];
    try { items = selected.itemsJson ? JSON.parse(selected.itemsJson) : [{ itemName: selected.receivedFor, quantity: 1, unitPrice: selected.amount }]; } catch { items = [{ itemName: selected.receivedFor, quantity: 1, unitPrice: selected.amount }]; }
    return calculateQuotationTotals(items.map((item: any) => ({ product: "ERP" as const, itemName: item.itemName || item.productName || "Item", quantity: Number(item.quantity) || 1, unitPrice: Number(item.unitPrice) || 0 })), selectedReceiptRate, selectedReceiptMode === "inclusive" ? "inclusive" : "exclusive");
  }, [isInvoice, selected, selectedReceiptMode, selectedReceiptRate]);
  const selectedInvoiceSubtotal = selected ? Number(selected.subtotal) : 0;
  const selectedInvoiceGst = selected ? Number(selected.gstAmount) : 0;
  const selectedInvoiceTaxable = selected?.gstMode === "inclusive" ? selectedInvoiceSubtotal : selectedInvoiceSubtotal;
  const totalValue = rows.reduce(
    (sum: number, row: any) =>
      sum + Number(isInvoice ? row.grandTotal : finalReceiptValue(row)),
    0
  );
  const invoiceTotals = useMemo(
    () =>
      calculateQuotationTotals(
        invoiceForm.items.map(item => ({
          product: "ERP" as const,
          itemName: item.itemName || "Item",
          quantity: Number(item.quantity) || 0,
          unitPrice: Number(item.unitPrice) || 0,
        })),
        Number(invoiceForm.gstRate) || 0,
        invoiceForm.gstMode
      ),
    [invoiceForm.items, invoiceForm.gstRate, invoiceForm.gstMode]
  );
  const receiptTotals = useMemo(
    () =>
      calculateQuotationTotals(
        receiptForm.items.map(item => ({
          product: "ERP" as const,
          itemName: item.itemName || "Item",
          quantity: Number(item.quantity) || 0,
          unitPrice: Number(item.unitPrice) || 0,
        })),
        Number(receiptForm.gstRate) || 0,
        receiptForm.gstMode
      ),
    [receiptForm.items, receiptForm.gstRate, receiptForm.gstMode]
  );

  const clearSettingsError = (key: string) => {
    setFormErrors(current => {
      const next = { ...current };
      delete next[key];
      delete next.form;
      return next;
    });
  };
  const validateSettings = () => {
    const errors: Record<string, string> = {};
    if (!settingsForm?.companyGst?.trim())
      errors.companyGst = "Company GSTIN / registration is required.";
    if (!settingsForm?.companyAddress?.trim())
      errors.companyAddress = "Company address is required.";
    const prefix =
      settingsForm?.[isInvoice ? "invoicePrefix" : "receiptPrefix"];
    if (!prefix?.trim())
      errors.prefix = `${isInvoice ? "Invoice" : "Receipt"} prefix is required.`;
    const start = Number(
      settingsForm?.[isInvoice ? "invoiceNumberStart" : "receiptNumberStart"]
    );
    if (!Number.isInteger(start) || start < 1)
      errors.numberStart =
        "Starting number must be a whole number of at least 1.";
    if (isInvoice) {
      const rate = Number(settingsForm?.gstRate);
      if (!Number.isFinite(rate) || rate < 0 || rate > 100)
        errors.gstRate = "GST rate must be a number between 0 and 100.";
      const dueDays = Number(settingsForm?.defaultDueDays);
      if (!Number.isInteger(dueDays) || dueDays < 1)
        errors.defaultDueDays =
          "Default due days must be a whole number of at least 1.";
    }
    if (!settingsForm?.terms?.trim())
      errors.terms = "Terms and conditions are required.";
    if (!isInvoice) {
      (settingsForm?.defaultProducts ?? []).forEach((item: any, index: number) => {
        if (!String(item.itemName ?? "").trim())
          errors.defaultProducts = `Default product ${index + 1} needs a product name.`;
        if (!(Number(item.quantity) > 0))
          errors.defaultProducts = `Default product ${index + 1} quantity must be greater than 0.`;
        if (!(Number(item.unitPrice) >= 0))
          errors.defaultProducts = `Default product ${index + 1} rate cannot be negative.`;
      });
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };
  const handleInvoiceAsset = async (
    key: "logoDataUrl" | "scannerDataUrl" | "signatureDataUrl",
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;
    try {
      const dataUrl = await readImageFile(file);
      setSettingsForm((current: any) => ({ ...current, [key]: dataUrl }));
    } catch {
      setFormErrors({
        form: "The selected image could not be read. Please choose it again.",
      });
    }
    event.target.value = "";
  };
  const clearInvoiceAsset = (
    key: "logoDataUrl" | "scannerDataUrl" | "signatureDataUrl"
  ) => setSettingsForm((current: any) => ({ ...current, [key]: null }));
  const saveSettings = () => {
    if (!settingsForm || !validateSettings()) return;
    const { gstMode: _legacyGstMode, ...settingsWithoutGstMode } = settingsForm;
    const base = {
      ...settingsWithoutGstMode,
      id: undefined,
      ownerId: undefined,
      createdAt: undefined,
      updatedAt: undefined,
      invoiceNumberNext: undefined,
      receiptNumberNext: undefined,
    };
    if (isInvoice)
      updateInvoiceSettings.mutate({
        ...base,
        invoiceNumberStart: Number(settingsForm.invoiceNumberStart),
        gstRate: Number(settingsForm.gstRate),
        defaultDueDays: Number(settingsForm.defaultDueDays),
      });
    else
      updateReceiptSettings.mutate({
        ...base,
        receiptNumberStart: Number(settingsForm.receiptNumberStart),
      });
  };
  const openEditInvoice = (row: any) => {
    let items: Item[] = [emptyItem()];
    try {
      items = JSON.parse(row.itemsJson).map((item: any) => ({
        itemName: item.itemName ?? "",
        description: item.description ?? "",
        quantity: String(item.quantity ?? 1),
        unitPrice: String(item.unitPrice ?? 0),
      }));
    } catch {
      setFormErrors({
        form: "This Invoice has invalid line-item data and cannot be edited safely.",
      });
      return;
    }
    const savedClient = clientOptions.find((client: any) => matchesClientId(client.clientId, row.clientId));
    setEditingInvoiceId(Number(row.id));
    setInvoiceForm({
      projectId: row.projectId ?? savedClient?.projectId ?? "",
      clientId: row.clientId ?? "",
      clientName: row.clientName ?? "",
      clientAddress: row.clientAddress ?? "",
      clientContact: row.clientContact ?? "",
      clientEmail: row.clientEmail ?? "",
      clientGst: row.clientGst ?? "",
      invoiceDate: row.invoiceDate ?? today(),
      dueDate: row.dueDate ?? today(),
      gstRate: String(row.gstRate ?? 18),
      gstMode: row.gstMode ?? "exclusive",
      notes: row.notes ?? "",
      items,
    });
    setFormErrors({});
    setCreateOpen(true);
  };
  const openEditReceipt = (row: any) => {
    setEditingReceiptId(Number(row.id));
    setReceiptForm({
      invoiceId: row.invoiceId ?? undefined,
      projectId: row.projectId ?? "",
      clientId: row.clientId ?? "",
      clientName: row.clientName ?? "",
      clientAddress: row.clientAddress ?? "",
      clientContact: row.clientContact ?? "",
      clientEmail: row.clientEmail ?? "",
      clientGst: row.clientGst ?? "",
      receiptDate: row.receiptDate ?? today(),
      paymentDate: row.paymentDate ?? today(),
      gstRate: String(row.gstRate ?? 18),
      gstMode: row.gstMode ?? "exclusive",
      paymentMode: row.paymentMode ?? "Bank Transfer",
      transactionReference: row.transactionReference ?? "",
      notes: row.notes ?? "",
      items: (() => {
        try {
          const parsed = row.itemsJson ? JSON.parse(row.itemsJson) : [];
          return Array.isArray(parsed) && parsed.length
            ? parsed.map((item: any) => ({
                itemName: String(item.itemName ?? ""),
                description: String(item.description ?? ""),
                quantity: String(item.quantity ?? "1"),
                unitPrice: String(item.unitPrice ?? item.collectionAmount ?? "0"),
                productId: item.productId ? Number(item.productId) : undefined,
                collectionAmount: item.collectionAmount != null ? String(item.collectionAmount) : undefined,
              }))
            : [emptyItem()];
        } catch {
          return [emptyItem()];
        }
      })(),
    });
    setFormErrors({});
    setCreateOpen(true);
  };
  const submitCreate = (event: React.FormEvent) => {
    event.preventDefault();
    const errors: Record<string, string> = {};
    const form: any = isInvoice ? invoiceForm : receiptForm;
    if (!form.projectId) errors.projectId = "Select a project first.";
    if (!form.clientId) errors.clientId = "Select a Client ID so payment details link to the client.";
    if (!form.clientName.trim()) errors.clientName = "Client name is required.";
    if (!form.clientAddress.trim())
      errors.clientAddress = "Client address is required.";
    if (isInvoice) {
      if (!form.invoiceDate) errors.invoiceDate = "Invoice date is required.";
      if (!form.dueDate) errors.dueDate = "Due date is required.";
      form.items.forEach((item: Item, index: number) => {
        if (!item.itemName.trim())
          errors[`item.${index}`] =
            `Line item ${index + 1} needs an item name.`;
        if (!(Number(item.quantity) > 0))
          errors[`quantity.${index}`] =
            `Line item ${index + 1} quantity must be greater than 0.`;
        if (!(Number(item.unitPrice) >= 0))
          errors[`unitPrice.${index}`] =
            `Line item ${index + 1} price cannot be negative.`;
      });
    } else {
      if (!form.receiptDate) errors.receiptDate = "Receipt date is required.";
      if (!form.paymentDate) errors.paymentDate = "Payment date is required.";
      if (!(Number(form.gstRate) >= 0) || Number(form.gstRate) > 100)
        errors.gstRate = "GST rate must be between 0 and 100.";
      form.items.forEach((item: Item, index: number) => {
        if (!item.itemName.trim())
          errors[`item.${index}`] = `Line item ${index + 1} needs an item name.`;
        if (!(Number(item.quantity) > 0))
          errors[`quantity.${index}`] = `Line item ${index + 1} quantity must be greater than 0.`;
        if (!(Number(item.unitPrice) >= 0))
          errors[`unitPrice.${index}`] = `Line item ${index + 1} price cannot be negative.`;
      });
    }
    setFormErrors(errors);
    if (Object.keys(errors).length) return;
    if (isInvoice) {
      const payload = {
        ...invoiceForm,
        gstRate: Number(invoiceForm.gstRate),
        items: invoiceForm.items.map(item => ({
          ...item,
          quantity: Number(item.quantity),
          unitPrice: Number(item.unitPrice),
          productId: item.productId,
          collectionAmount: item.productId ? Number(item.collectionAmount ?? item.unitPrice) : undefined,
        })),
      };
      if (editingInvoiceId)
        updateInvoice.mutate({ id: editingInvoiceId, ...payload });
      else createInvoice.mutate(payload);
    } else {
      const payload = {
        ...receiptForm,
        gstRate: Number(receiptForm.gstRate),
        items: receiptForm.items.map(item => ({
          ...item,
          quantity: Number(item.quantity),
          unitPrice: Number(item.unitPrice),
          productId: item.productId,
          collectionAmount: item.productId ? Number(item.collectionAmount ?? item.unitPrice) : undefined,
        })),
      };
      if (editingReceiptId) updateReceipt.mutate({ id: editingReceiptId, ...payload });
      else createReceipt.mutate(payload);
    }
  };
  const openCreate = () => {
    setReminderPrefill(false);
    setSelected(null);
    setEditingInvoiceId(null);
    setEditingReceiptId(null);
    setFormErrors({});
    setInvoiceForm(emptyInvoice());
    const rawDefaultProducts = receiptSettings.data?.defaultProducts ?? (receiptSettings.data as any)?.defaultProductsJson;
    let defaultProducts: any[] = [];
    if (Array.isArray(rawDefaultProducts)) defaultProducts = rawDefaultProducts;
    else if (typeof rawDefaultProducts === "string") {
      try {
        const parsed = JSON.parse(rawDefaultProducts);
        if (Array.isArray(parsed)) defaultProducts = parsed;
      } catch {
        defaultProducts = [];
      }
    }
    setReceiptForm({
      ...emptyReceipt(),
      items: defaultProducts.length
        ? defaultProducts.map((item: any) => ({
            itemName: String(item.itemName ?? ""),
            description: String(item.description ?? ""),
            quantity: String(item.quantity ?? "1"),
            unitPrice: String(item.unitPrice ?? "0"),
          }))
        : [emptyItem()],
    });
    setCreateOpen(true);
  };
  const closeCreateDialog = () => {
    const cameFromInvoice = Boolean(conversionInvoiceId);
    setCreateOpen(false);
    setConversionInvoiceId(null);
    setReminderPrefill(false);
    setEditingInvoiceId(null);
    setEditingReceiptId(null);
    if (cameFromInvoice) navigate("/invoices");
  };
  const printSelected = () => {
    const source = document.getElementById("billing-print");
    if (!selected || !source) return;
    const title = `${isInvoice ? "Invoice" : "Receipt"} ${isInvoice ? selected.invoiceNumber : selected.receiptNumber}`;
    const printWindow = window.open("", "_blank", "width=900,height=1200");
    if (!printWindow) {
      window.print();
      return;
    }
    const headMarkup = document.head.innerHTML;
    printWindow.document
      .write(`<!doctype html><html><head><meta charset="UTF-8"><title>${title}</title>${headMarkup}<style>
      @page { size: A4 portrait; margin: 0; }
      html, body { margin: 0 !important; padding: 0 !important; background: #fff !important; }
      body { display: block !important; }
      #billing-print { box-sizing: border-box !important; display: block !important; width: 794px !important; max-width: 794px !important; min-height: 0 !important; margin: 0 auto !important; padding: 3rem !important; background: #fff !important; color: #172033 !important; overflow: visible !important; box-shadow: none !important; }
      #billing-print .print\\:hidden { display: none !important; }
    </style></head><body>${source.outerHTML}</body></html>`);
    printWindow.document.close();
    printWindow.focus();
    printWindow.onload = () => {
      window.setTimeout(() => {
        printWindow.print();
        printWindow.close();
      }, 250);
    };
  };
  const focusFirstError = () => {
    window.requestAnimationFrame(() => {
      const first = document.querySelector<HTMLElement>(
        "[data-billing-error='true']"
      );
      first?.scrollIntoView({ behavior: "smooth", block: "center" });
      first?.focus();
    });
  };

  return (
    <DashboardLayout>
      <div className="min-h-[calc(100vh-2rem)] bg-[#f7f8fc] -m-3 p-4 text-[#172033] sm:-m-4 sm:p-8 lg:p-10">
        <div className="mx-auto max-w-7xl">
          <header className="mb-8 flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#43239d]">
                Finance workspace
              </p>
              <h1 className="mt-2 font-serif text-[2.7rem] leading-[1.08] tracking-[-0.03em] sm:text-5xl">
                {isInvoice ? (showSuccessfulInvoices ? "Successful invoices" : "Invoices") : "Receipts"}
              </h1>
              <p className="mt-3 text-sm text-slate-500">
                {isInvoice
                  ? "Create GST-ready invoices with a clear payment trail."
                  : "Record customer payments with branded official receipts."}
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button
                variant="outline"
                onClick={() => {
                  setSettingsForm({
                    ...(isInvoice
                      ? invoiceSettings.data
                      : receiptSettings.data),
                  });
                  setFormErrors({});
                  setSettingsOpen(true);
                }}
              >
                <Settings2 className="mr-2 h-4 w-4" />
                Settings
              </Button>
              {isInvoice && <Button variant="outline" onClick={() => setShowSuccessfulInvoices(current => !current)}>{showSuccessfulInvoices ? "Active invoices" : `Successful invoices (${successfulInvoiceRows.length})`}</Button>}
              <Button
                onClick={openCreate}
                className="bg-[#3157d5] text-white hover:bg-[#2748bd]"
              >
                <Plus className="mr-2 h-4 w-4" />
                New {isInvoice ? "invoice" : "receipt"}
              </Button>
            </div>
          </header>
          <div className="mb-8 grid gap-4 md:grid-cols-3">
            <Card className="border-0 shadow-sm">
              <CardContent className="flex items-center justify-between p-6">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
                    Total {isInvoice ? "invoices" : "receipts"}
                  </p>
                  <p className="mt-2 text-3xl font-semibold">{rows.length}</p>
                </div>
                <div className="rounded-2xl bg-indigo-50 p-3 text-indigo-600">
                  {isInvoice ? <FileText /> : <ReceiptIcon />}
                </div>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-sm">
              <CardContent className="flex items-center justify-between p-6">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
                    {isInvoice ? "Outstanding records" : "Issued records"}
                  </p>
                  <p className="mt-2 text-3xl font-semibold">
                    {
                      rows.filter(
                        (row: any) =>
                          row.status !== "Paid" && row.status !== "Cancelled"
                      ).length
                    }
                  </p>
                </div>
                <div className="rounded-2xl bg-amber-50 p-3 text-amber-600">
                  <IndianRupee />
                </div>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-sm">
              <CardContent className="flex items-center justify-between p-6">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
                    Total value
                  </p>
                  <p className="mt-2 text-2xl font-semibold">
                    {formatCurrency(totalValue)}
                  </p>
                </div>
                <div className="rounded-2xl bg-emerald-50 p-3 text-emerald-600">
                  <IndianRupee />
                </div>
              </CardContent>
            </Card>
          </div>
          <Card className="border-0 shadow-sm">
            <CardHeader className="flex flex-col gap-4 border-b border-slate-100 sm:flex-row sm:items-center sm:justify-between">
              <CardTitle className="font-serif text-2xl">
                {showSuccessfulInvoices ? "Successful invoices" : `All ${isInvoice ? "invoices" : "receipts"}`}
              </CardTitle>
              <Input
                value={search}
                onChange={event => setSearch(event.target.value)}
                placeholder={`Search ${isInvoice ? "invoice number or client" : "receipt number or client"}...`}
                className="max-w-sm"
              />
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[760px] text-sm">
                  <thead className="bg-slate-50 text-left text-xs uppercase tracking-wider text-slate-500">
                    <tr>
                      <th className="px-5 py-4">Number</th>
                      <th className="px-5 py-4">Client</th>
                      <th className="px-5 py-4">Date</th>
                      <th className="px-5 py-4">
                        {isInvoice ? "Due date" : "Payment mode"}
                      </th>
                      <th className="px-5 py-4 text-right">Amount</th>
                      <th className="px-5 py-4">Status</th>
                      <th className="px-5 py-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((row: any) => (
                      <tr key={row.id} className="border-t border-slate-100">
                        <td className="px-5 py-4 font-semibold text-[#43239d]">
                          {isInvoice ? row.invoiceNumber : row.receiptNumber}
                        </td>
                        <td className="px-5 py-4">
                          <p className="font-medium">{row.clientName}</p>
                          <p className="text-xs text-slate-500">
                            {row.clientEmail ||
                              row.clientContact ||
                              "No contact"}
                          </p>
                        </td>
                        <td className="px-5 py-4 text-slate-600">
                          {isInvoice ? row.invoiceDate : row.receiptDate}
                        </td>
                        <td className="px-5 py-4 text-slate-600">
                          {isInvoice ? row.dueDate : row.paymentMode}
                        </td>
                        <td className="px-5 py-4 text-right font-semibold">
                          {formatCurrency(
                            Number(isInvoice ? row.grandTotal : finalReceiptValue(row))
                          )}
                        </td>
                        <td className="px-5 py-4">
                          {isInvoice ? (
                            <Select
                              value={row.status}
                              onValueChange={value => {
                                const nextStatus = value as "Draft" | "Due" | "Paid" | "Cancelled";
                                if (nextStatus === "Paid") {
                                  navigate(`/receipts?fromInvoice=${row.id}`);
                                  toast.info("Complete and submit the receipt to finalize this payment.");
                                  return;
                                }
                                updateInvoiceStatus.mutate({ id: row.id, status: nextStatus });
                              }}
                            >
                              <SelectTrigger className="h-8 w-[108px] rounded-full border-indigo-100 bg-indigo-50 px-3 text-xs font-semibold text-[#43239d]">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Draft">Draft</SelectItem>
                                <SelectItem value="Due">Due</SelectItem>
                                <SelectItem value="Paid">Paid</SelectItem>
                                <SelectItem value="Cancelled">Cancelled</SelectItem>
                              </SelectContent>
                            </Select>
                          ) : (
                            <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-[#43239d]">
                              {row.status}
                            </span>
                          )}
                        </td>
                        <td className="px-5 py-4">
                          <div className="flex justify-end gap-2">
                            <Button
                              size="icon"
                              variant="outline"
                              title={`View ${isInvoice ? "invoice" : "receipt"}`}
                              aria-label={`View ${isInvoice ? "invoice" : "receipt"}`}
                              onClick={() => setSelected(row)}
                            >
                              <Eye className="h-4 w-4 text-[#43239d]" />
                            </Button>
                            <Button
                              size="icon"
                              variant="outline"
                              title={`Edit ${isInvoice ? "invoice" : "receipt"}`}
                              aria-label={`Edit ${isInvoice ? "invoice" : "receipt"}`}
                              onClick={() => isInvoice ? openEditInvoice(row) : openEditReceipt(row)}
                            >
                              <Pencil className="h-4 w-4 text-[#43239d]" />
                            </Button>
                            {isInvoice && <Button
                              size="icon"
                              variant="outline"
                              title="Delete invoice"
                              aria-label={`Delete invoice ${row.invoiceNumber}`}
                              onClick={() => {
                                if (window.confirm(`Delete invoice ${row.invoiceNumber}? This cannot be undone.`)) {
                                  deleteInvoice.mutate({ id: row.id });
                                }
                              }}
                            >
                              <X className="h-4 w-4 text-rose-500" />
                            </Button>}
                          </div>
                        </td>
                      </tr>
                    ))}
                    {rows.length === 0 && (
                      <tr>
                        <td
                          colSpan={7}
                          className="px-5 py-16 text-center text-slate-500"
                        >
                          No {isInvoice ? "invoices" : "receipts"} yet. Create
                          the first one to begin.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <Dialog open={settingsOpen} onOpenChange={setSettingsOpen}>
            <DialogContent className="max-h-[92vh] overflow-y-auto bg-white text-[#172033] sm:max-w-3xl">
              <DialogHeader>
                <DialogTitle className="font-serif text-2xl">
                  {isInvoice ? "Invoice" : "Receipt"} defaults
                </DialogTitle>
              </DialogHeader>
              <ValidationSummary
                errors={formErrors}
                onReview={focusFirstError}
              />
              {settingsForm && (
                <div className="grid gap-4 py-2 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <Label>Company GSTIN / registration</Label>
                    <Input
                      data-billing-error={Boolean(formErrors.companyGst)}
                      value={settingsForm.companyGst ?? ""}
                      onChange={e =>
                        setSettingsForm({
                          ...settingsForm,
                          companyGst: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <Label>Company address</Label>
                    <Textarea
                      data-billing-error={Boolean(formErrors.companyAddress)}
                      value={settingsForm.companyAddress ?? ""}
                      onChange={e =>
                        setSettingsForm({
                          ...settingsForm,
                          companyAddress: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div>
                    <Label>
                      {isInvoice ? "Invoice prefix" : "Receipt prefix"}
                    </Label>
                    <Input
                      value={
                        settingsForm[
                          isInvoice ? "invoicePrefix" : "receiptPrefix"
                        ] ?? ""
                      }
                      onChange={e =>
                        setSettingsForm({
                          ...settingsForm,
                          [isInvoice ? "invoicePrefix" : "receiptPrefix"]:
                            e.target.value.toUpperCase(),
                        })
                      }
                    />
                  </div>
                  <div>
                    <Label>Number starts at</Label>
                    <Input
                      data-billing-error={Boolean(formErrors.numberStart)}
                      type="number"
                      min="1"
                      value={
                        settingsForm[
                          isInvoice
                            ? "invoiceNumberStart"
                            : "receiptNumberStart"
                        ] ?? 1
                      }
                      onChange={e => {
                        clearSettingsError("numberStart");
                        setSettingsForm({
                          ...settingsForm,
                          [isInvoice
                            ? "invoiceNumberStart"
                            : "receiptNumberStart"]: Number(e.target.value),
                        });
                      }}
                    />
                  </div>
                  {isInvoice && (
                    <>
                      <div>
                        <Label>Default GST rate (%)</Label>
                        <Input
                          data-billing-error={Boolean(formErrors.gstRate)}
                          type="number"
                          min="0"
                          step="0.01"
                          value={settingsForm.gstRate ?? 18}
                          onChange={e => {
                            clearSettingsError("gstRate");
                            setSettingsForm({
                              ...settingsForm,
                              gstRate: Number(e.target.value),
                            });
                          }}
                        />
                      </div>
                      <div>
                        <Label>Default due days</Label>
                        <Input
                          data-billing-error={Boolean(
                            formErrors.defaultDueDays
                          )}
                          type="number"
                          min="1"
                          value={settingsForm.defaultDueDays ?? 15}
                          onChange={e => {
                            clearSettingsError("defaultDueDays");
                            setSettingsForm({
                              ...settingsForm,
                              defaultDueDays: Number(e.target.value),
                            });
                          }}
                        />
                      </div>
                    </>
                  )}
                  {isInvoice && (
                    <>
                      <div>
                        <Label>Account company name</Label>
                        <Input
                          value={settingsForm.accountCompanyName ?? ""}
                          onChange={e =>
                            setSettingsForm({
                              ...settingsForm,
                              accountCompanyName: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div>
                        <Label>Account number</Label>
                        <Input
                          value={settingsForm.accountNumber ?? ""}
                          onChange={e =>
                            setSettingsForm({
                              ...settingsForm,
                              accountNumber: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div>
                        <Label>IFSC code</Label>
                        <Input
                          value={settingsForm.accountIfsc ?? ""}
                          onChange={e =>
                            setSettingsForm({
                              ...settingsForm,
                              accountIfsc: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div>
                        <Label>Branch</Label>
                        <Input
                          value={settingsForm.accountBranch ?? ""}
                          onChange={e =>
                            setSettingsForm({
                              ...settingsForm,
                              accountBranch: e.target.value,
                            })
                          }
                        />
                      </div>
                    </>
                  )}
                  <div className="sm:col-span-2">
                    <Label>Default terms</Label>
                    <Textarea
                      data-billing-error={Boolean(formErrors.terms)}
                      value={settingsForm.terms ?? ""}
                      onChange={e =>
                        setSettingsForm({
                          ...settingsForm,
                          terms: e.target.value,
                        })
                      }
                    />
                  </div>
                  {!isInvoice && (
                    <>
                      <div className="sm:col-span-2 rounded-xl border border-[#d7d0ff] bg-[#faf9ff] p-4">
                        <div className="flex items-center justify-between gap-3">
                          <div>
                            <p className="text-sm font-semibold text-[#43239d]">Default Receipt products</p>
                            <p className="mt-1 text-xs text-slate-500">These products are loaded automatically when you create a new Receipt.</p>
                          </div>
                          <Button
                            type="button"
                            size="sm"
                            variant="outline"
                            onClick={() =>
                              setSettingsForm({
                                ...settingsForm,
                                defaultProducts: [
                                  ...(settingsForm.defaultProducts ?? []),
                                  { itemName: "", description: "", quantity: 1, unitPrice: 0 },
                                ],
                              })
                            }
                          >
                            <Plus className="mr-1 h-4 w-4" /> Add product
                          </Button>
                        </div>
                        <div className="mt-4 space-y-3">
                          {(settingsForm.defaultProducts ?? []).map((item: any, index: number) => (
                            <div key={`receipt-default-${index}`} className="grid gap-2 rounded-lg border border-slate-200 bg-white p-3 sm:grid-cols-[1.4fr_1.2fr_90px_120px_auto]">
                              <Input
                                placeholder="Product name"
                                value={item.itemName ?? ""}
                                onChange={e =>
                                  setSettingsForm({
                                    ...settingsForm,
                                    defaultProducts: settingsForm.defaultProducts.map((current: any, itemIndex: number) =>
                                      itemIndex === index ? { ...current, itemName: e.target.value } : current
                                    ),
                                  })
                                }
                              />
                              <Input
                                placeholder="Description"
                                value={item.description ?? ""}
                                onChange={e =>
                                  setSettingsForm({
                                    ...settingsForm,
                                    defaultProducts: settingsForm.defaultProducts.map((current: any, itemIndex: number) =>
                                      itemIndex === index ? { ...current, description: e.target.value } : current
                                    ),
                                  })
                                }
                              />
                              <Input
                                type="number"
                                min="0.01"
                                step="0.01"
                                placeholder="Qty"
                                value={item.quantity ?? 1}
                                onChange={e =>
                                  setSettingsForm({
                                    ...settingsForm,
                                    defaultProducts: settingsForm.defaultProducts.map((current: any, itemIndex: number) =>
                                      itemIndex === index ? { ...current, quantity: e.target.value } : current
                                    ),
                                  })
                                }
                              />
                              <Input
                                type="number"
                                min="0"
                                step="0.01"
                                placeholder="Rate"
                                value={item.unitPrice ?? 0}
                                onChange={e =>
                                  setSettingsForm({
                                    ...settingsForm,
                                    defaultProducts: settingsForm.defaultProducts.map((current: any, itemIndex: number) =>
                                      itemIndex === index ? { ...current, unitPrice: e.target.value } : current
                                    ),
                                  })
                                }
                              />
                              <Button
                                type="button"
                                size="icon"
                                variant="outline"
                                aria-label={`Remove default product ${index + 1}`}
                                onClick={() =>
                                  setSettingsForm({
                                    ...settingsForm,
                                    defaultProducts: settingsForm.defaultProducts.filter((_: any, itemIndex: number) => itemIndex !== index),
                                  })
                                }
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          ))}
                          {!(settingsForm.defaultProducts ?? []).length && (
                            <p className="rounded-lg border border-dashed border-slate-300 px-3 py-4 text-center text-xs text-slate-500">No default products configured.</p>
                          )}
                        </div>
                      </div>
                      <div className="sm:col-span-2 rounded-xl border border-[#d7d0ff] bg-[#faf9ff] p-4">
                        <p className="text-sm font-semibold text-[#43239d]">Receipt reference configuration</p>
                        <p className="mt-1 text-xs text-slate-500">These values control the footer and QR caption shown on the reference-style Receipt.</p>
                        <div className="mt-4 grid gap-4 sm:grid-cols-2">
                          <div><Label>Footer company line</Label><Input value={settingsForm.footerCompanyName ?? ""} onChange={e => setSettingsForm({ ...settingsForm, footerCompanyName: e.target.value })} placeholder="FOR EXPERTAID TECHNOLOGIES PVT LTD." /></div>
                          <div><Label>QR caption</Label><Input value={settingsForm.qrLabel ?? ""} onChange={e => setSettingsForm({ ...settingsForm, qrLabel: e.target.value })} placeholder="SCAN & PAY" /></div>
                          <div className="sm:col-span-2"><Label>Thank-you footer message</Label><Input value={settingsForm.footerMessage ?? ""} onChange={e => setSettingsForm({ ...settingsForm, footerMessage: e.target.value })} placeholder="Thank you for your business!" /></div>
                        </div>
                      </div>
                    </>
                  )}
                  {isInvoice && (
                    <div className="sm:col-span-2 rounded-xl border border-slate-200 bg-slate-50 p-4">
                      <p className="text-sm font-semibold text-slate-700">
                        Invoice document assets
                      </p>
                      <p className="mt-1 text-xs text-slate-500">
                        These settings control the logo, QR/UPI scanner, and
                        authorised signature shown on every new Invoice.
                      </p>
                      <div className="mt-4 grid gap-4 sm:grid-cols-3">
                        <div>
                          <Label>Invoice logo</Label>
                          <Input
                            type="file"
                            accept="image/*"
                            onChange={e => handleInvoiceAsset("logoDataUrl", e)}
                          />
                          {(settingsForm.logoDataUrl ||
                            settingsForm.logoUrl) && (
                            <img
                              src={
                                settingsForm.logoDataUrl || settingsForm.logoUrl
                              }
                              alt="Invoice logo preview"
                              className="mt-2 h-12 w-24 object-contain"
                            />
                          )}
                          <Button
                            type="button"
                            size="sm"
                            variant="ghost"
                            onClick={() => clearInvoiceAsset("logoDataUrl")}
                          >
                            Remove
                          </Button>
                        </div>
                        <div>
                          <Label>QR / UPI scanner</Label>
                          <Input
                            type="file"
                            accept="image/*"
                            onChange={e =>
                              handleInvoiceAsset("scannerDataUrl", e)
                            }
                          />
                          {(settingsForm.scannerDataUrl ||
                            settingsForm.scannerUrl) && (
                            <img
                              src={
                                settingsForm.scannerDataUrl ||
                                settingsForm.scannerUrl
                              }
                              alt="Invoice QR preview"
                              className="mt-2 h-20 w-20 object-contain"
                            />
                          )}
                          <Button
                            type="button"
                            size="sm"
                            variant="ghost"
                            onClick={() => clearInvoiceAsset("scannerDataUrl")}
                          >
                            Remove
                          </Button>
                        </div>
                        <div>
                          <Label>Authorised signature</Label>
                          <Input
                            type="file"
                            accept="image/*"
                            onChange={e =>
                              handleInvoiceAsset("signatureDataUrl", e)
                            }
                          />
                          {(settingsForm.signatureDataUrl ||
                            settingsForm.signatureUrl) && (
                            <img
                              src={
                                settingsForm.signatureDataUrl ||
                                settingsForm.signatureUrl
                              }
                              alt="Invoice signature preview"
                              className="mt-2 h-12 w-24 object-contain"
                            />
                          )}
                          <Button
                            type="button"
                            size="sm"
                            variant="ghost"
                            onClick={() =>
                              clearInvoiceAsset("signatureDataUrl")
                            }
                          >
                            Remove
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                  <div className="flex justify-end gap-3 sm:col-span-2">
                    <Button
                      variant="outline"
                      onClick={() => setSettingsOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button onClick={saveSettings}>Save defaults</Button>
                  </div>
                </div>
              )}
            </DialogContent>
          </Dialog>

          <Dialog open={createOpen} onOpenChange={open => { if (!open) closeCreateDialog(); }}>
            <DialogContent className="max-h-[92vh] overflow-y-auto bg-white text-[#172033] sm:max-w-4xl">
              <DialogHeader>
                <DialogTitle className="font-serif text-2xl">
                  {editingInvoiceId
                    ? "Edit invoice"
                    : editingReceiptId
                      ? "Edit receipt"
                      : `New ${isInvoice ? "invoice" : "receipt"}`}
                </DialogTitle>
              </DialogHeader>
              {conversionInvoiceId && <div className="rounded-xl border border-indigo-200 bg-indigo-50 px-4 py-3 text-sm text-indigo-900"><strong>Receipt completion for Paid invoice</strong><p className="mt-1 text-xs text-indigo-700">Client and invoice details are prefilled. Add or correct the payment mode, payment date, transaction reference, and any other missing receipt information before issuing it.</p></div>}
              <ValidationSummary
                errors={formErrors}
                onReview={focusFirstError}
              />
              {isInvoice ? (
                <form
                  onSubmit={submitCreate}
                  className="billing-form grid gap-4 sm:grid-cols-2"
                >
                  <div className="sm:col-span-2 grid gap-3 sm:grid-cols-2">
                    <div>
                      <Label>Project</Label>
                      <select className="mt-1 h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50" value={invoiceForm.projectId || "none"} onChange={event => applyProjectToForm(event.target.value === "none" ? "" : event.target.value)}>
                        <option value="none">Select project</option>
                        {projectOptions.map((project: any) => <option key={project.id} value={String(project.id)}>{project.name}{project.isMain ? " (ERP)" : ""}</option>)}
                      </select>
                      {selectedProject && <p className="mt-1 text-xs text-slate-500">Client IDs for {selectedProject.name} only.</p>}
                    </div>
                    <div>
                      <Label>Client ID</Label>
                      <ClientSearchSelect clients={filteredClientOptions} value={invoiceForm.clientId} onChange={applyClientToForm} disabled={!selectedProjectId} />
                    </div>
                  </div>
                  {selectedClientPayment && <ClientPaymentSummaryPanel summary={selectedClientPayment} />}
                  <div>
                    <Label>Client name</Label>
                    <Input
                      required
                      value={invoiceForm.clientName}
                      onChange={e =>
                        setInvoiceForm({
                          ...invoiceForm,
                          clientName: e.target.value,
                        })
                      }
                      placeholder="Expertaid Technologies"
                    />
                  </div>
                  <div>
                    <Label>Client GSTIN</Label>
                    <Input
                      value={invoiceForm.clientGst}
                      onChange={e =>
                        setInvoiceForm({
                          ...invoiceForm,
                          clientGst: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <Label>Client address</Label>
                    <Textarea
                      required
                      value={invoiceForm.clientAddress}
                      onChange={e =>
                        setInvoiceForm({
                          ...invoiceForm,
                          clientAddress: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div>
                    <Label>Contact number</Label>
                    <Input
                      value={invoiceForm.clientContact}
                      onChange={e =>
                        setInvoiceForm({
                          ...invoiceForm,
                          clientContact: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div>
                    <Label>Email</Label>
                    <Input
                      type="email"
                      value={invoiceForm.clientEmail}
                      onChange={e =>
                        setInvoiceForm({
                          ...invoiceForm,
                          clientEmail: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div>
                    <Label>Invoice date</Label>
                    <Input
                      type="date"
                      required
                      value={invoiceForm.invoiceDate}
                      onChange={e =>
                        setInvoiceForm({
                          ...invoiceForm,
                          invoiceDate: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div>
                    <Label>Due date</Label>
                    <Input
                      type="date"
                      required
                      value={invoiceForm.dueDate}
                      onChange={e =>
                        setInvoiceForm({
                          ...invoiceForm,
                          dueDate: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div>
                    <Label>GST rate (%)</Label>
                    <Input
                      type="number"
                      min="0"
                      step="0.01"
                      value={invoiceForm.gstRate}
                      onChange={e =>
                        setInvoiceForm({
                          ...invoiceForm,
                          gstRate: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div>
                    <Label>GST mode</Label>
                    <Select
                      value={invoiceForm.gstMode}
                      onValueChange={(value: GstMode) =>
                        setInvoiceForm({ ...invoiceForm, gstMode: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="exclusive">GST exclusive</SelectItem>
                        <SelectItem value="inclusive">GST inclusive</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-3 sm:col-span-2">
                    <div className="flex items-center justify-between">
                      <Label>Line items</Label>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() =>
                          setInvoiceForm({
                            ...invoiceForm,
                            items: [...invoiceForm.items, emptyItem()],
                          })
                        }
                      >
                        <Plus className="mr-2 h-4 w-4" />
                        Add item
                      </Button>
                    </div>
                    {invoiceForm.items.map((item, index) => (
                      <div
                        key={index}
                        className="grid gap-2 rounded-xl border border-slate-200 p-3 sm:grid-cols-[1fr_1fr_100px_140px_40px]"
                      >
                        <ClientProductBalanceLine item={item} products={(selectedClientProducts.data as any[]) ?? []} primary={primaryProductBalance} />
                        <Input
                          required
                          placeholder="Item name"
                          value={item.itemName}
                          onChange={e =>
                            setInvoiceForm({
                              ...invoiceForm,
                              items: invoiceForm.items.map(
                                (current, itemIndex) =>
                                  itemIndex === index
                                    ? { ...current, itemName: e.target.value }
                                    : current
                              ),
                            })
                          }
                        />
                        <Input
                          placeholder="Description"
                          value={item.description}
                          onChange={e =>
                            setInvoiceForm({
                              ...invoiceForm,
                              items: invoiceForm.items.map(
                                (current, itemIndex) =>
                                  itemIndex === index
                                    ? {
                                        ...current,
                                        description: e.target.value,
                                      }
                                    : current
                              ),
                            })
                          }
                        />
                        <Input
                          required
                          type="number"
                          min="0.01"
                          step="0.01"
                          placeholder="Qty"
                          value={item.quantity}
                          onChange={e =>
                            setInvoiceForm({
                              ...invoiceForm,
                              items: invoiceForm.items.map(
                                (current, itemIndex) =>
                                  itemIndex === index
                                    ? { ...current, quantity: e.target.value }
                                    : current
                              ),
                            })
                          }
                        />
                        <Input
                          required
                          type="number"
                          min="0"
                          step="0.01"
                          placeholder={item.productId ? "Collection amount" : "Rate"}
                          value={item.unitPrice}
                          onChange={e =>
                            setInvoiceForm({
                              ...invoiceForm,
                              items: invoiceForm.items.map(
                                (current, itemIndex) =>
                                  itemIndex === index
                                    ? { ...current, unitPrice: e.target.value, collectionAmount: current.productId ? e.target.value : current.collectionAmount }
                                    : current
                              ),
                            })
                          }
                        />
                        <Button
                          type="button"
                          size="icon"
                          variant="outline"
                          disabled={invoiceForm.items.length === 1}
                          onClick={() =>
                            setInvoiceForm({
                              ...invoiceForm,
                              items: invoiceForm.items.filter(
                                (_, itemIndex) => itemIndex !== index
                              ),
                            })
                          }
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                  <div className="rounded-xl bg-indigo-50 p-4 text-right text-sm sm:col-span-2">
                    {invoiceForm.gstMode === "inclusive" ? (
                      <>
                        <p>
                          Taxable value:{" "}
                          <strong>
                            {formatCurrency(
                              invoiceTotals.subtotal
                            )}
                          </strong>
                        </p>
                        <p>
                          Included GST ({invoiceForm.gstRate}%):{" "}
                          <strong>
                            {formatCurrency(invoiceTotals.gstAmount)}
                          </strong>
                        </p>
                        <p className="mt-1 text-xs text-slate-600">
                          The line-item prices already include GST.
                        </p>
                        <p className="text-lg text-indigo-800">
                          Total including GST:{" "}
                          <strong>
                            {formatCurrency(invoiceTotals.grandTotal)}
                          </strong>
                        </p>
                      </>
                    ) : (
                      <>
                        <p>
                          Subtotal:{" "}
                          <strong>
                            {formatCurrency(invoiceTotals.subtotal)}
                          </strong>
                        </p>
                        <p>
                          GST ({invoiceForm.gstRate}%):{" "}
                          <strong>
                            {formatCurrency(invoiceTotals.gstAmount)}
                          </strong>
                        </p>
                        <p className="text-lg text-indigo-800">
                          Total including GST:{" "}
                          <strong>
                            {formatCurrency(invoiceTotals.grandTotal)}
                          </strong>
                        </p>
                      </>
                    )}
                  </div>
                  <div className="sm:col-span-2">
                    <Label>Notes</Label>
                    <Textarea
                      value={invoiceForm.notes}
                      onChange={e =>
                        setInvoiceForm({
                          ...invoiceForm,
                          notes: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="flex justify-end gap-3 sm:col-span-2">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setCreateOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button type="submit">
                      {editingInvoiceId
                        ? "Save invoice changes"
                        : "Create invoice"}
                    </Button>
                  </div>
                </form>
              ) : (
                <form
                  onSubmit={submitCreate}
                  className="billing-form grid gap-4 sm:grid-cols-2"
                >
                  <div className="sm:col-span-2 grid gap-3 sm:grid-cols-2">
                    <div>
                      <Label>Project</Label>
                      <select className="mt-1 h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50" value={receiptForm.projectId || "none"} onChange={event => applyProjectToForm(event.target.value === "none" ? "" : event.target.value)}>
                        <option value="none">Select project</option>
                        {projectOptions.map((project: any) => <option key={project.id} value={String(project.id)}>{project.name}{project.isMain ? " (ERP)" : ""}</option>)}
                      </select>
                      {selectedProject && <p className="mt-1 text-xs text-slate-500">Client IDs for {selectedProject.name} only.</p>}
                    </div>
                    <div>
                      <Label>Client ID</Label>
                      <ClientSearchSelect clients={filteredClientOptions} value={receiptForm.clientId} onChange={applyClientToForm} disabled={!selectedProjectId} />
                    </div>
                  </div>
                  {selectedClientPayment && <ClientPaymentSummaryPanel summary={selectedClientPayment} />}
                  <div>
                    <Label>Client name</Label>
                    <Input
                      required
                      value={receiptForm.clientName}
                      onChange={e =>
                        setReceiptForm({
                          ...receiptForm,
                          clientName: e.target.value,
                        })
                      }
                      placeholder="Expertaid Technologies"
                    />
                  </div>
                  <div>
                    <Label>Email</Label>
                    <Input
                      type="email"
                      value={receiptForm.clientEmail}
                      onChange={e =>
                        setReceiptForm({
                          ...receiptForm,
                          clientEmail: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div>
                    <Label>Client GST No. (optional)</Label>
                    <Input
                      value={receiptForm.clientGst}
                      onChange={e =>
                        setReceiptForm({
                          ...receiptForm,
                          clientGst: e.target.value,
                        })
                      }
                      placeholder="Optional GSTIN"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <Label>Client address</Label>
                    <Textarea
                      required
                      value={receiptForm.clientAddress}
                      onChange={e =>
                        setReceiptForm({
                          ...receiptForm,
                          clientAddress: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div>
                    <Label>Contact number</Label>
                    <Input
                      value={receiptForm.clientContact}
                      onChange={e =>
                        setReceiptForm({
                          ...receiptForm,
                          clientContact: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div>
                    <Label>GST rate (%)</Label>
                    <Input
                      data-billing-error={Boolean(formErrors.gstRate)}
                      required
                      type="number"
                      min="0"
                      max="100"
                      step="0.01"
                      value={receiptForm.gstRate}
                      onChange={e =>
                        setReceiptForm({
                          ...receiptForm,
                          gstRate: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div>
                    <Label>GST calculation</Label>
                    <Select
                      value={receiptForm.gstMode}
                      onValueChange={(value: GstMode) =>
                        setReceiptForm({ ...receiptForm, gstMode: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="exclusive">GST exclusive</SelectItem>
                        <SelectItem value="inclusive">GST inclusive</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Receipt date</Label>
                    <Input
                      required
                      type="date"
                      value={receiptForm.receiptDate}
                      onChange={e =>
                        setReceiptForm({
                          ...receiptForm,
                          receiptDate: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div>
                    <Label>Payment date</Label>
                    <Input
                      required
                      type="date"
                      value={receiptForm.paymentDate}
                      onChange={e =>
                        setReceiptForm({
                          ...receiptForm,
                          paymentDate: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="sm:col-span-2 rounded-xl border border-[#d7d0ff] bg-[#faf9ff] p-4">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <Label>Receipt products</Label>
                        <p className="mt-1 text-xs text-slate-500">Add all products or services covered by this Receipt.</p>
                      </div>
                      <Button
                        type="button"
                        size="sm"
                        variant="outline"
                        onClick={() =>
                          setReceiptForm({
                            ...receiptForm,
                            items: [...receiptForm.items, emptyItem()],
                          })
                        }
                      >
                        <Plus className="mr-1 h-4 w-4" /> Add item
                      </Button>
                    </div>
                    <div className="mt-4 space-y-3">
                      {receiptForm.items.map((item, index) => (
                        <div key={`receipt-item-form-${index}`} className="grid gap-2 rounded-lg border border-slate-200 bg-white p-3 sm:grid-cols-[1.4fr_1.2fr_90px_120px_auto]">
                          <ClientProductBalanceLine item={item} products={(selectedClientProducts.data as any[]) ?? []} primary={primaryProductBalance} />
                          <Input
                            data-billing-error={Boolean(formErrors[`item.${index}`])}
                            required
                            placeholder="Product name"
                            value={item.itemName}
                            onChange={e =>
                              setReceiptForm({
                                ...receiptForm,
                                items: receiptForm.items.map((current, itemIndex) =>
                                  itemIndex === index ? { ...current, itemName: e.target.value } : current
                                ),
                              })
                            }
                          />
                          <Input
                            placeholder="Description"
                            value={item.description ?? ""}
                            onChange={e =>
                              setReceiptForm({
                                ...receiptForm,
                                items: receiptForm.items.map((current, itemIndex) =>
                                  itemIndex === index ? { ...current, description: e.target.value } : current
                                ),
                              })
                            }
                          />
                          <Input
                            data-billing-error={Boolean(formErrors[`quantity.${index}`])}
                            required
                            type="number"
                            min="0.01"
                            step="0.01"
                            placeholder="Qty"
                            value={item.quantity}
                            onChange={e =>
                              setReceiptForm({
                                ...receiptForm,
                                items: receiptForm.items.map((current, itemIndex) =>
                                  itemIndex === index ? { ...current, quantity: e.target.value } : current
                                ),
                              })
                            }
                          />
                          <Input
                            data-billing-error={Boolean(formErrors[`unitPrice.${index}`])}
                            required
                            type="number"
                            min="0"
                            step="0.01"
                            placeholder={item.productId ? "Collection amount" : "Rate"}
                            value={item.unitPrice}
                            onChange={e =>
                              setReceiptForm({
                                ...receiptForm,
                                items: receiptForm.items.map((current, itemIndex) =>
                                  itemIndex === index ? { ...current, unitPrice: e.target.value, collectionAmount: current.productId ? e.target.value : current.collectionAmount } : current
                                ),
                              })
                            }
                          />
                          <Button
                            type="button"
                            size="icon"
                            variant="outline"
                            disabled={receiptForm.items.length === 1}
                            aria-label={`Remove Receipt item ${index + 1}`}
                            onClick={() =>
                              setReceiptForm({
                                ...receiptForm,
                                items: receiptForm.items.filter((_, itemIndex) => itemIndex !== index),
                              })
                            }
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                    <div className="mt-3 grid gap-1 text-right text-sm text-slate-700">
                      <p>Product value: <strong>{formatCurrency(receiptTotals.subtotal)}</strong></p>
                      <p>GST ({receiptForm.gstRate}% · {receiptForm.gstMode === "inclusive" ? "Inclusive" : "Exclusive"}): <strong>{formatCurrency(receiptTotals.gstAmount)}</strong></p>
                      <p className="text-base text-[#43239d]">Grand total: <strong>{formatCurrency(receiptTotals.grandTotal)}</strong></p>
                    </div>
                  </div>
                  <div className="grid gap-4 sm:col-span-2 sm:grid-cols-2">
                    <div>
                      <Label>Payment mode</Label>
                      <Select
                        value={receiptForm.paymentMode}
                        onValueChange={(value: any) =>
                          setReceiptForm({ ...receiptForm, paymentMode: value })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {["Cash", "UPI", "Bank Transfer", "Card", "Cheque", "Other"].map(value => (
                            <SelectItem key={value} value={value}>{value}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Transaction reference</Label>
                      <Input
                        value={receiptForm.transactionReference}
                        onChange={e =>
                          setReceiptForm({
                            ...receiptForm,
                            transactionReference: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                  <div className="sm:col-span-2">
                    <Label>Notes</Label>
                    <Textarea
                      value={receiptForm.notes}
                      onChange={e =>
                        setReceiptForm({
                          ...receiptForm,
                          notes: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="flex justify-end gap-3 sm:col-span-2">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={closeCreateDialog}
                    >
                      Cancel
                    </Button>
                    <Button type="submit">{editingReceiptId ? "Save receipt changes" : "Create receipt"}</Button>
                  </div>
                </form>
              )}
            </DialogContent>
          </Dialog>

          <Dialog
            open={Boolean(selected)}
            onOpenChange={open => {
              if (open) return;
              setSelected(null);
              const params = new URLSearchParams(window.location.search);
              if (!params.has("receipt")) return;
              navigate(buildReceiptClosePath(window.location.search));
            }}
          >
            <DialogContent className="max-h-[92vh] w-[min(900px,calc(100vw-2rem))] !max-w-none overflow-y-auto bg-slate-50 p-4 sm:p-8">
              <DialogHeader className="print:hidden">
                <DialogTitle>
                  {isInvoice ? "Invoice" : "Receipt"} preview
                </DialogTitle>
              </DialogHeader>
              {selected && (
                <div
                  id="billing-print"
                  className="billing-document mx-auto mt-3 max-w-[794px] bg-white p-6 text-[#172033] shadow-sm sm:p-12"
                >
                  {isInvoice ? (
                    <>
                      <div className="rounded-none border-0 bg-white p-0 shadow-none sm:p-0">
                        <div className="grid gap-4 sm:grid-cols-[minmax(260px,1.15fr)_minmax(180px,0.85fr)_minmax(220px,1fr)] sm:items-stretch">
                          <div className="flex min-w-0 items-center gap-4 sm:pr-4">
                            {selected.logoUrl ||
                            (isInvoice
                              ? invoiceSettings.data?.logoUrl
                              : receiptSettings.data?.logoUrl || invoiceSettings.data?.logoUrl || quotationSettings.data?.logoUrl) ? (
                              <img
                                src={
                                  selected.logoUrl ||
                                  (isInvoice
                                    ? invoiceSettings.data?.logoUrl
                                    : receiptSettings.data?.logoUrl || invoiceSettings.data?.logoUrl || quotationSettings.data?.logoUrl)
                                }
                                className="h-24 w-52 shrink-0 object-contain"
                                alt="Expertaid logo"
                              />
                            ) : (
                              <div className="h-24 w-52 shrink-0 rounded-lg bg-[#f0efff]" />
                            )}
                          </div>
                          <div className="border-y border-slate-200 py-3 text-xs text-slate-600 sm:border-y-0 sm:border-x sm:px-5">
                            <p className="font-bold uppercase tracking-wider text-[#43239d]">
                              GST No.
                            </p>
                            <p className="mt-2 break-words">
                              {cleanGstValue(
                                isInvoice
                                  ? invoiceSettings.data?.companyGst ||
                                      selected.companyGst
                                  : receiptSettings.data?.companyGst ||
                                      invoiceSettings.data?.companyGst ||
                                      selected.companyGst
                              )}
                            </p>
                            <p className="mt-3 font-bold uppercase tracking-wider text-[#43239d]">
                              Address
                            </p>
                            <p className="mt-2 whitespace-pre-line">
                              {(isInvoice
                                ? invoiceSettings.data?.companyAddress
                                : receiptSettings.data?.companyAddress ||
                                  invoiceSettings.data?.companyAddress ||
                                  selected.companyAddress) ||
                                "Not configured"}
                            </p>
                          </div>
                          <div data-document-header="date-payment-only" className="rounded-xl bg-gradient-to-br from-[#43239d] via-[#4d35ad] to-[#3157d5] px-4 py-4 text-white shadow-sm">
                            <p className="text-xl font-bold uppercase tracking-wide">
                              {isInvoice ? "Invoice" : "Receipt"}
                            </p>
                            <p className="mt-1 text-lg font-semibold">
                              #
                              {isInvoice
                                ? selected.invoiceNumber
                                : selected.receiptNumber}
                            </p>
                            <div className="mt-3 grid grid-cols-2 gap-3 border-t border-white/40 pt-3 text-[10px] uppercase tracking-wide">
                              <div>
                                <p className="opacity-75">{isInvoice ? "Invoice date" : "Receipt date"}</p>
                                <p className="mt-1 text-xs font-bold normal-case">{isInvoice ? selected.invoiceDate : selected.receiptDate}</p>
                              </div>
                              <div>
                                <p className="opacity-75">{isInvoice ? "Due date" : "Payment mode"}</p>
                                <p className="mt-1 text-xs font-bold normal-case">{isInvoice ? selected.dueDate : selected.paymentMode}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        className={`relative mt-6 overflow-hidden rounded-2xl border-2 bg-white shadow-[0_2px_8px_rgba(30,45,80,0.04)] ${isInvoice ? "border-[#d7d0ff]" : "border-slate-200"}`}
                      >
                        <div
                          className={`relative flex min-w-0 items-center gap-4 ${isInvoice ? "border-b border-[#d7d0ff] bg-[#faf9ff] px-5 py-3" : "bg-[#faf9ff] p-5 sm:border-r sm:border-slate-200"}`}
                        >
                          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-[#f0efff] text-[#43239d]">
                            <FileText className="h-6 w-6" />
                          </div>
                          <p className="shrink-0 text-[10px] font-bold uppercase tracking-wider text-[#43239d]">
                            {isInvoice ? "Billed to" : "Billed to"}
                          </p>
                          <p className="min-w-0 truncate text-sm font-bold text-[#2f236d]">
                            {selected.clientName || "—"}
                          </p>
                          {isInvoice && selected.clientGst && (
                            <p className="ml-auto shrink-0 text-right text-xs font-semibold text-[#43239d]">
                              GST No.: {selected.clientGst}
                            </p>
                          )}
                        </div>
                        <div
                          className={`relative flex flex-col justify-center ${isInvoice ? "p-0" : "p-4 text-left sm:text-right"}`}
                        >
                          {!isInvoice && (
                            <p className="text-xs font-bold uppercase tracking-wider text-[#43239d]">
                              Receipt details
                            </p>
                          )}
                          {isInvoice ? (
                            <div className="grid overflow-hidden bg-white sm:grid-cols-3">
                              <div className="border-b border-slate-200 p-3 text-left sm:border-b-0 sm:border-r">
                                <p className="text-[10px] font-bold uppercase tracking-wide text-[#43239d]">Phone</p>
                                <p className="mt-2 break-words text-xs text-slate-700">{selected.clientContact || "—"}</p>
                              </div>
                              <div className="border-b border-slate-200 p-3 text-left sm:border-b-0 sm:border-r">
                                <p className="text-[10px] font-bold uppercase tracking-wide text-[#43239d]">Email</p>
                                <p className="mt-2 break-words text-xs text-slate-700">{selected.clientEmail || "—"}</p>
                              </div>
                              <div className="p-3 text-left">
                                <p className="text-[10px] font-bold uppercase tracking-wide text-[#43239d]">Address</p>
                                <p className="mt-2 break-words text-xs text-slate-700">{selected.clientAddress || "—"}</p>
                              </div>
                            </div>
                          ) : (
                            <div className="mt-3 space-y-1 text-sm text-slate-600">
                              <p>
                                <strong className="text-slate-800">
                                  Date:
                                </strong>{" "}
                                {selected.receiptDate}
                              </p>
                              <p>
                                <strong className="text-slate-800">
                                  Payment date:
                                </strong>{" "}
                                {selected.paymentDate}
                              </p>
                              <p>
                                <strong className="text-slate-800">
                                  Mode:
                                </strong>{" "}
                                {selected.paymentMode}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="mt-8 overflow-hidden rounded-xl border-2 border-slate-300 bg-white">
                        <table className="w-full border-collapse border-spacing-0 text-sm">
                        <thead className="bg-gradient-to-r from-[#43239d] via-[#4d35ad] to-[#3157d5] text-left text-[10px] font-bold uppercase tracking-wide text-white">
                          <tr>
                            <th className="w-12 px-3 py-3 text-center">S.NO</th>
                            <th className="px-3 py-3">ITEM NAME</th>
                            <th className="w-20 px-3 py-3 text-center">QTY</th>
                            <th className="w-32 px-3 py-3 text-right">
                              PER UNIT
                            </th>
                            <th className="w-32 px-3 py-3 text-right">
                              TOTAL PRICE
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {JSON.parse(selected.itemsJson).map(
                            (item: any, index: number) => (
                              <tr
                                key={`invoice-item-${selected.id}-${index}`}
                                className="border-b border-slate-200 bg-white last:border-b-2 last:border-slate-300"
                              >
                                <td className="px-3 py-3 text-center text-slate-700">
                                  {index + 1}
                                </td>
                                <td className="px-3 py-3">
                                  <strong className="text-[#2f236d]">
                                    {item.itemName ||
                                      item.productName ||
                                      item.product ||
                                      "Item"}
                                  </strong>
                                  {item.description && (
                                    <span className="ml-1 text-xs text-slate-500">
                                      ({item.description})
                                    </span>
                                  )}
                                </td>
                                <td className="px-3 py-3 text-center text-slate-700">
                                  {item.quantity}
                                </td>
                                <td className="px-3 py-3 text-right text-slate-700">
                                  {formatCurrency(Number(item.unitPrice))}
                                </td>
                                <td className="px-3 py-3 text-right font-semibold text-slate-800">
                                  {formatCurrency(
                                    Number(item.unitPrice) *
                                      Number(item.quantity)
                                  )}
                                </td>
                              </tr>
                            )
                          )}
                        </tbody>
                        </table>
                        <div className="grid grid-cols-2 bg-white">
                        <div className="flex items-center justify-center border-r border-slate-200 px-4 py-6 text-center text-xs font-bold uppercase tracking-wide text-[#43239d]">
                          {selected.gstMode === "inclusive" ? "TOTAL AMOUNT (TAX INCLUSIVE)" : "Total price excluding tax"}
                        </div>
                        <div className="grid grid-cols-[minmax(0,1fr)_112px] text-right text-sm">
                          <span className="border-b border-l border-slate-200 px-4 py-3 text-center text-xs uppercase leading-tight text-slate-600">
                            Total
                          </span>
                          <strong className="border-b border-slate-200 px-4 py-3 text-slate-800">
                            {formatCurrency(selectedInvoiceTaxable)}
                          </strong>
                          <span className="border-b border-l border-slate-200 px-4 py-3 text-center text-xs uppercase leading-tight text-slate-600">
                            Tax amount ({selected.gstRate}%)
                          </span>
                          <strong className="border-b border-slate-200 px-4 py-3 text-slate-800">
                            {formatCurrency(selectedInvoiceGst)}
                          </strong>
                          <span className="border-l border-t border-slate-200 px-4 py-3 text-center text-base font-bold uppercase leading-tight text-[#43239d]">
                            Grand total amount
                          </span>
                          <strong className="border-t border-slate-200 bg-[#43239d] px-4 py-3 text-base text-white">
                            {formatCurrency(Number(selected.grandTotal))}
                          </strong>
                        </div>
                        <div className="col-span-2 flex min-h-[52px] items-center gap-3 border-t-2 border-b-2 border-slate-300 px-4 py-3">
                          <span className="inline-flex shrink-0 items-center gap-2 rounded-full bg-[#43239d] px-4 py-2 text-xs font-bold uppercase tracking-wide text-white">
                            Onwards <span aria-hidden="true">›</span>
                          </span>
                          <span className="text-sm font-medium text-slate-700">
                            {amountInWords(Number(selected.grandTotal))}
                          </span>
                        </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="rounded-none border-0 bg-white p-0 shadow-none sm:p-0">
                        <div className="grid gap-4 sm:grid-cols-[minmax(260px,1.15fr)_minmax(180px,0.85fr)_minmax(220px,1fr)] sm:items-stretch">
                          <div className="flex min-w-0 items-center gap-4 sm:pr-4">{invoiceSettings.data?.logoUrl || selected.logoUrl || receiptSettings.data?.logoUrl || quotationSettings.data?.logoUrl ? <img src={invoiceSettings.data?.logoUrl || selected.logoUrl || receiptSettings.data?.logoUrl || quotationSettings.data?.logoUrl} className="h-24 w-52 shrink-0 object-contain" alt="Expertaid logo" /> : <div className="h-24 w-52 shrink-0 rounded-lg bg-[#f0efff]" />}</div>
                          <div className="border-y border-slate-200 py-3 text-xs text-slate-600 sm:border-y-0 sm:border-x sm:px-5"><p className="font-bold uppercase tracking-wider text-[#43239d]">GST No.</p><p className="mt-2 break-words">{cleanGstValue(receiptSettings.data?.companyGst || invoiceSettings.data?.companyGst || selected.companyGst)}</p><p className="mt-3 font-bold uppercase tracking-wider text-[#43239d]">Address</p><p className="mt-2 whitespace-pre-line">{receiptSettings.data?.companyAddress || invoiceSettings.data?.companyAddress || selected.companyAddress || "Not configured"}</p></div>
                          <div data-document-header="date-payment-only" className="rounded-xl bg-gradient-to-br from-[#43239d] via-[#4d35ad] to-[#3157d5] px-4 py-4 text-white shadow-sm"><p className="text-xl font-bold uppercase tracking-wide">Receipt</p><p className="mt-1 text-lg font-semibold">#{selected.receiptNumber}</p><div className="mt-3 grid grid-cols-2 gap-3 border-t border-white/40 pt-3 text-[10px] uppercase tracking-wide"><div><p className="opacity-75">Receipt date</p><p className="mt-1 text-xs font-bold normal-case">{selected.receiptDate}</p></div><div><p className="opacity-75">Payment mode</p><p className="mt-1 text-xs font-bold normal-case">{selected.paymentMode}</p></div></div></div>
                        </div>
                      </div>
                      <div className="relative mt-6 overflow-hidden rounded-2xl border-2 border-[#d7d0ff] bg-white shadow-[0_2px_8px_rgba(30,45,80,0.04)]">
                        <div className="relative flex min-w-0 items-center gap-4 border-b border-[#d7d0ff] px-5 py-3">
                          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-[#f0efff] text-[#43239d]"><FileText className="h-6 w-6" /></div>
                          <p className="shrink-0 text-[10px] font-bold uppercase tracking-wider text-[#43239d]">Received from</p>
                          <p className="min-w-0 truncate text-sm font-bold text-[#2f236d]">{selected.clientName || "—"}</p>
                          {selected.clientGst && <p className="ml-auto shrink-0 text-right text-xs font-semibold text-[#43239d]">GST No.: {selected.clientGst}</p>}
                        </div>
                        <div className="grid gap-0 p-4 text-sm text-slate-600 sm:grid-cols-3">
                          <div className="border-b border-slate-200 pb-3 sm:border-b-0 sm:border-r sm:pr-4"><strong className="block text-[10px] font-bold uppercase tracking-wide text-[#43239d]">Phone</strong><span className="mt-2 block break-words">{selected.clientContact || "—"}</span></div>
                          <div className="border-b border-slate-200 py-3 sm:border-b-0 sm:border-r sm:px-4 sm:py-0"><strong className="block text-[10px] font-bold uppercase tracking-wide text-[#43239d]">Email</strong><span className="mt-2 block break-words">{selected.clientEmail || "—"}</span></div>
                          <div className="pt-3 sm:pt-0 sm:pl-4"><strong className="block text-[10px] font-bold uppercase tracking-wide text-[#43239d]">Address</strong><span className="mt-2 block break-words">{selected.clientAddress || "—"}</span></div>
                        </div>
                      </div>
                      <div className="mt-8 overflow-hidden rounded-xl border-2 border-slate-300 bg-white">
                        <table className="w-full border-collapse border-spacing-0 text-sm">
                          <thead className="bg-gradient-to-r from-[#43239d] via-[#4d35ad] to-[#3157d5] text-left text-[10px] font-bold uppercase tracking-wide text-white"><tr><th className="w-12 px-3 py-3 text-center">S.NO</th><th className="px-3 py-3">ITEM NAME</th><th className="w-20 px-3 py-3 text-center">QTY</th><th className="w-32 px-3 py-3 text-right">{isInvoice ? "PER UNIT" : "RATE (₹)"}</th><th className="w-32 px-3 py-3 text-right">{isInvoice ? "TOTAL PRICE" : "AMOUNT (₹)"}</th></tr></thead>
                          <tbody>{(selected.itemsJson ? JSON.parse(selected.itemsJson) : [{ itemName: selected.receivedFor, quantity: 1, unitPrice: selected.amount }]).map((item: any, index: number) => <tr key={`receipt-item-${selected.id}-${index}`} className="border-b border-slate-200 bg-white last:border-b-2 last:border-slate-300"><td className="px-3 py-3 text-center text-slate-700">{index + 1}</td><td className="px-3 py-3"><strong className="text-[#2f236d]">{item.itemName || item.productName || item.product || "Item"}</strong>{item.description && <span className="ml-1 text-xs text-slate-500">({item.description})</span>}</td><td className="px-3 py-3 text-center text-slate-700">{item.quantity}</td><td className="px-3 py-3 text-right text-slate-700">{formatCurrency(Number(item.unitPrice))}</td><td className="px-3 py-3 text-right font-semibold text-slate-800">{formatCurrency(Number(item.unitPrice) * Number(item.quantity))}</td></tr>)}</tbody>
                        </table>
                        <div className="grid grid-cols-2 bg-white"><div className="flex items-center justify-center border-r border-slate-200 px-4 py-6 text-center text-xs font-bold uppercase tracking-wide text-[#43239d]">{selectedReceiptMode === "inclusive" ? "TOTAL AMOUNT (TAX INCLUSIVE)" : "Total price excluding tax"}</div><div className="grid grid-cols-[minmax(0,1fr)_112px] text-right text-sm"><span className="border-b border-l border-slate-200 px-4 py-3 text-center text-xs uppercase leading-tight text-slate-600">Total</span><strong className="border-b border-slate-200 px-4 py-3 text-slate-800">{formatCurrency(receiptDisplayTotal({ mode: selectedReceiptMode, subtotal: selectedReceiptTotals?.subtotal ?? selected.subtotal, grandTotal: selectedReceiptTotals?.grandTotal ?? selected.grandTotal, amount: selected.amount }))}</strong><span className="border-b border-l border-slate-200 px-4 py-3 text-center text-xs uppercase leading-tight text-slate-600">Tax amount ({selectedReceiptRate}% · {selectedReceiptMode === "inclusive" ? "Inclusive" : "Exclusive"})</span><strong className="border-b border-slate-200 px-4 py-3 text-slate-800">{formatCurrency(Number(selectedReceiptTotals?.gstAmount ?? selected.gstAmount ?? 0))}</strong><span className="border-l border-t border-slate-200 px-4 py-3 text-center text-base font-bold uppercase leading-tight text-[#43239d]">Grand total amount</span><strong className="border-t border-slate-200 bg-[#43239d] px-4 py-3 text-base text-white">{formatCurrency(Number(selectedReceiptTotals?.grandTotal ?? selected.grandTotal ?? selected.amount))}</strong></div><div className="col-span-2 flex min-h-[52px] items-center gap-3 border-t-2 border-b-2 border-slate-300 px-4 py-3"><span className="inline-flex shrink-0 items-center gap-2 rounded-full bg-[#43239d] px-4 py-2 text-xs font-bold uppercase tracking-wide text-white">Amount in words <span aria-hidden="true">:</span></span><span className="text-sm font-medium text-slate-700">{amountInWords(Number(selectedReceiptTotals?.grandTotal ?? selected.grandTotal ?? selected.amount))}</span></div></div>
                        <div className="grid overflow-hidden border-t border-slate-200 bg-white sm:grid-cols-4">
                          <div className="border-b border-slate-200 p-3 text-center sm:border-b-0 sm:border-r"><p className="text-[10px] font-bold uppercase tracking-wide text-[#43239d]">Payment mode</p><p className="mt-2 text-xs text-slate-700">{selected.paymentMode || "—"}</p></div>
                          <div className="border-b border-slate-200 p-3 text-center sm:border-b-0 sm:border-r"><p className="text-[10px] font-bold uppercase tracking-wide text-[#43239d]">Transaction ID</p><p className="mt-2 break-words text-xs text-slate-700">{selected.transactionReference || "—"}</p></div>
                          <div className="border-b border-slate-200 p-3 text-center sm:border-b-0 sm:border-r"><p className="text-[10px] font-bold uppercase tracking-wide text-[#43239d]">Payment date</p><p className="mt-2 text-xs text-slate-700">{selected.paymentDate || "—"}</p></div>
                          <div className="p-3 text-center"><p className="text-[10px] font-bold uppercase tracking-wide text-[#43239d]">Reference / Notes</p><p className="mt-2 break-words text-xs text-slate-700">{selected.notes || selected.receivedFor || "—"}</p></div>
                        </div>
                      </div>
                    </>
                  )}
                  {isInvoice ? (
                    <div className="mt-8 grid gap-0 border-y border-slate-200 bg-white sm:grid-cols-[minmax(0,1.55fr)_190px_minmax(180px,1fr)]">
                      <div className="min-w-0 border-b border-slate-200 py-6 sm:border-b-0 sm:border-r sm:pr-6">
                        <p className="text-xs font-bold uppercase tracking-wider text-[#43239d]">
                          Account details:
                        </p>
                        <p className="mt-3 whitespace-nowrap text-[13px]">
                          <strong>Company:</strong>{" "}
                          {selected.accountCompanyName ||
                            invoiceSettings.data?.accountCompanyName ||
                            quotationSettings.data?.accountCompanyName ||
                            "Not configured"}
                        </p>
                        <p className="mt-2 text-sm">
                          <strong>A/C No:</strong>{" "}
                          {selected.accountNumber ||
                            invoiceSettings.data?.accountNumber ||
                            quotationSettings.data?.accountNumber ||
                            "Not configured"}
                        </p>
                        <p className="mt-2 text-sm">
                          <strong>IFSC Code:</strong>{" "}
                          {selected.accountIfsc ||
                            invoiceSettings.data?.accountIfsc ||
                            quotationSettings.data?.accountIfsc ||
                            "Not configured"}
                        </p>
                        <p className="mt-2 text-sm">
                          <strong>Branch:</strong>{" "}
                          {selected.accountBranch ||
                            invoiceSettings.data?.accountBranch ||
                            quotationSettings.data?.accountBranch ||
                            "Not configured"}
                        </p>
                      </div>
                      <div className="flex min-h-[178px] min-w-0 items-center justify-center border-b border-slate-200 py-6 sm:border-b-0 sm:border-r sm:px-4">
                        {invoiceSettings.data?.scannerUrl && (
                          <div className="flex h-full flex-col items-center justify-center text-center">
                            <img
                              src={invoiceSettings.data.scannerUrl}
                              alt="UPI QR scanner"
                              className="mx-auto h-28 w-28 object-contain"
                              onError={event => {
                                event.currentTarget.parentElement?.remove();
                              }}
                            />
                            <p className="mt-3 text-xs font-semibold text-[#43239d]">
                              UPI ID / Payment QR
                            </p>
                          </div>
                        )}
                      </div>
                      <div className="flex min-h-[178px] min-w-0 flex-col items-center justify-center py-6 sm:pl-4">
                        <p className="text-xs font-bold uppercase tracking-wider text-[#43239d]">
                          Your sincerely,
                        </p>
                        {selectedSignatureUrl ? (
                          <img
                            src={selectedSignatureUrl}
                            alt="Authorised signature"
                            className="mx-auto mt-4 h-24 w-40 object-contain"
                          />
                        ) : (
                          <div className="h-24" />
                        )}
                        <p className="mt-3 text-sm font-semibold">
                          Authorised Signatory
                        </p>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="mt-5 grid gap-5 sm:grid-cols-2">
                        <div className="rounded-xl border-2 border-[#d7d0ff] bg-white p-5"><p className="text-xs font-bold uppercase tracking-wide text-[#43239d]">Terms & Conditions</p><p className="mt-3 whitespace-pre-line text-sm leading-6 text-slate-700">{selected.terms || "This receipt is valid subject to realization of payment."}</p></div>
                        <div className="flex min-h-[180px] flex-col items-center justify-center rounded-xl border-2 border-[#d7d0ff] bg-white p-5 text-center"><p className="text-xs font-bold uppercase tracking-wide text-[#43239d]">{selected.footerCompanyName || receiptSettings.data?.footerCompanyName || "FOR EXPERTAID TECHNOLOGIES PVT LTD."}</p>{selectedSignatureUrl ? <img src={selectedSignatureUrl} alt="Authorised signature" className="mx-auto mt-4 h-24 w-40 object-contain" /> : <div className="h-24" />}<p className="mt-3 text-xs font-bold uppercase tracking-wide text-[#43239d]">Authorized Signature</p></div>
                      </div>
                    </>
                  )}
                  {!isInvoice && (
                    <div className="mt-8 overflow-hidden rounded-xl bg-gradient-to-r from-[#43239d] to-[#3157d5] px-5 py-3 text-center text-sm font-bold text-white">
                      {selected.footerMessage || receiptSettings.data?.footerMessage || "Thank you for your business!"}
                    </div>
                  )}
                  {!isInvoice && (
                    <p className="mt-3 text-center text-xs font-bold uppercase tracking-wide text-[#43239d]">
                      {selected.footerCompanyName || receiptSettings.data?.footerCompanyName || "FOR EXPERTAID TECHNOLOGIES PVT LTD."}
                    </p>
                  )}
                  <p className="mt-8 border-t border-slate-100 pt-4 text-xs text-slate-500">
                    {selected.terms}
                  </p>
                </div>
              )}
              <div className="mt-4 flex justify-end gap-3 print:hidden">
                <Button variant="outline" onClick={printSelected}>
                  <Printer className="mr-2 h-4 w-4" />
                  Print A4
                </Button>
                <Button onClick={() => setSelected(null)}>Close</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </DashboardLayout>
  );
}

export function InvoicePage() {
  return <BillingPage kind="invoice" />;
}
export function ReceiptPage() {
  return <BillingPage kind="receipt" />;
}
