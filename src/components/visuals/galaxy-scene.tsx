"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const GalaxyCanvas = dynamic(
  () => import("@/components/visuals/galaxy-canvas").then((mod) => mod.GalaxyCanvas),
  {
    ssr: false,
    loading: () => <StaticGalaxyBackdrop />
  }
);

function StaticGalaxyBackdrop() {
  return (
    <div className="absolute inset-0 bg-galaxy-radial opacity-70">
      <div className="absolute inset-0 bg-holo-grid bg-[size:64px_64px] opacity-20" />
    </div>
  );
}

export function GalaxyScene() {
  const [useCanvas, setUseCanvas] = useState(false);

  useEffect(() => {
    const mobile = window.matchMedia("(max-width: 767px)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");

    const update = () => {
      setUseCanvas(!mobile.matches && !reduced.matches);
    };

    update();
    mobile.addEventListener("change", update);
    reduced.addEventListener("change", update);

    return () => {
      mobile.removeEventListener("change", update);
      reduced.removeEventListener("change", update);
    };
  }, []);

  if (!useCanvas) {
    return <StaticGalaxyBackdrop />;
  }

  return <GalaxyCanvas />;
}
