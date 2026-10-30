"use client";

import { useRef, type ReactNode } from "react";
import { motion, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

export function MagneticButton({
  children,
  className,
  type = "button",
  disabled,
  onClick,
}: {
  children: ReactNode;
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
  onClick?: () => void;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useSpring(0, { stiffness: 260, damping: 18, mass: 0.4 });
  const y = useSpring(0, { stiffness: 260, damping: 18, mass: 0.4 });

  function onPointerMove(event: React.PointerEvent<HTMLButtonElement>) {
    if (disabled || event.pointerType === "touch") return;
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((event.clientX - (rect.left + rect.width / 2)) * 0.28);
    y.set((event.clientY - (rect.top + rect.height / 2)) * 0.36);
  }

  function reset() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.button
      ref={ref}
      type={type}
      disabled={disabled}
      style={{ x, y }}
      onPointerMove={onPointerMove}
      onPointerLeave={reset}
      onPointerCancel={reset}
      onClick={onClick}
      whileTap={{ scale: 0.97 }}
      className={cn(
        "inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-cyber text-[15px] font-semibold tracking-tight text-canvas disabled:cursor-not-allowed disabled:opacity-40",
        className,
      )}
    >
      {children}
    </motion.button>
  );
}
