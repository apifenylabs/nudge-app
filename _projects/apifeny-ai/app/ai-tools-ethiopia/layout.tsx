import type { Metadata } from 'next';

export const metadata: Metadata = {
 title: 'Best AI Tools in Ethiopia (2026) — Curated for Ethiopian Founders & Teams',
 description:
 'Discover the best AI tools for Ethiopian businesses and founders. Curated directory of 85+ tools ranked by trending score, Africa-readiness, and local relevance. Updated daily.',
 openGraph: {
 title: 'Best AI Tools in Ethiopia (2026) — Apifeny AI',
 description:
 'Find AI tools built for Ethiopia: multilingual support, local pricing, data residency, and African market readiness. 85+ tools, expert ranked.',
 url: 'https://apifeny-ai.vercel.app/ai-tools-ethiopia',
 siteName: 'Apifeny AI',
 locale: 'en_ET',
 type: 'website',
 },
 twitter: {
 card: 'summary_large_image',
 title: 'Best AI Tools in Ethiopia (2026) — Apifeny AI',
 description:
 'Find the best AI tools for Ethiopia. Expert-ranked directory with Africa-ready filters and local pricing info.',
 },
 alternates: {
 canonical: 'https://apifeny-ai.vercel.app/ai-tools-ethiopia',
 },
};

export default function AIToolsEthiopiaLayout({ children }: { children: React.ReactNode }) {
 return children;
}
