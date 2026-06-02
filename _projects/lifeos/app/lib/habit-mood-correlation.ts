/**
 * Habit → Mood Correlation Engine
 *
 * Cross-references habit completion data with mood entries
 * to compute statistical correlations per habit.
 *
 * Storage: localStorage (structured as LifeOS data store)
 * Future: Supabase-backed when persistence is enabled
 *
 * Architecture:
 *   MoodEntry  → { date: string, value: 1-10, note?: string }
 *   HabitLog   → { date: string, habitId: string, completed: boolean }
 *   Correlation → { habitId: string, r: number, p: number, strength: string }
 */

// ─── Types ─────────────────────────────────────────────────────────

export interface MoodEntry {
  date: string;        // YYYY-MM-DD
  value: number;       // 1-10 scale
  note?: string;
  createdAt: string;   // ISO timestamp
}

export interface HabitLog {
  date: string;        // YYYY-MM-DD
  habitId: string;
  habitName: string;
  category: string;    // e.g. 'sleep', 'exercise', 'nutrition', 'mindfulness'
  completed: boolean;
  createdAt: string;
}

export interface HabitDefinition {
  id: string;
  name: string;
  category: string;
  emoji: string;
  description: string;
}

export interface CorrelationResult {
  habitId: string;
  habitName: string;
  category: string;
  emoji: string;
  /** Pearson correlation coefficient (-1 to 1) */
  r: number;
  /** Number of paired data points (days with both habit + mood) */
  n: number;
  /** Interpretive label */
  strength: 'strong-positive' | 'moderate-positive' | 'weak-positive' | 'none' | 'weak-negative' | 'moderate-negative' | 'strong-negative';
  /** Human-readable summary */
  insight: string;
  /** Trend direction */
  trend: 'up' | 'down' | 'flat';
}

export interface CorrelationReport {
  results: CorrelationResult[];
  topPositive: CorrelationResult | null;
  topNegative: CorrelationResult | null;
  overallMoodTrend: {
    average: number;
    trend: 'up' | 'down' | 'flat';
    volatility: number;
  };
  generatedAt: string;
  dataDays: number;
}

// ─── Storage Keys ──────────────────────────────────────────────────

const STORAGE_KEYS = {
  MOOD_LOG: 'lifeos_mood_log',
  HABIT_LOG: 'lifeos_habit_log',
  HABIT_DEFS: 'lifeos_habit_definitions',
};

// ─── Default Habits ────────────────────────────────────────────────

export const DEFAULT_HABITS: HabitDefinition[] = [
  { id: 'sleep_7h',      name: '7+ Hours Sleep',       category: 'sleep',       emoji: '😴', description: 'Prioritize 7+ hours of quality sleep' },
  { id: 'exercise_30m',  name: '30+ Min Exercise',     category: 'exercise',    emoji: '🏃', description: 'Get at least 30 minutes of physical activity' },
  { id: 'meditate',      name: 'Meditation',            category: 'mindfulness', emoji: '🧘', description: 'Daily meditation or mindfulness practice' },
  { id: 'healthy_meals', name: '3 Healthy Meals',       category: 'nutrition',   emoji: '🥗', description: 'Eat three balanced, nutritious meals' },
  { id: 'water_2l',      name: '2L+ Water',             category: 'nutrition',   emoji: '💧', description: 'Drink at least 2 liters of water' },
  { id: 'no_alcohol',    name: 'No Alcohol',            category: 'lifestyle',   emoji: '🚫', description: 'Skip alcohol for the day' },
  { id: 'read_20m',      name: '20+ Min Reading',       category: 'learning',    emoji: '📖', description: 'Read for at least 20 minutes' },
  { id: 'social_connect',name: 'Social Connection',     category: 'social',      emoji: '👥', description: 'Meaningful social interaction' },
  { id: 'outdoor_time',  name: 'Outdoor Time',          category: 'lifestyle',   emoji: '🌳', description: 'Spend time outside in nature' },
  { id: 'gratitude_j',   name: 'Gratitude Journal',     category: 'mindfulness', emoji: '✍️', description: 'Write down things you\'re grateful for' },
];

// ─── CRUD Operations ───────────────────────────────────────────────

export function getMoodLog(): MoodEntry[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.MOOD_LOG);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function addMoodEntry(entry: MoodEntry): void {
  const log = getMoodLog();
  // Replace existing entry for same date
  const filtered = log.filter(e => e.date !== entry.date);
  filtered.push({ ...entry, createdAt: new Date().toISOString() });
  localStorage.setItem(STORAGE_KEYS.MOOD_LOG, JSON.stringify(filtered));
}

