"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowDown, ArrowRight, Sparkles } from "lucide-react";
import { MagneticButton } from "@/components/site/magnetic-button";
import { Badge } from "@/components/ui/badge";
import { brandAssets } from "@/lib/brand-assets";
import type { Dictionary } from "@/lib/i18n";

type HeroSectionProps = {
  dictionary: Dictionary;
};

export function HeroSection({ dictionary }: HeroSectionProps) {
  return (
    <section
      id="top"
      className="relative isolate flex min-h-screen items-center overflow-hidden px-4 pb-20 pt-28 sm:px-6 lg:px-8"
      data-location-code="Local 01"
      data-location-label={dictionary.hero.eyebrow}
      data-location-stage
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_34%,rgba(124,58,237,0.12),transparent_36rem),radial-gradient(ellipse_at_42%_72%,rgba(34,211,238,0.075),transparent_34rem),linear-gradient(180deg,rgba(3,7,18,0.02),rgba(3,7,18,0.52)_100%)]" />
      <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-[#030712] to-transparent" />

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 28, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <Badge variant="default" className="mb-7 gap-2 px-3 py-1.5">
            <Sparkles className="h-3.5 w-3.5" />
            {dictionary.hero.eyebrow}
          </Badge>

          <Image
            src={brandAssets.logoMain}
            alt="Hyper Galaxy"
            width={920}
            height={170}
            className="mx-auto h-auto w-full max-w-[44rem] object-contain drop-shadow-[0_0_34px_rgba(124,58,237,0.22)]"
            priority
          />

          <h1 className="mx-auto mt-8 max-w-3xl text-balance text-3xl font-semibold leading-tight text-white sm:text-5xl lg:text-6xl">
            {dictionary.hero.title}
          </h1>

          <p className="mx-auto mt-7 max-w-2xl text-base leading-8 text-slate-300 sm:text-xl">
            {dictionary.hero.subtitle}
          </p>

          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <MagneticButton href="/login" className="group w-full sm:w-auto">
              {dictionary.hero.primary}
              <ArrowRight className="h-4 w-4" />
            </MagneticButton>
            <MagneticButton
              href="#platform"
              variant="galaxy"
              className="group w-full sm:w-auto"
            >
              {dictionary.hero.secondary}
              <ArrowDown className="h-4 w-4" />
            </MagneticButton>
          </div>
        </motion.div>

        <motion.a
          href="#platform"
          className="mt-10 hidden items-center gap-3 rounded-full border border-white/10 bg-white/[0.035] px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-cyan-100/80 backdrop-blur-md transition-colors hover:border-cyan-100/30 hover:text-cyan-50 lg:inline-flex"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.05, duration: 0.65, ease: "easeOut" }}
        >
          {dictionary.journey.entry.scroll}
          <ArrowDown className="h-3.5 w-3.5" />
        </motion.a>
      </div>
    </section>
  );
}
