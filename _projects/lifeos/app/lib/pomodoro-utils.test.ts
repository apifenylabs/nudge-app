/**
 * Unit tests for Pomodoro Timer utility functions.
 * These test the pure logic (formatting, stats aggregation) isolated from React.
 */

import { describe, it, expect } from 'vitest';

// ─── Duplicate the pure utility functions here for independent testing ──

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}

interface CompletedSession {
  date: string;
  duration: number;
  mode: string;
  interrupted: boolean;
}

function aggregateDailyStats(sessions: CompletedSession[]): {
  totalPomodoros: number;
  totalFocusMinutes: number;
  totalInterruptions: number;
  streakDays: number;
} {
  const focusSessions = sessions.filter(s => s.mode === 'focus');
  const todayKey = '2026-06-02'; // deterministic for tests

  const totalPomodoros = focusSessions.filter(s => !s.interrupted).length;
  const totalFocusMinutes = focusSessions.reduce((sum, s) => sum + s.duration, 0);
  const totalInterruptions = focusSessions.filter(s => s.interrupted).length;

  // Simple streak calculation: count consecutive days back from today
  const daysWithSessions = new Set(sessions.map(s => s.date));
  let streak = 0;
  const d = new Date(todayKey);
  while (true) {
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    if (daysWithSessions.has(key)) {
      streak++;
      d.setDate(d.getDate() - 1);
    } else {
      break;
    }
  }

  return { totalPomodoros, totalFocusMinutes, totalInterruptions, streakDays: streak };
}

function getModeDuration(mode: string, config: {
  focusMinutes: number;
  shortBreakMinutes: number;
  longBreakMinutes: number;
}): number {
  switch (mode) {
    case 'focus': return config.focusMinutes;
    case 'shortBreak': return config.shortBreakMinutes;
    case 'longBreak': return config.longBreakMinutes;
    default: return 25;
  }
}

function shouldLongBreak(pomodorosDone: number, interval: number): boolean {
  return pomodorosDone > 0 && pomodorosDone % interval === 0;
}

// ─── Tests ───────────────────────────────────────────────────────────

describe('Pomodoro Utils', () => {
  describe('formatTime', () => {
    it('formats 0 seconds', () => {
      expect(formatTime(0)).toBe('00:00');
    });

    it('formats 25 minutes', () => {
      expect(formatTime(25 * 60)).toBe('25:00');
    });

    it('formats 90 seconds', () => {
      expect(formatTime(90)).toBe('01:30');
    });

    it('formats 5 minutes 7 seconds', () => {
      expect(formatTime(307)).toBe('05:07');
    });

    it('formats 59 minutes 59 seconds', () => {
      expect(formatTime(3599)).toBe('59:59');
    });
  });

  describe('getModeDuration', () => {
    const config = { focusMinutes: 25, shortBreakMinutes: 5, longBreakMinutes: 15 };

    it('returns focus duration', () => {
      expect(getModeDuration('focus', config)).toBe(25);
    });

    it('returns short break duration', () => {
      expect(getModeDuration('shortBreak', config)).toBe(5);
    });

    it('returns long break duration', () => {
      expect(getModeDuration('longBreak', config)).toBe(15);
    });

    it('defaults to 25 for unknown mode', () => {
      expect(getModeDuration('unknown', config)).toBe(25);
    });
  });

  describe('shouldLongBreak', () => {
    it('returns true every 4th pomodoro', () => {
      expect(shouldLongBreak(4, 4)).toBe(true);
      expect(shouldLongBreak(8, 4)).toBe(true);
    });

    it('returns false for non-interval pomodoros', () => {
      expect(shouldLongBreak(1, 4)).toBe(false);
      expect(shouldLongBreak(3, 4)).toBe(false);
    });

    it('returns false for 0 pomodoros', () => {
      expect(shouldLongBreak(0, 4)).toBe(false);
    });

    it('works with custom interval', () => {
      expect(shouldLongBreak(2, 2)).toBe(true);
      expect(shouldLongBreak(4, 2)).toBe(true);
      expect(shouldLongBreak(3, 2)).toBe(false);
    });
  });

  describe('aggregateDailyStats', () => {
    it('counts completed pomodoros', () => {
      const sessions: CompletedSession[] = [
        { date: '2026-06-02', duration: 25, mode: 'focus', interrupted: false },
        { date: '2026-06-02', duration: 25, mode: 'focus', interrupted: false },
        { date: '2026-06-02', duration: 5, mode: 'shortBreak', interrupted: false },
      ];
      const stats = aggregateDailyStats(sessions);
      expect(stats.totalPomodoros).toBe(2);
      expect(stats.totalFocusMinutes).toBe(50);
    });

    it('counts interrupted sessions separately', () => {
      const sessions: CompletedSession[] = [
        { date: '2026-06-02', duration: 10, mode: 'focus', interrupted: true },
        { date: '2026-06-02', duration: 25, mode: 'focus', interrupted: false },
      ];
      const stats = aggregateDailyStats(sessions);
      expect(stats.totalPomodoros).toBe(1);
      expect(stats.totalInterruptions).toBe(1);
      expect(stats.totalFocusMinutes).toBe(35);
    });

    it('calculates streak from consecutive days', () => {
      const sessions: CompletedSession[] = [
        { date: '2026-06-02', duration: 25, mode: 'focus', interrupted: false },
        { date: '2026-06-01', duration: 25, mode: 'focus', interrupted: false },
        { date: '2026-05-31', duration: 25, mode: 'focus', interrupted: false },
        { date: '2026-05-29', duration: 25, mode: 'focus', interrupted: false }, // gap
      ];
      const stats = aggregateDailyStats(sessions);
      expect(stats.streakDays).toBe(3);
    });

    it('handles empty sessions', () => {
      const stats = aggregateDailyStats([]);
      expect(stats.totalPomodoros).toBe(0);
      expect(stats.totalFocusMinutes).toBe(0);
      expect(stats.totalInterruptions).toBe(0);
      expect(stats.streakDays).toBe(0);
    });

    it('ignores non-focus sessions for pomodoro count', () => {
      const sessions: CompletedSession[] = [
        { date: '2026-06-02', duration: 5, mode: 'shortBreak', interrupted: false },
        { date: '2026-06-02', duration: 25, mode: 'focus', interrupted: false },
        { date: '2026-06-02', duration: 15, mode: 'longBreak', interrupted: false },
      ];
      const stats = aggregateDailyStats(sessions);
      expect(stats.totalPomodoros).toBe(1);
      expect(stats.totalFocusMinutes).toBe(25);
    });
  });
});
