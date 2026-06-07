import { Metadata } from 'next';
import Link from 'next/link';
import {
 Rocket,
 TrendingUp,
 DollarSign,
 Clock,
 Users,
 Shield,
 CheckCircle,
 ArrowRight,
 Sparkles,
 BookOpen,
 Star,
 Zap,
 Megaphone,
 BarChart3,
 Target,
 Search,
 PenTool,
 Palette,
 Video,
 ChartBar,
 Globe,
} from 'lucide-react';
import { toolsData } from '@/lib/data';
import { playbooks } from '@/lib/playbooks';
import ToolCard from '@/components/ToolCard';
import BlogCategoryLinks from '@/components/BlogCategoryLinks';

const BASE_URL = 'https://apifeny-ai.vercel.app';

export const metadata: Metadata = {
 title: 'Best AI Tools for Digital Marketing in 2026 — SEO, Content, Ads, Video | Apifeny AI',
 description:
 'Discover the best AI tools for digital marketing in 2026. Compare AI-powered tools for SEO, content creation, social media, email marketing, video production, and ad optimization. Asia-ready with multi-language support.',
 keywords: [
 'AI tools for digital marketing',
 'digital marketing AI tools',
 'AI marketing software',
 'best AI for SEO',
 'AI content creation tools',
 'AI social media management',
 'AI email marketing tools',
 'AI video marketing tools',
 'AI ad optimization',
 'Asia AI marketing tools',
 'AI tools for marketers',
 'digital marketing automation AI',
 ],
 alternates: { canonical: `${BASE_URL}/ai-tools-for-digital-marketing` },
 openGraph: {
 title: 'Best AI Tools for Digital Marketing 2026 — Complete Guide | Apifeny AI',
 description:
 '30+ AI tools hand-picked for digital marketers. SEO, content creation, social media, email, video, and ad optimization — all ranked for Asia-readiness.',
 url: `${BASE_URL}/ai-tools-for-digital-marketing`,
 siteName: 'Apifeny AI',
 type: 'website',
 images: [{ url: '/og', width: 1200, height: 630, alt: 'AI Tools for Digital Marketing | Apifeny AI' }],
 },
 twitter: {
 card: 'summary_large_image',
 title: 'Best AI Tools for Digital Marketing 2026',
 description: '30+ AI-powered digital marketing tools ranked by features, pricing, and Asia-readiness. SEO, content, social, video, and ads.',
 images: ['/og'],
 },
 robots: { index: true, follow: true },
};

// ── Digital Marketing Tool Categories ────────────────────────────

const MARKETING_CATEGORIES = [
 {
 id: 'seo',
 title: 'AI SEO Tools',
 description: 'Keyword research, content optimization, backlink analysis, and technical SEO audits powered by AI. Rank higher in search results across Asian markets.',
 icon: Search,
 slug: 'marketing-seo',
 color: 'from-green-500/20 to-emerald-500/10',
 tools: [] as string[],
 },
 {
 id: 'content',
 title: 'AI Content & Copywriting',
 description: 'Generate blog posts, ad copy, email sequences, landing pages, and social media content at scale. AI that writes like a professional marketer.',
 icon: PenTool,
 slug: 'writing-content',
 color: 'from-violet-500/20 to-purple-500/10',
 tools: [] as string[],
 },
 {
 id: 'design',
 title: 'AI Design & Visuals',
 description: 'Create social media graphics, ad creatives, presentations, and brand assets without a design team. Canva-level simplicity with AI superpowers.',
 icon: Palette,
 slug: 'design-creative',
 color: 'from-pink-500/20 to-rose-500/10',
 tools: [] as string[],
 },
 {
 id: 'video',
 title: 'AI Video Marketing',
 description: 'Produce professional videos with AI avatars, automated editing, captions, and multi-language voiceovers. Perfect for social media and ads.',
 icon: Video,
 slug: 'video-animation',
 color: 'from-amber-500/20 to-orange-500/10',
 tools: [] as string[],
 },
 {
 id: 'analytics',
 title: 'AI Analytics & Ads',
 description: 'Optimize ad campaigns, analyze customer data, forecast trends, and automate reporting. Make data-driven marketing decisions in seconds.',
 icon: ChartBar,
 slug: 'data-analytics',
 color: 'from-blue-500/20 to-cyan-500/10',
 tools: [] as string[],
 },
];

