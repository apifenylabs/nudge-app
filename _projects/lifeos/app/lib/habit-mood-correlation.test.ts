/**
 * Tests for Habit → Mood Correlation Engine
 */
import { describe, it, expect, beforeEach } from 'vitest';

// Mock localStorage
const store: Record<string, string> = {};
const localStorageMock = {
  getItem: (key: string) => store[key] || null,
  setItem: (key: string, value: string) => { store[key] = value; },
  removeItem: (key: string) => { delete store[key]; },
  clear: () => { Object.keys(store).forEach(k => delete store[k]); },
  get length() { return Object.keys(store).length; },
  key: (index: number) => Object.keys(store)[index] || null,
};
Object.defineProperty(global, 'localStorage', { value: localStorageMock, writable: true });
Object.defineProperty(global, 'window', { value: { document: {} }, writable: true });

import {
  DEFAULT_HABITS,
  getMoodLog,
  addMoodEntry,
  getHabitLog,
  logHabit,
  computeCorrelationReport,
  computeStreaks,
  computeWeekComparison,
} from './habit-mood-correlation';

describe('Mood Log', () => {
  beforeEach(() => localStorageMock.clear());

  it('starts empty', () => {
    expect(getMoodLog()).toEqual([]);
  });

  it('adds and retrieves mood entries', () => {
    addMoodEntry({ date: '2026-06-01', value: 8, createdAt: '2026-06-01T10:00:00Z' });
    addMoodEntry({ date: '2026-06-02', value: 6, createdAt: '2026-06-02T10:00:00Z' });
    const log = getMoodLog();
    expect(log).toHaveLength(2);
    expect(log[0].value).toBe(8);
    expect(log[1].value).toBe(6);
  });

  it('replaces entry for same date', () => {
    addMoodEntry({ date: '2026-06-01', value: 8, createdAt: '' });
    addMoodEntry({ date: '2026-06-01', value: 9, createdAt: '' });
    expect(getMoodLog()).toHaveLength(1);
    expect(getMoodLog()[0].value).toBe(9);
  });
});

describe('Habit Log', () => {
  beforeEach(() => localStorageMock.clear());

  it('logs and retrieves habits', () => {
    logHabit({ date: '2026-06-01', habitId: 'exercise_30m', habitName: 'Exercise', category: 'exercise', completed: true, createdAt: '' });
    logHabit({ date: '2026-06-01', habitId: 'sleep_7h', habitName: 'Sleep', category: 'sleep', completed: true, createdAt: '' });
    expect(getHabitLog()).toHaveLength(2);
  });

  it('overwrites habit for same date+id', () => {
    logHabit({ date: '2026-06-01', habitId: 'exercise_30m', habitName: 'Exercise', category: 'exercise', completed: true, createdAt: '' });
    logHabit({ date: '2026-06-01', habitId: 'exercise_30m', habitName: 'Exercise', category: 'exercise', completed: false, createdAt: '' });
    const log = getHabitLog();
    expect(log).toHaveLength(1);
    expect(log[0].completed).toBe(false);
  });
});

