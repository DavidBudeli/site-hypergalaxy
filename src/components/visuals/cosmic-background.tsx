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
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_12%,rgba(109,40,217,0.22),transparent_34rem),radial-gradient(ellipse_at_88%_18%,rgba(6,182,212,0.15),transparent_36rem),radial-gradient(ellipse_at_68%_82%,rgba(37,99,235,0.12),transparent_34rem),linear-gradient(180deg,#030712_0%,#050816_46%,#081120_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.52)_0.45px,transparent_1px)] bg-[length:46px_46px] opacity-35" />
      <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(103,232,249,0.35)_0.35px,transparent_1px)] bg-[length:89px_89px] opacity-20" />
      <div className="absolute -right-28 top-[14%] h-[30rem] w-[30rem] bg-[radial-gradient(ellipse_at_36%_35%,rgba(148,163,184,0.28),rgba(37,99,235,0.10)_34%,rgba(3,7,18,0)_68%)] blur-xl" />
      <div className="absolute -left-24 bottom-[8%] h-[34rem] w-[34rem] bg-[radial-gradient(ellipse_at_55%_42%,rgba(124,58,237,0.18),rgba(3,7,18,0)_68%)] blur-2xl" />
    </div>
  );
}

function CosmicHudOverlay() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[1] overflow-hidden"
    >
      <div className="absolute inset-0 bg-[linear-gradient(rgba(103,232,249,0.018)_1px,transparent_1px),linear-gradient(90deg,rgba(103,232,249,0.014)_1px,transparent_1px)] bg-[size:112px_112px] opacity-45 [mask-image:linear-gradient(to_bottom,transparent,black_18%,black_72%,transparent)]" />
      <div className="absolute left-[8%] top-[17%] hidden h-px w-[28rem] -rotate-[18deg] bg-gradient-to-r from-transparent via-cyan-100/18 to-transparent lg:block" />
      <div className="absolute left-[14%] top-[25%] hidden h-px w-[18rem] -rotate-[18deg] bg-gradient-to-r from-transparent via-violet-100/12 to-transparent lg:block" />
      <div className="absolute bottom-[20%] right-[8%] hidden h-px w-[34rem] rotate-[14deg] bg-gradient-to-r from-transparent via-cyan-100/12 to-transparent lg:block" />
      <span className="absolute left-[31%] top-[20%] hidden h-1 w-1 rounded-full bg-cyan-100/50 shadow-[0_0_18px_rgba(103,232,249,0.46)] lg:block" />
      <span className="absolute right-[19%] top-[58%] hidden h-1.5 w-1.5 rounded-full bg-violet-100/55 shadow-[0_0_20px_rgba(167,139,250,0.36)] lg:block" />
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
