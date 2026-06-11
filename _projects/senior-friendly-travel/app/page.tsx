// Server component — senior-friendly landing page
import { Metadata } from 'next';
import HomeContent from './page-content';

const BASE_URL = 'https://www.seniorfriendlytravelasia.com';

export const metadata: Metadata = {
  title: 'Senior-Friendly Asia Travel — Accessible Destinations & Tours for Elderly Travelers',
  description: 'Curated guide to senior-friendly travel across Asia. Accessible destinations, mobility-friendly hotels, slow-paced tours, medical facilities, and senior discounts for travelers aged 60+.',
  openGraph: {
    title: 'Senior-Friendly Asia Travel — Slow-Paced, Accessible Destinations for Seniors',
    description: 'Find the best senior-friendly destinations, mobility-accessible hotels, and guided tours across Asia. Curated for elderly travelers and their families.',
    url: BASE_URL,
    siteName: 'Senior-Friendly Asia Travel',
    type: 'website',
    images: [{ url: `${BASE_URL}/og-image.jpg`, width: 1200, height: 630, alt: 'Senior-Friendly Asia Travel' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Senior-Friendly Asia Travel',
    description: 'Find the best senior-friendly destinations across Asia. Curated for elderly travelers.',
    images: [`${BASE_URL}/og-image.jpg`],
  },
  alternates: { canonical: BASE_URL },
};

export default function Page() {
  return <HomeContent />;
}