export default function AIToolsForDigitalMarketingPage() {
 const toolCount = toolsData.filter(t => t.is_published).length;

 // Pick recommended tools sorted by trending_score
 const recommendedTools = toolsData
 .filter(t => t.is_published)
 .sort((a, b) => b.trending_score - a.trending_score)
 .slice(0, 6);

 return (
 <div className="min-h-screen bg-white">
 {/* ── Hero Section ─────────────────────────────────────────────── */}
 <section className="relative overflow-hidden">
 <div className="absolute inset-0 bg-gradient-to-b from-green-500/10 via-transparent to-tech-900 pointer-events-none" />
 <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
 {/* Badge */}
 <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-medium mb-6">
 <Megaphone className="w-3.5 h-3.5" />
 Digital Marketing Edition
 </div>

 <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight max-w-4xl">
 Best AI Tools for{' '}
 <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
 Digital Marketing
 </span>{' '}
 in 2026
 </h1>

 <p className="text-lg sm:text-xl text-gray-700 max-w-2xl mb-8 leading-relaxed">
 Hand-picked AI tools purpose-built for digital marketing teams, freelancers, and agencies.
 From SEO and content to video production and ad optimization — all ranked for Asia-readiness.
 </p>

 {/* Quick stats */}
 <div className="flex flex-wrap gap-6 mb-8 text-sm">
 <div className="flex items-center gap-2 text-gray-600">
 <CheckCircle className="w-4 h-4 text-green-400" />
 <span>30+ marketing tools curated</span>
 </div>
 <div className="flex items-center gap-2 text-gray-600">
 <DollarSign className="w-4 h-4 text-green-400" />
 <span>Most under $50/month</span>
 </div>
 <div className="flex items-center gap-2 text-gray-600">
 <Users className="w-4 h-4 text-green-400" />
 <span>For teams of 1–50</span>
 </div>
 <div className="flex items-center gap-2 text-gray-600">
 <Globe className="w-4 h-4 text-green-400" />
 <span>Asia language ready</span>
 </div>
 </div>

 {/* CTA buttons */}
 <div className="flex flex-wrap gap-4">
 <Link
 href="/tools"
 className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold text-sm sm:text-base transition-all hover:shadow-lg hover:shadow-green-500/25 hover:-translate-y-0.5"
 >
 Browse All Tools
 <ArrowRight className="w-4 h-4" />
 </Link>
 <Link
 href="/playbooks"
 className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl border border-gray-200 text-gray-800 hover:border-green-500/30 hover:text-white text-sm sm:text-base font-medium transition-all"
 >
 <BookOpen className="w-4 h-4" />
 Marketing Playbooks
 </Link>
 </div>
 </div>
 </section>

 {/* ── Why This Matters ─────────────────────────────────────────── */}
 <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
 <div className="text-center mb-12">
 <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
 Why AI for Digital Marketing — <span className="text-green-400">Now</span>
 </h2>
 <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed">
 In 2026, digital marketing without AI is like running ads blindfolded. The most effective
 marketing teams use AI to write content, optimize SEO, produce videos, analyze data,
 and personalize campaigns — all at a fraction of the cost and time. This page shows you
 exactly which tools deliver real ROI for every marketing discipline.
 </p>
 </div>

 <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
 {[
 { icon: DollarSign, title: 'Cut Costs by 60%+', desc: 'Replace $5K/month agency retainers with AI tools that cost $20–$150/month. Generate content, SEO audits, and video in-house.' },
 { icon: Clock, title: '10x Content Output', desc: 'AI writing tools produce blog posts, ad copy, and social content 10x faster. One marketer can do the work of a team of 5.' },
 { icon: Target, title: 'Better Campaign ROI', desc: 'AI analytics and ad optimization tools improve conversion rates by 30–50%. Data-driven decisions outperform gut instincts.' },
 { icon: TrendingUp, title: 'Asia Market Ready', desc: 'All recommended tools support Asian languages — Chinese, Japanese, Korean, Thai, Vietnamese. No more English-only limitations.' },
 ].map((item, i) => (
 <div
 key={i}
 className="bg-gray-100 border border-gray-200 rounded-xl p-6 hover:border-green-500/20 transition-all"
 >
 <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center mb-4">
 <item.icon className="w-5 h-5 text-green-400" />
 </div>
 <h3 className="text-white font-semibold mb-2">{item.title}</h3>
 <p className="text-sm text-gray-400 leading-relaxed">{item.desc}</p>
 </div>
 ))}
 </div>
 </section>

 {/* ── Quick Comparison Table ──────────────────────────────────── */}
 <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
 <div className="text-center mb-10">
 <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
 Top Digital Marketing AI Tools — <span className="text-green-400">At a Glance</span>
 </h2>
 <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
 The most popular AI tools among digital marketers. All rated for marketing value,
 pricing, and Asia-readiness.
 </p>
 </div>

 <div className="overflow-x-auto rounded-xl border border-gray-200">
 <table className="w-full text-sm text-left">
 <thead>
 <tr className="bg-gray-50 border-b border-gray-200">
 <th className="px-5 py-4 text-gray-700 font-semibold">Tool</th>
 <th className="px-5 py-4 text-gray-700 font-semibold hidden sm:table-cell">Best For</th>
 <th className="px-5 py-4 text-gray-700 font-semibold">Starting Price</th>
 <th className="px-5 py-4 text-gray-700 font-semibold hidden md:table-cell">Free Tier</th>
 <th className="px-5 py-4 text-gray-700 font-semibold">Rating</th>
 <th className="px-5 py-4 text-gray-700 font-semibold">Asia Ready</th>
 </tr>
 </thead>
 <tbody>
 {[
 { slug: 'chatgpt', name: 'ChatGPT', best: 'Content, copy, research, strategy', price: 'Free / $20/mo', free: '✅ Full access', rating: 4.7, asia: '✅' },
 { slug: 'canva-ai', name: 'Canva AI', best: 'Social graphics, brand design', price: 'Free / $13/mo', free: '✅ Robust', rating: 4.6, asia: '✅' },
 { slug: 'jasper', name: 'Jasper', best: 'Marketing copy, ad copy, email', price: '$39/mo', free: '✅ 7-day trial', rating: 4.4, asia: '✅' },
 { slug: 'semrush', name: 'Semrush', best: 'SEO, keyword research, content', price: '$139/mo', free: '✅ Limited', rating: 4.5, asia: '✅' },
 { slug: 'ahrefs', name: 'Ahrefs', best: 'Backlinks, competitor analysis', price: '$99/mo', free: '✅ Webmaster', rating: 4.6, asia: '✅' },
 { slug: 'synthesia', name: 'Synthesia', best: 'AI video with avatars', price: '$29/mo', free: '✅ Demo', rating: 4.5, asia: '✅' },
 ].map((row, i) => (
 <tr key={row.slug} className={`border-b border-gray-200 ${i % 2 === 0 ? 'bg-gray-100' : 'bg-white/20'} hover:bg-gray-100 transition-colors`}>
 <td className="px-5 py-4">
 <Link href={`/tools/${row.slug}`} className="text-white font-medium hover:text-green-400 transition">
 {row.name}
 </Link>
 </td>
 <td className="px-5 py-4 text-gray-600 hidden sm:table-cell">{row.best}</td>
 <td className="px-5 py-4 text-green-400 font-medium">{row.price}</td>
 <td className="px-5 py-4 text-gray-600 hidden md:table-cell">{row.free}</td>
 <td className="px-5 py-4">
 <div className="flex items-center gap-1">
 <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
 <span className="text-gray-700">{row.rating}</span>
 </div>
 </td>
 <td className="px-5 py-4 text-gray-600">{row.asia}</td>
 </tr>
 ))}
 </tbody>
 </table>
 </div>

 <p className="text-center text-xs text-gray-500 mt-4">
 Prices as of June 2026. Most tools offer free trials or freemium tiers suitable for marketing teams.{' '}
 <Link href="/tools" className="text-green-400 hover:text-green-300 underline">Browse all {toolCount} tools →</Link>
 </p>
 </section>

 {/* ── Category Sections ───────────────────────────────────────── */}
 {MARKETING_CATEGORIES.map((cat) => (
 <section key={cat.id} className={`bg-gradient-to-b ${cat.color} border-y border-gray-200`}>
 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
 <div className="flex items-start justify-between mb-8">
 <div>
 <div className="flex items-center gap-2 mb-3">
 <cat.icon className="w-5 h-5 text-green-400" />
 <h2 className="text-2xl sm:text-3xl font-bold text-white">{cat.title}</h2>
 </div>
 <p className="text-gray-600 max-w-2xl">{cat.description}</p>
 </div>
 <Link
 href={`/categories/${cat.slug}`}
 className="hidden sm:inline-flex items-center gap-1.5 text-sm text-green-400 hover:text-green-300 transition shrink-0"
 >
 View All
 <ArrowRight className="w-3.5 h-3.5" />
 </Link>
 </div>

 {/* Show tools relevant to this marketing sub-category */}
 <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
 {toolsData
 .filter(t => {
 const text = ((t.category || '') + ' ' + ((t.subcategories || []).join(' ')) + ' ' + ((t.use_cases || []).join(' '))).toLowerCase();
 const filters: Record<string, string[]> = {
 seo: ['seo', 'keyword', 'backlink', 'search'],
 content: ['writing', 'copy', 'content', 'blog', 'copywriting'],
 design: ['design', 'creative', 'visual', 'presentation'],
 video: ['video', 'animation', 'avatar'],
 analytics: ['analytics', 'data', 'ad', 'campaign', 'crm', 'sales'],
 };
 const matches = filters[cat.id] || [];
 return t.is_published && matches.some(m => text.includes(m));
 })
 .sort((a, b) => b.trending_score - a.trending_score)
 .slice(0, 6)
 .map(tool => (
 <Link
 key={tool.id}
 href={`/tools/${tool.slug}`}
 className="group bg-gray-100 border border-gray-200 rounded-lg p-4 hover:border-green-500/30 transition-all"
 >
 <div className="flex items-start gap-3">
 <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-tech-500 to-tech-600 flex items-center justify-center shrink-0">
 <span className="text-white font-bold text-sm">
 {tool.name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()}
 </span>
 </div>
 <div className="min-w-0">
 <h3 className="text-white font-medium text-sm group-hover:text-green-300 transition truncate">
 {tool.name}
 </h3>
 <p className="text-xs text-gray-400 mt-0.5 line-clamp-2">
 {tool.tagline || tool.description?.slice(0, 80)}
 </p>
 {tool.avg_rating > 0 && (
 <div className="flex items-center gap-1 mt-1.5">
 <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
 <span className="text-xs text-gray-400">{tool.avg_rating.toFixed(1)}</span>
 </div>
 )}
 </div>
 </div>
 </Link>
 ))}
 </div>

 <div className="mt-6 text-center sm:hidden">
 <Link
 href={`/categories/${cat.slug}`}
 className="inline-flex items-center gap-1.5 text-sm text-green-400 hover:text-green-300 transition"
 >
 View All {cat.title}
 <ArrowRight className="w-3.5 h-3.5" />
 </Link>
 </div>
 </div>
 </section>
 ))}

 {/* ── Recommended Playbooks ────────────────────────────────────── */}
 <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
 <div className="flex items-center gap-2 mb-8">
 <BookOpen className="w-5 h-5 text-green-400" />
 <h2 className="text-2xl sm:text-3xl font-bold text-white">Digital Marketing Playbooks</h2>
 </div>

 <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
 {playbooks
 .filter(p => {
 const marketingRelevant = [
 'ai-marketing-for-asia', 'ai-for-marketing-automation', 'content-creation-with-chatgpt',
 'ai-for-seo', 'ai-for-social-media-management', 'ai-for-email-marketing',
 'ai-for-landing-page-optimization', 'ai-video-production', 'ai-content-repurposing',
 'automate-seo-content-creation', 'ai-powered-newsletter-zero-coding', 'ai-video-content-tiktok-reels',
 'ai-for-lead-generation', 'ai-for-email-campaigns', 'ai-for-personal-brand-building',
 'ai-generated-art-for-social-media',
 ];
 return marketingRelevant.includes(p.slug);
 })
 .slice(0, 6)
 .map(pb => (
 <Link
 key={pb.slug}
 href={`/playbook/${pb.slug}`}
 className="group bg-gray-100 border border-gray-200 rounded-xl p-6 hover:border-green-500/30 transition-all"
 >
 <h3 className="font-semibold text-white group-hover:text-green-300 transition mb-2">
 {pb.title}
 </h3>
 <p className="text-sm text-gray-400 line-clamp-2 mb-3">
 {pb.description}
 </p>
 <div className="flex items-center gap-1 text-xs text-green-400 group-hover:gap-2 transition-all">
 Read Playbook
 <ArrowRight className="w-3 h-3" />
 </div>
 </Link>
 ))}
 </div>
 </section>

 {/* ── FAQ Section ──────────────────────────────────────────────── */}
 <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
 <div className="max-w-3xl mx-auto">
 <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 text-center">
 Frequently Asked Questions
 </h2>
 <div className="space-y-4 mt-8">
 {[
 {
 q: 'What is the best AI tool for digital marketing in 2026?',
 a: 'There is no single "best" tool — it depends on your discipline. For content creation, ChatGPT and Jasper lead. For SEO, Semrush and Ahrefs are industry standards. For video, Synthesia and HeyGen deliver professional results. Most marketing teams use a stack of 3–5 AI tools across different functions.',
 },
 {
 q: 'Can AI replace digital marketing teams?',
 a: 'AI replaces tasks, not teams. It automates content generation, SEO analysis, and reporting — but strategic thinking, brand voice, creative direction, and campaign management still need human expertise. Most teams find AI makes them 3–10x more productive, not redundant.',
 },
 {
 q: 'Which AI marketing tools support Asian languages?',
 a: 'ChatGPT, Claude, Gemini, Canva AI, Synthesia, and HeyGen all offer strong multi-language support including Chinese, Japanese, Korean, Thai, and Vietnamese. Semrush and Ahrefs also provide keyword databases for Asian markets. Check each tool\'s Asia-readiness score on its detail page.',
 },
 {
 q: 'Are there free AI tools for digital marketing?',
 a: 'Yes — ChatGPT Free, Canva Free, and Gemini offer generous free tiers for content and design. For SEO, Ahrefs Webmaster Tools and Google Search Console are free starting points. Most paid tools offer 7–30 day free trials to test before committing.',
 },
 {
 q: 'How do I choose the right AI stack for my marketing team?',
 a: 'Start by identifying your biggest bottleneck — is it content volume, SEO performance, video production, or ad optimization? Pick one tool in that area first. Once adopted, layer in tools for other functions. Most teams find that ChatGPT + Canva AI + a SEO tool (Semrush or Ahrefs) covers 80% of marketing needs.',
 },
 {
 q: 'How much should I budget for AI marketing tools?',
 a: 'A solo marketer can get started for under $40/month with free tiers and one paid tool. A small marketing team of 3–5 typically spends $200–$500/month on a complete stack. Compare pricing on each tool\'s page and look for annual discounts (often 15–20% off).',
 },
 ].map((faq, i) => (
 <details
 key={i}
 className="group bg-gray-100 border border-gray-200 rounded-xl overflow-hidden"
 >
 <summary className="px-5 py-4 text-white font-medium cursor-pointer hover:bg-gray-100 transition-colors flex items-center justify-between list-none">
 <span>{faq.q}</span>
 <span className="text-gray-400 group-open:rotate-180 transition-transform shrink-0 ml-2">
 ▼
 </span>
 </summary>
 <div className="px-5 pb-4 text-sm text-gray-600 leading-relaxed border-t border-gray-200 pt-3">
 {faq.a}
 </div>
 </details>
 ))}
 </div>

 {/* JSON-LD FAQ Schema */}
 <script
 type="application/ld+json"
 dangerouslySetInnerHTML={{
 __html: JSON.stringify({
 '@context': 'https://schema.org',
 '@type': 'FAQPage',
 mainEntity: [
 { '@type': 'Question', name: 'What is the best AI tool for digital marketing in 2026?', acceptedAnswer: { '@type': 'Answer', text: 'It depends on your discipline. For content creation, ChatGPT and Jasper lead. For SEO, Semrush and Ahrefs are industry standards. For video, Synthesia and HeyGen deliver professional results.' } },
 { '@type': 'Question', name: 'Can AI replace digital marketing teams?', acceptedAnswer: { '@type': 'Answer', text: 'AI replaces tasks, not teams. It automates content generation, SEO analysis, and reporting — but strategic thinking, brand voice, creative direction, and campaign management still need human expertise.' } },
 { '@type': 'Question', name: 'Which AI marketing tools support Asian languages?', acceptedAnswer: { '@type': 'Answer', text: 'ChatGPT, Claude, Gemini, Canva AI, Synthesia, and HeyGen offer strong multi-language support including Chinese, Japanese, Korean, Thai, and Vietnamese.' } },
 { '@type': 'Question', name: 'Are there free AI tools for digital marketing?', acceptedAnswer: { '@type': 'Answer', text: 'ChatGPT Free, Canva Free, and Gemini offer generous free tiers. For SEO, Ahrefs Webmaster Tools and Google Search Console are free. Most paid tools offer 7–30 day free trials.' } },
 { '@type': 'Question', name: 'How much should I budget for AI marketing tools?', acceptedAnswer: { '@type': 'Answer', text: 'A solo marketer can get started for under $40/month. A small marketing team of 3–5 typically spends $200–$500/month on a complete stack.' } },
 ],
 }),
 }}
 />
 </div>
 </section>

 {/* ── BLOG CROSS-LINKS ── */}
 <BlogCategoryLinks
 slugs={['ai-tools', 'productivity', 'marketing-seo', 'content-creation']}
 heading="Digital Marketing Guides & Tips"
 />

 {/* ── CTA Section ──────────────────────────────────────────────── */}
 <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
 <div className="relative rounded-2xl bg-gradient-to-br from-green-500/10 via-emerald-500/5 to-tech-800 border border-gray-200 p-8 sm:p-12 text-center">
 <Megaphone className="w-10 h-10 text-green-400 mx-auto mb-4" />
 <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
 Ready to Transform Your Digital Marketing?
 </h2>
 <p className="text-gray-600 max-w-xl mx-auto mb-6 leading-relaxed">
 Browse our full directory of {toolCount}+ AI tools, find the right stack for your
 marketing workflow, and start getting better results — faster.
 </p>
 <div className="flex flex-wrap justify-center gap-4">
 <Link
 href="/tools"
 className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold transition-all hover:shadow-lg hover:shadow-green-500/25 hover:-translate-y-0.5"
 >
 Explore All {toolCount} Tools
 <ArrowRight className="w-4 h-4" />
 </Link>
 <Link
 href="/categories"
 className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl border border-gray-200 text-gray-800 hover:border-green-500/30 hover:text-white transition-all"
 >
 Browse by Category
 </Link>
 </div>
 </div>
 </section>
 </div>
 );
}
