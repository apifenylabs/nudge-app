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
 FileSearch,
} from 'lucide-react';
import BreadcrumbSchema from '@/components/BreadcrumbSchema';

const BASE_URL = 'https://apifeny-ai.vercel.app';

export const metadata: Metadata = {
 title: 'Perplexity vs ChatGPT 2026 — Pricing, Research, Features Compared | Apifeny AI',
 description:
 'Perplexity vs ChatGPT head-to-head: pricing (free vs $20/mo vs $20/mo), deep research, real-time citations, coding, and which AI wins for Asia-based researchers and founders in 2026.',
 keywords: [
 'Perplexity vs ChatGPT',
 'Perplexity AI vs ChatGPT',
 'Perplexity pricing',
 'ChatGPT alternatives for research',
 'AI search comparison',
 'best AI for deep research',
 'Perplexity Pro review',
 'ChatGPT vs Perplexity for developers',
 'AI research tools Asia',
 'Perplexity citations',
 ],
 alternates: { canonical: `${BASE_URL}/compare/perplexity-vs-chatgpt` },
 openGraph: {
 title: 'Perplexity vs ChatGPT 2026 — Pricing, Research, Features Compared',
 description:
 'Perplexity vs ChatGPT: pricing (free vs $20/mo), deep research, real-time citations, coding. Which AI wins for researchers and founders in Asia?',
 url: `${BASE_URL}/compare/perplexity-vs-chatgpt`,
 siteName: 'Apifeny AI',
 type: 'website',
 images: [{ url: '/og', width: 1200, height: 630 }],
 },
 twitter: {
 card: 'summary_large_image',
 title: 'Perplexity vs ChatGPT 2026 — Pricing, Research, Features Compared',
 description:
 'Deep research, citations, pricing — which AI wins for Asia-based researchers and founders?',
 images: ['/og'],
 },
 robots: { index: true, follow: true },
};

// ─── Data ────────────────────────────────────────────────────────────
const VERDICT_SCORES = {
 perplexity: {
 research: 9.5,
 citations: 9.5,
 coding: 7.0,
 writing: 6.5,
 pricing: 8.0,
 ecosystem: 5.5,
 multimodal: 5.0,
 },
 chatgpt: {
 research: 7.0,
 citations: 5.5,
 coding: 8.5,
 writing: 9.5,
 pricing: 5.0,
 ecosystem: 9.5,
 multimodal: 9.0,
 },
} as const;

