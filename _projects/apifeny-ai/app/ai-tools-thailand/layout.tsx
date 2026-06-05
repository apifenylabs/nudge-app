import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Best AI Tools in Thailand (2026) — 85+ Tools for Thai Startups & Enterprises',
  description:
    'Discover the best AI tools for Thailand. 85+ ranked tools with THB pricing, PDPA compliance, and local ecosystem support. Updated daily for Thai solopreneurs, SMEs, and enterprises.',
  openGraph: {
    title: 'Best AI Tools in Thailand (2026) — Apifeny AI',
    description:
      '85+ AI tools ranked for the Thai market. 🇹🇭 THB pricing, PDPA-compliant, Thai-language supported.',
    url: 'https://apifeny-ai.vercel.app/ai-tools-thailand',
    siteName: 'Apifeny AI',
    locale: 'th-TH',
    type: 'website',
    images: [{ url: '/og', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best AI Tools in Thailand (2026) — Apifeny AI',
    description:
      '85+ AI tools ranked for the Thai market. 🇹🇭 THB pricing, PDPA-compliant, Thai-language supported.',
  },
  alternates: {
    canonical: 'https://apifeny-ai.vercel.app/ai-tools-thailand',
    languages: {
      'th-TH': 'https://apifeny-ai.vercel.app/ai-tools-thailand',
      'en': 'https://apifeny-ai.vercel.app/ai-tools-thailand',
    },
  },
};

export default function AiToolsThailandLayout({ children }: { children: React.ReactNode }) {
  return children;
}
