"use client";

import { useEffect, useRef, useState } from "react";
import { animate, motion, useMotionValue } from "framer-motion";
import { Check, ChevronRight } from "lucide-react";

export function SlideToBook({
  booked,
  onComplete,
  label = "Slide to book",
}: {
  booked: boolean;
  onComplete: () => void;
  label?: string;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const [max, setMax] = useState(0);
  const done = useRef(false);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const measure = () => setMax(Math.max(0, track.clientWidth - 48));
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(track);
    return () => observer.disconnect();
  }, [booked]);

  if (booked) {
    return (
      <motion.div
        initial={{ scale: 0.96, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="flex h-12 items-center justify-center gap-2 rounded-full bg-cyber text-sm font-semibold tracking-tight text-canvas"
      >
        <Check className="size-4" strokeWidth={2.6} />
        Pass locked
      </motion.div>
    );
  }

  return (
    <div
      ref={trackRef}
      className="relative h-12 overflow-hidden rounded-full bg-black/50 ring-1 ring-white/10 ring-inset"
    >
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center pl-8 text-[13px] font-medium tracking-tight text-white/55">
        {label}
      </div>
      <motion.div
        role="slider"
        tabIndex={0}
        aria-label={label}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={0}
        drag="x"
        dragConstraints={{ left: 0, right: max }}
        dragElastic={0.08}
        dragMomentum={false}
        style={{ x, touchAction: "none" }}
        onDragEnd={() => {
          if (done.current) return;
          if (max > 0 && x.get() > max * 0.82) {
            done.current = true;
            animate(x, max, { type: "spring", stiffness: 420, damping: 30 });
            onComplete();
            return;
          }
          animate(x, 0, { type: "spring", stiffness: 520, damping: 32 });
        }}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            if (!done.current) {
              done.current = true;
              onComplete();
            }
          }
        }}
        whileTap={{ scale: 0.94 }}
        className="absolute top-1 left-1 grid size-10 cursor-grab place-items-center rounded-full bg-cyber text-canvas shadow-[0_0_18px_rgba(214,255,74,0.45)] active:cursor-grabbing"
      >
        <ChevronRight className="size-5" strokeWidth={2.5} />
      </motion.div>
    </div>
  );
}
