// ═══════════════════════════════════════════════
// APIFENY.AI — Core Types & Constants
// ═══════════════════════════════════════════════

export interface Tool {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  description: string;
  long_description?: string;
  website_url: string;
  logo_url?: string;
  category: string;
  subcategories?: string[];
  pricing_tier: 'Free' | 'Freemium' | 'Paid' | 'Enterprise' | 'Open Source';
  pricing_min_usd?: number;
  pricing_max_usd?: number;
  use_cases?: string[];
  agent_roles?: string[];
  is_agentic: boolean;
  is_multimodal: boolean;
  has_api: boolean;
  platform?: string[];
  // Asia-specific
  asia_score: number;
  asia_ready: boolean;
  supports_languages?: string[];
  data_residency?: string;
  local_pricing_asia: boolean;
  best_for_asia_use_case?: string;
  // Rankings
  avg_rating: number;
  total_ratings: number;
  trending_score: number;
  saves_count: number;
  // Playbook
  how_to_use_guide?: string;
  playbook_use_cases?: string[];
  playbook_steps?: { title: string; description: string }[];
  // Metadata
  is_published: boolean;
  created_at: string;
  source: string;

  // ── Phase 2: Small Business & Solopreneur enrichment ──
  solopreneur_score?: number;        // 0-10 — how useful for solopreneurs/small biz
  best_for_smallbusiness_use_case?: string;  // e.g. "Content writing", "Code generation"
  local_language_support?: boolean;   // Does it support Asian languages well?
  supported_languages_detail?: string; // e.g. "Chinese, Japanese, Korean, Vietnamese"
  ai_ready?: boolean;                 // Plug-and-play or requires setup
  community_rating?: number;          // 0-5, from real Reddit/Trustpilot aggregation
  total_community_reviews?: number;   // Realistic count based on tool popularity
  how_to_use_guide_title?: string;    // Short title for the "How to Use" section
  best_for_pipeline_stage?: string;   // Which vibe coding pipeline stage: 'planning' | 'coding' | 'research' | 'content' | 'design' | 'testing' | 'marketing' | 'all-rounder'
  quick_start_steps?: { step: number; title: string; description: string }[]; // 3-5 quick steps
}

export type SortOption = 'trending' | 'rating' | 'name' | 'newest';

export interface FilterState {
  search: string;
  category: string;
  pricing: string;
  asiaReady: boolean | null;
  useCase: string;
  agentRole: string;
  agentic: boolean | null;
  multimodal: boolean | null;
  sortBy: SortOption;
}

export const CATEGORIES = [
  'All Categories',
  'AI Agents',
  'Writing & Content',
  'Design & Creative',
  'Code & Development',
  'Productivity',
  'Research & Analysis',
  'Marketing & SEO',
  'Video & Animation',
  'Audio & Music',
  'Data & Analytics',
  'Customer Support',
  'Sales & CRM',
  'Education & Learning',
  'Finance & Accounting',
  'Health & Wellness',
  'Travel & Lifestyle',
  'Business Operations',
  'No-Code & Automation',
  'Image Generation',
  'Chatbots & Assistants',
  'Other',
];

export const PRICING_TIERS = ['All Pricing', 'Free', 'Freemium', 'Paid', 'Enterprise', 'Open Source'];

export const USE_CASES = [
  'Content Creation',
  'Code Generation',
  'Data Analysis',
  'Customer Support',
  'Marketing',
  'Sales',
  'Research',
  'Productivity',
  'Design',
  'Video Production',
  'Audio Production',
  'Automation',
  'Education',
  'Travel Planning',
  'Family Management',
];

export const AGENT_ROLES = [
  'Writing Assistant',
  'Code Assistant',
  'Design Assistant',
  'Research Assistant',
  'Marketing Agent',
  'Sales Agent',
  'Customer Support Agent',
  'Data Analyst',
  'Project Manager',
  'Personal Assistant',
  'Travel Agent',
  'Finance Agent',
];
