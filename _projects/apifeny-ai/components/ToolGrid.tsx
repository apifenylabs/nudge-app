'use client';

import { useMemo, useCallback } from 'react';
import { AlertCircle, RotateCcw } from 'lucide-react';
import { Tool, FilterState } from '@/lib/types';
import { toolsData } from '@/lib/data';
import ToolCard from './ToolCard';
import { cn } from '@/lib/utils';

interface ToolGridProps {
 filters: FilterState;
 clearFilters: () => void;
}

function filterTools(tools: Tool[], filters: FilterState): Tool[] {
 return tools.filter((t) => {
 if (!t.is_published) return false;

 if (filters.search) {
 const q = filters.search.toLowerCase();
 const matchesSearch =
 t.name.toLowerCase().includes(q) ||
 t.tagline.toLowerCase().includes(q) ||
 t.description.toLowerCase().includes(q) ||
 (t.category && t.category.toLowerCase().includes(q));
 if (!matchesSearch) return false;
 }

 if (filters.category && t.category !== filters.category) return false;

 if (filters.pricing && t.pricing_tier !== filters.pricing) return false;

 if (filters.asiaReady !== null && t.asia_ready !== filters.asiaReady) return false;

 if (filters.useCase && (!t.use_cases || !t.use_cases.includes(filters.useCase))) return false;

 if (filters.agentRole && (!t.agent_roles || !t.agent_roles.includes(filters.agentRole))) return false;

 if (filters.agentic !== null && t.is_agentic !== filters.agentic) return false;

 if (filters.multimodal !== null && t.is_multimodal !== filters.multimodal) return false;

 return true;
 });
}

function sortTools(tools: Tool[], sortBy: FilterState['sortBy']): Tool[] {
 const sorted = [...tools];
 switch (sortBy) {
 case 'trending':
 sorted.sort((a, b) => b.trending_score - a.trending_score);
 break;
 case 'rating':
 sorted.sort((a, b) => b.avg_rating - a.avg_rating);
 break;
 case 'name':
 sorted.sort((a, b) => a.name.localeCompare(b.name));
 break;
 case 'newest':
 sorted.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
 break;
 }
 return sorted;
}

export default function ToolGrid({ filters, clearFilters }: ToolGridProps) {
 const filtered = useMemo(() => {
 const f = filterTools(toolsData, filters);
 return sortTools(f, filters.sortBy);
 }, [filters]);

 const isEmpty = filtered.length === 0;

 return (
 <div className="flex-1 min-w-0">
 {/* Results count */}
 <div className="flex items-center justify-between mb-4 sm:mb-6">
 <p className="text-sm text-tech-200">
 {filtered.length === 1
 ? '1 tool found'
 : `${filtered.length} tools found`}
 </p>
 </div>

 {/* Grid */}
 <div
 className={cn(
 'grid gap-4 sm:gap-5',
 isEmpty ? 'grid-cols-1' : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
 )}
 >
 {filtered.slice(0, 50).map((tool) => (
 <ToolCard key={tool.id} tool={tool} />
 ))}
 </div>

 {/* Empty state */}
 {isEmpty && (
 <div className="flex flex-col items-center justify-center py-20 text-center">
 <div className="p-4 rounded-full bg-tech-700 border border-tech-500/30 mb-4">
 <AlertCircle className="w-8 h-8 text-tech-300" />
 </div>
 <h3 className="text-lg font-semibold text-white mb-2">No tools match your filters</h3>
 <p className="text-sm text-tech-200 max-w-md mb-6">
 Try adjusting your search terms or clearing the filters to see all available tools.
 </p>
 <button
 onClick={clearFilters}
 className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-neon hover:bg-neon-dark text-white text-sm font-medium transition"
 >
 <RotateCcw className="w-4 h-4" />
 Clear Filters
 </button>
 </div>
 )}

 {/* Load more indicator */}
 {filtered.length > 50 && (
 <div className="mt-8 text-center">
 <p className="text-sm text-tech-300">
 Showing 50 of {filtered.length} tools. Refine your filters for more specific results.
 </p>
 </div>
 )}
 </div>
 );
}
