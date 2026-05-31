import type { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import GoogleAnalytics from '@/components/GoogleAnalytics';
import './globals.css';

export const metadata: Metadata = {
  title: 'LifeOS — AI Copilot for Everything',
  description: 'Your AI copilot for life. Have a conversation that leads, challenges, and builds a plan with you. Inspired by aicofounder.com — for every area of life.',
  metadataBase: new URL('https://lifeos.vercel.app'),
  openGraph: {
    title: 'LifeOS — AI Copilot for Everything',
    description: 'A personality-aware AI copilot with 10+ specialized plugins for travel, finance, health, career, and more.',
    url: 'https://lifeos.vercel.app',
    siteName: 'LifeOS',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LifeOS — AI Copilot for Everything',
    description: 'A personality-aware AI copilot with 10+ specialized plugins for every area of life.',
  },
  alternates: {
    canonical: 'https://lifeos.vercel.app',
  },
};

// ═══════════════════════════════════════════════════════════════
// JSON-LD: Organization + WebSite structured data
// ═══════════════════════════════════════════════════════════════

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': 'https://lifeos.vercel.app/#organization',
      name: 'LifeOS',
      url: 'https://lifeos.vercel.app',
      description: 'A personality-aware AI copilot for every area of life.',
      sameAs: [],
    },
    {
      '@type': 'WebSite',
      '@id': 'https://lifeos.vercel.app/#website',
      url: 'https://lifeos.vercel.app',
      name: 'LifeOS',
      description: 'Your AI copilot for life. Have a conversation that leads, challenges, and builds a plan with you.',
      publisher: { '@id': 'https://lifeos.vercel.app/#organization' },
      inLanguage: 'en-US',
    },
    {
      '@type': 'SoftwareApplication',
      '@id': 'https://lifeos.vercel.app/#software',
      name: 'LifeOS',
      description: 'A personality-aware AI copilot with 10+ specialized plugins for travel, finance, health, career, learning, family, home, social, relationships, and mindfulness.',
      url: 'https://lifeos.vercel.app',
      applicationCategory: 'WebApplication',
      operatingSystem: 'Web',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
      },
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen">
        {children}
        <Analytics />
        <SpeedInsights />
        <GoogleAnalytics />
      </body>
    </html>
  );
}
