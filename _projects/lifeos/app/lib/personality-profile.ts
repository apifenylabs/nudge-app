/**
 * Personality Profile — Pure logic extracted from PersonalityProfile.tsx
 *
 * Contains all testable pure functions for archetype computation,
 * trait scoring, plugin affinity, and recommendations.
 * No React/JSX dependencies — testable in node environment.
 */

import type { UsageSummary } from './usage-analytics';

// ─── Types ─────────────────────────────────────────────────────────

export type PersonalityTrait = 'breadth' | 'depth' | 'consistency' | 'diversity' | 'planning' | 'wellness';

export interface Archetype {
  id: string;
  name: string;
  emoji: string;
  tagline: string;
  description: string;
  color: string; // CSS color for accent
  keywords: string[];
}

export interface PluginRecommendation {
  id: string;
  name: string;
  emoji: string;
  description: string;
  reason: string;
  status: string;
}

// ─── Archetypes ────────────────────────────────────────────────────

export const ARCHETYPES: Archetype[] = [
  {
    id: 'explorer',
    name: 'Explorer',
    emoji: '🧭',
    tagline: 'You try everything. Curiosity is your compass.',
    description: 'You jump between plugins freely, sampling what each offers. Your strength is breadth — you connect ideas across domains.',
    color: '#14B8A6',
    keywords: ['travel', 'curious', 'variety', 'broad'],
  },
  {
    id: 'strategist',
    name: 'Strategist',
    emoji: '♟️',
    tagline: 'You plan before you act. Every move has intent.',
    description: 'You dive deep into finance, career, and productivity. You optimize systems and track progress meticulously.',
    color: '#6366F1',
    keywords: ['finance', 'career', 'productivity', 'planning'],
  },
  {
    id: 'healer',
    name: 'Healer',
    emoji: '🕊️',
    tagline: 'You nurture what matters — yourself and others.',
    description: 'Health, mindfulness, and relationships are your core. You build habits and tend to your inner world.',
    color: '#EC4899',
    keywords: ['health', 'mindfulness', 'relationships', 'wellness'],
  },
  {
    id: 'architect',
    name: 'Architect',
    emoji: '🏗️',
    tagline: 'You build systems and optimize everything.',
    description: 'Home, productivity, and structured learning define you. You love checklists, phase completion, and visible progress.',
    color: '#F59E0B',
    keywords: ['home', 'productivity', 'learning', 'structure'],
  },
  {
    id: 'alchemist',
    name: 'Alchemist',
    emoji: '⚗️',
    tagline: 'You blend domains to create something new.',
    description: 'Your usage spans at least three distinct categories. You synthesize insights across boundaries.',
    color: '#8B5CF6',
    keywords: ['diverse', 'creative', 'synthesis', 'cross-domain'],
  },
  {
    id: 'guardian',
    name: 'Guardian',
    emoji: '🛡️',
    tagline: 'You show up every day. Consistency is your superpower.',
    description: 'You may only use a few plugins, but you use them deep and often. Your streaks and phase completion rates are elite.',
    color: '#10B981',
    keywords: ['consistent', 'dedicated', 'focused', 'loyal'],
  },
];

// ─── Archetype Plugin Recommendations ──────────────────────────────

