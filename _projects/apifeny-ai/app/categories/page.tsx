import { Metadata } from 'next';
import Link from 'next/link';
import { CATEGORIES, type CategoryInfo } from '@/lib/category-data';
import { toolsData } from '@/lib/data';
import { Sparkles } from 'lucide-react';

export const metadata: Metadata = {
  title: 'AI Tool Categories — Apifeny AI',
  description: 'Browse AI tools by category — chatbots, coding, design, marketing, writing, research, and more. Find the right AI tool for your workflow.',
  openGraph: {
    title: 'AI Tool Categories — Apifeny AI',
    description: 'Browse AI tools by category. Find the right tool for your workflow.',
  },
};

export default function CategoriesPage() {
  const categories = Object.values(CATEGORIES);

  return (
    <main className="min-h-screen bg-gray-950">
      <section className="max-w-5xl mx-auto px-4 py-16 sm:py-24">
        <div className="mb-12">
          <span className="text-neon font-semibold text-sm uppercase tracking-wider">Categories</span>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mt-2 mb-4">
            AI Tool Categories
          </h1>
          <p className="text-lg text-tech-300 max-w-2xl leading-relaxed">
            Browse AI tools organized by category. Whether you need a chatbot, coding assistant, 
            design tool, or marketing AI — find the right tool for your workflow.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {categories.map((cat: CategoryInfo) => {
            const toolCount = Object.values(toolsData).filter(
              (t) => 'category' in t && t.category === cat.slug
            ).length;

            return (
              <Link
                key={cat.slug}
                href={`/categories/${cat.slug}`}
                className={`block bg-gradient-to-br ${cat.gradient} border border-tech-700/30 rounded-xl p-6 hover:border-tech-500/50 transition-all group`}
              >
                <div className="text-3xl mb-3">{cat.icon}</div>
                <h2 className="text-white font-bold text-lg mb-1 group-hover:text-neon-light transition-colors">
                  {cat.name}
                </h2>
                <p className="text-sm text-tech-300 mb-2 line-clamp-2">{cat.description}</p>
                <span className="text-xs text-tech-400">{toolCount} tools</span>
              </Link>
            );
          })}
        </div>
      </section>
    </main>
  );
}
