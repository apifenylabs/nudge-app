import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Best AI Tools in Kuwait (2026) — Curated for Kuwaiti Teams & Enterprises',
  description:
    'AI tools directory · AI startup directory · AI business tools',
  openGraph: {
    title: 'Best AI Tools in Kuwait (2026) — Apifeny AI',
    description:
      'Find AI tools built for Kuwait: KWD/USD pricing, PDPL compliance, Arabic/English support, GCC readiness. 85+ tools, expert ranked.',
    url: 'https://apifeny-ai.vercel.app/ai-tools-kuwait',
    siteName: 'Apifeny AI',
    locale: 'ar-KW',
    type: 'website',
    images: [{ url: '/og', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best AI Tools in Kuwait (2026) — Apifeny AI',
    description:
      'Find AI tools built for Kuwait: KWD/USD pricing, PDPL compliance, Arabic/English support, GCC readiness. 85+ tools, expert ranked.',
  },
  alternates: {
    canonical: 'https://apifeny-ai.vercel.app/ai-tools-kuwait',
    languages: {
      'ar-KW': 'https://apifeny-ai.vercel.app/ai-tools-kuwait',
      'en': 'https://apifeny-ai.vercel.app/ai-tools-kuwait',
    },
  },
};

export default function AiToolsKuwaitLayout({ children }: { children: React.ReactNode }) {
  return children;
}
