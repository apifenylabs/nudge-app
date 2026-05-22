import { supabaseConfigured, getSupabaseClient } from './supabase-client';

// Re-export from trackers for convenience
import { TRACKERS as _TRACKERS, type TrackerDef, type TrackerOption } from '../data/trackers';
export const TRACKERS = _TRACKERS;
export type { TrackerDef, TrackerOption };

export function getTrackerLabel(id: string): string {
  const t = _TRACKERS.find(tk => tk.id === id);
  return t?.label ?? id;
}

export interface DayEntry {
  sleep?: number;
  mood?: number;
  energy?: number;
  exercise?: number;
  food?: number;
  productivity?: number;
  social?: number;
  mindfulness?: number;
  work?: number;
  learning?: number;
  finance?: number;
  homecare?: number;
  creativity?: number;
  notes?: string;
}

export interface LifeOSData {
  days: Record<string, DayEntry>;
}

const STORAGE_KEY = 'lifeos';

// ── localStorage helpers ──

export function loadFromLocalStorage(): LifeOSData {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
  } catch {
    return { days: {} };
  }
}

export function saveToLocalStorage(d: LifeOSData) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(d));
}

// ── Supabase sync helpers (fire-and-forget) ──

/**
 * Upsert a single day's entry to the `lifeos_entries` table.
 * Fire-and-forget: never throws to the caller, always runs in the background.
 */
export async function syncDayToSupabase(
  date: string,
  entry: DayEntry,
  userId?: string,
): Promise<void> {
  if (!supabaseConfigured) return;
  try {
    const supabase = getSupabaseClient();
    if (!supabase) return;

    const payload: Record<string, unknown> = {
      date,
      data: entry,
      updated_at: new Date().toISOString(),
    };
    if (userId) payload.user_id = userId;

    await (supabase.from('lifeos_entries') as any).upsert([payload], {
      onConflict: userId ? 'user_id,date' : 'date',
    });
  } catch {
    // Silently fail — localStorage is the primary source of truth.
  }
}

/**
 * Load all entries from Supabase and merge into a LifeOSData.
 * Returns null if not configured or on error, so the caller falls back to storage.
 */
export async function loadFromSupabase(userId?: string): Promise<LifeOSData | null> {
  if (!supabaseConfigured) return null;
  try {
    const supabase = getSupabaseClient();
    if (!supabase) return null;

    const qb: any = supabase.from('lifeos_entries').select('date,data').order('date', { ascending: false });
    if (userId) qb.eq('user_id', userId);

    const { data, error } = await qb;
    if (error) return null;

    const days: Record<string, DayEntry> = {};
    for (const row of data ?? []) {
      const r = row as { date: string; data: DayEntry };
      if (r.date && r.data) {
        days[r.date] = r.data;
      }
    }
    return { days };
  } catch {
    return null;
  }
}

/**
 * Sync all entries to Supabase (useful for full re-upload).
 * Fire-and-forget.
 */
export async function syncAllToSupabase(
  data: LifeOSData,
  userId?: string,
): Promise<void> {
  if (!supabaseConfigured) return;
  for (const [date, entry] of Object.entries(data.days ?? {})) {
    await syncDayToSupabase(date, entry, userId);
  }
}
