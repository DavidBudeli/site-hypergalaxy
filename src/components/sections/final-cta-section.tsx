import { ArrowRight, Sparkles } from "lucide-react";
import { MagneticButton } from "@/components/site/magnetic-button";
import { Badge } from "@/components/ui/badge";
import type { Dictionary } from "@/lib/i18n";

type FinalCtaSectionProps = {
  dictionary: Dictionary;
};

export function FinalCtaSection({ dictionary }: FinalCtaSectionProps) {
  return (
    <section id="cta" className="section-shell pb-24">
      <div className="section-inner">
        <div className="holo-border relative overflow-hidden rounded-lg" data-reveal>
          <div className="relative min-h-[420px] overflow-hidden rounded-lg border border-white/10 bg-[#050816] px-6 py-16 text-center shadow-glow sm:px-12">
            <div className="absolute inset-0 bg-galaxy-radial opacity-90" />
            <div className="absolute inset-0 bg-holo-grid bg-[size:52px_52px] opacity-10" />
            <div className="absolute left-1/2 top-0 h-56 w-[70%] -translate-x-1/2 rounded-full bg-cyan-300/12 blur-3xl" />
            <div className="absolute bottom-0 right-0 h-60 w-60 rounded-full bg-violet-500/14 blur-3xl" />
            <div className="relative z-10 mx-auto max-w-3xl">
              <Badge className="gap-2">
                <Sparkles className="h-3.5 w-3.5" />
                {dictionary.cta.eyebrow}
              </Badge>
              <h2 className="mt-6 text-balance text-4xl font-semibold tracking-normal text-white sm:text-6xl">
                {dictionary.cta.title}
              </h2>
              <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
                {dictionary.cta.subtitle}
              </p>
              <div className="mt-8 flex justify-center">
                <MagneticButton href="#top" className="group">
                  {dictionary.cta.button}
                  <ArrowRight className="h-4 w-4" />
                </MagneticButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
