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
 title: 'ChatGPT vs Claude 2026 — Pricing, Coding, Features Compared | Apifeny AI',
 description:
 'ChatGPT vs Claude head-to-head: pricing ($20 vs $20), context window (128K vs 200K), coding benchmarks, safety features. Which AI assistant wins for developers and enterprises in 2026?',
 keywords: [
 'ChatGPT vs Claude',
 'Claude vs ChatGPT',
 'GPT-4o vs Claude Sonnet 4',
 'ChatGPT pricing',
 'Claude pricing',
 'AI assistant comparison',
 'best AI for coding',
 'Claude vs ChatGPT for developers',
 'AI tools 2026',
 'ChatGPT vs Claude comparison',
 ],
 alternates: { canonical: `${BASE_URL}/compare/chatgpt-vs-claude` },
 openGraph: {
 title: 'ChatGPT vs Claude 2026 — Pricing, Coding, Features Compared',
 description:
 'ChatGPT vs Claude head-to-head: pricing ($20 vs $20), context window (128K vs 200K), coding, safety. Which AI assistant wins for developers and enterprises?',
 url: `${BASE_URL}/compare/chatgpt-vs-claude`,
 siteName: 'Apifeny AI',
 type: 'website',
 images: [{ url: '/og', width: 1200, height: 630 }],
 },
 twitter: {
 card: 'summary_large_image',
 title: 'ChatGPT vs Claude 2026 — Pricing, Coding, Features Compared',
 description:
 'Pricing ($20 vs $20), context window, coding, safety — which AI assistant wins for your workflow?',
 images: ['/og'],
 },
 robots: { index: true, follow: true },
};

// ─── Data ────────────────────────────────────────────────────────────
const VERDICT_SCORES = {
 chatgpt: {
 coding: 8.5,
 reasoning: 9.0,
 writing: 9.5,
 creativity: 9.0,
 pricing: 5.0,
 ecosystem: 9.5,
 multimodal: 9.0,
 },
 claude: {
 coding: 9.0,
 reasoning: 9.5,
 writing: 9.5,
 creativity: 8.5,
 pricing: 5.0,
 ecosystem: 6.5,
 multimodal: 7.0,
 },
} as const;

const COMPARISON_ROWS = [
 {
 category: 'Pricing',
 icon: DollarSign,
 items: [
 {
 label: 'Free Tier',
 chatgpt: '⚠️ Limited (GPT-4o mini, rate-limited).',
 claude: '⚠️ Limited (Sonnet, daily usage caps).',
 winner: 'tie',
 },
 {
 label: 'Paid Tier',
 chatgpt: '$20/mo Plus · $200/mo Pro',
 claude: '$20/mo Pro · $100+ Max',
 winner: 'tie',
 },
 {
 label: 'API Pricing (Input)',
 chatgpt: '$2.50 / M tokens (GPT-4o)',
 claude: '$3.00 / M tokens (Sonnet)',
 winner: 'chatgpt',
 },
 {
 label: 'API Pricing (Output)',
 chatgpt: '$10.00 / M tokens',
 claude: '$15.00 / M tokens',
 winner: 'chatgpt',
 },
 ],
 },
 {
 category: 'Coding',
 icon: Code,
 items: [
 {
 label: 'Code Generation',
 chatgpt: 'Very good. Verbose, well-commented output. Strong on full-stack.',
 claude: 'Excellent. Clean, working code first try. Strong on architecture.',
 winner: 'claude',
 },
 {
 label: 'Debugging',
 chatgpt: 'Solid. Good explanations, step-by-step fixes.',
 claude: 'Sharp. Identifies root causes fast. Great at subtle bugs.',
 winner: 'claude',
 },
 {
 label: 'Long File Handling',
 chatgpt: '128K context — good for medium-sized codebases.',
 claude: '200K context — handles entire large files at once.',
 winner: 'claude',
 },
 {
 label: 'Code Quality Score',
 chatgpt: '8.5 / 10',
 claude: '9.0 / 10',
 winner: 'claude',
 },
 ],
 },
 {
 category: 'Writing & Content',
 icon: MessageSquare,
 items: [
 {
 label: 'Creative Writing',
 chatgpt: '⭐ Excellent. Imaginative, varied tone, strong storytelling.',
 claude: 'Very good. More formal and structured.',
 winner: 'chatgpt',
 },
 {
 label: 'Technical Writing',
 chatgpt: 'Very good. Clear, organized, adaptable to audience.',
 claude: '⭐ Best-in-class. Precise, well-structured, thorough.',
 winner: 'claude',
 },
 {
 label: 'Long-Form Content',
 chatgpt: 'Good but can lose coherence in very long pieces.',
 claude: 'Excellent. Maintains coherence across 10k+ word docs.',
 winner: 'claude',
 },
 {
 label: 'Editing & Rewriting',
 chatgpt: 'Solid. Understands tone shifts, voice matching.',
 claude: 'Excellent. Nuanced edits, preserves original voice.',
 winner: 'claude',
 },
 ],
 },
 {
 category: 'Features & Ecosystem',
 icon: Brain,
 items: [
 {
 label: 'Context Window',
 chatgpt: '128K tokens',
 claude: '200K tokens',
 winner: 'claude',
 },
 {
 label: 'Multimodal',
 chatgpt: 'Text, image, voice, video, file uploads.',
 claude: 'Text, image, PDF, file uploads. No voice/video.',
 winner: 'chatgpt',
 },
 {
 label: 'Tool Ecosystem',
 chatgpt: 'Vast — DALL-E, GPTs store, plugins, web browsing, voice mode.',
 claude: 'Limited — Artifacts, Projects, web search. No plugin store.',
 winner: 'chatgpt',
 },
 {
 label: 'Safety & Alignment',
 chatgpt: 'Strong guardrails. Sometimes overly cautious.',
 claude: '⭐ Industry-leading. Constitutional AI. Precise about uncertainty.',
 winner: 'claude',
 },
 ],
 },
];

