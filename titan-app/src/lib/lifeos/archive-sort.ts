/**
 * LifeOS Plugin Archive & Reorder Engine
 *
 * Adds persistence for:
 *   - Archived plugins (hidden from main list, not deleted)
 *   - Custom sort order (drag-to-reorder via ordinals)
 *
 * All state stored under STORAGE_KEY in localStorage alongside the main
 * LifeOS state. Dual-writes to Supabase are NOT needed here — archive/sort
 * are UI-only affordances that don't affect LP progress or XP earning.
 */

export interface PluginMeta {
  order: number;     // sort ordinal (lower = first)
  archived: boolean; // hidden from active list
}

const META_KEY = 'titan-lifeos-plugin-meta';

// ─── Load / Save ────────────────────────────────────────────────────────

function loadMeta(): Record<string, PluginMeta> {
  if (typeof window === 'undefined') return {};
  try {
    const raw = localStorage.getItem(META_KEY);
    if (raw) return JSON.parse(raw);
  } catch {
    // corrupted — reset
  }
  return {};
}

function saveMeta(meta: Record<string, PluginMeta>) {
  try {
    localStorage.setItem(META_KEY, JSON.stringify(meta));
  } catch {
    // localStorage full or unavailable — silently skip
  }
}

// ─── Public API ─────────────────────────────────────────────────────────

/**
 * Toggle archive state for a plugin. Returns the new archived state.
 */
export function toggleArchive(pluginId: string): boolean {
  const meta = loadMeta();
  const current = meta[pluginId] ?? { order: 999, archived: false };
  const next = !current.archived;
  meta[pluginId] = { ...current, archived: next };
  saveMeta(meta);
  return next;
}

/**
 * Check if a plugin is archived.
 */
export function isArchived(pluginId: string): boolean {
  const meta = loadMeta();
  return meta[pluginId]?.archived ?? false;
}

/**
 * Set the sort ordinal for a plugin. Lower = first. Returns the new order.
 */
export function setOrder(pluginId: string, order: number): number {
  const meta = loadMeta();
  meta[pluginId] = { ...meta[pluginId], order, archived: meta[pluginId]?.archived ?? false };
  saveMeta(meta);
  return order;
}

/**
 * Swap two plugins' sort ordinals. Used by drag-and-drop or move-up/move-down.
 */
export function swapOrder(idA: string, idB: string): void {
  const meta = loadMeta();
  const a = meta[idA] ?? { order: 999, archived: false };
  const b = meta[idB] ?? { order: 999, archived: false };
  meta[idA] = { ...a, order: b.order };
  meta[idB] = { ...b, order: a.order };
  saveMeta(meta);
}

/**
 * Get all plugin metadata for display purposes.
 */
export function getAllMeta(): Record<string, PluginMeta> {
  return loadMeta();
}

/**
 * Sort an array of plugins by their stored order, with archived ones last.
 * Falls back to natural array order for unregistered plugins.
 */
export function sortPlugins<T extends { id: string }>(plugins: T[], includeArchived = false): T[] {
  const meta = loadMeta();

  const scored = plugins.map(p => {
    const m = meta[p.id];
    const order = m?.order ?? 999;
    const archived = m?.archived ?? false;
    return { plugin: p, order, archived };
  });

  scored.sort((a, b) => {
    // Archived always sink to bottom
    if (includeArchived) {
      if (a.archived !== b.archived) return a.archived ? 1 : -1;
    } else {
      if (a.archived) return 1;
      if (b.archived) return -1;
    }
    // Then by order
    return a.order - b.order;
  });

  return scored.map(s => s.plugin);
}

/**
 * Auto-assign sequential ordinals for all active plugins that don't have one yet.
 * Idempotent — won't overwrite existing orders.
 */
export function assignInitialOrders(pluginIds: string[]): void {
  const meta = loadMeta();
  let changed = false;

  pluginIds.forEach((id, idx) => {
    if (!meta[id]) {
      meta[id] = { order: idx, archived: false };
      changed = true;
    }
  });

  if (changed) saveMeta(meta);
}

/**
 * Move a plugin up (lower order) or down (higher order) relative to its non-archived peers.
 * Returns the new plugin order.
 */
export function movePlugin(pluginId: string, direction: 'up' | 'down', allPluginIds: string[]): number {
  const meta = loadMeta();
  const activeIds = allPluginIds.filter(id => !(meta[id]?.archived ?? false));

  const idx = activeIds.indexOf(pluginId);
  if (idx === -1) return meta[pluginId]?.order ?? 999;

  const swapIdx = direction === 'up' ? idx - 1 : idx + 1;
  if (swapIdx < 0 || swapIdx >= activeIds.length) return meta[pluginId]?.order ?? 999;

  // Swap ordinals
  swapOrder(pluginId, activeIds[swapIdx]);
  return meta[pluginId]?.order ?? 999;
}
