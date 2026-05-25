"use client";

import { animate, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { SectionHeading } from "@/components/site/section-heading";
import type { Dictionary } from "@/lib/i18n";

type ImpactSectionProps = {
  dictionary: Dictionary;
};

type Metric = Dictionary["impact"]["metrics"][number];

export function ImpactSection({ dictionary }: ImpactSectionProps) {
  return (
    <section id="impact" className="section-shell">
      <div className="absolute inset-x-0 top-1/2 h-px bg-gradient-to-r from-transparent via-violet-400/14 to-transparent" />
      <div className="section-inner">
        <SectionHeading
          eyebrow={dictionary.impact.eyebrow}
          title={dictionary.impact.title}
        />

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {dictionary.impact.metrics.map((metric) => (
            <AnimatedMetric key={metric.label} metric={metric} />
          ))}
        </div>
      </div>
    </section>
  );
}

function AnimatedMetric({ metric }: { metric: Metric }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;

    const controls = animate(0, metric.value, {
      duration: 1.7,
      ease: "easeOut",
      onUpdate: (latest) => setDisplay(latest)
    });

    return () => controls.stop();
  }, [inView, metric.value]);

  return (
    <div
      ref={ref}
      className="rounded-xl border border-white/6 bg-white/[0.025] p-5 text-center backdrop-blur-xl"
      data-reveal
    >
      <div className="text-4xl font-semibold tracking-tight text-white">
        {display.toFixed(metric.decimals)}
        <span className="text-violet-300">{metric.suffix}</span>
      </div>
      <p className="mt-4 text-sm leading-6 text-slate-500">{metric.label}</p>
    </div>
  );
}
