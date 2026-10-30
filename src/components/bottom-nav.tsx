"use client";

import { motion } from "framer-motion";
import { Compass, Plus, Radio, Users } from "lucide-react";
import type { TabId } from "@/lib/data";
import { cn, spring } from "@/lib/utils";

const tabs: { id: TabId; label: string; icon: typeof Radio }[] = [
  { id: "feed", label: "Feed", icon: Radio },
  { id: "places", label: "Places", icon: Compass },
  { id: "talents", label: "Talents", icon: Users },
];

export function BottomNav({
  tab,
  joinOpen,
  onTab,
  onJoin,
}: {
  tab: TabId;
  joinOpen: boolean;
  onTab: (tab: TabId) => void;
  onJoin: () => void;
}) {
  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 z-30 px-3 pb-[max(0.7rem,env(safe-area-inset-bottom))]">
      <nav
        aria-label="Primary"
        className="pointer-events-auto grid grid-cols-4 items-end rounded-[30px] border border-white/10 bg-white/[0.06] px-1.5 pt-1.5 pb-1.5 shadow-[0_12px_40px_rgba(0,0,0,0.45)] backdrop-blur-md"
      >
        {tabs.slice(0, 2).map((item) => (
          <DockTab key={item.id} item={item} active={tab === item.id} onTab={onTab} />
        ))}

        <div className="flex justify-center">
          <motion.button
            type="button"
            aria-label={joinOpen ? "Close join network" : "Join Network"}
            aria-expanded={joinOpen}
            onClick={onJoin}
            whileTap={{ scale: 0.9 }}
            className="-mt-7 grid size-14 place-items-center rounded-full bg-cyber text-canvas shadow-[0_10px_30px_rgba(214,255,74,0.38)]"
          >
            <motion.span animate={{ rotate: joinOpen ? 45 : 0 }} transition={spring}>
              <Plus className="size-7" strokeWidth={2.25} />
            </motion.span>
          </motion.button>
        </div>

        <DockTab item={tabs[2]} active={tab === "talents"} onTab={onTab} />
      </nav>
    </div>
  );
}

function DockTab({
  item,
  active,
  onTab,
}: {
  item: (typeof tabs)[number];
  active: boolean;
  onTab: (tab: TabId) => void;
}) {
  const Icon = item.icon;

  return (
    <motion.button
      type="button"
      aria-current={active ? "page" : undefined}
      onClick={() => onTab(item.id)}
      whileTap={{ scale: 0.86 }}
      className="relative flex min-w-14 flex-col items-center gap-1 rounded-2xl px-2 py-1.5"
    >
      {active ? (
        <motion.span
          layoutId="dock-pill"
          className="absolute inset-0 rounded-2xl bg-white/10"
          transition={spring}
        />
      ) : null}
      <Icon
        className={cn("relative size-[18px]", active ? "text-cyber" : "text-white/50")}
        strokeWidth={2}
      />
      <span
        className={cn(
          "relative text-[10px] font-medium tracking-tight",
          active ? "text-white" : "text-white/45",
        )}
      >
        {item.label}
      </span>
    </motion.button>
  );
}
