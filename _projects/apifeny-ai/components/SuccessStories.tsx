'use client';

import { useState } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { playbookSuccessStories, SuccessStory } from '@/lib/success-stories';
import { Sparkles, TrendingUp, Trophy, ChevronRight, ExternalLink, ThumbsUp, Share2 } from 'lucide-react';

interface SuccessStoriesProps {
 playbookSlug?: string;
 limit?: number;
 hideHeader?: boolean;
}

export default function SuccessStories({ playbookSlug, limit, hideHeader }: SuccessStoriesProps) {
 const [filterPlaybook, setFilterPlaybook] = useState<string>(playbookSlug || 'all');

 const stories = playbookSuccessStories
 .filter((s) => filterPlaybook === 'all' || s.playbook_slug === filterPlaybook)
 .slice(0, limit || playbookSuccessStories.length);

 const playbookFilters = Array.from(
 new Set(playbookSuccessStories.map((s) => s.playbook_slug))
 ).filter(Boolean) as string[];

 const playbookNames: Record<string, string> = {
 'content-creation-with-chatgpt': 'Content Creation',
 'build-an-app-with-cursor': 'Build an App',
 'productivity-workflow-with-ai': 'Productivity',
 'ai-marketing-for-asia': 'Asia Marketing',
 };

 const playbookIcons: Record<string, string> = {
 'content-creation-with-chatgpt': '\u270d\ufe0f',
 'build-an-app-with-cursor': '\ud83d\udcbb',
 'productivity-workflow-with-ai': '\u26a1',
 'ai-marketing-for-asia': '\ud83d\udcca',
 };

 const totalMRR = playbookSuccessStories
 .filter((s) => s.revenue)
 .reduce((sum, s) => sum + (s.revenue?.amount || 0), 0);

 return (
 <section className="relative">
 {!hideHeader && (
 <div className="flex items-center justify-between mb-6 sm:mb-8">
 <div className="flex items-center gap-3">
 <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-100 to-teal-50 flex items-center justify-center">
 <Trophy className="w-5 h-5 text-emerald-600" />
 </div>
 <div>
 <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Community Results</h2>
 <p className="text-xs sm:text-sm text-gray-500">
 Real results from people using these playbooks
 </p>
 </div>
 </div>
 {!playbookSlug && (
 <Link
 href="/success-stories"
 className="text-sm text-violet-600 hover:text-violet-700 transition flex items-center gap-1"
 >
 All stories
 <ChevronRight className="w-4 h-4" />
 </Link>
 )}
 </div>
 )}

 <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
 <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-3 sm:p-4 text-center shadow-sm">
 <div className="text-lg sm:text-xl font-bold text-emerald-700">
 ${(totalMRR / 1000).toFixed(1)}K
 </div>
 <div className="text-[10px] sm:text-xs text-emerald-600/80 mt-0.5">Total MRR Tracked</div>
 </div>
 <div className="rounded-xl border border-sky-200 bg-sky-50 p-3 sm:p-4 text-center shadow-sm">
 <div className="text-lg sm:text-xl font-bold text-sky-700">{stories.length}</div>
 <div className="text-[10px] sm:text-xs text-sky-600/80 mt-0.5">Success Stories</div>
 </div>
 <div className="rounded-xl border border-amber-200 bg-amber-50 p-3 sm:p-4 text-center shadow-sm">
 <div className="text-lg sm:text-xl font-bold text-amber-700">
 ${totalMRR > 0 ? Math.round(totalMRR / stories.filter((s) => s.revenue).length) : 0}
 </div>
 <div className="text-[10px] sm:text-xs text-amber-600/80 mt-0.5">Avg Revenue/Story</div>
 </div>
 <div className="rounded-xl border border-violet-200 bg-violet-50 p-3 sm:p-4 text-center shadow-sm">
 <div className="text-lg sm:text-xl font-bold text-violet-700">
 {playbookFilters.length}
 </div>
 <div className="text-[10px] sm:text-xs text-violet-600/80 mt-0.5">Playbooks Featured</div>
 </div>
 </div>

 {!playbookSlug && playbookFilters.length > 0 && (
 <div className="flex flex-wrap items-center gap-2 mb-5">
 <button
 onClick={() => setFilterPlaybook('all')}
 className={cn(
 'px-3 py-1.5 rounded-full text-[11px] font-medium border transition',
 filterPlaybook === 'all'
 ? 'bg-violet-100 text-violet-700 border-violet-200'
 : 'bg-white text-gray-500 border-gray-200 hover:border-violet-300 hover:text-violet-600'
 )}
 >
 All Stories
 </button>
 {playbookFilters.map((slug) => (
 <button
 key={slug}
 onClick={() => setFilterPlaybook(slug)}
 className={cn(
 'px-3 py-1.5 rounded-full text-[11px] font-medium border transition flex items-center gap-1',
 filterPlaybook === slug
 ? 'bg-violet-100 text-violet-700 border-violet-200'
 : 'bg-white text-gray-500 border-gray-200 hover:border-violet-300 hover:text-violet-600'
 )}
 >
 <span>{playbookIcons[slug]}</span>
 {playbookNames[slug] || slug}
 </button>
 ))}
 </div>
 )}

 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
 {stories.map((story) => (
 <StoryCard key={story.id} story={story} />
 ))}
 </div>

 {stories.length === 0 && (
 <div className="rounded-xl border border-dashed border-gray-200 bg-gray-50 p-8 text-center">
 <TrendingUp className="w-10 h-10 text-gray-300 mx-auto mb-3" />
 <h3 className="text-base font-semibold text-gray-900 mb-1">No stories yet</h3>
 <p className="text-xs text-gray-500 max-w-md mx-auto mb-4">
 Be the first to share your results from this playbook!
 </p>
 <Link
 href="/my-playbooks"
 className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-violet-600 hover:bg-violet-700 text-white text-sm font-medium transition"
 >
 Share your results
 <ChevronRight className="w-4 h-4" />
 </Link>
 </div>
 )}
 </section>
 );
}

