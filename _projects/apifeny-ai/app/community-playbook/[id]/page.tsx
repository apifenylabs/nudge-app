'use client';

import { useState, useEffect, useCallback } from 'react';
import { notFound, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
 ArrowLeft,
 Clock,
 BookOpen,
 Lightbulb,
 AlertTriangle,
 ExternalLink,
 ChevronRight,
 Sparkles,
 ThumbsUp,
 ThumbsDown,
 Share2,
 TrendingUp,
 DollarSign,
 CheckCircle,
 MessageSquare,
 Twitter,
 Linkedin,
 Star,
} from 'lucide-react';
import {
 communityPlaybooks,
 CommunityPlaybook,
 getUserVote,
 recordVote,
 removeVote,
 incrementShareCount,
 getShareLinks,
 getShareUrl,
} from '@/lib/community-playbooks';
import { toolsData } from '@/lib/data';
import ToolCard from '@/components/ToolCard';
import PlaybookComments from '@/components/PlaybookComments';
import { cn } from '@/lib/utils';

interface CommunityPlaybookPageProps {
 params: { id: string };
}

export default function CommunityPlaybookPage({ params }: CommunityPlaybookPageProps) {
 const playbook = communityPlaybooks.find((cp) => cp.id === params.id);
 if (!playbook) notFound();

 const router = useRouter();
 const [userVote, setUserVote] = useState<'up' | 'down' | null>(null);
 const [upvotes, setUpvotes] = useState(playbook.upvotes);
 const [downvotes, setDownvotes] = useState(playbook.downvotes);
 const [showShareMenu, setShowShareMenu] = useState(false);
 const [shareUrl, setShareUrl] = useState('');

 useEffect(() => {
 setUserVote(getUserVote(playbook.id));
 setShareUrl(getShareUrl(playbook.id));
 }, [playbook.id]);

 // ── Reading Progress Bar ──
 const [scrollProgress, setScrollProgress] = useState(0);

 useEffect(() => {
 const handleScroll = () => {
 const scrollTop = window.scrollY;
 const docHeight = document.documentElement.scrollHeight - window.innerHeight;
 if (docHeight > 0) {
 setScrollProgress(Math.min((scrollTop / docHeight) * 100, 100));
 }
 };
 window.addEventListener('scroll', handleScroll, { passive: true });
 return () => window.removeEventListener('scroll', handleScroll);
 }, []);

 const handleVote = (vote: 'up' | 'down') => {
 if (userVote === vote) {
 removeVote(playbook.id);
 setUserVote(null);
 if (vote === 'up') setUpvotes((p) => p - 1);
 else setDownvotes((p) => p - 1);
 } else {
 if (userVote === 'up') setUpvotes((p) => p - 1);
 if (userVote === 'down') setDownvotes((p) => p - 1);
 recordVote(playbook.id, vote);
 setUserVote(vote);
 if (vote === 'up') setUpvotes((p) => p + 1);
 else setDownvotes((p) => p + 1);
 }
 };

 const relatedTools = playbook.related_tool_slugs
 .map((slug) => toolsData.find((t) => t.slug === slug && t.is_published))
 .filter(Boolean) as typeof toolsData;

 const shareLinks = getShareLinks(playbook, shareUrl);
 const netScore = upvotes - downvotes;

 const difficultyColor = {
 Beginner: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
 Intermediate: 'bg-amber-100 text-amber-700 border-amber-200',
 Advanced: 'bg-neon/20 text-neon-light border-neon/30',
 };

 return (
 <>
 {/* Reading Progress Bar */}
 <div className="fixed top-0 left-0 z-50 h-0.5 bg-gray-50 w-full">
 <div
 className="h-full bg-gradient-to-r from-neon to-aqua transition-all duration-150 ease-out"
 style={{ width: `${scrollProgress}%` }}
 />
 </div>

 <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
 {/* Back */}
 <Link
 href="/community-playbook"
 className="inline-flex items-center gap-1.5 text-sm text-gray-700 hover:text-white transition mb-6 group"
 >
 <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition" />
 Community Playbooks
 </Link>

 {/* Hero */}
 <div
 className={`rounded-xl bg-gradient-to-r ${playbook.gradient} bg-white border border-gray-200 p-6 sm:p-8 mb-6 sm:mb-8 relative overflow-hidden`}
 >
 <div className="absolute inset-0 bg-gray-50 opacity-30" />
 <div className="relative">
 <div className="flex items-center gap-3 mb-3">
 <span className="text-3xl">{playbook.icon}</span>
 <span
 className={cn(
 'inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium border',
 difficultyColor[playbook.difficulty]
 )}
 >
 {playbook.difficulty}
 </span>
 {playbook.is_verified && (
 <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full text-[10px] font-medium bg-sky-500/15 text-sky-400 border border-sky-500/20">
 <CheckCircle className="w-3 h-3" />
 Verified
 </span>
 )}
 </div>

 <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">{playbook.title}</h1>
 <p className="text-sm text-gray-700 max-w-2xl mb-2">{playbook.description}</p>

 {playbook.subtitle && (
 <p className="text-xs text-gray-600 italic mb-3">{playbook.subtitle}</p>
 )}

 {/* Author & Stats */}
 <div className="flex flex-wrap items-center gap-4 text-xs text-gray-600 mt-4">
 <span className="flex items-center gap-1.5">
 <span className="w-5 h-5 rounded-full bg-neon/20 flex items-center justify-center text-[8px] font-bold text-neon-light">
 {playbook.author.name.charAt(0)}
 </span>
 {playbook.author.name}
 </span>
 <span className="flex items-center gap-1">
 <ThumbsUp className="w-3.5 h-3.5 text-emerald-400" />
 {upvotes}
 </span>
 <span className="flex items-center gap-1">
 <ThumbsDown className="w-3.5 h-3.5 text-rose-400" />
 {downvotes}
 </span>
 <span className="flex items-center gap-1">
 <Share2 className="w-3.5 h-3.5 text-sky-400" />
 {playbook.shares}
 </span>
 </div>

 {/* Tools used */}
 {relatedTools.length > 0 && (
 <div className="flex flex-wrap items-center gap-2 mt-4">
 <span className="text-xs text-gray-600">Tools used:</span>
 {relatedTools.map((tool) => (
 <Link
 key={tool.slug}
 href={`/tools/${tool.slug}`}
 className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-neon/10 text-neon-light border border-neon/20 hover:bg-neon/20 transition"
 >
 {tool.name}
 <ExternalLink className="w-2.5 h-2.5" />
 </Link>
 ))}
 </div>
 )}
 </div>
 </div>

 {/* Voting & Sharing */}
 <div className="flex items-center gap-2 mb-6">
 <button
 onClick={() => handleVote('up')}
 className={cn(
 'flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition',
 userVote === 'up'
 ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
 : 'bg-gray-50 text-gray-600 border-gray-200 hover:border-emerald-500/30 hover:text-emerald-400'
 )}
 >
 <ThumbsUp className="w-3.5 h-3.5" />
 Helpful ({upvotes})
 </button>
 <button
 onClick={() => handleVote('down')}
 className={cn(
 'flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition',
 userVote === 'down'
 ? 'bg-rose-500/20 text-rose-400 border-rose-500/30'
 : 'bg-gray-50 text-gray-600 border-gray-200 hover:border-rose-500/30 hover:text-rose-400'
 )}
 >
 <ThumbsDown className="w-3.5 h-3.5" />
 Needs work ({downvotes})
 </button>

 {/* Share */}
 <div className="relative ml-auto">
 <button
 onClick={() => setShowShareMenu(!showShareMenu)}
 className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-gray-50 text-gray-600 border border-gray-200 hover:border-sky-500/30 hover:text-sky-400 transition"
 >
 <Share2 className="w-3.5 h-3.5" />
 Share ({playbook.shares})
 </button>
 {showShareMenu && (
 <div className="absolute right-0 top-full mt-1 w-40 rounded-xl border border-gray-200 bg-gray-50 shadow-xl shadow-black/30 z-50 overflow-hidden">
 <a
 href={shareLinks.twitter}
 target="_blank"
 rel="noopener noreferrer"
 onClick={() => incrementShareCount(playbook.id)}
 className="flex items-center gap-2 px-3 py-2 text-xs text-gray-700 hover:bg-white hover:text-white transition"
 >
 <Twitter className="w-3.5 h-3.5 text-sky-400" />
 Share on X
 </a>
 <a
 href={shareLinks.linkedin}
 target="_blank"
 rel="noopener noreferrer"
 onClick={() => incrementShareCount(playbook.id)}
 className="flex items-center gap-2 px-3 py-2 text-xs text-gray-700 hover:bg-white hover:text-white transition"
 >
 <Linkedin className="w-3.5 h-3.5 text-blue-400" />
 Share on LinkedIn
 </a>
 </div>
 )}
 </div>
 </div>

 {/* Revenue Impact */}
 {playbook.revenue_impact && (
 <section className="mb-8">
 <div className="rounded-xl bg-gradient-to-r from-emerald-500/10 to-asia/10 border border-emerald-500/20 p-5">
 <div className="flex items-center gap-2 mb-3">
 <DollarSign className="w-5 h-5 text-emerald-400" />
 <h2 className="text-sm font-semibold text-gray-900">Revenue Impact</h2>
 </div>
 <p className="text-sm text-gray-700">{playbook.revenue_impact}</p>
 </div>
 </section>
 )}

 {/* Real Results */}
 {playbook.real_results && playbook.real_results.length > 0 && (
 <section className="mb-8">
 <h2 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
 <TrendingUp className="w-4 h-4 text-emerald-400" />
 Real Results
 </h2>
 <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
 {playbook.real_results.map((result, i) => (
 <div
 key={i}
 className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4 text-center"
 >
 <div className="text-xl font-bold text-emerald-400 mb-1">{result.value}</div>
 <div className="text-[11px] font-medium text-gray-600 mb-1">{result.metric}</div>
 <p className="text-[10px] text-gray-400">{result.description}</p>
 </div>
 ))}
 </div>
 </section>
 )}

 {/* Step-by-Step Guide */}
 <section className="mb-8">
 <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
 <BookOpen className="w-4 h-4 text-neon-light" />
 Step-by-Step Guide
 </h2>
 <div className="space-y-4">
 {playbook.steps.map((step, i) => (
 <div
 key={i}
 className="rounded-xl border border-gray-200 bg-white p-5 sm:p-6 relative"
 >
 <div className="flex items-start gap-4">
 <div className="w-10 h-10 rounded-full bg-gradient-to-br from-neon to-aqua flex items-center justify-center text-gray-900 font-bold text-sm shrink-0">
 {i + 1}
 </div>
 <div className="flex-1 min-w-0">
 <h3 className="text-base font-semibold text-gray-900 mb-1">{step.title}</h3>
 <p className="text-sm text-gray-800 leading-relaxed">{step.description}</p>
 {step.tip && (
 <div className="mt-3 flex items-start gap-2 p-3 rounded-lg bg-asia/10 border border-asia/20">
 <Lightbulb className="w-4 h-4 text-asia shrink-0 mt-0.5" />
 <p className="text-xs text-gray-800">
 <span className="font-semibold text-asia">Pro tip:</span> {step.tip}
 </p>
 </div>
 )}
 </div>
 </div>
 </div>
 ))}
 </div>
 </section>

 {/* Sample Prompts */}
 {playbook.sample_prompts && playbook.sample_prompts.length > 0 && (
 <section className="mb-8">
 <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
 <MessageSquare className="w-4 h-4 text-sky-400" />
 Sample Prompts & Results
 </h2>
 <div className="space-y-4">
 {playbook.sample_prompts.map((sp, i) => (
 <div key={i} className="rounded-xl border border-gray-200 bg-white p-5">
 <div className="mb-3">
 <span className="text-[10px] font-medium text-gray-400 uppercase tracking-wider mb-1 block">
 Prompt #{i + 1}
 </span>
 <div className="rounded-lg bg-gray-50 border border-gray-200 p-3 text-sm text-gray-800 font-mono">
 {sp.prompt}
 </div>
 </div>
 <div className="space-y-2">
 <div>
 <span className="text-[10px] font-medium text-emerald-400 block mb-0.5">What happened</span>
 <p className="text-xs text-gray-700">{sp.output_summary}</p>
 </div>
 <div>
 <span className="text-[10px] font-medium text-neon-light block mb-0.5">✅ Worked</span>
 <p className="text-xs text-gray-700">{sp.what_worked}</p>
 </div>
 {sp.what_didnt && (
 <div>
 <span className="text-[10px] font-medium text-amber-400 block mb-0.5">❌ Didn&apos;t work</span>
 <p className="text-xs text-gray-700">{sp.what_didnt}</p>
 </div>
 )}
 </div>
 </div>
 ))}
 </div>
 </section>
 )}

 {/* Pro Tips */}
 <section className="mb-8">
 <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
 <Sparkles className="w-4 h-4 text-asia" />
 Pro Tips
 </h2>
 <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
 {playbook.pro_tips.map((tip, i) => (
 <div
 key={i}
 className="flex items-start gap-3 p-4 rounded-xl border border-asia/20 bg-asia/5"
 >
 <Lightbulb className="w-5 h-5 text-asia shrink-0 mt-0.5" />
 <p className="text-sm text-gray-800">{tip}</p>
 </div>
 ))}
 </div>
 </section>

 {/* Discussion / Comments */}
 <section className="mb-8">
 <PlaybookComments playbookId={playbook.id} playbookTitle={playbook.title} />
 </section>

 {/* Common Mistakes */}
 {playbook.common_mistakes && playbook.common_mistakes.length > 0 && (
 <section className="mb-8">
 <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
 <AlertTriangle className="w-4 h-4 text-amber-400" />
 Common Mistakes to Avoid
 </h2>
 <div className="space-y-3">
 {playbook.common_mistakes.map((item, i) => (
 <div key={i} className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-4">
 <div className="flex items-start gap-3">
 <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
 <div>
 <p className="text-sm text-gray-800 mb-1">
 <span className="text-amber-400 font-medium">Mistake:</span> {item.mistake}
 </p>
 <p className="text-sm text-gray-700">
 <span className="text-emerald-400 font-medium">Fix:</span> {item.fix}
 </p>
 </div>
 </div>
 </div>
 ))}
 </div>
 </section>
 )}

 {/* Related Tools */}
 {relatedTools.length > 0 && (
 <section className="pt-6 border-t border-gray-200">
 <div className="flex items-center justify-between mb-6">
 <h2 className="text-lg font-bold text-gray-900">Tools Used in This Playbook</h2>
 <Link
 href="/tools"
 className="text-sm text-neon-light hover:text-neon transition flex items-center gap-1"
 >
 Browse all tools
 <ChevronRight className="w-4 h-4" />
 </Link>
 </div>
 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
 {relatedTools.map((tool) => (
 <ToolCard key={tool.id} tool={tool} />
 ))}
 </div>
 </section>
 )}
 </div>
 </>
 );
}
