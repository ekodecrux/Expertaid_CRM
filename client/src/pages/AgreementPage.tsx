import { useEffect, useRef, useState } from "react";
import { useRoute } from "wouter";
import { trpc } from "@/lib/trpc";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { AlertCircle, CheckCircle2, FileCheck2, Printer, RotateCcw, ShieldCheck } from "lucide-react";
import { toast } from "sonner";

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

  return (
    <div>
      <div className="relative overflow-hidden rounded-2xl border border-dashed border-slate-300 bg-white">
        <canvas ref={canvasRef} className="h-40 w-full touch-none cursor-crosshair" onPointerDown={start} onPointerMove={move} onPointerUp={end} onPointerCancel={end} aria-label="Draw your signature" />
        {!hasSignature && <span className="pointer-events-none absolute inset-0 flex items-center justify-center text-sm text-slate-400">Draw your signature here</span>}
      </div>
      <Button type="button" variant="ghost" size="sm" className="mt-2 px-0 text-slate-500" onClick={clear}><RotateCcw className="mr-2 h-4 w-4" />Clear signature</Button>
    </div>
  );
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

  return <div className="min-h-screen bg-[#f5f7fb] px-4 py-6 font-sans text-[#172033] sm:px-8 lg:py-10 print:bg-white print:p-0">
    <div className="mx-auto max-w-4xl">
      <header className="mb-6 flex items-start justify-between gap-4 print:mb-4">
        <div><div className="mb-3 inline-flex items-center gap-2 text-sm font-semibold tracking-[0.18em] text-[#3157d5] uppercase"><FileCheck2 className="h-5 w-5" />Asteria ERP</div><h1 className="font-serif text-3xl tracking-tight text-[#172033] sm:text-4xl">Client Agreement</h1><p className="mt-2 text-sm text-slate-500">Please review the agreement details carefully before accepting.</p></div>
        <div className="flex items-center gap-2 print:hidden"><Badge className={agreement.status === "Approved" ? "bg-emerald-100 text-emerald-700" : agreement.status === "Rejected" ? "bg-rose-100 text-rose-700" : "bg-amber-100 text-amber-700"}>{agreement.status}</Badge><Button variant="outline" size="sm" onClick={() => window.print()}><Printer className="mr-2 h-4 w-4" />Print</Button></div>
      </header>

      <Card className="overflow-hidden border-0 shadow-[0_20px_70px_rgba(30,45,80,0.09)] print:shadow-none print:ring-1 print:ring-slate-200">
        <div className="h-2 bg-[#3157d5]" />
        <CardContent className="space-y-8 p-6 sm:p-10">
          <section className="flex flex-col justify-between gap-6 border-b border-slate-100 pb-7 sm:flex-row"><div><p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Prepared for</p><h2 className="mt-2 text-2xl font-semibold">{agreement.clientName}</h2><p className="mt-1 text-sm text-slate-500">Attention: {agreement.clientOwnerName}</p></div><div className="text-left sm:text-right"><p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Agreement date</p><p className="mt-2 font-medium">{new Date(agreement.createdAt).toLocaleDateString("en-IN", { dateStyle: "long" })}</p><p className="mt-1 text-xs text-slate-500">Reference #{agreement.id.toString().padStart(5, "0")}</p></div></section>
          <section><div className="mb-4 flex items-center gap-2"><ShieldCheck className="h-5 w-5 text-[#3157d5]" /><h2 className="font-semibold">Client & plan information</h2></div><div className="grid gap-3 sm:grid-cols-2"><Info label="Contact number" value={agreement.contactNumber} /><Info label="Email address" value={agreement.email} /><Info label="Address" value={agreement.address} wide /><Info label="Number of students" value={agreement.noOfStudents.toLocaleString("en-IN")} /><Info label="Per student price" value={formatMoney(agreement.perStudentPrice)} /><Info label="Plan duration" value={`${agreement.noOfYearPlan} ${agreement.noOfYearPlan === 1 ? "year" : "years"}`} /><Info label="Plan period" value={`${agreement.startDate} — ${agreement.endDate}`} /></div></section>
          <section className="rounded-2xl bg-[#f3f6ff] p-5 sm:p-6"><div className="flex items-start justify-between gap-4"><div><p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#3157d5]">Agreement value</p><p className="mt-2 text-3xl font-semibold tracking-tight text-[#172033]">{formatMoney(agreement.totalPrice)}</p><p className="mt-1 text-sm text-slate-500">Calculated from students, per-student price, and plan duration.</p></div><div className="hidden rounded-xl bg-white p-3 sm:block"><FileCheck2 className="h-6 w-6 text-[#3157d5]" /></div></div></section>
          {agreement.description && <section><p className="mb-2 text-sm font-semibold">Description / Note</p><p className="whitespace-pre-wrap rounded-xl border border-slate-100 bg-slate-50 p-4 text-sm leading-6 text-slate-600">{agreement.description}</p></section>}
          <section className="border-t border-slate-100 pt-7"><h2 className="font-semibold">Terms & Conditions</h2><p className="mt-3 text-sm leading-7 text-slate-600">By accepting this agreement, the client confirms that the information above is accurate, agrees to the selected ERP plan and total value, and authorizes the use of their digital signature as evidence of acceptance.</p></section>
          {decided ? <section className="rounded-2xl border border-slate-200 bg-slate-50 p-5"><div className="flex items-center gap-3"><CheckCircle2 className={agreement.status === "Approved" ? "h-6 w-6 text-emerald-600" : "h-6 w-6 text-rose-600"} /><div><h2 className="font-semibold">This agreement is {agreement.status.toLowerCase()}</h2><p className="mt-1 text-sm text-slate-500">Decision recorded on {agreement.decidedAt ? new Date(agreement.decidedAt).toLocaleString("en-IN") : "—"}{agreement.signatureDate ? ` · Signed on ${agreement.signatureDate}` : ""}.</p></div></div>{agreement.signatureUrl && <div className="mt-5 border-t border-slate-200 pt-5"><p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Client signature</p><img src={agreement.signatureUrl} alt="Client signature" className="h-24 max-w-full object-contain object-left" /></div>}</section> : <section className="print:hidden"><div className="mb-5 flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-4"><Checkbox id="terms" checked={termsAccepted} onCheckedChange={(value) => setTermsAccepted(value === true)} /><Label htmlFor="terms" className="cursor-pointer text-sm leading-6 text-slate-600">I have read and accept the Terms & Conditions and confirm that I am authorized to accept this agreement on behalf of the client.</Label></div><div className="grid gap-6 sm:grid-cols-[1.4fr_0.6fr]"><div><Label className="mb-2 block">Client signature</Label><SignatureCanvas onChange={setSignatureDataUrl} /></div><div><Label htmlFor="signatureDate">Signature date</Label><Input id="signatureDate" type="date" className="mt-2" value={signatureDate} onChange={(e) => setSignatureDate(e.target.value)} /><p className="mt-3 text-xs leading-5 text-slate-500">Your drawn signature and acceptance date will be securely attached to this agreement.</p></div></div><div className="mt-7 flex flex-col-reverse gap-3 border-t border-slate-100 pt-6 sm:flex-row sm:justify-end"><Button variant="outline" className="border-rose-200 text-rose-700 hover:bg-rose-50" onClick={() => submit("Rejected")} disabled={respond.isPending}>Decline agreement</Button><Button className="bg-[#3157d5] text-white hover:bg-[#2748bd]" onClick={() => submit("Approved")} disabled={respond.isPending}><CheckCircle2 className="mr-2 h-4 w-4" />Accept & sign agreement</Button></div></section>}
        </CardContent>
      </Card>
      <p className="mt-6 text-center text-xs text-slate-400">Powered by Asteria ERP · Secure digital agreement workflow</p>
    </div>
  </div>;
}

function Info({ label, value, wide }: { label: string; value: string; wide?: boolean }) { return <div className={`rounded-xl border border-slate-100 bg-white p-4 ${wide ? "sm:col-span-2" : ""}`}><p className="text-xs font-medium uppercase tracking-[0.14em] text-slate-400">{label}</p><p className="mt-1.5 text-sm font-medium text-slate-700">{value}</p></div>; }
