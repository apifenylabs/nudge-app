'use client';

import Link from 'next/link';
import { ArrowRight, Sparkles, ChevronRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const MASCOTS = [
 { id: 'archie', name: 'Archie', emoji: '🗂️', color: 'from-blue-500 to-blue-600', bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200', phase: 'Discover', role: 'Directory Guide' },
 { id: 'nova', name: 'Nova', emoji: '📰', color: 'from-violet-500 to-violet-600', bg: 'bg-violet-50', text: 'text-violet-700', border: 'border-violet-200', phase: 'Learn', role: 'Newsletter Curator' },
 { id: 'pixel', name: 'Pixel', emoji: '🚀', color: 'from-emerald-500 to-emerald-600', bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200', phase: 'Build', role: 'Products Builder' },
 { id: 'echo', name: 'Echo', emoji: '🧠', color: 'from-amber-500 to-amber-600', bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200', phase: 'Remember & Distribute', role: 'Memory Keeper' },
];

const PHASES = [
 {
 id: 'discover',
 mascot: MASCOTS[0],
 title: 'Find your next AI tool — or list your own',
 description: 'Explore curated AI tools organized by workflow. Have something to share? Archie helps you get listed with perfect positioning.',
 cta: 'Browse Directory',
 ctaLink: '/',
 items: ['600+ curated AI tools', 'Workflow-based organization', 'Asia-ready filters', 'List your own tool for free'],
 },
 {
 id: 'learn',
 mascot: MASCOTS[1],
 title: 'Know what matters before it matters',
 description: 'Weekly newsletter surfacing real launches, trends, and community stories. Nova cuts through the noise.',
 cta: 'Subscribe Free',
 ctaLink: '/#newsletter',
 items: ['Weekly AI insights', 'Community spotlights', 'Tool launches & reviews', 'Read by 500+ founders'],
 },
 {
 id: 'build',
 mascot: MASCOTS[2],
 title: 'Ship AI products people actually want',
 description: 'Step-by-step playbooks, templates, and frameworks that take you from idea to MVP to launch. No fluff — just what works.',
 cta: 'Browse Playbooks',
 ctaLink: '/playbooks',
 items: ['71 copy-paste playbooks', 'Ready-to-deploy automation', 'Pro templates from $9', 'New playbooks added monthly'],
 },
 {
 id: 'remember',
 mascot: MASCOTS[3],
 title: 'Memory that follows you across every project',
 description: 'Omnimind is the distributed memory infrastructure for your AI ecosystem. Persistent context, cross-project knowledge, always evolving. The glue that makes everything remember.',
 cta: 'Explore Omnimind',
 ctaLink: '/omnimind',
 items: ['Cross-project memory', 'Persistent context', 'Distributable intelligence', 'Open-source ready'],
 },
];

export default function EcosystemSplash() {
 return (
 <>
 {/* ECOSYSTEM HERO — The AI Cofounder Hub */}
 <section className="relative overflow-hidden py-16 sm:py-20 bg-gradient-to-b from-white to-gray-50">
 <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-violet-100/40 via-transparent to-transparent" />
 <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
 <div className="text-center mb-12">
 <Badge variant="outline" className="mb-5 bg-amber-50 border-amber-200 text-amber-700 text-xs sm:text-sm">
 <Sparkles className="w-3.5 h-3.5 mr-1" />
 Your AI Cofounder. For Real.
 </Badge>
 <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 tracking-tight leading-[1.15]">
 Discover. Learn. Build.{' '}
 <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-600">
 Remember.
 </span>
 </h2>
 <p className="text-base sm:text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
 Structured phases to discover, build, and distribute in the AI world — powered by{' '}
 <strong className="text-gray-900">Omnimind memory</strong> that actually remembers everything across your projects.
 </p>
 </div>

 {/* MASCOT EMOJI ROW */}
 <div className="flex items-center justify-center gap-6 sm:gap-10 mb-12">
 {MASCOTS.map((m) => (
 <div key={m.id} className="flex flex-col items-center group cursor-default">
 <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl ${m.bg} border ${m.border} flex items-center justify-center text-2xl sm:text-3xl mb-2 group-hover:scale-110 transition-transform duration-300 shadow-sm`}>
 {m.emoji}
 </div>
 <span className={`text-[10px] sm:text-xs font-semibold ${m.text}`}>{m.name}</span>
 <span className="text-[9px] sm:text-[10px] text-gray-400">{m.role}</span>
 </div>
 ))}
 </div>

 {/* PHASE CARDS */}
 <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
 {PHASES.map((phase) => (
 <div
 key={phase.id}
 className={`rounded-xl border ${phase.mascot.border} ${phase.mascot.bg}/30 p-5 sm:p-6 hover:shadow-md hover:border-gray-300 transition-all duration-300 bg-white`}
 >
 <div className="flex items-start gap-4 mb-3">
 <div className={`w-10 h-10 rounded-lg ${phase.mascot.bg} border ${phase.mascot.border} flex items-center justify-center text-lg shrink-0`}>
 {phase.mascot.emoji}
 </div>
 <div className="min-w-0">
 <div className="flex items-center gap-2 mb-0.5">
 <span className={`text-[10px] font-semibold uppercase tracking-wider ${phase.mascot.text}`}>
 Phase — {phase.mascot.phase}
 </span>
 </div>
 <h3 className="text-base sm:text-lg font-semibold text-gray-900 leading-tight">{phase.title}</h3>
 </div>
 </div>
 <p className="text-sm text-gray-500 mb-3 leading-relaxed">{phase.description}</p>
 <ul className="space-y-1 mb-4">
 {phase.items.map((item, i) => (
 <li key={i} className="flex items-center gap-2 text-xs text-gray-500">
 <span className={`w-1.5 h-1.5 rounded-full ${phase.mascot.bg} border ${phase.mascot.border}`} />
 {item}
 </li>
 ))}
 </ul>
 <Link href={phase.ctaLink}>
 <Button variant="outline" size="sm" className="text-xs">
 {phase.cta}
 <ChevronRight className="w-3 h-3 ml-1" />
 </Button>
 </Link>
 </div>
 ))}
 </div>

 {/* OMNIMIND CALLOUT */}
 <div className="mt-8 rounded-xl border border-amber-200 bg-gradient-to-br from-amber-50/80 to-white p-5 sm:p-6">
 <div className="flex items-start gap-3">
 <div className="w-9 h-9 rounded-lg bg-amber-100 border border-amber-200 flex items-center justify-center text-base shrink-0">
 🧠
 </div>
 <div className="min-w-0">
 <h4 className="text-sm font-semibold text-gray-900 mb-1">Meet Echo — Your Ecosystem Memory</h4>
 <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
 Everything in the AI Cofounder Hub feeds Omnimind. Every tool you discover, every newsletter insight,
 every product you build — Echo remembers it all. Cross-project, persistent, distributable.
 <strong className="text-gray-700"> This is what makes your AI presence compound over time.</strong>
 </p>
 </div>
 </div>
 </div>

 {/* CTA */}
 <div className="text-center mt-8">
 <Link href="/playbooks/ai-solopreneur-toolkit">
 <Button className="bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-lg shadow-violet-200 hover:shadow-xl hover:shadow-violet-300 transition-all">
 Start Building — $9
 <ArrowRight className="w-4 h-4 ml-2" />
 </Button>
 </Link>
 <p className="text-xs text-gray-400 mt-2">No subscription required. One playbook at a time.</p>
 </div>
 </div>
 </section>
 </>
 );
}
