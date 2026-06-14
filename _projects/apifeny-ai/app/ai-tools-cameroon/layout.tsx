import type { Metadata } from 'next';

export const metadata: Metadata = {
 title: 'Best AI Tools in Cameroon (2026) — Curated for Cameroonian Founders & Teams',
 description:
 'Discover the best AI tools for Cameroonian businesses and founders. Curated directory of 85+ tools ranked by trending score, bilingual readiness, and local relevance. Updated daily.',
 openGraph: {
 title: 'Best AI Tools in Cameroon (2026) — Apifeny AI',
 description:
 'Find AI tools built for Cameroon: bilingual (French/English) support, local pricing, data residency, and African market readiness. 85+ tools, expert ranked.',
 url: 'https://apifeny-ai.vercel.app/ai-tools-cameroon',
 siteName: 'Apifeny AI',
 locale: 'en_CM',
 type: 'website',
 },
 twitter: {
 card: 'summary_large_image',
 title: 'Best AI Tools in Cameroon (2026) — Apifeny AI',
 description:
 'Find the best AI tools for Cameroon. Expert-ranked directory with Africa-ready filters and bilingual support.',
 },
 alternates: {
 canonical: 'https://apifeny-ai.vercel.app/ai-tools-cameroon',
 },
};

export default function AIToolsCameroonLayout({ children }: { children: React.ReactNode }) {
 return children;
}
