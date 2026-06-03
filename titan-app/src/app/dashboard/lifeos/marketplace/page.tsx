"use client";

import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft, Search, Puzzle, CheckCircle2, Zap, LayoutGrid,
  Sparkles, Store, Layers, Tag, ChevronRight,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  activatePlugin,
  getAllPlugins,
  getAvailableCategories,
  getTotalActions,
  type LifeCategory,
} from "@/lib/lifeos/plugins";

// ─── Category Tag Mappings ─────────────────────────────────────────────

const CATEGORY_TAGS: Record<string, string[]> = {
  family: ["Home", "Social"],
  travel: ["Travel"],
  "luxury-travel": ["Travel"],
  ev: ["Travel", "Finance"],
  senior: ["Health", "Home"],
  kids: ["Family", "Health"],
  social: ["Social"],
  finance: ["Finance", "Business"],
  health: ["Health"],
  career: ["Business", "Productivity"],
  learning: ["Productivity"],
  fitness: ["Health"],
  business: ["Business", "Productivity"],
  home: ["Home"],
  relationships: ["Social", "Health"],
  mindfulness: ["Health", "Productivity"],
};

const FILTER_TABS = ["All", "Family", "Travel", "Finance", "Business", "Health", "Productivity", "Home", "Social"] as const;
type FilterTab = (typeof FILTER_TABS)[number];

// ─── Tag Color Map ─────────────────────────────────────────────────────

const TAG_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  Home: { bg: "rgba(249,115,22,0.15)", text: "#FB923C", border: "rgba(249,115,22,0.3)" },
  Social: { bg: "rgba(217,70,239,0.15)", text: "#E879F9", border: "rgba(217,70,239,0.3)" },
  Travel: { bg: "rgba(20,184,166,0.15)", text: "#2DD4BF", border: "rgba(20,184,166,0.3)" },
  Finance: { bg: "rgba(16,185,129,0.15)", text: "#34D399", border: "rgba(16,185,129,0.3)" },
  Health: { bg: "rgba(236,72,153,0.15)", text: "#F472B6", border: "rgba(236,72,153,0.3)" },
  Business: { bg: "rgba(139,92,246,0.15)", text: "#A78BFA", border: "rgba(139,92,246,0.3)" },
  Productivity: { bg: "rgba(6,182,212,0.15)", text: "#22D3EE", border: "rgba(6,182,212,0.3)" },
  Family: { bg: "rgba(244,63,94,0.15)", text: "#FB7185", border: "rgba(244,63,94,0.3)" },
};

// ─── Constants ─────────────────────────────────────────────────────────

const CATALOG = getAvailableCategories();
const PHASES_PER_PLUGIN = 5; // All plugins have 5 phases
const TASKS_PER_PHASE = 6; // All plugins have 6 tasks per phase

