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
 Palette,
 Paintbrush,
} from 'lucide-react';
import BreadcrumbSchema from '@/components/BreadcrumbSchema';

const BASE_URL = 'https://apifeny-ai.vercel.app';

export const metadata: Metadata = {
 title: 'Midjourney vs DALL-E 3 2026 — Pricing, Features, Image Quality Compared | Apifeny AI',
 description:
 'Midjourney vs DALL-E 3 head-to-head: pricing ($10-60/mo vs included in ChatGPT Plus $20/mo), image quality, text rendering, creative control, editing, style consistency, and which AI image generator wins for designers, marketers, and artists in 2026.',
 keywords: [
 'Midjourney vs DALL-E 3',
 'Midjourney pricing 2026',
 'DALL-E 3 pricing',
 'AI image generation comparison',
 'best AI image generator',
 'Midjourney vs DALL-E vs Stable Diffusion',
 'AI art tools comparison',
 'Midjourney vs DALL-E 2026',
 'AI image generator for designers',
 'AI art comparison',
 ],
 alternates: { canonical: `${BASE_URL}/compare/midjourney-vs-dalle` },
 openGraph: {
 title: 'Midjourney vs DALL-E 3 2026 — Pricing, Features, Image Quality Compared',
 description:
 'Midjourney vs DALL-E 3: pricing ($10-60/mo vs ChatGPT Plus $20/mo), image quality, creative control, editing capabilities, and which AI image generator wins in 2026.',
 url: `${BASE_URL}/compare/midjourney-vs-dalle`,
 siteName: 'Apifeny AI',
 type: 'website',
 images: [{ url: '/og', width: 1200, height: 630 }],
 },
 twitter: {
 card: 'summary_large_image',
 title: 'Midjourney vs DALL-E 3 2026 — Pricing, Features, Image Quality Compared',
 description: 'Image quality, pricing, creative control — which AI image generator wins for you?',
 images: ['/og'],
 },
 robots: { index: true, follow: true },
};

// ─── Data ────────────────────────────────────────────────────────────
const VERDICT_SCORES = {
 midjourney: {
 imageQuality: 9.5,
 creativeControl: 9.0,
 styleConsistency: 9.5,
 textRendering: 5.0,
 editing: 7.0,
 speed: 8.0,
 affordability: 6.5,
 accessibility: 7.0,
 },
 dalle: {
 imageQuality: 8.5,
 creativeControl: 7.0,
 styleConsistency: 7.5,
 textRendering: 8.5,
 editing: 9.0,
 speed: 9.0,
 affordability: 8.0,
 accessibility: 9.0,
 },
} as const;

