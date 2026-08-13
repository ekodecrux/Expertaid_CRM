import { useEffect, useRef, useState, type ReactNode } from "react";
import { useRoute } from "wouter";
import { trpc } from "@/lib/trpc";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertCircle, Building2, CalendarClock, CheckCircle2, FileCheck2, FileText, Handshake, Mail, MapPin, MessageSquare, Network, PenLine, Phone, Printer, RotateCcw, ShieldCheck, Tag, Users } from "lucide-react";
import { toast } from "sonner";

const COMPANY_LOGO = "/manus-storage/EXPLOGO2024_3ab64898.png";

function formatMoney(value: string | number) {
  return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 2 }).format(Number(value));
}

function SignatureCanvas({ onChange }: { onChange: (dataUrl: string | null) => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawing = useRef(false);
  const [hasSignature, setHasSignature] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ratio = Math.max(window.devicePixelRatio || 1, 1);
    canvas.width = canvas.offsetWidth * ratio;
    canvas.height = canvas.offsetHeight * ratio;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.scale(ratio, ratio);
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.lineWidth = 2.2;
      ctx.strokeStyle = "#172033";
    }
  }, []);

  const point = (event: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current!;
    const rect = canvas.getBoundingClientRect();
    return { x: event.clientX - rect.left, y: event.clientY - rect.top };
  };
  const start = (event: React.PointerEvent<HTMLCanvasElement>) => {
    event.currentTarget.setPointerCapture(event.pointerId);
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;
    const p = point(event);
    ctx.beginPath();
    ctx.moveTo(p.x, p.y);
    drawing.current = true;
    setHasSignature(true);
  };
  const move = (event: React.PointerEvent<HTMLCanvasElement>) => {
    if (!drawing.current) return;
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;
    const p = point(event);
    ctx.lineTo(p.x, p.y);
    ctx.stroke();
  };
  const end = () => {
    drawing.current = false;
    const canvas = canvasRef.current;
    if (canvas && hasSignature) onChange(canvas.toDataURL("image/png"));
  };
  const clear = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (canvas && ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasSignature(false);
    onChange(null);
  };

  return <div><div className="relative overflow-hidden rounded-xl border border-dashed border-slate-300 bg-white"><canvas ref={canvasRef} className="h-40 w-full touch-none cursor-crosshair" onPointerDown={start} onPointerMove={move} onPointerUp={end} onPointerCancel={end} aria-label="Draw your signature" />{!hasSignature && <span className="pointer-events-none absolute inset-0 flex items-center justify-center text-sm text-slate-400">Draw your signature here</span>}</div><Button type="button" variant="ghost" size="sm" className="mt-2 px-0 text-slate-500" onClick={clear}><RotateCcw className="mr-2 h-4 w-4" />Clear signature</Button></div>;
}