export function deleteMoodEntry(date: string): void {
  const log = getMoodLog().filter(e => e.date !== date);
  localStorage.setItem(STORAGE_KEYS.MOOD_LOG, JSON.stringify(log));
}

export function getHabitLog(): HabitLog[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.HABIT_LOG);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function getHabitsForDate(date: string): HabitLog[] {
  return getHabitLog().filter(h => h.date === date);
}

export function logHabit(habit: HabitLog): void {
  const log = getHabitLog();
  // Replace existing entry for same date + habitId
  const filtered = log.filter(h => !(h.date === habit.date && h.habitId === habit.habitId));
  filtered.push({ ...habit, createdAt: new Date().toISOString() });
  localStorage.setItem(STORAGE_KEYS.HABIT_LOG, JSON.stringify(filtered));
}

export function clearHabitLog(date: string, habitId: string): void {
  const log = getHabitLog().filter(h => !(h.date === date && h.habitId === habitId));
  localStorage.setItem(STORAGE_KEYS.HABIT_LOG, JSON.stringify(log));
}

export function getDateRangeStarts(): string[] {
  const all = new Map<string, boolean>();
  getMoodLog().forEach(e => all.set(e.date, true));
  getHabitLog().forEach(h => all.set(h.date, true));
  return Array.from(all.keys()).sort();
}

// ─── Pearson Correlation ───────────────────────────────────────────

function pearsonR(x: number[], y: number[]): number {
  const n = x.length;
  if (n < 3) return 0; // Too few points for meaningful correlation

  const sumX = x.reduce((a, b) => a + b, 0);
  const sumY = y.reduce((a, b) => a + b, 0);
  const sumXY = x.reduce((acc, xi, i) => acc + xi * y[i], 0);
  const sumX2 = x.reduce((acc, xi) => acc + xi * xi, 0);
  const sumY2 = y.reduce((acc, yi) => acc + yi * yi, 0);

  const numerator = n * sumXY - sumX * sumY;
  const denominator = Math.sqrt((n * sumX2 - sumX * sumX) * (n * sumY2 - sumY * sumY));

  if (denominator === 0) return 0;
  return numerator / denominator;
}

// ─── Interpretation ────────────────────────────────────────────────

function interpretStrength(r: number): CorrelationResult['strength'] {
  const abs = Math.abs(r);
  const sign = r >= 0 ? 'positive' : 'negative';
  if (abs >= 0.7) return `strong-${sign}` as CorrelationResult['strength'];
  if (abs >= 0.4) return `moderate-${sign}` as CorrelationResult['strength'];
  if (abs >= 0.15) return `weak-${sign}` as CorrelationResult['strength'];
  return 'none';
}

function generateInsight(result: CorrelationResult): string {
  const habitName = result.habitName;
  const emoji = result.emoji;

  switch (result.strength) {
    case 'strong-positive':
      return `${emoji} Doing **${habitName}** strongly correlates with higher mood (r=${result.r.toFixed(2)}). This is your biggest mood booster.`;
    case 'moderate-positive':
      return `${emoji} **${habitName}** consistently correlates with better mood days (r=${result.r.toFixed(2)}). Keep at it.`;
    case 'weak-positive':
      return `${emoji} **${habitName}** may slightly boost mood (r=${result.r.toFixed(2)}). The data suggests a small positive effect.`;
    case 'strong-negative':
      return `⚠️ **${habitName}** strongly correlates with lower mood (r=${result.r.toFixed(2)}). This might be a sign of burnout or that this habit needs adjustment.`;
    case 'moderate-negative':
      return `⚠️ **${habitName}** shows a moderate negative correlation with mood (r=${result.r.toFixed(2)}). Worth examining why.`;
    case 'weak-negative':
      return `${emoji} **${habitName}** has a slight negative correlation with mood (r=${result.r.toFixed(2)}). May not be significant.`;
    default:
      return `${emoji} **${habitName}** shows no meaningful correlation with mood (r=${result.r.toFixed(2)}). Either too few data points or no pattern.`;
  }
}

function getTrend(values: number[]): 'up' | 'down' | 'flat' {
  if (values.length < 4) return 'flat';
  const recent = values.slice(-7);
  const firstHalf = recent.slice(0, Math.floor(recent.length / 2));
  const secondHalf = recent.slice(Math.floor(recent.length / 2));
  const avgFirst = firstHalf.reduce((a, b) => a + b, 0) / firstHalf.length;
  const avgSecond = secondHalf.reduce((a, b) => a + b, 0) / secondHalf.length;
  const diff = avgSecond - avgFirst;
  if (diff > 0.5) return 'up';
  if (diff < -0.5) return 'down';
  return 'flat';
}

