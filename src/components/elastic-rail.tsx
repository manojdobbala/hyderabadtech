"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function ElasticRail({
  children,
  className,
  label,
}: {
  children: ReactNode;
  className?: string;
  label: string;
}) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [travel, setTravel] = useState(0);

  useEffect(() => {
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!viewport || !track) return;

    const measure = () => {
      setTravel(Math.max(0, track.scrollWidth - viewport.clientWidth));
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(viewport);
    observer.observe(track);
    return () => observer.disconnect();
  }, [children]);

  return (
    <div
      ref={viewportRef}
      role="region"
      aria-label={label}
      aria-roledescription="carousel"
      className={cn(
        "overflow-hidden [mask-image:linear-gradient(to_right,black_0%,black_90%,transparent_100%)]",
        className,
      )}
    >
      <motion.div
        ref={trackRef}
        drag="x"
        dragConstraints={{ left: -travel, right: 0 }}
        dragElastic={0.18}
        dragDirectionLock
        dragTransition={{ bounceStiffness: 460, bounceDamping: 28 }}
        className="flex w-max cursor-grab select-none gap-3 px-4 active:cursor-grabbing"
        style={{ touchAction: "pan-y" }}
      >
        {children}
      </motion.div>
    </div>
  );
}
