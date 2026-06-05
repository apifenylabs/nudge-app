import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Best AI Tools in Cambodia (2026) — 75+ Tools for Khmer Startups & SMEs',
  description:
    'Discover the best AI tools for Cambodia. 75+ ranked tools with KHR/USD pricing, PDPA compliance, Khmer language support, and local ecosystem fit. Updated for Phnom Penh, Siem Reap & Sihanoukville.',
  openGraph: {
    title: 'Best AI Tools in Cambodia (2026) — Apifeny AI',
    description:
      '75+ AI tools ranked for the Cambodian market. 🇰🇭 Khmer language support, USD/KHR pricing, data privacy compliant.',
    url: 'https://apifeny-ai.vercel.app/ai-tools-cambodia',
    siteName: 'Apifeny AI',
    locale: 'km-KH',
    type: 'website',
    images: [{ url: '/og', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best AI Tools in Cambodia (2026) — Apifeny AI',
    description:
      '75+ AI tools ranked for the Cambodian market. 🇰🇭 Khmer language support, USD/KHR pricing, data privacy compliant.',
  },
  alternates: {
    canonical: 'https://apifeny-ai.vercel.app/ai-tools-cambodia',
    languages: {
      'km-KH': 'https://apifeny-ai.vercel.app/ai-tools-cambodia',
      'en': 'https://apifeny-ai.vercel.app/ai-tools-cambodia',
    },
  },
};

export default function AiToolsCambodiaLayout({ children }: { children: React.ReactNode }) {
  return children;
}
