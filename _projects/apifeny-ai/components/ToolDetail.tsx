'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import {
 Star,
 Globe,
 BookOpen,
 CheckCircle,
 TrendingUp,
 ChevronRight,
 ExternalLink,
 BookmarkPlus,
 BookmarkCheck,
 Sparkles,
 Shield,
 DollarSign,
 Users,
 Languages,
 MapPin,
 ArrowLeft,
 ArrowRight,
} from 'lucide-react';
import { Tool } from '@/lib/types';
import {
 cn,
 getPricingLabel,
 getPricingColor,
 getAsiaScoreColor,
 getAsiaScoreBg,
 renderStars,
 formatNumber,
} from '@/lib/utils';
import { toolsData } from '@/lib/data';
import ToolCard from './ToolCard';
import AffiliateCTABar from './AffiliateCTABar';
import AffiliateButton from './AffiliateButton';
import { getAffiliateForTool } from '@/lib/affiliate-links';
import PriceComparisonTable from './PriceComparisonTable';
import ToolComments from './ToolComments';
import HowToUse from './HowToUse';
import AffiliateCard from './AffiliateCard';
import StickyAffiliateBar from './StickyAffiliateBar';

interface ToolDetailProps {
 tool: Tool;
}

export default function ToolDetail({ tool }: ToolDetailProps) {
 const [saved, setSaved] = useState(false);

 useEffect(() => {
 const stack = JSON.parse(localStorage.getItem('apifeny_stack') || '[]');
 setSaved(stack.includes(tool.slug));
 }, [tool.slug]);

 const toggleSave = () => {
 const stack = JSON.parse(localStorage.getItem('apifeny_stack') || '[]');
 if (saved) {
 const updated = stack.filter((s: string) => s !== tool.slug);
 localStorage.setItem('apifeny_stack', JSON.stringify(updated));
 setSaved(false);
 } else {
 stack.push(tool.slug);
 localStorage.setItem('apifeny_stack', JSON.stringify(stack));
 setSaved(true);
 }
 };

 const stars = renderStars(tool.avg_rating);
 const initials = tool.name
 .split(' ')
 .map((w) => w[0])
 .join('')
 .slice(0, 2)
 .toUpperCase();

 // Related tools (same category, exclude current)
 const related = toolsData
 .filter((t) => t.category === tool.category && t.id !== tool.id && t.is_published)
 .sort((a, b) => b.trending_score - a.trending_score)
 .slice(0, 6);

 return (
    <>
 <div className="max-w-5xl mx-auto">
 {/* Back link */}
 <Link
 href="/tools"
 className="inline-flex items-center gap-1.5 text-sm text-tech-200 hover:text-white transition mb-6 group"
 >
 <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition" />
 Back to Tools
 </Link>

 {/* Hero section */}
 <div className="rounded-xl border border-tech-500/30 bg-tech-700/80 p-6 sm:p-8 mb-6 sm:mb-8">
 <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
 {/* Logo */}
 <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-gradient-to-br from-tech-500 to-tech-600 flex items-center justify-center shrink-0 border border-tech-400/30">
 <span className="text-white font-bold text-2xl sm:text-3xl">{initials}</span>
 </div>

 <div className="flex-1 min-w-0">
 <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-2">
 <h1 className="text-2xl sm:text-3xl font-bold text-white">{tool.name}</h1>

 {/* Pricing badge */}
 <span
 className={cn(
 'inline-flex items-center px-3 py-0.5 rounded-full text-xs font-medium border w-fit',
 getPricingColor(tool.pricing_tier)
 )}
 >
 {getPricingLabel(tool.pricing_tier)}
 </span>
 </div>

 <p className="text-sm sm:text-base text-tech-100 mb-4">{tool.tagline}</p>

 {/* Badges row */}
 <div className="flex flex-wrap items-center gap-2">
 {/* Category */}
 <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-tech-600/60 text-tech-100 border border-tech-500/30">
 {tool.category}
 </span>

 {/* Pipeline stage badge */}
 {(tool as any).best_for_pipeline_stage && (
 <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-violet-500/15 text-violet-300 border border-violet-500/30">
 {(tool as any).best_for_pipeline_stage === 'all-rounder'
 ? '⚡ All-Rounder'
 : (tool as any).best_for_pipeline_stage === 'planning'
 ? '🧠 Planning'
 : (tool as any).best_for_pipeline_stage === 'coding'
 ? '💻 Coding'
 : (tool as any).best_for_pipeline_stage === 'research'
 ? '🔍 Research'
 : (tool as any).best_for_pipeline_stage === 'content'
 ? '📝 Content'
 : (tool as any).best_for_pipeline_stage === 'design'
 ? '🎨 Design'
 : (tool as any).best_for_pipeline_stage === 'testing'
 ? '🧪 Testing'
 : (tool as any).best_for_pipeline_stage === 'marketing'
 ? '📊 Marketing'
 : (tool as any).best_for_pipeline_stage}
 </span>
 )}

 {/* Solopreneur score badge */}
 {(tool as any).solopreneur_score !== undefined && (
 <span
 className={cn(
 'inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border',
 (tool as any).solopreneur_score >= 7
 ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30'
 : (tool as any).solopreneur_score >= 4
 ? 'bg-amber-500/15 text-amber-300 border-amber-500/30'
 : 'bg-tech-600/60 text-tech-200 border-tech-500/30'
 )}
 >
 🚀 Solo {(tool as any).solopreneur_score}/10
 </span>
 )}

 {/* Asia Score */}
 <span
 className={cn(
 'inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border',
 getAsiaScoreBg(tool.asia_score)
 )}
 >
 <span className={cn('font-bold', getAsiaScoreColor(tool.asia_score))}>
 {tool.asia_score}
 </span>
 <span className="text-tech-200 ml-1">Asia Score</span>
 </span>

 {/* Agentic badge */}
 {tool.is_agentic && (
 <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-neon/15 text-neon-light border border-neon/30">
 <Sparkles className="w-3 h-3 mr-1" />
 Agentic
 </span>
 )}

 {/* Multimodal badge */}
 {tool.is_multimodal && (
 <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-aqua/15 text-aqua-light border border-aqua/30">
 Multimodal
 </span>
 )}

 {/* API badge */}
 {tool.has_api && (
 <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-tech-600 text-tech-100 border border-tech-500/30">
 API
 </span>
 )}
 </div>
 </div>
 </div>
 </div>

 <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 mb-6 sm:mb-8">
 {/* Main content */}
 <div className="lg:col-span-2 space-y-6 sm:space-y-8">
 {/* Description */}
 <section>
 <h2 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
 <BookOpen className="w-4 h-4 text-neon-light" />
 About
 </h2>
 <p className="text-sm sm:text-base text-tech-100 leading-relaxed">
 {tool.long_description || tool.description}
 </p>
 </section>

 {/* How to Use (interactive component) */}
 <section>
 <HowToUse
 toolName={tool.name}
 toolSlug={tool.slug}
 guideTitle={(tool as any).how_to_use_guide_title}
 quickStartSteps={(tool as any).quick_start_steps}
 bestForPipelineStage={(tool as any).best_for_pipeline_stage}
 />
 </section>

 {/* Contextual affiliate card — recommend the tool */}
 {(() => {
 const aff = getAffiliateForTool(tool.slug);
 if (!aff) return null;
 const stage = (tool as any).best_for_pipeline_stage;
 const contextLabels: Record<string, string> = {
 'planning': 'planning & strategy',
 'coding': 'coding & development',
 'research': 'research & analysis',
 'content': 'content creation',
 'design': 'design & creative',
 'testing': 'testing & QA',
 'marketing': 'marketing & growth',
 };
 const contextLabel = stage ? contextLabels[stage] || stage : undefined;
 return (
 <section>
 <AffiliateCard
 toolSlug={tool.slug}
 toolName={tool.name}
 context={contextLabel}
 />
 </section>
 );
 })()}

 {/* Playbook use cases */}
 {tool.playbook_use_cases && tool.playbook_use_cases.length > 0 && (
 <section>
 <h2 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
 <TrendingUp className="w-4 h-4 text-neon-light" />
 Playbook Use Cases
 </h2>
 <div className="flex flex-wrap gap-2">
 {tool.playbook_use_cases.map((uc, i) => (
 <span
 key={i}
 className="px-3 py-1.5 rounded-lg text-xs font-medium bg-tech-800 border border-tech-500/30 text-tech-100"
 >
 {uc}
 </span>
 ))}
 </div>
 </section>
 )}

 {/* Affiliate CTA — below playbook section */}
 <section>
 <AffiliateCTABar
 toolSlug={tool.slug}
 toolName={tool.name}
 websiteUrl={tool.website_url}
 pricingMin={tool.pricing_min_usd}
 pricingMax={tool.pricing_max_usd}
 pricingTier={tool.pricing_tier}
 />
 </section>

 {/* Price comparison table */}
 <section>
 <PriceComparisonTable
 toolSlug={tool.slug}
 toolName={tool.name}
 websiteUrl={tool.website_url}
 pricingTier={tool.pricing_tier}
 pricingMin={tool.pricing_min_usd}
 pricingMax={tool.pricing_max_usd}
 />
 </section>

 {/* Community comments */}
 <section>
 <ToolComments toolSlug={tool.slug} toolName={tool.name} />
 </section>

 {/* Star rating */}
 <section>
 <h2 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
 <Star className="w-4 h-4 text-asia" />
 Reviews & Ratings
 </h2>
 <div className="flex items-center gap-4">
 <div className="flex items-center gap-1">
 {stars.map((s, i) => (
 <Star
 key={i}
 className={cn(
 'w-5 h-5',
 s === 'full'
 ? 'fill-asia text-asia'
 : s === 'half'
 ? 'fill-asia/50 text-asia'
 : 'fill-none text-tech-400'
 )}
 />
 ))}
 </div>
 <span className="text-lg font-bold text-white">{tool.avg_rating.toFixed(1)}</span>
 <span className="text-sm text-tech-200">
 ({formatNumber(tool.total_ratings)} ratings)
 </span>
 </div>
 </section>
 </div>

 {/* Sidebar */}
 <div className="space-y-4 sm:space-y-6">
 {/* Action buttons */}
 <div className="space-y-3">
 <a
 href={tool.website_url}
 target="_blank"
 rel="noopener noreferrer"
 className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-neon hover:bg-neon-dark text-white font-medium text-sm transition"
 >
 <ExternalLink className="w-4 h-4" />
 Visit Website
 </a>
 <button
 onClick={toggleSave}
 className={`w-full flex items-center justify-center gap-2 px-5 py-3 rounded-lg border font-medium text-sm transition ${
 saved
 ? 'bg-neon/20 border-neon/40 text-neon-light'
 : 'border-tech-500/30 text-tech-100 hover:text-white hover:border-neon/30 hover:bg-tech-700'
 }`}
 >
 {saved ? <BookmarkCheck className="w-4 h-4" /> : <BookmarkPlus className="w-4 h-4" />}
 {saved ? 'Saved to Stack' : 'Save to My Stack'}
 </button>
 </div>

 {/* Asia Score card */}
 <div className="rounded-xl border border-tech-500/30 bg-tech-700/80 p-4 sm:p-5">
 <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
 <Shield className="w-4 h-4 text-asia" />
 Asia Score
 </h3>
 <div className="flex items-center gap-3 mb-3">
 <span
 className={cn(
 'text-3xl font-bold',
 getAsiaScoreColor(tool.asia_score)
 )}
 >
 {tool.asia_score}
 </span>
 <span className="text-xs text-tech-200">/ 10</span>
 </div>
 <div className="w-full h-2 rounded-full bg-tech-600 overflow-hidden">
 <div
 className={cn(
 'h-full rounded-full transition-all duration-500',
 tool.asia_score >= 8
 ? 'bg-gradient-to-r from-emerald-400 to-emerald-500'
 : tool.asia_score >= 6
 ? 'bg-gradient-to-r from-asia to-amber-400'
 : tool.asia_score >= 4
 ? 'bg-gradient-to-r from-amber-400 to-amber-500'
 : 'bg-gradient-to-r from-gray-500 to-gray-400'
 )}
 style={{ width: `${tool.asia_score * 10}%` }}
 />
 </div>
 {tool.best_for_asia_use_case && (
 <p className="text-xs text-tech-200 mt-3">{tool.best_for_asia_use_case}</p>
 )}
 </div>

 {/* Pricing info */}
 <div className="rounded-xl border border-tech-500/30 bg-tech-700/80 p-4 sm:p-5">
 <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
 <DollarSign className="w-4 h-4 text-neon-light" />
 Pricing
 </h3>
 <div className="space-y-2">
 <div className="flex items-center justify-between">
 <span className="text-xs text-tech-200">Tier</span>
 <span
 className={cn(
 'inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border',
 getPricingColor(tool.pricing_tier)
 )}
 >
 {getPricingLabel(tool.pricing_tier)}
 </span>
 </div>
 {tool.pricing_min_usd !== undefined && (
 <div className="flex items-center justify-between">
 <span className="text-xs text-tech-200">Price Range</span>
 <span className="text-sm font-medium text-white">
 ${tool.pricing_min_usd}
 {tool.pricing_max_usd ? ` - $${tool.pricing_max_usd}` : '+'}
 {tool.pricing_max_usd ? '' : ''}
 </span>
 </div>
 )}
 {tool.local_pricing_asia && (
 <div className="flex items-center justify-between">
 <span className="text-xs text-tech-200">Local Pricing</span>
 <span className="text-xs text-emerald-400 flex items-center gap-1">
 <CheckCircle className="w-3 h-3" />
 Available in Asia
 </span>
 </div>
 )}
 </div>
 </div>

 {/* Languages & data residency */}
 <div className="rounded-xl border border-tech-500/30 bg-tech-700/80 p-4 sm:p-5">
 <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
 <Languages className="w-4 h-4 text-aqua" />
 Asia Features
 </h3>
 <div className="space-y-3">
 <div>
 <span className="text-xs text-tech-200 block mb-1">Supported Languages</span>
 <div className="flex flex-wrap gap-1.5">
 {tool.supports_languages?.map((lang) => (
 <span
 key={lang}
 className="px-2 py-0.5 rounded text-[10px] font-medium bg-tech-800 text-tech-100 border border-tech-500/30"
 >
 {lang}
 </span>
 ))}
 </div>
 </div>
 <div className="flex items-center justify-between">
 <span className="text-xs text-tech-200 flex items-center gap-1">
 <MapPin className="w-3 h-3" />
 Data Residency
 </span>
 <span className="text-xs text-tech-100">{tool.data_residency || 'N/A'}</span>
 </div>
 <div className="flex items-center justify-between">
 <span className="text-xs text-tech-200">Asia-Ready</span>
 <span
 className={cn(
 'text-xs font-medium',
 tool.asia_ready ? 'text-emerald-400' : 'text-tech-400'
 )}
 >
 {tool.asia_ready ? 'Yes' : 'No'}
 </span>
 </div>
 </div>
 </div>

 {/* Saves count */}
 <div className="rounded-xl border border-tech-500/30 bg-tech-700/80 p-4 sm:p-5">
 <div className="flex items-center justify-between">
 <div className="flex items-center gap-2">
 <Users className="w-4 h-4 text-neon-light" />
 <span className="text-xs text-tech-200">Saved by</span>
 </div>
 <span className="text-sm font-bold text-white">{formatNumber(tool.saves_count)}</span>
 </div>
 <div className="flex items-center justify-between mt-2">
 <div className="flex items-center gap-2">
 <TrendingUp className="w-4 h-4 text-neon-light" />
 <span className="text-xs text-tech-200">Trending Score</span>
 </div>
 <span className="text-sm font-bold text-neon-light">{tool.trending_score}</span>
 </div>
 </div>
 </div>
 </div>

 {/* Best Alternatives — tools in same category with affiliate links */}
 {(() => {
 // Pick top 3 alternatives that have affiliate data
 const alternatives = toolsData
 .filter((t) => t.category === tool.category && t.id !== tool.id && t.is_published)
 .filter((t) => getAffiliateForTool(t.slug))
 .sort((a, b) => b.trending_score - a.trending_score)
 .slice(0, 3);

 if (alternatives.length < 2) return null;

 return (
 <section className="mt-6 sm:mt-8 mb-6 rounded-xl border border-tech-500/30 bg-gradient-to-r from-tech-700/60 to-tech-800/50 p-5 sm:p-6">
 <h2 className="text-sm font-semibold text-white mb-1 flex items-center gap-2">
 <Sparkles className="w-4 h-4 text-asia" />
 Alternatives to {tool.name}
 </h2>
 <p className="text-xs text-tech-200 mb-4">
 Compare {tool.name} with other popular {tool.category.toLowerCase()} tools
 </p>
 <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
 {alternatives.map((alt) => {
 const altAff = getAffiliateForTool(alt.slug);
 const altInitials = alt.name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
 return (
 <div
 key={alt.slug}
 className="rounded-lg border border-tech-500/20 bg-tech-800/70 p-3 hover:border-neon/20 transition-all group"
 >
 <Link href={`/tools/${alt.slug}`} className="block">
 <div className="flex items-center gap-2 mb-2">
 <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-tech-500 to-tech-600 flex items-center justify-center shrink-0 border border-tech-400/30">
 <span className="text-white font-bold text-[10px]">{altInitials}</span>
 </div>
 <div className="min-w-0">
 <h3 className="text-xs font-semibold text-white group-hover:text-neon-light transition-colors truncate">
 {alt.name}
 </h3>
 <div className="flex items-center gap-1">
 {renderStars(alt.avg_rating).slice(0, 2).map((s, i) => (
 <Star
 key={i}
 className={cn('w-2.5 h-2.5', s === 'full' ? 'fill-asia text-asia' : s === 'half' ? 'fill-asia/50 text-asia' : 'fill-none text-tech-400')}
 />
 ))}
 <span className="text-[9px] text-tech-200">{alt.avg_rating.toFixed(1)}</span>
 </div>
 </div>
 </div>
 <p className="text-[10px] text-tech-200 line-clamp-2 mb-2">{alt.tagline}</p>
 </Link>
 <div className="flex items-center gap-2">
 <AffiliateButton
 toolSlug={alt.slug}
 toolName={alt.name}
 fallbackUrl={alt.website_url}
 variant="small"
 className="flex-1"
 />
 <Link
 href={`/tools/${alt.slug}`}
 className="text-[10px] text-tech-300 hover:text-neon-light transition shrink-0 px-1"
 >
 <ArrowRight className="w-3 h-3" />
 </Link>
 </div>
 </div>
 );
 })}
 </div>
 </section>
 );
 })()}

 {/* Related Tools */}
 {related.length > 0 && (
 <section className="pt-4 sm:pt-8 border-t border-tech-500/20">
 <div className="flex items-center justify-between mb-6">
 <h2 className="text-lg sm:text-xl font-bold text-white">
 More in {tool.category}
 </h2>
 <Link
 href={`/tools?category=${encodeURIComponent(tool.category)}`}
 className="text-sm text-neon-light hover:text-neon transition flex items-center gap-1"
 >
 View all
 <ChevronRight className="w-4 h-4" />
 </Link>
 </div>
 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
 {related.map((t) => (
 <ToolCard key={t.id} tool={t} />
 ))}
 </div>
 </section>
 )}
 </div>
      <StickyAffiliateBar toolSlug={tool.slug} toolName={tool.name} />
    </>
  );
}
