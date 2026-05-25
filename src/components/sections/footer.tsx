import { Code2, Globe2, Mail, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Dictionary } from "@/lib/i18n";

type FooterProps = {
  dictionary: Dictionary;
};

export function Footer({ dictionary }: FooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/6 bg-[#020510] px-4 py-12 sm:px-6">
      <div className="mx-auto grid w-full max-w-7xl gap-10 md:grid-cols-[1.2fr_0.8fr_0.8fr_0.8fr]">
        <div>
          <a href="#top" className="flex items-center gap-2.5">
            <span className="grid h-9 w-9 place-items-center rounded-full border border-violet-400/14 bg-violet-500/8">
              <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <circle cx="8" cy="8" r="2.5" fill="#A78BFA" />
                <circle cx="8" cy="8" r="5.5" stroke="#8B5CF6" strokeWidth="0.75" strokeOpacity="0.4" fill="none" />
                <circle cx="8" cy="8" r="7.5" stroke="#7C3AED" strokeWidth="0.5" strokeOpacity="0.2" fill="none" />
              </svg>
            </span>
            <span className="text-base font-semibold tracking-tight text-white">Hyper Galaxy</span>
          </a>
          <p className="mt-5 max-w-sm leading-7 text-slate-500 text-sm">
            {dictionary.footer.description}
          </p>
        </div>

        <div>
          <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
            {dictionary.footer.quickLinks}
          </h3>
          <div className="mt-5 grid gap-3 text-sm text-slate-500">
            <a href="#platform" className="transition-colors hover:text-slate-200">
              {dictionary.nav.platform}
            </a>
            <a href="#agents" className="transition-colors hover:text-slate-200">
              {dictionary.nav.agents}
            </a>
            <a href="#dashboard" className="transition-colors hover:text-slate-200">
              {dictionary.nav.dashboard}
            </a>
            <a href="#tickets" className="transition-colors hover:text-slate-200">
              {dictionary.nav.tickets}
            </a>
          </div>
        </div>

        <div>
          <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
            {dictionary.footer.social}
          </h3>
          <div className="mt-5 flex gap-2">
            {[Code2, Globe2, Send].map((Icon, index) => (
              <Button
                key={index}
                variant="outline"
                size="icon"
                className="h-8 w-8"
                aria-label={`Social ${index + 1}`}
              >
                <Icon className="h-3.5 w-3.5" />
              </Button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
            {dictionary.footer.contact}
          </h3>
          <a
            href="mailto:hello@hypergalaxy.ai"
            className="mt-5 inline-flex items-center gap-2 text-sm text-slate-400 transition-colors hover:text-white"
          >
            <Mail className="h-3.5 w-3.5" />
            hello@hypergalaxy.ai
          </a>
        </div>
      </div>
      <div className="mx-auto mt-10 flex w-full max-w-7xl flex-col gap-3 border-t border-white/6 pt-6 text-xs text-slate-600 sm:flex-row sm:items-center sm:justify-between">
        <span>© {year} Hyper Galaxy. {dictionary.footer.rights}</span>
        <span>AI Systems · Automation · SaaS Infrastructure</span>
      </div>
    </footer>
  );
}
