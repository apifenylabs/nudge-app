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
 title: 'DeepSeek vs ChatGPT 2026 — Pricing, Coding, Features Compared | Apifeny AI',
 description:
 'DeepSeek vs ChatGPT head-to-head: pricing (free vs $20/mo), coding benchmarks, language support, context window. Which AI wins for solopreneurs in Asia?',
 keywords: [
 'DeepSeek vs ChatGPT',
 'DeepSeek V3 vs GPT-4o',
 'DeepSeek pricing',
 'ChatGPT alternatives',
 'AI comparison',
 'best AI for coding',
 'DeepSeek Asia',
 'ChatGPT vs DeepSeek for developers',
 'AI tools solopreneurs',
 'DeepSeek R1 vs o3',
 ],
 alternates: { canonical: `${BASE_URL}/compare/deepseek-vs-chatgpt` },
 openGraph: {
 title: 'DeepSeek vs ChatGPT 2026 — Pricing, Coding, Features Compared',
 description:
 'DeepSeek vs ChatGPT head-to-head: pricing (free vs $20/mo), coding benchmarks, language support. Which AI wins for solopreneurs in Asia?',
 url: `${BASE_URL}/compare/deepseek-vs-chatgpt`,
 siteName: 'Apifeny AI',
 type: 'website',
 images: [{ url: '/og', width: 1200, height: 630 }],
 },
 twitter: {
 card: 'summary_large_image',
 title: 'DeepSeek vs ChatGPT 2026 — Pricing, Coding, Features Compared',
 description:
 'Pricing (free vs $20/mo), coding, language support — which AI model wins for Asia solopreneurs?',
 images: ['/og'],
 },
 robots: { index: true, follow: true },
};

// ─── Data ────────────────────────────────────────────────────────────
const VERDICT_SCORES = {
 deepseek: {
 coding: 9.5,
 reasoning: 9.0,
 writing: 7.0,
 language: 9.5,
 pricing: 10,
 ecosystem: 6.0,
 multimodal: 4.0,
 },
 chatgpt: {
 coding: 8.5,
 reasoning: 9.0,
 writing: 9.5,
 language: 7.5,
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
 deepseek: '✅ Full access (V3 + R1). No limits.',
 chatgpt: '⚠️ Limited (GPT-4o mini, no reasoning models).',
 winner: 'deepseek',
 },
 {
 label: 'Paid Tier',
 deepseek: 'Free (open source; self-host).',
 chatgpt: '$20/mo Plus · $200/mo Pro',
 winner: 'deepseek',
 },
 {
 label: 'API Cost (Input)',
 deepseek: '$0.14 / M tokens',
 chatgpt: '$2.50 / M tokens',
 winner: 'deepseek',
 },
 {
 label: 'API Cost (Output)',
 deepseek: '$0.28 / M tokens',
 chatgpt: '$10.00 / M tokens',
 winner: 'deepseek',
 },
 ],
 },
 {
 category: 'Coding',
 icon: Code,
 items: [
 {
 label: 'Code Generation',
 deepseek: 'Excellent. Clean, working output first try. Strong on Python, TS, Rust.',
 chatgpt: 'Very good. Slightly more verbose, better commenting.',
 winner: 'deepseek',
 },
 {
 label: 'Debugging',
 deepseek: 'Sharp. Pinpoints race conditions, missing awaits, edge cases.',
 chatgpt: 'Solid. Good explanations but sometimes overly cautious.',
 winner: 'deepseek',
 },
 {
 label: 'Framework Knowledge',
 deepseek: 'Strong on modern stacks (Next.js, Django, FastAPI).',
 chatgpt: 'Broader — better with older/obscure frameworks.',
 winner: 'chatgpt',
 },
 {
 label: 'Code Quality Score',
 deepseek: '9.5 / 10',
 chatgpt: '8.5 / 10',
 winner: 'deepseek',
 },
 ],
 },
 {
 category: 'Language & Reasoning',
 icon: Globe,
 items: [
 {
 label: 'Chinese (Mandarin)',
 deepseek: '⭐ Native-level. Complete fluency, idioms, tone.',
 chatgpt: 'Good, but occasionally unnatural phrasing.',
 winner: 'deepseek',
 },
 {
 label: 'Japanese / Korean',
 deepseek: 'Excellent. Handles CJK characters smoothly.',
 chatgpt: 'Decent but weaker on nuance.',
 winner: 'deepseek',
 },
 {
 label: 'English Content',
 deepseek: 'Good but occasionally clunky phrasing.',
 chatgpt: '⭐ Best-in-class. Natural, engaging, varied tone.',
 winner: 'chatgpt',
 },
 {
 label: 'Reasoning (Math/Logic)',
 deepseek: 'R1 matches o3 on most benchmarks. Strong step-by-step.',
 chatgpt: 'o3 leads on complex multi-step reasoning.',
 winner: 'tie',
 },
 ],
 },
 {
 category: 'Features',
 icon: Brain,
 items: [
 {
 label: 'Context Window',
 deepseek: '128K tokens',
 chatgpt: '128K tokens',
 winner: 'tie',
 },
 {
 label: 'Multimodal',
 deepseek: 'Text + limited image input.',
 chatgpt: 'Text, image, voice, video, file uploads.',
 winner: 'chatgpt',
 },
 {
 label: 'Open Source',
 deepseek: '✅ MIT license — self-host, fine-tune, inspect weights.',
 chatgpt: '❌ Proprietary. API or app only.',
 winner: 'deepseek',
 },
 {
 label: 'Tool Ecosystem',
 deepseek: 'Minimal. API + chat interface.',
 chatgpt: 'Vast. DALL-E, plugins, GPTs, voice mode, browsing.',
 winner: 'chatgpt',
 },
 ],
 },
];

