'use client';

import SeoMetadata from '@/components/SeoMetadata';
import { useState, Suspense } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  Download,
  CheckCircle,
  BookOpen,
  Users,
  Target,
  Zap,
  TrendingUp,
  DollarSign,
  Star,
  Clock,
  Sparkles,
  Lightbulb,
  ChevronRight,
  ShoppingCart,
  FileText,
  Rocket,
  Search as SearchIcon,
  BarChart3,
  Globe,
  Search,
  Layers,
  Code,
  BarChart,
} from 'lucide-react';

interface Section {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  items: string[];
}

const sections: Section[] = [
  {
    id: 'niche',
    icon: <Search className="w-5 h-5 text-emerald-400" />,
    title: 'Niche Selection & Validation',
    description: 'Find a profitable niche using AI and a 5-factor validation framework.',
    items: [
      'Using Perplexity + ChatGPT to identify underserved directory opportunities',
      'The 5-factor niche scoring framework: search volume, CPC, competition, affiliate availability, growth trend',
      'How to validate demand before building anything',
      'Competitor analysis: what to look for in existing directories',
      'Avoiding trap niches with high competition but low monetization potential',
      'The ideal niche profile: 500-5K monthly searches, 3+ affiliate programs, 4%+ commissions',
    ],
  },
  {
    id: 'architecture',
    icon: <Layers className="w-5 h-5 text-cyan-400" />,
    title: 'Content Architecture & Data Model',
    description: 'Design the data structure that powers your directory.',
    items: [
      'Designing your entity model: what are you listing? (venues, tools, services, products)',
      'Core entity types: listings, categories, blog posts and how they relate',
      'Attribute mapping: what matters for rankings and filters?',
      'Ranking factor design with scoring weights',
      'Filter taxonomy: location, price, rating, category, features',
      'Using ChatGPT to design the schema and Claude to harden it',
    ],
  },
  {
    id: 'build',
    icon: <Code className="w-5 h-5 text-fuchsia-400" />,
    title: 'Build with Cursor + Next.js',
    description: 'Scaffold and build the directory using Cursor Agent mode.',
    items: [
      'Scaffolding a Next.js project with Tailwind CSS using Cursor Agent',
      'Dynamic routing: listing pages, category pages, blog pages',
      'Category filtering and search implementation',
      'Ranking and scoring display on listing cards and detail pages',
      'Affiliate link integration strategy',
      'SEO metadata generation for every page',
      'Using generateStaticParams for pre-rendered pages',
    ],
  },
  {
    id: 'ranking',
    icon: <BarChart className="w-5 h-5 text-amber-400" />,
    title: 'Implement the Ranking Algorithm',
    description: 'Build a multi-factor ranking system — your directory moat.',
    items: [
      'Community rating (35%): user reviews and star ratings',
      'Trending score (20%): recent engagement metrics',
      'Editorial picks (15%): curated selections by category',
      'Saves and bookmarks (10%): what users save signals quality',
      'Recency weighting (10%): newer listings get a temporary boost',
      'Regional relevance (10%): location-based ranking adjustments',
      'Storing rankings as a flat JSON file updated via build hook',
    ],
  },
  {
    id: 'monetization',
    icon: <DollarSign className="w-5 h-5 text-green-400" />,
    title: 'Affiliate Monetization Setup',
    description: 'Monetize through strategic affiliate commission placements.',
    items: [
      'Integrating affiliate programs: Booking.com, Klook, Viator, Agoda, Amazon, ShareASale',
      'Contextual placement within listing content',
      'Comparison tables with affiliate CTAs',
      'Featured and sponsored listing tiers',
      'Exit-intent discount popups with affiliate links',
      'Using rel="sponsored" nofollow for Google compliance',
    ],
  },
  {
    id: 'seo',
    icon: <TrendingUp className="w-5 h-5 text-sky-400" />,
    title: 'SEO & Content Automation',
    description: 'Drive organic traffic with automated SEO on autopilot.',
    items: [
      'Generating sitemap.xml programmatically for all listing and category pages',
      'AI blog content generation pipeline: 3-5 posts per week',
      'Internal linking strategy: every page links to 3+ related pages',
      'Schema.org markup for rich snippets (LocalBusiness, Product, FAQ)',
      'Cross-linking all directories in your portfolio for network effects',
    ],
  },
  {
    id: 'network',
    icon: <Globe className="w-5 h-5 text-violet-400" />,
    title: 'Cross-Site Network Effects',
    description: 'Build a portfolio of directories that feed each other traffic.',
    items: [
      'Shared footer with links to all sibling directory sites',
      'Navigation bar with portfolio dropdown',
      'Related content recommendations across different directories',
      'Unified search across the entire portfolio',
      'Cross-site blog posts that reference listings on other directories',
      'Traffic multiplier effect: each new directory boosts all existing ones',
    ],
  },
  {
    id: 'deploy',
    icon: <Rocket className="w-5 h-5 text-rose-400" />,
    title: 'Deploy & Monitor',
    description: 'Get your directory live and track performance.',
    items: [
      'Deploying to Vercel with custom domain setup',
      'Vercel Analytics + Speed Insights for performance tracking',
      'Google Search Console and GA4 configuration',
      'Uptime monitoring with betteruptime.com free tier',
      'Weekly traffic review with AI-generated insights',
    ],
  },
];
const includedItems = [
  { icons: FileText, text: 'Complete blueprint', subtext: '8 chapters, 40+ pages of actionable content' },
  { icons: Code, text: 'Ranking algorithm code', subtext: 'Multi-factor scoring system ready to deploy' },
  { icons: Zap, text: 'AI content pipeline', subtext: '3-5 blog posts per week on autopilot' },
  { icons: TrendingUp, text: 'SEO automation setup', subtext: 'Sitemaps, schema, internal linking' },
  { icons: DollarSign, text: 'Affiliate monetization guide', subtext: 'Setup for 6+ affiliate programs' },
  { icons: Globe, text: 'Cross-site network playbook', subtext: 'Build a portfolio that multiplies traffic' },
];

