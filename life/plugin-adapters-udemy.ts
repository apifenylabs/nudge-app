/**
 * LifeOS — Udemy Hobbies Adapter
 * ================================
 * Concrete implementation of HobbyAdapter for Udemy.
 *
 * Maps Udemy's API to the LifeOS HobbyAdapter interface.
 * Handles: course enrollments, lecture watch history, quiz completions,
 * practice tests, learning hours, and certification milestones.
 *
 * API Reference: https://www.udemy.com/developers/affiliate/
 * Authentication: OAuth 2.0 client credentials (scoped to user data)
 *
 * @packageDocumentation
 */

import type {
  HobbyAdapter,
  HobbyAdapterConfig,
  HobbySession,
  HobbyMilestone,
  HobbySummary,
  HobbyMetric,
  HobbyCategory,
} from './plugin-adapters';

/* ─── Types ─────────────────────────────────────────────────────────────── */

/** Raw learning session from Udemy API. */
interface UdemyRawSession {
  id: string;
  course_id: number;
  course_title: string;
  category: string;
  subcategory?: string;
  started_at: string;
  duration_minutes: number;
  completed: boolean;
  lecture_title?: string;
  quiz_score?: number;
  practice_test_score?: number;
  notes?: string;
  rating?: number;
  certificate_url?: string;
}

/** Raw user progress stats from Udemy API. */
interface UdemyRawStats {
  total_minutes_this_month: number;
  total_courses_enrolled: number;
  courses_in_progress: number;
  courses_completed: number;
  quizzes_taken: number;
  practice_tests_taken: number;
  certificates_earned: number;
  top_category: string;
  recent_activity: UdemyRawSession[];
}

/** Raw certificate/milestone from Udemy API. */
interface UdemyRawCertificate {
  id: string;
  course_id: number;
  course_title: string;
  completed_at: string;
  certificate_url: string;
  grade?: string;
}

/* ─── API Endpoints ─────────────────────────────────────────────────────── */

const API_BASE = 'https://api.udemy.com/v2';

const ENDPOINTS = {
  sessions:     `${API_BASE}/users/me/activity`,
  enrollments:  `${API_BASE}/users/me/enrollments`,
  stats:        `${API_BASE}/users/me/stats`,
  certificates: `${API_BASE}/users/me/certificates`,
  quizzes:      `${API_BASE}/users/me/quizzes`,
  health:       `${API_BASE}/ping`,
  connect:      `${API_BASE}/users/me`,
} as const;

/* ─── Defaults ──────────────────────────────────────────────────────────── */

const DEFAULT_TIMEOUT_MS = 10_000;
const PROVIDER_NAME = 'udemy';

/* ─── Category Mapping ──────────────────────────────────────────────────── */

/** Maps Udemy categories to LifeOS HobbyCategory. */
const CATEGORY_MAP: Record<string, HobbyCategory> = {
  'design':           'creative',
  'photography':      'creative',
  'music':            'creative',
  'digital-art':      'creative',
  'creative-writing': 'creative',
  'film':             'creative',
  'web-development':  'intellectual',
  'programming':      'intellectual',
  'data-science':     'intellectual',
  'it':               'intellectual',
  'business':         'intellectual',
  'personal-development': 'intellectual',
  'language':         'intellectual',
  'math':             'intellectual',
  'gaming':           'gaming',
  'game-development': 'gaming',
  'cooking':          'culinary',
  'lifestyle':        'crafts',
  'crafts':           'crafts',
};

function mapCategory(udemyCategory: string): HobbyCategory {
  return CATEGORY_MAP[udemyCategory.toLowerCase().replace(/\s+/g, '-')] ?? 'intellectual';
}

/* ─── Adapter ───────────────────────────────────────────────────────────── */

/**
 * Concrete Udemy adapter.
 *
 * Usage:
 * ```ts
 * const udemy = new UdemyAdapter({ apiKey: process.env.UDEMY_API_KEY! });
 * await udemy.connect();
 * const summary = await udemy.getSummary();
 * ```
 */
