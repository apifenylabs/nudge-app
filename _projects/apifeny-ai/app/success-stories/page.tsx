import { Metadata } from 'next';
import Link from 'next/link';
import { Trophy, Sparkles, TrendingUp, Users, ArrowRight } from 'lucide-react';
import SuccessStories from '@/components/SuccessStories';

export const metadata: Metadata = {
 title: 'Community Success Stories — Real Results | Apifeny AI',
 description:
 'Real success stories from people using AI playbooks. See actual revenue, traffic growth, and productivity gains from the Apifeny AI community.',
 openGraph: {
 title: 'AI Success Stories — Real Community Results | Apifeny AI',
 description: 'View verified success stories from people building with AI. Revenue proof, traffic metrics, and productivity improvements.',
 },
};

export default function SuccessStoriesPage() {
 return (
 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
 {/* Hero */}
 <section className="relative mb-10 sm:mb-12">
 <div className="absolute inset-0 bg-gray-50 opacity-30 rounded-2xl" />
 <div className="relative rounded-2xl bg-gradient-to-br from-emerald-500/10 via-teal-500/5 to-tech-800 border border-gray-200 p-8 sm:p-12">
 <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium mb-4">
 <Trophy className="w-3.5 h-3.5" />
 Community Success
 </div>
 <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">
 Real Results from{' '}
 <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
 Real People
 </span>
 </h1>
 <p className="text-sm sm:text-base text-gray-800/70 max-w-2xl mb-6">
 See what others have achieved by following our AI playbooks. Revenue numbers, traffic
 growth, productivity gains — all verified by our editorial team.
 </p>

 <div className="flex flex-wrap gap-4 sm:gap-6">
 <Link
 href="/my-playbooks"
 className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-medium transition"
 >
 Share Your Results
 <ArrowRight className="w-4 h-4" />
 </Link>
 <Link
 href="/revenue"
 className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-white text-sm font-medium transition"
 >
 Revenue Leaderboard
 <TrendingUp className="w-4 h-4" />
 </Link>
 <Link
 href="/playbooks"
 className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-white text-sm font-medium transition"
 >
 Browse Playbooks
 <Sparkles className="w-4 h-4" />
 </Link>
 </div>
 </div>
 </section>

 {/* Success Stories Feed */}
 <SuccessStories />
 </div>
 );
}
