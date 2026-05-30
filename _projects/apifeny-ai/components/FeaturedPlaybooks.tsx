'use client';

import Link from 'next/link';
import { Clock, ChevronRight, Sparkles, TrendingUp, DollarSign } from 'lucide-react';
import { playbooks } from '@/lib/playbooks';
import { cn } from '@/lib/utils';

const PAID_PLAYBOOKS = ['ai-solopreneur-toolkit', 'directory-builder-template', 'ai-workflow-automation'];

export default function FeaturedPlaybooks() {
 const featured = playbooks.slice(0, 4);

 return (
 <section className="relative">
 <div className="flex items-center justify-between mb-6 sm:mb-8">
 <div className="flex items-center gap-3">
 <div>
 <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Playbooks</h2>
 <p className="text-xs sm:text-sm text-gray-500">
 Step-by-step guides for your AI workflows
 </p>
 </div>
 </div>
 <Link
 href="/playbooks"
 className="text-sm text-violet-600 hover:text-violet-700 transition flex items-center gap-1"
 >
 All playbooks
 <ChevronRight className="w-4 h-4" />
 </Link>
 </div>

 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
 {featured.map((pb) => {
 const difficultyColor = {
 Beginner: 'bg-emerald-100 text-emerald-700 border-emerald-200',
 Intermediate: 'bg-amber-100 text-amber-700 border-amber-200',
 Advanced: 'bg-violet-100 text-violet-700 border-violet-200',
 };

 return (
 <Link
 key={pb.slug}
 href={PAID_PLAYBOOKS.includes(pb.slug) ? `/playbooks/${pb.slug}` : `/playbook/${pb.slug}`}
 className={`group relative rounded-xl bg-gradient-to-r ${pb.gradient} bg-white border border-gray-200 p-5 hover:border-violet-300 transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-violet-100/50 overflow-hidden`}
 >
 <div className="relative">
 <div className="flex items-center gap-2 mb-2">
 <span className="text-xl">{pb.icon}</span>
 <span
 className={cn(
 'inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-medium border',
 difficultyColor[pb.difficulty]
 )}
 >
 {pb.difficulty}
 </span>
 <span className="inline-flex items-center gap-0.5 text-[9px] text-gray-400">
 <Clock className="w-3 h-3" />
 {pb.read_time_minutes} min
 </span>
 </div>
 <h3 className="text-sm font-semibold text-gray-900 group-hover:text-violet-700 transition-colors mb-1">
 {pb.title}
 </h3>
 <p className="text-[11px] text-gray-500 line-clamp-2">{pb.description}</p>

 {/* Real Results Metrics */}
 {pb.real_results && pb.real_results.length > 0 && (
 <div className="grid grid-cols-2 gap-1.5 mt-2">
 {pb.real_results.slice(0, 2).map((r, i) => (
 <div
 key={i}
 className="flex items-center gap-1 p-1.5 rounded-lg bg-gray-50 border border-gray-200"
 >
 <span className="text-[10px] font-bold text-emerald-600 truncate">
 {r.value}
 </span>
 <span className="text-[9px] text-gray-400 truncate">{r.metric}</span>
 </div>
 ))}
 </div>
 )}

 {/* Revenue impact badge */}
 {pb.revenue_impact && (
 <div className="flex items-center gap-1 mt-2 text-[10px] text-amber-600/80">
 <DollarSign className="w-3 h-3" />
 <span className="truncate">{pb.revenue_impact}</span>
 </div>
 )}

 {/* Pipeline stage badge */}
 {pb.pipeline_stage && (
 <div className="flex items-center gap-1.5 mt-2">
 <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[8px] font-medium bg-gray-100 text-gray-500 border border-gray-200">
 <TrendingUp className="w-2.5 h-2.5" />
 {pb.pipeline_stage}
 </span>
 </div>
 )}

 <div className="flex items-center gap-1.5 mt-3 text-[10px] text-gray-400 group-hover:text-violet-600 transition-colors">
 Read playbook
 <ChevronRight className="w-3 h-3" />
 </div>
 </div>
 </Link>
 );
 })}
 </div>
 </section>
 );
}
