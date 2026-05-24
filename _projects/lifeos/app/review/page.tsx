'use client';

import { useState, useEffect, useMemo } from 'react';
import { loadFromLocalStorage, type LifeOSData, type DayEntry, getTrackerLabel } from '../lib/storage';
import { TRACKERS } from '../data/trackers';
import { BUILTIN_PLUGINS, type PluginDef } from '../data/plugins';

function getDateStr(date: Date): string {
  return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
}

function getScore(entry: DayEntry | undefined): number {
  if (!entry) return 0;
  let t = 0;
  TRACKERS.forEach((tk) => {
    const v = entry[tk.id as keyof DayEntry] ?? 0;
    t += v as number;
  });
  return Math.round((t / TRACKERS.length) * 25);
}

export default function ReviewPage() {
  const [data, setData] = useState<LifeOSData>({ days: {} });
  const [viewMode, setViewMode] = useState<'week' | 'month'>('week');
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  useEffect(() => {
    setData(loadFromLocalStorage());
  }, []);

  const sortedDays = useMemo(() => {
    return Object.entries(data.days ?? {}).sort(([a], [b]) => b.localeCompare(a));
  }, [data]);

  const recentDays = useMemo(() => {
    const n = viewMode === 'week' ? 7 : 28;
    return sortedDays.slice(0, n);
  }, [sortedDays, viewMode]);

  const avgScore = useMemo(() => {
    if (recentDays.length === 0) return 0;
    const scores = recentDays.map(([, e]) => getScore(e));
    return Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
  }, [recentDays]);

  // Per-tracker averages
  const trackerAverages = useMemo(() => {
    if (recentDays.length === 0) return [];
    return TRACKERS.map((tk) => {
      const vals = recentDays
        .map(([, e]) => (e[tk.id as keyof DayEntry] as number) ?? tk.def)
        .filter((v) => v !== undefined);
      const avg = vals.length > 0 ? vals.reduce((a, b) => a + b, 0) / vals.length : tk.def;
      const maxOpt = Math.max(...tk.options.map((o) => o.v));
      const pct = Math.round((avg / maxOpt) * 100);
      return { id: tk.id, label: tk.label, avg, maxOpt, pct, tracker: tk };
    }).sort((a, b) => a.pct - b.pct);
  }, [recentDays]);

  const weakest = trackerAverages.slice(0, 3);
  const strongest = trackerAverages.slice(-3).reverse();

  // Plugin data aggregation
  const pluginSummary = useMemo(() => {
    const summaries: Record<string, { plugin: PluginDef; fields: Record<string, { label: string; avg: number; count: number }> }> = {};
    
    BUILTIN_PLUGINS.forEach((p) => {
      const fieldAccum: Record<string, { label: string; values: number[] }> = {};
      p.fields.forEach((f) => {
        if (f.type === 'scale') {
          fieldAccum[f.id] = { label: f.label, values: [] };
        }
      });
      
      recentDays.forEach(([, entry]) => {
        const pluginData = (entry as any)?.[`_plugin_${p.id}`] as Record<string, number | boolean | string> | undefined;
        if (!pluginData) return;
        Object.entries(pluginData).forEach(([fid, val]) => {
          if (fieldAccum[fid] && typeof val === 'number') {
            fieldAccum[fid].values.push(val);
          }
        });
      });

      const fields: Record<string, { label: string; avg: number; count: number }> = {};
      Object.entries(fieldAccum).forEach(([fid, acc]) => {
        if (acc.values.length > 0) {
          fields[fid] = {
            label: acc.label,
            avg: Math.round((acc.values.reduce((a, b) => a + b, 0) / acc.values.length) * 10) / 10,
            count: acc.values.length,
          };
        }
      });

      if (Object.keys(fields).length > 0) {
        summaries[p.id] = { plugin: p, fields };
      }
    });

    return summaries;
  }, [recentDays]);

  // Streak
  const streak = useMemo(() => {
    const days = sortedDays.map(([d]) => d);
    if (!days.length) return 0;
    let s = 0;
    const today = new Date().toISOString().split('T')[0];
    for (let i = 0; i < days.length; i++) {
      const expected = new Date(today);
      expected.setDate(expected.getDate() - i);
      const expectStr = expected.toISOString().split('T')[0];
      if (days.includes(expectStr)) s++;
      else break;
    }
    return s;
  }, [sortedDays]);

  // Score trend (last 7 scores)
  const scoreTrend = useMemo(() => {
    return recentDays.reverse().map(([, e]) => getScore(e));
  }, [recentDays]);

  // Total tracked days
  const totalDays = sortedDays.length;

  // Best day
  const bestDay = useMemo(() => {
    let best = { date: '', score: 0 };
    sortedDays.forEach(([d, e]) => {
      const s = getScore(e);
      if (s > best.score) {
        best = { date: d, score: s };
      }
    });
    return best;
  }, [sortedDays]);

  return (
    <div className="container">
      <header>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1>📊 LifeOS Review</h1>
          <a
            href="/"
            style={{
              fontSize: 12,
              color: '#22c55e',
              textDecoration: 'none',
              fontWeight: 600,
            }}
          >
            ← Back to Today
          </a>
        </div>
        <div className="date">{totalDays} days tracked · 🔥 {streak} day streak</div>
      </header>

      {/* View toggle */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
        <button
          onClick={() => setViewMode('week')}
          style={{
            flex: 1,
            padding: '8px 0',
            borderRadius: 10,
            border: viewMode === 'week' ? '1px solid #22c55e' : '1px solid #ddd',
            background: viewMode === 'week' ? '#f0fdf4' : 'white',
            color: viewMode === 'week' ? '#16a34a' : '#666',
            fontWeight: 600,
            fontSize: 13,
            cursor: 'pointer',
          }}
        >
          Last 7 Days
        </button>
        <button
          onClick={() => setViewMode('month')}
          style={{
            flex: 1,
            padding: '8px 0',
            borderRadius: 10,
            border: viewMode === 'month' ? '1px solid #22c55e' : '1px solid #ddd',
            background: viewMode === 'month' ? '#f0fdf4' : 'white',
            color: viewMode === 'month' ? '#16a34a' : '#666',
            fontWeight: 600,
            fontSize: 13,
            cursor: 'pointer',
          }}
        >
          Last 28 Days
        </button>
      </div>

      {/* Overall score card */}
      <div className="card" style={{
        background: 'linear-gradient(135deg, #22c55e, #16a34a)',
        color: 'white',
        textAlign: 'center',
        padding: '24px 16px',
      }}>
        <div style={{ fontSize: 12, opacity: 0.8, marginBottom: 4 }}>
          Average Daily Score
        </div>
        <div style={{ fontSize: 40, fontWeight: 700 }}>
          {avgScore}%
        </div>
        <div style={{ fontSize: 11, opacity: 0.8, marginTop: 4 }}>
          {totalDays > 0 ? `${recentDays.length} day${recentDays.length !== 1 ? 's' : ''} analyzed` : 'No data yet'}
        </div>
      </div>

      {/* Score trend mini-chart */}
      {scoreTrend.length > 1 && (
        <div className="card">
          <h2>📈 Score Trend</h2>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 3, height: 60, paddingTop: 8 }}>
            {scoreTrend.map((s, i) => {
              const h = Math.max(4, (s / 100) * 56);
              return (
                <div
                  key={i}
                  title={`Day -${scoreTrend.length - 1 - i}: ${s}%`}
                  style={{
                    flex: 1,
                    height: h,
                    borderRadius: '4px 4px 0 0',
                    background: s >= 80 ? '#22c55e' : s >= 50 ? '#f59e0b' : '#ef4444',
                    opacity: 0.7 + (i / scoreTrend.length) * 0.3,
                    transition: 'height .3s',
                    minWidth: 8,
                  }}
                />
              );
            })}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 9, color: '#999', marginTop: 4 }}>
            <span>Older</span>
            <span>Recent</span>
          </div>
        </div>
      )}

      {/* Weakest areas */}
      {weakest.length > 0 && (
        <div className="card">
          <h2>⚠️ Areas to Improve</h2>
          {weakest.map((t) => {
            const barColor = t.pct < 30 ? '#ef4444' : t.pct < 50 ? '#f59e0b' : '#22c55e';
            return (
              <div key={t.id} style={{ padding: '6px 0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 3 }}>
                  <span style={{ fontWeight: 500 }}>{t.label}</span>
                  <span style={{ color: barColor, fontWeight: 600 }}>{t.pct}%</span>
                </div>
                <div style={{
                  height: 6,
                  background: '#eee',
                  borderRadius: 3,
                  overflow: 'hidden',
                }}>
                  <div style={{
                    width: `${t.pct}%`,
                    height: '100%',
                    background: barColor,
                    borderRadius: 3,
                    transition: 'width .5s',
                  }} />
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Strongest areas */}
      {strongest.length > 0 && (
        <div className="card">
          <h2>💪 Strongest Areas</h2>
          {strongest.map((t) => (
            <div key={t.id} style={{ padding: '6px 0' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 3 }}>
                <span style={{ fontWeight: 500 }}>{t.label}</span>
                <span style={{ color: '#22c55e', fontWeight: 600 }}>{t.pct}%</span>
              </div>
              <div style={{ height: 6, background: '#eee', borderRadius: 3, overflow: 'hidden' }}>
                <div style={{
                  width: `${t.pct}%`,
                  height: '100%',
                  background: '#22c55e',
                  borderRadius: 3,
                  transition: 'width .5s',
                }} />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Best day */}
      {bestDay.date && (
        <div className="card">
          <h2>🏆 Best Day</h2>
          <div style={{ fontSize: 14, fontWeight: 600 }}>
            {new Date(bestDay.date + 'T12:00:00').toLocaleDateString('en-US', {
              weekday: 'long', month: 'long', day: 'numeric',
            })}
          </div>
          <div style={{ fontSize: 12, color: '#22c55e', fontWeight: 600, marginTop: 2 }}>
            Score: {bestDay.score}%
          </div>
        </div>
      )}

      {/* All tracker averages */}
      <div className="card">
        <h2>📋 All Trackers</h2>
        {trackerAverages.map((t) => {
          const barColor = t.pct < 30 ? '#ef4444' : t.pct < 50 ? '#f59e0b' : t.pct < 75 ? '#22c55e' : '#16a34a';
          return (
            <div key={t.id} style={{ padding: '5px 0' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, marginBottom: 2 }}>
                <span style={{ fontWeight: 500 }}>{t.label}</span>
                <span style={{ color: barColor }}>
                  {t.avg.toFixed(1)} / {t.maxOpt}
                </span>
              </div>
              <div style={{ height: 4, background: '#eee', borderRadius: 2, overflow: 'hidden' }}>
                <div style={{
                  width: `${t.pct}%`,
                  height: '100%',
                  background: barColor,
                  borderRadius: 2,
                }} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Plugin summaries */}
      {Object.keys(pluginSummary).length > 0 && (
        <div className="card">
          <h2>🧩 Plugin Insights ({Object.keys(pluginSummary).length} active)</h2>
          {Object.values(pluginSummary).map((ps) => (
            <div key={ps.plugin.id} style={{ marginBottom: 10 }}>
              <div
                onClick={() => setExpandedSection(expandedSection === ps.plugin.id ? null : ps.plugin.id)}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '8px 10px',
                  background: '#f9f9f9',
                  borderRadius: 8,
                  cursor: 'pointer',
                  fontSize: 13,
                  fontWeight: 600,
                }}
              >
                <span>{ps.plugin.emoji} {ps.plugin.name}</span>
                <span style={{ fontSize: 11, color: '#888' }}>
                  {Object.keys(ps.fields).length} metrics
                  {expandedSection === ps.plugin.id ? ' ▲' : ' ▼'}
                </span>
              </div>
              {expandedSection === ps.plugin.id && (
                <div style={{ padding: '8px 10px' }}>
                  {Object.values(ps.fields).map((f) => (
                    <div key={f.label} style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      padding: '4px 0',
                      fontSize: 12,
                      borderBottom: '1px solid #f0f0f0',
                    }}>
                      <span style={{ color: '#666' }}>{f.label}</span>
                      <span style={{ fontWeight: 600, color: '#22c55e' }}>
                        {f.avg} avg ({f.count}d)
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Quick stats */}
      <div className="card">
        <h2>📊 Quick Stats</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
          <div style={{
            background: '#f0fdf4',
            borderRadius: 10,
            padding: 12,
            textAlign: 'center',
          }}>
            <div style={{ fontSize: 20, fontWeight: 700, color: '#16a34a' }}>{totalDays}</div>
            <div style={{ fontSize: 10, color: '#666' }}>Total Days</div>
          </div>
          <div style={{
            background: '#f0fdf4',
            borderRadius: 10,
            padding: 12,
            textAlign: 'center',
          }}>
            <div style={{ fontSize: 20, fontWeight: 700, color: '#16a34a' }}>{streak}</div>
            <div style={{ fontSize: 10, color: '#666' }}>Day Streak</div>
          </div>
          <div style={{
            background: '#fefce8',
            borderRadius: 10,
            padding: 12,
            textAlign: 'center',
          }}>
            <div style={{ fontSize: 20, fontWeight: 700, color: '#ca8a04' }}>{avgScore}%</div>
            <div style={{ fontSize: 10, color: '#666' }}>Avg Score</div>
          </div>
          <div style={{
            background: '#fce7f3',
            borderRadius: 10,
            padding: 12,
            textAlign: 'center',
          }}>
            <div style={{ fontSize: 20, fontWeight: 700, color: '#db2777' }}>{bestDay.score}%</div>
            <div style={{ fontSize: 10, color: '#666' }}>Best Day</div>
          </div>
        </div>
      </div>

      {/* Day-by-day list */}
      <div className="card">
        <h2>📅 Day-by-Day</h2>
        {recentDays.length === 0 ? (
          <div className="empty">No data yet. Start tracking on the home page!</div>
        ) : (
          recentDays.map(([d, e]) => {
            const score = getScore(e);
            const date = new Date(d + 'T12:00:00');
            const label = date.toLocaleDateString('en-US', {
              weekday: 'short', month: 'short', day: 'numeric',
            });
            const cls = score >= 80 ? 'day-good' : score >= 50 ? 'day-ok' : 'day-bad';
            return (
              <div className="history-item" key={d}>
                <span style={{ fontSize: 12 }}>{label}</span>
                <span style={{ fontSize: 12 }} className={`history-score ${cls}`}>{score}%</span>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
