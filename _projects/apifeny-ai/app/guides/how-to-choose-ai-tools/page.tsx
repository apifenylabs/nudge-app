import { Metadata } from 'next';
import Link from 'next/link';
import {
 Search,
 CheckCircle,
 DollarSign,
 Users,
 Shield,
 AlertTriangle,
 Lightbulb,
 ArrowRight,
 Star,
 Scale,
 Zap,
 BookOpen,
 Target,
 Filter,
 ClipboardCheck,
 Sparkles,
 ChevronRight,
 Calendar,
 Clock,
} from 'lucide-react';
import { toolsData } from '@/lib/data';
import ToolCard from '@/components/ToolCard';
import BreadcrumbSchema from '@/components/BreadcrumbSchema';
import BreadcrumbNav from '@/components/BreadcrumbNav';
import FAQSchema from '@/components/FAQSchema';
import { getRelatedPosts } from '@/lib/blog-data';

const BASE_URL = 'https://apifeny-ai.vercel.app';

export const metadata: Metadata = {
 title: 'How to Choose AI Tools in 2026 — A Practical Guide for Teams & Solopreneurs | Apifeny AI',
 description:
 'A practical framework for choosing the right AI tools for your team. Compare pricing, evaluate features, test for your use case, and avoid common mistakes. Includes our tested decision matrix and tool recommendations.',
 keywords: [
 'how to choose AI tools',
 'AI tool selection guide',
 'choose the right AI tool',
 'AI tool comparison framework',
 'how to pick AI software',
 'AI tool buying guide',
 'evaluate AI tools',
 'AI tool decision matrix',
 'compare AI tools',
 'AI tool checklist',
 'best AI tools for business',
 'AI tool selection criteria',
 'AI tool pricing comparison',
 'AI tool free trials evaluate',
 ],
 alternates: { canonical: `${BASE_URL}/guides/how-to-choose-ai-tools` },
 openGraph: {
 title: 'How to Choose AI Tools in 2026 — Practical Guide | Apifeny AI',
 description:
 'A practical framework for choosing AI tools: evaluate features, compare pricing, test for your real workflow, and avoid costly mistakes.',
 url: `${BASE_URL}/guides/how-to-choose-ai-tools`,
 siteName: 'Apifeny AI',
 type: 'article',
 publishedTime: '2026-05-23T00:00:00.000Z',
 images: [{ url: '/og', width: 1200, height: 630, alt: 'How to Choose AI Tools | Apifeny AI Guide' }],
 },
 twitter: {
 card: 'summary_large_image',
 title: 'How to Choose AI Tools in 2026',
 description: 'A practical framework for choosing AI tools: evaluate features, compare pricing, and test for your real workflow.',
 images: ['/og'],
 },
 robots: { index: true, follow: true },
};

// ── Guide Sections ─────────────────────────────────────────────────

