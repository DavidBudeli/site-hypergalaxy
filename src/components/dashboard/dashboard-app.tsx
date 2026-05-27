"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Activity,
  Bell,
  Bot,
  Boxes,
  ChartNoAxesCombined,
  CircleDollarSign,
  LogOut,
  Rocket,
  Search,
  ServerCog,
  Settings,
  ShieldCheck,
  TicketCheck,
  Workflow,
  Zap
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { agentBrandVisuals, brandAssets } from "@/lib/brand-assets";
import {
  clearSession,
  readSession,
  type HyperGalaxySession
} from "@/lib/auth";

const sidebarItems = [
  { label: "Command", icon: Rocket },
  { label: "Agents", icon: Bot },
  { label: "Projects", icon: Boxes },
  { label: "Tickets", icon: TicketCheck },
  { label: "Billing", icon: CircleDollarSign },
  { label: "Settings", icon: Settings }
];

const metrics = [
  { label: "AI usage", value: "74%", trend: "+9%", icon: ChartNoAxesCombined },
  { label: "Active agents", value: "127", trend: "+14", icon: Bot },
  { label: "Open tickets", value: "132", trend: "-12%", icon: TicketCheck },
  { label: "Automations", value: "48.2k", trend: "+21%", icon: Workflow }
];

const agents = [
  { name: "AI Support Agent", status: "Online", load: 92, channel: "Email" },
  { name: "AI SDR Agent", status: "Online", load: 81, channel: "CRM" },
  { name: "AI WhatsApp Agent", status: "Online", load: 68, channel: "WhatsApp" },
  { name: "AI Dev Assistant", status: "Standby", load: 44, channel: "GitHub" }
];

const tickets = [
  { id: "HG-1048", title: "Billing webhook review", priority: "High" },
  { id: "HG-1047", title: "WhatsApp agent prompt update", priority: "Medium" },
  { id: "HG-1046", title: "Dashboard analytics sync", priority: "Low" }
];

