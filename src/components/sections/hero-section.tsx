"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowDown,
  ArrowRight,
  Bot,
  CircuitBoard,
  Cpu,
  Sparkles,
  Zap
} from "lucide-react";
import { MagneticButton } from "@/components/site/magnetic-button";
import { Badge } from "@/components/ui/badge";
import { GalaxyScene } from "@/components/visuals/galaxy-scene";
import type { Dictionary } from "@/lib/i18n";

type HeroSectionProps = {
  dictionary: Dictionary;
};

function useTypingEffect(phrases: readonly string[]) {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [characterIndex, setCharacterIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const phrase = phrases[phraseIndex] ?? "";
    const atEnd = characterIndex === phrase.length;
    const atStart = characterIndex === 0;

    const timeout = window.setTimeout(
      () => {
        if (!deleting && atEnd) {
          setDeleting(true);
          return;
        }

        if (deleting && atStart) {
          setDeleting(false);
          setPhraseIndex((current) => (current + 1) % phrases.length);
          return;
        }

        setCharacterIndex((current) => current + (deleting ? -1 : 1));
      },
      atEnd && !deleting ? 1100 : deleting ? 32 : 58
    );

    return () => window.clearTimeout(timeout);
  }, [characterIndex, deleting, phraseIndex, phrases]);

  return phrases[phraseIndex]?.slice(0, characterIndex) ?? "";
}

