'use client';

/**
 * LifeOS — Adapter Connection Panel
 *
 * UI for configuring third-party API adapters (Headspace, Calm, etc.).
 * Stores configs in localStorage (Supabase blocked).
 * Shows connection status, allows test-connect, and exposes connected
 * adapters for use by WeeklyDigest and plugin pages.
 *
 * Features:
 * - List available adapters from registry
 * - Form to enter API keys
 * - Test connection button
 * - Status badges (connected / disconnected / error)
 * - Persist configs to localStorage
 */

import { useState, useEffect, useCallback } from 'react';
import { pluginAdapterRegistry } from '../lib/plugin-adapter-registry';
import type { MindfulnessAdapter, HobbyAdapter } from '../lib/plugin-adapters';

/* ─── Types ───────────────────────────────────────────────────────── */

interface SavedAdapterConfig {
  apiKey: string;
  baseUrl?: string;
  timeoutMs?: number;
}

interface AdapterState {
  provider: string;
  label: string;
  emoji: string;
  config?: SavedAdapterConfig;
  status: 'disconnected' | 'connecting' | 'connected' | 'error';
  errorMessage?: string;
  schema: Record<string, any>;
}

const PROVIDER_META: Record<string, { label: string; emoji: string; gradient: string }> = {
  headspace: {
    label: 'Headspace',
    emoji: '🧡',
    gradient: 'from-orange-50 to-amber-50',
  },
  calm: {
    label: 'Calm',
    emoji: '💙',
    gradient: 'from-blue-50 to-indigo-50',
  },
  skillshare: {
    label: 'Skillshare',
    emoji: '🎨',
    gradient: 'from-green-50 to-teal-50',
  },
  udemy: {
    label: 'Udemy',
    emoji: '📚',
    gradient: 'from-purple-50 to-violet-50',
  },
  youtube: {
    label: 'YouTube',
    emoji: '▶️',
    gradient: 'from-red-50 to-rose-50',
  },
};

const STORAGE_KEY = 'lifeos_adapter_configs';

/* ─── localStorage persistence ───────────────────────────────────── */

function loadSavedConfigs(): Record<string, SavedAdapterConfig> {
  if (typeof window === 'undefined') return {};
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveConfigs(configs: Record<string, SavedAdapterConfig>): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(configs));
  } catch {
    // localStorage full — silently fail
  }
}

/* ─── Main Component ─────────────────────────────────────────────── */

