'use client';

import Link from 'next/link';
import {
  Bot,
  PenTool,
  Palette,
  Code,
  Zap,
  Search,
  Megaphone,
  Video,
  Music,
  BarChart3,
  HeadphonesIcon,
  DollarSign,
  GraduationCap,
  Heart,
  Compass,
  Building2,
  Workflow,
  Image,
  MessageCircle,
  Sparkles,
} from 'lucide-react';
import { CATEGORIES } from '@/lib/types';
import { toolsData } from '@/lib/data';

// Map category names to icons
const categoryIcons: Record<string, typeof Bot> = {
  'AI Agents': Bot,
  'Writing & Content': PenTool,
  'Design & Creative': Palette,
  'Code & Development': Code,
  'Productivity': Zap,
  'Research & Analysis': Search,
  'Marketing & SEO': Megaphone,
  'Video & Animation': Video,
  'Audio & Music': Music,
  'Data & Analytics': BarChart3,
  'Customer Support': HeadphonesIcon,
  'Sales & CRM': DollarSign,
  'Education & Learning': GraduationCap,
  'Health & Wellness': Heart,
  'Travel & Lifestyle': Compass,
  'Business Operations': Building2,
  'No-Code & Automation': Workflow,
  'Image Generation': Image,
  'Chatbots & Assistants': MessageCircle,
  'Other': Sparkles,
};

// Map slugs for URLs
const categorySlugs: Record<string, string> = {
  'AI Agents': 'ai-agents',
  'Writing & Content': 'writing-content',
  'Design & Creative': 'design-creative',
  'Code & Development': 'code-development',
  'Productivity': 'productivity',
  'Research & Analysis': 'research-analysis',
  'Marketing & SEO': 'marketing-seo',
  'Video & Animation': 'video-animation',
  'Audio & Music': 'audio-music',
  'Data & Analytics': 'data-analytics',
  'Customer Support': 'customer-support',
  'Sales & CRM': 'sales-crm',
  'Education & Learning': 'education-learning',
  'Health & Wellness': 'health-wellness',
  'Travel & Lifestyle': 'travel-lifestyle',
  'Business Operations': 'business-operations',
  'No-Code & Automation': 'nocode-automation',
  'Image Generation': 'image-generation',
  'Chatbots & Assistants': 'chatbots-assistants',
  'Other': 'other',
};

export default function FeaturedCategories() {
  // Count tools per category, exclude 'All Categories'
  const categoryCounts = CATEGORIES.filter((c) => c !== 'All Categories')
    .map((cat) => ({
      name: cat,
      count: toolsData.filter((t) => t.category === cat && t.is_published).length,
    }))
    .sort((a, b) => b.count - a.count);

  const IconComponent = ({ name, className }: { name: string; className?: string }) => {
    const Icon = categoryIcons[name] || Sparkles;
    return <Icon className={className || 'w-6 h-6'} />;
  };

  return (
    <section>
      <div className="mb-6 sm:mb-8">
        <h2 className="text-xl sm:text-2xl font-bold text-white">Featured Categories</h2>
        <p className="text-xs sm:text-sm text-tech-200 mt-1">Browse tools by category</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
        {categoryCounts.map((cat) => (
          <Link
            key={cat.name}
            href={`/tools?category=${encodeURIComponent(cat.name)}`}
            className="group relative flex flex-col items-center gap-2 p-4 sm:p-5 rounded-xl border border-tech-500/30 bg-tech-700/80 transition-all duration-300 hover:border-neon/30 hover:bg-tech-700 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-neon/5"
          >
            <div className="p-2.5 rounded-lg bg-tech-600/60 text-tech-100 group-hover:bg-neon/15 group-hover:text-neon-light transition-all duration-300">
              <IconComponent name={cat.name} />
            </div>
            <span className="text-xs sm:text-sm font-medium text-white text-center leading-tight">
              {cat.name}
            </span>
            <span className="text-[10px] sm:text-xs text-tech-300">
              {cat.count} {cat.count === 1 ? 'tool' : 'tools'}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
