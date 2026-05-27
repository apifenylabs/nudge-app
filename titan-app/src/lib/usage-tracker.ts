// Lightweight daily usage tracker — stores daily stat snapshots in localStorage
// Used by the dashboard to render activity sparklines and weekly trends

export interface DailyStat {
  date: string;       // ISO date YYYY-MM-DD
  tasksRun: number;
  xpEarned: number;
  skillsCertified: number;
}

const STORAGE_KEY = 'titan-usage-history';

export function loadUsageHistory(): DailyStat[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as DailyStat[];
  } catch {
    return [];
  }
}

export function saveUsageHistory(history: DailyStat[]): void {
  if (typeof window === 'undefined') return;
  try {
    // Keep max 90 days
    const trimmed = history.slice(-90);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(trimmed));
  } catch { /* quota exceeded — silently drop */ }
}

export function recordDailyStat(stat: Partial<DailyStat>): void {
  if (typeof window === 'undefined') return;
  const today = new Date().toISOString().split('T')[0];
  const history = loadUsageHistory();
  const existingIndex = history.findIndex(d => d.date === today);

  if (existingIndex >= 0) {
    history[existingIndex] = {
      ...history[existingIndex],
      ...stat,
      date: today,
    };
  } else {
    history.push({
      date: today,
      tasksRun: stat.tasksRun ?? 0,
      xpEarned: stat.xpEarned ?? 0,
      skillsCertified: stat.skillsCertified ?? 0,
    });
  }
  saveUsageHistory(history);
}

export function getWeeklySummary(): { tasksRun: number; xpEarned: number; activeDays: number } {
  const history = loadUsageHistory();
  const weekAgo = new Date();
  weekAgo.setDate(weekAgo.getDate() - 7);
  const weekKey = weekAgo.toISOString().split('T')[0];

  const weekData = history.filter(d => d.date >= weekKey);
  return {
    tasksRun: weekData.reduce((s, d) => s + d.tasksRun, 0),
    xpEarned: weekData.reduce((s, d) => s + d.xpEarned, 0),
    activeDays: weekData.filter(d => d.tasksRun > 0 || d.xpEarned > 0).length,
  };
}

export function getLast7Days(): DailyStat[] {
  const history = loadUsageHistory();
  const result: DailyStat[] = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const key = d.toISOString().split('T')[0];
    const found = history.find(h => h.date === key);
    result.push(found ?? { date: key, tasksRun: 0, xpEarned: 0, skillsCertified: 0 });
  }
  return result;
}
