/**
 * LifeOS Plugin Manifest Schema — v2
 *
 * Single source of truth for plugin definitions used across the app.
 * This replaces the need for database persistence in dev/mock mode.
 * All plugins are defined here and loaded at runtime from localStorage
 * (with Supabase optional for live sync).
 *
 * Architecture:
 *   manifest.json  ←  plugin-manifest-schema.ts (TypeScript types + defaults)
 *        ↓
 *   localStorage  (offline/mock)  →  fallback if Supabase unavailable
 *        ↓
 *   Supabase      (live sync)     →  plugin_sessions table (pending CEO migration)
 *
 * When in mock mode: pages read from in-memory PLUGINS array directly.
 * When Supabase is connected: can persist user plugin states, progress, streaks.
 */

// ══════════════════════════════════════════════════════════════════
// TYPE DEFINITIONS — Shared contract for all plugin consumers
// ══════════════════════════════════════════════════════════════════

export interface PluginManifest {
  /** Schema version for migration tracking */
  schemaVersion: number;
  /** When this manifest was generated */
  generatedAt: string;
  /** All registered plugins */
  plugins: PluginManifestEntry[];
}

export interface PluginManifestEntry {
  /** Unique plugin ID (e.g. "travel", "finance") */
  id: string;
  /** Human-readable name */
  name: string;
  /** Single emoji for visual identification */
  emoji: string;
  /** Short tagline */
  description: string;
  /** Plugin lifecycle status */
  status: 'active' | 'beta' | 'coming-soon' | 'deprecated';
  /** Tailwind gradient class for cards */
  gradient: string;
  /** Display badge text */
  badge: string;
  /** Category grouping */
  category: PluginCategory;
  /** Feature list for marketing / landing page */
  features: string[];
  /** Number of conversation phases */
  phaseCount: number;
  /** Order for display (lower = shown first) */
  displayOrder: number;
  /** Date this was added to the manifest (ISO) */
  createdAt: string;
  /** Date of last update (ISO) */
  updatedAt: string;
  /** Config flags for behavior */
  config: PluginConfig;
}

export type PluginCategory =
  | 'lifestyle'
  | 'finance'
  | 'health'
  | 'career'
  | 'learning'
  | 'relationships'
  | 'home'
  | 'productivity'
  | 'mindfulness';

export interface PluginConfig {
  /** Whether this plugin requires Supabase session persistence */
  requiresDb: boolean;
  /** Whether user progress is tracked across sessions */
  tracksProgress: boolean;
  /** Whether this plugin supports Excalidraw canvas */
  supportsCanvas: boolean;
  /** Whether this plugin can run fully offline */
  offlineCapable: boolean;
  /** Max context messages to retain (0 = unlimited) */
  maxContextMessages: number;
  /** Default temperature for the AI model (0.0 – 1.0) */
  defaultTemperature: number;
}

// ══════════════════════════════════════════════════════════════════
// CATEGORY METADATA
// ══════════════════════════════════════════════════════════════════

export const PLUGIN_CATEGORIES: Record<PluginCategory, {
  label: string
  emoji: string
  description: string
}> = {
  lifestyle: { label: 'Lifestyle', emoji: '🌍', description: 'Travel, family, and everyday life management' },
  finance: { label: 'Finance', emoji: '💰', description: 'Budgeting, investing, and financial planning' },
  health: { label: 'Health', emoji: '💪', description: 'Wellness, fitness, sleep, and mental health' },
  career: { label: 'Career', emoji: '💼', description: 'Job growth, skills, and professional development' },
  learning: { label: 'Learning', emoji: '📚', description: 'Courses, skills, and structured education' },
  relationships: { label: 'Relationships', emoji: '💑', description: 'Partnership, communication, and connection' },
  home: { label: 'Home', emoji: '🏠', description: 'Home improvement, maintenance, and organization' },
  productivity: { label: 'Productivity', emoji: '⚡', description: 'Habits, systems, and personal effectiveness' },
  mindfulness: { label: 'Mindfulness', emoji: '🧘', description: 'Meditation, focus, stress relief, and mental clarity' },
};

