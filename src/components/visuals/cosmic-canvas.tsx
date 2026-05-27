"use client";

import { useEffect, useRef } from "react";

const desktopSpaceImage = "url('/cosmic/hyper-galaxy-space-desktop.jpg')";

export function CosmicCanvas() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reducedMotion.matches) return;

    let frame = 0;

    const update = () => {
      frame = 0;
      const scrollable = document.documentElement.scrollHeight - window.innerHeight || 1;
      const scroll = window.scrollY / scrollable;
      const pointerX = Number(root.dataset.pointerX || 0);
      const pointerY = Number(root.dataset.pointerY || 0);

      root.style.setProperty("--space-x", `${pointerX * 12}px`);
      root.style.setProperty("--space-y", `${scroll * -54}px`);
      root.style.setProperty("--space-near-x", `${pointerX * -18}px`);
      root.style.setProperty("--space-near-y", `${scroll * -92 + pointerY * 8}px`);
    };

    const requestUpdate = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    };

    const handlePointerMove = (event: PointerEvent) => {
      root.dataset.pointerX = String((event.clientX / window.innerWidth - 0.5) * 2);
      root.dataset.pointerY = String((event.clientY / window.innerHeight - 0.5) * 2);
      requestUpdate();
    };

    const resetPointer = () => {
      root.dataset.pointerX = "0";
      root.dataset.pointerY = "0";
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
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[#030712] [--space-near-x:0px] [--space-near-y:0px] [--space-x:0px] [--space-y:0px]"
      data-space-depth
      data-pointer-x="0"
      data-pointer-y="0"
    >
      <div
        className="absolute inset-[-4%] bg-cover bg-center opacity-95 transition-transform duration-500 ease-out"
        style={{
          backgroundImage: desktopSpaceImage,
          transform: "translate3d(var(--space-x), var(--space-y), 0) scale(1.045)"
        }}
      />
      <div
        className="absolute inset-[-8%] opacity-[0.18] mix-blend-screen transition-transform duration-500 ease-out"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(248,250,252,0.72) 0.55px, transparent 1.2px), radial-gradient(circle, rgba(103,232,249,0.42) 0.45px, transparent 1px)",
          backgroundSize: "96px 96px, 168px 168px",
          transform:
            "translate3d(var(--space-near-x), var(--space-near-y), 0) scale(1.03)"
        }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_38%,transparent_32%,rgba(3,7,18,0.12)_74%,rgba(3,7,18,0.58)_100%),linear-gradient(180deg,rgba(3,7,18,0.02),rgba(3,7,18,0.3)_94%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(103,232,249,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(103,232,249,0.016)_1px,transparent_1px)] bg-[size:124px_124px] opacity-[0.26] [mask-image:linear-gradient(to_bottom,transparent,black_18%,black_70%,transparent)]" />
    </div>
  );
}
