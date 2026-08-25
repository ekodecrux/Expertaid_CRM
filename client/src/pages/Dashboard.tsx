import { useMemo } from "react";
import { Link } from "wouter";
import { BarChart3, Bell, CalendarClock, CheckCircle2, CircleDollarSign, FileCheck2, FileText, ReceiptText, UsersRound, WalletCards } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { trpc } from "@/lib/trpc";
import { formatCurrency } from "@shared/quotation";
import { buildClientPaymentItems, calculateClientPaymentAging, calculateDashboardBusinessValue } from "@shared/dashboardPaymentAging";
import { formatIndiaDate, formatIndiaTime, timestampMs } from "@shared/timezone";

const money = (value: unknown) => formatCurrency(Number(value ?? 0));
const badgeTone: Record<string, string> = { Receipt: "bg-emerald-50 text-emerald-700", Invoice: "bg-blue-50 text-blue-700", Reminder: "bg-amber-50 text-amber-700", Agreement: "bg-violet-50 text-violet-700" };

function MetricCard({ label, value, icon: Icon, tint, foot }: { label: string; value: string; icon: typeof UsersRound; tint: string; foot?: string }) {
  return <Card className="h-fit self-start gap-0 rounded-xl border border-slate-100 py-0 shadow-[0_8px_24px_rgba(30,45,80,0.05)]"><CardContent className="p-2.5"><div className="flex items-start justify-between gap-2"><div><p className="text-[9px] font-extrabold uppercase tracking-[0.12em] text-slate-500">{label}</p><p className="mt-1 text-xl font-extrabold tracking-tight text-slate-950">{value}</p></div><span className={`flex h-8 w-8 items-center justify-center rounded-lg ${tint}`}><Icon className="h-4 w-4" /></span></div>{foot && <p className="mt-1.5 text-[10px] leading-4 text-slate-500">{foot}</p>}</CardContent></Card>;
}

function PanelTitle({ title, action, href }: { title: string; action?: string; href?: string }) {
  return <div className="flex items-center justify-between gap-3"><h2 className="text-sm font-bold text-slate-900">{title}</h2>{href ? <Link href={href} className="text-[10px] font-semibold text-[#4f2ad3] hover:text-[#3157d5]">{action ?? "View all"}</Link> : null}</div>;
}

