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
import type { UsageSummary, PluginUsage } from '@/lib/lifeos/usage-analytics';
import type { AdapterTraitBoost, AdapterSourceInfo } from '@/lib/lifeos/use-adapter-profile';
import { formatAdapterStats } from '@/lib/lifeos/use-adapter-profile';
import type { MindfulnessSummary, HealthSummary, HobbySummary } from '@/lib/lifeos/plugin-adapters';
import {
  type PersonalityTrait,
  computeTraits,
  computeArchetype,
  getTopPlugins,
  getRecommendations,
} from '@/lib/lifeos/personality-profile';



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
  /** Optional adapter data enrichment from connected third-party services. */
  adapterBoost?: AdapterTraitBoost | null;
  adapterSources?: AdapterSourceInfo[];
  mindfulnessSummary?: MindfulnessSummary | null;
  healthSummary?: HealthSummary | null;
  hobbySummary?: HobbySummary | null;
}

export default function PersonalityProfile({
  summary,
  pluginUsage,
  adapterBoost,
  adapterSources = [],
  mindfulnessSummary,
  healthSummary,
  hobbySummary,
}: Props) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const topPlugins = getTopPlugins(summary ?? undefined);
  const baseTraits = computeTraits(summary ?? undefined);

  // Merge adapter boosts on top of base traits
  const computedTraits: Record<PersonalityTrait, number> = {
    breadth: Math.min(100, baseTraits.breadth + (adapterBoost?.breadth ?? 0)),
    depth: Math.min(100, baseTraits.depth + (adapterBoost?.depth ?? 0)),
    consistency: Math.min(100, baseTraits.consistency + (adapterBoost?.consistency ?? 0)),
    diversity: Math.min(100, baseTraits.diversity + (adapterBoost?.diversity ?? 0)),
    planning: Math.min(100, baseTraits.planning + (adapterBoost?.planning ?? 0)),
    wellness: Math.min(100, baseTraits.wellness + (adapterBoost?.wellness ?? 0)),
  };

  const depthScore = computedTraits.depth;
  const wellnessScore = computedTraits.wellness;
  const archetype = computeArchetype(summary ?? undefined, depthScore, wellnessScore);
  const hasData = (summary?.totalSessions ?? 0) > 0;
  const hasAdapterData = adapterSources.length > 0;

  // Format live adapter stats for inline display
  const adapterStatLines = formatAdapterStats(
    mindfulnessSummary ?? null,
    healthSummary ?? null,
    hobbySummary ?? null,
  );

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
        <span className="text-[9px] font-mono text-gray-300 bg-gray-50 border border-gray-100 px-2 py-0.5 rounded-full flex items-center gap-1">
          v2 · {summary?.totalSessions ?? 0} sessions
          {hasAdapterData && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" title="Connected to live adapters" />}
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

      {/* Live Adapter Stats */}
      {adapterStatLines.length > 0 && (
        <div className="mb-4">
          <p className="text-[10px] font-mono text-gray-400 mb-2 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Live Adapter Data
          </p>
          <div className="grid grid-cols-2 gap-1.5">
            {adapterStatLines.map((stat, i) => (
              <div key={i} className="flex items-center gap-2 bg-emerald-50/50 border border-emerald-100 rounded-lg px-3 py-2">
                <span className="text-sm shrink-0">{stat.emoji}</span>
                <div className="min-w-0">
                  <p className="text-[9px] font-mono text-gray-400 truncate">{stat.label}</p>
                  <p className="text-[11px] font-semibold text-gray-700">{stat.value}</p>
                </div>
                <span className="text-[8px] font-mono text-emerald-500 bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 rounded-full ml-auto shrink-0">
                  live
                </span>
              </div>
            ))}
          </div>
          <p className="text-[9px] text-gray-400 mt-1.5 flex items-center gap-1">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Data from {adapterSources.map(s => s.label).join(', ')}
          </p>
        </div>
      )}

      {/* Top Plugins */}
      {topPlugins.length > 0 && (
        <div className="mb-4">
          <p className="text-[10px] font-mono text-gray-400 mb-2 flex items-center gap-1.5">
            Plugin Affinity
            {hasAdapterData && (
              <span className="text-[8px] font-mono text-emerald-500 bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 rounded-full">
                boosted
              </span>
            )}
          </p>
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
