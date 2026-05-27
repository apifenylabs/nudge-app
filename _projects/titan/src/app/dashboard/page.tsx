"use client";

import { useState, useEffect, useMemo } from "react";

/* ─────────────────────────────────────────────────────────────
   Types
   ───────────────────────────────────────────────────────────── */
interface StatCard {
  label: string;
  value: string;
  change: string;
  positive: boolean;
  icon: string;
}

interface AgentActivity {
  id: string;
  name: string;
  action: string;
  time: string;
  status: "success" | "running" | "error";
}

interface DailyUsage {
  day: string;
  queries: number;
  tokens: number;
  agents: number;
}

/* ─────────────────────────────────────────────────────────────
   Mock data (will be replaced with real APIs)
   ───────────────────────────────────────────────────────────── */
const stats: StatCard[] = [
  { label: "Active Agents", value: "1,247", change: "+12.3%", positive: true, icon: "🤖" },
  { label: "Queries Today", value: "84.2K", change: "+8.1%", positive: true, icon: "⚡" },
  { label: "Avg Response", value: "1.2s", change: "-0.3s", positive: true, icon: "⏱️" },
  { label: "Tokens Used", value: "4.8M", change: "+15.2%", positive: false, icon: "📊" },
  { label: "Active Deployments", value: "23", change: "+3", positive: true, icon: "🚀" },
  { label: "Error Rate", value: "0.8%", change: "-0.2%", positive: true, icon: "✅" },
];

const recentActivity: AgentActivity[] = [
  { id: "a1", name: "CodeForger-7", action: "Deployed to production", time: "2m ago", status: "success" },
  { id: "a2", name: "DataScout-X", action: "Completed batch analysis", time: "5m ago", status: "success" },
  { id: "a3", name: "Sentinel-Watch", action: "Monitoring alert fired", time: "8m ago", status: "running" },
  { id: "a4", name: "ContentWeaver", action: "Generated 12 blog posts", time: "12m ago", status: "success" },
  { id: "a5", name: "TradeOracle", action: "Signal processing error", time: "15m ago", status: "error" },
  { id: "a6", name: "SocialSage", action: "Scheduled 48 posts", time: "22m ago", status: "success" },
  { id: "a7", name: "ResearchHound", action: "Compiled market report", time: "30m ago", status: "success" },
  { id: "a8", name: "DeployBot", action: "Rolling update v2.4.1", time: "35m ago", status: "running" },
];

function generateDailyUsage(): DailyUsage[] {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  return days.map((day, i) => ({
    day,
    queries: Math.floor(8000 + Math.random() * 15000),
    tokens: Math.floor(400000 + Math.random() * 800000),
    agents: Math.floor(800 + Math.random() * 500),
  }));
}

/* ─────────────────────────────────────────────────────────────
   Mini Sparkline (CSS-based)
   ───────────────────────────────────────────────────────────── */
