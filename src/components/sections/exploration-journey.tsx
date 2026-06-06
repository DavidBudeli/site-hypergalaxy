"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Bot,
  Boxes,
  ChartNoAxesCombined,
  Cloud,
  Code2,
  Database,
  GitBranch,
  Network,
  PlugZap,
  Radar,
  ShieldCheck,
  Sparkles,
  TicketCheck,
  WalletCards,
  Workflow,
  Zap
} from "lucide-react";
import { MagneticButton } from "@/components/site/magnetic-button";
import { Badge } from "@/components/ui/badge";
import { agentBrandVisuals, brandAssets } from "@/lib/brand-assets";
import { techLogos, type Dictionary } from "@/lib/i18n";
import {
  activeProjects,
  aiUsageByDay,
  operationalMetrics,
  ticketQueue,
  workspaceUsers
} from "@/lib/product-data";

type ExplorationJourneyProps = {
  dictionary: Dictionary;
};

type LocationIntroProps = {
  location: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  align?: "center" | "left";
};

const infrastructureIcons = [
  TicketCheck,
  Boxes,
  WalletCards,
  Workflow,
  ChartNoAxesCombined
];

const ecosystemIcons = [Bot, Cloud, PlugZap, Code2, Database, GitBranch];

export function ExplorationJourney({ dictionary }: ExplorationJourneyProps) {
  return (
    <>
      <FirstContactLocation dictionary={dictionary} />
      <AgentMarketplaceLocation dictionary={dictionary} />
      <CommandNexusLocation dictionary={dictionary} />
      <GalacticInfrastructureLocation dictionary={dictionary} />
      <HyperCoreLocation dictionary={dictionary} />
      <FinalPortalLocation dictionary={dictionary} />
    </>
  );
}

function LocationIntro({
  location,
  eyebrow,
  title,
  subtitle,
  align = "left"
}: LocationIntroProps) {
  return (
    <div
      className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-2xl"}
      data-reveal
    >
      <div
        className={`mb-5 flex items-center gap-3 ${
          align === "center" ? "justify-center" : ""
        }`}
      >
        <span className="rounded-full border border-cyan-100/14 bg-cyan-100/7 px-3 py-1 text-[0.68rem] font-bold uppercase tracking-[0.18em] text-cyan-100">
          {location}
        </span>
        <span className="h-px w-16 bg-gradient-to-r from-cyan-100/45 to-transparent" />
      </div>
      <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-cyan-100/80">
        {eyebrow}
      </p>
      <h2 className="text-balance text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-6xl">
        {title}
      </h2>
      <p className="mt-6 text-base leading-8 text-slate-300 sm:text-lg">{subtitle}</p>
    </div>
  );
}

