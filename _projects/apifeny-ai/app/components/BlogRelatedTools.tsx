import Link from 'next/link';
import { ArrowRight, Wrench } from 'lucide-react';
import { getToolsForBlogPost } from '@/lib/blog-data';
import type { Tool } from '@/lib/types';

interface Props {
  postTitle: string;
  postTags: string[];
}

export default function BlogRelatedTools({ postTitle, postTags }: Props) {
  const tools = getToolsForBlogPost(postTitle, postTags, 4);
  if (tools.length === 0) return null;

  return (
    <section className="border-t border-tech-500/20 bg-tech-800/30 mt-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="flex items-center gap-2 mb-8">
          <Wrench className="w-5 h-5 text-neon" />
          <h2 className="text-2xl font-bold text-white">AI Tools Mentioned</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {tools.map((tool) => (
            <Link
              key={tool.slug}
              href={`/tools/${tool.slug}`}
              className="group bg-tech-800/40 border border-tech-500/20 rounded-xl p-5 hover:border-neon/30 transition-all"
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-tech-700/50 flex items-center justify-center shrink-0 text-lg font-bold text-neon-light">
                  {tool.name.charAt(0)}
                </div>
                <div className="min-w-0">
                  <h3 className="font-semibold text-white group-hover:text-neon-light transition truncate">
                    {tool.name}
                  </h3>
                  <p className="text-sm text-tech-400 line-clamp-2 mt-1">
                    {tool.tagline}
                  </p>
                  <div className="flex items-center gap-1.5 mt-2 text-xs">
                    <span className="px-2 py-0.5 rounded-full bg-neon/10 text-neon-light border border-neon/20">
                      {tool.pricing_tier}
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-tech-700/50 text-tech-400 border border-tech-500/20">
                      {tool.category}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1 text-xs text-neon-light mt-3 group-hover:gap-2 transition-all">
                View Tool Details
                <ArrowRight className="w-3 h-3" />
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link
            href="/tools"
            className="inline-flex items-center gap-1.5 text-sm text-neon-light hover:text-neon transition"
          >
            Browse all 85+ AI tools
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
