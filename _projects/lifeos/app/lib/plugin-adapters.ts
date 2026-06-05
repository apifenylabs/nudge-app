/**
 * LifeOS Plugin Adapter Interfaces
 * ==================================
 * Defines third-party API adapters for external LifeOS plugin integrations.
 * Each adapter abstracts an external service behind a common interface,
 * enabling pluggable backends (e.g., Headspace vs Calm for mindfulness, 
 * or Udemy vs Skillshare for hobbies).
 *
 * Usage: Implement the adapter for your chosen provider, then register
 * it in the plugin's runtime config.
 *
 * Schema version: 1.1.0
 * Last updated: 2026-06-04
 */

/* ─── Mindfulness OS Adapters ───────────────────────────────────────────── */

/** Supported metrics that a mindfulness provider can return. */
export type MindfulnessMetric =
  | 'meditation_minutes'
  | 'session_count'
  | 'streak_days'
  | 'mood_score'
  | 'heart_rate_variability'
  | 'breathing_exercises_completed'
  | 'journal_entries'
  | 'gratitude_logs';

/** A single mindfulness session record. */
export interface MindfulnessSession {
  id: string;
  provider: string;
  type: 'meditation' | 'breathwork' | 'journaling' | 'gratitude' | 'body_scan' | 'yoga_nidra';
  startedAt: string;   // ISO-8601
  durationSeconds: number;
  moodBefore?: number; // 1-10
  moodAfter?: number;  // 1-10
  notes?: string;
  tags?: string[];
  completed: boolean;
}

/** Summary aggregations returned by the adapter. */
export interface MindfulnessSummary {
  totalMinutesThisWeek: number;
  totalSessionsThisWeek: number;
  currentStreakDays: number;
  longestStreakDays: number;
  averageMoodDelta: number; // mood_after - mood_before averaged
  lastSession: MindfulnessSession | null;
}

/** Configuration required to instantiate a mindfulness adapter. */
export interface MindfulnessAdapterConfig {
  apiKey: string;
  baseUrl?: string;
  userId?: string;
  timeoutMs?: number;
}

/**
 * Generic mindfulness provider adapter.
 * Implement this interface per backend (Headspace, Calm, Ten Percent Happier, etc.)
 */
export interface MindfulnessAdapter {
  readonly provider: string;
  readonly config: MindfulnessAdapterConfig;

  /** Authenticate / validate the connection. Returns true if credentials are valid. */
  connect(): Promise<boolean>;

  /** Fetch sessions within a date range. */
  getSessions(from: string, to: string): Promise<MindfulnessSession[]>;

  /** Get aggregated summary for the current period. */
  getSummary(): Promise<MindfulnessSummary>;

  /** Return a specific metric over a time range (for dashboard widgets). */
  getMetric(metric: MindfulnessMetric, from: string, to: string): Promise<number[]>;

  /** Log a session created externally (push to provider). */
  logSession(session: Omit<MindfulnessSession, 'id'>): Promise<string>;

  /** Health check — is the provider API reachable? */
  healthCheck(): Promise<{ ok: boolean; latencyMs: number }>;
}

/* ─── Hobbies OS Adapters ───────────────────────────────────────────────── */

/** Supported metrics that a hobbies/learning provider can return. */
export type HobbyMetric =
  | 'hours_spent'
  | 'projects_completed'
  | 'skills_acquired'
  | 'courses_enrolled'
  | 'practice_sessions'
  | 'milestones_reached'
  | 'materials_purchased';

/** Categories of hobbies the adapter may support. */
export type HobbyCategory =
  | 'creative'      // painting, writing, music, photography
  | 'crafts'        // woodworking, knitting, pottery
  | 'intellectual'  // chess, coding, puzzles, languages
  | 'physical'      // dancing, martial arts, yoga (non-fitness)
  | 'outdoor'       // hiking, gardening, birding
  | 'collecting'    // stamps, coins, cards
  | 'gaming'        // board games, video games, TTRPGs
  | 'culinary';     // cooking, baking, mixology

