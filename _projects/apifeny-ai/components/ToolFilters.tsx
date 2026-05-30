'use client';

import { useCallback } from 'react';
import { Search, X, SlidersHorizontal } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
 FilterState,
 CATEGORIES,
 PRICING_TIERS,
 USE_CASES,
 AGENT_ROLES,
} from '@/lib/types';

interface ToolFiltersProps {
 filters: FilterState;
 setFilters: (filters: FilterState) => void;
 showMobile: boolean;
 setShowMobile: (show: boolean) => void;
}

export default function ToolFilters({ filters, setFilters, showMobile, setShowMobile }: ToolFiltersProps) {
 const update = useCallback(
 (partial: Partial<FilterState>) => {
 setFilters({ ...filters, ...partial });
 },
 [filters, setFilters]
 );

 const clearAll = () => {
 setFilters({
 search: '',
 category: '',
 pricing: '',
 asiaReady: null,
 useCase: '',
 agentRole: '',
 agentic: null,
 multimodal: null,
 sortBy: 'trending',
 });
 };

 const hasActiveFilters =
 filters.search ||
 filters.category ||
 filters.pricing ||
 filters.asiaReady !== null ||
 filters.useCase ||
 filters.agentRole ||
 filters.agentic !== null ||
 filters.multimodal !== null;

 const content = (
 <div className="space-y-6">
 {/* Search */}
 <div>
 <label className="block text-xs font-medium text-tech-200 uppercase tracking-wider mb-2">
 Search
 </label>
 <div className="relative">
 <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-tech-300" />
 <input
 type="text"
 value={filters.search}
 onChange={(e) => update({ search: e.target.value })}
 placeholder="Search tools..."
 className="w-full bg-tech-800 border border-tech-500/50 rounded-lg pl-10 pr-4 py-2.5 text-sm text-white placeholder:text-tech-300 focus:outline-none focus:border-neon/50 focus:ring-1 focus:ring-neon/20 transition"
 />
 {filters.search && (
 <button
 onClick={() => update({ search: '' })}
 className="absolute right-3 top-1/2 -translate-y-1/2 text-tech-300 hover:text-white transition"
 >
 <X className="w-4 h-4" />
 </button>
 )}
 </div>
 </div>

 {/* Category */}
 <div>
 <label className="block text-xs font-medium text-tech-200 uppercase tracking-wider mb-2">
 Category
 </label>
 <select
 value={filters.category}
 onChange={(e) => update({ category: e.target.value })}
 className="w-full bg-tech-800 border border-tech-500/50 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-neon/50 focus:ring-1 focus:ring-neon/20 transition appearance-none"
 >
 {CATEGORIES.map((cat) => (
 <option key={cat} value={cat === 'All Categories' ? '' : cat}>
 {cat}
 </option>
 ))}
 </select>
 </div>

 {/* Pricing - multi-select pills */}
 <div>
 <label className="block text-xs font-medium text-tech-200 uppercase tracking-wider mb-2">
 Pricing
 </label>
 <div className="flex flex-wrap gap-2">
 {PRICING_TIERS.filter((p) => p !== 'All Pricing').map((tier) => {
 const active = filters.pricing === tier;
 return (
 <button
 key={tier}
 onClick={() => update({ pricing: active ? '' : tier })}
 className={cn(
 'px-3 py-1.5 rounded-lg text-xs font-medium border transition',
 active
 ? 'bg-neon/20 text-neon-light border-neon/40'
 : 'bg-tech-800 text-tech-200 border-tech-500/30 hover:border-tech-400/50'
 )}
 >
 {tier}
 </button>
 );
 })}
 </div>
 </div>

 {/* Use Case */}
 <div>
 <label className="block text-xs font-medium text-tech-200 uppercase tracking-wider mb-2">
 Use Case
 </label>
 <select
 value={filters.useCase}
 onChange={(e) => update({ useCase: e.target.value })}
 className="w-full bg-tech-800 border border-tech-500/50 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-neon/50 focus:ring-1 focus:ring-neon/20 transition appearance-none"
 >
 <option value="">All Use Cases</option>
 {USE_CASES.map((uc) => (
 <option key={uc} value={uc}>
 {uc}
 </option>
 ))}
 </select>
 </div>

 {/* Agent Role */}
 <div>
 <label className="block text-xs font-medium text-tech-200 uppercase tracking-wider mb-2">
 Agent Role
 </label>
 <select
 value={filters.agentRole}
 onChange={(e) => update({ agentRole: e.target.value })}
 className="w-full bg-tech-800 border border-tech-500/50 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-neon/50 focus:ring-1 focus:ring-neon/20 transition appearance-none"
 >
 <option value="">All Roles</option>
 {AGENT_ROLES.map((role) => (
 <option key={role} value={role}>
 {role}
 </option>
 ))}
 </select>
 </div>

 {/* Toggles */}
 <div>
 <label className="block text-xs font-medium text-tech-200 uppercase tracking-wider mb-3">
 Features
 </label>
 <div className="space-y-3">
 <label className="flex items-center gap-3 cursor-pointer group">
 <button
 onClick={() => update({ asiaReady: filters.asiaReady === null ? true : filters.asiaReady ? false : null })}
 className={cn(
 'w-10 h-6 rounded-full border transition relative shrink-0',
 filters.asiaReady === true
 ? 'bg-neon border-neon'
 : filters.asiaReady === false
 ? 'bg-tech-600 border-tech-400'
 : 'bg-tech-800 border-tech-500/50'
 )}
 >
 <span
 className={cn(
 'absolute top-0.5 w-5 h-5 rounded-full bg-white transition-transform duration-200',
 filters.asiaReady === true
 ? 'translate-x-[18px]'
 : filters.asiaReady === false
 ? 'translate-x-[18px]'
 : 'translate-x-0.5'
 )}
 />
 </button>
 <span className="text-sm text-tech-100 group-hover:text-white transition">
 Asia-Ready
 {filters.asiaReady === true && <span className="text-tech-300 ml-1">(On)</span>}
 {filters.asiaReady === false && <span className="text-tech-300 ml-1">(Off)</span>}
 </span>
 </label>

 <label className="flex items-center gap-3 cursor-pointer group">
 <button
 onClick={() => update({ agentic: filters.agentic === null ? true : filters.agentic ? false : null })}
 className={cn(
 'w-10 h-6 rounded-full border transition relative shrink-0',
 filters.agentic === true
 ? 'bg-neon border-neon'
 : filters.agentic === false
 ? 'bg-tech-600 border-tech-400'
 : 'bg-tech-800 border-tech-500/50'
 )}
 >
 <span
 className={cn(
 'absolute top-0.5 w-5 h-5 rounded-full bg-white transition-transform duration-200',
 filters.agentic === true
 ? 'translate-x-[18px]'
 : filters.agentic === false
 ? 'translate-x-[18px]'
 : 'translate-x-0.5'
 )}
 />
 </button>
 <span className="text-sm text-tech-100 group-hover:text-white transition">
 Agentic
 {filters.agentic === true && <span className="text-tech-300 ml-1">(On)</span>}
 {filters.agentic === false && <span className="text-tech-300 ml-1">(Off)</span>}
 </span>
 </label>

 <label className="flex items-center gap-3 cursor-pointer group">
 <button
 onClick={() => update({ multimodal: filters.multimodal === null ? true : filters.multimodal ? false : null })}
 className={cn(
 'w-10 h-6 rounded-full border transition relative shrink-0',
 filters.multimodal === true
 ? 'bg-neon border-neon'
 : filters.multimodal === false
 ? 'bg-tech-600 border-tech-400'
 : 'bg-tech-800 border-tech-500/50'
 )}
 >
 <span
 className={cn(
 'absolute top-0.5 w-5 h-5 rounded-full bg-white transition-transform duration-200',
 filters.multimodal === true
 ? 'translate-x-[18px]'
 : filters.multimodal === false
 ? 'translate-x-[18px]'
 : 'translate-x-0.5'
 )}
 />
 </button>
 <span className="text-sm text-tech-100 group-hover:text-white transition">
 Multimodal
 {filters.multimodal === true && <span className="text-tech-300 ml-1">(On)</span>}
 {filters.multimodal === false && <span className="text-tech-300 ml-1">(Off)</span>}
 </span>
 </label>
 </div>
 </div>

 {/* Sort */}
 <div>
 <label className="block text-xs font-medium text-tech-200 uppercase tracking-wider mb-2">
 Sort by
 </label>
 <select
 value={filters.sortBy}
 onChange={(e) => update({ sortBy: e.target.value as FilterState['sortBy'] })}
 className="w-full bg-tech-800 border border-tech-500/50 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-neon/50 focus:ring-1 focus:ring-neon/20 transition appearance-none"
 >
 <option value="trending">Trending</option>
 <option value="rating">Highest Rated</option>
 <option value="name">Name A-Z</option>
 <option value="newest">Newest</option>
 </select>
 </div>

 {/* Clear All */}
 {hasActiveFilters && (
 <button
 onClick={clearAll}
 className="w-full px-4 py-2.5 rounded-lg border border-tech-500/30 text-sm font-medium text-tech-200 hover:text-white hover:border-tech-400/50 hover:bg-tech-700 transition"
 >
 Clear All Filters
 </button>
 )}
 </div>
 );

 return (
 <>
 {/* Mobile toggle button */}
 <button
 onClick={() => setShowMobile(true)}
 className="lg:hidden flex items-center gap-2 px-4 py-2 rounded-lg border border-tech-500/30 bg-tech-700 text-sm text-tech-100 hover:text-white hover:border-neon/30 transition"
 >
 <SlidersHorizontal className="w-4 h-4" />
 Filters
 {hasActiveFilters && (
 <span className="w-2 h-2 rounded-full bg-neon" />
 )}
 </button>

 {/* Desktop sidebar */}
 <aside className="hidden lg:block w-64 shrink-0">
 <div className="sticky top-24">
 <div className="flex items-center justify-between mb-4">
 <h3 className="text-sm font-semibold text-white uppercase tracking-wider">Filters</h3>
 {hasActiveFilters && (
 <button
 onClick={clearAll}
 className="text-xs text-neon-light hover:text-neon transition"
 >
 Clear all
 </button>
 )}
 </div>
 {content}
 </div>
 </aside>

 {/* Mobile overlay */}
 {showMobile && (
 <div className="fixed inset-0 z-50 lg:hidden">
 <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowMobile(false)} />
 <div className="absolute right-0 top-0 bottom-0 w-full max-w-sm bg-tech-900 border-l border-tech-500/30 overflow-y-auto">
 <div className="sticky top-0 bg-tech-900/95 backdrop-blur-md border-b border-tech-500/20 z-10 px-4 py-3 flex items-center justify-between">
 <h3 className="text-sm font-semibold text-white uppercase tracking-wider">Filters</h3>
 <button
 onClick={() => setShowMobile(false)}
 className="p-2 rounded-lg text-tech-200 hover:text-white hover:bg-tech-700 transition"
 >
 <X className="w-5 h-5" />
 </button>
 </div>
 <div className="p-4">{content}</div>
 </div>
 </div>
 )}
 </>
 );
}
