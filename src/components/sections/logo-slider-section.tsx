import { SectionHeading } from "@/components/site/section-heading";
import { techLogos, type Dictionary } from "@/lib/i18n";

type LogoSliderSectionProps = {
  dictionary: Dictionary;
};

export function LogoSliderSection({ dictionary }: LogoSliderSectionProps) {
  const rows = [...techLogos, ...techLogos];

  return (
    <section id="platform" className="section-shell border-y border-white/8 bg-slate-950/34">
      <div className="section-inner">
        <SectionHeading
          eyebrow={dictionary.logos.eyebrow}
          title={dictionary.logos.title}
          subtitle={dictionary.logos.subtitle}
        />

        <div
          className="relative mt-12 overflow-hidden rounded-lg border border-white/10 bg-white/[0.035] py-5 shadow-glow backdrop-blur-xl"
          data-reveal
        >
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-[#030712] to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-[#030712] to-transparent" />
          <div className="flex w-max animate-marquee items-center gap-4 hover:[animation-play-state:paused]">
            {rows.map((logo, index) => (
              <div
                key={`${logo}-${index}`}
                className="group flex h-20 min-w-48 items-center justify-center rounded-lg border border-white/10 bg-slate-950/60 px-6 text-sm font-bold text-slate-300 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] transition-all duration-300 hover:-translate-y-1 hover:border-cyan-200/40 hover:text-white hover:shadow-cyan-glow"
              >
                <span className="mr-3 grid h-8 w-8 place-items-center rounded-full border border-cyan-200/20 bg-cyan-300/10 text-xs text-cyan-100 transition-transform duration-300 group-hover:rotate-6">
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
