'use client';

/**
 * SparklineTrend — Trend chart for PhaseTracker completion history
 *
 * Renders a compact inline SVG sparkline showing completion % over time.
 * Data is persisted as a rolling array in localStorage (one snapshot per
 * significant change, max 50 points).
 *
 * Features:
 *   - Tiny SVG sparkline (fills container)
 *   - Hover/click reveals values
 *   - Trend direction indicator (+/- arrow + delta)
 */

import { useState, useEffect, useRef, useCallback } from 'react';

// ─── Constants ────────────────────────────────────────────────────

const TREND_STORAGE_KEY = 'lifeos_trend_';
const MAX_HISTORY = 50;
const MIN_POINTS_FOR_TREND = 2;

// ─── Types ────────────────────────────────────────────────────────

export interface TrendPoint {
  /** ISO timestamp */
  t: string;
  /** Completion percentage (0-100) */
  pct: number;
  /** Human-readable label (e.g. "Jun 3") */
  label: string;
}

// ─── History helpers ──────────────────────────────────────────────

function loadTrendHistory(pluginId: string): TrendPoint[] {
  try {
    const raw = localStorage.getItem(TREND_STORAGE_KEY + pluginId);
    if (raw) return JSON.parse(raw) as TrendPoint[];
  } catch { /* ignore corrupt data */ }
  return [];
}

export function recordTrendPoint(pluginId: string, pct: number) {
  try {
    const history = loadTrendHistory(pluginId);
    const now = new Date();
    const point: TrendPoint = {
      t: now.toISOString(),
      pct,
      label: now.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    };

    // Avoid duplicates (same day, same pct — just update timestamp)
    const last = history[history.length - 1];
    if (last && last.label === point.label && last.pct === point.pct) {
      last.t = point.t; // refresh timestamp only
    } else {
      history.push(point);
    }

    // Trim to max
    if (history.length > MAX_HISTORY) {
      history.splice(0, history.length - MAX_HISTORY);
    }

    localStorage.setItem(TREND_STORAGE_KEY + pluginId, JSON.stringify(history));
  } catch { /* silently fail — analytics should never break UX */ }
}

// ─── SVG Sparkline ────────────────────────────────────────────────

