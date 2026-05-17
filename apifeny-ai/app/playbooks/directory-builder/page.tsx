'use client';

import { useState, Suspense } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  Download,
  CheckCircle,
  BookOpen,
  Users,
  Target,
  Zap,
  TrendingUp,
  DollarSign,
  Star,
  Clock,
  Sparkles,
  Lightbulb,
  ChevronRight,
  ShoppingCart,
  FileText,
  Rocket,
  Search as SearchIcon,
  BarChart3,
  Globe,
  Search,
  Layers,
  Code,
  BarChart,
} from 'lucide-react';

interface Section {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  items: string[];
}

const sections: Section[] = [
  {
    id: 'niche',
    icon: <Search className="w-5 h-5 text-emerald-400" />,
    title: 'Niche Selection & Validation',
    description: 'Find a profitable niche using AI and a 5-factor validation framework.',
    items: [
      'Using Perplexity + ChatGPT to identify underserved directory opportunities',
      'The 5-factor niche scoring framework: search volume, CPC, competition, affiliate availability, growth trend',
      'How to validate demand before building anything',
      'Competitor analysis: what to look for in existing directories',
      'Avoiding trap niches with high competition but low monetization potential',
      'The ideal niche profile: 500-5K monthly searches, 3+ affiliate programs, 4%+ commissions',
    ],
  },
  {
    id: 'architecture',
    icon: <Layers className="w-5 h-5 text-cyan-400" />,
    title: 'Content Architecture & Data Model',
    description: 'Design the data structure that powers your directory.',
    items: [
      'Designing your entity model: what are you listing? (venues, tools, services, products)',
      'Core entity types: listings, categories, blog posts and how they relate',
      'Attribute mapping: what matters for rankings and filters?',
      'Ranking factor design with scoring weights',
      'Filter taxonomy: location, price, rating, category, features',
      'Using ChatGPT to design the schema and Claude to harden it',
    ],
  },
  {
    id: 'build',
    icon: <Code className="w-5 h-5 text-fuchsia-400" />,
    title: 'Build with Cursor + Next.js',
    description: 'Scaffold and build the directory using Cursor Agent mode.',
    items: [
      'Scaffolding a Next.js project with Tailwind CSS using Cursor Agent',
      'Dynamic routing: listing pages, category pages, blog pages',
      'Category filtering and search implementation',
      'Ranking and scoring display on listing cards and detail pages',
      'Affiliate link integration strategy',
      'SEO metadata generation for every page',
      'Using generateStaticParams for pre-rendered pages',
    ],
  },
  {
    id: 'ranking',
    icon: <BarChart className="w-5 h-5 text-amber-400" />,
    title: 'Implement the Ranking Algorithm',
    description: 'Build a multi-factor ranking system — your directory moat.',
    items: [
      'Community rating (35%): user reviews and star ratings',
      'Trending score (20%): recent engagement metrics',
      'Editorial picks (15%): curated selections by category',
      'Saves and bookmarks (10%): what users save signals quality',
      'Recency weighting (10%): newer listings get a temporary boost',
      'Regional relevance (10%): location-based ranking adjustments',
      'Storing rankings as a flat JSON file updated via build hook',
    ],
  },
  {
    id: 'monetization',
    icon: <DollarSign className="w-5 h-5 text-green-400" />,
    title: 'Affiliate Monetization Setup',
    description: 'Monetize through strategic affiliate commission placements.',
    items: [
      'Integrating affiliate programs: Booking.com, Klook, Viator, Agoda, Amazon, ShareASale',
      'Contextual placement within listing content',
      'Comparison tables with affiliate CTAs',
      'Featured and sponsored listing tiers',
      'Exit-intent discount popups with affiliate links',
      'Using rel="sponsored" nofollow for Google compliance',
    ],
  },
  {
    id: 'seo',
    icon: <TrendingUp className="w-5 h-5 text-sky-400" />,
    title: 'SEO & Content Automation',
    description: 'Drive organic traffic with automated SEO on autopilot.',
    items: [
      'Generating sitemap.xml programmatically for all listing and category pages',
      'AI blog content generation pipeline: 3-5 posts per week',
      'Internal linking strategy: every page links to 3+ related pages',
      'Schema.org markup for rich snippets (LocalBusiness, Product, FAQ)',
      'Cross-linking all directories in your portfolio for network effects',
    ],
  },
  {
    id: 'network',
    icon: <Globe className="w-5 h-5 text-violet-400" />,
    title: 'Cross-Site Network Effects',
    description: 'Build a portfolio of directories that feed each other traffic.',
    items: [
      'Shared footer with links to all sibling directory sites',
      'Navigation bar with portfolio dropdown',
      'Related content recommendations across different directories',
      'Unified search across the entire portfolio',
      'Cross-site blog posts that reference listings on other directories',
      'Traffic multiplier effect: each new directory boosts all existing ones',
    ],
  },
  {
    id: 'deploy',
    icon: <Rocket className="w-5 h-5 text-rose-400" />,
    title: 'Deploy & Monitor',
    description: 'Get your directory live and track performance.',
    items: [
      'Deploying to Vercel with custom domain setup',
      'Vercel Analytics + Speed Insights for performance tracking',
      'Google Search Console and GA4 configuration',
      'Uptime monitoring with betteruptime.com free tier',
      'Weekly traffic review with AI-generated insights',
    ],
  },
];
