import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Glass({
  children,
  className,
  innerClassName,
}: {
  children: ReactNode;
  className?: string;
  innerClassName?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-[24px] bg-gradient-to-br from-white/30 via-white/10 to-ion/30 p-px",
        className,
      )}
    >
      <div
        className={cn(
          "h-full rounded-[23px] bg-[#101014]/80 shadow-[inset_0_1px_0_rgba(255,255,255,0.07)] backdrop-blur-md",
          innerClassName,
        )}
      >
        {children}
      </div>
    </div>
  );
}
