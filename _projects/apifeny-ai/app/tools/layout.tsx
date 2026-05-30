import { Metadata } from 'next';

export const metadata: Metadata = {
 title: 'AI Tools Directory — Browse 60+ AI Tools & Agents | Apifeny AI',
 description:
 'Discover the best AI tools for every use case. Browse 60+ curated AI tools, agents, and platforms with Asia-ready filters, pricing comparison, and user ratings.',
 openGraph: {
 title: 'AI Tools Directory — Apifeny AI',
 description:
 'Browse 60+ curated AI tools with Asia-ready filters, pricing comparison, and user ratings.',
 url: 'https://apifeny-ai.vercel.app/tools',
 },
 twitter: {
 title: 'AI Tools Directory — Apifeny AI',
 description:
 'Browse 60+ curated AI tools with Asia-ready filters, pricing comparison, and user ratings.',
 },
};

export default function ToolsLayout({ children }: { children: React.ReactNode }) {
 return <>{children}</>;
}
