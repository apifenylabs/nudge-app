import { Metadata } from 'next';
import Link from 'next/link';
import {
 Rocket,
 TrendingUp,
 DollarSign,
 Clock,
 Zap,
 BookOpen,
 ArrowRight,
 CheckCircle,
 Code,
 PenTool,
 BarChart3,
 Palette,
 Shield,
 Smartphone,
 Headphones,
 Globe,
 Search,
 Sparkles,
} from 'lucide-react';
import { toolsData } from '@/lib/data';
import { playbooks } from '@/lib/playbooks';
import type { Playbook } from '@/lib/playbooks';
import ToolCard from '@/components/ToolCard';
import BlogCategoryLinks from '@/components/BlogCategoryLinks';

const BASE_URL = 'https://apifeny-ai.vercel.app';

export const metadata: Metadata = {
 title: 'Best AI Tools for Solopreneurs in Asia (2026) — Affordable, Actionable | Apifeny AI',
 description:
 'Curated AI tools for solopreneurs in Asia. Automate accounting, marketing, code, content, scheduling, and more — all under $50/month. Tested for Asian markets.',
 keywords: [
 'AI tools for solopreneurs',
 'solopreneur AI tools',
 'best AI for solo founders',
 'affordable AI tools solopreneurs',
 'AI for one-person business',
 'AI automation for solopreneurs',
 'solopreneur productivity AI',
 'AI tools solopreneurs Asia',
 'cheap AI tools for small business',
 'best AI for freelancers',
 ],
 alternates: { canonical: `${BASE_URL}/for/solopreneurs` },
 openGraph: {
 title: 'Best AI Tools for Solopreneurs in Asia 2026 | Apifeny AI',
 description:
 '30+ hand-picked AI tools tested for Asian solopreneurs. Automate your accounting, marketing, writing, coding & scheduling — from $0/month.',
 url: `${BASE_URL}/for/solopreneurs`,
 siteName: 'Apifeny AI',
 type: 'website',
 images: [{ url: '/og', width: 1200, height: 630 }],
 },
 twitter: {
 card: 'summary_large_image',
 title: 'Best AI Tools for Solopreneurs in Asia 2026 | Apifeny AI',
 description:
 '30+ hand-picked AI tools tested for Asian solopreneurs. Automate from $0/month.',
 images: ['/og'],
 },
};

// ── Solopreneur-specific tool picks ──
const SOLO_TOOL_SLUGS = [
 'chatgpt',
 'claude',
 'notion-ai',
 'grammarly',
 'canva',
 'midjourney',
 'jasper',
 'copy-ai',
 'descript',
 'murf-ai',
 'otter-ai',
 'zapier',
 'make',
 'fireflies',
 'perplexity',
 'gamma',
 'beautiful-ai',
 'wandb',
];

