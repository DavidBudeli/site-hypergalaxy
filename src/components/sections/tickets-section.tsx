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
      className="section-shell border-y border-white/6 bg-[#020510]/50"
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
            <div className="absolute left-7 top-8 hidden h-[calc(100%-4rem)] w-px bg-gradient-to-b from-violet-500/40 via-violet-400/16 to-transparent sm:block" />
            <div className="space-y-3">
              {dictionary.tickets.items.map((item, index) => {
                const Icon = iconMap[item.icon as IconKey];
                return (
                  <div
                    key={item.title}
                    className="relative rounded-xl border border-white/6 bg-white/[0.025] p-5 backdrop-blur-xl transition-colors duration-300 hover:border-violet-400/16"
                  >
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
                      <div className="z-10 grid h-14 w-14 shrink-0 place-items-center rounded-lg border border-violet-400/14 bg-[#040814] text-violet-200">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-3">
                          <span className="font-mono text-xs text-slate-600">
                            0{index + 1}
                          </span>
                          <ArrowRight className="h-3.5 w-3.5 text-slate-600" />
                        </div>
                        <h3 className="mt-2 text-xl font-semibold tracking-tight text-white">
                          {item.title}
                        </h3>
                        <p className="mt-2 leading-7 text-slate-400 text-sm">
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
