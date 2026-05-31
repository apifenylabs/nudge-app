import Link from 'next/link';
import { Metadata } from 'next';
import { Clock, BookOpen, Sparkles, Lightbulb, Search, ArrowRight, ChevronRight } from 'lucide-react';
import BreadcrumbSchema from '@/components/BreadcrumbSchema';
import { playbooks } from '@/lib/playbooks';
import { cn } from '@/lib/utils';
import PipelineFlowVisual from '@/components/PipelineFlowVisual';
import PlaybookDecisionHelper from '@/components/PlaybookDecisionHelper';

export const metadata: Metadata = {
 title: 'AI Playbooks — Step-by-Step Guides | Apifeny AI',
 description: 'Practical, step-by-step AI playbooks. From content creation to app building. Real workflows, real results. Learn how to use AI tools for your projects.',
 openGraph: {
 title: 'AI Playbooks — Practical How-To Guides | Apifeny AI',
 description: 'Step-by-step playbooks for AI workflows. Learn how to use ChatGPT, Cursor, Gemini, and more for real projects.',
 },
};

const PAID_PLAYBOOKS = ['ai-solopreneur-toolkit', 'directory-builder-template', 'ai-workflow-automation'];

const difficultyMeta = {
 Beginner: { label: 'Beginner', color: 'bg-emerald-100 text-emerald-700 border-emerald-200' },
 Intermediate: { label: 'Intermediate', color: 'bg-amber-100 text-amber-700 border-amber-200' },
 Advanced: { label: 'Advanced', color: 'bg-violet-100 text-violet-700 border-violet-200' },
};

const PIPELINE_STAGES = [
 { key: 'planning', label: 'Strategize', emoji: '\ud83e\udde0', color: 'bg-violet-100 text-violet-700 border-violet-200' },
 { key: 'ideation', label: 'Ideate', emoji: '\ud83d\udca1', color: 'bg-pink-100 text-pink-700 border-pink-200' },
 { key: 'research', label: 'Research', emoji: '\ud83d\udd0d', color: 'bg-sky-100 text-sky-700 border-sky-200' },
 { key: 'build', label: 'Build', emoji: '\u26a1', color: 'bg-blue-100 text-blue-700 border-blue-200' },
 { key: 'coding', label: 'Code', emoji: '\ud83d\udcbb', color: 'bg-blue-100 text-blue-700 border-blue-200' },
 { key: 'review', label: 'Review & QA', emoji: '\ud83d\udd04', color: 'bg-amber-100 text-amber-700 border-amber-200' },
 { key: 'testing', label: 'Test', emoji: '\ud83e\uddea', color: 'bg-orange-100 text-orange-700 border-orange-200' },
 { key: 'deployment', label: 'Launch', emoji: '\ud83d\ude80', color: 'bg-emerald-100 text-emerald-700 border-emerald-200' },
 { key: 'content', label: 'Content', emoji: '\u270d\ufe0f', color: 'bg-rose-100 text-rose-700 border-rose-200' },
 { key: 'marketing', label: 'Marketing', emoji: '\ud83d\udce3', color: 'bg-fuchsia-100 text-fuchsia-700 border-fuchsia-200' },
];

const STAGE_ORDER = ['planning', 'ideation', 'research', 'build', 'coding', 'review', 'testing', 'deployment', 'content', 'marketing'];

