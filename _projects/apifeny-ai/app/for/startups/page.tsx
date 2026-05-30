import { Metadata } from 'next';
import Link from 'next/link';
import {
  TrendingUp,
  Rocket,
  DollarSign,
  Target,
  Users,
  BarChart3,
  PenTool,
  Zap,
  Globe,
  Smartphone,
  CheckCircle,
  ArrowRight,
  BookOpen,
  LineChart,
  Sparkles,
  Shield,
  Timer,
  Puzzle,
} from 'lucide-react';
import { toolsData } from '@/lib/data';
import { playbooks } from '@/lib/playbooks';
import type { Playbook } from '@/lib/playbooks';

const BASE_URL = 'https://apifeny-ai.vercel.app';

export const metadata: Metadata = {
  title: 'Best AI Tools for Startups in Asia (2026) — Lean, Scalable, Affordable | Apifeny AI',
  description:
    'Curated AI tools for startups in Asia. Reduce costs, automate operations, and grow faster with tools vetted for Asian markets — multi-language, super-app ready, startup-priced.',
  keywords: [
    'AI tools for startups',
    'startup AI tools Asia',
    'AI tools for entrepreneurs',
    'startup automation AI',
    'AI tools for small business Asia',
    'AI productivity tools startups',
    'AI marketing for startups',
    'AI customer support startups',
    'AI sales tools Asia',
    'startup growth tools AI',
    'AI no-code tools',
    'AI analytics for startups',
    'cheap AI tools Asia',
    'AI tools for lean startups',
    'AI tools Singapore startups',
    'AI tools SE Asia startups',
  ],
  openGraph: {
    title: 'Best AI Tools for Startups in Asia (2026)',
    description: '50+ AI tools curated for startup founders in Asia — automation, marketing, sales, support, and growth.',
    url: `${BASE_URL}/for/startups`,
    type: 'website',
    siteName: 'Apifeny AI',
    locale: 'en_US',
    images: [{ url: `${BASE_URL}/og-startups.png`, width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best AI Tools for Startups in Asia (2026)',
    description: '50+ AI tools curated for startup founders in Asia.',
  },
  alternates: { canonical: `${BASE_URL}/for/startups` },
};

// ── Tool categories ──

interface CategorySection {
  id: string;
  title: string;
  emoji: string;
  description: string;
  icon: React.ReactNode;
  toolSlugs: string[];
}

const CATEGORIES: CategorySection[] = [
  {
    id: 'productivity',
    title: 'Productivity & Operations',
    emoji: '⚡',
    description: 'Automate operations, reduce overhead, and keep your lean team focused on what matters.',
    icon: <Zap className="w-5 h-5" />,
    toolSlugs: [
      'notion-ai', 'chatgpt', 'claude-ai', 'jasper-ai', 'copy-ai',
      'gamma-ai', 'otter-ai', 'fireflies-ai', 'taskade-ai', 'mem-ai',
    ],
  },
  {
    id: 'marketing',
    title: 'Marketing & Growth',
    emoji: '📈',
    description: 'Acquire users on a budget with AI-powered SEO, content, social, and paid ads.',
    icon: <TrendingUp className="w-5 h-5" />,
    toolSlugs: [
      'semrush', 'ahrefs', 'surfer-seo', 'writer-ai', 'writesonic',
      'copy-ai', 'canva-ai', 'pictory-ai', 'hubspot-ai', 'chatgpt',
    ],
  },
  {
    id: 'sales-crm',
    title: 'Sales & CRM',
    emoji: '🤝',
    description: 'Close deals faster with AI-powered CRM, lead scoring, and outreach automation.',
    icon: <Target className="w-5 h-5" />,
    toolSlugs: [
      'hubspot-ai', 'salesforce-einstein', 'clay-ai', 'apify', 'claude-ai',
      'chatgpt', 'notion-ai', 'copy-ai', 'jasper-ai', 'd-id',
    ],
  },
  {
    id: 'support',
    title: 'Customer Support',
    emoji: '💬',
    description: 'Scale support without scaling headcount. AI chatbots, ticket automation, and knowledge bases.',
    icon: <Users className="w-5 h-5" />,
    toolSlugs: [
      'intercom-ai', 'zendesk-ai', 'freshdesk-mentions', 'chatgpt',
      'claude-ai', 'otter-ai', 'fireflies-ai', 'hubspot-ai',
    ],
  },
  {
    id: 'analytics',
    title: 'Analytics & Data',
    emoji: '📊',
    description: 'Make data-driven decisions with AI-powered analytics, dashboards, and reporting.',
    icon: <BarChart3 className="w-5 h-5" />,
    toolSlugs: [
      'apify', 'notion-ai', 'otter-ai', 'fireflies-ai', 'chatgpt',
      'claude-ai', 'hubspot-ai', 'gamma-ai',
    ],
  },
  {
    id: 'content',
    title: 'Content & Design',
    emoji: '🎨',
    description: 'Create professional content and designs at startup speed with AI creative tools.',
    icon: <PenTool className="w-5 h-5" />,
    toolSlugs: [
      'canva-ai', 'gamma-ai', 'pictory-ai', 'd-id', 'copy-ai',
      'writesonic', 'chatgpt', 'claude-ai', 'jasper-ai', 'surfer-seo',
    ],
  },
  {
    id: 'dev',
    title: 'Development & No-Code',
    emoji: '💻',
    description: 'Ship faster with AI coding assistants, no-code builders, and automation platforms.',
    icon: <Puzzle className="w-5 h-5" />,
    toolSlugs: [
      'claude-ai', 'chatgpt', 'notion-ai', 'apify', 'taskade-ai',
      'zapier', 'make', 'bubble-io', 'retool',
    ],
  },
  {
    id: 'finance',
    title: 'Finance & Admin',
    emoji: '💰',
    description: 'Keep your startup lean with AI-powered bookkeeping, invoicing, and financial planning.',
    icon: <DollarSign className="w-5 h-5" />,
    toolSlugs: [
      'notion-ai', 'chatgpt', 'claude-ai', 'hubspot-ai', 'apify',
      'taskade-ai',
    ],
  },
];

// ── Startup-specific section ──
const STARTUP_TIPS = [
  { emoji: '💸', tip: 'Most tools offer startup discounts — always check for YC, Techstars, or AngelList perks' },
  { emoji: '🌏', tip: 'Asian platforms like WeChat Work and LINE offer free AI tiers for small teams' },
  { emoji: '🔄', tip: 'Start with multi-purpose tools (ChatGPT, Claude, Notion AI) before buying specialized ones' },
  { emoji: '📱', tip: 'Prioritize tools with WeChat / LINE / WhatsApp integrations for Asian markets' },
  { emoji: '⚡', tip: 'Use no-code AI automation (Apify, Zapier) before hiring — you can handle 80% solo' },
  { emoji: '📊', tip: 'Track ROI monthly — if an AI tool costs more than a junior hire, replace it' },
];

// ── Helpers ──

function getToolPriceLevel(slug: string): string {
  const tool = toolsData.find((t) => t.slug === slug);
  if (!tool) return '$';
  const tier = tool.pricing_tier;
  if (tier === 'Free' || tier === 'Freemium' || tier === 'Open Source') return 'Free';
  const minPrice = tool.pricing_min_usd;
  if (minPrice !== undefined) {
    if (minPrice === 0) return 'Free';
    if (minPrice < 20) return 'Budget';
    if (minPrice < 100) return 'Mid';
    return 'Premium';
  }
  if (tier === 'Enterprise') return 'Premium';
  return 'Varies';
}

function getToolName(slug: string): string {
  const tool = toolsData.find((t) => t.slug === slug);
  return tool?.name || slug;
}

function getBlogLink(slug: string): string | null {
  return null; // Placeholder for future blog links
}

export default function ForStartupsPage() {
  const filteredPlaybooks = playbooks.filter(
    (p: Playbook) =>
      p.slug === 'ai-solopreneur-toolkit' ||
      p.slug === 'ai-workflow-automation' ||
      p.slug === 'ai-marketing-for-asia' ||
      p.slug === 'ai-content-creation-busy-founders' ||
      p.slug === 'ai-sales-funnel-builder' ||
      p.slug === 'directory-builder'
  );

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* SEO breadcrumb */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            name: 'AI Tools for Startups in Asia',
            description: 'Curated AI tools for startup founders in Asian markets.',
            url: `${BASE_URL}/for/startups`,
            isPartOf: { '@type': 'WebSite', name: 'Apifeny AI', url: BASE_URL },
          }),
        }}
      />

      {/* ── Hero ── */}
      <section className="relative overflow-hidden px-4 py-16 sm:py-24">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50" />
        <div className="relative mx-auto max-w-4xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-1.5 text-sm font-medium text-blue-700">
            <Rocket className="h-4 w-4" /> For Startups
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
            AI Tools for Startups in Asia
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
            Curated AI tools that help Asian startups ship faster, spend less, and grow smarter.
            Every tool tested for multi-language support, local pricing, and super-app integration.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3 text-sm text-slate-500">
            <span className="flex items-center gap-1"><CheckCircle className="h-4 w-4 text-green-500" /> 50+ tools curated</span>
            <span className="flex items-center gap-1"><CheckCircle className="h-4 w-4 text-green-500" /> 8 categories</span>
            <span className="flex items-center gap-1"><CheckCircle className="h-4 w-4 text-green-500" /> Asian-market tested</span>
            <span className="flex items-center gap-1"><CheckCircle className="h-4 w-4 text-green-500" /> 6 AI playbooks</span>
          </div>
        </div>
      </section>

      {/* ── Why Asian Startups Need Different AI Tools ── */}
      <section className="mx-auto max-w-5xl px-4 py-12">
        <h2 className="text-2xl font-bold text-slate-900 mb-6">
          Why Asian Startups Need Different AI Tools
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { emoji: '📱', title: 'Super-App Ecosystems', desc: 'WeChat, LINE, KakaoTalk, Grab — your AI tools must integrate with the platforms your users actually live in.' },
            { emoji: '💰', title: 'Price-Sensitive Markets', desc: 'Most enterprise AI tools price for US buyers. We prioritize tools with fair local pricing, free tiers, and startup discounts.' },
            { emoji: '🌐', title: 'Multi-Language by Default', desc: 'English-only AI misses the mark. We vet tools for Chinese, Japanese, Korean, Thai, Vietnamese, and Bahasa support.' },
            { emoji: '📊', title: 'Mobile-First UX', desc: 'Asia is mobile-first. Your AI stack should work beautifully on a phone, not just a desktop.' },
            { emoji: '🔒', title: 'Data Compliance', desc: 'Singapore PDPA, HK PDPO, China PIPL, Japan APPI — your AI tools must respect local data laws.' },
            { emoji: '⚡', title: 'Lean & Fast', desc: 'Asian startups move fast. We pick tools that don\'t need onboarding, training, or dedicated IT support.' },
          ].map((item) => (
            <div key={item.title} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="mb-2 text-2xl">{item.emoji}</div>
              <h3 className="font-semibold text-slate-900">{item.title}</h3>
              <p className="mt-1 text-sm text-slate-500">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Category sections ── */}
      {CATEGORIES.map((cat) => {
        const tools = cat.toolSlugs.map((slug) => {
          const tool = toolsData.find((t) => t.slug === slug);
          return tool ? { slug, name: tool.name, price: getToolPriceLevel(slug) } : { slug, name: slug, price: getToolPriceLevel(slug) };
        });

        return (
          <section key={cat.id} className="mx-auto max-w-5xl px-4 py-10" id={cat.id}>
            <div className="mb-6 flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
                {cat.icon}
              </span>
              <div>
                <h2 className="text-xl font-bold text-slate-900">{cat.emoji} {cat.title}</h2>
                <p className="text-sm text-slate-500">{cat.description}</p>
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {tools.map((t) => (
                <Link
                  key={t.slug}
                  href={`/tools/${t.slug}`}
                  className="group flex items-center justify-between rounded-lg border border-slate-200 bg-white px-4 py-3 transition hover:border-blue-300 hover:shadow-sm"
                >
                  <span className="font-medium text-slate-800 group-hover:text-blue-600">{t.name}</span>
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                    t.price === 'Free' ? 'bg-green-100 text-green-700' :
                    t.price === 'Budget' ? 'bg-blue-100 text-blue-700' :
                    t.price === 'Mid' ? 'bg-yellow-100 text-yellow-700' :
                    t.price === 'Premium' ? 'bg-red-100 text-red-700' :
                    'bg-slate-100 text-slate-600'
                  }`}>
                    {t.price}
                  </span>
                </Link>
              ))}
            </div>
          </section>
        );
      })}

      {/* ── Startup tips ── */}
      <section className="mx-auto max-w-5xl px-4 py-12">
        <div className="rounded-2xl border border-blue-200 bg-blue-50 p-6 sm:p-8">
          <h2 className="mb-4 text-xl font-bold text-slate-900 flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-blue-500" />
            Startup Tips from the Apifeny Team
          </h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {STARTUP_TIPS.map((tip) => (
              <div key={tip.tip} className="flex items-start gap-3 rounded-xl bg-white p-4 shadow-sm">
                <span className="text-lg">{tip.emoji}</span>
                <p className="text-sm text-slate-600">{tip.tip}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Comparison table: top 10 AI tools for startups ── */}
      <section className="mx-auto max-w-5xl px-4 py-12">
        <h2 className="mb-6 text-2xl font-bold text-slate-900">
          Top 10 AI Tools for Startups in Asia
        </h2>
        <div className="overflow-x-auto rounded-xl border border-slate-200">
          <table className="min-w-full text-sm">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-4 py-3 text-left font-semibold text-slate-700">Tool</th>
                <th className="px-4 py-3 text-left font-semibold text-slate-700">Best For</th>
                <th className="px-4 py-3 text-left font-semibold text-slate-700">Price</th>
                <th className="px-4 py-3 text-left font-semibold text-slate-700">Asia Score</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {[
                { name: 'ChatGPT', best: 'General, writing, coding', price: 'Free / $20', asia: '★★★★★' },
                { name: 'Claude AI', best: 'Analysis, research, coding', price: 'Free / $20', asia: '★★★★★' },
                { name: 'Notion AI', best: 'Docs, wikis, project mgmt', price: '$10/mo', asia: '★★★★☆' },
                { name: 'Canva AI', best: 'Design, social graphics', price: 'Free / $13', asia: '★★★★★' },
                { name: 'Apify', best: 'Web scraping, automation', price: 'Free tier', asia: '★★★★☆' },
                { name: 'HubSpot AI', best: 'CRM, marketing, sales', price: 'Free / $45', asia: '★★★★☆' },
                { name: 'Surfer SEO', best: 'SEO content optimization', price: '$89/mo', asia: '★★★★☆' },
                { name: 'Zapier AI', best: 'Workflow automation', price: 'Free / $20', asia: '★★★☆☆' },
                { name: 'Gamma AI', best: 'Presentations, proposals', price: 'Free / $8', asia: '★★★★☆' },
                { name: 'D-ID', best: 'AI video avatars', price: '$5.90/mo', asia: '★★★★☆' },
              ].map((row) => (
                <tr key={row.name} className="hover:bg-slate-50">
                  <td className="px-4 py-3 font-medium text-slate-900">{row.name}</td>
                  <td className="px-4 py-3 text-slate-600">{row.best}</td>
                  <td className="px-4 py-3 text-slate-600">{row.price}</td>
                  <td className="px-4 py-3 text-slate-600">{row.asia}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ── Recommended Playbooks ── */}
      <section className="mx-auto max-w-5xl px-4 py-12">
        <h2 className="mb-6 text-2xl font-bold text-slate-900 flex items-center gap-2">
          <BookOpen className="h-6 w-6 text-blue-500" />
          AI Playbooks for Startups
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredPlaybooks.map((p) => (
            <Link
              key={p.slug}
              href={`/playbooks/${p.slug}`}
              className="group rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-blue-300 hover:shadow-md"
            >
              <div className="mb-2 flex items-center gap-2">
                <h3 className="font-semibold text-slate-900 group-hover:text-blue-600">{p.title}</h3>
              </div>
              <p className="text-sm text-slate-500 line-clamp-2">{p.description}</p>
              <div className="mt-3 flex items-center gap-1 text-sm font-medium text-blue-600">
                View playbook <ArrowRight className="h-4 w-4" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Newsletter CTA ── */}
      <section className="mx-auto max-w-3xl px-4 py-16 text-center">
        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-bold text-slate-900">
            Get Startup AI Tools Delivered Weekly
          </h2>
          <p className="mt-2 text-slate-500">
            Our newsletter covers new AI tools, Asian-market tips, and startup hacks every week.
          </p>
          <div className="mx-auto mt-6 flex max-w-md gap-2">
            <input
              type="email"
              placeholder="you@startup.com"
              className="flex-1 rounded-lg border border-slate-300 px-4 py-2.5 text-sm focus:border-blue-500 focus:outline-none"
            />
            <button className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700">
              Subscribe
            </button>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="mx-auto max-w-3xl px-4 py-12">
        <h2 className="mb-6 text-2xl font-bold text-slate-900">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {[
            { q: 'What defines a "startup AI tool"?', a: 'We look for tools that offer fair pricing for small teams, quick onboarding (no enterprise sales cycle), multi-language support for Asian markets, and integration with popular local platforms like WeChat, LINE, or Grab.' },
            { q: 'Are these tools affordable for pre-revenue startups?', a: 'Many of the tools we recommend have free tiers or startup discounts (e.g., Notion AI is $10/mo, ChatGPT is free). We mark price levels clearly so you can choose based on your budget.' },
            { q: 'Do these tools work in Chinese / Japanese / Korean?', a: 'Yes — every tool in our curation has been tested for multi-language support. We flag tools that are especially strong in CJK (Chinese, Japanese, Korean) and Southeast Asian languages.' },
            { q: 'Can I use these tools solo as a founder?', a: 'Absolutely. Most tools are designed for small teams and solo founders. We especially recommend starting with ChatGPT, Claude, Notion AI, and Canva AI — they cover 80% of common startup needs.' },
            { q: 'How often is this list updated?', a: 'We update monthly based on new tool releases, pricing changes, and community feedback. Bookmark this page and check back for new additions.' },
          ].map((faq) => (
            <details key={faq.q} className="group rounded-xl border border-slate-200 bg-white">
              <summary className="flex cursor-pointer items-center justify-between px-5 py-4 text-sm font-semibold text-slate-900">
                {faq.q}
                <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <div className="px-5 pb-4 text-sm text-slate-600">{faq.a}</div>
            </details>
          ))}
        </div>
      </section>

      {/* ── Footer nav ── */}
      <section className="mx-auto max-w-5xl px-4 py-8 border-t border-slate-200">
        <div className="flex flex-wrap gap-3 justify-center text-sm">
          <Link href="/for/solopreneurs" className="text-blue-600 hover:underline">For Solopreneurs</Link>
          <Link href="/for/developers" className="text-blue-600 hover:underline">For Developers</Link>
          <Link href="/for/marketers" className="text-blue-600 hover:underline">For Marketers</Link>
          <Link href="/guides/how-to-choose-ai-tools" className="text-blue-600 hover:underline">How to Choose AI Tools</Link>
          <Link href="/best-ai-tools" className="text-blue-600 hover:underline">Best AI Tools</Link>
        </div>
      </section>
    </main>
  );
}
