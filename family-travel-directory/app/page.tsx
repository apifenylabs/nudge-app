// Server component — preloads metadata at build time
import { getMeta } from '@/lib/getData';
import HomeContent from './page-content';

export default function Page() {
  const meta = getMeta();
  return <HomeContent meta={meta} />;
}