const USE_CASES = [
 {
 icon: Code,
 title: 'Coding & Development',
 verdict: 'DeepSeek wins — cheaper API, better first-try code, open source.',
 details:
 'If you ship code daily, DeepSeek is the clear choice. Its V3 model generates clean, working output with fewer iterations. The API cost difference alone (roughly 10x cheaper) makes it a no-brainer for dev teams. Self-host option means zero data leakage.',
 best: 'DeepSeek',
 },
 {
 icon: MessageSquare,
 title: 'Writing & Content',
 verdict: 'ChatGPT wins — better English prose, more creative, more tools.',
 details:
 'For blog posts, marketing copy, and social media in English, ChatGPT still produces the most natural output. DeepSeek is catching up but occasionally generates awkward phrasing. Plus ChatGPT has DALL-E integration for images.',
 best: 'ChatGPT',
 },
 {
 icon: BarChart3,
 title: 'Analysis & Research',
 verdict: 'Tie — both are excellent for different reasons.',
 details:
 'For deep reasoning (math, logic, multi-step analysis), o3 edges ahead. For data extraction and Asian-language research, DeepSeek is superior. Choose based on your primary language. Both handle 128K contexts.',
 best: 'Tie',
 },
 {
 icon: Zap,
 title: 'AI Automation (APIs)',
 verdict: 'DeepSeek wins — dramatically cheaper API pricing.',
 details:
 'Running AI automation at scale? DeepSeek\'s API costs 1/10th of OpenAI\'s. For batch processing, user-facing chatbots, or agent pipelines, the savings add up fast. One startup we know cut their monthly AI bill from $4,200 to $380.',
 best: 'DeepSeek',
 },
];

