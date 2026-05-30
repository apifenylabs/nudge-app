'use client';

import { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Flame } from 'lucide-react';
import { toolsData } from '@/lib/data';
import ToolCard from './ToolCard';
import { computeAllScores } from '@/lib/ranking-algorithm';

export default function TrendingTools() {
 const scrollRef = useRef<HTMLDivElement>(null);
 const [canScrollLeft, setCanScrollLeft] = useState(false);
 const [canScrollRight, setCanScrollRight] = useState(true);

 const ranked = computeAllScores(toolsData);
 const trending = ranked.slice(0, 8);

 const checkScroll = () => {
 const el = scrollRef.current;
 if (!el) return;
 setCanScrollLeft(el.scrollLeft > 10);
 setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
 };

 useEffect(() => {
 const el = scrollRef.current;
 if (el) {
 el.addEventListener('scroll', checkScroll, { passive: true });
 checkScroll();
 }
 return () => el?.removeEventListener('scroll', checkScroll);
 }, []);

 const scroll = (dir: 'left' | 'right') => {
 const el = scrollRef.current;
 if (!el) return;
 const amount = el.clientWidth * 0.75;
 el.scrollBy({ left: dir === 'left' ? -amount : amount, behavior: 'smooth' });
 };

 return (
 <section className="relative">
 <div className="flex items-center justify-between mb-6 sm:mb-8">
 <div className="flex items-center gap-3">
 <div className="p-2 rounded-lg bg-orange-100">
 <Flame className="w-5 h-5 text-orange-500" />
 </div>
 <div>
 <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Trending Now</h2>
 <p className="text-xs sm:text-sm text-gray-500">
 Ranked by community score + momentum + Asia fit
 </p>
 </div>
 </div>
 <div className="hidden sm:flex items-center gap-2">
 <button
 onClick={() => scroll('left')}
 disabled={!canScrollLeft}
 className="p-2 rounded-lg border border-gray-200 bg-white text-gray-500 hover:text-gray-900 hover:border-gray-300 transition disabled:opacity-30 disabled:pointer-events-none shadow-sm"
 aria-label="Scroll left"
 >
 <ChevronLeft className="w-4 h-4" />
 </button>
 <button
 onClick={() => scroll('right')}
 disabled={!canScrollRight}
 className="p-2 rounded-lg border border-gray-200 bg-white text-gray-500 hover:text-gray-900 hover:border-gray-300 transition disabled:opacity-30 disabled:pointer-events-none shadow-sm"
 aria-label="Scroll right"
 >
 <ChevronRight className="w-4 h-4" />
 </button>
 </div>
 </div>

 {trending.length > 0 && (
 <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-5">
 {trending.slice(0, 3).map((item, i) => (
 <span
 key={item.tool.id}
 className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-white border border-gray-200 text-gray-600 shadow-sm"
 >
 <span className={i === 0 ? 'text-amber-500' : i === 1 ? 'text-sky-500' : 'text-orange-400'}>
 {i === 0 ? '\ud83d\udd25' : '\ud83d\udcc8'}
 </span>
 <span className="font-semibold text-gray-900">#{item.rank}</span>
 <span className="text-gray-500">{item.tool.name}</span>
 <span className="text-gray-400 text-[10px]">
 {item.score.toFixed(1)}
 </span>
 </span>
 ))}
 </div>
 )}

 <div
 ref={scrollRef}
 className="flex gap-4 overflow-x-auto scrollbar-hide pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 snap-x snap-mandatory"
 >
 {trending.map((item) => (
 <div key={item.tool.id} className="min-w-[280px] sm:min-w-[300px] snap-start">
 <ToolCard tool={item.tool} rank={item.rank} showRank />
 </div>
 ))}
 </div>

 {canScrollLeft && (
 <div className="hidden sm:block absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-gray-50 to-transparent pointer-events-none" />
 )}
 {canScrollRight && (
 <div className="hidden sm:block absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-gray-50 to-transparent pointer-events-none" />
 )}
 </section>
 );
}