function Sparkline({ data, color }: { data: number[]; color: string }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;

  const points = data.map((v, i) => {
    const x = (i / (data.length - 1)) * 100;
    const y = 100 - ((v - min) / range) * 90;
    return `${x},${y}`;
  });

  return (
    <svg viewBox="0 0 100 100" className="w-full h-10" preserveAspectRatio="none">
      <polyline
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        points={points.join(" ")}
        className="opacity-60"
      />
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────────
   Stat Card Component
   ───────────────────────────────────────────────────────────── */
function StatCardView({ card, index }: { card: StatCard; index: number }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className="glass rounded-xl p-4 transition-all duration-300"
      style={{
        animation: `fadeIn 0.4s ease-out ${index * 0.08}s both`,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="flex items-start justify-between mb-3">
        <span className="text-xl">{card.icon}</span>
        <span
          className={`text-xs font-medium px-2 py-0.5 rounded-full ${
            card.positive
              ? "bg-emerald-500/10 text-emerald-400"
              : "bg-red-500/10 text-red-400"
          }`}
        >
          {card.change}
        </span>
      </div>
      <p className="text-2xl font-bold text-white mb-0.5">{card.value}</p>
      <p className="text-xs text-slate-500">{card.label}</p>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Bar Chart (inline SVG)
   ───────────────────────────────────────────────────────────── */
function UsageBarChart({ data }: { data: DailyUsage[] }) {
  const maxQueries = Math.max(...data.map((d) => d.queries));
  const maxAgents = Math.max(...data.map((d) => d.agents));

  return (
    <div className="glass rounded-xl p-5">
      <h3 className="text-sm font-semibold text-white mb-4">Weekly Usage</h3>
      <div className="space-y-4">
        {/* Queries bar */}
        <div>
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1.5">
            <span className="text-cyan-400 font-medium">Queries</span>
            <span className="font-mono">{data.reduce((s, d) => s + d.queries, 0).toLocaleString()}</span>
          </div>
          <div className="flex items-end gap-1 h-8">
            {data.map((d) => (
              <div key={`q-${d.day}`} className="flex-1 flex flex-col items-center group relative">
                <div
                  className="w-full rounded-t-sm transition-all duration-500 hover:opacity-80"
                  style={{
                    height: `${(d.queries / maxQueries) * 100}%`,
                    background: "linear-gradient(to top, #0891b2, #22d3ee)",
                    minHeight: "4px",
                  }}
                />
                <span className="text-[10px] text-slate-600 mt-1">{d.day}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Agents bar */}
        <div>
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1.5">
            <span className="text-purple-400 font-medium">Active Agents</span>
            <span className="font-mono">{Math.round(data.reduce((s, d) => s + d.agents, 0) / data.length).toLocaleString()} avg</span>
          </div>
          <div className="flex items-end gap-1 h-8">
            {data.map((d) => (
              <div key={`a-${d.day}`} className="flex-1 flex flex-col items-center group relative">
                <div
                  className="w-full rounded-t-sm transition-all duration-500 hover:opacity-80"
                  style={{
                    height: `${(d.agents / maxAgents) * 100}%`,
                    background: "linear-gradient(to top, #7c3aed, #a855f7)",
                    minHeight: "4px",
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Activity Feed
   ───────────────────────────────────────────────────────────── */
function ActivityFeed({ activities }: { activities: AgentActivity[] }) {
  return (
    <div className="glass rounded-xl p-5">
      <h3 className="text-sm font-semibold text-white mb-4">Recent Activity</h3>
      <div className="space-y-1">
        {activities.map((a, i) => (
          <div
            key={a.id}
            className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-white/5 transition-colors"
            style={{
              animation: `fadeIn 0.3s ease-out ${i * 0.05}s both`,
            }}
          >
            <div className="flex items-center gap-3 min-w-0">
              {/* Status dot */}
              <span
                className={`w-2 h-2 rounded-full shrink-0 ${
                  a.status === "success"
                    ? "bg-emerald-400"
                    : a.status === "running"
                      ? "bg-cyan-400 animate-pulse"
                      : "bg-red-400"
                }`}
              />
              <div className="min-w-0">
                <p className="text-sm font-medium text-white truncate">{a.name}</p>
                <p className="text-xs text-slate-500 truncate">{a.action}</p>
              </div>
            </div>
            <span className="text-xs text-slate-600 shrink-0 ml-3">{a.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Agent Distribution Pie (CSS semicircle)
   ───────────────────────────────────────────────────────────── */
function AgentDistribution() {
  const slices = useMemo(
    () => [
      { label: "Content", value: 35, color: "#22d3ee" },
      { label: "Trading", value: 25, color: "#a855f7" },
      { label: "Research", value: 20, color: "#f59e0b" },
      { label: "DevOps", value: 12, color: "#10b981" },
      { label: "Social", value: 8, color: "#ef4444" },
    ],
    []
  );

  const total = slices.reduce((s, s_) => s + s_.value, 0);
  let cumulative = 0;

  return (
    <div className="glass rounded-xl p-5">
      <h3 className="text-sm font-semibold text-white mb-4">Agent Distribution</h3>
      <div className="flex items-center gap-4">
        {/* Donut */}
        <div className="relative w-24 h-24 shrink-0">
          <svg viewBox="0 0 36 36" className="w-24 h-24 -rotate-90">
            {slices.map((slice) => {
              const startAngle = (cumulative / total) * 360;
              cumulative += slice.value;
              const endAngle = (cumulative / total) * 360;
              const x1 = 18 + 15 * Math.cos((startAngle * Math.PI) / 180);
              const y1 = 18 + 15 * Math.sin((startAngle * Math.PI) / 180);
              const x2 = 18 + 15 * Math.cos((endAngle * Math.PI) / 180);
              const y2 = 18 + 15 * Math.sin((endAngle * Math.PI) / 180);
              const largeArc = endAngle - startAngle > 180 ? 1 : 0;

              return (
                <path
                  key={slice.label}
                  d={`M 18 18 L ${x1} ${y1} A 15 15 0 ${largeArc} 1 ${x2} ${y2} Z`}
                  fill={slice.color}
                  opacity="0.8"
                  className="hover:opacity-100 transition-opacity"
                />
              );
            })}
            <circle cx="18" cy="18" r="10" fill="#0f0f1a" />
          </svg>
        </div>

        {/* Legend */}
        <div className="flex-1 space-y-1.5">
          {slices.map((slice) => (
            <div key={slice.label} className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: slice.color }}
                />
                <span className="text-slate-400">{slice.label}</span>
              </div>
              <span className="text-slate-500 font-mono">{slice.value}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Quick Actions
   ───────────────────────────────────────────────────────────── */
const quickActions = [
  { label: "Create Agent", icon: "➕", color: "from-cyan-500 to-cyan-600" },
  { label: "View Logs", icon: "📋", color: "from-purple-500 to-purple-600" },
  { label: "Deploy", icon: "🚀", color: "from-emerald-500 to-emerald-600" },
  { label: "Settings", icon: "⚙️", color: "from-slate-500 to-slate-600" },
];

/* ─────────────────────────────────────────────────────────────
   DASHBOARD PAGE
   ───────────────────────────────────────────────────────────── */
export default function DashboardPage() {
  const [mounted, setMounted] = useState(false);
  const [timeframe, setTimeframe] = useState<"24h" | "7d" | "30d">("24h");

  useEffect(() => setMounted(true), []);

  const dailyData = useMemo(() => generateDailyUsage(), []);

  if (!mounted) return null;

  return (
    <main className="min-h-screen bg-[#08080f]">
      {/* ── Header ──────────────────────────────────────── */}
      <header className="sticky top-0 z-40 border-b border-[#1e293b]/50 bg-[#08080fe0] backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-lg">🗡️</span>
            <h1 className="text-lg font-bold text-white">
              <span className="text-cyan-400">Ti</span>
              <span className="text-purple-400">tan</span>
              <span className="text-sm text-slate-500 ml-2 font-normal">
                Analytics Dashboard
              </span>
            </h1>
          </div>

          {/* Timeframe selector */}
          <div className="flex items-center gap-1 bg-[#1a1a2e] rounded-lg p-0.5">
            {(["24h", "7d", "30d"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTimeframe(t)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
                  timeframe === t
                    ? "bg-cyan-500/20 text-cyan-400"
                    : "text-slate-500 hover:text-slate-300"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        {/* ── Stats Grid ────────────────────────────────── */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
          {stats.map((card, i) => (
            <StatCardView key={card.label} card={card} index={i} />
          ))}
        </div>

        {/* ── Charts Row ────────────────────────────────── */}
        <div className="grid lg:grid-cols-3 gap-4 mb-6">
          <div className="lg:col-span-2">
            <UsageBarChart data={dailyData} />
          </div>
          <AgentDistribution />
        </div>

        {/* ── Activity + Quick Actions ──────────────────── */}
        <div className="grid lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2">
            <ActivityFeed activities={recentActivity} />
          </div>

          {/* Quick Actions */}
          <div className="space-y-4">
            <div className="glass rounded-xl p-5">
              <h3 className="text-sm font-semibold text-white mb-3">Quick Actions</h3>
              <div className="grid grid-cols-2 gap-2">
                {quickActions.map((action) => (
                  <button
                    key={action.label}
                    className={`flex flex-col items-center gap-1.5 py-3 rounded-xl bg-gradient-to-b ${action.color} text-white text-xs font-medium hover:scale-105 transition-all duration-200 opacity-80 hover:opacity-100`}
                  >
                    <span className="text-lg">{action.icon}</span>
                    {action.label}
                  </button>
                ))}
              </div>
            </div>

            {/* System Health mini card */}
            <div className="glass rounded-xl p-4">
              <h3 className="text-xs font-semibold text-white mb-2">System Health</h3>
              <div className="space-y-2">
                {[
                  { label: "API", status: "operational", color: "bg-emerald-400" },
                  { label: "Database", status: "operational", color: "bg-emerald-400" },
                  { label: "WebSocket", status: "degraded", color: "bg-amber-400" },
                  { label: "Agents", status: "operational", color: "bg-emerald-400" },
                ].map((s) => (
                  <div key={s.label} className="flex items-center justify-between text-xs">
                    <span className="text-slate-400">{s.label}</span>
                    <div className="flex items-center gap-1.5">
                      <span className={`w-1.5 h-1.5 rounded-full ${s.color}`} />
                      <span className="text-slate-500 capitalize">{s.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── Footer ────────────────────────────────────── */}
        <footer className="mt-10 border-t border-slate-800/50 py-4 text-center text-xs text-slate-600">
          Titan Analytics — Data refreshes every 60s • {new Date().toLocaleDateString()}
        </footer>
      </div>

      {/* ── Animations ──────────────────────────────────── */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </main>
  );
}
