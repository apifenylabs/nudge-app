/**
 * LifeOS — Calm Mindfulness Adapter
 * ==================================
 * Concrete implementation of MindfulnessAdapter for Calm.
 *
 * Maps Calm's public API to the LifeOS MindfulnessAdapter interface.
 * Handles: meditation sessions, breathing exercises, sleep stories,
 * daily calm, mood tracking, and streak data.
 *
 * API Reference: https://developers.calm.com/api
 * Authentication: Bearer token (OAuth 2.0 or personal access token)
 *
 * @packageDocumentation
 */

import type {
  MindfulnessAdapter,
  MindfulnessAdapterConfig,
  MindfulnessSession,
  MindfulnessSummary,
  MindfulnessMetric,
} from './plugin-adapters';

/* ─── Types ─────────────────────────────────────────────────────────────── */

/** Raw session object from Calm API (meditation/sleep/breathing). */
interface CalmRawSession {
  id: string;
  content_type: 'meditation' | 'sleep_story' | 'breathing' | 'body_scan' | 'music';
  title: string;
  started_at: string;
  duration_seconds: number;
  completed: boolean;
  daily_calm: boolean;
  mood_before?: number;
  mood_after?: number;
  notes?: string;
  tags?: string[];
  series_name?: string;
  teacher_name?: string;
}

/** Raw user stats from Calm API. */
interface CalmRawStats {
  total_minutes_this_week: number;
  total_sessions_this_week: number;
  current_streak: number;
  longest_streak: number;
  total_sessions: number;
  last_session: CalmRawSession | null;
  daily_calm_streak: number;
  sleep_stories_listened: number;
  breathing_exercises: number;
}

/** Raw mood log entry from Calm API. */
interface CalmMoodEntry {
  date: string;
  score: number;
  session_id?: string;
}

/* ─── API Endpoints ─────────────────────────────────────────────────────── */

const API_BASE = 'https://api.calm.com/v1';

const ENDPOINTS = {
  sessions:    `${API_BASE}/sessions`,
  stats:       `${API_BASE}/stats/summary`,
  connect:     `${API_BASE}/users/me`,
  moodLog:     `${API_BASE}/mood/logs`,
  breathing:   `${API_BASE}/breathing/sessions`,
  dailyCalm:   `${API_BASE}/daily-calm/history`,
  health:      `${API_BASE}/health`,
} as const;

/* ─── Defaults ──────────────────────────────────────────────────────────── */

const DEFAULT_TIMEOUT_MS = 10_000;
const PROVIDER_NAME = 'calm';

/* ─── Adapter ───────────────────────────────────────────────────────────── */

/**
 * Concrete Calm adapter.
 *
 * Usage:
 * ```ts
 * const calm = new CalmAdapter({ apiKey: process.env.CALM_API_KEY! });
 * await calm.connect();
 * const sessions = await calm.getSessions('2026-01-01', '2026-06-04');
 * ```
 */
export class CalmAdapter implements MindfulnessAdapter {
  readonly provider = PROVIDER_NAME;
  readonly config: MindfulnessAdapterConfig;
  private connected = false;
  private abortController: AbortController | null = null;

  constructor(config: MindfulnessAdapterConfig) {
    this.config = {
      ...config,
      baseUrl: config.baseUrl ?? API_BASE,
      timeoutMs: config.timeoutMs ?? DEFAULT_TIMEOUT_MS,
    };
  }

  /* ── Connection ─────────────────────────────────────────────────────── */

  async connect(): Promise<boolean> {
    try {
      const res = await this.request(ENDPOINTS.connect);
      this.connected = res.ok;
      return this.connected;
    } catch {
      this.connected = false;
      return false;
    }
  }

  /* ── Sessions ───────────────────────────────────────────────────────── */

  async getSessions(from: string, to: string): Promise<MindfulnessSession[]> {
    const params = new URLSearchParams({
      start_date: from,
      end_date: to,
      per_page: '100',
    });
    const res = await this.request(`${ENDPOINTS.sessions}?${params}`);

    if (!res.ok) {
      throw new CalmError(`Failed to fetch sessions: ${res.status}`, res.status);
    }

    const data: { data: CalmRawSession[] } = await res.json();
    return data.data.map(mapSession);
  }

