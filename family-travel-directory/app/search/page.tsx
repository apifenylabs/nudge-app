import { getMeta } from '@/lib/getData';
import SearchPageContent from './_client';

export const metadata = {
  title: 'Search Destinations — Family Travel Directory',
  description: 'Find the perfect family destination. Filter by age, category, country, price, and safety rating.',
};

export default function SearchPage() {
  const meta = getMeta();
  return <SearchPageContent meta={meta} />;
}