const CATEGORIES = [
 {
 slug: 'writing-content',
 title: 'Writing & Content',
 icon: <PenTool className="w-5 h-5" />,
 color: 'from-blue-600/20 to-blue-900/10',
 border: 'border-blue-500/30',
 textColor: 'text-blue-300',
 tools: ['chatgpt', 'claude', 'jasper', 'copy-ai', 'grammarly', 'writesonic'],
 blogPosts: [
 { slug: 'best-ai-writing-tools-bloggers-2026', label: 'Best AI Writing Tools' },
 { slug: 'ai-for-content-creation-asia-strategy', label: 'AI Content Strategy for Asia' },
 ],
 },
 {
 slug: 'coding-development',
 title: 'Coding & Development',
 icon: <Code className="w-5 h-5" />,
 color: 'from-emerald-600/20 to-emerald-900/10',
 border: 'border-emerald-500/30',
 textColor: 'text-emerald-300',
 tools: ['cursor', 'github-copilot', 'claude', 'chatgpt', 'replit', 'v0'],
 blogPosts: [
 { slug: 'best-ai-coding-assistants-2026-comparison', label: 'Best AI Coding Assistants Compared' },
 { slug: 'best-ai-coding-tools-beginners-2026', label: 'AI Coding for Beginners' },
 ],
 },
 {
 slug: 'marketing-seo',
 title: 'Marketing & SEO',
 icon: <TrendingUp className="w-5 h-5" />,
 color: 'from-purple-600/20 to-purple-900/10',
 border: 'border-purple-500/30',
 textColor: 'text-purple-300',
 tools: ['perplexity', 'semrush', 'surfer-seo', 'jasper', 'copy-ai', 'canva'],
 blogPosts: [
 { slug: 'ai-seo-tools-asian-markets', label: 'Best AI SEO Tools for Asia' },
 { slug: 'ai-social-media-management-asia-2026', label: 'AI Social Media in Asia' },
 { slug: 'ai-email-marketing-small-business-asia', label: 'AI Email Marketing' },
 ],
 },
 {
 slug: 'design-image',
 title: 'Design & Image',
 icon: <Palette className="w-5 h-5" />,
 color: 'from-pink-600/20 to-pink-900/10',
 border: 'border-pink-500/30',
 textColor: 'text-pink-300',
 tools: ['canva', 'midjourney', 'dalle', 'stable-diffusion', 'adobe-firefly', 'gamma'],
 blogPosts: [
 { slug: 'best-ai-image-generators-compared-2026', label: 'Best AI Image Generators Compared' },
 { slug: 'ai-image-generation-tools-marketers-asia', label: 'AI Images for Asian Marketing' },
 { slug: 'ai-image-generators-asian-marketing', label: 'Asian Marketing with AI Images' },
 ],
 },
 {
 slug: 'finance-accounting',
 title: 'Accounting & Finance',
 icon: <DollarSign className="w-5 h-5" />,
 color: 'from-yellow-600/20 to-yellow-900/10',
 border: 'border-yellow-500/30',
 textColor: 'text-yellow-300',
 tools: ['wave', 'xero', 'zoho-books', 'pabbly', 'quickbooks'],
 blogPosts: [
 { slug: 'ai-accounting-finance-tools-solopreneurs-asia', label: 'AI Accounting Tools for Solopreneurs' },
 { slug: 'best-ai-small-business-accounting-asia-2026', label: 'Best Small Business Accounting AI' },
 ],
 },
 {
 slug: 'productivity-automation',
 title: 'Productivity & Automation',
 icon: <Zap className="w-5 h-5" />,
 color: 'from-orange-600/20 to-orange-900/10',
 border: 'border-orange-500/30',
 textColor: 'text-orange-300',
 tools: ['zapier', 'make', 'notion-ai', 'gamma', 'beautiful-ai', 'fireflies'],
 blogPosts: [
 { slug: 'ai-automation-workflows-solopreneurs', label: '5 Automation Workflows' },
 { slug: 'ai-workflow-automation-stack-under-50', label: 'Automation Stack Under $50/mo' },
 { slug: 'ai-scheduling-calendar-tools-solopreneurs-asia', label: 'AI Scheduling Tools' },
 ],
 },
];

// Solopreneur-specific playbooks
const SOLO_PLAYBOOK_SLUGS = [
 'ai-sales-pitch',
 'marketing-strategy',
 'social-media-automation',
 'content-repurposing',
 'competitor-analysis',
 'customer-support-automation',
 'email-automation-workflow',
];