export default function AgreementPage() {
  const [, params] = useRoute("/agreement/:token");
  const token = params?.token ?? "";
  const { data: agreement, isLoading } = trpc.agreements.byToken.useQuery({ token }, { enabled: Boolean(token) });
  const respond = trpc.agreements.respond.useMutation();
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [signatureDataUrl, setSignatureDataUrl] = useState<string | null>(null);
  const [signatureDate, setSignatureDate] = useState(new Date().toISOString().slice(0, 10));

  if (isLoading) return <div className="min-h-screen bg-[#f5f7fb] p-10 text-center text-slate-500">Loading agreement…</div>;
  if (!agreement) return <div className="flex min-h-screen items-center justify-center bg-[#f5f7fb] p-6"><Card className="max-w-md"><CardContent className="p-8 text-center"><AlertCircle className="mx-auto mb-4 h-10 w-10 text-rose-500" /><h1 className="text-xl font-semibold">Agreement not found</h1><p className="mt-2 text-sm text-slate-500">This link may be invalid or no longer available.</p></CardContent></Card></div>;

  const decided = agreement.status !== "Pending";
  const submit = (decision: "Approved" | "Rejected") => {
    if (decision === "Approved" && (!termsAccepted || !signatureDataUrl || !signatureDate)) {
      toast.error("Please accept the terms, draw your signature, and confirm the signature date.");
      return;
    }
    respond.mutate({ token, decision, termsAccepted, signatureDataUrl: signatureDataUrl ?? undefined, signatureDate: signatureDate || undefined }, {
      onSuccess: () => toast.success(decision === "Approved" ? "Agreement approved successfully." : "Agreement rejected."),
      onError: (error) => toast.error(error.message),
    });
  };

  const clientLogo = agreement.logoUrl || COMPANY_LOGO;
  const dateLabel = new Date(agreement.createdAt).toLocaleDateString("en-IN", { dateStyle: "long" });

  return <div className="agreement-page min-h-screen bg-[#f7f9fd] px-3 py-4 font-sans text-[#172033] sm:px-6 lg:px-8 print:bg-white print:p-0">
    <div className="agreement-sheet mx-auto max-w-5xl overflow-hidden bg-white shadow-[0_22px_70px_rgba(30,45,80,0.1)] print:max-w-none print:shadow-none">
      <div className="agreement-top-stripe h-2 bg-gradient-to-r from-[#1e3a8a] via-[#3157d5] to-[#5742b7]" />
      <main className="px-5 pb-6 pt-5 sm:px-10 sm:pb-8 sm:pt-7 print:px-8 print:pb-4 print:pt-5">
        <header className="border-b border-slate-100 pb-5 print:pb-3">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex min-w-0 items-start gap-4"><img src={COMPANY_LOGO} alt="Expertaid Technologies Pvt. Ltd." className="h-12 w-auto max-w-[220px] object-contain sm:h-14" /><div className="border-l border-slate-300 pl-4"><p className="text-sm font-bold text-[#1f347f] sm:text-base">Expertaid Technologies Pvt. Ltd.</p><p className="mt-1 text-[10px] font-medium uppercase tracking-[0.13em] text-slate-500">ERP Application</p></div></div>
            <div className="flex items-center gap-2 self-end print:hidden sm:self-auto"><Badge className={agreement.status === "Approved" ? "bg-emerald-100 text-emerald-700" : agreement.status === "Rejected" ? "bg-rose-100 text-rose-700" : "bg-amber-100 text-amber-700"}>{agreement.status}</Badge><Button variant="outline" size="sm" onClick={() => window.print()}><Printer className="mr-2 h-4 w-4" />Print</Button></div>
          </div>
          <div className="mt-7 grid gap-5 sm:grid-cols-[1fr_270px] sm:items-end print:mt-5 print:grid-cols-[1fr_245px]">
            <div><h1 className="text-3xl font-bold uppercase tracking-tight text-[#1f347f] sm:text-4xl">Client Agreement</h1><p className="mt-3 max-w-md text-sm leading-6 text-slate-600">Please review the agreement details carefully before accepting.</p></div>
            <div className="rounded-2xl border border-slate-200 px-4 py-3"><div className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.12em] text-[#4b43a8]"><FileText className="h-4 w-4" />Agreement details</div><div className="grid grid-cols-[1fr_auto] gap-y-2 text-xs"><span className="text-slate-500">Agreement date</span><strong>{dateLabel}</strong><span className="text-slate-500">Reference No.</span><strong>#{agreement.id.toString().padStart(5, "0")}</strong></div></div>
          </div>
        </header>

        <section className="relative mt-6 overflow-hidden rounded-2xl bg-gradient-to-r from-[#1e3a8a] to-[#263b91] px-5 py-5 text-white sm:px-8 print:mt-4 print:py-4"><div className="absolute -right-4 -top-5 opacity-[0.08]"><Handshake className="h-36 w-36" /></div><div className="relative flex items-center gap-5"><div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-white p-3 shadow-sm"><img src={clientLogo} alt={`${agreement.clientName} logo`} className="max-h-full max-w-full object-contain" /></div><div className="min-w-0"><p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-100">Prepared for</p><h2 className="mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">{agreement.clientName}</h2><p className="mt-1 text-sm text-blue-100">Attention: {agreement.clientOwnerName}</p></div></div></section>

        <section className="mt-6 print:mt-4"><div className="mb-4 flex items-center gap-2 text-[#273b8d]"><ShieldCheck className="h-5 w-5" /><h2 className="text-sm font-bold uppercase tracking-[0.08em]">Client & plan information</h2><div className="h-px flex-1 bg-[#cfd5ee]" /></div><div className="grid gap-3 sm:grid-cols-2">
          <Info icon={<Phone />} label="Contact number" value={agreement.contactNumber} /><Info icon={<Mail />} label="Email address" value={agreement.email} /><Info icon={<Building2 />} label="Institute type" value={agreement.instituteType ?? "School"} /><Info icon={<Network />} label="Branch coverage" value={agreement.branchCoverage === "multiple" ? `${agreement.branchCount} branches` : "Individual branch"} /><Info icon={<MapPin />} label="Address" value={agreement.address} wide /><Info icon={<Users />} label="Number of students" value={agreement.noOfStudents.toLocaleString("en-IN")} /><Info icon={<Tag />} label={agreement.pricingMode === "package" ? "Package price" : "Per student price"} value={formatMoney(agreement.pricingMode === "package" ? (agreement.packagePrice ?? 0) : (agreement.perStudentPrice ?? 0))} /><Info icon={<CalendarClock />} label="Plan duration" value={`${agreement.noOfYearPlan} ${agreement.noOfYearPlan === 1 ? "year" : "years"}`} /><Info icon={<CalendarClock />} label="Plan period" value={`${agreement.startDate} — ${agreement.endDate}`} /></div></section>

        <section className="mt-6 flex items-center justify-between gap-5 rounded-2xl border border-[#a9a5e5] bg-[#f4f2ff] px-5 py-4 sm:px-8 print:mt-4 print:py-3"><div><p className="text-sm font-bold uppercase tracking-[0.12em] text-[#4b43a8]">Agreement value</p><p className="mt-1 text-3xl font-bold tracking-tight text-[#173578]">{formatMoney(agreement.totalPrice)}</p><p className="mt-1 text-xs text-slate-600">Calculated from the selected pricing method and plan duration.</p></div><div className="hidden rounded-xl bg-white p-3 text-[#4b43a8] shadow-sm sm:block"><FileCheck2 className="h-10 w-10" /></div></section>

        {agreement.description && <section className="mt-5"><SectionLabel icon={<MessageSquare />} text="Description / Note" /><p className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700">{agreement.description}</p></section>}

        <section className="mt-6 grid gap-6 border-t border-slate-200 pt-5 sm:grid-cols-[1.35fr_0.65fr] print:mt-4 print:gap-5 print:pt-4"><div><SectionLabel icon={<FileText />} text="Terms & Conditions" /><p className="text-sm leading-6 text-slate-600">By accepting this agreement, the client confirms that the information above is accurate, agrees to the selected ERP plan and total value, and authorizes the use of their digital signature as evidence of acceptance.</p></div>{decided && agreement.signatureUrl && <div className="self-end sm:text-right"><p className="mb-2 text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">Authorized Signature (Digital)</p><img src={agreement.signatureUrl} alt="Client signature" className="ml-auto h-20 max-w-[190px] object-contain object-right" /><div className="mt-1 border-t border-slate-400 pt-1 text-xs text-slate-600"><PenLine className="mr-1 inline h-3 w-3" />Signed {agreement.signatureDate || "—"}</div></div>}</section>

        {decided && <div className="mt-3 flex items-center gap-2 text-xs text-slate-500 print:hidden"><CheckCircle2 className={agreement.status === "Approved" ? "h-4 w-4 text-emerald-600" : "h-4 w-4 text-rose-600"} />This agreement is {agreement.status.toLowerCase()}. Decision recorded on {agreement.decidedAt ? new Date(agreement.decidedAt).toLocaleString("en-IN") : "—"}.</div>}
        {!decided && <section className="mt-6 print:hidden"><div className="mb-5 flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-4"><Checkbox id="terms" checked={termsAccepted} onCheckedChange={(value) => setTermsAccepted(value === true)} /><Label htmlFor="terms" className="cursor-pointer text-sm leading-6 text-slate-600">I have read and accept the Terms & Conditions and confirm that I am authorized to accept this agreement on behalf of the client.</Label></div><div className="grid gap-6 sm:grid-cols-[1.4fr_0.6fr]"><div><Label className="mb-2 block">Client signature</Label><SignatureCanvas onChange={setSignatureDataUrl} /></div><div><Label htmlFor="signatureDate">Signature date</Label><Input id="signatureDate" type="date" className="mt-2" value={signatureDate} onChange={(e) => setSignatureDate(e.target.value)} /><p className="mt-3 text-xs leading-5 text-slate-500">Your drawn signature and acceptance date will be securely attached to this agreement.</p></div></div><div className="mt-7 flex flex-col-reverse gap-3 border-t border-slate-100 pt-6 sm:flex-row sm:justify-end"><Button variant="outline" className="border-rose-200 text-rose-700 hover:bg-rose-50" onClick={() => submit("Rejected")} disabled={respond.isPending}>Decline agreement</Button><Button className="bg-[#3157d5] text-white hover:bg-[#2748bd]" onClick={() => submit("Approved")} disabled={respond.isPending}><CheckCircle2 className="mr-2 h-4 w-4" />Accept & sign agreement</Button></div></section>}
      </main>
      <footer className="flex items-center justify-center gap-4 bg-[#1e347e] px-4 py-3 text-xs text-white print:py-2"><span className="inline-flex items-center gap-2"><ShieldCheck className="h-4 w-4" />Expertaid Technologies Pvt Ltd</span><span className="h-4 w-px bg-white/40" /><span>Secure digital agreement workflow</span></footer>
    </div>
  </div>;
}

function SectionLabel({ icon, text }: { icon: ReactNode; text: string }) { return <div className="mb-3 flex items-center gap-2 text-[#273b8d]"><span className="flex h-5 w-5 items-center justify-center">{icon}</span><span className="text-xs font-bold uppercase tracking-[0.08em]">{text}</span></div>; }
function Info({ icon, label, value, wide }: { icon: ReactNode; label: string; value: string; wide?: boolean }) { return <div className={`flex min-h-[72px] items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-[0_2px_5px_rgba(30,45,80,0.04)] ${wide ? "sm:col-span-2" : ""}`}><span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#f0efff] text-[#4b43a8]">{icon}</span><div className="min-w-0"><p className="text-[10px] font-semibold uppercase tracking-[0.13em] text-slate-500">{label}</p><p className="mt-1 break-words text-sm font-semibold text-[#172033]">{value}</p></div></div>; }
