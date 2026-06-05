import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Best AI Tools in Latvia (2026) — Curated for Baltic Startups & Developers',
  description:
    'Discover the best AI tools for Latvian businesses and developers. Curated directory of 85+ tools ranked by trending score, Latvia-market readiness, and local relevance. Updated daily. Built for Riga tech ecosystem.',
  openGraph: {
    title: 'Best AI Tools in Latvia (2026) — Apifeny AI',
    description:
      'Find AI tools built for Latvia: multilingual support, EUR pricing, GDPR compliance, and Baltic data center readiness. 85+ tools, expert ranked.',
    url: 'https://apifeny-ai.vercel.app/ai-tools-latvia',
    siteName: 'Apifeny AI',
    locale: 'lv-LV',
    type: 'website',
    images: [{ url: '/og', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best AI Tools in Latvia (2026) — Apifeny AI',
    description:
      'Find AI tools built for Latvia: multilingual support, EUR pricing, GDPR compliance, and Baltic data center readiness. 85+ tools, expert ranked.',
  },
  alternates: {
    canonical: 'https://apifeny-ai.vercel.app/ai-tools-latvia',
    languages: {
      'lv-LV': 'https://apifeny-ai.vercel.app/ai-tools-latvia',
      'en': 'https://apifeny-ai.vercel.app/ai-tools-latvia',
    },
  },
};

export default function AiToolsLatviaLayout({ children }: { children: React.ReactNode }) {
  return children;
}