function FirstContactLocation({ dictionary }: ExplorationJourneyProps) {
  const location = dictionary.journey.firstContact;

  return (
    <section
      id="platform"
      className="section-shell flex min-h-screen items-center border-t border-white/8"
      data-location-stage
    >
      <div
        className="absolute right-[12%] top-20 hidden h-72 w-72 rounded-full bg-cyan-300/8 blur-3xl lg:block"
        data-parallax="-42"
      />
      <div className="section-inner grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr]">
        <LocationIntro
          location={location.location}
          eyebrow={location.eyebrow}
          title={location.title}
          subtitle={location.subtitle}
        />

        <div className="relative min-h-[520px]" data-reveal>
          <div className="absolute inset-0 rounded-full bg-violet-400/8 blur-3xl" />
          <div className="glass-panel relative mx-auto grid min-h-[520px] max-w-[620px] place-items-center overflow-hidden rounded-lg p-6">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_46%,rgba(34,211,238,0.12),transparent_18rem),linear-gradient(rgba(103,232,249,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(103,232,249,0.026)_1px,transparent_1px)] bg-[size:auto,72px_72px,72px_72px]" />
            <div className="relative grid aspect-square w-full max-w-[390px] place-items-center">
              <div className="absolute inset-0 rounded-full border border-cyan-100/10" />
              <div className="absolute inset-10 rounded-full border border-violet-100/12" />
              <div className="absolute inset-20 rounded-full border border-cyan-100/16" />
              <div className="absolute inset-[38%] rounded-full bg-cyan-200/10 blur-2xl" />
              <Image
                src={brandAssets.symbol}
                alt=""
                width={160}
                height={160}
                className="relative h-32 w-32 rounded-full object-contain drop-shadow-[0_0_34px_rgba(124,58,237,0.35)]"
              />
              {location.signals.map((signal, index) => (
                <div
                  key={signal}
                  className="absolute rounded-full border border-white/10 bg-slate-950/74 px-4 py-2 text-xs font-semibold text-slate-200 shadow-[0_0_28px_rgba(34,211,238,0.08)]"
                  style={{
                    left: index === 0 ? "3%" : index === 1 ? "58%" : "26%",
                    top: index === 0 ? "26%" : index === 1 ? "34%" : "78%"
                  }}
                >
                  {signal}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function AgentMarketplaceLocation({ dictionary }: ExplorationJourneyProps) {
  const location = dictionary.journey.marketplace;

  return (
    <section
      id="agents"
      className="section-shell min-h-screen border-y border-white/8 bg-[linear-gradient(180deg,rgba(8,17,32,0.62),rgba(3,7,18,0.9))]"
      data-horizontal-section
      data-location-stage
    >
      <div
        className="absolute inset-0 bg-[linear-gradient(rgba(103,232,249,0.032)_1px,transparent_1px),linear-gradient(90deg,rgba(103,232,249,0.022)_1px,transparent_1px)] bg-[size:96px_96px] opacity-35 [mask-image:linear-gradient(to_bottom,transparent,black_20%,black_75%,transparent)]"
        data-parallax="-24"
      />
      <div className="section-inner">
        <LocationIntro
          align="center"
          location={location.location}
          eyebrow={location.eyebrow}
          title={location.title}
          subtitle={location.subtitle}
        />

        <div className="mt-12 overflow-visible lg:overflow-hidden" data-horizontal-viewport>
          <div
            className="grid gap-4 md:grid-cols-2 lg:flex lg:w-max lg:gap-5 lg:pr-[28vw]"
            data-horizontal-track
          >
            <div className="glass-panel relative min-h-[430px] overflow-hidden rounded-lg p-6 lg:w-[420px] lg:shrink-0">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_26%,rgba(124,58,237,0.18),transparent_16rem)]" />
              <div className="relative flex h-full flex-col justify-between">
                <div>
                  <Badge variant="default" className="gap-2">
                    <Radar className="h-3.5 w-3.5" />
                    {location.station}
                  </Badge>
                  <h3 className="mt-7 text-3xl font-semibold leading-tight text-white">
                    {location.stationTitle}
                  </h3>
                  <p className="mt-4 text-sm leading-7 text-slate-300">
                    {location.stationText}
                  </p>
                </div>
                <Image
                  src={brandAssets.nova.wave}
                  alt=""
                  width={240}
                  height={220}
                  className="mx-auto mt-8 h-44 w-44 object-contain drop-shadow-[0_0_38px_rgba(124,58,237,0.25)]"
                />
              </div>
            </div>

            {dictionary.marketplace.agents.map((agent, index) => {
              const visual = agentBrandVisuals[index % agentBrandVisuals.length];

              return (
                <motion.article
                  key={agent.name}
                  className="group relative min-h-[430px] overflow-hidden rounded-lg border border-white/10 bg-slate-950/68 p-5 lg:w-[360px] lg:shrink-0"
                  data-reveal
                  initial={false}
                  whileHover={{ y: -8 }}
                  transition={{ type: "spring", stiffness: 220, damping: 18 }}
                >
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-100/70 to-transparent opacity-60" />
                  <div className="absolute -right-20 -top-20 h-44 w-44 rounded-full bg-cyan-300/8 blur-3xl transition-opacity duration-300 group-hover:opacity-100" />
                  <div className="relative">
                    <div className="flex items-start justify-between gap-4">
                      <Image
                        src={visual}
                        alt=""
                        width={72}
                        height={68}
                        className="h-16 w-16 rounded-lg object-cover shadow-[0_0_28px_rgba(124,58,237,0.22)]"
                      />
                      <Badge variant="success" className="gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" />
                        {dictionary.marketplace.online}
                      </Badge>
                    </div>
                    <h3 className="mt-7 text-2xl font-semibold text-white">{agent.name}</h3>
                    <p className="mt-4 text-sm leading-7 text-slate-400">
                      {agent.description}
                    </p>
                    <div className="mt-8">
                      <div className="mb-2 flex items-center justify-between text-xs font-semibold text-slate-400">
                        <span>{dictionary.marketplace.consumption}</span>
                        <span className="text-cyan-100">{agent.consumption}</span>
                      </div>
                      <div className="h-1.5 overflow-hidden rounded-full bg-white/8">
                        <motion.div
                          className="h-full rounded-full bg-gradient-to-r from-cyan-300 to-violet-300"
                          initial={{ width: "20%" }}
                          whileInView={{ width: agent.signal }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.1, ease: "easeOut" }}
                        />
                      </div>
                    </div>
                    <div className="mt-7 flex flex-wrap gap-2">
                      {agent.integrations.map((integration) => (
                        <span
                          key={integration}
                          className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[0.68rem] font-semibold text-slate-300"
                        >
                          {integration}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function CommandNexusLocation({ dictionary }: ExplorationJourneyProps) {
  const location = dictionary.journey.command;

  return (
    <section
      id="command"
      className="section-shell min-h-screen"
      data-location-stage
    >
      <span id="dashboard" className="absolute -top-24" />
      <div
        className="absolute left-[8%] top-20 h-72 w-72 rounded-full bg-violet-400/8 blur-3xl"
        data-parallax="44"
      />
      <div className="section-inner">
        <LocationIntro
          align="center"
          location={location.location}
          eyebrow={location.eyebrow}
          title={location.title}
          subtitle={location.subtitle}
        />

        <div className="glass-panel holo-border relative mt-12 overflow-hidden rounded-lg p-3 sm:p-5" data-reveal>
          <div className="absolute inset-0 bg-[linear-gradient(rgba(103,232,249,0.034)_1px,transparent_1px),linear-gradient(90deg,rgba(103,232,249,0.022)_1px,transparent_1px)] bg-[size:42px_42px] opacity-30" />
          <div className="relative grid min-h-[760px] gap-4 lg:grid-cols-[220px_1fr]">
            <aside className="hidden rounded-lg border border-white/10 bg-slate-950/62 p-4 lg:block">
              <div className="flex items-center gap-3">
                <Image
                  src={brandAssets.appIcon}
                  alt=""
                  width={42}
                  height={42}
                  className="h-10 w-10 rounded-lg object-cover"
                />
                <div>
                  <p className="text-sm font-semibold text-white">HG Console</p>
                  <p className="text-xs text-slate-500">Enterprise workspace</p>
                </div>
              </div>
              <nav className="mt-7 space-y-2">
                {dictionary.dashboard.sidebar.map((item, index) => (
                  <div
                    key={item}
                    className={`rounded-lg px-3 py-2.5 text-sm font-semibold ${
                      index === 0
                        ? "border border-cyan-200/18 bg-cyan-300/10 text-cyan-50"
                        : "text-slate-500"
                    }`}
                  >
                    {item}
                  </div>
                ))}
              </nav>
              <div className="mt-8 rounded-lg border border-emerald-300/14 bg-emerald-300/8 p-4">
                <ShieldCheck className="h-5 w-5 text-emerald-100" />
                <p className="mt-3 text-sm font-semibold text-white">Secure operations</p>
                <p className="mt-2 text-xs leading-5 text-slate-500">
                  Roles, logs, keys and workspace controls.
                </p>
              </div>
            </aside>

            <div className="min-w-0">
              <header className="rounded-lg border border-white/10 bg-slate-950/62 p-4">
                <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
                  <div>
                    <Badge variant="success" className="gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" />
                      {location.live}
                    </Badge>
                    <h3 className="mt-3 text-2xl font-semibold text-white">
                      Hyper Galaxy Command Nexus
                    </h3>
                    <p className="mt-1 text-sm text-slate-400">{location.workspace}</p>
                  </div>
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
              </header>

              <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                {operationalMetrics.map((metric, index) => (
                  <div
                    key={metric.label}
                    className="rounded-lg border border-white/10 bg-slate-950/62 p-4"
                  >
                    <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">
                      {metric.label}
                    </p>
                    <p className="mt-5 text-3xl font-semibold text-white">{metric.value}</p>
                    <p
                      className={`mt-2 text-xs font-semibold ${
                        index === 1 ? "text-cyan-100" : "text-emerald-200"
                      }`}
                    >
                      {metric.trend}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-4 grid gap-4 xl:grid-cols-[1.05fr_0.95fr]">
                <div className="rounded-lg border border-white/10 bg-slate-950/62 p-5">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-sm font-semibold text-white">
                        {location.projectsTitle}
                      </p>
                      <p className="mt-1 text-sm text-slate-500">{location.projectsText}</p>
                    </div>
                    <Boxes className="h-5 w-5 text-cyan-100" />
                  </div>
                  <div className="mt-5 space-y-3">
                    {activeProjects.map((project) => (
                      <div
                        key={project.name}
                        className="rounded-lg border border-white/10 bg-white/[0.035] p-4"
                      >
                        <div className="flex items-center justify-between gap-4">
                          <div>
                            <p className="text-sm font-semibold text-white">{project.name}</p>
                            <p className="mt-1 text-xs text-slate-500">
                              {project.owner} - {project.status}
                            </p>
                          </div>
                          <span className="text-sm font-semibold text-cyan-100">
                            {project.budget}
                          </span>
                        </div>
                        <div className="mt-3 h-1.5 rounded-full bg-white/8">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-cyan-300 to-violet-300"
                            style={{ width: `${project.progress}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid gap-4">
                  <div className="rounded-lg border border-white/10 bg-slate-950/62 p-5">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-semibold text-white">{location.usageTitle}</p>
                      <Zap className="h-5 w-5 text-violet-100" />
                    </div>
                    <div className="mt-5 flex h-40 items-end gap-2 rounded-lg border border-white/8 bg-white/[0.025] p-4">
                      {aiUsageByDay.map((value, index) => (
                        <span
                          key={`${value}-${index}`}
                          className="w-full rounded-t-sm bg-gradient-to-t from-cyan-300/55 to-violet-200"
                          style={{ height: `${value}%` }}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="rounded-lg border border-white/10 bg-slate-950/62 p-5">
                    <p className="text-sm font-semibold text-white">{location.ticketTitle}</p>
                    <div className="mt-4 space-y-3">
                      {ticketQueue.slice(0, 2).map((ticket) => (
                        <div
                          key={ticket.id}
                          className="flex items-center justify-between gap-4 rounded-lg border border-white/10 bg-white/[0.035] p-3"
                        >
                          <div>
                            <p className="line-clamp-1 text-sm font-semibold text-white">
                              {ticket.title}
                            </p>
                            <p className="mt-1 text-xs text-slate-500">
                              {ticket.id} - {ticket.customer}
                            </p>
                          </div>
                          <Badge variant={ticket.priority === "P1" ? "default" : "muted"}>
                            {ticket.priority}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function GalacticInfrastructureLocation({ dictionary }: ExplorationJourneyProps) {
  const location = dictionary.journey.infrastructure;

  return (
    <section
      id="infrastructure"
      className="section-shell border-y border-white/8 lg:min-h-[260vh]"
      data-pinned-cards-section
      data-location-stage
    >
      <span id="tickets" className="absolute -top-24" />
      <div className="section-inner grid gap-10 lg:grid-cols-[0.76fr_1.24fr]">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <LocationIntro
            location={location.location}
            eyebrow={location.eyebrow}
            title={location.title}
            subtitle={location.subtitle}
          />
        </div>

        <div className="grid gap-4">
          {location.systems.map((system, index) => {
            const Icon = infrastructureIcons[index % infrastructureIcons.length];

            return (
              <div
                key={system.title}
                className="glass-panel relative overflow-hidden rounded-lg p-5 sm:p-6"
                data-pinned-card
              >
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-100/60 to-transparent" />
                <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex min-w-0 items-start gap-4">
                    <div className="grid h-12 w-12 shrink-0 place-items-center rounded-lg border border-cyan-100/14 bg-cyan-100/8 text-cyan-100">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xl font-semibold text-white">{system.title}</p>
                      <p className="mt-2 max-w-2xl text-sm leading-7 text-slate-400">
                        {system.description}
                      </p>
                    </div>
                  </div>
                  <div className="min-w-36 rounded-lg border border-white/10 bg-white/[0.035] px-4 py-3 text-right">
                    <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">
                      {location.statusLabel}
                    </p>
                    <p className="mt-1 text-sm font-semibold text-emerald-200">
                      {system.status}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function HyperCoreLocation({ dictionary }: ExplorationJourneyProps) {
  const location = dictionary.journey.ecosystem;

  return (
    <section
      id="ecosystem"
      className="section-shell min-h-screen"
      data-location-stage
    >
      <span id="impact" className="absolute -top-24" />
      <div className="section-inner">
        <LocationIntro
          align="center"
          location={location.location}
          eyebrow={location.eyebrow}
          title={location.title}
          subtitle={location.subtitle}
        />

        <div className="relative mt-14 min-h-[620px]" data-reveal>
          <div className="absolute inset-0 rounded-full bg-cyan-300/7 blur-3xl" />
          <div className="glass-panel relative mx-auto grid min-h-[620px] max-w-5xl place-items-center overflow-hidden rounded-lg p-6">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_48%,rgba(34,211,238,0.13),transparent_20rem),linear-gradient(rgba(103,232,249,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(103,232,249,0.02)_1px,transparent_1px)] bg-[size:auto,88px_88px,88px_88px]" />
            <div className="relative grid aspect-square w-full max-w-[470px] place-items-center">
              <div className="absolute inset-0 rounded-full border border-cyan-100/10" />
              <div className="absolute inset-14 rounded-full border border-violet-100/12" />
              <div className="absolute inset-28 rounded-full border border-cyan-100/16" />
              <div className="relative grid h-36 w-36 place-items-center rounded-full border border-white/12 bg-slate-950/76 shadow-[0_0_70px_rgba(124,58,237,0.22)]">
                <Image
                  src={brandAssets.appIcon}
                  alt=""
                  width={104}
                  height={104}
                  className="h-24 w-24 rounded-full object-cover"
                />
              </div>

              {location.nodes.map((node, index) => {
                const Icon = ecosystemIcons[index % ecosystemIcons.length];
                const angle = (index / location.nodes.length) * Math.PI * 2 - Math.PI / 2;
                const radius = 214;

                return (
                  <div
                    key={node}
                    className="absolute flex items-center gap-2 rounded-full border border-white/10 bg-slate-950/78 px-3 py-2 text-xs font-semibold text-slate-200"
                    style={{
                      left: `calc(50% + ${Math.cos(angle) * radius}px)`,
                      top: `calc(50% + ${Math.sin(angle) * radius}px)`,
                      transform: "translate(-50%, -50%)"
                    }}
                  >
                    <Icon className="h-3.5 w-3.5 text-cyan-100" />
                    {node}
                  </div>
                );
              })}
            </div>

            <div className="absolute bottom-6 left-6 right-6 flex flex-wrap justify-center gap-2">
              {techLogos.map((logo) => (
                <span
                  key={logo}
                  className="rounded-full border border-white/10 bg-white/[0.035] px-3 py-1.5 text-[0.68rem] font-semibold text-slate-300"
                >
                  {logo}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FinalPortalLocation({ dictionary }: ExplorationJourneyProps) {
  const location = dictionary.journey.invite;

  return (
    <section
      id="join"
      className="section-shell flex min-h-screen items-center border-t border-white/8"
      data-location-stage
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,rgba(124,58,237,0.16),transparent_32rem),radial-gradient(circle_at_58%_62%,rgba(34,211,238,0.09),transparent_30rem)]" />
      <div className="section-inner text-center">
        <div className="mx-auto max-w-4xl" data-reveal>
          <div className="mb-5 flex items-center justify-center gap-3">
            <span className="h-px w-14 bg-gradient-to-l from-cyan-100/45 to-transparent" />
            <span className="rounded-full border border-cyan-100/14 bg-cyan-100/7 px-3 py-1 text-[0.68rem] font-bold uppercase tracking-[0.18em] text-cyan-100">
              {location.location}
            </span>
            <span className="h-px w-14 bg-gradient-to-r from-cyan-100/45 to-transparent" />
          </div>
          <Badge variant="default" className="mb-7 gap-2 px-3 py-1.5">
            <Sparkles className="h-3.5 w-3.5" />
            {location.eyebrow}
          </Badge>
          <h2 className="text-balance text-5xl font-semibold leading-tight text-white sm:text-7xl">
            {location.title}
          </h2>
          <p className="mx-auto mt-7 max-w-2xl text-lg leading-8 text-slate-300">
            {location.subtitle}
          </p>
          <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
            <MagneticButton href="/login" className="group w-full sm:w-auto">
              {dictionary.hero.primary}
              <ArrowRight className="h-4 w-4" />
            </MagneticButton>
            <MagneticButton
              href="#platform"
              variant="galaxy"
              className="group w-full sm:w-auto"
            >
              {dictionary.hero.secondary}
              <Network className="h-4 w-4" />
            </MagneticButton>
          </div>
        </div>
      </div>
    </section>
  );
}
