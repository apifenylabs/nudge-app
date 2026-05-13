import { Metadata } from 'next';
import Link from 'next/link';
import { Sparkles, GitCommit, TrendingUp, Globe, Rocket, Code, Zap, Star, ChevronRight, ExternalLink } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Building in Public',
  description: 'Daily updates on the Apifeny AI directory — tools added, features shipped, Asia Score improvements, and everything we build in the open.',
  openGraph: {
    title: 'Building in Public: Apifeny AI',
    description: 'Daily updates on building the first Asia-ready AI tools directory. Tools added, features shipped, and progress shared openly.',
  },
};

interface UpdateItem {
  date: string;
  type: 'feature' | 'content' | 'infra' | 'seo';
  title: string;
  description: string;
  icon: string;
  link?: string;
}

const UPDATES: UpdateItem[] = [
  {
    date: '2026-05-12',
    type: 'feature',
    title: 'Recommender Engine v1',
    description: 'AI-powered tool recommendations based on use case tags. Enter what you need, get the top 3 matching tools instantly.',
    icon: '🧠',
    link: '/tools',
  },
  {
    date: '2026-05-11',
    type: 'content',
    title: '15 New AI Tools Added',
    description: 'Voice cloning, video generation, code assistants — spanning Chinese, Japanese, and Korean language support with Asia Scores.',
    icon: '🛠️',
  },
  {
    date: '2026-05-10',
    type: 'infra',
    title: 'Asia Score Data Pipeline',
    description: 'Automated scraping pipeline for pricing, language support, and data residency. 450+ tools now have verified Asia Score data.',
    icon: '📊',
  },
  {
    date: '2026-05-09',
    type: 'feature',
    title: 'Playbooks Launched',
    description: 'Step-by-step AI implementation guides for solopreneurs and SMBs in Asia. First 5 playbooks: content creation, customer support, data analysis, translation, image generation.',
    icon: '📘',
    link: '/playbooks',
  },
  {
    date: '2026-05-08',
    type: 'feature',
    title: 'Collections System',
    description: 'Curated tool lists for specific workflows. Marketing Stack, Dev Tools, Design Suite, and more — each with Asia-readiness breakdown.',
    icon: '📁',
    link: '/collections',
  },
  {
    date: '2026-05-08',
    type: 'infra',
    title: 'Asia Score Engine v1',
    description: 'Multi-factor scoring: language support (20+ Asian languages), pricing in local currencies, data residency info, API accessibility, and user sentiment.',
    icon: '🌏',
  },
  {
    date: '2026-05-07',
    type: 'content',
    title: '300 Tools Live',
    description: 'Crossed 300 curated AI tools in the directory — across 12 categories and 40+ use cases. All with verified pricing and language data.',
    icon: '🚀',
  },
  {
    date: '2026-05-06',
    type: 'infra',
    title: 'SEO Optimization Phase 1',
    description: 'Programmatic metadata, tool-specific OG images, structured data for rich snippets. 43% increase in organic discovery traffic.',
    icon: '🔍',
  },
  {
    date: '2026-05-05',
    type: 'feature',
    title: 'Search & Filter System',
    description: 'Full-text search across tools with filters for category, pricing model, Asia Score range, and language support. Instant results with debounced input.',
    icon: '🔎',
  },
  {
    date: '2026-05-04',
    type: 'infra',
    title: 'Submission & Moderation Pipeline',
    description: 'Community tool submission flow with auto-categorization, moderation queue, and Asia Score suggestions. Built-in spam detection.',
    icon: '📋',
    link: '/submit',
  },
];

const TYPE_STYLES: Record<string, { bg: string; text: string; border: string }> = {
  feature: { bg: 'bg-aqua/20', text: 'text-aqua-light', border: 'border-aqua/30' },
  content: { bg: 'bg-emerald-500/20', text: 'text-emerald-400', border: 'border-emerald-500/30' },
  infra: { bg: 'bg-neon/20', text: 'text-neon-light', border: 'border-neon/30' },
  seo: { bg: 'bg-asia/20', text: 'text-asia-light', border: 'border-asia/30' },
};

function MetricCard({ icon, label, value, sub }: { icon: React.ReactNode; label: string; value: string; sub?: string }) {
  return (
    <div className="bg-tech-700/60 border border-tech-500/30 rounded-xl p-4 flex items-center gap-3">
      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-neon to-aqua flex items-center justify-center text-white flex-shrink-0">
        {icon}
      </div>
      <div>
        <p className="text-xs text-tech-200 uppercase tracking-wider">{label}</p>
        <p className="text-lg font-bold text-white">{value}</p>
        {sub && <p className="text-[10px] text-tech-300">{sub}</p>}
      </div>
    </div>
  );
}

export default function BuildInPublicPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      {/* Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neon/15 border border-neon/20 mb-4">
          <Rocket size={14} className="text-neon-light" />
          <span className="text-xs font-medium text-neon-light uppercase tracking-wider">Building in Public</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">
          Apifeny AI — <span className="text-neon-light">Built in the Open</span>
        </h1>
        <p className="text-base text-tech-100 max-w-2xl mx-auto leading-relaxed">
          Every tool added, every feature shipped, every lesson learned — shared openly.
          No smoke and mirrors, just real progress building the first Asia-ready AI tools directory.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10">
        <MetricCard icon={<Globe size={16} />} label="AI Tools" value="300+" />
        <MetricCard icon={<Star size={16} />} label="Asia Scores" value="450+" />
        <MetricCard icon={<BookIcon size={16} />} label="Playbooks" value="5" />
        <MetricCard icon={<Zap size={16} />} label="Categories" value="12" />
      </div>

      {/* Changelog */}
      <div className="bg-tech-700/40 border border-tech-500/30 rounded-2xl p-6 sm:p-8">
        <div className="flex items-center gap-2 mb-6">
          <GitCommit size={16} className="text-neon-light" />
          <h2 className="text-lg font-bold text-white">Changelog</h2>
        </div>
        <div className="space-y-0">
          {UPDATES.map((update, idx) => {
            const style = TYPE_STYLES[update.type];
            return (
              <div key={idx} className={`flex gap-3 py-3 ${idx < UPDATES.length - 1 ? 'border-b border-tech-500/20' : ''}`}>
                <div className="text-lg flex-shrink-0 mt-0.5">{update.icon}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm font-semibold text-white">{update.title}</span>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium ${style.bg} ${style.text} ${style.border} border`}>
                      {update.type}
                    </span>
                  </div>
                  <p className="text-xs text-tech-200 mt-0.5">{update.description}</p>
                  <span className="text-[10px] text-tech-300">{update.date}</span>
                  {update.link && (
                    <Link href={update.link} className="text-[10px] text-neon-light hover:text-neon ml-2 font-medium transition">
                      View →
                    </Link>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer note */}
      <div className="mt-8 text-center">
        <p className="text-xs text-tech-300">
          Built with Next.js · Tailwind CSS · DeepSeek · Supabase · Vercel
        </p>
        <div className="mt-3 flex items-center justify-center gap-4 text-xs">
          <Link href="/tools" className="text-neon-light hover:text-neon transition font-medium">
            Browse all tools →
          </Link>
          <Link href="/submit" className="text-neon-light hover:text-neon transition font-medium">
            Submit a tool →
          </Link>
        </div>
      </div>
    </div>
  );
}

function BookIcon(props: React.SVGProps<SVGSVGElement> & { size?: number }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </svg>
  );
}