export default function SolopreneursPage() {
 const soloTools = SOLO_TOOL_SLUGS
 .map(slug => toolsData[slug])
 .filter(Boolean);

 const soloPlaybooks = playbooks.filter((p: Playbook) =>
 SOLO_PLAYBOOK_SLUGS.includes(p.slug)
 );

 return (
 <main className="min-h-screen bg-white">
 {/* ── Hero ── */}
 <section className="relative overflow-hidden border-b border-gray-200/30">
 <div className="absolute inset-0 bg-gradient-to-br from-neon/5 via-transparent to-purple-600/5 pointer-events-none" />
 <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 relative">
 <div className="flex items-center gap-2 mb-4">
 <Rocket className="w-5 h-5 text-neon" />
 <span className="text-neon font-semibold text-sm uppercase tracking-wider">For Solopreneurs</span>
 </div>
 <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
 Best AI Tools for{' '}
 <span className="bg-gradient-to-r from-neon-light to-purple-400 bg-clip-text text-transparent">
 Solopreneurs in Asia
 </span>
 </h1>
 <p className="text-lg sm:text-xl text-gray-600 max-w-3xl leading-relaxed mb-8">
 You run a one-person business. You don't have time to evaluate 200 AI tools.
 These are <strong className="text-gray-900">tested, curated, and Asia-ready</strong> — accounting,
 marketing, coding, content, scheduling, and automation. All affordable. All actionable today.
 </p>
 <div className="flex flex-wrap gap-3">
 <Link
 href="#categories"
 className="inline-flex items-center gap-2 bg-neon text-gray-950 font-semibold px-6 py-3 rounded-xl hover:bg-neon-light transition-colors"
 >
 <Sparkles className="w-4 h-4" />
 Browse by Category
 </Link>
 <Link
 href="#essentials"
 className="inline-flex items-center gap-2 border border-gray-300 text-gray-700 font-medium px-6 py-3 rounded-xl hover:border-neon/50 hover:text-white transition-all"
 >
 <BookOpen className="w-4 h-4" />
 Essential Tools
 </Link>
 </div>
 </div>
 </section>

 {/* ── Stats Strip ── */}
 <section className="border-b border-gray-200/30 bg-white/50">
 <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
 <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
 {[
 { value: '30+', label: 'Curated Tools', icon: <Zap className="w-4 h-4" /> },
 { value: '9+', label: 'Solopreneur Guides', icon: <BookOpen className="w-4 h-4" /> },
 { value: '7', label: 'Free Playbooks', icon: <Rocket className="w-4 h-4" /> },
 { value: '$0–$50', label: 'Monthly Budget', icon: <DollarSign className="w-4 h-4" /> },
 ].map((stat) => (
 <div key={stat.label} className="flex flex-col items-center gap-1">
 <span className="text-neon-light">{stat.icon}</span>
 <span className="text-2xl sm:text-3xl font-bold text-gray-900">{stat.value}</span>
 <span className="text-sm text-gray-400">{stat.label}</span>
 </div>
 ))}
 </div>
 </div>
 </section>

 {/* ── Categories ── */}
 <section id="categories" className="border-b border-gray-200/30">
 <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
 <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
 Tools by Category
 </h2>
 <p className="text-gray-600 max-w-2xl mb-10 leading-relaxed">
 Every tool on this page is selected for solopreneurs — affordable, easy to set up,
 and tested for Asian markets (multi-language, local pricing, regional availability).
 </p>

 <div className="grid sm:grid-cols-2 gap-4">
 {CATEGORIES.map((cat) => (
 <a
 key={cat.slug}
 href={`#cat-${cat.slug}`}
 className={`block bg-gradient-to-br ${cat.color} border ${cat.border} rounded-xl p-5 hover:scale-[1.02] transition-all group`}
 >
 <div className={`flex items-center gap-2 mb-2 ${cat.textColor}`}>
 {cat.icon}
 <h3 className="font-bold text-gray-900">{cat.title}</h3>
 </div>
 <p className="text-sm text-gray-400 mb-3">
 {cat.tools.length} recommended tools ·{' '}
 {cat.blogPosts.length} related guides
 </p>
 <span className="text-xs text-neon-light group-hover:gap-2 inline-flex items-center gap-1 transition-all">
 Browse {cat.title} Tools
 <ArrowRight className="w-3 h-3" />
 </span>
 </a>
 ))}
 </div>
 </div>
 </section>

 {/* ── Category Detail Sections ── */}
 {CATEGORIES.map((cat) => (
 <section
 key={cat.slug}
 id={`cat-${cat.slug}`}
 className="border-b border-gray-200/20 scroll-mt-20"
 >
 <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
 <div className="flex items-center gap-3 mb-2">
 <span className={cat.textColor}>{cat.icon}</span>
 <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">{cat.title}</h2>
 </div>

 <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
 {cat.tools.map((toolSlug) => {
 const tool = toolsData[toolSlug];
 if (!tool) return null;
 return (
 <Link
 key={toolSlug}
 href={`/tool/${toolSlug}`}
 className="bg-gray-100 border border-gray-200/30 rounded-xl p-4 hover:border-neon/30 transition-all group"
 >
 <h3 className="font-semibold text-gray-900 group-hover:text-neon-light transition-colors mb-1">
 {tool.name || tool.title || toolSlug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())}
 </h3>
 {tool.tagline && (
 <p className="text-sm text-gray-400 line-clamp-2">{tool.tagline}</p>
 )}
 </Link>
 );
 })}
 </div>

 {/* Related blog posts */}
 {cat.blogPosts.length > 0 && (
 <div className="mt-8 pt-6 border-t border-gray-200/20">
 <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
 Related Guides
 </h4>
 <div className="flex flex-wrap gap-3">
 {cat.blogPosts.map((post) => (
 <Link
 key={post.slug}
 href={`/blog/${post.slug}`}
 className="inline-flex items-center gap-1.5 text-sm text-gray-600 bg-gray-100 border border-gray-200/30 rounded-lg px-3 py-1.5 hover:text-neon-light hover:border-neon/30 transition-all"
 >
 <BookOpen className="w-3.5 h-3.5" />
 {post.label}
 <ArrowRight className="w-3 h-3" />
 </Link>
 ))}
 </div>
 </div>
 )}
 </div>
 </section>
 ))}

 {/* ── Solopreneur Blog Posts ── */}
 <section className="border-b border-gray-200/30 bg-white/30">
 <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
 <div className="flex items-center gap-2 mb-2">
 <BookOpen className="w-5 h-5 text-neon" />
 <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
 Solopreneur-Focused Guides
 </h2>
 </div>
 <p className="text-gray-600 mb-8 max-w-2xl">
 Deep-dive guides written specifically for solo founders and freelancers in Asia.
 </p>
 <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
 {[
 { slug: 'top-10-free-ai-tools-for-solopreneurs-asia-2026', title: 'Top 10 Free AI Tools', excerpt: 'Start at $0 — free AI tools that actually work for solo founders in Asia.' },
 { slug: 'ai-tools-solopreneurs-save-money-2026', title: '5 AI Tools That Save Money', excerpt: 'Stop burning cash. These AI tools pay for themselves in month one.' },
 { slug: 'ai-automation-workflows-solopreneurs', title: '5 Automation Workflows', excerpt: 'Save 20+ hours/week with these solopreneur automation playbooks.' },
 { slug: 'ai-workflow-automation-stack-under-50', title: 'Automation Stack Under $50', excerpt: 'Complete AI workflow stack for under $50/month — tested for Asian founders.' },
 { slug: 'ai-scheduling-calendar-tools-solopreneurs-asia', title: 'AI Scheduling Tools', excerpt: 'Never double-book again. Best AI calendar tools for Asian solopreneurs.' },
 { slug: 'ai-accounting-finance-tools-solopreneurs-asia', title: 'AI Accounting Tools', excerpt: 'Manage invoices, expenses, and taxes across 10+ Asian markets.' },
 { slug: 'best-ai-tools-singapore-solopreneurs-2026', title: 'Best AI Tools in Singapore', excerpt: 'Singapore-specific AI tools with local pricing and MAS compliance.' },
 { slug: 'best-ai-tools-hong-kong-2026', title: 'Best AI Tools in Hong Kong', excerpt: 'HK-specific picks — WeChat, Cantonese support, and local banking integration.' },
 { slug: 'ai-business-analytics-tools-asia', title: 'AI Business Analytics', excerpt: 'Turn raw data into dashboards without a data team.' },
 ].map((post) => (
 <Link
 key={post.slug}
 href={`/blog/${post.slug}`}
 className="group bg-gray-100 border border-gray-200/30 rounded-xl p-5 hover:border-neon/30 transition-all"
 >
 <h3 className="font-semibold text-gray-900 group-hover:text-neon-light transition-colors mb-2">
 {post.title}
 </h3>
 <p className="text-sm text-gray-400 line-clamp-2 mb-3">{post.excerpt}</p>
 <span className="text-xs text-neon-light group-hover:gap-2 inline-flex items-center gap-1 transition-all">
 Read Guide
 <ArrowRight className="w-3 h-3" />
 </span>
 </Link>
 ))}
 </div>
 </div>
 </section>

 {/* ── Solopreneur Playbooks ── */}
 <section className="border-b border-gray-200/30">
 <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
 <div className="flex items-center gap-2 mb-2">
 <Rocket className="w-5 h-5 text-neon" />
 <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
 Instant-Use Playbooks
 </h2>
 </div>
 <p className="text-gray-600 mb-8 max-w-2xl">
 Step-by-step playbooks you can copy-paste and adapt. No fluff, just workflows that work.
 </p>
 <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
 {soloPlaybooks.map((p: Playbook) => (
 <Link
 key={p.slug}
 href={`/playbooks/${p.slug}`}
 className="group bg-gradient-to-br from-tech-800/50 to-tech-900/50 border border-gray-200/30 rounded-xl p-5 hover:border-neon/30 transition-all"
 >
 <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
 p.difficulty === 'Beginner'
 ? 'bg-green-500/10 text-green-300 border border-green-500/30'
 : p.difficulty === 'Intermediate'
 ? 'bg-yellow-500/10 text-yellow-300 border border-yellow-500/30'
 : 'bg-red-500/10 text-red-300 border border-red-500/30'
 }`}>
 {p.difficulty}
 </span>
 <h3 className="font-semibold text-gray-900 mt-2 mb-1 group-hover:text-neon-light transition-colors">
 {p.title}
 </h3>
 <p className="text-sm text-gray-400 line-clamp-2">{p.description}</p>
 <div className="flex items-center gap-1 text-xs text-gray-500 mt-3">
 <Clock className="w-3 h-3" />
 <span>{p.read_time_minutes} min</span>
 </div>
 </Link>
 ))}
 </div>
 <div className="mt-6 text-center">
 <Link
 href="/playbooks"
 className="inline-flex items-center gap-1.5 text-sm text-gray-600 hover:text-neon-light transition-colors"
 >
 View all playbooks ({playbooks.length})
 <ArrowRight className="w-3.5 h-3.5" />
 </Link>
 </div>
 </div>
 </section>

 {/* ── Why Solopreneurs in Asia ── */}
 <section className="border-b border-gray-200/30 bg-white/30">
 <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
 <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
 Why Solopreneurs in Asia Need Different AI Tools
 </h2>
 <p className="text-gray-600 max-w-3xl mb-8 leading-relaxed">
 Tool recommendations written for Silicon Valley often miss what Asian founders
 actually deal with — multi-language support, WeChat/LINE/WhatsApp integration,
 regional payment gateways, and pricing that makes sense for local markets.
 </p>
 <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
 {[
 { icon: <Globe className="w-5 h-5" />, title: 'Multi-Language', desc: 'Cantonese, Mandarin, Korean, Japanese, Thai, Vietnamese — the tools you choose must handle CJK characters and right-to-left scripts.' },
 { icon: <Smartphone className="w-5 h-5" />, title: 'Super-App Ready', desc: 'Does it integrate with WeChat, LINE, Grab, or Shopee? If not, it\u2019s half-useful for Asian solopreneurs.' },
 { icon: <DollarSign className="w-5 h-5" />, title: 'Local Pricing', desc: 'USD pricing hurts. We prioritize tools with regional pricing, free tiers, or payment via local gateways like PayNow, FPX, or GrabPay.' },
 { icon: <Shield className="w-5 h-5" />, title: 'Data Compliance', desc: 'PDPA (SG), PDPO (HK), PIPA (KR), Personal Data Protection Act (TH) — your tools must respect local data laws.' },
 ].map((item) => (
 <div key={item.title} className="bg-gray-100 border border-gray-200/30 rounded-xl p-5">
 <span className="text-neon-light block mb-2">{item.icon}</span>
 <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
 <p className="text-sm text-gray-400 leading-relaxed">{item.desc}</p>
 </div>
 ))}
 </div>
 </div>
 </section>

 {/* ── BLOG CROSS-LINKS ── */}
 <BlogCategoryLinks
 slugs={['solopreneur', 'productivity', 'ai-tools', 'accounting-finance']}
 heading="Guides for Solopreneurs"
 />

 {/* ── Next Steps / CTA ── */}
 <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
 <div className="bg-gradient-to-br from-neon/10 to-purple-600/10 border border-neon/20 rounded-2xl p-8 sm:p-12">
 <Sparkles className="w-8 h-8 text-neon mx-auto mb-4" />
 <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
 Ready to Build Your Solopreneur Stack?
 </h2>
 <p className="text-gray-600 max-w-xl mx-auto mb-6 leading-relaxed">
 Pick one category above, read the recommended guide, and try one tool this week.
 Most have free tiers — you can start for $0 and scale as you grow.
 </p>
 <div className="flex flex-wrap justify-center gap-3">
 <Link
 href="/best-ai-tools"
 className="inline-flex items-center gap-2 bg-neon text-gray-950 font-semibold px-6 py-3 rounded-xl hover:bg-neon-light transition-colors"
 >
 <Sparkles className="w-4 h-4" />
 Browse All Tools
 </Link>
 <Link
 href="/playbooks"
 className="inline-flex items-center gap-2 border border-gray-300 text-gray-700 font-medium px-6 py-3 rounded-xl hover:border-neon/50 hover:text-white transition-all"
 >
 <BookOpen className="w-4 h-4" />
 Solopreneur Playbooks
 </Link>
 </div>
 </div>
 </section>

 {/* ── Breadcrumb Schema ── */}
 <script
 type="application/ld+json"
 dangerouslySetInnerHTML={{
 __html: JSON.stringify({
 '@context': 'https://schema.org',
 '@type': 'BreadcrumbList',
 itemListElement: [
 { '@type': 'ListItem', position: 1, name: 'Home', item: `${BASE_URL}/` },
 { '@type': 'ListItem', position: 2, name: 'For Solopreneurs', item: `${BASE_URL}/for/solopreneurs` },
 ],
 }),
 }}
 />
 {/* ── CollectionPage Schema ── */}
 <script
 type="application/ld+json"
 dangerouslySetInnerHTML={{
 __html: JSON.stringify({
 '@context': 'https://schema.org',
 '@type': 'CollectionPage',
 name: 'Best AI Tools for Solopreneurs in Asia (2026)',
 description: 'Curated AI tools for solopreneurs in Asia — accounting, marketing, coding, content, scheduling, and automation, all under $50/month.',
 url: `${BASE_URL}/for/solopreneurs`,
 about: {
 '@type': 'Thing',
 name: 'AI tools for solopreneurs',
 },
 }),
 }}
 />
 </main>
 );
}