/** A single hobby activity record. */
export interface HobbySession {
  id: string;
  provider: string;
  hobby: string;
  category: HobbyCategory;
  startedAt: string;   // ISO-8601
  durationMinutes: number;
  notes?: string;
  mediaUrls?: string[]; // photos, recordings of the work
  completed: boolean;
  satisfactionRating?: number; // 1-5
}

/** Project milestone within a hobby. */
export interface HobbyMilestone {
  id: string;
  hobby: string;
  title: string;
  achievedAt: string;  // ISO-8601
  description: string;
}

/** Summary aggregations returned by the adapter. */
export interface HobbySummary {
  totalHoursThisMonth: number;
  activeHobbies: number;           // distinct hobbies with activity
  projectsCompleted: number;
  milestonesReached: number;
  topHobbyByTime: string;
  recentSessions: HobbySession[];
  upcomingMilestones?: HobbyMilestone[];
}

/** Configuration required to instantiate a hobbies adapter. */
export interface HobbyAdapterConfig {
  apiKey?: string;
  baseUrl?: string;
  userId?: string;
  timeoutMs?: number;
}

/**
 * Generic hobbies/learning provider adapter.
 * Implement this interface per backend (Skillshare, Udemy, YouTube Data API, Notion tracking, etc.)
 */
export interface HobbyAdapter {
  readonly provider: string;
  readonly config: HobbyAdapterConfig;

  /** Authenticate / validate the connection. */
  connect(): Promise<boolean>;

  /** Fetch hobby sessions within a date range. */
  getSessions(from: string, to: string, category?: HobbyCategory): Promise<HobbySession[]>;

  /** Fetch milestones/projects completed. */
  getMilestones(from: string, to: string): Promise<HobbyMilestone[]>;

  /** Get aggregated summary. */
  getSummary(): Promise<HobbySummary>;

  /** Return a specific metric over a time range. */
  getMetric(metric: HobbyMetric, from: string, to: string): Promise<number[]>;

  /** Log an external session. */
  logSession(session: Omit<HobbySession, 'id'>): Promise<string>;

  /** Health check. */
  healthCheck(): Promise<{ ok: boolean; latencyMs: number }>;
}

/* ─── Adapter Registry ──────────────────────────────────────────────────── */

/** Runtime registry of all active plugin adapters. */
export interface PluginAdapterRegistry {
  mindfulness: Map<string, MindfulnessAdapter>;
  hobbies: Map<string, HobbyAdapter>;
  health: Map<string, HealthAdapter>;
  // Future plugin adapter registries go here:
  // travel: Map<string, TravelAdapter>;
  // finance: Map<string, FinanceAdapter>;
}

/** Factory function signature for creating an adapter instance. */
export type AdapterFactory<T> = (config: Record<string, unknown>) => T;

/** Registration entry for a plugin adapter implementation. */
export interface AdapterRegistration {
  plugin: 'mindfulness-os' | 'hobbies-os' | 'health-os' | string;
  provider: string;
  factory: AdapterFactory<MindfulnessAdapter | HobbyAdapter | HealthAdapter>;
  configSchema: Record<string, unknown>;
  isEnabled: boolean;
}

/* ─── Health OS Adapters ───────────────────────────────────────────────── */

/** Supported metrics that a health provider can return. */
export type HealthMetric =
  | 'steps'
  | 'heart_rate'
  | 'heart_rate_variability'
  | 'sleep_hours'
  | 'sleep_quality'
  | 'deep_sleep_hours'
  | 'rem_sleep_hours'
  | 'active_calories'
  | 'resting_heart_rate'
  | 'respiratory_rate'
  | 'blood_oxygen'
  | 'weight_kg'
  | 'body_fat_percentage'
  | 'blood_pressure_systolic'
  | 'blood_pressure_diastolic'
  | 'workouts_count'
  | 'workout_minutes'
  | 'stress_score'
  | 'recovery_score'
  | 'readiness_score';