export default function Dashboard() {
  const sessionSettings = trpc.session.get.useQuery(undefined);
  const currentSession = sessionSettings.data?.currentSession ?? "2026-2027";
  const agreements = trpc.agreements.list.useQuery({ session: currentSession });
  const clients = trpc.clients.list.useQuery({ page: 1, pageSize: 1000, sessionMode: "single", currentSession });
  const invoices = trpc.invoices.list.useQuery();
  const receipts = trpc.receipts.list.useQuery();
  const clientPayments = trpc.dashboard.clientPayments.useQuery();
  const agreementRows = (agreements.data ?? []) as any[];
  const clientRows = ((clients.data as any)?.items ?? []) as any[];
  const invoiceRows = (invoices.data ?? []) as any[];
  const receiptRows = (receipts.data ?? []) as any[];
  const clientPaymentRows = (clientPayments.data ?? { products: [], plans: [] }) as { products: any[]; plans: any[] };

  const computed = useMemo(() => {
    const sessionClientIds = new Set(clientRows.map(row => String(row.clientId ?? "")).filter(Boolean));
    const belongsToCurrentSession = (row: any) => !row.clientId || sessionClientIds.has(String(row.clientId));
    const validInvoices = invoiceRows.filter(row => row.status === "Due" && belongsToCurrentSession(row));
    const validReceipts = receiptRows.filter(row => row.status !== "Cancelled" && belongsToCurrentSession(row));
    const invoiceValue = validInvoices.reduce((sum, row) => sum + Number(row.grandTotal ?? 0), 0);
    const receiptValue = validReceipts.reduce((sum, row) => sum + Number(row.amount ?? row.grandTotal ?? 0), 0);
    const totalClientValue = calculateDashboardBusinessValue(clientRows, agreementRows);
    const today = new Date();
    const month = today.getMonth();
    const year = today.getFullYear();
    const todayCollected = validReceipts.filter(row => String(row.paymentDate ?? "").slice(0, 10) === today.toISOString().slice(0, 10)).reduce((sum, row) => sum + Number(row.amount ?? row.grandTotal ?? 0), 0);
    const monthlyCollected = validReceipts.filter(row => { const d = new Date(String(row.paymentDate ?? row.createdAt)); return d.getMonth() === month && d.getFullYear() === year; }).reduce((sum, row) => sum + Number(row.amount ?? row.grandTotal ?? 0), 0);
    const sessionStartYear = Number(currentSession.slice(0, 4)) || year;
    const sessionMonths = Array.from({ length: 12 }, (_, offset) => { const monthIndex = (3 + offset) % 12; const monthYear = sessionStartYear + (monthIndex < 3 ? 1 : 0); return { label: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][monthIndex], monthIndex, monthYear }; });
    const sessionStart = `${sessionStartYear}-04-01`;
    const sessionEnd = `${sessionStartYear + 1}-03-31`;
    const sessionReceipts = validReceipts.filter(row => { const date = String(row.paymentDate ?? row.createdAt).slice(0, 10); return date >= sessionStart && date <= sessionEnd; });
    const sessionCollected = sessionReceipts.reduce((sum, row) => sum + Number(row.amount ?? row.grandTotal ?? 0), 0);
    const monthlyCollections = sessionMonths.map(({ label, monthIndex, monthYear }) => ({ label, amount: sessionReceipts.filter(row => { const date = new Date(String(row.paymentDate ?? row.createdAt)); return date.getFullYear() === monthYear && date.getMonth() === monthIndex; }).reduce((sum, row) => sum + Number(row.amount ?? row.grandTotal ?? 0), 0) }));
    const clientGrowth = sessionMonths.map(({ label, monthIndex, monthYear }) => ({ label, count: clientRows.filter(row => { const date = new Date(String(row.createdAt ?? row.startDate)); return date.getFullYear() === monthYear && date.getMonth() === monthIndex; }).length }));
    const clientPaymentItems = buildClientPaymentItems(clientRows, clientPaymentRows.products, clientPaymentRows.plans, validReceipts);
    const { dueClientPayments, aging, dueTotal: clientDueTotal } = calculateClientPaymentAging(clientPaymentItems);

    return { invoiceValue, invoiceCount: validInvoices.length, receiptValue, totalClientValue, todayCollected, monthlyCollected, yearCollected: sessionCollected, monthlyCollections, clientGrowth, dueClientPayments, aging, pendingClientPayments: dueClientPayments.length, dueTotal: clientDueTotal };
  }, [agreementRows, clientRows, clientPaymentRows, invoiceRows, receiptRows]);

  const dueTotal = computed.aging.reduce((sum, bucket) => sum + bucket.amount, 0);
  const donutSegments = computed.aging.map(bucket => bucket.amount).reduce((sum, amount) => sum + amount, 0) || 1;
  const activities = useMemo(() => [
    ...receiptRows.filter(row => row.status !== "Cancelled").map(row => ({ type: "Receipt", title: "Payment Received", reference: row.receiptNumber, party: row.clientName, amount: Number(row.amount ?? row.grandTotal ?? 0), date: row.createdAt ?? row.paymentDate, by: "Admin User", icon: ReceiptText })),
    ...invoiceRows.filter(row => row.status !== "Cancelled").map(row => ({ type: "Invoice", title: "Invoice Created", reference: row.invoiceNumber, party: row.clientName, amount: Number(row.grandTotal ?? 0), date: row.createdAt ?? row.invoiceDate, by: "Admin User", icon: FileText })),
    ...agreementRows.map(row => ({ type: "Agreement", title: "Agreement Created", reference: row.clientId ?? `AGR-${row.id}`, party: row.clientName, amount: Number(row.totalPrice ?? 0), date: row.createdAt ?? row.startDate, by: "Admin User", icon: FileCheck2 })),
  ].sort((a, b) => timestampMs(b.date) - timestampMs(a.date)).slice(0, 7), [agreementRows, invoiceRows, receiptRows]);
  const donutStyle = `conic-gradient(#ef4444 0 ${(computed.aging[0].amount / donutSegments) * 100}%, #f59e0b ${(computed.aging[0].amount / donutSegments) * 100}% ${((computed.aging[0].amount + computed.aging[1].amount) / donutSegments) * 100}%, #3b82f6 ${((computed.aging[0].amount + computed.aging[1].amount) / donutSegments) * 100}% ${((computed.aging[0].amount + computed.aging[1].amount + computed.aging[2].amount) / donutSegments) * 100}%, #10b981 ${((computed.aging[0].amount + computed.aging[1].amount + computed.aging[2].amount) / donutSegments) * 100}% 100%)`;
  const maxAging = Math.max(...computed.aging.map(bucket => bucket.amount), 1);

  return <DashboardLayout><main className="min-h-full bg-[#f7f8fc] p-3 sm:p-5"><div className="mx-auto max-w-[1450px]">
    <div className="grid items-start grid-cols-2 gap-2.5 sm:grid-cols-4 xl:grid-cols-4"><MetricCard label="Total Agreements" value={String(agreementRows.length)} icon={FileCheck2} tint="bg-violet-50 text-violet-600" foot={`${agreementRows.filter(row => row.status === "Approved").length} approved · ${agreementRows.filter(row => row.status === "Pending").length} awaiting`} /><MetricCard label="Clients" value={String(clientRows.length)} icon={UsersRound} tint="bg-blue-50 text-blue-600" foot={`${clientRows.filter(row => row.status === "Active").length} active`} /><MetricCard label="Pending Client Payments" value={String(computed.pendingClientPayments)} icon={FileText} tint="bg-amber-50 text-amber-600" foot={money(computed.dueTotal)} /><MetricCard label="Receipts" value={String(receiptRows.filter(row => row.status !== "Cancelled").length)} icon={ReceiptText} tint="bg-emerald-50 text-emerald-600" foot={money(computed.receiptValue)} /></div>
    <div className="mt-3 grid items-start grid-cols-2 gap-2.5 sm:grid-cols-3 xl:grid-cols-6"><MetricCard label="Today Collection" value={money(computed.todayCollected)} icon={WalletCards} tint="bg-indigo-50 text-indigo-600" foot="Receipt collections" /><MetricCard label="Monthly Collection" value={money(computed.monthlyCollected)} icon={CalendarClock} tint="bg-blue-50 text-blue-600" foot="This month" /><MetricCard label="Total Clients Value" value={money(computed.totalClientValue)} icon={UsersRound} tint="bg-emerald-50 text-emerald-600" foot={`${clientRows.length} clients`} /><MetricCard label="Total Received" value={money(computed.yearCollected)} icon={CheckCircle2} tint="bg-teal-50 text-teal-600" foot="Current session" /><MetricCard label="Total Due" value={money(computed.dueTotal)} icon={CircleDollarSign} tint="bg-rose-50 text-rose-600" foot="Open balance" /><MetricCard label="Invoiced Value" value={money(computed.invoiceValue)} icon={BarChart3} tint="bg-orange-50 text-orange-600" foot={`${computed.invoiceCount} due invoices`} /></div>
    <div className="mt-3 grid gap-3 xl:grid-cols-[1.35fr_0.95fr]"><Card className="border border-slate-100 shadow-sm"><CardHeader className="flex-row items-center justify-between px-4 pb-2 pt-3"><PanelTitle title="Monthly Collections" /><span className="text-[10px] font-semibold text-slate-400">Receipt collections · {currentSession}</span></CardHeader><CardContent className="px-4 pb-4"><div className="flex h-44 items-end gap-2 border-b border-l border-slate-200 px-2 pb-0 pt-4">{computed.monthlyCollections.map(month => { const max = Math.max(...computed.monthlyCollections.map(item => item.amount), 1); return <div key={month.label} className="flex h-full flex-1 flex-col items-center justify-end gap-1"><span className="text-[8px] font-semibold text-slate-600">{month.amount > 0 ? money(month.amount) : ""}</span><div className="w-full max-w-[34px] rounded-t-md bg-[#4f2ad3] transition-all" style={{ height: `${Math.max(month.amount > 0 ? 6 : 1, (month.amount / max) * 82)}%` }} /><span className="mb-1 text-[9px] text-slate-500">{month.label}</span></div>; })}</div></CardContent></Card><Card className="border border-slate-100 shadow-sm"><CardHeader className="px-4 pb-2 pt-3"><PanelTitle title="Business Growth" /><span className="text-[10px] font-semibold text-slate-400">New clients · {currentSession}</span></CardHeader><CardContent className="px-4 pb-4"><div className="flex h-44 items-end gap-2 border-b border-l border-slate-200 px-2 pb-0 pt-4">{computed.clientGrowth.map(month => { const max = Math.max(...computed.clientGrowth.map(item => item.count), 1); return <div key={month.label} className="flex h-full flex-1 flex-col items-center justify-end gap-1"><span className="text-[8px] font-semibold text-slate-600">{month.count || ""}</span><div className="w-full max-w-[22px] rounded-t-md bg-emerald-500" style={{ height: `${Math.max(month.count > 0 ? 6 : 1, (month.count / max) * 82)}%` }} /><span className="mb-1 text-[9px] text-slate-500">{month.label}</span></div>; })}</div><p className="mt-2 text-[10px] text-slate-500">New clients added each month</p></CardContent></Card></div>
    <Card className="mt-3 border border-slate-100 shadow-sm"><CardHeader className="flex-row items-center justify-between px-4 pb-2 pt-3"><PanelTitle title="Recent Activity" /><Link href="/receipts" className="text-[10px] font-semibold text-[#4f2ad3]">View All</Link></CardHeader><CardContent className="overflow-x-auto px-0 pb-0"><table className="w-full min-w-[760px] text-left text-[10px]"><thead className="border-y border-slate-100 bg-slate-50 uppercase tracking-[0.1em] text-slate-400"><tr><th className="px-4 py-2 font-semibold">Activity</th><th className="px-3 py-2 font-semibold">Type</th><th className="px-3 py-2 font-semibold">Reference</th><th className="px-3 py-2 font-semibold">Client / Party</th><th className="px-3 py-2 text-right font-semibold">Amount</th><th className="px-3 py-2 font-semibold">Date & Time</th><th className="px-4 py-2 font-semibold">By</th></tr></thead><tbody>{activities.map((activity, index) => { const Icon = activity.icon; return <tr key={`${activity.type}-${activity.reference}-${index}`} className="border-b border-slate-50 last:border-0"><td className="px-4 py-2.5"><span className="flex items-center gap-2 font-semibold text-slate-700"><Icon className="h-3.5 w-3.5 text-[#4f2ad3]" />{activity.title}</span></td><td className="px-3 py-2.5"><Badge className={`px-2 py-0.5 text-[9px] ${badgeTone[activity.type]}`}>{activity.type}</Badge></td><td className="px-3 py-2.5 font-medium text-slate-600">{activity.reference}</td><td className="max-w-[180px] truncate px-3 py-2.5 text-slate-600">{activity.party || "—"}</td><td className="px-3 py-2.5 text-right font-bold text-emerald-700">{money(activity.amount)}</td><td className="whitespace-nowrap px-3 py-2.5 text-slate-500">{formatIndiaDate(activity.date)} · {formatIndiaTime(activity.date)}</td><td className="px-4 py-2.5 text-slate-500">{activity.by}</td></tr>; })}</tbody></table>{!activities.length && <p className="px-4 py-6 text-center text-xs text-slate-500">No recent activity available.</p>}</CardContent></Card>
    <div className="mt-3 flex flex-wrap gap-2"><Link href="/quotations" className="rounded-lg bg-[#4f2ad3] px-3 py-2 text-[10px] font-semibold text-white hover:bg-[#3157d5]">Create quotation</Link><Link href="/clients" className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-[10px] font-semibold text-slate-700 hover:border-[#4f2ad3]">Review clients</Link><Link href="/invoices" className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-[10px] font-semibold text-slate-700 hover:border-[#4f2ad3]">Manage invoices</Link></div>
  </div></main></DashboardLayout>;
}
