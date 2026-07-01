"use client";

import * as React from "react";
import {
  RiBarChartBoxLine,
  RiCheckboxCircleLine,
  RiErrorWarningLine,
  RiFolder3Line,
  RiGitMergeLine,
  RiLayoutGridLine,
  RiLogoutBoxRLine,
  RiNotification3Line,
  RiRocketLine,
  RiSearchLine,
  RiSettings3Line,
  RiTeamLine,
  RiUser3Line,
  RiUserAddLine,
  RiHome3Line,
  RiBriefcaseLine,
  RiCpuLine,
  RiImageLine,
  RiArticleLine,
  RiMailLine,
} from "@remixicon/react";
import { toast } from "sonner";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import { StrokeDraw } from "@/components/stroke-draw";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import { Kbd, KbdGroup } from "@/components/ui/kbd";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/sonner";

const navItems = [
  { label: "Overview", icon: RiLayoutGridLine },
  { label: "Hero", icon: RiHome3Line },
  { label: "About", icon: RiUser3Line },
  { label: "Projects", icon: RiFolder3Line },
  { label: "Experience", icon: RiBriefcaseLine },
  { label: "Expertise", icon: RiCpuLine },
  { label: "Gallery", icon: RiImageLine },
  { label: "Blogs", icon: RiArticleLine },
  { label: "Contacts", icon: RiMailLine },
];

const stats = [
  { label: "Total revenue", value: "$48.2k", delta: "+12.4%" },
  { label: "Active users", value: "2,840", delta: "+5.1%" },
  { label: "Conversion", value: "3.6%", delta: "-0.8%" },
];

const performanceData = [
  { month: "Jan", revenue: 31_200 },
  { month: "Feb", revenue: 34_800 },
  { month: "Mar", revenue: 33_100 },
  { month: "Apr", revenue: 38_600 },
  { month: "May", revenue: 42_900 },
  { month: "Jun", revenue: 41_300 },
  { month: "Jul", revenue: 45_700 },
  { month: "Aug", revenue: 48_200 },
];

const chartConfig = {
  revenue: {
    label: "Revenue",
    color: "var(--primary)",
  },
} satisfies ChartConfig;

const activity = [
  {
    name: "Priya Nair",
    avatar: "https://i.pravatar.cc/150?img=45",
    icon: RiRocketLine,
    action: "deployed",
    target: "acme-web v2.4",
    time: "2 Min Ago",
  },
  {
    name: "Marco Diaz",
    avatar: "https://i.pravatar.cc/150?img=33",
    icon: RiGitMergeLine,
    action: "merged",
    target: "PR #482: checkout refactor",
    time: "1 Hour Ago",
  },
  {
    name: "Lena Fischer",
    avatar: "https://i.pravatar.cc/150?img=47",
    icon: RiCheckboxCircleLine,
    action: "closed",
    target: "8 tasks in Sprint 7",
    time: "3 Hours Ago",
  },
];

const notifications = [
  {
    id: 1,
    icon: RiRocketLine,
    title: "Deployment succeeded",
    detail: "acme-web v2.4 is live in production.",
    time: "2 Min Ago",
    unread: true,
    tone: "primary" as const,
  },
  {
    id: 2,
    icon: RiUserAddLine,
    title: "New team member",
    detail: "Priya Nair accepted your invite.",
    time: "1 Hour Ago",
    unread: true,
    tone: "primary" as const,
  },
  {
    id: 3,
    icon: RiErrorWarningLine,
    title: "Usage at 80%",
    detail: "You're approaching your monthly request limit.",
    time: "3 Hours Ago",
    unread: false,
    tone: "destructive" as const,
  },
];

const recentItems = [
  { label: "Acme Web Redesign", icon: RiFolder3Line },
  { label: "Q3 Analytics report", icon: RiBarChartBoxLine },
  { label: "Priya Nair", icon: RiUser3Line },
];

const commands = [
  { label: "Go to Overview", icon: RiLayoutGridLine, shortcut: ["G", "O"] },
  { label: "Go to Analytics", icon: RiBarChartBoxLine, shortcut: ["G", "A"] },
  { label: "Go to Projects", icon: RiFolder3Line, shortcut: ["G", "P"] },
  { label: "Go to Team", icon: RiTeamLine, shortcut: ["G", "T"] },
  { label: "Invite a teammate", icon: RiUserAddLine, shortcut: ["I"] },
  { label: "Open settings", icon: RiSettings3Line, shortcut: ["⌘", ","] },
];

