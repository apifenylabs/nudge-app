import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Best AI Tools in Qatar (2026) — Curated for Qatari Teams & Enterprises',
  description:
    'AI tools directory · AI startup directory · AI business tools',
  openGraph: {
    title: 'Best AI Tools in Qatar (2026) — Apifeny AI',
    description:
      'Find AI tools built for Qatar: QAR/USD pricing, PDPL compliance, Arabic/English support, GCC readiness. 85+ tools, expert ranked.',
    url: 'https://apifeny-ai.vercel.app/ai-tools-qatar',
    siteName: 'Apifeny AI',
    locale: 'ar-QA',
    type: 'website',
    images: [{ url: '/og', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best AI Tools in Qatar (2026) — Apifeny AI',
    description:
      'Find AI tools built for Qatar: QAR/USD pricing, PDPL compliance, Arabic/English support, GCC readiness. 85+ tools, expert ranked.',
  },
  alternates: {
    canonical: 'https://apifeny-ai.vercel.app/ai-tools-qatar',
    languages: {
      'ar-QA': 'https://apifeny-ai.vercel.app/ai-tools-qatar',
      'en': 'https://apifeny-ai.vercel.app/ai-tools-qatar',
    },
  },
};

export default function AiToolsQatarLayout({ children }: { children: React.ReactNode }) {
  return children;
}
