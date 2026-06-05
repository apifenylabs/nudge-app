import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Best AI Tools in Luxembourg (2026) — Curated for Luxembourgish Teams & Startups',
  description:
    'Discover the best AI tools for Luxembourgish businesses and founders. Find GDPR-compliant, EUR-priced AI tools for Luxembourg City startups, the finance sector, and space-tech ecosystem.',
  openGraph: {
    title: 'Best AI Tools in Luxembourg (2026) — Apifeny AI',
    description:
      'Find AI tools purpose-built for Luxembourg: EU GDPR compliance, EUR pricing, and multilingual (Luxembourgish / French / German / English) support. Curated for the finance hub and EU institution capital.',
    url: 'https://apifeny-ai.vercel.app/ai-tools-luxembourg',
    siteName: 'Apifeny AI',
    locale: 'lb-LU',
    type: 'website',
    images: [{ url: '/og', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best AI Tools in Luxembourg (2026) — Apifeny AI',
    description:
      'Find AI tools purpose-built for Luxembourg: EU GDPR compliance, EUR pricing, and multilingual (Luxembourgish / French / German / English) support. Curated for the finance hub and EU institution capital.',
  },
  alternates: {
    canonical: 'https://apifeny-ai.vercel.app/ai-tools-luxembourg',
    languages: {
      'lb-LU': 'https://apifeny-ai.vercel.app/ai-tools-luxembourg',
      'en': 'https://apifeny-ai.vercel.app/ai-tools-luxembourg',
    },
  },
};

export default function AiToolsLuxembourgLayout({ children }: { children: React.ReactNode }) {
  return children;
}