const COMPARISON_ROWS = [
 {
 category: 'Pricing',
 icon: DollarSign,
 items: [
 {
 label: 'Free Tier',
 perplexity: '✅ Unlimited searches with limited Pro queries/day.',
 chatgpt: '⚠️ Limited (GPT-4o mini, no reasoning models).',
 winner: 'perplexity',
 },
 {
 label: 'Paid Tier',
 perplexity: '$20/mo Pro (unlimited Pro searches, file uploads).',
 chatgpt: '$20/mo Plus · $200/mo Pro',
 winner: 'tie',
 },
 {
 label: 'API Cost (Input)',
 perplexity: '$1.00 / M tokens (Sonar Pro)',
 chatgpt: '$2.50 / M tokens',
 winner: 'perplexity',
 },
 {
 label: 'Value for Research',
 perplexity: '⭐ Excellent — built-in citations save hours.',
 chatgpt: 'Decent — but needs manual source checking.',
 winner: 'perplexity',
 },
 ],
 },
 {
 category: 'Research & Citations',
 icon: Search,
 items: [
 {
 label: 'Real-time Search',
 perplexity: '✅ Always-on. Searches web automatically. Up-to-date results.',
 chatgpt: '⚠️ Requires manual browsing toggle. Slower responses.',
 winner: 'perplexity',
 },
 {
 label: 'Source Citations',
 perplexity: '⭐ Inline numbered citations. Hover to preview. Full URLs.',
 chatgpt: 'General references, no inline pinning per fact.',
 winner: 'perplexity',
 },
 {
 label: 'Deep Research Mode',
 perplexity: '✅ Pro feature. 5+ minute multi-source investigation. 100+ sources.',
 chatgpt: '✅ o3 deep research mode — also strong, but fewer citations.',
 winner: 'perplexity',
 },
 {
 label: 'Academic & Scientific',
 perplexity: 'Excellent for papers, grants, literature reviews.',
 chatgpt: 'Good for summaries, weaker on sourcing.',
 winner: 'perplexity',
 },
 ],
 },
 {
 category: 'Coding & Development',
 icon: Code,
 items: [
 {
 label: 'Code Generation',
 perplexity: 'Decent. Uses search for real API docs — great for library usage.',
 chatgpt: 'Excellent. Clean output, strong on all major languages.',
 winner: 'chatgpt',
 },
 {
 label: 'Debugging with Context',
 perplexity: 'Good — can search for similar errors in forums.',
 chatgpt: 'Better — wider training data covers more edge cases.',
 winner: 'chatgpt',
 },
 {
 label: 'Real-time API Docs',
 perplexity: '⭐ Searches live docs. No stale knowledge cutoff.',
 chatgpt: 'Knowledge cutoff dependent. May hallucinate API changes.',
 winner: 'perplexity',
 },
 {
 label: 'Code Quality Score',
 perplexity: '7.0 / 10',
 chatgpt: '8.5 / 10',
 winner: 'chatgpt',
 },
 ],
 },
 {
 category: 'Writing & Content',
 icon: MessageSquare,
 items: [
 {
 label: 'English Prose',
 perplexity: 'Functional but robotic. Best for factual writing.',
 chatgpt: '⭐ Best-in-class. Natural, engaging, adaptable tone.',
 winner: 'chatgpt',
 },
 {
 label: 'Creative Writing',
 perplexity: 'Limited. Not designed for creative tasks.',
 chatgpt: 'Excellent stories, poems, marketing copy.',
 winner: 'chatgpt',
 },
 {
 label: 'Factual Accuracy',
 perplexity: '⭐ Supported by citations — easily verifiable.',
 chatgpt: 'Good but sources not always checkable.',
 winner: 'perplexity',
 },
 ],
 },
 {
 category: 'Features & Ecosystem',
 icon: Brain,
 items: [
 {
 label: 'Context Window',
 perplexity: '~100K tokens (model-dependent)',
 chatgpt: '128K tokens',
 winner: 'chatgpt',
 },
 {
 label: 'File Uploads',
 perplexity: '✅ Images, PDFs, CSVs — Pro plan.',
 chatgpt: '✅ All file types. Larger file sizes.',
 winner: 'chatgpt',
 },
 {
 label: 'Multimodal',
 perplexity: 'Limited. Image understanding only.',
 chatgpt: 'Text, image, voice, video, DALL-E generation.',
 winner: 'chatgpt',
 },
 {
 label: 'Collections / Spaces',
 perplexity: '✅ Threads organized into collections with sharing.',
 chatgpt: '✅ Projects with custom instructions, folder organization.',
 winner: 'tie',
 },
 ],
 },
];

const USE_CASES = [
 {
 icon: Search,
 title: 'Deep Research & Analysis',
 verdict: 'Perplexity wins — inline citations, real-time search, deep research mode.',
 details:
 'For market research, competitor analysis, academic papers, and any work requiring verified sources, Perplexity is unmatched. Its ability to search 100+ sources in deep research mode and cite each claim inline saves hours of manual verification. ChatGPT\'s research is good but you\'ll spend time fact-checking.',
 best: 'Perplexity',
 },
 {
 icon: MessageSquare,
 title: 'Writing & Content Creation',
 verdict: 'ChatGPT wins — better English prose, more creative, richer output.',
 details:
 'For blog posts, marketing copy, emails, and creative writing in English, ChatGPT produces more natural and engaging output. Perplexity is functional but can feel robotic. Use ChatGPT for anything that needs a human voice.',
 best: 'ChatGPT',
 },
 {
 icon: Code,
 title: 'Coding & Development',
 verdict: 'ChatGPT wins — better code generation and debugging.',
 details:
 'ChatGPT generates cleaner, more reliable code across more languages. Perplexity wins when you need to reference live API docs or find solutions from recent forum posts, but for day-to-day coding, ChatGPT is stronger.',
 best: 'ChatGPT',
 },
 {
 icon: FileSearch,
 title: 'Fact-Checking & Verification',
 verdict: 'Perplexity wins — every claim supported by citations.',
 details:
 'When accuracy is non-negotiable, Perplexity\'s citation-first approach is better. Each statement is linked to its source. ChatGPT can hallucinate confidently. For journalists, researchers, and analysts, Perplexity is the safer choice.',
 best: 'Perplexity',
 },
];

