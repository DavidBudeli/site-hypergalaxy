import Image from "next/image";
import { Code2, Globe2, Mail, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Dictionary } from "@/lib/i18n";
import { brandAssets } from "@/lib/brand-assets";

type FooterProps = {
  dictionary: Dictionary;
};

export function Footer({ dictionary }: FooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className="relative z-10 border-t border-white/10 bg-[#030712]/88 px-4 py-12 backdrop-blur-md sm:px-6">
      <div className="mx-auto grid w-full max-w-7xl gap-10 md:grid-cols-[1.2fr_0.8fr_0.8fr_0.8fr]">
        <div>
          <a href="#top" className="inline-flex items-center rounded-lg">
            <Image
              src={brandAssets.logoMain}
              alt="Hyper Galaxy AI Operating System"
              width={270}
              height={51}
              className="h-auto w-[270px] max-w-full object-contain"
            />
          </a>
          <p className="mt-5 max-w-sm leading-7 text-slate-400">
            {dictionary.footer.description}
          </p>
        </div>

        <div>
          <h3 className="text-sm font-bold uppercase tracking-[0.16em] text-slate-300">
            {dictionary.footer.quickLinks}
          </h3>
          <div className="mt-5 grid gap-3 text-sm text-slate-400">
            <a href="#platform" className="hover:text-white">
              {dictionary.nav.platform}
            </a>
            <a href="#agents" className="hover:text-white">
              {dictionary.nav.agents}
            </a>
            <a href="#dashboard" className="hover:text-white">
              {dictionary.nav.dashboard}
            </a>
            <a href="#tickets" className="hover:text-white">
              {dictionary.nav.tickets}
            </a>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-bold uppercase tracking-[0.16em] text-slate-300">
            {dictionary.footer.social}
          </h3>
          <div className="mt-5 flex gap-2">
            {[Code2, Globe2, Send].map((Icon, index) => (
              <Button
                key={index}
                variant="outline"
                size="icon"
                aria-label={`Social ${index + 1}`}
              >
                <Icon className="h-4 w-4" />
              </Button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-bold uppercase tracking-[0.16em] text-slate-300">
            {dictionary.footer.contact}
          </h3>
          <a
            href="mailto:hello@hypergalaxy.cloud"
            className="mt-5 inline-flex items-center gap-2 text-sm text-cyan-100 hover:text-white"
          >
            <Mail className="h-4 w-4" />
            hello@hypergalaxy.cloud
          </a>
        </div>
      </div>
      <div className="mx-auto mt-10 flex w-full max-w-7xl flex-col gap-3 border-t border-white/10 pt-6 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
        <span>&copy; {year} Hyper Galaxy. {dictionary.footer.rights}</span>
        <span>AI Systems - Automation - SaaS Infrastructure</span>
      </div>
    </footer>
  );
}
