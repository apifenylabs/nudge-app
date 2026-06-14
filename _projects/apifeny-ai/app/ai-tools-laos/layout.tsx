import type { Metadata } from 'next';

export const metadata: Metadata = {
 title: 'Best AI Tools in Laos (2026) — Curated for Laotian Founders & Teams',
 description:
 'Discover the best AI tools for Laotian businesses and founders. Curated directory of 85+ tools ranked by trending score, Southeast Asia-readiness, and local relevance. Updated daily.',
 openGraph: {
 title: 'Best AI Tools in Laos (2026) — Apifeny AI',
 description:
 'Find AI tools built for Laos: multilingual support, local pricing, data residency, and Southeast Asian market readiness. 85+ tools, expert ranked.',
 url: 'https://apifeny-ai.vercel.app/ai-tools-laos',
 siteName: 'Apifeny AI',
 locale: 'en_LA',
 type: 'website',
 },
 twitter: {
 card: 'summary_large_image',
 title: 'Best AI Tools in Laos (2026) — Apifeny AI',
 description:
 'Find the best AI tools for Laos. Expert-ranked directory with SE Asia-ready filters and local pricing info.',
 },
 alternates: {
 canonical: 'https://apifeny-ai.vercel.app/ai-tools-laos',
 },
};

export default function AIToolsLaosLayout({ children }: { children: React.ReactNode }) {
 return children;
}
