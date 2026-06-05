'use client';

import Script from 'next/script';

/**
 * Google Analytics 4 component for Social Beast.
 * Set NEXT_PUBLIC_GA_TRACKING_ID on Vercel to activate.
 * Falls back gracefully when env var is not set.
 */
export default function GoogleAnalytics() {
  const gaId = process.env.NEXT_PUBLIC_GA_TRACKING_ID;

  if (!gaId || gaId === 'your-ga-id-here' || gaId === 'G-XXXXXXXXXX') {
    return null;
  }

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gaId}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
    </>
  );
}
