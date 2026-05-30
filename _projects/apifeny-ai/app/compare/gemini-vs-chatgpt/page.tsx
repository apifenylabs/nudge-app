import { Metadata } from 'next';
import Link from 'next/link';
import {
 ArrowLeft,
 ArrowRight,
 CheckCircle2,
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
 Search,
 Image,
} from 'lucide-react';
import BreadcrumbSchema from '@/components/BreadcrumbSchema';

const BASE_URL = 'https://apifeny-ai.vercel.app';

export const metadata: Metadata = {
 title: 'Gemini vs ChatGPT 2026 — Pricing, Features, Benchmarks Compared | Apifeny AI',
 description:
 'Google Gemini vs ChatGPT head-to-head: pricing (free vs $20/mo vs $20/mo), multimodal, Google ecosystem integration, coding, and which AI wins for Asia-based businesses in 2026.',
 keywords: [
 'Gemini vs ChatGPT',
 'Google Gemini vs ChatGPT',
 'Gemini pricing',
 'ChatGPT alternatives',
 'Google AI comparison',
 'best AI for multimodal',
 'Gemini Advanced review',
 'ChatGPT vs Gemini for developers',
 'AI tools Asia',
 'Gemini Google ecosystem',
 ],
 alternates: { canonical: `${BASE_URL}/compare/gemini-vs-chatgpt` },
 openGraph: {
 title: 'Gemini vs ChatGPT 2026 — Pricing, Features, Benchmarks Compared',
 description:
 'Google Gemini vs ChatGPT: pricing (free vs $20/mo), multimodal capabilities, Google ecosystem integration, coding benchmarks. Which AI wins for businesses in Asia?',
 url: `${BASE_URL}/compare/gemini-vs-chatgpt`,
 siteName: 'Apifeny AI',
 type: 'website',
 images: [{ url: '/og', width: 1200, height: 630 }],
 },
 twitter: {
 card: 'summary_large_image',
 title: 'Gemini vs ChatGPT 2026 — Pricing, Features, Benchmarks Compared',
 description:
 'Multimodal, pricing, Google ecosystem — which AI wins for businesses in Asia?',
 images: ['/og'],
 },
 robots: { index: true, follow: true },
};

// ─── Data ────────────────────────────────────────────────────────────
const VERDICT_SCORES = {
 gemini: {
 multimodal: 9.5,
 ecosystem: 9.0,
 coding: 8.0,
 writing: 7.5,
 pricing: 8.5,
 reasoning: 8.0,
 research: 7.5,
 },
 chatgpt: {
 multimodal: 9.0,
 ecosystem: 8.5,
 coding: 8.5,
 writing: 9.5,
 pricing: 5.0,
 reasoning: 9.0,
 research: 7.0,
 },
} as const;

