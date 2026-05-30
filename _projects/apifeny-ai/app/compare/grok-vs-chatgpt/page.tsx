import { Metadata } from 'next';
import Link from 'next/link';
import {
 ArrowLeft,
 ArrowRight,
 CheckCircle2,
 XCircle,
 DollarSign,
 Code,
 Globe,
 Brain,
 MessageSquare,
 Sparkles,
 BookOpen,
 BarChart3,
 Users,
 ChevronRight,
 Star,
 Shield,
 Zap,
} from 'lucide-react';
import BreadcrumbSchema from '@/components/BreadcrumbSchema';

const BASE_URL = 'https://apifeny-ai.vercel.app';

export const metadata: Metadata = {
 title: 'Grok vs ChatGPT 2026 — Pricing, Coding, Features Compared | Apifeny AI',
 description:
 'Grok (xAI) vs ChatGPT (OpenAI) head-to-head: pricing ($30 SuperGrok vs $20 Plus), 1M context window, real-time X data, image gen (Aurora vs DALL-E 3), voice mode, coding. Which AI assistant wins in 2026?',
 keywords: [
 'Grok vs ChatGPT',
 'xAI Grok vs OpenAI ChatGPT',
 'Grok 3 vs GPT-4o',
 'SuperGrok vs ChatGPT Plus',
 'Grok pricing',
 'ChatGPT alternatives',
 'AI assistant comparison',
 'best AI for real-time data',
 'Grok uncensored vs ChatGPT',
 'AI tools 2026 comparison',
 ],
 alternates: { canonical: `${BASE_URL}/compare/grok-vs-chatgpt` },
 openGraph: {
 title: 'Grok vs ChatGPT 2026 — Pricing, Coding, Features Compared',
 description:
 'Grok (xAI) vs ChatGPT (OpenAI): pricing ($30 vs $20), 1M context, X data, image gen, coding. Which AI assistant wins for developers and X power users?',
 url: `${BASE_URL}/compare/grok-vs-chatgpt`,
 siteName: 'Apifeny AI',
 type: 'website',
 images: [{ url: '/og', width: 1200, height: 630 }],
 },
 twitter: {
 card: 'summary_large_image',
 title: 'Grok vs ChatGPT 2026 — Pricing, Coding, Features Compared',
 description:
 'Pricing ($30 SuperGrok vs $20 Plus), 1M context, X integration, image gen — which AI wins for your workflow?',
 images: ['/og'],
 },
 robots: { index: true, follow: true },
};

// ─── Data ────────────────────────────────────────────────────────────
const VERDICT_SCORES = {
 grok: {
 pricing: 4.0,
 context: 9.5,
 coding: 8.0,
 multimodal: 7.0,
 writing: 7.5,
 realtime: 10,
 ecosystem: 5.0,
 },
 chatgpt: {
 pricing: 5.0,
 context: 6.5,
 coding: 8.5,
 multimodal: 9.0,
 writing: 9.5,
 realtime: 7.5,
 ecosystem: 9.5,
 },
} as const;