function StoryCard({ story }: { story: SuccessStory }) {
 return (
 <Link
 href={`/playbook/${story.playbook_slug}`}
 className="group relative rounded-xl border border-gray-200 bg-white p-4 sm:p-5 hover:border-violet-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-violet-100/50 transition-all overflow-hidden"
 >
 <div className="relative">
 {story.revenue_proof && (
 <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-100 border border-emerald-200 text-emerald-700 text-[10px] font-semibold mb-2">
 <Sparkles className="w-3 h-3" />
 {story.revenue_proof}
 </div>
 )}

 <h3 className="text-sm font-semibold text-gray-900 group-hover:text-violet-700 transition-colors mb-1.5 leading-snug">
 {story.title}
 </h3>

 <p className="text-[11px] text-gray-500 line-clamp-2 mb-3 leading-relaxed">
 {story.description}
 </p>

 {story.results && story.results.length > 0 && (
 <div className="grid grid-cols-3 gap-2 mb-3">
 {story.results.slice(0, 3).map((r, i) => (
 <div key={i} className="text-center p-1.5 rounded-lg bg-gray-50">
 <div className="text-xs font-bold text-gray-900 truncate">{r.value}</div>
 <div className="text-[9px] text-gray-400 truncate">{r.metric}</div>
 </div>
 ))}
 </div>
 )}

 <div className="flex items-center justify-between">
 <div className="flex items-center gap-1.5">
 <div className="w-5 h-5 rounded-full bg-gradient-to-br from-violet-400 to-cyan-300 flex items-center justify-center text-[9px] font-bold text-white">
 {story.author.name.charAt(0)}
 </div>
 <span className="text-[10px] text-gray-400">{story.author.name}</span>
 </div>
 <div className="flex items-center gap-2 text-[10px] text-gray-400">
 <span className="flex items-center gap-0.5">
 <ThumbsUp className="w-3 h-3" />
 {story.likes}
 </span>
 <span className="flex items-center gap-0.5">
 <Share2 className="w-3 h-3" />
 {story.shares}
 </span>
 </div>
 </div>

 {story.tags && story.tags.length > 0 && (
 <div className="flex flex-wrap gap-1 mt-2">
 {story.tags.slice(0, 3).map((tag) => (
 <span
 key={tag}
 className="px-1.5 py-0.5 rounded text-[9px] bg-gray-100 text-gray-500"
 >
 #{tag}
 </span>
 ))}
 </div>
 )}

 {story.playbook_slug && (
 <div className="mt-3 pt-2 border-t border-gray-100">
 <span className="text-[10px] text-violet-600 group-hover:underline inline-flex items-center gap-0.5">
 View playbook
 <ExternalLink className="w-2.5 h-2.5" />
 </span>
 </div>
 )}
 </div>
 </Link>
 );
}
