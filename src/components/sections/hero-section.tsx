"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowDown,
  ArrowRight,
  Cloud,
  Globe2,
  LockKeyhole,
  Network,
  Sparkles
} from "lucide-react";
import { MagneticButton } from "@/components/site/magnetic-button";
import { Badge } from "@/components/ui/badge";
import { brandAssets } from "@/lib/brand-assets";
import type { Dictionary } from "@/lib/i18n";

type HeroSectionProps = {
  dictionary: Dictionary;
};

const throughputBars = [34, 46, 42, 58, 64, 72, 68, 82, 74, 88, 78, 70];

export function HeroSection({ dictionary }: HeroSectionProps) {
  return (
    <section
      id="top"
      className="relative isolate flex min-h-screen items-center overflow-hidden px-4 pb-20 pt-28 sm:px-6 lg:px-8"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_28%_36%,rgba(34,211,238,0.075),transparent_34rem),radial-gradient(ellipse_at_72%_26%,rgba(124,58,237,0.08),transparent_38rem),linear-gradient(180deg,rgba(3,7,18,0.05),rgba(3,7,18,0.4)_100%)]" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#030712] to-transparent" />

      <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-14 lg:grid-cols-[0.88fr_1.12fr] xl:gap-20">
        <motion.div
          className="max-w-3xl"
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.82, ease: [0.16, 1, 0.3, 1] }}
        >
          <Badge variant="default" className="mb-7 gap-2 px-3 py-1.5">
            <Sparkles className="h-3.5 w-3.5" />
            {dictionary.hero.eyebrow}
          </Badge>

          <h1 className="max-w-[12ch] text-balance text-[3.35rem] font-semibold leading-[0.95] tracking-normal text-white sm:text-7xl lg:text-[5.8rem] xl:text-[6.7rem]">
            {dictionary.hero.title}
          </h1>

          <p className="mt-7 max-w-xl text-base leading-8 text-slate-300 sm:text-xl">
            {dictionary.hero.subtitle}
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <MagneticButton href="/login" className="group w-full sm:w-auto">
              {dictionary.hero.primary}
              <ArrowRight className="h-4 w-4" />
            </MagneticButton>
            <MagneticButton
              href="#marketplace"
              variant="galaxy"
              className="group w-full sm:w-auto"
            >
              {dictionary.hero.secondary}
              <ArrowDown className="h-4 w-4" />
            </MagneticButton>
          </div>
        </motion.div>

        <HeroCloudVisual dictionary={dictionary} />
      </div>
    </section>
  );
}

