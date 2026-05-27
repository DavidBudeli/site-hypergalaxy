"use client";

import { useEffect, useRef } from "react";

const depthImage = "url('/cosmic/hyper-galaxy-depth-desktop.jpg')";
const starsImage = "url('/cosmic/hyper-galaxy-stars-desktop.png')";
const planetsImage = "url('/cosmic/hyper-galaxy-planets-desktop.png')";
const dustImage = "url('/cosmic/hyper-galaxy-dust-desktop.png')";

export function CosmicCanvas() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reducedMotion.matches) return;

    let frame = 0;
    let pointerX = 0;
    let pointerY = 0;
    let targetPointerX = 0;
    let targetPointerY = 0;

    const update = () => {
      frame = 0;
      const scrollable = document.documentElement.scrollHeight - window.innerHeight || 1;
      const scroll = window.scrollY / scrollable;

      pointerX += (targetPointerX - pointerX) * 0.16;
      pointerY += (targetPointerY - pointerY) * 0.16;

      const depthScale = 1.04 + scroll * 0.025;
      const planetScale = 1.025 + scroll * 0.052;

      root.style.setProperty("--depth-x", `${pointerX * 6}px`);
      root.style.setProperty("--depth-y", `${scroll * -32 + pointerY * 3}px`);
      root.style.setProperty("--depth-scale", depthScale.toFixed(4));
      root.style.setProperty("--depth-scale-breath", (depthScale + 0.026).toFixed(4));
      root.style.setProperty("--stars-x", `${scroll * 130 + pointerX * 14}px`);
      root.style.setProperty("--stars-y", `${scroll * -96 + pointerY * 8}px`);
      root.style.setProperty("--planets-x", `${scroll * 22 - pointerX * 18}px`);
      root.style.setProperty("--planets-y", `${scroll * -68 + pointerY * 8}px`);
      root.style.setProperty("--planet-scale", planetScale.toFixed(4));
      root.style.setProperty("--planet-scale-breath", (planetScale + 0.014).toFixed(4));
      root.style.setProperty("--dust-x", `${scroll * 188 - pointerX * 22}px`);
      root.style.setProperty("--dust-y", `${scroll * -138 + pointerY * 12}px`);

      if (
        Math.abs(targetPointerX - pointerX) > 0.002 ||
        Math.abs(targetPointerY - pointerY) > 0.002
      ) {
        requestUpdate();
      }
    };

    const requestUpdate = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    };

    const handlePointerMove = (event: PointerEvent) => {
      targetPointerX = (event.clientX / window.innerWidth - 0.5) * 2;
      targetPointerY = (event.clientY / window.innerHeight - 0.5) * 2;
      requestUpdate();
    };

    const resetPointer = () => {
      targetPointerX = 0;
      targetPointerY = 0;
      requestUpdate();
    };

    update();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerleave", resetPointer);

    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerleave", resetPointer);
      if (frame) {
        window.cancelAnimationFrame(frame);
      }
    };
  }, []);

  return (
    <div
      ref={rootRef}
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[#030712] [--depth-scale-breath:1.066] [--depth-scale:1.04] [--depth-x:0px] [--depth-y:0px] [--dust-x:0px] [--dust-y:0px] [--planet-scale-breath:1.039] [--planet-scale:1.025] [--planets-x:0px] [--planets-y:0px] [--stars-x:0px] [--stars-y:0px]"
      data-space-depth
    >
      <div
        className="cosmic-layer cosmic-depth-layer"
        style={{ backgroundImage: depthImage }}
      />
      <div
        className="cosmic-layer cosmic-stars-layer"
        style={{ backgroundImage: starsImage }}
      />
      <div
        className="cosmic-layer cosmic-planets-layer"
        style={{ backgroundImage: planetsImage }}
      />
      <div
        className="cosmic-layer cosmic-dust-layer"
        style={{ backgroundImage: dustImage }}
      />
      <div className="cosmic-nebula-glow" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_38%,transparent_32%,rgba(3,7,18,0.12)_74%,rgba(3,7,18,0.58)_100%),linear-gradient(180deg,rgba(3,7,18,0.02),rgba(3,7,18,0.3)_94%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(103,232,249,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(103,232,249,0.016)_1px,transparent_1px)] bg-[size:124px_124px] opacity-[0.26] [mask-image:linear-gradient(to_bottom,transparent,black_18%,black_70%,transparent)]" />
    </div>
  );
}
