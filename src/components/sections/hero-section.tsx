"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowDown,
  ArrowRight,
  Bot,
  Boxes,
  ChartNoAxesCombined,
  CircleDollarSign,
  Cpu,
  Database,
  Search,
  Sparkles,
  TicketCheck,
  Workflow
} from "lucide-react";
import { MagneticButton } from "@/components/site/magnetic-button";
import { Badge } from "@/components/ui/badge";
import { GalaxyScene } from "@/components/visuals/galaxy-scene";
import type { Dictionary } from "@/lib/i18n";
import {
  activeProjects,
  aiAgents,
  aiUsageByDay,
  operationalMetrics,
  ticketQueue,
  workspaceUsers
} from "@/lib/product-data";

type HeroSectionProps = {
  dictionary: Dictionary;
};

function useTypingEffect(phrases: readonly string[]) {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [characterIndex, setCharacterIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const phrase = phrases[phraseIndex] ?? "";
    const atEnd = characterIndex === phrase.length;
    const atStart = characterIndex === 0;

    const timeout = window.setTimeout(
      () => {
        if (!deleting && atEnd) {
          setDeleting(true);
          return;
        }

        if (deleting && atStart) {
          setDeleting(false);
          setPhraseIndex((current) => (current + 1) % phrases.length);
          return;
        }

        setCharacterIndex((current) => current + (deleting ? -1 : 1));
      },
      atEnd && !deleting ? 1100 : deleting ? 32 : 58
    );

    return () => window.clearTimeout(timeout);
  }, [characterIndex, deleting, phraseIndex, phrases]);

  return phrases[phraseIndex]?.slice(0, characterIndex) ?? "";
}