const FAQS = [
 {
 q: 'Is DeepSeek really free?',
 a: 'For personal use via chat.deepseek.com — yes, completely free with access to V3 and R1 models. No usage limits. For self-hosting, the model weights are MIT-licensed so you can run it on your own infrastructure at no cost beyond compute.',
 },
 {
 q: 'Can I use DeepSeek for commercial projects?',
 a: 'Yes. DeepSeek\'s MIT license allows commercial use, modification, and distribution. OpenAI\'s terms require a paid subscription or API usage for commercial work.',
 },
 {
 q: 'Which is better for English content creation?',
 a: 'ChatGPT. DeepSeek is competent but ChatGPT produces more natural, engaging English prose. For blog posts, emails, marketing copy — stick with ChatGPT. Use DeepSeek for everything else.',
 },
 {
 q: 'Is DeepSeek safe / does it send data to China?',
 a: 'Using the official chat.deepseek.com website stores data on Chinese servers. For sensitive work, self-host DeepSeek on your own infrastructure — you control the data completely. This is a big advantage over ChatGPT which has no self-host option.',
 },
 {
 q: 'Can I run both?',
 a: 'Yes — and we recommend it. Use ChatGPT for English content and creative writing, DeepSeek for coding, API automation, and Asian-language tasks. Both APIs coexist fine in a single application.',
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
 if (winner === 'deepseek') {
 return (
 <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-neon-light bg-neon/10 px-2 py-0.5 rounded-full">
 <Zap className="w-3 h-3" />
 DeepSeek
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

export default function DeepSeekVsChatGPTCompare() {
 return (
 <div className="min-h-screen bg-white">
 <BreadcrumbSchema
 items={[
 { name: 'Home', item: '/' },
 { name: 'Compare', item: '/compare' },
 { name: 'DeepSeek vs ChatGPT', item: '/compare/deepseek-vs-chatgpt' },
 ]}
 />

 <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
 {/* Back link */}
 <Link
 href="/tools"
 className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-neon-light transition mb-6 group"
 >
 <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition" />
 Back to Tools
 </Link>

 {/* ─── Hero ─────────────────────────────────────────────── */}
 <section className="relative mb-12">
 <div className="relative rounded-2xl bg-gradient-to-br from-neon/10 via-aqua/5 to-tech-800 border border-gray-200 p-8 sm:p-12">
 <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neon/10 border border-neon/20 text-neon-light text-xs font-medium mb-4">
 <Star className="w-3.5 h-3.5" />
 Head-to-Head Comparison
 </div>
 <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
 DeepSeek vs ChatGPT{' '}
 <span className="bg-gradient-to-r from-neon-light to-aqua bg-clip-text text-transparent">
 2026
 </span>
 </h1>
 <p className="text-sm sm:text-base text-gray-800/70 max-w-2xl mb-6">
 The AI landscape has shifted. China&apos;s DeepSeek is challenging OpenAI head-on with
 open-source models, 10x cheaper APIs, and native Chinese-language capability. But
 ChatGPT still dominates English content, creative work, and ecosystem. We put both
 through every test that matters for solopreneurs and developers in Asia.
 </p>

 {/* Quick stat pills */}
 <div className="flex flex-wrap gap-3">
 <div className="px-3 py-1.5 rounded-lg bg-gray-50 border border-gray-200 text-xs text-gray-700">
 <span className="text-neon-light font-semibold">DeepSeek</span> — Free / Open Source
 </div>
 <div className="px-3 py-1.5 rounded-lg bg-gray-50 border border-gray-200 text-xs text-gray-700">
 <span className="text-aqua font-semibold">ChatGPT</span> — $20/mo Plus · $200/mo Pro
 </div>
 <div className="px-3 py-1.5 rounded-lg bg-gray-50 border border-gray-200 text-xs text-gray-700">
 128K context — both
 </div>
 </div>
 </div>
 </section>

 {/* ─── Table of Contents ─────────────────────────────────── */}
 <section className="mb-12">
 <div className="bg-gray-50/40 border border-gray-200 rounded-xl p-6">
 <h2 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
 <BookOpen className="w-4 h-4 text-neon" />
 Table of Contents
 </h2>
 <nav className="grid grid-cols-1 sm:grid-cols-2 gap-2">
 {[
 { href: '#verdict', label: 'Quick Verdict · Scorecard' },
 { href: '#pricing', label: 'Pricing Breakdown' },
 { href: '#coding', label: 'Coding & Development' },
 { href: '#language', label: 'Language Support & Reasoning' },
 { href: '#features', label: 'Features & Ecosystem' },
 { href: '#usecases', label: 'Use Cases — Who Wins What' },
 { href: '#recommendation', label: 'Recommendation for Asia Solopreneurs' },
 { href: '#faq', label: 'FAQ' },
 ].map((item) => (
 <a
 key={item.href}
 href={item.href}
 className="flex items-center gap-2 text-sm text-gray-600 hover:text-neon-light transition px-3 py-2 rounded-lg hover:bg-white/40"
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
 <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
 <BarChart3 className="w-6 h-6 text-neon" />
 Quick Verdict · Scorecard
 </h2>

 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
 {/* DeepSeek */}
 <div className="rounded-xl bg-gray-50/50 border border-neon/30 p-6">
 <div className="flex items-center gap-3 mb-4">
 <div className="w-10 h-10 rounded-lg bg-neon/20 flex items-center justify-center">
 <Zap className="w-5 h-5 text-neon-light" />
 </div>
 <div>
 <h3 className="text-lg font-bold text-gray-900">DeepSeek</h3>
 <p className="text-xs text-gray-400">V3 / R1 — Open Source</p>
 </div>
 </div>
 <div className="space-y-2.5">
 <ScoreBar score={VERDICT_SCORES.deepseek.coding} label="Coding" />
 <ScoreBar score={VERDICT_SCORES.deepseek.reasoning} label="Reasoning" />
 <ScoreBar score={VERDICT_SCORES.deepseek.writing} label="Writing" />
 <ScoreBar score={VERDICT_SCORES.deepseek.language} label="Asian Lang" />
 <ScoreBar score={VERDICT_SCORES.deepseek.pricing} label="Pricing" />
 <ScoreBar score={VERDICT_SCORES.deepseek.ecosystem} label="Ecosystem" />
 <ScoreBar score={VERDICT_SCORES.deepseek.multimodal} label="Multimodal" />
 </div>
 </div>

 {/* ChatGPT */}
 <div className="rounded-xl bg-gray-50/50 border border-aqua/30 p-6">
 <div className="flex items-center gap-3 mb-4">
 <div className="w-10 h-10 rounded-lg bg-aqua/20 flex items-center justify-center">
 <Sparkles className="w-5 h-5 text-aqua" />
 </div>
 <div>
 <h3 className="text-lg font-bold text-gray-900">ChatGPT</h3>
 <p className="text-xs text-gray-400">GPT-4o / o3 — Proprietary</p>
 </div>
 </div>
 <div className="space-y-2.5">
 <ScoreBar score={VERDICT_SCORES.chatgpt.coding} label="Coding" />
 <ScoreBar score={VERDICT_SCORES.chatgpt.reasoning} label="Reasoning" />
 <ScoreBar score={VERDICT_SCORES.chatgpt.writing} label="Writing" />
 <ScoreBar score={VERDICT_SCORES.chatgpt.language} label="Asian Lang" />
 <ScoreBar score={VERDICT_SCORES.chatgpt.pricing} label="Pricing" />
 <ScoreBar score={VERDICT_SCORES.chatgpt.ecosystem} label="Ecosystem" />
 <ScoreBar score={VERDICT_SCORES.chatgpt.multimodal} label="Multimodal" />
 </div>
 </div>
 </div>

 <div className="mt-6 p-4 rounded-lg bg-gray-50/30 border border-gray-200">
 <p className="text-sm text-gray-700 text-center">
 <strong className="text-neon-light">DeepSeek</strong> wins on: coding, pricing, Asian languages ·{' '}
 <strong className="text-aqua">ChatGPT</strong> wins on: English writing, ecosystem, multimodal ·{' '}
 <strong className="text-gray-900">Tie</strong> on: reasoning
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
 <h2 className="text-2xl font-bold text-gray-900">{section.category}</h2>
 </div>

 <div className="overflow-x-auto rounded-xl border border-gray-200">
 <table className="w-full text-sm">
 <thead>
 <tr className="bg-gray-50/80">
 <th className="text-left px-4 py-3 text-gray-700 font-semibold border-b border-gray-200 w-[25%]">
 Aspect
 </th>
 <th className="text-left px-4 py-3 text-neon-light font-semibold border-b border-gray-200 w-[30%]">
 DeepSeek
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
 <td className="px-4 py-3 text-gray-600">{row.deepseek}</td>
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
 <Users className="w-6 h-6 text-neon" />
 <h2 className="text-2xl font-bold text-gray-900">Use Cases — Who Wins What</h2>
 </div>

 <div className="space-y-4">
 {USE_CASES.map((uc) => (
 <div
 key={uc.title}
 className="rounded-xl bg-gray-50/40 border border-gray-200 p-6 hover:border-neon/30 transition"
 >
 <div className="flex items-start gap-4">
 <div className="w-10 h-10 rounded-lg bg-neon/10 flex items-center justify-center shrink-0">
 <uc.icon className="w-5 h-5 text-neon-light" />
 </div>
 <div className="flex-1 min-w-0">
 <h3 className="text-lg font-semibold text-gray-900 mb-1">{uc.title}</h3>
 <p className="text-sm text-neon-light font-medium mb-2">{uc.verdict}</p>
 <p className="text-sm text-gray-600 leading-relaxed">{uc.details}</p>
 </div>
 <div className="shrink-0">
 <span
 className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full ${
 uc.best === 'DeepSeek'
 ? 'bg-neon/10 text-neon-light border border-neon/30'
 : uc.best === 'ChatGPT'
 ? 'bg-aqua/10 text-aqua border border-aqua/30'
 : 'bg-yellow-400/10 text-yellow-400 border border-yellow-400/30'
 }`}
 >
 {uc.best === 'DeepSeek' ? (
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
 <div className="relative rounded-2xl bg-gradient-to-br from-neon/10 via-tech-800 to-aqua/5 border border-gray-200 p-8 sm:p-10 overflow-hidden">
 <div className="absolute inset-0 bg-gray-50 opacity-20" />
 <div className="relative">
 <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neon/10 border border-neon/20 text-neon-light text-xs font-medium mb-4">
 <Shield className="w-3.5 h-3.5" />
 Our Take
 </div>
 <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
 Recommendation for Asia Solopreneurs
 </h2>

 <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
 <div className="rounded-xl bg-gray-50/60 border border-neon/20 p-5">
 <div className="flex items-center gap-2 mb-3">
 <Zap className="w-5 h-5 text-neon-light" />
 <h3 className="text-base font-bold text-gray-900">Choose DeepSeek if you:</h3>
 </div>
 <ul className="space-y-2">
 {[
 'Ship code daily and care about API costs',
 'Build for Asian markets (China, Japan, Korea, SE Asia)',
 'Need data privacy — self-host models',
 'Want zero subscription cost for personal use',
 'Run AI automation pipelines at scale',
 ].map((item) => (
 <li key={item} className="flex items-start gap-2 text-sm text-gray-700">
 <CheckCircle2 className="w-4 h-4 text-neon-light mt-0.5 shrink-0" />
 {item}
 </li>
 ))}
 </ul>
 </div>

 <div className="rounded-xl bg-gray-50/60 border border-aqua/20 p-5">
 <div className="flex items-center gap-2 mb-3">
 <Sparkles className="w-5 h-5 text-aqua" />
 <h3 className="text-base font-bold text-gray-900">Choose ChatGPT if you:</h3>
 </div>
 <ul className="space-y-2">
 {[
 'Create English content — blogs, copy, social media',
 'Need multimodal (images, voice, video)',
 'Use the broader ecosystem (DALL-E, plugins, GPTs)',
 'Prefer polished UI and mobile apps',
 'Want the safest bet for standard business tasks',
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
 <h3 className="text-base font-bold text-gray-900 mb-2 flex items-center gap-2">
 <Star className="w-5 h-5 text-yellow-400" />
 The Smartest Setup
 </h3>
 <p className="text-sm text-gray-700 leading-relaxed">
 Use <strong className="text-neon-light">both</strong>. DeepSeek for your API
 pipelines, coding assistant, and Asian-language work. ChatGPT for English content,
 creative tasks, and when you need multimodal output. Combined, you get the best
 pricing + the best capabilities. We run this exact setup — DeepSeek costs us ~$380/mo
 vs the ~$4,200 we&apos;d pay OpenAI for the same volume.
 </p>
 </div>
 </div>
 </div>
 </section>

 {/* ─── FAQ ────────────────────────────────────────────────── */}
 <section id="faq" className="mb-12 scroll-mt-20">
 <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
 <MessageSquare className="w-6 h-6 text-neon" />
 Frequently Asked Questions
 </h2>

 <div className="space-y-3">
 {FAQS.map((faq, i) => (
 <details
 key={i}
 className="group rounded-xl bg-gray-50/40 border border-gray-200 overflow-hidden"
 >
 <summary className="flex items-center justify-between px-5 py-4 cursor-pointer text-sm font-medium text-gray-700 hover:text-neon-light transition list-none">
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
 <h2 className="text-xl font-bold text-gray-900 mb-2">Still deciding?</h2>
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
 href="/blog/deepseek-vs-chatgpt-2026"
 className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-gray-200 text-gray-700 hover:text-white hover:border-neon/40 text-sm font-medium transition"
 >
 Read the full blog post
 <BookOpen className="w-4 h-4" />
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
