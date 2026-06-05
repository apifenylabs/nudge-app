import { Metadata } from 'next';
import { Zap, Bug, Sparkles, TrendingUp, Shield, Rocket, RefreshCw, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Changelog — Titan Updates & Releases',
  description: 'Track every update, improvement, and new feature across Titan — the AI agent progression platform.',
  openGraph: {
    title: 'Changelog — Titan Updates',
    description: 'Track every update, improvement, and new feature across Titan.',
    type: 'website',
  },
};

interface ChangelogEntry {
  version: string;
  date: string;
  tag: 'major' | 'minor' | 'patch';
  title: string;
  changes: { type: 'feature' | 'improvement' | 'fix' | 'security'; text: string }[];
}

const CHANGELOG: ChangelogEntry[] = [
  {
    version: 'Phase 6.0',
    date: '2026-06-03',
    tag: 'major',
    title: 'God-Tier & Robotics Bridge',
    changes: [
      { type: 'feature', text: 'God-Tier progression system: 7 stages from Hatchling to God-Tier with visual auras, badges, and orbital rings' },
      { type: 'feature', text: 'Robotics Bridge: deploy certified agents to ROS2, Arduino/ESP32, Raspberry Pi, and custom hardware' },
      { type: 'feature', text: 'Interactive Robotics Dashboard with real-time deployment status, health monitoring, and live logs' },
      { type: 'feature', text: 'Visual level progression UI with XP tracking, skill tree unlocks, and milestone celebrations' },
      { type: 'feature', text: 'Pricing section with tiered plans: Free (1 agent), Pro (3 agents + God-Tier), and Enterprise (unlimited + custom)' },
      { type: 'feature', text: 'Certification system: agents earn verifiable badges (Bronze → Diamond → God-Tier)' },
    ],
  },
  {
    version: 'Phase 5.2',
    date: '2026-05-20',
    tag: 'minor',
    title: 'Dashboard & Analytics Polish',
    changes: [
      { type: 'feature', text: 'Added deployment metrics: active/error/total summary cards on dashboard' },
      { type: 'improvement', text: 'Deployment cards now show time-ago indicators for last heartbeat' },
      { type: 'improvement', text: 'Improved error state handling with retry and detail display' },
      { type: 'fix', text: 'Fixed WebSocket reconnection logic for ROS2 bridge' },
      { type: 'fix', text: 'Resolved deployment removal race condition' },
    ],
  },
  {
    version: 'Phase 5.1',
    date: '2026-05-10',
    tag: 'patch',
    title: 'Bug Fixes & API Refinements',
    changes: [
      { type: 'fix', text: 'Fixed deployment status polling interval causing excessive API calls' },
      { type: 'improvement', text: 'Reduced bundle size by lazy-loading Framer Motion animations' },
      { type: 'fix', text: 'Corrected platform endpoint validation for Arduino serial paths' },
      { type: 'improvement', text: 'Added loading skeleton states for dashboard' },
    ],
  },
  {
    version: 'Phase 5.0',
    date: '2026-05-01',
    tag: 'major',
    title: 'Swarm Orchestrator & Agent Coordination',
    changes: [
      { type: 'feature', text: 'Swarm Orchestrator: deploy up to 5 agents as a coordinated team' },
      { type: 'feature', text: 'Cross-agent context sharing with automatic negotiation' },
      { type: 'feature', text: 'Task distribution engine with priority queuing and dependency resolution' },
      { type: 'improvement', text: 'Rewrote deployment API with proper error boundaries and idempotency' },
      { type: 'security', text: 'Added rate limiting on deployment endpoints' },
    ],
  },
  {
    version: 'Phase 4.0',
    date: '2026-04-15',
    tag: 'major',
    title: 'Skill Forge & Visual Editor',
    changes: [
      { type: 'feature', text: 'Visual Skill Forge: drag-and-drop ability editor for agent skills' },
      { type: 'feature', text: 'Skill trigger system: time-based, event-based, and webhook triggers' },
      { type: 'feature', text: 'Skill marketplace: share and import community-built skills' },
      { type: 'feature', text: 'Live skill testing sandbox with output preview' },
    ],
  },
  {
    version: 'Phase 3.0',
    date: '2026-03-28',
    tag: 'major',
    title: 'BAU Engine & Autonomous Scheduling',
    changes: [
      { type: 'feature', text: 'Business-As-Usual (BAU) engine for scheduled autonomous agent tasks' },
      { type: 'feature', text: 'Monitoring dashboards with system health alerts' },
      { type: 'feature', text: 'Cron-backed job scheduling with retry policies' },
      { type: 'improvement', text: 'Agent logs now stream in real-time via WebSocket' },
    ],
  },
  {
    version: 'Phases 1–2',
    date: '2026-03-01',
    tag: 'major',
    title: 'Foundation & Core Agent System',
    changes: [
      { type: 'feature', text: 'Core agent runtime with modular skill execution' },
      { type: 'feature', text: 'Landing page with progression path showcase' },
      { type: 'feature', text: 'Mascot display system with animated character progression' },
      { type: 'feature', text: 'Basic user dashboard with agent management' },
      { type: 'security', text: 'OWASP-aligned agent audit trail and permission system' },
    ],
  },
];

