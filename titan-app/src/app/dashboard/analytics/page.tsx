"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  BarChart3,
  TrendingUp,
  Users,
  Eye,
  Zap,
  Calendar,
  Activity,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import {
  loadUsageHistory,
  type DailyStat,
} from "@/lib/usage-tracker";

// ─── Date Range Filter ─────────────────────────────────────────────────

type DateRange = "7d" | "30d" | "all";

const RANGE_OPTS: { value: DateRange; label: string }[] = [
  { value: "7d", label: "7 Days" },
  { value: "30d", label: "30 Days" },
  { value: "all", label: "All Time" },
];

function filterByRange(history: DailyStat[], range: DateRange): DailyStat[] {
  if (range === "all") return history;
  const days = range === "7d" ? 7 : 30;
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - days);
  const key = cutoff.toISOString().split("T")[0];
  return history.filter((d) => d.date >= key);
}

// ─── Simple Bar Chart ──────────────────────────────────────────────────

function BarChart({
  data,
  color,
  label,
  formatValue,
  height = 160,
}: {
  data: { date: string; value: number }[];
  color: string;
  label: string;
  formatValue?: (v: number) => string;
  height?: number;
}) {
  const max = Math.max(...data.map((d) => d.value), 1);
  const barWidth = Math.max(4, Math.min(16, 400 / Math.max(data.length, 1)));

  return (
    <div>
      <div
        className="flex items-end gap-[2px]"
        style={{ height, minHeight: height }}
      >
        {data.map((d, i) => {
          const pct = (d.value / max) * 100;
          return (
            <div
              key={i}
              className="relative group flex-1 flex flex-col items-center justify-end"
            >
              <div
                className="w-full rounded-t-sm transition-all duration-300 hover:opacity-80"
                style={{
                  height: `${Math.max(2, pct)}%`,
                  background: d.value > 0 ? color : "#E5E7EB",
                  opacity: d.value > 0 ? 0.5 + pct / 200 : 0.25,
                }}
              >
                {/* Tooltip */}
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                  <div
                    className="text-[9px] font-mono px-1.5 py-0.5 rounded whitespace-nowrap shadow-sm"
                    style={{
                      background: "#111827",
                      color: "#FFFFFF",
                    }}
                  >
                    {formatValue ? formatValue(d.value) : d.value}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {/* Date labels — show every Nth */}
      <div className="flex mt-1" style={{ gap: "2px" }}>
        {data.map((d, i) => {
          const step = Math.max(1, Math.floor(data.length / 14));
          const show = i % step === 0 || i === data.length - 1;
          return (
            <span
              key={i}
              className="flex-1 text-[7px] font-mono text-center truncate"
              style={{
                color: "#9CA3AF",
                visibility: show ? "visible" : "hidden",
              }}
            >
              {d.date.slice(5)}
            </span>
          );
        })}
      </div>
    </div>
  );
}

// ─── Stat Card ─────────────────────────────────────────────────────────

function StatCard({
  icon: Icon,
  label,
  value,
  sub,
  color,
  trend,
}: {
  icon: typeof TrendingUp;
  label: string;
  value: string;
  sub?: string;
  color: string;
  trend?: "up" | "down" | "flat";
}) {
  return (
    <div
      className="p-4 rounded-xl border"
      style={{
        background: "#FFFFFF",
        borderColor: "#E5E7EB",
        boxShadow: "0 4px 12px -4px rgba(0,0,0,0.04)",
      }}
    >
      <div className="flex items-center gap-2 mb-2">
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center"
          style={{ background: `${color}12` }}
        >
          <Icon className="h-4 w-4" style={{ color }} />
        </div>
        {trend && (
          <span
            className="text-[10px] font-mono ml-auto"
            style={{
              color:
                trend === "up"
                  ? "#10B981"
                  : trend === "down"
                    ? "#EF4444"
                    : "#9CA3AF",
            }}
          >
            {trend === "up" ? "↑" : trend === "down" ? "↓" : "→"}
          </span>
        )}
      </div>
      <div className="text-2xl font-bold font-mono" style={{ color: "#111827" }}>
        {value}
      </div>
      <div className="text-[10px] font-mono uppercase tracking-wider mt-0.5" style={{ color: "#6B7280" }}>
        {label}
      </div>
      {sub && (
        <div className="text-[9px] font-mono mt-1" style={{ color: "#9CA3AF" }}>
          {sub}
        </div>
      )}
    </div>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────

export default function AnalyticsPage() {
  const [range, setRange] = useState<DateRange>("7d");

  const fullHistory = useMemo(() => loadUsageHistory(), []);

  const filtered = useMemo(() => filterByRange(fullHistory, range), [
    fullHistory,
    range,
  ]);

  // Derived stats
  const stats = useMemo(() => {
    const totalTasks = filtered.reduce((s, d) => s + d.tasksRun, 0);
    const totalXp = filtered.reduce((s, d) => s + d.xpEarned, 0);
    const totalSkills = filtered.reduce((s, d) => s + d.skillsCertified, 0);
    const activeDays = filtered.filter(
      (d) => d.tasksRun > 0 || d.xpEarned > 0
    ).length;
    const avgDailyTasks =
      filtered.length > 0 ? Math.round(totalTasks / filtered.length) : 0;
    const avgDailyXp =
      filtered.length > 0 ? Math.round(totalXp / filtered.length) : 0;
    const peakTasks = Math.max(...filtered.map((d) => d.tasksRun), 0);

    // Trend: compare first half vs second half
    const mid = Math.floor(filtered.length / 2);
    const firstHalf = filtered.slice(0, mid);
    const secondHalf = filtered.slice(mid);
    const firstAvg =
      firstHalf.length > 0
        ? firstHalf.reduce((s, d) => s + d.tasksRun, 0) / firstHalf.length
        : 0;
    const secondAvg =
      secondHalf.length > 0
        ? secondHalf.reduce((s, d) => s + d.tasksRun, 0) / secondHalf.length
        : 0;
    const trend: "up" | "down" | "flat" =
      secondAvg > firstAvg * 1.1
        ? "up"
        : secondAvg < firstAvg * 0.9
          ? "down"
          : "flat";

    return {
      totalTasks,
      totalXp,
      totalSkills,
      activeDays,
      avgDailyTasks,
      avgDailyXp,
      peakTasks,
      trend,
      totalDays: filtered.length,
    };
  }, [filtered]);

  // Chart data series
  const taskSeries = useMemo(
    () =>
      filtered.map((d) => ({
        date: d.date,
        value: d.tasksRun,
      })),
    [filtered]
  );

  const xpSeries = useMemo(
    () =>
      filtered.map((d) => ({
        date: d.date,
        value: d.xpEarned,
      })),
    [filtered]
  );

  const skillsSeries = useMemo(
    () =>
      filtered.map((d) => ({
        date: d.date,
        value: d.skillsCertified,
      })),
    [filtered]
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-4 sm:space-y-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <BarChart3 className="h-4 w-4" style={{ color: "#0D9488" }} />
          <h1
            className="text-base sm:text-lg font-bold tracking-tight"
            style={{ color: "#111827" }}
          >
            Analytics
          </h1>
          <span className="text-[10px] font-mono" style={{ color: "#9CA3AF" }}>
            {fullHistory.length} days tracked
          </span>
        </div>

        {/* Date Range Filter */}
        <div
          className="flex rounded-full p-0.5 border"
          style={{
            background: "#FFFFFF",
            borderColor: "#E5E7EB",
          }}
        >
          {RANGE_OPTS.map((opt) => (
            <button
              key={opt.value}
              onClick={() => setRange(opt.value)}
              className="px-3 py-1 rounded-full text-[10px] font-mono transition-all"
              style={{
                background:
                  range === opt.value ? "#0D9488" : "transparent",
                color: range === opt.value ? "#FFFFFF" : "#6B7280",
              }}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Stat Cards Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <StatCard
          icon={Activity}
          label="Tasks Run"
          value={stats.totalTasks.toLocaleString()}
          sub={`${stats.avgDailyTasks} avg/day`}
          color="#0D9488"
          trend={stats.trend}
        />
        <StatCard
          icon={Zap}
          label="XP Earned"
          value={stats.totalXp.toLocaleString()}
          sub={`+${stats.avgDailyXp}/day`}
          color="#F59E0B"
          trend={stats.trend}
        />
        <StatCard
          icon={Users}
          label="Active Days"
          value={`${stats.activeDays}`}
          sub={`of ${stats.totalDays} days`}
          color="#10B981"
        />
        <StatCard
          icon={TrendingUp}
          label="Peak Tasks"
          value={stats.peakTasks.toLocaleString()}
          sub={stats.peakTasks === 0 ? "--" : "best day"}
          color="#7C3AED"
        />
      </div>

      {/* Tasks Chart */}
      <Card
        className="p-4 sm:p-6"
        style={{
          background: "#FFFFFF",
          border: "1px solid #E5E7EB",
          borderRadius: "20px",
          boxShadow: "0 10px 30px -10px rgba(0,0,0,0.06)",
        }}
      >
        <div className="flex items-center gap-2 mb-4">
          <Activity className="h-3.5 w-3.5" style={{ color: "#0D9488" }} />
          <h3
            className="text-xs font-semibold font-mono uppercase tracking-wider"
            style={{ color: "#111827" }}
          >
            Daily Active Users / Tasks
          </h3>
          <span
            className="text-[9px] font-mono ml-auto"
            style={{ color: "#9CA3AF" }}
          >
            {taskSeries.length} data points
          </span>
        </div>
        {taskSeries.length === 0 ? (
          <div
            className="text-center py-8 text-[10px] font-mono"
            style={{ color: "#9CA3AF" }}
          >
            No usage data yet. Start running tasks to see charts here.
          </div>
        ) : (
          <BarChart
            data={taskSeries}
            color="#0D9488"
            label="Tasks"
            height={160}
          />
        )}
      </Card>

      {/* XP Chart */}
      <Card
        className="p-4 sm:p-6"
        style={{
          background: "#FFFFFF",
          border: "1px solid #E5E7EB",
          borderRadius: "20px",
          boxShadow: "0 10px 30px -10px rgba(0,0,0,0.06)",
        }}
      >
        <div className="flex items-center gap-2 mb-4">
          <Zap className="h-3.5 w-3.5" style={{ color: "#F59E0B" }} />
          <h3
            className="text-xs font-semibold font-mono uppercase tracking-wider"
            style={{ color: "#111827" }}
          >
            XP Earned Over Time
          </h3>
          <span
            className="text-[9px] font-mono ml-auto"
            style={{ color: "#9CA3AF" }}
          >
            +{stats.totalXp.toLocaleString()} total
          </span>
        </div>
        {xpSeries.length === 0 ? (
          <div
            className="text-center py-8 text-[10px] font-mono"
            style={{ color: "#9CA3AF" }}
          >
            No XP data yet. Complete tasks to earn XP and track it here.
          </div>
        ) : (
          <BarChart
            data={xpSeries}
            color="#F59E0B"
            label="XP"
            height={160}
            formatValue={(v) => `+${v.toLocaleString()}`}
          />
        )}
      </Card>

      {/* Skills Certified Chart (if any data) */}
      {stats.totalSkills > 0 && (
        <Card
          className="p-4 sm:p-6"
          style={{
            background: "#FFFFFF",
            border: "1px solid #E5E7EB",
            borderRadius: "20px",
            boxShadow: "0 10px 30px -10px rgba(0,0,0,0.06)",
          }}
        >
          <div className="flex items-center gap-2 mb-4">
            <Users className="h-3.5 w-3.5" style={{ color: "#10B981" }} />
            <h3
              className="text-xs font-semibold font-mono uppercase tracking-wider"
              style={{ color: "#111827" }}
            >
              Skills Certified
            </h3>
            <span
              className="text-[9px] font-mono ml-auto"
              style={{ color: "#9CA3AF" }}
            >
              {stats.totalSkills} total
            </span>
          </div>
          <BarChart
            data={skillsSeries}
            color="#10B981"
            label="Skills"
            height={120}
          />
        </Card>
      )}

      {/* Summary Footer */}
      <div
        className="p-4 rounded-xl border text-center"
        style={{
          background: "#FFFFFF",
          borderColor: "#E5E7EB",
        }}
      >
        <p className="text-[10px] font-mono" style={{ color: "#6B7280" }}>
          Data sourced from local storage ({fullHistory.length} days).{" "}
          {stats.trend === "up"
            ? "Your engagement is trending upward — keep it up! 🚀"
            : stats.trend === "down"
              ? "Activity is trending downward. Try setting a daily task goal."
              : "Your activity is steady and consistent."}
        </p>
      </div>
    </motion.div>
  );
}
