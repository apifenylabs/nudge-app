/**
 * LifeOS — Plugin Detail Page
 *
 * Static dynamic route: /plugins/:id
 * Pre-renders a marketing-style detail page for each LifeOS plugin.
 * Built for SEO, affiliate hooks, and user onboarding.
 *
 * Build-time: generates all 9 plugin pages as static HTML.
 */

import { PLUGINS, type PluginDefinition } from '@/app/lib/plugin-registry';
import { PLUGIN_CATEGORIES, type PluginCategory } from '@/app/lib/plugin-manifest-schema';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { PluginUsageSection } from '@/app/components/UsageDashboard';

// ─── Inline category inference (mirrors plugin-manifest-schema) ────

function inferPluginCategory(pluginId: string): PluginCategory {
  const map: Record<string, PluginCategory> = {
    travel: 'lifestyle',
    finance: 'finance',
    health: 'health',
    career: 'career',
    learning: 'learning',
    family: 'lifestyle',
    home: 'home',
    social: 'lifestyle',
    relationships: 'relationships',
    mindfulness: 'mindfulness',
  };
  return map[pluginId] || 'productivity';
}

// ─── Static Params: Build all 9 plugin pages at build time ─────────

export async function generateStaticParams() {
  return PLUGINS.map(plugin => ({ id: plugin.id }));
}