const COMPARISON_ROWS = [
 {
 category: 'Pricing',
 icon: DollarSign,
 items: [
 {
 label: 'Free Tier',
 midjourney: '❌ No free tier. Limited free trial (~25 images) for new users.',
 dalle: '✅ Included with ChatGPT Plus ($20/mo). Also free (limited) via Bing Image Creator.',
 winner: 'dalle',
 },
 {
 label: 'Basic Plan',
 midjourney: '$10/mo Basic — 3.3 hours fast GPU / ~200 images per month.',
 dalle: '$20/mo ChatGPT Plus — unlimited DALL-E 3 generations (with rate limits).',
 winner: 'dalle',
 },
 {
 label: 'Pro Plan',
 midjourney: '$30/mo Standard — 15 hours fast GPU, unlimited relax GPU.',
 dalle: 'N/A — DALL-E 3 does not have standalone pricing beyond ChatGPT Plus.',
 winner: 'midjourney',
 },
 {
 label: 'Enterprise / Top Tier',
 midjourney: '$60/mo Pro — 30 hours fast GPU, stealth mode, VIP support.',
 dalle: 'Enterprise API pricing — $0.04 per image (standard), $0.08 per image (HD).',
 winner: 'midjourney',
 },
 {
 label: 'API Access',
 midjourney: '⚠️ No public API. Discord-only or standalone web app (beta).',
 dalle: '✅ OpenAI API available. Pay-per-image: $0.02–$0.08/image depending on resolution.',
 winner: 'dalle',
 },
 ],
 },
 {
 category: 'Image Quality & Aesthetics',
 icon: Image,
 items: [
 {
 label: 'Overall Aesthetic Quality',
 midjourney: '⭐ Best-in-class. Stunning lighting, composition, texture, and artistic flair.',
 dalle: 'Very good but less "cinematic" than Midjourney. Brighter, cleaner, more literal.',
 winner: 'midjourney',
 },
 {
 label: 'Photorealism',
 midjourney: 'Excellent. Midjourney V6 produces near-photorealistic images with natural lighting.',
 dalle: 'Good photorealism but results can feel slightly plasticky or over-processed.',
 winner: 'midjourney',
 },
 {
 label: 'Artistic Styles',
 midjourney: '⭐ Huge range — oil painting, concept art, anime, 3D render, pixel art, etc.',
 dalle: 'Good range but less dramatic. More constrained, safer outputs.',
 winner: 'midjourney',
 },
 {
 label: 'Prompt Following',
 midjourney: 'Good but requires specific syntax (parameters, aspect ratios, style codes).',
 dalle: '⭐ Excellent. Understands natural language prompts without special syntax.',
 winner: 'dalle',
 },
 ],
 },
 {
 category: 'Text Rendering',
 icon: MessageSquare,
 items: [
 {
 label: 'Text in Images',
 midjourney: '⚠️ Weak — frequently misspells words, mixes characters, adds random text.',
 dalle: '⭐ Best-in-class for text. Clear, legible typography in images.',
 winner: 'dalle',
 },
 {
 label: 'Logo Design',
 midjourney: 'Unreliable — text errors make logos risky without manual editing.',
 dalle: 'Good. Can generate logos with correct text, though complex layouts may still fail.',
 winner: 'dalle',
 },
 {
 label: 'Typography Accuracy',
 midjourney: '~50% accuracy on text in images.',
 dalle: '~90% accuracy — far superior for any text-bearing image.',
 winner: 'dalle',
 },
 ],
 },
 {
 category: 'Editing & Inpainting',
 icon: Paintbrush,
 items: [
 {
 label: 'Inpainting (Replace region)',
 midjourney: '⚠️ Vary (Region) feature available. Functional but limited precision.',
 dalle: '⭐ ChatGPT edit + DALLE editor allows precise region selection and modification.',
 winner: 'dalle',
 },
 {
 label: 'Outpainting (Expand canvas)',
 midjourney: '❌ No native outpainting. Requires cropping + regenerating.',
 dalle: '✅ Outpainting via ChatGPT editor. Expand canvas in any direction.',
 winner: 'dalle',
 },
 {
 label: 'Image-to-Image',
 midjourney: '✅ Use an image as reference (image prompt + text prompt). Very strong.',
 dalle: '✅ Can use uploaded images as inspiration but less precise than Midjourney.',
 winner: 'midjourney',
 },
 {
 label: 'Remixing / Variations',
 midjourney: '⭐ Strong — infinite variations, zoom out, pan, reroll, remix mode.',
 dalle: 'Good — generates variations within ChatGPT but fewer controls per session.',
 winner: 'midjourney',
 },
 ],
 },
 {
 category: 'Style Control & Consistency',
 icon: Palette,
 items: [
 {
 label: 'Style Parameters',
 midjourney: '⭐ Extensive — stylize, weird, chaos, aspect ratio, parameter-based control.',
 dalle: 'Basic — aspect ratio, style presets (vivid/natural), no fine-grained style controls.',
 winner: 'midjourney',
 },
 {
 label: 'Character Consistency',
 midjourney: '⚠️ Inconsistent across generations. No native character reference system.',
 dalle: '⚠️ Similar issue — inconsistent across sessions. No built-in character consistency.',
 winner: 'tie',
 },
 {
 label: 'Color Palette Control',
 midjourney: 'Good — can guide color schemes through prompting and --style parameters.',
 dalle: 'Decent — follows color descriptions in prompts, less control than Midjourney.',
 winner: 'midjourney',
 },
 {
 label: 'Aspect Ratio Control',
 midjourney: '⭐ Full control via --ar parameter (1:1, 16:9, 2:3, 9:16, custom).',
 dalle: '✅ Aspect ratio options in ChatGPT (square, wide, vertical). Fewer custom options.',
 winner: 'midjourney',
 },
 ],
 },
 {
 category: 'Speed & Workflow',
 icon: Zap,
 items: [
 {
 label: 'Generation Speed',
 midjourney: '~60 seconds per image (fast GPU), ~5-10 min (relax GPU).',
 dalle: '⭐ ~5-10 seconds per image. Significantly faster.',
 winner: 'dalle',
 },
 {
 label: 'Batch Generation',
 midjourney: '⭐ 4 images per generation by default. Remix and vary for endless iterations.',
 dalle: '1-4 images per prompt. Regenerate button for new variations.',
 winner: 'midjourney',
 },
 {
 label: 'Platform',
 midjourney: 'Discord-only (primary) + Web app (alpha/beta). Steep learning curve.',
 dalle: '⭐ ChatGPT web + mobile + API. Familiar, low-friction interface.',
 winner: 'dalle',
 },
 {
 label: 'API Integration',
 midjourney: '❌ No official API as of 2026. Requires third-party bridges.',
 dalle: '✅ Clean OpenAI API with image generation endpoint. Easy integration.',
 winner: 'dalle',
 },
 ],
 },
];