export function DashboardApp() {
  const router = useRouter();
  const [session, setSession] = useState<HyperGalaxySession | null>(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      const activeSession = readSession();

      if (!activeSession) {
        router.replace("/login");
        return;
      }

      setSession(activeSession);
      setChecking(false);
    }, 0);

    return () => window.clearTimeout(timeout);
  }, [router]);

  function handleLogout() {
    clearSession();
    router.push("/login");
  }

  if (checking || !session) {
    return (
      <main className="grid min-h-screen place-items-center bg-[#030712] px-4">
        <div className="text-center">
          <Image
            src={brandAssets.appIcon}
            alt=""
            width={56}
            height={56}
            className="mx-auto h-14 w-14 animate-pulse rounded-2xl object-cover shadow-cyan-glow"
            priority
          />
          <p className="mt-5 text-sm font-semibold text-slate-300">
            Loading Hyper Galaxy OS
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#030712] text-white">
      <div className="absolute inset-0 bg-galaxy-radial opacity-70" />
      <div className="absolute inset-0 bg-holo-grid bg-[size:76px_76px] opacity-[0.06]" />

      <div className="relative z-10 grid min-h-screen lg:grid-cols-[260px_1fr]">
        <aside className="hidden border-r border-white/10 bg-slate-950/50 p-5 backdrop-blur-xl lg:block">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src={brandAssets.logoCompact}
              alt="Hyper Galaxy"
              width={154}
              height={49}
              className="h-11 w-auto object-contain"
              priority
            />
          </Link>

          <nav className="mt-9 space-y-2">
            {sidebarItems.map((item, index) => (
              <Link
                key={item.label}
                href={index === 0 ? "/dashboard" : "#"}
                className={`flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-semibold transition-colors ${
                  index === 0
                    ? "border border-cyan-200/20 bg-cyan-300/10 text-cyan-50"
                    : "text-slate-400 hover:bg-white/[0.05] hover:text-white"
                }`}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="mt-10 rounded-lg border border-white/10 bg-white/[0.04] p-4">
            <ShieldCheck className="h-5 w-5 text-emerald-200" />
            <p className="mt-3 text-sm font-semibold text-white">Enterprise session</p>
            <p className="mt-1 text-xs leading-5 text-slate-400">
              Signed in as {session.user.role}
            </p>
          </div>

          <div className="mt-4 rounded-lg border border-violet-300/15 bg-violet-300/8 p-3">
            <div className="flex items-center gap-3">
              <Image
                src={brandAssets.nova.avatar}
                alt=""
                width={50}
                height={46}
                className="h-12 w-12 rounded-full object-cover"
              />
              <div>
                <p className="text-sm font-semibold text-white">Nova</p>
                <p className="text-xs text-emerald-200">AI assistant online</p>
              </div>
            </div>
          </div>
        </aside>

        <section className="min-w-0 px-4 py-5 sm:px-6 lg:px-8">
          <header className="flex flex-col gap-4 rounded-lg border border-white/10 bg-slate-950/54 p-4 backdrop-blur-xl sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-cyan-100">
                Hyper Galaxy OS
              </p>
              <h1 className="mt-1 text-2xl font-semibold text-white sm:text-3xl">
                Command Dashboard
              </h1>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <div className="hidden h-10 min-w-64 items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 text-sm text-slate-500 md:flex">
                <Search className="h-4 w-4" />
                Search agents, tickets, automations
              </div>
              <Button variant="outline" size="icon" aria-label="Notifications">
                <Bell className="h-4 w-4" />
              </Button>
              <Button variant="outline" onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                Sair
              </Button>
            </div>
          </header>

          <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {metrics.map((metric) => (
              <div
                key={metric.label}
                className="rounded-lg border border-white/10 bg-slate-950/54 p-5 shadow-glow backdrop-blur-xl"
              >
                <div className="flex items-center justify-between">
                  <metric.icon className="h-5 w-5 text-cyan-100" />
                  <Badge variant="muted">{metric.trend}</Badge>
                </div>
                <p className="mt-6 text-xs font-bold uppercase tracking-[0.14em] text-slate-500">
                  {metric.label}
                </p>
                <p className="mt-2 text-3xl font-semibold text-white">{metric.value}</p>
              </div>
            ))}
          </div>

          <div className="mt-5 grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
            <div className="rounded-lg border border-white/10 bg-slate-950/54 p-5 backdrop-blur-xl">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-white">Agent mesh</p>
                  <p className="mt-1 text-sm text-slate-400">
                    Real-time health across active AI modules.
                  </p>
                </div>
                <Badge variant="success" className="gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" />
                  Live
                </Badge>
              </div>

              <div className="mt-6 space-y-3">
                {agents.map((agent, index) => (
                  <div
                    key={agent.name}
                    className="rounded-lg border border-white/10 bg-white/[0.035] p-4"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div className="flex min-w-0 items-center gap-3">
                        <Image
                          src={agentBrandVisuals[index]}
                          alt=""
                          width={54}
                          height={49}
                          className="h-12 w-12 shrink-0 rounded-lg object-cover"
                        />
                        <div className="min-w-0">
                          <p className="truncate font-semibold text-white">{agent.name}</p>
                          <p className="mt-1 text-xs text-slate-500">
                            {agent.channel} - {agent.status}
                          </p>
                        </div>
                      </div>
                      <span className="font-mono text-sm font-semibold text-cyan-100">
                        {agent.load}%
                      </span>
                    </div>
                    <div className="mt-3 h-2 rounded-full bg-white/8">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-cyan-300 to-violet-400"
                        style={{ width: `${agent.load}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-4">
              <div className="rounded-lg border border-white/10 bg-slate-950/54 p-5 backdrop-blur-xl">
                <div className="flex items-center gap-3">
                  <Activity className="h-5 w-5 text-cyan-100" />
                  <p className="font-semibold text-white">Operational pulse</p>
                </div>
                <div className="mt-6 flex h-40 items-end justify-between gap-2 rounded-lg border border-white/10 bg-white/[0.03] p-4">
                  {[46, 78, 52, 88, 64, 94, 72, 82, 58, 90].map((value, index) => (
                    <span
                      key={`${value}-${index}`}
                      className="w-full rounded-t-sm bg-cyan-200/70 shadow-cyan-glow"
                      style={{ height: `${value}%` }}
                    />
                  ))}
                </div>
              </div>

              <div className="rounded-lg border border-white/10 bg-slate-950/54 p-5 backdrop-blur-xl">
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-white">Tickets queue</p>
                  <Badge variant="violet">{tickets.length} open</Badge>
                </div>
                <div className="mt-5 space-y-3">
                  {tickets.map((ticket) => (
                    <div
                      key={ticket.id}
                      className="flex items-center justify-between gap-3 rounded-lg border border-white/10 bg-white/[0.035] px-4 py-3"
                    >
                      <div>
                        <p className="text-sm font-semibold text-white">{ticket.title}</p>
                        <p className="mt-1 text-xs text-slate-500">{ticket.id}</p>
                      </div>
                      <Badge variant={ticket.priority === "High" ? "default" : "muted"}>
                        {ticket.priority}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-5 grid gap-4 lg:grid-cols-3">
            <div className="rounded-lg border border-white/10 bg-slate-950/54 p-5 backdrop-blur-xl">
              <CircleDollarSign className="h-5 w-5 text-amber-100" />
              <p className="mt-4 text-sm font-semibold text-slate-400">Next invoice</p>
              <p className="mt-2 text-3xl font-semibold text-white">R$ 18.420</p>
            </div>
            <div className="rounded-lg border border-white/10 bg-slate-950/54 p-5 backdrop-blur-xl">
              <ServerCog className="h-5 w-5 text-cyan-100" />
              <p className="mt-4 text-sm font-semibold text-slate-400">Infrastructure</p>
              <p className="mt-2 text-3xl font-semibold text-white">99.99%</p>
            </div>
            <div className="rounded-lg border border-white/10 bg-slate-950/54 p-5 backdrop-blur-xl">
              <Zap className="h-5 w-5 text-violet-100" />
              <p className="mt-4 text-sm font-semibold text-slate-400">Automations today</p>
              <p className="mt-2 text-3xl font-semibold text-white">8.7k</p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
