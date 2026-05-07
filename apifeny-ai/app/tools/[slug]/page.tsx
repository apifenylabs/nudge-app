import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { toolsData } from '@/lib/data';
import ToolDetail from '@/components/ToolDetail';

interface ToolPageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  return toolsData
    .filter((t) => t.is_published)
    .map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: ToolPageProps): Promise<Metadata> {
  const tool = toolsData.find((t) => t.slug === params.slug);
  if (!tool) return { title: 'Tool Not Found' };

  return {
    title: tool.name,
    description: tool.tagline || tool.description,
    openGraph: {
      title: `${tool.name} — Apifeny AI`,
      description: tool.tagline || tool.description,
      type: 'article',
    },
  };
}

export default function ToolPage({ params }: ToolPageProps) {
  const tool = toolsData.find((t) => t.slug === params.slug);

  if (!tool) {
    notFound();
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <ToolDetail tool={tool} />
    </div>
  );
}
