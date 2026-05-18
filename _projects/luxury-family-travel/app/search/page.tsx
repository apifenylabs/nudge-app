import { Suspense } from 'react';
import { getMeta } from '@/lib/getData';
import SearchPageContent from './_client';

export const metadata = {
  title: 'Search Destinations — Family Travel Directory',
  description: 'Find the perfect family destination. Filter by age, category, country, price, and safety rating.',
};

export default function SearchPage() {
  const meta = getMeta();
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-50 flex items-center justify-center"><div className="w-8 h-8 border-2 border-sky-600 border-t-transparent rounded-full animate-spin" /></div>}>
      <SearchPageContent meta={meta} />
    </Suspense>
  );
}
