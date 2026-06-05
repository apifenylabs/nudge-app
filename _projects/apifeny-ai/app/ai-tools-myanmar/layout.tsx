import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Best AI Tools in Myanmar (2026) — Top AI Tools for Burmese Teams & Startups',
  description:
    'Discover the best AI tools for Myanmar',
  openGraph: {
    title: 'Best AI Tools in Myanmar (2026) — Apifeny AI',
    description:
      'AI tools ranked for the Myanmar market. 🇲🇲 Burmese language support, MMK/USD pricing, and curated for Myanmar',
    url: 'https://apifeny-ai.vercel.app/ai-tools-myanmar',
    siteName: 'Apifeny AI',
    locale: 'my-MM',
    type: 'website',
    images: [{ url: '/og', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best AI Tools in Myanmar (2026) — Apifeny AI',
    description:
      'AI tools ranked for the Myanmar market. 🇲🇲 Burmese language support, MMK/USD pricing, and curated for Myanmar',
  },
  alternates: {
    canonical: 'https://apifeny-ai.vercel.app/ai-tools-myanmar',
    languages: {
      'my-MM': 'https://apifeny-ai.vercel.app/ai-tools-myanmar',
      'en': 'https://apifeny-ai.vercel.app/ai-tools-myanmar',
    },
  },
};

export default function AiToolsMyanmarLayout({ children }: { children: React.ReactNode }) {
  return children;
}
