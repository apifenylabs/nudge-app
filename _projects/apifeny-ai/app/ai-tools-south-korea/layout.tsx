import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Best AI Tools in South Korea (2026) — 100+ Tools for Korean Startups & Chaebols',
  description:
    'Discover the best AI tools for South Korea',
  openGraph: {
    title: 'Best AI Tools in South Korea (2026) — Apifeny AI',
    description:
      '100+ AI tools ranked for the South Korean market. 🇰🇷 Korean language support, KRW/USD pricing, PIPA compliant, curated for Korea',
    url: 'https://apifeny-ai.vercel.app/ai-tools-south-korea',
    siteName: 'Apifeny AI',
    locale: 'ko-KR',
    type: 'website',
    images: [{ url: '/og', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best AI Tools in South Korea (2026) — Apifeny AI',
    description:
      '100+ AI tools ranked for the South Korean market. 🇰🇷 Korean language support, KRW/USD pricing, PIPA compliant, curated for Korea',
  },
  alternates: {
    canonical: 'https://apifeny-ai.vercel.app/ai-tools-south-korea',
    languages: {
      'ko-KR': 'https://apifeny-ai.vercel.app/ai-tools-south-korea',
      'en': 'https://apifeny-ai.vercel.app/ai-tools-south-korea',
    },
  },
};

export default function AiToolsSouthKoreaLayout({ children }: { children: React.ReactNode }) {
  return children;
}
