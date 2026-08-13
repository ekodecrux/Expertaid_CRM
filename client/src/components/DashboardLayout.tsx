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

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/", available: true },
  { icon: FileCheck2, label: "Agreements", path: "/", available: true },
  { icon: UsersRound, label: "Clients", available: false },
  { icon: Bell, label: "Reminders", available: false },
  { icon: BarChart3, label: "Reports", available: false },
  { icon: Settings2, label: "Settings", available: false },
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
  const { loading, user } = useAuth();

  useEffect(() => {
    localStorage.setItem(SIDEBAR_WIDTH_KEY, sidebarWidth.toString());
  }, [sidebarWidth]);

  const shellView = resolveDashboardShellView({ loading, hasUser: Boolean(user) });

  const signInView = (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex flex-col items-center gap-8 p-8 max-w-md w-full">
        <div className="flex flex-col items-center gap-6">
          <h1 className="text-2xl font-semibold tracking-tight text-center">Sign in to continue</h1>
          <p className="text-sm text-muted-foreground text-center max-w-sm">Access to this dashboard requires authentication. Continue to launch the login flow.</p>
        </div>
        <Button onClick={() => startLogin()} size="lg" className="w-full shadow-lg hover:shadow-xl transition-all">Sign in</Button>
      </div>
    </div>
  );

  return (
    <DashboardShell loading={shellView === "loading"} hasUser={shellView === "ready"} loadingFallback={<DashboardLayoutSkeleton />} unauthenticatedFallback={signInView}>
    <SidebarProvider
      style={
        {
          "--sidebar-width": `${sidebarWidth}px`,
        } as CSSProperties
      }
    >
      <DashboardLayoutContent setSidebarWidth={setSidebarWidth}>
        {children}
      </DashboardLayoutContent>
    </SidebarProvider>
    </DashboardShell>
  );
}

type DashboardLayoutContentProps = {
  children: React.ReactNode;
  setSidebarWidth: (width: number) => void;
};

function DashboardLayoutContent({
  children,
  setSidebarWidth,
}: DashboardLayoutContentProps) {
  const { user, logout } = useAuth();
  const [location, setLocation] = useLocation();
  const { state, toggleSidebar } = useSidebar();
  const isCollapsed = state === "collapsed";
  const [isResizing, setIsResizing] = useState(false);
  const [workspaceSearch, setWorkspaceSearch] = useState("");
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
          className="border-r-0"
          disableTransition={isResizing}
        >
          <SidebarHeader className={`justify-center border-b border-slate-200/70 bg-white/70 px-2 py-3 backdrop-blur-sm ${isCollapsed ? "min-h-24" : "h-16"}`}>
            <div className={`flex w-full transition-all ${isCollapsed ? "flex-col items-center gap-2" : "items-center justify-between gap-3"}`}>
              {!isCollapsed ? (
                <img src="/manus-storage/EXPLOGO2024_3ab64898.png" alt="EXPERTAL Technologies" className="block h-9 w-auto max-w-[180px] object-contain object-center" />
              ) : (
                <img src="/manus-storage/ERP-logo_8db1044d.png" alt="ERP" className="block h-8 w-8 object-contain object-center" />
              )}
              <button
                onClick={toggleSidebar}
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-slate-500 transition-all hover:bg-[#eef2ff] hover:text-[#3157d5] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3157d5]"
                aria-label={isCollapsed ? "Expand navigation" : "Collapse navigation"}
              >
                {isCollapsed ? <Menu className="h-4 w-4" /> : <PanelLeft className="h-4 w-4" />}
              </button>
            </div>
          </SidebarHeader>

          <SidebarContent className="gap-0"><div className="px-4 pb-2 pt-5 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400 group-data-[collapsible=icon]:hidden">Workspace</div>
            <SidebarMenu className="px-2 py-1">
              {menuItems.map(item => {
                const isActive = item.label === "Agreements" && location === item.path;
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

      <SidebarInset>
        {!isMobile && <header className="hidden h-16 items-center justify-between border-b border-slate-200/80 bg-white/90 px-6 shadow-sm backdrop-blur lg:flex"><div className="flex min-w-0 items-center gap-4"><img src="/manus-storage/EXPLOGO2024_3ab64898.png" alt="Expertaid Technologies" className="block h-9 w-40 max-w-[160px] object-contain object-left" /><div className="hidden min-w-0 md:block"><p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#3157d5]">Agreement workspace</p><p className="mt-1 truncate text-sm font-medium text-slate-600">ERP Solutions · Software Development · IT Support</p></div></div><div className="flex items-center gap-3"><button type="button" aria-label="Notifications" className="relative hidden h-10 w-10 items-center justify-center rounded-xl text-slate-500 transition hover:bg-[#eef2ff] hover:text-[#3157d5] lg:flex" onClick={() => toast.info("No new notifications.")}><Bell className="h-5 w-5" /></button><div className="relative hidden w-64 xl:block"><Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" /><input aria-label="Search clients, schools, reference numbers" value={workspaceSearch} onChange={(event) => { const value = event.target.value; setWorkspaceSearch(value); window.dispatchEvent(new CustomEvent("agreement-search", { detail: value })); }} placeholder="Search clients, schools, reference no…" className="h-10 w-full rounded-xl border border-slate-200 bg-white pl-9 pr-3 text-sm text-slate-700 outline-none transition focus:border-[#3157d5] focus:ring-2 focus:ring-[#3157d5]/10" /></div><DropdownMenu><DropdownMenuTrigger asChild><button type="button" className="flex items-center gap-2 rounded-xl p-1.5 text-left transition hover:bg-[#eef2ff]" aria-label="Open admin profile menu"><div className="hidden text-right xl:block"><p className="text-sm font-semibold text-slate-800">{user?.name || "Admin User"}</p><p className="text-xs text-slate-500">Super Admin</p></div><Avatar className="h-10 w-10 border border-[#d9d6ff] bg-[#4b43a8] text-white"><AvatarFallback className="bg-[#4b43a8] text-xs font-semibold text-white">{user?.name?.slice(0, 2).toUpperCase() || "AD"}</AvatarFallback></Avatar><ChevronDown className="hidden h-4 w-4 text-slate-400 xl:block" /></button></DropdownMenuTrigger><DropdownMenuContent align="end" className="w-48"><DropdownMenuItem onClick={() => logout()}> <LogOut className="mr-2 h-4 w-4" />Sign out</DropdownMenuItem></DropdownMenuContent></DropdownMenu></div></header>}
        {isMobile && (
          <div className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-slate-200/80 bg-white/90 px-4 shadow-sm backdrop-blur supports-[backdrop-filter]:backdrop-blur">
            <img src="/manus-storage/ERP-logo_8db1044d.png" alt="ERP" className="block h-10 w-10 object-contain object-center" />
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
