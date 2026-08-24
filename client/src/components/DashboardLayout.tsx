import { useAuth } from "@/_core/hooks/useAuth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { useIsMobile } from "@/hooks/useMobile";
import { BarChart3, Bell, BriefcaseBusiness, CheckCircle2, ChevronDown, Eye, EyeOff, FileCheck2, FileText, LayoutDashboard, LockKeyhole, LogOut, Mail, Menu, PanelLeft, ReceiptText, Search, Settings2, ShieldCheck, UsersRound, UserRoundPlus } from "lucide-react";
import React, { CSSProperties, useEffect, useRef, useState } from "react";
import { useLocation } from "wouter";
import { DashboardLayoutSkeleton } from './DashboardLayoutSkeleton';
import { DashboardShell } from './DashboardShell';
import { resolveDashboardShellView } from "@shared/dashboardState";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { DEFAULT_BRANDING, type CompanyBranding } from "@shared/branding";
import { trpc } from "@/lib/trpc";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/", available: true },
  { icon: UsersRound, label: "Clients", path: "/clients", available: true },
  { icon: FileText, label: "Invoices", path: "/invoices", available: true },
  { icon: ReceiptText, label: "Receipts", path: "/receipts", available: true },
  { icon: FileText, label: "Quotations", path: "/quotations", available: true },
  { icon: FileCheck2, label: "Agreements", path: "/agreements", available: true },
  { icon: Bell, label: "Reminders", available: false },
  { icon: BarChart3, label: "Reports", available: false },
  { icon: Settings2, label: "Settings", path: "/settings", available: true },
];

