'use client';

import { useEffect } from 'react';

interface SeoMetadataProps {
  title: string;
  description: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  canonical?: string;
}

export default function SeoMetadata({
  title,
  description,
  ogTitle,
  ogDescription,
  ogImage,
  canonical,
}: SeoMetadataProps) {
  useEffect(() => {
    document.title = title;

    const setMeta = (name: string, content: string, property = false) => {
      const attr = property ? 'property' : 'name';
      let el = document.querySelector(`meta[${attr}]`);

      if (el) {
        el.setAttribute('content', content);
        return;
      }

      el = document.createElement('meta');
      el.setAttribute(attr, name);
      el.setAttribute('content', content);
      document.head.appendChild(el);
    };

    setMeta('description', description);
    setMeta('og:title', ogTitle || title, true);
    setMeta('og:description', ogDescription || description, true);
    if (ogImage) {
      setMeta('og:image', ogImage, true);
    }

    // Set canonical link if provided
    if (canonical) {
      let link = document.querySelector('link[rel="canonical"]');
      if (!link) {
        link = document.createElement('link');
        link.setAttribute('rel', 'canonical');
        document.head.appendChild(link);
      }
      link.setAttribute('href', canonical);
    } else {
      // Fallback: auto-derive canonical from window.location
      let link = document.querySelector('link[rel="canonical"]');
      if (!link) {
        link = document.createElement('link');
        link.setAttribute('rel', 'canonical');
        document.head.appendChild(link);
      }
      link.setAttribute('href', `${window.location.protocol}//${window.location.host}${window.location.pathname}`);
    }
  }, [title, description, ogTitle, ogDescription, ogImage, canonical]);

  return null;
}