// ══════════════════════════════════════════════════════════════════
// DEFAULT CONFIGURATIONS
// ══════════════════════════════════════════════════════════════════

export const DEFAULT_PLUGIN_CONFIG: PluginConfig = {
  requiresDb: false,
  tracksProgress: true,
  supportsCanvas: true,
  offlineCapable: true,
  maxContextMessages: 50,
  defaultTemperature: 0.7,
};

// ══════════════════════════════════════════════════════════════════
// BUILD MANIFEST FROM REGISTRY
// ══════════════════════════════════════════════════════════════════

/**
 * Build a full plugin manifest from the in-memory plugin definitions.
 * This produces a JSON-serializable manifest for storage, export, or API response.
 */
export function buildManifest(): PluginManifest {
  // Dynamic import to avoid circular dependency
  const { PLUGINS } = require('./plugin-registry');

  const entries: PluginManifestEntry[] = PLUGINS.map((p: any, index: number) => ({
    id: p.id,
    name: p.name,
    emoji: p.emoji,
    description: p.description,
    status: p.status,
    gradient: p.gradient,
    badge: p.badge,
    category: inferCategory(p.id),
    features: p.features,
    phaseCount: p.phases.length,
    displayOrder: index + 1,
    createdAt: '2026-05-15T00:00:00.000Z', // v2 launch
    updatedAt: new Date().toISOString(),
    config: {
      ...DEFAULT_PLUGIN_CONFIG,
      // Specific overrides per plugin
      ...(p.id === 'travel' ? { maxContextMessages: 100 } : {}),
      ...(p.id === 'finance' ? { defaultTemperature: 0.5 } : {}),
      ...(p.id === 'health' ? { tracksProgress: true } : {}),
    },
  }));

  return {
    schemaVersion: 2,
    generatedAt: new Date().toISOString(),
    plugins: entries,
  };
}

function inferCategory(pluginId: string): PluginCategory {
  const categoryMap: Record<string, PluginCategory> = {
    travel: 'lifestyle',
    finance: 'finance',
    health: 'health',
    career: 'career',
    learning: 'learning',
    family: 'lifestyle',
    home: 'home',
    social: 'lifestyle',
    mindfulness: 'mindfulness',
    relationships: 'relationships',
  };
  return categoryMap[pluginId] || 'productivity';
}

// ══════════════════════════════════════════════════════════════════
// LOCALSTORAGE HELPERS (mock/offline mode)
// ══════════════════════════════════════════════════════════════════

const LS_KEY = 'lifeos-plugin-manifest';

/**
 * Persist the manifest to localStorage for offline use.
 * Returns true if successful.
 */
export function persistManifestToLocalStorage(): boolean {
  try {
    const manifest = buildManifest();
    localStorage.setItem(LS_KEY, JSON.stringify(manifest));
    return true;
  } catch {
    return false;
  }
}

/**
 * Load manifest from localStorage (fallback when Supabase unavailable).
 * Returns null if not found.
 */
export function loadManifestFromLocalStorage(): PluginManifest | null {
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as PluginManifest;
  } catch {
    return null;
  }
}

/**
 * Get a specific plugin entry from localStorage manifest.
 */
export function getPluginFromLocalStorage(id: string): PluginManifestEntry | null {
  const manifest = loadManifestFromLocalStorage();
  if (!manifest) return null;
  return manifest.plugins.find(p => p.id === id) ?? null;
}

// ══════════════════════════════════════════════════════════════════
// EXPORTABLE JSON STRING (for static generation / API)
// ══════════════════════════════════════════════════════════════════

/**
 * Generate a static JSON string suitable for saving as `/data/plugin-manifest.json`
 * for build-time consumption or API endpoint response.
 */
export function generateManifestJson(): string {
  return JSON.stringify(buildManifest(), null, 2);
}
