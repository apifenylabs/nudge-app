/**
 * LifeOS Plugin Adapter Interfaces (Type stubs for titan-app)
 *
 * Contains only the types referenced by PersonalityProfile component.
 * Full adapter implementations live in _projects/lifeos/app/lib/plugin-adapters.ts
 */

/* ─── Mindfulness ────────────────────────────────────────────────── */

export interface MindfulnessSession {
  id: string;
  provider: string;
  type: 'meditation' | 'breathwork' | 'journaling' | 'gratitude' | 'body_scan' | 'yoga_nidra';
  startedAt: string;
  durationSeconds: number;
  moodBefore?: number;
  moodAfter?: number;
  notes?: string;
  tags?: string[];
  completed: boolean;
}

export interface MindfulnessSummary {
  totalMinutesThisWeek: number;
  totalSessionsThisWeek: number;
  currentStreakDays: number;
  longestStreakDays: number;
  averageMoodDelta: number;
  lastSession: MindfulnessSession | null;
}

/* ─── Health ─────────────────────────────────────────────────────── */

export interface SleepData {
  date: string;
  totalHours: number;
  deepHours: number;
  remHours: number;
  lightHours: number;
  awakeMinutes: number;
  bedtime?: string;
  wakeTime?: string;
  quality?: number;
  provider: string;
}

export interface HealthSummary {
  totalStepsToday: number;
  activeCaloriesToday: number;
  workoutMinutesThisWeek: number;
  workoutsThisWeek: number;
  lastNightSleep: SleepData | null;
  averageSleepHoursThisWeek: number;
  averageSleepQualityThisWeek: number;
  recentHeartRate?: number;
  recentHRV?: number;
  recentBloodOxygen?: number;
  recentRestingHeartRate?: number;
  recentStressScore?: number;
  recentRecoveryScore?: number;
  stepTrend7Day: number[];
  sleepTrend7Day: number[];
}

/* ─── Hobbies ────────────────────────────────────────────────────── */

export type HobbyCategory =
  | 'creative'
  | 'crafts'
  | 'intellectual'
  | 'physical'
  | 'outdoor'
  | 'collecting'
  | 'gaming'
  | 'culinary';

export interface HobbySession {
  id: string;
  provider: string;
  hobby: string;
  category: HobbyCategory;
  startedAt: string;
  durationMinutes: number;
  notes?: string;
  mediaUrls?: string[];
  completed: boolean;
  satisfactionRating?: number;
}

export interface HobbyMilestone {
  id: string;
  hobby: string;
  title: string;
  achievedAt: string;
  description: string;
}

export interface HobbySummary {
  totalHoursThisMonth: number;
  activeHobbies: number;
  projectsCompleted: number;
  milestonesReached: number;
  topHobbyByTime: string;
  recentSessions: HobbySession[];
  upcomingMilestones?: HobbyMilestone[];
}
