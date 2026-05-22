/**
 * LifeOS Scoring & Analytics Engine
 *
 * Analyzes plugin engagement to produce:
 *   - Category recommendation (personality matching)
 *   - Activity streaks & consistency scoring
 *   - XP and progression analytics
 *   - Category-fit scoring based on engagement patterns
 *
 * Persists to localStorage (dual-write to Supabase when available).
 */

import { getAllPlugins, getTotalActions, type LifeCategory, type LifeOSPlugin } from './plugins';

// ─── Constants ──────────────────────────────────────────────────────────

const STORAGE_KEY_ANALYTICS = 'titan-lifeos-analytics';
const STREAK_WINDOW_MS = 48 * 60 * 60 * 1000; // 48h for "daily" streak (forgiveness)

const CATEGORY_GROUP_PERSONALITIES: Record<string, LifeCategory[]> = {
  'The Explorer': ['travel', 'luxury-travel', 'ev'],
  'The Family Anchor': ['family', 'kids', 'senior'],
  'The Hustler': ['career', 'finance', 'social'],
  'The Wellness Seeker': ['health', 'fitness', 'learning'],
  'The Balanced Builder': ['family', 'travel', 'finance', 'health', 'career', 'learning'],
};

const PERSONALITY_DESCRIPTIONS: Record<string, string> = {
  'The Explorer': 'You crave new experiences — destinations, routes, and luxury escapes. Your ideal OS is a compass.',
  'The Family Anchor': 'Your center is home and community. You optimize for togetherness, care, and shared joy.',
  'The Hustler': 'Growth, money, and network. You build systems that amplify your ambition.',
  'The Wellness Seeker': 'Mind, body, and soul. You optimize for longevity, focus, and vitality.',
  'The Balanced Builder': 'You touch every corner of life. Your system needs breadth and depth across all domains.',
};

// ─── Types ──────────────────────────────────────────────────────────────

export interface CategoryScore {
  category: LifeCategory;
  name: string;
  emoji: string;
  color: string;
  completedTasks: number;
  totalTasks: number;
  progress: number;
  lastActiveAt: string;
  streakDays: number;
  xpEarned: number;
}

export interface PersonalityMatch {
  personality: string;
  description: string;
  matchScore: number; // 0–100
  matchedCategories: LifeCategory[];
}

export interface LifeOSAnalytics {
  scores: CategoryScore[];
  totalActions: number;
  totalPlugins: number;
  activeStreak: number;
  bestStreak: number;
  topCategory: LifeCategory | null;
  personalityMatch: PersonalityMatch | null;
  insights: string[];
  computedAt: string;
}

interface PersistedAnalytics {
  streakHistory: string[]; // ISO dates of activity
  bestStreak: number;
}

// ─── Helpers ────────────────────────────────────────────────────────────

function loadPersisted(): PersistedAnalytics {
  if (typeof window === 'undefined') return { streakHistory: [], bestStreak: 0 };
  try {
    const raw = localStorage.getItem(STORAGE_KEY_ANALYTICS);
    if (raw) return JSON.parse(raw);
  } catch {}
  return { streakHistory: [], bestStreak: 0 };
}

function savePersisted(data: PersistedAnalytics): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY_ANALYTICS, JSON.stringify(data));
  } catch {}
}

function computeStreak(history: string[]): { current: number; best: number } {
  if (history.length === 0) return { current: 0, best: 0 };

  const sorted = [...history].sort().reverse();
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const todayTs = today.getTime();

  let currentStreak = 0;
  let checkDate = todayTs;

  for (const dateStr of sorted) {
    const d = new Date(dateStr);
    d.setHours(0, 0, 0, 0);
    const diff = checkDate - d.getTime();

    if (diff >= 0 && diff <= STREAK_WINDOW_MS) {
      currentStreak++;
      checkDate = d.getTime() - 24 * 60 * 60 * 1000; // move back one day
    } else if (diff > STREAK_WINDOW_MS) {
      break; // gap found
    }
  }

  // Compute best streak (simple pass)
  let best = currentStreak;
  let tempStreak = 1;
  for (let i = 1; i < sorted.length; i++) {
    const prev = new Date(sorted[i - 1]).getTime();
    const curr = new Date(sorted[i]).getTime();
    if (prev - curr <= STREAK_WINDOW_MS) {
      tempStreak++;
      best = Math.max(best, tempStreak);
    } else {
      tempStreak = 1;
    }
  }

  return { current: currentStreak, best };
}

