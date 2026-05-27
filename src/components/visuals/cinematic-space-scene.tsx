"use client";

import { useEffect, useRef } from "react";

const cinematicSpaceImage = "url('/cosmic/hyper-galaxy-cinematic-space-desktop.jpg')";
const starsImage = "url('/cosmic/hyper-galaxy-stars-desktop.png')";

export function CinematicSpaceScene() {
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

      pointerX += (targetPointerX - pointerX) * 0.12;
      pointerY += (targetPointerY - pointerY) * 0.12;

      const cameraScale = 1.035 + scroll * 0.048;

      root.style.setProperty("--space-camera-x", `${pointerX * -10 + scroll * -18}px`);
      root.style.setProperty("--space-camera-y", `${pointerY * -5 + scroll * -54}px`);
      root.style.setProperty("--space-camera-scale", cameraScale.toFixed(4));
      root.style.setProperty("--space-camera-breathe", (cameraScale + 0.022).toFixed(4));
      root.style.setProperty("--space-stars-x", `${pointerX * 10 + scroll * 86}px`);
      root.style.setProperty("--space-stars-y", `${pointerY * 6 + scroll * -96}px`);
      root.style.setProperty("--space-nebula-x", `${pointerX * -7 + scroll * -28}px`);
      root.style.setProperty("--space-nebula-y", `${pointerY * -4 + scroll * -44}px`);
      root.style.setProperty("--space-dust-x", `${pointerX * -11 + scroll * 58}px`);
      root.style.setProperty("--space-dust-y", `${pointerY * 6 + scroll * -72}px`);

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
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[#030712] [--space-camera-breathe:1.057] [--space-camera-scale:1.035] [--space-camera-x:0px] [--space-camera-y:0px] [--space-dust-x:0px] [--space-dust-y:0px] [--space-nebula-x:0px] [--space-nebula-y:0px] [--space-stars-x:0px] [--space-stars-y:0px]"
      data-space-depth
    >
      <div
        className="cosmic-layer cosmic-cinematic-layer"
        style={{ backgroundImage: cinematicSpaceImage }}
      />
      <div
        className="cosmic-layer cosmic-stars-layer"
        style={{ backgroundImage: starsImage }}
      />
      <div className="cosmic-nebula-field" />
      <div className="cosmic-foreground-dust" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_52%_42%,transparent_24%,rgba(3,7,18,0.14)_68%,rgba(3,7,18,0.72)_100%),linear-gradient(180deg,rgba(3,7,18,0.04),rgba(3,7,18,0.2)_48%,rgba(3,7,18,0.55)_100%)]" />
      <div className="cosmic-hud-depth" />
    </div>
  );
}
