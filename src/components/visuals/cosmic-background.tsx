"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const CosmicCanvas = dynamic(
  () => import("@/components/visuals/cosmic-canvas").then((mod) => mod.CosmicCanvas),
  {
    ssr: false,
    loading: () => <StaticCosmicBackdrop />
  }
);

function StaticCosmicBackdrop() {
  return (
    <div
      className="fixed inset-0 z-0 overflow-hidden bg-[#030712]"
      data-space-depth
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_22%,rgba(109,40,217,0.24),transparent_28rem),radial-gradient(circle_at_82%_12%,rgba(6,182,212,0.14),transparent_34rem),radial-gradient(circle_at_78%_72%,rgba(37,99,235,0.13),transparent_30rem),linear-gradient(180deg,#030712_0%,#050816_44%,#081120_100%)]" />
      <div className="absolute -right-28 top-[12%] h-80 w-80 rounded-full border border-cyan-100/10 bg-[radial-gradient(circle_at_32%_28%,rgba(226,232,240,0.38),rgba(148,163,184,0.08)_34%,rgba(3,7,18,0)_68%)] blur-[1px]" />
      <div className="absolute -left-20 bottom-[8%] h-96 w-96 rounded-full bg-[radial-gradient(circle,rgba(124,58,237,0.20),rgba(3,7,18,0)_66%)] blur-2xl" />
      <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.50)_0.5px,transparent_1px)] bg-[length:58px_58px] opacity-35" />
    </div>
  );
}

function CosmicHudOverlay() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[1] overflow-hidden"
    >
      <div
        className="absolute -right-[18rem] top-[10%] hidden h-[46rem] w-[46rem] rounded-full border border-cyan-100/10 bg-[radial-gradient(circle_at_34%_30%,rgba(226,232,240,0.18),rgba(37,99,235,0.16)_26%,rgba(8,17,32,0.08)_48%,rgba(3,7,18,0)_68%)] shadow-[inset_42px_-36px_120px_rgba(3,7,18,0.85),0_0_120px_rgba(34,211,238,0.10)] blur-[0.5px] lg:block"
        data-parallax="-34"
      />
      <div
        className="absolute -left-[16rem] bottom-[6%] hidden h-[38rem] w-[38rem] rounded-full border border-violet-100/8 bg-[radial-gradient(circle_at_62%_34%,rgba(167,139,250,0.16),rgba(76,29,149,0.12)_34%,rgba(3,7,18,0)_70%)] shadow-[inset_-48px_-30px_110px_rgba(3,7,18,0.88),0_0_100px_rgba(124,58,237,0.10)] lg:block"
        data-parallax="46"
      />
      <div
        className="absolute left-[22%] top-[34%] hidden h-80 w-80 -rotate-12 rounded-full bg-[radial-gradient(circle,rgba(0,0,0,0.94)_0_19%,rgba(3,7,18,0.70)_20%,rgba(167,139,250,0.17)_31%,rgba(103,232,249,0.07)_42%,rgba(3,7,18,0)_62%)] blur-[1px] lg:block"
        data-parallax="22"
      />
      <div
        className="absolute right-[18%] top-[62%] hidden h-96 w-[42rem] -rotate-[22deg] rounded-full bg-[radial-gradient(ellipse,rgba(167,139,250,0.15),rgba(34,211,238,0.06)_38%,rgba(3,7,18,0)_70%)] blur-2xl lg:block"
        data-parallax="-28"
      />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(103,232,249,0.026)_1px,transparent_1px),linear-gradient(90deg,rgba(103,232,249,0.022)_1px,transparent_1px)] bg-[size:96px_96px] opacity-60 [mask-image:radial-gradient(circle_at_center,black,transparent_76%)]" />
      <div className="absolute left-[7%] top-[18%] hidden h-44 w-44 rounded-full border border-cyan-100/10 lg:block">
        <div className="absolute inset-6 rounded-full border border-violet-200/10" />
        <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-cyan-100/18 to-transparent" />
        <div className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-gradient-to-r from-transparent via-cyan-100/18 to-transparent" />
      </div>
      <div className="absolute bottom-[15%] right-[8%] hidden h-64 w-64 rounded-full border border-white/8 lg:block">
        <div className="absolute inset-8 rounded-full border border-cyan-100/10" />
        <div className="absolute inset-16 rounded-full border border-violet-100/10" />
        <span className="absolute right-6 top-12 h-1.5 w-1.5 rounded-full bg-cyan-100/60 shadow-[0_0_18px_rgba(103,232,249,0.6)]" />
        <span className="absolute bottom-16 left-10 h-1 w-1 rounded-full bg-violet-100/70" />
      </div>
      <div className="absolute inset-x-0 top-0 h-44 bg-gradient-to-b from-[#030712]/80 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-[#030712]/86 to-transparent" />
    </div>
  );
}

export function CosmicBackground() {
  const [useCanvas, setUseCanvas] = useState(false);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 768px)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");

    const update = () => {
      setUseCanvas(desktop.matches && !reduced.matches);
    };

    update();
    desktop.addEventListener("change", update);
    reduced.addEventListener("change", update);

    return () => {
      desktop.removeEventListener("change", update);
      reduced.removeEventListener("change", update);
    };
  }, []);

  return (
    <>
      {useCanvas ? <CosmicCanvas /> : <StaticCosmicBackdrop />}
      <CosmicHudOverlay />
    </>
  );
}
