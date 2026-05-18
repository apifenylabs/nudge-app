# ═══════════════════════════════════════════════════════════════
# APIFENY.AI — AI Tools, Agents & Playbooks Directory
# ═══════════════════════════════════════════════════════════════
# Project: apifeny.ai (apifenyai.com)
# Started: May 5, 2026
# Last build: May 6, 2026 — ALL FIVE PHASES COMPLETE
# ═══════════════════════════════════════════════════════════════

# ─── Phase Tracking ───
# PHASE_A: ✅ Monetization — affiliate-links.ts, AffiliateCTABar, SponsoredToolSpot, PriceComparisonTable
# PHASE_B: ✅ Cosme-Style Curation — TrendingTools badges, MustUseThisMonth, 4 collections, animated badges
# PHASE_C: ✅ Playbooks Section — lib/playbooks.ts (6 guides), playbook/[slug] pages, homepage section
# PHASE_D: ✅ Community Layer — ToolComments with localStorage, reviews, tips
# PHASE_E: ✅ Cross-Site Bridge — EV site header + badge, Luxury site botnav
# Tagline: Discover the best AI tools for every use case
# Core Differentiator: Asia-Ready insights + Cosme-style curation
# ═══════════════════════════════════════════════════════════════

# ─── Domain Strategy ───
DOMAIN_PRIMARY="apifeny.ai"
DOMAIN_SECONDARY="apifenyai.com"

# ─── Brand Voice ───
# Modern, futuristic, but approachable. Think "your AI concierge."
# Premium without being inaccessible. Smart without being intimidating.

# ═══════════════════════════════════════════════════════════════
# DATA PIPELINE (Phase 1)
# ═══════════════════════════════════════════════════════════════

# Source: Kaggle "AI Tools & Agents Directory" dataset
# Schema: tools table
tools_table: |
  CREATE TABLE tools (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    tagline TEXT,
    description TEXT,
    long_description TEXT,
    website_url TEXT,
    logo_url TEXT,
    category TEXT,          -- Primary category
    subcategories TEXT[],   -- Array for multiple
    pricing_tier TEXT,      -- Free / Freemium / Paid / Enterprise / Open Source
    pricing_min_usd NUMERIC,
    pricing_max_usd NUMERIC,
    use_cases TEXT[],       -- Array of use case tags
    agent_roles TEXT[],     -- Array (e.g., coding, writing, research)
    is_agentic BOOLEAN DEFAULT FALSE,
    is_multimodal BOOLEAN DEFAULT FALSE,
    has_api BOOLEAN DEFAULT FALSE,
    platform TEXT[],        -- Web, iOS, Android, API, Desktop
    
    -- Asia-specific enrichment
    asia_score INTEGER DEFAULT 0 CHECK (asia_score >= 0 AND asia_score <= 10),
    asia_ready BOOLEAN DEFAULT FALSE,
    supports_languages TEXT[],  -- Array of languages
    data_residency TEXT,        -- Where data is stored
    local_pricing_asia BOOLEAN DEFAULT FALSE,
    best_for_asia_use_case TEXT,
    cultural_fit_notes TEXT,
    
    -- Rankings & engagement
    avg_rating DECIMAL(3,2) DEFAULT 0,
    total_ratings INTEGER DEFAULT 0,
    trending_score INTEGER DEFAULT 0,  -- Weekly computed
    saves_count INTEGER DEFAULT 0,
    
    -- Playbook
    how_to_use_guide TEXT,
    playbook_use_cases TEXT[],
    playbook_steps JSONB,
    
    -- Metadata
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    is_published BOOLEAN DEFAULT TRUE,
    source TEXT DEFAULT 'manual'  -- kaggle, manual, user_submitted
  );

# Enrichment pipeline (weekly cron):
# 1. Scan curated AI news sources for new tools
# 2. Auto-categorize with LLM
# 3. Calculate Asia Score based on: language support, local pricing, data residency, popularity in Asia
# 4. Compute trending_score based on: new reviews + saves + page views (last 7 days)

# ═══════════════════════════════════════════════════════════════
# COLOR PALETTE — Futuristic AI / Tech
# ═══════════════════════════════════════════════════════════════

# Primary: Deep tech blue-black (#0A0A1A → #1A1A3E)
# Accent: Electric violet (#7C3AED)
# Secondary: Cyan (#06B6D4)
# Warm accent: Amber (#F59E0B)
# Background: Near-black (#050510), card bg (#111125), surface (#1A1A30)
# Text: White (#FFFFFF), muted (#94A3B8), subtle (#64748B)
# Success: Emerald (#10B981)
# Asia Score: Gold gradient (#FFD700 → #FFA500)

# ═══════════════════════════════════════════════════════════════
# SEO KEYWORDS (Primary)
# ═══════════════════════════════════════════════════════════════
SEO_PRIMARY:
  - "AI tools directory"
  - "best AI agents"
  - "AI tools for solopreneurs"
  - "AI tools for business"
  - "AI productivity tools"
  - "Asia-ready AI tools"
  - "AI playbooks"
  - "best AI for busy parents"

# ═══════════════════════════════════════════════════════════════
# AFFILIATE STRATEGY (from monetization-playbook.md)
# ═══════════════════════════════════════════════════════════════
MONETIZATION:
  - "Deep link to tool websites (direct affiliate where available)"
  - "Contextual recommendations: 'Try this AI tool + related playbook'"
  - "Price Comparison: Free vs Paid tier comparison widget"
  - "EPC tracking per tool category"
