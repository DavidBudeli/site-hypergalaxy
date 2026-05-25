import { CheckCircle2, CircleDot, Gauge, RadioTower } from "lucide-react";
import { SectionHeading } from "@/components/site/section-heading";
import { Badge } from "@/components/ui/badge";
import { iconMap, type Dictionary, type IconKey } from "@/lib/i18n";

type DashboardPreviewSectionProps = {
  dictionary: Dictionary;
};

export function DashboardPreviewSection({ dictionary }: DashboardPreviewSectionProps) {
  return (
    <section id="dashboard" className="section-shell">
      <div className="absolute right-[6%] top-20 h-80 w-80 rounded-full bg-indigo-700/5 blur-3xl" />
      <div className="section-inner">
        <SectionHeading
          eyebrow={dictionary.dashboard.eyebrow}
          title={dictionary.dashboard.title}
          subtitle={dictionary.dashboard.subtitle}
        />

        <div
          className="relative mt-12 overflow-hidden rounded-xl border border-white/8 bg-[#040814]/70 p-3 shadow-[0_32px_96px_rgba(0,0,0,0.44)] backdrop-blur-2xl sm:p-5"
          data-reveal
        >
          <div className="absolute inset-0 bg-holo-grid bg-[size:56px_56px] opacity-[0.03]" />
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-400/16 to-transparent" />

          <div className="relative grid min-h-[620px] gap-4 lg:grid-cols-[220px_1fr]">
            <aside className="hidden rounded-lg border border-white/6 bg-[#020510]/60 p-4 lg:block">
              <div className="mb-7 flex items-center gap-3">
                <div className="grid h-9 w-9 place-items-center rounded-lg border border-violet-400/14 bg-violet-500/8">
                  <RadioTower className="h-4 w-4 text-violet-200" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">HG Console</p>
                  <p className="text-xs text-slate-600">Enterprise Cloud</p>
                </div>
              </div>
              <nav className="space-y-1">
                {dictionary.dashboard.sidebar.map((item, index) => (
                  <div
                    key={item}
                    className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium ${
                      index === 0
                        ? "border border-violet-400/14 bg-violet-500/8 text-white"
                        : "text-slate-500 hover:text-slate-300"
                    }`}
                  >
                    <CircleDot className="h-3 w-3" />
                    {item}
                  </div>
                ))}
              </nav>
            </aside>

            <div className="grid gap-4">
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                {dictionary.dashboard.cards.map((card) => {
                  const Icon = iconMap[card.icon as IconKey];
                  return (
                    <div
                      key={card.label}
                      className="rounded-lg border border-white/6 bg-[#020510]/50 p-4"
                    >
                      <div className="flex items-center justify-between">
                        <Icon className="h-4 w-4 text-violet-300/60" />
                        <Badge variant="muted" className="text-[0.65rem]">{card.trend}</Badge>
                      </div>
                      <p className="mt-5 text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-slate-600">
                        {card.label}
                      </p>
                      <p className="mt-1.5 text-2xl font-semibold tracking-tight text-white">{card.value}</p>
                    </div>
                  );
                })}
              </div>

              <div className="grid gap-4 xl:grid-cols-[1.25fr_0.75fr]">
                <div className="rounded-lg border border-white/6 bg-[#020510]/50 p-5">
                  <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
                    <div>
                      <p className="text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-violet-300/70">
                        {dictionary.dashboard.projectTitle}
                      </p>
                      <h3 className="mt-2.5 text-xl font-semibold tracking-tight text-white">
                        {dictionary.dashboard.projectStatus}
                      </h3>
                    </div>
                    <Badge variant="success" className="w-fit">Live telemetry</Badge>
                  </div>

                  <div className="mt-7 grid gap-4 md:grid-cols-[0.7fr_1fr]">
                    <div className="rounded-lg border border-white/6 bg-white/[0.02] p-4">
                      <div className="flex items-center gap-2.5">
                        <Gauge className="h-4 w-4 text-emerald-300/60" />
                        <span className="text-sm font-medium text-white">
                          {dictionary.dashboard.activeAgents}
                        </span>
                      </div>
                      <div className="mt-5 grid grid-cols-3 gap-2">
                        {[92, 78, 64, 88, 52, 70].map((value) => (
                          <div
                            key={value}
                            className="flex h-20 items-end rounded-md border border-white/6 bg-white/[0.02] px-1.5 pb-1.5"
                          >
                            <span
                              className="w-full rounded-t-sm bg-gradient-to-t from-violet-600/80 to-indigo-500/70"
                              style={{ height: `${value}%` }}
                            />
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="rounded-lg border border-white/6 bg-white/[0.02] p-4">
                      <div className="mb-4 flex items-center justify-between">
                        <span className="text-sm font-medium text-white">
                          {dictionary.dashboard.automations[0]}
                        </span>
                        <span className="text-xs font-semibold text-violet-300/80">99.2%</span>
                      </div>
                      <div className="space-y-2.5">
                        {dictionary.dashboard.automations.map((automation, index) => (
                          <div
                            key={automation}
                            className="flex items-center justify-between rounded-md border border-white/6 bg-[#020510]/40 px-3 py-2.5"
                          >
                            <span className="flex items-center gap-2 text-sm text-slate-400">
                              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400/60" />
                              {automation}
                            </span>
                            <span className="text-xs font-semibold text-slate-600">
                              0{index + 1}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border border-white/6 bg-[#020510]/50 p-5">
                  <p className="text-sm font-medium text-white">
                    {dictionary.dashboard.analytics}
                  </p>
                  <div className="mt-5 space-y-4">
                    {["Support", "SDR", "Finance", "DevOps"].map((label, index) => (
                      <div key={label}>
                        <div className="mb-1.5 flex items-center justify-between text-xs font-medium text-slate-500">
                          <span>{label}</span>
                          <span className="text-slate-400">{[94, 88, 76, 91][index]}%</span>
                        </div>
                        <div className="h-1.5 rounded-full bg-white/5">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-violet-500 to-indigo-500"
                            style={{ width: `${[94, 88, 76, 91][index]}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-7 rounded-lg border border-amber-400/12 bg-amber-500/5 p-4">
                    <p className="text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-amber-300/70">
                      {dictionary.dashboard.nextInvoice}
                    </p>
                    <p className="mt-2.5 text-2xl font-semibold tracking-tight text-white">
                      {dictionary.dashboard.cards[2].value}
                    </p>
                  </div>
                  <div className="mt-3 rounded-lg border border-violet-400/12 bg-violet-500/5 p-4">
                    <p className="text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-violet-300/70">
                      {dictionary.dashboard.tickets}
                    </p>
                    <p className="mt-2.5 text-2xl font-semibold tracking-tight text-white">
                      {dictionary.dashboard.cards[1].value}
                    </p>
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