const COMPARISON_ROWS = [
 {
 category: 'Pricing',
 icon: DollarSign,
 items: [
 {
 label: 'Free Tier',
 gemini: '✅ Gemini 2.0 Flash — full access, no limits.',
 chatgpt: '⚠️ Limited (GPT-4o mini, no reasoning models).',
 winner: 'gemini',
 },
 {
 label: 'Paid Tier',
 gemini: '$19.99/mo Gemini Advanced (Google One AI Premium). Includes 2TB storage.',
 chatgpt: '$20/mo Plus · $200/mo Pro',
 winner: 'gemini',
 },
 {
 label: 'API Cost (Input)',
 gemini: '$0.10 / M tokens (Flash) · $1.25 / M tokens (Pro)',
 chatgpt: '$2.50 / M tokens',
 winner: 'gemini',
 },
 {
 label: 'API Cost (Output)',
 gemini: '$0.40 / M tokens (Flash) · $5.00 / M tokens (Pro)',
 chatgpt: '$10.00 / M tokens',
 winner: 'gemini',
 },
 ],
 },
 {
 category: 'Multimodal',
 icon: Image,
 items: [
 {
 label: 'Native Multimodal',
 gemini: '⭐ Natively multimodal — text, images, audio, video as first-class inputs.',
 chatgpt: 'Multimodal but text-first. Strong image generation (DALL-E).',
 winner: 'gemini',
 },
 {
 label: 'Video Understanding',
 gemini: '✅ Full video understanding. Watch and analyze entire videos.',
 chatgpt: 'Limited. Can analyze video frames but no native video understanding.',
 winner: 'gemini',
 },
 {
 label: 'Audio / Voice',
 gemini: '✅ Native audio understanding + Gemini Live voice mode.',
 chatgpt: '✅ ChatGPT Voice / Advanced Voice Mode. More natural conversation.',
 winner: 'tie',
 },
 {
 label: 'Image Generation',
 gemini: '✅ Imagen 3 — high-quality, editable outputs.',
 chatgpt: '✅ DALL-E 3 — strong creative direction, consistent style.',
 winner: 'tie',
 },
 ],
 },
 {
 category: 'Coding & Development',
 icon: Code,
 items: [
 {
 label: 'Code Generation',
 gemini: 'Strong. 2M context window handles massive codebases at once.',
 chatgpt: 'Excellent. Clean output, strong on all major languages.',
 winner: 'chatgpt',
 },
 {
 label: 'Context Window',
 gemini: '⭐ 2M tokens — analyze entire codebases in one shot.',
 chatgpt: '128K tokens',
 winner: 'gemini',
 },
 {
 label: 'Debugging',
 gemini: 'Good. Google ecosystem gives unique Android/GCP debugging advantages.',
 chatgpt: 'Excellent. Wider training data, better general debugging.',
 winner: 'chatgpt',
 },
 {
 label: 'Code Quality Score',
 gemini: '8.0 / 10',
 chatgpt: '8.5 / 10',
 winner: 'chatgpt',
 },
 ],
 },
 {
 category: 'Google Ecosystem',
 icon: Globe,
 items: [
 {
 label: 'Gmail / Docs / Drive',
 gemini: '⭐ Deep integration. Summarize Gmail threads, draft in Docs, search Drive.',
 chatgpt: 'No native integration. Requires third-party tools (Zapier, etc.).',
 winner: 'gemini',
 },
 {
 label: 'Search Integration',
 gemini: '✅ Uses Google Search for real-time answers. Cites sources.',
 chatgpt: '⚠️ Limited browsing — requires manual toggle.',
 winner: 'gemini',
 },
 {
 label: 'YouTube Understanding',
 gemini: '✅ Can watch and summarize YouTube videos natively.',
 chatgpt: '❌ No YouTube integration.',
 winner: 'gemini',
 },
 {
 label: 'Workspace Collaboration',
 gemini: '✅ Side panel in Gmail, Docs, Sheets, Slides, Meet.',
 chatgpt: '❌ No native workspace integration.',
 winner: 'gemini',
 },
 ],
 },
 {
 category: 'Writing & Content',
 icon: MessageSquare,
 items: [
 {
 label: 'English Prose',
 gemini: 'Good. Clean and factual but lacks personality.',
 chatgpt: '⭐ Best-in-class. Natural, engaging, adaptable tone.',
 winner: 'chatgpt',
 },
 {
 label: 'Creative Writing',
 gemini: 'Decent. Factual style limits creative output.',
 chatgpt: 'Excellent stories, poems, marketing copy, brand voice.',
 winner: 'chatgpt',
 },
 {
 label: 'Long-form Content',
 gemini: 'Good with 2M context — can work on very long documents.',
 chatgpt: 'Very good prose quality but 128K context limits document size.',
 winner: 'tie',
 },
 ],
 },
];

