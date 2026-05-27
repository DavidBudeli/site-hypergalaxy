import { ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/site/section-heading";
import { iconMap, type Dictionary, type IconKey } from "@/lib/i18n";

type TicketsSectionProps = {
  dictionary: Dictionary;
};

export function TicketsSection({ dictionary }: TicketsSectionProps) {
  return (
    <section
      id="tickets"
      className="section-shell border-y border-white/8 bg-slate-950/40 lg:min-h-screen"
      data-pinned-cards-section
    >
      <div className="section-inner">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <SectionHeading
            eyebrow={dictionary.tickets.eyebrow}
            title={dictionary.tickets.title}
            subtitle={dictionary.tickets.subtitle}
            align="left"
          />

          <div className="relative" data-reveal>
            <div className="absolute left-7 top-8 hidden h-[calc(100%-4rem)] w-px bg-gradient-to-b from-cyan-200 via-violet-300 to-transparent sm:block" />
            <div className="space-y-4">
              {dictionary.tickets.items.map((item, index) => {
                const Icon = iconMap[item.icon as IconKey];
                return (
                  <div
                    key={item.title}
                    data-pinned-card
                    className="relative rounded-lg border border-white/10 bg-white/[0.04] p-5 backdrop-blur-md transition-colors duration-300 hover:border-cyan-200/24"
                  >
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
                      <div className="z-10 grid h-14 w-14 shrink-0 place-items-center rounded-lg border border-cyan-200/20 bg-slate-950 text-cyan-100 shadow-cyan-glow">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-3">
                          <span className="font-mono text-xs text-slate-500">
                            0{index + 1}
                          </span>
                          <ArrowRight className="h-4 w-4 text-cyan-200" />
                        </div>
                        <h3 className="mt-2 text-xl font-semibold text-white">
                          {item.title}
                        </h3>
                        <p className="mt-2 leading-7 text-slate-400">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
