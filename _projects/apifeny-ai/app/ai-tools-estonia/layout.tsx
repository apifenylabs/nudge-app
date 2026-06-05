import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Best AI Tools in Estonia (2026) — Curated for Estonian Teams & Startups',
  description:
    'Discover the best AI tools for Estonian businesses and founders.',
  openGraph: {
    title: 'Best AI Tools in Estonia (2026) — Apifeny AI',
    description:
      'Find AI tools built for Estonia: e-Estonia ecosystem, EUR pricing.',
    url: 'https://apifeny-ai.vercel.app/ai-tools-estonia',
    siteName: 'Apifeny AI',
    locale: 'et-EE',
    type: 'website',
    images: [{ url: '/og', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best AI Tools in Estonia (2026) — Apifeny AI',
    description:
      'Find AI tools built for Estonia: e-Estonia ecosystem, EUR pricing.',
  },
  alternates: {
    canonical: 'https://apifeny-ai.vercel.app/ai-tools-estonia',
    languages: {
      'et-EE': 'https://apifeny-ai.vercel.app/ai-tools-estonia',
      'en': 'https://apifeny-ai.vercel.app/ai-tools-estonia',
    },
  },
};

export default function AiToolsEstoniaLayout({ children }: { children: React.ReactNode }) {
  return children;
}