const COMPARISON_ROWS = [
 {
 category: 'Pricing',
 icon: DollarSign,
 items: [
 {
 label: 'Free Tier',
 grok: '⚠️ Limited (some free uses via X Premium).',
 chatgpt: '⚠️ Limited (GPT-4o mini, rate-limited).',
 winner: 'tie',
 },
 {
 label: 'Paid Tier',
 grok: '$30/mo SuperGrok · Also via X Premium+ ($16/mo)',
 chatgpt: '$20/mo Plus · $200/mo Pro',
 winner: 'chatgpt',
 },
 {
 label: 'API Pricing (Input)',
 grok: '$5.00 / M tokens (Grok-3)',
 chatgpt: '$2.50 / M tokens (GPT-4o)',
 winner: 'chatgpt',
 },
 {
 label: 'API Pricing (Output)',
 grok: '$15.00 / M tokens',
 chatgpt: '$10.00 / M tokens',
 winner: 'chatgpt',
 },
 ],
 },
 {
 category: 'Context & Reasoning',
 icon: Brain,
 items: [
 {
 label: 'Context Window',
 grok: '⭐ 1M tokens — industry-leading',
 chatgpt: '128K tokens',
 winner: 'grok',
 },
 {
 label: 'Long Document Handling',
 grok: 'Excellent. Can ingest entire codebases, long books, massive datasets.',
 chatgpt: 'Good for medium-sized documents. Struggles beyond ~80K tokens.',
 winner: 'grok',
 },
 {
 label: 'Reasoning (Math/Logic)',
 grok: 'Very good on technical reasoning and logic puzzles.',
 chatgpt: '⭐ Strong multi-step reasoning with o3. Broad coverage.',
 winner: 'chatgpt',
 },
 {
 label: 'Knowledge Cutoff',
 grok: 'Real-time via X feed. No static cutoff.',
 chatgpt: 'Varies by model. Latest GPT-4o has ~2025 cutoff with browsing.',
 winner: 'grok',
 },
 ],
 },
 {
 category: 'Coding',
 icon: Code,
 items: [
 {
 label: 'Code Generation',
 grok: 'Good. Clean output, strong on Python and JS. Less verbose.',
 chatgpt: 'Very good. Verbose, well-commented, strong full-stack support.',
 winner: 'chatgpt',
 },
 {
 label: 'Debugging',
 grok: 'Decent. Sacrcasm and personality in responses. Quick on simple bugs.',
 chatgpt: 'Solid. Step-by-step explanations, thorough analysis.',
 winner: 'chatgpt',
 },
 {
 label: 'Context for Large Codebases',
 grok: '⭐ 1M context means entire repos in one go.',
 chatgpt: '128K context — good for medium codebases.',
 winner: 'grok',
 },
 {
 label: 'Code Quality Score',
 grok: '8.0 / 10',
 chatgpt: '8.5 / 10',
 winner: 'chatgpt',
 },
 ],
 },
 {
 category: 'Multimodal',
 icon: Globe,
 items: [
 {
 label: 'Image Generation',
 grok: 'Aurora — excellent photorealistic images.',
 chatgpt: 'DALL-E 3 — strong results, better text rendering.',
 winner: 'tie',
 },
 {
 label: 'Image Understanding',
 grok: 'Good. Can analyze images uploaded.',
 chatgpt: '⭐ Excellent. Detailed descriptions, OCR, visual reasoning.',
 winner: 'chatgpt',
 },
 {
 label: 'Voice Mode',
 grok: 'Available in SuperGrok. Decent quality.',
 chatgpt: '⭐ Best-in-class. Natural conversation, tone variation, accents.',
 winner: 'chatgpt',
 },
 {
 label: 'Video & File Support',
 grok: 'Limited. Images + text primarily.',
 chatgpt: 'Text, image, voice, video, file uploads, code interpreter.',
 winner: 'chatgpt',
 },
 ],
 },
 {
 category: 'Writing & Content',
 icon: MessageSquare,
 items: [
 {
 label: 'Creative Writing',
 grok: 'Fun, witty, personality-driven. Less formal, more conversational.',
 chatgpt: '⭐ Excellent. Varied tone, strong storytelling, imaginative.',
 winner: 'chatgpt',
 },
 {
 label: 'Technical Writing',
 grok: 'Direct and concise. Good for documentation.',
 chatgpt: '⭐ Precise, well-structured, thorough. Adapts to audience.',
 winner: 'chatgpt',
 },
 {
 label: 'Long-Form Content',
 grok: 'Good — 1M context means very long pieces possible.',
 chatgpt: 'Good but can lose coherence in very long pieces.',
 winner: 'grok',
 },
 {
 label: 'Tone & Personality',
 grok: '⭐ Bold, unfiltered, humorous. Distinct personality.',
 chatgpt: 'Professional, adaptable, polished. Less distinctive.',
 winner: 'grok',
 },
 ],
 },
 {
 category: 'Real-Time Data & Search',
 icon: Zap,
 items: [
 {
 label: 'Real-Time Information',
 grok: '⭐ Live X feed integration. Up-to-the-minute news.',
 chatgpt: 'Web browsing. Near real-time but no social feed.',
 winner: 'grok',
 },
 {
 label: 'News & Events',
 grok: '⭐ Taps into X trends, viral posts, breaking news instantly.',
 chatgpt: 'Web search. Reliable but slower than social feed.',
 winner: 'grok',
 },
 {
 label: 'Research Citations',
 grok: 'Sources from X posts + web. Less formal citations.',
 chatgpt: '⭐ Web search with clear source citations and links.',
 winner: 'chatgpt',
 },
 {
 label: 'Market / Social Sentiment',
 grok: '⭐ Real-time social sentiment directly from X.',
 chatgpt: 'Limited. Web search but no social media integration.',
 winner: 'grok',
 },
 ],
 },
 {
 category: 'Ecosystem & Features',
 icon: Code,
 items: [
 {
 label: 'Plugin / Store',
 grok: 'None. Standalone chat + X integration.',
 chatgpt: '⭐ GPTs store, custom plugins, extensive community.',
 winner: 'chatgpt',
 },
 {
 label: 'Web Search',
 grok: 'Uses X search. No dedicated web browser.',
 chatgpt: '⭐ Full web browsing with Bing/DuckDuckGo.',
 winner: 'chatgpt',
 },
 {
 label: 'Mobile App',
 grok: 'Available via X app. Dedicated Grok app.',
 chatgpt: '⭐ Polished iOS/Android apps with voice mode.',
 winner: 'chatgpt',
 },
 {
 label: 'API & Developer Tools',
 grok: 'REST API available. Growing but limited SDKs.',
 chatgpt: '⭐ Mature API, extensive SDKs, assistants API, fine-tuning.',
 winner: 'chatgpt',
 },
 ],
 },
];

