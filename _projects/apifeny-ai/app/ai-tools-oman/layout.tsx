import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Best AI Tools in Oman (2026) — Curated for Omani Teams & Enterprises',
  description:
    'AI tools directory · AI startup directory · AI business tools',
  openGraph: {
    title: 'Best AI Tools in Oman (2026) — Apifeny AI',
    description:
      'Find AI tools built for Oman: OMR/USD pricing, PDPL compliance, Arabic/English support, GCC readiness. 85+ tools, expert ranked.',
    url: 'https://apifeny-ai.vercel.app/ai-tools-oman',
    siteName: 'Apifeny AI',
    locale: 'ar-OM',
    type: 'website',
    images: [{ url: '/og', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best AI Tools in Oman (2026) — Apifeny AI',
    description:
      'Find AI tools built for Oman: OMR/USD pricing, PDPL compliance, Arabic/English support, GCC readiness. 85+ tools, expert ranked.',
  },
  alternates: {
    canonical: 'https://apifeny-ai.vercel.app/ai-tools-oman',
    languages: {
      'ar-OM': 'https://apifeny-ai.vercel.app/ai-tools-oman',
      'en': 'https://apifeny-ai.vercel.app/ai-tools-oman',
    },
  },
};

export default function AiToolsOmanLayout({ children }: { children: React.ReactNode }) {
  return children;
}
