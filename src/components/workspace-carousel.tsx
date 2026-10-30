"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Wifi } from "lucide-react";
import Image from "next/image";
import type { Desk } from "@/lib/data";
import { ElasticRail } from "@/components/elastic-rail";
import { Glass } from "@/components/glass";
import { SlideToBook } from "@/components/slide-to-book";
import { SectionLabel } from "@/components/tech-pulse";
import { cn, inr, spring } from "@/lib/utils";

export function WorkspaceCarousel({
  desks,
  booked,
  onBook,
}: {
  desks: Desk[];
  booked: Record<string, boolean>;
  onBook: (id: string) => void;
}) {
  if (desks.length === 0) return null;

  return (
    <section>
      <SectionLabel eyebrow="Quick pass" title="Desks still open" count={desks.length} />
      <div className="-mx-4">
        <ElasticRail label="Hot desk passes">
          {desks.map((desk) => (
            <DeskCard
              key={desk.id}
              desk={desk}
              booked={Boolean(booked[desk.id])}
              onBook={() => onBook(desk.id)}
            />
          ))}
        </ElasticRail>
      </div>
    </section>
  );
}

function DeskCard({
  desk,
  booked,
  onBook,
}: {
  desk: Desk;
  booked: boolean;
  onBook: () => void;
}) {
  const [pass, setPass] = useState<"day" | "week">("day");
  const remaining = Math.max(0, desk.left - (booked ? 1 : 0));
  const price = pass === "day" ? desk.dayPrice : desk.weekPrice;

  return (
    <article className="w-[min(300px,82vw)] shrink-0">
      <Glass innerClassName="overflow-hidden">
        <motion.div whileHover={{ scale: 1.015 }} whileTap={{ scale: 0.985 }} className="relative h-40 origin-center">
          <Image
            src={desk.image}
            alt={`${desk.name} workspace in ${desk.area}`}
            fill
            sizes="300px"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#101014] via-black/15 to-black/20" />
          <div className="absolute top-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-black/55 px-2.5 py-1 text-[11px] font-medium text-cyber ring-1 ring-cyber/40 backdrop-blur-md">
            <span className="size-1.5 rounded-full bg-cyber" />
            {booked ? "You're in" : `${remaining} desk${remaining === 1 ? "" : "s"} left today`}
          </div>
          <div className="absolute right-3 bottom-3 left-3">
            <p className="text-[11px] tracking-[0.14em] text-white/65 uppercase">{desk.area}</p>
            <h3 className="text-[20px] leading-tight font-semibold tracking-[-0.04em]">{desk.name}</h3>
          </div>
        </motion.div>

        <div className="space-y-3 p-3">
          <div className="flex items-end justify-between gap-3">
            <span className="inline-flex items-center gap-1 rounded-full bg-ion/10 px-2 py-1 text-[11px] font-medium text-ion ring-1 ring-ion/25">
              <Wifi className="size-3" />
              {desk.wifi} Mbps
            </span>
            <p className="text-[22px] leading-none font-semibold tracking-[-0.04em] tabular-nums">
              {inr(price)}
            </p>
          </div>

          <div className="grid grid-cols-2 rounded-full bg-black/40 p-1 text-[12px] font-medium">
            {(["day", "week"] as const).map((key) => {
              const selected = pass === key;
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => setPass(key)}
                  className={cn(
                    "relative rounded-full py-1.5",
                    selected ? "text-canvas" : "text-white/55",
                  )}
                >
                  {selected ? (
                    <motion.span
                      layoutId={`pass-${desk.id}`}
                      className="absolute inset-0 rounded-full bg-cyber"
                      transition={spring}
                    />
                  ) : null}
                  <span className="relative">{key === "day" ? "Day pass" : "5-day"}</span>
                </button>
              );
            })}
          </div>

          <SlideToBook booked={booked} onComplete={onBook} />
        </div>
      </Glass>
    </article>
  );
}
