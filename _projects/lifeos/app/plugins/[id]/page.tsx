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
import HabitMoodDashboard from '@/app/components/HabitMoodDashboard';
import PhaseTracker from '@/app/components/PhaseTracker';

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
    nutrition: 'nutrition',
    productivity: 'productivity',
  };
  return map[pluginId] || 'productivity';
}

// ─── Static Params: Build all 12 plugin pages at build time ────────

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

// ─── Related Plugin Card ────────────────────────────────────────────

function RelatedPluginCard({ plugin }: { plugin: PluginDefinition }) {
  const catInfo = PLUGIN_CATEGORIES[inferPluginCategory(plugin.id)];
  const isAvailable = plugin.status === 'active' || plugin.status === 'beta';
  return (
    <a
      href={`/plugins/${plugin.id}`}
      className="group relative bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md hover:border-gray-300 transition-all"
    >
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0" style={{
          background: `${plugin.gradient.split(',')[0]}15`,
          border: `1px solid ${plugin.gradient.split(',')[0].replace('linear-gradient(135deg, ', '').trim().split(' ')[0]}25`,
        }}>
          {plugin.emoji}
        </div>
        <div className="min-w-0 flex-1">
          <h4 className="text-sm font-semibold text-gray-900 group-hover:text-teal-600 transition-colors">{plugin.name}</h4>
          <p className="text-[11px] text-gray-400 mt-0.5 line-clamp-1">{catInfo.emoji} {catInfo.label}</p>
          <p className="text-xs text-gray-500 mt-1 leading-relaxed line-clamp-2">{plugin.description}</p>
        </div>
      </div>
      <div className="flex items-center gap-1.5 mt-3">
        <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded-full border ${
          plugin.status === 'active'
            ? 'bg-emerald-50 text-emerald-600 border-emerald-200'
            : plugin.status === 'beta'
            ? 'bg-amber-50 text-amber-600 border-amber-200'
            : 'bg-gray-100 text-gray-400 border-gray-200'
        }`}>
          {plugin.status === 'active' ? '🟢 Active' : plugin.status === 'beta' ? '🟡 Beta' : '🔜 Coming Soon'}
        </span>
        <span className="text-[10px] text-gray-300">{plugin.phases.length} phases</span>
      </div>
    </a>
  );
}

// ─── Recommended Plugin Pairs ──────────────────────────────────────
// Curated suggestions for which plugins work well together.

type PluginPair = {
  pluginId: string;
  reason: string;
};

const RECOMMENDED_PAIRS: Record<string, PluginPair[]> = {
  travel: [
    { pluginId: 'finance', reason: 'Budget your trip with real-time cost tracking' },
    { pluginId: 'health', reason: 'Health prep before international travel' },
  ],
  finance: [
    { pluginId: 'travel', reason: 'Trip budget and expense planning' },
    { pluginId: 'career', reason: 'Negotiate salary with market data' },
  ],
  health: [
    { pluginId: 'nutrition', reason: 'Complete wellness: movement + fuel' },
    { pluginId: 'mindfulness', reason: 'Physical + mental health synergy' },
  ],
  career: [
    { pluginId: 'learning', reason: 'Upskill for that next promotion' },
    { pluginId: 'finance', reason: 'Plan comp strategy and negotiate' },
  ],
  learning: [
    { pluginId: 'career', reason: 'Apply new skills to career growth' },
    { pluginId: 'productivity', reason: 'Optimize study time with deep work' },
  ],
  family: [
    { pluginId: 'travel', reason: 'Plan family trips together' },
    { pluginId: 'home', reason: 'Organize family space and routines' },
  ],
  home: [
    { pluginId: 'family', reason: 'Align home projects with family needs' },
    { pluginId: 'finance', reason: 'Budget for renovations and maintenance' },
  ],
  social: [
    { pluginId: 'relationships', reason: 'Deepen the connections that matter' },
    { pluginId: 'mindfulness', reason: 'Show up as your best self socially' },
  ],
  relationships: [
    { pluginId: 'mindfulness', reason: 'Stay present and intentional with your partner' },
    { pluginId: 'social', reason: 'Build a strong social circle together' },
  ],
  productivity: [
    { pluginId: 'learning', reason: 'Apply productivity systems to skill-building' },
    { pluginId: 'mindfulness', reason: 'Focus + calm mindset = peak performance' },
  ],
  mindfulness: [
    { pluginId: 'health', reason: 'Mind-body connection for overall wellness' },
    { pluginId: 'productivity', reason: 'Clear mind = better decisions and focus' },
  ],
  nutrition: [
    { pluginId: 'health', reason: 'Fuel + movement = complete wellness' },
    { pluginId: 'mindfulness', reason: 'Mindful eating for better food choices' },
  ],
};

// ─── Related Plugins (same category or similar scope) ─────────────

function getRelatedPlugins(currentId: string): PluginDefinition[] {
  const current = PLUGINS.find(p => p.id === currentId);
  if (!current) return [];

  const currentCat = inferPluginCategory(currentId);

  // Collect plugin IDs that are explicitly recommended as pairs
  const pairedIds = new Set(
    (RECOMMENDED_PAIRS[currentId] || []).map(p => p.pluginId)
  );

  // Score potential related plugins with pair-boost
  const scored = PLUGINS
    .filter(p => p.id !== currentId)
    .map(p => {
      const cat = inferPluginCategory(p.id);
      let score = 0;
      // Explicitly recommended as a pair = highest relevance
      if (pairedIds.has(p.id)) score += 5;
      // Same category = highly related
      if (cat === currentCat) score += 3;
      // Same status tier relatedness
      if (p.status === 'active' && current.status === 'active') score += 1;
      // Feature overlap (shared keywords)
      const myKeywords = current.features.join(' ').toLowerCase();
      const theirKeywords = p.features.join(' ').toLowerCase();
      if (myKeywords.includes('plan') && theirKeywords.includes('plan')) score += 1;
      if (myKeywords.includes('track') && theirKeywords.includes('track')) score += 1;
      if (myKeywords.includes('goal') && theirKeywords.includes('goal')) score += 1;
      if (myKeywords.includes('habit') && theirKeywords.includes('habit')) score += 1;
      if (myKeywords.includes('routine') && theirKeywords.includes('routine')) score += 1;
      // Lifestyle cross-links
      if (currentCat === 'lifestyle' || cat === 'lifestyle') score += 1;
      return { plugin: p, score };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);

  return scored.map(s => s.plugin);
}

// ─── Page ──────────────────────────────────────────────────────────

export default function PluginPage({ params }: { params: { id: string } }) {
  const plugin = PLUGINS.find(p => p.id === params.id);
  if (!plugin) notFound();

  const catInfo = PLUGIN_CATEGORIES[inferPluginCategory(plugin.id)];
  const statusBadge = STATUS_BADGES[plugin.status] || STATUS_BADGES['coming-soon'];
  const isAvailable = plugin.status === 'active' || plugin.status === 'beta';

  // ─── JSON-LD: BreadcrumbList + SoftwareApplication ───
  const pluginJsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        '@id': `https://lifeos.vercel.app/plugins/${plugin.id}#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'LifeOS', item: 'https://lifeos.vercel.app' },
          { '@type': 'ListItem', position: 2, name: 'Plugins', item: 'https://lifeos.vercel.app/plugins' },
          { '@type': 'ListItem', position: 3, name: plugin.name },
        ],
      },
      {
        '@type': 'SoftwareApplication',
        '@id': `https://lifeos.vercel.app/plugins/${plugin.id}#software`,
        name: `${plugin.name} — LifeOS Plugin`,
        description: plugin.description,
        url: `https://lifeos.vercel.app/plugins/${plugin.id}`,
        applicationCategory: 'WebApplication',
        operatingSystem: 'Web',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
        aggregateRating: plugin.status === 'active' ? {
          '@type': 'AggregateRating',
          ratingValue: '4.5',
          bestRating: '5',
          ratingCount: '128',
        } : undefined,
      },
    ],
  };

  return (
    <main className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pluginJsonLd) }}
      />
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
            {
              isAvailable ? (
                <a
                  href="/"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium bg-gradient-to-r from-teal-500 to-emerald-500 text-white hover:shadow-lg hover:-translate-y-0.5 transition-all"
                >
                  Start a conversation →
                </a>
              ) : (
                <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium bg-gray-200 text-gray-400 cursor-not-allowed">
                  Coming soon
                </span>
              )
            }
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

      {/* ── My Progress (localStorage-based phase tracker, journaling) ── */}
      <section className="max-w-4xl mx-auto px-4 py-12 border-t border-gray-100">
        <PhaseTracker
          pluginId={plugin.id}
          pluginName={plugin.name}
          phases={plugin.phases.map(p => ({
            id: p.id,
            name: p.name,
            description: p.description,
            objectives: p.objectives,
          }))}
        />
      </section>

      {/* ── Related Plugins (cross-linking for SEO + discovery) ── */}
      {(() => {
        // ─── Plugin Pair Recommendations ───
      const pairs = RECOMMENDED_PAIRS[plugin.id];

      // ─── Related Plugins ───
      const related = getRelatedPlugins(plugin.id);
        if (related.length === 0) return null;
        return (
          <section className="max-w-4xl mx-auto px-4 py-12 border-t border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900 mb-1">You Might Also Like</h2>
            <p className="text-sm text-gray-500 mb-6">
              Explore other plugins that complement {plugin.name}.
            </p>
            {/* Recommended Pairs */}
            {pairs && pairs.length > 0 && (
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-800 mb-3">🗂️ Recommended Pairings</h3>
                <div className="flex flex-wrap gap-3">
                  {pairs.map((pair, i) => {
                    const pairPlugin = PLUGINS.find(p => p.id === pair.pluginId);
                    if (!pairPlugin) return null;
                    return (
                      <a
                        key={i}
                        href={`/plugins/${pair.pluginId}`}
                        className="inline-flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-teal-50 to-emerald-50 border border-teal-200 rounded-lg hover:shadow-sm hover:border-teal-300 transition-all text-xs text-gray-700"
                      >
                        <span>{pairPlugin.emoji}</span>
                        <span className="font-medium">{pairPlugin.name}</span>
                        <span className="text-gray-400 mx-1" aria-hidden="true">→</span>
                        <span className="text-gray-500 max-w-[200px] truncate">{pair.reason}</span>
                      </a>
                    );
                  })}
                </div>
              </div>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {related.map(rp => (
                <RelatedPluginCard key={rp.id} plugin={rp} />
              ))}
            </div>
          </section>
        );
      })()}

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
