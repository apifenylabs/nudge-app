import type { Metadata } from 'next';

export const metadata: Metadata = {
 title: 'Best AI Tools in Tanzania (2026) — Curated for Tanzanian Founders & Teams',
 description:
 'Discover the best AI tools for Tanzanian businesses and founders. Curated directory of 85+ tools ranked by trending score, Swahili/English readiness, and local relevance. Updated daily.',
 openGraph: {
 title: 'Best AI Tools in Tanzania (2026) — Apifeny AI',
 description:
 'Find AI tools built for Tanzania: Swahili/English support, local pricing, data residency, and East African market readiness. 85+ tools, expert ranked.',
 url: 'https://apifeny-ai.vercel.app/ai-tools-tanzania',
 siteName: 'Apifeny AI',
 locale: 'en_TZ',
 type: 'website',
 },
 twitter: {
 card: 'summary_large_image',
 title: 'Best AI Tools in Tanzania (2026) — Apifeny AI',
 description:
 'Find the best AI tools for Tanzania. Expert-ranked directory with East Africa-ready filters and local pricing info.',
 },
 alternates: {
 canonical: 'https://apifeny-ai.vercel.app/ai-tools-tanzania',
 },
};

export default function AIToolsTanzaniaLayout({ children }: { children: React.ReactNode }) {
 return children;
}