const TAG_STYLES: Record<string, string> = {
  major: 'bg-purple-900/40 text-purple-300 border-purple-700/40',
  minor: 'bg-blue-900/40 text-blue-300 border-blue-700/40',
  patch: 'bg-gray-800/60 text-gray-300 border-gray-700/40',
};

const CHANGE_ICONS: Record<string, React.ReactNode> = {
  feature: <Sparkles className="w-3.5 h-3.5 text-emerald-400" />,
  improvement: <TrendingUp className="w-3.5 h-3.5 text-blue-400" />,
  fix: <Bug className="w-3.5 h-3.5 text-amber-400" />,
  security: <Shield className="w-3.5 h-3.5 text-red-400" />,
};

function formatDate(iso: string): string {
  const d = new Date(iso + 'T00:00:00Z');
  return d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC' });
}

export default function ChangelogPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 text-white">
      {/* Header */}
      <section className="relative overflow-hidden px-6 pt-20 pb-16">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent" />
        <div className="relative max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-900/30 border border-purple-700/30 text-purple-300 text-sm font-medium mb-6">
            <RefreshCw className="w-3.5 h-3.5" />
            Phases 1–6
          </div>
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-purple-400 via-amber-400 to-emerald-400 bg-clip-text text-transparent">
            Changelog
          </h1>
          <p className="text-xl text-gray-400 mt-4 max-w-2xl mx-auto">
            Every update that makes Titan sharper, faster, and more powerful.
          </p>
        </div>
      </section>

      {/* Timeline */}
      <section className="px-6 pb-24">
        <div className="max-w-3xl mx-auto">
          {CHANGELOG.map((entry, idx) => (
            <div key={entry.version} className="relative pl-8 pb-12 last:pb-0">
              {/* Timeline line */}
              {idx < CHANGELOG.length - 1 && (
                <div className="absolute left-[11px] top-8 bottom-0 w-px bg-gradient-to-b from-purple-500/40 to-gray-800" />
              )}
              {/* Timeline dot */}
              <div className="absolute left-0 top-1.5 w-6 h-6 rounded-full bg-gray-900 border-2 border-purple-500/50 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-purple-500" />
              </div>

              {/* Version badge */}
              <div className="flex items-center gap-3 mb-3">
                <span className={`inline-flex items-center px-3 py-1 text-xs font-bold rounded-full border ${TAG_STYLES[entry.tag]}`}>
                  {entry.tag === 'major' ? '🚀' : entry.tag === 'minor' ? '🔧' : '🐛'} v{entry.version}
                </span>
                <span className="text-sm text-gray-500">{formatDate(entry.date)}</span>
              </div>

              {/* Title */}
              <h2 className="text-xl font-bold mb-3">{entry.title}</h2>

              {/* Changes list */}
              <ul className="space-y-2">
                {entry.changes.map((change, ci) => (
                  <li key={ci} className="flex items-start gap-2.5 text-sm text-gray-300">
                    <span className="mt-0.5 shrink-0">{CHANGE_ICONS[change.type]}</span>
                    <span>{change.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 pb-20">
        <div className="max-w-3xl mx-auto text-center p-10 rounded-2xl bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700">
          <Rocket className="w-10 h-10 mx-auto mb-4 text-amber-400" />
          <h2 className="text-2xl font-bold mb-2">Join the Evolution</h2>
          <p className="text-gray-400 mb-6 max-w-lg mx-auto">
            Start building your agent progression today. From Hatchling to God-Tier — every level unlocks more power.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-purple-600 rounded-xl font-semibold hover:from-amber-400 hover:to-purple-500 transition-all shadow-lg shadow-amber-500/20"
          >
            Get Started
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-8 border-t border-gray-800">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-amber-500" />
            <span className="font-semibold">Titan</span>
          </div>
          <nav className="flex gap-6 text-sm text-gray-500">
            <Link href="/" className="hover:text-gray-300 transition-colors">Home</Link>
            <Link href="/changelog" className="text-amber-400 hover:text-amber-300 transition-colors">Changelog</Link>
            <Link href="/robotics" className="hover:text-gray-300 transition-colors">Robotics</Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