const USE_CASES = [
 {
 icon: Zap,
 title: 'Real-Time News & Social Monitoring',
 verdict: 'Grok wins — unmatched X/Twitter integration for instant updates.',
 details:
 'Grok\'s direct pipeline to X makes it the best AI for staying on top of breaking news, viral trends, and social sentiment. For journalists, traders, marketers, and anyone who needs real-time information, Grok is the clear choice. ChatGPT\'s web browsing is too slow for social-speed updates.',
 best: 'Grok',
 },
 {
 icon: Code,
 title: 'Coding & Development',
 verdict: 'ChatGPT wins — better code quality, debugging, and ecosystem.',
 details:
 'ChatGPT produces cleaner, more production-ready code with better comments. The broader ecosystem (GitHub Copilot integration, GPTs for dev workflows) gives it an edge. Grok\'s 1M context is impressive for dumping entire repos, but code quality and tooling still favour ChatGPT.',
 best: 'ChatGPT',
 },
 {
 icon: Brain,
 title: 'Long-Context Analysis & Research',
 verdict: 'Grok wins — 1M context opens use cases ChatGPT cannot match.',
 details:
 'With an 8x larger context window, Grok can ingest entire books, massive datasets, and large codebases in a single request. For researchers analyzing huge documents or developers needing full-repo context, Grok is transformative. ChatGPT simply cannot compete here.',
 best: 'Grok',
 },
 {
 icon: MessageSquare,
 title: 'Creative & Technical Writing',
 verdict: 'ChatGPT wins — more versatile, polished, and professional output.',
 details:
 'For content creators, marketers, and writers, ChatGPT produces more natural, engaging, and well-structured content. Grok\'s personality is charming for chat but less suited for professional content. If your output needs to be published, ChatGPT is the safer bet.',
 best: 'ChatGPT',
 },
 {
 icon: Star,
 title: 'General AI Assistant',
 verdict: 'ChatGPT wins — more reliable, feature-rich, and well-rounded.',
 details:
 'As a daily driver for general tasks — research, email, brainstorming, learning — ChatGPT is the more mature product. Grok is catching up fast but still lacks the polish, ecosystem, and reliability of ChatGPT for everyday use.',
 best: 'ChatGPT',
 },
];

