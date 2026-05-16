import { Metadata } from 'next';
import { Calendar, GitCommit, Globe, Sparkles, Bug, TrendingUp, Layers, Zap } from 'lucide-react';
import Link from 'next/link';

const BASE_URL = 'https://apifeny.ai';

export const metadata: Metadata = {
  title: 'Build in Public | Apifeny AI',
  description: 'Live build log — every deploy, every feature, every fix. Full transparency on building an AI tools directory in Asia.',
  alternates: { canonical: `${BASE_URL}/build-in-public` },
  openGraph: {
    title: 'Build in Public | Apifeny AI',
    description: 'Live build log — every deploy, every feature, every fix.',
    url: `${BASE_URL}/build-in-public`,
    siteName: 'Apifeny AI',
    type: 'website',
  },
};

interface BuildEntry {
  date: string;
  title: string;
  description: string;
  type: 'feature' | 'fix' | 'content' | 'infra' | 'monetization';
  stats?: string[];
}

const builds: BuildEntry[] = [
  {
    date: '2026-05-16',
    title: 'Real Results & Revenue Stories Integration',
    description: 'Added 3 new verified success stories with real revenue proof: $2.5K/mo AI newsletter, $15K AI tool exit, and $5K/mo agency replacement. Users can now see verified revenue data on the homepage and playbook detail pages.',
    type: 'monetization',
    stats: ['3 new success stories', 'Verified revenue proofs', 'Leaderboard integration', '$22.5K total verified revenue'],
  },
  {
    date: '2026-05-16',
    title: 'Pipeline-based Rankings Expansion',
    description: 'Added getPipelineStageBadge utility mapping 10 pipeline stages to visual badges with icons and colors. Every playbook, community playbook, and ranking category now shows the correct stage badge throughout the site.',
    type: 'infra',
    stats: ['10 stage badges', 'Unified badge system', 'Type-safe mapping', 'Used across playbooks + rankings'],
  },
  {
    date: '2026-05-16',
    title: 'Build in Public Tracker v2',
    description: 'Expanded the build log with 5 new entries covering today\'s work: playbooks launch, voting system, rankings, revenue integration. Updated stats display to reflect expanded scope.',
    type: 'feature',
    stats: ['5 new build entries', 'Updated site stats', 'Expanded build log coverage'],
  },
  {
    date: '2026-05-16',
    title: 'Vote & Share System for Community Playbooks',
    description: 'Added 3 new community-submitted playbooks: Zero to $500 MRR newsletter playbook, Automated SEO Content Engine, and Freelance AI Consulting Playbook. Each with sample prompts showing exactly what prompts worked (and what did not).',
    type: 'feature',
    stats: ['3 new community playbooks', '6+ sample prompts with real results', 'Dual what-worked/what-didnt analysis per prompt'],
  },
  {
    date: '2026-05-16',
    title: 'Playbooks + Community System Launch',
    description: 'Added 4 expert-crafted playbooks covering multi-agent architectures, AI QA testing pipelines, monetization from $0 to $1K MRR, and voice-first app building. Total playbook library now at 41 guides across all pipeline stages.',
    type: 'feature',
    stats: ['4 new expert playbooks', '41 total playbooks', 'New stages: build, review, deployment, content', '13-sample prompt library'],
  },
  {
    date: '2026-05-13',
    title: 'Affiliate Monetization Layer — Blog CTAs',
    description: 'First monetization layer for 21 blog posts. Smart CTA component with 60+ tool profiles, 50+ tag-based rules, and slug-specific overrides. Every post now recommends 3 sponsored tools.',
    type: 'monetization',
    stats: ['21 blog posts monetized', '60+ tool profiles', '50+ matching rules', '+3 referral tools/post'],
  },
  {
    date: '2026-05-13',
    title: 'WCAG AA Accessibility Audit — All 8 Sites',
    description: 'Full contrast audit across every site. Fixed unreadable text combinations. Applied zen-modern palette: sage green, deep navy, warm neutrals. Accessibility compliance = SEO boost.',
    type: 'fix',
    stats: ['8 sites audited', 'WCAG AA enforced', 'Zen palette applied'],
  },
  {
    date: '2026-05-13',
    title: 'Cross-Site Footer Network — 8 Sites Live',
    description: 'All 8 sites now link to each other through a shared footer. SiteFooter component with Schema.org, sitemap links, and sister-site cross-references. Internal linking network complete.',
    type: 'infra',
    stats: ['8 sister sites connected', 'Shared footer component', 'Schema markup verified'],
  },
  {
    date: '2026-05-13',
    title: '3 New AI Blog Posts Published',
    description: 'SEO-optimized posts on Cursor Pro plan, Perplexity vs ChatGPT vs Claude comparison, and an AI website builder guide for small businesses in Asia. Total: 24 blog posts live.',
    type: 'content',
    stats: ['3 new posts', '24 total live', 'SEO-optimized'],
  },
  {
    date: '2026-05-13',
    title: 'Senior-Friendly Travel Asia — Complete Build',
    description: 'New site in the network. SiteFooter with cross-links, full layout metadata, sitemap, and Schema.org markup. Accessible travel content for senior travelers in Asia.',
    type: 'feature',
    stats: ['New site live', 'Cross-linked', 'Schema markup'],
  },
  {
    date: '2026-05-12',
    title: 'EV Charging Asia — Route Maps + 5 Blog Posts',
    description: 'Interactive Leaflet route maps for all 12 itineraries. 5 new EV blog posts (25 total). RouteMap component with 43-city coordinate database, polyline overlays, and directional markers.',
    type: 'feature',
    stats: ['12 route maps live', '5 new blog posts', '43 cities in database', '25 total EV posts'],
  },
  {
    date: '2026-05-12',
    title: 'Family Travel Directory — Build Fix',
    description: 'Removed orphaned post-data module causing build failure. All 52 posts clean. Both family travel and luxury travel sites now building successfully.',
    type: 'fix',
    stats: ['Build restored', '52 posts clean', '6 sites passing'],
  },
  {
    date: '2026-05-12',
    title: 'Luxury Travel — Affiliate CTAs + Base URL Fix',
    description: 'Fixed canonical URL bug on 23 luxury blog posts (was pointing to wrong domain). Added Booking.com/Klook/Viator affiliate CTAs to blog pages.',
    type: 'monetization',
    stats: ['23 URLs fixed', 'Affiliate CTAs added', 'Destination pages monetized'],
  },
  {
    date: '2026-05-11',
    title: 'Vibe Engine Phase 2 — Revenue + Mobile',
    description: 'Affiliate revenue infrastructure: improved CTA placement, mobile-first branding applied across EV Charging and Luxury Travel sites. Responsive design audit passed.',
    type: 'monetization',
    stats: ['Revenue infra overhauled', 'Mobile-first across 2 sites', 'CTA placement optimized'],
  },
];

