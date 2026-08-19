import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { trpc } from "@/lib/trpc";
import { DEFAULT_BRANDING } from "@shared/branding";
import { isValidSessionDateRange } from "@shared/session";
import { ImagePlus, Loader2, Pencil, Save, Settings2, Trash2, Upload } from "lucide-react";
import { toast } from "sonner";

const readImage = (file: File) => new Promise<string>((resolve, reject) => {
  const reader = new FileReader();
  reader.onload = () => resolve(String(reader.result));
  reader.onerror = () => reject(new Error("Could not read the selected image."));
  reader.readAsDataURL(file);
});

export default function Settings() {
  const { user } = useAuth();
  const authReady = Boolean(user);
  const branding = trpc.branding.get.useQuery(undefined, { enabled: authReady });
  const sessionSettings = trpc.session.get.useQuery(undefined, { enabled: authReady });
  const sessions = trpc.session.list.useQuery(undefined, { enabled: authReady });
  const uniqueSessions = Array.from(new Map((sessions.data ?? []).map((session) => [session.sessionLabel, session])).values());
  const projects = trpc.projects.list.useQuery(undefined, { enabled: authReady });
  const utils = trpc.useUtils();
  const createProject = trpc.projects.create.useMutation({ onSuccess: async () => { await projects.refetch(); toast.success("Project added."); setNewProject({ name: "", clientIdPrefix: "", clientIdStart: "1" }); }, onError: (error) => toast.error(error.message) });
  const updateProject = trpc.projects.update.useMutation({ onSuccess: async () => { await projects.refetch(); toast.success("Project updated."); setEditingProject(null); }, onError: (error) => toast.error(error.message) });
  const deleteProject = trpc.projects.delete.useMutation({ onSuccess: async () => { await projects.refetch(); toast.success("Project deleted."); }, onError: (error) => toast.error(error.message) });
  const setMainProject = trpc.projects.setMain.useMutation({ onSuccess: async () => { await projects.refetch(); toast.success("Main ERP project updated."); }, onError: (error) => toast.error(error.message) });
  const createSession = trpc.session.create.useMutation({
    onSuccess: async () => { await sessions.refetch(); toast.success("Session added."); setNewSessionLabel(""); setNewSessionStart(""); setNewSessionEnd(""); },
    onError: (error) => toast.error(error.message),
  });
  const updateSession = trpc.session.update.useMutation({
    onSuccess: async () => { await Promise.all([utils.session.get.invalidate(), sessions.refetch()]); toast.success("Current session settings saved."); },
    onError: (error) => toast.error(error.message),
  });
  const updateSessionRecord = trpc.session.updateRecord.useMutation({
    onSuccess: async () => { await sessions.refetch(); toast.success("Session updated."); setEditingSession(null); },
    onError: (error) => toast.error(error.message),
  });
  const deleteSession = trpc.session.delete.useMutation({
    onSuccess: async () => { await Promise.all([sessions.refetch(), utils.session.get.invalidate()]); toast.success("Session deleted."); },
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
  const [newSessionLabel, setNewSessionLabel] = useState("");
  const [newSessionStart, setNewSessionStart] = useState("");
  const [newSessionEnd, setNewSessionEnd] = useState("");
  const [editingSession, setEditingSession] = useState<{ id: number; sessionLabel: string; startDate: string; endDate: string } | null>(null);
  const [newProject, setNewProject] = useState({ name: "", clientIdPrefix: "", clientIdStart: "1" });
  const [editingProject, setEditingProject] = useState<{ id: number; name: string; clientIdPrefix: string; clientIdStart: string } | null>(null);

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
  const submitNewSession = (event: FormEvent) => {
    event.preventDefault();
    if (!isValidSessionDateRange(newSessionStart, newSessionEnd)) { toast.error("End date must be after start date."); return; }
    createSession.mutate({ sessionLabel: newSessionLabel, startDate: newSessionStart, endDate: newSessionEnd });
  };
  const submitEditedSession = (event: FormEvent) => {
    event.preventDefault();
    if (!editingSession || !isValidSessionDateRange(editingSession.startDate, editingSession.endDate)) { toast.error("End date must be after start date."); return; }
    updateSessionRecord.mutate(editingSession);
  };
  const submit = (event: FormEvent) => {
    event.preventDefault();
    updateBranding.mutate({ companyName, serviceCaption, footerCompanyName, logoDataUrl: logoDataUrl || undefined });
  };
  const submitNewProject = (event: FormEvent) => { event.preventDefault(); createProject.mutate({ ...newProject, clientIdStart: Number(newProject.clientIdStart) }); };
  const submitEditedProject = (event: FormEvent) => { event.preventDefault(); if (!editingProject) return; updateProject.mutate({ ...editingProject, clientIdStart: Number(editingProject.clientIdStart) }); };

  return <DashboardLayout><div className="min-h-[calc(100vh-2rem)] bg-[#f7f8fc] -m-3 p-4 text-[#172033] sm:-m-4 sm:p-8 lg:p-10"><div className="mx-auto max-w-5xl">
    <header className="mb-8"><div className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#3157d5]"><Settings2 className="h-4 w-4" /><span>Workspace settings</span></div><h1 className="mt-3 font-serif text-4xl tracking-[-0.03em] sm:text-5xl">Branding</h1><p className="mt-3 max-w-2xl text-[15px] leading-7 text-slate-500">Control the company identity that appears in the admin workspace and on every client-facing agreement.</p></header>
    <form onSubmit={submit} className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
      <Card className="border-0 shadow-[0_18px_60px_rgba(30,45,80,0.07)]"><CardHeader><CardTitle className="font-serif text-2xl">Company details</CardTitle><CardDescription>These values are saved to your workspace and used as the default agreement branding.</CardDescription></CardHeader><CardContent className="space-y-5"><div className="space-y-2"><Label htmlFor="companyName">Company name</Label><Input id="companyName" value={companyName} onChange={e => setCompanyName(e.target.value)} maxLength={255} required /></div><div className="space-y-2"><Label htmlFor="serviceCaption">Service caption</Label><Input id="serviceCaption" value={serviceCaption} onChange={e => setServiceCaption(e.target.value)} maxLength={255} placeholder="ERP Solutions • Software Development • IT Support" required /><p className="text-xs text-slate-400">Shown beneath the company name in the client agreement header.</p></div><div className="space-y-2"><Label htmlFor="footerCompanyName">Footer company name</Label><Input id="footerCompanyName" value={footerCompanyName} onChange={e => setFooterCompanyName(e.target.value)} maxLength={255} required /><p className="text-xs text-slate-400">Shown in the agreement footer and print layout.</p></div><div className="flex justify-end border-t border-slate-100 pt-5"><Button type="submit" className="bg-[#3157d5] text-white hover:bg-[#2748bd]" disabled={updateBranding.isPending || branding.isLoading}>{updateBranding.isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}Save branding</Button></div></CardContent></Card>
      <Card className="h-fit border-0 shadow-[0_18px_60px_rgba(30,45,80,0.07)]"><CardHeader><CardTitle className="text-base">Company logo</CardTitle><CardDescription>Use a transparent PNG or a clear JPG/WebP. The image is contained without clipping.</CardDescription></CardHeader><CardContent><div className="flex min-h-44 items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-5"><img src={logoPreview} alt="Company logo preview" className="block max-h-28 max-w-full object-contain object-center" /></div><label htmlFor="companyLogo" className="mt-4 flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-[#3157d5] hover:text-[#3157d5]"><Upload className="h-4 w-4" />{logoDataUrl ? "Replace selected logo" : "Upload new logo"}<input id="companyLogo" type="file" accept="image/png,image/jpeg,image/webp" onChange={handleLogo} className="sr-only" /></label><div className="mt-4 rounded-xl bg-[#eef2ff] p-4 text-xs leading-5 text-[#3157d5]"><ImagePlus className="mb-2 h-4 w-4" /><p>Preview updates instantly. Save branding to publish the selected logo to the workspace.</p></div></CardContent></Card>
    </form>
    <div className="mt-6 grid gap-6 lg:grid-cols-2"><form onSubmit={submitSession}><Card className="border-0 shadow-[0_18px_60px_rgba(30,45,80,0.07)]"><CardHeader><CardTitle className="font-serif text-2xl">Current session</CardTitle><CardDescription>Choose whether the workspace shows all sessions or one academic/business session.</CardDescription></CardHeader><CardContent className="grid gap-5 sm:grid-cols-2"><div className="space-y-2"><Label htmlFor="sessionMode">Session view</Label><select id="sessionMode" value={sessionMode} onChange={e => setSessionMode(e.target.value as "all" | "single")} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground"><option value="all">All sessions</option><option value="single">Single session</option></select></div><div className="space-y-2"><Label htmlFor="currentSession">Current session</Label><select id="currentSession" value={currentSession} onChange={e => setCurrentSession(e.target.value)} className="flex h-10 w-full rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700 outline-none transition focus:border-[#3157d5] focus:ring-2 focus:ring-[#3157d5]/10"><option value={currentSession}>{currentSession}</option>{uniqueSessions.filter((session) => session.sessionLabel !== currentSession).map((session) => <option key={session.sessionLabel} value={session.sessionLabel}>{session.sessionLabel}</option>)}</select><p className="text-xs text-slate-400">Select one of your managed sessions.</p></div><div className="flex justify-end sm:col-span-2"><Button type="submit" className="bg-[#3157d5] text-white hover:bg-[#2748bd]" disabled={updateSession.isPending || sessionSettings.isLoading}>{updateSession.isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}Save session settings</Button></div></CardContent></Card></form>
    <form onSubmit={submitNewSession}><Card className="border-0 shadow-[0_18px_60px_rgba(30,45,80,0.07)]"><CardHeader><CardTitle className="font-serif text-2xl">Manage sessions</CardTitle><CardDescription>Add previous, current, or future sessions with their exact start and end dates.</CardDescription></CardHeader><CardContent><div className="mb-5 space-y-3">{uniqueSessions.map((session) => <div key={`${session.id}-${session.sessionLabel}`} className="rounded-xl border border-slate-100 bg-slate-50 px-4 py-3 text-sm"><div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between"><div className="min-w-0 flex-1"><span className="font-semibold text-slate-700">{session.sessionLabel}</span><span className="ml-3 whitespace-nowrap text-xs text-slate-500">{session.startDate} – {session.endDate}</span>{session.sessionLabel === currentSession && <span className="ml-3 inline-flex rounded-full bg-blue-100 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-blue-700">Current</span>}</div>{session.id > 0 && <div className="flex shrink-0 gap-2"><Button type="button" variant="outline" size="icon" className="h-9 w-9" title={`Edit ${session.sessionLabel}`} aria-label={`Edit ${session.sessionLabel}`} onClick={() => setEditingSession({ id: session.id, sessionLabel: session.sessionLabel, startDate: session.startDate, endDate: session.endDate })}><Pencil className="h-4 w-4" /></Button><Button type="button" variant="outline" size="icon" className="h-9 w-9 text-rose-600 hover:text-rose-700" title={`Delete ${session.sessionLabel}`} aria-label={`Delete ${session.sessionLabel}`} onClick={() => { if (window.confirm(`Delete session ${session.sessionLabel}?`)) deleteSession.mutate({ id: session.id }); }} disabled={session.sessionLabel === currentSession || deleteSession.isPending}><Trash2 className="h-4 w-4" /></Button></div>}</div>{editingSession?.id === session.id && <form onSubmit={submitEditedSession} className="mt-4 grid gap-3 border-t border-slate-200 pt-4 sm:grid-cols-3"><Input value={editingSession.sessionLabel} onChange={e => setEditingSession({ ...editingSession, sessionLabel: e.target.value })} pattern="[0-9]{4}-[0-9]{4}" required /><Input type="date" value={editingSession.startDate} onChange={e => setEditingSession({ ...editingSession, startDate: e.target.value })} required /><div className="flex gap-2"><Input type="date" value={editingSession.endDate} onChange={e => setEditingSession({ ...editingSession, endDate: e.target.value })} required /><Button type="submit" size="sm" className="bg-[#3157d5] text-white" disabled={updateSessionRecord.isPending}>Save</Button><Button type="button" size="sm" variant="outline" onClick={() => setEditingSession(null)}>Cancel</Button></div></form>}</div>)}</div><div className="grid gap-4 sm:grid-cols-3"><div className="space-y-2"><Label htmlFor="newSessionLabel">Session label</Label><Input id="newSessionLabel" value={newSessionLabel} onChange={e => setNewSessionLabel(e.target.value)} pattern="[0-9]{4}-[0-9]{4}" placeholder="2027-2028" required /></div><div className="space-y-2"><Label htmlFor="newSessionStart">Start date</Label><Input id="newSessionStart" type="date" value={newSessionStart} onChange={e => setNewSessionStart(e.target.value)} required /></div><div className="space-y-2"><Label htmlFor="newSessionEnd">End date</Label><Input id="newSessionEnd" type="date" value={newSessionEnd} onChange={e => setNewSessionEnd(e.target.value)} required /></div></div><div className="mt-5 flex justify-end"><Button type="submit" className="bg-[#3157d5] text-white hover:bg-[#2748bd]" disabled={createSession.isPending}>{createSession.isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}Add session</Button></div></CardContent></Card></form></div>
    <div className="mt-6"><Card className="border-0 shadow-[0_18px_60px_rgba(30,45,80,0.07)]"><CardHeader><CardTitle className="font-serif text-2xl">Projects and Client IDs</CardTitle><CardDescription>Each project has its own Client ID prefix and starting sequence. Select the project marked Main ERP project to preserve the original Institute Type, Branch Coverage, and student fields. Other projects use employee fields. A project with linked clients or agreements cannot be deleted.</CardDescription></CardHeader><CardContent><div className="mb-5 space-y-3">{(projects.data ?? []).map((project) => <div key={project.id} className="rounded-xl border border-slate-100 bg-slate-50 px-4 py-3"><div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"><div><div className="flex items-center gap-2"><div className="font-semibold text-slate-700">{project.name}</div>{project.isMain && <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-emerald-700">Main ERP project</span>}</div><div className="mt-1 text-xs text-slate-500">Prefix <strong>{project.clientIdPrefix}</strong> · Next Client ID <strong>{project.clientIdPrefix}{project.nextClientId}</strong> · Linked clients {project.linkedClientCount}</div></div><div className="flex shrink-0 gap-2"><Button type="button" variant="outline" size="sm" onClick={() => setMainProject.mutate({ id: project.id })} disabled={project.isMain || setMainProject.isPending}>{project.isMain ? "Main project" : "Set as main"}</Button><Button type="button" variant="outline" size="icon" className="h-9 w-9" title={`Edit ${project.name}`} aria-label={`Edit ${project.name}`} onClick={() => setEditingProject({ id: project.id, name: project.name, clientIdPrefix: project.clientIdPrefix, clientIdStart: String(project.clientIdStart) })}><Pencil className="h-4 w-4" /></Button><Button type="button" variant="outline" size="icon" className="h-9 w-9 text-rose-600 hover:text-rose-700" title={`Delete ${project.name}`} aria-label={`Delete ${project.name}`} disabled={project.linkedClientCount > 0 || deleteProject.isPending} onClick={() => { if (window.confirm(`Delete project ${project.name}?`)) deleteProject.mutate({ id: project.id }); }}><Trash2 className="h-4 w-4" /></Button></div></div>{editingProject?.id === project.id && <form onSubmit={submitEditedProject} className="mt-4 grid gap-3 border-t border-slate-200 pt-4 sm:grid-cols-4"><Input value={editingProject.name} onChange={e => setEditingProject({ ...editingProject, name: e.target.value })} placeholder="Project name" required /><Input value={editingProject.clientIdPrefix} onChange={e => setEditingProject({ ...editingProject, clientIdPrefix: e.target.value })} placeholder="Client ID prefix" required /><Input type="number" min="1" value={editingProject.clientIdStart} onChange={e => setEditingProject({ ...editingProject, clientIdStart: e.target.value })} placeholder="Start number" required /><div className="flex gap-2"><Button type="submit" size="sm" className="bg-[#3157d5] text-white" disabled={updateProject.isPending}>Save</Button><Button type="button" size="sm" variant="outline" onClick={() => setEditingProject(null)}>Cancel</Button></div></form>}</div>)}</div><div className="grid gap-4 sm:grid-cols-3"><div className="space-y-2 sm:col-span-1"><Label htmlFor="newProjectName">Project name</Label><Input id="newProjectName" value={newProject.name} onChange={e => setNewProject({ ...newProject, name: e.target.value })} placeholder="ERP CRM" required /></div><div className="space-y-2"><Label htmlFor="newProjectPrefix">Client ID prefix</Label><Input id="newProjectPrefix" value={newProject.clientIdPrefix} onChange={e => setNewProject({ ...newProject, clientIdPrefix: e.target.value })} placeholder="ERP" required /></div><div className="space-y-2"><Label htmlFor="newProjectStart">Start number</Label><Input id="newProjectStart" type="number" min="1" value={newProject.clientIdStart} onChange={e => setNewProject({ ...newProject, clientIdStart: e.target.value })} required /></div></div><div className="mt-5 flex justify-end"><Button type="button" onClick={() => createProject.mutate({ ...newProject, clientIdStart: Number(newProject.clientIdStart) })} className="bg-[#3157d5] text-white hover:bg-[#2748bd]" disabled={createProject.isPending}>{createProject.isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}Add project</Button></div></CardContent></Card></div>
  </div></div></DashboardLayout>;
}
