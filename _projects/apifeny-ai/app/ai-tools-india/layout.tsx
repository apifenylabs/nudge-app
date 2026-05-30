import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Best AI Tools in India (2026) — 100+ Tools for Indian Startups & Enterprises',
  description:
    'Discover the best AI tools for India businesses and founders. Curated directory of 100+ tools ranked by trending score, multilingual support, and local market relevance. Updated daily.',
  openGraph: {
    title: 'Best AI Tools in India (2026) — Apifeny AI',
    description:
      'Find AI tools built for India: हिन्दी / English & 22 official languages support, ₹ INR pricing, DPDP Act 2023 compliance, and India startup ecosystem readiness. 100+ tools, expert ranked.',
    url: 'https://apifeny-ai.vercel.app/ai-tools-india',
    siteName: 'Apifeny AI',
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best AI Tools in India (2026) — Apifeny AI',
    description:
      'Find the best AI tools for India. Expert-ranked directory with multilingual interface support and local pricing info.',
  },
  alternates: {
    canonical: 'https://apifeny-ai.vercel.app/ai-tools-india',
    languages: {
      'en-IN': 'https://apifeny-ai.vercel.app/ai-tools-india',
      'hi': 'https://apifeny-ai.vercel.app/ai-tools-india',
      'en': 'https://apifeny-ai.vercel.app/ai-tools-india',
    },
  },
};

export default function AIToolsIndiaLayout({ children }: { children: React.ReactNode }) {
  return children;
}
