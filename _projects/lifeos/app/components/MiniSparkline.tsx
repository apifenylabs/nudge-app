'use client';

/**
 * MiniSparkline — Tiny progress indicator for homepage plugin cards
 *
 * Reads the same localStorage trend data as SparklineTrend (for PhaseTracker)
 * and renders a compact 48×16 SVG sparkline showing 7-day completion trend.
 *
 * This is the lightweight version designed to appear on every plugin card
 * in the homepage grid without performance impact.
 */

import { useState, useEffect } from 'react';

const TREND_STORAGE_KEY = 'lifeos_trend_';

interface TrendPoint {
  t: string;
  pct: number;
  label: string;
}

export default function MiniSparkline({ pluginId }: { pluginId: string }) {
  const [latestPct, setLatestPct] = useState<number | null>(null);
  const [trend, setTrend] = useState<'up' | 'down' | 'flat'>('flat');
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    try {
      const raw = localStorage.getItem(TREND_STORAGE_KEY + pluginId);
      if (!raw) return;
      const history: TrendPoint[] = JSON.parse(raw);
      if (history.length < 2) return;

      // Show only last 7 days
      const sevenDaysAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
      const recent = history.filter(p => new Date(p.t).getTime() > sevenDaysAgo);
      const points = recent.length >= 2 ? recent : history.slice(-7);

      setLatestPct(points[points.length - 1].pct);

      const first = points[0].pct;
      const last = points[points.length - 1].pct;
      const diff = last - first;
      if (diff > 3) setTrend('up');
      else if (diff < -3) setTrend('down');
      else setTrend('flat');
    } catch {
      // ignore
    }
  }, [pluginId]);

  if (!isClient || latestPct === null) return null;

  const dotColor = trend === 'up' ? '#10B981' : trend === 'down' ? '#EF4444' : '#9CA3AF';
  const arrow = trend === 'up' ? '↑' : trend === 'down' ? '↓' : '→';

  return (
    <div className="flex items-center gap-1" title={`Completion: ${latestPct}% ${trend === 'up' ? 'improving' : trend === 'down' ? 'declining' : 'stable'}`}>
      {/* Tiny dot */}
      <svg width="6" height="6" viewBox="0 0 6 6" className="shrink-0">
        <circle cx="3" cy="3" r="2.5" fill={dotColor} />
      </svg>
      {/* Percentage */}
      <span className="text-[10px] font-mono font-semibold text-gray-500">{latestPct}%</span>
      {/* Arrow */}
      <span className="text-[8px] font-mono" style={{ color: dotColor }}>{arrow}</span>
    </div>
  );
}
