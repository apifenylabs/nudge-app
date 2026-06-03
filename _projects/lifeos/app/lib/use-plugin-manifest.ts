/**
 * LifeOS — usePluginManifest Hook
 *
 * Client-side hook that loads the plugin manifest from the best available source:
 *   1. Supabase (if configured) — live data
 *   2. localStorage (if previously cached) — offline from prior runs
 *   3. Static /plugin-manifest.json — built at prebuild time (always available)
 *
 * This is the single entry point for all plugin data on the client.
 * No component should import PLUGINS from plugin-registry directly.
 */

'use client';

import { useState, useEffect, useCallback } from 'react';
import { type PluginManifest, type PluginManifestEntry } from './plugin-manifest-schema';

const LS_KEY = 'lifeos-plugin-manifest';
const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes

interface UsePluginManifestResult {
  manifest: PluginManifest | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
  getPlugin: (id: string) => PluginManifestEntry | undefined;
  /** All plugins sorted by displayOrder */
  plugins: PluginManifestEntry[];
  /** Plugins filtered by status */
  activePlugins: PluginManifestEntry[];
}

/**
 * Load manifest from localStorage cache, respecting TTL.
 */
function loadFromCache(): { manifest: PluginManifest | null; fresh: boolean } {
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (!raw) return { manifest: null, fresh: false };

    const parsed = JSON.parse(raw) as { manifest: PluginManifest; cachedAt: number };
    const age = Date.now() - parsed.cachedAt;

    return {
      manifest: parsed.manifest,
      fresh: age < CACHE_TTL_MS,
    };
  } catch {
    return { manifest: null, fresh: false };
  }
}

/**
 * Save manifest to localStorage with timestamp.
 */
function saveToCache(manifest: PluginManifest): void {
  try {
    localStorage.setItem(LS_KEY, JSON.stringify({
      manifest,
      cachedAt: Date.now(),
    }));
  } catch {
    // localStorage might be full or unavailable; silently fail
  }
}

/**
 * Fetch manifest from the static JSON file built at prebuild time.
 * This is the guaranteed fallback — always available in production.
 */
async function fetchStaticManifest(): Promise<PluginManifest | null> {
  try {
    const res = await fetch('/plugin-manifest.json', {
      cache: 'no-cache',
    });
    if (!res.ok) return null;
    return await res.json() as PluginManifest;
  } catch {
    return null;
  }
}

/**
 * Fetch manifest from the API endpoint (which may use Supabase or build-time data).
 */
async function fetchApiManifest(): Promise<PluginManifest | null> {
  try {
    const res = await fetch('/api/plugins/manifest', {
      cache: 'no-cache',
    });
    if (!res.ok) return null;
    return await res.json() as PluginManifest;
  } catch {
    return null;
  }
}

/**
 * usePluginManifest — Load plugin manifest with offline-first fallback chain.
 *
 * Strategy:
 *   1. Return cached manifest immediately if within TTL (instant UX)
 *   2. Fetch from API in background (slow path with potential Supabase)
 *   3. If API fails, fall back to static /plugin-manifest.json
 *   4. On success, update cache for next load
 */
export function usePluginManifest(): UsePluginManifestResult {
  const [manifest, setManifest] = useState<PluginManifest | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);

    // Step 1: Return cached manifest immediately if fresh
    const cached = loadFromCache();
    if (cached.manifest && cached.fresh) {
      setManifest(cached.manifest);
      setLoading(false);
      return;
    }

    // Use cache as instant placeholder even if stale (better than blank screen)
    if (cached.manifest) {
      setManifest(cached.manifest);
      // Keep loading = true; we'll update when API/static responds
    }

    // Step 2: Try API (may hit Supabase if configured)
    try {
      const apiManifest = await fetchApiManifest();
      if (apiManifest) {
        saveToCache(apiManifest);
        setManifest(apiManifest);
        setLoading(false);
        return;
      }
    } catch {
      // API failed; fall through
    }

    // Step 3: Fall back to static JSON
    try {
      const staticManifest = await fetchStaticManifest();
      if (staticManifest) {
        saveToCache(staticManifest);
        setManifest(staticManifest);
        setLoading(false);
        return;
      }
    } catch {
      // Static failed too
    }

    // Step 4: Use stale cache as last resort
    if (cached.manifest) {
      setError('Using cached data — network unavailable');
      setLoading(false);
      return;
    }

    setError('Failed to load plugin manifest from any source');
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const plugins = manifest?.plugins ?? [];
  const activePlugins = plugins.filter(p => p.status === 'active' || p.status === 'beta');

  const getPlugin = useCallback(
    (id: string) => plugins.find(p => p.id === id),
    [plugins]
  );

  return {
    manifest,
    loading,
    error,
    refetch: load,
    getPlugin,
    plugins,
    activePlugins,
  };
}
