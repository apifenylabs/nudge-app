'use client';

import { useState, useEffect } from 'react';
import { generateWeeklyDigest, downloadWeeklyDigest, type WeeklyDigest } from '@/lib/lifeos/weekly-digest';
import { computeAnalytics } from '@/lib/lifeos/analytics';
import { Card } from '@/components/ui/card';

interface WeeklyDigestModalProps {
  onClose: () => void;
  onFeedAdd?: (entry: { avatar: string; name: string; text: string }) => void;
}

export default function WeeklyDigestModal({ onClose, onFeedAdd }: WeeklyDigestModalProps) {
  const [digest, setDigest] = useState<WeeklyDigest | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setDigest(generateWeeklyDigest());
  }, []);

  const handleCopy = async () => {
    if (!digest) return;
    await navigator.clipboard.writeText(digest.markdown);
    setCopied(true);
    onFeedAdd?.({
      avatar: '📋',
      name: 'LifeOS',
      text: 'Weekly digest copied to clipboard (Markdown)',
    });
    setTimeout(() => setCopied(false), 2000);
  };

  if (!digest) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm" onClick={onClose}>
        <Card
          className="p-8 max-w-lg w-full mx-4 text-center text-center"
          onClick={(e) => e.stopPropagation()}
          style={{
            background: '#0A0E17',
            border: '1px solid rgba(20,184,166,0.2)',
            borderRadius: '20px',
          }}
        >
          <div className="text-4xl mb-3">🦊</div>
          <p className="text-gray-400 text-sm">Not enough usage data yet. Start using LifeOS plugins to generate your weekly digest.</p>
          <button
            onClick={onClose}
            className="mt-4 text-sm font-medium transition-all px-4 py-2 rounded-xl"
            style={{ color: '#14B8A6', border: '1px solid rgba(20,184,166,0.3)' }}
          >
            Close
          </button>
        </Card>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm" onClick={onClose}>
      <div
        className="rounded-2xl shadow-2xl border max-w-2xl w-full mx-4 max-h-[85vh] flex flex-col"
        style={{
          background: '#0A0E17',
          borderColor: 'rgba(20,184,166,0.2)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <div>
            <h2 className="text-lg font-semibold flex items-center gap-2" style={{ color: '#F9FAFB' }}>
              🦊 Weekly Digest
            </h2>
            <p className="text-xs mt-0.5" style={{ color: '#6B7280' }}>{digest.dateRange}</p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg transition-colors hover:bg-white/5"
            style={{ color: '#9CA3AF' }}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Summary Cards */}
        <div className="px-6 py-4 grid grid-cols-3 gap-3">
          <div
            className="rounded-xl p-3 text-center border"
            style={{
              background: 'linear-gradient(135deg, rgba(20,184,166,0.1), rgba(16,185,129,0.05))',
              borderColor: 'rgba(20,184,166,0.2)',
            }}
          >
            <div className="text-2xl font-bold" style={{ color: '#14B8A6' }}>{digest.totals.sessions}</div>
            <div className="text-xs mt-0.5" style={{ color: '#5EEAD4' }}>Actions</div>
          </div>
          <div
            className="rounded-xl p-3 text-center border"
            style={{
              background: 'linear-gradient(135deg, rgba(99,102,241,0.1), rgba(79,70,229,0.05))',
              borderColor: 'rgba(99,102,241,0.2)',
            }}
          >
            <div className="text-2xl font-bold" style={{ color: '#818CF8' }}>{digest.totals.messages}</div>
            <div className="text-xs mt-0.5" style={{ color: '#A5B4FC' }}>Plugins</div>
          </div>
          <div
            className="rounded-xl p-3 text-center border"
            style={{
              background: 'linear-gradient(135deg, rgba(245,158,11,0.1), rgba(251,146,60,0.05))',
              borderColor: 'rgba(245,158,11,0.2)',
            }}
          >
            <div className="text-2xl font-bold" style={{ color: '#F59E0B' }}>{digest.totals.activeDays}</div>
            <div className="text-xs mt-0.5" style={{ color: '#FCD34D' }}>Active Days</div>
          </div>
        </div>

        {/* Top Plugins */}
        {digest.topPlugins.length > 0 && (
          <div className="px-6 mb-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: '#6B7280' }}>🔥 Top Plugins</h3>
            <div className="space-y-1.5">
              {digest.topPlugins.map((p, i) => (
                <div key={p.name} className="flex items-center justify-between text-sm px-2 py-1 rounded-lg" style={{ background: 'rgba(255,255,255,0.03)' }}>
                  <span style={{ color: '#D1D5DB' }}>
                    <span className="font-mono mr-2" style={{ color: '#14B8A6' }}>#{i + 1}</span>
                    {p.name}
                  </span>
                  <span className="text-xs" style={{ color: '#6B7280' }}>{p.sessions} tasks · {p.messages} msgs</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Daily Activity Bar Chart */}
        {digest.dailyBreakdown.length > 0 && (
          <div className="px-6 mb-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: '#6B7280' }}>📅 Daily Activity</h3>
            <div className="flex items-end gap-2 h-20 px-1" style={{ background: 'rgba(255,255,255,0.02)', borderRadius: '12px', padding: '12px 8px' }}>
              {digest.dailyBreakdown.map((d) => {
                const max = Math.max(...digest.dailyBreakdown.map((x) => x.sessions), 1);
                const height = Math.max((d.sessions / max) * 100, d.sessions > 0 ? 24 : 4);
                return (
                  <div key={d.day} className="flex-1 flex flex-col items-center gap-1">
                    <span className="text-[10px]" style={{ color: '#6B7280' }}>{d.sessions}</span>
                    <div
                      className="w-full rounded-t-md transition-all"
                      style={{
                        height: `${height}%`,
                        background: d.sessions > 0
                          ? 'linear-gradient(to top, #14B8A6, #5EEAD4)'
                          : 'rgba(255,255,255,0.05)',
                        minHeight: d.sessions > 0 ? '8px' : '4px',
                      }}
                    />
                    <span className="text-[9px]" style={{ color: '#4B5563' }}>{d.day}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Archetype */}
        {digest.archetype && (
          <div className="px-6 mb-3">
            <div
              className="inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full border"
              style={{
                background: 'rgba(168,85,247,0.1)',
                color: '#A78BFA',
                borderColor: 'rgba(168,85,247,0.2)',
              }}
            >
              {digest.archetype.emoji} {digest.archetype.name} tendency this period
            </div>
          </div>
        )}

        {/* Insights */}
        <InsightsBox />

        {/* Actions */}
        <div className="px-6 py-4 flex items-center gap-3" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <button
            onClick={handleCopy}
            className={`flex-1 flex items-center justify-center gap-2 text-sm font-medium rounded-xl py-2.5 transition-all ${
              copied
                ? 'border'
                : 'border hover:bg-white/5'
            }`}
            style={{
              background: copied ? 'rgba(16,185,129,0.1)' : 'rgba(255,255,255,0.05)',
              color: copied ? '#10B981' : '#D1D5DB',
              borderColor: copied ? 'rgba(16,185,129,0.3)' : 'rgba(255,255,255,0.1)',
            }}
          >
            {copied ? (
              <>✅ Copied!</>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                Copy Markdown
              </>
            )}
          </button>
          <button
            onClick={() => {
              downloadWeeklyDigest();
              onFeedAdd?.({
                avatar: '📥',
                name: 'LifeOS',
                text: 'Weekly digest downloaded as .md',
              });
            }}
            className="flex-1 flex items-center justify-center gap-2 text-sm font-medium rounded-xl py-2.5 transition-all border"
            style={{
              background: 'linear-gradient(135deg, #14B8A6, #0D9488)',
              color: '#0A0E17',
              borderColor: '#14B8A6',
            }}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Download .md
          </button>
        </div>
      </div>
    </div>
  );
}

/**
 * Inline insights box computed from analytics.
 */
function InsightsBox() {
  const [insights, setInsights] = useState<string[]>([]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const analytics = computeAnalytics();
        setInsights(analytics.insights);
      } catch {
        // analytics not ready
      }
    }
  }, []);

  if (insights.length === 0) return null;

  return (
    <div className="px-6 mb-3">
      <h3 className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: '#6B7280' }}>💡 Insights</h3>
      <div className="space-y-1">
        {insights.map((insight, i) => (
          <p key={i} className="text-xs" style={{ color: '#9CA3AF' }}>{insight}</p>
        ))}
      </div>
    </div>
  );
}