const USE_CASES = [
 {
 icon: Code,
 title: 'Software Development',
 verdict: 'Claude wins — cleaner code, handles larger projects, better debugging.',
 details:
 'Claude consistently produces more production-ready code with fewer iterations. The 200K context window lets it handle entire codebases at once. For debugging, Claude identifies root causes faster. ChatGPT is still excellent, especially if you use the wider ecosystem (Copilot integration, GPTs for dev workflows).',
 best: 'Claude',
 },
 {
 icon: BarChart3,
 title: 'Data Analysis & Research',
 verdict: 'Claude wins — deeper analysis, better with large documents, stronger reasoning.',
 details:
 'Claude\'s handling of large PDFs, research papers, and data analysis is unmatched. It maintains context across 200K tokens, so you can feed entire reports. ChatGPT is better when you need web search integration for real-time data.',
 best: 'Claude',
 },
 {
 icon: MessageSquare,
 title: 'Writing & Content Creation',
 verdict: 'Tie — both excellent in different domains.',
 details:
 'For creative writing (stories, marketing copy, social media), ChatGPT is more imaginative and engaging. For technical documentation, long-form articles, professional reports — Claude is superior. Use ChatGPT for content that needs flair, Claude for content that needs precision.',
 best: 'Tie',
 },
 {
 icon: Brain,
 title: 'AI Automation & APIs',
 verdict: 'ChatGPT wins — better ecosystem, more integrations, lower API costs.',
 details:
 'ChatGPT has a mature API with extensive documentation, SDKs, and integrations. DALL-E for images, Whisper for audio, and a thriving community. Claude\'s API is catching up but has fewer integrations. API pricing favours ChatGPT by ~15-20%. For agent frameworks, both work well.',
 best: 'ChatGPT',
 },
];

const FAQS = [
 {
 q: 'Which is better for coding: ChatGPT or Claude?',
 a: 'Claude has a slight edge in code quality, debugging, and handling large codebases. ChatGPT is still excellent and has better ecosystem integrations (GitHub Copilot, GPTs for dev). Most professional developers who\'ve tried both prefer Claude for pure coding tasks.',
 },
 {
 q: 'Does Claude have a free tier?',
 a: 'Yes. Claude has a free tier with daily usage caps on the Sonnet model. For $20/month Pro, you get more messages, priority access, and the Opus model when available. This mirrors ChatGPT\'s pricing almost exactly.',
 },
 {
 q: 'Can Claude generate images?',
 a: 'No — Claude is text-only (plus image input). ChatGPT can generate images with DALL-E, process audio and video, and has voice mode. If you need multimodal output, ChatGPT is the only option.',
 },
 {
 q: 'Which is better for writing long documents?',
 a: 'Claude. Its 200K context window and structured output make it ideal for reports, documentation, and long-form content. ChatGPT tends to lose coherence in very long outputs.',
 },
 {
 q: 'Which AI is safer / more aligned?',
 a: 'Claude. Anthropic\'s Constitutional AI approach creates models that are better at explaining their uncertainty, handling sensitive topics, and refusing unsafe requests with clear reasoning. ChatGPT has strong guardrails but can be less transparent about limitations.',
 },
 {
 q: 'Should I pay for both?',
 a: 'Many professionals do. Use Claude for coding, data analysis, and technical writing. Use ChatGPT for creative content, image generation, and when you need the broader tool ecosystem. Both are $20/month — the total cost ($40/month) is well worth it for serious AI users.',
 },
];

