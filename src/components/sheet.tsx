"use client";

import { useEffect, useId, type ReactNode } from "react";
import { AnimatePresence, motion, useDragControls } from "framer-motion";

export function Sheet({
  open,
  onClose,
  title,
  children,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}) {
  const controls = useDragControls();
  const titleId = useId();

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open ? (
        <div className="absolute inset-0 z-40 flex items-end">
          <motion.button
            type="button"
            aria-label="Close dialog"
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            drag="y"
            dragControls={controls}
            dragListener={false}
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={{ top: 0.05, bottom: 0.5 }}
            onDragEnd={(_, info) => {
              if (info.offset.y > 72 || info.velocity.y > 700) onClose();
            }}
            initial={{ y: "110%" }}
            animate={{ y: 0 }}
            exit={{ y: "110%" }}
            transition={{ type: "spring", stiffness: 380, damping: 36 }}
            className="relative z-10 max-h-[88%] w-full overflow-y-auto rounded-t-[28px] border border-white/10 bg-[#121318]/95 pb-[max(1.25rem,env(safe-area-inset-bottom))] shadow-[0_-24px_80px_rgba(0,0,0,0.5)] backdrop-blur-xl"
          >
            <div
              onPointerDown={(event) => controls.start(event)}
              className="flex cursor-grab justify-center py-3 active:cursor-grabbing"
            >
              <div className="h-1 w-10 rounded-full bg-white/25" />
            </div>
            <div className="px-5 pb-4">
              <h2
                id={titleId}
                className="text-[28px] leading-none font-semibold tracking-[-0.045em]"
              >
                {title}
              </h2>
              <div className="mt-4">{children}</div>
            </div>
          </motion.div>
        </div>
      ) : null}
    </AnimatePresence>
  );
}
