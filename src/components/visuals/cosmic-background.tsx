"use client";

import { useEffect, useState } from "react";
import { CinematicSpaceScene } from "@/components/visuals/cinematic-space-scene";

function StaticCosmicBackdrop() {
  return (
    <div
      className="fixed inset-0 z-0 overflow-hidden bg-[#030712]"
      data-space-depth
    >
      <div
        className="absolute inset-0 bg-cover bg-center opacity-90"
        style={{ backgroundImage: "url('/cosmic/hyper-galaxy-cinematic-space-mobile.jpg')" }}
      />
      <div
        className="absolute inset-0 opacity-[0.045] mix-blend-screen"
        style={{ backgroundImage: "var(--noise)" }}
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(3,7,18,0.16),rgba(3,7,18,0.7)_100%)]" />
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
  const [useAnimatedBackdrop, setUseAnimatedBackdrop] = useState(false);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1024px)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");

    const update = () => {
      setUseAnimatedBackdrop(desktop.matches && !reduced.matches);
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
      {useAnimatedBackdrop ? <CinematicSpaceScene /> : <StaticCosmicBackdrop />}
      <CosmicHudOverlay />
    </>
  );
}