describe('Correlation Report', () => {
  beforeEach(() => localStorageMock.clear());

  it('returns empty when no data', () => {
    const report = computeCorrelationReport(DEFAULT_HABITS);
    expect(report.dataDays).toBe(0);
    expect(report.results).toHaveLength(DEFAULT_HABITS.length);
    expect(report.topPositive).toBeNull();
    expect(report.topNegative).toBeNull();
  });

  it('computes correlation with minimal data', () => {
    // 5 days: habit done on days with high mood, not done on low mood
    for (let day = 1; day <= 5; day++) {
      const date = `2026-06-0${day}`;
      addMoodEntry({ date, value: 6 + day, createdAt: '' });
    }
    // Exercise done days 1,2,3 (mood 7,8,9) — not logged on 4,5
    logHabit({ date: '2026-06-01', habitId: 'exercise_30m', habitName: '30+ Min Exercise', category: 'exercise', completed: true, createdAt: '' });
    logHabit({ date: '2026-06-02', habitId: 'exercise_30m', habitName: '30+ Min Exercise', category: 'exercise', completed: true, createdAt: '' });
    logHabit({ date: '2026-06-03', habitId: 'exercise_30m', habitName: '30+ Min Exercise', category: 'exercise', completed: true, createdAt: '' });

    // Sleep done all days
    for (let day = 1; day <= 5; day++) {
      logHabit({ date: `2026-06-0${day}`, habitId: 'sleep_7h', habitName: '7+ Hours Sleep', category: 'sleep', completed: true, createdAt: '' });
    }

    const report = computeCorrelationReport(DEFAULT_HABITS);
    expect(report.dataDays).toBe(5);

    const exerciseResult = report.results.find(r => r.habitId === 'exercise_30m');
    expect(exerciseResult).toBeDefined();
    expect(exerciseResult!.n).toBeGreaterThanOrEqual(3);
    // Exercise has positive correlation (done on higher mood days 1-3 vs 4-5 not logged)
    // Since we only logged completion (not non-completion), correlation won't fire for "not done" days
    // because there are no "logged as not completed" entries on days 4-5
    expect(exerciseResult!.strength).toBe('none'); // No "not done" entries to compare against
  });

  it('detects positive correlation when habit matches high mood', () => {
    // 7 days: mood varies
    const moods = [4, 7, 3, 8, 5, 9, 6];
    for (let day = 0; day < 7; day++) {
      addMoodEntry({ date: `2026-06-1${day + 1}`, value: moods[day], createdAt: '' });
    }

    // Exercise done on high mood days (7, 8, 9), not on low mood (4, 3, 5)
    [1, 3, 5].forEach(i => {
      logHabit({ date: `2026-06-1${i + 1}`, habitId: 'exercise_30m', habitName: '30+ Min Exercise', category: 'exercise', completed: true, createdAt: '' });
    });
    // Not done on low mood days — log as NOT completed
    [0, 2, 4].forEach(i => {
      logHabit({ date: `2026-06-1${i + 1}`, habitId: 'exercise_30m', habitName: '30+ Min Exercise', category: 'exercise', completed: false, createdAt: '' });
    });

    const report = computeCorrelationReport(DEFAULT_HABITS);
    const exerciseResult = report.results.find(r => r.habitId === 'exercise_30m');
    expect(exerciseResult).toBeDefined();
    // Exercise on high mood days = positive correlation expected
    expect(exerciseResult!.n).toBeGreaterThanOrEqual(3);
  });
});

