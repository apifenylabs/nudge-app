'use client';

/**
 * PluginEmptyState — First-time welcome state for LifeOS plugins
 *
 * Shown when a user visits a plugin page with zero usage data.
 * Guides the user toward their first meaningful action:
 *   - Start a guided conversation (AI lead prompt)
 *   - Log their first habit/entry
 *   - Explore plugin phases
 *
 * Brand tone: warm, encouraging, minimal friction. No accounts needed.
 */

// No React hooks needed — stateless display only
import Link from 'next/link';

// ─── Inline SVG illustrations ──────────────────────────────────────

function EmptyStateArt({ emoji }: { emoji: string }) {
  return (
    <div className="relative w-20 h-20 mx-auto mb-4">
      {/* Glow behind */}
      <div className="absolute inset-0 bg-gradient-to-br from-teal-100/40 to-teal-50/30 rounded-full blur-xl" />
      {/* Ring */}
      <div className="absolute inset-0 rounded-full border-2 border-dashed border-teal-200 animate-[spin_8s_linear_infinite] opacity-60" />
      {/* Emoji */}
      <div className="absolute inset-0 flex items-center justify-center text-4xl">
        {emoji}
      </div>
    </div>
  );
}

// ─── Quick-start prompt cards ──────────────────────────────────────

interface QuickAction {
  label: string;
  prompt: string;
  icon: string;
}

function QuickActionCard({ action }: { action: QuickAction }) {
  return (
    <button
      onClick={() => {
        // Navigate to home with a pre-filled chat prompt
        const params = new URLSearchParams();
        params.set('ask', action.prompt);
        window.location.href = `/?${params.toString()}#chat`;
      }}
      className="group flex items-start gap-3 p-4 rounded-xl border border-gray-200 bg-white hover:border-teal-300 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 text-left"
    >
      <span className="text-xl mt-0.5 shrink-0">{action.icon}</span>
      <div>
        <h4 className="text-sm font-semibold text-gray-800 group-hover:text-teal-700 transition-colors">
          {action.label}
        </h4>
        <p className="text-xs text-gray-400 mt-0.5 leading-relaxed">
          {action.prompt}
        </p>
      </div>
    </button>
  );
}

// ─── Phase preview chip ────────────────────────────────────────────

interface PhaseChip {
  id: string;
  name: string;
  description: string;
}

function PhaseChip({ phase }: { phase: PhaseChip }) {
  return (
    <div className="flex items-start gap-2 px-3 py-2.5 rounded-lg bg-gray-50 border border-gray-100 hover:border-teal-200 hover:bg-teal-50/30 transition-colors cursor-default">
      <div className="w-5 h-5 rounded-full bg-teal-100 flex items-center justify-center shrink-0 mt-0.5">
        <svg className="w-3 h-3 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
        </svg>
      </div>
      <div>
        <span className="text-xs font-semibold text-gray-700">{phase.name}</span>
        <p className="text-[11px] text-gray-400 mt-0.5 leading-snug">{phase.description}</p>
      </div>
    </div>
  );
}

// ─── Main Component ────────────────────────────────────────────────

export interface PluginEmptyStateProps {
  /** Plugin emoji for visual */
  pluginEmoji: string;
  /** Plugin name, e.g. "Travel OS" */
  pluginName: string;
  /** Brief guidance on what the plugin does */
  guidance?: string;
  /** Array of phase names for quick-start visibility */
  phases?: PhaseChip[];
  /** Quick-action prompts unique to this plugin */
  quickActions?: QuickAction[];
  /** Optional link to plugin info */
  pluginHref?: string;
  /** Category emoji/name context */
  categoryLabel?: string;
}

function getDefaultGuidance(name: string): string {
  return `${name} is ready when you are. Start a conversation, log your first data point, or explore the phases below. No setup, no accounts — just pick something and go.`;
}

function getDefaultQuickActions(pluginName: string): QuickAction[] {
  return [
    {
      label: `Start a conversation with ${pluginName}`,
      prompt: `I'd like to start using ${pluginName}. What's the first step?`,
      icon: '💬',
    },
    {
      label: 'Log your first entry',
      prompt: `Help me log my first data point in ${pluginName}.`,
      icon: '📝',
    },
    {
      label: 'See what this plugin can do',
      prompt: `Give me an overview of what ${pluginName} can help me with.`,
      icon: '🔍',
    },
  ];
}

const DEFAULT_PHASES: PhaseChip[] = [
  { id: 'start', name: 'Discovery', description: 'Tell the AI about your situation and goals' },
  { id: 'plan', name: 'Planning', description: 'Get a personalized roadmap and action items' },
  { id: 'track', name: 'Tracking', description: 'Log progress and see patterns over time' },
];

export default function PluginEmptyState({
  pluginEmoji,
  pluginName,
  guidance,
  phases,
  quickActions,
  pluginHref,
  categoryLabel,
}: PluginEmptyStateProps) {
  const resolvedGuidance = guidance ?? getDefaultGuidance(pluginName);
  const resolvedActions = quickActions ?? getDefaultQuickActions(pluginName);
  const resolvedPhases = phases ?? DEFAULT_PHASES;

  return (
    <div className="rounded-2xl border border-dashed border-gray-200 bg-gradient-to-b from-gray-50/50 to-white p-8 sm:p-10">
      {/* ── Visual + Headline ── */}
      <div className="text-center mb-8">
        <EmptyStateArt emoji={pluginEmoji} />
        <h3 className="text-lg font-semibold text-gray-800 mb-1">
          Welcome to {pluginName}
        </h3>
        {categoryLabel && (
          <p className="text-xs text-gray-400 mb-2">{categoryLabel}</p>
        )}
        <p className="text-sm text-gray-500 max-w-md mx-auto leading-relaxed">
          {resolvedGuidance}
        </p>
      </div>

      {/* ── Quick Actions Grid ── */}
      <div className="mb-8">
        <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
          Quick start
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {resolvedActions.map((action) => (
            <QuickActionCard key={action.label} action={action} />
          ))}
        </div>
      </div>

      {/* ── Phase Preview ── */}
      <div>
        <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
          What you&apos;ll explore
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          {resolvedPhases.map((phase) => (
            <PhaseChip key={phase.id} phase={phase} />
          ))}
        </div>
      </div>

      {/* ── Footer CTA ── */}
      <div className="mt-8 pt-6 border-t border-gray-100 flex items-center justify-center gap-4 flex-wrap">
        <Link
          href={`/#chat`}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-teal-600 text-white text-sm font-semibold rounded-xl hover:bg-teal-700 transition-colors shadow-sm"
        >
          <span>💬</span>
          <span>Ask {pluginName}</span>
        </Link>
        {pluginHref && (
          <Link
            href={pluginHref}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-gray-700 text-sm font-semibold rounded-xl border border-gray-200 hover:border-teal-300 hover:text-teal-700 transition-colors"
          >
            <span>📖</span>
            <span>Learn more</span>
          </Link>
        )}
      </div>

      {/* ── Trust note ── */}
      <p className="text-center text-[11px] text-gray-300 mt-6">
        Everything is stored locally in your browser. No account needed.
      </p>
    </div>
  );
}
