"use client";

import { motion } from "framer-motion";
import { Activity, PlugZap } from "lucide-react";
import { SectionHeading } from "@/components/site/section-heading";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { iconMap, type Dictionary, type IconKey } from "@/lib/i18n";

type MarketplaceSectionProps = {
  dictionary: Dictionary;
};

export function MarketplaceSection({ dictionary }: MarketplaceSectionProps) {
  return (
    <section
      id="agents"
      className="section-shell border-y border-white/8 bg-[linear-gradient(180deg,rgba(8,17,32,0.72),rgba(3,7,18,0.94))]"
    >
      <div className="absolute inset-0 bg-holo-grid bg-[size:72px_72px] opacity-[0.08]" />
      <div className="absolute left-[12%] top-24 h-72 w-72 rounded-full bg-cyan-300/10 blur-3xl" />
      <div className="section-inner">
        <SectionHeading
          eyebrow={dictionary.marketplace.eyebrow}
          title={dictionary.marketplace.title}
          subtitle={dictionary.marketplace.subtitle}
        />

        <div className="mt-9 flex flex-wrap justify-center gap-2" data-reveal>
          {dictionary.marketplace.filters.map((filter, index) => (
            <Badge
              key={filter}
              variant={index === 0 ? "default" : "muted"}
              className="px-3 py-1.5"
            >
              {filter}
            </Badge>
          ))}
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {dictionary.marketplace.agents.map((agent, index) => {
            const Icon = iconMap[agent.icon as IconKey];
            return (
              <motion.div
                key={agent.name}
                data-reveal
                initial={false}
                whileHover={{ y: -8, rotateX: 1.5, rotateY: index % 2 ? -1 : 1 }}
                transition={{ type: "spring", stiffness: 220, damping: 18 }}
              >
                <Card className="group relative h-full overflow-hidden border-white/10 bg-slate-950/64">
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-200/70 to-transparent opacity-60" />
                  <div className="absolute -right-14 -top-14 h-36 w-36 rounded-full bg-cyan-300/10 blur-2xl transition-opacity duration-300 group-hover:opacity-100" />
                  <CardHeader className="relative">
                    <div className="flex items-start justify-between gap-4">
                      <div className="grid h-12 w-12 place-items-center rounded-lg border border-cyan-200/20 bg-cyan-300/10 shadow-cyan-glow">
                        <Icon className="h-5 w-5 text-cyan-100" />
                      </div>
                      <Badge variant="success" className="gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-300 shadow-[0_0_14px_rgba(52,211,153,0.9)]" />
                        {dictionary.marketplace.online}
                      </Badge>
                    </div>
                    <CardTitle className="mt-4">{agent.name}</CardTitle>
                    <CardDescription>{agent.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="relative space-y-5">
                    <div>
                      <div className="mb-2 flex items-center justify-between text-xs font-semibold text-slate-400">
                        <span className="flex items-center gap-2">
                          <Activity className="h-3.5 w-3.5 text-cyan-200" />
                          {dictionary.marketplace.consumption}
                        </span>
                        <span className="text-white">{agent.consumption}</span>
                      </div>
                      <div className="h-2 overflow-hidden rounded-full bg-white/8">
                        <motion.div
                          className="h-full rounded-full bg-gradient-to-r from-cyan-300 via-violet-400 to-emerald-300"
                          initial={{ width: "28%" }}
                          whileInView={{ width: agent.signal }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.2, ease: "easeOut" }}
                        />
                      </div>
                    </div>

                    <div>
                      <div className="mb-2 flex items-center gap-2 text-xs font-semibold text-slate-400">
                        <PlugZap className="h-3.5 w-3.5 text-violet-200" />
                        {dictionary.marketplace.integrations}
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {agent.integrations.map((integration) => (
                          <span
                            key={integration}
                            className="rounded-full border border-white/10 bg-white/[0.05] px-2.5 py-1 text-[0.68rem] font-semibold text-slate-300"
                          >
                            {integration}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2">
                      <span className="text-xs font-semibold text-slate-400">
                        {dictionary.marketplace.accuracy}
                      </span>
                      <span className="font-mono text-sm font-semibold text-cyan-100">
                        {agent.signal}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
