"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { TrendingUp, BarChart3 } from "lucide-react";
import { getLast7Days, getWeeklySummary } from "@/lib/usage-tracker";

// ─── Inline SVG Sparkline ────────────────────────────────────────────────
// No chart library needed — draws smooth SVG paths from daily stat arrays

function SparklineSVG({
  data,
  color,
  height = 36,
  width = 160,
}: {
  data: number[];
  color: string;
  height?: number;
  width?: number;
}) {
  const max = Math.max(...data, 1);
  const points = data.map((v, i) => ({
    x: (i / Math.max(data.length - 1, 1)) * (width - 4) + 2,
    y: height - 2 - ((v / max) * (height - 8)),
  }));

  const pathD = points.length > 1
    ? points.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ')
    : `M2,${height / 2} L${width - 2},${height / 2}`;

  return (
    <svg width={width} height={height} className="overflow-visible">
      {/* Area fill */}
      <defs>
        <linearGradient id={`spark-fill-${color.replace('#', '')}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity={0.2} />
          <stop offset="100%" stopColor={color} stopOpacity={0.02} />
        </linearGradient>
      </defs>
      <path
        d={pathD + ` L${width - 2},${height} L2,${height} Z`}
        fill={`url(#spark-fill-${color.replace('#', '')})`}
      />
      {/* Line */}
      <path
        d={pathD}
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="drop-shadow-sm"
        style={{ filter: `drop-shadow(0 0 3px ${color}40)` }}
      />
      {/* End dot */}
      {points.length > 0 && (
        <circle
          cx={points[points.length - 1].x}
          cy={points[points.length - 1].y}
          r="2.5"
          fill={color}
          stroke="white"
          strokeWidth="1"
        />
      )}
    </svg>
  );
}

interface ActivitySparklineProps {
  className?: string;
}

export default function ActivitySparkline({ className = '' }: ActivitySparklineProps) {
  const weekData = useMemo(() => getLast7Days(), []);
  const summary = useMemo(() => getWeeklySummary(), []);

  const tasksData = useMemo(() => weekData.map(d => d.tasksRun), [weekData]);
  const xpData = useMemo(() => weekData.map(d => d.xpEarned), [weekData]);

  // Day labels
  const dayLabels = useMemo(() => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return weekData.map(d => {
      const day = new Date(d.date).getDay();
      return days[day];
    });
  }, [weekData]);

  const maxTasks = Math.max(...tasksData, 5);
  const maxXp = Math.max(...xpData, 100);

  return (
    <motion.div
      className={`p-4 rounded-xl border ${className}`}
      style={{
        background: '#FFFFFF',
        borderColor: '#E5E0D8',
        boxShadow: '0 10px 30px -10px rgba(31,31,31,0.08)',
      }}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex items-center gap-2 mb-3">
        <BarChart3 className="h-3.5 w-3.5" style={{ color: '#0EA5A5' }} />
        <h3 className="text-xs font-semibold font-mono uppercase tracking-wider" style={{ color: '#1F1F1F' }}>7-Day Activity</h3>
        <span className="text-[9px] font-mono ml-auto" style={{ color: '#666666' }}>
          {summary.activeDays}/7 days active
        </span>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        {/* Tasks sparkline */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] font-mono font-semibold" style={{ color: '#0EA5A5' }}>Tasks</span>
            <span className="text-[10px] font-mono" style={{ color: '#666666' }}>
              {summary.tasksRun} this week
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex-1 overflow-hidden">
              <SparklineSVG data={tasksData} color="#0EA5A5" height={32} width={140} />
            </div>
            <div className="text-right shrink-0">
              <span className="text-lg font-bold font-mono" style={{ color: '#0EA5A5' }}>
                {tasksData[tasksData.length - 1]}
              </span>
              <span className="text-[9px] font-mono block" style={{ color: '#666666' }}>today</span>
            </div>
          </div>
          {/* Mini bar chart */}
          <div className="flex items-end gap-[3px] mt-1.5 h-8">
            {tasksData.slice(-7).map((v, i) => (
              <div
                key={i}
                className="flex-1 rounded-t-sm transition-all"
                style={{
                  height: `${Math.max(2, (v / Math.max(maxTasks, 1)) * 100)}%`,
                  background: v > 0 ? '#0EA5A5' : '#E5E0D8',
                  opacity: v > 0 ? 0.6 + (v / Math.max(maxTasks, 1)) * 0.4 : 0.3,
                }}
                title={`${dayLabels[i]}: ${v} tasks`}
              />
            ))}
          </div>
          {/* Day labels */}
          <div className="flex gap-[3px] mt-0.5">
            {dayLabels.map((day, i) => (
              <span key={i} className="flex-1 text-[7px] font-mono text-center" style={{ color: '#999999' }}>
                {day[0]}
              </span>
            ))}
          </div>
        </div>

        {/* XP sparkline */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] font-mono font-semibold" style={{ color: '#D4A017' }}>XP</span>
            <span className="text-[10px] font-mono" style={{ color: '#666666' }}>
              +{summary.xpEarned.toLocaleString()} this week
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex-1 overflow-hidden">
              <SparklineSVG data={xpData} color="#D4A017" height={32} width={140} />
            </div>
            <div className="text-right shrink-0">
              <span className="text-lg font-bold font-mono" style={{ color: '#D4A017' }}>
                +{xpData[xpData.length - 1]}
              </span>
              <span className="text-[9px] font-mono block" style={{ color: '#666666' }}>today</span>
            </div>
          </div>
          {/* Mini bar chart */}
          <div className="flex items-end gap-[3px] mt-1.5 h-8">
            {xpData.slice(-7).map((v, i) => (
              <div
                key={i}
                className="flex-1 rounded-t-sm transition-all"
                style={{
                  height: `${Math.max(2, (v / Math.max(maxXp, 1)) * 100)}%`,
                  background: v > 0 ? '#D4A017' : '#E5E0D8',
                  opacity: v > 0 ? 0.6 + (v / Math.max(maxXp, 1)) * 0.4 : 0.3,
                }}
                title={`${dayLabels[i]}: ${v} XP`}
              />
            ))}
          </div>
          {/* Day labels */}
          <div className="flex gap-[3px] mt-0.5">
            {dayLabels.map((day, i) => (
              <span key={i} className="flex-1 text-[7px] font-mono text-center" style={{ color: '#999999' }}>
                {day[0]}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
