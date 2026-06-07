'use client';

import { useState, FormEvent, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
 Sparkles,
 ArrowLeft,
 CheckCircle,
 AlertCircle,
 Send,
 Plus,
 X,
 Lightbulb,
 TrendingUp,
 DollarSign,
 MessageSquare,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { toolsData } from '@/lib/data';

// ─── Types ─────────────────────────────────────────────────────────────

interface StepField {
 title: string;
 description: string;
 tip: string;
}

interface PromptField {
 prompt: string;
 output_summary: string;
 what_worked: string;
 what_didnt: string;
}

interface ResultField {
 metric: string;
 value: string;
 description: string;
}

interface MistakeField {
 mistake: string;
 fix: string;
}

interface FormData {
 title: string;
 subtitle: string;
 description: string;
 authorName: string;
 authorHandle: string;
 difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
 icon: string;
 related_tool_slugs: string[];
 tags: string;
 pipeline_stage: string;
 revenue_impact: string;
 pro_tips: string[];
 steps: StepField[];
 sample_prompts: PromptField[];
 real_results: ResultField[];
 common_mistakes: MistakeField[];
}

const INITIAL_FORM: FormData = {
 title: '',
 subtitle: '',
 description: '',
 authorName: '',
 authorHandle: '',
 difficulty: 'Beginner',
 icon: '🚀',
 related_tool_slugs: [],
 tags: '',
 pipeline_stage: 'coding',
 revenue_impact: '',
 pro_tips: [''],
 steps: [{ title: '', description: '', tip: '' }],
 sample_prompts: [],
 real_results: [],
 common_mistakes: [],
};

const PIPELINE_STAGES = [
 { value: 'planning', label: 'Planning & Strategy' },
 { value: 'ideation', label: 'Ideation & Brainstorming' },
 { value: 'research', label: 'Research & Analysis' },
 { value: 'coding', label: 'Code & Development' },
 { value: 'review', label: 'Review & Testing' },
 { value: 'deployment', label: 'Deployment & DevOps' },
 { value: 'content', label: 'Content Creation' },
 { value: 'marketing', label: 'Marketing & Growth' },
];

const ICON_OPTIONS = ['🚀', '🏗️', '📝', '🎯', '💡', '⚡', '🤖', '🎨', '💻', '🔬', '✅', '⚙️'];

// ─── Component ────────────────────────────────────────────────────────

export default function SubmitPlaybookPage() {
 useEffect(() => {
 document.title = 'Submit an AI Playbook — Apifeny AI';
 }, []);
 const router = useRouter();
 const [form, setForm] = useState<FormData>(INITIAL_FORM);
 const [submitted, setSubmitted] = useState(false);
 const [error, setError] = useState('');

 const update = <K extends keyof FormData>(key: K, value: FormData[K]) =>
 setForm((prev) => ({ ...prev, [key]: value }));

 const toolOptions = toolsData
 .filter((t) => t.is_published)
 .map((t) => ({ slug: t.slug, name: t.name }))
 .sort((a, b) => a.name.localeCompare(b.name));

 const handleSubmit = (e: FormEvent) => {
 e.preventDefault();
 setError('');

 // Validate required fields
 if (!form.title.trim() || !form.description.trim() || !form.authorName.trim()) {
 setError('Title, description, and author name are required.');
 return;
 }
 if (form.steps.length === 0 || !form.steps[0].title.trim()) {
 setError('At least one step is required.');
 return;
 }
 if (form.related_tool_slugs.length === 0) {
 setError('Select at least one related tool.');
 return;
 }

 // Save to localStorage for now (simulates submission)
 const playbookData = {
 ...form,
 createdAt: new Date().toISOString().split('T')[0],
 is_verified: false,
 };

 try {
 const existing = JSON.parse(localStorage.getItem('apifeny_submitted_playbooks') || '[]');
 existing.push(playbookData);
 localStorage.setItem('apifeny_submitted_playbooks', JSON.stringify(existing));
 setSubmitted(true);
 } catch {
 setError('Failed to save. Please try again.');
 }
 };

 if (submitted) {
 return (
 <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 text-center">
 <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-4">
 <CheckCircle className="w-8 h-8 text-emerald-400" />
 </div>
 <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3">Playbook Submitted!</h1>
 <p className="text-sm text-gray-700 max-w-md mx-auto mb-6">
 Thank you for sharing your workflow! Our team will review it and publish it to the
 community within 48 hours.
 </p>
 <div className="flex flex-wrap items-center justify-center gap-3">
 <Link
 href="/community-playbook"
 className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-medium transition"
 >
 Browse community playbooks
 </Link>
 <button
 onClick={() => setSubmitted(false)}
 className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-white text-sm font-medium transition"
 >
 Submit another
 </button>
 </div>
 </div>
 );
 }

 return (
 <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
 {/* Back */}
 <Link
 href="/community-playbook"
 className="inline-flex items-center gap-1.5 text-sm text-gray-700 hover:text-white transition mb-6 group"
 >
 <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition" />
 Community Playbooks
 </Link>

 {/* Hero */}
 <div className="text-center mb-8 sm:mb-10">
 <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-asia/80 mb-4 shadow-lg shadow-emerald-500/20">
 <Sparkles className="w-7 h-7 text-white" />
 </div>
 <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">
 Submit a Playbook
 </h1>
 <p className="text-sm sm:text-base text-gray-700 max-w-lg mx-auto">
 Share your real AI workflow — what you built, how you did it, what worked, and
 what didn&apos;t. Include revenue or impact numbers to help others.
 </p>
 </div>

 {error && (
 <div className="mb-6 rounded-xl border border-rose-500/30 bg-rose-500/10 p-4 flex items-center gap-3">
 <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />
 <p className="text-sm text-rose-200">{error}</p>
 </div>
 )}

 <form onSubmit={handleSubmit} className="space-y-8">
 {/* Basic Info */}
 <section className="rounded-xl border border-gray-200 bg-gray-50/50 p-6">
 <h2 className="text-base font-semibold text-white mb-4">Basic Info</h2>
 <div className="space-y-4">
 <div>
 <label className="block text-xs font-medium text-gray-700 mb-1.5">
 Title <span className="text-rose-400">*</span>
 </label>
 <input
 type="text"
 value={form.title}
 onChange={(e) => update('title', e.target.value)}
 placeholder="e.g., Building a SaaS MVP with Cursor + Claude"
 className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-emerald-500/50 transition"
 />
 </div>
 <div>
 <label className="block text-xs font-medium text-gray-700 mb-1.5">Subtitle</label>
 <input
 type="text"
 value={form.subtitle}
 onChange={(e) => update('subtitle', e.target.value)}
 placeholder="e.g., From idea to paid users in 72 hours"
 className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-emerald-500/50 transition"
 />
 </div>
 <div>
 <label className="block text-xs font-medium text-gray-700 mb-1.5">
 Description <span className="text-rose-400">*</span>
 </label>
 <textarea
 value={form.description}
 onChange={(e) => update('description', e.target.value)}
 placeholder="Describe what this playbook covers and who it's for..."
 rows={3}
 className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-emerald-500/50 transition resize-none"
 />
 </div>
 </div>
 </section>

 {/* Author Info */}
 <section className="rounded-xl border border-gray-200 bg-gray-50/50 p-6">
 <h2 className="text-base font-semibold text-white mb-4">About You</h2>
 <div className="space-y-4">
 <div>
 <label className="block text-xs font-medium text-gray-700 mb-1.5">
 Your Name <span className="text-rose-400">*</span>
 </label>
 <input
 type="text"
 value={form.authorName}
 onChange={(e) => update('authorName', e.target.value)}
 placeholder="e.g., Alex Chen"
 className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-emerald-500/50 transition"
 />
 </div>
 <div>
 <label className="block text-xs font-medium text-gray-700 mb-1.5">
 X/Twitter Handle (optional)
 </label>
 <input
 type="text"
 value={form.authorHandle}
 onChange={(e) => update('authorHandle', e.target.value)}
 placeholder="@yourhandle"
 className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-emerald-500/50 transition"
 />
 </div>
 </div>
 </section>

 {/* Classification */}
 <section className="rounded-xl border border-gray-200 bg-gray-50/50 p-6">
 <h2 className="text-base font-semibold text-white mb-4">Classification</h2>
 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
 <div>
 <label className="block text-xs font-medium text-gray-700 mb-1.5">Difficulty</label>
 <select
 value={form.difficulty}
 onChange={(e) => update('difficulty', e.target.value as FormData['difficulty'])}
 className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500/50 transition"
 >
 <option value="Beginner">Beginner</option>
 <option value="Intermediate">Intermediate</option>
 <option value="Advanced">Advanced</option>
 </select>
 </div>
 <div>
 <label className="block text-xs font-medium text-gray-700 mb-1.5">Pipeline Stage</label>
 <select
 value={form.pipeline_stage}
 onChange={(e) => update('pipeline_stage', e.target.value)}
 className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500/50 transition"
 >
 {PIPELINE_STAGES.map((stage) => (
 <option key={stage.value} value={stage.value}>
 {stage.label}
 </option>
 ))}
 </select>
 </div>
 <div>
 <label className="block text-xs font-medium text-gray-700 mb-1.5">Icon</label>
 <div className="flex flex-wrap gap-2">
 {ICON_OPTIONS.map((icon) => (
 <button
 key={icon}
 type="button"
 onClick={() => update('icon', icon)}
 className={cn(
 'w-10 h-10 rounded-lg border text-lg flex items-center justify-center transition',
 form.icon === icon
 ? 'bg-emerald-500/20 border-emerald-500/40'
 : 'bg-gray-50 border-gray-200 hover:border-gray-200/50'
 )}
 >
 {icon}
 </button>
 ))}
 </div>
 </div>
 <div>
 <label className="block text-xs font-medium text-gray-700 mb-1.5">
 Revenue Impact (optional)
 </label>
 <input
 type="text"
 value={form.revenue_impact}
 onChange={(e) => update('revenue_impact', e.target.value)}
 placeholder="e.g., $420 MRR in first month"
 className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-emerald-500/50 transition"
 />
 </div>
 </div>
 </section>

 {/* Tools Used */}
 <section className="rounded-xl border border-gray-200 bg-gray-50/50 p-6">
 <h2 className="text-base font-semibold text-white mb-4">
 Tools Used <span className="text-rose-400">*</span>
 </h2>
 <p className="text-xs text-gray-600 mb-3">Select the tools this playbook covers.</p>
 <div className="flex flex-wrap gap-2 max-h-40 overflow-y-auto p-1">
 {toolOptions.map((tool) => {
 const selected = form.related_tool_slugs.includes(tool.slug);
 return (
 <button
 key={tool.slug}
 type="button"
 onClick={() =>
 update(
 'related_tool_slugs',
 selected
 ? form.related_tool_slugs.filter((s) => s !== tool.slug)
 : [...form.related_tool_slugs, tool.slug]
 )
 }
 className={cn(
 'px-2.5 py-1 rounded-lg text-xs font-medium border transition',
 selected
 ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
 : 'bg-gray-50 text-gray-700 border-gray-200 hover:border-gray-200/50'
 )}
 >
 {tool.name}
 </button>
 );
 })}
 </div>
 {form.related_tool_slugs.length > 0 && (
 <div className="flex flex-wrap gap-1.5 mt-3">
 {form.related_tool_slugs.map((slug) => {
 const tool = toolOptions.find((t) => t.slug === slug);
 return (
 <span
 key={slug}
 className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
 >
 {tool?.name || slug}
 <button
 type="button"
 onClick={() =>
 update(
 'related_tool_slugs',
 form.related_tool_slugs.filter((s) => s !== slug)
 )
 }
 className="hover:text-white transition"
 >
 <X className="w-2.5 h-2.5" />
 </button>
 </span>
 );
 })}
 </div>
 )}
 </section>

 {/* Steps */}
 <section className="rounded-xl border border-gray-200 bg-gray-50/50 p-6">
 <div className="flex items-center justify-between mb-4">
 <h2 className="text-base font-semibold text-white">
 Steps <span className="text-rose-400">*</span>
 </h2>
 <button
 type="button"
 onClick={() =>
 update('steps', [...form.steps, { title: '', description: '', tip: '' }])
 }
 className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-xs text-white transition"
 >
 <Plus className="w-3 h-3" />
 Add step
 </button>
 </div>
 <div className="space-y-4">
 {form.steps.map((step, i) => (
 <div key={i} className="p-4 rounded-lg bg-gray-50 border border-gray-200">
 <div className="flex items-center gap-2 mb-3">
 <span className="w-6 h-6 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center text-white font-bold text-[10px]">
 {i + 1}
 </span>
 <span className="text-xs text-gray-600">Step {i + 1}</span>
 {form.steps.length > 1 && (
 <button
 type="button"
 onClick={() => update('steps', form.steps.filter((_, j) => j !== i))}
 className="ml-auto text-gray-600 hover:text-rose-400 transition"
 >
 <X className="w-3.5 h-3.5" />
 </button>
 )}
 </div>
 <div className="space-y-3">
 <input
 type="text"
 value={step.title}
 onChange={(e) => {
 const newSteps = [...form.steps];
 newSteps[i] = { ...newSteps[i], title: e.target.value };
 update('steps', newSteps);
 }}
 placeholder="Step title"
 className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-emerald-500/50 transition"
 />
 <textarea
 value={step.description}
 onChange={(e) => {
 const newSteps = [...form.steps];
 newSteps[i] = { ...newSteps[i], description: e.target.value };
 update('steps', newSteps);
 }}
 placeholder="Describe what to do in this step..."
 rows={2}
 className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-emerald-500/50 transition resize-none"
 />
 <input
 type="text"
 value={step.tip}
 onChange={(e) => {
 const newSteps = [...form.steps];
 newSteps[i] = { ...newSteps[i], tip: e.target.value };
 update('steps', newSteps);
 }}
 placeholder="Pro tip (optional)"
 className="w-full bg-white border border-asia/30 rounded-lg px-3 py-2 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-asia/50 transition"
 />
 </div>
 </div>
 ))}
 </div>
 </section>

 {/* Pro Tips */}
 <section className="rounded-xl border border-gray-200 bg-gray-50/50 p-6">
 <div className="flex items-center justify-between mb-4">
 <h2 className="text-base font-semibold text-white flex items-center gap-2">
 <Lightbulb className="w-4 h-4 text-asia" />
 Pro Tips
 </h2>
 <button
 type="button"
 onClick={() => update('pro_tips', [...form.pro_tips, ''])}
 className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-xs text-white transition"
 >
 <Plus className="w-3 h-3" />
 Add tip
 </button>
 </div>
 <div className="space-y-3">
 {form.pro_tips.map((tip, i) => (
 <div key={i} className="flex items-center gap-2">
 <input
 type="text"
 value={tip}
 onChange={(e) => {
 const newTips = [...form.pro_tips];
 newTips[i] = e.target.value;
 update('pro_tips', newTips);
 }}
 placeholder="Enter a pro tip..."
 className="flex-1 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-emerald-500/50 transition"
 />
 {form.pro_tips.length > 1 && (
 <button
 type="button"
 onClick={() => update('pro_tips', form.pro_tips.filter((_, j) => j !== i))}
 className="text-gray-600 hover:text-rose-400 transition"
 >
 <X className="w-3.5 h-3.5" />
 </button>
 )}
 </div>
 ))}
 </div>
 </section>

 {/* Revenue Impact (optional section) */}
 <section className="rounded-xl border border-dashed border-emerald-500/20 bg-gray-50/30 p-6">
 <h2 className="text-base font-semibold text-white mb-3 flex items-center gap-2">
 <TrendingUp className="w-4 h-4 text-emerald-400" />
 Real Results (optional but encouraged)
 </h2>
 <p className="text-xs text-gray-600 mb-4">
 Add measurable outcomes. This helps the community see the real impact of your workflow.
 </p>
 <div className="space-y-3">
 {form.real_results.map((result, i) => (
 <div key={i} className="flex flex-col sm:flex-row gap-2 p-3 rounded-lg bg-gray-50 border border-gray-200">
 <input
 type="text"
 value={result.metric}
 onChange={(e) => {
 const newResults = [...form.real_results];
 newResults[i] = { ...newResults[i], metric: e.target.value };
 update('real_results', newResults);
 }}
 placeholder="Metric (e.g., Time to MVP)"
 className="flex-1 bg-white border border-gray-200 rounded-lg px-3 py-2 text-xs text-white placeholder:text-gray-600 focus:outline-none focus:border-emerald-500/50 transition"
 />
 <input
 type="text"
 value={result.value}
 onChange={(e) => {
 const newResults = [...form.real_results];
 newResults[i] = { ...newResults[i], value: e.target.value };
 update('real_results', newResults);
 }}
 placeholder="Value (e.g., 72 hours)"
 className="w-full sm:w-28 bg-white border border-gray-200 rounded-lg px-3 py-2 text-xs text-white placeholder:text-gray-600 focus:outline-none focus:border-emerald-500/50 transition"
 />
 {form.real_results.length > 0 && (
 <button
 type="button"
 onClick={() =>
 update('real_results', form.real_results.filter((_, j) => j !== i))
 }
 className="text-gray-600 hover:text-rose-400 transition"
 >
 <X className="w-3.5 h-3.5" />
 </button>
 )}
 </div>
 ))}
 <button
 type="button"
 onClick={() =>
 update('real_results', [
 ...form.real_results,
 { metric: '', value: '', description: '' },
 ])
 }
 className="text-xs text-emerald-400 hover:text-emerald-300 transition flex items-center gap-1"
 >
 <Plus className="w-3 h-3" />
 Add result
 </button>
 </div>

 {/* Sample prompts */}
 <div className="mt-6 pt-4 border-t border-gray-200">
 <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
 <MessageSquare className="w-4 h-4 text-sky-400" />
 Sample Prompts (optional)
 </h3>
 {form.sample_prompts.map((sp, i) => (
 <div key={i} className="p-3 rounded-lg bg-gray-50 border border-gray-200 mb-3">
 <div className="flex items-center justify-between mb-2">
 <span className="text-[10px] text-gray-400">Prompt #{i + 1}</span>
 <button
 type="button"
 onClick={() =>
 update('sample_prompts', form.sample_prompts.filter((_, j) => j !== i))
 }
 className="text-gray-600 hover:text-rose-400 transition"
 >
 <X className="w-3 h-3" />
 </button>
 </div>
 <div className="space-y-2">
 <textarea
 value={sp.prompt}
 onChange={(e) => {
 const newPrompts = [...form.sample_prompts];
 newPrompts[i] = { ...newPrompts[i], prompt: e.target.value };
 update('sample_prompts', newPrompts);
 }}
 placeholder="Paste the exact prompt you used..."
 rows={2}
 className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-xs text-white placeholder:text-gray-600 focus:outline-none focus:border-emerald-500/50 transition resize-none font-mono"
 />
 <input
 type="text"
 value={sp.output_summary}
 onChange={(e) => {
 const newPrompts = [...form.sample_prompts];
 newPrompts[i] = { ...newPrompts[i], output_summary: e.target.value };
 update('sample_prompts', newPrompts);
 }}
 placeholder="What happened (output summary)"
 className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-xs text-white placeholder:text-gray-600 focus:outline-none focus:border-emerald-500/50 transition"
 />
 <input
 type="text"
 value={sp.what_worked}
 onChange={(e) => {
 const newPrompts = [...form.sample_prompts];
 newPrompts[i] = { ...newPrompts[i], what_worked: e.target.value };
 update('sample_prompts', newPrompts);
 }}
 placeholder="What worked"
 className="w-full bg-white border border-emerald-500/20 rounded-lg px-3 py-2 text-xs text-white placeholder:text-gray-600 focus:outline-none focus:border-emerald-500/50 transition"
 />
 <input
 type="text"
 value={sp.what_didnt}
 onChange={(e) => {
 const newPrompts = [...form.sample_prompts];
 newPrompts[i] = { ...newPrompts[i], what_didnt: e.target.value };
 update('sample_prompts', newPrompts);
 }}
 placeholder="What didn't work (optional)"
 className="w-full bg-white border border-amber-500/20 rounded-lg px-3 py-2 text-xs text-white placeholder:text-gray-600 focus:outline-none focus:border-amber-500/50 transition"
 />
 </div>
 </div>
 ))}
 <button
 type="button"
 onClick={() =>
 update('sample_prompts', [
 ...form.sample_prompts,
 { prompt: '', output_summary: '', what_worked: '', what_didnt: '' },
 ])
 }
 className="text-xs text-sky-400 hover:text-sky-300 transition flex items-center gap-1"
 >
 <Plus className="w-3 h-3" />
 Add sample prompt
 </button>
 </div>
 </section>

 {/* Tags */}
 <section className="rounded-xl border border-gray-200 bg-gray-50/50 p-6">
 <h2 className="text-base font-semibold text-white mb-4">Tags</h2>
 <input
 type="text"
 value={form.tags}
 onChange={(e) => update('tags', e.target.value)}
 placeholder="e.g., saas, mvp, cursor, solopreneur (comma separated)"
 className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-emerald-500/50 transition"
 />
 </section>

 {/* Submit */}
 <div className="flex flex-col sm:flex-row items-center gap-3 justify-end pt-4 border-t border-gray-200">
 <Link
 href="/community-playbook"
 className="px-5 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-700 hover:text-white transition"
 >
 Cancel
 </Link>
 <button
 type="submit"
 className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-white text-sm font-medium transition shadow-lg shadow-emerald-500/20"
 >
 <Send className="w-4 h-4" />
 Submit Playbook
 </button>
 </div>
 </form>
 </div>
 );
}
