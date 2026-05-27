"use client";

import Image from "next/image";
import { Languages, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  localeLabels,
  type Dictionary,
  type Locale
} from "@/lib/i18n";
import { brandAssets } from "@/lib/brand-assets";
import { cn } from "@/lib/utils";

type SiteHeaderProps = {
  dictionary: Dictionary;
  locale: Locale;
  onLocaleChange: (locale: Locale) => void;
};

const navItems = [
  { key: "platform", href: "#platform" },
  { key: "agents", href: "#agents" },
  { key: "dashboard", href: "#dashboard" },
  { key: "tickets", href: "#tickets" },
  { key: "impact", href: "#impact" }
] as const;

export function SiteHeader({
  dictionary,
  locale,
  onLocaleChange
}: SiteHeaderProps) {
  return (
    <header className="fixed left-0 right-0 top-0 z-50 px-3 pt-3 sm:px-5">
      <div className="mx-auto flex h-16 w-full max-w-7xl min-w-0 items-center justify-between overflow-hidden rounded-full border border-white/10 bg-slate-950/56 px-3 shadow-[0_16px_60px_rgba(0,0,0,0.28)] backdrop-blur-2xl sm:px-4">
        <a
          href="#top"
          className="group flex min-w-0 shrink-0 items-center gap-3 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
          aria-label="Hyper Galaxy"
        >
          <Image
            src={brandAssets.appIcon}
            alt=""
            width={40}
            height={40}
            className="h-10 w-10 rounded-full object-cover shadow-cyan-glow sm:hidden"
            priority
          />
          <Image
            src={brandAssets.logoCompact}
            alt="Hyper Galaxy"
            width={154}
            height={49}
            className="hidden h-11 w-auto object-contain transition-transform duration-300 group-hover:scale-[1.02] sm:block"
            priority
          />
        </a>

        <nav
          className="hidden items-center gap-1 rounded-full border border-white/8 bg-white/[0.03] p-1 lg:flex"
          aria-label="Main navigation"
        >
          {navItems.map((item) => (
            <a
              key={item.key}
              href={item.href}
              className="rounded-full px-3.5 py-2 text-xs font-semibold text-slate-300 transition-colors hover:bg-white/8 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
            >
              {dictionary.nav[item.key]}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <div
            className="flex shrink-0 items-center gap-1 rounded-full border border-white/10 bg-white/[0.04] p-1"
            aria-label="Language selector"
          >
            <Languages className="ml-2 hidden h-3.5 w-3.5 text-cyan-200 sm:block" />
            {(["pt", "en"] as Locale[]).map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => onLocaleChange(item)}
                className={cn(
                  "rounded-full px-2.5 py-1.5 text-[0.68rem] font-bold text-slate-400 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 sm:px-3",
                  locale === item &&
                    "bg-white text-slate-950 shadow-[0_0_22px_rgba(34,211,238,0.24)]"
                )}
                aria-pressed={locale === item}
              >
                <span className="hidden sm:inline">{localeLabels[item]}</span>
                <span className="sm:hidden">{item.toUpperCase()}</span>
              </button>
            ))}
          </div>
          <Button asChild size="sm" variant="ghost" className="hidden md:inline-flex">
            <a href="/login">
              <LogIn className="mr-2 h-4 w-4" />
              {dictionary.nav.login}
            </a>
          </Button>
          <Button
            asChild
            size="icon"
            variant="outline"
            className="h-9 w-9 md:hidden"
          >
            <a href="/login" aria-label={dictionary.nav.login}>
              <LogIn className="h-4 w-4" />
            </a>
          </Button>
          <Button asChild size="sm" className="hidden sm:inline-flex">
            <a href="/login">{dictionary.nav.start}</a>
          </Button>
        </div>
      </div>
    </header>
  );
}