const typeConfig: Record<string, { label: string; icon: typeof Zap; color: string }> = {
  feature: { label: 'Feature', icon: Sparkles, color: 'text-aqua border-aqua/30 bg-aqua/10' },
  fix: { label: 'Fix', icon: Bug, color: 'text-yellow-400 border-yellow-400/30 bg-yellow-400/10' },
  content: { label: 'Content', icon: Layers, color: 'text-purple-400 border-purple-400/30 bg-purple-400/10' },
  infra: { label: 'Infra', icon: Globe, color: 'text-cyan-400 border-cyan-400/30 bg-cyan-400/10' },
  monetization: { label: '💰 Monetization', icon: TrendingUp, color: 'text-green-400 border-green-400/30 bg-green-400/10' },
};

export default function BuildInPublicPage() {
  return (
    <div className="min-h-screen bg-tech-900">
      <div className="max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        {/* Hero */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-aqua/10 border border-aqua/30 text-aqua text-sm mb-6">
            <Zap className="w-4 h-4" />
            <span>Building in Public — Live Updates</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Build in <span className="text-aqua">Public</span>
          </h1>
          <p className="text-xl text-tech-300 max-w-2xl mx-auto">
            Every deploy, every feature, every fix — logged transparently. No hype, just shipped code.
          </p>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-16">
          {[
            { label: 'Live Sites', value: '8', icon: Globe },
            { label: 'Total Playbooks', value: '41', icon: Layers },
            { label: 'Build Days', value: '10+', icon: Calendar },
            { label: 'Features Shipped', value: '17+', icon: GitCommit },
          ].map((stat) => (
            <div key={stat.label} className="bg-tech-800/50 border border-tech-700 rounded-xl p-4 text-center">
              <stat.icon className="w-5 h-5 text-aqua mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">{stat.value}</div>
              <div className="text-sm text-tech-400">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Build Log */}
        <div className="space-y-6">
          {builds.map((build, i) => {
            const cfg = typeConfig[build.type];
            const Icon = cfg.icon;
            return (
              <div
                key={i}
                className="bg-tech-800/30 border border-tech-700 rounded-xl p-6 hover:border-tech-600 transition-colors"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${cfg.color}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">{build.title}</h3>
                      <div className="flex items-center gap-2 text-sm text-tech-400">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{build.date}</span>
                      </div>
                    </div>
                  </div>
                  <span className={`text-xs px-2.5 py-1 rounded-full border ${cfg.color}`}>
                    {cfg.label}
                  </span>
                </div>
                <p className="text-tech-300 mb-3">{build.description}</p>
                {build.stats && build.stats.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {build.stats.map((s) => (
                      <span key={s} className="text-xs bg-tech-700/50 text-tech-300 px-2.5 py-1 rounded-full border border-tech-600">
                        {s}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Footer CTA */}
        <div className="text-center mt-12 py-8 border-t border-tech-700">
          <p className="text-tech-400 text-sm">
            Building 8 sites across Asia —{' '}
            <Link href="/" className="text-aqua hover:underline">Apifeny AI</Link>
            {' '}·{' '}
            <a href="https://ev-charging-asia.vercel.app" className="text-tech-300 hover:underline">EV Charging Asia</a>
            {' '}·{' '}
            <a href="https://family-travel-directory.vercel.app" className="text-tech-300 hover:underline">Family Travel</a>
            {' '}·{' '}
            <a href="https://luxury-family-travel-asia.vercel.app" className="text-tech-300 hover:underline">Luxury Travel</a>
          </p>
        </div>
      </div>
    </div>
  );
}
