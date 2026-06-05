import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Best AI Tools in Canada (2026) — Curated for Canadian Teams & Startups',
  description:
    'Discover the best AI tools for Canadian businesses and founders. Curated directory of 85+ tools ranked by trending score, Canada-market readiness, and local relevance. Updated daily. Built for Toronto, Montreal, Vancouver, and Canada.',
  openGraph: {
    title: 'Best AI Tools in Canada (2026) — Apifeny AI',
    description:
      'Find AI tools built for Canada: CIFAR-aligned research, Vector Institute ecosystem, CAD pricing, bilingual (EN/FR) support, and Canadian data compliance. 85+ tools, expert ranked.',
    url: 'https://apifeny-ai.vercel.app/ai-tools-canada',
    siteName: 'Apifeny AI',
    locale: 'en-CA',
    type: 'website',
    images: [{ url: '/og', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best AI Tools in Canada (2026) — Apifeny AI',
    description:
      'Find AI tools built for Canada: CIFAR-aligned research, Vector Institute ecosystem, CAD pricing, bilingual (EN/FR) support, and Canadian data compliance. 85+ tools, expert ranked.',
  },
  alternates: {
    canonical: 'https://apifeny-ai.vercel.app/ai-tools-canada',
    languages: {
      'en-CA': 'https://apifeny-ai.vercel.app/ai-tools-canada',
      'en': 'https://apifeny-ai.vercel.app/ai-tools-canada',
    },
  },
};

export default function AiToolsCanadaLayout({ children }: { children: React.ReactNode }) {
  return children;
}
