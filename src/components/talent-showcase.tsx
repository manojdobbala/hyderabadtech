"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, BadgeCheck, Frame, GitFork, MapPin } from "lucide-react";
import Image from "next/image";
import type { Talent } from "@/lib/data";
import { Glass } from "@/components/glass";
import { SectionLabel } from "@/components/tech-pulse";

export function TalentShowcase({
  talents,
  onConnect,
}: {
  talents: Talent[];
  onConnect: (talent: Talent) => void;
}) {
  if (talents.length === 0) return null;

  return (
    <section>
      <SectionLabel eyebrow="Talent" title="Tap a portfolio" count={talents.length} />
      <div className="flex flex-col gap-3">
        {talents.map((talent, index) => (
          <motion.button
            key={talent.id}
            type="button"
            layout
            onClick={() => onConnect(talent)}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-20px" }}
            transition={{ delay: index * 0.04 }}
            whileHover={{ scale: 1.015 }}
            whileTap={{ scale: 0.975 }}
            className="w-full text-left"
          >
            <Glass>
              <div className="p-3.5">
                <div className="flex items-center gap-3">
                  <div className="relative size-14 shrink-0 overflow-hidden rounded-2xl ring-1 ring-white/15">
                    <Image
                      src={talent.image}
                      alt=""
                      fill
                      sizes="56px"
                      className="object-cover"
                    />
                  </div>
                  <div className="min-w-0">
                    <h3 className="truncate text-[17px] font-semibold tracking-[-0.03em]">
                      {talent.name}
                    </h3>
                    <p className="truncate text-[13px] text-white/60">{talent.role}</p>
                    <p className="mt-0.5 flex items-center gap-1 text-[11px] text-white/40">
                      <MapPin className="size-3" />
                      {talent.area}
                    </p>
                  </div>
                  <p className="ml-auto shrink-0 text-right text-[12px] font-medium tracking-tight text-cyber">
                    {talent.rate}
                  </p>
                </div>

                <ul className="mt-3 flex gap-1.5 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                  {talent.skills.map((skill) => (
                    <li
                      key={skill}
                      className="inline-flex shrink-0 items-center gap-1 rounded-full bg-white/5 px-2 py-1 text-[12px] text-white/80 ring-1 ring-white/10"
                    >
                      <BadgeCheck className="size-3 text-cyber" aria-label="Validated" />
                      {skill}
                    </li>
                  ))}
                </ul>

                <WorkPreview kind={talent.preview} />

                <div className="mt-3 flex items-center justify-between rounded-2xl bg-cyber/10 px-3 py-2.5 text-[13px] font-medium text-cyber ring-1 ring-cyber/25">
                  Tap to connect
                  <ArrowUpRight className="size-4" />
                </div>
              </div>
            </Glass>
          </motion.button>
        ))}
      </div>
    </section>
  );
}

export function WorkPreview({ kind }: { kind: "github" | "figma" }) {
  if (kind === "figma") {
    return (
      <div className="relative mt-3 h-[76px] overflow-hidden rounded-xl bg-black/45 ring-1 ring-white/10">
        <div className="absolute top-3 left-3 h-12 w-16 rounded-lg bg-volt/80" />
        <div className="absolute top-6 left-8 h-10 w-24 rounded-lg bg-ion/75" />
        <div className="absolute top-4 right-3 h-9 w-16 rounded-lg bg-cyber/85" />
        <span className="absolute bottom-1.5 left-2 inline-flex items-center gap-1 text-[10px] font-medium tracking-[0.16em] text-white/55 uppercase">
          <Frame className="size-3" />
          Figma
        </span>
      </div>
    );
  }

  const cells = [
    0.15, 0.45, 0.8, 0.3, 1, 0.55, 0.2, 0.9, 0.4, 0.7, 0.25, 0.85, 0.5, 0.35, 1, 0.6, 0.75,
    0.2, 0.95, 0.4, 0.1, 0.65, 0.45, 0.8,
  ];

  return (
    <div className="mt-3 rounded-xl bg-black/45 p-2.5 ring-1 ring-white/10">
      <div className="grid grid-cols-12 gap-1" aria-hidden>
        {cells.map((opacity, index) => (
          <span
            key={index}
            className="aspect-square rounded-[3px] bg-cyber"
            style={{ opacity }}
          />
        ))}
      </div>
      <span className="mt-1.5 inline-flex items-center gap-1 text-[10px] font-medium tracking-[0.16em] text-white/50 uppercase">
        <GitFork className="size-3" />
        GitHub · 30d
      </span>
    </div>
  );
}
