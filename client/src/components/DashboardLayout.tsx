import { useAuth } from "@/_core/hooks/useAuth";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
import { startLogin } from "@/const";
import { useIsMobile } from "@/hooks/useMobile";
import { BarChart3, Bell, ChevronDown, FileCheck2, LayoutDashboard, LogOut, Menu, PanelLeft, Search, Settings2, UsersRound } from "lucide-react";
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
  { icon: FileCheck2, label: "Agreements", path: "/", available: true },
  { icon: UsersRound, label: "Clients", available: false },
  { icon: Bell, label: "Reminders", available: false },
  { icon: BarChart3, label: "Reports", available: false },
  { icon: Settings2, label: "Settings", path: "/settings", available: true },
];

const SIDEBAR_WIDTH_KEY = "sidebar-width";
const DEFAULT_WIDTH = 280;
const MIN_WIDTH = 200;
const MAX_WIDTH = 480;

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarWidth, setSidebarWidth] = useState(() => {
    const saved = localStorage.getItem(SIDEBAR_WIDTH_KEY);
    return saved ? parseInt(saved, 10) : DEFAULT_WIDTH;
  });
  const { loading, user, logout } = useAuth();
  const branding = trpc.branding.get.useQuery(undefined, { enabled: Boolean(user) });
  const companyBranding: CompanyBranding = branding.data ?? DEFAULT_BRANDING;

  useEffect(() => {
    localStorage.setItem(SIDEBAR_WIDTH_KEY, sidebarWidth.toString());
  }, [sidebarWidth]);

  const shellView = resolveDashboardShellView({ loading, hasUser: Boolean(user) });

  const signInView = (
    <main className="relative flex h-dvh max-h-dvh min-h-0 overflow-hidden bg-[#f6f8ff] text-[#172033]">
      <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-[#dce5ff] blur-3xl" aria-hidden="true" />
      <div className="absolute -bottom-40 -right-20 h-[28rem] w-[28rem] rounded-full bg-[#e6ddff] blur-3xl" aria-hidden="true" />
      <section className="relative hidden min-h-0 flex-1 flex-col justify-between overflow-hidden bg-[#172033] p-8 text-white lg:flex xl:p-12">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_15%,rgba(79,92,212,0.42),transparent_36%),linear-gradient(135deg,#172033_0%,#222d56_56%,#3546a0_100%)]" aria-hidden="true" />
        <div className="relative z-10 flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white p-2 shadow-2xl shadow-black/20"><img src={companyBranding.companyLogoUrl} alt={companyBranding.companyName} className="block h-full w-full object-contain" /></div>
          <div><p className="text-lg font-bold tracking-tight">Expertaid CRM</p><p className="text-xs text-white/60">Agreement operations workspace</p></div>
        </div>
        <div className="relative z-10 max-w-xl pb-6">
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.26em] text-indigo-200">ERP solutions · secure approvals</p>
          <h1 className="font-serif text-5xl leading-[1.05] tracking-[-0.04em] xl:text-7xl">Turn every agreement into a confident next step.</h1>
          <p className="mt-6 max-w-lg text-base leading-7 text-white/70">Create, share, and track client agreements with a calm, focused workspace built for modern ERP sales teams.</p>
          <div className="mt-10 grid max-w-lg grid-cols-3 gap-3">
            {[['01', 'Create'], ['02', 'Approve'], ['03', 'Track']].map(([number, label]) => <div key={number} className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur"><span className="text-xs font-semibold text-indigo-200">{number}</span><p className="mt-3 text-sm font-medium text-white/90">{label}</p></div>)}
          </div>
        </div>
        <p className="relative z-10 text-xs text-white/45">{companyBranding.serviceCaption}</p>
      </section>
      <section className="relative flex h-full min-h-0 w-full items-center justify-center overflow-hidden px-4 py-4 sm:px-8 lg:max-w-[560px] lg:px-12 xl:max-w-[640px] xl:px-16">
        <div className="w-full max-w-md">
          <div className="mb-4 flex items-center gap-3 lg:hidden"><div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white p-1.5 shadow-sm ring-1 ring-slate-200"><img src={companyBranding.companyLogoUrl} alt={companyBranding.companyName} className="block h-full w-full object-contain" /></div><div><p className="font-bold tracking-tight">Expertaid CRM</p><p className="text-xs text-slate-500">Agreement operations workspace</p></div></div>
          <div className="max-h-full overflow-hidden rounded-[2rem] border border-white/80 bg-white/85 p-5 shadow-[0_30px_90px_rgba(47,61,125,0.14)] backdrop-blur-xl sm:p-8">
            <div className="mb-5"><div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-[#eef2ff] text-[#3157d5]"><PanelLeft className="h-5 w-5" /></div><p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#3157d5]">Welcome back</p><h2 className="font-serif text-3xl tracking-[-0.04em] text-[#172033] sm:text-4xl">Sign in to Expertaid CRM</h2><p className="mt-3 text-sm leading-6 text-slate-500">Access your agreements, client approvals, and secure signatures in one place.</p></div>
            <Button onClick={() => startLogin()} size="lg" className="h-12 w-full rounded-xl bg-[#3157d5] text-white shadow-lg shadow-[#3157d5]/20 transition-all hover:-translate-y-0.5 hover:bg-[#2748bd] hover:shadow-xl hover:shadow-[#3157d5]/25">Continue with secure sign-in <ChevronDown className="ml-2 h-4 w-4 -rotate-90" /></Button>
            <div className="mt-6 flex items-center justify-center gap-2 text-xs text-slate-400"><span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />Protected workspace access</div>
          </div>
          <p className="mt-3 text-center text-[11px] leading-4 text-slate-400 sm:text-xs sm:leading-5">By continuing, you enter the authorized Expertaid CRM workspace.<br />Need access? Contact your workspace administrator.</p>
        </div>
      </section>
    </main>
  );

  return (
    <DashboardShell loading={shellView === "loading"} hasUser={shellView === "ready"} loadingFallback={<DashboardLayoutSkeleton />} unauthenticatedFallback={signInView}>
      <SidebarProvider className="relative min-h-screen bg-[#f8f9fd]" style={{ "--sidebar-width": `${sidebarWidth}px` } as CSSProperties}>
          <header className="fixed inset-x-0 top-0 z-50 hidden h-[72px] items-center bg-white/95 shadow-sm backdrop-blur lg:flex">
            <div className="flex h-full w-[230px] shrink-0 items-center border-r border-slate-200 px-7">
              <img src={companyBranding.companyLogoUrl} alt={companyBranding.companyName} className="block h-11 w-full max-w-[170px] object-contain object-left" />
            </div>
            <div className="flex h-full w-[300px] shrink-0 items-center gap-3 border-r border-slate-200 px-5">
              <SidebarTrigger aria-label="Toggle navigation" className="h-9 w-9 rounded-lg border border-slate-200 bg-white text-slate-600 shadow-sm hover:bg-[#eef2ff] hover:text-[#3157d5]" />
              <span className="min-w-0 truncate text-sm font-semibold text-slate-700">{companyBranding.companyName}</span>
            </div>
            <div className="flex flex-1 items-center justify-end gap-7 px-6 xl:px-8">
              <div className="relative w-full max-w-[365px]">
                <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                <input aria-label="Search clients, schools, reference numbers" defaultValue="" onChange={(event) => window.dispatchEvent(new CustomEvent("agreement-search", { detail: event.target.value }))} placeholder="Search clients, schools, reference no…" className="h-12 w-full rounded-xl border border-slate-200 bg-white pl-12 pr-4 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-[#3157d5] focus:ring-2 focus:ring-[#3157d5]/10" />
              </div>
              <button type="button" aria-label="Notifications" className="relative flex h-12 w-12 items-center justify-center border-l border-slate-200 pl-5 text-slate-500 transition hover:text-[#3157d5]" onClick={() => toast.info("No new notifications.")}>
                <Bell className="h-6 w-6" /><span className="absolute right-0 top-1 h-5 min-w-5 rounded-full bg-[#f03e5f] px-1 text-[11px] font-bold leading-5 text-white">3</span>
              </button>
              <DropdownMenu><DropdownMenuTrigger asChild><button type="button" aria-label="Open admin profile menu" className="flex items-center gap-3 border-l border-slate-200 pl-6 text-left"><Avatar className="h-12 w-12 bg-[#4b43a8] text-white"><AvatarFallback className="bg-[#4b43a8] text-lg font-semibold text-white">{user?.name?.slice(0, 2).toUpperCase() || "AD"}</AvatarFallback></Avatar><span className="hidden min-w-[120px] xl:block"><strong className="block text-sm font-semibold text-slate-800">{user?.name || "Admin User"}</strong><small className="block pt-1 text-xs text-slate-500">Super Admin</small></span><ChevronDown className="h-4 w-4 text-slate-500" /></button></DropdownMenuTrigger><DropdownMenuContent align="end" className="w-48"><DropdownMenuItem onClick={() => logout()}><LogOut className="mr-2 h-4 w-4" />Sign out</DropdownMenuItem></DropdownMenuContent></DropdownMenu>
            </div>
          </header>
          <DashboardLayoutContent setSidebarWidth={setSidebarWidth} branding={companyBranding}>
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
};

function DashboardLayoutContent({
  children,
  setSidebarWidth,
  branding,
}: DashboardLayoutContentProps) {
  const { user, logout } = useAuth();
  const [location, setLocation] = useLocation();
  const { state, toggleSidebar } = useSidebar();
  const isCollapsed = state === "collapsed";
  const [isResizing, setIsResizing] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const activeMenuItem = menuItems.find(item => item.available && item.path === location);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (isCollapsed) {
      setIsResizing(false);
    }
  }, [isCollapsed]);

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
          className="border-r-0 lg:top-[72px] lg:h-[calc(100vh-72px)]"
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

          <SidebarContent className="gap-0"><div className="px-4 pb-2 pt-5 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400 group-data-[collapsible=icon]:hidden">Workspace</div>
            <SidebarMenu className="px-2 py-1">
              {menuItems.map(item => {
                const isActive = item.available && location === item.path;
                return (
                  <SidebarMenuItem key={item.label}>
                    <SidebarMenuButton
                      isActive={isActive}
                      onClick={() => item.available ? setLocation(item.path!) : toast.info(`${item.label} is coming soon.`)}
                      tooltip={item.label}
                      className={`h-10 transition-all font-normal`}
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

          <SidebarFooter className="p-3">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-3 rounded-lg px-1 py-1 hover:bg-accent/50 transition-colors w-full text-left group-data-[collapsible=icon]:justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                  <Avatar className="h-9 w-9 border shrink-0">
                    <AvatarFallback className="text-xs font-medium">
                      {user?.name?.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0 group-data-[collapsible=icon]:hidden">
                    <p className="text-sm font-medium truncate leading-none">
                      {user?.name || "-"}
                    </p>
                    <p className="text-xs text-muted-foreground truncate mt-1.5">
                      {user?.email || "-"}
                    </p>
                  </div>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem
                  onClick={logout}
                  className="cursor-pointer text-destructive focus:text-destructive"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
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

      <SidebarInset className="lg:pt-[72px]">

        {isMobile && (
          <div className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-slate-200/80 bg-white/90 px-4 shadow-sm backdrop-blur supports-[backdrop-filter]:backdrop-blur">
            <img src={branding.companyLogoUrl} alt={branding.companyName} className="block h-10 w-14 object-contain object-center" />
            <div className="flex items-center gap-2">
              <span className="hidden text-sm font-medium text-slate-600 xs:inline">{activeMenuItem?.label ?? "Menu"}</span>
              <SidebarTrigger className="h-10 w-10 rounded-xl border border-slate-200 bg-white text-slate-600 shadow-sm hover:bg-[#eef2ff] hover:text-[#3157d5]" />
            </div>
          </div>
        )}
        <main className="min-w-0 flex-1 bg-[#f8f9fd] p-3 sm:p-4 lg:p-6">{children}</main>
      </SidebarInset>
    </>
  );
}
