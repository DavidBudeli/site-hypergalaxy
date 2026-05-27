"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Activity,
  Bell,
  Bot,
  Boxes,
  ChartNoAxesCombined,
  CircleDollarSign,
  Clock3,
  Search,
  ServerCog,
  Settings,
  ShieldCheck,
  TicketCheck,
  Workflow,
  Zap
} from "lucide-react";
import { SectionHeading } from "@/components/site/section-heading";
import { Badge } from "@/components/ui/badge";
import { agentBrandVisuals, brandAssets } from "@/lib/brand-assets";
import type { Dictionary } from "@/lib/i18n";
import {
  activeProjects,
  activityFeed,
  aiAgents,
  ticketQueue,
  workflowRuns,
  workspaceUsers
} from "@/lib/product-data";

type DashboardPreviewSectionProps = {
  dictionary: Dictionary;
};

const navItems = [
  { label: "Overview", icon: ChartNoAxesCombined },
  { label: "Projects", icon: Boxes },
  { label: "AI Agents", icon: Bot },
  { label: "Tickets", icon: TicketCheck },
  { label: "Billing", icon: CircleDollarSign },
  { label: "Workflows", icon: Workflow },
  { label: "Settings", icon: Settings }
];

const dashboardScenarios = [
  {
    id: "ops",
    badge: "Production",
    sync: "PostgreSQL synced 18s ago",
    workspace: "Acme Global Workspace",
    summary:
      "42 users, 18 active projects, 127 AI agents and 284k workflow runs this month.",
    metrics: [
      { label: "ARR managed", value: "$14.8M", trend: "+12.4%" },
      { label: "AI spend", value: "$8,421", trend: "-6.2%" },
      { label: "Tickets SLA", value: "97.3%", trend: "+4.8%" },
      { label: "Workflow runs", value: "284k", trend: "+31%" }
    ],
    invoice: "$18,420",
    tokens: "5.52M",
    agentBadge: "127 online",
    ticketBadge: "P1 monitored",
    usage: [46, 58, 54, 68, 64, 74, 71, 82, 66, 78, 80, 72]
  },
  {
    id: "growth",
    badge: "Scaling",
    sync: "CRM, email and WhatsApp synced 6s ago",
    workspace: "Nebula Commerce Cluster",
    summary:
      "68 users, 31 client workspaces, 214 AI agents and 512k automation events under control.",
    metrics: [
      { label: "ARR managed", value: "$22.4M", trend: "+18.9%" },
      { label: "AI spend", value: "$12,076", trend: "-4.1%" },
      { label: "Tickets SLA", value: "98.6%", trend: "+6.0%" },
      { label: "Workflow runs", value: "512k", trend: "+42%" }
    ],
    invoice: "$24,980",
    tokens: "8.14M",
    agentBadge: "214 online",
    ticketBadge: "Escalations routed",
    usage: [52, 62, 70, 66, 78, 84, 72, 88, 91, 82, 86, 94]
  },
  {
    id: "finance",
    badge: "Cost control",
    sync: "Billing ledger reconciled 2s ago",
    workspace: "Atlas Finance Command",
    summary:
      "Usage, token budgets, subscriptions, invoices and AI routes optimized across enterprise accounts.",
    metrics: [
      { label: "ARR managed", value: "$31.2M", trend: "+24.7%" },
      { label: "AI spend", value: "$9,308", trend: "-18.4%" },
      { label: "Tickets SLA", value: "99.1%", trend: "+7.5%" },
      { label: "Workflow runs", value: "731k", trend: "+58%" }
    ],
    invoice: "$31,760",
    tokens: "10.9M",
    agentBadge: "312 online",
    ticketBadge: "Finance guardrails",
    usage: [64, 60, 72, 78, 74, 82, 88, 84, 92, 87, 96, 90]
  }
] as const;

