"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MapPin } from "lucide-react";
import type { Cafe } from "@/lib/data";
import { Glass } from "@/components/glass";
import { SectionLabel } from "@/components/tech-pulse";
import { cn, spring } from "@/lib/utils";
import Image from "next/image";

export function WorkfromWidget({ cafes }: { cafes: Cafe[] }) {
  const [cursor, setCursor] = useState(0);
  const [direction, setDirection] = useState(1);

  if (cafes.length === 0) return null;

  const index = Math.min(cursor, cafes.length - 1);
  const cafe = cafes[index];

  function go(next: number) {
    setDirection(next > index ? 1 : -1);
    setCursor(next);
  }

  return (
    <section>
      <SectionLabel eyebrow="Remote spot" title="Where the Wi-Fi is" count={cafes.length} />
      <AnimatePresence mode="popLayout" initial={false} custom={direction}>
        <motion.div
          key={cafe.id}
          custom={direction}
          variants={{
            enter: (dir: number) => ({ x: dir * 36, opacity: 0 }),
            center: { x: 0, opacity: 1 },
            exit: (dir: number) => ({ x: dir * -36, opacity: 0 }),
          }}
          initial="enter"
          animate="center"
          exit="exit"
          transition={spring}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.28}
          dragDirectionLock
          dragSnapToOrigin
          onDragEnd={(_, info) => {
            if (info.offset.x <= -48 && index < cafes.length - 1) go(index + 1);
            if (info.offset.x >= 48 && index > 0) go(index - 1);
          }}
          style={{ touchAction: "pan-y" }}
        >
          <Glass innerClassName="overflow-hidden">
            <div className="relative h-44">
              <Image
                src={cafe.image}
                alt={`${cafe.name} in ${cafe.area}`}
                fill
                priority={index === 0}
                sizes="440px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#101014] via-black/20 to-black/10" />
              <div className="absolute top-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-black/55 px-2.5 py-1 text-[11px] font-medium ring-1 ring-cyber/40 backdrop-blur-md">
                <span className="relative flex size-1.5">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-cyber opacity-70 motion-reduce:hidden" />
                  <span className="relative size-1.5 rounded-full bg-cyber" />
                </span>
                {cafe.workers} remote now
              </div>
              <div className="absolute right-3 bottom-3 left-3">
                <p className="flex items-center gap-1 text-[11px] tracking-[0.14em] text-white/70 uppercase">
                  <MapPin className="size-3" />
                  {cafe.area}
                </p>
                <h3 className="mt-1 text-[26px] leading-none font-semibold tracking-[-0.045em]">
                  {cafe.name}
                </h3>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 p-3">
              <WifiMeter mbps={cafe.wifi} />
              <PowerGrid outlets={cafe.outlets} />
              <VibeMeter label={cafe.vibe} score={cafe.vibeScore} />
            </div>
          </Glass>
        </motion.div>
      </AnimatePresence>

      {cafes.length > 1 ? (
        <div className="mt-3 flex items-center justify-center gap-1.5" role="tablist" aria-label="Cafes">
          {cafes.map((item, dot) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={dot === index}
              aria-label={item.name}
              onClick={() => go(dot)}
              className="grid h-5 place-items-center px-0.5"
            >
              <motion.span
                layout
                className={cn(
                  "block h-1.5 rounded-full",
                  dot === index ? "w-5 bg-cyber" : "w-1.5 bg-white/25",
                )}
              />
            </button>
          ))}
        </div>
      ) : null}
    </section>
  );
}

function WifiMeter({ mbps }: { mbps: number }) {
  const pct = Math.max(8, Math.min(100, (mbps / 300) * 100));

  return (
    <div className="rounded-2xl bg-black/40 p-3 ring-1 ring-white/10">
      <p className="text-[10px] font-medium tracking-[0.16em] text-white/40 uppercase">Wi-Fi</p>
      <p className="mt-1 text-[22px] leading-none font-semibold tracking-[-0.04em] text-ion tabular-nums">
        {mbps}
        <span className="ml-1 text-[11px] font-medium tracking-normal text-white/45">Mbps</span>
      </p>
      <div className="relative mt-3 h-4">
        <div className="absolute inset-x-0 top-[6px] h-1.5 rounded-full bg-white/10" />
        <motion.div
          className="absolute top-[6px] left-0 h-1.5 rounded-full bg-gradient-to-r from-ion to-cyber shadow-[0_0_12px_rgba(62,224,255,0.8)]"
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={spring}
        />
        <span className="absolute top-1 left-1/2 h-3 w-px -translate-x-1/2 bg-white/35" />
        <motion.span
          className="absolute top-0 size-4 rounded-full border border-white/70 bg-white shadow-[0_0_14px_#3EE0FF]"
          initial={{ left: 0 }}
          animate={{ left: `calc(${pct}% - 8px)` }}
          transition={spring}
        />
      </div>
    </div>
  );
}

function PowerGrid({ outlets }: { outlets: number }) {
  return (
    <div className="rounded-2xl bg-black/40 p-3 ring-1 ring-white/10">
      <p className="text-[10px] font-medium tracking-[0.16em] text-white/40 uppercase">Power grid</p>
      <p className="mt-1 text-[22px] leading-none font-semibold tracking-[-0.04em] tabular-nums">
        {outlets}
        <span className="ml-1 text-[11px] font-medium tracking-normal text-white/45">/ 10</span>
      </p>
      <div className="mt-3 grid grid-cols-5 gap-1.5" aria-label={`${outlets} of 10 outlets live`}>
        {Array.from({ length: 10 }, (_, cell) => {
          const live = cell < outlets;
          return (
            <motion.span
              key={cell}
              initial={{ opacity: 0.2, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ ...spring, delay: cell * 0.025 }}
              className={cn(
                "h-2 rounded-full",
                live ? "bg-ion shadow-[0_0_10px_#3EE0FF]" : "bg-white/10",
              )}
            />
          );
        })}
      </div>
    </div>
  );
}

function VibeMeter({ label, score }: { label: string; score: number }) {
  return (
    <div className="col-span-2 rounded-2xl bg-black/40 p-3 ring-1 ring-white/10">
      <div className="flex items-center justify-between">
        <p className="text-[10px] font-medium tracking-[0.16em] text-white/40 uppercase">Vibe meter</p>
        <p className="text-[10px] tracking-[0.14em] text-white/35 uppercase">Quiet — Loud</p>
      </div>
      <div className="relative mt-3 h-4">
        <div className="absolute inset-x-0 top-[6px] h-1.5 rounded-full bg-white/10" />
        <motion.div
          className="absolute top-[6px] left-0 h-1.5 rounded-full bg-gradient-to-r from-volt to-cyber"
          initial={{ width: 0 }}
          animate={{ width: `${score}%` }}
          transition={spring}
        />
        <motion.span
          className="absolute top-0 size-4 rounded-full bg-white shadow-[0_0_14px_#D6FF4A]"
          initial={{ left: 0 }}
          animate={{ left: `calc(${score}% - 8px)` }}
          transition={spring}
        />
      </div>
      <p className="mt-2 text-[15px] font-medium tracking-tight">{label}</p>
    </div>
  );
}
