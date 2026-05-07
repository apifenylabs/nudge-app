'use client';

import { useEffect } from 'react';

/**
 * Loads the Google AdSense script once on the client.
 * Place once in the layout or root component.
 */
export default function AdSenseScript() {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (document.querySelector('script[src*="adsbygoogle.js"]')) return;

    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6046953221141245';
    script.crossOrigin = 'anonymous';
    document.head.appendChild(script);
  }, []);

  return null;
}
