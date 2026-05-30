import { Metadata } from 'next';
import ToolsClient from './_ToolsClient';

const BASE_URL = 'https://apifeny-ai.vercel.app';

export const metadata: Metadata = {
 title: 'AI Tools Directory — 90+ Curated AI Tools | Apifeny AI',
 description:
 'Browse 90+ curated AI tools with Asia-ready filters, Asia Scores, local pricing, and multilingual support. Find the best AI tools for content creation, coding, design, marketing, and research.',
 keywords: [
 'AI tools directory',
 'best AI tools',
 'curated AI tools',
 'AI tools Asia',
 'AI tools list',
 'AI search engine',
 'AI productivity tools',
 'ChatGPT alternatives',
 'AI agents directory',
 'machine learning tools',
 ],
 alternates: { canonical: `${BASE_URL}/tools` },
 openGraph: {
 title: 'AI Tools Directory — 90+ Curated AI Tools | Apifeny AI',
 description:
 'Browse 90+ curated AI tools with Asia-ready filters, Asia Scores, and local pricing.',
 url: `${BASE_URL}/tools`,
 siteName: 'Apifeny AI',
 type: 'website',
 images: [{ url: '/og', width: 1200, height: 630, alt: 'AI Tools Directory | Apifeny AI' }],
 },
 twitter: {
 card: 'summary_large_image',
 title: 'AI Tools Directory — 90+ Curated AI Tools | Apifeny AI',
 description: 'Browse 90+ curated AI tools with Asia-ready filters.',
 images: ['/og'],
 },
 robots: { index: true, follow: true },
};

export default function Page() {
 return <ToolsClient />;
}