function computePersonality(scores: CategoryScore[]): PersonalityMatch | null {
  const active = scores
    .filter(s => s.completedTasks > 0)
    .sort((a, b) => b.completedTasks - a.completedTasks);

  if (active.length === 0) return null;

  const totalTasks = active.reduce((sum, s) => sum + s.completedTasks, 0);
  if (totalTasks === 0) return null;

  let bestPersonality = '';
  let bestScore = 0;
  let bestMatched: LifeCategory[] = [];

  for (const [personality, categories] of Object.entries(CATEGORY_GROUP_PERSONALITIES)) {
    const matchedCategories = active.filter(s => categories.includes(s.category));
    if (matchedCategories.length === 0) continue;

    // Score: percentage of user's activity that falls in this personality group
    const groupTasks = matchedCategories.reduce((sum, s) => sum + s.completedTasks, 0);
    const rawScore = (groupTasks / totalTasks) * 100;

    // Bonus for diversity within the group
    const diversityBonus = (matchedCategories.length / categories.length) * 20;

    const finalScore = Math.min(rawScore + diversityBonus, 100);

    if (finalScore > bestScore) {
      bestScore = Math.round(finalScore);
      bestPersonality = personality;
      bestMatched = matchedCategories.map(s => s.category);
    }
  }

  if (!bestPersonality) return null;

  return {
    personality: bestPersonality,
    description: PERSONALITY_DESCRIPTIONS[bestPersonality] || '',
    matchScore: bestScore,
    matchedCategories: bestMatched,
  };
}

function generateInsights(
  scores: CategoryScore[],
  personality: PersonalityMatch | null,
  activeStreak: number,
  totalActions: number
): string[] {
  const insights: string[] = [];

  if (activeStreak >= 7) {
    insights.push(`🔥 ${activeStreak}-day streak! Consistency is your superpower.`);
  } else if (activeStreak >= 3) {
    insights.push(`✨ ${activeStreak}-day streak going. Keep the momentum!`);
  }

  if (personality) {
    insights.push(`🧠 You're "${personality.personality}" — ${personality.description.split('.')[0]}.`);
  }

  // Find stalled categories
  const stalled = scores.filter(s => s.completedTasks > 0 && s.lastActiveAt && 
    (Date.now() - new Date(s.lastActiveAt).getTime()) > 7 * 24 * 60 * 60 * 1000
  );
  if (stalled.length > 0) {
    const names = stalled.map(s => s.name).join(', ');
    insights.push(`⏸️ ${stalled.length} plugin${stalled.length > 1 ? 's' : ''} inactive for 7+ days: ${names}.`);
  }

  // Low-hanging fruit
  const inProgress = scores.filter(s => s.progress > 0 && s.progress < 100);
  const nearComplete = inProgress.filter(s => s.progress >= 75);
  if (nearComplete.length > 0) {
    insights.push(`🎯 ${nearComplete.length} plugin${nearComplete.length > 1 ? 's' : ''} near completion — finish them for a dopamine hit!`);
  }

  if (totalActions >= 100) {
    insights.push(`💎 Mastery level: ${totalActions} total actions logged. You're power-user material.`);
  }

  if (scores.length > 5) {
    insights.push(`🌱 You've activated ${scores.length} plugins — depth over breadth helps next.`);
  }

  return insights;
}

// ─── Main API ───────────────────────────────────────────────────────────

/**
 * Record an action for streak tracking. Should be called whenever a task is completed.
 */
