import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI Tool Collections — Curated Tool Bundles | Apifeny AI',
  description:
    'Explore curated collections of AI tools grouped by use case, industry, and workflow. Find the perfect combination of AI tools for your specific needs.',
  openGraph: {
    title: 'AI Tool Collections — Apifeny AI',
    description:
      'Curated collections of AI tools grouped by use case and workflow.',
    url: 'https://apifeny-ai.vercel.app/collections',
  },
};

export default function CollectionsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
