"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Search, X } from "lucide-react";
import { pills, type PillId } from "@/lib/data";
import { cn, spring } from "@/lib/utils";

const placeholders: Record<PillId | "all", string> = {
  all: "Search desks, drops, people",
  hitech: "Search the HITEC City corridor",
  wifi: "Search spots above 150 Mbps",
  next: "Search Next.js devs",
};

export function Omnisearch({
  query,
  pill,
  focused,
  onQuery,
  onPill,
  onFocus,
  onBlur,
}: {
  query: string;
  pill: PillId | null;
  focused: boolean;
  onQuery: (value: string) => void;
  onPill: (pill: PillId | null) => void;
  onFocus: () => void;
  onBlur: () => void;
}) {
  const active = pills.find((item) => item.id === pill);
  const hint = active
    ? `Context · ${active.context}`
    : focused
      ? "Filtering the live feed as you type"
      : "";
  const expanded = focused || Boolean(pill) || Boolean(query);

  return (
    <div className="mt-5">
      <div className="relative">
        <div
          className={cn(
            "absolute inset-0 rounded-[22px] bg-gradient-to-r from-cyber via-ion to-volt transition-opacity duration-300",
            focused ? "opacity-100" : "opacity-0",
          )}
        />
        <div
          className={cn(
            "absolute inset-0 rounded-[22px] bg-white/15 transition-opacity duration-300",
            focused ? "opacity-0" : "opacity-100",
          )}
        />
        <motion.div
          animate={{ height: focused ? 58 : 48 }}
          transition={spring}
          className="relative m-px flex items-center gap-2 overflow-hidden rounded-[21px] bg-[#0c0c10]/92 px-3 backdrop-blur-md"
        >
          <Search className="size-4 shrink-0 text-white/45" />
          <input
            value={query}
            onChange={(event) => onQuery(event.target.value)}
            onFocus={onFocus}
            onBlur={onBlur}
            placeholder={placeholders[pill ?? "all"]}
            aria-label="Search Hyderabad Tech"
            enterKeyHint="search"
            className="h-full w-full bg-transparent text-[15px] tracking-tight text-white outline-none placeholder:text-white/35"
          />
          <AnimatePresence>
            {query ? (
              <motion.button
                type="button"
                aria-label="Clear search"
                initial={{ scale: 0.6, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.6, opacity: 0 }}
                whileTap={{ scale: 0.9 }}
                onMouseDown={(event) => event.preventDefault()}
                onClick={() => onQuery("")}
                className="grid size-7 place-items-center rounded-full bg-white/10 text-white/70"
              >
                <X className="size-3.5" />
              </motion.button>
            ) : null}
          </AnimatePresence>
        </motion.div>
      </div>

      <div
        className={cn(
          "grid transition-[grid-template-rows,opacity] duration-300 ease-out",
          expanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
        )}
      >
        <p className="overflow-hidden px-1 pt-2 text-[12px] tracking-tight text-white/45">
          {hint || " "}
        </p>
      </div>

      <div className="mt-3 flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {pills.map((item) => {
          const selected = pill === item.id;
          return (
            <motion.button
              key={item.id}
              type="button"
              aria-pressed={selected}
              onClick={() => onPill(selected ? null : item.id)}
              whileTap={{ scale: 0.94 }}
              className={cn(
                "relative shrink-0 rounded-full px-3 py-1.5 text-[13px] font-medium tracking-tight",
                selected ? "text-canvas" : "text-white/75 ring-1 ring-white/10",
              )}
            >
              {selected ? (
                <motion.span
                  layoutId="search-pill"
                  className="absolute inset-0 rounded-full bg-cyber"
                  transition={spring}
                />
              ) : (
                <span className="absolute inset-0 rounded-full bg-white/5" />
              )}
              <span className="relative">{item.label}</span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