function HeroCloudVisual({ dictionary }: HeroSectionProps) {
  const visual = dictionary.hero.visual;

  return (
    <motion.div
      aria-hidden="true"
      className="relative hidden min-h-[620px] lg:block"
      initial={{ opacity: 0, x: 36, scale: 0.985 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      transition={{ duration: 1, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="absolute right-0 top-1/2 w-full max-w-[680px] -translate-y-1/2">
        <div className="relative overflow-hidden rounded-lg border border-white/12 bg-[#050816]/58 p-5 shadow-[0_40px_120px_rgba(0,0,0,0.44),0_0_80px_rgba(34,211,238,0.08)] backdrop-blur-xl">
          <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-cyan-100/60 to-transparent" />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(103,232,249,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(103,232,249,0.03)_1px,transparent_1px)] bg-[size:56px_56px] opacity-30 [mask-image:radial-gradient(circle_at_58%_42%,black,transparent_72%)]" />

          <div className="relative">
            <header className="flex items-center justify-between gap-5 border-b border-white/10 pb-5">
              <div className="flex items-center gap-3">
                <Image
                  src={brandAssets.appIcon}
                  alt=""
                  width={48}
                  height={48}
                  className="h-12 w-12 rounded-lg object-cover shadow-[0_0_28px_rgba(124,58,237,0.32)]"
                />
                <div>
                  <p className="text-sm font-semibold text-white">Hyper Galaxy Cloud</p>
                  <p className="mt-1 text-xs text-slate-400">{visual.fabric}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 rounded-full border border-emerald-300/16 bg-emerald-300/8 px-3 py-2 text-xs font-semibold text-emerald-100">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-300 shadow-[0_0_14px_rgba(110,231,183,0.8)]" />
                {visual.cloudStatus}
              </div>
            </header>

            <div className="grid gap-5 py-5 min-[1180px]:grid-cols-[1.05fr_0.95fr]">
              <div className="rounded-lg border border-white/10 bg-white/[0.035] p-5">
                <div className="mb-8 flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.16em] text-cyan-100/80">
                      {visual.coreLabel}
                    </p>
                    <h2 className="mt-2 text-2xl font-semibold text-white">
                      {visual.coreTitle}
                    </h2>
                  </div>
                  <Globe2 className="h-5 w-5 text-cyan-100/70" />
                </div>

                <div className="relative mx-auto grid aspect-square max-w-[270px] place-items-center">
                  <div className="absolute inset-0 rounded-full border border-cyan-100/12" />
                  <div className="absolute inset-8 rounded-full border border-violet-100/12" />
                  <div className="absolute inset-16 rounded-full bg-cyan-200/6 blur-2xl" />
                  <div className="absolute left-8 top-12 flex items-center gap-2 rounded-full border border-white/10 bg-slate-950/72 px-3 py-1.5 text-[0.68rem] font-semibold text-slate-300">
                    <Network className="h-3.5 w-3.5 text-cyan-100" />
                    {visual.workflows}
                  </div>
                  <div className="absolute bottom-12 right-4 flex items-center gap-2 rounded-full border border-white/10 bg-slate-950/72 px-3 py-1.5 text-[0.68rem] font-semibold text-slate-300">
                    <LockKeyhole className="h-3.5 w-3.5 text-violet-100" />
                    {visual.secureMesh}
                  </div>
                  <div className="relative grid h-28 w-28 place-items-center rounded-full border border-cyan-100/16 bg-[#081120]/82 shadow-[0_0_54px_rgba(34,211,238,0.12),inset_0_1px_0_rgba(255,255,255,0.12)]">
                    <Image
                      src={brandAssets.nova.avatar}
                      alt=""
                      width={88}
                      height={88}
                      className="h-20 w-20 rounded-full object-cover"
                    />
                  </div>
                </div>
              </div>

              <div className="grid gap-5">
                <div className="rounded-lg border border-white/10 bg-white/[0.035] p-5">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-sm font-semibold text-white">{visual.throughput}</p>
                      <p className="mt-1 text-xs text-slate-400">{visual.orchestration}</p>
                    </div>
                    <Cloud className="h-5 w-5 text-cyan-100/70" />
                  </div>
                  <div className="mt-6 flex h-32 items-end gap-2">
                    {throughputBars.map((value, index) => (
                      <span
                        key={`${value}-${index}`}
                        className="w-full rounded-t-sm bg-gradient-to-t from-cyan-300/40 to-cyan-100/90 shadow-[0_0_16px_rgba(103,232,249,0.22)]"
                        style={{ height: `${value}%` }}
                      />
                    ))}
                  </div>
                </div>

                <div className="rounded-lg border border-white/10 bg-white/[0.035] p-5">
                  <div className="mb-5 flex items-center justify-between">
                    <p className="text-sm font-semibold text-white">{visual.workflowTitle}</p>
                    <span className="rounded-full border border-cyan-100/12 bg-cyan-100/8 px-2.5 py-1 text-[0.65rem] font-bold uppercase tracking-[0.12em] text-cyan-100">
                      {visual.live}
                    </span>
                  </div>
                  <div className="relative grid grid-cols-4 gap-2">
                    <div className="absolute left-[12%] right-[12%] top-4 h-px bg-gradient-to-r from-cyan-100/20 via-cyan-100/55 to-violet-100/25" />
                    {visual.workflowNodes.map((node) => (
                      <div key={node} className="relative text-center">
                        <span className="mx-auto block h-8 w-8 rounded-full border border-cyan-100/18 bg-[#081120] shadow-[0_0_18px_rgba(34,211,238,0.1)]" />
                        <p className="mt-3 text-[0.68rem] font-semibold text-slate-300">
                          {node}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <footer className="flex items-center justify-between gap-4 rounded-lg border border-violet-200/10 bg-violet-200/[0.045] px-4 py-3">
              <div className="flex min-w-0 items-center gap-3">
                <Image
                  src={brandAssets.nova.success}
                  alt=""
                  width={44}
                  height={44}
                  className="h-11 w-11 shrink-0 rounded-full object-cover"
                />
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-white">{visual.agent}</p>
                  <p className="text-xs text-emerald-200">{visual.agentStatus}</p>
                </div>
              </div>
              <div className="hidden rounded-full border border-white/10 bg-slate-950/60 px-3 py-1.5 text-xs font-semibold text-slate-300 min-[1180px]:block">
                {visual.region}
              </div>
            </footer>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
