'use client';

import Link from 'next/link';
import { ThumbsUp, MessageSquare, ChevronRight, TrendingUp, Clock } from 'lucide-react';
import {
  communityPlaybooks,
  CommunityPlaybook,
} from '@/lib/community-playbooks';
import { cn } from '@/lib/utils';

interface ToolCommunityPlaybooksProps {
  toolSlug: string;
  toolName: string;
}

export default function ToolCommunityPlaybooks({
  toolSlug,
  toolName,
}: ToolCommunityPlaybooksProps) {
  // Find community playbooks that reference this tool
  const related = communityPlaybooks.filter((cp) =>
    cp.related_tool_slugs.includes(toolSlug)
  );

  if (related.length === 0) return null;

  const difficultyColor = {
    Beginner: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
    Intermediate: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
    Advanced: 'bg-neon/20 text-neon-light border-neon/30',
  };

  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-white flex items-center gap-2">
          <MessageSquare className="w-4 h-4 text-emerald-400" />
          Community Playbooks
        </h2>
        <Link
          href="/community-playbook"
          className="text-sm text-neon-light hover:text-neon transition flex items-center gap-1"
        >
          All playbooks
          <ChevronRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="space-y-3">
        {related.slice(0, 3).map((cp) => (
          <Link
            key={cp.id}
            href={`/community-playbook/${cp.id}`}
            className={`group relative block rounded-xl bg-gradient-to-r ${cp.gradient} bg-tech-700/80 border border-tech-500/30 p-4 hover:border-emerald-500/30 transition-all hover:-translate-y-0.5 overflow-hidden`}
          >
            <div className="absolute inset-0 bg-tech-grid opacity-20" />
            <div className="relative">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-lg">{cp.icon}</span>
                <span
                  className={cn(
                    'inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-medium border',
                    difficultyColor[cp.difficulty]
                  )}
                >
                  {cp.difficulty}
                </span>
                <span className="text-[10px] text-tech-400">by {cp.author.name}</span>
              </div>
              <h3 className="text-sm font-semibold text-white group-hover:text-emerald-400 transition-colors mb-1">
                {cp.title}
              </h3>
              <p className="text-xs text-tech-200 line-clamp-2 leading-relaxed">
                {cp.description}
              </p>

              {cp.revenue_impact && (
                <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mt-2">
                  <TrendingUp className="w-2.5 h-2.5" />
                  {cp.revenue_impact}
                </div>
              )}

              <div className="flex items-center gap-3 mt-2 text-[10px] text-tech-400">
                <span className="flex items-center gap-0.5">
                  <ThumbsUp className="w-3 h-3" />
                  {cp.upvotes}
                </span>
                <span className="flex items-center gap-0.5">
                  <MessageSquare className="w-3 h-3" />
                  {cp.steps.length} steps
                </span>
              </div>
            </div>
          </Link>
        ))}

        {related.length > 3 && (
          <Link
            href={`/community-playbook?query=${encodeURIComponent(toolName)}`}
            className="block text-center text-xs text-tech-300 hover:text-white transition pt-1"
          >
            + {related.length - 3} more playbooks
          </Link>
        )}
      </div>
    </section>
  );
}
