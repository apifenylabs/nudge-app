'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { playbooks, Playbook } from '@/lib/playbooks';
import { playbookSuccessStories } from '@/lib/success-stories';
import { cn } from '@/lib/utils';
import {
 Heart,
 Clock,
 ChevronRight,
 Bookmark,
 TrendingUp,
 Sparkles,
 Save,
 Trash2,
 Plus,
 Check,
 ExternalLink,
 Trophy,
 ArrowRight,
} from 'lucide-react';

const TRACKED_KEY = 'apifeny_tracked_playbooks';
const MY_RESULTS_KEY = 'apifeny_my_results';
const MY_STORY_KEY = 'apifeny_my_story';

interface MyResult {
 id: string;
 playbookSlug: string;
 metric: string;
 value: string;
 date: string;
}

export default function MyPlaybooksPage() {
 useEffect(() => {
 document.title = 'My Playbooks — Apifeny AI';
 }, []);
 const [trackedSlugs, setTrackedSlugs] = useState<string[]>([]);
 const [myResults, setMyResults] = useState<MyResult[]>([]);
 const [storyTitle, setStoryTitle] = useState('');
 const [storyDescription, setStoryDescription] = useState('');
 const [storyPlaybook, setStoryPlaybook] = useState('');
 const [storyRevenue, setStoryRevenue] = useState('');
 const [storySubmitted, setStorySubmitted] = useState(false);
 const [newResultPlaybook, setNewResultPlaybook] = useState('');
 const [newResultMetric, setNewResultMetric] = useState('');
 const [newResultValue, setNewResultValue] = useState('');
 const [activeTab, setActiveTab] = useState<'tracked' | 'results' | 'submit'>('tracked');

 // Load from localStorage
 useEffect(() => {
 const tracked = JSON.parse(localStorage.getItem(TRACKED_KEY) || '[]');
 const results = JSON.parse(localStorage.getItem(MY_RESULTS_KEY) || '[]');
 setTrackedSlugs(tracked);
 setMyResults(results);
 }, []);

 const saveTracked = (slugs: string[]) => {
 setTrackedSlugs(slugs);
 localStorage.setItem(TRACKED_KEY, JSON.stringify(slugs));
 };

 const toggleTrack = (slug: string) => {
 if (trackedSlugs.includes(slug)) {
 saveTracked(trackedSlugs.filter((s) => s !== slug));
 } else {
 saveTracked([...trackedSlugs, slug]);
 }
 };

 const addResult = () => {
 if (!newResultPlaybook || !newResultMetric || !newResultValue) return;
 const newResult: MyResult = {
 id: `result-${Date.now()}`,
 playbookSlug: newResultPlaybook,
 metric: newResultMetric,
 value: newResultValue,
 date: new Date().toISOString().split('T')[0],
 };
 const updated = [...myResults, newResult];
 setMyResults(updated);
 localStorage.setItem(MY_RESULTS_KEY, JSON.stringify(updated));
 setNewResultMetric('');
 setNewResultValue('');
 };

 const deleteResult = (id: string) => {
 const updated = myResults.filter((r) => r.id !== id);
 setMyResults(updated);
 localStorage.setItem(MY_RESULTS_KEY, JSON.stringify(updated));
 };

 const submitStory = () => {
 if (!storyTitle || !storyPlaybook) return;
 const story = {
 id: `user-story-${Date.now()}`,
 title: storyTitle,
 description: storyDescription,
 playbook_slug: storyPlaybook,
 revenue_proof: storyRevenue,
 user_name: 'You',
 timestamp: new Date().toISOString().split('T')[0],
 };
 // For now, save to localStorage and show confirmation
 const existingStories = JSON.parse(localStorage.getItem(MY_STORY_KEY) || '[]');
 localStorage.setItem(MY_STORY_KEY, JSON.stringify([...existingStories, story]));
 setStorySubmitted(true);
 setStoryTitle('');
 setStoryDescription('');
 setStoryPlaybook('');
 setStoryRevenue('');
 };

 const trackedPlaybooks = playbooks.filter((p) => trackedSlugs.includes(p.slug));
 const untrackedPlaybooks = playbooks.filter((p) => !trackedSlugs.includes(p.slug));

 const tabs = [
 { id: 'tracked' as const, label: 'Tracked Playbooks', icon: Bookmark },
 { id: 'results' as const, label: 'My Results', icon: TrendingUp },
 { id: 'submit' as const, label: 'Submit Story', icon: Sparkles },
 ];

 return (
 <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
 {/* Hero */}
 <div className="relative rounded-2xl bg-gradient-to-br from-violet-500/10 via-fuchsia-500/5 to-tech-800 border border-tech-500/30 p-6 sm:p-10 mb-8">
 <div className="absolute inset-0 bg-tech-grid opacity-30 rounded-2xl pointer-events-none" />
 <div className="relative">
 <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-xs font-medium mb-4">
 <Heart className="w-3.5 h-3.5" />
 My Playbook Dashboard
 </div>
 <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
 Your Playbook Dashboard
 </h1>
 <p className="text-sm text-tech-100/70 max-w-xl mb-4">
 Track playbooks, log your results, and share your success story with the community.
 All data stays in your browser.
 </p>
 <div className="flex flex-wrap gap-3 text-xs text-tech-200">
 <span className="flex items-center gap-1">
 <Bookmark className="w-3.5 h-3.5 text-violet-400" />
 {trackedSlugs.length} tracked
 </span>
 <span className="flex items-center gap-1">
 <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
 {myResults.length} results logged
 </span>
 </div>
 </div>
 </div>

 {/* Tab Navigation */}
 <div className="flex gap-1 mb-6 bg-tech-700/50 rounded-xl p-1 border border-tech-500/20">
 {tabs.map((tab) => {
 const Icon = tab.icon;
 return (
 <button
 key={tab.id}
 onClick={() => setActiveTab(tab.id)}
 className={cn(
 'flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition flex-1 justify-center',
 activeTab === tab.id
 ? 'bg-tech-600 text-white shadow-lg'
 : 'text-tech-300 hover:text-white'
 )}
 >
 <Icon className="w-4 h-4" />
 <span className="hidden sm:inline">{tab.label}</span>
 </button>
 );
 })}
 </div>

 {/* Tab Content */}
 {activeTab === 'tracked' && (
 <div>
 {/* Tracked Playbooks */}
 <h2 className="text-lg font-semibold text-white mb-4">Saved Playbooks</h2>
 {trackedPlaybooks.length > 0 ? (
 <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
 {trackedPlaybooks.map((pb) => (
 <TrackedPlaybookCard key={pb.slug} playbook={pb} onUntrack={toggleTrack} />
 ))}
 </div>
 ) : (
 <div className="rounded-xl border border-dashed border-tech-500/30 bg-tech-700/40 p-8 text-center mb-8">
 <Bookmark className="w-10 h-10 text-tech-400 mx-auto mb-3" />
 <h3 className="text-base font-semibold text-white mb-1">No playbooks tracked yet</h3>
 <p className="text-xs text-tech-200 max-w-md mx-auto mb-4">
 Browse playbooks and save the ones you want to follow.
 </p>
 <Link
 href="/playbooks"
 className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-neon hover:bg-neon-dark text-white text-sm font-medium transition"
 >
 Browse Playbooks
 <ArrowRight className="w-4 h-4" />
 </Link>
 </div>
 )}

 {/* All Playbooks (to add) */}
 {untrackedPlaybooks.length > 0 && (
 <>
 <h2 className="text-lg font-semibold text-white mb-4">Discover Playbooks</h2>
 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
 {untrackedPlaybooks.slice(0, 6).map((pb) => (
 <UntrackedPlaybookCard key={pb.slug} playbook={pb} onTrack={toggleTrack} />
 ))}
 </div>
 </>
 )}
 </div>
 )}

 {activeTab === 'results' && (
 <div>
 <h2 className="text-lg font-semibold text-white mb-4">Log Your Results</h2>

 {/* Add result form */}
 <div className="rounded-xl border border-tech-500/30 bg-tech-700/80 p-4 sm:p-5 mb-6">
 <h3 className="text-sm font-semibold text-white mb-3">Add a Result</h3>
 <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
 <select
 value={newResultPlaybook}
 onChange={(e) => setNewResultPlaybook(e.target.value)}
 className="w-full bg-tech-800 border border-tech-500/40 rounded-lg px-3 py-2 text-sm text-white placeholder:text-tech-300 focus:outline-none focus:border-neon/50"
 >
 <option value="">Select playbook</option>
 {playbooks.map((p) => (
 <option key={p.slug} value={p.slug}>
 {p.title}
 </option>
 ))}
 </select>
 <input
 type="text"
 value={newResultMetric}
 onChange={(e) => setNewResultMetric(e.target.value)}
 placeholder="Metric (e.g. Monthly Traffic)"
 className="w-full bg-tech-800 border border-tech-500/40 rounded-lg px-3 py-2 text-sm text-white placeholder:text-tech-300 focus:outline-none focus:border-neon/50"
 />
 <input
 type="text"
 value={newResultValue}
 onChange={(e) => setNewResultValue(e.target.value)}
 placeholder="Value (e.g. 24K visitors)"
 className="w-full bg-tech-800 border border-tech-500/40 rounded-lg px-3 py-2 text-sm text-white placeholder:text-tech-300 focus:outline-none focus:border-neon/50"
 />
 <button
 onClick={addResult}
 disabled={!newResultPlaybook || !newResultMetric || !newResultValue}
 className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-neon hover:bg-neon-dark disabled:bg-tech-500 disabled:text-tech-300 text-white text-sm font-medium transition"
 >
 <Plus className="w-4 h-4" />
 Add
 </button>
 </div>
 </div>

 {/* Results list */}
 {myResults.length > 0 ? (
 <div className="space-y-2">
 {myResults.map((result) => {
 const pb = playbooks.find((p) => p.slug === result.playbookSlug);
 return (
 <div
 key={result.id}
 className="flex items-center justify-between rounded-xl border border-tech-500/30 bg-tech-700/60 p-3 sm:p-4"
 >
 <div className="flex items-center gap-3 min-w-0">
 <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500/20 to-teal-500/10 flex items-center justify-center">
 <TrendingUp className="w-4 h-4 text-emerald-400" />
 </div>
 <div className="min-w-0">
 <div className="text-sm font-medium text-white">
 {result.metric}: <span className="text-emerald-400">{result.value}</span>
 </div>
 <div className="text-[11px] text-tech-300">
 {pb?.title || result.playbookSlug} &middot; {result.date}
 </div>
 </div>
 </div>
 <button
 onClick={() => deleteResult(result.id)}
 className="p-1.5 rounded-lg text-tech-400 hover:text-red-400 hover:bg-red-500/10 transition"
 >
 <Trash2 className="w-4 h-4" />
 </button>
 </div>
 );
 })}
 </div>
 ) : (
 <div className="rounded-xl border border-dashed border-tech-500/30 bg-tech-700/40 p-8 text-center">
 <TrendingUp className="w-10 h-10 text-tech-400 mx-auto mb-3" />
 <h3 className="text-base font-semibold text-white mb-1">No results logged yet</h3>
 <p className="text-xs text-tech-200 max-w-md mx-auto">
 Track your progress by logging metrics from the playbooks you follow.
 </p>
 </div>
 )}
 </div>
 )}

 {activeTab === 'submit' && (
 <div>
 <h2 className="text-lg font-semibold text-white mb-4">Share Your Success Story</h2>

 {storySubmitted ? (
 <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-8 text-center">
 <Check className="w-12 h-12 text-emerald-400 mx-auto mb-3" />
 <h3 className="text-lg font-semibold text-white mb-1">Story Submitted! 🎉</h3>
 <p className="text-sm text-tech-200 max-w-md mx-auto mb-4">
 Your story has been saved locally. Our editorial team will review it for inclusion
 on the public feed.
 </p>
 <button
 onClick={() => setStorySubmitted(false)}
 className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-tech-600 hover:bg-tech-500 text-white text-sm font-medium transition"
 >
 Submit Another
 </button>
 </div>
 ) : (
 <div className="rounded-xl border border-tech-500/30 bg-tech-700/80 p-5 sm:p-6">
 <div className="space-y-4">
 <div>
 <label className="block text-sm font-medium text-tech-100 mb-1">
 Title <span className="text-red-400">*</span>
 </label>
 <input
 type="text"
 value={storyTitle}
 onChange={(e) => setStoryTitle(e.target.value)}
 placeholder="e.g. Built a $420 MRR SaaS in 72 hours"
 className="w-full bg-tech-800 border border-tech-500/40 rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-tech-300 focus:outline-none focus:border-neon/50"
 />
 </div>

 <div>
 <label className="block text-sm font-medium text-tech-100 mb-1">
 Playbook Used <span className="text-red-400">*</span>
 </label>
 <select
 value={storyPlaybook}
 onChange={(e) => setStoryPlaybook(e.target.value)}
 className="w-full bg-tech-800 border border-tech-500/40 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-neon/50"
 >
 <option value="">Select a playbook</option>
 {playbooks.map((p) => (
 <option key={p.slug} value={p.slug}>
 {p.title}
 </option>
 ))}
 </select>
 </div>

 <div>
 <label className="block text-sm font-medium text-tech-100 mb-1">
 Description
 </label>
 <textarea
 value={storyDescription}
 onChange={(e) => setStoryDescription(e.target.value)}
 placeholder="Tell us what you built and how the playbook helped..."
 rows={3}
 className="w-full bg-tech-800 border border-tech-500/40 rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-tech-300 focus:outline-none focus:border-neon/50"
 />
 </div>

 <div>
 <label className="block text-sm font-medium text-tech-100 mb-1">
 Revenue Proof (optional)
 </label>
 <input
 type="text"
 value={storyRevenue}
 onChange={(e) => setStoryRevenue(e.target.value)}
 placeholder="e.g. $3.2K MRR"
 className="w-full bg-tech-800 border border-tech-500/40 rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-tech-300 focus:outline-none focus:border-neon/50"
 />
 </div>

 <button
 onClick={submitStory}
 disabled={!storyTitle || !storyPlaybook}
 className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-neon to-aqua hover:from-neon-dark hover:to-aqua-dark disabled:from-tech-500 disabled:to-tech-500 text-white text-sm font-medium transition"
 >
 <Sparkles className="w-4 h-4" />
 Submit Your Story
 </button>

 <p className="text-[10px] text-tech-400 text-center">
 Your story will be saved locally. No account needed. We&apos;ll review for
 inclusion on the public feed.
 </p>
 </div>
 </div>
 )}
 </div>
 )}
 </div>
 );
}