const USE_CASES = [
 {
 icon: Globe,
 title: 'Google Workspace Productivity',
 verdict: 'Gemini wins — deep integration with Gmail, Docs, Drive, YouTube.',
 details:
 'If your business runs on Google Workspace, Gemini is transformative. It summarizes Gmail threads, drafts documents in your style, searches Drive intelligently, and even watches YouTube videos for you. ChatGPT has no native Google integration at all. For Asia-based solopreneurs on Google Workspace, this is a massive productivity edge.',
 best: 'Gemini',
 },
 {
 icon: Image,
 title: 'Multimodal & Video Analysis',
 verdict: 'Gemini wins — natively multimodal with full video understanding.',
 details:
 'Gemini processes text, images, audio, and video as native input types — not just text with attachments. The 2M token context window means you can feed it entire video files or massive codebases. ChatGPT is catching up but still treats video as frame extraction rather than native understanding.',
 best: 'Gemini',
 },
 {
 icon: MessageSquare,
 title: 'Writing & Content Creation',
 verdict: 'ChatGPT wins — better English prose, more creative, more polished.',
 details:
 'For blog posts, marketing copy, emails, and social media in English, ChatGPT produces more natural and engaging output. Gemini is competent but lacks the creative flair and tonal range that ChatGPT delivers consistently.',
 best: 'ChatGPT',
 },
 {
 icon: Code,
 title: 'Coding & Development',
 verdict: 'Tie — Gemini wins on context, ChatGPT wins on code quality.',
 details:
 'Gemini\'s 2M token context window is a game-changer for large codebase analysis — you can dump an entire project in one shot. But ChatGPT generates cleaner, more production-ready code. For GCP/Android devs, Gemini\'s ecosystem edge matters. For general dev, ChatGPT is slightly stronger.',
 best: 'Tie',
 },
];

const FAQS = [
 {
 q: 'Is Google Gemini better than ChatGPT?',
 a: 'It depends on your use case. Gemini is better for Google Workspace users, multimodal tasks (especially video), and anyone who needs a massive 2M token context window. ChatGPT is better for writing, creative content, and general-purpose coding. Neither is universally "better" — they excel in different areas.',
 },
 {
 q: 'Does Gemini have a mobile app?',
 a: 'Yes — Google Gemini has full iOS and Android apps with Gemini Live voice mode, camera integration (point your camera at something and ask), and Google ecosystem access. The mobile experience is actually more tightly integrated than ChatGPT\'s on Android.',
 },
 {
 q: 'Which has better API for developers?',
 a: 'Gemini\'s API is significantly cheaper — up to 25x cheaper for some use cases. Combined with the 2M context window, it\'s ideal for document-heavy applications. ChatGPT\'s API is more mature with better documentation and broader third-party support.',
 },
 {
 q: 'Is Gemini available in Asia?',
 a: 'Yes — Gemini is available across most Asian countries including Japan, South Korea, Singapore, India, and Taiwan. Some features (like Gemini Live voice mode) may roll out regionally. Google has data centers in Asia, which can mean lower latency.',
 },
 {
 q: 'Can I use both Gemini and ChatGPT?',
 a: 'Yes — and this is our recommended setup. Use Gemini for Google Workspace tasks, video analysis, and large document work where the 2M context shines. Use ChatGPT for content creation, creative writing, and general-purpose assistance. At $40/mo combined (vs $20/mo for just ChatGPT Plus), the coverage is well worth it.',
 },
];