export function recordAction(): void {
  const persisted = loadPersisted();
  const today = new Date().toISOString().split('T')[0];

  // Only record once per day per call (dedup on date string)
  if (!persisted.streakHistory.includes(today)) {
    persisted.streakHistory.push(today);
    persisted.streakHistory.sort();
    // Keep last 365 days
    if (persisted.streakHistory.length > 365) {
      persisted.streakHistory = persisted.streakHistory.slice(-365);
    }
    const { best } = computeStreak(persisted.streakHistory);
    persisted.bestStreak = Math.max(persisted.bestStreak, best);
    savePersisted(persisted);
  }
}

/**
 * Compute full analytics from current plugin state.
 */
export function computeAnalytics(): LifeOSAnalytics {
  const plugins = getAllPlugins();
  const totalActions = getTotalActions();
  const persisted = loadPersisted();
  const { current: activeStreak, best: bestStreak } = computeStreak(persisted.streakHistory);

  const scores: CategoryScore[] = plugins.map(p => ({
    category: p.category,
    name: p.name,
    emoji: p.emoji,
    color: p.color,
    completedTasks: p.phases.flatMap(ph => ph.tasks.filter(t => t.done)).length,
    totalTasks: p.phases.flatMap(ph => ph.tasks).length,
    progress: p.overallProgress,
    lastActiveAt: p.lastActiveAt,
    streakDays: 0, // per-category streaks coming in v2
    xpEarned: p.overallProgress, // simplified: 1% = 1 XP per plugin
  }));

  // Sort by most engaged
  scores.sort((a, b) => b.completedTasks - a.completedTasks);

  const personality = computePersonality(scores);
  const topCategory = scores.length > 0 ? scores[0].category : null;
  const insights = generateInsights(scores, personality, activeStreak, totalActions);

  return {
    scores,
    totalActions,
    totalPlugins: plugins.length,
    activeStreak,
    bestStreak,
    topCategory,
    personalityMatch: personality,
    insights,
    computedAt: new Date().toISOString(),
  };
}

/**
 * Get the best-ranked categories for a user (recommendations for next activation).
 */
export function getRecommendations(count: number = 3): LifeCategory[] {
  const plugins = getAllPlugins();
  const active = new Set(plugins.map(p => p.category));

  // Categories not yet activated, ranked by fit with current personality
  const availableCategories = [
    { category: 'family' as LifeCategory, order: 1 },
    { category: 'travel' as LifeCategory, order: 2 },
    { category: 'luxury-travel' as LifeCategory, order: 3 },
    { category: 'ev' as LifeCategory, order: 4 },
    { category: 'senior' as LifeCategory, order: 5 },
    { category: 'kids' as LifeCategory, order: 6 },
    { category: 'social' as LifeCategory, order: 7 },
    { category: 'finance' as LifeCategory, order: 8 },
    { category: 'health' as LifeCategory, order: 9 },
    { category: 'career' as LifeCategory, order: 10 },
    { category: 'learning' as LifeCategory, order: 11 },
    { category: 'fitness' as LifeCategory, order: 12 },
  ].filter(c => !active.has(c.category));

  // Personality-aware ordering
  const personality = computePersonality(
    getAllPlugins().map(p => ({
      category: p.category,
      name: p.name,
      emoji: p.emoji,
      color: p.color,
      completedTasks: p.phases.flatMap(ph => ph.tasks.filter(t => t.done)).length,
      totalTasks: p.phases.flatMap(ph => ph.tasks).length,
      progress: p.overallProgress,
      lastActiveAt: p.lastActiveAt,
      streakDays: 0,
      xpEarned: p.overallProgress,
    }))
  );

  if (personality) {
    // Boost categories that match the user's personality
    availableCategories.sort((a, b) => {
      const aInPersonality = personality.matchedCategories.includes(a.category) ? -1 : 0;
      const bInPersonality = personality.matchedCategories.includes(b.category) ? -1 : 0;
      return aInPersonality - bInPersonality || a.order - b.order;
    });
  }

  return availableCategories.slice(0, count).map(c => c.category);
}