const whoItsFor = [
  { icons: Users, text: 'Aspiring founders', subtext: 'Launch your first income-generating directory' },
  { icons: Target, text: 'SEO professionals', subtext: 'Add directory sites to your portfolio strategy' },
  { icons: Star, text: 'Side hustlers', subtext: 'Build a passive income stream with affiliate revenue' },
  { icons: Lightbulb, text: 'Agency owners', subtext: 'Offer directory building as a service to clients' },
];

const whatYoullLearn = [
  { icons: Search, text: 'Find profitable niches', subtext: '5-factor validation framework' },
  { icons: Code, text: 'Build with Next.js + Cursor', subtext: 'Scaffold directories in days' },
  { icons: BarChart, text: 'Implement ranking algorithms', subtext: 'Multi-factor scoring system' },
  { icons: DollarSign, text: 'Monetize with affiliates', subtext: '6+ affiliate program integrations' },
];

function CheckoutOverlay({ onBack }: { onBack: () => void }) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handlePurchase = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    setStatus('idle');
    try {
      const res = await fetch('/api/create-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, product: 'directory-builder-template' }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to create checkout');
      // Redirect to Stripe Checkout
      window.location.href = data.url;
    } catch (err) {
      setStatus('error');
      setMessage(err instanceof Error ? err.message : 'Something went wrong. Please try again or contact support.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="relative max-w-md w-full bg-tech-800 border border-tech-500/30 rounded-2xl p-6 sm:p-8 shadow-2xl shadow-neon/10">
        <SeoMetadata title="Directory Builder Template — Launch a Niche Directory in Days" description="Complete blueprint for launching a profitable niche directory website. Covers Cosme-style curation, deep link engine, monetization playbooks, and AI agent squads." />
        <button onClick={onBack} className="absolute top-4 right-4 text-tech-300 hover:text-white transition" aria-label="Close">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <div className="text-center mb-6">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-400 flex items-center justify-center mb-4">
            <FileText className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-xl font-bold text-white mb-1">Directory Builder Template</h3>
          <p className="text-sm text-tech-200">Complete PDF Playbook</p>
          <div className="mt-3 inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/20">
            <DollarSign className="w-4 h-4 text-emerald-400" />
            <span className="text-lg font-bold text-white">$19</span>
            <span className="text-xs text-tech-200">one-time</span>
          </div>
        </div>
        {status === 'success' ? (
          <div className="text-center py-6">
            <div className="w-16 h-16 mx-auto rounded-full bg-emerald-500/20 flex items-center justify-center mb-4">
              <CheckCircle className="w-8 h-8 text-emerald-400" />
            </div>
            <p className="text-white font-medium mb-1">{message}</p>
            <button onClick={onBack} className="mt-4 text-sm text-emerald-400 hover:underline">Back to playbook</button>
          </div>
        ) : (
          <form onSubmit={handlePurchase} className="space-y-4">
            <div>
              <label htmlFor="checkout-email" className="block text-sm font-medium text-tech-200 mb-1">Email address</label>
              <input id="checkout-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your@email.com" required className="w-full bg-tech-900 border border-tech-500/50 rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-tech-300 focus:outline-none focus:border-emerald-500/60 focus:ring-1 focus:ring-emerald-500/20 transition" />
            </div>
            <button type="submit" disabled={loading} className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold text-sm hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20">
              {loading ? (
                <><svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>Processing...</>
              ) : (
                <><Download className="w-4 h-4" /> Download PDF &mdash; $19</>
              )}
            </button>
            {status === 'error' && <p className="text-xs text-red-400 text-center">{message}</p>}
            <p className="text-[10px] text-tech-300 text-center">Secure checkout. Your PDF will be available immediately after purchase.<br />You will also receive a download link via email.</p>
          </form>
        )}
      </div>
    </div>
  );
}
function DirectoryBuilderInner() {
  const [showCheckout, setShowCheckout] = useState(false);

  return (
    <>
      <SeoMetadata title="Directory Builder Template — Launch a Niche Directory in Days" description="Complete blueprint for launching a profitable niche directory website. Covers Cosme-style curation, deep link engine, monetization playbooks, and AI agent squads." />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <nav aria-label="Breadcrumb" className="mb-4">
          <ol className="flex flex-wrap items-center gap-1.5 text-xs text-tech-300">
            <li><Link href="/" className="hover:text-white transition">Home</Link></li>
            <li className="text-tech-500">/</li>
            <li><Link href="/playbooks" className="hover:text-white transition">Playbooks</Link></li>
            <li className="text-tech-100 truncate max-w-[200px]">Directory Builder Template</li>
          </ol>
        </nav>

        <Link href="/playbooks" className="inline-flex items-center gap-1.5 text-sm text-tech-200 hover:text-white transition mb-6 group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition" />
          All Playbooks
        </Link>

        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-500/25 via-teal-500/15 to-tech-800 border border-emerald-500/20 mb-8 sm:mb-10">
          <div className="absolute inset-0 bg-tech-grid opacity-30" />
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-teal-500/10 rounded-full blur-[100px] pointer-events-none" />

          <div className="relative p-6 sm:p-8 lg:p-10">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-3xl">🏗️</span>
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium bg-amber-500/20 text-amber-400 border border-amber-500/30">Premium</span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3">Directory Builder Template</h1>

            <p className="text-sm sm:text-base text-tech-100 max-w-2xl mb-4 leading-relaxed">
              The complete blueprint for building, launching, and monetizing a profitable niche directory
              website using AI tools. Includes ranking algorithms, affiliate monetization, SEO automation,
              and cross-site network effects. This is the exact system used to build 6 directories generating
              1000+ pages of content.
            </p>

            <div className="flex flex-wrap gap-3 mb-4">
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-tech-600 text-tech-100 border border-tech-500/30"><FileText className="w-3 h-3" />40+ pages</span>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-tech-600 text-tech-100 border border-tech-500/30"><Clock className="w-3 h-3" />8 chapters</span>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-tech-600 text-tech-100 border border-tech-500/30"><Sparkles className="w-3 h-3" />30+ prompts</span>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-tech-600 text-tech-100 border border-tech-500/30"><Globe className="w-3 h-3" />Updated August 2026</span>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button onClick={() => setShowCheckout(true)} className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold text-base hover:opacity-90 transition hover:-translate-y-0.5 shadow-lg shadow-emerald-500/25">
                <Download className="w-5 h-5" />
                Buy the Full Playbook &mdash; $19
              </button>
              <a href="#preview" className="inline-flex items-center gap-1.5 px-5 py-3.5 rounded-xl bg-tech-700 border border-tech-500/30 text-tech-100 text-sm font-medium hover:text-white hover:border-emerald-500/30 transition">
                <BookOpen className="w-4 h-4" />Preview Contents
              </a>
            </div>
          </div>
        </div>

        <section className="mb-8 sm:mb-10" id="preview">
          <h2 className="text-lg sm:text-xl font-bold text-white mb-4 flex items-center gap-2"><BookOpen className="w-4 h-4 text-emerald-400" />What&apos;s Inside</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {includedItems.map((item, i) => {
              const Icon = item.icons;
              return (
                <div key={i} className="flex items-start gap-3 p-4 rounded-xl border border-tech-500/20 bg-tech-700/60 hover:border-emerald-500/20 transition">
                  <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center shrink-0"><Icon className="w-5 h-5 text-emerald-400" /></div>
                  <div><p className="text-sm font-medium text-white">{item.text}</p><p className="text-xs text-tech-300 mt-0.5">{item.subtext}</p></div>
                </div>
              );
            })}
          </div>
        </section>

        <section className="mb-8 sm:mb-10">
          <h2 className="text-lg sm:text-xl font-bold text-white mb-4 flex items-center gap-2"><Users className="w-4 h-4 text-sky-400" />Who This Is For</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {whoItsFor.map((item, i) => {
              const Icon = item.icons;
              return (
                <div key={i} className="flex items-start gap-3 p-4 rounded-xl border border-sky-500/20 bg-sky-500/5">
                  <div className="w-10 h-10 rounded-lg bg-sky-500/10 flex items-center justify-center shrink-0"><Icon className="w-5 h-5 text-sky-400" /></div>
                  <div><p className="text-sm font-medium text-white">{item.text}</p><p className="text-xs text-tech-300 mt-0.5">{item.subtext}</p></div>
                </div>
              );
            })}
          </div>
        </section>

        <section className="mb-8 sm:mb-10">
          <h2 className="text-lg sm:text-xl font-bold text-white mb-4 flex items-center gap-2"><Target className="w-4 h-4 text-emerald-400" />What You&apos;ll Learn</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {whatYoullLearn.map((item, i) => {
              const Icon = item.icons;
              return (
                <div key={i} className="flex items-start gap-3 p-4 rounded-xl border border-emerald-500/20 bg-emerald-500/5">
                  <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center shrink-0"><Icon className="w-5 h-5 text-emerald-400" /></div>
                  <div><p className="text-sm font-medium text-white">{item.text}</p><p className="text-xs text-tech-300 mt-0.5">{item.subtext}</p></div>
                </div>
              );
            })}
          </div>
        </section>

        <section className="mb-8 sm:mb-10">
          <h2 className="text-lg sm:text-xl font-bold text-white mb-4 flex items-center gap-2"><BarChart3 className="w-4 h-4 text-amber-400" />Real Results from Directory Builders</h2>
          <p className="text-sm text-tech-200 mb-4">These are the actual results from founders who followed the Directory Builder Template to build their own niche directories.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <div className="p-4 rounded-xl border border-emerald-500/20 bg-emerald-500/5 text-center"><div className="text-2xl font-bold text-emerald-400 mb-1">2 weeks</div><div className="text-xs text-tech-200">From niche selection to deployed directory with 100+ listings</div></div>
            <div className="p-4 rounded-xl border border-emerald-500/20 bg-emerald-500/5 text-center"><div className="text-2xl font-bold text-emerald-400 mb-1">2-10K visits</div><div className="text-xs text-tech-200">Monthly traffic after 3 months of SEO + content automation</div></div>
            <div className="p-4 rounded-xl border border-emerald-500/20 bg-emerald-500/5 text-center"><div className="text-2xl font-bold text-emerald-400 mb-1">$0-20/mo</div><div className="text-xs text-tech-200">Cost to run on Vercel free tier with AI subscriptions</div></div>
            <div className="p-4 rounded-xl border border-emerald-500/20 bg-emerald-500/5 text-center"><div className="text-2xl font-bold text-emerald-400 mb-1">$200-500/mo</div><div className="text-xs text-tech-200">Affiliate revenue in the first 90 days</div></div>
          </div>
        </section>
        <section className="mb-8 sm:mb-10">
          <h2 className="text-lg sm:text-xl font-bold text-white mb-4 flex items-center gap-2"><SearchIcon className="w-4 h-4 text-amber-400" />Full Table of Contents</h2>
          <p className="text-sm text-tech-200 mb-6">Here&apos;s everything covered in the Directory Builder Template. Each chapter is packed with step-by-step instructions, code snippets, and ready-to-use prompts. Follow them in order, or jump to any section that matches your current stage.</p>
          <div className="space-y-4">
            {sections.map((section) => (
              <details key={section.id} className="group rounded-xl border border-tech-500/20 bg-tech-700/50 overflow-hidden transition hover:border-emerald-500/20">
                <summary className="flex items-center justify-between p-4 sm:p-5 cursor-pointer list-none">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 rounded-lg bg-tech-600 flex items-center justify-center shrink-0">{section.icon}</div>
                    <div className="min-w-0">
                      <h3 className="text-sm sm:text-base font-semibold text-white group-hover:text-emerald-400 transition">{section.title}</h3>
                      <p className="text-xs text-tech-300 mt-0.5 line-clamp-1">{section.description}</p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-tech-300 shrink-0 transition-transform group-open:rotate-90" />
                </summary>
                <div className="px-4 sm:px-5 pb-4 sm:pb-5 border-t border-tech-500/10 pt-3">
                  <ul className="space-y-2">
                    {section.items.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs sm:text-sm text-tech-100">
                        <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />{item}
                      </li>
                    ))}
                  </ul>
                </div>
              </details>
            ))}
          </div>
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8 sm:mb-10">
          <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-5">
            <h3 className="text-sm font-bold text-amber-400 mb-3 flex items-center gap-2"><Lightbulb className="w-4 h-4" />Pro Tips from Directory Builders</h3>
            <ul className="space-y-2">
              <li className="flex items-start gap-2 text-xs sm:text-sm text-tech-100"><CheckCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />Start with a single directory, perfect the template, then clone. Second directory takes 50% less time.</li>
              <li className="flex items-start gap-2 text-xs sm:text-sm text-tech-100"><CheckCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />Use a shared components library across all directories &mdash; header, footer, search bar, affiliate disclosure banner, review cards.</li>
              <li className="flex items-start gap-2 text-xs sm:text-sm text-tech-100"><CheckCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />The ranking algorithm is your moat. Spend time tuning the scoring weights based on user engagement data.</li>
              <li className="flex items-start gap-2 text-xs sm:text-sm text-tech-100"><CheckCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />Automate blog content generation: write one master prompt per directory, run it weekly to generate 3 posts.</li>
            </ul>
          </div>
          <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-5">
            <h3 className="text-sm font-bold text-red-400 mb-3 flex items-center gap-2"><Lightbulb className="w-4 h-4" />Common Mistakes to Avoid</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-2 text-xs sm:text-sm text-tech-100">
                <div className="w-5 h-5 rounded-full bg-red-500/10 flex items-center justify-center shrink-0 mt-0.5"><span className="text-red-400 text-[10px] font-bold">1</span></div>
                <div><span className="text-red-300 font-medium">Building before validating demand</span><p className="text-tech-200 mt-0.5">Launch with 50-100 listings minimum. Add more based on user search queries and traffic analytics.</p></div>
              </div>
              <div className="flex items-start gap-2 text-xs sm:text-sm text-tech-100">
                <div className="w-5 h-5 rounded-full bg-red-500/10 flex items-center justify-center shrink-0 mt-0.5"><span className="text-red-400 text-[10px] font-bold">2</span></div>
                <div><span className="text-red-300 font-medium">Not tracking affiliate link performance per directory</span><p className="text-tech-200 mt-0.5">Set up per-directory affiliate IDs so you can identify which sites convert best. Optimize the weakest performers.</p></div>
              </div>
            </div>
          </div>
        </section>
        <section className="mb-8 sm:mb-10">
          <h2 className="text-lg sm:text-xl font-bold text-white mb-4 flex items-center gap-2"><Lightbulb className="w-4 h-4 text-purple-400" />Frequently Asked Questions</h2>
          <div className="space-y-3">
            <details className="group rounded-xl border border-tech-500/20 bg-tech-700/50 overflow-hidden">
              <summary className="flex items-center justify-between p-4 cursor-pointer list-none">
                <span className="text-sm font-medium text-white">Do I need coding experience to use this template?</span>
                <ChevronRight className="w-4 h-4 text-tech-300 shrink-0 transition-transform group-open:rotate-90" />
              </summary>
              <div className="px-4 pb-4 border-t border-tech-500/10 pt-3">
                <p className="text-xs sm:text-sm text-tech-200">Basic familiarity with web development helps, but the template is designed to work with Cursor AI Agent mode which writes most of the code for you. If you can describe what you want and follow step-by-step instructions, you can build a directory. The playbook includes exact prompts for every stage so you can copy-paste and let AI do the heavy lifting.</p>
              </div>
            </details>
            <details className="group rounded-xl border border-tech-500/20 bg-tech-700/50 overflow-hidden">
              <summary className="flex items-center justify-between p-4 cursor-pointer list-none">
                <span className="text-sm font-medium text-white">How long does it take to build a directory?</span>
                <ChevronRight className="w-4 h-4 text-tech-300 shrink-0 transition-transform group-open:rotate-90" />
              </summary>
              <div className="px-4 pb-4 border-t border-tech-500/10 pt-3">
                <p className="text-xs sm:text-sm text-tech-200">The first directory takes about 2 weeks from niche selection to deployment. That includes validating the niche, designing the data model, building with Cursor, implementing the ranking algorithm, setting up affiliate links, and deploying. Subsequent directories using the same template take about 50% less time since you can reuse components and the generation pipeline.</p>
              </div>
            </details>
            <details className="group rounded-xl border border-tech-500/20 bg-tech-700/50 overflow-hidden">
              <summary className="flex items-center justify-between p-4 cursor-pointer list-none">
                <span className="text-sm font-medium text-white">How much money can I make from a niche directory?</span>
                <ChevronRight className="w-4 h-4 text-tech-300 shrink-0 transition-transform group-open:rotate-90" />
              </summary>
              <div className="px-4 pb-4 border-t border-tech-500/10 pt-3">
                <p className="text-xs sm:text-sm text-tech-200">Early-stage directories typically earn $200-500/mo within 90 days through affiliate commissions at 1-3% conversion rates. After 2-3 months of SEO growth, traffic reaches 2-10K monthly visits and revenue scales to $500-5,000/mo per directory. With a portfolio of 5-10 directories, you can build a significant passive income stream.</p>
              </div>
            </details>
            <details className="group rounded-xl border border-tech-500/20 bg-tech-700/50 overflow-hidden">
              <summary className="flex items-center justify-between p-4 cursor-pointer list-none">
                <span className="text-sm font-medium text-white">Which affiliate programs work best for directories?</span>
                <ChevronRight className="w-4 h-4 text-tech-300 shrink-0 transition-transform group-open:rotate-90" />
              </summary>
              <div className="px-4 pb-4 border-t border-tech-500/10 pt-3">
                <p className="text-xs sm:text-sm text-tech-200">It depends on your directory niche. Travel directories work well with Booking.com (3-5%), Klook (5-8%), Viator (8%), and Agoda (4-6%). Tool and software directories work with ShareASale (4-12%), CJ Affiliate, and Amazon Associates (1-10%). The playbook includes affiliate program vetting criteria and integration guides for each category type.</p>
              </div>
            </details>
            <details className="group rounded-xl border border-tech-500/20 bg-tech-700/50 overflow-hidden">
              <summary className="flex items-center justify-between p-4 cursor-pointer list-none">
                <span className="text-sm font-medium text-white">What if my directory doesn&apos;t rank on Google?</span>
                <ChevronRight className="w-4 h-4 text-tech-300 shrink-0 transition-transform group-open:rotate-90" />
              </summary>
              <div className="px-4 pb-4 border-t border-tech-500/10 pt-3">
                <p className="text-xs sm:text-sm text-tech-200">The playbook includes a complete SEO automation system: sitemap generation, schema markup, internal linking, and AI content production (3-5 posts per week). Most directories start seeing traffic within 4-8 weeks. If a niche doesn&apos;t perform after 3 months, the playbook includes a diagnostics section and a pivot framework for repositioning your directory.</p>
              </div>
            </details>
            <details className="group rounded-xl border border-tech-500/20 bg-tech-700/50 overflow-hidden">
              <summary className="flex items-center justify-between p-4 cursor-pointer list-none">
                <span className="text-sm font-medium text-white">Is this template reusable for multiple directories?</span>
                <ChevronRight className="w-4 h-4 text-tech-300 shrink-0 transition-transform group-open:rotate-90" />
              </summary>
              <div className="px-4 pb-4 border-t border-tech-500/10 pt-3">
                <p className="text-xs sm:text-sm text-tech-200">Yes &mdash; that&apos;s the entire point. After building your first directory, you reuse the ranking algorithm, shared components (header, footer, search bar, affiliate disclosure banner, review cards), content generation pipeline, and SEO infrastructure. The cross-site network effects chapter specifically covers how to connect all your directories so they grow together.</p>
              </div>
            </details>
            <details className="group rounded-xl border border-tech-500/20 bg-tech-700/50 overflow-hidden">
              <summary className="flex items-center justify-between p-4 cursor-pointer list-none">
                <span className="text-sm font-medium text-white">What&apos;s included in the $19 PDF?</span>
                <ChevronRight className="w-4 h-4 text-tech-300 shrink-0 transition-transform group-open:rotate-90" />
              </summary>
              <div className="px-4 pb-4 border-t border-tech-500/10 pt-3">
                <p className="text-xs sm:text-sm text-tech-200">You get the complete 40+ page PDF with 8 chapters covering niche selection, architecture design, building with Cursor + Next.js, the ranking algorithm implementation, affiliate monetization, SEO automation, cross-site network effects, and deployment. Plus 30+ ready-to-use AI prompts, code snippets for the ranking algorithm, SEO setup scripts, and deployment checklists.</p>
              </div>
            </details>
          </div>
        </section>
        {/* Final CTA */}
        <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-500/20 via-teal-500/10 to-emerald-500/10 border border-emerald-500/20 p-6 sm:p-8 text-center">
          <div className="absolute inset-0 bg-tech-grid opacity-20" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-emerald-500/15 rounded-full blur-[100px] pointer-events-none" />

          <div className="relative">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 mb-4">
              <FileText className="w-8 h-8 text-white" />
            </div>

            <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">
              Ready to Build Your First Profitable Directory?
            </h2>
            <p className="text-sm text-tech-200 max-w-lg mx-auto mb-4">
              Get the complete 40+ page PDF playbook. Every strategy, code snippet, and AI prompt
              you need to go from niche selection to deployed, monetized directory in 2 weeks.
            </p>

            <div className="inline-flex items-center gap-4 px-4 py-2 rounded-xl bg-tech-700/80 border border-tech-500/20 mb-4">
              <div className="text-left">
                <div className="text-2xl font-bold text-white">$19</div>
                <div className="text-[10px] text-tech-300">one-time payment</div>
              </div>
              <div className="h-8 w-px bg-tech-500/30" />
              <div className="text-left">
                <div className="text-xs font-medium text-emerald-400">Lifetime access</div>
                <div className="text-[10px] text-tech-300">Free updates</div>
              </div>
            </div>

            <button
              onClick={() => setShowCheckout(true)}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold text-base hover:opacity-90 transition hover:-translate-y-0.5 shadow-lg shadow-emerald-500/25"
            >
              <ShoppingCart className="w-5 h-5" />
              Buy the Full Playbook &mdash; $19
            </button>

            <div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-[10px] text-tech-300">
              <span className="flex items-center gap-1">
                <CheckCircle className="w-3 h-3 text-emerald-400" />
                Instant download
              </span>
              <span className="flex items-center gap-1">
                <CheckCircle className="w-3 h-3 text-emerald-400" />
                30-day guarantee
              </span>
              <span className="flex items-center gap-1">
                <CheckCircle className="w-3 h-3 text-emerald-400" />
                Free updates
              </span>
              <span className="flex items-center gap-1">
                <CheckCircle className="w-3 h-3 text-emerald-400" />
                30+ AI prompts included
              </span>
            </div>
          </div>
        </section>
      </div>

      {/* Checkout Overlay */}
      {showCheckout && <CheckoutOverlay onBack={() => setShowCheckout(false)} />}
    </>
  );
}

// ─── Exported Page (Suspense-wrapped) ──────────────────────

export default function DirectoryBuilderPage() {
  return (
    <Suspense fallback={
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-tech-700 rounded w-1/4" />
          <div className="h-8 bg-tech-700 rounded w-3/4" />
          <div className="h-64 bg-tech-700 rounded" />
        </div>
      </div>
    }>
      <DirectoryBuilderInner />
    </Suspense>
  );
}