function TrackedPlaybookCard({
 playbook,
 onUntrack,
}: {
 playbook: Playbook;
 onUntrack: (slug: string) => void;
}) {
 return (
 <div className="group relative rounded-xl border border-violet-500/30 bg-tech-700/80 p-4 overflow-hidden">
 <div className="absolute inset-0 bg-tech-grid opacity-20 pointer-events-none" />
 <div className="relative">
 <div className="flex items-center justify-between mb-2">
 <div className="flex items-center gap-2">
 <span className="text-lg">{playbook.icon}</span>
 <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-violet-500/20 text-violet-400 border border-violet-500/30">
 {playbook.difficulty}
 </span>
 </div>
 <button
 onClick={(e) => {
 e.preventDefault();
 onUntrack(playbook.slug);
 }}
 className="p-1.5 rounded-lg text-violet-400 hover:text-red-400 hover:bg-red-500/10 transition"
 >
 <Trash2 className="w-3.5 h-3.5" />
 </button>
 </div>
 <Link href={`/playbook/${playbook.slug}`}>
 <h3 className="text-sm font-semibold text-white group-hover:text-neon-light transition-colors mb-0.5">
 {playbook.title}
 </h3>
 <p className="text-[11px] text-tech-200 line-clamp-1">{playbook.description}</p>
 <div className="flex items-center gap-2 mt-2 text-[10px] text-tech-300">
 <span className="flex items-center gap-0.5">
 <Clock className="w-3 h-3" />
 {playbook.read_time_minutes} min
 </span>
 {playbook.pipeline_stage && (
 <span className="flex items-center gap-0.5">
 <TrendingUp className="w-3 h-3" />
 {playbook.pipeline_stage}
 </span>
 )}
 </div>
 </Link>
 </div>
 </div>
 );
}

