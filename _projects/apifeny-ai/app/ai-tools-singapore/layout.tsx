import type { Metadata } from 'next';

export const metadata: Metadata = {
 title: 'Best AI Tools in Singapore (2026) — Curated for SG Founders & Teams',
 description:
 'Discover the best AI tools for Singapore businesses and founders. Curated directory of 85+ tools ranked by trending score, Asia-readiness, and local relevance. Updated daily.',
 openGraph: {
 title: 'Best AI Tools in Singapore (2026) — Apifeny AI',
 description:
 'Find AI tools built for Singapore: multilingual support, local pricing, data residency, and Asian market readiness. 85+ tools, expert ranked.',
 url: 'https://apifeny-ai.vercel.app/ai-tools-singapore',
 siteName: 'Apifeny AI',
 locale: 'en_SG',
 type: 'website',
 },
 twitter: {
 card: 'summary_large_image',
 title: 'Best AI Tools in Singapore (2026) — Apifeny AI',
 description:
 'Find the best AI tools for Singapore. Expert-ranked directory with Asia-ready filters and local pricing info.',
 },
 alternates: {
 canonical: 'https://apifeny-ai.vercel.app/ai-tools-singapore',
 },
};

export default function AIToolsSingaporeLayout({ children }: { children: React.ReactNode }) {
 return children;
}
