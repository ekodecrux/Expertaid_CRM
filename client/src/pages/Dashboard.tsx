import { useMemo } from "react";
import { Link } from "wouter";
import { ArrowRight, BarChart3, BellRing, CalendarClock, CheckCircle2, CircleDollarSign, FileCheck2, FileText, ReceiptText, UsersRound, WalletCards } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { trpc } from "@/lib/trpc";
import { formatCurrency } from "@shared/quotation";

const statusTone: Record<string, string> = {
  Approved: "bg-emerald-50 text-emerald-700",
  Pending: "bg-amber-50 text-amber-700",
  Rejected: "bg-rose-50 text-rose-700",
  Active: "bg-emerald-50 text-emerald-700",
  Inactive: "bg-slate-100 text-slate-600",
  Hold: "bg-amber-50 text-amber-700",
  Cancelled: "bg-rose-50 text-rose-700",
  Renewal: "bg-violet-50 text-violet-700",
  Extended: "bg-blue-50 text-blue-700",
  Closed: "bg-slate-100 text-slate-600",
};

function amount(value: unknown) {
  return formatCurrency(Number(value ?? 0));
}

function dateValue(value: unknown) {
  const time = value ? new Date(String(value)).getTime() : 0;
  return Number.isFinite(time) ? time : 0;
}

function Kpi({ label, value, note, icon: Icon, tone }: { label: string; value: string; note: string; icon: typeof UsersRound; tone: string }) {
  return <Card className="border-0 shadow-[0_12px_36px_rgba(30,45,80,0.06)]"><CardContent className="flex items-start justify-between gap-4 p-5"><div><p className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">{label}</p><p className="mt-2 text-2xl font-bold tracking-tight text-slate-900">{value}</p><p className="mt-2 text-xs text-slate-500">{note}</p></div><div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ${tone}`}><Icon className="h-5 w-5" /></div></CardContent></Card>;
}

function SectionHeading({ title, subtitle, href, action }: { title: string; subtitle: string; href?: string; action?: string }) {
  return <div className="flex items-start justify-between gap-4"><div><h2 className="text-lg font-bold tracking-tight text-slate-900">{title}</h2><p className="mt-1 text-xs text-slate-500">{subtitle}</p></div>{href && <Link href={href} className="inline-flex items-center gap-1 text-xs font-semibold text-[#43239d] hover:text-[#3157d5]">{action ?? "Open"}<ArrowRight className="h-3.5 w-3.5" /></Link>}</div>;
}

