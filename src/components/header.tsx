"use client";

import { motion } from "framer-motion";
import { Logo } from "@/components/logo";

export function Header({ onProfile }: { onProfile: () => void }) {
  return (
    <header className="sticky top-0 z-20 border-b border-white/5 bg-canvas/75 px-4 pt-[max(0.75rem,env(safe-area-inset-top))] pb-3 backdrop-blur-md">
      <div className="relative flex h-10 items-center justify-between">
        <motion.button
          type="button"
          aria-label="Open your profile"
          onClick={onProfile}
          whileTap={{ scale: 0.9 }}
          className="relative z-10 grid size-10 place-items-center rounded-full bg-gradient-to-br from-cyber to-ion text-sm font-bold text-canvas"
        >
          Y
          <span className="absolute -right-0.5 -bottom-0.5 size-3 rounded-full border-2 border-canvas bg-cyber" />
        </motion.button>
        <p className="pointer-events-none absolute inset-x-0 flex items-center justify-center gap-1.5 text-[15px] font-semibold tracking-[-0.04em]">
          <Logo className="size-9 shrink-0" />
          Hyderabad Tech
        </p>
        <span className="relative z-10 inline-flex items-center gap-1.5 rounded-full bg-white/5 px-2.5 py-1 text-[10px] font-semibold tracking-[0.16em] text-cyber uppercase ring-1 ring-cyber/30">
          <span className="relative flex size-1.5">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-cyber opacity-70 motion-reduce:hidden" />
            <span className="relative size-1.5 rounded-full bg-cyber" />
          </span>
          Live
        </span>
      </div>
    </header>
  );
}
