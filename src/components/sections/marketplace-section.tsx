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
      className="section-shell border-y border-white/6 bg-[linear-gradient(180deg,rgba(6,10,22,0.80),rgba(2,5,16,0.96))]"
    >
      <div className="absolute inset-0 bg-holo-grid bg-[size:80px_80px] opacity-[0.04]" />
      <div className="absolute left-[12%] top-24 h-80 w-80 rounded-full bg-violet-700/5 blur-3xl" />
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
                whileHover={{ y: -6, rotateX: 1, rotateY: index % 2 ? -0.8 : 0.8 }}
                transition={{ type: "spring", stiffness: 220, damping: 20 }}
              >
                <Card className="group relative h-full overflow-hidden border-white/8 bg-[#040814]/70">
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-400/20 to-transparent" />
                  <div className="absolute -right-14 -top-14 h-36 w-36 rounded-full bg-violet-600/5 blur-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <CardHeader className="relative">
                    <div className="flex items-start justify-between gap-4">
                      <div className="grid h-11 w-11 place-items-center rounded-lg border border-violet-400/14 bg-violet-500/8">
                        <Icon className="h-5 w-5 text-violet-200" />
                      </div>
                      <Badge variant="success" className="gap-1.5">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                        {dictionary.marketplace.online}
                      </Badge>
                    </div>
                    <CardTitle className="mt-4">{agent.name}</CardTitle>
                    <CardDescription>{agent.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="relative space-y-5">
                    <div>
                      <div className="mb-2 flex items-center justify-between text-xs font-medium text-slate-500">
                        <span className="flex items-center gap-1.5">
                          <Activity className="h-3 w-3 text-violet-400/60" />
                          {dictionary.marketplace.consumption}
                        </span>
                        <span className="text-slate-300">{agent.consumption}</span>
                      </div>
                      <div className="h-1.5 overflow-hidden rounded-full bg-white/6">
                        <motion.div
                          className="h-full rounded-full bg-gradient-to-r from-violet-500 to-indigo-500"
                          initial={{ width: "20%" }}
                          whileInView={{ width: agent.signal }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.2, ease: "easeOut" }}
                        />
                      </div>
                    </div>

                    <div>
                      <div className="mb-2 flex items-center gap-1.5 text-xs font-medium text-slate-500">
                        <PlugZap className="h-3 w-3 text-violet-400/60" />
                        {dictionary.marketplace.integrations}
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {agent.integrations.map((integration) => (
                          <span
                            key={integration}
                            className="rounded-full border border-white/8 bg-white/[0.03] px-2.5 py-1 text-[0.68rem] font-medium text-slate-400"
                          >
                            {integration}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between rounded-lg border border-white/6 bg-white/[0.025] px-3 py-2">
                      <span className="text-xs font-medium text-slate-500">
                        {dictionary.marketplace.accuracy}
                      </span>
                      <span className="font-mono text-sm font-semibold text-violet-200">
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