export const ARCHETYPE_RECOMMENDATIONS: Record<string, { recommendations: PluginRecommendation[]; customMessage: string }> = {
  explorer: {
    customMessage: 'You love variety — these plugins will feed your curiosity across domains.',
    recommendations: [
      { id: 'travel', name: 'Travel OS', emoji: '✈️', description: 'Plan trips, build itineraries, discover destinations', reason: 'New destinations and cultures fuel your explorer spirit', status: 'active' },
      { id: 'learning', name: 'Learning OS', emoji: '📚', description: 'Courses, skills, reading, certifications', reason: 'Broad subject coverage matches your sampling style', status: 'active' },
      { id: 'builder-os', name: 'Builder OS', emoji: '🛠️', description: 'Build products, ship features, grow your project', reason: 'Try building something new — it\'s a natural next frontier', status: 'coming-soon' },
    ],
  },
  strategist: {
    customMessage: 'You optimize with intent — these plugins help you go deeper on what matters.',
    recommendations: [
      { id: 'finance', name: 'Finance OS', emoji: '💰', description: 'Budget, invest, save, plan big purchases', reason: 'Systematic financial planning aligns with your strategic mind', status: 'active' },
      { id: 'career', name: 'Career OS', emoji: '💼', description: 'Job strategy, skills, networking, promotions', reason: 'Your career deserves the same strategic treatment as your finances', status: 'active' },
      { id: 'productivity', name: 'Productivity OS', emoji: '⚡', description: 'Habits, systems, deep work, and personal effectiveness', reason: 'Build the systems that amplify your strategic edge', status: 'active' },
      { id: 'trading-os', name: 'Trading OS', emoji: '📈', description: 'Strategy development, backtest analysis, portfolio management', reason: 'Apply your analytical rigor to trading strategies', status: 'coming-soon' },
    ],
  },
  healer: {
    customMessage: 'You nurture what matters — these plugins deepen your care practice.',
    recommendations: [
      { id: 'health', name: 'Health OS', emoji: '💪', description: 'Diet, sleep, fitness, mental health', reason: 'Evidence-based health coaching for your whole self', status: 'active' },
      { id: 'mindfulness', name: 'Mindfulness OS', emoji: '🧘', description: 'Meditation, focus, stress relief, mental clarity', reason: 'Daily mindfulness deepens your natural healing instincts', status: 'active' },
      { id: 'nutrition', name: 'Nutrition OS', emoji: '🥗', description: 'Meal planning, diet tracking, nutritional goals', reason: 'Nourish your body with the same care you give your mind', status: 'active' },
      { id: 'relationships', name: 'Relationships OS', emoji: '💑', description: 'Partner, communication, quality time', reason: 'Extend your nurturing to your closest bonds', status: 'active' },
    ],
  },
  architect: {
    customMessage: 'You build systems and love progress — these plugins let you construct at scale.',
    recommendations: [
      { id: 'home', name: 'Home OS', emoji: '🏠', description: 'Home improvement, maintenance, organization', reason: 'Your home is the ultimate system to architect', status: 'active' },
      { id: 'productivity', name: 'Productivity OS', emoji: '⚡', description: 'Habits, systems, deep work, and personal effectiveness', reason: 'Design the operating system for your life', status: 'active' },
      { id: 'learning', name: 'Learning OS', emoji: '📚', description: 'Courses, skills, reading, certifications', reason: 'Structure your growth with measurable milestones', status: 'active' },
      { id: 'builder-os', name: 'Builder OS', emoji: '🛠️', description: 'Build products, ship features, grow your project', reason: 'Your architect mind belongs in product building', status: 'coming-soon' },
    ],
  },
  alchemist: {
    customMessage: 'You synthesize across boundaries — these plugins reward your cross-domain thinking.',
    recommendations: [
      { id: 'learning', name: 'Learning OS', emoji: '📚', description: 'Courses, skills, reading, certifications', reason: 'Connect insights across every subject you explore', status: 'active' },
      { id: 'builder-os', name: 'Builder OS', emoji: '🛠️', description: 'Build products, ship features, grow your project', reason: 'Your blend of domains creates unique product ideas', status: 'coming-soon' },
      { id: 'travel', name: 'Travel OS', emoji: '✈️', description: 'Plan trips, build itineraries, discover destinations', reason: 'New contexts trigger your best cross-domain synthesis', status: 'active' },
      { id: 'career', name: 'Career OS', emoji: '💼', description: 'Job strategy, skills, networking, promotions', reason: 'Your diverse background is your career superpower', status: 'active' },
    ],
  },
  guardian: {
    customMessage: 'Consistency is your superpower — these plugins reward daily dedication.',
    recommendations: [
      { id: 'health', name: 'Health OS', emoji: '💪', description: 'Diet, sleep, fitness, mental health', reason: 'Daily streaks compound into transformative health gains', status: 'active' },
      { id: 'mindfulness', name: 'Mindfulness OS', emoji: '🧘', description: 'Meditation, focus, stress relief, mental clarity', reason: 'Short daily practice builds unshakable mental clarity', status: 'active' },
      { id: 'nutrition', name: 'Nutrition OS', emoji: '🥗', description: 'Meal planning, diet tracking, nutritional goals', reason: 'One micro-habit at a time — perfect for your steady style', status: 'active' },
      { id: 'productivity', name: 'Productivity OS', emoji: '⚡', description: 'Habits, systems, deep work, and personal effectiveness', reason: 'Your consistency powers the deepest habit transformations', status: 'active' },
    ],
  },
};

// ─── Pure Functions ────────────────────────────────────────────────

/** Plugin emoji map — inline to avoid circular deps. */
const PLUGIN_EMOJIS: Record<string, string> = {
  travel: '✈️', finance: '💰', health: '💪', career: '💼',
  learning: '📚', family: '👨‍👩‍👧‍👦', home: '🏠', social: '🤝',
  mindfulness: '🧘', relationships: '💑', nutrition: '🥗', productivity: '⚡',
};

export function getRecommendations(archetypeId: string): { recommendations: PluginRecommendation[]; customMessage: string } | null {
  return ARCHETYPE_RECOMMENDATIONS[archetypeId] || null;
}

export function getTopPlugins(summary?: UsageSummary): { id: string; name: string; emoji: string; score: number }[] {
  if (!summary || !summary.pluginRankings || summary.pluginRankings.length === 0) return [];

  return summary.pluginRankings.slice(0, 5).map(p => ({
    id: p.pluginId,
    name: p.pluginName,
    emoji: PLUGIN_EMOJIS[p.pluginId] || '🧠',
    score: Math.min(100, Math.round((p.sessions / Math.max(1, summary.pluginRankings[0]?.sessions)) * 100)),
  }));
}

