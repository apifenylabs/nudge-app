'use client';

import { useEffect } from 'react';

interface SeoMetadataProps {
  title: string;
  description: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
}

export default function SeoMetadata({
  title,
  description,
  ogTitle,
  ogDescription,
  ogImage,
}: SeoMetadataProps) {
  useEffect(() => {
    document.title = title;

    const setMeta = (name: string, content: string, property = false) => {
      const attr = property ? 'property' : 'name';
      let el = document.querySelector(`meta[${attr}="${name}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, name);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    setMeta('description', description);
    setMeta('og:title', ogTitle || title, true);
    setMeta('og:description', ogDescription || description, true);
    if (ogImage) {
      setMeta('og:image', ogImage, true);
    }
  }, [title, description, ogTitle, ogDescription, ogImage]);

  return null;
}
