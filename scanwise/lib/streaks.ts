// Daily streak tracking using localStorage (client-side only)

const STORAGE_KEY = "scanwise-streak";
const SCAN_HISTORY_KEY = "scanwise-scans";

export interface StreakData {
  currentStreak: number;
  longestStreak: number;
  lastScanDate: string | null;
  totalScans: number;
}

/**
 * Get the current streak data from localStorage
 */
export function getStreak(): StreakData {
  if (typeof window === "undefined") {
    return {
      currentStreak: 0,
      longestStreak: 0,
      lastScanDate: null,
      totalScans: 0,
    };
  }

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch {
    // Corrupted data, reset
  }

  return {
    currentStreak: 0,
    longestStreak: 0,
    lastScanDate: null,
    totalScans: 0,
  };
}

/**
 * Record a scan and update the streak
 */
export function recordScan(): StreakData {
  if (typeof window === "undefined") {
    return getStreak();
  }

  const streak = getStreak();
  const today = new Date().toISOString().split("T")[0];
  const yesterday = new Date(Date.now() - 86400000)
    .toISOString()
    .split("T")[0];

  // Don't double-count today
  if (streak.lastScanDate === today) {
    streak.totalScans += 1;
    saveStreak(streak);
    return streak;
  }

  // Check if consecutive
  if (streak.lastScanDate === yesterday) {
    streak.currentStreak += 1;
  } else if (streak.lastScanDate !== today) {
    // Streak broken
    streak.currentStreak = 1;
  }

  // Update longest streak
  if (streak.currentStreak > streak.longestStreak) {
    streak.longestStreak = streak.currentStreak;
  }

  streak.lastScanDate = today;
  streak.totalScans += 1;
  saveStreak(streak);

  return streak;
}

function saveStreak(data: StreakData): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // localStorage may be full
  }
}

/**
 * Get streak milestone info
 */
export function getStreakMilestone(streak: number): {
  milestone: number;
  emoji: string;
  label: string;
  achieved: boolean;
} | null {
  const milestones = [
    { days: 3, emoji: "🌱", label: "Curious Starter" },
    { days: 7, emoji: "🔥", label: "Weekly Warrior" },
    { days: 14, emoji: "💪", label: "Dedicated Scanner" },
    { days: 30, emoji: "🏆", label: "Monthly Master" },
    { days: 60, emoji: "⭐", label: "Scan Sage" },
    { days: 100, emoji: "👑", label: "Century Crown" },
    { days: 365, emoji: "💎", label: "Year Legend" },
  ];

  // Find the highest milestone achieved
  let highest: (typeof milestones)[0] | null = null;
  for (const m of milestones) {
    if (streak >= m.days) {
      highest = m;
    }
  }

  // Find the next milestone
  const next = milestones.find((m) => streak < m.days);

  if (!highest && next) {
    return {
      milestone: next.days,
      emoji: next.emoji,
      label: next.label,
      achieved: false,
    };
  }

  if (highest) {
    return {
      milestone: highest.days,
      emoji: highest.emoji,
      label: highest.label,
      achieved: true,
    };
  }

  return null;
}
