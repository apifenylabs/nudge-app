import { Metadata } from 'next';
import HomeClient from './_HomeClient';

const BASE_URL = 'https://apifeny.ai';

export const metadata: Metadata = {
  title: 'Apifeny AI — 71 Playbooks & 90+ Curated AI Tools for Asia',
  description:
    'Stop collecting AI tools. Start shipping results. 71 step-by-step playbooks for content creation, coding, design, marketing, and research — curated for Asia. Asia-score rankings, local pricing data, multilingual support.',
  keywords: [
    'AI tools directory',
    'AI playbooks',
    'AI tools Asia',
    'curated AI tools',
    'AI agent workflow',
    'solopreneur AI',
    'AI for business',
    'ChatGPT playbooks',
    'AI productivity Asia',
    'best AI tools 2026',
  ],
  alternates: { canonical: BASE_URL },
  openGraph: {
    title: 'Apifeny AI — 71 Playbooks & 90+ Curated AI Tools for Asia',
    description:
      'Stop collecting AI tools. Start shipping results. Find curated AI tools and step-by-step playbooks for Asia.',
    url: BASE_URL,
    siteName: 'Apifeny AI',
    type: 'website',
    locale: 'en_US',
    images: [{ url: '/og', width: 1200, height: 630, alt: 'Apifeny AI — AI Tools & Playbooks for Asia' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Apifeny AI — 71 Playbooks & 90+ Curated AI Tools for Asia',
    description: 'Stop collecting AI tools. Start shipping results.',
    images: ['/og'],
  },
  robots: { index: true, follow: true },
};

export default function Page() {
  return <HomeClient />;
}