function SparklineSvg({
  points,
  width,
  height,
}: {
  points: TrendPoint[];
  width: number;
  height: number;
}) {
  if (points.length < MIN_POINTS_FOR_TREND) {
    return null;
  }

  const values = points.map(p => p.pct);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1; // avoid division by zero
  const padding = 2;
  const chartW = width - padding * 2;
  const chartH = height - padding * 2;

  // Build SVG path
  const pathD = values
    .map((v, i) => {
      const x = padding + (i / (values.length - 1)) * chartW;
      const y = padding + chartH - ((v - min) / range) * chartH;
      return `${i === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(' ');

  // Determine color: up = green, down = red, flat = gray
  const first = values[0];
  const last = values[values.length - 1];
  const diff = last - first;
  const strokeColor = diff > 2 ? '#10B981' : diff < -2 ? '#EF4444' : '#9CA3AF';
  const fillColor = diff > 2 ? '#10B98120' : diff < -2 ? '#EF444420' : '#9CA3AF20';

  // Gradient fill under the line
  const areaD = pathD + `L${(padding + chartW).toFixed(1)},${(padding + chartH).toFixed(1)}L${padding.toFixed(1)},${(padding + chartH).toFixed(1)}Z`;

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className="overflow-visible"
      aria-label={`Sparkline: ${last}%, trend ${diff >= 0 ? 'up' : 'down'} ${Math.abs(diff).toFixed(1)}%`}
    >
      {/* Area fill */}
      <path d={areaD} fill={fillColor} />
      {/* Line */}
      <path
        d={pathD}
        fill="none"
        stroke={strokeColor}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Last point dot */}
      <circle
        cx={(padding + chartW).toFixed(1)}
        cy={(padding + chartH - ((last - min) / range) * chartH).toFixed(1)}
        r={2}
        fill={strokeColor}
      />
    </svg>
  );
}

// ─── Main SparklineTrend Component ────────────────────────────────

export default function SparklineTrend({
  pluginId,
  currentPct,
  simplified,
}: {
  pluginId: string;
  currentPct: number;
  /** If true, show only the sparkline + delta (no full history panel) */
  simplified?: boolean;
}) {
  const [history, setHistory] = useState<TrendPoint[]>([]);
  const [expanded, setExpanded] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(120);

  // Hydrate from localStorage
  useEffect(() => {
    setIsClient(true);
    setHistory(loadTrendHistory(pluginId));
  }, [pluginId]);

  // Measure container
  useEffect(() => {
    if (!containerRef.current) return;
    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setContainerWidth(entry.contentRect.width);
      }
    });
    ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

  // Record current point into history if not already recorded this session
  useEffect(() => {
    if (!isClient) return;
    recordTrendPoint(pluginId, currentPct);
    setHistory(loadTrendHistory(pluginId));
  }, [currentPct, pluginId, isClient]);

  const points = history;
  if (!isClient || points.length < MIN_POINTS_FOR_TREND) {
    return null;
  }

  const first = points[0].pct;
  const last = points[points.length - 1].pct;
  const delta = last - first;
  const deltaStr = delta >= 0 ? `+${delta.toFixed(0)}` : delta.toFixed(0);
  const deltaColor = delta > 2 ? 'text-emerald-600' : delta < -2 ? 'text-red-500' : 'text-gray-400';
  const arrow = delta > 2 ? '↑' : delta < -2 ? '↓' : '→';

  const sparklineH = simplified ? 32 : 48;

  return (
    <div ref={containerRef} className="relative">
      {/* Sparkline + delta */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex items-center gap-2 w-full group"
        title="Click to see trend details"
      >
        <div className="flex-1 min-w-[60px]">
          <SparklineSvg points={points} width={containerWidth} height={sparklineH} />
        </div>
        <div className={`text-[10px] font-mono font-semibold shrink-0 ${deltaColor}`}>
          {arrow} {deltaStr}%
        </div>
      </button>

      {/* Expanded detail panel */}
      {expanded && (
        <div className="mt-2 p-3 rounded-lg bg-gray-50 border border-gray-200 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">
              Completion Trend
            </span>
            <span className="text-[10px] text-gray-400">
              {points.length} data points
            </span>
          </div>

          {/* Mini stats */}
          <div className="grid grid-cols-3 gap-2">
            <div className="text-center">
              <div className="text-xs font-semibold text-gray-800">{first.toFixed(0)}%</div>
              <div className="text-[9px] text-gray-400">Start</div>
            </div>
            <div className="text-center">
              <div className={`text-xs font-semibold ${deltaColor}`}>{last.toFixed(0)}%</div>
              <div className="text-[9px] text-gray-400">Current</div>
            </div>
            <div className="text-center">
              <div className="text-xs font-semibold text-gray-800">
                {Math.max(...points.map(p => p.pct)).toFixed(0)}%
              </div>
              <div className="text-[9px] text-gray-400">Peak</div>
            </div>
          </div>

          {/* Larger inline sparkline */}
          <div className="mt-1">
            <SparklineSvg points={points} width={containerWidth - 16} height={40} />
          </div>

          {/* History points summary */}
          <div className="max-h-24 overflow-y-auto space-y-0.5">
            {[...points].reverse().slice(0, 15).map((pt, i) => (
              <div key={i} className="flex items-center justify-between text-[10px] font-mono text-gray-500">
                <span>{pt.label}</span>
                <span>{pt.pct}%</span>
              </div>
            ))}
            {points.length > 15 && (
              <div className="text-[9px] text-gray-400 text-center pt-1">
                … {points.length - 15} older entries
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
