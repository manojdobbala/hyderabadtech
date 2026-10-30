"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Banknote, Building, Check, Radio, Send } from "lucide-react";
import Image from "next/image";
import { intents, notices, type Intent, type Notice, type Talent } from "@/lib/data";
import { MagneticButton } from "@/components/magnetic-button";
import { Sheet } from "@/components/sheet";
import { WorkPreview } from "@/components/talent-showcase";
import { cn } from "@/lib/utils";

const fieldClass =
  "w-full rounded-2xl bg-white/5 px-3 text-[15px] text-white outline-none ring-1 ring-white/10 placeholder:text-white/35 focus:ring-cyber/70";

export function JoinSheet({
  open,
  joined,
  onClose,
  onJoin,
}: {
  open: boolean;
  joined: { name: string; intent: Intent } | null;
  onClose: () => void;
  onJoin: (profile: { name: string; intent: Intent }) => void;
}) {
  return (
    <Sheet open={open} onClose={onClose} title={joined ? "You're in" : "Join the network"}>
      {joined ? (
        <Success
          title={`${joined.name.split(" ")[0]}, you're on the list.`}
          body={`We'll ping you for ${joined.intent.toLowerCase()} drops across Hyderabad.`}
        />
      ) : open ? (
        <JoinForm onJoin={onJoin} />
      ) : null}
    </Sheet>
  );
}

function JoinForm({ onJoin }: { onJoin: (profile: { name: string; intent: Intent }) => void }) {
  const [name, setName] = useState("");
  const [intent, setIntent] = useState<Intent>("Building");

  return (
        <form
          className="space-y-4"
          onSubmit={(event) => {
            event.preventDefault();
            const trimmed = name.trim();
            if (trimmed.length < 2) return;
            onJoin({ name: trimmed, intent });
          }}
        >
          <p className="text-[14px] leading-5 text-white/60">
            Funding pings, desk drops, and intros. One corridor, no feed noise.
          </p>
          <label className="block">
            <span className="mb-1.5 block text-[12px] tracking-wide text-white/45">Name</span>
            <input
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="What should we call you?"
              className={cn(fieldClass, "h-12")}
              autoComplete="name"
            />
          </label>
          <div>
            <p className="mb-1.5 text-[12px] tracking-wide text-white/45">Here for</p>
            <div className="grid grid-cols-2 gap-2">
              {intents.map((item) => {
                const selected = intent === item;
                return (
                  <button
                    key={item}
                    type="button"
                    aria-pressed={selected}
                    onClick={() => setIntent(item)}
                    className={cn(
                      "h-11 rounded-2xl text-[14px] font-medium tracking-tight ring-1",
                      selected
                        ? "bg-cyber text-canvas ring-cyber"
                        : "bg-white/5 text-white/75 ring-white/10",
                    )}
                  >
                    {item}
                  </button>
                );
              })}
            </div>
          </div>
          <MagneticButton type="submit" disabled={name.trim().length < 2}>
            Request access
          </MagneticButton>
        </form>
  );
}

export function ConnectSheet({
  talent,
  onClose,
}: {
  talent: Talent | null;
  onClose: () => void;
}) {
  return (
    <Sheet open={Boolean(talent)} onClose={onClose} title={talent?.name ?? "Connect"}>
      {talent ? <ConnectForm key={talent.id} talent={talent} /> : null}
    </Sheet>
  );
}

function ConnectForm({ talent }: { talent: Talent }) {
  const [note, setNote] = useState("");
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <Success
        title="Intro queued."
        body={`${talent.name.split(" ")[0]} gets this on Hyderabad Tech.`}
      />
    );
  }

  return (
        <form
          className="space-y-4"
          onSubmit={(event) => {
            event.preventDefault();
            setSent(true);
          }}
        >
          <div className="flex items-center gap-3">
            <div className="relative size-12 overflow-hidden rounded-2xl ring-1 ring-white/15">
              <Image src={talent.image} alt="" fill sizes="48px" className="object-cover" />
            </div>
            <div>
              <p className="text-[14px] font-medium">{talent.role}</p>
              <p className="text-[12px] text-white/50">
                {talent.area} · {talent.rate}
              </p>
            </div>
          </div>
          <p className="text-[14px] leading-5 text-white/65">{talent.signal}</p>
          <WorkPreview kind={talent.preview} />
          <label className="block">
            <span className="mb-1.5 block text-[12px] tracking-wide text-white/45">Note</span>
            <textarea
              value={note}
              onChange={(event) => setNote(event.target.value)}
              placeholder="What are you shipping?"
              rows={3}
              className={cn(fieldClass, "resize-none py-3")}
            />
          </label>
          <MagneticButton type="submit">
            <Send className="size-4" />
            Send intro
          </MagneticButton>
        </form>
  );
}

