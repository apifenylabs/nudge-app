'use client';

import { useState, useEffect, useCallback } from 'react';
import PluginCatalog from './components/PluginCatalog';
import PluginDetail from './components/PluginDetail';
import { loadState, saveState, activatePlugin, completeTask, type LifeOSPlugin, type LifeCategory, type PluginPhase } from './lib/plugins';
import type { LifeOSState } from './lib/plugins';

export default function Home() {
  const [state, setState] = useState<LifeOSState>({ plugins: [], totalActions: 0, unlockedCategories: [] });
  const [activePlugin, setActivePlugin] = useState<LifeOSPlugin | null>(null);
  const [showCatalog, setShowCatalog] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const s = loadState();
    setState(s);
    if (s.plugins.length > 0) {
      setActivePlugin(s.plugins[s.plugins.length - 1]);
    }
  }, []);

  const refresh = useCallback(() => {
    const s = loadState();
    setState(s);
    // Keep active plugin in sync
    setActivePlugin(prev => {
      if (!prev) return s.plugins.length > 0 ? s.plugins[s.plugins.length - 1] : null;
      const updated = s.plugins.find(p => p.id === prev.id);
      return updated || (s.plugins.length > 0 ? s.plugins[s.plugins.length - 1] : null);
    });
  }, []);

  const handleActivate = useCallback((category: LifeCategory) => {
    const plugin = activatePlugin(category);
    saveState(loadState());
    refresh();
    setActivePlugin(plugin);
    setShowCatalog(false);
  }, [refresh]);

  const handleCompleteTask = useCallback((category: LifeCategory, phase: PluginPhase, taskId: string) => {
    completeTask(category, phase, taskId);
    refresh();
  }, [refresh]);

  const handleSelectPlugin = useCallback((plugin: LifeOSPlugin) => {
    setActivePlugin(plugin);
    setShowCatalog(false);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">LifeOS</h1>
            <p className="text-sm text-gray-500 mt-1">AI copilot for every area of your life</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => { setShowCatalog(true); setActivePlugin(null); }}
              className="px-4 py-2 text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 rounded-lg transition-colors"
            >
              + New Plugin
            </button>
          </div>
        </div>

        {/* Stats bar */}
        <div className="flex items-center gap-4 mb-6 text-sm text-gray-500 bg-gray-50 rounded-xl px-4 py-3 border border-gray-100">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-teal-500" />
            <span className="font-semibold text-gray-900">{state.plugins.length}</span> active plugins
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-amber-500" />
            <span className="font-semibold text-gray-900">{state.totalActions}</span> total actions
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span className="font-semibold text-gray-900">{state.unlockedCategories.length}</span> categories
          </span>
        </div>

        {/* Main content */}
        {showCatalog ? (
          <PluginCatalog
            state={state}
            onActivate={handleActivate}
            onClose={() => { setShowCatalog(false); refresh(); }}
          />
        ) : activePlugin ? (
          <PluginDetail
            plugin={activePlugin}
            plugins={state.plugins}
            onCompleteTask={handleCompleteTask}
            onSelectPlugin={handleSelectPlugin}
          />
        ) : (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">No plugins active</h2>
            <p className="text-gray-500 mb-6 max-w-md">Activate a LifeOS plugin to start guided phases for your travel, health, family, finance, or any life category.</p>
            <button
              onClick={() => setShowCatalog(true)}
              className="px-6 py-2.5 text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 rounded-lg transition-colors"
            >
              Browse Plugin Catalog
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
