"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, MotionConfig } from "framer-motion";
import {
  cafes,
  desks,
  matches,
  pills,
  notices,
  pulse,
  talents,
  type Intent,
  type PillId,
  type TabId,
  type Talent,
} from "@/lib/data";
import { BottomNav } from "@/components/bottom-nav";
import { ConnectSheet, JoinSheet, NoticesSheet, ProfileSheet } from "@/components/drawers";
import { Header } from "@/components/header";
import { Omnisearch } from "@/components/omnisearch";
import { TalentShowcase } from "@/components/talent-showcase";
import { TechPulse } from "@/components/tech-pulse";
import { WorkfromWidget } from "@/components/workfrom-widget";
import { WorkspaceCarousel } from "@/components/workspace-carousel";
import { Glass } from "@/components/glass";
import { spring } from "@/lib/utils";

const headlines: Record<TabId, { lead: string; accent: string; dek: string; stack: boolean }> = {
  feed: {
    lead: "The corridor,",
    accent: "right now.",
    dek: "Funding, fast desks, and people shipping from the corridor.",
    stack: true,
  },
  places: {
    lead: "Desks with signal,",
    accent: "not small talk.",
    dek: "Live Wi-Fi, outlet maps, and day passes around HITEC City.",
    stack: false,
  },
  talents: {
    lead: "Portfolios first.",
    accent: "Intros second.",
    dek: "Builders and designers you can tap, not a résumé pile.",
    stack: false,
  },
};

