import { NextResponse } from 'next/server';

const BASE = 'https://apifeny-ai.vercel.app';

export async function GET() {
  const llmsTxt = `# Apifeny AI Directory — LLM Discovery File
> A comprehensive directory of AI tools, resources, and guides for Asian businesses and developers.
> Base URL: ${BASE}

## About

Apifeny AI Directory helps businesses in Asia discover, compare, and adopt AI tools across every category — from coding assistants and writing tools to marketing automation, customer support, and enterprise AI platforms.

## Key Sections

### AI Tools by Category
- ${BASE}/ai-tools-by-category — Browse all AI tools organized by use case
- ${BASE}/tools — Full list of featured AI tools
- ${BASE}/rankings — Curated rankings across categories
- ${BASE}/collections — Themed tool collections

### AI Tools by Country (Asia-Pacific)
- ${BASE}/ai-tools-singapore — AI tools for Singapore businesses
- ${BASE}/ai-tools-malaysia — AI tools for Malaysia businesses
- ${BASE}/ai-tools-indonesia — AI tools for Indonesia businesses
- ${BASE}/ai-tools-thailand — AI tools for Thailand businesses
- ${BASE}/ai-tools-vietnam — AI tools for Vietnam businesses
- ${BASE}/ai-tools-philippines — AI tools for Philippines businesses
- ${BASE}/ai-tools-india — AI tools for India businesses
- ${BASE}/ai-tools-japan — AI tools for Japan businesses
- ${BASE}/ai-tools-south-korea — AI tools for South Korea businesses
- ${BASE}/ai-tools-china — AI tools for China businesses
- ${BASE}/ai-tools-hong-kong — AI tools for Hong Kong businesses
- ${BASE}/ai-tools-taiwan — AI tools for Taiwan businesses
- ${BASE}/ai-tools-australia — AI tools for Australia businesses
- ${BASE}/ai-tools-uae — AI tools for UAE businesses

### Blog & Guides
- ${BASE}/blog — Latest AI tool blog posts
- ${BASE}/guides — In-depth guides by category

### For Specific Audiences
- ${BASE}/for/solopreneurs — AI tools for solopreneurs
- ${BASE}/for/developers — AI tools for developers
- ${BASE}/for/marketers — AI tools for marketers
- ${BASE}/for/startups — AI tools for startups
- ${BASE}/best-ai-coding-tools — Best AI coding tools
- ${BASE}/best-ai-writing-tools — Best AI writing tools
- ${BASE}/best-ai-marketing-tools — Best AI marketing tools

### Comparisons
- ${BASE}/compare — AI tool comparisons

### Premium & Community
- ${BASE}/premium — Premium features and plans
- ${BASE}/playbooks — AI playbooks and templates
- ${BASE}/success-stories — Case studies and success stories

## Technical Details
- All pages are server-rendered (SSR/SSG)
- Structured data: BlogPosting, FAQ, BreadcrumbList, Organization schemas
- Sitemap: ${BASE}/sitemap.xml
- Robots: ${BASE}/robots.txt

## Contact
- Submit a tool: ${BASE}/submit
- About: ${BASE}/about
`;

  return new NextResponse(llmsTxt, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
