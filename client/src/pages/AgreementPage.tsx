import { useEffect, useRef, useState, type ReactNode } from "react";
import { useRoute } from "wouter";
import { trpc } from "@/lib/trpc";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertCircle, Building2, CalendarClock, CheckCircle2, FileCheck2, FileText, Handshake, Mail, MapPin, MessageSquare, Network, PenLine, Phone, Printer, RotateCcw, ShieldCheck, Tag, Users, Eye } from "lucide-react";
import { toast } from "sonner";
import { TERMS_DOCUMENT_FULL } from "@/data/softwareServiceAgreement";

const COMPANY_LOGO = "/manus-storage/EXPLOGO2024_3ab64898.png";

const TERMS_DOCUMENT = `Software Service Agreement

1. Term
This agreement begins on the Effective Date and will continue until terminated (the Term).

2. Grant of License to Access and Use Service
Company hereby grants an installation and service of Android app, Dynamic website and ERP system for school management to Customer, including to all Customer's Authorized Users, a non-exclusive, non-sub licensable, non-assignable, royalty-free, and worldwide license to access and use the App and ERP (the Service) solely for Customer's internal business operations in accordance with the terms of this agreement and the Company's online terms of use.

3. Support Services
3.1 Initial Support: For the period beginning on the Effective Date, and at Company's expense, Company will provide Customer with telephone or electronic support during Company's normal business hours in order to help Customer correct problems with the Software, and an internet-based support system generally available seven days a week, twenty-four hours a day.
3.2 Renewed Support: After the initial support period, Customer may elect to renew Company's support services for additional periods at Company's then-current service rates. Company will continue the services as long as Customer is making payment on time or until Company closes.

4. Service Levels
4.1 Applicable Levels: Company shall provide the Service to Customer with a System Availability of at least 99% during each calendar month.
4.2 System Maintenance & Updates: Company may take the services offline for scheduled maintenance, change its schedule of maintenance on one month's written notice to Customer, and provide future updates without additional cost.
4.3 System Availability Definition: System Availability will not include minutes of downtime resulting from scheduled maintenance, events of force majeure, malicious attacks on the system, or issues associated with Customer's computing devices, local area networks, or internet service provider conditions.

5. Data Protection
Company shall implement appropriate safeguards to prevent unauthorized access to, use of, or disclosure of Protected Information. As an ERP Software Vendor, Company agrees and assures that all data shared by the School, including but not limited to student, staff, academic, and financial information, shall remain the sole property of the School and shall be treated as strictly confidential. The Vendor shall not use, disclose, or share such data for any purpose other than fulfilling its contractual obligations under this agreement. The Vendor shall implement appropriate technical and organizational measures on a secured cloud platform to protect the data from unauthorized access, loss, or misuse, and shall comply with all applicable data protection laws. Upon termination of the agreement, all school data in the Vendor's possession shall be securely deleted or returned to the School.

6. Data Privacy
Company may collect, use, and process Customer's data only in accordance with Company's online privacy policy.

7. Notification of Security Breaches
7.1 Compliance with Notification Laws: Company shall comply with all applicable laws regarding notification of individuals in the event of an unauthorized release of personally identifiable information and other unauthorized data and information disclosures.
7.2 Procedure After Unauthorized Disclosure: Within 72 hours of discovering a breach of the Company's security obligations or any other event requiring notification under applicable law, Company shall notify Customer and any other individuals required to be notified by telephone and email.
7.3 Indemnification Related to Unauthorized Disclosure: Company shall indemnify and defend Customer against losses arising out of claims related to any unauthorized disclosure or other events requiring notification under applicable law.

8. Confidentiality Obligations
The parties continue to be bound by the disclosure and confidentiality agreement between the parties.

9. Customer Restrictions
Customer will not distribute, license, loan, or sell the Software or other content contained or displayed in it; modify, alter, or create derivative works of the Software; reverse engineer, decompile, decode, decrypt, disassemble, or derive source code from the Software; remove, alter, or obscure any copyright, trademark, or other proprietary rights notice; or upload, post, reproduce, or distribute material protected by copyright, privacy rights, or any other intellectual property right without permission of the owner.

10. Export Compliance
Company shall be solely responsible for obtaining all licenses, permits, or authorizations required from time to time by India or any other applicable government for export.

11. Ownership of Intellectual Property
Company will retain all interest in and to the Service, including all documentation, modifications, improvements, upgrades, derivative works, and all other intellectual property rights in connection with the Service, including Company's name, logos, and trademarks reproduced through the Service.

12. Termination
12.1 Termination on Notice: Customer may terminate this agreement for any reason on 30 days' notice to Company. Company shall not stop the service until the expiry of the membership plan.
12.2 Termination for Material Breach: Each party may terminate this agreement with immediate effect by delivering notice of termination to the other party if the other party fails to perform or materially breaches any obligation, covenant, or representation, and the failure or breach continues for 30 days after notice detailing the breach.
12.3 Termination for Failure to Pay: Company may terminate this agreement immediately if Customer fails to pay the yearly Subscription Fee after 30 days of expiry.

13. Effect of Termination
13.1 Pay Outstanding Amounts: Customer shall immediately pay Company all amounts outstanding as of the date of termination and any amounts outstanding because of termination.
13.2 Discontinuance of Use: Customer shall cease all use of the Service upon the effective date of termination.
13.3 Recovery of Data: Customer will have 30 days from the date of termination to retrieve any data Customer wishes to keep.

14. Indemnification
14.1 Indemnification by Company: Company shall indemnify Customer against losses and expenses arising out of a proceeding brought by a third party and arising from a claim that the Service infringes third-party intellectual property rights.
14.2 Notice and Failure to Notify: Before bringing a claim for indemnification, Customer shall notify Company of the proceeding and deliver the legal pleadings and other documents necessary to indemnify or defend it. If Customer fails to notify Company, Company will be relieved of its indemnification obligations.
14.3 Exclusive Remedy: Customer's right to indemnification is the exclusive remedy available with respect to a claim of indemnification.

15. Limitation on Liability
15.1 Mutual Limit on Liability: Neither party will be liable for breach-of-contract damages suffered by the other party that are remote or speculative or could not reasonably have been foreseen on entry into this agreement.
15.2 Maximum Liability: Neither party's liability under this agreement will exceed the fees paid under the agreement during the 12 months preceding the date upon which the related claim arose.

16. General Provisions
16.1 Entire Agreement: This agreement represents the entire understanding between the parties with respect to its subject matter and supersedes previous communications or agreements.
16.2 Amendment: This agreement can be amended only by a writing signed by both parties.
16.3 Assignment: Neither party may assign this agreement or its rights or obligations without the other party's written consent.
16.4 Notices: Notices will be given in writing by personal delivery, recognized next-day courier service, or first-class registered or certified mail, postage prepaid, to the address a party has notified for this purpose. A notice will be effective upon receipt or, if mailed, the earlier of receipt and the fifth business day after mailing.
16.5 Governing Law: This agreement will be governed, construed, and enforced in accordance with the laws of the State of Telangana, without regard to conflict-of-laws rules.
16.6 Severability: If any part of this agreement is declared unenforceable or invalid, the remainder will continue to be valid and enforceable.
16.7 Waiver: Failure or neglect by a party to enforce any right will not be deemed a waiver of that party's rights.
16.8 Force Majeure: A party shall not be liable for failure or delay in performance for a period that the failure or delay is beyond reasonable control, materially affects performance, and could not reasonably have been foreseen or provided against, but economic conditions or general market effects alone will not excuse failure or delay.`;

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
  const [termsViewerOpen, setTermsViewerOpen] = useState(false);
  const [termsScrolledToEnd, setTermsScrolledToEnd] = useState(false);
  const [signatureDataUrl, setSignatureDataUrl] = useState<string | null>(null);
  const [signatureDate, setSignatureDate] = useState(new Date().toISOString().slice(0, 10));

  if (isLoading) return <div className="min-h-screen bg-[#f5f7fb] p-10 text-center text-slate-500">Loading agreement…</div>;
  if (!agreement) return <div className="flex min-h-screen items-center justify-center bg-[#f5f7fb] p-6"><Card className="max-w-md"><CardContent className="p-8 text-center"><AlertCircle className="mx-auto mb-4 h-10 w-10 text-rose-500" /><h1 className="text-xl font-semibold">Agreement not found</h1><p className="mt-2 text-sm text-slate-500">This link may be invalid or no longer available.</p></CardContent></Card></div>;

  const decided = agreement.status !== "Pending";
  const submit = (decision: "Approved" | "Rejected") => {
    if (decision === "Approved" && (!termsAccepted || !signatureDataUrl || !signatureDate)) {
      toast.error("Please open View, scroll through the terms, confirm them, draw your signature, and confirm the signature date.");
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
            <div className="flex min-w-0 items-start gap-4"><img src={COMPANY_LOGO} alt="Expertaid Technologies Pvt. Ltd." className="block h-12 w-auto max-h-14 max-w-[220px] object-contain object-center sm:h-14" /><div className="border-l border-slate-300 pl-4"><p className="text-sm font-bold text-[#1f347f] sm:text-base">Expertaid Technologies Pvt. Ltd.</p><p className="mt-1 text-[10px] font-medium uppercase tracking-[0.13em] text-slate-500">ERP Solutions & IT Support Services</p></div></div>
            <div className="flex items-center gap-2 self-end print:hidden sm:self-auto"><Badge className={agreement.status === "Approved" ? "bg-emerald-100 text-emerald-700" : agreement.status === "Rejected" ? "bg-rose-100 text-rose-700" : "bg-amber-100 text-amber-700"}>{agreement.status}</Badge><Button variant="outline" size="sm" onClick={() => window.print()}><Printer className="mr-2 h-4 w-4" />Print</Button></div>
          </div>
          <div className="mt-7 grid gap-5 sm:grid-cols-[1fr_270px] sm:items-end print:mt-5 print:grid-cols-[1fr_245px]">
            <div><h1 className="text-3xl font-bold uppercase tracking-tight text-[#1f347f] sm:text-4xl">Client Agreement</h1><p className="mt-3 max-w-md text-sm leading-6 text-slate-600">Please review the agreement details carefully before accepting.</p></div>
            <div className="rounded-2xl border border-slate-200 px-4 py-3"><div className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.12em] text-[#4b43a8]"><FileText className="h-4 w-4" />Agreement details</div><div className="grid grid-cols-[1fr_auto] gap-y-2 text-xs"><span className="text-slate-500">Agreement date</span><strong>{dateLabel}</strong><span className="text-slate-500">Reference No.</span><strong>#{agreement.id.toString().padStart(5, "0")}</strong><span className="text-slate-500">Product name</span><strong>ERP Software</strong></div></div>
          </div>
        </header>

        <section className="relative mt-6 overflow-hidden rounded-2xl bg-gradient-to-r from-[#1e3a8a] to-[#263b91] px-5 py-5 text-white sm:px-8 print:mt-4 print:py-4"><div className="absolute -right-4 -top-5 opacity-[0.08]"><Handshake className="h-36 w-36" /></div><div className="relative flex items-center gap-5"><div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white p-3 shadow-sm"><img src={clientLogo} alt={`${agreement.clientName} logo`} className="block max-h-full max-w-full object-contain object-center" /></div><div className="min-w-0"><p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-100">Prepared for</p><h2 className="mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">{agreement.clientName}</h2><p className="mt-1 text-sm text-blue-100">Attention: {agreement.clientOwnerName}</p></div></div></section>

        <section className="mt-6 print:mt-4"><div className="mb-4 flex items-center gap-2 text-[#273b8d]"><ShieldCheck className="h-5 w-5" /><h2 className="text-sm font-bold uppercase tracking-[0.08em]">Client & plan information</h2><div className="h-px flex-1 bg-[#cfd5ee]" /></div><div className="grid gap-3 sm:grid-cols-2">
          <Info icon={<Phone />} label="Contact number" value={agreement.contactNumber} /><Info icon={<Mail />} label="Email address" value={agreement.email} /><Info icon={<Building2 />} label="Institute type" value={agreement.instituteType ?? "School"} /><Info icon={<Network />} label="Branch coverage" value={agreement.branchCoverage === "multiple" ? `${agreement.branchCount} branches` : "Individual branch"} /><Info icon={<MapPin />} label="Address" value={agreement.address} wide /><Info icon={<Users />} label="Number of students" value={agreement.noOfStudents.toLocaleString("en-IN")} /><Info icon={<Tag />} label={agreement.pricingMode === "package" ? "Package price" : "Per student price"} value={formatMoney(agreement.pricingMode === "package" ? (agreement.packagePrice ?? 0) : (agreement.perStudentPrice ?? 0))} /><Info icon={<CalendarClock />} label="Plan duration" value={`${agreement.noOfYearPlan} ${agreement.noOfYearPlan === 1 ? "year" : "years"}`} /><Info icon={<CalendarClock />} label="Plan period" value={`${agreement.startDate} — ${agreement.endDate}`} /></div></section>

        <section className="mt-6 flex items-center justify-between gap-5 rounded-2xl border border-[#a9a5e5] bg-[#f4f2ff] px-5 py-4 sm:px-8 print:mt-4 print:py-3"><div><p className="text-sm font-bold uppercase tracking-[0.12em] text-[#4b43a8]">Agreement value</p><p className="mt-1 text-3xl font-bold tracking-tight text-[#173578]">{formatMoney(agreement.totalPrice)}</p><p className="mt-1 text-xs text-slate-600">Calculated from the selected pricing method and plan duration.</p></div><div className="hidden rounded-xl bg-white p-3 text-[#4b43a8] shadow-sm sm:block"><FileCheck2 className="h-10 w-10" /></div></section>

        {agreement.description && <section className="mt-5"><SectionLabel icon={<MessageSquare />} text="Description / Note" /><p className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700">{agreement.description}</p></section>}

        <section className="mt-6 grid gap-6 border-t border-slate-200 pt-5 sm:grid-cols-[1.35fr_0.65fr] print:mt-4 print:gap-5 print:pt-4"><div><div className="mb-3 flex items-center justify-between gap-3"><SectionLabel icon={<FileText />} text="Terms & Conditions" />{!decided && <Button type="button" variant="outline" size="sm" className="shrink-0 border-[#c4c1f0] text-[#4b43a8] hover:bg-[#f4f2ff] print:hidden" onClick={() => setTermsViewerOpen(true)}><Eye className="mr-2 h-4 w-4" />View</Button>}</div><p className="text-sm leading-6 text-slate-600">By accepting this agreement, the client confirms that the information above is accurate, agrees to the selected ERP plan and total value, and authorizes the use of their digital signature as evidence of acceptance.</p></div>{decided && agreement.signatureUrl && <div className="self-end sm:text-right"><p className="mb-2 text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">Authorized Signature (Digital)</p><img src={agreement.signatureUrl} alt="Client signature" className="ml-auto block h-20 w-full max-w-[190px] object-contain object-right" /><div className="mt-1 border-t border-slate-400 pt-1 text-xs text-slate-600"><PenLine className="mr-1 inline h-3 w-3" />Signed {agreement.signatureDate || "—"}</div></div>}</section>

        {decided && <div className="mt-3 flex items-center gap-2 text-xs text-slate-500 print:hidden"><CheckCircle2 className={agreement.status === "Approved" ? "h-4 w-4 text-emerald-600" : "h-4 w-4 text-rose-600"} />This agreement is {agreement.status.toLowerCase()}. Decision recorded on {agreement.decidedAt ? new Date(agreement.decidedAt).toLocaleString("en-IN") : "—"}.</div>}
        {!decided && <section className="mt-6 print:hidden"><div className="mb-5 rounded-xl border border-slate-200 bg-white p-4"><p className="text-sm leading-6 text-slate-600">Open <span className="font-semibold text-[#4b43a8]">View</span> beside Terms & Conditions, scroll to the bottom, and complete the confirmation checkbox there before accepting this agreement.</p><p className="mt-2 text-xs text-slate-500">{termsAccepted ? "Terms confirmed." : termsScrolledToEnd ? "Return to the terms viewer to confirm the terms." : "Terms confirmation is required before acceptance."}</p></div><div className="grid gap-6 sm:grid-cols-[1.4fr_0.6fr]"><div><Label className="mb-2 block">Client signature</Label><SignatureCanvas onChange={setSignatureDataUrl} /></div><div><Label htmlFor="signatureDate">Signature date</Label><Input id="signatureDate" type="date" className="mt-2" value={signatureDate} onChange={(e) => setSignatureDate(e.target.value)} /><p className="mt-3 text-xs leading-5 text-slate-500">Your drawn signature and acceptance date will be securely attached to this agreement.</p></div></div><div className="mt-7 flex flex-col-reverse gap-3 border-t border-slate-100 pt-6 sm:flex-row sm:justify-end"><Button variant="outline" className="border-rose-200 text-rose-700 hover:bg-rose-50" onClick={() => submit("Rejected")} disabled={respond.isPending}>Decline agreement</Button><Button className="bg-[#3157d5] text-white hover:bg-[#2748bd]" onClick={() => submit("Approved")} disabled={respond.isPending || !termsAccepted || !signatureDataUrl || !signatureDate}><CheckCircle2 className="mr-2 h-4 w-4" />Accept & sign agreement</Button></div></section>}
        <Dialog open={termsViewerOpen} onOpenChange={setTermsViewerOpen}><DialogContent className="max-w-2xl gap-0 overflow-hidden p-0 print:hidden"><DialogHeader className="border-b border-slate-200 px-6 py-5 text-left"><DialogTitle>Terms & Conditions</DialogTitle><DialogDescription>Review the Software Service Agreement. Scroll to the bottom to enable the confirmation checkbox.</DialogDescription></DialogHeader><div className="terms-viewer max-h-[55vh] overflow-y-auto px-6 py-5" onScroll={(event) => { const element = event.currentTarget; if (element.scrollTop + element.clientHeight >= element.scrollHeight - 12) setTermsScrolledToEnd(true); }}><pre className="whitespace-pre-wrap font-sans text-sm leading-6 text-slate-600">{TERMS_DOCUMENT_FULL}</pre><div className="mt-6 rounded-xl border border-[#c4c1f0] bg-[#f4f2ff] p-4 text-sm text-[#273b8d]">End of Terms & Conditions</div></div><div className="border-t border-slate-200 bg-slate-50 px-6 py-4"><div className="flex items-start gap-3"><Checkbox id="terms-viewer-confirmation" checked={termsAccepted} disabled={!termsScrolledToEnd} onCheckedChange={(value) => setTermsAccepted(value === true)} /><Label htmlFor="terms-viewer-confirmation" className="text-sm leading-6 text-slate-700">I have read and understood the complete Terms & Conditions and confirm my acceptance.</Label></div><div className="mt-3 flex items-center justify-between gap-3"><span className="text-xs text-slate-500">{termsScrolledToEnd ? "Confirmation is available." : "Scroll to the bottom to enable confirmation."}</span><Button type="button" onClick={() => setTermsViewerOpen(false)} disabled={!termsAccepted}>Continue</Button></div></div></DialogContent></Dialog>
      </main>
      <footer className="flex items-center justify-center gap-4 bg-[#1e347e] px-4 py-3 text-xs text-white print:py-2"><span className="inline-flex items-center gap-2"><ShieldCheck className="h-4 w-4" />Expertaid Technologies Pvt Ltd</span><span className="h-4 w-px bg-white/40" /><span>Secure digital agreement workflow</span></footer>
    </div>
  </div>;
}

function SectionLabel({ icon, text }: { icon: ReactNode; text: string }) { return <div className="mb-3 flex items-center gap-2 text-[#273b8d]"><span className="flex h-5 w-5 items-center justify-center">{icon}</span><span className="text-xs font-bold uppercase tracking-[0.08em]">{text}</span></div>; }
function Info({ icon, label, value, wide }: { icon: ReactNode; label: string; value: string; wide?: boolean }) { return <div className={`flex min-h-[72px] items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-[0_2px_5px_rgba(30,45,80,0.04)] ${wide ? "sm:col-span-2" : ""}`}><span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#f0efff] text-[#4b43a8]">{icon}</span><div className="min-w-0"><p className="text-[10px] font-semibold uppercase tracking-[0.13em] text-slate-500">{label}</p><p className="mt-1 break-words text-sm font-semibold text-[#172033]">{value}</p></div></div>; }