const FAQS = [
 {
 q: 'Is Perplexity really better than ChatGPT for research?',
 a: 'For deep research with citations — yes. Perplexity is purpose-built for this. Its inline citations let you verify every claim instantly. ChatGPT is a general-purpose AI that happens to do research, but wasn\'t designed for citation-heavy work.',
 },
 {
 q: 'Can Perplexity replace ChatGPT entirely?',
 a: 'Not yet. ChatGPT is much stronger at creative writing, coding, and multimodal tasks. The ideal setup is both: Perplexity for research and fact-finding, ChatGPT for writing, coding, and creative work.',
 },
 {
 q: 'Does Perplexity have a mobile app?',
 a: 'Yes — Perplexity has iOS and Android apps with voice search, file uploads, and notification-based follow-ups. The mobile experience is actually cleaner than ChatGPT\'s for quick research queries.',
 },
 {
 q: 'Which is better for API usage and automation?',
 a: 'ChatGPT has a more mature API ecosystem with broader support. Perplexity\'s Sonar API is newer but excellent for search-augmented generation. If your workflow needs real-time web data, Perplexity\'s API is compelling. For general AI automation, ChatGPT\'s API is more established.',
 },
 {
 q: 'Can I use both together?',
 a: 'Yes — and this is actually the best setup we\'ve found. Use Perplexity for research, fact-checking, and market analysis. Use ChatGPT for content creation, coding, and creative work. Combined, they cover almost everything a solopreneur needs.',
 },
];

// ─── Helpers ──────────────────────────────────────────────────────────
function ScoreBar({ score, label }: { score: number; label: string }) {
 const color =
 score >= 9 ? 'bg-neon' : score >= 7.5 ? 'bg-aqua' : score >= 6 ? 'bg-yellow-500' : 'bg-red-500';
 return (
 <div className="flex items-center gap-3">
 <span className="text-xs text-gray-400 w-16 shrink-0">{label}</span>
 <div className="flex-1 h-2.5 rounded-full bg-white overflow-hidden">
 <div
 className={`h-full rounded-full transition-all ${color}`}
 style={{ width: `${score * 10}%` }}
 />
 </div>
 <span className="text-xs font-mono text-gray-600 w-8 text-right">{score.toFixed(1)}</span>
 </div>
 );
}

