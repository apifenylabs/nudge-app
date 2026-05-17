'use client';

import { useEffect } from 'react';

interface SeoMetadataProps {
  title: string;
  description: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
}

/**
 * Client-side SEO metadata injector.
 * Use on 'use client' pages where 'export const metadata' is unavailable.
 * Sets document.title and injects/updates <meta> tags for OG + Twitter.
 */
export default function SeoMetadata({
  title,
  description,
  ogTitle,
  ogDescription,
  ogImage = '/og',
}: SeoMetadataProps) {
  useEffect(() => {
    // Set document title (uses the template pattern "Title | Apifeny AI")
    document.title = `${title} | Apifeny AI`;

    // Helper to set or update a meta tag
    const setMeta = (property: string, content: string, isName = false) => {
      const attr = isName ? 'name' : 'property';
      let el = document.querySelector(`meta[${attr}="${property}"]`) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, property);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    // Open Graph
    setMeta('og:title', ogTitle || title);
    setMeta('og:description', ogDescription || description);
    setMeta('og:image', ogImage);

    // Twitter
    setMeta('twitter:title', ogTitle || title, true);
    setMeta('twitter:description', ogDescription || description, true);
    setMeta('twitter:image', ogImage, true);

    // Standard meta
    setMeta('description', description, true);

    return () => {
      // Cleanup not needed — next page will overwrite or the component unmounts cleanly
    };
  }, [title, description, ogTitle, ogDescription, ogImage]);

  // This component doesn't render anything visible
  return null;
}
