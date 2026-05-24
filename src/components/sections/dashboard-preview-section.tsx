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
      <div className="absolute right-[6%] top-20 h-80 w-80 rounded-full bg-blue-500/10 blur-3xl" />
      <div className="section-inner">
        <SectionHeading
          eyebrow={dictionary.dashboard.eyebrow}
          title={dictionary.dashboard.title}
          subtitle={dictionary.dashboard.subtitle}
        />

        <div
          className="glass-panel holo-border relative mt-12 overflow-hidden rounded-lg p-3 sm:p-5"
          data-reveal
        >
          <div className="absolute inset-0 bg-holo-grid bg-[size:40px_40px] opacity-[0.08]" />
          <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-cyan-300/10 to-transparent" />

          <div className="relative grid min-h-[620px] gap-4 lg:grid-cols-[220px_1fr]">
            <aside className="hidden rounded-lg border border-white/10 bg-slate-950/58 p-4 lg:block">
              <div className="mb-7 flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-lg border border-cyan-200/20 bg-cyan-300/10">
                  <RadioTower className="h-5 w-5 text-cyan-100" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">HG Console</p>
                  <p className="text-xs text-slate-500">Enterprise Cloud</p>
                </div>
              </div>
              <nav className="space-y-2">
                {dictionary.dashboard.sidebar.map((item, index) => (
                  <div
                    key={item}
                    className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold ${
                      index === 0
                        ? "border border-cyan-200/20 bg-cyan-300/10 text-cyan-50"
                        : "text-slate-400"
                    }`}
                  >
                    <CircleDot className="h-3.5 w-3.5" />
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
                      className="rounded-lg border border-white/10 bg-slate-950/58 p-4"
                    >
                      <div className="flex items-center justify-between">
                        <Icon className="h-5 w-5 text-cyan-100" />
                        <Badge variant="muted">{card.trend}</Badge>
                      </div>
                      <p className="mt-6 text-xs font-bold uppercase tracking-[0.14em] text-slate-500">
                        {card.label}
                      </p>
                      <p className="mt-2 text-3xl font-semibold text-white">{card.value}</p>
                    </div>
                  );
                })}
              </div>

              <div className="grid gap-4 xl:grid-cols-[1.25fr_0.75fr]">
                <div className="rounded-lg border border-white/10 bg-slate-950/58 p-5">
                  <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.16em] text-cyan-100">
                        {dictionary.dashboard.projectTitle}
                      </p>
                      <h3 className="mt-3 text-2xl font-semibold text-white">
                        {dictionary.dashboard.projectStatus}
                      </h3>
                    </div>
                    <Badge variant="success" className="w-fit">Live telemetry</Badge>
                  </div>

                  <div className="mt-8 grid gap-4 md:grid-cols-[0.7fr_1fr]">
                    <div className="rounded-lg border border-white/10 bg-white/[0.035] p-4">
                      <div className="flex items-center gap-3">
                        <Gauge className="h-5 w-5 text-emerald-200" />
                        <span className="text-sm font-semibold text-white">
                          {dictionary.dashboard.activeAgents}
                        </span>
                      </div>
                      <div className="mt-6 grid grid-cols-3 gap-2">
                        {[92, 78, 64, 88, 52, 70].map((value) => (
                          <div
                            key={value}
                            className="flex h-24 items-end rounded-md border border-white/8 bg-white/[0.035] px-2 pb-2"
                          >
                            <span
                              className="w-full rounded-t-sm bg-gradient-to-t from-cyan-300 to-violet-300"
                              style={{ height: `${value}%` }}
                            />
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="rounded-lg border border-white/10 bg-white/[0.035] p-4">
                      <div className="mb-5 flex items-center justify-between">
                        <span className="text-sm font-semibold text-white">
                          {dictionary.dashboard.automations[0]}
                        </span>
                        <span className="text-xs font-semibold text-cyan-100">99.2%</span>
                      </div>
                      <div className="space-y-3">
                        {dictionary.dashboard.automations.map((automation, index) => (
                          <div
                            key={automation}
                            className="flex items-center justify-between rounded-md border border-white/8 bg-slate-950/42 px-3 py-3"
                          >
                            <span className="flex items-center gap-2 text-sm text-slate-300">
                              <CheckCircle2 className="h-4 w-4 text-emerald-200" />
                              {automation}
                            </span>
                            <span className="text-xs font-semibold text-slate-500">
                              0{index + 1}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border border-white/10 bg-slate-950/58 p-5">
                  <p className="text-sm font-semibold text-white">
                    {dictionary.dashboard.analytics}
                  </p>
                  <div className="mt-6 space-y-5">
                    {["Support", "SDR", "Finance", "DevOps"].map((label, index) => (
                      <div key={label}>
                        <div className="mb-2 flex items-center justify-between text-xs font-semibold text-slate-400">
                          <span>{label}</span>
                          <span>{[94, 88, 76, 91][index]}%</span>
                        </div>
                        <div className="h-2 rounded-full bg-white/8">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-cyan-300 to-violet-400"
                            style={{ width: `${[94, 88, 76, 91][index]}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-8 rounded-lg border border-amber-200/16 bg-amber-300/8 p-4">
                    <p className="text-xs font-bold uppercase tracking-[0.16em] text-amber-100">
                      {dictionary.dashboard.nextInvoice}
                    </p>
                    <p className="mt-3 text-3xl font-semibold text-white">
                      {dictionary.dashboard.cards[2].value}
                    </p>
                  </div>
                  <div className="mt-4 rounded-lg border border-cyan-200/14 bg-cyan-300/8 p-4">
                    <p className="text-xs font-bold uppercase tracking-[0.16em] text-cyan-100">
                      {dictionary.dashboard.tickets}
                    </p>
                    <p className="mt-3 text-3xl font-semibold text-white">
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