export default function LifeOSMarketplacePage() {
  const router = useRouter();
  const [activePlugins, setActivePlugins] = useState<ReturnType<typeof getAllPlugins>>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<FilterTab>("All");
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const gridRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Refresh plugin state on mount and when returning to focus
  useEffect(() => {
    const refresh = () => {
      setActivePlugins(getAllPlugins());
    };
    refresh();
    window.addEventListener("focus", refresh);
    return () => window.removeEventListener("focus", refresh);
  }, []);

  // ─── Computed Stats ─────────────────────────────────────────────────

  const stats = useMemo(() => {
    const allPlugins = getAllPlugins();
    const totalTasks = CATALOG.reduce(
      (sum, cat) => sum + cat.phases.reduce((ps, ph) => ps + ph.tasks.length, 0),
      0,
    );
    return {
      totalAvailable: CATALOG.length,
      activeCount: allPlugins.length,
      totalTasks,
    };
  }, [activePlugins]);

  // ─── Filtered Catalog ───────────────────────────────────────────────

  const filteredCatalog = useMemo(() => {
    return CATALOG.filter((cat) => {
      // Search filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const nameMatch = cat.name.toLowerCase().includes(q);
        const descMatch = cat.description.toLowerCase().includes(q);
        const tagsMatch = (CATEGORY_TAGS[cat.category] ?? []).some((t) =>
          t.toLowerCase().includes(q),
        );
        if (!nameMatch && !descMatch && !tagsMatch) return false;
      }

      // Tab filter
      if (activeTab !== "All") {
        const tags = CATEGORY_TAGS[cat.category] ?? [];
        if (!tags.includes(activeTab)) return false;
      }

      return true;
    });
  }, [searchQuery, activeTab]);

  // ─── Handlers ───────────────────────────────────────────────────────

  const handleActivate = useCallback(
    (category: LifeCategory) => {
      activatePlugin(category);
      setActivePlugins(getAllPlugins());
    },
    [],
  );

  const handleCardClick = useCallback(
    (category: LifeCategory) => {
      const isActive = activePlugins.some((p) => p.category === category);
      if (isActive) {
        router.push("/dashboard/lifeos");
      } else {
        handleActivate(category);
      }
    },
    [activePlugins, handleActivate, router],
  );

  const isActive = useCallback(
    (category: LifeCategory) => activePlugins.some((p) => p.category === category),
    [activePlugins],
  );

  const getPluginProgress = useCallback(
    (category: LifeCategory) => {
      const plugin = activePlugins.find((p) => p.category === category);
      return plugin?.overallProgress ?? 0;
    },
    [activePlugins],
  );

  // ─── Keyboard Navigation ───────────────────────────────────────────

  useEffect(() => {
    // Reset focus when filter/search changes
    setFocusedIndex(-1);
  }, [searchQuery, activeTab]);

  const scrollToItem = useCallback((idx: number) => {
    const el = itemRefs.current[idx];
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, []);

  useEffect(() => {
    const len = filteredCatalog.length;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (len === 0) return;

      const cols = window.innerWidth < 640 ? 1 : window.innerWidth < 1024 ? 2 : window.innerWidth < 1280 ? 3 : 5;

      switch (e.key) {
        case 'ArrowRight':
          e.preventDefault();
          setFocusedIndex(prev => {
            const next = Math.min(prev + 1, len - 1);
            scrollToItem(next);
            return next;
          });
          break;
        case 'ArrowLeft':
          e.preventDefault();
          setFocusedIndex(prev => {
            const next = Math.max(prev - 1, 0);
            scrollToItem(next);
            return next;
          });
          break;
        case 'ArrowDown':
          e.preventDefault();
          setFocusedIndex(prev => {
            const next = Math.min(prev + cols, len - 1);
            scrollToItem(next);
            return next;
          });
          break;
        case 'ArrowUp':
          e.preventDefault();
          setFocusedIndex(prev => {
            const next = Math.max(prev - cols, 0);
            scrollToItem(next);
            return next;
          });
          break;
        case 'Enter':
        case ' ':
          if (focusedIndex >= 0 && focusedIndex < len) {
            e.preventDefault();
            const cat = filteredCatalog[focusedIndex];
            if (cat) handleCardClick(cat.category);
          }
          break;
        case 'Escape':
          if (focusedIndex >= 0) {
            e.preventDefault();
            setFocusedIndex(-1);
            if (document.activeElement instanceof HTMLElement) {
              document.activeElement.blur();
            }
          }
          break;
        default:
          // Type-to-search: redirect printable chars to search input
          if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
            const activeEl = document.activeElement;
            const isInput = activeEl instanceof HTMLInputElement || activeEl instanceof HTMLTextAreaElement || activeEl instanceof HTMLSelectElement;
            if (!isInput) {
              const searchInput = document.querySelector<HTMLInputElement>('input[placeholder*="Search"]');
              searchInput?.focus();
              searchInput?.setSelectionRange(searchInput.value.length, searchInput.value.length);
            }
          }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [filteredCatalog, focusedIndex, handleCardClick, scrollToItem]);

  // ─── Render ─────────────────────────────────────────────────────────

  return (
    <div className="space-y-6">
      {/* ── Header ── */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.push("/dashboard/lifeos")}
            className="flex items-center gap-1.5 text-xs font-mono transition-all hover:opacity-70"
            style={{ color: "#14B8A6" }}
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to LifeOS
          </button>
          <div className="w-px h-4" style={{ background: "rgba(20,184,166,0.2)" }} />
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full" style={{ background: "#14B8A6" }} />
            <h2 className="text-sm font-mono font-semibold tracking-wider" style={{ color: "#14B8A6" }}>
              PLUGIN MARKETPLACE
            </h2>
            <span className="text-[10px] font-mono text-gray-400">// discover &amp; activate</span>
          </div>
        </div>
      </div>

      {/* ── Quick Stats ── */}
      <motion.div
        className="grid grid-cols-3 gap-3"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        {[
          {
            label: "Plugins Available",
            value: stats.totalAvailable,
            icon: Store,
            color: "#14B8A6",
            bg: "rgba(20,184,166,0.08)",
          },
          {
            label: "Plugins Active",
            value: stats.activeCount,
            icon: CheckCircle2,
            color: "#10B981",
            bg: "rgba(16,185,129,0.08)",
          },
          {
            label: "Total Tasks",
            value: stats.totalTasks.toLocaleString(),
            icon: Zap,
            color: "#F59E0B",
            bg: "rgba(245,158,11,0.08)",
          },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            className="relative overflow-hidden rounded-xl p-4 border"
            style={{
              background: stat.bg,
              borderColor: `${stat.color}20`,
            }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 * i, duration: 0.3 }}
          >
            <div className="flex items-start justify-between mb-2">
              <stat.icon className="h-4 w-4" style={{ color: stat.color }} />
            </div>
            <p className="text-xl font-bold font-mono" style={{ color: stat.color }}>
              {stat.value}
            </p>
            <p className="text-[10px] font-mono text-gray-500 mt-0.5">{stat.label}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* ── Search & Filter Bar ── */}
      <motion.div
        className="space-y-3"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
      >
        {/* Search */}
        <div className="relative">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5"
            style={{ color: "#14B8A6" }}
          />
          <Input
            placeholder="Search plugins by name, description, or tag..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 text-xs h-9 border rounded-xl"
            style={{
              background: "rgba(20,184,166,0.04)",
              borderColor: "rgba(20,184,166,0.15)",
              color: "#E8E6E0",
            }}
          />
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-1.5 flex-wrap">
          {FILTER_TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className="px-3 py-1.5 rounded-lg text-[10px] font-mono font-medium transition-all"
              style={{
                background:
                  activeTab === tab
                    ? "linear-gradient(135deg, rgba(20,184,166,0.2), rgba(20,184,166,0.08))"
                    : "rgba(255,255,255,0.04)",
                color: activeTab === tab ? "#14B8A6" : "rgba(200,198,190,0.6)",
                border: `1px solid ${
                  activeTab === tab
                    ? "rgba(20,184,166,0.3)"
                    : "rgba(255,255,255,0.06)"
                }`,
              }}
            >
              {tab === "All" && <LayoutGrid className="h-3 w-3 inline mr-1" />}
              {tab}
            </button>
          ))}

          {/* Result count */}
          <div className="ml-auto flex items-center gap-1 text-[10px] font-mono" style={{ color: "rgba(200,198,190,0.4)" }}>
            <Layers className="h-3 w-3" />
            {filteredCatalog.length} / {CATALOG.length}
          </div>
        </div>
      </motion.div>

      {/* ── Plugin Grid ── */}
      <AnimatePresence mode="wait">
        {filteredCatalog.length === 0 ? (
          <motion.div
            key="empty"
            className="flex flex-col items-center justify-center py-16 rounded-2xl border border-dashed"
            style={{
              borderColor: "rgba(20,184,166,0.15)",
              background: "rgba(20,184,166,0.02)",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Search className="h-10 w-10 mb-3" style={{ color: "rgba(20,184,166,0.2)" }} />
            <p className="text-sm font-medium" style={{ color: "rgba(200,198,190,0.5)" }}>
              No plugins match your search
            </p>
            <p className="text-[11px] font-mono mt-1" style={{ color: "rgba(200,198,190,0.3)" }}>
              Try a different keyword or clear the filter
            </p>
            <Button
              variant="outline"
              size="xs"
              onClick={() => {
                setSearchQuery("");
                setActiveTab("All");
              }}
              className="mt-4"
              style={{
                borderColor: "rgba(20,184,166,0.2)",
                color: "#14B8A6",
              }}
            >
              Clear Filters
            </Button>
          </motion.div>
        ) : (
          <motion.div
            key="grid"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.04 } },
            }}
          >
            {filteredCatalog.map((cat, idx) => {
              const active = isActive(cat.category);
              const progress = getPluginProgress(cat.category);
              const tags = CATEGORY_TAGS[cat.category] ?? [];
              const totalTasksForPlugin = cat.phases.reduce(
                (s, ph) => s + ph.tasks.length,
                0,
              );

              return (
                <motion.div
                  key={cat.category}
                  variants={{
                    hidden: { opacity: 0, y: 16 },
                    visible: { opacity: 1, y: 0 },
                  }}
                >
                  <Card
                    ref={(el: HTMLDivElement | null) => {
                      itemRefs.current[idx] = el;
                    }}
                    tabIndex={0}
                    onFocus={() => setFocusedIndex(idx)}
                    className="relative overflow-hidden cursor-pointer h-full border transition-all duration-300 group"
                    style={{
                      background: active
                        ? `linear-gradient(180deg, ${cat.color}06, rgba(10,14,23,0.6))`
                        : "rgba(10,14,23,0.4)",
                      borderColor: active
                        ? `${cat.color}30`
                        : "rgba(255,255,255,0.06)",
                      ...(focusedIndex === idx
                        ? { outline: `2px solid ${cat.color}`, outlineOffset: '2px' }
                        : {}),
                    }}
                    onClick={() => handleCardClick(cat.category)}
                    onMouseEnter={(e) => {
                      const card = e.currentTarget;
                      card.style.transform = "translateY(-4px)";
                      card.style.boxShadow = `0 8px 32px ${cat.color}15`;
                      card.style.borderColor = `${cat.color}40`;
                    }}
                    onMouseLeave={(e) => {
                      const card = e.currentTarget;
                      card.style.transform = "translateY(0)";
                      card.style.boxShadow = "none";
                      card.style.borderColor = active
                        ? `${cat.color}30`
                        : "rgba(255,255,255,0.06)";
                    }}
                  >
                    {/* Color accent stripe at top */}
                    <div
                      className="absolute top-0 left-0 right-0 h-1"
                      style={{ background: cat.color }}
                    />

                    {/* Card Body */}
                    <div className="p-4 pt-5 flex flex-col gap-3">
                      {/* Emoji + Name + Status */}
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-2.5">
                          <div
                            className="w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0"
                            style={{
                              background: `${cat.color}15`,
                              border: `1px solid ${cat.color}25`,
                            }}
                          >
                            {cat.emoji}
                          </div>
                          <div className="min-w-0">
                            <p
                              className="text-sm font-semibold leading-tight truncate"
                              style={{ color: "#E8E6E0" }}
                            >
                              {cat.name}
                            </p>
                            <p
                              className="text-[9px] font-mono mt-0.5 uppercase tracking-wider"
                              style={{ color: `${cat.color}80` }}
                            >
                              {cat.category.replace("-", " ")}
                            </p>
                          </div>
                        </div>

                        {/* Active Badge or Activate CTA */}
                        {active && (
                          <Badge
                            className="text-[8px] h-4 px-1.5 shrink-0"
                            style={{
                              background: "rgba(16,185,129,0.15)",
                              color: "#34D399",
                              border: "1px solid rgba(16,185,129,0.25)",
                            }}
                          >
                            <CheckCircle2 className="h-2.5 w-2.5 mr-0.5" />
                            Active
                          </Badge>
                        )}
                      </div>

                      {/* Description */}
                      <p
                        className="text-[11px] leading-relaxed line-clamp-2"
                        style={{ color: "rgba(200,198,190,0.6)" }}
                      >
                        {cat.description}
                      </p>

                      {/* Phase & Tasks Info */}
                      <div className="flex items-center gap-3 text-[10px] font-mono" style={{ color: "rgba(200,198,190,0.4)" }}>
                        <span className="flex items-center gap-1">
                          <Layers className="h-3 w-3" />
                          {PHASES_PER_PLUGIN} phases
                        </span>
                        <span className="flex items-center gap-1">
                          <Puzzle className="h-3 w-3" />
                          {totalTasksForPlugin} tasks
                        </span>
                      </div>

                      {/* Progress Bar (if active) */}
                      {active && (
                        <div className="space-y-1">
                          <div
                            className="h-1.5 rounded-full overflow-hidden"
                            style={{ background: "rgba(255,255,255,0.06)" }}
                          >
                            <motion.div
                              className="h-full rounded-full"
                              style={{
                                background: `linear-gradient(90deg, ${cat.color}, ${cat.color}88)`,
                              }}
                              initial={{ width: 0 }}
                              animate={{ width: `${progress}%` }}
                              transition={{ duration: 0.8, ease: "easeOut" }}
                            />
                          </div>
                          <div className="flex items-center justify-between">
                            <span
                              className="text-[9px] font-mono font-semibold"
                              style={{ color: cat.color }}
                            >
                              {progress}%
                            </span>
                            <span className="text-[8px] font-mono" style={{ color: "rgba(200,198,190,0.3)" }}>
                              Complete
                            </span>
                          </div>
                        </div>
                      )}

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1 mt-auto">
                        {tags.map((tag) => {
                          const tc = TAG_COLORS[tag] ?? {
                            bg: "rgba(255,255,255,0.06)",
                            text: "rgba(200,198,190,0.5)",
                            border: "rgba(255,255,255,0.08)",
                          };
                          return (
                            <span
                              key={tag}
                              className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[8px] font-mono font-medium"
                              style={{
                                background: tc.bg,
                                color: tc.text,
                                border: `1px solid ${tc.border}`,
                              }}
                            >
                              <Tag className="h-2 w-2" />
                              {tag}
                            </span>
                          );
                        })}
                      </div>

                      {/* Action CTA */}
                      <div
                        className="flex items-center justify-between pt-1 border-t"
                        style={{ borderColor: "rgba(255,255,255,0.04)" }}
                      >
                        <span
                          className="text-[9px] font-mono transition-all group-hover:translate-x-0.5"
                          style={{
                            color: active ? "rgba(16,185,129,0.6)" : "#14B8A6",
                          }}
                        >
                          {active ? (
                            <span className="flex items-center gap-1">
                              Open Plugin <ChevronRight className="h-2.5 w-2.5" />
                            </span>
                          ) : (
                            <span className="flex items-center gap-1">
                              <Sparkles className="h-2.5 w-2.5" />
                              Activate Plugin
                            </span>
                          )}
                        </span>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
