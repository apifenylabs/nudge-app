import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Best AI Tools in Iceland (2026) — Curated for Icelandic Teams & Startups',
  description:
    'Discover the best AI tools for Icelandic businesses and founders. Find GDPR-compliant, ISK-priced AI tools for Reykjavík startups.',
  openGraph: {
    title: 'Best AI Tools in Iceland (2026) — Apifeny AI',
    description:
      'Find AI tools purpose-built for Iceland: Nordic GDPR compliance, ISK pricing, and Icelandic language support.',
    url: 'https://apifeny-ai.vercel.app/ai-tools-iceland',
    siteName: 'Apifeny AI',
    locale: 'is-IS',
    type: 'website',
    images: [{ url: '/og', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best AI Tools in Iceland (2026) — Apifeny AI',
    description:
      'Find AI tools purpose-built for Iceland: Nordic GDPR compliance, ISK pricing, and Icelandic language support.',
  },
  alternates: {
    canonical: 'https://apifeny-ai.vercel.app/ai-tools-iceland',
    languages: {
      'is-IS': 'https://apifeny-ai.vercel.app/ai-tools-iceland',
      'en': 'https://apifeny-ai.vercel.app/ai-tools-iceland',
    },
  },
};

export default function AiToolsIcelandLayout({ children }: { children: React.ReactNode }) {
  return children;
}
