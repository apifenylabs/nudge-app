import type { Metadata } from 'next';

export const metadata: Metadata = {
 title: 'Best AI Tools in Sri Lanka (2026) — 100+ Tools for Colombo Tech Scene & Tourism AI',
 description:
 'Discover the best AI tools for Sri Lankan businesses and founders. Curated directory of 100+ tools ranked by trending score, Sinhala/Tamil language support, and local market relevance. Updated daily.',
 openGraph: {
 title: 'Best AI Tools in Sri Lanka (2026) — Apifeny AI',
 description:
 'Find AI tools built for Sri Lanka: Sinhala (සිංහල) & Tamil (தமிழ்) language support, LKR/USD pricing, and tourism industry readiness. 100+ tools, expert ranked.',
 url: 'https://apifeny-ai.vercel.app/ai-tools-sri-lanka',
 siteName: 'Apifeny AI',
 locale: 'si_LK',
 type: 'website',
 },
 twitter: {
 card: 'summary_large_image',
 title: 'Best AI Tools in Sri Lanka (2026) — Apifeny AI',
 description:
 'Find the best AI tools for Sri Lanka. Expert-ranked directory with Sinhala & Tamil interface support and local pricing info.',
 },
 alternates: {
 canonical: 'https://apifeny-ai.vercel.app/ai-tools-sri-lanka',
 languages: {
 'si-LK': 'https://apifeny-ai.vercel.app/ai-tools-sri-lanka',
 'en': 'https://apifeny-ai.vercel.app/ai-tools-sri-lanka',
 },
 },
};

export default function AIToolsSriLankaLayout({ children }: { children: React.ReactNode }) {
 return children;
}
