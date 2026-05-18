import { Metadata } from 'next';
import { getAllDestinations } from '@/lib/data';
import SearchPageClient from './_client';

export const metadata: Metadata = {
  title: 'Search Senior-Friendly Destinations | Senior-Friendly Travel Asia',
  description: 'Browse and filter senior-friendly destinations across Asia by country, accessibility score, healthcare access, and transport options.',
  openGraph: {
    title: 'Senior-Friendly Travel Asia — Search Destinations',
    description: 'Find accessible destinations across Asia with senior-friendly ratings, transport info, and healthcare access.',
  },
};

export default function SearchPage() {
  const destinations = getAllDestinations();
  return <SearchPageClient destinations={destinations} />;
}
