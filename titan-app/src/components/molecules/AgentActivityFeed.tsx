"use client";

import { useCallback, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCheck, Trash2, Sparkles, Zap, Brain, Target, Trophy, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { loadFeed, saveFeed } from "@/lib/persistence";
import type { FeedEntry } from "@/lib/persistence";
import { cn } from "@/lib/utils";

// ─── Type colour map ─────────────────────────────────────────────────────

const TYPE_STYLES: Record<FeedEntry["type"], { border: string; bg: string; dot: string; icon: React.ReactNode }> = {
  levelup: {
    border: "border-l-amber-500",
    bg: "bg-amber-500/10",
    dot: "bg-amber-500",
    icon: <Zap className="h-3.5 w-3.5 text-amber-400" />,
  },
  achievement: {
    border: "border-l-purple-500",
    bg: "bg-purple-500/10",
    dot: "bg-purple-500",
    icon: <Trophy className="h-3.5 w-3.5 text-purple-400" />,
  },
  task: {
    border: "border-l-teal-500",
    bg: "bg-teal-500/10",
    dot: "bg-teal-500",
    icon: <Target className="h-3.5 w-3.5 text-teal-400" />,
  },
  insight: {
    border: "border-l-blue-500",
    bg: "bg-blue-500/10",
    dot: "bg-blue-500",
    icon: <Brain className="h-3.5 w-3.5 text-blue-400" />,
  },
};

// ─── Relative time helper ─────────────────────────────────────────────────

function relativeTime(timeStr: string): string {
  const now = Date.now();
  const then = new Date(timeStr).getTime();
  if (isNaN(then)) return "just now";
  const diffMs = now - then;
  const seconds = Math.floor(diffMs / 1000);
  if (seconds < 60) return "just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  return new Date(timeStr).toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

// ─── Default avatar based on type ────────────────────────────────────────

function avatarForEntry(entry: FeedEntry): string {
  if (entry.avatar) return entry.avatar;
  const defaults: Record<FeedEntry["type"], string> = {
    levelup: "⚡",
    achievement: "🏆",
    task: "🎯",
    insight: "🧠",
  };
  return defaults[entry.type] ?? "🤖";
}

// ─── Component ───────────────────────────────────────────────────────────

interface AgentActivityFeedProps {
  /** Optional feed override; defaults to loadFeed() */
  entries?: FeedEntry[];
  /** Called when feed is changed (mark-all-read / clear) */
  onFeedChange?: (entries: FeedEntry[]) => void;
  /** Max entries to display */
  maxEntries?: number;
}

export default function AgentActivityFeed({
  entries: externalEntries,
  onFeedChange,
  maxEntries = 10,
}: AgentActivityFeedProps) {
  const [internalEntries, setInternalEntries] = useState<FeedEntry[]>(() => {
    if (externalEntries) return externalEntries.slice(0, maxEntries);
    return loadFeed().slice(0, maxEntries);
  });
  const [showClearDialog, setShowClearDialog] = useState(false);

  // Use external control if provided
  const feed = externalEntries ?? internalEntries;
  const updateFeed = useCallback(
    (newFeed: FeedEntry[]) => {
      const capped = newFeed.slice(0, maxEntries);
      if (onFeedChange) {
        onFeedChange(capped);
      } else {
        setInternalEntries(capped);
      }
      saveFeed(capped);
    },
    [maxEntries, onFeedChange],
  );

  const unreadCount = useMemo(() => feed.filter((e) => !e.read).length, [feed]);

  const handleMarkAllRead = useCallback(() => {
    const updated = feed.map((e) => ({ ...e, read: true }));
    updateFeed(updated);
  }, [feed, updateFeed]);

  const handleClearFeed = useCallback(() => {
    setShowClearDialog(false);
    updateFeed([]);
  }, [updateFeed]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="rounded-xl border border-white/5 bg-[#0F172A]/80 backdrop-blur-md shadow-lg overflow-hidden"
    >
      {/* ── Header ───────────────────────────────────────────────────── */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/5">
        <div className="flex items-center gap-2">
          <Activity className="h-4 w-4 text-teal-400" />
          <span className="text-sm font-semibold text-[#F1F5F9] tracking-wide">Agent Activity</span>
          {unreadCount > 0 && (
            <span className="inline-flex items-center justify-center h-5 min-w-[20px] px-1.5 rounded-full bg-teal-500/20 text-[10px] font-bold text-teal-400">
              {unreadCount}
            </span>
          )}
        </div>

        <div className="flex items-center gap-1.5">
          {unreadCount > 0 && (
            <Button
              variant="ghost"
              size="xs"
              onClick={handleMarkAllRead}
              className="text-[#94A3B8] hover:text-teal-400 hover:bg-teal-500/10"
            >
              <CheckCheck className="h-3.5 w-3.5" />
              <span className="hidden sm:inline ml-1">Mark read</span>
            </Button>
          )}

          {feed.length > 0 && (
            <Button
              variant="ghost"
              size="xs"
              onClick={() => setShowClearDialog(true)}
              className="text-[#94A3B8] hover:text-red-400 hover:bg-red-500/10"
            >
              <Trash2 className="h-3.5 w-3.5" />
              <span className="hidden sm:inline ml-1">Clear</span>
            </Button>
          )}
        </div>
      </div>

      {/* ── Feed list ────────────────────────────────────────────────── */}
      <div className="max-h-[420px] overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/10">
        {feed.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10 px-4 text-center">
            <Sparkles className="h-8 w-8 text-[#94A3B8] mb-2 opacity-50" />
            <p className="text-sm text-[#94A3B8]">No activity yet</p>
            <p className="text-[11px] text-[#64748B] mt-1">
              Your agents will appear here as they work
            </p>
          </div>
        ) : (
          <AnimatePresence initial={false}>
            {feed.map((entry, index) => {
              const styles = TYPE_STYLES[entry.type];
              return (
                <motion.div
                  key={entry.id}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.03, duration: 0.25 }}
                  className={cn(
                    "flex items-start gap-3 px-4 py-3 border-l-2 transition-colors hover:bg-white/[0.02]",
                    styles.border,
                    !entry.read && "bg-white/[0.02]",
                  )}
                >
                  {/* Avatar */}
                  <div
                    className={cn(
                      "flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full text-sm",
                      styles.bg,
                    )}
                  >
                    {avatarForEntry(entry)}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <span className="text-sm font-semibold text-[#F1F5F9] truncate">
                        {entry.name}
                      </span>
                      <div className="flex items-center gap-1.5 flex-shrink-0">
                        {!entry.read && (
                          <span className="h-2 w-2 rounded-full bg-blue-500" />
                        )}
                        <span className="text-[10px] text-[#64748B] whitespace-nowrap font-mono">
                          {relativeTime(entry.time)}
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-[#94A3B8] mt-0.5 leading-snug line-clamp-2">
                      {entry.text}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        )}
      </div>

      {/* ── Clear confirm dialog ─────────────────────────────────────── */}
      <Dialog open={showClearDialog} onOpenChange={setShowClearDialog}>
        <DialogContent className="!bg-[#1A1F2E] border border-white/10 text-[#F1F5F9] sm:max-w-xs">
          <DialogHeader>
            <DialogTitle className="text-[#F1F5F9]">Clear activity feed?</DialogTitle>
            <DialogDescription className="text-[#94A3B8]">
              This will remove all entries from the feed. This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowClearDialog(false)}
              className="border-white/10 text-[#94A3B8] hover:text-[#F1F5F9] hover:bg-white/5"
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={handleClearFeed}
            >
              Clear all
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
}