const STEPS = [
 {
 num: 1,
 icon: Target,
 title: 'Define Your Use Case First',
 description:
 'Before evaluating any tool, write down exactly what you need AI to do. "I need AI" is too vague. Specific use cases make the choice obvious.',
 tips: [
 'What task takes up most of your team\'s time?',
 'What repetitive process could be automated?',
 'What skill is missing from your current team?',
 ],
 example: '❌ "I need an AI writing tool."\n✅ "I need AI that can draft 10 LinkedIn posts per week in my brand voice, in under 30 minutes."',
 },
 {
 num: 2,
 icon: Filter,
 title: 'Filter by Category & Pricing',
 description:
 'Use our curated categories — coding, writing, design, marketing, research — to narrow down to tools that match your workflow. Then check pricing tiers for your team size.',
 tips: [
 'Most tools have a free tier. Start there.',
 'Enterprise plans cost 3-10x more — skip if you have under 20 users.',
 'Asia-specific note: check for local pricing, payment methods (Alipay, GrabPay), and multi-language support.',
 ],
 },
 {
 num: 3,
 icon: ClipboardCheck,
 title: 'Score Against Your Must-Haves',
 description:
 'Create a simple evaluation table. List your top 3-5 requirements and score each tool 1-5. This removes emotional bias and makes the best tool obvious.',
 tips: [
 'Score features, not brand names — a lesser-known tool may fit better.',
 'Include non-negotiables: data privacy, API access, integrations.',
 'Weight your scores — "price" may be 3x more important than "design" for a bootstrapped team.',
 ],
 scoringFields: [
 'Price (free tier, monthly cost for your team size)',
 'Ease of use (can a non-technical teammate pick it up in 15 minutes?)',
 'Integration with existing tools (Slack, Notion, Zapier)',
 'Output quality (test with your real data)',
 'Customer support (availability, response time)',
 'Data security (where is data stored? SOC2, GDPR, Asia compliance?)',
 ],
 },
 {
 num: 4,
 icon: Lightbulb,
 title: 'Test With Real Work — Not Tutorials',
 description:
 'Skip the tutorial demos. Feed the tool your actual documents, prompts, and workflows. The difference between "works in a demo" and "works for my team" is enormous.',
 tips: [
 'Dedicate a 2-hour trial session per tool.',
 'Use real data — a real blog post outline, real code snippet, real customer email.',
 'Get 2-3 team members to test independently and compare notes.',
 ],
 },
 {
 num: 5,
 icon: Scale,
 title: 'Compare Side by Side',
 description:
 'Shortlist 2-3 tools and put them through the same test. Create the same output with each. Ask the same question. Time how long each takes.',
 tips: [
 'Use a shared doc to track results — not your brain.',
 'After testing, wait 24 hours before deciding. The hype fades.',
 'Check that the tool\'s output matches your quality bar, not just the tool\'s best-case demo.',
 ],
 },
 {
 num: 6,
 icon: Zap,
 title: 'Commit to One, But Keep a Backup',
 description:
 'Choose the best tool and integrate it into your workflow for 2 weeks. Keep the runner-up in mind as a fallback. AI tools evolve fast — re-evaluate quarterly.',
 tips: [
 'Set a calendar reminder to re-evaluate in 3 months.',
 'Export your data from each trial — don\'t get locked in.',
 'The best tool today may not be the best tool next quarter.',
 ],
 },
];

// ── Common Mistakes ─────────────────────────────────────────────────

const MISTAKES = [
 {
 icon: AlertTriangle,
 title: 'Choosing the Most Popular Tool',
 description:
 'The most hyped tool is rarely the best fit for your specific use case. ChatGPT is amazing for writing; Claude might be better for analysis. Popularity ≠ suitability.',
 fix: 'Search for your specific use case (e.g. "best AI for writing asian tour guides") rather than "best AI tool 2026".',
 },
 {
 icon: AlertTriangle,
 title: 'Ignoring Free Tiers',
 description:
 'Many teams jump straight to paid plans. Most AI tools have generous free tiers — often 50-100 generations per month. Use those for your trial, not the paid version.',
 fix: 'Start every evaluation with the free tier. Only upgrade once you\'ve validated the tool works for your workflow.',
 },
 {
 icon: AlertTriangle,
 title: 'Not Checking Data Privacy',
 description:
 'Free-tier AI tools often train on your data. If you handle sensitive customer information, check the privacy policy carefully. Some tools offer opt-out; others require enterprise plans.',
 fix: 'Before testing, check: "Does this tool train on user data? Can I opt out? Is there an enterprise tier with data isolation?"',
 },
 {
 icon: AlertTriangle,
 title: 'Committing Too Early',
 description:
 'Annual contracts are tempting (50% off!), but AI tools are evolving quarterly. A tool that makes sense today may be obsoleted in 6 months. Month-to-month is safer.',
 fix: 'Negotiate month-to-month for the first 3 months. If the tool is essential, only then consider annual pricing.',
 },
];

// ── Decision Framework ──────────────────────────────────────────────

const DECISION_QUESTIONS = [
 {
 question: 'Does it solve my specific problem?',
 why: 'If you can\'t name the exact task it helps with, you don\'t need it.',
 },
 {
 question: 'Can my team learn it in < 1 hour?',
 why: 'A tool that takes days to learn is a productivity sink, not a productivity tool.',
 },
 {
 question: 'Does it integrate where I already work?',
 why: 'If you have to copy-paste between tools, the friction kills the benefit.',
 },
 {
 question: 'Is the pricing sustainable?',
 why: 'A $50/tool/month × 5 tools = $250/month. Add seats and it scales fast.',
 },
 {
 question: 'What happens if I stop paying?',
 why: 'Do I lose access? Exports? History? Lock-in is a real risk with proprietary AI tools.',
 },
];

