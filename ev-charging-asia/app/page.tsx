import { getMeta, getAllStations } from '@/lib/getData';
import HomeContent from './page-content';

export default function Page() {
  const meta = getMeta();
  const stations = getAllStations();
  return <HomeContent meta={meta} stations={stations} />;
}
