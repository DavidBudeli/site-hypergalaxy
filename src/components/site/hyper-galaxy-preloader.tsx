"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { brandAssets } from "@/lib/brand-assets";

type BootLocale = "pt" | "en";

const bootMessages = {
  pt: [
    "Inicializando Hyper Galaxy OS...",
    "Carregando agentes IA...",
    "Sincronizando marketplace...",
    "Conectando infraestrutura galáctica...",
    "Preparando sistema operacional...",
    "Hyper Galaxy Online."
  ],
  en: [
    "Initializing Hyper Galaxy OS...",
    "Loading AI agents...",
    "Syncing marketplace...",
    "Connecting galactic infrastructure...",
    "Preparing operating system...",
    "Hyper Galaxy Online."
  ]
} as const;

export function HyperGalaxyPreloader() {
  const prefersReducedMotion = useReducedMotion();
  const [visible, setVisible] = useState(true);
  const [locale] = useState<BootLocale>(() => {
    if (typeof window === "undefined") return "pt";

    const storedLocale = window.localStorage.getItem("hyper-galaxy-locale");
    return storedLocale === "pt" || storedLocale === "en" ? storedLocale : "pt";
  });
  const [messageIndex, setMessageIndex] = useState(0);
  const messages = useMemo(() => bootMessages[locale], [locale]);

  useEffect(() => {
    const duration = prefersReducedMotion ? 900 : 2200;
    const step = Math.max(260, Math.floor(duration / messages.length));
    const originalOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    const interval = window.setInterval(() => {
      setMessageIndex((current) => Math.min(current + 1, messages.length - 1));
    }, step);

    const timeout = window.setTimeout(() => {
      document.body.style.overflow = originalOverflow;
      setVisible(false);
    }, duration);

    return () => {
      window.clearInterval(interval);
      window.clearTimeout(timeout);
      document.body.style.overflow = originalOverflow;
    };
  }, [messages.length, prefersReducedMotion]);

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          aria-live="polite"
          className="fixed inset-0 z-[100] grid place-items-center overflow-hidden bg-[#030712] px-6"
          data-hyper-preloader
          exit={{ opacity: 0, scale: 1.018, filter: "blur(12px)" }}
          initial={{ opacity: 1 }}
          role="status"
          transition={{ duration: 0.78, ease: [0.22, 1, 0.36, 1] }}
        >
          <div
            className="absolute inset-0 bg-cover bg-center opacity-80"
            style={{
              backgroundImage:
                "url('/assets/cosmic/hyper-galaxy-cinematic-space-desktop.webp')"
            }}
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_44%,rgba(124,58,237,0.2),transparent_24rem),radial-gradient(circle_at_58%_56%,rgba(34,211,238,0.12),transparent_22rem),linear-gradient(180deg,rgba(3,7,18,0.72),rgba(3,7,18,0.88))]" />
          <div className="boot-scanline absolute inset-0 opacity-35" />

          <motion.div
            animate={prefersReducedMotion ? undefined : { y: [-4, 4, -4] }}
            className="relative z-10 flex w-full max-w-[34rem] flex-col items-center text-center"
            transition={{ duration: 5.5, ease: "easeInOut", repeat: Infinity }}
          >
            <div className="relative grid h-40 w-40 place-items-center sm:h-48 sm:w-48">
              <div className="boot-orbital-ring absolute inset-2 rounded-full" />
              <div className="boot-orbital-ring boot-orbital-ring-alt absolute inset-7 rounded-full" />
              <div className="absolute inset-12 rounded-full bg-violet-500/10 blur-2xl" />
              <div className="relative grid h-28 w-28 place-items-center rounded-full border border-cyan-100/16 bg-[#050816]/70 shadow-[0_0_56px_rgba(124,58,237,0.28),inset_0_1px_0_rgba(255,255,255,0.12)] backdrop-blur-xl sm:h-32 sm:w-32">
                <Image
                  alt="Nova"
                  className="h-20 w-20 object-contain drop-shadow-[0_0_24px_rgba(167,139,250,0.34)] sm:h-24 sm:w-24"
                  height={128}
                  priority
                  src={brandAssets.nova.loading}
                  width={128}
                />
              </div>
            </div>

            <Image
              alt="Hyper Galaxy"
              className="mt-2 h-auto w-64 max-w-[78vw] opacity-95 drop-shadow-[0_0_24px_rgba(124,58,237,0.2)]"
              height={138}
              priority
              src={brandAssets.logoCompact}
              width={460}
            />

            <div className="mt-7 flex min-h-6 max-w-[86vw] items-center justify-center gap-2 text-xs font-semibold tracking-[0.06em] text-cyan-50/95 drop-shadow-[0_0_16px_rgba(103,232,249,0.24)] sm:uppercase sm:tracking-[0.18em]">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-300 shadow-[0_0_14px_rgba(110,231,183,0.85)]" />
              <motion.p
                key={`${locale}-${messageIndex}`}
                animate={{ opacity: 1, y: 0 }}
                className="text-white/90"
                initial={{ opacity: 0.62, y: 5 }}
                transition={{ duration: 0.18, ease: "easeOut" }}
              >
                {messages[messageIndex]}
              </motion.p>
            </div>

            <div className="mt-6 h-px w-full max-w-sm overflow-hidden rounded-full bg-white/10">
              <motion.div
                animate={{ scaleX: 1 }}
                className="h-full origin-left bg-gradient-to-r from-violet-400 via-cyan-200 to-blue-400 shadow-[0_0_18px_rgba(103,232,249,0.55)]"
                initial={{ scaleX: 0 }}
                transition={{
                  duration: prefersReducedMotion ? 0.75 : 2.05,
                  ease: [0.22, 1, 0.36, 1]
                }}
              />
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