  /* ── Summary ────────────────────────────────────────────────────────── */

  async getSummary(): Promise<MindfulnessSummary> {
    // Fetch stats and recent sessions in parallel
    const [statsRes, recentSessions] = await Promise.all([
      this.request(ENDPOINTS.stats),
      this.getRecentSessions(3),
    ]);

    if (!statsRes.ok) {
      throw new CalmError(`Failed to fetch stats: ${statsRes.status}`, statsRes.status);
    }

    const raw: CalmRawStats = await statsRes.json();

    return {
      totalMinutesThisWeek: raw.total_minutes_this_week,
      totalSessionsThisWeek: raw.total_sessions_this_week,
      currentStreakDays: raw.current_streak,
      longestStreakDays: raw.longest_streak,
      averageMoodDelta: await this.computeAverageMoodDelta(recentSessions),
      lastSession: recentSessions.length > 0 ? recentSessions[0] : null,
    };
  }

  /* ── Metrics ────────────────────────────────────────────────────────── */

  async getMetric(metric: MindfulnessMetric, from: string, to: string): Promise<number[]> {
    switch (metric) {
      case 'meditation_minutes': {
        const sessions = await this.getSessions(from, to);
        return aggregateByDay(sessions, (s) => s.durationSeconds / 60);
      }

      case 'session_count': {
        const sessions = await this.getSessions(from, to);
        return aggregateByDay(sessions, () => 1);
      }

      case 'streak_days': {
        const raw = await this.fetchRawStats();
        return [raw.current_streak, raw.longest_streak];
      }

      case 'mood_score': {
        // Get mood log entries rather than post-session mood for richer data
        return this.getMoodScores(from, to);
      }

      case 'breathing_exercises_completed': {
        const sessions = await this.getSessions(from, to);
        const breathing = sessions.filter(
          (s) => s.type === 'breathwork' || s.provider === PROVIDER_NAME,
        );
        return aggregateByDay(breathing, () => 1);
      }

      case 'journal_entries': {
        // Calm doesn't expose journal via public API
        return [];
      }

      case 'gratitude_logs': {
        // Calm doesn't expose gratitude logs via public API
        return [];
      }

      case 'heart_rate_variability': {
        // HRV not available through Calm API
        return [];
      }
    }
  }

  /* ── Log Session ────────────────────────────────────────────────────── */

  async logSession(session: Omit<MindfulnessSession, 'id'>): Promise<string> {
    const calmType = mapToCalmContentType(session.type);

    const body: Record<string, unknown> = {
      content_type: calmType,
      started_at: session.startedAt,
      duration_seconds: session.durationSeconds,
      completed: session.completed,
      mood_before: session.moodBefore,
      mood_after: session.moodAfter,
      notes: session.notes,
      tags: session.tags,
    };

    const res = await this.request(ENDPOINTS.sessions, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      throw new CalmError(`Failed to log session: ${res.status}`, res.status);
    }

    const created: { data: { id: string } } = await res.json();
    return created.data.id;
  }

  /* ── Health Check ───────────────────────────────────────────────────── */

  async healthCheck(): Promise<{ ok: boolean; latencyMs: number }> {
    const start = Date.now();
    try {
      const res = await this.request(ENDPOINTS.health);
      return { ok: res.ok, latencyMs: Date.now() - start };
    } catch {
      return { ok: false, latencyMs: Date.now() - start };
    }
  }

  /* ── Private ────────────────────────────────────────────────────────── */

  private async fetchRawStats(): Promise<CalmRawStats> {
    const res = await this.request(ENDPOINTS.stats);
    if (!res.ok) {
      throw new CalmError(`Failed to fetch stats: ${res.status}`, res.status);
    }
    return res.json();
  }

  private async getRecentSessions(count: number): Promise<MindfulnessSession[]> {
    const to = new Date().toISOString();
    const from = new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString();
    const sessions = await this.getSessions(from, to);
    return sessions.slice(0, count);
  }

  private async getMoodScores(from: string, to: string): Promise<number[]> {
    try {
      const params = new URLSearchParams({ start_date: from, end_date: to });
      const res = await this.request(`${ENDPOINTS.moodLog}?${params}`);
      if (!res.ok) return [];

      const data: { data: CalmMoodEntry[] } = await res.json();
      return data.data
        .sort((a, b) => a.date.localeCompare(b.date))
        .map((e) => e.score);
    } catch {
      return [];
    }
  }

