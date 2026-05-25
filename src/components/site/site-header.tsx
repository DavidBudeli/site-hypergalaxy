"use client";

import { Languages, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  localeLabels,
  type Dictionary,
  type Locale
} from "@/lib/i18n";
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
      <div className="mx-auto flex h-14 w-full max-w-7xl min-w-0 items-center justify-between overflow-hidden rounded-full border border-white/8 bg-[#020510]/72 px-3 shadow-[0_8px_32px_rgba(0,0,0,0.36)] backdrop-blur-2xl sm:px-4">
        <a
          href="#top"
          className="group flex min-w-0 shrink-0 items-center gap-2.5 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
          aria-label="Hyper Galaxy"
        >
          <span className="relative grid h-8 w-8 place-items-center rounded-full border border-violet-400/16 bg-violet-500/8">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <circle cx="8" cy="8" r="2.5" fill="#A78BFA" />
              <circle cx="8" cy="8" r="5.5" stroke="#8B5CF6" strokeWidth="0.75" strokeOpacity="0.4" fill="none" />
              <circle cx="8" cy="8" r="7.5" stroke="#7C3AED" strokeWidth="0.5" strokeOpacity="0.2" fill="none" />
            </svg>
          </span>
          <span className="hidden text-sm font-semibold tracking-tight text-white sm:block">
            Hyper Galaxy
          </span>
        </a>

        <nav
          className="hidden items-center gap-0.5 lg:flex"
          aria-label="Main navigation"
        >
          {navItems.map((item) => (
            <a
              key={item.key}
              href={item.href}
              className="rounded-full px-3.5 py-2 text-xs font-medium text-slate-400 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
            >
              {dictionary.nav[item.key]}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-1.5">
          <div
            className="flex shrink-0 items-center gap-1 rounded-full border border-white/8 bg-white/[0.03] p-1"
            aria-label="Language selector"
          >
            <Languages className="ml-1.5 hidden h-3 w-3 text-slate-500 sm:block" />
            {(["pt", "en"] as Locale[]).map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => onLocaleChange(item)}
                className={cn(
                  "rounded-full px-2.5 py-1.5 text-[0.68rem] font-semibold text-slate-500 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 sm:px-3",
                  locale === item &&
                    "bg-white text-slate-950 shadow-[0_1px_4px_rgba(0,0,0,0.3)]"
                )}
                aria-pressed={locale === item}
              >
                <span className="hidden sm:inline">{localeLabels[item]}</span>
                <span className="sm:hidden">{item.toUpperCase()}</span>
              </button>
            ))}
          </div>
          <Button asChild size="sm" variant="ghost" className="hidden md:inline-flex text-slate-400">
            <a href="/login">
              <LogIn className="mr-1.5 h-3.5 w-3.5" />
              {dictionary.nav.login}
            </a>
          </Button>
          <Button
            asChild
            size="icon"
            variant="outline"
            className="h-8 w-8 md:hidden"
          >
            <a href="/login" aria-label={dictionary.nav.login}>
              <LogIn className="h-3.5 w-3.5" />
            </a>
          </Button>
          <Button asChild size="sm" className="hidden sm:inline-flex h-8 text-xs">
            <a href="#cta">{dictionary.nav.start}</a>
          </Button>
        </div>
      </div>
    </header>
  );
}