const FAQS = [
 {
 q: 'Which is better: Grok or ChatGPT?',
 a: 'It depends on your use case. Grok excels at real-time information (X integration), long-context tasks (1M tokens), and has a bold personality. ChatGPT wins on writing quality, ecosystem (GPTs, plugins), multimodal capabilities, and maturity. Most professionals find ChatGPT more versatile for daily work, while Grok is the best choice for X-heavy workflows and massive document analysis.',
 },
 {
 q: 'Is Grok really uncensored?',
 a: 'Grok has a more permissive tone than ChatGPT and leans into "edgy" or unfiltered responses. It handles topics ChatGPT might refuse. However, it still has guardrails and will refuse harmful requests. The difference is more in tone and personality than in actual safety boundaries.',
 },
 {
 q: 'Does Grok have a free tier?',
 a: 'Limited free access is available through X. For full Grok-3 with higher rate limits, image generation (Aurora), and voice mode, SuperGrok costs $30/month. X Premium+ subscribers ($16/month) also get Grok access.',
 },
 {
 q: 'Can Grok search the web?',
 a: 'Grok uses X search, not traditional web search. It can surface information from X posts, threads, and linked content. For full web search with standard citations, ChatGPT has the edge. If you need web search, ChatGPT or Perplexity are better choices.',
 },
 {
 q: 'Which has better image generation?',
 a: 'Grok uses Aurora (xAI\'s model) and produces impressive photorealistic images. ChatGPT uses DALL-E 3, which excels at text rendering, creative compositions, and consistency. Both are excellent but excel in different styles. Tie.',
 },
 {
 q: 'Should I get both?',
 a: 'If you\'re an X power user, journalist, trader, or researcher dealing with very large documents — Grok is worth the $30/month alongside ChatGPT. For most users, ChatGPT Plus at $20/month is sufficient, and Grok becomes valuable as a supplement for specific workflows.',
 },
];

// ─── Helpers ──────────────────────────────────────────────────────────
function ScoreBar({ score, label }: { score: number; label: string }) {
 const color =
 score >= 9 ? 'bg-neon' : score >= 7.5 ? 'bg-aqua' : score >= 6 ? 'bg-yellow-500' : 'bg-red-500';
 return (
 <div className="flex items-center gap-3">
 <span className="text-xs text-tech-400 w-24 shrink-0">{label}</span>
 <div className="flex-1 h-2.5 rounded-full bg-tech-700 overflow-hidden">
 <div
 className={`h-full rounded-full transition-all ${color}`}
 style={{ width: `${score * 10}%` }}
 />
 </div>
 <span className="text-xs font-mono text-tech-300 w-8 text-right">{score.toFixed(1)}</span>
 </div>
 );
}

function WinnerBadge({ winner }: { winner: string }) {
 if (winner === 'grok') {
 return (
 <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-neon-light bg-neon/10 px-2 py-0.5 rounded-full">
 <Zap className="w-3 h-3" />
 Grok
 </span>
 );
 }
 if (winner === 'chatgpt') {
 return (
 <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-aqua bg-aqua/10 px-2 py-0.5 rounded-full">
 <Sparkles className="w-3 h-3" />
 ChatGPT
 </span>
 );
 }
 return (
 <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-yellow-400 bg-yellow-400/10 px-2 py-0.5 rounded-full">
 Tie
 </span>
 );
}

