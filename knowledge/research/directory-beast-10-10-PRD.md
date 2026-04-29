# Directory Beast — Master Template Directory PRD

**Product Requirements Document — 10/10 Vision**

```yaml
project: "Directory Beast — Master Template Directory"
version: "2.3 (Sticky Family Metrics - CEO approved)"
date: "2026-04-29"
based_on_brd: "PRD_TEMPLATE.md"
status: "Active Development"
```

## CEO Directives (2026-04-29)

1. **Remove EV Nearby badges from Directory Beast cards.** EV features belong in EV Charging Asia only. These tags add zero value for family travelers.
2. **Redesign landing page cards to show metrics parents actually care about:** age suitability, kid-friendly amenities, safety score, number of parent reviews, family tips count. Make the directory sticky/addictive so users return every trip-planning cycle.
3. **All changes must follow pipeline:** PO updates PRD → Coder builds → UI Agent reviews → Tester runs full tests → Reviewer code review → Chief Editor sign-off → Deploy. No exceptions.

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Current State (As-Is)](#2-current-state-as-is)
3. [User Personas](#3-user-personas)
4. [Target 10/10 State — Feature Catalog](#4-target-1010-state--feature-catalog)
5. [User Stories & Acceptance Criteria](#5-user-stories--acceptance-criteria)
6. [Features — Detailed Specifications](#6-features--detailed-specifications)
7. [Non-Functional Requirements](#7-non-functional-requirements)
8. [Technical Architecture](#8-technical-architecture)
9. [Data Model](#9-data-model)
10. [API Routes](#10-api-routes)
11. [Route Design](#11-route-design)
12. [Design Requirements](#12-design-requirements)
13. [SEO Requirements](#13-seo-requirements)
14. [Monetization Strategy](#14-monetization-strategy)
15. [Risk Register & Mitigation](#15-risk-register--mitigation)
16. [Implementation Priority & Phases](#16-implementation-priority--phases)
17. [Template Reusability](#17-template-reusability)
18. [Success Measurement](#18-success-measurement)
19. [Approvals](#19-approvals)
20. [Appendix: Codebase Audit](#20-appendix-codebase-audit)

---

## 1. Project Overview

### 1.1 Vision
Directory Beast is the **master template** for building any directory-style web app. It provides a complete, production-ready Next.js application that can be forked and customized for any niche — family travel, restaurants, dog parks, coworking spaces, rental properties — by swapping data, branding, and content. Every component, API route, and service is built for **reuse with zero structural changes**.

### 1.2 Seed Project
The initial implementation is the **Asia Family Travel Directory** (`/home/captain/.openclaw/workspace/family-travel-directory/`), a working Next.js app with:
- 506+ family travel destinations across Asia, Europe, the Americas, Oceania, and Africa
- Full-text search, age-range filters, category filters, safety ratings
- Blog section with SEO-optimized articles
- Google AdSense monetization (2 slots per destination page)
- Schema.org structured data for destinations
- Sitemap (static pages, cities, categories, destinations)
- Responsive mobile-first design

### 1.3 Template Goals
1. **Zero-code forkability**: New directory = change data file, update branding, deploy
2. **All common directory features built-in**: Search, filter, sort, maps, reviews, user accounts, bookmarks, monetization
3. **Skill Economy compliant**: Max 300 lines per component, max 5000 lines per service
4. **Performance by default**: All pages < 2s Lighthouse load
5. **SEO-native**: 100/100 Lighthouse SEO score, Schema.org everywhere

### 1.4 Success Criteria
- A new directory can be launched with under 1 hour of development work
- 10+ forked directories deployed within 6 months of template completion
- Each forked directory independently monetizable (AdSense, affiliate, premium)
- Template itself is a commercial product sold on a marketplace

---

## 2. Current State (As-Is)

### 2.1 Application Overview
```
Family Travel Directory
├── App Router (Next.js 14.2.4 + App Router)
├── TypeScript (strict mode)
├── Tailwind CSS v4
├── Supabase (connected but primarily JSON-driven)
├── Mapbox GL JS (leaflet available as alternative)
├── Google AdSense
└── Lucide React icons
```

### 2.2 Existing Routes
| Route | Type | Status | Details |
|-------|------|--------|---------|
| `/` | Homepage | ✅ Done | hero, search, filters, destination cards, stats, blog preview, CTA, footer |
| `/destination/[slug]` | Destination Detail | ✅ Done | hero, age breakdown, attractions, tips, reviews, affiliate cards, related destinations |
| `/blog` | Blog List | ✅ Done | blog card grid, tag cloud, CTA |
| `/blog/[slug]` | Blog Post | ✅ Done | full article render |
| `/review` | Review Moderation | ⚠️ Skeleton | photo moderation queue (requires auth) |
| `/api/test-data` | API | ✅ Done | test endpoint |
| `/api/review-photo` | API | ⚠️ Skeleton | CRUD for photo submissions |
| `/health` | API | ✅ Done | health check |
| `/sitemap.ts` | Sitemap | ✅ Done | dynamic sitemap from destinations |
| `/robots.ts` | Robots | ✅ Done | robots.txt |

### 2.3 Existing Components
| Component | Lines | Status | Notes |
|-----------|-------|--------|-------|
| `page-content.tsx` | 494 | ✅ Done | monolithic homepage (too large, >300 target) |
| `Header.tsx` | 192 | ✅ Done | sticky header, mobile menu, region selector, search, saved, sign in |
| `FilterSidebar.tsx` | — | ⚠️ Partial | used in some iterations |
| `SearchBar.tsx` | — | ⚠️ Partial | embedded in hero |
| `MapContainer.tsx` | — | ✅ Done | Mapbox integration |
| `SimpleMapContainer.tsx` | — | ✅ Done | Leaflet fallback |
| `AdUnit.tsx` | 49 | ✅ Done | AdSense wrapper component |
| `BusinessListingCard.tsx` | — | ✅ Done | listing card component |

### 2.4 Existing Lib Files
| File | Lines | Purpose |
|------|-------|---------|
| `lib/getData.ts` | 33 | Server-side metadata extraction from JSON |
| `lib/blog-data.ts` | 65 | Blog post loading from `data/blog/*.json` |
| `lib/supabase.ts` | 200 | Supabase client with query helpers |
| `lib/supabase-client.ts` | 180 | Alternative Supabase client (legacy) |
| `lib/database.types.ts` | 79 | Supabase Database typescript definitions |

### 2.5 Current Data
- **Destinations**: 506+ in `public/data/destinations.json` (global coverage)
- **Blog posts**: 3 SEO articles in `data/blog/*.json`
- **City activity data**: Multiple city-specific JSON files in `data/` and `public/data/`
- **Stats**: `data/population-stats.json`

### 2.6 Current Monetization
- ✅ Google AdSense (ca-pub-6046953221141245) — 2 slots per destination page
- ❌ Affiliate links — data structure has fields but no live links
- ❌ Premium accounts — not implemented
- ❌ Featured listings — not implemented

### 2.7 Gaps vs 10/10 Vision
| Feature | Current | Target |
|---------|---------|--------|
| User Accounts | ❌ Not implemented | Sign up, login, profiles, bookmarks |
| Parent Reviews | ⚠️ Skeleton (`/review` page) | Full review form, star ratings, moderation, verified badges |
| Advanced Search | ⚠️ Basic text + filters | Full-text, multi-select, sort, map view |
| Maps | ✅ Mapbox + Leaflet | Integrated into search results |
| Hero Section | ✅ Static gradient | Animated, live stats, CTA |
| Monetization | ✅ AdSense only | AdSense + affiliate + premium + featured |
| Programmatic SEO | ✅ Sitemap + Schema | Country pages, age pages, category pages |
| Template Reusability | ❌ Hardcoded to travel | Extracted `lib/template/*` |
| Component Size | ❌ `page-content.tsx` = 494 lines | Max 300 lines per component |
| TypeScript Strict | ✅ Already on | Maintain |

---

## 3. User Personas

```yaml
user_personas:
  - name: "Busy Parent Planner"
    description: "A parent planning a family vacation. Wants honest, unfiltered reviews from other parents, not generic travel guide content. Short on time, wants quick answers."
    goals:
      - "Find age-appropriate destinations quickly"
      - "Read real parent reviews, not marketing copy"
      - "Save/bookmark promising destinations"
      - "Book activities through trusted affiliate links"
    pain_points:
      - "Too many travel sites with generic content"
      - "TripAdvisor reviews often not relevant for families with kids"
      - "Wastes hours researching what's actually kid-safe"
    scenarios:
      - "Planning a trip to Tokyo with a 4-year-old and 7-year-old"
      - "Filtering by 'safe for toddlers' while commuting"

  - name: "Contributing Parent"
    description: "A parent who has visited a destination and wants to share tips, photos, and reviews with the community. Motivated by helping other parents."
    goals:
      - "Write detailed reviews of family destinations"
      - "Upload photos from family trips"
      - "Earn 'Verified Parent' badge and community recognition"
      - "Track which of their reviews are most helpful"
    pain_points:
      - "Review forms are too complex or take too long"
      - "No incentive to contribute (no gamification)"
      - "Photos upload process is slow"
    scenarios:
      - "Returning from a Bali trip, wants to share tips same evening"
      - "Wants to upload 5 photos from a Hong Kong Disneyland visit"

  - name: "Template Buyer / Agency"
    description: "A developer or agency buying the Directory Beast template to deploy niche directories. Needs zero-code forking, clear documentation, and customization guide."
    goals:
      - "Fork and deploy a new directory in under 1 hour"
      - "Customize branding, data, and monetization without code changes"
      - "White-label the template for client projects"
      - "Monetize through affiliate links and premium features"
    pain_points:
      - "Most templates require extensive code changes to rebrand"
      - "Hard to extract common logic from niche-specific code"
      - "Poor documentation for customization"
    scenarios:
      - "Building a 'Best Dog Parks NYC' directory for a client"
      - "Deploying 5 niche directories for an SEO agency"

  - name: "Directory Admin / Moderator"
    description: "The site owner or appointed moderator who manages user submissions, reviews spam, and oversees monetization."
    goals:
      - "Approve or reject user-submitted reviews and photos"
      - "Manage featured/boosted listings"
      - "Monitor affiliate link performance"
      - "Review moderation queue efficiently"
    pain_points:
      - "Review spam is time-consuming to manage"
      - "No dashboard for monitoring monetization"
    scenarios:
      - "Checking the moderation queue every morning"
      - "Creating a featured listing package for a new partner"

  - name: "Premium Subscriber"
    description: "A power user who pays for premium to remove ads, get printable guides, and early access to new destinations."
    goals:
      - "Ad-free browsing experience"
      - "Download printable trip guides"
      - "Get early access to new destinations"
      - "Save unlimited bookmarks"
    pain_points:
      - "Ads on destination pages are distracting with kids around"
      - "Wants offline access to destination info during travel"
    scenarios:
      - "Subscribing to Premium for a month-long Asia trip"
      - "Printing destination guides for a road trip without cell service"
```

---

## 4. Target 10/10 State — Feature Catalog

### 4.1 Core Directory (Current)
- ✅ 506+ destinations across multiple regions
- ✅ Search bar with real-time filtering
- ✅ Age range filter (0-3, 4-6, 7-12, 13+)
- ✅ Category filters (Theme Parks, Nature, Cultural)
- ✅ Safety ratings (1-5 scale)
- ✅ Price range indicators
- ✅ Sort by popularity, safety, price
- ✅ Stats counter (destinations, cities, tips)
- ✅ Destination detail page with hero, age breakdown, tips, practical info
- ✅ Related destinations carousel

### 4.2 User Accounts (Phase 1)
- [ ] Sign up / login (Supabase Auth)
- [ ] Email/password authentication
- [ ] Google OAuth / social login
- [ ] User profile page (parent name, kids' ages, home city, avatar)
- [ ] Saved/bookmarked destinations (CRUD)
- [ ] Review/submission history
- [ ] Password reset flow
- [ ] Email verification flow

### 4.3 Parent Reviews (Phase 2)
- [ ] Review form per destination
- [ ] Star ratings: overall + per category (safety, fun, value, food)
- [ ] Review title and text body
- [ ] Kid ages at time of visit
- [ ] Photo upload per review (up to 5)
- [ ] Review moderation queue (admin panel)
- [ ] "Verified Parent" badge (email-verified reviewer)
- [ ] Review helpfulness votes (upvote/downvote)
- [ ] Review sorting: newest, highest rated, most helpful
- [ ] Review reporting (inappropriate/spam)

### 4.4 Advanced Search & Filters (Phase 3)
- [ ] Full-text search across destinations, tips, reviews, blog
- [ ] Multi-select filters: age range, category, country, price range, safety
- [ ] Sort by: popularity, safety, price, newest, most reviewed
- [ ] Map view (Leaflet/Mapbox) with pins for filtered results
- [ ] Search suggestions / autocomplete
- [ ] Recent searches (saved locally)
- [ ] "Refine search" link on destination pages
- [ ] Search results page with grid/list toggle

### 4.5 Hero Section Redesign (Phase 4)
- [ ] Animated gradient or particle background
- [ ] Search bar prominently placed in hero
- [ ] Quick action buttons (top destinations, popular categories)
- [ ] Live stats counter (animated: destinations, cities, tips)
- [ ] CTA for user contribution ("Share your experience")
- [ ] Dynamic background images cycling through top destinations
- [ ] Tagline rotation based on visitor segment

### 4.6 Monetization (Phase 5)
- [ ] AdSense (already done)
- [ ] Affiliate links: Booking.com, Klook, Agoda, car rentals, travel insurance
- [ ] Featured/boosted listings (pay for top placement)
- [ ] Premium account:
  - Remove ads
  - Early access to new destinations
  - Printable PDF guides
  - Unlimited bookmarks
  - Priority review moderation
- [ ] Affiliate disclosure notices (compliance)
- [ ] Revenue dashboard (admin view)

### 4.7 SEO & Content (Cross-phase)
- [ ] Blog auto-generation from destination data (already started)
- [ ] Programmatic SEO pages:
  - By country (`/country/japan`)
  - By age range (`/age/0-3`)
  - By category (`/category/theme-parks`)
  - By city (`/city/tokyo`)
- [ ] Schema.org structured data for every destination (done)
- [ ] Schema.org for blog posts (done)
- [ ] Sitemap for blog + destinations (done)
- [ ] Social sharing cards per destination (done)
- [ ] BreadcrumbList schema (done)
- [ ] FAQ page schema (future)
- [ ] HowTo schema for travel guides (future)

---

## 5. User Stories & Acceptance Criteria

```yaml
user_stories:
  # ── Phase 1: User Accounts ──
  - as_a: "visitor"
    i_want: "to create an account with my email or Google"
    so_that: "I can save destinations and write reviews"
    priority: "P0"
    acceptance_criteria:
      - "Sign-up form accepts email + password"
      - "Google OAuth button works"
      - "Email verification sent on signup"
      - "Error messages shown for invalid email / weak password"
      - "Redirect to last page after login"
      - "Password reset flow sends email"

  - as_a: "signed-in user"
    i_want: "to view and edit my profile"
    so_that: "other parents know my context (kids' ages, home city)"
    priority: "P0"
    acceptance_criteria:
      - "Profile page shows name, email, kids' ages, home city, avatar"
      - "Editable fields save to Supabase"
      - "Avatar upload (max 2MB, jpg/png)"
      - "Kids' ages: array of numbers 0-18"

  - as_a: "signed-in user"
    i_want: "to bookmark destinations"
    so_that: "I can find them later when planning my trip"
    priority: "P0"
    acceptance_criteria:
      - "Heart icon on destination card toggles bookmark"
      - "Bookmarked destinations appear on /account/saved"
      - "Un-bookmark removes from saved list"
      - "Bookmark persists across sessions"
      - "Maximum 500 bookmarks per user"

  # ── Phase 2: Parent Reviews ──
  - as_a: "signed-in user"
    i_want: "to write a review for a destination I visited"
    so_that: "other parents can benefit from my experience"
    priority: "P0"
    acceptance_criteria:
      - "Review form accessible from destination page"
      - "Fields: title, text body, overall rating, category ratings (safety, fun, value, food)"
      - "Kid ages at time of visit (multi-select or number input)"
      - "Photo upload (up to 5, max 5MB each)"
      - "Submit sends to moderation queue"
      - "Success message shown; review appears as 'pending' until approved"

  - as_a: "admin"
    i_want: "to moderate reviews before they go live"
    so_that: "spam and inappropriate content doesn't appear on the site"
    priority: "P0"
    acceptance_criteria:
      - "Admin panel at /admin/reviews shows pending reviews"
      - "Each review shows: destination, user, rating, text, photos, date"
      - "Actions: approve, reject (with reason), delete"
      - "Approved reviews appear on destination page"
      - "Rejected reviews notify user via email"
      - "Bulk approve/reject for obvious spam"

  - as_a: "signed-in user"
    i_want: "to see a 'Verified Parent' badge on my reviews"
    so_that: "other parents trust my recommendations more"
    priority: "P1"
    acceptance_criteria:
      - "Badge shown next to verified users on reviews"
      - "Verification = email verified + at least 1 published review"
      - "Badge appears on profile page, review cards, and comment sections"
      - "Tooltip explains 'This parent's email has been verified'"

  # ── Phase 3: Advanced Search ──
  - as_a: "parent planner"
    i_want: "to search across all destinations using natural language"
    so_that: "I can find 'something fun for a 5-year-old in Tokyo'"
    priority: "P0"
    acceptance_criteria:
      - "Full-text search covers name, description, tips, reviews, city, country"
      - "Results show relevance score and match highlights"
      - "Search is debounced (300ms) for real-time feel"
      - "Empty results show helpful suggestions"
      - "Search works on all pages via the header search bar"

  - as_a: "parent planner"
    i_want: "to see destinations on a map"
    so_that: "I can understand the geography and plan my route"
    priority: "P1"
    acceptance_criteria:
      - "Map view toggles on search results page"
      - "Map pins show filtered destinations"
      - "Pin click shows destination name, category, safety rating popup"
      - "Popup has link to destination page"
      - "Map auto-zooms to fit all pins"
      - "Mapbox key configurable via env var"

  # ── Phase 4: Hero Redesign ──
  - as_a: "first-time visitor"
    i_want: "to be impressed by the hero section"
    so_that: "I immediately understand the value and start using the directory"
    priority: "P1"
    acceptance_criteria:
      - "Animated gradient or particle background loads within 500ms"
      - "Search bar is the hero's primary focus"
      - "Quick action buttons lead to curated content"
      - "Live stats counter animates on scroll/load"
      - "CTA button for user contribution is visible but secondary"
      - "Hero is fully responsive on mobile"
      - "No jarring layout shifts during hero animation"

  # ── Phase 5: Monetization ──
  - as_a: "visitor"
    i_want: "to book activities through affiliate links"
    so_that: "I get the best price and support the directory"
    priority: "P1"
    acceptance_criteria:
      - "Affiliate links clearly marked with 'Affiliate' badge"
      - "Links open in new tab with nofollow"
      - "Declared affiliate disclosure visible on each page"
      - "Links for: Booking.com, Klook, Agoda, rental cars, insurance"
      - "No dead links — all redirects verified at build time"

  - as_a: "power user"
    i_want: "to upgrade to Premium"
    so_that: "I can remove ads and download printable guides"
    priority: "P2"
    acceptance_criteria:
      - "Premium tier visible on pricing page"
      - "Stripe/Paddle integration for payments"
      - "Ad-free experience for premium users"
      - "Printable PDF guide generation"
      - "Early access badge on new destinations"
      - "Premium lock icon on restricted features"

  # ── Template Buyer ──
  - as_a: "template buyer"
    i_want: "to fork the template and rebrand in under 1 hour"
    so_that: "I can deploy my niche directory quickly"
    priority: "P0"
    acceptance_criteria:
      - "All branding in single config file (branding.json)"
      - "No hardcoded strings related to parent niche"
      - "Data schema is generic; niche-specific labels in config"
      - "Clear README with fork-and-deploy instructions"
      - "Example data file provided for testing"
      - "All environment variables documented"
```

---

## 6. Features — Detailed Specifications

### 6.1 User Accounts & Auth

```yaml
features:
  - name: "Authentication System"
    description: "Complete auth flow using Supabase Auth. Supports email/password and Google OAuth. Includes email verification, password reset, session management."
    priority: "P0"
    requirements:
      - "Supabase Auth configured with email + Google providers"
      - "Auth UI component (login, signup, password reset forms)"
      - "Protected route middleware redirects unauthenticated users"
      - "Session persisted via cookies (Supabase SSR helpers)"
      - "User profile created on first signup"
      - "Rate limiting on login attempts"
      - "CSRF protection on auth endpoints"
    success_metrics:
      - metric: "Signup completion rate"
        target: ">60% of initiated signups"
        timeframe: "post-launch 1 month"
      - metric: "Return login rate"
        target: ">30% of signed-up users return within 7 days"
        timeframe: "post-launch 1 month"

  - name: "User Profile Management"
    description: "User profile with editable fields, avatar upload, and preferences."
    priority: "P0"
    requirements:
      - "Route: /account/profile"
      - "Fields: display name, bio, home city, kids' ages (array), avatar URL"
      - "Avatar upload to Supabase Storage (public bucket)"
      - "Form validation on all fields"
      - "Delete account option (with confirmation)"
    success_metrics:
      - metric: "Profile completion rate"
        target: ">40% of users fill in kids' ages"
        timeframe: "post-launch 1 month"

  - name: "Bookmarked/Saved Destinations"
    description: "Users can bookmark destinations for later reference. Bookmarks are synced to Supabase and shown on the account page."
    priority: "P0"
    requirements:
      - "Toggle bookmark via heart icon on cards and destination page"
      - "Bookmarks table: user_id, destination_id, created_at"
      - "Route: /account/saved"
      - "Saved page shows grid of bookmarked destinations"
      - "Opt-in to email notification when bookmarked destination gets new reviews"
      - "Export bookmarks as CSV"
    success_metrics:
      - metric: "Average bookmarks per user"
        target: ">5 in first 30 days"
        timeframe: "post-auth launch 1 month"
```

### 6.2 Parent Reviews

```yaml
  - name: "Review Submission System"
    description: "Full review form with star ratings, text, photos, and kid ages. Submitted reviews go to moderation queue."
    priority: "P0"
    requirements:
      - "Review form accessible via 'Write a review' button on destination page"
      - "Star rating widget: overall (1-5) + per category (safety, fun, value, food)"
      - "Required: title (max 100 chars), text body (min 50 chars)"
      - "Optional: kid ages at visit (multi-select), photos (up to 5)"
      - "Photo upload to Supabase Storage, compressed client-side"
      - "Spam detection: min length, rate limit (1 review per 5 min), basic keyword filter"
      - "Moderation status: pending, approved, rejected"
      - "Email notification to user when review is approved/rejected"
    success_metrics:
      - metric: "Reviews per 100 visitors"
        target: ">2"
        timeframe: "post-launch 1 month"
      - metric: "Moderation queue < 48h turnaround"
        target: ">90% reviewed within 48 hours"
        timeframe: "ongoing"

  - name: "Review Display & Sorting"
    description: "Reviews appear on destination pages with sorting, pagination, and helpfulness voting."
    priority: "P0"
    requirements:
      - "Reviews section on destination page, below tips"
      - "Sort by: newest, highest rated, most helpful"
      - "Paginated: 10 reviews per page"
      - "Each review shows: user name, badge, date, rating stars, text, photos, kid ages"
      - "Helpfulness: upvote/downvote buttons (one per user per review)"
      - "Photo gallery view (lightbox when clicking photos)"
      - "Verified badge next to email-verified users"
    success_metrics:
      - metric: "Reviews with photo rate"
        target: ">25% of reviews include at least one photo"
        timeframe: "post-launch 3 months"
```

### 6.3 Advanced Search

```yaml
  - name: "Full-Text Search"
    description: "Client-side + server-side full-text search across all content types. Supports natural language queries."
    priority: "P0"
    requirements:
      - "Client-side Fuse.js for instant filtering of loaded destinations"
      - "Server-side Supabase full-text search for large datasets (>1000 entries)"
      - "Search scope: name, description, tips, reviews, city, country, category, tags"
      - "Search suggestions: top 5 matches shown in dropdown as user types"
      - "Recent searches stored in localStorage (last 10)"
      - "Search results page at /search?q=..."
      - "Highlight matched terms in results"
    success_metrics:
      - metric: "Users who use search"
        target: ">40% of visits use search"
        timeframe: "post-launch 1 month"
      - metric: "Search to result click rate"
        target: ">30%"
        timeframe: "post-launch 1 month"

  - name: "Multi-Select Filters"
    description: "Advanced filter sidebar with multi-select for age range, category, country, price range, safety rating."
    priority: "P0"
    requirements:
      - "Filter sidebar on homepage and search results page"
      - "Multi-select chips for: age range, category, country, price range"
      - "Safety rating slider or star selector (min rating filter)"
      - "Active filters shown as removable chips above results"
      - "Filter state persisted in URL query params (shareable)"
      - "'Clear all' button"
      - "Mobile: filter drawer/overlay instead of sidebar"
    success_metrics:
      - metric: "Filter usage rate"
        target: ">25% of visits use at least one filter"
        timeframe: "post-launch 1 month"

  - name: "Map View Integration"
    description: "Map view of filtered destinations using Mapbox or Leaflet. Pins with destination info popups."
    priority: "P1"
    requirements:
      - "Toggle between grid and map view on search results"
      - "Map pins colored by category"
      - "Pin popup shows: name, image thumbnail, category, safety rating, link"
      - "Cluster pins when zoomed out"
      - "Map filters sync with filter bar (re-filter on map)"
      - "User location marker (with permission)"
      - "Mapbox key in env var (default to Leaflet-free-tiles fallback)"
    success_metrics:
      - metric: "Map view usage rate"
        target: ">15% of search visitors toggle map view"
        timeframe: "post-launch 3 months"
```

### 6.4 Hero Section

```yaml
  - name: "Modern Animated Hero"
    description: "High-impact hero section with animated background, prominent search bar, quick actions, and live stats."
    priority: "P1"
    requirements:
      - "Animated gradient background (CSS-only, no JS library — keeps bundle small)"
      - "or Particle/canvas background (lazy-loaded, degrades gracefully)"
      - "Search bar as hero focal point (same as current but larger)"
      - "Quick action buttons: 'Top 10 Destinations', 'Best for Toddlers', 'Free Activities'"
      - "Live stats counter: destinations count, cities, tips (animated number increment)"
      - "CTA for user contribution: 'Share your experience — write a review'"
      - "Hero height: 70vh on desktop, 50vh on mobile"
      - "Smooth parallax scroll effect"
      - "Sub-500ms First Contentful Paint (static gradient first, JS enhancements after)"
    success_metrics:
      - metric: "Hero engagement (search or button click)"
        target: ">60% of visitors interact with hero elements"
        timeframe: "post-launch 1 month"
```

### 6.5 Programmatic SEO Pages

```yaml
  - name: "Country Pages"
    description: "Programmatic SEO pages for each country with relevant destinations, stats, and content."
    priority: "P0"
    requirements:
      - "Route: /country/[country-slug]"
      - "Shows all destinations in that country"
      - "Country stats: total destinations, average safety rating, top categories"
      - "Schema: Country + ItemList"
      - "Meta description auto-generated from data"

  - name: "Age Range Pages"
    description: "Programmatic pages for each age group with filtered destinations."
    priority: "P1"
    requirements:
      - "Route: /age/[age-slug] (0-3, 4-6, 7-12, 13+)"
      - "Shows all destinations suitable for that age range"
      - "Age-specific tips and advice section (dynamic)"
      - "Schema: ItemList with audience spec"
      - "Meta optimized for '[age] travel [location]' keywords"

  - name: "Category Pages"
    description: "Programmatic pages for each category (Theme Parks, Nature, Cultural)."
    priority: "P1"
    requirements:
      - "Route: /category/[category-slug]"
      - "Shows all destinations in that category"
      - "Category description (dynamic, from first N destinations)"
      - "Schema: ItemList"
      - "Meta optimized for 'best [category] for families' keywords"
```

### 6.6 Template Reusability (Cross-cutting)

```yaml
  - name: "Template Configuration System"
    description: "Single configuration file that defines all niche-specific branding, labels, and behavior. Changing config should be sufficient for most customizations."
    priority: "P0"
    requirements:
      - "Config file: `template.config.ts` or `template.config.json`"
      - "Configurable: site name, description, logo, colors, primary category labels"
      - "Configurable: data source (JSON path or Supabase table name)"
      - "Configurable: feature flags (enable/disable auth, reviews, maps, etc.)"
      - "Configurable: monetization (AdSense ID, affiliate networks, premium price)"
      - "Configurable: SEO defaults (meta patterns, schema types)"
      - "README with step-by-step fork guide"

  - name: "Shared Template Library"
    description: "All common logic extracted to `lib/template/` — components, hooks, utils that are niche-agnostic."
    priority: "P0"
    requirements:
      - "`lib/template/TemplateProvider.tsx` — React context for config"
      - "`lib/template/useTemplateConfig.ts` — hook to access config"
      - "`lib/template/ItemCard.tsx` — generic card component"
      - "`lib/template/ItemDetail.tsx` — generic detail page layout"
      - "`lib/template/FilterBar.tsx` — generic filter component"
      - "`lib/template/SearchInput.tsx` — generic search component"
      - "`lib/template/MapView.tsx` — generic map component"
      - "`lib/template/useData.ts` — generic data fetching hook"
      - "`lib/template/types.ts` — shared type definitions"
      - "Each component: max 300 lines, single responsibility"
```

---

## 7. Non-Functional Requirements

```yaml
non_functional_requirements:
  - category: "Performance"
    requirement: "All pages achieve < 2s Lighthouse load time on mobile (3G throttled)"
  - category: "Performance"
    requirement: "First Contentful Paint (FCP) < 1s"
  - category: "Performance"
    requirement: "Largest Contentful Paint (LCP) < 2s"
  - category: "Performance"
    requirement: "Cumulative Layout Shift (CLS) < 0.1"
  - category: "Performance"
    requirement: "First Input Delay (FID) / Interaction to Next Paint (INP) < 100ms"
  - category: "Performance"
    requirement: "Initial JS bundle < 150KB gzipped"
  - category: "Performance"
    requirement: "All images lazy-loaded with blur placeholder"
  - category: "Performance"
    requirement: "Static pages ISR revalidated every 60 minutes"
  - category: "Performance"
    requirement: "API responses < 200ms at P95"

  - category: "SEO"
    requirement: "100/100 Lighthouse SEO score on all pages"
  - category: "SEO"
    requirement: "Valid sitemap.xml for all dynamic routes"
  - category: "SEO"
    requirement: "robots.txt with correct sitemap URL"
  - category: "SEO"
    requirement: "Schema.org JSON-LD on every destination page"
  - category: "SEO"
    requirement: "Schema.org BreadcrumbList on every page"
  - category: "SEO"
    requirement: "OpenGraph + Twitter Card meta tags on every public page"
  - category: "SEO"
    requirement: "Canonical URLs on all pages"
  - category: "SEO"
    requirement: "Programmatic meta titles and descriptions (no duplicates)"

  - category: "Accessibility"
    requirement: "WCAG 2.1 AA compliant (color contrast, keyboard nav, screen reader)"
  - category: "Accessibility"
    requirement: "All interactive elements keyboard-accessible"
  - category: "Accessibility"
    requirement: "All images have alt text"
  - category: "Accessibility"
    requirement: "Focus indicators visible on all interactive elements"
  - category: "Accessibility"
    requirement: "Touch targets at least 44×44px on mobile"
  - category: "Reliability"
    requirement: "99.9% uptime for public pages"
  - category: "Reliability"
    requirement: "Graceful fallback when Supabase is unreachable (data from JSON cache)"
  - category: "Reliability"
    requirement: "Form submissions retried up to 3 times on network failure"
  - category: "Security"
    requirement: "All API routes rate-limited (100 req/min per IP)"
  - category: "Security"
    requirement: "Supabase RLS policies enforced on all tables"
  - category: "Security"
    requirement: "Auth tokens never stored in localStorage"
  - category: "Security"
    requirement: "File uploads: max 5MB, type-restricted to images"
  - category: "Code Quality"
    requirement: "TypeScript strict mode with no @ts-ignore"
  - category: "Code Quality"
    requirement: "Components max 300 lines (Skill Economy)"
  - category: "Code Quality"
    requirement: "Services max 5000 lines (Skill Economy)"
  - category: "Code Quality"
    requirement: "All data fetching through typed API layer"
  - category: "Code Quality"
    requirement: "ESLint + Prettier enforced in CI"
  - category: "Code Quality"
    requirement: "Unit test coverage > 80% core services"

---

## 8. Technical Architecture

```yaml
technology_stack:
  frontend:
    framework: "Next.js 14.2.4 (App Router)"
    language: "TypeScript (strict mode)"
    styling: "Tailwind CSS v4"
    icons: "Lucide React"
    maps: "Mapbox GL JS (primary), Leaflet (fallback)"
    animations: "Tailwind animations + CSS keyframes (no Framer Motion — keeps bundle small)"

  backend:
    auth: "Supabase Auth (email + Google OAuth)"
    database: "Supabase PostgreSQL (free tier, with local pg for dev)"
    storage: "Supabase Storage (review photos, avatars)"
    hosting: "Vercel (current), Netlify as alternative"

  data:
    primary: "public/data/destinations.json (static JSON at build time)"
    dynamic: "Supabase tables (reviews, bookmarks, users)"
    hybrid: "Static JSON for destinations, Supabase for user-generated content"

  templating:
    config: "template.config.ts (single source of truth for niche customization)"
    lib: "lib/template/* (reusable components, hooks, types)"
    app: "app/* (niche-specific pages that consume template library)"

---

## 9. Data Model

```yaml
database:
  schema: "public"
  tables:
    - name: "profiles"
      description: "User profiles extending Supabase auth.users"
      columns:
        - id: "uuid (PK, FK → auth.users.id)"
        - display_name: "text"
        - home_city: "text"
        - kids_ages: "integer[]"
        - avatar_url: "text"
        - bio: "text"
        - is_verified: "boolean (default false)"
        - created_at: "timestamptz"
        - updated_at: "timestamptz"
      rls: "Users can read all profiles, update only own"

    - name: "bookmarks"
      description: "User bookmarks/saved destinations"
      columns:
        - id: "uuid (PK)"
        - user_id: "uuid (FK → profiles.id)"
        - destination_id: "text (matches destination.id in JSON)"
        - created_at: "timestamptz"
      constraints: "UNIQUE(user_id, destination_id)"
      rls: "Users can CRUD only own bookmarks"
      indexes:
        - "idx_bookmarks_user_id on user_id"
        - "idx_bookmarks_destination_id on destination_id"

    - name: "reviews"
      description: "Parent-written reviews for destinations"
      columns:
        - id: "uuid (PK)"
        - user_id: "uuid (FK → profiles.id)"
        - destination_id: "text (matches destination.id in JSON)"
        - title: "text (max 100 chars)"
        - body: "text (min 50 chars)"
        - rating_overall: "integer (1-5)"
        - rating_safety: "integer (1-5)"
        - rating_fun: "integer (1-5)"
        - rating_value: "integer (1-5)"
        - rating_food: "integer (1-5)"
        - kids_ages_at_visit: "integer[]"
        - photos: "text[] (URLs to Supabase Storage)"
        - status: "text (pending | approved | rejected)"
        - helpful_count: "integer (default 0)"
        - not_helpful_count: "integer (default 0)"
        - created_at: "timestamptz"
        - updated_at: "timestamptz"
      rls: "Users can create own reviews, read all approved, moderate if admin"
      indexes:
        - "idx_reviews_destination_id on destination_id"
        - "idx_reviews_user_id on user_id"
        - "idx_reviews_status on status"
        - "idx_reviews_created_at on created_at"

    - name: "review_helpfulness"
      description: "Tracks user votes on review helpfulness"
      columns:
        - id: "uuid (PK)"
        - user_id: "uuid (FK → profiles.id)"
        - review_id: "uuid (FK → reviews.id)"
        - vote: "boolean (true=helpful, false=not)"
        - created_at: "timestamptz"
      constraints: "UNIQUE(user_id, review_id)"
      rls: "Users can CRUD own votes"

    - name: "review_reports"
      description: "User reports of inappropriate reviews"
      columns:
        - id: "uuid (PK)"
        - user_id: "uuid (FK → profiles.id)"
        - review_id: "uuid (FK → reviews.id)"
        - reason: "text"
        - created_at: "timestamptz"
      rls: "Users can create, admins can read all"

    - name: "featured_listings"
      description: "Paid featured/boosted destination listings"
      columns:
        - id: "uuid (PK)"
        - destination_id: "text"
        - business_name: "text"
        - contact_email: "text"
        - contact_phone: "text"
        - website: "text"
        - tier: "text (featured | boosted)"
        - start_date: "timestamptz"
        - end_date: "timestamptz"
        - payment_status: "text (pending | paid | expired)"
        - created_at: "timestamptz"
      rls: "Admins only"
      indexes:
        - "idx_featured_active on (status, start_date, end_date)"

    - name: "premium_subscriptions"
      description: "Premium user subscriptions"
      columns:
        - id: "uuid (PK)"
        - user_id: "uuid (FK → profiles.id, unique)"
        - tier: "text (monthly | yearly)"
        - stripe_customer_id: "text"
        - stripe_subscription_id: "text"
        - status: "text (active | canceled | past_due)"
        - current_period_start: "timestamptz"
        - current_period_end: "timestamptz"
        - created_at: "timestamptz"
        - updated_at: "timestamptz"
      rls: "Users can read own, admins can read all"
```

> **Note:** The destination data itself remains in `public/data/destinations.json` (static JSON). `bookmarks.destination_id` and `reviews.destination_id` are string references to the JSON ID field. This hybrid approach avoids moving 500+ destinations into Supabase while still supporting dynamic user-generated content.

---

## 10. API Routes

```yaml
api_routes:
  # ── Auth (Supabase Auth handles most; these are extras) ──
  - method: "POST"
    path: "/api/auth/signup"
    purpose: "Register user + create profile"
    auth: false
    body: "{ email, password, display_name, kids_ages }"
    responses:
      - "200: { user, session }"
      - "400: { error } — validation failure"
      - "409: { error } — email already exists"

  - method: "POST"
    path: "/api/auth/login"
    purpose: "Authenticate user and return session"
    auth: false
    body: "{ email, password }"
    responses:
      - "200: { user, session }"
      - "401: { error } — invalid credentials"
      - "429: { error } — rate limited"

  - method: "POST"
    path: "/api/auth/logout"
    purpose: "Clear session"
    auth: true
    responses:
      - "200: { success }"

  - method: "POST"
    path: "/api/auth/forgot-password"
    purpose: "Send password reset email"
    auth: false
    body: "{ email }"

  # ── User Profile ──
  - method: "GET"
    path: "/api/profile"
    purpose: "Get current user's profile"
    auth: true
    responses:
      - "200: { profile }"
      - "404: profile not found"

  - method: "PUT"
    path: "/api/profile"
    purpose: "Update profile"
    auth: true
    body: "{ display_name?, home_city?, kids_ages?, bio? }"
    responses:
      - "200: { profile }"
      - "400: validation failure"

  - method: "POST"
    path: "/api/profile/avatar"
    purpose: "Upload avatar image"
    auth: true
    body: "multipart/form-data"
    responses:
      - "200: { avatar_url }"
      - "413: file too large"

  - method: "DELETE"
    path: "/api/profile"
    purpose: "Delete account and all associated data"
    auth: true
    body: "{ confirmation }"
    responses:
      - "200: { success }"
      - "400: missing confirmation"

  # ── Bookmarks ──
  - method: "GET"
    path: "/api/bookmarks"
    purpose: "Get user's bookmarked destinations"
    auth: true
    query: "{ limit?, offset? }"
    responses:
      - "200: { bookmarks[], total }"

  - method: "POST"
    path: "/api/bookmarks"
    purpose: "Bookmark a destination"
    auth: true
    body: "{ destination_id }"
    responses:
      - "200: { bookmark }"
      - "409: already bookmarked"

  - method: "DELETE"
    path: "/api/bookmarks/[destination_id]"
    purpose: "Remove a bookmark"
    auth: true
    responses:
      - "200: { success }"
      - "404: bookmark not found"

  # ── Reviews ──
  - method: "GET"
    path: "/api/reviews"
    purpose: "Get reviews for a destination"
    auth: false
    query: "{ destination_id, sort?, page?, limit?, status? (admin only) }"
    responses:
      - "200: { reviews[], total, page, totalPages }"

  - method: "POST"
    path: "/api/reviews"
    purpose: "Submit a new review"
    auth: true
    body: "{ destination_id, title, body, rating_overall, rating_safety, rating_fun, rating_value, rating_food, kids_ages_at_visit? }"
    responses:
      - "201: { review }"
      - "400: validation failure"
      - "429: too many reviews"

  - method: "PUT"
    path: "/api/reviews/[id]"
    purpose: "Edit own review (only if pending)"
    auth: true
    body: "{ title?, body?, ratings? }"
    responses:
      - "200: { review }"
      - "403: review not editable (already approved/rejected)"

  - method: "DELETE"
    path: "/api/reviews/[id]"
    purpose: "Delete own review"
    auth: true
    responses:
      - "200: { success }"
      - "403: not own review"

  - method: "POST"
    path: "/api/reviews/[id]/vote"
    purpose: "Vote on review helpfulness"
    auth: true
    body: "{ vote: boolean }"
    responses:
      - "200: { vote }"

  - method: "POST"
    path: "/api/reviews/[id]/report"
    purpose: "Report a review"
    auth: true
    body: "{ reason }"
    responses:
      - "201: { report }"

  - method: "POST"
    path: "/api/reviews/photo-upload"
    purpose: "Upload review photo"
    auth: true
    body: "multipart/form-data"
    responses:
      - "200: { url }"
      - "413: file too large"

  # ── Admin / Moderation ──
  - method: "GET"
    path: "/api/admin/reviews"
    purpose: "Get moderation queue (all pending reviews)"
    auth: true
    roles: "admin"
    query: "{ page?, limit?, status? }"
    responses:
      - "200: { reviews[], total, page }"
      - "403: not admin"

  - method: "PATCH"
    path: "/api/admin/reviews/[id]/moderate"
    purpose: "Approve or reject a review"
    auth: true
    roles: "admin"
    body: "{ status: 'approved' | 'rejected', rejection_reason? }"
    responses:
      - "200: { review }"
      - "403: not admin"

  - method: "DELETE"
    path: "/api/admin/reviews/[id]"
    purpose: "Delete any review (admin override)"
    auth: true
    roles: "admin"

  # ── Search ──
  - method: "GET"
    path: "/api/search"
    purpose: "Full-text search across destinations"
    auth: false
    query: "{ q, filters?: { age, category, country, price, safety }, sort?, page?, limit? }"
    responses:
      - "200: { results[], total, page, facets }"

  # ── Featured / Boosted Listings ──
  - method: "GET"
    path: "/api/featured"
    purpose: "Get active featured/boosted listings"
    auth: false
    query: "{ destination_id? }"
    responses:
      - "200: { featureds[] }"

  # ── Admin Dashboard ──
  - method: "GET"
    path: "/api/admin/stats"
    purpose: "Get admin dashboard stats"
    auth: true
    roles: "admin"
    responses:
      - "200: { total_users, total_reviews, pending_reviews, total_bookmarks, revenue_data }"
```

---

## 11. Route Design

```yaml
grouped_routes:
  "Public Pages":
    - path: "/"
      component: "HomePage"
      purpose: "Hero, search, featured destinations, stats"
      sitemap: "priority 1.0"
      
    - path: "/destination/[slug]"
      component: "DestinationDetailPage"
      purpose: "Full destination info, reviews, tips, affiliate links"
      sitemap: "priority 0.7"
      
    - path: "/city/[slug]"
      component: "CityPage"
      purpose: "All destinations in a city"
      sitemap: "priority 0.8"
      
    - path: "/country/[slug]"
      component: "CountryPage"
      purpose: "All destinations in a country (programmatic SEO)"
      sitemap: "priority 0.8"
      
    - path: "/category/[slug]"
      component: "CategoryPage"
      purpose: "All destinations in a category (programmatic SEO)"
      sitemap: "priority 0.7"
      
    - path: "/age/[slug]"
      component: "AgePage"
      purpose: "All destinations suitable for an age range"
      sitemap: "priority 0.7"
      
    - path: "/search"
      component: "SearchResultsPage"
      purpose: "Search results with filters, sort, map view"
      sitemap: false
      
    - path: "/blog"
      component: "BlogListPage"
      purpose: "Blog article listing"
      sitemap: "priority 0.6"
      
    - path: "/blog/[slug]"
      component: "BlogPostPage"
      purpose: "Individual blog post"
      sitemap: "priority 0.6"
      
    - path: "/pricing"
      component: "PricingPage"
      purpose: "Premium subscription tiers and pricing"
      sitemap: "priority 0.4"
      
    - path: "/about"
      component: "AboutPage"
      purpose: "About us, mission, team"
      sitemap: "priority 0.3"
      
    - path: "/privacy"
      component: "PrivacyPage"
      purpose: "Privacy policy"
      sitemap: "priority 0.2"
      
    - path: "/terms"
      component: "TermsPage"
      purpose: "Terms of service"
      sitemap: "priority 0.2"

  "Auth Pages (server-rendered but require auth for content)":
    - path: "/login"
      component: "LoginPage"
      purpose: "Login form"
      
    - path: "/signup"
      component: "SignupPage"
      purpose: "Registration form"
      
    - path: "/forgot-password"
      component: "ForgotPasswordPage"
      purpose: "Password reset request"
      
    - path: "/reset-password"
      component: "ResetPasswordPage"
      purpose: "Password reset form (from email link)"

  "Account Pages (auth required)":
    - path: "/account/profile"
      component: "ProfilePage"
      purpose: "Edit profile, avatar, preferences"
      
    - path: "/account/saved"
      component: "SavedPage"
      purpose: "Bookmarked destinations"
      
    - path: "/account/reviews"
      component: "MyReviewsPage"
      purpose: "User's review history"
      
    - path: "/account/settings"
      component: "SettingsPage"
      purpose: "Account settings, delete account"
      
    - path: "/account/subscription"
      component: "SubscriptionPage"
      purpose: "Premium subscription management"

  "Admin Pages (admin role required)":
    - path: "/admin"
      component: "AdminDashboard"
      purpose: "Stats overview for admins"
      
    - path: "/admin/reviews"
      component: "AdminReviewsPage"
      purpose: "Review moderation queue"
      
    - path: "/admin/featured"
      component: "AdminFeaturedPage"
      purpose: "Manage featured/boosted listings"
      
    - path: "/admin/users"
      component: "AdminUsersPage"
      purpose: "User management"
      
    - path: "/admin/revenue"
      component: "AdminRevenuePage"
      purpose: "Revenue dashboard"
```

---

## 12. Design Requirements

```yaml
design_requirements:
  brand:
    - "Configurable via template.config.ts (colors, logo, site name)"
    - "Default palette: Sky/Blue gradient (#0EA5E9 → #3B82F6) with white/grayscale neutrals"
    - "Font: Inter (loaded via CDN, variable weight)"
    - "Rounded corners: 2xl for cards, full for pills, rg for form fields"
    - "Shadow hierarchy: shadow-sm (cards), shadow-lg (modals), shadow-xl (hero)"

  layout:
    desktop: "Sticky header (80px) + max-w-7xl container + sidebar filters + flexible grid"
    tablet: "Same structure, sidebar collapses to toggle"
    mobile: "Sticky header (64px) + full-width container + bottom sheet/drawer for filters"
    footer: "Simple 3-column: branding, links, copyright"

  components:
    cards:
      - "Rounded-2xl borders"
      - "Hover: shadow-l + -translate-y-0.5"
      - "Image: 16:9 aspect ratio, object-cover"
      - "Text truncation: line-clamp-2 for titles, line-clamp-3 for descriptions"
    buttons:
      - "Primary: gradient bg-sky-500 → blue-600"
      - "Secondary: white with border"
      - "Ghost: no background, hover bg-gray-50"
      - "Size: sm (px-3 py-1.5), md (px-5 py-2.5), lg (px-8 py-3.5)"
    forms:
      - "Input: border border-gray-200, focus: ring-2 ring-sky-500"
      - "Labels: font-medium text-sm"
      - "Errors: text-red-500 text-sm, appear below input"
      - "Submit button: full width on mobile, auto on desktop"

  animations:
    - "Page transitions: fade-in 200ms"
    - "Card hover: translateY -2px + shadow-xl, 300ms"
    - "Filter chips: slide-in from left 150ms"
    - "Search dropdown: fade + scale 150ms"
    - "Modal/overlay: fade 200ms + scale 95% → 100%"
    - "Toast notifications: slide-in from top 300ms"
    - "Hero stats counter: animated number increment on scroll"

  responsive_breakpoints:
    - "sm: 640px (small tablets)"
    - "md: 768px (tablets)"
    - "lg: 1024px (small desktops)"
    - "xl: 1280px (standard desktops)"
    - "2xl: 1536px (wide desktops)"
    - "Mobile-first: base styles target <640px"

  color_system:
    primary: "sky-500"
    primary_dark: "sky-600"
    accent: "rose-500"
    success: "emerald-500"
    warning: "amber-500"
    danger: "red-500"
    bg_light: "gray-50"
    text_primary: "gray-900"
    text_secondary: "gray-600"
    text_muted: "gray-400"
    border: "gray-200"
```

---

## 13. SEO Requirements

```yaml
seo_requirements:
  meta_strategy:
    - "Each page type has a template function in lib/template/seo.ts"
    - "Template function takes data and returns Metadata object"
    - "Default OG image: /og-image.jpg (1200×630)"
    - "Default TW image: /twitter-card.jpg (1200×600)"

  page_type_meta:
    home:
      title_template: '"{site_name} — {tagline}"'
      description_template: '"Discover {count}+ {category} destinations for families. Read real parent reviews, safety ratings, and age-specific tips. Plan smarter family adventures in {locations}."'
      
    destination:
      title_template: '"{name} — {site_name}"'
      description_template: '"Everything you need for {name} with kids. Safety rating: {safety}/5. Age recommendations: {ages}. Real parent tips. Book family-friendly activities."'
      
    city:
      title_template: '"Best Destinations in {city} for Families — {site_name}"'
      description_template: '"Explore {count} kid-friendly destinations in {city}. Read real parent reviews, compare safety ratings, and plan your family trip with confidence."'
      
    country:
      title_template: '"Family Travel in {country} — {count} Kid-Friendly Destinations — {site_name}"'
      description_template: '"The ultimate guide to family travel in {country}. {count} destinations with safety ratings, age filters, and honest parent reviews."'
      
    category:
      title_template: '"Best {category} for Families — {site_name}"'
      description_template: '"Top {category} destinations for families. Find the best-rated {category_lower} with age-appropriate activities, safety ratings, and real parent advice."'
      
    age:
      title_template: '"Destinations for Kids Ages {age_range} — {site_name}"'
      description_template: '"Hand-picked destinations for kids ages {age_range}. Activities rated by real parents. Safety guides and practical tips for traveling with {age_description}."'
      
    blog_index:
      title_template: '"Family Travel Blog & Guides — {site_name}"'
      description_template: '"Expert guides, honest comparisons, and practical tips for family travel. Real parent advice for destinations across Asia."'
      
    blog_post:
      title_template: '"{title} — {site_name} Blog"'
      description_template: '"{excerpt_truncated}"'

  structured_data:
    organization: "Schema.org/Organization for all pages (logo, name, URL)"
    breadcrumb: "Schema.org/BreadcrumbList on every inner page"
    destination: "Schema.org/TouristAttraction or Place + Audience for age range"
    blog: "Schema.org/Blog on blog index"
    blog_post: "Schema.org/BlogPosting on post pages"
    search: "Schema.org/WebSite with SearchAction (targetSearchURL)"
    review: "Schema.org/Review on review sections"

  technical_seo:
    - "Dynamic sitemap.ts (done — extend for new routes: country, age, pricing, account)"
    - "robots.ts allowing all crawl + sitemap reference (done)"
    - "Canonical URLs on all pages (done via Next.js metadata)"
    - "304 Not Modified for static pages where applicable"
    - "OpenGraph + Twitter Card meta on every public page (done)"
    - "Lazy load non-critical images with next/image"
    - "Preconnect to Google AdSense + fonts"
    - "Structured data validated via Google Rich Results Test"
```

---

## 14. Monetization Strategy

```yaml
monetization_strategy:
  tiers:
    - name: "Free"
      price: "$0"
      features:
        - "Browse all destinations"
        - "Search and filter"
        - "Read reviews"
        - "See ads"

    - name: "Pro (Monthly)"
      price: "$4.99/month"
      features:
        - "Ad-free browsing"
        - "Unlimited bookmarks"
        - "Printable PDF guides per destination"
        - "Early access to new destinations (48h)"
        - "Priority review moderation"

    - name: "Pro (Yearly)"
      price: "$49.99/year (saves 16%)"
      features:
        - "All monthly features"
        - "Annual subscription badge"
        - "One annual destination guide PDF"

  advertising:
    - "Google AdSense (already implemented)"
    - "2 slots per destination page (hero bottom + sidebar)"
    - "1 slot per search results page (top)"
    - "1 slot per blog post (mid-content)"
    - "Ad-free for Premium subscribers"

  affiliate:
    networks:
      - name: "Booking.com"
        type: "hotel booking"
        commission: "4-6% per completed booking"
        placement: "destination page, travel tips section"
        
      - name: "Klook"
        type: "activity booking"
        commission: "5-12% per completed booking"
        placement: "destination page, activity cards"
        
      - name: "Agoda"
        type: "hotel booking"
        commission: "4-5% per completed booking"
        placement: "destination page, practical info section"
        
      - name: "Rentalcars / Discover Cars"
        type: "car rental"
        commission: "4-10% per completed booking"
        placement: "practical info section, travel tips"
        
      - name: "Travel Insurance (comparison)"
        type: "insurance"
        commission: "10-30% per completed purchase"
        placement: "destination page safety section, blog sidebar"
    
    compliance:
      - "Affiliate disclosure: 'As an Amazon Associate and partner of Booking.com, Klook, and Agoda, we may earn from qualifying purchases at no extra cost to you.'"
      - "Disclosure on every page with affiliate links (global banner or per-section notice)"
      - "Links use rel='nofollow noopener' and target='_blank'"
      - "No affiliate links in first 200 words of blog posts (Google policy)"

  featured_listings:
    - name: "Featured Destination"
      price: "$49/month"
      benefits:
        - "Appears in featured carousel on homepage"
        - "Sticky badge on destination card in search results"
        - "Priority placement in category pages"
        - "Featured filter option for users"
        - "Business description + website link"
        - "Contact form for inquiries"
      
    - name: "Boosted Listing"
      price: "$99/month"
      benefits:
        - "All Featured benefits"
        - "#1 position in search results for relevant keywords"
        - "Custom hero image slot"
        - "Highlighted review position"
        - "Analytics dashboard (views, clicks, conversions)"
        - "Priority support"

  implementation:
    ad_units:
      - "Use existing AdUnit.tsx component"
      - "AdSense slot IDs configurable in template.config.ts"
      - "Automatic ad spacing from content"
    
    affiliate_links:
      - "Store affiliate IDs in template.config.ts"
      - "Link generation in lib/template/affiliate.ts"
      - "Click tracking via Google Analytics events"
    
    premium:
      - "Stripe or Paddle for payment processing"
      - "Webhook handler for subscription events"
      - "Middleware checks subscription status for premium routes"
      - "Plan management on /account/subscription"
    
    featured:
      - "CRUD admin panel for featured listings"
      - "Featured listings displayed via FeaturedCarousel component"
      - "Start/end dates with auto-expiry"
```

---

## 15. Risk Register & Mitigation

```yaml
risk_register:
  - risk: "Supabase free tier limits exceeded"
    probability: "Medium"
    impact: "High"
    mitigation: |
      - Use local PostgreSQL for development (docker-compose.yml defined)
      - Import data from static JSON, not Supabase queries
      - Set up monitoring alarms at 50%, 75%, 90% of free tier limits
      - Cache frequently queried data in Redis/Upstash if needed
      - Free tier: 50,000 monthly active users, 500MB DB, 1GB storage
    contingency: |
      - Upgrade to Supabase Pro ($25/month) for 100k MAU, 8GB DB, 100GB storage
      - Or migrate to self-hosted Supabase

  - risk: "Review spam and low-quality submissions"
    probability: "High"
    impact: "Medium"
    mitigation: |
      - Moderation queue: all reviews require admin approval before publication
      - Rate limiting: max 1 review per 5 minutes per user
      - Minimum review body length: 50 characters
      - Automated spam detection: keyword filter, repeated content check
      - CAPTCHA on review submission form
      - User account age requirement: minimum 24h old before posting
    contingency: |
      - Add automated AI-based content moderation (OpenAI/Claude API call)
      - Implement user karma/reputation system to auto-approve trusted users

  - risk: "Affiliate link compliance violations"
    probability: "Low"
    impact: "High"
    mitigation: |
      - Clear, visible affiliate disclosure on every page with links
      - Disclosure: 'We may earn a commission at no extra cost to you'
      - All links use rel='nofollow noopener'
      - No affiliate links in first 200 words of blog posts
      - Regular compliance audits (quarterly)
      - Template includes standard affiliate disclosure in config
    contingency: |
      - Legal review of affiliate program terms
      - Immediate removal of non-compliant affiliate partners

  - risk: "Performance degradation with 500+ destinations and user-generated content"
    probability: "Medium"
    impact: "Medium"
    mitigation: |
      - Static JSON for destinations (not database queries per request)
      - ISR revalidation only for static pages
      - Dynamic user data (reviews, bookmarks) loaded client-side
      - Image optimization with next/image
      - Bundle analysis to keep JS under 150KB
      - CDN caching on Vercel Edge Network
    contingency: |
      - Implement server-side pagination for large datasets
      - Move to Supabase full-text search if client-side Fuse.js is too slow
      - Add Redis caching layer for frequently accessed dynamic queries

  - risk: "Template is not truly generic — hardcoded travel references remain"
    probability: "High"
    impact: "High"
    mitigation: |
      - All user-facing strings in template.config.ts
      - Code review checklist: 'No hardcoded travel terms'
      - Extract all travel-specific components to app/ directory, leave generic in lib/template/
      - Test fork by creating a different directory (e.g., 'Best Dog Parks') during development
      - Automated tests that verify no hardcoded strings
    contingency: |
      - Run 'grep -r "family\|travel\|parent\|kid\|child" lib/template/' as audit script
      - Full string extraction pass before v1.0 launch

  - risk: "Component line count exceeds Skill Economy max (300 lines)"
    probability: "Medium"
    impact: "Low"
    mitigation: |
      - Current page-content.tsx at 494 lines needs splitting
      - Split plan: HeroSection (~120 lines), SearchAndFilters (~150 lines), DestinationGrid (~150 lines), StatsBar (~50 lines)
      - CI lint rule: max-lines-per-file (component: 300, utility: 500)
      - Refactoring pass in Phase 4 (Hero redesign naturally splits this)
    contingency: |
      - Exceptions allowed for page layout wrappers (<50 lines) and data files

  - risk: "Low user adoption — nobody signs up or writes reviews"
    probability: "Medium"
    impact: "High"
    mitigation: |
      - Seed database with 10-20 sample reviews to demonstrate value
      - Email collection via 'Notify me when reviews launch' pre-launch
      - Launch promotion targeting parenting communities
      - Incentive: featured user badge for first 100 reviewers
      - Low friction: review form takes < 2 minutes
    contingency: |
      - Pivot to include expert/curated reviews alongside user reviews
      - Reduce auth requirement: allow reviews with just email (no full signup)

  - risk: "SEO competition from established travel sites"
    probability: "High"
    impact: "Medium"
    mitigation: |
      - Focus on long-tail keywords: '[activity] with kids in [city]'
      - Programmatic SEO generates hundreds of niche pages automatically
      - Schema.org markup for rich snippets
      - Build backlinks through parenting forums and guest posts
      - Blog content strategy targets low-competition keywords
    contingency: |
      - Pivot to micro-niche directories where competition is lower
      - Leverage the template to rapidly deploy multiple directories
```

---

## 16. Implementation Priority & Phases

```yaml
implementation_phases:
  phase_1:
    name: "User Accounts + Auth"
    priority: "P0 — Critical foundation"
    estimated_effort: "3-4 weeks"
    parallel_track: false
    depends_on: []
    deliverables:
      - "Supabase Auth setup (email + Google OAuth)"
      - "Auth UI components (login, signup, password reset, forgot password)"
      - "Profile management (view, edit, avatar upload)"
      - "Bookmarks CRUD (toggle, saved page)"
      - "Protected route middleware"
      - "Supabase RLS policies for all auth tables"
      - "Local pg dev environment (docker-compose)"
      - "Migration scripts for auth tables"
      - "Tests: auth flow, bookmark CRUD"
    blocking_next: "Phase 2"
    acceptance:
      - "User can sign up, log in, log out"
      - "User can edit profile and upload avatar"
      - "User can bookmark and un-bookmark destinations"
      - "Bookmark list persists across sessions"
      - "All API routes return correct responses for auth/unauth"
      - "All new components ≤ 300 lines"

  phase_2:
    name: "Parent Reviews"
    priority: "P0 — Core value proposition"
    estimated_effort: "3-4 weeks"
    parallel_track: false
    depends_on: ["Phase 1"]
    deliverables:
      - "Review submission form (stars, text, photos)"
      - "Photo upload to Supabase Storage"
      - "Review display on destination pages"
      - "Review sorting (newest, highest, most helpful)"
      - "Review pagination"
      - "Admin moderation panel (pending queue, approve/reject)"
      - "Helpfulness voting"
      - "Review reporting"
      - "Verified Parent badge"
      - "Email notifications for review status changes"
      - "Tests: review CRUD, moderation flow, voting"
    blocking_next: "Phase 5 (monetization — featured reviews)"
    acceptance:
      - "User can submit a review with ratings, text, and photos"
      - "Submitted review appears in moderation queue as pending"
      - "Admin can approve or reject reviews"
      - "Approved reviews appear on destination page"
      - "Review sorting and pagination work correctly"
      - "All new components ≤ 300 lines"

  phase_3:
    name: "Advanced Search + Map View"
    priority: "P1 — High value, improves UX significantly"
    estimated_effort: "2-3 weeks"
    parallel_track: true (with Phases 1-2, but UX overhaul should come after core features stable)
    depends_on: []
    deliverables:
      - "Full-text search (Fuse.js client-side + Supabase server-side fallback)"
      - "Multi-select filter sidebar"
      - "Sort controls (popularity, safety, price, newest)"
      - "Search results page"
      - "Map view toggle"
      - "Search suggestions / autocomplete"
      - "Filter state in URL (shareable/search-engine-able)"
      - "Mobile filter drawer"
      - "Tests: search filter sort, map integration"
    acceptance:
      - "Search returns relevant results from name, description, tips, reviews"
      - "Multi-select filters work together (age + category + country)"
      - "Filter state persists in URL"
      - "Map view shows filtered destinations with popups"
      - "Mobile filter drawer works"
      - "All new components ≤ 300 lines"

  phase_4:
    name: "Hero Section Redesign"
    priority: "P1 — High visual impact, improves first impression"
    estimated_effort: "1-2 weeks"
    parallel_track: true (can run alongside Phase 3)
    depends_on: []
    deliverables:
      - "Animated gradient / particle hero background (CSS, no heavy libs)"
      - "Live stats counter with animated increment"
      - "Quick action buttons (top destinations, categories)"
      - "CTA for user contribution"
      - "Refactored homepage: split page-content.tsx (494 lines) into HeroSection + SearchAndFilters + DestinationGrid + StatsBar + CTASection"
      - "Performance: hero FCP < 500ms"
      - "Responsive: 50vh mobile, 70vh desktop"
    acceptance:
      - "Hero loads within 500ms FCP"
      - "Animated background works without layout shift"
      - "Stats counter animates on scroll"
      - "Quick action buttons lead to correct filtered results"
      - "page-content.tsx split into ≤ 300 line components"
      - "All new components ≤ 300 lines"

  phase_5:
    name: "Monetization Features"
    priority: "P1 — Revenue generation"
    estimated_effort: "4-5 weeks"
    parallel_track: false (needs phases 1-2 for user context)
    depends_on: ["Phase 1", "Phase 2"]
    deliverables:
      - "Affiliate links integration (Booking.com, Klook, Agoda, car rental, insurance)"
      - "Affiliate disclosure compliance (global + per-section)"
      - "Featured/boosted listing admin panel"
      - "Featured listing display on homepage + search results"
      - "Pricing page"
      - "Premium subscription (Stripe/Paddle integration)"
      - "Ad management: slot configuration, premium ad-free"
      - "Printable PDF guide generation"
      - "Revenue dashboard (admin view, charts, projections)"
      - "Click tracking for affiliate links (Google Analytics events)"
      - "Tests: payment flow, subscription lifecycle, featured listing CRUD"
    acceptance:
      - "Affiliate links display correctly with disclosures"
      - "Featured listings appear in correct positions"
      - "User can subscribe to Premium and see ad-free content"
      - "PDF guide generates from destination data"
      - "Admin dashboard shows accurate revenue data"
      - "All new components ≤ 300 lines"

  phase_6:
    name: "Template Extraction & Documentation"
    priority: "P0 (for template sale) / P2 (for single directory)"
    estimated_effort: "2-3 weeks"
    parallel_track: true (can run progressively across all phases)
    depends_on: ["All phases (iterative extraction)"]
    deliverables:
      - "template.config.ts — single configuration file"
      - "lib/template/* — all reusable components, hooks, utils"
      - "Extract travel-specific strings from all template components"
      - "Niche-agnostic: rename all generic terms (e.g., 'parent' → 'reviewer')"
      - "Demo data file (10 items) for testing with fork"
      - "README: Fork-and-Deploy Guide"
      - "README: Customization Guide"
      - "README: Environment Variables reference"
      - "README: Monetization Setup"
      - "CI/CD template config"
      - "Tests: template neutrality validation"
    acceptance:
      - "Fork-and-deploy with new data + config under 1 hour"
      - "No hardcoded travel strings in lib/template/*"
      - "All user-facing strings come from template.config.ts"
      - "README covers all customization points"
      - "Example directory (e.g., 'Best Dog Parks') successfully forked and deployed"
```

---

## 17. Template Reusability

```yaml
template_reusability:
  directory_structure:
    description: "Every Directory Beast project follows this structure. The lib/template/ and template.config.ts are the reusable core. Everything in app/ is niche-specific glue."
    structure: |
      my-directory/
      ├── app/                    # Niche-specific pages (thin wrappers)
      │   ├── layout.tsx          # Wraps TemplateLayout
      │   ├── page.tsx            # Imports from template components
      │   ├── destination/
      │   │   └── [slug]/page.tsx
      │   ├── blog/
      │   ├── account/
      │   ├── admin/
      │   └── api/
      ├── lib/
      │   ├── template/           # 🔁 Reusable shared library
      │   │   ├── TemplateProvider.tsx
      │   │   ├── useTemplateConfig.ts
      │   │   ├── ItemCard.tsx
      │   │   ├── ItemDetail.tsx
      │   │   ├── FilterBar.tsx
      │   │   ├── SearchInput.tsx
      │   │   ├── MapView.tsx
      │   │   ├── ReviewForm.tsx
      │   │   ├── ReviewList.tsx
      │   │   ├── AuthForms.tsx
      │   │   ├── BookmarkToggle.tsx
      │   │   ├── AdUnit.tsx
      │   │   ├── AffiliateLinks.tsx
      │   │   ├── PremiumGate.tsx
      │   │   ├── useData.ts
      │   │   ├── seo.ts
      │   │   ├── affiliate.ts
      │   │   ├── types.ts
      │   │   ├── utils.ts
      │   │   └── style-system.ts
      │   └── [niche-specific utils]
      ├── template.config.ts      # 🔁 The switchboard — change this to rebrand
      ├── public/
      │   └── data/
      │       └── items.json      # 🔁 Replace with your data
      ├── .env.local.example
      ├── README.md
      └── package.json

  config_file_schema:
    description: "template.config.ts defines everything that varies by niche. Changing this file + data is all that's needed for most fork operations."
    schema: |
      export interface TemplateConfig {
        brand: {
          siteName: string;
          tagline: string;
          description: string;
          logo: string;           // Path or SVG
          colors: {
            primary: string;
            accent: string;
            background: string;
          };
        };

        labels: {
          itemSingular: string;    // e.g., "Destination", "Park", "Restaurant"
          itemPlural: string;      // e.g., "Destinations", "Parks", "Restaurants"
          reviewerLabel: string;   // e.g., "Parent", "Dog Owner", "Foodie"
          reviewLabel: string;     // e.g., "Parent Review", "Visit Report"
          categoryLabel: string;   // e.g., "Category", "Type", "Cuisine"
          saveLabel: string;       // e.g., "Save", "Bookmark", "Fav"
        };

        features: {
          auth: boolean;
          reviews: boolean;
          bookmarks: boolean;
          maps: boolean;
          blog: boolean;
          premium: boolean;
          featured: boolean;
          affiliate: boolean;
        };

        search: {
          placeholder: string;     // e.g., "Search destinations..."
          filters: FilterConfig[];
          sortOptions: string[];
        };

        monetization: {
          adsense: {
            publisherId: string;
            slots: Record<string, string>;
          };
          affiliate: {
            bookingCom?: { id: string };
            klook?: { id: string };
            agoda?: { id: string };
          };
          premium: {
            monthlyPrice: number;
            yearlyPrice: number;
            features: string[];
          };
        };

        seo: {
          defaultOgImage: string;
          siteUrl: string;
          twitterHandle?: string;
          schemas: {
            itemType: string;      // Schema.org type, e.g., "TouristAttraction", "Park"
          };
        };

        data: {
          source: 'json' | 'supabase';
          jsonPath: string;         // Path to items.json if source is 'json'
          supabaseTable?: string;   // Table name if source is 'supabase'
        };
      }

  fork_workflow:
    - "1. Clone the repository"
    - "2. Replace public/data/items.json with your data"
    - "3. Edit template.config.ts (site name, colors, labels, features)"
    - "4. Update public/favicon.ico and public/logo.svg"
    - "5. Set environment variables (AdSense, Supabase, Mapbox)"
    - "6. Deploy (vercel --prod)"
    - "Optional: Replace app/blog/ content with niche-specific posts"
    - "Optional: Customize app/page.tsx to rearrange components"
```

---

## 18. Success Measurement

```yaml
success_metrics:
  # ── User Engagement ──
  monthly_active_users:
    baseline: 0
    target_mvp: 500 (post-auth launch 1 month)
    target_10_10: 10,000 (post-complete launch 6 months)
    measurement: "Supabase user activity logs"

  reviews_per_destination:
    baseline: 0
    target_mvp: 5 (avg, after 3 months)
    target_10_10: 20 (avg, after 12 months)
    measurement: "Database count"

  review_submission_rate:
    baseline: 0
    target_mvp: "2% of visitors submit a review"
    target_10_10: "5% of visitors submit a review"
    measurement: "Reviews / Unique visitors"

  bookmark_rate:
    baseline: 0
    target: "15% of signed-in users save at least 1 bookmark"
    measurement: "Users with bookmarks / total signed-in users"

  # ── Monetization ──
  premium_conversion_rate:
    baseline: 0
    target: "3% of signed-in users convert to Premium"
    measurement: "Active subscriptions / total users"

  affiliate_click_through_rate:
    baseline: 0
    target: "2% of destination page visitors click affiliate link"
    measurement: "Google Analytics events"

  affiliate_revenue:
    baseline: "$0/month"
    target_mvp: "$50/month"
    target_10_10: "$500/month"
    measurement: "Affiliate network reports"

  adsense_revenue:
    baseline: "$5/month"
    target_mvp: "$50/month"
    target_10_10: "$300/month"
    measurement: "AdSense dashboard"

  featured_listings:
    baseline: 0
    target_mvp: 5
    target_10_10: 20
    measurement: "Active featured listings"

  # ── SEO ──
  organic_traffic:
    baseline: "~0 visitors/month"
    target_mvp: "1,000 monthly organic visitors"
    target_10_10: "50,000 monthly organic visitors"
    measurement: "Google Search Console"

  indexed_pages:
    baseline: "~50 (current static pages)"
    target_mvp: 200
    target_10_10: 2000
    measurement: "Google Search Console"

  average_position:
    baseline: "N/A (new site)"
    target_mvp: "Top 20 for 10 target keywords"
    target_10_10: "Top 5 for 50 target keywords"
    measurement: "Google Search Console"

  # ── Performance ──
  lighthouse_performance:
    baseline: "~70-80 (current, some heavy components)"
    target_mvp: 90+
    target_10_10: 95+
    measurement: "Lighthouse CI in pipeline"

  lighthouse_seo:
    baseline: "~85-95"
    target_mvp: 100
    target_10_10: 100
    measurement: "Lighthouse CI in pipeline"

  lighthouse_accessibility:
    baseline: "~85"
    target_mvp: 95
    target_10_10: 100
    measurement: "Lighthouse CI in pipeline"

  # ── Template Adoption ──
  template_forks:
    baseline: 0
    target_mvp: 3 (beta testers)
    target_10_10: 50 (6 months post-commercial launch)
    measurement: "GitHub forks / purchased licenses"

  template_revenue:
    baseline: 0
    target_mvp: "Test with free beta"
    target_10_10: "$5,000/month (50 licenses × $100-$500)"
    measurement: "Payment processor"
```

---

## 19. Approvals

```yaml
approval_history:
  - version: "2.0 (10/10 Full Vision)"
    date: "2026-04-28"
    author: "Captain (Agent Orchestra)"
    status: "Pending Review"
    notes: |
      Complete PRD covering all 20 sections.
      Based on codebase audit of existing Family Travel Directory project.
      All features mapped to implementation phases.
      Template reusability architecture defined.

next_steps:
  - "Review PRD with Chris for alignment"
  - "Approve Phase 1 scope and start sprint"
  - "Set up Supabase project and local pg environment"
  - "Begin Phase 1: User Accounts + Auth"
  - "Create template.config.ts shell"
  - "Extract first components to lib/template/"
```

---

## 20. Appendix: Codebase Audit

> **Source:** Full codebase audit of `/home/captain/.openclaw/workspace/family-travel-directory/` conducted 2026-04-28.

### 20.1 Current File Size Audit (Skill Economy Check)

| File | Lines | Status | Action Needed |
|------|-------|--------|---------------|
| `app/page-content.tsx` | 494 | ❌ Over 300 | Split into HeroSection + SearchAndFilters + DestinationGrid + StatsBar + CTASection (Phase 4) |
| `components/Header.tsx` | 192 | ✅ Under 300 | OK — but could extract mobile menu into sub-component |
| `app/layout.tsx` | 81 | ✅ Under 300 | OK |
| `app/destination/[slug]/_client.tsx` | — | ⚠️ Check | — |
| `components/AdUnit.tsx` | 49 | ✅ Under 300 | OK |
| `lib/getData.ts` | 33 | ✅ Under 300 | OK |
| `lib/blog-data.ts` | 65 | ✅ Under 300 | OK |
| `lib/supabase.ts` | 200 | ✅ Under 5000 | OK |
| `lib/supabase-client.ts` | 180 | ✅ Under 5000 | OK (legacy, candidate for removal) |
| `lib/database.types.ts` | 79 | ✅ Under 300 | OK |

### 20.2 Current Feature Completeness

| Category | Item | Status | Notes |
|----------|------|--------|-------|
| **Data** | Destinations JSON | ✅ Done | 506+ entries, global coverage |
| **Data** | Blog posts (JSON) | ✅ Done | 3 SEO articles |
| **Data** | City activity data | ✅ Done | Multiple JSON files |
| **Search** | Text search | ✅ Done | Client-side filtering |
| **Search** | Age filter | ✅ Done | 0-3, 4-6, 7-12, 13+ |
| **Search** | Category filter | ✅ Done | Theme Parks, Nature, Cultural |
| **Search** | Multi-select | ❌ Missing | Single select only |
| **Search** | Sort | ❌ Missing | Static order only |
| **SEO** | Meta tags | ✅ Done | OpenGraph + Twitter |
| **SEO** | Schema.org | ✅ Done | Destination, Breadcrumb |
| **SEO** | Sitemap | ✅ Done | Dynamic from data |
| **SEO** | Programmatic pages | ⚠️ Partial | City + Category routes exist |
| **Monetization** | AdSense | ✅ Done | 2 slots per destination |
| **Monetization** | Affiliate links | ❌ Missing | Data structure has fields |
| **Monetization** | Premium | ❌ Missing | Not started |
| **Monetization** | Featured listings | ❌ Missing | Not started |
| **Auth** | User accounts | ❌ Missing | Not started |
| **Auth** | Bookmarks | ❌ Missing | Not started |
| **Reviews** | Review form | ❌ Missing | Not started |
| **Reviews** | Moderation | ⚠️ Skeleton | /review page exists |
| **Maps** | Mapbox | ✅ Done | Working integration |
| **Maps** | Leaflet fallback | ✅ Done | Working integration |
| **Template** | Config file | ❌ Missing | Not started |
| **Template** | Shared library | ❌ Missing | Not started |

### 20.3 Key Dependencies (package.json)

```json
{
  "next": "14.2.4",
  "react": "^18",
  "typescript": "^5",
  "tailwindcss": "^4",
  "@supabase/supabase-js": "^2.45.0",
  "@supabase/ssr": "^0.5.1",
  "lucide-react": "^0.447.0",
  "mapbox-gl": "^3.6.0",
  "leaflet": "^1.9.4"
}
```

### 20.4 Current TypeScript Strict-Mode Status

```json
{
  "compilerOptions": {
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "moduleResolution": "bundler"
  }
}
```

**Status:** ✅ Already in strict mode. No @ts-ignore found in codebase search. Maintain going forward.

---

*End of Document*