const USE_CASES = [
 {
 icon: Palette,
 title: 'Professional Designers & Artists',
 verdict: 'Midjourney wins — unmatched aesthetic quality and creative control.',
 details:
 'For designers who need stunning visuals, concept art, or marketing imagery, Midjourney\'s aesthetic quality is simply unmatched. The parameter system gives granular control over style, lighting, composition, and aspect ratio. DALL-E 3 produces good images, but they lack the "wow factor" that Midjourney consistently delivers.',
 best: 'Midjourney',
 },
 {
 icon: MessageSquare,
 title: 'Marketers & Content Creators',
 verdict: 'Depends — Midjourney for hero images, DALL-E 3 for text-bearing graphics.',
 details:
 'For hero images and social media visuals, Midjourney wins on quality. But for any image that needs text (flyers, infographics, social cards with captions), DALL-E 3 is the clear winner thanks to superior text rendering. Many marketers use both: Midjourney for backgrounds and DALL-E 3 for text overlays.',
 best: 'Both (complementary)',
 },
 {
 icon: Code,
 title: 'Developers & API Integration',
 verdict: 'DALL-E 3 wins — clean API, easy integration, predictable pricing.',
 details:
 'DALL-E 3 via the OpenAI API is straightforward to integrate into any application. Midjourney has no official API, making it nearly impossible to integrate into product workflows. For developers building image generation features, DALL-E 3 is the obvious choice.',
 best: 'DALL-E 3',
 },
 {
 icon: Image,
 title: 'Hobbyists & Casual Users',
 verdict: 'DALL-E 3 wins — no learning curve, included with ChatGPT Plus.',
 details:
 'For casual users who just want to generate cool images, DALL-E 3 is far more accessible. No Discord needed, no special syntax, no GPU time to manage. Type what you want and get an image in seconds. Midjourney requires learning Discord, understanding parameters, and managing a subscription on top of ChatGPT.',
 best: 'DALL-E 3',
 },
 {
 icon: Globe,
 title: 'Brand & Style Consistency',
 verdict: 'Midjourney wins — more control over consistent visual language.',
 details:
 'For brands that need a consistent visual identity across multiple generations, Midjourney\'s parameter system (--sref, --cref, style codes) offers more control. DALL-E 3 is less consistent — even with the same prompt, results can vary wildly between sessions.',
 best: 'Midjourney',
 },
];

