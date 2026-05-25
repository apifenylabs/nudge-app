'use client';

import { useState, useEffect, useCallback } from 'react';
import type { LifeOSData, DayEntry } from '../lib/storage';

interface AIInsightProps {
  data: LifeOSData;
}

interface InsightResult {
  insight: string;
  tip: string;
  mood_trend: string;
}

const fallbackInsights = [
  { insight: "Your consistency across the week is building real momentum. Keep showing up.", tip: "Focus on one tracker you want to level up this week.", mood_trend: "stable" },
  { insight: "Notice how your energy correlates with your sleep? Small adjustments to bedtime could unlock a big boost.", tip: "Try going to bed 30 minutes earlier for 3 nights and watch the difference.", mood_trend: "improving" },
  { insight: "Your social score lifts everything else. Connection is your hidden superpower.", tip: "Schedule one meaningful conversation today — it compounds.", mood_trend: "positive" },
  { insight: "Recovery isn't idle time — it's where growth happens. You're doing better than you think.", tip: "Take one real break today: no screens, just presence.", mood_trend: "neutral" },
  { insight: "Small daily inputs create massive outputs over time. Your data proves it.", tip: "Pick one habit and go all-in on it for the next 7 days.", mood_trend: "stable" },
  { insight: "Your learning score correlates with higher satisfaction across the board. Never stop growing.", tip: "Spend 15 minutes on something new today — a language, a skill, a concept.", mood_trend: "improving" },
  { insight: "When mindfulness dips, everything else tends to drift too. It's your anchor.", tip: "3 deep breaths right now. That's it. That's the tip.", mood_trend: "neutral" },
  { insight: "Your financial awareness is a strength — it gives you freedom to focus on what matters.", tip: "Review one recurring expense. Small leaks sink big ships.", mood_trend: "stable" },
];

function getRecentEntries(data: LifeOSData): [string, DayEntry][] {
  return Object.entries(data.days ?? {})
    .sort(([a], [b]) => b.localeCompare(a))
    .slice(0, 7);
}

function buildContextString(data: LifeOSData): string {
  const recent = getRecentEntries(data);
  if (recent.length === 0) return '';

  const lines: string[] = ['User tracking data (last 7 days):'];
  recent.forEach(([date, entry]) => {
    const d = new Date(date + 'T12:00:00').toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
    const metrics = [
      entry.sleep !== undefined ? `sleep:${entry.sleep}/5` : null,
      entry.mood !== undefined ? `mood:${entry.mood}/5` : null,
      entry.energy !== undefined ? `energy:${entry.energy}/5` : null,
      entry.exercise !== undefined ? `exercise:${entry.exercise}/5` : null,
      entry.food !== undefined ? `food:${entry.food}/5` : null,
      entry.productivity !== undefined ? `productivity:${entry.productivity}/5` : null,
      entry.social !== undefined ? `social:${entry.social}/5` : null,
      entry.mindfulness !== undefined ? `mindfulness:${entry.mindfulness}/5` : null,
      entry.learning !== undefined ? `learning:${entry.learning}/5` : null,
    ].filter(Boolean).join(', ');
    lines.push(`  ${d}: ${metrics}`);
    if (entry.notes) lines.push(`    notes: "${entry.notes.slice(0, 100)}"`);
  });

  return lines.join('\n');
}

async function generateInsight(data: LifeOSData): Promise<InsightResult | null> {
  const context = buildContextString(data);
  if (!context) return null;

  const OLLAMA_URL = 'http://localhost:11434/api/generate';

  const prompt = `You are a LifeOS AI coach analyzing a user's daily tracking data. Read their last 7 days of self-reported metrics (each 1-5 scale) and notes.

Provide a brief, warm, data-driven insight (1-2 sentences) in JSON format:

Context:
${context}

Respond with ONLY valid JSON in this exact format:
{
  "insight": "A personalized observation based on their actual tracking data, referencing specific trends or patterns.",
  "tip": "One actionable micro-suggestion based on their weakest or most volatile metric.",
  "mood_trend": "improving" | "declining" | "stable" | "neutral"
}

Do NOT include markdown, backticks, or any text outside the JSON.`;

  try {
    const res = await fetch(OLLAMA_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'llama3.2',
        prompt,
        stream: false,
        options: { temperature: 0.3, max_tokens: 300 },
      }),
    });

    if (!res.ok) return null;

    const data_ollama = await res.json();
    const text = (data_ollama.response || '').trim();

    // Try to parse JSON from response
    const jsonMatch = text.match(/\{[^{}]*\}/);
    if (jsonMatch) {
      const parsed = JSON.parse(jsonMatch[0]);
      if (parsed.insight && parsed.tip && parsed.mood_trend) {
        return parsed as InsightResult;
      }
    }

    return null;
  } catch {
    return null;
  }
}