export default function AppShellBlock({
  children,
  overview,
  home,
  about,
  blogs,
  contact,
  experience,
  expertise,
  gallery,
  projects,
}: {
  children: React.ReactNode;
  overview: React.ReactNode;
  home: React.ReactNode;
  about: React.ReactNode;
  blogs: React.ReactNode;
  contact: React.ReactNode;
  experience: React.ReactNode;
  expertise: React.ReactNode;
  gallery: React.ReactNode;
  projects: React.ReactNode;
}): React.ReactNode {
  const [activeNav, setActiveNav] = React.useState("Overview");
  const [commandOpen, setCommandOpen] = React.useState(false);
  const [notes, setNotes] = React.useState(notifications);
  const unreadCount = notes.filter((n) => n.unread).length;
  const markAllRead = () =>
    setNotes((prev) => prev.map((n) => ({ ...n, unread: false })));

  React.useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "k" && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        setCommandOpen((open) => !open);
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <SidebarProvider className="min-h-svh bg-muted/30 text-foreground">
      <Toaster />

      <Sidebar collapsible="icon">
        <SidebarHeader>
          <div className="flex h-10 items-center gap-2 px-1 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-0">
            <div
              className="grid shrink-0 grid-cols-2 gap-0.5"
              aria-hidden="true"
            >
              <div className="size-2 bg-primary" />
              <div className="size-2 bg-primary" />
              <div className="size-2 bg-primary" />
              <div className="size-2 bg-primary" />
            </div>
            <span className="truncate text-base font-semibold group-data-[collapsible=icon]:hidden">
              Acme
            </span>
          </div>
        </SidebarHeader>

        <SidebarContent>
          <SidebarGroup>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={`nav-${item.label}`}>
                  <SidebarMenuButton
                    isActive={activeNav === item.label}
                    tooltip={item.label}
                    onClick={() => setActiveNav(item.label)}
                  >
                    <StrokeDraw>
                      <item.icon />
                    </StrokeDraw>
                    <span>{item.label}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <AccountMenu
                trigger={
                  <SidebarMenuButton
                    size="lg"
                    tooltip="Account"
                    className="gap-2 group-data-[collapsible=icon]:justify-center"
                  >
                    <Avatar size="sm">
                      <AvatarImage
                        src="https://i.pravatar.cc/150?img=15"
                        alt="Avery Cole"
                        className="grayscale"
                      />
                      <AvatarFallback>AC</AvatarFallback>
                    </Avatar>
                    <span className="flex min-w-0 flex-col group-data-[collapsible=icon]:hidden">
                      <span className="truncate text-xs font-medium">
                        Avery Cole
                      </span>
                      <span className="truncate text-xs text-muted-foreground">
                        avery@acme.com
                      </span>
                    </span>
                  </SidebarMenuButton>
                }
              />
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>

      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-3 border-b border-border bg-background px-4 sm:px-6">
          <SidebarTrigger className="-ml-1" />

          <button
            type="button"
            onClick={() => setCommandOpen(true)}
            className="relative flex h-9 w-full max-w-sm items-center gap-2 border border-border bg-background px-3 text-sm text-muted-foreground transition-colors hover:bg-muted/50"
          >
            <RiSearchLine className="size-4 shrink-0" aria-hidden="true" />
            <span className="flex-1 text-left">Search projects, people...</span>
            <KbdGroup className="hidden sm:inline-flex">
              <Kbd>⌘</Kbd>
              <Kbd>K</Kbd>
            </KbdGroup>
          </button>

          <div className="ml-auto flex items-center gap-2">
            <Sheet>
              <SheetTrigger
                render={
                  <Button
                    variant="ghost"
                    size="icon"
                    aria-label="Notifications"
                    className="relative"
                  >
                    <RiNotification3Line className="size-5" />
                    {unreadCount > 0 && (
                      <span className="absolute -top-1 -right-1 flex size-4 items-center justify-center bg-primary text-[9px] leading-none font-bold text-primary-foreground ring-2 ring-background">
                        {unreadCount}
                      </span>
                    )}
                  </Button>
                }
              />
              <SheetContent className="w-full sm:max-w-sm">
                <SheetHeader className="gap-0.5 border-b border-border">
                  <SheetTitle>Notifications</SheetTitle>
                  <SheetDescription>
                    {unreadCount > 0
                      ? `${unreadCount} unread updates`
                      : "You're all caught up"}
                  </SheetDescription>
                </SheetHeader>
                <div className="flex flex-1 flex-col overflow-y-auto">
                  {notes.map((note) => (
                    <button
                      key={`note-${note.id}`}
                      type="button"
                      onClick={() =>
                        setNotes((prev) =>
                          prev.map((n) =>
                            n.id === note.id ? { ...n, unread: false } : n,
                          ),
                        )
                      }
                      className={[
                        "flex items-start gap-3 border-b border-border px-4 py-3 text-left transition-colors hover:bg-muted/50 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ring",
                        note.unread ? "bg-muted/30" : "",
                      ]
                        .filter(Boolean)
                        .join(" ")}
                    >
                      <span
                        className={[
                          "mt-0.5 flex size-8 shrink-0 items-center justify-center",
                          note.tone === "destructive"
                            ? "bg-destructive/10 text-destructive"
                            : "bg-primary/10 text-primary",
                        ].join(" ")}
                      >
                        <note.icon className="size-4" aria-hidden="true" />
                      </span>
                      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                        <div className="flex items-center justify-between gap-2">
                          <p className="text-sm font-medium text-foreground">
                            {note.title}
                          </p>
                          <span className="shrink-0 text-[10px] text-muted-foreground tabular-nums">
                            {note.time}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {note.detail}
                        </p>
                      </div>
                      {note.unread && (
                        <span
                          className="mt-1.5 size-2 shrink-0 bg-primary"
                          aria-label="Unread"
                        />
                      )}
                    </button>
                  ))}
                </div>
                <div className="flex items-center justify-between border-t border-border p-3">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-xs text-muted-foreground hover:text-foreground"
                    onClick={markAllRead}
                    disabled={unreadCount === 0}
                  >
                    Mark all read
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-xs text-muted-foreground hover:text-foreground"
                    onClick={() =>
                      toast("Notifications", {
                        description: "Opening all notifications.",
                      })
                    }
                  >
                    View all
                  </Button>
                </div>
              </SheetContent>
            </Sheet>

            <AccountMenu
              trigger={
                <Button variant="ghost" size="icon" aria-label="Account menu">
                  <Avatar>
                    <AvatarImage
                      src="https://i.pravatar.cc/150?img=15"
                      alt="Avery Cole"
                      className="grayscale"
                    />
                    <AvatarFallback>AC</AvatarFallback>
                  </Avatar>
                </Button>
              }
            />
          </div>
        </header>

        <main className="w-full h-full p-6 lg:p-8 overflow-y-auto">
          {activeNav === "Overview" && overview}
          {activeNav === "Hero" && home}
          {activeNav === "About" && about}
          {activeNav === "Projects" && projects}
          {activeNav === "Experience" && experience}
          {activeNav === "Expertise" && expertise}
          {activeNav === "Gallery" && gallery}
          {activeNav === "Blogs" && blogs}
          {activeNav === "Contacts" && contact}
          {!["Overview", "Hero", "About", "Projects", "Experience", "Expertise", "Gallery", "Blogs", "Contacts"].includes(activeNav) && children}
        </main>
      </SidebarInset>

      <CommandDialog open={commandOpen} onOpenChange={setCommandOpen}>
        <Command>
          <CommandInput placeholder="Type a command or search..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Recent">
              {recentItems.map((item) => (
                <CommandItem
                  key={`recent-${item.label}`}
                  value={item.label}
                  onSelect={() => {
                    setCommandOpen(false);
                    toast(item.label, { description: "Opening recent item." });
                  }}
                >
                  <item.icon />
                  <span>{item.label}</span>
                </CommandItem>
              ))}
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="Commands">
              {commands.map((command) => (
                <CommandItem
                  key={`cmd-${command.label}`}
                  value={command.label}
                  onSelect={() => {
                    setCommandOpen(false);
                    toast(command.label, { description: "Command executed." });
                  }}
                >
                  <command.icon />
                  <span>{command.label}</span>
                  <CommandShortcut>
                    <KbdGroup>
                      {command.shortcut.map((keyVal, idx) => (
                        <Kbd key={`kbd-${command.label}-${keyVal}-${idx}`}>{keyVal}</Kbd>
                      ))}
                    </KbdGroup>
                  </CommandShortcut>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </CommandDialog>
    </SidebarProvider>
  );
}

function AccountMenu({ trigger }: { trigger: React.ReactElement }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={trigger} />
      <DropdownMenuContent align="end" className="w-48">
        <div className="flex flex-col px-2 py-1.5">
          <span className="text-xs font-medium text-foreground">
            Avery Cole
          </span>
          <span className="text-xs text-muted-foreground">avery@acme.com</span>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() =>
            toast("Account", { description: "Opening your account." })
          }
        >
          <RiUser3Line />
          Account
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() =>
            toast("Settings", { description: "Opening your settings." })
          }
        >
          <RiSettings3Line />
          Settings
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          variant="destructive"
          onClick={() =>
            toast.success("Logged out", { description: "See you soon." })
          }
        >
          <RiLogoutBoxRLine />
          Log Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