export default function GrokVsChatGPTCompare() {
 return (
 <div className="min-h-screen bg-tech-900">
 <BreadcrumbSchema
 items={[
 { name: 'Home', item: '/' },
 { name: 'Compare', item: '/compare' },
 { name: 'Grok vs ChatGPT', item: '/compare/grok-vs-chatgpt' },
 ]}
 />

 <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
 {/* Back link */}
 <Link
 href="/tools"
 className="inline-flex items-center gap-1.5 text-sm text-tech-400 hover:text-neon-light transition mb-6 group"
 >
 <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition" />
 Back to Tools
 </Link>

 {/* ─── Hero ─────────────────────────────────────────────── */}
 <section className="relative mb-12">
 <div className="relative rounded-2xl bg-gradient-to-br from-zinc-500/10 via-neon/5 to-tech-800 border border-tech-500/30 p-8 sm:p-12">
 <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neon/10 border border-neon/20 text-neon-light text-xs font-medium mb-4">
 <Star className="w-3.5 h-3.5" />
 Head-to-Head Comparison
 </div>
 <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
 Grok vs ChatGPT{' '}
 <span className="bg-gradient-to-r from-neon-light to-aqua bg-clip-text text-transparent">
 2026
 </span>
 </h1>
 <p className="text-sm sm:text-base text-tech-100/70 max-w-2xl mb-6">
 Elon Musk&apos;s xAI takes on OpenAI&apos;s ChatGPT — and it&apos;s closer than you think. Grok
 brings a massive 1M-token context window, real-time X data integration, and an
 unfiltered personality. But ChatGPT still dominates creative writing, multimodal
 capabilities, and the plugin ecosystem. We put both through every test that matters.
 </p>

 {/* Quick stat pills */}
 <div className="flex flex-wrap gap-3">
 <div className="px-3 py-1.5 rounded-lg bg-tech-700/60 border border-tech-500/20 text-xs text-tech-200">
 <span className="text-neon-light font-semibold">Grok 3</span> — $30/mo SuperGrok
 </div>
 <div className="px-3 py-1.5 rounded-lg bg-tech-700/60 border border-tech-500/20 text-xs text-tech-200">
 <span className="text-aqua font-semibold">ChatGPT</span> — $20/mo Plus
 </div>
 <div className="px-3 py-1.5 rounded-lg bg-tech-700/60 border border-tech-500/20 text-xs text-tech-200">
 Grok wins: 1M context · X data
 </div>
 <div className="px-3 py-1.5 rounded-lg bg-tech-700/60 border border-tech-500/20 text-xs text-tech-200">
 ChatGPT wins: Ecosystem · Writing
 </div>
 </div>
 </div>
 </section>

 {/* ─── Table of Contents ─────────────────────────────────── */}
 <section className="mb-12">
 <div className="bg-tech-800/40 border border-tech-500/20 rounded-xl p-6">
 <h2 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
 <BookOpen className="w-4 h-4 text-neon" />
 Table of Contents
 </h2>
 <nav className="grid grid-cols-1 sm:grid-cols-2 gap-2">
 {[
 { href: '#verdict', label: 'Quick Verdict · Scorecard' },
 { href: '#pricing', label: 'Pricing Breakdown' },
 { href: '#context', label: 'Context & Reasoning' },
 { href: '#coding', label: 'Coding & Development' },
 { href: '#multimodal', label: 'Multimodal Capabilities' },
 { href: '#writing', label: 'Writing & Content' },
 { href: '#realtime', label: 'Real-Time Data & Search' },
 { href: '#ecosystem', label: 'Ecosystem & Features' },
 { href: '#usecases', label: 'Use Cases — Who Wins What' },
 { href: '#recommendation', label: 'Recommendation for Professionals' },
 { href: '#faq', label: 'FAQ' },
 ].map((item) => (
 <a
 key={item.href}
 href={item.href}
 className="flex items-center gap-2 text-sm text-tech-300 hover:text-neon-light transition px-3 py-2 rounded-lg hover:bg-tech-700/40"
 >
 <ChevronRight className="w-3 h-3 shrink-0" />
 {item.label}
 </a>
 ))}
 </nav>
 </div>
 </section>

 {/* ─── Quick Verdict Scorecard ────────────────────────────── */}
 <section id="verdict" className="mb-12 scroll-mt-20">
 <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
 <BarChart3 className="w-6 h-6 text-neon" />
 Quick Verdict · Scorecard
 </h2>

 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
 {/* Grok */}
 <div className="rounded-xl bg-tech-800/50 border border-neon/30 p-6">
 <div className="flex items-center gap-3 mb-4">
 <div className="w-10 h-10 rounded-lg bg-neon/20 flex items-center justify-center">
 <Zap className="w-5 h-5 text-neon-light" />
 </div>
 <div>
 <h3 className="text-lg font-bold text-white">Grok 3</h3>
 <p className="text-xs text-tech-400">xAI — Proprietary</p>
 </div>
 </div>
 <div className="space-y-2.5">
 <ScoreBar score={VERDICT_SCORES.grok.pricing} label="Pricing" />
 <ScoreBar score={VERDICT_SCORES.grok.context} label="Context & Reasoning" />
 <ScoreBar score={VERDICT_SCORES.grok.coding} label="Coding" />
 <ScoreBar score={VERDICT_SCORES.grok.multimodal} label="Multimodal" />
 <ScoreBar score={VERDICT_SCORES.grok.writing} label="Writing" />
 <ScoreBar score={VERDICT_SCORES.grok.realtime} label="Real-Time Data" />
 <ScoreBar score={VERDICT_SCORES.grok.ecosystem} label="Ecosystem" />
 </div>
 </div>

 {/* ChatGPT */}
 <div className="rounded-xl bg-tech-800/50 border border-aqua/30 p-6">
 <div className="flex items-center gap-3 mb-4">
 <div className="w-10 h-10 rounded-lg bg-aqua/20 flex items-center justify-center">
 <Sparkles className="w-5 h-5 text-aqua" />
 </div>
 <div>
 <h3 className="text-lg font-bold text-white">ChatGPT</h3>
 <p className="text-xs text-tech-400">GPT-4o — Proprietary</p>
 </div>
 </div>
 <div className="space-y-2.5">
 <ScoreBar score={VERDICT_SCORES.chatgpt.pricing} label="Pricing" />
 <ScoreBar score={VERDICT_SCORES.chatgpt.context} label="Context & Reasoning" />
 <ScoreBar score={VERDICT_SCORES.chatgpt.coding} label="Coding" />
 <ScoreBar score={VERDICT_SCORES.chatgpt.multimodal} label="Multimodal" />
 <ScoreBar score={VERDICT_SCORES.chatgpt.writing} label="Writing" />
 <ScoreBar score={VERDICT_SCORES.chatgpt.realtime} label="Real-Time Data" />
 <ScoreBar score={VERDICT_SCORES.chatgpt.ecosystem} label="Ecosystem" />
 </div>
 </div>
 </div>

 <div className="mt-6 p-4 rounded-lg bg-tech-800/30 border border-tech-500/20">
 <p className="text-sm text-tech-200 text-center">
 <strong className="text-neon-light">Grok</strong> wins on: context window, real-time data, personality ·{' '}
 <strong className="text-aqua">ChatGPT</strong> wins on: pricing, writing, multimodal, ecosystem ·{' '}
 <strong className="text-white">Tie</strong> on: image generation
 </p>
 </div>
 </section>

 {/* ─── Full Comparison Tables ──────────────────────────────── */}
 {COMPARISON_ROWS.map((section) => (
 <section
 key={section.category}
 id={section.category.toLowerCase()}
 className="mb-12 scroll-mt-20"
 >
 <div className="flex items-center gap-3 mb-6">
 <section.icon className="w-6 h-6 text-neon" />
 <h2 className="text-2xl font-bold text-white">{section.category}</h2>
 </div>

 <div className="overflow-x-auto rounded-xl border border-tech-500/20">
 <table className="w-full text-sm">
 <thead>
 <tr className="bg-tech-800/80">
 <th className="text-left px-4 py-3 text-tech-200 font-semibold border-b border-tech-500/20 w-[25%]">
 Aspect
 </th>
 <th className="text-left px-4 py-3 text-neon-light font-semibold border-b border-tech-500/20 w-[30%]">
 Grok
 </th>
 <th className="text-left px-4 py-3 text-aqua font-semibold border-b border-tech-500/20 w-[30%]">
 ChatGPT
 </th>
 <th className="text-left px-4 py-3 text-tech-400 font-semibold border-b border-tech-500/20 w-[15%]">
 Winner
 </th>
 </tr>
 </thead>
 <tbody className="divide-y divide-tech-500/10">
 {section.items.map((row, i) => (
 <tr
 key={row.label}
 className={i % 2 === 0 ? 'bg-tech-900/40' : 'bg-tech-800/20'}
 >
 <td className="px-4 py-3 text-tech-200 font-medium">{row.label}</td>
 <td className="px-4 py-3 text-tech-300">{row.grok}</td>
 <td className="px-4 py-3 text-tech-300">{row.chatgpt}</td>
 <td className="px-4 py-3">
 <WinnerBadge winner={row.winner} />
 </td>
 </tr>
 ))}
 </tbody>
 </table>
 </div>
 </section>
 ))}

 {/* ─── Use Cases ─────────────────────────────────────────── */}
 <section id="usecases" className="mb-12 scroll-mt-20">
 <div className="flex items-center gap-3 mb-6">
 <Users className="w-6 h-6 text-neon" />
 <h2 className="text-2xl font-bold text-white">Use Cases — Who Wins What</h2>
 </div>

 <div className="space-y-4">
 {USE_CASES.map((uc) => (
 <div
 key={uc.title}
 className="rounded-xl bg-tech-800/40 border border-tech-500/20 p-6 hover:border-neon/30 transition"
 >
 <div className="flex items-start gap-4">
 <div className="w-10 h-10 rounded-lg bg-neon/10 flex items-center justify-center shrink-0">
 <uc.icon className="w-5 h-5 text-neon-light" />
 </div>
 <div className="flex-1 min-w-0">
 <h3 className="text-lg font-semibold text-white mb-1">{uc.title}</h3>
 <p className="text-sm text-neon-light font-medium mb-2">{uc.verdict}</p>
 <p className="text-sm text-tech-300 leading-relaxed">{uc.details}</p>
 </div>
 <div className="shrink-0">
 <span
 className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full ${
 uc.best === 'Grok'
 ? 'bg-neon/10 text-neon-light border border-neon/30'
 : uc.best === 'ChatGPT'
 ? 'bg-aqua/10 text-aqua border border-aqua/30'
 : 'bg-yellow-400/10 text-yellow-400 border border-yellow-400/30'
 }`}
 >
 {uc.best === 'Grok' ? (
 <Zap className="w-3 h-3" />
 ) : uc.best === 'ChatGPT' ? (
 <Sparkles className="w-3 h-3" />
 ) : (
 <CheckCircle2 className="w-3 h-3" />
 )}
 {uc.best}
 </span>
 </div>
 </div>
 </div>
 ))}
 </div>
 </section>

 {/* ─── Recommendation ──────────────────────────────────────── */}
 <section id="recommendation" className="mb-12 scroll-mt-20">
 <div className="relative rounded-2xl bg-gradient-to-br from-zinc-500/10 via-tech-800 to-aqua/5 border border-tech-500/30 p-8 sm:p-10 overflow-hidden">
 <div className="absolute inset-0 bg-tech-grid opacity-20" />
 <div className="relative">
 <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neon/10 border border-neon/20 text-neon-light text-xs font-medium mb-4">
 <Shield className="w-3.5 h-3.5" />
 Our Take
 </div>
 <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
 Recommendation for Professionals
 </h2>

 <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
 <div className="rounded-xl bg-tech-800/60 border border-neon/20 p-5">
 <div className="flex items-center gap-2 mb-3">
 <Zap className="w-5 h-5 text-neon-light" />
 <h3 className="text-base font-bold text-white">Choose Grok if you:</h3>
 </div>
 <ul className="space-y-2">
 {[
 'Need real-time X/Twitter data for news or sentiment',
 'Work with massive documents — entire codebases, books, reports',
 'Prefer bold, unfiltered AI with personality',
 'Are a journalist, trader, or social media analyst',
 'Want the longest context window available',
 ].map((item) => (
 <li key={item} className="flex items-start gap-2 text-sm text-tech-200">
 <CheckCircle2 className="w-4 h-4 text-neon-light mt-0.5 shrink-0" />
 {item}
 </li>
 ))}
 </ul>
 </div>

 <div className="rounded-xl bg-tech-800/60 border border-aqua/20 p-5">
 <div className="flex items-center gap-2 mb-3">
 <Sparkles className="w-5 h-5 text-aqua" />
 <h3 className="text-base font-bold text-white">Choose ChatGPT if you:</h3>
 </div>
 <ul className="space-y-2">
 {[
 'Create English content — blogs, copy, social media',
 'Need the richest ecosystem: DALL-E, GPTs, plugins',
 'Want multimodal — voice, image, video, file uploads',
 'Prefer polished, reliable output for professional work',
 'Build AI automations with mature APIs and SDKs',
 ].map((item) => (
 <li key={item} className="flex items-start gap-2 text-sm text-tech-200">
 <CheckCircle2 className="w-4 h-4 text-aqua mt-0.5 shrink-0" />
 {item}
 </li>
 ))}
 </ul>
 </div>
 </div>

 {/* Bottom line */}
 <div className="bg-tech-900/60 border border-tech-500/30 rounded-xl p-5">
 <h3 className="text-base font-bold text-white mb-2 flex items-center gap-2">
 <Star className="w-5 h-5 text-yellow-400" />
 The Smartest Setup
 </h3>
 <p className="text-sm text-tech-200 leading-relaxed">
 For power users, <strong className="text-neon-light">both</strong> complement each
 other well. $50/month total gives you Grok for real-time X monitoring, massive
 document analysis, and its unique personality — plus ChatGPT for writing,
 multimodal tasks, and the plugin ecosystem. Grok is the specialist for
 context-heavy and X-centric work; ChatGPT is the versatile daily driver.
 </p>
 </div>
 </div>
 </div>
 </section>

 {/* ─── FAQ ────────────────────────────────────────────────── */}
 <section id="faq" className="mb-12 scroll-mt-20">
 <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
 <MessageSquare className="w-6 h-6 text-neon" />
 Frequently Asked Questions
 </h2>

 <div className="space-y-3">
 {FAQS.map((faq, i) => (
 <details
 key={i}
 className="group rounded-xl bg-tech-800/40 border border-tech-500/20 overflow-hidden"
 >
 <summary className="flex items-center justify-between px-5 py-4 cursor-pointer text-sm font-medium text-white hover:text-neon-light transition list-none">
 {faq.q}
 <ChevronRight className="w-4 h-4 text-tech-400 group-open:rotate-90 transition shrink-0" />
 </summary>
 <div className="px-5 pb-4 text-sm text-tech-300 leading-relaxed border-t border-tech-500/10 pt-3">
 {faq.a}
 </div>
 </details>
 ))}
 </div>
 </section>

 {/* ─── Related CTA ───────────────────────────────────────── */}
 <section className="rounded-xl bg-tech-800/60 border border-dashed border-tech-500/30 p-8 text-center">
 <h2 className="text-xl font-bold text-white mb-2">Still comparing?</h2>
 <p className="text-sm text-tech-300 max-w-md mx-auto mb-4">
 Browse our full directory of AI tools with Asia-ready filters and editorial rankings.
 </p>
 <div className="flex flex-wrap items-center justify-center gap-3">
 <Link
 href="/tools"
 className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-neon hover:bg-neon-dark text-white text-sm font-medium transition"
 >
 Browse all AI tools
 <ArrowRight className="w-4 h-4" />
 </Link>
 <Link
 href="/compare/chatgpt-vs-claude"
 className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-tech-500/40 text-tech-200 hover:text-white hover:border-neon/40 text-sm font-medium transition"
 >
 ChatGPT vs Claude
 <ChevronRight className="w-4 h-4" />
 </Link>
 </div>
 </section>

 {/* ─── JSON-LD FAQ Schema ───────────────────────────────── */}
 <script
 type="application/ld+json"
 dangerouslySetInnerHTML={{
 __html: JSON.stringify({
 '@context': 'https://schema.org',
 '@type': 'FAQPage',
 mainEntity: FAQS.map((faq) => ({
 '@type': 'Question',
 name: faq.q,
 acceptedAnswer: {
 '@type': 'Answer',
 text: faq.a,
 },
 })),
 }),
 }}
 />
 </div>
 </div>
 );
}
