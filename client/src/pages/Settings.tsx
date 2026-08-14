import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { trpc } from "@/lib/trpc";
import { DEFAULT_BRANDING } from "@shared/branding";
import { ImagePlus, Loader2, Save, Settings2, Upload } from "lucide-react";
import { toast } from "sonner";

const readImage = (file: File) => new Promise<string>((resolve, reject) => {
  const reader = new FileReader();
  reader.onload = () => resolve(String(reader.result));
  reader.onerror = () => reject(new Error("Could not read the selected image."));
  reader.readAsDataURL(file);
});

export default function Settings() {
  const branding = trpc.branding.get.useQuery();
  const sessionSettings = trpc.session.get.useQuery();
  const utils = trpc.useUtils();
  const updateSession = trpc.session.update.useMutation({
    onSuccess: async () => { await utils.session.get.invalidate(); toast.success("Session settings saved."); },
    onError: (error) => toast.error(error.message),
  });
  const updateBranding = trpc.branding.update.useMutation({
    onSuccess: async () => {
      await utils.branding.get.invalidate();
      toast.success("Branding settings saved.");
      setLogoDataUrl("");
    },
    onError: (error) => toast.error(error.message),
  });
  const [companyName, setCompanyName] = useState<string>(DEFAULT_BRANDING.companyName);
  const [serviceCaption, setServiceCaption] = useState<string>(DEFAULT_BRANDING.serviceCaption);
  const [footerCompanyName, setFooterCompanyName] = useState<string>(DEFAULT_BRANDING.footerCompanyName);
  const [logoDataUrl, setLogoDataUrl] = useState("");
  const [sessionMode, setSessionMode] = useState<"all" | "single">("single");
  const [currentSession, setCurrentSession] = useState("2026-2027");

  useEffect(() => {
    if (!branding.data) return;
    setCompanyName(branding.data.companyName);
    setServiceCaption(branding.data.serviceCaption);
    setFooterCompanyName(branding.data.footerCompanyName);
  }, [branding.data]);

  useEffect(() => {
    if (!sessionSettings.data) return;
    setSessionMode(sessionSettings.data.sessionMode);
    setCurrentSession(sessionSettings.data.currentSession);
  }, [sessionSettings]);

  const logoPreview = logoDataUrl || branding.data?.companyLogoUrl || DEFAULT_BRANDING.companyLogoUrl;
  const handleLogo = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast.error("Please select a PNG, JPEG, or WebP image.");
      return;
    }
    if (file.size > 1_800_000) {
      toast.error("Please choose an image smaller than 1.8 MB.");
      return;
    }
    try {
      setLogoDataUrl(await readImage(file));
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not read the selected image.");
    }
  };
  const submitSession = (event: FormEvent) => {
    event.preventDefault();
    updateSession.mutate({ sessionMode, currentSession });
  };
  const submit = (event: FormEvent) => {
    event.preventDefault();
    updateBranding.mutate({ companyName, serviceCaption, footerCompanyName, logoDataUrl: logoDataUrl || undefined });
  };

  return <DashboardLayout><div className="min-h-[calc(100vh-2rem)] bg-[#f7f8fc] -m-3 p-4 text-[#172033] sm:-m-4 sm:p-8 lg:p-10"><div className="mx-auto max-w-5xl">
    <header className="mb-8"><div className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#3157d5]"><Settings2 className="h-4 w-4" /><span>Workspace settings</span></div><h1 className="mt-3 font-serif text-4xl tracking-[-0.03em] sm:text-5xl">Branding</h1><p className="mt-3 max-w-2xl text-[15px] leading-7 text-slate-500">Control the company identity that appears in the admin workspace and on every client-facing agreement.</p></header>
    <form onSubmit={submit} className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
      <Card className="border-0 shadow-[0_18px_60px_rgba(30,45,80,0.07)]"><CardHeader><CardTitle className="font-serif text-2xl">Company details</CardTitle><CardDescription>These values are saved to your workspace and used as the default agreement branding.</CardDescription></CardHeader><CardContent className="space-y-5"><div className="space-y-2"><Label htmlFor="companyName">Company name</Label><Input id="companyName" value={companyName} onChange={e => setCompanyName(e.target.value)} maxLength={255} required /></div><div className="space-y-2"><Label htmlFor="serviceCaption">Service caption</Label><Input id="serviceCaption" value={serviceCaption} onChange={e => setServiceCaption(e.target.value)} maxLength={255} placeholder="ERP Solutions • Software Development • IT Support" required /><p className="text-xs text-slate-400">Shown beneath the company name in the client agreement header.</p></div><div className="space-y-2"><Label htmlFor="footerCompanyName">Footer company name</Label><Input id="footerCompanyName" value={footerCompanyName} onChange={e => setFooterCompanyName(e.target.value)} maxLength={255} required /><p className="text-xs text-slate-400">Shown in the agreement footer and print layout.</p></div><div className="flex justify-end border-t border-slate-100 pt-5"><Button type="submit" className="bg-[#3157d5] text-white hover:bg-[#2748bd]" disabled={updateBranding.isPending || branding.isLoading}>{updateBranding.isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}Save branding</Button></div></CardContent></Card>
      <Card className="h-fit border-0 shadow-[0_18px_60px_rgba(30,45,80,0.07)]"><CardHeader><CardTitle className="text-base">Company logo</CardTitle><CardDescription>Use a transparent PNG or a clear JPG/WebP. The image is contained without clipping.</CardDescription></CardHeader><CardContent><div className="flex min-h-44 items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-5"><img src={logoPreview} alt="Company logo preview" className="block max-h-28 max-w-full object-contain object-center" /></div><label htmlFor="companyLogo" className="mt-4 flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-[#3157d5] hover:text-[#3157d5]"><Upload className="h-4 w-4" />{logoDataUrl ? "Replace selected logo" : "Upload new logo"}<input id="companyLogo" type="file" accept="image/png,image/jpeg,image/webp" onChange={handleLogo} className="sr-only" /></label><div className="mt-4 rounded-xl bg-[#eef2ff] p-4 text-xs leading-5 text-[#3157d5]"><ImagePlus className="mb-2 h-4 w-4" /><p>Preview updates instantly. Save branding to publish the selected logo to the workspace.</p></div></CardContent></Card>
    </form>
    <form onSubmit={submitSession} className="mt-6"><Card className="border-0 shadow-[0_18px_60px_rgba(30,45,80,0.07)]"><CardHeader><CardTitle className="font-serif text-2xl">Current session</CardTitle><CardDescription>Choose whether the workspace shows all sessions or one academic/business session.</CardDescription></CardHeader><CardContent className="grid gap-5 sm:grid-cols-2"><div className="space-y-2"><Label htmlFor="sessionMode">Session view</Label><select id="sessionMode" value={sessionMode} onChange={e => setSessionMode(e.target.value as "all" | "single")} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground"><option value="all">All sessions</option><option value="single">Single session</option></select></div><div className="space-y-2"><Label htmlFor="currentSession">Current session</Label><Input id="currentSession" value={currentSession} onChange={e => setCurrentSession(e.target.value)} pattern="\\d{4}-\\d{4}" placeholder="2026-2027" required /><p className="text-xs text-slate-400">Use the format YYYY-YYYY, for example 2026-2027.</p></div><div className="flex justify-end sm:col-span-2"><Button type="submit" className="bg-[#3157d5] text-white hover:bg-[#2748bd]" disabled={updateSession.isPending || sessionSettings.isLoading}>{updateSession.isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}Save session settings</Button></div></CardContent></Card></form>
  </div></div></DashboardLayout>;
}
