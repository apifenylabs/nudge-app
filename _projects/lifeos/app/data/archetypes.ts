/**
 * LifeOS Personality Archetype Engine
 *
 * Analyzes tracking patterns to assign a personality archetype.
 * Archetypes are computed from the last 7 days of data and represent
 * the user's current life phase / dominant tendencies.
 */

import type { DayEntry } from '../lib/storage';
import { TRACKERS } from './trackers';

export interface ArchetypeDef {
  id: string;
  name: string;
  emoji: string;
  description: string;
  /** Score contributions: each is a function that returns a 0-1 weight */
  /** Higher weight = more likely this archetype */
  /** Style hints for visual presentation */
  vibe: string;
  color: string;
  /** Suggested action for the user */
  suggestion: string;
}

export const ARCHETYPES: ArchetypeDef[] = [
  {
    id: 'grinder',
    name: 'The Grinder',
    emoji: '⚙️',
    description: 'You show up every day and put in the work. Productivity and discipline are your superpowers.',
    vibe: 'Relentless, structured, dependable',
    color: '#2563eb',
    suggestion: 'Take time to recharge — even grinders need rest days.',
  },
  {
    id: 'balancer',
    name: 'The Balancer',
    emoji: '⚖️',
    description: 'You maintain equilibrium across life domains. Health, work, and social all get their share.',
    vibe: 'Harmonious, steady, holistic',
    color: '#8b5cf6',
    suggestion: 'Experiment with going deeper in one area this week.',
  },
  {
    id: 'spiritualist',
    name: 'The Spiritualist',
    emoji: '🧘',
    description: 'Mindfulness, reflection, and inner growth drive your journey. You prioritize presence.',
    vibe: 'Mindful, introspective, calm',
    color: '#ec4899',
    suggestion: 'Share your calm with others — teach what you practice.',
  },
  {
    id: 'social_butterfly',
    name: 'The Social Butterfly',
    emoji: '🦋',
    description: 'Connection is your fuel. You thrive on meaningful conversations and community.',
    vibe: 'Warm, magnetic, relational',
    color: '#f59e0b',
    suggestion: 'Quality over quantity — invest in the deepest relationships.',
  },
  {
    id: 'hustler',
    name: 'The Hustler',
    emoji: '🚀',
    description: 'High energy, high output, always pushing. You chase growth and results.',
    vibe: 'Ambitious, energetic, driven',
    color: '#ef4444',
    suggestion: 'Make sure you\'re running toward something, not just running.',
  },
  {
    id: 'wellness_guru',
    name: 'The Wellness Guru',
    emoji: '💪',
    description: 'Physical health is your foundation. Exercise, nutrition, sleep — you optimize it all.',
    vibe: 'Vital, disciplined, health-first',
    color: '#22c55e',
    suggestion: 'Don\'t let perfection become paralysis. 80% is winning.',
  },
  {
    id: 'creative',
    name: 'The Creative',
    emoji: '🎨',
    description: 'Creativity and learning are your oxygen. You make, explore, and grow.',
    vibe: 'Inventive, curious, expressive',
    color: '#f97316',
    suggestion: 'A creative block is just incubation. Step away and it will come.',
  },
  {
    id: 'night_owl',
    name: 'The Night Owl',
    emoji: '🦉',
    description: 'You come alive at night. Sleep may suffer, but your late hours are productive.',
    vibe: 'Nocturnal, intense, reflective',
    color: '#1e293b',
    suggestion: 'Your morning routine could transform your energy. Try one early day.',
  },
];

interface ArchetypeScore {
  archetype: ArchetypeDef;
  score: number; // 0-100
}

/**
 * Compute archetype scores from the last N days of entries.
 * Returns a ranked list of archetypes with their match percentage.
 */
export function computeArchetypes(
  entries: [string, DayEntry][],
  nDays: number = 7,
): { primary: ArchetypeDef; scores: ArchetypeScore[] } {
  const recent = entries
    .sort(([a], [b]) => a.localeCompare(b))
    .slice(-nDays);

  if (recent.length === 0) {
    return { primary: ARCHETYPES[1], scores: [] }; // Default to Balancer
  }

  // Compute per-tracker averages
  const avgs: Record<string, number> = {};
  TRACKERS.forEach((tk) => {
    const vals = recent
      .map(([, e]) => (e[tk.id as keyof DayEntry] as number) ?? tk.def)
      .filter((v) => v !== undefined);
    avgs[tk.id] =
      vals.length > 0 ? vals.reduce((a, b) => a + b, 0) / vals.length : tk.def;
  });

  // Normalize each tracker to 0-1
  const norm: Record<string, number> = {};
  TRACKERS.forEach((tk) => {
    const maxOpt = Math.max(...tk.options.map((o) => o.v));
    norm[tk.id] = avgs[tk.id] / maxOpt;
  });

  // Score each archetype
  const scores: ArchetypeScore[] = ARCHETYPES.map((a) => {
    let score = 0;

    switch (a.id) {
      case 'grinder':
        score = norm.productivity * 40 + norm.work * 30 + norm.energy * 20 + norm.learning * 10;
        break;
      case 'balancer':
        // Low variance across all categories = balanced
        const allVals = Object.values(norm);
        const mean = allVals.reduce((a, b) => a + b, 0) / allVals.length;
        const variance =
          allVals.reduce((a, b) => a + (b - mean) ** 2, 0) / allVals.length;
        score = (1 - Math.min(variance * 3, 1)) * 70 + mean * 30;
        break;
      case 'spiritualist':
        score = norm.mindfulness * 50 + norm.creativity * 20 + (1 - norm.energy * 0.3) * 20 + norm.social * 10;
        break;
      case 'social_butterfly':
        score = norm.social * 50 + norm.mood * 25 + norm.energy * 15 + norm.creativity * 10;
        break;
      case 'hustler':
        score = norm.energy * 30 + norm.productivity * 25 + norm.work * 25 + norm.exercise * 10 + norm.learning * 10;
        break;
      case 'wellness_guru':
        score = norm.exercise * 30 + norm.food * 20 + norm.sleep * 20 + norm.energy * 15 + norm.homecare * 15;
        break;
      case 'creative':
        score = norm.creativity * 50 + norm.learning * 25 + norm.mindfulness * 15 + norm.mood * 10;
        break;
      case 'night_owl':
        score = (1 - norm.sleep) * 40 + norm.productivity * 20 + norm.creativity * 20 + norm.energy * 20;
        break;
      default:
        score = 50;
    }

    // Clamp and fudge for excitement
    score = Math.max(10, Math.min(98, score));

    return { archetype: a, score: Math.round(score) };
  });

  // Sort descending
  scores.sort((a, b) => b.score - a.score);

  return { primary: scores[0].archetype, scores };
}

/**
 * Generate a motivational insight based on the primary archetype and daily score.
 */
export function generateInsight(
  archetype: ArchetypeDef,
  todayScore: number,
  streakDays: number,
): string {
  const scorePhrase =
    todayScore >= 80
      ? 'killing it'
      : todayScore >= 50
        ? 'holding steady'
        : 'having a rough one';

  const streakPhrase =
    streakDays >= 14
      ? 'You\'re on an epic streak 🔥'
      : streakDays >= 7
        ? 'A solid week — respect.'
        : streakDays >= 3
          ? 'Building momentum.'
          : 'Every streak starts with day one.';

  return `As ${archetype.emoji} **${archetype.name}**, you're ${scorePhrase} today. ${streakPhrase} ${archetype.suggestion}`;
}
