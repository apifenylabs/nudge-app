'use client';

/**
 * PersonalityProfile — LifeOS Personality Radar & Archetype
 *
 * Reads user interaction patterns from localStorage (usage analytics,
 * plugin preference, phase depth, activity hours) and renders a
 * visual personality profile showing:
 *   - Dominant archetype (Explorer, Strategist, Healer, Architect, etc.)
 *   - Plugin affinity radar (top plugins by engagement)
 *   - Activity rhythm (morning/day/night preference)
 *   - Depth score (surface skimmer vs deep diver)
 *
 * Fully client-side, no Supabase dependency. Data source = localStorage.
 * Falls back gracefully when no usage data exists yet.
 */

import { useState, useEffect } from 'react';
import type { UsageSummary, PluginUsage } from '@/app/lib/usage-analytics';

// ─── LifeOS Personality Archetypes ────────────────────────────────

interface Archetype {
  id: string;
  name: string;
  emoji: string;
  tagline: string;
  description: string;
  color: string; // CSS color for accent
  keywords: string[];
}

const ARCHETYPES: Archetype[] = [
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

// ─── Computed Personality ──────────────────────────────────────────

type PersonalityTrait = 'breadth' | 'depth' | 'consistency' | 'diversity' | 'planning' | 'wellness';

interface PersonalityProfileData {
  archetype: Archetype;
  traits: Record<PersonalityTrait, number>; // 0-100
  topPlugins: { id: string; name: string; emoji: string; score: number }[];
  activityRhythm: 'morning' | 'afternoon' | 'evening' | 'mixed';
  depthScore: number; // 0-100 (deep diver vs surface skimmer)
  phaseCompletionRate: number; // 0-100
}

// ─── Archetype Plugin Recommendations ──────────────────────────────

interface PluginRecommendation {
  id: string;
  name: string;
  emoji: string;
  description: string;
  reason: string;
  status: string;
}

const ARCHETYPE_RECOMMENDATIONS: Record<string, { recommendations: PluginRecommendation[]; customMessage: string }> = {
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

function getRecommendations(archetypeId: string): { recommendations: PluginRecommendation[]; customMessage: string } | null {
  return ARCHETYPE_RECOMMENDATIONS[archetypeId] || null;
}

// ─── Helpers ───────────────────────────────────────────────────────

function getTopPlugins(summary?: UsageSummary): { id: string; name: string; emoji: string; score: number }[] {
  if (!summary || !summary.pluginRankings || summary.pluginRankings.length === 0) return [];

  // Map plugin names to emojis — inline to avoid circular deps
  const pluginEmojis: Record<string, string> = {
    travel: '✈️', finance: '💰', health: '💪', career: '💼',
    learning: '📚', family: '👨‍👩‍👧‍👦', home: '🏠', social: '🤝',
    mindfulness: '🧘', relationships: '💑', nutrition: '🥗', productivity: '⚡',
  };

  return summary.pluginRankings.slice(0, 5).map(p => ({
    id: p.pluginId,
    name: p.pluginName,
    emoji: pluginEmojis[p.pluginId] || '🧠',
    score: Math.min(100, Math.round((p.sessions / Math.max(1, summary.pluginRankings[0]?.sessions)) * 100)),
  }));
}

function computeArchetype(summary?: UsageSummary, depthScore?: number, wellnessScore?: number): Archetype {
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

function computeTraits(summary?: UsageSummary): Record<PersonalityTrait, number> {
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

// ─── Radar Chart (Pure SVG, no canvas/deps) ─────────────────────

function RadarChart({ traits, color }: { traits: Record<string, number>; color: string }) {
  const labels = Object.keys(traits);
  const values = Object.values(traits);
  const size = 180;
  const center = size / 2;
  const radius = 72;
  const levels = 4;

  const angleStep = (2 * Math.PI) / labels.length;

  const labelCoords = labels.map((label, i) => {
    const angle = -Math.PI / 2 + i * angleStep;
    return {
      x: center + (radius + 18) * Math.cos(angle),
      y: center + (radius + 18) * Math.sin(angle),
      label: label.charAt(0).toUpperCase() + label.slice(0, 3),
    };
  });

  // Grid levels
  const gridCircles = Array.from({ length: levels }, (_, i) => {
    const r = ((i + 1) / levels) * radius;
    return (
      <circle
        key={i}
        cx={center}
        cy={center}
        r={r}
        fill="none"
        stroke="#E5E7EB"
        strokeWidth={i === levels - 1 ? 1.5 : 1}
        className="transition-all duration-300"
      />
    );
  });

  // Grid lines from center to vertices
  const gridLines = labels.map((_, i) => {
    const angle = -Math.PI / 2 + i * angleStep;
    const x2 = center + radius * Math.cos(angle);
    const y2 = center + radius * Math.sin(angle);
    return (
      <line
        key={`gl-${i}`}
        x1={center}
        y1={center}
        x2={x2}
        y2={y2}
        stroke="#E5E7EB"
        strokeWidth={1}
      />
    );
  });

  // Data polygon
  const points = values
    .map((v, i) => {
      const angle = -Math.PI / 2 + i * angleStep;
      const r = (v / 100) * radius;
      return `${center + r * Math.cos(angle)},${center + r * Math.sin(angle)}`;
    })
    .join(' ');

  // Data points
  const dataCircles = values.map((v, i) => {
    const angle = -Math.PI / 2 + i * angleStep;
    const r = (v / 100) * radius;
    return (
      <circle
        key={`dp-${i}`}
        cx={center + r * Math.cos(angle)}
        cy={center + r * Math.sin(angle)}
        r={3}
        fill={color}
        className="transition-all duration-500"
      />
    );
  });

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="shrink-0">
      {gridCircles}
      {gridLines}
      <polygon points={points} fill={`${color}20`} stroke={color} strokeWidth={2} className="transition-all duration-500" />
      {dataCircles}
      {/* Labels */}
      {labelCoords.map((c, i) => (
        <text
          key={`lb-${i}`}
          x={c.x}
          y={c.y}
          textAnchor="middle"
          dominantBaseline="middle"
          className="fill-gray-500"
          style={{ fontSize: 9, fontFamily: 'ui-monospace, monospace' }}
        >
          {c.label}
        </text>
      ))}
    </svg>
  );
}

// ─── Main Component ────────────────────────────────────────────────

interface Props {
  summary?: UsageSummary | null;
  pluginUsage?: PluginUsage[] | null;
}

export default function PersonalityProfile({ summary, pluginUsage }: Props) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const topPlugins = getTopPlugins(summary ?? undefined);
  const computedTraits = computeTraits(summary ?? undefined);
  const depthScore = computedTraits.depth;
  const wellnessScore = computedTraits.wellness;
  const archetype = computeArchetype(summary ?? undefined, depthScore, wellnessScore);
  const hasData = (summary?.totalSessions ?? 0) > 0;

  // Activity rhythm from localStorage event timestamps
  const [activityRhythm, setActivityRhythm] = useState<'morning' | 'afternoon' | 'evening' | 'mixed'>('mixed');
  const [phaseCompletionRate, setPhaseCompletionRate] = useState(0);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      const raw = localStorage.getItem('lifeos_usage_events');
      if (!raw) return;
      const events = JSON.parse(raw) as { timestamp: string; eventType: string }[];
      if (events.length < 3) return;

      // Activity rhythm
      const hours = events.map(e => new Date(e.timestamp).getHours());
      const morning = hours.filter(h => h >= 5 && h < 12).length;
      const afternoon = hours.filter(h => h >= 12 && h < 17).length;
      const evening = hours.filter(h => h >= 17 || h < 5).length;
      const max = Math.max(morning, afternoon, evening);
      if (max === morning) setActivityRhythm('morning');
      else if (max === afternoon) setActivityRhythm('afternoon');
      else if (max === evening) setActivityRhythm('evening');
      else setActivityRhythm('mixed');

      // Phase completion rate
      const phaseEvents = events.filter(e => e.eventType === 'phase_progressed');
      const totalProgressions = phaseEvents.length;
      // Each plugin typically has 5-6 phases; every 5-6 events ≈ 1 full completion
      const estimatedCompletions = Math.min(100, Math.round((totalProgressions / 6) * 20));
      setPhaseCompletionRate(estimatedCompletions);
    } catch {
      // ignore
    }
  }, []);

  // ─── Rhythm label ───
  const rhythmLabel = {
    morning: '🌅 Morning Bird',
    afternoon: '☀️ Afternoon Power',
    evening: '🌙 Night Owl',
    mixed: '🔄 Mixed Tempo',
  }[activityRhythm];

  if (!mounted) {
    return (
      <div className="bg-white border border-gray-200 rounded-2xl p-5 animate-pulse">
        <div className="h-4 bg-gray-100 rounded w-1/3 mb-4" />
        <div className="h-32 bg-gray-50 rounded" />
      </div>
    );
  }

  if (!hasData) {
    return (
      <div className="bg-white border border-gray-200 rounded-2xl p-5">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-lg">🌟</span>
          <h3 className="text-sm font-bold text-gray-800">Personality Profile</h3>
        </div>
        <p className="text-xs text-gray-400 leading-relaxed">
          Start a conversation with any plugin to unlock your LifeOS personality.
          Your profile reveals your archetype, strengths, and activity patterns.
        </p>
        <div className="mt-3 flex items-center gap-2 text-[10px] text-gray-300">
          <span className="w-2 h-2 rounded-full bg-gray-200" />
          <span>Waiting for your first session…</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-5 hover:shadow-md transition-shadow duration-300">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-lg">{archetype.emoji}</span>
          <div>
            <h3 className="text-sm font-bold text-gray-800">Personality Profile</h3>
            <p className="text-[10px] text-gray-400 font-mono">{archetype.name}</p>
          </div>
        </div>
        <span className="text-[9px] font-mono text-gray-300 bg-gray-50 border border-gray-100 px-2 py-0.5 rounded-full">
          v2 · {summary?.totalSessions ?? 0} sessions
        </span>
      </div>

      {/* Archetype Card */}
      <div
        className="rounded-xl p-4 mb-4 border"
        style={{
          borderColor: `${archetype.color}30`,
          background: `linear-gradient(135deg, ${archetype.color}08, ${archetype.color}03)`,
        }}
      >
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xl">{archetype.emoji}</span>
              <h4 className="text-base font-bold text-gray-900">{archetype.name}</h4>
            </div>
            <p className="text-xs font-medium" style={{ color: archetype.color }}>
              {archetype.tagline}
            </p>
            <p className="text-[11px] text-gray-500 mt-1.5 leading-relaxed">
              {archetype.description}
            </p>
          </div>
        </div>
      </div>

      {/* Radar + Stats Row */}
      <div className="flex flex-col sm:flex-row gap-4 mb-4">
        <div className="flex justify-center">
          <RadarChart traits={computedTraits} color={archetype.color} />
        </div>
        <div className="flex-1 grid grid-cols-2 gap-2">
          {/* Rhythm */}
          <div className="bg-gray-50 rounded-xl p-3 border border-gray-100">
            <p className="text-[10px] text-gray-400 font-mono mb-1">Activity Rhythm</p>
            <p className="text-xs font-semibold text-gray-700">{rhythmLabel}</p>
          </div>
          {/* Depth */}
          <div className="bg-gray-50 rounded-xl p-3 border border-gray-100">
            <p className="text-[10px] text-gray-400 font-mono mb-1">Depth Score</p>
            <div className="flex items-center gap-2">
              <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{ width: `${depthScore}%`, backgroundColor: archetype.color }}
                />
              </div>
              <span className="text-[11px] font-bold font-mono text-gray-600">{depthScore}%</span>
            </div>
            <p className="text-[9px] text-gray-400 mt-1">
              {depthScore > 70 ? 'Deep diver 🏊' : depthScore > 40 ? 'Balanced explorer 🧭' : 'Surface skimmer 🏄'}
            </p>
          </div>
          {/* Phase Completion */}
          <div className="bg-gray-50 rounded-xl p-3 border border-gray-100">
            <p className="text-[10px] text-gray-400 font-mono mb-1">Phase Completion</p>
            <div className="flex items-center gap-2">
              <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{ width: `${phaseCompletionRate}%`, backgroundColor: archetype.color }}
                />
              </div>
              <span className="text-[11px] font-bold font-mono text-gray-600">{phaseCompletionRate}%</span>
            </div>
          </div>
          {/* Season */}
          <div className="bg-gray-50 rounded-xl p-3 border border-gray-100">
            <p className="text-[10px] text-gray-400 font-mono mb-1">Season</p>
            <p className="text-xs font-semibold text-gray-700">
              {summary && summary.totalSessions > 20
                ? '🌺 Flourishing'
                : summary && summary.totalSessions > 5
                ? '🌱 Growing'
                : '🌰 Sprouting'}
            </p>
          </div>
        </div>
      </div>

      {/* Top Plugins */}
      {topPlugins.length > 0 && (
        <div className="mb-4">
          <p className="text-[10px] font-mono text-gray-400 mb-2">Plugin Affinity</p>
          <div className="space-y-1.5">
            {topPlugins.map((p, i) => (
              <div key={p.id} className="flex items-center gap-2">
                <span className="text-sm w-6 text-center shrink-0">{p.emoji}</span>
                <span className="text-[11px] text-gray-600 w-24 truncate shrink-0">{p.name}</span>
                <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${p.score}%`,
                      backgroundColor: i === 0 ? archetype.color : i < 3 ? `${archetype.color}99` : `${archetype.color}66`,
                    }}
                  />
                </div>
                <span className="text-[10px] font-mono text-gray-400 w-6 text-right">{p.score}%</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Archetype Plugin Recommendations */}
      {(() => {
        const recs = getRecommendations(archetype.id);
        if (!recs) return null;
        return (
          <div>
            <p className="text-[10px] font-mono text-gray-400 mb-2">Recommended for {archetype.name}s</p>
            <p className="text-[10px] text-gray-500 mb-2.5 leading-relaxed">{recs.customMessage}</p>
            <div className="space-y-2">
              {recs.recommendations.map((rec) => (
                <div
                  key={rec.id}
                  className="flex items-start gap-2.5 rounded-xl p-2.5 border transition-all duration-200"
                  style={{
                    borderColor: rec.status === 'active' ? `${archetype.color}20` : '#F3F4F6',
                    backgroundColor: rec.status === 'active' ? `${archetype.color}04` : '#F9FAFB',
                  }}
                >
                  <span className="text-base mt-0.5 shrink-0">{rec.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[11px] font-semibold text-gray-800">{rec.name}</span>
                      {rec.status === 'coming-soon' && (
                        <span className="text-[8px] font-mono text-gray-300 bg-gray-100 px-1.5 py-0.5 rounded-full shrink-0">soon</span>
                      )}
                    </div>
                    <p className="text-[10px] text-gray-500 mt-0.5 leading-relaxed">{rec.reason}</p>
                  </div>
                  {rec.status === 'active' && (
                    <span
                      className="text-[9px] font-mono text-gray-400 bg-white border border-gray-100 px-2 py-0.5 rounded-full shrink-0 mt-0.5"
                    >
                      try
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        );
      })()}
    </div>
  );
}