const FAQS = [
 {
 q: 'Is Midjourney better than DALL-E 3?',
 a: 'It depends on what matters to you. Midjourney produces higher aesthetic quality images with better lighting, composition, and artistic flair. But DALL-E 3 is better for text in images, easier to use (no Discord required), has a proper API, and is included with ChatGPT Plus ($20/mo). Midjourney starts at $10/mo for the Basic plan.',
 },
 {
 q: 'Can DALL-E 3 generate text in images?',
 a: 'Yes — DALL-E 3 is significantly better at rendering text in images compared to Midjourney. DALL-E 3 achieves roughly 90% accuracy for simple text (headlines, labels, logos), while Midjourney struggles with text accuracy (~50%). For any image that includes text, DALL-E 3 is the better choice.',
 },
 {
 q: 'Does Midjourney have a free trial?',
 a: 'Yes — Midjourney offers a free trial (~25 image generations) for new users. After the trial, plans start at $10/mo (Basic, 3.3 hours fast GPU/month). DALL-E 3 is included with ChatGPT Plus ($20/mo) and is also available for free (with limitations) through Bing Image Creator.',
 },
 {
 q: 'Which is better for professional design work?',
 a: 'Midjourney is generally preferred by professional designers and artists for its superior aesthetic quality, fine-grained style controls, and high-resolution outputs. However, DALL-E 3 is catching up and wins on text rendering and ease of use. Many professionals use both tools for different aspects of their workflow.',
 },
 {
 q: 'Can I use Midjourney and DALL-E 3 together?',
 a: 'Yes — and this is a common workflow. Use Midjourney for generating beautiful base images, concept art, and backgrounds. Use DALL-E 3 for images that need text (social media graphics, flyers, logos) and for quick iterations. At $30-80/mo combined, the coverage is well worth it for serious image creators.',
 },
 {
 q: 'How does Stable Diffusion compare to Midjourney and DALL-E 3?',
 a: 'Stable Diffusion (via ComfyUI, Automatic1111, or subscription services) offers the most control, custom model training (LoRA, Checkpoint), local/private generation, and is free/open-source. However, it requires significant technical setup and hardware. Midjourney is the best "out of the box" premium experience. DALL-E 3 is the most accessible and best for text. For a full comparison, see our AI image generator guide.',
 },
];

// ─── Helpers ──────────────────────────────────────────────────────────
function ScoreBar({ score, label, color }: { score: number; label: string; color: 'purple' | 'green' }) {
 const barColor =
 color === 'purple'
 ? 'bg-purple-500'
 : 'bg-emerald-500';
 const textColor =
 color === 'purple'
 ? 'text-purple-300'
 : 'text-emerald-300';
 return (
 <div className="flex items-center gap-3">
 <span className={`text-xs ${textColor} w-16 shrink-0`}>{label}</span>
 <div className="flex-1 h-2.5 rounded-full bg-tech-700 overflow-hidden">
 <div
 className={`h-full rounded-full transition-all ${barColor}`}
 style={{ width: `${score * 10}%` }}
 />
 </div>
 <span className="text-xs font-mono text-tech-300 w-8 text-right">{score.toFixed(1)}</span>
 </div>
 );
}

function WinnerBadge({ winner }: { winner: string }) {
 if (winner === 'midjourney') {
 return (
 <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-purple-400 bg-purple-400/10 px-2 py-0.5 rounded-full">
 <Palette className="w-3 h-3" />
 Midjourney
 </span>
 );
 }
 if (winner === 'dalle') {
 return (
 <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded-full">
 <Sparkles className="w-3 h-3" />
 DALL-E 3
 </span>
 );
 }
 return (
 <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-yellow-400 bg-yellow-400/10 px-2 py-0.5 rounded-full">
 Tie
 </span>
 );
}

