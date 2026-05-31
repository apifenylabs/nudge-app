'use client';

import { cn } from '@/lib/utils';

interface CategoryTab {
  key: string;
  label: string;
  emoji: string;
  count: number;
}

interface CategoryStripProps {
  categories: CategoryTab[];
  activeCategory: string | null;
  onCategoryChange: (key: string | null) => void;
}

export default function CategoryStrip({ categories, activeCategory, onCategoryChange }: CategoryStripProps) {
  return (
    <div className="mb-6 sm:mb-8">
      <div className="flex flex-wrap gap-1.5">
        <button
          onClick={() => onCategoryChange(null)}
          className={cn(
            'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-all hover:scale-105',
            activeCategory === null
              ? 'bg-violet-600 text-white border-violet-600 shadow-sm'
              : 'bg-white text-gray-600 border-gray-200 hover:border-violet-200 hover:text-violet-700'
          )}
        >
          ✨ All
          <span className="text-[9px] opacity-70">{categories.reduce((sum, c) => sum + c.count, 0)}</span>
        </button>
        {categories.map((cat) => (
          <button
            key={cat.key}
            onClick={() => onCategoryChange(cat.key)}
            className={cn(
              'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-all hover:scale-105',
              activeCategory === cat.key
                ? 'bg-violet-600 text-white border-violet-600 shadow-sm'
                : 'bg-white text-gray-600 border-gray-200 hover:border-violet-200 hover:text-violet-700'
            )}
          >
            <span>{cat.emoji}</span>
            <span>{cat.label}</span>
            <span className="text-[9px] opacity-70">{cat.count}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
