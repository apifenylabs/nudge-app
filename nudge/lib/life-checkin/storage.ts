import { TRACKERS } from './trackers';

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

export interface LifeCheckinData {
  days: Record<string, DayEntry>;
}

const STORAGE_KEY = 'nudge_life_checkin';

// ── Helpers ──

export function getToday(): string {
  return new Date().toISOString().split('T')[0];
}

export function formatDateLabel(dateStr: string): string {
  const d = new Date(dateStr + 'T12:00:00');
  const today = getToday();
  const yesterday = getRelativeDate(today, -1);
  if (dateStr === today) return 'Today';
  if (dateStr === yesterday) return 'Yesterday';
  return d.toLocaleDateString('en-US', {
    weekday: 'short', month: 'short', day: 'numeric',
  });
}

export function getRelativeDate(from: string, offset: number): string {
  const d = new Date(from + 'T12:00:00');
  d.setDate(d.getDate() + offset);
  return d.toISOString().split('T')[0];
}

export function getScore(entry: DayEntry | undefined): number {
  if (!entry) return 0;
  let total = 0;
  TRACKERS.forEach((tk) => {
    const v = entry[tk.id as keyof DayEntry] ?? 0;
    total += v as number;
  });
  return Math.round((total / TRACKERS.length) * 25);
}

export function computeStreak(days: Record<string, DayEntry>): number {
  const sorted = Object.keys(days || {}).sort().reverse();
  if (!sorted.length) return 0;
  let streak = 0;
  const today = getToday();

  // Check if today is tracked
  const hasToday = sorted.includes(today);
  if (!hasToday) {
    // Check if yesterday is tracked (so streak still active)
    const yesterday = getRelativeDate(today, -1);
    if (!sorted.includes(yesterday)) return 0;
  }

  for (let i = 0; i < sorted.length; i++) {
    if (i === 0 && sorted[i] !== today) break;
    const expected = getRelativeDate(today, -i);
    if (sorted[i] === expected) {
      streak++;
    } else if (i > 0 || !hasToday) {
      break;
    }
  }
  return streak;
}

// ── localStorage helpers ──

export function loadFromLocalStorage(): LifeCheckinData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { days: {} };
    return JSON.parse(raw) as LifeCheckinData;
  } catch {
    return { days: {} };
  }
}

export function saveToLocalStorage(d: LifeCheckinData) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(d));
  } catch {
    // Silently fail (private browsing, quota exceeded)
  }
}

export function loadDayFromStorage(date: string): { dayEntry: DayEntry; allDays: LifeCheckinData } {
  const data = loadFromLocalStorage();
  const entry = data.days?.[date] || {};
  return { dayEntry: entry, allDays: data };
}

export function saveDayEntry(date: string, entry: DayEntry): LifeCheckinData {
  const data = loadFromLocalStorage();
  if (!data.days) data.days = {};
  data.days[date] = entry;
  saveToLocalStorage(data);
  return data;
}

// ── Supabase sync (fire-and-forget) ──

/**
 * Upsert a single day's check-in to the `daily_checkins` table.
 * Fire-and-forget — never throws, always runs in background.
 */
export async function syncDayToSupabase(
  dateStr: string,
  entry: DayEntry,
  userId?: string,
): Promise<void> {
  if (!userId) return;
  try {
    const { createBrowserSupabaseClient } = await import('@/lib/supabase');
    const supabase = createBrowserSupabaseClient();
    if (!supabase) return;

    const payload: Record<string, unknown> = {
      user_id: userId,
      date: dateStr,
      data: entry,
    };

    const { error } = await supabase
      .from('daily_checkins')
      .upsert(payload, { onConflict: 'user_id,date' });

    if (error) {
      console.warn('[LifeCheckin] Supabase sync failed:', error.message);
    }
  } catch {
    // Silently fail — localStorage is primary source of truth.
  }
}

/**
 * Load all check-ins from Supabase for a given user.
 * Returns null on error, so caller can fall back to localStorage.
 */
export async function loadFromSupabase(userId: string): Promise<LifeCheckinData | null> {
  try {
    const { createBrowserSupabaseClient } = await import('@/lib/supabase');
    const supabase = createBrowserSupabaseClient();
    if (!supabase) return null;

    const { data, error } = await supabase
      .from('daily_checkins')
      .select('date, data')
      .eq('user_id', userId)
      .order('date', { ascending: false });

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
