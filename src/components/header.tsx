"use client";

import { motion } from "framer-motion";
import { Bell } from "lucide-react";
import { Logo } from "@/components/logo";

export function Header({
  unread,
  noticesOpen,
  onProfile,
  onNotices,
}: {
  unread: number;
  noticesOpen: boolean;
  onProfile: () => void;
  onNotices: () => void;
}) {
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
        <p className="pointer-events-none absolute inset-x-0 flex items-center justify-center gap-2 text-white">
          <Logo className="size-8 shrink-0" />
          <span className="text-[22px] leading-none font-bold tracking-[-0.055em]">tech</span>
        </p>
        <motion.button
          type="button"
          aria-label={unread > 0 ? `Notices, ${unread} unread` : "Notices"}
          aria-expanded={noticesOpen}
          onClick={onNotices}
          whileTap={{ scale: 0.9 }}
          className="relative z-10 grid size-10 place-items-center rounded-full bg-white/5 text-white ring-1 ring-white/10"
        >
          <Bell className="size-[18px]" strokeWidth={2} />
          {unread > 0 ? (
            <span className="absolute -top-1 -right-1 grid h-4 min-w-4 place-items-center rounded-full bg-cyber px-1 text-[10px] leading-none font-bold text-canvas tabular-nums">
              {unread}
            </span>
          ) : null}
        </motion.button>
      </div>
    </header>
  );
}
