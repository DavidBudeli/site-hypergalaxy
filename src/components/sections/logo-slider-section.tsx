import { SectionHeading } from "@/components/site/section-heading";
import { techLogos, type Dictionary } from "@/lib/i18n";

type LogoSliderSectionProps = {
  dictionary: Dictionary;
};

export function LogoSliderSection({ dictionary }: LogoSliderSectionProps) {
  const rows = [...techLogos, ...techLogos];

  return (
    <section id="platform" className="section-shell border-y border-white/6 bg-[#020510]/60">
      <div className="section-inner">
        <SectionHeading
          eyebrow={dictionary.logos.eyebrow}
          title={dictionary.logos.title}
          subtitle={dictionary.logos.subtitle}
        />

        <div
          className="relative mt-12 overflow-hidden rounded-xl border border-white/8 bg-white/[0.02] py-5 backdrop-blur-xl"
          data-reveal
        >
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-[#020510] to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-[#020510] to-transparent" />
          <div className="flex w-max animate-marquee items-center gap-4 hover:[animation-play-state:paused]">
            {rows.map((logo, index) => (
              <div
                key={`${logo}-${index}`}
                className="group flex h-20 min-w-44 items-center justify-center rounded-lg border border-white/6 bg-[#040814]/70 px-5 text-sm font-medium text-slate-500 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] transition-all duration-300 hover:-translate-y-0.5 hover:border-violet-400/20 hover:text-slate-200"
              >
                <span className="mr-3 grid h-7 w-7 place-items-center rounded-full border border-white/8 bg-white/[0.04] text-xs text-slate-500 transition-colors duration-300 group-hover:border-violet-400/16 group-hover:text-violet-300">
                  {logo.slice(0, 2)}
                </span>
                {logo}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