export default function AdapterConnectionPanel() {
  const [adapters, setAdapters] = useState<AdapterState[]>([]);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [apiKeyInputs, setApiKeyInputs] = useState<Record<string, string>>({});

  // Load saved configs and build adapter states
  useEffect(() => {
    const saved = loadSavedConfigs();
    const available = pluginAdapterRegistry.listAvailable();

    const allProviders = available.flatMap(p =>
      p.providers.map(provider => ({ plugin: p.plugin, provider }))
    );

    if (allProviders.length === 0) return;

    const states: AdapterState[] = allProviders.map(({ plugin, provider }) => {
      const meta = PROVIDER_META[provider] || {
        label: provider.charAt(0).toUpperCase() + provider.slice(1),
        emoji: '🔌',
        gradient: 'from-gray-50 to-gray-100',
      };

      const savedConfig = saved[provider];
      const status = savedConfig?.apiKey ? 'disconnected' : 'disconnected';

      // Schema based on plugin category (same shape for all)
      const schema = {
        apiKey: { type: 'string', required: true, label: 'API Key' },
        baseUrl: { type: 'string', required: false, label: 'Custom API Base URL' },
        timeoutMs: { type: 'number', required: false, label: 'Timeout (ms)', default: 10000 },
      };

      return {
        provider,
        label: meta.label,
        emoji: meta.emoji,
        config: savedConfig,
        status: status as AdapterState['status'],
        schema: schema as Record<string, any>,
        plugin, // track which plugin category this belongs to
      } as AdapterState & { plugin: string };
    });

    setAdapters(states);
  }, []);

  // Set initial API key inputs from saved configs
  useEffect(() => {
    const inputs: Record<string, string> = {};
    for (const a of adapters) {
      if (a.config?.apiKey) {
        inputs[a.provider] = a.config.apiKey;
      }
    }
    setApiKeyInputs(inputs);
  }, [adapters]);

  /* ── Test Connection ────────────────────────────────────────── */

  /** Map provider to its plugin category via current adapter states */
  const getPluginForProvider = useCallback((provider: string): string => {
    const match = adapters.find(a => a.provider === provider);
    return (match as any)?.plugin || 'mindfulness-os';
  }, [adapters]);

  const testConnection = useCallback(async (provider: string) => {
    setAdapters(prev =>
      prev.map(a => a.provider === provider ? { ...a, status: 'connecting', errorMessage: undefined } : a)
    );

    const saved = loadSavedConfigs();
    const config = saved[provider];
    if (!config?.apiKey) {
      setAdapters(prev =>
        prev.map(a => a.provider === provider
          ? { ...a, status: 'error', errorMessage: 'No API key configured' }
          : a
        )
      );
      return;
    }

    // Determine plugin category from stored state
    const plugin = getPluginForProvider(provider);

    try {
      const adapter = pluginAdapterRegistry.createAdapter(
        plugin,
        provider,
        config as unknown as Record<string, unknown>,
      ) as MindfulnessAdapter | HobbyAdapter | null;

      if (!adapter) {
        setAdapters(prev =>
          prev.map(a => a.provider === provider
            ? { ...a, status: 'error', errorMessage: 'Adapter not available' }
            : a
          )
        );
        return;
      }

      const health = await adapter.healthCheck();
      setAdapters(prev =>
        prev.map(a => a.provider === provider
          ? { ...a, status: health.ok ? 'connected' : 'error', errorMessage: health.ok ? undefined : 'Health check failed' }
          : a
        )
      );
    } catch (err: any) {
      setAdapters(prev =>
        prev.map(a => a.provider === provider
          ? { ...a, status: 'error', errorMessage: err?.message || 'Connection failed' }
          : a
        )
      );
    }
  }, [getPluginForProvider]);

  /* ── Save Config ────────────────────────────────────────────── */

  const saveConfig = useCallback((provider: string, apiKey: string) => {
    if (!apiKey.trim()) return;

    const saved = loadSavedConfigs();
    saved[provider] = {
      apiKey: apiKey.trim(),
      baseUrl: saved[provider]?.baseUrl,
      timeoutMs: saved[provider]?.timeoutMs || 10000,
    };
    saveConfigs(saved);

    setAdapters(prev =>
      prev.map(a => a.provider === provider
        ? { ...a, config: saved[provider], status: 'disconnected' as const }
        : a
      )
    );

    // Auto-test after save
    setTimeout(() => testConnection(provider), 300);
  }, [testConnection]);

  /* ── Remove Config ──────────────────────────────────────────── */

  const removeConfig = useCallback((provider: string) => {
    const saved = loadSavedConfigs();
    delete saved[provider];
    saveConfigs(saved);

    setAdapters(prev =>
      prev.map(a => a.provider === provider
        ? { ...a, config: undefined, status: 'disconnected' as const, errorMessage: undefined }
        : a
      )
    );

    setApiKeyInputs(prev => ({ ...prev, [provider]: '' }));
  }, []);

  /* ── Render ─────────────────────────────────────────────────── */

  const connectedCount = adapters.filter(a => a.status === 'connected').length;

  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden">
      {/* Header */}
      <div className="px-5 py-4 border-b border-gray-100 bg-gray-50/50">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-semibold text-gray-900 flex items-center gap-2">
              🔌 External Connections
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">
              Connect mindfulness, learning, and hobby apps to enrich your LifeOS dashboard with real session data.
            </p>
          </div>
          {connectedCount > 0 && (
            <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
              {connectedCount} connected
            </span>
          )}
        </div>
      </div>

      {/* Adapter list */}
      <div className="divide-y divide-gray-100">
        {adapters.length === 0 && (
          <div className="px-5 py-8 text-center text-sm text-gray-400">
            No external adapters available. They will appear here when registered.
          </div>
        )}

        {adapters.map(adapter => {
          const isExpanded = expanded === adapter.provider;

          return (
            <div key={adapter.provider}>
              {/* Row */}
              <div
                className="flex items-center justify-between px-5 py-3.5 hover:bg-gray-50/50 cursor-pointer transition-colors"
                onClick={() => setExpanded(isExpanded ? null : adapter.provider)}
              >
                <div className="flex items-center gap-3">
                  <span className="text-lg">{adapter.emoji}</span>
                  <div>
                    <span className="text-sm font-medium text-gray-900">{adapter.label}</span>
                    {adapter.config?.apiKey && (
                      <span className="text-[10px] text-gray-400 ml-2 font-mono">
                        ••••{adapter.config.apiKey.slice(-4)}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <StatusBadge status={adapter.status} />
                  <svg
                    className={`w-4 h-4 text-gray-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                    fill="none" stroke="currentColor" viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>

              {/* Expanded form */}
              {isExpanded && (
                <div className="px-5 pb-5 pt-1 border-t border-gray-50 bg-gray-50/30">
                  {/* API Key Input */}
                  <div className="mb-3">
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                      {adapter.schema?.apiKey?.label || 'API Key'}
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="password"
                        value={apiKeyInputs[adapter.provider] || ''}
                        onChange={(e) =>
                          setApiKeyInputs(prev => ({ ...prev, [adapter.provider]: e.target.value }))
                        }
                        placeholder={adapter.config?.apiKey ? 'Enter new key to replace…' : 'sk-…'}
                        className="flex-1 px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent bg-white"
                      />
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          saveConfig(adapter.provider, apiKeyInputs[adapter.provider] || '');
                        }}
                        disabled={!apiKeyInputs[adapter.provider]?.trim()}
                        className="px-4 py-2 text-sm font-medium bg-teal-600 text-white rounded-lg hover:bg-teal-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                      >
                        Save & Test
                      </button>
                    </div>
                    <p className="text-[10px] text-gray-400 mt-1">
                      Your API key is stored locally and never sent to LifeOS servers.
                    </p>
                  </div>

                  {/* Actions row */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        testConnection(adapter.provider);
                      }}
                      disabled={!adapter.config?.apiKey || adapter.status === 'connecting'}
                      className="text-xs px-3 py-1.5 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-100 disabled:opacity-40 transition-colors"
                    >
                      {adapter.status === 'connecting' ? 'Testing…' : 'Test Connection'}
                    </button>
                    {adapter.config?.apiKey && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          removeConfig(adapter.provider);
                        }}
                        className="text-xs px-3 py-1.5 rounded-lg border border-red-200 text-red-500 hover:bg-red-50 transition-colors"
                      >
                        Remove Key
                      </button>
                    )}
                  </div>

                  {/* Error message */}
                  {adapter.status === 'error' && adapter.errorMessage && (
                    <div className="mt-3 text-xs text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                      ⚠️ {adapter.errorMessage}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Info footer */}
      <div className="px-5 py-3 border-t border-gray-100 bg-gray-50/50">
        <p className="text-[10px] text-gray-400 flex items-center gap-1">
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Adapter data appears in your Weekly Digest, Learning OS, and Hobbies OS dashboards when connected.
          {connectedCount === 0 && <span className="text-gray-300 ml-1">— No active connections.</span>}
        </p>
      </div>
    </div>
  );
}

/* ─── Status Badge ──────────────────────────────────────────────── */

function StatusBadge({ status }: { status: AdapterState['status'] }) {
  switch (status) {
    case 'connected':
      return (
        <span className="flex items-center gap-1 text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          Live
        </span>
      );
    case 'connecting':
      return (
        <span className="flex items-center gap-1 text-xs font-medium text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
          Testing
        </span>
      );
    case 'error':
      return (
        <span className="flex items-center gap-1 text-xs font-medium text-red-600 bg-red-50 px-2 py-0.5 rounded-full border border-red-200">
          <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
          Error
        </span>
      );
    default:
      return (
        <span className="text-xs text-gray-400 bg-gray-50 px-2 py-0.5 rounded-full border border-gray-200">
          {null}
        </span>
      );
  }
}
