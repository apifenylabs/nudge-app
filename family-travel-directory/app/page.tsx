// Server component — preloads metadata at build time for instant render
import { getMeta } from '@/lib/getData';
import HomeContent from './page-content';

export default function Page() {
  const meta = getMeta();
  return <HomeContent _meta={meta} />;
}