export class UdemyAdapter implements HobbyAdapter {
  readonly provider = PROVIDER_NAME;
  readonly config: HobbyAdapterConfig;
  private connected = false;
  private abortController: AbortController | null = null;

  constructor(config: HobbyAdapterConfig) {
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

  async getSessions(from: string, to: string, category?: HobbyCategory): Promise<HobbySession[]> {
    const params = new URLSearchParams({ from, to, limit: '100' });
    const res = await this.request(`${ENDPOINTS.sessions}?${params}`);

    if (!res.ok) {
      throw new UdemyError(`Failed to fetch sessions: ${res.status}`, res.status);
    }

    const raw: UdemyRawSession[] = await res.json();
    let sessions = raw.map(mapSession);

    if (category) {
      sessions = sessions.filter((s) => s.category === category);
    }

    return sessions;
  }

  /* ── Milestones ─────────────────────────────────────────────────────── */

  async getMilestones(from: string, to: string): Promise<HobbyMilestone[]> {
    const params = new URLSearchParams({ from, to, limit: '50' });
    const res = await this.request(`${ENDPOINTS.certificates}?${params}`);

    if (!res.ok) {
      throw new UdemyError(`Failed to fetch certificates: ${res.status}`, res.status);
    }

    const raw: UdemyRawCertificate[] = await res.json();
    const filtered = raw.filter((c) => c.completed_at >= from && c.completed_at <= to);

    return filtered.map((c) => ({
      id: c.id.toString(),
      hobby: `udemy:${c.course_title}`,
      title: `Completed: ${c.course_title}`,
      achievedAt: c.completed_at,
      description: `Course completed${c.grade ? ` with grade ${c.grade}` : ''}. Certificate: ${c.certificate_url}`,
    }));
  }

  /* ── Summary ────────────────────────────────────────────────────────── */

  async getSummary(): Promise<HobbySummary> {
    const res = await this.request(ENDPOINTS.stats);

    if (!res.ok) {
      throw new UdemyError(`Failed to fetch stats: ${res.status}`, res.status);
    }

    const raw: UdemyRawStats = await res.json();

    // Fetch upcoming milestones (courses nearly complete)
    const upcoming = await this.fetchUpcomingMilestones();

    return {
      totalHoursThisMonth: Math.round(raw.total_minutes_this_month / 60 * 10) / 10,
      activeHobbies: raw.courses_in_progress,
      projectsCompleted: raw.courses_completed,
      milestonesReached: raw.certificates_earned,
      topHobbyByTime: raw.top_category,
      recentSessions: raw.recent_activity.map(mapSession),
      upcomingMilestones: upcoming,
    };
  }

  /* ── Metrics ────────────────────────────────────────────────────────── */

  async getMetric(metric: HobbyMetric, from: string, to: string): Promise<number[]> {
    switch (metric) {
      case 'hours_spent': {
        const sessions = await this.getSessions(from, to);
        return aggregateByDay(sessions, (s) => s.durationMinutes / 60);
      }

      case 'courses_enrolled': {
        const params = new URLSearchParams({ from, to, limit: '100' });
        const res = await this.request(`${ENDPOINTS.enrollments}?${params}`);
        if (!res.ok) return [];
        const raw: Array<{ enrolled_at: string }> = await res.json();
        return aggregateRawByDay(raw, (r) => r.enrolled_at, () => 1);
      }

      case 'projects_completed': {
        const milestones = await this.getMilestones(from, to);
        const mapped = milestones.map(m => ({ startedAt: m.achievedAt }));
        return aggregateByDay(mapped, () => 1);
      }

      case 'skills_acquired':
      case 'practice_sessions': {
        const sessions = await this.getSessions(from, to);
        return aggregateByDay(sessions, () => 1);
      }

      case 'milestones_reached': {
        const milestones = await this.getMilestones(from, to);
        const mapped = milestones.map(m => ({ startedAt: m.achievedAt }));
        return aggregateByDay(mapped, () => 1);
      }

      case 'materials_purchased': {
        const params = new URLSearchParams({ from, to, limit: '100' });
        const res = await this.request(`${ENDPOINTS.enrollments}?${params}`);
        if (!res.ok) return [];
        // Enrollments that required payment are "materials purchased"
        const raw: Array<{ enrolled_at: string; is_free: boolean }> = await res.json();
        const paid = raw.filter((r) => !r.is_free);
        return aggregateRawByDay(paid, (r) => r.enrolled_at, () => 1);
      }
    }
  }

  /* ── Log Session ────────────────────────────────────────────────────── */

  async logSession(session: Omit<HobbySession, 'id'>): Promise<string> {
    const body = {
      course_title: session.hobby,
      started_at: session.startedAt,
      duration_minutes: session.durationMinutes,
      completed: session.completed,
      notes: session.notes,
    };

    const res = await this.request(ENDPOINTS.sessions, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      throw new UdemyError(`Failed to log session: ${res.status}`, res.status);
    }

    const created: { id: string } = await res.json();
    return created.id;
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

  /**
   * Fetch courses that are >85% complete as "upcoming milestones."
   * This gives a sense of what the user is about to finish.
   */
  private async fetchUpcomingMilestones(): Promise<HobbyMilestone[]> {
    try {
      const params = new URLSearchParams({ limit: '50', progress_min: '85' });
      const res = await this.request(`${ENDPOINTS.enrollments}?${params}`);
      if (!res.ok) return [];

      const raw: Array<{
        course_id: number;
        course_title: string;
        progress_percent: number;
      }> = await res.json();

      return raw.map((e) => ({
        id: `upcoming-${e.course_id}`,
        hobby: `udemy:${e.course_title}`,
        title: `Nearly complete: ${e.course_title} (${Math.round(e.progress_percent)}%)`,
        achievedAt: '', // not yet achieved
        description: `Course progress at ${Math.round(e.progress_percent)}% — completion imminent`,
      }));
    } catch {
      return [];
    }
  }

  private async request(url: string, init?: RequestInit): Promise<Response> {
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

/** Maps a raw Udemy session to the canonical HobbySession type. */
function mapSession(raw: UdemyRawSession): HobbySession {
  const notes: string[] = [];
  if (raw.quiz_score != null) notes.push(`quiz: ${raw.quiz_score}%`);
  if (raw.practice_test_score != null) notes.push(`practice-test: ${raw.practice_test_score}%`);
  if (raw.lecture_title) notes.push(`lecture: ${raw.lecture_title}`);
  if (raw.notes) notes.push(raw.notes);

  return {
    id: raw.id,
    provider: PROVIDER_NAME,
    hobby: raw.course_title,
    category: mapCategory(raw.category),
    startedAt: raw.started_at,
    durationMinutes: raw.duration_minutes,
    completed: raw.completed,
    notes: notes.length > 0 ? notes.join(' | ') : undefined,
    satisfactionRating: raw.rating,
  };
}

/* ─── Helpers ───────────────────────────────────────────────────────────── */

/** Aggregates session values by day into a sorted time series. */
function aggregateByDay<T extends { startedAt: string }>(
  items: T[],
  extractor: (item: T) => number,
): number[] {
  const map = new Map<string, number>();
  for (const item of items) {
    const day = item.startedAt.slice(0, 10);
    map.set(day, (map.get(day) ?? 0) + extractor(item));
  }
  return Array.from(map.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([, v]) => v);
}

/** Aggregates raw items by a date field into a sorted time series. */
function aggregateRawByDay<T>(
  items: T[],
  dateField: (item: T) => string,
  extractor: (item: T) => number,
): number[] {
  const map = new Map<string, number>();
  for (const item of items) {
    const day = dateField(item).slice(0, 10);
    map.set(day, (map.get(day) ?? 0) + extractor(item));
  }
  return Array.from(map.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([, v]) => v);
}

/* ─── Error ─────────────────────────────────────────────────────────────── */

/** Typed error for Udemy API failures. */
export class UdemyError extends Error {
  constructor(
    message: string,
    public readonly statusCode: number,
  ) {
    super(`[Udemy] ${message}`);
    this.name = 'UdemyError';
  }
}