export function HeroSection({ dictionary }: HeroSectionProps) {
  const typed = useTypingEffect(dictionary.hero.typingPhrases);

  return (
    <section
      id="top"
      className="relative flex min-h-screen items-center overflow-hidden px-4 pb-16 pt-28 sm:px-6 lg:px-8"
    >
      <GalaxyScene />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_52%_42%,rgba(34,211,238,0.10),transparent_28%),linear-gradient(180deg,rgba(3,7,18,0.08),#030712_94%)]" />
      <div
        className="absolute left-[8%] top-28 hidden h-56 w-56 rounded-full bg-cyan-300/10 blur-3xl lg:block"
        data-parallax="64"
      />
      <div
        className="absolute bottom-20 right-[10%] hidden h-72 w-72 rounded-full bg-violet-500/12 blur-3xl lg:block"
        data-parallax="-48"
      />

      <div className="relative z-10 mx-auto grid w-full max-w-7xl min-w-0 items-center gap-10 lg:grid-cols-2">
        <div className="min-w-0 max-w-3xl">
          <Badge variant="default" className="mb-6 gap-2 px-3 py-1.5">
            <Sparkles className="h-3.5 w-3.5" />
            {dictionary.hero.eyebrow}
          </Badge>

          <h1 className="max-w-full break-words text-balance text-[2.35rem] font-semibold leading-[1.08] tracking-normal text-white sm:text-6xl lg:text-7xl">
            {dictionary.hero.title}
          </h1>
          <p className="mt-6 max-w-full break-words text-base leading-8 text-slate-300 sm:max-w-2xl sm:text-xl">
            {dictionary.hero.subtitle}
          </p>

          <div className="mt-7 flex min-h-12 w-full max-w-full min-w-0 flex-wrap items-center gap-3 overflow-hidden rounded-full border border-cyan-200/14 bg-slate-950/50 px-4 py-3 shadow-cyan-glow backdrop-blur-xl sm:inline-flex sm:w-auto">
            <span className="flex shrink-0 items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-cyan-100">
              <Cpu className="h-4 w-4" />
              {dictionary.hero.typingPrefix}
            </span>
            <span className="h-4 w-px bg-white/14" />
            <span className="min-w-0 truncate font-mono text-sm text-white sm:text-base">
              {typed}
              <span className="ml-1 inline-block h-5 w-2 translate-y-1 bg-cyan-200 animate-pulse" />
            </span>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <MagneticButton href="/login" className="group w-full sm:w-auto">
              {dictionary.hero.primary}
              <ArrowRight className="h-4 w-4" />
            </MagneticButton>
            <MagneticButton
              href="#dashboard"
              variant="galaxy"
              className="group w-full sm:w-auto"
            >
              {dictionary.hero.secondary}
              <ArrowDown className="h-4 w-4" />
            </MagneticButton>
          </div>

          <div className="mt-10 grid max-w-2xl grid-cols-1 gap-3 sm:grid-cols-3">
            {dictionary.hero.stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-lg border border-white/10 bg-white/[0.035] p-4 backdrop-blur-xl"
              >
                <div className="text-2xl font-semibold text-white">{stat.value}</div>
                <div className="mt-1 text-xs font-medium text-slate-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        <HeroCommandDeck />
      </div>
    </section>
  );
}

function HeroCommandDeck() {
  return (
    <motion.div
      className="relative hidden min-h-[690px] min-[1180px]:block"
      initial={false}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="absolute inset-0 rounded-full bg-cyan-300/10 blur-3xl" />
      <div className="holo-border absolute right-0 top-4 w-[580px] rounded-lg min-[1400px]:w-[650px]">
        <div className="glass-panel relative overflow-hidden rounded-lg p-4">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-200/70 to-transparent" />
          <div className="absolute inset-0 bg-holo-grid bg-[size:34px_34px] opacity-[0.08]" />

          <div className="relative grid min-h-[640px] grid-cols-[140px_1fr] gap-4 min-[1400px]:grid-cols-[160px_1fr]">
            <aside className="rounded-lg border border-white/10 bg-slate-950/62 p-3 xl:p-4">
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-lg border border-cyan-200/20 bg-cyan-300/10">
                  <Database className="h-5 w-5 text-cyan-100" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">HG Cloud</p>
                  <p className="text-[0.68rem] text-slate-500">prod-us-east-1</p>
                </div>
              </div>

              <nav className="mt-6 space-y-1.5">
                {[
                  { label: "Overview", icon: ChartNoAxesCombined },
                  { label: "Projects", icon: Boxes },
                  { label: "Agents", icon: Bot },
                  { label: "Tickets", icon: TicketCheck },
                  { label: "Billing", icon: CircleDollarSign },
                  { label: "Workflows", icon: Workflow }
                ].map((item, index) => (
                  <div
                    key={item.label}
                    className={`flex items-center gap-2 rounded-md px-3 py-2 text-xs font-semibold ${
                      index === 0
                        ? "border border-cyan-200/20 bg-cyan-300/10 text-cyan-50"
                        : "text-slate-500"
                    }`}
                  >
                    <item.icon className="h-3.5 w-3.5" />
                    {item.label}
                  </div>
                ))}
              </nav>

              <div className="mt-6 rounded-lg border border-emerald-300/15 bg-emerald-300/8 p-3">
                <p className="text-[0.66rem] font-bold uppercase tracking-[0.14em] text-emerald-100">
                  Database
                </p>
                <p className="mt-2 text-xl font-semibold text-white">128ms</p>
                <p className="text-[0.68rem] text-slate-500">query p95</p>
              </div>
            </aside>

            <div className="min-w-0">
              <header className="flex items-center justify-between gap-4 rounded-lg border border-white/10 bg-white/[0.035] px-4 py-3">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-cyan-100">
                    Live Workspace
                  </p>
                  <h2 className="mt-1 text-xl font-semibold text-white">
                    Hyper Galaxy OS
                  </h2>
                </div>
                <div className="flex items-center gap-3">
                  <div className="hidden h-9 w-48 items-center gap-2 rounded-full border border-white/10 bg-slate-950/60 px-3 text-xs text-slate-500 min-[1400px]:flex">
                    <Search className="h-3.5 w-3.5" />
                    Search projects, tickets, agents
                  </div>
                  <div className="flex -space-x-2">
                    {workspaceUsers.slice(0, 4).map((user) => (
                      <div
                        key={user.name}
                        className="grid h-9 w-9 place-items-center rounded-full border border-slate-950 bg-gradient-to-br from-cyan-200/80 to-violet-300/80 text-[0.65rem] font-bold text-slate-950"
                        title={`${user.name} - ${user.status}`}
                      >
                        {user.initials}
                      </div>
                    ))}
                  </div>
                </div>
              </header>

              <div className="mt-4 grid grid-cols-2 gap-3 min-[1400px]:grid-cols-4">
                {operationalMetrics.map((metric) => (
                  <div
                    key={metric.label}
                    className="rounded-lg border border-white/10 bg-slate-950/58 p-3"
                  >
                    <p className="text-[0.64rem] font-bold uppercase tracking-[0.12em] text-slate-500">
                      {metric.label}
                    </p>
                    <p className="mt-2 text-xl font-semibold text-white">{metric.value}</p>
                    <p className="mt-1 text-[0.68rem] font-semibold text-emerald-200">
                      {metric.trend}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-4 grid grid-cols-[1.12fr_0.88fr] gap-4">
                <div className="rounded-lg border border-white/10 bg-slate-950/58 p-4">
                  <div className="mb-4 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-white">Projects pipeline</p>
                      <p className="text-[0.68rem] text-slate-500">3 active deployments</p>
                    </div>
                    <Badge variant="success" className="gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" />
                      Live
                    </Badge>
                  </div>

                  <div className="space-y-3">
                    {activeProjects.map((project) => (
                      <div
                        key={project.name}
                        className="rounded-md border border-white/8 bg-white/[0.035] p-3"
                      >
                        <div className="flex items-center justify-between gap-3">
                          <div>
                            <p className="text-sm font-semibold text-white">{project.name}</p>
                            <p className="mt-1 text-[0.68rem] text-slate-500">
                              {project.owner} - {project.status}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-semibold text-cyan-100">
                              {project.budget}
                            </p>
                            <p className="text-[0.68rem] text-slate-500">
                              {project.agents} agents
                            </p>
                          </div>
                        </div>
                        <div className="mt-3 h-1.5 rounded-full bg-white/8">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-cyan-300 to-violet-400"
                            style={{ width: `${project.progress}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="rounded-lg border border-white/10 bg-slate-950/58 p-4">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-semibold text-white">AI consumption</p>
                      <span className="text-xs font-semibold text-cyan-100">$8.4k</span>
                    </div>
                    <div className="mt-4 flex h-28 items-end gap-1.5 rounded-md border border-white/8 bg-white/[0.025] p-3">
                      {aiUsageByDay.map((value, index) => (
                        <span
                          key={`${value}-${index}`}
                          className="w-full rounded-t-sm bg-cyan-200/70"
                          style={{ height: `${value}%` }}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="rounded-lg border border-white/10 bg-slate-950/58 p-4">
                    <p className="text-sm font-semibold text-white">Agent health</p>
                    <div className="mt-3 space-y-2">
                      {aiAgents.slice(0, 3).map((agent) => (
                        <div
                          key={agent.name}
                          className="flex items-center justify-between rounded-md border border-white/8 bg-white/[0.035] px-3 py-2"
                        >
                          <span className="truncate text-xs font-semibold text-slate-300">
                            {agent.name}
                          </span>
                          <span className="font-mono text-xs text-cyan-100">
                            {agent.accuracy}%
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 rounded-lg border border-white/10 bg-slate-950/58 p-4">
                <div className="mb-3 flex items-center justify-between">
                  <p className="text-sm font-semibold text-white">Tickets requiring action</p>
                  <span className="text-xs font-semibold text-slate-500">SLA clock</span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {ticketQueue.map((ticket) => (
                    <div
                      key={ticket.id}
                      className="rounded-md border border-white/8 bg-white/[0.035] p-3"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-[0.66rem] text-cyan-100">
                          {ticket.id}
                        </span>
                        <span className="rounded-full bg-red-400/10 px-2 py-0.5 text-[0.62rem] font-bold text-red-100">
                          {ticket.priority}
                        </span>
                      </div>
                      <p className="mt-2 line-clamp-2 text-xs font-semibold leading-5 text-white">
                        {ticket.title}
                      </p>
                      <p className="mt-2 text-[0.68rem] text-slate-500">
                        {ticket.customer} - {ticket.sla}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
