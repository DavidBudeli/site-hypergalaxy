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
        <div className="relative overflow-hidden rounded-xl border border-white/8" data-reveal>
          <div className="relative min-h-[420px] overflow-hidden rounded-xl bg-[#040814] px-6 py-16 text-center sm:px-12">
            <div className="absolute inset-0 bg-galaxy-radial opacity-80" />
            <div className="absolute inset-0 bg-holo-grid bg-[size:64px_64px] opacity-[0.04]" />
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-400/20 to-transparent" />
            <div className="absolute left-1/2 top-0 h-64 w-[60%] -translate-x-1/2 rounded-full bg-violet-700/8 blur-3xl" />
            <div className="absolute bottom-0 right-0 h-56 w-56 rounded-full bg-indigo-700/8 blur-3xl" />
            <div className="relative z-10 mx-auto max-w-3xl">
              <Badge className="gap-2">
                <Sparkles className="h-3 w-3" />
                {dictionary.cta.eyebrow}
              </Badge>
              <h2 className="mt-6 text-balance text-4xl font-semibold tracking-tight text-white sm:text-6xl">
                {dictionary.cta.title}
              </h2>
              <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-slate-400 sm:text-lg">
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