export function computeArchetype(summary?: UsageSummary, depthScore?: number, wellnessScore?: number): Archetype {
  if (!summary || !summary.pluginRankings || summary.pluginRankings.length === 0) {
    return {
      id: 'novice',
      name: 'Awakening',
      emoji: '🌟',
      tagline: 'Your journey is just beginning.',
      description: 'Use a plugin to unlock your LifeOS personality profile. Every session shapes who you become.',
      color: '#94A3B8',
      keywords: ['new', 'beginning', 'potential'],
    };
  }

  const count = summary.pluginRankings.length;
  const top = summary.pluginRankings[0]?.pluginId || '';
  const names = summary.pluginRankings.map(p => p.pluginId);

  // Guardian: high consistency (many sessions on few plugins)
  if (count <= 3 && summary.totalSessions >= 5) return ARCHETYPES[5];

  // Healer: health, mindfulness, relationships in top 3
  const wellnessPluginsTop = names.slice(0, 3).filter(n =>
    ['health', 'mindfulness', 'relationships', 'nutrition'].includes(n)
  );
  if (wellnessPluginsTop.length >= 2 && (wellnessScore ?? 0) > 40) return ARCHETYPES[2];

  // Strategist: finance, career, productivity
  const strategyPluginsTop = names.slice(0, 3).filter(n =>
    ['finance', 'career', 'productivity'].includes(n)
  );
  if (strategyPluginsTop.length >= 2) return ARCHETYPES[1];

  // Architect: home, productivity, learning
  const architectPluginsTop = names.slice(0, 3).filter(n =>
    ['home', 'productivity', 'learning'].includes(n)
  );
  if (architectPluginsTop.length >= 2) return ARCHETYPES[3];

  // Alchemist: 4+ distinct categories engaged
  if (count >= 4) return ARCHETYPES[4];

  // Explorer: broad but not deep, many plugins sampled
  if (count >= 3 && (depthScore ?? 50) < 40) return ARCHETYPES[0];

  // Fallback: first plugin determines archetype
  const tagMap: Record<string, Archetype> = {
    travel: ARCHETYPES[0], finance: ARCHETYPES[1], health: ARCHETYPES[2],
    career: ARCHETYPES[1], learning: ARCHETYPES[3], family: ARCHETYPES[0],
    home: ARCHETYPES[3], social: ARCHETYPES[0], mindfulness: ARCHETYPES[2],
    relationships: ARCHETYPES[2], nutrition: ARCHETYPES[2], productivity: ARCHETYPES[3],
  };
  return tagMap[top] || ARCHETYPES[0];
}

export function computeTraits(summary?: UsageSummary): Record<PersonalityTrait, number> {
  if (!summary || !summary.pluginRankings) {
    return { breadth: 0, depth: 0, consistency: 0, diversity: 0, planning: 0, wellness: 0 };
  }

  const count = summary.pluginRankings.length;
  const total = summary.totalSessions;

  // Breadth: how many plugins used (of 12)
  const breadth = Math.min(100, Math.round((count / 12) * 100));

  // Diversity: evenness of distribution
  const max = summary.pluginRankings[0]?.sessions || 1;
  const evenness = count > 1
    ? summary.pluginRankings.reduce((acc, p) => acc + (p.sessions / max), 0) / count
    : 0;
  const diversity = Math.round(evenness * 80 + 10);

  // Consistency: avg sessions per plugin vs total spread
  const consistency = Math.min(100, Math.round((total / Math.max(1, count)) * 3));

  // Depth: ratio of phase progressions vs just opening (derived)
  const depth = Math.min(100, Math.round((total > 0 ? 1 : 0) * 40 + (count > 2 ? 30 : 10) + (total > 10 ? 30 : 0)));

  // Planning: finance + career + productivity engagement
  const planningPlugins = summary.pluginRankings.filter(p =>
    ['finance', 'career', 'productivity'].includes(p.pluginId)
  );
  const planningScore = planningPlugins.reduce((a, p) => a + p.sessions, 0);
  const planning = Math.min(100, Math.round((planningScore / Math.max(1, total)) * 100));

  // Wellness: health + mindfulness + relationships + nutrition
  const wellnessPlugins = summary.pluginRankings.filter(p =>
    ['health', 'mindfulness', 'relationships', 'nutrition'].includes(p.pluginId)
  );
  const wellnessScore = wellnessPlugins.reduce((a, p) => a + p.sessions, 0);
  const wellness = Math.min(100, Math.round((wellnessScore / Math.max(1, total)) * 100));

  return { breadth, depth, consistency, diversity, planning, wellness };
}