  private async computeAverageMoodDelta(
    recentSessions: MindfulnessSession[],
  ): Promise<number> {
    const deltas = recentSessions
      .filter((s) => s.moodBefore != null && s.moodAfter != null)
      .map((s) => (s.moodAfter ?? 0) - (s.moodBefore ?? 0));

    if (deltas.length === 0) return 0;
    return deltas.reduce((a, b) => a + b, 0) / deltas.length;
  }

  private async request(
    url: string,
    init?: RequestInit,
  ): Promise<Response> {
    this.abortController = new AbortController();
    const timeout = setTimeout(() => this.abortController!.abort(), this.config.timeoutMs);

    try {
      const res = await fetch(url, {
        ...init,
        signal: this.abortController.signal,
        headers: {
          ...init?.headers,
          Authorization: `Bearer ${this.config.apiKey}`,
          Accept: 'application/json',
          'X-API-Version': '1',
        },
      });
      return res;
    } finally {
      clearTimeout(timeout);
      this.abortController = null;
    }
  }
}

/* ─── Mapping ───────────────────────────────────────────────────────────── */

/**
 * Maps a raw Calm session to canonical MindfulnessSession.
 *
 * Calm differentiates content types more granularly than the LifeOS type
 * system, so some mapping is required (sleep_story → meditation, music → body_scan).
 */
function mapSession(raw: CalmRawSession): MindfulnessSession {
  const type = mapToLifeosType(raw.content_type);

  return {
    id: raw.id,
    provider: PROVIDER_NAME,
    type,
    startedAt: raw.started_at,
    durationSeconds: raw.duration_seconds,
    completed: raw.completed,
    moodBefore: raw.mood_before,
    moodAfter: raw.mood_after,
    notes: raw.notes,
    tags: buildTags(raw),
  };
}

/** Maps Calm content types to LifeOS session types. */
function mapToLifeosType(
  calmType: CalmRawSession['content_type'],
): MindfulnessSession['type'] {
  switch (calmType) {
    case 'meditation':
      return 'meditation';
    case 'breathing':
      return 'breathwork';
    case 'sleep_story':
      // Sleep stories map to meditation for analytics purposes
      return 'meditation';
    case 'body_scan':
      return 'body_scan';
    case 'music':
      // Music sessions map to body_scan (relaxation category)
      return 'body_scan';
  }
}

/** Maps a LifeOS session type to a Calm API content type for POST. */
function mapToCalmContentType(type: MindfulnessSession['type']): string {
  switch (type) {
    case 'meditation':
    case 'yoga_nidra':
      return 'meditation';
    case 'breathwork':
      return 'breathing';
    case 'body_scan':
      return 'body_scan';
    case 'journaling':
    case 'gratitude':
      return 'meditation'; // Calm tracks journaling as content, not a session type
  }
}

/** Builds tag array from Calm session metadata. */
function buildTags(raw: CalmRawSession): string[] {
  const tags: string[] = [];

  if (raw.daily_calm) tags.push('daily-calm');
  if (raw.series_name) tags.push(`series:${raw.series_name}`);
  if (raw.teacher_name) tags.push(`teacher:${raw.teacher_name}`);
  if (raw.title) tags.push(`session:${raw.title}`);

  if (raw.tags) tags.push(...raw.tags);

  return tags;
}

/* ─── Helpers ───────────────────────────────────────────────────────────── */

function aggregateByDay(sessions: MindfulnessSession[], extractor: (s: MindfulnessSession) => number): number[] {
  const map = new Map<string, number>();

  for (const s of sessions) {
    const day = s.startedAt.slice(0, 10);
    map.set(day, (map.get(day) ?? 0) + extractor(s));
  }

  return Array.from(map.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([, v]) => v);
}

/* ─── Error ─────────────────────────────────────────────────────────────── */

/** Typed error for Calm API failures. */
export class CalmError extends Error {
  constructor(
    message: string,
    public readonly statusCode: number,
  ) {
    super(`[Calm] ${message}`);
    this.name = 'CalmError';
  }
}
