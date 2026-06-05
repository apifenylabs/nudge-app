import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Best AI Tools in Austria (2026) — Curated for Austrian Teams & Startups',
  description:
    'Discover the best AI tools for Austrian businesses and founders. Curated directory of 85+ tools ranked by trending score, Austria-market readiness, and local relevance. Updated daily. Built for Vienna, Graz, Linz, and Austria',
  openGraph: {
    title: 'Best AI Tools in Austria (2026) — Apifeny AI',
    description:
      'Find AI tools built for Austria: FFG-funded ecosystem, GDPR compliance, EUR pricing, and German/English support. 85+ tools, expert ranked.',
    url: 'https://apifeny-ai.vercel.app/ai-tools-austria',
    siteName: 'Apifeny AI',
    locale: 'de-AT',
    type: 'website',
    images: [{ url: '/og', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best AI Tools in Austria (2026) — Apifeny AI',
    description:
      'Find AI tools built for Austria: FFG-funded ecosystem, GDPR compliance, EUR pricing, and German/English support. 85+ tools, expert ranked.',
  },
  alternates: {
    canonical: 'https://apifeny-ai.vercel.app/ai-tools-austria',
    languages: {
      'de-AT': 'https://apifeny-ai.vercel.app/ai-tools-austria',
      'en': 'https://apifeny-ai.vercel.app/ai-tools-austria',
    },
  },
};

export default function AiToolsAustriaLayout({ children }: { children: React.ReactNode }) {
  return children;
}