export function ProfileSheet({
  open,
  joined,
  onClose,
  onJoin,
}: {
  open: boolean;
  joined: { name: string; intent: Intent } | null;
  onClose: () => void;
  onJoin: () => void;
}) {
  return (
    <Sheet open={open} onClose={onClose} title={joined ? joined.name : "Your signal"}>
      <div className="flex items-center gap-3">
        <div className="grid size-14 place-items-center rounded-2xl bg-gradient-to-br from-cyber to-ion text-lg font-bold text-canvas">
          {(joined?.name ?? "Y").slice(0, 1).toUpperCase()}
        </div>
        <div>
          <p className="text-[14px] font-medium">{joined ? joined.intent : "Guest"}</p>
          <p className="text-[12px] text-white/50">
            {joined ? "On the Hyderabad Tech list" : "Browsing the corridor"}
          </p>
        </div>
      </div>
      {joined ? (
        <p className="mt-4 text-[14px] leading-5 text-white/60">
          Desk drops and intros land here. The live feed stays one swipe away.
        </p>
      ) : (
        <div className="mt-5">
          <MagneticButton
            onClick={() => {
              onClose();
              onJoin();
            }}
          >
            Join the network
          </MagneticButton>
        </div>
      )}
    </Sheet>
  );
}

const noticeMeta = {
  funding: { label: "Funding", icon: Banknote, tone: "bg-cyber/15 text-cyber" },
  workspace: { label: "Workspace", icon: Building, tone: "bg-ion/15 text-ion" },
  update: { label: "Update", icon: Radio, tone: "bg-volt/20 text-volt" },
} as const;

export function NoticesSheet({
  open,
  read,
  onClose,
  onOpen,
  onReadAll,
}: {
  open: boolean;
  read: Record<string, boolean>;
  onClose: () => void;
  onOpen: (notice: Notice) => void;
  onReadAll: () => void;
}) {
  const unread = notices.filter((notice) => !read[notice.id]).length;

  return (
    <Sheet open={open} onClose={onClose} title="Notices">
      <div className="mb-3 flex items-center justify-between gap-3">
        <p className="text-[14px] leading-5 text-white/55">
          Funding, open desks, and corridor updates.
        </p>
        {unread > 0 ? (
          <button
            type="button"
            onClick={onReadAll}
            className="shrink-0 text-[13px] font-medium text-cyber"
          >
            Mark all read
          </button>
        ) : null}
      </div>
      <ul className="space-y-2">
        {notices.map((notice) => {
          const meta = noticeMeta[notice.kind];
          const Icon = meta.icon;
          const seen = Boolean(read[notice.id]);

          return (
            <li key={notice.id}>
              <button
                type="button"
                onClick={() => onOpen(notice)}
                className={cn(
                  "flex w-full items-start gap-3 rounded-2xl px-3 py-3 text-left ring-1",
                  seen ? "bg-white/[0.03] ring-white/8" : "bg-white/[0.06] ring-white/12",
                )}
              >
                <span className={cn("grid size-10 shrink-0 place-items-center rounded-xl", meta.tone)}>
                  <Icon className="size-4" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="flex items-center justify-between gap-3">
                    <span className="text-[10px] font-semibold tracking-[0.16em] text-white/40 uppercase">
                      {meta.label}
                    </span>
                    <span className="text-[11px] text-white/40">{notice.meta}</span>
                  </span>
                  <span className="mt-1 block text-[15px] font-semibold tracking-tight">
                    {notice.title}
                  </span>
                  <span className="mt-0.5 block text-[13px] leading-5 text-white/58">
                    {notice.detail}
                  </span>
                </span>
                {seen ? null : (
                  <span className="mt-1 size-2 shrink-0 rounded-full bg-cyber" aria-hidden />
                )}
              </button>
            </li>
          );
        })}
      </ul>
    </Sheet>
  );
}

function Success({ title, body }: { title: string; body: string }) {
  return (
    <div className="py-6 text-center">
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 420, damping: 18 }}
        className="mx-auto grid size-14 place-items-center rounded-full bg-cyber text-canvas"
      >
        <Check className="size-6" strokeWidth={2.6} />
      </motion.div>
      <AnimatePresence>
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 text-[18px] font-semibold tracking-tight"
        >
          {title}
        </motion.p>
      </AnimatePresence>
      <p className="mt-1 text-[14px] text-white/55">{body}</p>
    </div>
  );
}