function standardDeviation(values: number[]): number {
  const mean = values.reduce((a, b) => a + b, 0) / values.length;
  const sqDiffs = values.map(v => (v - mean) ** 2);
  return Math.sqrt(sqDiffs.reduce((a, b) => a + b, 0) / values.length);
}

// ─── Main Computation ──────────────────────────────────────────────

export function computeCorrelationReport(
  habitDefs: HabitDefinition[] = DEFAULT_HABITS,
): CorrelationReport {
  const moodLog = getMoodLog();
  const habitLog = getHabitLog();

  // Build mood map: date → value
  const moodMap = new Map<string, number>();
  moodLog.forEach(e => { moodMap.set(e.date, e.value); });

  // Group habits by ID
  const habitGroups = new Map<string, { dates: string[]; values: number[] }>();
  habitLog
    .filter(h => h.completed)
    .forEach(h => {
      if (!habitGroups.has(h.habitId)) {
        habitGroups.set(h.habitId, { dates: [], values: [] });
      }
      const g = habitGroups.get(h.habitId)!;
      const moodVal = moodMap.get(h.date);
      if (moodVal !== undefined) {
        g.dates.push(h.date);
        g.values.push(moodVal);
      }
    });

  // Build results
  const results: CorrelationResult[] = [];
  habitDefs.forEach(def => {
    const g = habitGroups.get(def.id);
    if (!g || g.dates.length < 3) {
      // Not enough data
      results.push({
        habitId: def.id,
        habitName: def.name,
        category: def.category,
        emoji: def.emoji,
        r: 0,
        n: g?.dates.length || 0,
        strength: 'none',
        insight: `${def.emoji} **${def.name}**: Need at least 3 days with both habit + mood data to compute correlation (currently ${g?.dates.length || 0}).`,
        trend: 'flat',
      });
      return;
    }

    // For correlation, x = 1 (habit done), but since we filter by completion,
    // we correlate completion days vs non-completion days mood averages.
    // Better approach: compare mood on days habit IS done vs days it ISN'T.
    const doneDays = new Set(g.dates);
    const allDates = getDateRangeStarts();

    const moodDone: number[] = [];
    const moodNotDone: number[] = [];

    allDates.forEach(date => {
      const moodVal = moodMap.get(date);
      if (moodVal === undefined) return;
      if (doneDays.has(date)) {
        moodDone.push(moodVal);
      } else {
        // Check if habit was logged (even as not-completed) on this date
        const logged = habitLog.find(h => h.date === date && h.habitId === def.id);
        if (logged && !logged.completed) {
          moodNotDone.push(moodVal);
        }
      }
    });

    // If we have both groups, compute point-biserial equivalent
    // (Pearson between binary {0=not done, 1=done} and mood values)
    const x: number[] = [];
    const y: number[] = [];

    moodDone.forEach(val => { x.push(1); y.push(val); });
    moodNotDone.forEach(val => { x.push(0); y.push(val); });

    const r = x.length >= 4 ? pearsonR(x, y) : 0;
    const n = Math.min(x.length, g.dates.length);

    const result: CorrelationResult = {
      habitId: def.id,
      habitName: def.name,
      category: def.category,
      emoji: def.emoji,
      r,
      n,
      strength: interpretStrength(r),
      insight: '',
      trend: getTrend(moodDone),
    };
    result.insight = generateInsight(result);
    results.push(result);
  });

  // Sort by absolute correlation (strongest first)
  results.sort((a, b) => Math.abs(b.r) - Math.abs(a.r));

  // Compute overall mood trend
  const moodValues = Array.from(moodMap.values());
  const overallMoodTrend = {
    average: moodValues.length > 0
      ? moodValues.reduce((a, b) => a + b, 0) / moodValues.length
      : 0,
    trend: getTrend(moodValues),
    volatility: moodValues.length > 0 ? standardDeviation(moodValues) : 0,
  };

  // Top positive & negative
  const withData = results.filter(r => r.n >= 3 && r.strength !== 'none');
  const topPositive = withData.find(r => r.r > 0) || null;
  const topNegative = [...withData].reverse().find(r => r.r < 0) || null;

  return {
    results,
    topPositive,
    topNegative,
    overallMoodTrend,
    generatedAt: new Date().toISOString(),
    dataDays: moodMap.size,
  };
}