export default function MidjourneyVsDalleCompare() {
 return (
 <div className="min-h-screen bg-tech-900">
 <BreadcrumbSchema
 items={[
 { name: 'Home', item: '/' },
 { name: 'Compare', item: '/compare' },
 { name: 'Midjourney vs DALL-E 3', item: '/compare/midjourney-vs-dalle' },
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
 <div className="relative rounded-2xl bg-gradient-to-br from-purple-500/10 via-tech-800 to-fuchsia-500/5 border border-tech-500/30 p-8 sm:p-12">
 <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-medium mb-4">
 <Star className="w-3.5 h-3.5" />
 Head-to-Head Comparison
 </div>
 <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
 Midjourney vs DALL-E 3{' '}
 <span className="bg-gradient-to-r from-purple-300 to-fuchsia-300 bg-clip-text text-transparent">
 2026
 </span>
 </h1>
 <p className="text-sm sm:text-base text-tech-100/70 max-w-2xl mb-6">
 Two of the most popular AI image generators go head-to-head. Midjourney is known for
 breathtaking aesthetic quality and fine-grained creative control. DALL-E 3 excels with
 text rendering, accessibility, and clean API integration. We break down pricing,
 image quality, editing, and which tool wins for different use cases.
 </p>

 {/* Quick stat pills */}
 <div className="flex flex-wrap gap-3">
 <div className="px-3 py-1.5 rounded-lg bg-tech-700/60 border border-tech-500/20 text-xs text-tech-200">
 <span className="text-purple-300 font-semibold">Midjourney</span> — $10-60/mo
 </div>
 <div className="px-3 py-1.5 rounded-lg bg-tech-700/60 border border-tech-500/20 text-xs text-tech-200">
 <span className="text-emerald-400 font-semibold">DALL-E 3</span> — Included in ChatGPT Plus $20/mo
 </div>
 <div className="px-3 py-1.5 rounded-lg bg-tech-700/60 border border-tech-500/20 text-xs text-tech-200">
 Midjourney: best aesthetics · DALL-E 3: best text + API
 </div>
 </div>
 </div>
 </section>

 {/* ─── Table of Contents ─────────────────────────────────── */}
 <section className="mb-12">
 <div className="bg-tech-800/40 border border-tech-500/20 rounded-xl p-6">
 <h2 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
 <BookOpen className="w-4 h-4 text-purple-400" />
 Table of Contents
 </h2>
 <nav className="grid grid-cols-1 sm:grid-cols-2 gap-2">
 {[
 { href: '#verdict', label: 'Quick Verdict · Scorecard' },
 { href: '#pricing', label: 'Pricing Breakdown' },
 { href: '#image-quality', label: 'Image Quality & Aesthetics' },
 { href: '#text-rendering', label: 'Text Rendering' },
 { href: '#editing', label: 'Editing & Inpainting' },
 { href: '#style-control', label: 'Style Control & Consistency' },
 { href: '#speed', label: 'Speed & Workflow' },
 { href: '#usecases', label: 'Use Cases — Who Wins What' },
 { href: '#recommendation', label: 'Final Recommendation' },
 { href: '#faq', label: 'FAQ' },
 ].map((item) => (
 <a
 key={item.href}
 href={item.href}
 className="flex items-center gap-2 text-sm text-tech-300 hover:text-purple-300 transition px-3 py-2 rounded-lg hover:bg-tech-700/40"
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
 <BarChart3 className="w-6 h-6 text-purple-400" />
 Quick Verdict · Scorecard
 </h2>

 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
 {/* Midjourney */}
 <div className="rounded-xl bg-tech-800/50 border border-purple-500/30 p-6">
 <div className="flex items-center gap-3 mb-4">
 <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
 <Palette className="w-5 h-5 text-purple-300" />
 </div>
 <div>
 <h3 className="text-lg font-bold text-white">Midjourney</h3>
 <p className="text-xs text-tech-400">V6 — Discord + Web Alpha</p>
 </div>
 </div>
 <div className="space-y-2.5">
 <ScoreBar score={VERDICT_SCORES.midjourney.imageQuality} label="Image Quality" color="purple" />
 <ScoreBar score={VERDICT_SCORES.midjourney.creativeControl} label="Creative Control" color="purple" />
 <ScoreBar score={VERDICT_SCORES.midjourney.styleConsistency} label="Style Consistency" color="purple" />
 <ScoreBar score={VERDICT_SCORES.midjourney.textRendering} label="Text Rendering" color="purple" />
 <ScoreBar score={VERDICT_SCORES.midjourney.editing} label="Editing" color="purple" />
 <ScoreBar score={VERDICT_SCORES.midjourney.speed} label="Speed" color="purple" />
 <ScoreBar score={VERDICT_SCORES.midjourney.affordability} label="Affordability" color="purple" />
 <ScoreBar score={VERDICT_SCORES.midjourney.accessibility} label="Accessibility" color="purple" />
 </div>
 </div>

 {/* DALL-E 3 */}
 <div className="rounded-xl bg-tech-800/50 border border-emerald-500/30 p-6">
 <div className="flex items-center gap-3 mb-4">
 <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center">
 <Sparkles className="w-5 h-5 text-emerald-400" />
 </div>
 <div>
 <h3 className="text-lg font-bold text-white">DALL-E 3</h3>
 <p className="text-xs text-tech-400">OpenAI — ChatGPT + API</p>
 </div>
 </div>
 <div className="space-y-2.5">
 <ScoreBar score={VERDICT_SCORES.dalle.imageQuality} label="Image Quality" color="green" />
 <ScoreBar score={VERDICT_SCORES.dalle.creativeControl} label="Creative Control" color="green" />
 <ScoreBar score={VERDICT_SCORES.dalle.styleConsistency} label="Style Consistency" color="green" />
 <ScoreBar score={VERDICT_SCORES.dalle.textRendering} label="Text Rendering" color="green" />
 <ScoreBar score={VERDICT_SCORES.dalle.editing} label="Editing" color="green" />
 <ScoreBar score={VERDICT_SCORES.dalle.speed} label="Speed" color="green" />
 <ScoreBar score={VERDICT_SCORES.dalle.affordability} label="Affordability" color="green" />
 <ScoreBar score={VERDICT_SCORES.dalle.accessibility} label="Accessibility" color="green" />
 </div>
 </div>
 </div>

 <div className="mt-6 p-4 rounded-lg bg-tech-800/30 border border-tech-500/20">
 <p className="text-sm text-tech-200 text-center">
 <strong className="text-purple-300">Midjourney</strong> wins on: image quality, style control, creative control ·{' '}
 <strong className="text-emerald-400">DALL-E 3</strong> wins on: text rendering, editing, speed, accessibility, affordability ·{' '}
 <strong className="text-white">Tie</strong> on: character consistency
 </p>
 </div>
 </section>

 {/* ─── Full Comparison Tables ──────────────────────────────── */}
 {COMPARISON_ROWS.map((section) => (
 <section
 key={section.category}
 id={section.category.toLowerCase().replace(/ /g, '-').replace(/&/g, '')}
 className="mb-12 scroll-mt-20"
 >
 <div className="flex items-center gap-3 mb-6">
 <section.icon className="w-6 h-6 text-purple-400" />
 <h2 className="text-2xl font-bold text-white">{section.category}</h2>
 </div>

 <div className="overflow-x-auto rounded-xl border border-tech-500/20">
 <table className="w-full text-sm">
 <thead>
 <tr className="bg-tech-800/80">
 <th className="text-left px-4 py-3 text-tech-200 font-semibold border-b border-tech-500/20 w-[25%]">
 Aspect
 </th>
 <th className="text-left px-4 py-3 text-purple-300 font-semibold border-b border-tech-500/20 w-[30%]">
 Midjourney
 </th>
 <th className="text-left px-4 py-3 text-emerald-400 font-semibold border-b border-tech-500/20 w-[30%]">
 DALL-E 3
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
 <td className="px-4 py-3 text-tech-300">{row.midjourney}</td>
 <td className="px-4 py-3 text-tech-300">{row.dalle}</td>
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
 <Users className="w-6 h-6 text-purple-400" />
 <h2 className="text-2xl font-bold text-white">Use Cases — Who Wins What</h2>
 </div>

 <div className="space-y-4">
 {USE_CASES.map((uc) => (
 <div
 key={uc.title}
 className="rounded-xl bg-tech-800/40 border border-tech-500/20 p-6 hover:border-purple-500/30 transition"
 >
 <div className="flex items-start gap-4">
 <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center shrink-0">
 <uc.icon className="w-5 h-5 text-purple-300" />
 </div>
 <div className="flex-1 min-w-0">
 <h3 className="text-lg font-semibold text-white mb-1">{uc.title}</h3>
 <p className="text-sm text-purple-300 font-medium mb-2">{uc.verdict}</p>
 <p className="text-sm text-tech-300 leading-relaxed">{uc.details}</p>
 </div>
 <div className="shrink-0">
 <span
 className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full ${
 uc.best === 'Midjourney'
 ? 'bg-purple-500/10 text-purple-300 border border-purple-500/30'
 : uc.best === 'DALL-E 3'
 ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
 : 'bg-yellow-400/10 text-yellow-400 border border-yellow-400/30'
 }`}
 >
 {uc.best === 'Midjourney' ? (
 <Palette className="w-3 h-3" />
 ) : uc.best === 'DALL-E 3' ? (
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
 <div className="relative rounded-2xl bg-gradient-to-br from-purple-500/10 via-tech-800 to-fuchsia-500/5 border border-tech-500/30 p-8 sm:p-10 overflow-hidden">
 <div className="absolute inset-0 bg-tech-grid opacity-20" />
 <div className="relative">
 <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-medium mb-4">
 <Shield className="w-3.5 h-3.5" />
 Our Take
 </div>
 <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
 Final Recommendation
 </h2>

 <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
 <div className="rounded-xl bg-tech-800/60 border border-purple-500/20 p-5">
 <div className="flex items-center gap-2 mb-3">
 <Palette className="w-5 h-5 text-purple-300" />
 <h3 className="text-base font-bold text-white">Choose Midjourney if you:</h3>
 </div>
 <ul className="space-y-2">
 {[
 'Need the highest aesthetic quality — cinematic, artistic, dramatic',
 'Want fine-grained creative control over every aspect of the image',
 'Create concept art, character designs, or artistic portfolios',
 'Need consistent brand visuals with style parameter control',
 'Are willing to learn Discord-based workflows and MJ parameters',
 ].map((item) => (
 <li key={item} className="flex items-start gap-2 text-sm text-tech-200">
 <CheckCircle2 className="w-4 h-4 text-purple-300 mt-0.5 shrink-0" />
 {item}
 </li>
 ))}
 </ul>
 </div>

 <div className="rounded-xl bg-tech-800/60 border border-emerald-500/20 p-5">
 <div className="flex items-center gap-2 mb-3">
 <Sparkles className="w-5 h-5 text-emerald-400" />
 <h3 className="text-base font-bold text-white">Choose DALL-E 3 if you:</h3>
 </div>
 <ul className="space-y-2">
 {[
 'Need text in your images — flyers, posters, social media cards',
 'Want a simple, zero-learning-curve experience',
 'Need to integrate image generation via API',
 'Prefer faster generation (5-10 seconds vs 1 minute)',
 'Already use ChatGPT Plus and want image gen included',
 ].map((item) => (
 <li key={item} className="flex items-start gap-2 text-sm text-tech-200">
 <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
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
 Use <strong className="text-purple-300">both</strong>. Midjourney for your
 hero images, concept art, and any visual where beauty matters more than text.
 DALL-E 3 for text-in-image workflows, quick iterations, and API-integrated
 applications. At $30-80/mo combined (depending on Midjourney tier), you get
 best-in-class aesthetic quality <em>and</em> production-ready text rendering.
 </p>
 </div>
 </div>
 </div>
 </section>

 {/* ─── FAQ ────────────────────────────────────────────────── */}
 <section id="faq" className="mb-12 scroll-mt-20">
 <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
 <MessageSquare className="w-6 h-6 text-purple-400" />
 Frequently Asked Questions
 </h2>

 <div className="space-y-3">
 {FAQS.map((faq, i) => (
 <details
 key={i}
 className="group rounded-xl bg-tech-800/40 border border-tech-500/20 overflow-hidden"
 >
 <summary className="flex items-center justify-between px-5 py-4 cursor-pointer text-sm font-medium text-white hover:text-purple-300 transition list-none">
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

 {/* ─── Related Comparisons ──────────────────────────────── */}
 <section className="mb-12">
 <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
 <BarChart3 className="w-6 h-6 text-purple-400" />
 Related Comparisons
 </h2>
 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
 <Link
 href="/compare/gemini-vs-chatgpt"
 className="group rounded-xl bg-tech-800/40 border border-blue-500/20 p-5 hover:border-blue-500/40 transition"
 >
 <div className="flex items-center gap-3 mb-2">
 <Globe className="w-5 h-5 text-blue-300" />
 <h3 className="text-sm font-semibold text-white group-hover:text-blue-300 transition">
 Gemini vs ChatGPT
 </h3>
 </div>
 <p className="text-xs text-tech-400">
 Google AI vs OpenAI's flagship — pricing, multimodal, ecosystem.
 </p>
 </Link>
 <Link
 href="/compare/deepseek-vs-chatgpt"
 className="group rounded-xl bg-tech-800/40 border border-neon/20 p-5 hover:border-neon/40 transition"
 >
 <div className="flex items-center gap-3 mb-2">
 <Zap className="w-5 h-5 text-neon-light" />
 <h3 className="text-sm font-semibold text-white group-hover:text-neon-light transition">
 DeepSeek vs ChatGPT
 </h3>
 </div>
 <p className="text-xs text-tech-400">
 Open-source vs closed-source — coding, pricing, Asian languages.
 </p>
 </Link>
 </div>
 </section>

 {/* ─── CTA ──────────────────────────────────────────────── */}
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
 className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-tech-500/40 text-tech-200 hover:text-white hover:border-purple-500/40 text-sm font-medium transition"
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
