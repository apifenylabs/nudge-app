import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Best AI Tools in the Philippines (2026) — 85+ Tools for Filipino Startups & Enterprises',
  description:
    'Discover the best AI tools for the Philippines. 85+ ranked tools with PHP pricing, NPC compliance, and local ecosystem support. Updated daily for Filipino solopreneurs, SMEs, and enterprises.',
  openGraph: {
    title: 'Best AI Tools in the Philippines (2026) — Apifeny AI',
    description:
      '85+ AI tools ranked for the Philippine market. 🇵🇭 PHP pricing, NPC-compliant, Filipino-language supported.',
    url: 'https://apifeny-ai.vercel.app/ai-tools-philippines',
    siteName: 'Apifeny AI',
    locale: 'tl-PH',
    type: 'website',
    images: [{ url: '/og', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best AI Tools in the Philippines (2026) — Apifeny AI',
    description:
      '85+ AI tools ranked for the Philippine market. 🇵🇭 PHP pricing, NPC-compliant, Filipino-language supported.',
  },
  alternates: {
    canonical: 'https://apifeny-ai.vercel.app/ai-tools-philippines',
    languages: {
      'tl-PH': 'https://apifeny-ai.vercel.app/ai-tools-philippines',
      'en': 'https://apifeny-ai.vercel.app/ai-tools-philippines',
    },
  },
};

export default function AiToolsPhilippinesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
