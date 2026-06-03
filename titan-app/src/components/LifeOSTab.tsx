"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Puzzle, Play, CheckCircle2, ChevronRight, Sparkles, 
  Zap, ArrowRight, TrendingUp, Archive, 
  ArrowUp, ArrowDown, RotateCcw, EyeOff
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  activatePlugin,
  completeTask,
  getAllPlugins,
  getAvailableCategories,
  getDownloadsCount,
  getTotalActions,
  enableSupabaseSync,
  setSyncCallback,
  type LifeOSPlugin,
  type LifeCategory,
  type PluginPhase,
} from "@/lib/lifeos/plugins";
import {
  getCrossPluginSuggestions,
} from "@/lib/lifeos/synergies";
import { recordAction } from "@/lib/lifeos/analytics";
import LifeOSAnalytics from "@/components/LifeOSAnalytics";
import {
  upsertPlugin,
  logAction,
  getLifeOSState,
} from "@/lib/db/lifeos-supabase";
import {
  toggleArchive,
  isArchived,
  sortPlugins,
  assignInitialOrders,
  movePlugin,
  getAllMeta,
  type PluginMeta,
} from "@/lib/lifeos/archive-sort";

// ─── LifeOS Tab Component ──────────────────────────────────────────────

export default function LifeOSTab({ onFeedAdd }: { onFeedAdd?: (entry: { avatar: string; name: string; text: string }) => void }) {
  const [plugins, setPlugins] = useState<LifeOSPlugin[]>([]);
  const [catalog] = useState(getAvailableCategories);
  const [activePlugin, setActivePlugin] = useState<LifeCategory | null>(null);
  const [showCatalog, setShowCatalog] = useState(false);
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [showArchived, setShowArchived] = useState(false);
  const [downloads, setDownloads] = useState(0);
  const [metaState, setMetaState] = useState<Record<string, PluginMeta>>({});
  const [focusedGridIndex, setFocusedGridIndex] = useState(-1);
  const [focusedCatalogIndex, setFocusedCatalogIndex] = useState(-1);
  const gridRef = useRef<HTMLDivElement>(null);
  const gridItemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const catalogItemRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const refresh = useCallback(() => {
    const allPlugins = getAllPlugins();
    const ids = allPlugins.map(p => p.id);
    assignInitialOrders(ids);
    setPlugins(sortPlugins(allPlugins));
    setMetaState(getAllMeta());
    setDownloads(getDownloadsCount());
  }, []);

  // Connect Supabase persistence on mount
  useEffect(() => {
    enableSupabaseSync();
    setSyncCallback(async (plugin, action, detail) => {
      switch (action) {
        case 'upsert':
          await upsertPlugin(plugin);
          break;
        case 'complete_task':
          await upsertPlugin(plugin);
          if (detail) await logAction(plugin.id, plugin.category, detail, '');
          break;
      }
    });
    // Try loading state from server
    getLifeOSState().then(serverState => {
      if (serverState && serverState.plugins.length > 0) {
        // Server has data — merge into localStorage
        localStorage.setItem('titan-lifeos-state', JSON.stringify(serverState));
        refresh();
      }
    }).catch(() => {
      // Server unavailable — localStorage works fine
    });
  }, [refresh]);

  const handleActivate = useCallback((category: LifeCategory) => {
    activatePlugin(category);
    refresh();
    setActivePlugin(category);
    setShowCatalog(false);
    onFeedAdd?.({
      avatar: '🧩',
      name: 'LifeOS',
      text: `Activated ${catalog.find(c => c.category === category)?.name || category} plugin`,
    });
  }, [catalog, refresh, onFeedAdd]);

  const handleCompleteTask = useCallback((category: LifeCategory, phase: PluginPhase, taskId: string, taskLabel: string) => {
    completeTask(category, phase, taskId);
    recordAction();
    refresh();
    onFeedAdd?.({
      avatar: '✅',
      name: catalog.find(c => c.category === category)?.name || 'LifeOS',
      text: `Completed: ${taskLabel}`,
    });
  }, [catalog, refresh, onFeedAdd]);

  const handleToggleArchive = useCallback((pluginId: string) => {
    const archived = toggleArchive(pluginId);
    setMetaState(getAllMeta());
    refresh();
    onFeedAdd?.({
      avatar: archived ? '📦' : '📂',
      name: 'LifeOS',
      text: archived ? `Archived plugin` : `Restored plugin from archive`,
    });
  }, [refresh, onFeedAdd]);

  // ─── Keyboard Navigation ───────────────────────────────────────────

  const scrollToGridItem = useCallback((idx: number) => {
    const el = gridItemRefs.current[idx];
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }, []);

  const scrollToCatalogItem = useCallback((idx: number) => {
    const el = catalogItemRefs.current[idx];
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }, []);

  useEffect(() => {
    const activeGridItems = plugins.filter(p => !isArchived(p.id));
    const gridLen = showCatalog ? catalog.length : activeGridItems.length;
    if (gridLen === 0) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (showCatalog || showAnalytics) {
        // Catalog keyboard nav
        if (showCatalog) {
          const catLen = catalog.length;
          const catCols = window.innerWidth < 640 ? 2 : window.innerWidth < 1024 ? 3 : 5;

          switch (e.key) {
            case 'ArrowRight':
              e.preventDefault();
              setFocusedCatalogIndex(prev => {
                const next = Math.min(prev + 1, catLen - 1);
                scrollToCatalogItem(next);
                return next;
              });
              break;
            case 'ArrowLeft':
              e.preventDefault();
              setFocusedCatalogIndex(prev => {
                const next = Math.max(prev - 1, 0);
                scrollToCatalogItem(next);
                return next;
              });
              break;
            case 'ArrowDown':
              e.preventDefault();
              setFocusedCatalogIndex(prev => {
                const next = Math.min(prev + catCols, catLen - 1);
                scrollToCatalogItem(next);
                return next;
              });
              break;
            case 'ArrowUp':
              e.preventDefault();
              setFocusedCatalogIndex(prev => {
                const next = Math.max(prev - catCols, 0);
                scrollToCatalogItem(next);
                return next;
              });
              break;
            case 'Enter':
            case ' ':
              if (focusedCatalogIndex >= 0 && focusedCatalogIndex < catLen) {
                e.preventDefault();
                handleActivate(catalog[focusedCatalogIndex].category);
              }
              break;
            case 'Escape':
              e.preventDefault();
              setShowCatalog(false);
              setFocusedCatalogIndex(-1);
              break;
          }
        }
        return;
      }

      // Focus reset when view changes
      if (e.key === 'Tab' && focusedGridIndex === -1) return;

      const len = activeGridItems.length;
      if (len === 0) return;
      const cols = window.innerWidth < 640 ? 2 : window.innerWidth < 1024 ? 3 : 5;

      switch (e.key) {
        case 'ArrowRight':
          e.preventDefault();
          setFocusedGridIndex(prev => {
            const next = Math.min(prev + 1, len - 1);
            scrollToGridItem(next);
            return next;
          });
          break;
        case 'ArrowLeft':
          e.preventDefault();
          setFocusedGridIndex(prev => {
            const next = Math.max(prev - 1, 0);
            scrollToGridItem(next);
            return next;
          });
          break;
        case 'ArrowDown':
          e.preventDefault();
          setFocusedGridIndex(prev => {
            const next = Math.min(prev + cols, len - 1);
            scrollToGridItem(next);
            return next;
          });
          break;
        case 'ArrowUp':
          e.preventDefault();
          setFocusedGridIndex(prev => {
            const next = Math.max(prev - cols, 0);
            scrollToGridItem(next);
            return next;
          });
          break;
        case 'Enter':
        case ' ':
          if (focusedGridIndex >= 0 && focusedGridIndex < len) {
            e.preventDefault();
            const plugin = activeGridItems[focusedGridIndex];
            setActivePlugin(plugin.category);
          }
          break;
        case 'Escape':
          if (focusedGridIndex >= 0) {
            e.preventDefault();
            setFocusedGridIndex(-1);
          }
          break;
        default:
          if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
            const activeEl = document.activeElement;
            const isInput = activeEl instanceof HTMLInputElement || activeEl instanceof HTMLTextAreaElement || activeEl instanceof HTMLSelectElement;
            if (!isInput && showCatalog) {
              // Focus search implicitly — but catalog has no search here
            }
          }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [plugins, showCatalog, showAnalytics, focusedGridIndex, focusedCatalogIndex, catalog, handleActivate, scrollToGridItem, scrollToCatalogItem]);

  // Reset focus when view changes
  useEffect(() => {
    setFocusedGridIndex(-1);
    setFocusedCatalogIndex(-1);
  }, [showCatalog, showAnalytics]);

  // Listen for activate events from cross-plugin suggestion cards
  useEffect(() => {
    const handler = (e: CustomEvent) => {
      const cat = e.detail as LifeCategory;
      if (!plugins.some(p => p.category === cat)) {
        handleActivate(cat);
      } else {
        setActivePlugin(cat);
      }
    };
    window.addEventListener('lifeos-activate', handler as EventListener);
    return () => window.removeEventListener('lifeos-activate', handler as EventListener);
  }, [plugins, handleActivate]);

  const handleMove = useCallback((pluginId: string, direction: 'up' | 'down') => {
    const allIds = plugins.map(p => p.id);
    movePlugin(pluginId, direction, allIds);
    setMetaState(getAllMeta());
    refresh();
  }, [plugins, refresh]);

  const currentPlugin = activePlugin ? plugins.find(p => p.category === activePlugin) : null;
  const activePlugins = plugins.filter(p => !isArchived(p.id));
  const archivedPlugins = plugins.filter(p => isArchived(p.id));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-2 mb-2">
        <div className="w-2 h-2 rounded-full" style={{ background: '#14B8A6' }} />
        <h2 className="text-sm font-mono font-semibold tracking-wider" style={{ color: '#14B8A6' }}>LIFEOS PLUGINS</h2>
        <span className="text-[10px] font-mono text-titan-muted/50">// guided phases for every category</span>
      </div>

      {/* Stats bar */}
      <div className="flex items-center gap-4 text-[10px] font-mono text-titan-muted/70 bg-titan-card/40 border border-titan-border/20 rounded-xl px-4 py-2">
        <span className="flex items-center gap-1">
          <Puzzle className="h-3 w-3 text-titan-teal" />
          <span className="text-titan-teal font-semibold">{activePlugins.length}</span> / {plugins.length} plugins
        </span>
        <span className="flex items-center gap-1">
          <Zap className="h-3 w-3 text-titan-golden" />
          <span className="text-titan-golden font-semibold">{getTotalActions()}</span> total actions
        </span>
        <span className="flex items-center gap-1">
          <CheckCircle2 className="h-3 w-3 text-titan-emerald" />
          <span className="text-titan-emerald font-semibold">{downloads}</span> downloads
        </span>
        <div className="ml-auto flex items-center gap-1.5">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setShowAnalytics(false);
              setShowCatalog(!showCatalog);
            }}
            className="text-[10px] h-6 gap-1"
            style={{ borderColor: 'rgba(20,184,166,0.3)', color: '#14B8A6' }}
          >
            <Puzzle className="h-3 w-3" />
            {showCatalog ? 'Close' : 'Browse'}
          </Button>
          {archivedPlugins.length > 0 && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => { setShowCatalog(false); setShowAnalytics(false); setShowArchived(!showArchived); }}
              className="text-[10px] h-6 gap-1"
              style={{
                borderColor: showArchived ? 'rgba(139,92,246,0.4)' : 'rgba(139,92,246,0.2)',
                color: showArchived ? '#A78BFA' : '#8B5CF6',
              }}
            >
              <Archive className="h-3 w-3" />
              Archive ({archivedPlugins.length})
            </Button>
          )}
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setShowCatalog(false);
              setShowArchived(false);
              setShowAnalytics(!showAnalytics);
            }}
            className="text-[10px] h-6 gap-1"
            style={{
              borderColor: showAnalytics ? 'rgba(139,92,246,0.4)' : 'rgba(139,92,246,0.2)',
              color: showAnalytics ? '#A78BFA' : '#8B5CF6',
            }}
          >
            <TrendingUp className="h-3 w-3" />
            Analytics
          </Button>
        </div>
      </div>

      {/* Analytics Panel (collapsible) */}
      <AnimatePresence>
        {showAnalytics && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="mb-4">
              <LifeOSAnalytics onActivateCategory={(cat) => {
                activatePlugin(cat);
                refresh();
                setActivePlugin(cat);
                setShowAnalytics(false);
                onFeedAdd?.({
                  avatar: '🧩',
                  name: 'LifeOS',
                  text: `Activated ${catalog.find(c => c.category === cat)?.name || cat} from recommendations`,
                });
              }} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Plugin Catalog (collapsible) */}
      <AnimatePresence>
        {showCatalog && !showAnalytics && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-4">
              {catalog.map((cat, i) => {
                const isActive = plugins.some(p => p.category === cat.category);
                return (
                  <motion.button
                    key={cat.category}
                    ref={(el: HTMLButtonElement | null) => { catalogItemRefs.current[i] = el; }}
                    tabIndex={0}
                    onFocus={() => setFocusedCatalogIndex(i)}
                    onClick={() => handleActivate(cat.category)}
                    className={`relative p-3 rounded-xl border text-left transition-all ${
                      isActive 
                        ? 'bg-titan-card/60 border-titan-teal/40' 
                        : 'bg-titan-surface/40 border-titan-border/20 hover:border-titan-teal/30'
                    }`}
                    style={focusedCatalogIndex === i ? { outline: '2px solid #14B8A6', outlineOffset: '2px' } : {}}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.04 }}
                    whileHover={{ y: -2 }}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xl">{cat.emoji}</span>
                      {isActive && (
                        <Badge className="text-[7px] h-4 px-1" style={{ background: 'rgba(20,184,166,0.2)', color: '#14B8A6', border: '1px solid rgba(20,184,166,0.3)' }}>
                          Active
                        </Badge>
                      )}
                    </div>
                    <p className="text-[11px] font-semibold">{cat.name}</p>
                    <p className="text-[9px] text-titan-muted/70 mt-0.5 line-clamp-2">{cat.description}</p>
                    <div className="flex items-center gap-1 mt-1.5">
                      <span className="text-[8px] text-titan-muted/50">5 phases</span>
                      <ArrowRight className="h-2 w-2 text-titan-teal/50" />
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Active Plugin Detail */}
      {currentPlugin ? (
        <PluginDetail 
          plugin={currentPlugin} 
          onCompleteTask={(phase, taskId, taskLabel) => handleCompleteTask(currentPlugin.category, phase, taskId, taskLabel)} 
        />
      ) : plugins.length > 0 ? (
        /* Show most recently used plugin */
        <PluginDetail 
          plugin={plugins[plugins.length - 1]} 
          onCompleteTask={(phase, taskId, taskLabel) => handleCompleteTask(
            plugins[plugins.length - 1].category, phase, taskId, taskLabel
          )} 
        />
      ) : (
        /* Empty state */
        <motion.div
          className="flex flex-col items-center justify-center py-16 rounded-2xl border border-dashed border-titan-border/30 bg-titan-card/20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <Puzzle className="h-12 w-12 text-titan-muted/30 mb-4" />
          <h3 className="text-lg font-semibold text-titan-muted/60 mb-1">No plugins active</h3>
          <p className="text-sm text-titan-muted/40 mb-4">Activate a LifeOS plugin to get started with guided phases</p>
          <Button
            onClick={() => setShowCatalog(true)}
            className="text-xs gap-1"
            style={{ background: 'linear-gradient(135deg, #14B8A6, #0D9488)', color: '#0A0E17' }}
          >
            <Sparkles className="h-3.5 w-3.5" />
            Browse Plugin Catalog
          </Button>
        </motion.div>
      )}

      {/* Active plugin grid */}
      {activePlugins.length > 0 && (
        <div>
          <h3 className="text-xs font-mono text-titan-muted/70 mb-2 uppercase tracking-wider">Active Plugins</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {activePlugins.map((p, idx) => {
              const isFirst = idx === 0;
              const isLast = idx === activePlugins.length - 1;
              return (
                <div key={p.id} className="relative group">
                  <motion.button
                    ref={(el: HTMLButtonElement | null) => { gridItemRefs.current[idx] = el as HTMLDivElement | null; }}
                    tabIndex={0}
                    onFocus={() => setFocusedGridIndex(idx)}
                    onClick={() => setActivePlugin(p.category)}
                    className={`w-full p-3 rounded-xl border text-left transition-all ${
                      activePlugin === p.category 
                        ? 'bg-titan-card/80 border-titan-teal/40' 
                        : 'bg-titan-surface/40 border-titan-border/20 hover:border-titan-teal/30'
                    }`}
                    style={focusedGridIndex === idx ? { outline: '2px solid #14B8A6', outlineOffset: '2px' } : {}}
                    whileHover={{ y: -2 }}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-lg">{p.emoji}</span>
                      <span className="text-[11px] font-semibold">{p.name}</span>
                    </div>
                    {/* Phase progress dots */}
                    <div className="flex gap-1 mt-1.5">
                      {p.phases.map((ph, i) => (
                        <div
                          key={i}
                          className="h-1 flex-1 rounded-full"
                          style={{ 
                            background: ph.completed 
                              ? 'linear-gradient(90deg, #14B8A6, #F59E0B)' 
                              : ph.progress > 0 
                                ? `linear-gradient(90deg, #14B8A6 ${ph.progress}%, rgba(255,255,255,0.08) ${ph.progress}%)`
                                : 'rgba(255,255,255,0.08)'
                          }}
                        />
                      ))}
                    </div>
                    <div className="flex items-center justify-between mt-1.5">
                      <span className="text-[9px] text-titan-muted/50 font-mono">{p.overallProgress}%</span>
                      <ChevronRight className="h-2.5 w-2.5 text-titan-muted/30" />
                    </div>
                  </motion.button>
                  {/* Hover controls: reorder + archive */}
                  <div className="absolute -top-2 -right-2 flex gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                    {!isFirst && (
                      <button
                        onClick={(e) => { e.stopPropagation(); handleMove(p.id, 'up'); }}
                        className="w-5 h-5 rounded-full flex items-center justify-center text-[9px] bg-titan-card border border-titan-border/30 hover:bg-titan-teal/10 hover:border-titan-teal/40 transition-all"
                        title="Move up"
                        style={{ color: '#14B8A6' }}
                      >
                        <ArrowUp className="h-3 w-3" />
                      </button>
                    )}
                    {!isLast && (
                      <button
                        onClick={(e) => { e.stopPropagation(); handleMove(p.id, 'down'); }}
                        className="w-5 h-5 rounded-full flex items-center justify-center text-[9px] bg-titan-card border border-titan-border/30 hover:bg-titan-teal/10 hover:border-titan-teal/40 transition-all"
                        title="Move down"
                        style={{ color: '#14B8A6' }}
                      >
                        <ArrowDown className="h-3 w-3" />
                      </button>
                    )}
                    <button
                      onClick={(e) => { e.stopPropagation(); handleToggleArchive(p.id); }}
                      className="w-5 h-5 rounded-full flex items-center justify-center text-[9px] bg-titan-card border border-titan-border/30 hover:bg-amber-500/10 hover:border-amber-500/40 transition-all"
                      title="Archive"
                      style={{ color: '#D4A017' }}
                    >
                      <EyeOff className="h-3 w-3" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Archived plugin section */}
      {showArchived && archivedPlugins.length > 0 && (
        <div>
          <h3 className="text-xs font-mono text-titan-muted/50 mb-2 uppercase tracking-wider flex items-center gap-2">
            <Archive className="h-3 w-3" />
            Archived ({archivedPlugins.length})
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 opacity-60">
            {archivedPlugins.map(p => (
              <div key={p.id} className="relative group">
                <motion.button
                  onClick={() => setActivePlugin(p.category)}
                  className={`w-full p-3 rounded-xl border text-left transition-all bg-titan-surface/20 border-titan-border/10`}
                  whileHover={{ y: -2 }}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-lg">{p.emoji}</span>
                    <span className="text-[11px] font-semibold text-titan-muted/50">{p.name}</span>
                    <span className="text-[7px] font-mono text-titan-muted/40 ml-auto uppercase">Archived</span>
                  </div>
                  <div className="flex gap-1 mt-1.5">
                    {p.phases.map((ph, i) => (
                      <div key={i} className="h-1 flex-1 rounded-full" style={{
                        background: ph.completed ? 'rgba(20,184,166,0.3)' : 'rgba(255,255,255,0.05)'
                      }} />
                    ))}
                  </div>
                  <div className="flex items-center justify-between mt-1.5">
                    <span className="text-[9px] text-titan-muted/30 font-mono">{p.overallProgress}%</span>
                  </div>
                </motion.button>
                {/* Restore button */}
                <div className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={(e) => { e.stopPropagation(); handleToggleArchive(p.id); }}
                    className="w-5 h-5 rounded-full flex items-center justify-center bg-titan-card border border-titan-border/30 hover:bg-emerald-500/10 hover:border-emerald-500/40 transition-all"
                    title="Restore"
                    style={{ color: '#10B981' }}
                  >
                    <RotateCcw className="h-3 w-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Plugin Detail View ────────────────────────────────────────────────

function PluginDetail({ plugin, onCompleteTask }: { 
  plugin: LifeOSPlugin; 
  onCompleteTask: (phase: PluginPhase, taskId: string, taskLabel: string) => void;
}) {
  const phaseLabels: Record<PluginPhase, string> = {
    research: 'Research',
    canvas: 'Canvas',
    build: 'Build',
    ship: 'Ship',
    maintain: 'Maintain',
  };
  const phaseEmojis: Record<PluginPhase, string> = {
    research: '🔍',
    canvas: '🎨',
    build: '🔧',
    ship: '🚀',
    maintain: '🔄',
  };

  return (
    <motion.div
      className="rounded-2xl border overflow-hidden"
      style={{ borderColor: `${plugin.color}30` }}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {/* Plugin header */}
      <div className="p-5" style={{ background: `linear-gradient(135deg, ${plugin.color}10, ${plugin.color}05)` }}>
        <div className="flex items-center gap-3 mb-3">
          <div 
            className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
            style={{ background: `${plugin.color}20`, border: `1px solid ${plugin.color}30` }}
          >
            {plugin.emoji}
          </div>
          <div>
            <h3 className="font-bold text-base">{plugin.name}</h3>
            <p className="text-xs text-titan-muted/70">{plugin.description}</p>
          </div>
          <div className="ml-auto text-right">
            <span className="text-lg font-bold font-mono" style={{ color: plugin.color }}>{plugin.overallProgress}%</span>
            <p className="text-[9px] text-titan-muted/50 font-mono uppercase">Complete</p>
          </div>
        </div>
        {/* Overall progress bar */}
        <div className="h-1.5 bg-titan-border/20 rounded-full overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            style={{ background: `linear-gradient(90deg, ${plugin.color}, ${plugin.color}88)` }}
            initial={{ width: 0 }}
            animate={{ width: `${plugin.overallProgress}%` }}
            transition={{ duration: 1, ease: 'easeOut' }}
          />
        </div>
      </div>

      {/* Cross-Plugin Suggestions */}
      <CrossPluginSuggestions plugin={plugin} onActivatePlugin={(cat) => {
        // handled via parent — this triggers the activation flow
        window.dispatchEvent(new CustomEvent('lifeos-activate', { detail: cat }));
      }} />

      {/* Phases */}
      <div className="p-5 space-y-4">
        {plugin.phases.map((phase, i) => (
          <motion.div
            key={phase.phase}
            className={`rounded-xl p-4 border transition-all ${
              phase.completed 
                ? 'bg-titan-card/40 border-green-500/20' 
                : phase.progress > 0 
                  ? 'bg-titan-card/30 border-titan-teal/20'
                  : 'bg-titan-surface/20 border-titan-border/10'
            }`}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.08 }}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span>{phaseEmojis[phase.phase]}</span>
                <span className="text-sm font-semibold">{phaseLabels[phase.phase]}</span>
                {phase.completed && (
                  <Badge className="text-[8px] h-4 px-1" style={{ background: 'rgba(16,185,129,0.2)', color: '#10B981', border: '1px solid rgba(16,185,129,0.3)' }}>
                    ✓ Done
                  </Badge>
                )}
              </div>
              <span className="text-[10px] font-mono text-titan-muted/50">{phase.progress}%</span>
            </div>
            {/* Phase progress */}
            <div className="h-1 bg-titan-border/10 rounded-full overflow-hidden mb-2.5">
              <motion.div
                className="h-full rounded-full"
                style={{ background: phase.completed ? '#10B981' : plugin.color }}
                initial={{ width: 0 }}
                animate={{ width: `${phase.progress}%` }}
                transition={{ duration: 0.8, delay: i * 0.1 }}
              />
            </div>
            {/* Tasks */}
            <div className="space-y-1.5">
              {phase.tasks.map((task) => (
                <motion.button
                  key={task.id}
                  onClick={() => !task.done && onCompleteTask(phase.phase, task.id, task.label)}
                  disabled={task.done}
                  className={`w-full flex items-start gap-2.5 p-2 rounded-lg text-left transition-all ${
                    task.done 
                      ? 'opacity-40 cursor-default' 
                      : 'hover:bg-titan-card/40 cursor-pointer'
                  }`}
                  whileHover={task.done ? {} : { x: 3 }}
                >
                  <div className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                    task.done ? 'bg-emerald-500/30' : 'bg-titan-border/20'
                  }`}>
                    {task.done ? (
                      <CheckCircle2 className="h-3 w-3 text-emerald-400" />
                    ) : (
                      <div className="w-1.5 h-1.5 rounded-full bg-titan-muted/30" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-[11px] font-medium ${task.done ? 'line-through text-titan-muted/40' : ''}`}>
                      {task.label}
                    </p>
                    <p className="text-[9px] text-titan-muted/50 mt-0.5">{task.description}</p>
                  </div>
                </motion.button>
              ))}
            </div>
            {/* Phase CTA */}
            {!phase.completed && phase.progress > 0 && (
              <Button
                size="sm"
                className="w-full mt-2 text-[10px] h-7 gap-1"
                style={{ background: `linear-gradient(135deg, ${plugin.color}, ${plugin.color}88)`, color: '#0A0E17' }}
                onClick={() => {
                  const nextTask = phase.tasks.find(t => !t.done);
                  if (nextTask) onCompleteTask(phase.phase, nextTask.id, nextTask.label);
                }}
              >
                <Play className="h-2.5 w-2.5" />
                Continue Phase
              </Button>
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

// ─── Cross-Plugin Suggestion Cards ────────────────────────────────────

function CrossPluginSuggestions({ plugin, onActivatePlugin }: {
  plugin: LifeOSPlugin;
  onActivatePlugin: (category: LifeCategory) => void;
}) {
  const suggestions = getCrossPluginSuggestions(plugin);

  if (suggestions.length === 0) return null;

  return (
    <div className="px-5 pt-5 pb-1">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-2 h-2 rounded-full" style={{ background: '#A78BFA' }} />
        <h3 className="text-xs font-mono font-semibold tracking-wider" style={{ color: '#A78BFA' }}>
          CROSS-PLUGIN SUGGESTIONS
        </h3>
        <span className="text-[9px] font-mono text-titan-muted/50">// {plugin.emoji} {plugin.name} &rarr; partners</span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {suggestions.map((s, i) => (
          <motion.div
            key={`${s.targetCategory}-${i}`}
            className="rounded-xl border p-3.5 transition-all hover:scale-[1.01]"
            style={{
              background: 'linear-gradient(135deg, rgba(168,85,247,0.06), rgba(59,130,246,0.03))',
              borderColor: 'rgba(168,85,247,0.2)',
            }}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">{s.targetPluginEmoji}</span>
              <div>
                <p className="text-[11px] font-semibold">{s.targetPluginName}</p>
                <p className="text-[9px] text-titan-muted/50">{s.synergyLabel}</p>
              </div>
              <Badge
                className="ml-auto text-[8px] h-4 px-1.5 uppercase"
                style={{
                  background: 'rgba(168,85,247,0.15)',
                  color: '#A78BFA',
                  border: '1px solid rgba(168,85,247,0.25)',
                }}
              >
                +{((plugin.overallProgress >= 50 ? 1.25 : 1.2) * 100 - 100).toFixed(0)}% XP
              </Badge>
            </div>
            <ul className="space-y-1.5">
              {s.suggestions.map((sg, j) => (
                <li key={j} className="flex items-start gap-2 text-[10px] text-titan-muted/80">
                  <span className="text-titan-muted/30 mt-0.5 shrink-0">&#8226;</span>
                  <span>{sg.message}</span>
                </li>
              ))}
            </ul>
            <button
              onClick={() => onActivatePlugin(s.targetCategory)}
              className="mt-2.5 w-full text-[10px] py-1.5 rounded-lg font-medium flex items-center justify-center gap-1 transition-all"
              style={{
                background: 'rgba(168,85,247,0.1)',
                color: '#A78BFA',
                border: '1px solid rgba(168,85,247,0.2)',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(168,85,247,0.18)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(168,85,247,0.1)'; }}
            >
              Open {s.targetPluginName}
              <ChevronRight className="h-3 w-3" />
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
