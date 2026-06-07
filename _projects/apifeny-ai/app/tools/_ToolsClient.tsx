'use client';

import { useState, useCallback, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { FilterState } from '@/lib/types';
import BreadcrumbSchema from '@/components/BreadcrumbSchema';
import ToolFilters from '@/components/ToolFilters';
import ToolGrid from '@/components/ToolGrid';

function ToolsPageContent() {
 const searchParams = useSearchParams();
 const router = useRouter();
 const [showMobileFilters, setShowMobileFilters] = useState(false);

 // Read initial filter state from URL
 const [filters, setFiltersState] = useState<FilterState>(() => ({
 search: searchParams.get('search') || '',
 category: searchParams.get('category') || '',
 pricing: searchParams.get('pricing') || '',
 asiaReady: searchParams.get('asiaReady') === 'true' ? true : searchParams.get('asiaReady') === 'false' ? false : null,
 useCase: searchParams.get('useCase') || '',
 agentRole: searchParams.get('agentRole') || '',
 agentic: searchParams.get('agentic') === 'true' ? true : searchParams.get('agentic') === 'false' ? false : null,
 multimodal: searchParams.get('multimodal') === 'true' ? true : searchParams.get('multimodal') === 'false' ? false : null,
 sortBy: (searchParams.get('sortBy') as FilterState['sortBy']) || 'trending',
 }));

 const setFilters = useCallback(
 (newFilters: FilterState) => {
 setFiltersState(newFilters);

 // Sync to URL
 const params = new URLSearchParams();
 if (newFilters.search) params.set('search', newFilters.search);
 if (newFilters.category) params.set('category', newFilters.category);
 if (newFilters.pricing) params.set('pricing', newFilters.pricing);
 if (newFilters.asiaReady !== null) params.set('asiaReady', String(newFilters.asiaReady));
 if (newFilters.useCase) params.set('useCase', newFilters.useCase);
 if (newFilters.agentRole) params.set('agentRole', newFilters.agentRole);
 if (newFilters.agentic !== null) params.set('agentic', String(newFilters.agentic));
 if (newFilters.multimodal !== null) params.set('multimodal', String(newFilters.multimodal));
 if (newFilters.sortBy !== 'trending') params.set('sortBy', newFilters.sortBy);

 const qs = params.toString();
 router.replace(qs ? `/tools?${qs}` : '/tools', { scroll: false });
 },
 [router]
 );

 const clearFilters = useCallback(() => {
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
 }, [setFilters]);

 return (
 <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
 {/* Filters */}
 <ToolFilters
 filters={filters}
 setFilters={setFilters}
 showMobile={showMobileFilters}
 setShowMobile={setShowMobileFilters}
 />

 {/* Grid */}
 <div className="flex-1 min-w-0">
 {/* Mobile search bar */}
 <div className="lg:hidden mb-4">
 <input
 type="text"
 value={filters.search}
 onChange={(e) => setFilters({ ...filters, search: e.target.value })}
 placeholder="Search tools..."
 className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-neon/50 focus:ring-1 focus:ring-neon/20 transition"
 />
 </div>

 <ToolGrid filters={filters} clearFilters={clearFilters} />
 </div>
 </div>
 );
}

export default function ToolsClient() {
 return (
 <>
 <BreadcrumbSchema
 items={[
 { name: 'Home', item: '/' },
 { name: 'AI Tools', item: '/tools' },
 ]}
 />
 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
 {/* Page header */}
 <div className="mb-6 sm:mb-8">
 <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">AI Tools Directory</h1>
 <p className="text-sm text-gray-700 mt-1">
 Browse, filter, and discover the best AI tools for any task
 </p>
 </div>

 <Suspense
 fallback={
 <div className="flex items-center justify-center py-20">
 <div className="w-8 h-8 border-2 border-neon/30 border-t-neon rounded-full animate-spin" />
 </div>
 }
 >
 <ToolsPageContent />
 </Suspense>
 </div>
 </>
 );
}
