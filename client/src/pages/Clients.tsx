import DashboardLayout from "@/components/DashboardLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { trpc } from "@/lib/trpc";
import { formatAgreementReference } from "@shared/agreement";
import { CalendarDays, CheckCircle2, ChevronLeft, ChevronRight, Eye, Mail, MapPin, Phone, Search, UsersRound } from "lucide-react";
import { useMemo, useState } from "react";

type Client = {
  id: number;
  clientName: string;
  clientOwnerName: string;
  contactNumber: string;
  email: string;
  address: string;
  noOfStudents: number;
  pricingMode: "perStudent" | "package";
  perStudentPrice: string | null;
  packagePrice: string | null;
  noOfYearPlan: number;
  startDate: string;
  endDate: string;
  totalPrice: string;
  description: string | null;
  logoUrl: string | null;
  instituteType: "School" | "College" | "Academy";
  branchCoverage: "individual" | "multiple";
  branchCount: number;
  signatureDate: string | null;
  decidedAt: Date | null;
};

function money(value: number | string | null | undefined) {
  return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(Number(value ?? 0));
}

function date(value: string | Date | null | undefined) {
  if (!value) return "—";
  return new Date(value).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
}

export default function Clients() {
  const [search, setSearch] = useState("");
  const [instituteType, setInstituteType] = useState<"all" | "School" | "College" | "Academy">("all");
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<Client | null>(null);
  const pageSize = 25;
  const input = useMemo(() => ({ page, pageSize, search: search.trim() || undefined, instituteType: instituteType === "all" ? undefined : instituteType }), [page, search, instituteType]);
  const { data, isLoading } = trpc.clients.list.useQuery(input);
  const items = data?.items ?? [];

  const changeSearch = (value: string) => { setSearch(value); setPage(1); };
  const changeInstitute = (value: typeof instituteType) => { setInstituteType(value); setPage(1); };

  return <DashboardLayout><main className="min-h-full bg-[#f7f8fc] -m-3 p-4 text-[#172033] sm:-m-4 sm:p-8 lg:p-10"><div className="mx-auto max-w-7xl">
    <header className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between"><div><h1 className="font-serif text-[2.7rem] leading-[1.08] tracking-[-0.03em] text-[#172033] sm:text-5xl">Clients</h1><p className="mt-3 text-sm text-slate-500">Manage approved clients with search, filters, and pagination.</p></div><div className="flex w-full flex-col gap-3 sm:flex-row lg:w-auto"><div className="relative w-full sm:w-80"><Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" /><Input value={search} onChange={(event) => changeSearch(event.target.value)} className="bg-white pl-9" placeholder="Search clients…" aria-label="Search approved clients" /></div><select value={instituteType} onChange={(event) => changeInstitute(event.target.value as typeof instituteType)} aria-label="Filter by institute type" className="h-10 rounded-md border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none focus:border-[#3157d5] focus:ring-2 focus:ring-[#3157d5]/10"><option value="all">All institute types</option><option value="School">Schools</option><option value="College">Colleges</option><option value="Academy">Academies</option></select></div></header>
    <div className="mb-6 grid gap-4 sm:grid-cols-3"><Stat label="Approved clients" value={data?.total.toString() ?? "—"} icon={<CheckCircle2 className="h-5 w-5" />} /><Stat label="Active students" value={data?.summary.students.toLocaleString("en-IN") ?? "—"} icon={<UsersRound className="h-5 w-5" />} /><Stat label="Approved value" value={data ? money(data.summary.value) : "—"} icon={<CheckCircle2 className="h-5 w-5" />} /></div>
    <Card className="border-0 shadow-[0_18px_60px_rgba(30,45,80,0.07)]"><CardHeader className="flex flex-row items-center justify-between border-b border-slate-100 pb-5"><div><CardTitle className="font-serif text-2xl">Approved clients</CardTitle><p className="mt-1 text-xs text-slate-400">Showing {items.length ? (page - 1) * pageSize + 1 : 0}–{(page - 1) * pageSize + items.length} of {data?.total ?? 0}</p></div><Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100"><CheckCircle2 className="mr-1 h-3.5 w-3.5" />Approved only</Badge></CardHeader><CardContent className="p-0">{isLoading ? <div className="p-12 text-center text-sm text-slate-500">Loading approved clients…</div> : items.length === 0 ? <div className="p-12 text-center"><CheckCircle2 className="mx-auto h-10 w-10 text-slate-300" /><h2 className="mt-4 text-lg font-semibold">No approved clients found</h2><p className="mt-1 text-sm text-slate-500">Try a different search or institute filter.</p></div> : <><div className="overflow-x-auto"><table className="w-full min-w-[920px] text-left text-sm"><thead className="bg-slate-50/70 text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-400"><tr><th className="px-5 py-3">Client & reference</th><th className="px-4 py-3">Owner & contact</th><th className="px-4 py-3">Plan</th><th className="px-4 py-3">Value</th><th className="px-4 py-3">Approved on</th><th className="px-5 py-3 text-right">Action</th></tr></thead><tbody className="divide-y divide-slate-100">{items.map((client) => <tr key={client.id} className="transition-colors hover:bg-slate-50/70"><td className="px-5 py-4"><div className="flex items-center gap-3"><div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-[#eef2ff] font-semibold text-[#3157d5]">{client.logoUrl ? <img src={client.logoUrl} alt={`${client.clientName} logo`} className="h-full w-full object-contain" /> : client.clientName.slice(0, 2).toUpperCase()}</div><div className="min-w-0"><p className="max-w-[230px] truncate font-semibold text-slate-800">{client.clientName}</p><p className="mt-1 text-xs uppercase tracking-[0.1em] text-slate-400">{formatAgreementReference(client.id)} · {client.instituteType}</p></div></div></td><td className="px-4 py-4"><p className="font-medium text-slate-700">{client.clientOwnerName}</p><p className="mt-1 max-w-[190px] truncate text-xs text-slate-500">{client.email}</p><p className="mt-1 text-xs text-slate-500">{client.contactNumber}</p></td><td className="px-4 py-4"><p className="font-medium text-slate-700">{Number(client.noOfStudents).toLocaleString("en-IN")} students</p><p className="mt-1 text-xs text-slate-500">{client.branchCoverage === "multiple" ? `${client.branchCount} branches` : "Individual branch"}</p><p className="mt-1 text-xs text-slate-500">{date(client.startDate)} – {date(client.endDate)}</p></td><td className="px-4 py-4"><p className="font-semibold text-slate-800">{money(client.totalPrice)}</p><p className="mt-1 text-xs text-slate-500">{client.pricingMode === "package" ? "Package" : "Per student"}</p></td><td className="px-4 py-4 text-slate-600">{date(client.decidedAt ?? client.signatureDate)}</td><td className="px-5 py-4 text-right"><Button variant="outline" size="sm" onClick={() => setSelected(client)}><Eye className="mr-2 h-4 w-4" />Details</Button></td></tr>)}</tbody></table></div><div className="flex flex-col gap-3 border-t border-slate-100 px-5 py-4 text-xs text-slate-400 sm:flex-row sm:items-center sm:justify-between"><span>Page {page} of {data?.totalPages ?? 1}</span><div className="flex items-center gap-2"><Button variant="outline" size="sm" disabled={page <= 1} onClick={() => setPage((value) => value - 1)} aria-label="Previous clients page"><ChevronLeft className="h-4 w-4" /></Button><Button variant="outline" size="sm" disabled={page >= (data?.totalPages ?? 1)} onClick={() => setPage((value) => value + 1)} aria-label="Next clients page"><ChevronRight className="h-4 w-4" /></Button></div></div></>}</CardContent></Card>
    <Dialog open={Boolean(selected)} onOpenChange={(open) => !open && setSelected(null)}><DialogContent className="max-h-[90vh] w-[min(720px,calc(100vw-2rem))] overflow-y-auto bg-white text-[#172033]"><DialogHeader><DialogTitle className="font-serif text-2xl">{selected?.clientName}</DialogTitle></DialogHeader>{selected && <div className="space-y-5"><div className="flex items-center gap-3"><div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-xl bg-[#eef2ff] font-semibold text-[#3157d5]">{selected.logoUrl ? <img src={selected.logoUrl} alt="Client logo" className="h-full w-full object-contain" /> : selected.clientName.slice(0, 2).toUpperCase()}</div><div><p className="text-xs uppercase tracking-[0.12em] text-slate-400">{formatAgreementReference(selected.id)} · {selected.instituteType}</p><Badge className="mt-2 bg-emerald-100 text-emerald-700 hover:bg-emerald-100">Approved</Badge></div></div><div className="grid gap-4 text-sm sm:grid-cols-2"><Detail icon={<UsersRound />} label="Owner" value={selected.clientOwnerName} /><Detail icon={<Phone />} label="Contact" value={selected.contactNumber} /><Detail icon={<Mail />} label="Email" value={selected.email} /><Detail icon={<MapPin />} label="Address" value={selected.address} wide /><Detail icon={<UsersRound />} label="Students and branches" value={`${Number(selected.noOfStudents).toLocaleString("en-IN")} students · ${selected.branchCoverage === "multiple" ? `${selected.branchCount} branches` : "Individual branch"}`} /><Detail icon={<CalendarDays />} label="Plan period" value={`${date(selected.startDate)} – ${date(selected.endDate)}`} /><Detail label="Pricing" value={selected.pricingMode === "package" ? `Package · ${money(selected.packagePrice)}` : `Per student · ${money(selected.perStudentPrice)}`} /><Detail label="Plan duration" value={`${selected.noOfYearPlan} year${selected.noOfYearPlan === 1 ? "" : "s"}`} /><Detail label="Total value" value={money(selected.totalPrice)} /><Detail label="Approved on" value={date(selected.decidedAt ?? selected.signatureDate)} /></div>{selected.description && <div className="rounded-xl bg-slate-50 p-4 text-sm text-slate-600"><p className="mb-1 text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">Description / note</p>{selected.description}</div>}</div>}</DialogContent></Dialog>
  </div></main></DashboardLayout>;
}

function Detail({ icon, label, value, wide }: { icon?: React.ReactNode; label: string; value: string; wide?: boolean }) { return <div className={wide ? "sm:col-span-2" : ""}><p className="mb-1 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.1em] text-slate-400">{icon && <span className="text-[#3157d5]">{icon}</span>}{label}</p><p className="break-words text-slate-700">{value || "—"}</p></div>; }
function Stat({ label, value, icon }: { label: string; value: string; icon: React.ReactNode }) { return <Card className="border-0 shadow-[0_12px_40px_rgba(30,45,80,0.06)]"><CardContent className="flex items-center justify-between p-5"><div><p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">{label}</p><p className="mt-2 text-2xl font-semibold text-slate-800">{value}</p></div><div className="rounded-xl bg-emerald-50 p-3 text-emerald-600">{icon}</div></CardContent></Card>; }
