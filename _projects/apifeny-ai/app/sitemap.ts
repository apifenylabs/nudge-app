import type { MetadataRoute } from 'next';
import fs from 'fs';
import path from 'path';

const BASE_URL = 'https://apifeny-ai.vercel.app';

interface Tool {
 id: string;
 name: string;
 slug: string;
}

interface Collection {
 id: string;
 name: string;
 slug: string;
}

interface BlogPost {
 slug: string;
 title: string;
 date: string;
}

interface Playbook {
 slug: string;
 title: string;
}

interface RankingCategory {
 slug: string;
 title: string;
}

export default function sitemap(): MetadataRoute.Sitemap {
 // Load dynamic data at build time
 const tools: Tool[] = (() => {
 try {
 const filePath = path.join(process.cwd(), 'data', 'tools.json');
 const raw = fs.readFileSync(filePath, 'utf-8');
 return JSON.parse(raw);
 } catch { return []; }
 })();

 const collections: Collection[] = (() => {
 try {
 const filePath = path.join(process.cwd(), 'data', 'collections.json');
 const raw = fs.readFileSync(filePath, 'utf-8');
 return JSON.parse(raw);
 } catch { return []; }
 })();

 // Blog posts from blog-data (which wraps generated-blog-data)
 const blogPosts: BlogPost[] = (() => {
 try {
 const { getAllPosts } = require('../lib/blog-data');
 return getAllPosts();
 } catch { return []; }
 })();

 // Playbooks from lib
 const playbooks: Playbook[] = (() => {
 try {
 const { playbooks: pbs } = require('../lib/playbooks');
 return pbs;
 } catch { return []; }
 })();

 // Ranking categories from lib
 const rankingCategories: RankingCategory[] = (() => {
 try {
 const { RANKING_CATEGORIES } = require('../lib/ranking-categories');
 return RANKING_CATEGORIES;
 } catch { return []; }
 })();

 // ====== NON-COUNTRY ai-tools-* dirs that should NOT appear in the geo section ======
 const NON_COUNTRY_AI_TOOLS = new Set([
 'ai-tools-for-startups',
 'ai-tools-by-category',
 'ai-tools-for-digital-marketing',
 ]);

 // Dynamically discover all ai-tools-* country pages from the app directory
 const aiToolCountryEntries: MetadataRoute.Sitemap = (() => {
 try {
 const appDir = path.join(process.cwd(), 'app');
 const entries = fs.readdirSync(appDir, { withFileTypes: true });
 return entries
 .filter(d => d.isDirectory() && d.name.startsWith('ai-tools-') && !NON_COUNTRY_AI_TOOLS.has(d.name))
 .map(d => ({
 url: `${BASE_URL}/${d.name}`,
 lastModified: new Date(),
 changeFrequency: 'daily' as const,
 priority: 0.8,
 }));
 } catch { return []; }
 })();

 // Dynamically discover all /playbooks/ (plural) sub-route pages from the app directory
 const playbooksPluralEntries: MetadataRoute.Sitemap = (() => {
 try {
 const playbooksDir = path.join(process.cwd(), 'app', 'playbooks');
 const entries = fs.readdirSync(playbooksDir, { withFileTypes: true });
 return entries
 .filter(d => d.isDirectory() && d.name !== '[slug]')
 .map(d => ({
 url: `${BASE_URL}/playbooks/${d.name}`,
 lastModified: new Date(),
 changeFrequency: 'monthly' as const,
 priority: 0.6,
 }));
 } catch { return []; }
 })();

 // Dynamically discover all /collection/ (singular) collection detail pages
 const collectionSingularEntries: MetadataRoute.Sitemap = (() => {
 try {
 const collDir = path.join(process.cwd(), 'app', 'collection', '[slug]');
 if (!fs.existsSync(collDir)) return [];
 // Load collection slugs from the same source used by generateStaticParams
 const { getAllCollectionSlugs } = require('../lib/collections');
 return getAllCollectionSlugs().map((slug: string): MetadataRoute.Sitemap[number] => ({
 url: `${BASE_URL}/collection/${slug}`,
 lastModified: new Date(),
 changeFrequency: 'weekly',
 priority: 0.7,
 }));
 } catch { return []; }
 })();

 // Industry deep-dive pages (added for BlogLandingLinks cross-linking)
 const industryEntries: MetadataRoute.Sitemap = [
 { url: `${BASE_URL}/industries/education-admin`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
 { url: `${BASE_URL}/industries/construction`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
 { url: `${BASE_URL}/industries/hr`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
 { url: `${BASE_URL}/industries/property-management`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
 { url: `${BASE_URL}/industries/insurance`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
 ];

 // Static pages
 const staticEntries: MetadataRoute.Sitemap = [
 { url: BASE_URL, lastModified: new Date(), changeFrequency: 'daily', priority: 1.0 },
 { url: `${BASE_URL}/tools`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
 { url: `${BASE_URL}/collections`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
 { url: `${BASE_URL}/categories`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
 { url: `${BASE_URL}/rankings`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
 { url: `${BASE_URL}/submit`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
 { url: `${BASE_URL}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
 { url: `${BASE_URL}/privacy`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.3 },
 { url: `${BASE_URL}/terms`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.3 },
 { url: `${BASE_URL}/blog`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
 { url: `${BASE_URL}/playbooks`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
 { url: `${BASE_URL}/premium`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
 { url: `${BASE_URL}/ai-tools-for-startups`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
 { url: `${BASE_URL}/ai-tools-for-digital-marketing`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
 { url: `${BASE_URL}/best-ai-tools`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
 { url: `${BASE_URL}/best-ai-coding-tools`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.8 },
 { url: `${BASE_URL}/best-ai-writing-tools`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.8 },
 { url: `${BASE_URL}/best-ai-marketing-tools`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.8 },
 // Compare pages
 { url: `${BASE_URL}/compare`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
 { url: `${BASE_URL}/compare/deepseek-vs-chatgpt`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
 { url: `${BASE_URL}/compare/chatgpt-vs-claude`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
 { url: `${BASE_URL}/compare/cursor-vs-copilot`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
 { url: `${BASE_URL}/compare/perplexity-vs-chatgpt`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
 { url: `${BASE_URL}/compare/gemini-vs-chatgpt`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
 // Compare pages added after initial sitemap creation
 { url: `${BASE_URL}/compare/midjourney-vs-dalle`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
 { url: `${BASE_URL}/compare/claude-vs-gemini`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
 { url: `${BASE_URL}/compare/grok-vs-chatgpt`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
 { url: `${BASE_URL}/compare/windsurf-vs-cursor`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
 // Guides
 { url: `${BASE_URL}/guides`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
 { url: `${BASE_URL}/guides/how-to-choose-ai-tools`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
 { url: `${BASE_URL}/guides/ai-automation-for-small-business`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
 { url: `${BASE_URL}/guides/ai-ecommerce-asia`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
 { url: `${BASE_URL}/guides/ai-tools-for-architecture-engineering`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
 { url: `${BASE_URL}/guides/ai-tools-for-marketing`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
 { url: `${BASE_URL}/guides/ai-tools-for-seo`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
 { url: `${BASE_URL}/guides/ai-tools-for-video`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
 { url: `${BASE_URL}/guides/ai-tools-for-design`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
 { url: `${BASE_URL}/guides/ai-tools-for-education`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
 { url: `${BASE_URL}/guides/ai-tools-for-content-creation`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
 { url: `${BASE_URL}/guides/ai-tools-for-customer-support`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
 { url: `${BASE_URL}/guides/ai-tools-for-developers`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
 { url: `${BASE_URL}/guides/ai-tools-for-finance`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
 { url: `${BASE_URL}/guides/ai-tools-for-gaming`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
 { url: `${BASE_URL}/guides/ai-tools-for-healthcare`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
 { url: `${BASE_URL}/guides/ai-tools-for-sales`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
 { url: `${BASE_URL}/guides/ai-tools-for-cybersecurity`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
 { url: `${BASE_URL}/guides/ai-tools-for-real-estate`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
 { url: `${BASE_URL}/guides/ai-tools-for-legal`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
 { url: `${BASE_URL}/guides/ai-tools-for-hr-recruiting`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
 { url: `${BASE_URL}/guides/ai-tools-for-personal-finance`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
 { url: `${BASE_URL}/guides/ai-tools-for-project-management`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
 { url: `${BASE_URL}/guides/ai-tools-for-supply-chain`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
 { url: `${BASE_URL}/guides/ai-tools-for-travel-hospitality`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
 { url: `${BASE_URL}/guides/ai-tools-for-agriculture`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
 { url: `${BASE_URL}/guides/ai-tools-for-manufacturing`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
 { url: `${BASE_URL}/guides/ai-tools-for-science-research`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
 // For-pages (audience segments)
 { url: `${BASE_URL}/for/solopreneurs`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
 { url: `${BASE_URL}/for/developers`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
 { url: `${BASE_URL}/for/marketers`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
 { url: `${BASE_URL}/for/startups`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
 // Community & content pages
 { url: `${BASE_URL}/community-playbook`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
 { url: `${BASE_URL}/success-stories`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
 { url: `${BASE_URL}/build-in-public`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.6 },
 { url: `${BASE_URL}/changelog`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.6 },
 { url: `${BASE_URL}/my-playbooks`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.6 },
 { url: `${BASE_URL}/alpha-orchestras`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.6 },
 // Static blog feature pages (standalone, not in dynamic blog data)
 { url: `${BASE_URL}/blog/ai-tools-philippines-2026`, lastModified: new Date('2026-05-15'), changeFrequency: 'monthly', priority: 0.6 },
 { url: `${BASE_URL}/blog/best-ai-tools-asia-2026`, lastModified: new Date('2026-05-10'), changeFrequency: 'monthly', priority: 0.6 },
 { url: `${BASE_URL}/blog/cursor-vs-copilot-vs-windsurf-2026`, lastModified: new Date('2026-05-20'), changeFrequency: 'monthly', priority: 0.6 },
 { url: `${BASE_URL}/blog/deepseek-vs-chatgpt-2026`, lastModified: new Date('2026-05-12'), changeFrequency: 'monthly', priority: 0.6 },
 { url: `${BASE_URL}/blog/notion-ai-vs-chatgpt-vs-gemini-2026`, lastModified: new Date('2026-05-08'), changeFrequency: 'monthly', priority: 0.6 },
 { url: `${BASE_URL}/blog/ai-hr-recruiting-asia-2026`, lastModified: new Date('2026-05-31'), changeFrequency: 'monthly', priority: 0.6 },
 { url: `${BASE_URL}/blog/ai-legal-compliance-asia-2026`, lastModified: new Date('2026-05-31'), changeFrequency: 'monthly', priority: 0.6 },
 { url: `${BASE_URL}/blog/ai-supply-chain-logistics-asia-2026`, lastModified: new Date('2026-05-31'), changeFrequency: 'monthly', priority: 0.6 },
 { url: `${BASE_URL}/blog/ai-customer-support-asia-2026`, lastModified: new Date('2026-06-09'), changeFrequency: 'monthly', priority: 0.6 },
 // User-facing pages (lower priority for SEO but still relevant)
 { url: `${BASE_URL}/submit-playbook`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.4 },
 { url: `${BASE_URL}/revenue`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.4 },
 ];

 // Tool pages
 const toolEntries: MetadataRoute.Sitemap = tools.map((tool): MetadataRoute.Sitemap[number] => ({
 url: `${BASE_URL}/tools/${tool.slug || tool.id}`,
 lastModified: new Date(),
 changeFrequency: 'weekly',
 priority: 0.8,
 }));

 // Collection detail pages (from collections.json, plural route)
 const collectionEntries: MetadataRoute.Sitemap = collections.map((col): MetadataRoute.Sitemap[number] => ({
 url: `${BASE_URL}/collections/${col.slug || col.id}`,
 lastModified: new Date(),
 changeFrequency: 'weekly',
 priority: 0.7,
 }));

 // Blog category pages
 const blogCategoryEntries: MetadataRoute.Sitemap = (() => {
 try {
 const { getAllCategories } = require('../lib/blog-categories');
 return getAllCategories().map((cat: { slug: string }): MetadataRoute.Sitemap[number] => ({
 url: `${BASE_URL}/blog/category/${cat.slug}`,
 lastModified: new Date(),
 changeFrequency: 'weekly',
 priority: 0.7,
 }));
 } catch { return []; }
 })();

 // Blog detail pages — use actual publish date for lastModified
 const blogEntries: MetadataRoute.Sitemap = blogPosts.map((post): MetadataRoute.Sitemap[number] => ({
 url: `${BASE_URL}/blog/${post.slug}`,
 lastModified: new Date(post.date || Date.now()),
 changeFrequency: 'monthly',
 priority: 0.6,
 }));

 // Playbook pages (index + individual)
 const playbookEntries: MetadataRoute.Sitemap = [
 { url: `${BASE_URL}/playbook`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
 ...playbooks.map((p): MetadataRoute.Sitemap[number] => ({
 url: `${BASE_URL}/playbook/${p.slug}`,
 lastModified: new Date(),
 changeFrequency: 'monthly',
 priority: 0.6,
 })),
 ];

 // Ranking category pages
 const rankingEntries: MetadataRoute.Sitemap = rankingCategories.map((rc): MetadataRoute.Sitemap[number] => ({
 url: `${BASE_URL}/rankings/${rc.slug}`,
 lastModified: new Date(),
 changeFrequency: 'weekly',
 priority: 0.7,
 }));

 // Category pages
 interface CategoryEntry {
 slug: string;
 name: string;
 }
 const categories: CategoryEntry[] = (() => {
 try {
 const { CATEGORIES } = require('../lib/category-data');
 return Object.values(CATEGORIES);
 } catch { return []; }
 })();

 const categoryEntries: MetadataRoute.Sitemap = categories.map((cat): MetadataRoute.Sitemap[number] => ({
 url: `${BASE_URL}/categories/${cat.slug}`,
 lastModified: new Date(),
 changeFrequency: 'weekly',
 priority: 0.7,
 }));

 return [
 ...aiToolCountryEntries,
 ...playbooksPluralEntries,
 ...collectionSingularEntries,
 ...industryEntries,
 ...staticEntries,
 ...toolEntries,
 ...collectionEntries,
 ...blogCategoryEntries,
 ...blogEntries,
 ...playbookEntries,
 ...rankingEntries,
 ...categoryEntries,
 ];
}