export default function PlaybooksPage() {
 const stageGroups = STAGE_ORDER
 .map(key => ({
 stage: PIPELINE_STAGES.find(s => s.key === key)!,
 playbooks: playbooks.filter(p => p.pipeline_stage === key),
 }))
 .filter(g => g.playbooks.length > 0);

 const uncategorized = playbooks.filter(p => !p.pipeline_stage || !STAGE_ORDER.includes(p.pipeline_stage));

 return (
 <>
 <BreadcrumbSchema
 items={[
 { name: 'Home', item: '/' },
 { name: 'Playbooks', item: '/playbooks' },
 ]}
 />
 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
 {/* Visual Decision Flow */}
 <PlaybookDecisionHelper />

 {/* Pipeline Flow Visual */}
 <PipelineFlowVisual />

 {/* Hero */}
 <section className="relative mb-10 sm:mb-12">
 <div className="relative rounded-2xl bg-gradient-to-br from-violet-50 via-white to-cyan-50 border border-gray-200 p-8 sm:p-12 shadow-sm">
 <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-100 border border-violet-200 text-violet-700 text-xs font-medium mb-4">
 <BookOpen className="w-3.5 h-3.5" />
 Playbooks
 </div>
 <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
 AI Playbooks \u2014{' '}
 <span className="bg-gradient-to-r from-violet-600 via-purple-500 to-cyan-500 bg-clip-text text-transparent">
 Build with AI
 </span>
 </h1>
 <p className="text-sm sm:text-base text-gray-500 max-w-2xl mb-6">
 Step-by-step guides for real AI workflows. From idea to deployment \u2014 pick a playbook
 and follow along with the tools you already use.
 </p>

 <div className="flex flex-wrap gap-4 sm:gap-6">
 <div className="flex items-center gap-2 text-xs text-gray-500">
 <BookOpen className="w-4 h-4 text-violet-500" />
 <span className="font-semibold text-gray-900">{playbooks.length}</span> playbooks
 </div>
 <div className="flex items-center gap-2 text-xs text-gray-500">
 <Sparkles className="w-4 h-4 text-amber-500" />
 <span className="font-semibold text-gray-900">
 {new Set(playbooks.flatMap((p) => p.related_tool_slugs)).size}
 </span>{' '}
 tools covered
 </div>
 <div className="flex items-center gap-2 text-xs text-gray-500">
 <Clock className="w-4 h-4 text-amber-500" />
 <span className="font-semibold text-gray-900">
 {Math.round(
 playbooks.reduce((sum, p) => sum + p.read_time_minutes, 0) /
 playbooks.length
 )}
 </span>{' '}
 min avg read
 </div>
 </div>
 </div>
 </section>

 {/* Pipeline Stage Navigation */}
 <div className="flex flex-wrap gap-2 mb-8">
 {stageGroups.map(({ stage, playbooks: stagePlaybooks }) => (
 <a
 key={stage.key}
 href={`#stage-${stage.key}`}
 className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition hover:scale-105 ${stage.color}`}
 >
 <span>{stage.emoji}</span>
 <span>{stage.label}</span>
 <span className="text-[10px] opacity-60">{stagePlaybooks.length}</span>
 </a>
 ))}
 </div>

 {/* Playbooks by Pipeline Stage */}
 {stageGroups.map(({ stage, playbooks: stagePlaybooks }) => (
 <section key={stage.key} id={`stage-${stage.key}`} className="mb-10">
 <h2 className="text-base sm:text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
 <span>{stage.emoji}</span>
 <span>{stage.label}</span>
 <span className="text-xs font-normal text-gray-400">\u2014 {stagePlaybooks.length} playbook{stagePlaybooks.length !== 1 ? 's' : ''}</span>
 </h2>
 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
 {stagePlaybooks.map((pb) => {
 const diff = difficultyMeta[pb.difficulty];
 const toolCount = pb.related_tool_slugs.length;

 return (
 <Link
 key={pb.slug}
 href={PAID_PLAYBOOKS.includes(pb.slug) ? `/playbooks/${pb.slug}` : `/playbook/${pb.slug}`}
 className={`group relative rounded-xl bg-gradient-to-br ${pb.gradient} bg-white border border-gray-200 p-5 hover:border-violet-300 transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-violet-100/50 overflow-hidden`}
 >
 <div className="relative">
 <div className="flex items-center gap-2 mb-3">
 <span className="text-2xl">{pb.icon}</span>
 {PAID_PLAYBOOKS.includes(pb.slug) && (
 <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[9px] font-medium border bg-amber-100 text-amber-700 border-amber-200">
 📄 PDF
 <span className="text-[8px] font-bold text-red-500 ml-0.5">$9</span>
 </span>
 )}
 {pb.free_prompt && pb.free_prompt.length > 20 && (
 <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[9px] font-medium border bg-gradient-to-r from-violet-100 to-cyan-100 text-violet-700 border-violet-200 shrink-0">
 📝 Prompt
 </span>
 )}
 <span
 className={cn(
 'inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-medium border',
 diff.color
 )}
 >
 {diff.label}
 </span>
 <span className="inline-flex items-center gap-0.5 text-[9px] text-gray-400 ml-auto">
 <Clock className="w-3 h-3" />
 {pb.read_time_minutes} min
 </span>
 </div>

 <h3 className="text-sm font-semibold text-gray-900 group-hover:text-violet-700 transition-colors mb-1.5">
 {pb.title}
 </h3>
 <p className="text-xs text-gray-500 line-clamp-2 mb-3 leading-relaxed">
 {pb.description}
 </p>

 <div className="flex items-center justify-between">
 <span className="text-[10px] text-gray-400">
 {toolCount} {toolCount === 1 ? 'tool' : 'tools'}
 </span>
 <span className="text-[10px] text-gray-400 group-hover:text-violet-600 transition-colors flex items-center gap-0.5">
 {PAID_PLAYBOOKS.includes(pb.slug) ? 'Buy PDF' : 'Read guide'}
 <ChevronRight className="w-3 h-3" />
 </span>
 </div>
 </div>
 </Link>
 );
 })}
 </div>
 </section>
 ))}

 {/* Uncategorized playbooks */}
 {uncategorized.length > 0 && (
 <section className="mb-10">
 <h2 className="text-base sm:text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
 <span>📋</span>
 <span>More Playbooks</span>
 <span className="text-xs font-normal text-gray-400">\u2014 {uncategorized.length} playbook{uncategorized.length !== 1 ? 's' : ''}</span>
 </h2>
 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
 {uncategorized.map((pb) => {
 const diff = difficultyMeta[pb.difficulty];
 const toolCount = pb.related_tool_slugs.length;

 return (
 <Link
 key={pb.slug}
 href={PAID_PLAYBOOKS.includes(pb.slug) ? `/playbooks/${pb.slug}` : `/playbook/${pb.slug}`}
 className={`group relative rounded-xl bg-gradient-to-br ${pb.gradient} bg-white border border-gray-200 p-5 hover:border-violet-300 transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-violet-100/50 overflow-hidden`}
 >
 <div className="relative">
 <div className="flex items-center gap-2 mb-3">
 <span className="text-2xl">{pb.icon}</span>
 {PAID_PLAYBOOKS.includes(pb.slug) && (
 <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[9px] font-medium border bg-amber-100 text-amber-700 border-amber-200">
 📄 PDF
 <span className="text-[8px] font-bold text-red-500 ml-0.5">$9</span>
 </span>
 )}
 {pb.free_prompt && pb.free_prompt.length > 20 && (
 <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[9px] font-medium border bg-gradient-to-r from-violet-100 to-cyan-100 text-violet-700 border-violet-200 shrink-0">
 📝 Prompt
 </span>
 )}
 <span
 className={cn(
 'inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-medium border',
 diff.color
 )}
 >
 {diff.label}
 </span>
 <span className="inline-flex items-center gap-0.5 text-[9px] text-gray-400 ml-auto">
 <Clock className="w-3 h-3" />
 {pb.read_time_minutes} min
 </span>
 </div>

 <h3 className="text-sm font-semibold text-gray-900 group-hover:text-violet-700 transition-colors mb-1.5">
 {pb.title}
 </h3>
 <p className="text-xs text-gray-500 line-clamp-2 mb-3 leading-relaxed">
 {pb.description}
 </p>

 <div className="flex items-center justify-between">
 <span className="text-[10px] text-gray-400">
 {toolCount} {toolCount === 1 ? 'tool' : 'tools'}
 </span>
 <span className="text-[10px] text-gray-400 group-hover:text-violet-600 transition-colors flex items-center gap-0.5">
 {PAID_PLAYBOOKS.includes(pb.slug) ? 'Buy PDF' : 'Read guide'}
 <ChevronRight className="w-3 h-3" />
 </span>
 </div>
 </div>
 </Link>
 );
 })}
 </div>
 </section>
 )}

 {/* Coming Soon / CTA */}
 <section className="mt-12 rounded-xl border border-dashed border-gray-200 bg-gray-50 p-8 text-center">
 <Lightbulb className="w-10 h-10 text-amber-400/60 mx-auto mb-3" />
 <h3 className="text-lg font-semibold text-gray-900 mb-1">Have a playbook idea?</h3>
 <p className="text-sm text-gray-500 max-w-md mx-auto mb-4">
 Built something with AI that others could learn from? We&apos;re adding user-submitted
 playbooks soon.
 </p>
 <Link
 href="/submit"
 className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-violet-600 hover:bg-violet-700 text-white text-sm font-medium transition"
 >
 Suggest a tool
 <ArrowRight className="w-4 h-4" />
 </Link>
 </section>
 </div>
 </>
 );
}