export function DashboardPreviewSection({ dictionary }: DashboardPreviewSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [scenarioIndex, setScenarioIndex] = useState(0);
  const scenario = useMemo(
    () => dashboardScenarios[scenarioIndex],
    [scenarioIndex]
  );

  useEffect(() => {
    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      window.matchMedia("(max-width: 1023px)").matches
    ) {
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const trigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top top",
      end: "bottom bottom",
      scrub: 1,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        const next = Math.min(
          dashboardScenarios.length - 1,
          Math.floor(self.progress * dashboardScenarios.length)
        );

        setScenarioIndex((current) => (current === next ? current : next));
      }
    });

    return () => trigger.kill();
  }, []);

  return (
    <section
      id="dashboard"
      ref={sectionRef}
      className="section-shell lg:min-h-[315vh]"
      data-dashboard-story
    >
      <div
        className="absolute right-[6%] top-20 h-80 w-80 rounded-full bg-blue-500/10 blur-3xl"
        data-parallax="-48"
      />
      <div
        className="absolute left-[10%] bottom-24 h-72 w-72 rounded-full bg-cyan-300/8 blur-3xl"
        data-parallax="46"
      />
      <div className="section-inner lg:sticky lg:top-20">
        <SectionHeading
          eyebrow={dictionary.dashboard.eyebrow}
          title={dictionary.dashboard.title}
          subtitle={dictionary.dashboard.subtitle}
        />

        <div
          className="glass-panel holo-border relative mt-12 overflow-hidden rounded-lg p-3 sm:p-5"
          data-reveal
        >
          <div className="absolute inset-0 bg-holo-grid bg-[size:40px_40px] opacity-[0.06]" />
          <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-cyan-300/10 to-transparent" />

          <div className="relative grid min-h-[820px] gap-4 lg:grid-cols-[238px_1fr]">
            <aside className="hidden rounded-lg border border-white/10 bg-slate-950/62 p-4 lg:block">
              <div className="mb-7 flex items-center gap-3">
                <Image
                  src={brandAssets.appIcon}
                  alt=""
                  width={40}
                  height={40}
                  className="h-10 w-10 rounded-lg object-cover shadow-cyan-glow"
                />
                <div>
                  <p className="text-sm font-semibold text-white">HG Console</p>
                  <p className="text-xs text-slate-500">Enterprise workspace</p>
                </div>
              </div>

              <nav className="space-y-2">
                {navItems.map((item, index) => (
                  <div
                    key={item.label}
                    className={`flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-semibold ${
                      index === 0
                        ? "border border-cyan-200/20 bg-cyan-300/10 text-cyan-50"
                        : "text-slate-400"
                    }`}
                  >
                    <span className="flex items-center gap-3">
                      <item.icon className="h-4 w-4" />
                      {item.label}
                    </span>
                    {index === 3 ? (
                      <span className="rounded-full bg-red-400/10 px-2 py-0.5 text-[0.65rem] text-red-100">
                        12
                      </span>
                    ) : null}
                  </div>
                ))}
              </nav>

              <div className="mt-8 rounded-lg border border-white/10 bg-white/[0.04] p-4">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-emerald-200" />
                  <p className="text-sm font-semibold text-white">SOC2-ready</p>
                </div>
                <p className="mt-2 text-xs leading-5 text-slate-500">
                  Audit logs, roles, billing controls and API keys organized by workspace.
                </p>
              </div>

              <div className="mt-4 overflow-hidden rounded-lg border border-violet-300/15 bg-violet-300/8 p-2">
                <Image
                  src={brandAssets.nova.interfaceCard}
                  alt="Nova assistant online"
                  width={408}
                  height={119}
                  className="h-auto w-full rounded-md object-contain"
                />
              </div>
            </aside>

            <div className="min-w-0">
              <header className="rounded-lg border border-white/10 bg-slate-950/62 p-4">
                <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={scenario.id}
                      initial={{ opacity: 0, y: 14, filter: "blur(8px)" }}
                      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                      exit={{ opacity: 0, y: -10, filter: "blur(8px)" }}
                      transition={{ duration: 0.34, ease: "easeOut" }}
                    >
                      <div className="flex flex-wrap items-center gap-2">
                        <Badge variant="success" className="gap-2">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" />
                          {scenario.badge}
                        </Badge>
                        <Badge variant="muted">{scenario.sync}</Badge>
                      </div>
                      <h3 className="mt-3 text-2xl font-semibold text-white">
                        {scenario.workspace}
                      </h3>
                      <p className="mt-1 text-sm text-slate-400">{scenario.summary}</p>
                    </motion.div>
                  </AnimatePresence>

                  <div className="flex flex-wrap items-center gap-3">
                    <div className="hidden h-10 min-w-72 items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 text-sm text-slate-500 md:flex">
                      <Search className="h-4 w-4" />
                      Search customer, ticket, workflow
                    </div>
                    <button
                      type="button"
                      className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/[0.04] text-slate-300"
                      aria-label="Notifications"
                    >
                      <Bell className="h-4 w-4" />
                    </button>
                    <div className="flex -space-x-2">
                      {workspaceUsers.map((user) => (
                        <div
                          key={user.name}
                          className="grid h-10 w-10 place-items-center rounded-full border border-slate-950 bg-gradient-to-br from-cyan-200 to-violet-300 text-[0.68rem] font-bold text-slate-950"
                          title={`${user.name} - ${user.role}`}
                        >
                          {user.initials}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </header>

              <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                {scenario.metrics.map((metric) => (
                  <motion.div
                    key={`${scenario.id}-${metric.label}`}
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.38, ease: "easeOut" }}
                    className="rounded-lg border border-white/10 bg-slate-950/62 p-4"
                  >
                    <div className="flex items-center justify-between">
                      <Activity className="h-5 w-5 text-cyan-100" />
                      <Badge variant="muted">{metric.trend}</Badge>
                    </div>
                    <p className="mt-6 text-xs font-bold uppercase tracking-[0.14em] text-slate-500">
                      {metric.label}
                    </p>
                    <p className="mt-2 text-3xl font-semibold text-white">{metric.value}</p>
                  </motion.div>
                ))}
              </div>

              <div className="mt-4 grid gap-4 xl:grid-cols-[1.25fr_0.75fr]">
                <div className="rounded-lg border border-white/10 bg-slate-950/62 p-5">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold text-white">Projects and delivery</p>
                      <p className="mt-1 text-sm text-slate-500">
                        Actual client workspaces, budgets, owners and rollout states.
                      </p>
                    </div>
                    <Badge variant="violet">18 projects</Badge>
                  </div>

                  <div className="mt-5 overflow-hidden rounded-lg border border-white/10">
                    <div className="grid grid-cols-[1.2fr_0.8fr_0.65fr_0.65fr] border-b border-white/10 bg-white/[0.035] px-4 py-3 text-xs font-bold uppercase tracking-[0.12em] text-slate-500">
                      <span>Project</span>
                      <span>Owner</span>
                      <span>Budget</span>
                      <span>Status</span>
                    </div>
                    {activeProjects.map((project) => (
                      <div
                        key={project.name}
                        className="grid grid-cols-[1.2fr_0.8fr_0.65fr_0.65fr] items-center border-b border-white/8 px-4 py-3 last:border-b-0"
                      >
                        <div>
                          <p className="text-sm font-semibold text-white">{project.name}</p>
                          <div className="mt-2 h-1.5 rounded-full bg-white/8">
                            <div
                              className="h-full rounded-full bg-gradient-to-r from-cyan-300 to-violet-400"
                              style={{ width: `${project.progress}%` }}
                            />
                          </div>
                        </div>
                        <span className="text-sm text-slate-300">{project.owner}</span>
                        <span className="text-sm font-semibold text-cyan-100">
                          {project.budget}
                        </span>
                        <span className="text-sm text-slate-300">{project.status}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-lg border border-white/10 bg-slate-950/62 p-5">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-white">AI usage and billing</p>
                    <CircleDollarSign className="h-5 w-5 text-amber-100" />
                  </div>
                  <div className="mt-5 flex h-40 items-end gap-2 rounded-lg border border-white/10 bg-white/[0.03] p-4">
                    {scenario.usage.map((value, index) => (
                      <motion.span
                        key={`${value}-${index}`}
                        initial={{ height: "24%" }}
                        animate={{ height: `${value}%` }}
                        transition={{ duration: 0.42, ease: "easeOut" }}
                        className="w-full rounded-t-sm bg-gradient-to-t from-cyan-300 to-violet-300"
                      />
                    ))}
                  </div>
                  <div className="mt-4 grid grid-cols-2 gap-3">
                    <div className="rounded-lg border border-white/10 bg-white/[0.035] p-3">
                      <p className="text-xs text-slate-500">Current invoice</p>
                      <p className="mt-1 text-xl font-semibold text-white">
                        {scenario.invoice}
                      </p>
                    </div>
                    <div className="rounded-lg border border-white/10 bg-white/[0.035] p-3">
                      <p className="text-xs text-slate-500">Token volume</p>
                      <p className="mt-1 text-xl font-semibold text-white">
                        {scenario.tokens}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 grid gap-4 xl:grid-cols-[0.9fr_1.1fr]">
                <div className="rounded-lg border border-white/10 bg-slate-950/62 p-5">
                  <div className="mb-4 flex items-center justify-between">
                    <p className="text-sm font-semibold text-white">Ticket operations</p>
                    <Badge variant="default">{scenario.ticketBadge}</Badge>
                  </div>
                  <div className="space-y-3">
                    {ticketQueue.map((ticket) => (
                      <div
                        key={ticket.id}
                        className="rounded-lg border border-white/10 bg-white/[0.035] p-3"
                      >
                        <div className="flex items-center justify-between gap-3">
                          <div>
                            <p className="text-sm font-semibold text-white">{ticket.title}</p>
                            <p className="mt-1 text-xs text-slate-500">
                              {ticket.id} - {ticket.customer} - {ticket.assignee}
                            </p>
                          </div>
                          <div className="text-right">
                            <Badge variant={ticket.priority === "P1" ? "default" : "muted"}>
                              {ticket.priority}
                            </Badge>
                            <p className="mt-2 flex items-center justify-end gap-1 text-xs text-slate-500">
                              <Clock3 className="h-3 w-3" />
                              {ticket.sla}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-lg border border-white/10 bg-slate-950/62 p-5">
                  <div className="mb-4 flex items-center justify-between">
                    <p className="text-sm font-semibold text-white">Agents and workflows</p>
                    <Badge variant="success">{scenario.agentBadge}</Badge>
                  </div>
                  <div className="grid gap-3 md:grid-cols-2">
                    {aiAgents.slice(0, 4).map((agent, index) => (
                      <div
                        key={agent.name}
                        className="rounded-lg border border-white/10 bg-white/[0.035] p-3"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex min-w-0 items-center gap-3">
                            <Image
                              src={agentBrandVisuals[index]}
                              alt=""
                              width={46}
                              height={42}
                              className="h-10 w-11 shrink-0 rounded-lg object-cover"
                            />
                            <div className="min-w-0">
                              <p className="truncate text-sm font-semibold text-white">
                                {agent.name}
                              </p>
                              <p className="mt-1 text-xs text-slate-500">
                                {agent.channel} - {agent.tokens}
                              </p>
                            </div>
                          </div>
                          <span className="font-mono text-xs text-cyan-100">
                            {agent.accuracy}%
                          </span>
                        </div>
                        <div className="mt-3 h-1.5 rounded-full bg-white/8">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-cyan-300 to-emerald-300"
                            style={{ width: `${agent.accuracy}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 grid gap-3 md:grid-cols-2">
                    {workflowRuns.map((workflow) => (
                      <div
                        key={workflow.name}
                        className="rounded-lg border border-white/10 bg-white/[0.035] p-3"
                      >
                        <div className="flex items-center gap-2">
                          <Zap className="h-4 w-4 text-violet-100" />
                          <p className="truncate text-sm font-semibold text-white">
                            {workflow.name}
                          </p>
                        </div>
                        <p className="mt-2 text-xs text-slate-500">
                          {workflow.runs} runs - {workflow.success}% success
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-4 rounded-lg border border-white/10 bg-slate-950/62 p-4">
                <div className="flex flex-wrap items-center gap-2">
                  <ServerCog className="h-4 w-4 text-cyan-100" />
                  <span className="text-sm font-semibold text-white">Live system events</span>
                  <span className="text-xs text-slate-500">streaming from audit log</span>
                </div>
                <div className="mt-3 grid gap-2 md:grid-cols-2">
                  {activityFeed.map((event) => (
                    <div
                      key={event}
                      className="rounded-md border border-white/8 bg-white/[0.035] px-3 py-2 text-xs text-slate-300"
                    >
                      {event}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