export default function AIInsight({ data }: AIInsightProps) {
  const [insight, setInsight] = useState<InsightResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [ollamaAvailable, setOllamaAvailable] = useState<boolean | null>(null);

  // Check if Ollama is running
  useEffect(() => {
    fetch('http://localhost:11434/api/tags', { method: 'GET', signal: AbortSignal.timeout(2000) })
      .then((r) => r.ok ? setOllamaAvailable(true) : setOllamaAvailable(false))
      .catch(() => setOllamaAvailable(false));
  }, []);

  // Generate insight
  const refresh = useCallback(async () => {
    setLoading(true);
    setError(false);

    const recent = getRecentEntries(data);
    if (recent.length < 3) {
      // Not enough data — use a generic message
      setInsight({
        insight: "Track at least 3 days to unlock personalized AI insights. Your data builds the picture.",
        tip: "Log today's entry and come back tomorrow for your first insight.",
        mood_trend: "neutral",
      });
      setLoading(false);
      return;
    }

    const result = await generateInsight(data);

    if (result) {
      setInsight(result);
    } else {
      // Fallback: pick a reasonable random insight
      const scores = recent.map(([, e]) => {
        let t = 0;
        const trackers = ['sleep', 'mood', 'energy', 'exercise', 'food', 'productivity', 'social', 'mindfulness', 'learning'];
        trackers.forEach((tk) => {
          t += (e as any)[tk] ?? 0;
        });
        return t / trackers.length;
      });
      const avgScore = scores.reduce((a, b) => a + b, 0) / scores.length;
      const idx = Math.min(
        Math.floor((avgScore / 5) * fallbackInsights.length),
        fallbackInsights.length - 1,
      );
      setInsight(fallbackInsights[Math.max(0, idx)]);
    }

    setLoading(false);
  }, [data]);

  useEffect(() => {
    const recent = getRecentEntries(data);
    if (recent.length >= 3) {
      refresh();
    } else {
      setInsight({
        insight: "Track at least 3 days to unlock personalized AI insights. Your data builds the picture.",
        tip: "Log today's entry and come back tomorrow for your first insight.",
        mood_trend: "neutral",
      });
      setLoading(false);
    }
  }, [data, refresh]);

  if (!insight) return null;

  const moodColors: Record<string, string> = {
    improving: '#22c55e',
    positive: '#16a34a',
    stable: '#2563eb',
    neutral: '#6b7280',
    declining: '#ef4444',
  };

  const moodEmojis: Record<string, string> = {
    improving: '📈',
    positive: '✨',
    stable: '➡️',
    neutral: '➖',
    declining: '📉',
  };

  const moodColor = moodColors[insight.mood_trend] || '#6b7280';

  return (
    <div className="card" style={{ border: `1px solid ${moodColor}22`, background: `linear-gradient(135deg, ${moodColor}08, white)` }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
        <h2 style={{ fontSize: 14, fontWeight: 600, color: '#333', margin: 0, display: 'flex', alignItems: 'center', gap: 6 }}>
          {ollamaAvailable === true ? '🤖 AI Coach' : '💡 Life Insight'}
          {ollamaAvailable === true && (
            <span style={{ fontSize: 10, color: '#22c55e', fontWeight: 500, background: '#f0fdf4', padding: '1px 6px', borderRadius: 4 }}>
              Ollama
            </span>
          )}
        </h2>
        <button
          onClick={refresh}
          disabled={loading}
          style={{
            background: 'none',
            border: 'none',
            cursor: loading ? 'default' : 'pointer',
            opacity: loading ? 0.4 : 0.6,
            fontSize: 14,
          }}
          title="Refresh insight"
        >
          {loading ? '⟳' : '↻'}
        </button>
      </div>

      {loading ? (
        <div style={{ fontSize: 13, color: '#888', fontStyle: 'italic' }}>Analyzing your patterns...</div>
      ) : (
        <>
          <div style={{ fontSize: 14, color: '#333', lineHeight: 1.5, marginBottom: 8 }}>
            {insight.insight}
          </div>
          <div style={{
            fontSize: 12,
            color: moodColor,
            background: `${moodColor}10`,
            padding: '6px 10px',
            borderRadius: 8,
            display: 'flex',
            alignItems: 'center',
            gap: 6,
          }}>
            <span>{moodEmojis[insight.mood_trend] || '💡'}</span>
            <span>{insight.tip}</span>
          </div>
        </>
      )}
    </div>
  );
}