const guideFaqs = [
 {
 "question": "How do I choose the right AI tool?",
 "answer": "Identify your biggest time sink \u2014 content, admin, design, research, or support. Test 2-3 tools in that category (most have free tiers). Use the winner for 2 weeks before adding another category. Layer tools gradually."
 },
 {
 "question": "All-in-one or specialized tools?",
 "answer": "All-in-one platforms like ChatGPT are better for beginners. Specialized tools like Canva for design outperform all-in-ones in their domain. Start with a generalist, add specialists as needs emerge."
 }
];

export default function HowToChooseAIToolsPage() {
 const recommendedTools = toolsData
 .filter(t => t.is_published)
 .sort((a, b) => b.trending_score - a.trending_score)
 .slice(0, 4);

 // Related blog posts for internal linking
 const relatedPosts = getRelatedPosts('how-to-choose-ai-tools', 3) || [];

 return (
 <div className="min-h-screen bg-white">
 {/* Breadcrumb + Article schema */}
 <BreadcrumbSchema
 items={[
 { name: 'Home', item: BASE_URL },
 { name: 'Guides', item: `${BASE_URL}/guides` },
 { name: 'How to Choose AI Tools', item: `${BASE_URL}/guides/how-to-choose-ai-tools` },
 ]}
 />
 <script
 type="application/ld+json"
 dangerouslySetInnerHTML={{
 __html: JSON.stringify({
 "@context": "https://schema.org",
 "@type": "Article",
 "headline": "How to Choose AI Tools in 2026 — A Practical Guide",
 "description": "A practical framework for choosing AI tools: evaluate features, compare pricing, test for your real workflow, and avoid costly mistakes.",
 "datePublished": "2026-05-23",
 "dateModified": "2026-05-23",
 "author": { "@type": "Organization", "name": "Apifeny AI" },
 "publisher": { "@type": "Organization", "name": "Apifeny AI", "url": BASE_URL },
 "mainEntityOfPage": { "@type": "WebPage", "@id": `${BASE_URL}/guides/how-to-choose-ai-tools` },
 "about": { "@type": "Thing", "name": "AI tool selection" },
 "keywords": "how to choose AI tools, AI tool selection guide, AI tool comparison, AI tool decision framework, AI tools for business",
 }),
 }}
 />
 {/* ── Hero ────────────────────────────────────────────────────── */}
 <section className="relative overflow-hidden">
 <div className="absolute inset-0 bg-gradient-to-b from-violet-500/10 via-transparent to-tech-900 pointer-events-none" />
 <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
           <BreadcrumbNav
            className="mb-8"
            items={[
              { label: 'Guides', href: '/guides' },
              { label: 'How to Choose AI Tools' },
            ]}
          />
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-xs font-medium mb-6">
 <BookOpen className="w-3.5 h-3.5" />
 Evergreen Guide
 {/* FAQ Schema */}
 <FAQSchema faqs={guideFaqs} />
 </div>

 <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
 How to Choose AI Tools{' '}
 <span className="bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">
 That Actually Work
 </span>{' '}
 for You
 </h1>

 <p className="text-lg sm:text-xl text-gray-700 max-w-3xl mb-6 leading-relaxed">
 Stop picking AI tools based on hype. Our 6-step framework helps you evaluate, test, and
 choose the right tools for your specific team, budget, and workflow — no marketing fluff.
 </p>

 {/* Stats */}
 <div className="flex flex-wrap gap-6 text-sm">
 <div className="flex items-center gap-2 text-gray-600">
 <CheckCircle className="w-4 h-4 text-green-400" />
 <span>6-step decision framework</span>
 {/* FAQ Schema */}
 <FAQSchema faqs={guideFaqs} />
 </div>
 <div className="flex items-center gap-2 text-gray-600">
 <AlertTriangle className="w-4 h-4 text-amber-400" />
 <span>4 common mistakes to avoid</span>
 {/* FAQ Schema */}
 <FAQSchema faqs={guideFaqs} />
 </div>
 <div className="flex items-center gap-2 text-gray-600">
 <ClipboardCheck className="w-4 h-4 text-green-400" />
 <span>5 must-ask questions before buying</span>
 {/* FAQ Schema */}
 <FAQSchema faqs={guideFaqs} />
 </div>
 {/* FAQ Schema */}
 <FAQSchema faqs={guideFaqs} />
 </div>
 {/* FAQ Schema */}
 <FAQSchema faqs={guideFaqs} />
 </div>
 </section>

 {/* ── Quick Navigation ─────────────────────────────────────────── */}
 <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
 <div className="bg-gray-50/50 border border-gray-200 rounded-xl p-6">
 <h2 className="text-white font-semibold mb-4 flex items-center gap-2">
 <ChevronRight className="w-4 h-4 text-violet-400" />
 Jump to Section
 </h2>
 <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2">
 {STEPS.map((step) => (
 <a
 key={step.num}
 href={`#step-${step.num}`}
 className="text-sm text-gray-600 hover:text-violet-400 transition flex items-center gap-2 py-1.5"
 >
 <span className="w-5 h-5 rounded-full bg-violet-500/10 text-violet-400 text-xs flex items-center justify-center shrink-0">
 {step.num}
 </span>
 {step.title}
 </a>
 ))}
 <a
 href="#mistakes"
 className="text-sm text-gray-600 hover:text-amber-400 transition flex items-center gap-2 py-1.5"
 >
 <span className="w-5 h-5 rounded-full bg-amber-500/10 text-amber-400 text-xs flex items-center justify-center shrink-0">
 !
 </span>
 Common Mistakes
 </a>
 <a
 href="#framework"
 className="text-sm text-gray-600 hover:text-violet-400 transition flex items-center gap-2 py-1.5"
 >
 <span className="w-5 h-5 rounded-full bg-violet-500/10 text-violet-400 text-xs flex items-center justify-center shrink-0">
 ? 
 </span>
 Decision Framework
 </a>
 {/* FAQ Schema */}
 <FAQSchema faqs={guideFaqs} />
 </div>
 {/* FAQ Schema */}
 <FAQSchema faqs={guideFaqs} />
 </div>
 </section>

 {/* ── Step-by-Step Guide ───────────────────────────────────────── */}
 <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
 {STEPS.map((step, idx) => (
 <div
 key={step.num}
 id={`step-${step.num}`}
 className="mb-12 last:mb-0"
 >
 {/* Step header */}
 <div className="flex items-start gap-4 mb-6">
 <div className="w-10 h-10 rounded-xl bg-violet-500/15 border border-violet-500/20 flex items-center justify-center shrink-0 mt-0.5">
 <step.icon className="w-5 h-5 text-violet-400" />
 {/* FAQ Schema */}
 <FAQSchema faqs={guideFaqs} />
 </div>
 <div>
 <span className="text-xs font-medium text-violet-400 uppercase tracking-wider">
 Step {step.num} of {STEPS.length}
 </span>
 <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1">
 {step.title}
 </h2>
 {/* FAQ Schema */}
 <FAQSchema faqs={guideFaqs} />
 </div>
 {/* FAQ Schema */}
 <FAQSchema faqs={guideFaqs} />
 </div>

 {/* Description */}
 <div className="ml-14 sm:ml-14">
 <p className="text-gray-600 leading-relaxed mb-4">
 {step.description}
 </p>

 {/* Tips */}
 <div className="bg-gray-50/40 border border-gray-200 rounded-lg p-4 mb-4">
 <div className="flex items-center gap-2 mb-3">
 <Lightbulb className="w-4 h-4 text-amber-400" />
 <span className="text-xs font-medium text-amber-400 uppercase tracking-wider">Tips</span>
 {/* FAQ Schema */}
 <FAQSchema faqs={guideFaqs} />
 </div>
 <ul className="space-y-2">
 {step.tips.map((tip, i) => (
 <li key={i} className="text-sm text-gray-600 flex items-start gap-2">
 <span className="text-amber-400 mt-0.5 shrink-0">•</span>
 {tip}
 </li>
 ))}
 </ul>
 {/* FAQ Schema */}
 <FAQSchema faqs={guideFaqs} />
 </div>

 {/* Example / Scoring fields */}
 {'example' in step && step.example && (
 <div className="bg-gray-50/20 border border-gray-200 rounded-lg p-4">
 <div className="flex items-center gap-2 mb-2">
 <Sparkles className="w-4 h-4 text-green-400" />
 <span className="text-xs font-medium text-green-400 uppercase tracking-wider">Example</span>
 {/* FAQ Schema */}
 <FAQSchema faqs={guideFaqs} />
 </div>
 <pre className="text-sm text-gray-600 whitespace-pre-wrap font-sans">
 {step.example}
 </pre>
 {/* FAQ Schema */}
 <FAQSchema faqs={guideFaqs} />
 </div>
 )}

 {'scoringFields' in step && step.scoringFields && (
 <div className="bg-gray-50/20 border border-gray-200 rounded-lg p-4">
 <div className="flex items-center gap-2 mb-3">
 <ClipboardCheck className="w-4 h-4 text-violet-400" />
 <span className="text-xs font-medium text-violet-400 uppercase tracking-wider">
 Scoring Fields to Include
 </span>
 {/* FAQ Schema */}
 <FAQSchema faqs={guideFaqs} />
 </div>
 <ul className="space-y-2">
 {step.scoringFields.map((field, i) => (
 <li key={i} className="text-sm text-gray-600 flex items-start gap-2">
 <CheckCircle className="w-3.5 h-3.5 text-green-400 mt-0.5 shrink-0" />
 {field}
 </li>
 ))}
 </ul>
 {/* FAQ Schema */}
 <FAQSchema faqs={guideFaqs} />
 </div>
 )}
 {/* FAQ Schema */}
 <FAQSchema faqs={guideFaqs} />
 </div>

 {/* Divider (except last) */}
 {idx < STEPS.length - 1 && (
 <div className="ml-14 mt-8 border-l-2 border-dashed border-gray-200 h-8" />
 )}
 {/* FAQ Schema */}
 <FAQSchema faqs={guideFaqs} />
 </div>
 ))}
 </section>

 {/* ── Recommended Tools ────────────────────────────────────────── */}
 <section className="border-t border-gray-200 py-12 sm:py-16">
 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
 <div className="text-center mb-8">
 <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
 Start With These{' '}
 <span className="text-violet-400">Top-Rated Tools</span>
 </h2>
 <p className="text-gray-600 max-w-2xl mx-auto">
 Based on our editorial curation and community ratings, these are the most reliable AI tools
 across categories. Each one has a free tier, proven track record, and strong fit for teams.
 </p>
 {/* FAQ Schema */}
 <FAQSchema faqs={guideFaqs} />
 </div>

 <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 max-w-5xl mx-auto">
 {recommendedTools.map(tool => (
 <Link
 key={tool.id}
 href={`/tools/${tool.slug}`}
 className="group bg-gray-50/40 border border-gray-200 rounded-xl p-5 hover:border-violet-500/30 transition-all"
 >
 <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-tech-500 to-tech-600 flex items-center justify-center mb-4">
 <span className="text-white font-bold">
 {tool.name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()}
 </span>
 {/* FAQ Schema */}
 <FAQSchema faqs={guideFaqs} />
 </div>
 <h3 className="text-white font-semibold text-sm group-hover:text-violet-300 transition mb-1.5">
 {tool.name}
 </h3>
 <p className="text-xs text-gray-400 line-clamp-2 mb-3">
 {tool.tagline || tool.description?.slice(0, 100)}
 </p>
 {tool.avg_rating > 0 && (
 <div className="flex items-center gap-1">
 <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
 <span className="text-xs text-gray-400">{tool.avg_rating.toFixed(1)}</span>
 {/* FAQ Schema */}
 <FAQSchema faqs={guideFaqs} />
 </div>
 )}
 </Link>
 ))}
 {/* FAQ Schema */}
 <FAQSchema faqs={guideFaqs} />
 </div>

 <div className="text-center mt-8">
 <Link
 href="/tools"
 className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-violet-500 to-purple-500 text-white font-medium text-sm hover:shadow-lg hover:shadow-violet-500/20 hover:-translate-y-0.5 transition-all"
 >
 Browse All {toolsData.filter(t => t.is_published).length} Curated Tools
 <ArrowRight className="w-4 h-4" />
 </Link>
 {/* FAQ Schema */}
 <FAQSchema faqs={guideFaqs} />
 </div>
 {/* FAQ Schema */}
 <FAQSchema faqs={guideFaqs} />
 </div>
 </section>

 {/* ── Common Mistakes ──────────────────────────────────────────── */}
 <section id="mistakes" className="border-t border-gray-200 py-12 sm:py-16">
 <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
 <div className="flex items-center gap-3 mb-8">
 <AlertTriangle className="w-6 h-6 text-amber-400" />
 <h2 className="text-2xl sm:text-3xl font-bold text-white">
 Common Mistakes to Avoid
 </h2>
 {/* FAQ Schema */}
 <FAQSchema faqs={guideFaqs} />
 </div>

 <div className="space-y-6">
 {MISTAKES.map((mistake, i) => (
 <div
 key={i}
 className="bg-gray-50/30 border border-gray-200 rounded-xl p-6"
 >
 <div className="flex items-start gap-4">
 <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shrink-0">
 <mistake.icon className="w-5 h-5 text-amber-400" />
 {/* FAQ Schema */}
 <FAQSchema faqs={guideFaqs} />
 </div>
 <div>
 <h3 className="text-white font-semibold mb-1.5">{mistake.title}</h3>
 <p className="text-sm text-gray-600 mb-3 leading-relaxed">
 {mistake.description}
 </p>
 <div className="flex items-start gap-2 text-sm">
 <span className="text-green-400 font-medium shrink-0 mt-0.5">✓ Fix:</span>
 <span className="text-gray-600">{mistake.fix}</span>
 {/* FAQ Schema */}
 <FAQSchema faqs={guideFaqs} />
 </div>
 {/* FAQ Schema */}
 <FAQSchema faqs={guideFaqs} />
 </div>
 {/* FAQ Schema */}
 <FAQSchema faqs={guideFaqs} />
 </div>
 {/* FAQ Schema */}
 <FAQSchema faqs={guideFaqs} />
 </div>
 ))}
 {/* FAQ Schema */}
 <FAQSchema faqs={guideFaqs} />
 </div>
 {/* FAQ Schema */}
 <FAQSchema faqs={guideFaqs} />
 </div>
 </section>

 {/* ── Decision Framework ───────────────────────────────────────── */}
 <section id="framework" className="border-t border-gray-200 py-12 sm:py-16">
 <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
 <div className="flex items-center gap-3 mb-8">
 <ClipboardCheck className="w-6 h-6 text-violet-400" />
 <h2 className="text-2xl sm:text-3xl font-bold text-white">
 5 Questions to Ask{' '}
 <span className="text-violet-400">Before You Buy</span>
 </h2>
 {/* FAQ Schema */}
 <FAQSchema faqs={guideFaqs} />
 </div>

 <div className="grid sm:grid-cols-2 gap-4">
 {DECISION_QUESTIONS.map((dq, i) => (
 <div
 key={i}
 className="bg-gray-50/40 border border-gray-200 rounded-xl p-5 hover:border-violet-500/20 transition-all"
 >
 <div className="flex items-center gap-3 mb-3">
 <div className="w-8 h-8 rounded-lg bg-violet-500/10 flex items-center justify-center shrink-0">
 <span className="text-violet-400 font-bold text-sm">{i + 1}</span>
 {/* FAQ Schema */}
 <FAQSchema faqs={guideFaqs} />
 </div>
 <h3 className="text-white font-semibold text-sm leading-snug">{dq.question}</h3>
 {/* FAQ Schema */}
 <FAQSchema faqs={guideFaqs} />
 </div>
 <p className="text-xs text-gray-400 leading-relaxed ml-11">
 {dq.why}
 </p>
 {/* FAQ Schema */}
 <FAQSchema faqs={guideFaqs} />
 </div>
 ))}
 {/* FAQ Schema */}
 <FAQSchema faqs={guideFaqs} />
 </div>

 {/* Print-ready checklist */}
 <div className="mt-8 bg-gradient-to-br from-violet-500/5 to-purple-500/5 border border-violet-500/10 rounded-xl p-6 sm:p-8">
 <div className="flex items-center gap-2 mb-4">
 <ClipboardCheck className="w-5 h-5 text-violet-400" />
 <h3 className="text-white font-semibold">Printable Checklist</h3>
 {/* FAQ Schema */}
 <FAQSchema faqs={guideFaqs} />
 </div>
 <p className="text-sm text-gray-600 mb-4">
 Take these questions with you when evaluating AI tools. Check off each one as you go.
 </p>
 <div className="space-y-2">
 {DECISION_QUESTIONS.map((dq, i) => (
 <label
 key={i}
 className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50/40 cursor-pointer"
 >
 <input
 type="checkbox"
 className="w-4 h-4 rounded border-gray-200 bg-gray-50 text-violet-500 focus:ring-violet-500"
 />
 <span className="text-sm text-gray-700">{dq.question}</span>
 </label>
 ))}
 {/* FAQ Schema */}
 <FAQSchema faqs={guideFaqs} />
 </div>
 {/* FAQ Schema */}
 <FAQSchema faqs={guideFaqs} />
 </div>
 {/* FAQ Schema */}
 <FAQSchema faqs={guideFaqs} />
 </div>
 </section>

 {/* ── CTA ──────────────────────────────────────────────────────── */}
 <section className="border-t border-gray-200 py-12 sm:py-16">
 <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
 <div className="relative rounded-2xl bg-gradient-to-br from-violet-500/10 via-purple-500/5 to-tech-800 border border-gray-200 p-8 sm:p-12">
 <Search className="w-10 h-10 text-violet-400 mx-auto mb-4" />
 <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
 Ready to Find Your Perfect AI Stack?
 </h2>
 <p className="text-gray-600 max-w-xl mx-auto mb-6 leading-relaxed">
 Browse {toolsData.filter(t => t.is_published).length} curated AI tools organized by
 category, with ratings, pricing, and real use case recommendations. No hype, no fluff.
 </p>
 <div className="flex flex-wrap justify-center gap-4">
 <Link
 href="/tools"
 className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-violet-500 to-purple-500 text-white font-semibold transition-all hover:shadow-lg hover:shadow-violet-500/25 hover:-translate-y-0.5"
 >
 Browse All Tools
 <ArrowRight className="w-4 h-4" />
 </Link>
 <Link
 href="/categories"
 className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl border border-gray-200 text-gray-800 hover:border-violet-500/30 hover:text-white transition-all"
 >
 Browse by Category
 </Link>
 {/* FAQ Schema */}
 <FAQSchema faqs={guideFaqs} />
 </div>
 {/* FAQ Schema */}
 <FAQSchema faqs={guideFaqs} />
 </div>
 {/* FAQ Schema */}
 <FAQSchema faqs={guideFaqs} />
 </div>
 </section>

 {/* ── Related Blog Posts ─────────────────────────────────────── */}
 {relatedPosts.length > 0 && (
 <section className="border-t border-gray-200 py-12 sm:py-16">
 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
 <div className="flex items-center gap-2 mb-8">
 <BookOpen className="w-5 h-5 text-neon" />
 <h2 className="text-2xl font-bold text-white">Related Guides & Articles</h2>
 {/* FAQ Schema */}
 <FAQSchema faqs={guideFaqs} />
 </div>

 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
 {relatedPosts.map((related) => (
 <Link
 key={related.slug}
 href={`/blog/${related.slug}`}
 className="group bg-gray-50/40 border border-gray-200 rounded-xl p-6 hover:border-neon/30 transition-all"
 >
 <div className="flex flex-wrap gap-1.5 mb-3">
 {related.tags.slice(0, 2).map((tag) => (
 <span key={tag} className="text-[10px] font-medium px-1.5 py-0.5 rounded-full border border-gray-200 text-gray-400">
 {tag.replace(/-/g, ' ')}
 </span>
 ))}
 {/* FAQ Schema */}
 <FAQSchema faqs={guideFaqs} />
 </div>
 <h3 className="font-semibold text-white group-hover:text-neon-light transition mb-2 line-clamp-2">
 {related.title}
 </h3>
 <p className="text-sm text-gray-400 line-clamp-2 mb-3">
 {related.excerpt}
 </p>
 <div className="flex items-center gap-1 text-xs text-neon-light group-hover:gap-2 transition-all">
 Read Guide
 <ArrowRight className="w-3 h-3" />
 {/* FAQ Schema */}
 <FAQSchema faqs={guideFaqs} />
 </div>
 </Link>
 ))}
 {/* FAQ Schema */}
 <FAQSchema faqs={guideFaqs} />
 </div>
 {/* FAQ Schema */}
 <FAQSchema faqs={guideFaqs} />
 </div>
 </section>
 )}
 {/* FAQ Schema */}
 <FAQSchema faqs={guideFaqs} />
 </div>
 );
}
