import type { Metadata } from 'next';
import type { Station } from '@/lib/scoring';
import RangeClient from './_client';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'EV Range Calculator | Plan Your Electric Road Trip in Asia',
  description:
    'Calculate EV driving range, find charging stops, and estimate charging costs for your next electric road trip across Asia. Supports BYD, Tesla, MG, Hyundai, Kia, and more.',
  openGraph: {
    title: 'EV Range Calculator | EV Charging Asia',
    description:
      'Plan your electric road trip across Asia. Select your EV, enter your route, and find charging stops along the way.',
    url: 'https://ev-charging-asia.vercel.app/range',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'EV Range Calculator' }],
  },
  alternates: {
    canonical: 'https://ev-charging-asia.vercel.app/range',
  },
};

async function loadStations(): Promise<Station[]> {
  const { default: raw } = await import('@/data/stations.json');
  return raw as Station[];
}

export default async function RangePage() {
  const stations = await loadStations();

  return (
    <>
      {/* Breadcrumbs for SEO */}
      <nav className="max-w-5xl mx-auto px-4 pt-4 sm:pt-6" aria-label="Breadcrumb">
        <ol className="flex items-center gap-2 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
          <li>
            <Link href="/" className="hover:text-vibe-sky transition-colors">
              Home
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li className="text-gray-700 dark:text-gray-300 font-medium" aria-current="page">
            EV Range Calculator
          </li>
        </ol>
      </nav>

      {/* JSON-LD for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebApplication',
            name: 'EV Range Calculator',
            url: 'https://ev-charging-asia.vercel.app/range',
            description:
              'Calculate EV driving range, find charging stops, and estimate charging costs for electric road trips across Asia.',
            applicationCategory: 'TravelApplication',
            operatingSystem: 'All',
            browserRequirements: 'Requires JavaScript',
            offers: {
              '@type': 'Offer',
              price: '0',
              priceCurrency: 'USD',
            },
            author: {
              '@type': 'Organization',
              name: 'EV Charging Asia',
            },
          }),
        }}
      />

      <RangeClient stations={stations} />
    </>
  );
}
