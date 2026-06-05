/**
 * LifeOS — Udemy Hobbies Adapter
 * ===============================
 * Concrete implementation of HobbyAdapter for Udemy.
 *
 * Maps Udemy's public API to the LifeOS HobbyAdapter interface.
 * Tracks: enrolled courses, completed lectures, learning time,
 * course progress, and certifications.
 *
 * API Reference: https://www.udemy.com/developers/
 * Authentication: OAuth 2.0 (client credentials grant, scoped to user data)
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

/** Raw course object from Udemy API. */
interface UdemyRawCourse {
  id: number;
  title: string;
  url: string;
  image_480x270: string;
  headline: string;
  num_lectures: number;
  content_length_minutes: number;
  instructional_level: string;
  primary_category?: {
    title: string;
  };
  primary_subcategory?: {
    title: string;
  };
  estimated_content_length_minutes: number;
  published_time: string;
  requirements?: string[];
  objectives?: string[];
}

/** Raw enrollment/learning data from Udemy API. */
interface UdemyRawEnrollment {
  course: UdemyRawCourse;
  enrollment_url: string;
  enrolled: string;           // ISO-8601
  last_accessed: string;      // ISO-8601
  progress: number;           // 0-100
  completed_lectures: number;
  total_lectures: number;
  completion_ratio: number;   // 0-1
  is_completed: boolean;
  completion_date?: string;   // ISO-8601
}

/** Raw user learning statistics from Udemy API. */
interface UdemyRawUserStats {
  total_learning_time_minutes: number;
  total_courses_enrolled: number;
  total_courses_completed: number;
  total_lectures_completed: number;
  recent_enrollments: UdemyRawEnrollment[];
  current_streak_days: number;
}

/* ─── API Endpoints ─────────────────────────────────────────────────────── */

const API_BASE = 'https://www.udemy.com/api-2.0';

const ENDPOINTS = {
  userEnrollments: `${API_BASE}/users/me/subscribed-courses/`,
  userProgress:   `${API_BASE}/users/me/subscribed-course-progress/`,
  userStats:      `${API_BASE}/users/me/`,
  health:         `${API_BASE}/ping`,
} as const;

/* ─── Defaults ──────────────────────────────────────────────────────────── */

const DEFAULT_TIMEOUT_MS = 10_000;
const PROVIDER_NAME = 'udemy';

/* ─── Category Mapping ──────────────────────────────────────────────────── */

/** Maps Udemy category titles to LifeOS HobbyCategory. */
function mapCategory(
  categoryTitle?: string,
  subCategoryTitle?: string,
): HobbyCategory {
  const text = [categoryTitle ?? '', subCategoryTitle ?? ''].join(' ').toLowerCase();

  if (['design', 'creative', 'illustration', 'photography', 'music', 'writing', 'video'].some(c => text.includes(c)))
    return 'creative';
  if (['craft', 'diy', 'knitting', 'sewing'].some(c => text.includes(c)))
    return 'crafts';
  if (['development', 'programming', 'it', 'software', 'data science', 'math', 'science', 'business intelligence'].some(c => text.includes(c)))
    return 'intellectual';
  if (['fitness', 'dance', 'martial arts', 'sports', 'yoga'].some(c => text.includes(c)))
    return 'physical';
  if (['garden', 'outdoor', 'nature', 'survival'].some(c => text.includes(c)))
    return 'outdoor';
  if (['cooking', 'food', 'baking', 'culinary', 'mixology', 'wine', 'beer'].some(c => text.includes(c)))
    return 'culinary';
  if (['game', 'gaming', 'tabletop', 'esports'].some(c => text.includes(c)))
    return 'gaming';
  if ([].some(c => text.includes(c)))
    return 'collecting';

  return 'intellectual';
}

/* ─── Adapter ────────────────────────────────────────────────────────────── */