// ─── Streak Computation ────────────────────────────────────────────

// ─── Week-over-Week Comparison ──────────────────────────────────────

export interface WeekComparison {
  /** ISO date of the Monday for this week */
  thisWeekStart: string;
  /** ISO date of the Monday for last week */
  lastWeekStart: string;
  /** Average mood this week (NaN if no data) */
  thisWeekMoodAvg: number;
  /** Average mood last week (NaN if no data) */
  lastWeekMoodAvg: number;
  /** Mood delta (this - last) */
  moodDelta: number;
  /** Days logged this week */
  thisWeekDays: number;
  /** Days logged last week */
  lastWeekDays: number;
  /** Habit completion rates this week: habitId → {name, emoji, thisWeekRate, lastWeekRate, delta} */
  habitRates: Record<string, { name: string; emoji: string; category: string; thisWeekRate: number; lastWeekRate: number; delta: number }>;
  /** Overall habit completion rate this week (0-1) */
  thisWeekOverallRate: number;
  /** Overall habit completion rate last week (0-1) */
  lastWeekOverallRate: number;
  /** Overall habit rate delta */
  overallRateDelta: number;
}

/**
 * Get the Monday of the week containing the given date.
 */
function getWeekStart(dateStr: string): string {
  const d = new Date(dateStr + 'T12:00:00');
  const day = d.getDay(); // 0=Sun, 1=Mon, ...
  const diff = day === 0 ? -6 : 1 - day; // Monday
  d.setDate(d.getDate() + diff);
  return d.toISOString().slice(0, 10);
}

/**
 * Compute week-over-week comparison for the most recent completed week (Mon–Sun)
 * vs the week before it.
 */
