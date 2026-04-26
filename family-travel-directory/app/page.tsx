// Server component — preloads metadata at build time and injects into HTML
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
      <HomeContent />
    </>
  );
}