export default function Dashboard() {
  const agreements = trpc.agreements.list.useQuery(undefined);
  const clients = trpc.clients.list.useQuery({ page: 1, pageSize: 1000 });
  const invoices = trpc.invoices.list.useQuery();
  const receipts = trpc.receipts.list.useQuery();
  const projects = trpc.projects.list.useQuery();

  const agreementRows = (agreements.data ?? []) as any[];
  const clientRows = ((clients.data as any)?.items ?? []) as any[];
  const invoiceRows = (invoices.data ?? []) as any[];
  const receiptRows = (receipts.data ?? []) as any[];
  const projectRows = (projects.data ?? []) as any[];

  const metrics = useMemo(() => {
    const activeClients = clientRows.filter(client => ["Active", "Renewal", "Extended"].includes(String(client.status))).length;
    const pipelineValue = agreementRows.filter(row => row.status !== "Rejected").reduce((sum, row) => sum + Number(row.totalPrice ?? 0), 0);
    const invoiceValue = invoiceRows.filter(row => row.status !== "Cancelled").reduce((sum, row) => sum + Number(row.grandTotal ?? 0), 0);
    const collected = receiptRows.filter(row => row.status !== "Cancelled").reduce((sum, row) => sum + Number(row.amount ?? row.grandTotal ?? 0), 0);
    const pending = Math.max(invoiceValue - collected, 0);
    const upcoming = invoiceRows.filter(row => row.status !== "Cancelled" && row.status !== "Paid" && row.dueDate).length;
    return { activeClients, pipelineValue, invoiceValue, collected, pending, upcoming };
  }, [agreementRows, clientRows, invoiceRows, receiptRows]);

  const agreementStages = useMemo(() => ["Pending", "Approved", "Rejected"].map(status => ({ status, count: agreementRows.filter(row => row.status === status).length, value: agreementRows.filter(row => row.status === status).reduce((sum, row) => sum + Number(row.totalPrice ?? 0), 0) })), [agreementRows]);
  const clientStatuses = useMemo(() => ["Active", "Renewal", "Extended", "Hold", "Inactive", "Cancelled", "Closed"].map(status => ({ status, count: clientRows.filter(row => row.status === status).length })).filter(row => row.count > 0), [clientRows]);
  const upcomingInvoices = useMemo(() => invoiceRows.filter(row => row.status !== "Cancelled" && row.status !== "Paid" && row.dueDate).sort((a, b) => String(a.dueDate).localeCompare(String(b.dueDate))).slice(0, 5), [invoiceRows]);
  const recentActivity = useMemo(() => [
    ...receiptRows.map(row => ({ kind: "Receipt", title: row.receiptNumber, name: row.clientName, value: Number(row.amount ?? row.grandTotal ?? 0), date: row.createdAt ?? row.paymentDate, icon: ReceiptText, tone: "text-emerald-600 bg-emerald-50" })),
    ...invoiceRows.map(row => ({ kind: "Invoice", title: row.invoiceNumber, name: row.clientName, value: Number(row.grandTotal ?? 0), date: row.createdAt ?? row.invoiceDate, icon: FileText, tone: "text-blue-600 bg-blue-50" })),
    ...agreementRows.map(row => ({ kind: "Agreement", title: row.clientId ?? `Agreement ${row.id}`, name: row.clientName, value: Number(row.totalPrice ?? 0), date: row.createdAt ?? row.startDate, icon: FileCheck2, tone: "text-violet-600 bg-violet-50" })),
  ].sort((a, b) => dateValue(b.date) - dateValue(a.date)).slice(0, 6), [agreementRows, invoiceRows, receiptRows]);
  const projectMix = useMemo(() => projectRows.map(project => ({ ...project, count: clientRows.filter(client => Number(client.projectId) === Number(project.id)).length })).sort((a, b) => b.count - a.count).slice(0, 5), [clientRows, projectRows]);

  return <DashboardLayout><div className="min-h-screen bg-[#f7f8fc] px-4 py-6 sm:px-6 lg:px-8"><div className="mx-auto max-w-[1500px]">
    <div className="mb-7 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between"><div><p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#4f2ad3]">Executive workspace</p><h1 className="mt-2 text-4xl font-bold tracking-tight text-slate-900">Advanced dashboard</h1><p className="mt-2 max-w-2xl text-sm text-slate-500">A live overview of your Expertaid pipeline, clients, invoices, collections, and operational follow-up.</p></div><div className="rounded-2xl border border-[#e3defc] bg-white px-4 py-3 text-right shadow-sm"><p className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">Workspace status</p><p className="mt-1 flex items-center justify-end gap-2 text-sm font-semibold text-emerald-700"><span className="h-2 w-2 rounded-full bg-emerald-500" />Live data connected</p></div></div>
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-6"><Kpi label="Active clients" value={String(metrics.activeClients)} note={`${clientRows.length} total client records`} icon={UsersRound} tone="bg-blue-50 text-blue-600" /><Kpi label="Pipeline value" value={amount(metrics.pipelineValue)} note={`${agreementRows.length} agreements tracked`} icon={BarChart3} tone="bg-violet-50 text-violet-600" /><Kpi label="Invoiced" value={amount(metrics.invoiceValue)} note={`${invoiceRows.length} invoices issued`} icon={FileText} tone="bg-indigo-50 text-indigo-600" /><Kpi label="Collected" value={amount(metrics.collected)} note="Issued receipts only" icon={WalletCards} tone="bg-emerald-50 text-emerald-600" /><Kpi label="Outstanding" value={amount(metrics.pending)} note="Invoice value less receipts" icon={CircleDollarSign} tone="bg-rose-50 text-rose-600" /><Kpi label="Upcoming invoices" value={String(metrics.upcoming)} note="Require payment follow-up" icon={CalendarClock} tone="bg-amber-50 text-amber-600" /></div>
    <div className="mt-5 grid gap-5 xl:grid-cols-[1.15fr_0.85fr]"><Card className="border-0 shadow-[0_12px_36px_rgba(30,45,80,0.06)]"><CardHeader><SectionHeading title="Pipeline overview" subtitle="Agreement volume and value by workflow stage" href="/agreements" action="View agreements" /></CardHeader><CardContent className="space-y-5">{agreementStages.map(stage => <div key={stage.status}><div className="mb-2 flex items-center justify-between gap-4"><div className="flex items-center gap-2"><Badge className={statusTone[stage.status] ?? "bg-slate-100 text-slate-600"}>{stage.status}</Badge><span className="text-xs text-slate-500">{stage.count} agreement{stage.count === 1 ? "" : "s"}</span></div><span className="text-sm font-bold text-slate-800">{amount(stage.value)}</span></div><div className="h-2 overflow-hidden rounded-full bg-slate-100"><div className={`h-full rounded-full ${stage.status === "Approved" ? "bg-emerald-500" : stage.status === "Pending" ? "bg-amber-400" : "bg-rose-400"}`} style={{ width: `${agreementRows.length ? Math.max(4, (stage.count / agreementRows.length) * 100) : 0}%` }} /></div></div>)}<div className="grid gap-3 border-t border-slate-100 pt-4 sm:grid-cols-3"><div><p className="text-[10px] uppercase tracking-[0.14em] text-slate-400">Approved</p><p className="mt-1 text-xl font-bold text-emerald-700">{agreementRows.filter(row => row.status === "Approved").length}</p></div><div><p className="text-[10px] uppercase tracking-[0.14em] text-slate-400">Pending</p><p className="mt-1 text-xl font-bold text-amber-700">{agreementRows.filter(row => row.status === "Pending").length}</p></div><div><p className="text-[10px] uppercase tracking-[0.14em] text-slate-400">Projects</p><p className="mt-1 text-xl font-bold text-[#43239d]">{projectRows.length}</p></div></div></CardContent></Card>
      <Card className="border-0 shadow-[0_12px_36px_rgba(30,45,80,0.06)]"><CardHeader><SectionHeading title="Client health" subtitle="Current client status distribution" href="/clients" action="Open clients" /></CardHeader><CardContent><div className="space-y-3">{clientStatuses.length ? clientStatuses.map(row => <div key={row.status} className="flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2.5"><div className="flex items-center gap-2"><span className={`h-2.5 w-2.5 rounded-full ${row.status === "Active" ? "bg-emerald-500" : row.status === "Hold" || row.status === "Renewal" ? "bg-amber-400" : row.status === "Cancelled" || row.status === "Closed" ? "bg-rose-400" : "bg-slate-400"}`} /><span className="text-sm font-semibold text-slate-700">{row.status}</span></div><span className="text-sm font-bold text-slate-900">{row.count}</span></div>) : <p className="text-sm text-slate-500">No client status data available yet.</p>}</div><div className="mt-5 border-t border-slate-100 pt-4"><p className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">Project mix</p><div className="mt-3 space-y-2">{projectMix.map(project => <div key={project.id} className="flex items-center justify-between text-xs"><span className="truncate text-slate-600">{project.name}</span><span className="font-bold text-[#43239d]">{project.count}</span></div>)}</div></div></CardContent></Card></div>
    <div className="mt-5 grid gap-5 xl:grid-cols-[1fr_1fr_1fr]"><Card className="border-0 shadow-[0_12px_36px_rgba(30,45,80,0.06)]"><CardHeader><SectionHeading title="Financial position" subtitle="Invoiced versus receipt collections" href="/reports" action="View reports" /></CardHeader><CardContent><div className="space-y-4"><div className="flex items-center justify-between"><span className="text-sm text-slate-600">Invoiced value</span><span className="font-bold text-slate-900">{amount(metrics.invoiceValue)}</span></div><div className="flex items-center justify-between"><span className="text-sm text-slate-600">Collected receipts</span><span className="font-bold text-emerald-700">{amount(metrics.collected)}</span></div><div className="flex items-center justify-between border-t border-slate-100 pt-4"><span className="text-sm font-semibold text-slate-700">Outstanding</span><span className="text-lg font-bold text-rose-600">{amount(metrics.pending)}</span></div><div className="h-3 overflow-hidden rounded-full bg-slate-100"><div className="h-full rounded-full bg-gradient-to-r from-[#43239d] to-[#3157d5]" style={{ width: `${metrics.invoiceValue ? Math.min(100, (metrics.collected / metrics.invoiceValue) * 100) : 0}%` }} /></div><p className="text-xs text-slate-500">{metrics.invoiceValue ? Math.round((metrics.collected / metrics.invoiceValue) * 100) : 0}% collected against invoice value</p></div></CardContent></Card>
      <Card className="border-0 shadow-[0_12px_36px_rgba(30,45,80,0.06)]"><CardHeader><SectionHeading title="Upcoming follow-up" subtitle="Invoices with a due date and open balance" href="/invoices" action="Open invoices" /></CardHeader><CardContent><div className="space-y-3">{upcomingInvoices.length ? upcomingInvoices.map(invoice => <div key={invoice.id} className="flex items-center justify-between gap-3 rounded-xl border border-slate-100 px-3 py-2.5"><div className="min-w-0"><p className="truncate text-sm font-semibold text-slate-800">{invoice.clientName || invoice.invoiceNumber}</p><p className="mt-1 text-xs text-slate-500">{invoice.invoiceNumber} · Due {invoice.dueDate}</p></div><span className="shrink-0 text-sm font-bold text-rose-600">{amount(invoice.grandTotal)}</span></div>) : <p className="text-sm text-slate-500">No upcoming invoice follow-ups.</p>}</div></CardContent></Card>
      <Card className="border-0 shadow-[0_12px_36px_rgba(30,45,80,0.06)]"><CardHeader><SectionHeading title="Recent activity" subtitle="Latest agreements, invoices, and receipts" /></CardHeader><CardContent><div className="space-y-3">{recentActivity.length ? recentActivity.map((item, index) => { const Icon = item.icon; return <div key={`${item.kind}-${item.title}-${index}`} className="flex items-center gap-3"><div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${item.tone}`}><Icon className="h-4 w-4" /></div><div className="min-w-0 flex-1"><p className="truncate text-xs font-semibold text-slate-800">{item.name || item.title}</p><p className="truncate text-[11px] text-slate-500">{item.kind} · {item.title}</p></div><span className="shrink-0 text-xs font-bold text-slate-700">{amount(item.value)}</span></div>; }) : <p className="text-sm text-slate-500">No recent activity available.</p>}</div></CardContent></Card></div>
    <div className="mt-5 rounded-2xl border border-[#e3defc] bg-gradient-to-r from-[#f6f3ff] via-white to-[#eef4ff] p-5"><div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"><div><p className="flex items-center gap-2 text-sm font-bold text-[#43239d]"><BellRing className="h-4 w-4" />Operational focus</p><p className="mt-1 text-sm text-slate-600">Use the pipeline, client health, and upcoming follow-up panels to decide the next action for your team.</p></div><div className="flex flex-wrap gap-2"><Link href="/quotations" className="rounded-lg bg-white px-3 py-2 text-xs font-semibold text-[#43239d] shadow-sm ring-1 ring-[#ded8ff]">New quotation</Link><Link href="/clients" className="rounded-lg bg-[#43239d] px-3 py-2 text-xs font-semibold text-white shadow-sm hover:bg-[#3157d5]">Review clients</Link></div></div></div>
  </div></div></DashboardLayout>;
}

export { Dashboard };
