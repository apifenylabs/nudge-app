import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Best AI Tools in Bulgaria (2026) — Curated for Bulgarian Teams & Startups',
  description:
    'Discover the best AI tools for Bulgarian businesses and developers. Curated directory of 85+ tools ranked by trending score, Bulgaria-market readiness, and local relevance. Updated daily. Built for Sofia, Plovdiv, Varna, and Bulgaria',
  openGraph: {
    title: 'Best AI Tools in Bulgaria (2026) — Apifeny AI',
    description:
      'Find AI tools built for Bulgaria: EU-market aligned, BGN/EUR pricing, Bulgarian/English support, and GDPR compliance. 85+ tools, expert ranked.',
    url: 'https://apifeny-ai.vercel.app/ai-tools-bulgaria',
    siteName: 'Apifeny AI',
    locale: 'bg-BG',
    type: 'website',
    images: [{ url: '/og', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best AI Tools in Bulgaria (2026) — Apifeny AI',
    description:
      'Find AI tools built for Bulgaria: EU-market aligned, BGN/EUR pricing, Bulgarian/English support, and GDPR compliance. 85+ tools, expert ranked.',
  },
  alternates: {
    canonical: 'https://apifeny-ai.vercel.app/ai-tools-bulgaria',
    languages: {
      'bg-BG': 'https://apifeny-ai.vercel.app/ai-tools-bulgaria',
      'en': 'https://apifeny-ai.vercel.app/ai-tools-bulgaria',
    },
  },
};

export default function AiToolsBulgariaLayout({ children }: { children: React.ReactNode }) {
  return children;
}