export function HeroSection({ dictionary }: HeroSectionProps) {
  const typed = useTypingEffect(dictionary.hero.typingPhrases);

  return (
    <section
      id="top"
      className="relative flex min-h-screen items-center overflow-hidden px-4 pb-16 pt-28 sm:px-6 lg:px-8"
    >
      <GalaxyScene />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_52%_42%,rgba(34,211,238,0.10),transparent_28%),linear-gradient(180deg,rgba(3,7,18,0.08),#030712_94%)]" />
      <div
        className="absolute left-[8%] top-28 hidden h-56 w-56 rounded-full bg-cyan-300/10 blur-3xl lg:block"
        data-parallax="64"
      />
      <div
        className="absolute bottom-20 right-[10%] hidden h-72 w-72 rounded-full bg-violet-500/12 blur-3xl lg:block"
        data-parallax="-48"
      />

      <div className="relative z-10 mx-auto grid w-full max-w-7xl min-w-0 items-center gap-10 lg:grid-cols-2">
        <div className="min-w-0 max-w-3xl">
          <Badge variant="default" className="mb-6 gap-2 px-3 py-1.5">
            <Sparkles className="h-3.5 w-3.5" />
            {dictionary.hero.eyebrow}
          </Badge>

          <h1 className="max-w-full break-words text-balance text-[2.35rem] font-semibold leading-[1.08] tracking-normal text-white sm:text-6xl lg:text-7xl">
            {dictionary.hero.title}
          </h1>
          <p className="mt-6 max-w-full break-words text-base leading-8 text-slate-300 sm:max-w-2xl sm:text-xl">
            {dictionary.hero.subtitle}
          </p>

          <div className="mt-7 flex min-h-12 w-full max-w-full min-w-0 flex-wrap items-center gap-3 overflow-hidden rounded-full border border-cyan-200/14 bg-slate-950/50 px-4 py-3 shadow-cyan-glow backdrop-blur-xl sm:inline-flex sm:w-auto">
            <span className="flex shrink-0 items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-cyan-100">
              <Cpu className="h-4 w-4" />
              {dictionary.hero.typingPrefix}
            </span>
            <span className="h-4 w-px bg-white/14" />
            <span className="min-w-0 truncate font-mono text-sm text-white sm:text-base">
              {typed}
              <span className="ml-1 inline-block h-5 w-2 translate-y-1 bg-cyan-200 animate-pulse" />
            </span>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <MagneticButton href="#cta" className="group w-full sm:w-auto">
              {dictionary.hero.primary}
              <ArrowRight className="h-4 w-4" />
            </MagneticButton>
            <MagneticButton
              href="#agents"
              variant="galaxy"
              className="group w-full sm:w-auto"
            >
              {dictionary.hero.secondary}
              <ArrowDown className="h-4 w-4" />
            </MagneticButton>
          </div>

          <div className="mt-10 grid max-w-2xl grid-cols-1 gap-3 sm:grid-cols-3">
            {dictionary.hero.stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-lg border border-white/10 bg-white/[0.035] p-4 backdrop-blur-xl"
              >
                <div className="text-2xl font-semibold text-white">{stat.value}</div>
                <div className="mt-1 text-xs font-medium text-slate-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        <HeroCommandDeck dictionary={dictionary} />
      </div>
    </section>
  );
}

function HeroCommandDeck({ dictionary }: HeroSectionProps) {
  return (
    <motion.div
      className="relative hidden min-h-[620px] lg:block"
      initial={false}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="absolute inset-0 rounded-full bg-cyan-300/10 blur-3xl" />
      <div className="holo-border absolute left-10 top-12 w-[540px] rounded-lg">
        <div className="glass-panel relative overflow-hidden rounded-lg p-5">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-200/70 to-transparent" />
          <div className="absolute inset-0 bg-holo-grid bg-[size:34px_34px] opacity-20" />
          <div className="relative flex items-center justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-cyan-100">
                Galaxy Command
              </p>
              <h2 className="mt-2 text-2xl font-semibold text-white">
                Hyper Galaxy OS
              </h2>
            </div>
            <div className="flex items-center gap-2 rounded-full border border-emerald-300/20 bg-emerald-300/10 px-3 py-1.5 text-xs font-bold text-emerald-100">
              <span className="h-2 w-2 rounded-full bg-emerald-300 shadow-[0_0_16px_rgba(52,211,153,0.9)]" />
              Online
            </div>
          </div>

          <div className="relative mt-8 grid grid-cols-[1fr_0.8fr] gap-4">
            <div className="relative min-h-72 rounded-lg border border-cyan-200/10 bg-slate-950/48 p-5">
              <div className="absolute left-1/2 top-1/2 h-44 w-44 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-200/20" />
              <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full border border-violet-300/14" />
              <div className="absolute left-1/2 top-1/2 grid h-28 w-28 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-cyan-100/30 bg-cyan-300/10 shadow-cyan-glow">
                <Bot className="h-9 w-9 text-cyan-100" />
              </div>
              {dictionary.hero.orbitLabels.map((label, index) => {
                const positions = [
                  "left-6 top-8",
                  "right-4 top-20",
                  "bottom-10 left-12",
                  "bottom-8 right-12"
                ];
                return (
                  <div
                    key={label}
                    className={`absolute ${positions[index]} rounded-full border border-white/10 bg-white/[0.06] px-3 py-1.5 text-xs font-semibold text-slate-200 shadow-glow backdrop-blur-xl`}
                  >
                    {label}
                  </div>
                );
              })}
              <div className="absolute inset-x-5 bottom-5 h-16 overflow-hidden rounded-lg border border-white/10 bg-white/[0.04]">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-300/10 via-violet-400/10 to-emerald-300/10" />
                <div className="absolute inset-x-0 top-0 h-10 bg-gradient-to-b from-cyan-200/18 to-transparent animate-scan" />
                <div className="relative flex h-full items-center justify-around">
                  {[28, 58, 42, 76, 64, 88, 54].map((height, index) => (
                    <span
                      key={`${height}-${index}`}
                      className="w-5 rounded-t-full bg-cyan-200/60 shadow-cyan-glow"
                      style={{ height: `${height}%` }}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {[
                { icon: Zap, title: "Automation", value: "48.2k" },
                { icon: CircuitBoard, title: "AI Routing", value: "99.2%" },
                { icon: Cpu, title: "Inference", value: "12 GPU" }
              ].map((item) => (
                <div
                  key={item.title}
                  className="rounded-lg border border-white/10 bg-white/[0.045] p-4"
                >
                  <item.icon className="h-5 w-5 text-cyan-100" />
                  <p className="mt-4 text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">
                    {item.title}
                  </p>
                  <p className="mt-1 text-2xl font-semibold text-white">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