/**
 * Concrete Udemy adapter.
 *
 * Usage:
 * ```ts
 * const ud = new UdemyAdapter({ apiKey: process.env.UDEMY_API_KEY! });
 * await ud.connect();
 * const summary = await ud.getSummary();
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
      const res = await this.request(ENDPOINTS.health);
      this.connected = res.ok;
      return this.connected;
    } catch {
      this.connected = false;
      return false;
    }
  }

  /* ── Sessions (Course Study Sessions) ──────────────────────────────── */

  async getSessions(from: string, to: string, category?: HobbyCategory): Promise<HobbySession[]> {
    const enrollments = await this.getAllEnrollments();
    if (!enrollments.length) return [];

    const sessions: HobbySession[] = [];

    for (const enrollment of enrollments) {
      const cat = mapCategory(
        enrollment.course.primary_category?.title,
        enrollment.course.primary_subcategory?.title,
      );

      if (category && cat !== category) continue;

      // Each enrollment becomes a coarse "session" — Udemy doesn't expose
      // per-lecture viewing sessions via the public API
      sessions.push({
        id: `ud-${enrollment.course.id}`,
        provider: PROVIDER_NAME,
        hobby: enrollment.course.title,
        category: cat,
        startedAt: enrollment.enrolled,
        durationMinutes: Math.round(
          enrollment.progress / 100 * enrollment.course.content_length_minutes,
        ),
        notes: enrollment.course.headline,
        mediaUrls: enrollment.course.image_480x270
          ? [enrollment.course.image_480x270]
          : undefined,
        completed: enrollment.is_completed,
        satisfactionRating: undefined,
      });
    }

    return sessions;
  }

  /* ── Milestones ─────────────────────────────────────────────────────── */

  async getMilestones(from: string, to: string): Promise<HobbyMilestone[]> {
    const enrollments = await this.getAllEnrollments();
    if (!enrollments.length) return [];

    const milestones: HobbyMilestone[] = [];

    for (const enrollment of enrollments) {
      // Course completion milestone
      if (
        enrollment.is_completed &&
        enrollment.completion_date &&
        enrollment.completion_date >= from &&
        enrollment.completion_date <= to
      ) {
        milestones.push({
          id: `ud-complete-${enrollment.course.id}`,
          hobby: enrollment.course.title,
          title: `🎓 Completed: ${enrollment.course.title}`,
          achievedAt: enrollment.completion_date,
          description: `Finished all ${enrollment.total_lectures} lectures of ${enrollment.course.title}.`,
        });
      }

      // 50% progress milestone
      if (
        enrollment.progress >= 50 &&
        enrollment.last_accessed >= from &&
        enrollment.last_accessed <= to
      ) {
        milestones.push({
          id: `ud-halfway-${enrollment.course.id}`,
          hobby: enrollment.course.title,
          title: `🏁 Halfway: ${enrollment.course.title}`,
          achievedAt: enrollment.last_accessed,
          description: `Reached ${Math.round(enrollment.progress)}% progress on ${enrollment.course.title}.`,
        });
      }

      // 25% progress milestone
      if (
        enrollment.progress >= 25 &&
        enrollment.progress < 50 &&
        enrollment.last_accessed >= from &&
        enrollment.last_accessed <= to
      ) {
        milestones.push({
          id: `ud-started-${enrollment.course.id}`,
          hobby: enrollment.course.title,
          title: `🚀 Started: ${enrollment.course.title}`,
          achievedAt: enrollment.last_accessed,
          description: `Completed 25% of ${enrollment.course.title} — ${enrollment.completed_lectures}/${enrollment.total_lectures} lectures done.`,
        });
      }
    }

    milestones.sort((a, b) => a.achievedAt.localeCompare(b.achievedAt));
    return milestones;
  }

  /* ── Summary ────────────────────────────────────────────────────────── */

  async getSummary(): Promise<HobbySummary> {
    const enrollments = await this.getAllEnrollments();
    if (!enrollments.length) {
      return {
        totalHoursThisMonth: 0,
        activeHobbies: 0,
        projectsCompleted: 0,
        milestonesReached: 0,
        topHobbyByTime: '',
        recentSessions: [],
      };
    }

    const activeCourses = enrollments.filter(e => !e.is_completed);
    const completedCourses = enrollments.filter(e => e.is_completed);

    // Estimate monthly hours based on total content time completed
    const totalMinutes = enrollments.reduce(
      (sum, e) => sum + Math.round(e.progress / 100 * e.course.content_length_minutes),
      0,
    );

    // Recent sessions (last 10)
    const recentSessions: HobbySession[] = enrollments
      .sort((a, b) => b.last_accessed.localeCompare(a.last_accessed))
      .slice(0, 10)
      .map(e => ({
        id: `ud-${e.course.id}`,
        provider: PROVIDER_NAME,
        hobby: e.course.title,
        category: mapCategory(e.course.primary_category?.title, e.course.primary_subcategory?.title),
        startedAt: e.enrolled,
        durationMinutes: Math.round(e.progress / 100 * e.course.content_length_minutes),
        completed: e.is_completed,
        satisfactionRating: undefined,
      }));

    // Top hobby by estimated time
    const topCourse = [...enrollments].sort(
      (a, b) => (b.progress / 100 * b.course.content_length_minutes) - (a.progress / 100 * a.course.content_length_minutes),
    )[0];

    return {
      totalHoursThisMonth: Math.round(Math.min(totalMinutes, 30 * 60) / 60 * 10) / 10,
      activeHobbies: activeCourses.length,
      projectsCompleted: completedCourses.length,
      milestonesReached: completedCourses.length, // each completion is a milestone
      topHobbyByTime: topCourse?.course.title ?? '',
      recentSessions,
    };
  }

  /* ── Metrics ────────────────────────────────────────────────────────── */

  async getMetric(metric: HobbyMetric, from: string, to: string): Promise<number[]> {
    switch (metric) {
      case 'hours_spent': {
        const sessions = await this.getSessions(from, to);
        const byMonth = aggregateHoursByMonth(sessions);
        return byMonth;
      }

      case 'courses_enrolled': {
        const enrollments = await this.getAllEnrollments();
        const filtered = enrollments.filter(e =>
          e.enrolled >= from && e.enrolled <= to,
        );
        return [filtered.length];
      }

      case 'projects_completed': {
        const enrollments = await this.getAllEnrollments();
        const completed = enrollments.filter(e =>
          e.completion_date && e.completion_date >= from && e.completion_date <= to,
        );
        return [completed.length];
      }

      case 'skills_acquired': {
        const enrollments = await this.getAllEnrollments();
        const completed = enrollments.filter(e =>
          e.completion_date && e.completion_date >= from && e.completion_date <= to,
        );
        return [completed.length];
      }

      case 'practice_sessions':
        return []; // Udemy tracks courses/lectures, not practice sessions

      case 'milestones_reached': {
        const milestones = await this.getMilestones(from, to);
        return [milestones.length];
      }

      case 'materials_purchased':
        return []; // Not exposed by Udemy API
    }
  }

  /* ── Log Session ────────────────────────────────────────────────────── */

  async logSession(session: Omit<HobbySession, 'id'>): Promise<string> {
    // Udemy API doesn't support programmatic progress logging for user courses.
    const localId = `ud-ext-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    console.warn(`[UdemyAdapter] logSession not supported by Udemy API. Generated local ID: ${localId}`);
    return localId;
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

  private async getAllEnrollments(): Promise<UdemyRawEnrollment[]> {
    try {
      // Udemy paginates results; fetch first page (most recent)
      const res = await this.request(`${ENDPOINTS.userEnrollments}?page=1&page_size=50&fields[course]=@all`);
      if (!res.ok) return [];

      const data = await res.json() as {
        results: UdemyRawEnrollment[];
        next: string | null;
      };

      return data.results ?? [];
    } catch {
      return [];
    }
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
          'Content-Type': 'application/json',
        },
      });
      return res;
    } finally {
      clearTimeout(timeout);
      this.abortController = null;
    }
  }
}

/* ─── Helpers ────────────────────────────────────────────────────────────── */

/** Aggregates session duration values by calendar month, returning monthly totals in hours. */
function aggregateHoursByMonth(sessions: HobbySession[]): number[] {
  const map = new Map<string, number>();

  for (const s of sessions) {
    const month = s.startedAt.slice(0, 7);
    map.set(month, (map.get(month) ?? 0) + s.durationMinutes);
  }

  return Array.from(map.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([, v]) => Math.round((v / 60) * 10) / 10);
}

/* ─── Error ──────────────────────────────────────────────────────────────── */

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