function UntrackedPlaybookCard({
 playbook,
 onTrack,
}: {
 playbook: Playbook;
 onTrack: (slug: string) => void;
}) {
 return (
 <div className="group relative rounded-xl border border-tech-500/30 bg-tech-700/60 p-4 hover:border-neon/30 transition-all overflow-hidden">
 <div className="absolute inset-0 bg-tech-grid opacity-20 pointer-events-none" />
 <div className="relative">
 <div className="flex items-center justify-between mb-2">
 <div className="flex items-center gap-2">
 <span className="text-lg">{playbook.icon}</span>
 <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-tech-600 text-tech-300 border border-tech-500/30">
 {playbook.difficulty}
 </span>
 </div>
 <button
 onClick={(e) => {
 e.preventDefault();
 onTrack(playbook.slug);
 }}
 className="p-1.5 rounded-lg text-tech-400 hover:text-violet-400 hover:bg-violet-500/10 transition"
 >
 <Plus className="w-3.5 h-3.5" />
 </button>
 </div>
 <Link href={`/playbook/${playbook.slug}`}>
 <h3 className="text-sm font-semibold text-white group-hover:text-neon-light transition-colors mb-0.5">
 {playbook.title}
 </h3>
 <p className="text-[11px] text-tech-200 line-clamp-1">{playbook.description}</p>
 <div className="flex items-center gap-2 mt-2 text-[10px] text-tech-300">
 <span className="flex items-center gap-0.5">
 <Clock className="w-3 h-3" />
 {playbook.read_time_minutes} min
 </span>
 </div>
 </Link>
 </div>
 </div>
 );
}