// ─── Helpers ──────────────────────────────────────────────────────────
function ScoreBar({ score, label }: { score: number; label: string }) {
 const color =
 score >= 9 ? 'bg-neon' : score >= 7.5 ? 'bg-aqua' : score >= 6 ? 'bg-yellow-500' : 'bg-red-500';
 return (
 <div className="flex items-center gap-3">
 <span className="text-xs text-tech-400 w-16 shrink-0">{label}</span>
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
 if (winner === 'gemini') {
 return (
 <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-blue-400 bg-blue-400/10 px-2 py-0.5 rounded-full">
 <Zap className="w-3 h-3" />
 Gemini
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

export default function GeminiVsChatGPTCompare() {
 return (
 <div className="min-h-screen bg-tech-900">
 <BreadcrumbSchema
 items={[
 { name: 'Home', item: '/' },
 { name: 'Compare', item: '/compare' },
 { name: 'Gemini vs ChatGPT', item: '/compare/gemini-vs-chatgpt' },
 ]}
 />

 <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
 {/* Back link */}
 <Link
 href="/compare"
 className="inline-flex items-center gap-1.5 text-sm text-tech-400 hover:text-neon-light transition mb-6 group"
 >
 <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition" />
 Back to Comparisons
 </Link>

 {/* ─── Hero ─────────────────────────────────────────────── */}
 <section className="relative mb-12">
 <div className="relative rounded-2xl bg-gradient-to-br from-blue-500/10 via-tech-800 to-cyan-500/5 border border-tech-500/30 p-8 sm:p-12">
 <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 text-xs font-medium mb-4">
 <Star className="w-3.5 h-3.5" />
 Head-to-Head Comparison
 </div>
 <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
 Gemini vs ChatGPT{' '}
 <span className="bg-gradient-to-r from-blue-300 to-cyan-300 bg-clip-text text-transparent">
 2026
 </span>
 </h1>
 <p className="text-sm sm:text-base text-tech-100/70 max-w-2xl mb-6">
 Google Gemini has emerged as the strongest ChatGPT alternative — especially for
 Google Workspace users, multimodal workflows, and cost-conscious developers in Asia.
 But does it beat ChatGPT at the things that matter most? We benchmark them across
 pricing, coding, writing, multimodal capabilities, and ecosystem integration.
 </p>

 {/* Quick stat pills */}
 <div className="flex flex-wrap gap-3">
 <div className="px-3 py-1.5 rounded-lg bg-tech-700/60 border border-tech-500/20 text-xs text-tech-200">
 <span className="text-blue-300 font-semibold">Gemini</span> — Free / $19.99/mo Advanced
 </div>
 <div className="px-3 py-1.5 rounded-lg bg-tech-700/60 border border-tech-500/20 text-xs text-tech-200">
 <span className="text-aqua font-semibold">ChatGPT</span> — $20/mo Plus · $200/mo Pro
 </div>
 <div className="px-3 py-1.5 rounded-lg bg-tech-700/60 border border-tech-500/20 text-xs text-tech-200">
 Gemini: 2M context · ChatGPT: 128K context
 </div>
 </div>
 </div>
 </section>

 {/* ─── Table of Contents ─────────────────────────────────── */}
 <section className="mb-12">
 <div className="bg-tech-800/40 border border-tech-500/20 rounded-xl p-6">
 <h2 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
 <BookOpen className="w-4 h-4 text-blue-400" />
 Table of Contents
 </h2>
 <nav className="grid grid-cols-1 sm:grid-cols-2 gap-2">
 {[
 { href: '#verdict', label: 'Quick Verdict · Scorecard' },
 { href: '#pricing', label: 'Pricing Breakdown' },
 { href: '#multimodal', label: 'Multimodal Capabilities' },
 { href: '#coding', label: 'Coding & Development' },
 { href: '#google-ecosystem', label: 'Google Ecosystem Integration' },
 { href: '#writing', label: 'Writing & Content' },
 { href: '#usecases', label: 'Use Cases — Who Wins What' },
 { href: '#recommendation', label: 'Recommendation for Asia Businesses' },
 { href: '#faq', label: 'FAQ' },
 ].map((item) => (
 <a
 key={item.href}
 href={item.href}
 className="flex items-center gap-2 text-sm text-tech-300 hover:text-blue-300 transition px-3 py-2 rounded-lg hover:bg-tech-700/40"
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
 <BarChart3 className="w-6 h-6 text-blue-400" />
 Quick Verdict · Scorecard
 </h2>

 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
 {/* Gemini */}
 <div className="rounded-xl bg-tech-800/50 border border-blue-500/30 p-6">
 <div className="flex items-center gap-3 mb-4">
 <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
 <Sparkles className="w-5 h-5 text-blue-300" />
 </div>
 <div>
 <h3 className="text-lg font-bold text-white">Gemini</h3>
 <p className="text-xs text-tech-400">2.0 Flash / Pro — Google AI</p>
 </div>
 </div>
 <div className="space-y-2.5">
 <ScoreBar score={VERDICT_SCORES.gemini.multimodal} label="Multimodal" />
 <ScoreBar score={VERDICT_SCORES.gemini.ecosystem} label="Ecosystem" />
 <ScoreBar score={VERDICT_SCORES.gemini.coding} label="Coding" />
 <ScoreBar score={VERDICT_SCORES.gemini.writing} label="Writing" />
 <ScoreBar score={VERDICT_SCORES.gemini.pricing} label="Pricing" />
 <ScoreBar score={VERDICT_SCORES.gemini.reasoning} label="Reasoning" />
 <ScoreBar score={VERDICT_SCORES.gemini.research} label="Research" />
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
 <p className="text-xs text-tech-400">GPT-4o / o3 — OpenAI</p>
 </div>
 </div>
 <div className="space-y-2.5">
 <ScoreBar score={VERDICT_SCORES.chatgpt.multimodal} label="Multimodal" />
 <ScoreBar score={VERDICT_SCORES.chatgpt.ecosystem} label="Ecosystem" />
 <ScoreBar score={VERDICT_SCORES.chatgpt.coding} label="Coding" />
 <ScoreBar score={VERDICT_SCORES.chatgpt.writing} label="Writing" />
 <ScoreBar score={VERDICT_SCORES.chatgpt.pricing} label="Pricing" />
 <ScoreBar score={VERDICT_SCORES.chatgpt.reasoning} label="Reasoning" />
 <ScoreBar score={VERDICT_SCORES.chatgpt.research} label="Research" />
 </div>
 </div>
 </div>

 <div className="mt-6 p-4 rounded-lg bg-tech-800/30 border border-tech-500/20">
 <p className="text-sm text-tech-200 text-center">
 <strong className="text-blue-300">Gemini</strong> wins on: multimodal, ecosystem, pricing, context window ·{' '}
 <strong className="text-aqua">ChatGPT</strong> wins on: writing, coding quality, reasoning ·{' '}
 <strong className="text-white">Tie</strong> on: research
 </p>
 </div>
 </section>

 {/* ─── Full Comparison Tables ──────────────────────────────── */}
 {COMPARISON_ROWS.map((section) => (
 <section
 key={section.category}
 id={section.category.toLowerCase().replace(/ /g, '-')}
 className="mb-12 scroll-mt-20"
 >
 <div className="flex items-center gap-3 mb-6">
 <section.icon className="w-6 h-6 text-blue-400" />
 <h2 className="text-2xl font-bold text-white">{section.category}</h2>
 </div>

 <div className="overflow-x-auto rounded-xl border border-tech-500/20">
 <table className="w-full text-sm">
 <thead>
 <tr className="bg-tech-800/80">
 <th className="text-left px-4 py-3 text-tech-200 font-semibold border-b border-tech-500/20 w-[25%]">
 Aspect
 </th>
 <th className="text-left px-4 py-3 text-blue-300 font-semibold border-b border-tech-500/20 w-[30%]">
 Gemini
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
 <td className="px-4 py-3 text-tech-300">{row.gemini}</td>
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
 <Users className="w-6 h-6 text-blue-400" />
 <h2 className="text-2xl font-bold text-white">Use Cases — Who Wins What</h2>
 </div>

 <div className="space-y-4">
 {USE_CASES.map((uc) => (
 <div
 key={uc.title}
 className="rounded-xl bg-tech-800/40 border border-tech-500/20 p-6 hover:border-blue-500/30 transition"
 >
 <div className="flex items-start gap-4">
 <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center shrink-0">
 <uc.icon className="w-5 h-5 text-blue-300" />
 </div>
 <div className="flex-1 min-w-0">
 <h3 className="text-lg font-semibold text-white mb-1">{uc.title}</h3>
 <p className="text-sm text-blue-300 font-medium mb-2">{uc.verdict}</p>
 <p className="text-sm text-tech-300 leading-relaxed">{uc.details}</p>
 </div>
 <div className="shrink-0">
 <span
 className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full ${
 uc.best === 'Gemini'
 ? 'bg-blue-500/10 text-blue-300 border border-blue-500/30'
 : uc.best === 'ChatGPT'
 ? 'bg-aqua/10 text-aqua border border-aqua/30'
 : 'bg-yellow-400/10 text-yellow-400 border border-yellow-400/30'
 }`}
 >
 {uc.best === 'Gemini' ? (
 <Sparkles className="w-3 h-3" />
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
 <div className="relative rounded-2xl bg-gradient-to-br from-blue-500/10 via-tech-800 to-cyan-500/5 border border-tech-500/30 p-8 sm:p-10 overflow-hidden">
 <div className="absolute inset-0 bg-tech-grid opacity-20" />
 <div className="relative">
 <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 text-xs font-medium mb-4">
 <Shield className="w-3.5 h-3.5" />
 Our Take
 </div>
 <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
 Recommendation for Asia Businesses
 </h2>

 <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
 <div className="rounded-xl bg-tech-800/60 border border-blue-500/20 p-5">
 <div className="flex items-center gap-2 mb-3">
 <Sparkles className="w-5 h-5 text-blue-300" />
 <h3 className="text-base font-bold text-white">Choose Gemini if you:</h3>
 </div>
 <ul className="space-y-2">
 {[
 'Live in Google Workspace — Gmail, Docs, Drive, Meet',
 'Need native video understanding and analysis',
 'Want the best value — $19.99/mo includes 2TB storage',
 'Work with massive documents — 2M context window',
 'Build on Google Cloud or Android',
 ].map((item) => (
 <li key={item} className="flex items-start gap-2 text-sm text-tech-200">
 <CheckCircle2 className="w-4 h-4 text-blue-300 mt-0.5 shrink-0" />
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
 'Create English content professionally — blogs, copy, social',
 'Need the strongest general-purpose coding assistant',
 'Want mature plugins, GPTs, and third-party integrations',
 'Prefer the most natural conversational AI experience',
 'Need multi-platform consistency — web, mobile, API',
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
 Use <strong className="text-blue-300">both</strong>. Gemini for Google Workspace
 productivity, video analysis, large-document work, and budget-friendly API calls.
 ChatGPT for content creation, creative writing, general coding, and the richest
 conversational AI experience. For $40/mo combined, you get the best of Google\'s
 ecosystem and OpenAI\'s language quality.
 </p>
 </div>
 </div>
 </div>
 </section>

 {/* ─── FAQ ────────────────────────────────────────────────── */}
 <section id="faq" className="mb-12 scroll-mt-20">
 <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
 <MessageSquare className="w-6 h-6 text-blue-400" />
 Frequently Asked Questions
 </h2>

 <div className="space-y-3">
 {FAQS.map((faq, i) => (
 <details
 key={i}
 className="group rounded-xl bg-tech-800/40 border border-tech-500/20 overflow-hidden"
 >
 <summary className="flex items-center justify-between px-5 py-4 cursor-pointer text-sm font-medium text-white hover:text-blue-300 transition list-none">
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
 <h2 className="text-xl font-bold text-white mb-2">Still deciding?</h2>
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
 href="/compare"
 className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-tech-500/40 text-tech-200 hover:text-white hover:border-blue-500/40 text-sm font-medium transition"
 >
 View all comparisons
 <BarChart3 className="w-4 h-4" />
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
