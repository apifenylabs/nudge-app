import Link from 'next/link';
import { Metadata } from 'next';
import { BookmarkPlus, ChevronRight, Layers } from 'lucide-react';
import { collections } from '@/lib/collections';

export const metadata: Metadata = {
 title: 'Curated AI Tool Collections | Apifeny AI',
 description: 'Hand-picked AI tool collections organized by workflow, use case, and pipeline stage. Find the best tools for coding, content, marketing, and more.',
 openGraph: {
 title: 'AI Tool Collections — Curated by Use Case | Apifeny AI',
 description: 'Discover curated AI tool collections organized by real workflows and pipeline stages.',
 },
};

export default function CollectionsPage() {
 return (
 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
 {/* Hero */}
 <section className="relative mb-10 sm:mb-12">
 <div className="absolute inset-0 bg-tech-grid opacity-30 rounded-2xl" />
 <div className="relative rounded-2xl bg-gradient-to-br from-aqua/10 via-tech-800 to-neon/5 border border-tech-500/30 p-8 sm:p-12">
 <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-aqua/10 border border-aqua/20 text-aqua text-xs font-medium mb-4">
 <Layers className="w-3.5 h-3.5" />
 Curated Collections
 </div>
 <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">
 Tool Collections —{' '}
 <span className="bg-gradient-to-r from-aqua to-emerald-400 bg-clip-text text-transparent">
 By Workflow
 </span>
 </h1>
 <p className="text-sm sm:text-base text-tech-100/70 max-w-2xl mb-6">
 Hand-picked tool sets organized by real workflows and pipeline stages. Each collection
 covers a complete workflow from start to finish.
 </p>
 <div className="flex items-center gap-2 text-xs text-tech-200">
 <BookmarkPlus className="w-4 h-4 text-aqua" />
 <span className="font-semibold text-white">{collections.length}</span> collections
 </div>
 </div>
 </section>

 {/* Collections Grid */}
 <section>
 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
 {collections.map((col) => (
 <Link
 key={col.slug}
 href={`/collection/${col.slug}`}
 className={`group relative rounded-xl bg-gradient-to-br ${col.gradient} bg-tech-700 border border-tech-500/30 p-5 hover:border-neon/40 transition-all hover:-translate-y-1 overflow-hidden`}
 >
 <div className="absolute inset-0 bg-tech-grid opacity-20" />
 <div className="relative">
 <span className="text-2xl mb-3 block">{col.icon}</span>
 <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-white/10 text-white/80 border border-white/20 uppercase tracking-wider mb-2 inline-block">
 {col.tool_slugs.length} tools
 </span>
 <h3 className="text-sm font-semibold text-white group-hover:text-neon-light transition-colors mb-1.5">
 {col.title}
 </h3>
 <p className="text-xs text-tech-200 line-clamp-2 mb-3 leading-relaxed">
 {col.description}
 </p>
 <span className="text-[10px] text-tech-300 group-hover:text-neon-light transition-colors flex items-center gap-0.5">
 View collection
 <ChevronRight className="w-3 h-3" />
 </span>
 </div>
 </Link>
 ))}
 </div>
 </section>
 </div>
 );
}