export function AppShell() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [tab, setTab] = useState<TabId>("feed");
  const [pill, setPill] = useState<PillId | null>(null);
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);
  const [joinOpen, setJoinOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [noticesOpen, setNoticesOpen] = useState(false);
  const [readNotices, setReadNotices] = useState<Record<string, boolean>>({});
  const [talent, setTalent] = useState<Talent | null>(null);
  const [booked, setBooked] = useState<Record<string, boolean>>({});
  const [joined, setJoined] = useState<{ name: string; intent: Intent } | null>(null);

  const filters = useMemo(() => ({ pill, query }), [pill, query]);
  const visiblePulse = pulse.filter((item) => matches(item.tags, item.search, filters));
  const visibleCafes = cafes.filter((item) => matches(item.tags, item.search, filters));
  const visibleDesks = desks.filter((item) => matches(item.tags, item.search, filters));
  const visibleTalent = talents.filter((item) => matches(item.tags, item.search, filters));

  const showPulse = tab === "feed";
  const showPlaces = tab === "feed" || tab === "places";
  const showTalent = tab === "feed" || tab === "talents";

  const visibleCount =
    (showPulse ? visiblePulse.length : 0) +
    (showPlaces ? visibleCafes.length + visibleDesks.length : 0) +
    (showTalent ? visibleTalent.length : 0);

  useEffect(() => {
    scrollerRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  }, [tab]);

  const copy = headlines[tab];

  const unread = notices.filter((notice) => !readNotices[notice.id]).length;

  function closeOverlays() {
    setJoinOpen(false);
    setProfileOpen(false);
    setTalent(null);
    setNoticesOpen(false);
  }

  function openJoin() {
    setProfileOpen(false);
    setTalent(null);
    setNoticesOpen(false);
    setJoinOpen(true);
  }

  return (
    <MotionConfig reducedMotion="user" transition={spring}>
      <div className="relative flex h-dvh justify-center overflow-hidden bg-canvas text-white sm:items-center">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-[-8%] left-1/2 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-volt/20 blur-3xl" />
          <div className="absolute top-1/3 -left-20 h-64 w-64 rounded-full bg-ion/10 blur-3xl" />
          <div className="absolute right-[-4%] bottom-[12%] h-72 w-72 rounded-full bg-cyber/10 blur-3xl" />
        </div>

        <div className="relative h-dvh w-full max-w-[440px] overflow-hidden bg-canvas sm:h-[min(940px,calc(100dvh-2rem))] sm:rounded-[36px] sm:border sm:border-white/10 sm:shadow-[0_40px_120px_rgba(0,0,0,0.55)]">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -top-16 left-1/2 h-56 w-56 -translate-x-1/2 rounded-full bg-volt/25 blur-3xl" />
            <div className="absolute top-[38%] -right-16 h-48 w-48 rounded-full bg-ion/15 blur-3xl" />
          </div>

          <div ref={scrollerRef} className="scroller relative z-10 h-full overflow-y-auto">
            <Header
              unread={unread}
              noticesOpen={noticesOpen}
              onProfile={() => {
                setJoinOpen(false);
                setTalent(null);
                setNoticesOpen(false);
                setProfileOpen(true);
              }}
              onNotices={() => {
                if (noticesOpen) {
                  setNoticesOpen(false);
                  return;
                }
                setJoinOpen(false);
                setProfileOpen(false);
                setTalent(null);
                setNoticesOpen(true);
              }}
            />
            <main className="px-4 pt-5 pb-32">
              <AnimatePresence mode="wait">
                <motion.div
                  key={tab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                >
                  <h1 className="text-[clamp(32px,8.6vw,40px)] leading-[0.94] font-semibold tracking-[-0.05em]">
                    {copy.lead}{" "}
                    <span
                      className={
                        copy.stack
                          ? "mt-1 block bg-gradient-to-r from-cyber via-ion to-volt bg-clip-text text-transparent"
                          : "bg-gradient-to-r from-cyber via-ion to-volt bg-clip-text text-transparent"
                      }
                    >
                      {copy.accent}
                    </span>
                  </h1>
                  <p className="mt-3 max-w-[34ch] text-[15px] leading-6 text-white/60">{copy.dek}</p>
                </motion.div>
              </AnimatePresence>

              <Omnisearch
                query={query}
                pill={pill}
                focused={focused}
                onQuery={setQuery}
                onPill={setPill}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
              />

              {visibleCount === 0 ? (
                <div className="mt-8">
                  <Glass>
                    <div className="px-4 py-8 text-center">
                      <p className="text-[18px] font-semibold tracking-tight">No signal on that filter.</p>
                      <button
                        type="button"
                        onClick={() => {
                          setPill(null);
                          setQuery("");
                        }}
                        className="mt-3 text-[14px] font-medium text-cyber"
                      >
                        Clear {pills.find((item) => item.id === pill)?.label ?? "search"}
                      </button>
                    </div>
                  </Glass>
                </div>
              ) : (
                <div className="mt-8 space-y-8">
                  {showPulse ? <TechPulse items={visiblePulse} /> : null}
                  {showPlaces ? (
                    <WorkfromWidget
                      key={`${pill ?? "all"}-${query}`}
                      cafes={visibleCafes}
                    />
                  ) : null}
                  {showPlaces ? (
                    <WorkspaceCarousel
                      desks={visibleDesks}
                      booked={booked}
                      onBook={(id) => setBooked((current) => ({ ...current, [id]: true }))}
                    />
                  ) : null}
                  {showTalent ? (
                    <TalentShowcase
                      talents={visibleTalent}
                      onConnect={(next) => {
                        setJoinOpen(false);
                        setProfileOpen(false);
                        setTalent(next);
                      }}
                    />
                  ) : null}
                </div>
              )}
            </main>
          </div>

          <BottomNav
            tab={tab}
            joinOpen={joinOpen}
            onTab={(next) => {
              closeOverlays();
              setTab(next);
            }}
            onJoin={() => {
              if (joinOpen) {
                setJoinOpen(false);
                return;
              }
              openJoin();
            }}
          />

          <JoinSheet
            open={joinOpen}
            joined={joined}
            onClose={() => setJoinOpen(false)}
            onJoin={(profile) => setJoined(profile)}
          />
          <ConnectSheet talent={talent} onClose={() => setTalent(null)} />
          <ProfileSheet
            open={profileOpen}
            joined={joined}
            onClose={() => setProfileOpen(false)}
            onJoin={openJoin}
          />
          <NoticesSheet
            open={noticesOpen}
            read={readNotices}
            onClose={() => setNoticesOpen(false)}
            onReadAll={() =>
              setReadNotices(Object.fromEntries(notices.map((notice) => [notice.id, true])))
            }
            onOpen={(notice) => {
              setReadNotices((current) => ({ ...current, [notice.id]: true }));
              setNoticesOpen(false);
              setTab(notice.tab);
            }}
          />
        </div>
      </div>
    </MotionConfig>
  );
}
