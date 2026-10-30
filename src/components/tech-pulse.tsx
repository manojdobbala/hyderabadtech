"use client";

import { motion } from "framer-motion";
import type { PulseItem } from "@/lib/data";
import { ElasticRail } from "@/components/elastic-rail";
import { Glass } from "@/components/glass";
import { cn } from "@/lib/utils";

const toneClass = {
  cyber: "text-cyber bg-cyber/10",
  ion: "text-ion bg-ion/10",
  volt: "text-volt bg-volt/15",
} as const;

const glowClass = {
  cyber: "bg-cyber/25",
  ion: "bg-ion/25",
  volt: "bg-volt/30",
} as const;

export function TechPulse({ items }: { items: PulseItem[] }) {
  if (items.length === 0) return null;

  return (
    <section>
      <SectionLabel eyebrow="Tech pulse" title="On the wire" count={items.length} />
      <div className="-mx-4">
        <ElasticRail label="Breaking local tech">
          {items.map((item) => (
            <motion.article
              layout
              key={item.id}
              whileHover={{ scale: 1.015 }}
              whileTap={{ scale: 0.975 }}
              className="w-[min(300px,78vw)] shrink-0"
            >
              <Glass innerClassName="relative overflow-hidden">
                <div
                  className={cn(
                    "pointer-events-none absolute -top-12 -right-8 size-32 rounded-full blur-3xl",
                    glowClass[item.tone],
                  )}
                />
                <div className="relative flex min-h-[176px] flex-col p-4">
                  <div className="flex items-center justify-between gap-3">
                    <span
                      className={cn(
                        "rounded-full px-2 py-1 text-[10px] font-semibold tracking-[0.16em] uppercase",
                        toneClass[item.tone],
                      )}
                    >
                      {item.kicker}
                    </span>
                    <span className="text-[11px] text-white/40">{item.meta}</span>
                  </div>
                  <h3 className="mt-4 text-[22px] leading-[1.05] font-semibold tracking-[-0.045em]">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-[13px] leading-5 text-white/62">{item.detail}</p>
                </div>
              </Glass>
            </motion.article>
          ))}
        </ElasticRail>
      </div>
    </section>
  );
}

export function SectionLabel({
  eyebrow,
  title,
  count,
}: {
  eyebrow: string;
  title: string;
  count?: number;
}) {
  return (
    <div className="mb-3 flex items-end justify-between gap-3">
      <div>
        <p className="text-[11px] font-medium tracking-[0.18em] text-white/40 uppercase">
          {eyebrow}
        </p>
        <h2 className="mt-1 text-[22px] font-semibold tracking-[-0.04em]">{title}</h2>
      </div>
      {typeof count === "number" ? (
        <span className="pb-0.5 text-[13px] text-white/40 tabular-nums">{count}</span>
      ) : null}
    </div>
  );
}