/** Health data source categories. */
export type HealthSource =
  | 'wearable'        // Apple Watch, Fitbit, Garmin, Whoop, Oura
  | 'phone_sensors'   // iPhone/Android step tracking
  | 'manual_entry'    // User-inputted health data
  | 'lab_result'      // Blood tests, biometric screenings
  | 'health_connect'  // Google Health Connect aggregated
  | 'apple_health';   // Apple HealthKit aggregated

/** A single health data point / reading. */
export interface HealthRecord {
  id: string;
  provider: string;
  metric: HealthMetric;
  value: number;
  unit: string;
  source: HealthSource;
  recordedAt: string;  // ISO-8601
  createdAt: string;   // ISO-8601 — when this was synced
  deviceName?: string;
  tags?: string[];
  notes?: string;
}

/** Structure for workout data from wearables. */
export interface WorkoutSession {
  id: string;
  provider: string;
  type: 'running' | 'walking' | 'cycling' | 'swimming' | 'strength' | 'yoga' | 'hiit' | 'pilates' | 'dance' | 'sports' | 'other';
  startedAt: string;
  durationMinutes: number;
  activeCalories?: number;
  heartRateAvg?: number;
  heartRateMax?: number;
  distanceMeters?: number;
  notes?: string;
}

/** Sleep stage breakdown. */
export interface SleepData {
  date: string;           // ISO-8601 date
  totalHours: number;
  deepHours: number;
  remHours: number;
  lightHours: number;
  awakeMinutes: number;
  bedtime?: string;       // ISO-8601
  wakeTime?: string;      // ISO-8601
  quality?: number;       // 1-10
  provider: string;
}

/** Aggregated health summary for dashboard widgets. */
export interface HealthSummary {
  // Activity
  totalStepsToday: number;
  activeCaloriesToday: number;
  workoutMinutesThisWeek: number;
  workoutsThisWeek: number;

  // Sleep
  lastNightSleep: SleepData | null;
  averageSleepHoursThisWeek: number;
  averageSleepQualityThisWeek: number;

  // Vital signs (most recent readings)
  recentHeartRate?: number;
  recentHRV?: number;
  recentBloodOxygen?: number;
  recentRestingHeartRate?: number;
  recentStressScore?: number;
  recentRecoveryScore?: number;

  // Trends
  stepTrend7Day: number[];
  sleepTrend7Day: number[];
}

/** Configuration for a health data provider adapter. */
export interface HealthAdapterConfig {
  apiKey?: string;
  clientId?: string;
  clientSecret?: string;
  accessToken?: string;
  refreshToken?: string;
  baseUrl?: string;
  userId?: string;
  timeoutMs?: number;
}

/**
 * Generic health data provider adapter.
 * Implement this interface per backend (Apple Health, Google Health Connect,
 * Fitbit Web API, Oura Cloud, Whoop API, Garmin Health, etc.)
 */
export interface HealthAdapter {
  readonly provider: string;
  readonly config: HealthAdapterConfig;

  /** Authenticate / validate the connection. OAuth-heavy — may redirect. */
  connect(): Promise<boolean>;

  /** Fetch health records for a specific metric over a date range. */
  getRecords(metric: HealthMetric, from: string, to: string): Promise<HealthRecord[]>;

  /** Fetch workout sessions within a date range. */
  getWorkouts(from: string, to: string): Promise<WorkoutSession[]>;

  /** Fetch sleep data for a specific date. */
  getSleep(date: string): Promise<SleepData | null>;

  /** Get aggregated health summary for dashboard. */
  getSummary(): Promise<HealthSummary>;

  /** Get time-series data for a specific metric over N days. */
  getMetric(metric: HealthMetric, days: number): Promise<number[]>;

  /** Log an external health record (push to provider). */
  logRecord(record: Omit<HealthRecord, 'id' | 'createdAt'>): Promise<string>;

  /** Health check — is the provider API reachable and authorized? */
  healthCheck(): Promise<{ ok: boolean; latencyMs: number }>;
}
