import { Suspense } from 'react';
import { getMeta, getAllStations } from '@/lib/getData';
import SearchPageContent from './_client';

export const metadata = {
  title: 'Search EV Charging Stations — EV Charging Asia',
  description: 'Find EV charging stations across Asia. Filter by country, city, charger type, and amenities.',
};

export default function SearchPage() {
  const meta = getMeta();
  const stations = getAllStations();
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-10 w-10 border-2 border-gray-300 border-t-gray-900 mx-auto mb-4" />
          <p className="text-gray-500 text-sm">Loading search...</p>
        </div>
      </div>
    }>
      <SearchPageContent meta={meta} stations={stations} />
    </Suspense>
  );
}