function WinnerBadge({ winner }: { winner: string }) {
 if (winner === 'perplexity') {
 return (
 <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-neon-light bg-neon/10 px-2 py-0.5 rounded-full">
 <Zap className="w-3 h-3" />
 Perplexity
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

export default function PerplexityVsChatGPTCompare() {
 return (
 <div className="min-h-screen bg-white">
 <BreadcrumbSchema
 items={[
 { name: 'Home', item: '/' },
 { name: 'Compare', item: '/compare' },
 { name: 'Perplexity vs ChatGPT', item: '/compare/perplexity-vs-chatgpt' },
 ]}
 />

 <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
 {/* Back link */}
 <Link
 href="/compare"
 className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-neon-light transition mb-6 group"
 >
 <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition" />
 Back to Comparisons
 </Link>

 {/* ─── Hero ─────────────────────────────────────────────── */}
 <section className="relative mb-12">
 <div className="relative rounded-2xl bg-gradient-to-br from-violet-500/10 via-tech-800 to-pink-500/5 border border-gray-200 p-8 sm:p-12">
 <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-300 text-xs font-medium mb-4">
 <Star className="w-3.5 h-3.5" />
 Head-to-Head Comparison
 </div>
 <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
 Perplexity vs ChatGPT{' '}
 <span className="bg-gradient-to-r from-violet-300 to-pink-300 bg-clip-text text-transparent">
 2026
 </span>
 </h1>
 <p className="text-sm sm:text-base text-gray-800/70 max-w-2xl mb-6">
 Perplexity has redefined AI-powered research with real-time search and inline citations,
 while ChatGPT remains the Swiss Army knife of AI assistance. For researchers, founders,
 and developers in Asia, the choice depends on what you do most: find facts or create
 content. We put both through every test that matters.
 </p>

 {/* Quick stat pills */}
 <div className="flex flex-wrap gap-3">
 <div className="px-3 py-1.5 rounded-lg bg-gray-50 border border-gray-200 text-xs text-gray-700">
 <span className="text-violet-300 font-semibold">Perplexity</span> — Free / $20/mo Pro
 </div>
 <div className="px-3 py-1.5 rounded-lg bg-gray-50 border border-gray-200 text-xs text-gray-700">
 <span className="text-aqua font-semibold">ChatGPT</span> — $20/mo Plus · $200/mo Pro
 </div>
 <div className="px-3 py-1.5 rounded-lg bg-gray-50 border border-gray-200 text-xs text-gray-700">
 Perplexity: Research-first · ChatGPT: General-purpose
 </div>
 </div>
 </div>
 </section>

 {/* ─── Table of Contents ─────────────────────────────────── */}
 <section className="mb-12">
 <div className="bg-gray-50/40 border border-gray-200 rounded-xl p-6">
 <h2 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
 <BookOpen className="w-4 h-4 text-violet-400" />
 Table of Contents
 </h2>
 <nav className="grid grid-cols-1 sm:grid-cols-2 gap-2">
 {[
 { href: '#verdict', label: 'Quick Verdict · Scorecard' },
 { href: '#pricing', label: 'Pricing Breakdown' },
 { href: '#research', label: 'Research & Citations' },
 { href: '#coding', label: 'Coding & Development' },
 { href: '#writing', label: 'Writing & Content' },
 { href: '#features', label: 'Features & Ecosystem' },
 { href: '#usecases', label: 'Use Cases — Who Wins What' },
 { href: '#recommendation', label: 'Recommendation for Asia Founders' },
 { href: '#faq', label: 'FAQ' },
 ].map((item) => (
 <a
 key={item.href}
 href={item.href}
 className="flex items-center gap-2 text-sm text-gray-600 hover:text-violet-300 transition px-3 py-2 rounded-lg hover:bg-white/40"
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
 <BarChart3 className="w-6 h-6 text-violet-400" />
 Quick Verdict · Scorecard
 </h2>

 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
 {/* Perplexity */}
 <div className="rounded-xl bg-gray-50/50 border border-violet-500/30 p-6">
 <div className="flex items-center gap-3 mb-4">
 <div className="w-10 h-10 rounded-lg bg-violet-500/20 flex items-center justify-center">
 <Search className="w-5 h-5 text-violet-300" />
 </div>
 <div>
 <h3 className="text-lg font-bold text-white">Perplexity</h3>
 <p className="text-xs text-gray-400">Sonar / Sonar Pro</p>
 </div>
 </div>
 <div className="space-y-2.5">
 <ScoreBar score={VERDICT_SCORES.perplexity.research} label="Research" />
 <ScoreBar score={VERDICT_SCORES.perplexity.citations} label="Citations" />
 <ScoreBar score={VERDICT_SCORES.perplexity.coding} label="Coding" />
 <ScoreBar score={VERDICT_SCORES.perplexity.writing} label="Writing" />
 <ScoreBar score={VERDICT_SCORES.perplexity.pricing} label="Pricing" />
 <ScoreBar score={VERDICT_SCORES.perplexity.ecosystem} label="Ecosystem" />
 <ScoreBar score={VERDICT_SCORES.perplexity.multimodal} label="Multimodal" />
 </div>
 </div>

 {/* ChatGPT */}
 <div className="rounded-xl bg-gray-50/50 border border-aqua/30 p-6">
 <div className="flex items-center gap-3 mb-4">
 <div className="w-10 h-10 rounded-lg bg-aqua/20 flex items-center justify-center">
 <Sparkles className="w-5 h-5 text-aqua" />
 </div>
 <div>
 <h3 className="text-lg font-bold text-white">ChatGPT</h3>
 <p className="text-xs text-gray-400">GPT-4o / o3</p>
 </div>
 </div>
 <div className="space-y-2.5">
 <ScoreBar score={VERDICT_SCORES.chatgpt.research} label="Research" />
 <ScoreBar score={VERDICT_SCORES.chatgpt.citations} label="Citations" />
 <ScoreBar score={VERDICT_SCORES.chatgpt.coding} label="Coding" />
 <ScoreBar score={VERDICT_SCORES.chatgpt.writing} label="Writing" />
 <ScoreBar score={VERDICT_SCORES.chatgpt.pricing} label="Pricing" />
 <ScoreBar score={VERDICT_SCORES.chatgpt.ecosystem} label="Ecosystem" />
 <ScoreBar score={VERDICT_SCORES.chatgpt.multimodal} label="Multimodal" />
 </div>
 </div>
 </div>

 <div className="mt-6 p-4 rounded-lg bg-gray-50/30 border border-gray-200">
 <p className="text-sm text-gray-700 text-center">
 <strong className="text-violet-300">Perplexity</strong> wins on: research, citations, real-time data ·{' '}
 <strong className="text-aqua">ChatGPT</strong> wins on: writing, coding, ecosystem, multimodal ·{' '}
 <strong className="text-white">Tie</strong> on: pricing
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
 <section.icon className="w-6 h-6 text-violet-400" />
 <h2 className="text-2xl font-bold text-white">{section.category}</h2>
 </div>

 <div className="overflow-x-auto rounded-xl border border-gray-200">
 <table className="w-full text-sm">
 <thead>
 <tr className="bg-gray-50/80">
 <th className="text-left px-4 py-3 text-gray-700 font-semibold border-b border-gray-200 w-[25%]">
 Aspect
 </th>
 <th className="text-left px-4 py-3 text-violet-300 font-semibold border-b border-gray-200 w-[30%]">
 Perplexity
 </th>
 <th className="text-left px-4 py-3 text-aqua font-semibold border-b border-gray-200 w-[30%]">
 ChatGPT
 </th>
 <th className="text-left px-4 py-3 text-gray-400 font-semibold border-b border-gray-200 w-[15%]">
 Winner
 </th>
 </tr>
 </thead>
 <tbody className="divide-y divide-tech-500/10">
 {section.items.map((row, i) => (
 <tr
 key={row.label}
 className={i % 2 === 0 ? 'bg-white/40' : 'bg-gray-50/20'}
 >
 <td className="px-4 py-3 text-gray-700 font-medium">{row.label}</td>
 <td className="px-4 py-3 text-gray-600">{row.perplexity}</td>
 <td className="px-4 py-3 text-gray-600">{row.chatgpt}</td>
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
 <Users className="w-6 h-6 text-violet-400" />
 <h2 className="text-2xl font-bold text-white">Use Cases — Who Wins What</h2>
 </div>

 <div className="space-y-4">
 {USE_CASES.map((uc) => (
 <div
 key={uc.title}
 className="rounded-xl bg-gray-50/40 border border-gray-200 p-6 hover:border-violet-500/30 transition"
 >
 <div className="flex items-start gap-4">
 <div className="w-10 h-10 rounded-lg bg-violet-500/10 flex items-center justify-center shrink-0">
 <uc.icon className="w-5 h-5 text-violet-300" />
 </div>
 <div className="flex-1 min-w-0">
 <h3 className="text-lg font-semibold text-white mb-1">{uc.title}</h3>
 <p className="text-sm text-violet-300 font-medium mb-2">{uc.verdict}</p>
 <p className="text-sm text-gray-600 leading-relaxed">{uc.details}</p>
 </div>
 <div className="shrink-0">
 <span
 className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full ${
 uc.best === 'Perplexity'
 ? 'bg-violet-500/10 text-violet-300 border border-violet-500/30'
 : uc.best === 'ChatGPT'
 ? 'bg-aqua/10 text-aqua border border-aqua/30'
 : 'bg-yellow-400/10 text-yellow-400 border border-yellow-400/30'
 }`}
 >
 {uc.best === 'Perplexity' ? (
 <Search className="w-3 h-3" />
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
 <div className="relative rounded-2xl bg-gradient-to-br from-violet-500/10 via-tech-800 to-pink-500/5 border border-gray-200 p-8 sm:p-10 overflow-hidden">
 <div className="absolute inset-0 bg-gray-50 opacity-20" />
 <div className="relative">
 <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-300 text-xs font-medium mb-4">
 <Shield className="w-3.5 h-3.5" />
 Our Take
 </div>
 <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
 Recommendation for Asia Founders
 </h2>

 <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
 <div className="rounded-xl bg-gray-50/60 border border-violet-500/20 p-5">
 <div className="flex items-center gap-2 mb-3">
 <Search className="w-5 h-5 text-violet-300" />
 <h3 className="text-base font-bold text-white">Choose Perplexity if you:</h3>
 </div>
 <ul className="space-y-2">
 {[
 'Do heavy research — market analysis, competitors, academic papers',
 'Need verified, cited information for decision-making',
 'Want real-time data without manual browsing',
 'Hate hallucinated answers — citations give you confidence',
 'Research Asian markets with region-specific queries',
 ].map((item) => (
 <li key={item} className="flex items-start gap-2 text-sm text-gray-700">
 <CheckCircle2 className="w-4 h-4 text-violet-300 mt-0.5 shrink-0" />
 {item}
 </li>
 ))}
 </ul>
 </div>

 <div className="rounded-xl bg-gray-50/60 border border-aqua/20 p-5">
 <div className="flex items-center gap-2 mb-3">
 <Sparkles className="w-5 h-5 text-aqua" />
 <h3 className="text-base font-bold text-white">Choose ChatGPT if you:</h3>
 </div>
 <ul className="space-y-2">
 {[
 'Create English content — blogs, copy, social media posts',
 'Code daily and need a strong AI coding assistant',
 'Need multimodal — images, voice, video, generation',
 'Want the broadest ecosystem of plugins and integrations',
 'Prefer one tool for everything rather than specialized tools',
 ].map((item) => (
 <li key={item} className="flex items-start gap-2 text-sm text-gray-700">
 <CheckCircle2 className="w-4 h-4 text-aqua mt-0.5 shrink-0" />
 {item}
 </li>
 ))}
 </ul>
 </div>
 </div>

 {/* Bottom line */}
 <div className="bg-white/60 border border-gray-200 rounded-xl p-5">
 <h3 className="text-base font-bold text-white mb-2 flex items-center gap-2">
 <Star className="w-5 h-5 text-yellow-400" />
 The Smartest Setup
 </h3>
 <p className="text-sm text-gray-700 leading-relaxed">
 Use <strong className="text-violet-300">both</strong>. Perplexity for research,
 market analysis, fact-checking, and real-time data. ChatGPT for writing, coding,
 creative work, and multimodal tasks. Combined, they cover the full spectrum —
 verified information + creative execution. At just $40/mo total, this is the
 most powerful AI setup for any Asia-based founder or solopreneur.
 </p>
 </div>
 </div>
 </div>
 </section>

 {/* ─── FAQ ────────────────────────────────────────────────── */}
 <section id="faq" className="mb-12 scroll-mt-20">
 <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
 <MessageSquare className="w-6 h-6 text-violet-400" />
 Frequently Asked Questions
 </h2>

 <div className="space-y-3">
 {FAQS.map((faq, i) => (
 <details
 key={i}
 className="group rounded-xl bg-gray-50/40 border border-gray-200 overflow-hidden"
 >
 <summary className="flex items-center justify-between px-5 py-4 cursor-pointer text-sm font-medium text-white hover:text-violet-300 transition list-none">
 {faq.q}
 <ChevronRight className="w-4 h-4 text-gray-400 group-open:rotate-90 transition shrink-0" />
 </summary>
 <div className="px-5 pb-4 text-sm text-gray-600 leading-relaxed border-t border-gray-200 pt-3">
 {faq.a}
 </div>
 </details>
 ))}
 </div>
 </section>

 {/* ─── Related CTA ───────────────────────────────────────── */}
 <section className="rounded-xl bg-gray-50/60 border border-dashed border-gray-200 p-8 text-center">
 <h2 className="text-xl font-bold text-white mb-2">Still deciding?</h2>
 <p className="text-sm text-gray-600 max-w-md mx-auto mb-4">
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
 className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-gray-200 text-gray-700 hover:text-white hover:border-violet-500/40 text-sm font-medium transition"
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
