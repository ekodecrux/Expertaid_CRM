import DashboardLayout from "@/components/DashboardLayout";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { trpc } from "@/lib/trpc";
import { formatAgreementReference } from "@shared/agreement";
import { filterApprovedClients } from "@shared/clients";
import { CalendarDays, CheckCircle2, Mail, MapPin, Phone, Search, UsersRound } from "lucide-react";
import type { ReactNode } from "react";
import { useMemo, useState } from "react";

function money(value: number | string | null | undefined) {
  return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(Number(value ?? 0));
}

function date(value: string | Date | null | undefined) {
  if (!value) return "—";
  return new Date(value).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
}

export default function Clients() {
  const [search, setSearch] = useState("");
  const { data: agreements, isLoading } = trpc.agreements.list.useQuery();
  const approved = useMemo(() => filterApprovedClients(agreements ?? []).filter((agreement) => {
    const haystack = `${agreement.clientName} ${agreement.clientOwnerName} ${agreement.email} ${agreement.contactNumber} ${agreement.instituteType}`.toLowerCase();
    return haystack.includes(search.toLowerCase());
  }), [agreements, search]);

  return <DashboardLayout><main className="min-h-[calc(100vh-2rem)] bg-[#f7f8fc] -m-3 p-4 text-[#172033] sm:-m-4 sm:p-8 lg:p-10"><div className="mx-auto max-w-7xl">
    <header className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between"><div><h1 className="font-serif text-[2.7rem] leading-[1.08] tracking-[-0.03em] text-[#172033] sm:text-5xl">Clients</h1><p className="mt-3 text-sm text-slate-500">Approved clients and their complete agreement details.</p></div><div className="relative w-full sm:w-80"><Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" /><Input value={search} onChange={(event) => setSearch(event.target.value)} className="bg-white pl-9" placeholder="Search approved clients…" aria-label="Search approved clients" /></div></header>
    <div className="mb-6 grid gap-4 sm:grid-cols-3"><Stat label="Approved clients" value={approved.length.toString()} icon={<CheckCircle2 className="h-5 w-5" />} /><Stat label="Active students" value={approved.reduce((sum, agreement) => sum + Number(agreement.noOfStudents || 0), 0).toLocaleString("en-IN")} icon={<UsersRound className="h-5 w-5" />} /><Stat label="Approved value" value={money(approved.reduce((sum, agreement) => sum + Number(agreement.totalPrice || 0), 0))} icon={<CheckCircle2 className="h-5 w-5" />} /></div>
    {isLoading ? <Card><CardContent className="p-10 text-center text-sm text-slate-500">Loading approved clients…</CardContent></Card> : approved.length === 0 ? <Card><CardContent className="p-12 text-center"><CheckCircle2 className="mx-auto h-10 w-10 text-slate-300" /><h2 className="mt-4 text-lg font-semibold">No approved clients yet</h2><p className="mt-1 text-sm text-slate-500">Clients will appear here after their agreements are approved.</p></CardContent></Card> : <div className="grid gap-5 xl:grid-cols-2">{approved.map((agreement) => <Card key={agreement.id} className="border-0 shadow-[0_18px_60px_rgba(30,45,80,0.07)]"><CardHeader className="flex flex-row items-start justify-between gap-4 border-b border-slate-100 pb-5"><div className="flex min-w-0 items-center gap-3"><div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-[#eef2ff] text-lg font-semibold text-[#3157d5]">{agreement.logoUrl ? <img src={agreement.logoUrl} alt={`${agreement.clientName} logo`} className="h-full w-full object-contain" /> : agreement.clientName.slice(0, 1).toUpperCase()}</div><div className="min-w-0"><CardTitle className="truncate text-xl">{agreement.clientName}</CardTitle><p className="mt-1 text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">{formatAgreementReference(agreement.id)} · {agreement.instituteType}</p></div></div><Badge className="shrink-0 bg-emerald-100 text-emerald-700 hover:bg-emerald-100"><CheckCircle2 className="mr-1 h-3.5 w-3.5" />Approved</Badge></CardHeader><CardContent className="space-y-5 p-5"><div className="grid gap-3 text-sm sm:grid-cols-2"><Detail icon={<UsersRound />} label="Owner" value={agreement.clientOwnerName} /><Detail icon={<Phone />} label="Contact" value={agreement.contactNumber} /><Detail icon={<Mail />} label="Email" value={agreement.email} /><Detail icon={<MapPin />} label="Address" value={agreement.address} wide /></div><div className="grid gap-3 rounded-xl bg-slate-50 p-4 text-sm sm:grid-cols-3"><Metric label="Students" value={Number(agreement.noOfStudents).toLocaleString("en-IN")} /><Metric label="Branches" value={agreement.branchCoverage === "multiple" ? `${agreement.branchCount} branches` : "Individual"} /><Metric label="Agreement value" value={money(agreement.totalPrice)} /></div><div className="grid gap-3 border-t border-slate-100 pt-4 text-sm sm:grid-cols-2"><Detail icon={<CalendarDays />} label="Plan period" value={`${date(agreement.startDate)} – ${date(agreement.endDate)}`} /><Detail icon={<CheckCircle2 />} label="Approved on" value={date(agreement.decidedAt ?? agreement.signatureDate)} /><Detail label="Pricing" value={agreement.pricingMode === "package" ? `Package · ${money(agreement.packagePrice)}` : `Per student · ${money(agreement.perStudentPrice)}`} /><Detail label="Plan duration" value={`${agreement.noOfYearPlan} year${agreement.noOfYearPlan === 1 ? "" : "s"}`} /></div>{agreement.description && <div className="rounded-xl border border-slate-100 bg-white p-4 text-sm text-slate-600"><p className="mb-1 text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">Description / note</p>{agreement.description}</div>}</CardContent></Card>)}</div>}
  </div></main></DashboardLayout>;
}

function Detail({ icon, label, value, wide }: { icon?: ReactNode; label: string; value: string; wide?: boolean }) { return <div className={wide ? "sm:col-span-2" : ""}><p className="mb-1 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.1em] text-slate-400">{icon && <span className="text-[#3157d5]">{icon}</span>}{label}</p><p className="break-words text-slate-700">{value || "—"}</p></div>; }
function Metric({ label, value }: { label: string; value: string }) { return <div><p className="text-xs uppercase tracking-[0.1em] text-slate-400">{label}</p><p className="mt-1 font-semibold text-slate-800">{value}</p></div>; }
function Stat({ label, value, icon }: { label: string; value: string; icon: ReactNode }) { return <Card className="border-0 shadow-[0_12px_40px_rgba(30,45,80,0.06)]"><CardContent className="flex items-center justify-between p-5"><div><p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">{label}</p><p className="mt-2 text-2xl font-semibold text-slate-800">{value}</p></div><div className="rounded-xl bg-emerald-50 p-3 text-emerald-600">{icon}</div></CardContent></Card>; }
