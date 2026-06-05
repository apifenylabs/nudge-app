import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Best AI Tools in Russia (2026) — Curated for Russia Teams & Startups',
  description:
    'Discover the top AI tools in Russia, designed to boost your team',
  openGraph: {
    title: 'Best AI Tools in Russia (2026) — Apifeny AI',
    description:
      'Explore the best AI tools in Russia, tailored for Russian teams.',
    url: 'https://apifeny-ai.vercel.app/ai-tools-russia',
    siteName: 'Apifeny AI',
    locale: 'ru-RU',
    type: 'website',
    images: [{ url: '/og', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best AI Tools in Russia (2026) — Apifeny AI',
    description:
      'Explore the best AI tools in Russia, tailored for Russian teams.',
  },
  alternates: {
    canonical: 'https://apifeny-ai.vercel.app/ai-tools-russia',
    languages: {
      'ru-RU': 'https://apifeny-ai.vercel.app/ai-tools-russia',
      'en': 'https://apifeny-ai.vercel.app/ai-tools-russia',
    },
  },
};

export default function AiToolsRussiaLayout({ children }: { children: React.ReactNode }) {
  return children;
}