const SIDEBAR_WIDTH_KEY = "sidebar-width";
const DEFAULT_WIDTH = 230;
const MIN_WIDTH = 190;
const MAX_WIDTH = 480;

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarWidth, setSidebarWidth] = useState(() => {
    const saved = localStorage.getItem(SIDEBAR_WIDTH_KEY);
    return saved ? Math.min(parseInt(saved, 10), 240) : DEFAULT_WIDTH;
  });
  const { loading, user, logout } = useAuth();
  const branding = trpc.branding.get.useQuery(undefined, { enabled: Boolean(user) });
  const sessionSettings = trpc.session.get.useQuery(undefined, { enabled: Boolean(user) });
  const sessionRecords = trpc.session.list.useQuery(undefined, { enabled: Boolean(user) });
  const uniqueSessionRecords = Array.from(new Map((sessionRecords.data ?? []).map((session) => [session.sessionLabel, session])).values());
  const profile = trpc.profile.get.useQuery(undefined, { enabled: Boolean(user) });
  const profileUpdate = trpc.profile.update.useMutation({ onSuccess: (saved) => { profile.refetch(); setProfileForm({ displayName: saved.displayName, roleLabel: saved.roleLabel, avatarDataUrl: undefined, avatarPreviewUrl: saved.avatarUrl }); toast.success("Profile settings saved"); setProfileOpen(false); }, onError: (error) => toast.error(error.message) });
  const updateSession = trpc.session.update.useMutation({ onSuccess: () => window.location.reload(), onError: (error) => toast.error(error.message) });
  const [profileOpen, setProfileOpen] = useState(false);
  const [profileForm, setProfileForm] = useState({ displayName: "Workspace administrator", roleLabel: "Super Admin", avatarDataUrl: undefined as string | undefined, avatarPreviewUrl: null as string | null });
  useEffect(() => { if (profile.data) setProfileForm({ displayName: profile.data.displayName, roleLabel: profile.data.roleLabel, avatarDataUrl: undefined, avatarPreviewUrl: profile.data.avatarUrl }); }, [profile.data]);
  const chooseProfileIcon = (file: File | undefined) => {
    if (!file) return;
    if (!file.type.match(/^image\/(png|jpeg|jpg|webp)$/)) { toast.error("Choose a PNG, JPG, or WEBP image."); return; }
    if (file.size > 1_800_000) { toast.error("Profile icon must be smaller than 1.8 MB."); return; }
    const reader = new FileReader();
    reader.onload = () => { const dataUrl = typeof reader.result === "string" ? reader.result : ""; setProfileForm((form) => ({ ...form, avatarDataUrl: dataUrl, avatarPreviewUrl: dataUrl })); };
    reader.readAsDataURL(file);
  };
  const companyBranding: CompanyBranding = branding.data ?? DEFAULT_BRANDING;
  const activeSessionLabel = sessionSettings.data?.currentSession ?? "2026-2027";
  const changeSessionSelection = (value: string) => { const currentSession = value === "all" ? (sessionSettings.data?.currentSession ?? "2026-2027") : value; updateSession.mutate({ sessionMode: value === "all" ? "all" : "single", currentSession }); };

  useEffect(() => {
    localStorage.setItem(SIDEBAR_WIDTH_KEY, sidebarWidth.toString());
  }, [sidebarWidth]);

  const shellView = resolveDashboardShellView({ loading, hasUser: Boolean(user) });
  const [loginIdentifier, setLoginIdentifier] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [rememberLogin, setRememberLogin] = useState(false);
  const canSubmitLogin = loginIdentifier.trim().length > 0 && loginPassword.length > 0;
  const credentialLogin = (trpc.auth as any).loginWithCredentials?.useMutation({
    onSuccess: () => window.location.reload(),
    onError: (error: { message?: string }) => toast.error(error.message || "Invalid email or password."),
  }) ?? { isPending: false, mutate: () => undefined };

  const signInView = (
    <main className="login-shell relative flex h-dvh max-h-dvh min-h-0 overflow-hidden bg-[#eef0ff] font-sans text-[#14204b]">
      <section className="login-feature relative hidden min-h-0 flex-1 flex-col justify-between overflow-hidden bg-[#06133e] px-10 py-10 text-white lg:flex xl:px-14 xl:py-12">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_15%,rgba(49,84,218,0.5),transparent_32%),radial-gradient(circle_at_40%_82%,rgba(37,123,255,0.16),transparent_32%),linear-gradient(135deg,#06133e_0%,#101a58_58%,#17297c_100%)]" aria-hidden="true" />
        <div className="relative z-10 flex items-center gap-3"><p className="text-3xl font-semibold tracking-[-0.05em]">Expertaid <span className="text-[#5578ff]">CRM</span></p></div>
        <div className="relative z-10 max-w-[620px] pb-4"><div className="mb-6 h-0.5 w-8 bg-[#5d7cff]" /><p className="mb-8 max-w-md text-lg leading-8 text-white/85">All-in-one client management<br />and operations platform</p><h1 className="max-w-xl text-5xl font-semibold leading-[1.08] tracking-[-0.05em] xl:text-6xl">Manage clients.<br />Deliver excellence.<br /><span className="bg-gradient-to-r from-[#21b6ff] to-[#6d62ff] bg-clip-text text-transparent">Grow together.</span></h1><p className="mt-6 max-w-lg text-base leading-7 text-white/70">Onboard, manage and maintain your clients, services, and relationships with complete visibility and control in one secure workspace.</p>
          <div className="mt-7 grid max-w-[590px] grid-cols-2 gap-3">{[[UserRoundPlus, "Client Onboarding", "Onboard new clients quickly with structured workflows."], [UsersRound, "Client Management", "Organize client information, documents and services."], [BriefcaseBusiness, "Service Tracking", "Track services, renewals and key client deliverables."], [BarChart3, "Activity & Insights", "Monitor activities, follow-ups and client engagement."]].map(([Icon, title, copy]) => <div key={String(title)} className="rounded-xl border border-white/15 bg-white/[0.08] p-4 backdrop-blur-sm"><div className="flex items-start gap-3"><div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-500/25 text-cyan-300"><Icon className="h-5 w-5" /></div><div><p className="text-sm font-semibold text-white/95">{String(title)}</p><p className="mt-1 text-xs leading-5 text-white/60">{String(copy)}</p></div></div></div>)}</div>
          <div className="mt-3 flex max-w-[590px] items-center gap-4 rounded-xl border border-white/15 bg-white/[0.08] p-4"><div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-500/25 text-cyan-300"><ShieldCheck className="h-6 w-6" /></div><div><p className="text-sm font-semibold text-white/95">Enterprise-grade security</p><p className="mt-1 text-xs leading-5 text-white/60">Your data is encrypted and protected with industry-leading security standards.</p></div><LockKeyhole className="ml-auto h-9 w-9 text-indigo-300/50" /></div>
        </div>
      </section>
      <section className="login-panel relative flex h-full min-h-0 w-full items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_75%_20%,rgba(197,205,255,0.85),transparent_36%),linear-gradient(135deg,#f7f7ff,#eceeff)] px-4 py-4 sm:px-8 lg:max-w-[660px] lg:px-12 xl:max-w-[720px] xl:px-16"><div className="w-full max-w-[560px]"><div className="mb-3 flex items-center gap-3 lg:hidden"><div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white p-1 shadow-sm"><img src={companyBranding.companyLogoUrl} alt={companyBranding.companyName} onError={(event) => { event.currentTarget.onerror = null; event.currentTarget.src = DEFAULT_BRANDING.companyLogoUrl; }} className="block h-full w-full object-contain" /></div><p className="text-lg font-semibold tracking-tight">Expertaid <span className="text-[#4d66df]">CRM</span></p></div>
        <div className="login-card max-h-full overflow-hidden rounded-[1.8rem] bg-white px-6 py-6 shadow-[0_24px_70px_rgba(50,66,150,0.2)] sm:px-10 sm:py-7"><div className="mb-4 flex justify-center"><img src={companyBranding.companyLogoUrl} alt={companyBranding.companyName} onError={(event) => { event.currentTarget.onerror = null; event.currentTarget.src = DEFAULT_BRANDING.companyLogoUrl; }} className="block h-16 w-[250px] object-contain sm:h-20 sm:w-[300px]" /></div><div className="text-center"><p className="text-xs font-bold uppercase tracking-[0.25em] text-[#6b5ce7]">Welcome back</p><h2 className="mt-2 text-3xl font-semibold tracking-[-0.04em] text-[#10204f] sm:text-4xl">Sign in to your account</h2><p className="mx-auto mt-2 max-w-md text-sm leading-5 text-slate-500">Access your workspace to manage clients, services and operations seamlessly.</p></div>
          <form className="mt-5 space-y-4" onSubmit={(event) => { event.preventDefault(); if (canSubmitLogin && !credentialLogin.isPending) credentialLogin.mutate({ email: loginIdentifier, password: loginPassword }); }}><div><label htmlFor="login-identifier" className="mb-1.5 block text-sm font-semibold text-[#19254e]">Username or Email</label><div className="relative"><Mail className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" /><input id="login-identifier" value={loginIdentifier} onChange={(event) => setLoginIdentifier(event.target.value)} autoComplete="username" placeholder="Enter your email or username" className="h-12 w-full rounded-xl border border-slate-200 bg-white pl-12 pr-4 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-[#5968e8] focus:ring-4 focus:ring-[#5968e8]/10" /></div></div><div><label htmlFor="login-password" className="mb-1.5 block text-sm font-semibold text-[#19254e]">Password</label><div className="relative"><LockKeyhole className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" /><input id="login-password" type={showLoginPassword ? "text" : "password"} value={loginPassword} onChange={(event) => setLoginPassword(event.target.value)} autoComplete="current-password" placeholder="Enter your password" className="h-12 w-full rounded-xl border border-slate-200 bg-white pl-12 pr-12 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-[#5968e8] focus:ring-4 focus:ring-[#5968e8]/10" /><button type="button" aria-label={showLoginPassword ? "Hide password" : "Show password"} onClick={() => setShowLoginPassword((value) => !value)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-[#5968e8]">{showLoginPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}</button></div></div><div className="flex items-center justify-between gap-4 text-sm"><label className="flex items-center gap-2 text-slate-600"><input type="checkbox" checked={rememberLogin} onChange={(event) => setRememberLogin(event.target.checked)} className="h-4 w-4 rounded border-slate-300 accent-[#5968e8]" />Remember me</label><button type="button" onClick={() => toast.info("Password recovery is managed by your workspace administrator.")} className="font-medium text-[#725ee8] transition hover:text-[#4b45c8]">Forgot password?</button></div><Button type="submit" size="lg" disabled={!canSubmitLogin || credentialLogin.isPending} className="h-12 w-full rounded-xl bg-gradient-to-r from-[#7938e8] to-[#3f5fec] text-base font-semibold text-white shadow-lg shadow-[#5968e8]/25 transition-all hover:-translate-y-0.5 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50">{credentialLogin.isPending ? "Signing In..." : "Sign In"}</Button></form>
          <div className="mt-4 flex items-center justify-center gap-2 text-sm text-slate-400"><ShieldCheck className="h-5 w-5 text-slate-500" />Secure access to your Expertaid CRM workspace</div>
        </div><p className="mt-3 text-center text-[11px] leading-4 text-slate-400">By continuing, you enter the authorized Expertaid CRM workspace.</p></div>
      </section>
    </main>
  );

  return (
    <DashboardShell loading={shellView === "loading"} hasUser={shellView === "ready"} loadingFallback={<DashboardLayoutSkeleton />} unauthenticatedFallback={signInView}>
      <SidebarProvider className="relative flex h-dvh max-h-dvh min-h-0 overflow-hidden bg-[#f8f9fd]" style={{ "--sidebar-width": `${sidebarWidth}px` } as CSSProperties}>
          <header className="fixed inset-x-0 top-0 z-50 hidden h-[72px] items-center bg-white/95 shadow-sm backdrop-blur lg:flex">
            <div className="flex h-full shrink-0 items-center px-5" style={{ width: `${sidebarWidth}px` }}>
              <img src={companyBranding.companyLogoUrl} alt={companyBranding.companyName} className="block h-11 w-full max-w-[170px] object-contain object-left" />
            </div>
            <div className="flex h-full w-[260px] shrink-0 items-center px-5">
              <span className="min-w-0 truncate text-sm font-semibold text-slate-700">{companyBranding.companyName}</span>
            </div>
            <div className="flex flex-1 items-center justify-end gap-7 px-6 xl:px-8">
              <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-2"><span className="hidden text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-400 xl:inline">Session</span><select aria-label="Current session view" value={sessionSettings.data?.sessionMode === "all" ? "all" : (sessionSettings.data?.currentSession ?? "2026-2027")} onChange={(event) => changeSessionSelection(event.target.value)} className="h-10 max-w-[190px] bg-transparent text-xs font-semibold text-slate-700 outline-none"><option value="all">All sessions</option>{uniqueSessionRecords.map((session) => <option key={session.sessionLabel} value={session.sessionLabel}>{session.sessionLabel}{session.sessionLabel === activeSessionLabel ? " · Active" : ""}</option>)}</select></div>
              <div className="relative w-full max-w-[365px]">
                <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                <input aria-label="Search clients, schools, reference numbers" defaultValue="" onChange={(event) => window.dispatchEvent(new CustomEvent("agreement-search", { detail: event.target.value }))} placeholder="Search clients, schools, reference no…" className="h-12 w-full rounded-xl border border-slate-200 bg-white pl-12 pr-4 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-[#3157d5] focus:ring-2 focus:ring-[#3157d5]/10" />
              </div>
              <button type="button" aria-label="Notifications" className="relative flex h-12 w-12 items-center justify-center text-slate-500 transition hover:text-[#3157d5]" onClick={() => toast.info("No new notifications.")}>
                <Bell className="h-6 w-6" /><span className="absolute right-0 top-1 h-5 min-w-5 rounded-full bg-[#f03e5f] px-1 text-[11px] font-bold leading-5 text-white">3</span>
              </button>
              <DropdownMenu><DropdownMenuTrigger asChild><button type="button" aria-label="Open admin profile menu" className="flex items-center gap-3 text-left"><Avatar className="h-12 w-12 text-white" style={{ backgroundColor: profile.data?.avatarColor ?? "#4b43a8" }}><AvatarImage src={profile.data?.avatarUrl ?? undefined} alt="Profile icon" className="object-contain p-1" /><AvatarFallback className="text-lg font-semibold text-white" style={{ backgroundColor: profile.data?.avatarColor ?? "#4b43a8" }}>{profile.data?.avatarInitials ?? "AD"}</AvatarFallback></Avatar><span className="hidden min-w-[120px] xl:block"><strong className="block text-sm font-semibold text-slate-800">{profile.data?.displayName ?? user?.name ?? "Admin User"}</strong><small className="block pt-1 text-xs text-slate-500">{profile.data?.roleLabel ?? "Super Admin"}</small></span><ChevronDown className="h-4 w-4 text-slate-500" /></button></DropdownMenuTrigger><DropdownMenuContent align="end" className="w-56"><DropdownMenuItem onClick={() => { if (profile.data) setProfileForm({ displayName: profile.data.displayName, roleLabel: profile.data.roleLabel, avatarDataUrl: undefined, avatarPreviewUrl: profile.data.avatarUrl }); setProfileOpen(true); }}><Settings2 className="mr-2 h-4 w-4" />Profile settings</DropdownMenuItem><DropdownMenuItem onClick={() => logout()}><LogOut className="mr-2 h-4 w-4" />Sign out</DropdownMenuItem></DropdownMenuContent></DropdownMenu>
              <Dialog open={profileOpen} onOpenChange={setProfileOpen}><DialogContent className="sm:max-w-[520px]"><DialogHeader><DialogTitle>Profile settings</DialogTitle><DialogDescription>Update the name and profile icon displayed in the workspace header.</DialogDescription></DialogHeader><div className="grid gap-4 py-2"><div className="flex items-center gap-4 rounded-xl bg-slate-50 p-4"><Avatar className="h-16 w-16 text-white" style={{ backgroundColor: profile.data?.avatarColor ?? "#4b43a8" }}><AvatarImage src={profileForm.avatarPreviewUrl ?? undefined} alt="Profile icon preview" className="object-contain p-1" /><AvatarFallback className="text-xl font-semibold text-white" style={{ backgroundColor: profile.data?.avatarColor ?? "#4b43a8" }}>{profile.data?.avatarInitials || "AD"}</AvatarFallback></Avatar><div><p className="text-sm font-semibold text-slate-800">{profileForm.displayName || "Workspace administrator"}</p><p className="text-xs text-slate-500">{profileForm.roleLabel || "Super Admin"}</p></div></div><div className="grid gap-2"><label htmlFor="profile-icon-upload" className="text-sm font-medium text-slate-700">Profile icon</label><input id="profile-icon-upload" type="file" accept="image/png,image/jpeg,image/jpg,image/webp" onChange={(event) => chooseProfileIcon(event.target.files?.[0])} className="block w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-600 file:mr-3 file:rounded-md file:border-0 file:bg-indigo-50 file:px-3 file:py-1.5 file:text-sm file:font-medium file:text-indigo-700" /><p className="text-xs text-slate-500">Choose a square PNG, JPG, or WEBP image up to 1.8 MB.</p></div><div className="grid gap-2"><label htmlFor="profile-display-name" className="text-sm font-medium text-slate-700">Display name</label><input id="profile-display-name" value={profileForm.displayName} onChange={(event) => setProfileForm((form) => ({ ...form, displayName: event.target.value }))} className="h-10 rounded-lg border border-slate-200 px-3 text-sm outline-none focus:border-[#5968e8] focus:ring-2 focus:ring-[#5968e8]/10" /></div><div className="grid gap-2"><label htmlFor="profile-role" className="text-sm font-medium text-slate-700">Role label</label><input id="profile-role" value={profileForm.roleLabel} onChange={(event) => setProfileForm((form) => ({ ...form, roleLabel: event.target.value }))} className="h-10 rounded-lg border border-slate-200 px-3 text-sm outline-none focus:border-[#5968e8] focus:ring-2 focus:ring-[#5968e8]/10" /></div></div><DialogFooter><Button type="button" variant="outline" onClick={() => setProfileOpen(false)}>Cancel</Button><Button type="button" disabled={profileUpdate.isPending} onClick={() => { const { avatarPreviewUrl: _avatarPreviewUrl, ...profileInput } = profileForm; profileUpdate.mutate(profileInput); }}>{profileUpdate.isPending ? "Saving..." : "Save profile"}</Button></DialogFooter></DialogContent></Dialog>
            </div>
          </header>
          <DashboardLayoutContent setSidebarWidth={setSidebarWidth} branding={companyBranding} sessionSettings={sessionSettings.data} sessionRecords={uniqueSessionRecords} changeSessionSelection={changeSessionSelection}>
            {children}
          </DashboardLayoutContent>
      </SidebarProvider>
    </DashboardShell>
  );
}

type DashboardLayoutContentProps = {
  children: React.ReactNode;
  setSidebarWidth: (width: number) => void;
  branding: CompanyBranding;
  sessionSettings?: { sessionMode: "all" | "single"; currentSession: string };
  sessionRecords?: { sessionLabel: string; startDate: string; endDate: string }[];
  changeSessionSelection: (value: string) => void;
};

function DashboardLayoutContent({
  children,
  setSidebarWidth,
  branding,
  sessionSettings,
  sessionRecords,
  changeSessionSelection,
}: DashboardLayoutContentProps) {
  const { user, logout } = useAuth();
  const [location, setLocation] = useLocation();
  const { state, toggleSidebar } = useSidebar();
  const isCollapsed = state === "collapsed";
  const [isResizing, setIsResizing] = useState(false);
  const activeSessionLabel = sessionSettings?.currentSession ?? "2026-2027";
  const sidebarRef = useRef<HTMLDivElement>(null);
  const activeMenuItem = menuItems.find(item => item.available && item.path === location);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (isCollapsed) {
      setIsResizing(false);
    }
  }, [isCollapsed]);

  useEffect(() => {
    if (location.startsWith("/clients/edit/") && !isCollapsed) {
      toggleSidebar();
    }
  }, [location, isCollapsed, toggleSidebar]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing) return;

      const sidebarLeft = sidebarRef.current?.getBoundingClientRect().left ?? 0;
      const newWidth = e.clientX - sidebarLeft;
      if (newWidth >= MIN_WIDTH && newWidth <= MAX_WIDTH) {
        setSidebarWidth(newWidth);
      }
    };

    const handleMouseUp = () => {
      setIsResizing(false);
    };

    if (isResizing) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      document.body.style.cursor = "col-resize";
      document.body.style.userSelect = "none";
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    };
  }, [isResizing, setSidebarWidth]);

  return (
    <>
      <div className="relative" ref={sidebarRef}>
        <Sidebar
          collapsible="icon"
          className="border-r-0 lg:top-[72px] lg:h-[calc(100dvh-72px)]"
          disableTransition={isResizing}
        >
          <SidebarHeader className={`border-b border-slate-200/70 bg-white/90 px-3 py-3 backdrop-blur-sm lg:hidden ${isCollapsed ? "min-h-24" : "min-h-20"}`}>
            <div className={`flex w-full transition-all ${isCollapsed ? "flex-col items-center gap-2" : "items-center gap-3"}`}>
              <img src={branding.companyLogoUrl} alt={branding.companyName} className={`block object-contain object-center ${isCollapsed ? "h-9 w-12" : "h-10 w-16"}`} />
              <button
                onClick={toggleSidebar}
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-slate-500 transition-all hover:bg-[#eef2ff] hover:text-[#3157d5] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3157d5]"
                aria-label={isCollapsed ? "Expand navigation" : "Collapse navigation"}
              >
                {isCollapsed ? <Menu className="h-4 w-4" /> : <PanelLeft className="h-4 w-4" />}
              </button>
              <span className="min-w-0 truncate text-sm font-semibold text-slate-700 group-data-[collapsible=icon]:hidden">{branding.companyName}</span>
            </div>
          </SidebarHeader>

          <SidebarContent className="gap-0"><div className="flex items-center justify-between px-4 pb-1 pt-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400 group-data-[collapsible=icon]:hidden"><span>Workspace</span><button type="button" onClick={toggleSidebar} className="flex h-7 w-7 items-center justify-center rounded-md text-slate-500 transition hover:bg-[#eef2ff] hover:text-[#3157d5] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3157d5]" aria-label={isCollapsed ? "Expand navigation" : "Collapse navigation"}>{isCollapsed ? <Menu className="h-4 w-4" /> : <PanelLeft className="h-4 w-4" />}</button></div>
            <div className="hidden justify-center px-2 pb-1 group-data-[collapsible=icon]:flex">
              <button type="button" onClick={toggleSidebar} className="flex h-10 w-full items-center justify-center rounded-md text-slate-500 transition hover:bg-[#eef2ff] hover:text-[#3157d5] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3157d5]" aria-label="Expand navigation">
                <Menu className="h-4 w-4" />
              </button>
            </div>
            <SidebarMenu className="px-2 py-0">
              {menuItems.map(item => {
                const isActive = item.available && location === item.path;
                return (
                  <SidebarMenuItem key={item.label}>
                    <SidebarMenuButton
                      isActive={isActive}
                      onClick={() => item.available ? setLocation(item.path!) : toast.info(`${item.label} is coming soon.`)}
                      tooltip={item.label}
                      className={`h-8 transition-all font-normal`}
                    >
                      <item.icon
                        className={`h-4 w-4 ${isActive ? "text-primary" : ""}`}
                      />
                      <span>{item.label}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarContent>

          <SidebarFooter className="p-2">
            <button type="button" onClick={logout} aria-label="Sign out" className="mt-0 flex w-full items-center gap-3 rounded-lg px-1 py-1 text-left text-sm text-slate-600 transition-colors hover:bg-red-50 hover:text-red-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 group-data-[collapsible=icon]:justify-center">
              <LogOut className="h-4 w-4 shrink-0" />
              <span className="group-data-[collapsible=icon]:hidden">Sign out</span>
            </button>
          </SidebarFooter>
        </Sidebar>
        <div
          className={`absolute top-0 right-0 w-1 h-full cursor-col-resize hover:bg-primary/20 transition-colors ${isCollapsed ? "hidden" : ""}`}
          onMouseDown={() => {
            if (isCollapsed) return;
            setIsResizing(true);
          }}
          style={{ zIndex: 50 }}
        />
      </div>

      <SidebarInset className="min-h-0 overflow-hidden lg:pt-[72px]">

        {isMobile && (
          <div className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-slate-200/80 bg-white/90 px-4 shadow-sm backdrop-blur supports-[backdrop-filter]:backdrop-blur">
            <img src={branding.companyLogoUrl} alt={branding.companyName} className="block h-10 w-14 object-contain object-center" />
            <div className="flex items-center gap-2">
              <select aria-label="Current session view" value={sessionSettings?.sessionMode === "all" ? "all" : (sessionSettings?.currentSession ?? "2026-2027")} onChange={(event) => changeSessionSelection(event.target.value)} className="h-9 max-w-[125px] rounded-lg border border-slate-200 bg-white px-2 text-[11px] font-semibold text-slate-700 outline-none"><option value="all">All</option>{Array.from(new Map((sessionRecords ?? []).map((session) => [session.sessionLabel, session])).values()).map((session) => <option key={session.sessionLabel} value={session.sessionLabel}>{session.sessionLabel}{session.sessionLabel === activeSessionLabel ? " · Active" : ""}</option>)}</select>
              <span className="hidden text-sm font-medium text-slate-600 xs:inline">{activeMenuItem?.label ?? "Menu"}</span>
              <SidebarTrigger className="h-10 w-10 rounded-xl border border-slate-200 bg-white text-slate-600 shadow-sm hover:bg-[#eef2ff] hover:text-[#3157d5]" />
            </div>
          </div>
        )}
        <main className="min-h-0 min-w-0 flex-1 overflow-y-auto bg-[#f8f9fd] p-3 sm:p-4 lg:p-6">{children}</main>
      </SidebarInset>
    </>
  );
}
