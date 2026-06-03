"use client";

import { useState, useEffect, useCallback, createContext, useContext, type ReactNode } from "react";

/* ─────────────────────────────────────────────────────────────
   XpNotification — Animated flying XP toast
   Shows +XP amount with a rank-up animation when threshold
   is crossed. Designed to be used in sandbox, dashboard,
   and progression page.
   ───────────────────────────────────────────────────────────── */

interface XpEvent {
  id: string;
  amount: number;
  source: string;
  newRank?: string;
  rankTitle?: string;
  timestamp: number;
}

interface XpNotificationContextValue {
  push: (event: Omit<XpEvent, "id" | "timestamp">) => void;
}

const XpNotificationContext = createContext<XpNotificationContextValue>({
  push: () => {},
});

export function useXpNotification() {
  return useContext(XpNotificationContext);
}

/* ─────────────────────────────────────────────────────────────
   Provider — wraps app to enable XP toasts anywhere
   ───────────────────────────────────────────────────────────── */

export function XpNotificationProvider({ children }: { children: ReactNode }) {
  const [events, setEvents] = useState<XpEvent[]>([]);

  const push = useCallback((event: Omit<XpEvent, "id" | "timestamp">) => {
    const id = `xp-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
    setEvents((prev) => [...prev, { ...event, id, timestamp: Date.now() }]);
  }, []);

  const dismiss = useCallback((id: string) => {
    setEvents((prev) => prev.filter((e) => e.id !== id));
  }, []);

  return (
    <XpNotificationContext.Provider value={{ push }}>
      {children}

      {/* Toast container — fixed bottom-right */}
      <div className="fixed bottom-6 right-6 z-[9999] flex flex-col gap-3 pointer-events-none">
        {events.map((event) => (
          <XpToast key={event.id} event={event} onDismiss={dismiss} />
        ))}
      </div>
    </XpNotificationContext.Provider>
  );
}

/* ─────────────────────────────────────────────────────────────
   Toast component — animated fly-up + fade
   ───────────────────────────────────────────────────────────── */

function XpToast({ event, onDismiss }: { event: XpEvent; onDismiss: (id: string) => void }) {
  const [visible, setVisible] = useState(false);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    // Animate in after mount
    const inTimer = requestAnimationFrame(() => setVisible(true));

    // Auto-dismiss after 4s
    const outTimer = setTimeout(() => {
      setExiting(true);
      setTimeout(() => onDismiss(event.id), 400); // wait for exit animation
    }, 4000);

    return () => {
      cancelAnimationFrame(inTimer);
      clearTimeout(outTimer);
    };
  }, [event.id, onDismiss]);

  const isRankUp = !!event.newRank;

  return (
    <div
      className={`pointer-events-auto transition-all duration-400 ease-out ${
        visible && !exiting
          ? "translate-y-0 opacity-100"
          : "translate-y-4 opacity-0"
      }`}
    >
      <div
        className={`relative overflow-hidden rounded-xl border shadow-2xl ${
          isRankUp
            ? "bg-gradient-to-br from-purple-600/90 via-purple-700/80 to-cyan-600/70 border-yellow-400/40"
            : "bg-gradient-to-br from-gray-800/95 to-gray-900/95 border-cyan-500/20"
        } backdrop-blur-lg px-5 py-4 min-w-[260px] max-w-[340px]`}
      >
        {/* Ambient glow */}
        <div
          className={`absolute inset-0 opacity-20 blur-2xl ${
            isRankUp ? "bg-yellow-400/30" : "bg-cyan-400/20"
          }`}
        />

        {/* Sparkle particles for rank-up */}
        {isRankUp && (
          <div className="absolute inset-0 overflow-hidden">
            {Array.from({ length: 6 }).map((_, i) => (
              <span
                key={i}
                className="absolute w-1 h-1 bg-yellow-300 rounded-full animate-ping"
                style={{
                  left: `${20 + Math.random() * 60}%`,
                  top: `${10 + Math.random() * 80}%`,
                  animationDelay: `${i * 0.2}s`,
                  animationDuration: `${0.6 + Math.random() * 0.6}s`,
                }}
              />
            ))}
          </div>
        )}

        {/* Content */}
        <div className="relative z-10 flex items-start gap-3">
          {/* Icon */}
          <div className="shrink-0 w-10 h-10 rounded-full flex items-center justify-center bg-white/10 text-lg">
            {isRankUp ? "🏆" : "✨"}
          </div>

          <div className="flex-1 min-w-0">
            {/* XP amount */}
            <div className="flex items-baseline gap-1.5">
              <span className={`text-lg font-bold tabular-nums ${isRankUp ? "text-yellow-300" : "text-cyan-300"}`}>
                +{event.amount} XP
              </span>
              {!isRankUp && (
                <span className="text-[10px] text-white/30 font-medium">{event.source}</span>
              )}
            </div>

            {/* Rank-up message */}
            {isRankUp && (
              <div className="mt-1">
                <span className="text-xs text-yellow-200/80 font-semibold">
                  RANK UP!
                </span>
                <p className="text-sm text-white/90 font-bold">
                  {event.newRank} — {event.rankTitle}
                </p>
                <p className="text-[10px] text-white/50 mt-0.5">
                  {event.source}
                </p>
              </div>
            )}

            {/* XP bar micro-animation */}
            {isRankUp && (
              <div className="mt-2 h-1.5 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full w-full bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full animate-pulse" />
              </div>
            )}
          </div>

          {/* Dismiss hint */}
          <button
            onClick={() => {
              setExiting(true);
              setTimeout(() => onDismiss(event.id), 400);
            }}
            className="shrink-0 w-5 h-5 rounded-full bg-white/5 hover:bg-white/20 flex items-center justify-center text-[10px] text-white/30 hover:text-white/70 transition-all"
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  );
}
