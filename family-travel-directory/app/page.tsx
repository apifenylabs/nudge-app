// Server component — preloads metadata at build time for instant render
import { getMeta } from '@/lib/getData';
import HomeContent from './page-content';

export default function Page() {
  const meta = getMeta();
  return (
    <>
      <script
        dangerouslySetInnerHTML={{
          __html: `window.__DIRECTORY_META__ = ${JSON.stringify(meta)};`,
        }}
      />
      <HomeContent
        ssrDestinations={meta.totalDestinations}
        ssrCities={meta.cities.length}
        ssrTips={meta.totalParentTips}
      />
    </>
  );
}
