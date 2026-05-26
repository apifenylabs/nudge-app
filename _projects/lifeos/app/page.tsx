'use client';

import { useState, useEffect, useCallback } from 'react';
import PluginCatalog from './components/PluginCatalog';
import PluginDetail from './components/PluginDetail';
import DashboardHome from './components/DashboardHome';
import { loadState, saveState, activatePlugin, completeTask, type LifeOSPlugin, type LifeCategory, type PluginPhase } from './lib/plugins';
import WaitlistCard from './components/WaitlistCard';
import type { LifeOSState } from './lib/plugins';
import { initSupabaseSync, getLastSyncTime } from './lib/supabase-sync';
import { useAuth } from './lib/auth-context';
import AuthModal from './components/AuthModal';

export default function Home() {
  const [state, setState] = useState<LifeOSState>({ plugins: [], totalActions: 0, unlockedCategories: [] });
  const [showCatalog, setShowCatalog] = useState(false);
  const [showDashboard, setShowDashboard] = useState(true);
  const [activePlugin, setActivePlugin] = useState<LifeOSPlugin | null>(null);
  const [mounted, setMounted] = useState(false);

  const [syncStatus, setSyncStatus] = useState<'off' | 'connecting' | 'live' | 'error'>('off');
  const [showAuth, setShowAuth] = useState(false);
  const { user, loading: authLoading } = useAuth();

  useEffect(() => {
    setMounted(true);
    const s = loadState();
    setState(s);
    // Start on dashboard — let the user pick a plugin
    setShowDashboard(true);

    // Initialize Supabase sync (non-blocking)
    setSyncStatus('connecting');
    initSupabaseSync().then(enabled => {
      setSyncStatus(enabled ? 'live' : 'off');
    }).catch(() => {
      setSyncStatus('error');
    });
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
    setShowDashboard(false);
  }, [refresh]);

  const handleCompleteTask = useCallback((category: LifeCategory, phase: PluginPhase, taskId: string) => {
    completeTask(category, phase, taskId);
    refresh();
  }, [refresh]);

  const handleSelectPlugin = useCallback((plugin: LifeOSPlugin) => {
    setActivePlugin(plugin);
    setShowCatalog(false);
    setShowDashboard(false);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Waitlist CTA — prominent on landing page for early access signups */}
        <WaitlistCard />

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">LifeOS</h1>
            <p className="text-sm text-gray-500 mt-1">AI copilot for every area of your life</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => { setShowCatalog(true); setActivePlugin(null); }}
              className="px-4 py-2 text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 rounded-lg transition-colors"
            >
              + New Plugin
            </button>

            {/* Auth button */}
            {!authLoading && (
              <button
                onClick={() => setShowAuth(true)}
                className="px-3 py-2 text-sm font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors flex items-center gap-1.5"
                title={user ? user.email || 'Signed in' : 'Sign in'}
              >
                {user ? (
                  <span className="w-5 h-5 rounded-full bg-teal-500 text-white text-[10px] font-bold flex items-center justify-center">
                    {user.email?.charAt(0).toUpperCase() || '?'}
                  </span>
                ) : (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                )}
              </button>
            )}
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
          <span className="flex items-center gap-1.5 ml-auto">
            <span className={`w-2 h-2 rounded-full ${syncStatus === 'live' ? 'bg-green-500' : syncStatus === 'connecting' ? 'bg-yellow-500 animate-pulse' : syncStatus === 'error' ? 'bg-red-500' : 'bg-gray-400'}`} />
            <span className="text-xs text-gray-400">
              {syncStatus === 'live' ? 'Synced' : syncStatus === 'connecting' ? 'Connecting...' : syncStatus === 'error' ? 'Sync error' : 'Local only'}
            </span>
          </span>
        </div>

        {/* Navigation breadcrumb */}
        {!showCatalog && activePlugin && (
          <button
            onClick={() => { setActivePlugin(null); setShowDashboard(true); }}
            className="flex items-center gap-1 text-sm text-gray-400 hover:text-gray-600 mb-4 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Dashboard
          </button>
        )}

        {/* Main content: Dashboard → Catalog → Plugin Detail */}
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
        ) : showDashboard ? (
          <DashboardHome
            state={state}
            onSelectPlugin={handleSelectPlugin}
            onOpenCatalog={() => setShowCatalog(true)}
          />
        ) : (
          <DashboardHome
            state={state}
            onSelectPlugin={handleSelectPlugin}
            onOpenCatalog={() => setShowCatalog(true)}
          />
        )}

        {/* Auth Modal */}
        {showAuth && <AuthModal onClose={() => setShowAuth(false)} />}
      </div>
    </div>
  );
}