// ─── Helpers ──────────────────────────────────────────────────────────
function ScoreBar({ score, label }: { score: number; label: string }) {
 const color =
 score >= 9 ? 'bg-neon' : score >= 7.5 ? 'bg-aqua' : score >= 6 ? 'bg-yellow-500' : 'bg-red-500';
 return (
 <div className="flex items-center gap-3">
 <span className="text-xs text-gray-400 w-20 shrink-0">{label}</span>
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
 if (winner === 'chatgpt') {
 return (
 <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-aqua bg-aqua/10 px-2 py-0.5 rounded-full">
 <Sparkles className="w-3 h-3" />
 ChatGPT
 </span>
 );
 }
 if (winner === 'claude') {
 return (
 <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-neon-light bg-neon/10 px-2 py-0.5 rounded-full">
 <Zap className="w-3 h-3" />
 Claude
 </span>
 );
 }
 return (
 <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-yellow-400 bg-yellow-400/10 px-2 py-0.5 rounded-full">
 Tie
 </span>
 );
}

export default function ChatGPTVsClaudeCompare() {
 return (
 <div className="min-h-screen bg-white">
 <BreadcrumbSchema
 items={[
 { name: 'Home', item: '/' },
 { name: 'Compare', item: '/compare' },
 { name: 'ChatGPT vs Claude', item: '/compare/chatgpt-vs-claude' },
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
 <div className="relative rounded-2xl bg-gradient-to-br from-aqua/10 via-neon/5 to-tech-800 border border-gray-200 p-8 sm:p-12">
 <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-aqua/10 border border-aqua/20 text-aqua text-xs font-medium mb-4">
 <Star className="w-3.5 h-3.5" />
 Head-to-Head Comparison
 </div>
 <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
 ChatGPT vs Claude{' '}
 <span className="bg-gradient-to-r from-aqua to-neon-light bg-clip-text text-transparent">
 2026
 </span>
 </h1>
 <p className="text-sm sm:text-base text-gray-800/70 max-w-2xl mb-6">
 The two titans of conversational AI — OpenAI&apos;s ChatGPT and Anthropic&apos;s Claude — go
 head-to-head. Both cost $20/month for premium access, but they excel in very different
 areas. We put them through coding benchmarks, writing tests, data analysis, and
 ecosystem evaluation to help you choose (or justify buying both).
 </p>

 {/* Quick stat pills */}
 <div className="flex flex-wrap gap-3">
 <div className="px-3 py-1.5 rounded-lg bg-gray-50 border border-gray-200 text-xs text-gray-700">
 <span className="text-aqua font-semibold">ChatGPT</span> — $20/mo Plus
 </div>
 <div className="px-3 py-1.5 rounded-lg bg-gray-50 border border-gray-200 text-xs text-gray-700">
 <span className="text-neon-light font-semibold">Claude</span> — $20/mo Pro
 </div>
 <div className="px-3 py-1.5 rounded-lg bg-gray-50 border border-gray-200 text-xs text-gray-700">
 Claude wins: 200K context
 </div>
 <div className="px-3 py-1.5 rounded-lg bg-gray-50 border border-gray-200 text-xs text-gray-700">
 ChatGPT wins: Ecosystem
 </div>
 </div>
 </div>
 </section>

 {/* ─── Table of Contents ─────────────────────────────────── */}
 <section className="mb-12">
 <div className="bg-gray-50/40 border border-gray-200 rounded-xl p-6">
 <h2 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
 <BookOpen className="w-4 h-4 text-neon" />
 Table of Contents
 </h2>
 <nav className="grid grid-cols-1 sm:grid-cols-2 gap-2">
 {[
 { href: '#verdict', label: 'Quick Verdict · Scorecard' },
 { href: '#pricing', label: 'Pricing Breakdown' },
 { href: '#coding', label: 'Coding & Development' },
 { href: '#writing', label: 'Writing & Content' },
 { href: '#features', label: 'Features & Ecosystem' },
 { href: '#usecases', label: 'Use Cases — Who Wins What' },
 { href: '#recommendation', label: 'Recommendation for Professionals' },
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
 <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
 <BarChart3 className="w-6 h-6 text-neon" />
 Quick Verdict · Scorecard
 </h2>

 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
 {/* ChatGPT */}
 <div className="rounded-xl bg-gray-50/50 border border-aqua/30 p-6">
 <div className="flex items-center gap-3 mb-4">
 <div className="w-10 h-10 rounded-lg bg-aqua/20 flex items-center justify-center">
 <Sparkles className="w-5 h-5 text-aqua" />
 </div>
 <div>
 <h3 className="text-lg font-bold text-white">ChatGPT</h3>
 <p className="text-xs text-gray-400">GPT-4o — Proprietary</p>
 </div>
 </div>
 <div className="space-y-2.5">
 <ScoreBar score={VERDICT_SCORES.chatgpt.coding} label="Coding" />
 <ScoreBar score={VERDICT_SCORES.chatgpt.reasoning} label="Reasoning" />
 <ScoreBar score={VERDICT_SCORES.chatgpt.writing} label="Writing" />
 <ScoreBar score={VERDICT_SCORES.chatgpt.creativity} label="Creativity" />
 <ScoreBar score={VERDICT_SCORES.chatgpt.pricing} label="Pricing" />
 <ScoreBar score={VERDICT_SCORES.chatgpt.ecosystem} label="Ecosystem" />
 <ScoreBar score={VERDICT_SCORES.chatgpt.multimodal} label="Multimodal" />
 </div>
 </div>

 {/* Claude */}
 <div className="rounded-xl bg-gray-50/50 border border-neon/30 p-6">
 <div className="flex items-center gap-3 mb-4">
 <div className="w-10 h-10 rounded-lg bg-neon/20 flex items-center justify-center">
 <Zap className="w-5 h-5 text-neon-light" />
 </div>
 <div>
 <h3 className="text-lg font-bold text-white">Claude</h3>
 <p className="text-xs text-gray-400">Sonnet / Opus — Proprietary</p>
 </div>
 </div>
 <div className="space-y-2.5">
 <ScoreBar score={VERDICT_SCORES.claude.coding} label="Coding" />
 <ScoreBar score={VERDICT_SCORES.claude.reasoning} label="Reasoning" />
 <ScoreBar score={VERDICT_SCORES.claude.writing} label="Writing" />
 <ScoreBar score={VERDICT_SCORES.claude.creativity} label="Creativity" />
 <ScoreBar score={VERDICT_SCORES.claude.pricing} label="Pricing" />
 <ScoreBar score={VERDICT_SCORES.claude.ecosystem} label="Ecosystem" />
 <ScoreBar score={VERDICT_SCORES.claude.multimodal} label="Multimodal" />
 </div>
 </div>
 </div>

 <div className="mt-6 p-4 rounded-lg bg-gray-50/30 border border-gray-200">
 <p className="text-sm text-gray-700 text-center">
 <strong className="text-aqua">ChatGPT</strong> wins on: ecosystem, multimodal, creativity ·{' '}
 <strong className="text-neon-light">Claude</strong> wins on: coding, reasoning, long-form ·{' '}
 <strong className="text-white">Tie</strong> on: writing quality, pricing
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

 <div className="overflow-x-auto rounded-xl border border-gray-200">
 <table className="w-full text-sm">
 <thead>
 <tr className="bg-gray-50/80">
 <th className="text-left px-4 py-3 text-gray-700 font-semibold border-b border-gray-200 w-[25%]">
 Aspect
 </th>
 <th className="text-left px-4 py-3 text-aqua font-semibold border-b border-gray-200 w-[30%]">
 ChatGPT
 </th>
 <th className="text-left px-4 py-3 text-neon-light font-semibold border-b border-gray-200 w-[30%]">
 Claude
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
 <td className="px-4 py-3 text-gray-600">{row.chatgpt}</td>
 <td className="px-4 py-3 text-gray-600">{row.claude}</td>
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
 className="rounded-xl bg-gray-50/40 border border-gray-200 p-6 hover:border-neon/30 transition"
 >
 <div className="flex items-start gap-4">
 <div className="w-10 h-10 rounded-lg bg-neon/10 flex items-center justify-center shrink-0">
 <uc.icon className="w-5 h-5 text-neon-light" />
 </div>
 <div className="flex-1 min-w-0">
 <h3 className="text-lg font-semibold text-white mb-1">{uc.title}</h3>
 <p className="text-sm text-neon-light font-medium mb-2">{uc.verdict}</p>
 <p className="text-sm text-gray-600 leading-relaxed">{uc.details}</p>
 </div>
 <div className="shrink-0">
 <span
 className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full ${
 uc.best === 'ChatGPT'
 ? 'bg-aqua/10 text-aqua border border-aqua/30'
 : uc.best === 'Claude'
 ? 'bg-neon/10 text-neon-light border border-neon/30'
 : 'bg-yellow-400/10 text-yellow-400 border border-yellow-400/30'
 }`}
 >
 {uc.best === 'ChatGPT' ? (
 <Sparkles className="w-3 h-3" />
 ) : uc.best === 'Claude' ? (
 <Zap className="w-3 h-3" />
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
 <div className="relative rounded-2xl bg-gradient-to-br from-aqua/10 via-tech-800 to-neon/5 border border-gray-200 p-8 sm:p-10 overflow-hidden">
 <div className="absolute inset-0 bg-gray-50 opacity-20" />
 <div className="relative">
 <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neon/10 border border-neon/20 text-neon-light text-xs font-medium mb-4">
 <Shield className="w-3.5 h-3.5" />
 Our Take
 </div>
 <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
 Recommendation for Professionals
 </h2>

 <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
 <div className="rounded-xl bg-gray-50/60 border border-aqua/20 p-5">
 <div className="flex items-center gap-2 mb-3">
 <Sparkles className="w-5 h-5 text-aqua" />
 <h3 className="text-base font-bold text-white">Choose ChatGPT if you:</h3>
 </div>
 <ul className="space-y-2">
 {[
 'Need multimodal — images, voice, video',
 'Want the richest ecosystem: DALL-E, GPTs, plugins',
 'Create marketing copy, social media, creative content',
 'Prefer broader community and more tutorials',
 'Build AI automations that need tight integrations',
 ].map((item) => (
 <li key={item} className="flex items-start gap-2 text-sm text-gray-700">
 <CheckCircle2 className="w-4 h-4 text-aqua mt-0.5 shrink-0" />
 {item}
 </li>
 ))}
 </ul>
 </div>

 <div className="rounded-xl bg-gray-50/60 border border-neon/20 p-5">
 <div className="flex items-center gap-2 mb-3">
 <Zap className="w-5 h-5 text-neon-light" />
 <h3 className="text-base font-bold text-white">Choose Claude if you:</h3>
 </div>
 <ul className="space-y-2">
 {[
 'Write code daily — cleaner output, better debugging',
 'Handle large documents, research papers, complex specs',
 'Need precise technical writing or documentation',
 'Want the most thoughtful, safety-aware AI',
 'Analyze large datasets or legal/financial docs',
 ].map((item) => (
 <li key={item} className="flex items-start gap-2 text-sm text-gray-700">
 <CheckCircle2 className="w-4 h-4 text-neon-light mt-0.5 shrink-0" />
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
 For serious AI users, <strong className="text-aqua">both</strong> are worth the
 investment. $40/month total gives you Claude for coding, data analysis, and
 long-form work — plus ChatGPT for creative content, multimodal tasks, and the
 plugin ecosystem. This dual-tool setup is the most common pattern we see among
 high-performing developers, writers, and analysts.
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
 className="group rounded-xl bg-gray-50/40 border border-gray-200 overflow-hidden"
 >
 <summary className="flex items-center justify-between px-5 py-4 cursor-pointer text-sm font-medium text-white hover:text-neon-light transition list-none">
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
 <h2 className="text-xl font-bold text-white mb-2">More AI comparisons</h2>
 <p className="text-sm text-gray-600 max-w-md mx-auto mb-4">
 Browse our full directory of AI tools with Asia-ready filters and editorial rankings.
 </p>
 <div className="flex flex-wrap items-center justify-center gap-3">
 <Link
 href="/compare/deepseek-vs-chatgpt"
 className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-white hover:bg-gray-100 border border-gray-200 text-gray-700 hover:text-white text-sm font-medium transition"
 >
 <Zap className="w-4 h-4" />
 DeepSeek vs ChatGPT
 </Link>
 <Link
 href="/tools"
 className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-neon hover:bg-neon-dark text-white text-sm font-medium transition"
 >
 Browse all AI tools
 <ArrowRight className="w-4 h-4" />
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
