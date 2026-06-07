'use client';

import Link from 'next/link';
import { playbookSuccessStories, SuccessStory } from '@/lib/success-stories';
import {
 Trophy,
 TrendingUp,
 DollarSign,
 Users,
 Sparkles,
 ChevronRight,
 ExternalLink,
 Medal,
 Crown,
 Award,
 ArrowRight,
 CheckCircle,
} from 'lucide-react';
import { cn } from '@/lib/utils';

export default function RevenuePage() {
 // Sort stories by revenue
 const revenueStories = [...playbookSuccessStories]
 .filter((s) => s.revenue)
 .sort((a, b) => (b.revenue?.amount || 0) - (a.revenue?.amount || 0));

 const totalMRR = revenueStories.reduce((sum, s) => sum + (s.revenue?.amount || 0), 0);
 const avgRevenue = totalMRR > 0 ? Math.round(totalMRR / revenueStories.length) : 0;
 const maxRevenue = revenueStories.length > 0 ? (revenueStories[0].revenue?.amount || 0) : 0;

 // Most profitable playbook
 const playbookRevenue: Record<string, { total: number; count: number; name: string }> = {};
 revenueStories.forEach((s) => {
 const slug = s.playbook_slug || 'unknown';
 if (!playbookRevenue[slug]) {
 playbookRevenue[slug] = { total: 0, count: 0, name: s.source_name };
 }
 playbookRevenue[slug].total += s.revenue?.amount || 0;
 playbookRevenue[slug].count += 1;
 });

 const mostProfitablePlaybook = Object.entries(playbookRevenue).sort(
 (a, b) => b[1].total - a[1].total
 )[0];

 const verifiedCount = revenueStories.filter((s) => s.revenue?.verified).length;

 const rankIcons = [Crown, Medal, Award];

 return (
 <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
 {/* Hero */}
 <div className="relative rounded-2xl bg-gradient-to-br from-amber-500/10 via-emerald-500/5 to-tech-800 border border-gray-200 p-6 sm:p-10 mb-8">
 <div className="absolute inset-0 bg-gray-50 opacity-30 rounded-2xl pointer-events-none" />
 <div className="relative">
 <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-medium mb-4">
 <DollarSign className="w-3.5 h-3.5" />
 Revenue Leaderboard
 </div>
 <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
 Revenue Tracker{' '}
 <span className="bg-gradient-to-r from-amber-400 to-emerald-400 bg-clip-text text-transparent">
 Leaderboard
 </span>
 </h1>
 <p className="text-sm text-gray-800/70 max-w-xl mb-4">
 Real revenue numbers from people using AI playbooks. All data anonymized and
 verified by our editorial team.
 </p>

 {/* Stats cards */}
 <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
 <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-3 sm:p-4">
 <div className="flex items-center gap-2 mb-1">
 <DollarSign className="w-4 h-4 text-amber-400" />
 <span className="text-[10px] text-gray-600">Total MRR Tracked</span>
 </div>
 <div className="text-lg sm:text-xl font-bold text-amber-400">
 ${(totalMRR / 1000).toFixed(1)}K
 </div>
 </div>
 <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-3 sm:p-4">
 <div className="flex items-center gap-2 mb-1">
 <TrendingUp className="w-4 h-4 text-emerald-400" />
 <span className="text-[10px] text-gray-600">Avg Revenue</span>
 </div>
 <div className="text-lg sm:text-xl font-bold text-emerald-400">
 ${avgRevenue.toLocaleString()}/mo
 </div>
 </div>
 <div className="rounded-xl border border-violet-500/20 bg-violet-500/5 p-3 sm:p-4">
 <div className="flex items-center gap-2 mb-1">
 <Trophy className="w-4 h-4 text-violet-400" />
 <span className="text-[10px] text-gray-600">Highest Revenue</span>
 </div>
 <div className="text-lg sm:text-xl font-bold text-violet-400">
 ${maxRevenue.toLocaleString()}/mo
 </div>
 </div>
 <div className="rounded-xl border border-sky-500/20 bg-sky-500/5 p-3 sm:p-4">
 <div className="flex items-center gap-2 mb-1">
 <Users className="w-4 h-4 text-sky-400" />
 <span className="text-[10px] text-gray-600">Verified Stories</span>
 </div>
 <div className="text-lg sm:text-xl font-bold text-sky-400">
 {verifiedCount}/{revenueStories.length}
 </div>
 </div>
 </div>
 </div>
 </div>

 {/* Most Profitable Playbook */}
 {mostProfitablePlaybook && (
 <div className="rounded-xl border border-amber-500/20 bg-gradient-to-r from-amber-500/5 to-tech-800 p-4 sm:p-5 mb-6">
 <div className="flex items-center justify-between">
 <div className="flex items-center gap-3">
 <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500/20 to-amber-600/10 flex items-center justify-center">
 <Crown className="w-5 h-5 text-amber-400" />
 </div>
 <div>
 <div className="text-xs text-gray-600 mb-0.5">Most Profitable Playbook</div>
 <div className="text-sm font-semibold text-white">
 {mostProfitablePlaybook[1].name}
 </div>
 <div className="text-[11px] text-gray-700">
 ${mostProfitablePlaybook[1].total.toLocaleString()} total revenue from{' '}
 {mostProfitablePlaybook[1].count} story
 {mostProfitablePlaybook[1].count !== 1 ? 'ies' : 'y'}
 </div>
 </div>
 </div>
 <Link
 href={`/playbook/${mostProfitablePlaybook[0]}`}
 className="flex items-center gap-1 text-xs text-neon-light hover:text-neon transition"
 >
 View playbook
 <ChevronRight className="w-3 h-3" />
 </Link>
 </div>
 </div>
 )}

 {/* Leaderboard */}
 <div className="rounded-xl border border-gray-200 bg-white overflow-hidden mb-6">
 <div className="p-4 sm:p-5 border-b border-gray-200">
 <h2 className="text-base font-semibold text-white flex items-center gap-2">
 <Trophy className="w-4 h-4 text-amber-400" />
 Revenue Leaderboard
 </h2>
 </div>
 <div className="divide-y divide-tech-500/20">
 {revenueStories.map((story, index) => {
 const RankIcon = rankIcons[index] || null;
 return (
 <div
 key={story.id}
 className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 hover:bg-gray-100 transition"
 >
 {/* Rank */}
 <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center shrink-0">
 {index === 0 ? (
 <Crown className="w-5 h-5 sm:w-6 sm:h-6 text-amber-400" />
 ) : index === 1 ? (
 <Medal className="w-5 h-5 sm:w-6 sm:h-6 text-gray-300" />
 ) : index === 2 ? (
 <Award className="w-5 h-5 sm:w-6 sm:h-6 text-amber-600" />
 ) : (
 <span className="text-sm font-bold text-gray-400">#{index + 1}</span>
 )}
 </div>

 {/* Story info */}
 <div className="flex-1 min-w-0">
 <Link
 href={`/playbook/${story.playbook_slug}`}
 className="text-sm font-medium text-white hover:text-neon-light transition line-clamp-1"
 >
 {story.title}
 </Link>
 <div className="flex items-center gap-2 text-[10px] sm:text-xs text-gray-600 mt-0.5">
 <span>{story.author.name}</span>
 <span className="text-gray-500">·</span>
 <span>{story.source_name}</span>
 {story.revenue?.verified && (
 <>
 <span className="text-gray-500">·</span>
 <span className="flex items-center gap-0.5 text-emerald-400">
 <CheckCircle className="w-3 h-3" />
 Verified
 </span>
 </>
 )}
 </div>
 </div>

 {/* Revenue amount */}
 <div className="text-right shrink-0">
 <div className="text-sm sm:text-base font-bold text-emerald-400">
 ${story.revenue?.amount?.toLocaleString()}
 </div>
 <div className="text-[10px] text-gray-600">/mo</div>
 </div>
 </div>
 );
 })}
 </div>

 {revenueStories.length === 0 && (
 <div className="p-8 text-center">
 <DollarSign className="w-10 h-10 text-gray-400 mx-auto mb-3" />
 <h3 className="text-base font-semibold text-white mb-1">No revenue stories yet</h3>
 <p className="text-xs text-gray-700">Be the first to submit your results!</p>
 </div>
 )}
 </div>

 {/* CTA */}
 <div className="rounded-xl border border-dashed border-gray-200 bg-white/40 p-6 sm:p-8 text-center">
 <TrendingUp className="w-10 h-10 text-amber-400/60 mx-auto mb-3" />
 <h3 className="text-lg font-semibold text-white mb-1">Have Revenue to Share?</h3>
 <p className="text-sm text-gray-700 max-w-md mx-auto mb-4">
 Tracked real results from one of our playbooks? Submit your story and join the leaderboard.
 </p>
 <div className="flex flex-wrap items-center justify-center gap-3">
 <Link
 href="/my-playbooks"
 className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gradient-to-r from-amber-500 to-emerald-500 hover:from-amber-600 hover:to-emerald-600 text-white text-sm font-medium transition"
 >
 <Sparkles className="w-4 h-4" />
 Submit Your Revenue
 </Link>
 <Link
 href="/success-stories"
 className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-white text-sm font-medium transition"
 >
 Browse All Stories
 <ChevronRight className="w-4 h-4" />
 </Link>
 </div>
 </div>

 {/* Affiliate Disclosure & Monetization Summary */}
 <div className="rounded-xl border border-gray-200 bg-white/40 p-5">
 <h3 className="text-xs font-semibold text-gray-700 mb-3 uppercase tracking-wider">Monetization Summary</h3>
 <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
 <div className="p-3 rounded-lg bg-gray-100/40 border border-gray-200">
 <div className="text-lg font-bold text-amber-400">{totalMRR.toLocaleString()}+</div>
 <div className="text-[10px] text-gray-600">Total Reported MRR</div>
 </div>
 <div className="p-3 rounded-lg bg-gray-100/40 border border-gray-200">
 <div className="text-lg font-bold text-emerald-400">{avgRevenue.toLocaleString()}</div>
 <div className="text-[10px] text-gray-600">Average MRR per Playbook</div>
 </div>
 <div className="p-3 rounded-lg bg-gray-100/40 border border-gray-200">
 <div className="text-lg font-bold text-white">{maxRevenue.toLocaleString()}</div>
 <div className="text-[10px] text-gray-600">Highest MRR Reported</div>
 </div>
 </div>
 <p className="text-[10px] text-gray-400 leading-relaxed">
 <strong className="text-gray-700">Affiliate Disclosure:</strong> Some playbooks and tools linked on this page include affiliate links.
 Apifeny AI may earn a commission at no extra cost to you. Revenue stories are self-reported by users and
 may not reflect typical results. Individual results vary based on effort, market conditions, and execution.
 As an Amazon Associate and Klook Partner, we earn from qualifying purchases.
 </p>
 </div>
 </div>
 );
}
