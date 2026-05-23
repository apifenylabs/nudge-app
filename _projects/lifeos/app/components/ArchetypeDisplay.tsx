'use client';

import { computeArchetypes, generateInsight, type ArchetypeDef } from '../data/archetypes';
import type { LifeOSData, DayEntry } from '../lib/storage';
import { TRACKERS } from '../data/trackers';

interface ArchetypeDisplayProps {
  data: LifeOSData;
  todayScore: number;
  streakDays: number;
}

export default function ArchetypeDisplay({ data, todayScore, streakDays }: ArchetypeDisplayProps) {
  const entries = Object.entries(data.days ?? {}) as [string, DayEntry][];

  if (entries.length < 2) {
    return (
      <div className="card">
        <h2>🧬 Your Archetype</h2>
        <div className="empty" style={{ padding: '16px 0' }}>
          Track at least 2 days to discover your personality archetype.
        </div>
      </div>
    );
  }

  const { primary, scores } = computeArchetypes(entries);
  const insight = generateInsight(primary, todayScore, streakDays);

  // Top 3 archetypes
  const top3 = scores.slice(0, 3);

  return (
    <div className="card">
      <h2>🧬 Your Archetype</h2>

      {/* Primary archetype */}
      <div style={{
        textAlign: 'center',
        padding: '16px 0',
        borderBottom: '1px solid #f0f0f0',
        marginBottom: 12,
      }}>
        <div style={{ fontSize: 40, marginBottom: 6 }}>{primary.emoji}</div>
        <div style={{
          fontSize: 20,
          fontWeight: 700,
          color: primary.color,
          marginBottom: 4,
        }}>
          {primary.name}
        </div>
        <div style={{ fontSize: 12, color: '#666', lineHeight: 1.5, maxWidth: 320, margin: '0 auto' }}>
          {primary.description}
        </div>
      </div>

      {/* Insight */}
      <div style={{
        background: '#f0fdf4',
        borderRadius: 10,
        padding: '10px 14px',
        marginBottom: 12,
        fontSize: 12,
        color: '#166534',
        lineHeight: 1.5,
      }}>
        💡 {insight}
      </div>

      {/* Archetype leaderboard */}
      <div style={{ fontSize: 11, color: '#999', fontWeight: 600, marginBottom: 6 }}>
        TOP MATCHES
      </div>
      {top3.map((as, idx) => (
        <div
          key={as.archetype.id}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            padding: '6px 0',
            borderBottom: idx < 2 ? '1px solid #f0f0f0' : 'none',
          }}
        >
          <div style={{
            width: 28,
            height: 28,
            borderRadius: 8,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 16,
            background: idx === 0 ? `${primary.color}1A` : '#f5f5f5',
          }}>
            {as.archetype.emoji}
          </div>
          <div style={{ flex: 1, fontSize: 12, fontWeight: idx === 0 ? 700 : 500 }}>
            {as.archetype.name}
          </div>
          {/* Score bar */}
          <div style={{ width: 60, height: 6, background: '#eee', borderRadius: 3, overflow: 'hidden' }}>
            <div style={{
              height: '100%',
              width: `${as.score}%`,
              background: idx === 0 ? primary.color : '#94a3b8',
              borderRadius: 3,
              transition: 'width 0.3s',
            }} />
          </div>
          <div style={{
            fontSize: 11,
            fontWeight: 700,
            color: top3[0].score === as.score ? primary.color : '#888',
            width: 30,
            textAlign: 'right',
          }}>
            {as.score}%
          </div>
        </div>
      ))}
    </div>
  );
}