// ─── Per-page Metadata for SEO ─────────────────────────────────────

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const plugin = PLUGINS.find(p => p.id === params.id);
  if (!plugin) return { title: 'Plugin Not Found — LifeOS' };

  const statusLabel = plugin.status === 'active' ? 'Active' : plugin.status === 'beta' ? 'Beta' : 'Coming Soon';
  const catInfo = PLUGIN_CATEGORIES[inferPluginCategory(plugin.id)];
  const canonical = `https://lifeos.vercel.app/plugins/${plugin.id}`;

  return {
    title: `${plugin.emoji} ${plugin.name} — LifeOS AI Copilot`,
    description: `${plugin.name}: ${plugin.description}. ${plugin.features.length} AI-led features for ${catInfo.label.toLowerCase()}. Start a free conversation — no signup needed.`,
    openGraph: {
      title: `${plugin.emoji} ${plugin.name} — LifeOS AI Copilot`,
      description: plugin.description,
      url: canonical,
      siteName: 'LifeOS',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${plugin.emoji} ${plugin.name} — LifeOS`,
      description: plugin.description,
    },
    alternates: { canonical },
  };
}

// ─── Color Map ─────────────────────────────────────────────────────

const STATUS_BADGES: Record<string, { label: string; style: string }> = {
  active: { label: '🟢 Active', style: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
  beta: { label: '🟡 Beta', style: 'bg-amber-50 text-amber-700 border-amber-200' },
  'coming-soon': { label: '🔜 Coming Soon', style: 'bg-gray-100 text-gray-500 border-gray-200' },
};

// ─── Phase Card ────────────────────────────────────────────────────

function PhaseCard({ phase, index }: { phase: PluginDefinition['phases'][0]; index: number }) {
  return (
    <div className="group relative bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md hover:border-gray-300 transition-all">
      <div className="flex items-start gap-3">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-teal-400 to-emerald-500 flex items-center justify-center text-white text-xs font-bold shrink-0">
          {index + 1}
        </div>
        <div className="min-w-0">
          <h3 className="text-sm font-semibold text-gray-900 mb-1">{phase.name}</h3>
          <p className="text-xs text-gray-500 leading-relaxed mb-2">{phase.description}</p>
          <div className="flex flex-wrap gap-1.5">
            {phase.objectives.slice(0, 2).map(obj => (
              <span key={obj} className="text-[10px] font-mono text-gray-400 bg-gray-50 px-1.5 py-0.5 rounded-md border border-gray-100">
                {obj.length > 28 ? obj.slice(0, 26) + '…' : obj}
              </span>
            ))}
            {phase.objectives.length > 2 && (
              <span className="text-[10px] font-mono text-gray-300">+{phase.objectives.length - 2}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Client Wrapper for Usage Section ──────────────────────────────

function ClientUsageSection({ pluginId, pluginName }: { pluginId: string; pluginName: string }) {
  return <PluginUsageSection pluginId={pluginId} pluginName={pluginName} />;
}

// ─── Page ──────────────────────────────────────────────────────────

export default function PluginPage({ params }: { params: { id: string } }) {
  const plugin = PLUGINS.find(p => p.id === params.id);
  if (!plugin) notFound();

  const catInfo = PLUGIN_CATEGORIES[inferPluginCategory(plugin.id)];
  const statusBadge = STATUS_BADGES[plugin.status] || STATUS_BADGES['coming-soon'];
  const isAvailable = plugin.status === 'active' || plugin.status === 'beta';

  return (
    <main className="min-h-screen bg-white">
      {/* ── Hero ── */}
      <section className="relative overflow-hidden border-b border-gray-100">
        <div className="absolute inset-0 opacity-[0.03]" style={{
          background: `${plugin.gradient}`,
        }} />
        <div className="relative max-w-4xl mx-auto px-4 py-16 sm:py-24">
          <div className="flex items-center gap-2 mb-3">
            <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${statusBadge.style}`}>
              {statusBadge.label}
            </span>
            <span className="text-[10px] font-mono text-gray-400 bg-gray-50 px-2 py-0.5 rounded-full border border-gray-100">
              {catInfo.emoji} {catInfo.label}
            </span>
          </div>

          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl" style={{
              background: `${plugin.gradient.split(',')[0]}15`,
              border: `1px solid ${plugin.gradient.split(',')[0].replace('linear-gradient(135deg, ', '').trim().split(' ')[0]}30`,
            }}>
              {plugin.emoji}
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-1">{plugin.name}</h1>
              <p className="text-sm text-gray-500">{plugin.description}</p>
            </div>
          </div>

          {/* CTA */}
          <div className="flex items-center gap-3 mt-8">
            <a
              href={isAvailable ? '/' : undefined}
              onClick={isAvailable ? undefined : (e) => e.preventDefault()}
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                isAvailable
                  ? 'bg-gradient-to-r from-teal-500 to-emerald-500 text-white hover:shadow-lg hover:-translate-y-0.5'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              {isAvailable ? (
                <>Start a conversation →</>
              ) : (
                <>Coming soon</>
              )}
            </a>
            {isAvailable && (
              <span className="text-xs text-gray-400">No account needed. Free to use.</span>
            )}
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section className="max-w-4xl mx-auto px-4 py-12">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Features</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {plugin.features.map(f => (
            <div key={f} className="flex items-start gap-2.5 p-3 rounded-lg bg-gray-50 border border-gray-100">
              <svg className="w-4 h-4 text-teal-500 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-sm text-gray-700">{f}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Phases ── */}
      <section className="max-w-4xl mx-auto px-4 py-12 border-t border-gray-100">
        <h2 className="text-lg font-semibold text-gray-900 mb-1">Conversation Phases</h2>
        <p className="text-sm text-gray-500 mb-6">
          Each plugin has {plugin.phases.length} AI-led phases. The AI doesn&apos;t wait — it asks, probes, and guides.
        </p>
        <div className="space-y-3">
          {plugin.phases.map((phase, i) => (
            <PhaseCard key={phase.id} phase={phase} index={i} />
          ))}
        </div>
      </section>

      {/* ── Lead Prompt Preview ── */}
      {isAvailable && plugin.phases[0] && (
        <section className="max-w-4xl mx-auto px-4 py-12 border-t border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900 mb-1">How It Starts</h2>
          <p className="text-sm text-gray-500 mb-4">
            Here&apos;s how {plugin.name} opens the conversation:
          </p>
          <div className="bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-xl p-5 text-sm text-gray-700 leading-relaxed whitespace-pre-wrap font-mono text-[13px]">
            {plugin.phases[0].leadPrompt.length > 600
              ? plugin.phases[0].leadPrompt.slice(0, 600) + '…'
              : plugin.phases[0].leadPrompt}
          </div>
        </section>
      )}

      {/* ── Usage Analytics Section (client-side) ── */}
      <section className="max-w-4xl mx-auto px-4 py-12 border-t border-gray-100">
        <ClientUsageSection pluginId={plugin.id} pluginName={plugin.name} />
      </section>

      {/* ── Footer / Nav ── */}
      <footer className="border-t border-gray-100 py-8">
        <div className="max-w-4xl mx-auto px-4 flex items-center justify-between">
          <a href="/" className="text-sm font-semibold text-gray-800 hover:text-teal-600 transition-colors">
            ← Back to LifeOS
          </a>
          <div className="flex items-center gap-4">
            <a href="/analytics" className="text-xs text-gray-400 hover:text-teal-600 transition-colors">
              📊 Analytics
            </a>
            <span className="text-xs text-gray-400">{plugin.emoji} {plugin.name}</span>
          </div>
        </div>
      </footer>
    </main>
  );
}