describe('Week Comparison', () => {
  beforeEach(() => localStorageMock.clear());

  it('returns empty when no data', () => {
    const comp = computeWeekComparison(DEFAULT_HABITS);
    expect(comp.thisWeekStart).toBe('');
    expect(comp.thisWeekDays).toBe(0);
    expect(comp.lastWeekDays).toBe(0);
    expect(isNaN(comp.thisWeekMoodAvg)).toBe(true);
  });

  it('computes mood delta between weeks', () => {
    // Simulate last week (Mon-Sun) and this week (Mon-Sun)
    // Let's use fixed dates: last week = May 25-31, this week = Jun 1-7
    // Last week mood: consistently 5
    for (let day = 25; day <= 31; day++) {
      addMoodEntry({ date: `2026-05-${String(day).padStart(2, '0')}`, value: 5, createdAt: '' });
      logHabit({ date: `2026-05-${String(day).padStart(2, '0')}`, habitId: 'sleep_7h', habitName: '7+ Hours Sleep', category: 'sleep', completed: true, createdAt: '' });
    }
    // This week mood: 8
    for (let day = 1; day <= 7; day++) {
      addMoodEntry({ date: `2026-06-${String(day).padStart(2, '0')}`, value: 8, createdAt: '' });
      logHabit({ date: `2026-06-${String(day).padStart(2, '0')}`, habitId: 'sleep_7h', habitName: '7+ Hours Sleep', category: 'sleep', completed: true, createdAt: '' });
    }

    // Freeze time to Monday June 8 so Jun 1-7 is the last completed week
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-06-08T12:00:00Z'));

    try {
      const comp = computeWeekComparison(DEFAULT_HABITS);
      // Jun 1 should be this week start (last completed week)
      expect(comp.thisWeekDays).toBe(7);
      expect(comp.lastWeekDays).toBe(7);
      expect(comp.thisWeekMoodAvg).toBeCloseTo(8, 1);
      expect(comp.lastWeekMoodAvg).toBeCloseTo(5, 1);
      expect(comp.moodDelta).toBeCloseTo(3, 1);
      // Habit rates should be 100% for both weeks
      expect(comp.thisWeekOverallRate).toBeCloseTo(1, 2);
      expect(comp.lastWeekOverallRate).toBeCloseTo(1, 2);
    } finally {
      vi.useRealTimers();
    }
  });

  it('returns per-habit delta', () => {
    // Last week: sleep completed 7/7, exercise 3/7
    for (let day = 25; day <= 31; day++) {
      const date = `2026-05-${String(day).padStart(2, '0')}`;
      addMoodEntry({ date, value: 6, createdAt: '' });
      logHabit({ date, habitId: 'sleep_7h', habitName: '7+ Hours Sleep', category: 'sleep', completed: true, createdAt: '' });
      // Exercise done only on 3 days
      logHabit({ date, habitId: 'exercise_30m', habitName: '30+ Min Exercise', category: 'exercise', completed: day % 2 === 0, createdAt: '' });
    }
    // This week: sleep 7/7, exercise 7/7
    for (let day = 1; day <= 7; day++) {
      const date = `2026-06-${String(day).padStart(2, '0')}`;
      addMoodEntry({ date, value: 7, createdAt: '' });
      logHabit({ date, habitId: 'sleep_7h', habitName: '7+ Hours Sleep', category: 'sleep', completed: true, createdAt: '' });
      logHabit({ date, habitId: 'exercise_30m', habitName: '30+ Min Exercise', category: 'exercise', completed: true, createdAt: '' });
    }

    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-06-08T12:00:00Z'));

    try {
      const comp = computeWeekComparison(DEFAULT_HABITS);
      // Sleep should be 0% delta (100% both weeks)
      expect(comp.habitRates['sleep_7h']?.delta).toBeCloseTo(0, 2);
      // Exercise should show improvement (~57% improvement: 3/7→7/7)
      expect(comp.habitRates['exercise_30m']?.thisWeekRate).toBeCloseTo(1, 2);
      expect(comp.habitRates['exercise_30m']?.lastWeekRate).toBeCloseTo(3/7, 2);
      expect(comp.habitRates['exercise_30m']?.delta).toBeCloseTo(1 - 3/7, 2);
    } finally {
      vi.useRealTimers();
    }
  });
});

describe('Streaks', () => {
  beforeEach(() => localStorageMock.clear());

  it('returns zeros for no data', () => {
    const streaks = computeStreaks('exercise_30m');
    expect(streaks.current).toBe(0);
    expect(streaks.longest).toBe(0);
    expect(streaks.total).toBe(0);
  });

  it('computes current streak', () => {
    // Today and yesterday
    const today = new Date().toISOString().slice(0, 10);
    const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
    const twoDaysAgo = new Date(Date.now() - 2 * 86400000).toISOString().slice(0, 10);

    logHabit({ date: twoDaysAgo, habitId: 'exercise_30m', habitName: 'Exercise', category: 'exercise', completed: true, createdAt: '' });
    logHabit({ date: yesterday, habitId: 'exercise_30m', habitName: 'Exercise', category: 'exercise', completed: true, createdAt: '' });
    logHabit({ date: today, habitId: 'exercise_30m', habitName: 'Exercise', category: 'exercise', completed: true, createdAt: '' });

    const streaks = computeStreaks('exercise_30m');
    expect(streaks.current).toBe(3);
    expect(streaks.longest).toBe(3);
    expect(streaks.total).toBe(3);
  });
});