export function computeWeekComparison(habitDefs: HabitDefinition[] = DEFAULT_HABITS): WeekComparison {
  const moodLog = getMoodLog();
  const habitLog = getHabitLog();

  const moodMap = new Map(moodLog.map(m => [m.date, m.value]));

  // Find the most recent Sunday (end of last completed week)
  const today = new Date();
  const todayStr = today.toISOString().slice(0, 10);

  // Find the most recent Sunday that has data AND is before today
  const allDates = getDateRangeStarts().filter(d => d < todayStr).sort().reverse();
  if (allDates.length === 0) {
    // No historical data — return empty comparison
    return {
      thisWeekStart: '', lastWeekStart: '',
      thisWeekMoodAvg: NaN, lastWeekMoodAvg: NaN, moodDelta: 0,
      thisWeekDays: 0, lastWeekDays: 0,
      habitRates: {},
      thisWeekOverallRate: 0, lastWeekOverallRate: 0, overallRateDelta: 0,
    };
  }

  // Walk backwards from the most recent data date to find the last completed Monday–Sunday week
  // that doesn't include today (we want fully completed weeks only)
  const latestDataDate = allDates[0];
  const latestWeekStart = getWeekStart(latestDataDate);

  // If we're mid-week, use the previous full week
  let thisWeekStartDate: string;
  const todayWeekStart = getWeekStart(todayStr);
  if (latestWeekStart === todayWeekStart) {
    // Still in current week, compare last full week vs the one before
    const lastSun = new Date(todayWeekStart + 'T12:00:00');
    lastSun.setDate(lastSun.getDate() - 1); // go to Sunday
    const prevMon = new Date(lastSun);
    prevMon.setDate(prevMon.getDate() - 6);
    thisWeekStartDate = prevMon.toISOString().slice(0, 10);
  } else {
    thisWeekStartDate = latestWeekStart;
  }

  const thisMonday = new Date(thisWeekStartDate + 'T12:00:00');
  const thisSunday = new Date(thisMonday);
  thisSunday.setDate(thisMonday.getDate() + 6);

  const lastMonday = new Date(thisMonday);
  lastMonday.setDate(lastMonday.getDate() - 7);
  const lastSunday = new Date(lastMonday);
  lastSunday.setDate(lastMonday.getDate() + 6);

  const thisWeekStartStr = thisMonday.toISOString().slice(0, 10);
  const lastWeekStartStr = lastMonday.toISOString().slice(0, 10);
  const thisWeekEndStr = thisSunday.toISOString().slice(0, 10);
  const lastWeekEndStr = lastSunday.toISOString().slice(0, 10);

  function inThisWeek(date: string): boolean {
    return date >= thisWeekStartStr && date <= thisWeekEndStr;
  }
  function inLastWeek(date: string): boolean {
    return date >= lastWeekStartStr && date <= lastWeekEndStr;
  }

  // Mood averages
  const thisWeekMoods = moodLog.filter(m => inThisWeek(m.date)).map(m => m.value);
  const lastWeekMoods = moodLog.filter(m => inLastWeek(m.date)).map(m => m.value);
  const thisWeekMoodAvg = thisWeekMoods.length > 0
    ? thisWeekMoods.reduce((a, b) => a + b, 0) / thisWeekMoods.length
    : NaN;
  const lastWeekMoodAvg = lastWeekMoods.length > 0
    ? lastWeekMoods.reduce((a, b) => a + b, 0) / lastWeekMoods.length
    : NaN;
  const moodDelta = (isNaN(thisWeekMoodAvg) || isNaN(lastWeekMoodAvg)) ? 0 : thisWeekMoodAvg - lastWeekMoodAvg;

  // Habit completion rates per habit
  const habitRates: WeekComparison['habitRates'] = {};
  let thisWeekTotalHabits = 0;
  let thisWeekCompletedHabits = 0;
  let lastWeekTotalHabits = 0;
  let lastWeekCompletedHabits = 0;

  habitDefs.forEach(def => {
    const thisWeekHabits = habitLog.filter(h => h.habitId === def.id && inThisWeek(h.date));
    const lastWeekHabits = habitLog.filter(h => h.habitId === def.id && inLastWeek(h.date));

    const thisWeekRate = thisWeekHabits.length > 0
      ? thisWeekHabits.filter(h => h.completed).length / thisWeekHabits.length
      : 0;
    const lastWeekRate = lastWeekHabits.length > 0
      ? lastWeekHabits.filter(h => h.completed).length / lastWeekHabits.length
      : 0;

    habitRates[def.id] = {
      name: def.name,
      emoji: def.emoji,
      category: def.category,
      thisWeekRate,
      lastWeekRate,
      delta: thisWeekRate - lastWeekRate,
    };

    thisWeekTotalHabits += thisWeekHabits.length;
    thisWeekCompletedHabits += thisWeekHabits.filter(h => h.completed).length;
    lastWeekTotalHabits += lastWeekHabits.length;
    lastWeekCompletedHabits += lastWeekHabits.filter(h => h.completed).length;
  });

  return {
    thisWeekStart: thisWeekStartStr,
    lastWeekStart: lastWeekStartStr,
    thisWeekMoodAvg,
    lastWeekMoodAvg,
    moodDelta,
    thisWeekDays: thisWeekMoods.length,
    lastWeekDays: lastWeekMoods.length,
    habitRates,
    thisWeekOverallRate: thisWeekTotalHabits > 0 ? thisWeekCompletedHabits / thisWeekTotalHabits : 0,
    lastWeekOverallRate: lastWeekTotalHabits > 0 ? lastWeekCompletedHabits / lastWeekTotalHabits : 0,
    overallRateDelta: thisWeekTotalHabits > 0 && lastWeekTotalHabits > 0
      ? (thisWeekCompletedHabits / thisWeekTotalHabits) - (lastWeekCompletedHabits / lastWeekTotalHabits)
      : 0,
  };
}

// ─── Streak Computation ────────────────────────────────────────────

export function computeStreaks(habitId: string): {
  current: number;
  longest: number;
  total: number;
} {
  const log = getHabitLog()
    .filter(h => h.habitId === habitId && h.completed)
    .map(h => h.date)
    .sort()
    .reverse(); // newest first

  if (log.length === 0) return { current: 0, longest: 0, total: 0 };

  let current = 1;
  // Check if today or yesterday was the last entry
  const today = new Date().toISOString().slice(0, 10);
  const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
  if (log[0] !== today && log[0] !== yesterday) {
    current = 0;
  } else {
    for (let i = 1; i < log.length; i++) {
      const prev = new Date(log[i - 1]);
      const curr = new Date(log[i]);
      const diffMs = prev.getTime() - curr.getTime();
      const diffDays = Math.round(diffMs / 86400000);
      if (diffDays === 1) {
        current++;
      } else {
        break;
      }
    }
  }

  // Longest streak
  let longest = 1;
  let streak = 1;
  const sorted = [...log].reverse(); // oldest first
  for (let i = 1; i < sorted.length; i++) {
    const prev = new Date(sorted[i - 1]);
    const curr = new Date(sorted[i]);
    const diffMs = curr.getTime() - prev.getTime();
    const diffDays = Math.round(diffMs / 86400000);
    if (diffDays === 1) {
      streak++;
      longest = Math.max(longest, streak);
    } else {
      streak = 1;
    }
  }

  return { current, longest, total: log.length };
}
