// ════════════════════════════════════════════════════════════
// Product-to-PDF Mapping
// Each slug = a purchasable product, maps to its PDF file(s)
// ════════════════════════════════════════════════════════════

export interface ProductPdf {
  slug: string            // product slug (matches create-checkout)
  name: string
  priceLabel: string      // e.g., "$9"
  pdfFiles: string[]      // filenames in /public/downloads/
  tier: 'starter' | 'bundle' | 'pro'
  bundleDescription?: string
}

// Starter tier — buy 1 playbook, get 1 PDF
const STARTER_SLUGS: ProductPdf[] = [
  { slug: 'ai-solopreneur-toolkit', name: 'AI Solopreneur Toolkit', priceLabel: '$9', pdfFiles: ['ai-solopreneur-toolkit.pdf'], tier: 'starter' },
  { slug: 'directory-builder-template', name: 'Directory Builder Template', priceLabel: '$19', pdfFiles: ['directory-builder-template.pdf'], tier: 'starter' },
  { slug: 'ai-workflow-automation', name: 'AI Workflow Automation', priceLabel: '$9', pdfFiles: ['ai-workflow-automation.pdf'], tier: 'starter' },
  { slug: 'ai-content-creation-busy-founders', name: 'AI Content Creation for Busy Founders', priceLabel: '$9', pdfFiles: ['ai-content-creation-busy-founders.pdf'], tier: 'starter' },
  { slug: 'ai-for-data-analysis', name: 'AI for Data Analysis', priceLabel: '$9', pdfFiles: ['ai-for-data-analysis.pdf'], tier: 'starter' },
  { slug: 'ai-for-hr-and-recruiting', name: 'AI for HR & Recruiting', priceLabel: '$9', pdfFiles: ['ai-for-hr-and-recruiting.pdf'], tier: 'starter' },
  { slug: 'ai-for-personal-finance', name: 'AI for Personal Finance', priceLabel: '$9', pdfFiles: ['ai-for-personal-finance.pdf'], tier: 'starter' },
  { slug: 'ai-for-social-media-management', name: 'AI for Social Media Management', priceLabel: '$9', pdfFiles: ['ai-for-social-media-management.pdf'], tier: 'starter' },
  { slug: 'ai-personal-assistant-setup', name: 'AI Personal Assistant Setup', priceLabel: '$9', pdfFiles: ['ai-personal-assistant-setup.pdf'], tier: 'starter' },
  { slug: 'ai-for-ecommerce', name: 'AI for E-Commerce', priceLabel: '$2', pdfFiles: ['ai-for-ecommerce.pdf'], tier: 'starter' },
  { slug: 'ai-for-marketing-automation', name: 'AI for Marketing Automation', priceLabel: '$10', pdfFiles: ['ai-for-marketing-automation.pdf'], tier: 'starter' },
  { slug: 'ai-sales-funnel-builder', name: 'AI Sales Funnel Builder', priceLabel: '$9', pdfFiles: ['ai-sales-funnel-builder.pdf'], tier: 'starter' },
  { slug: 'ai-marketing-for-asia', name: 'AI Marketing for Asia', priceLabel: '$12', pdfFiles: ['ai-marketing-for-asia.pdf'], tier: 'starter' },
]

// Pro tier — unlimited access
const PRO_MONTHLY: ProductPdf = {
  slug: 'pro-monthly',
  name: 'Apifeny Pro — Monthly',
  priceLabel: '$37/mo',
  pdfFiles: [], // resolved dynamically from downloads/
  tier: 'pro',
  bundleDescription: 'Unlimited access to ALL 104+ playbooks',
}

const PRO_YEARLY: ProductPdf = {
  slug: 'pro-yearly',
  name: 'Apifeny Pro — Yearly',
  priceLabel: '$247/yr',
  pdfFiles: [],
  tier: 'pro',
  bundleDescription: 'Unlimited access to ALL 104+ playbooks + 2 months free',
}

// Get product PDF mapping by slug
export function getProductPdf(slug: string): ProductPdf | undefined {
  const fromStarter = STARTER_SLUGS.find(p => p.slug === slug)
  if (fromStarter) return fromStarter
  if (slug === 'pro-monthly') return PRO_MONTHLY
  if (slug === 'pro-yearly') return PRO_YEARLY
  return undefined
}

// Build CTA hooks for each product
export function getCtaHook(slug: string): string {
  const hooks: Record<string, string> = {
    'ai-solopreneur-toolkit': 'Replace $2,200/mo in Services with $70/mo of AI',
    'directory-builder-template': 'Build a Directory Site That Makes Money While You Sleep',
    'ai-workflow-automation': 'Automate Your Entire Workday — Step by Step Blueprint',
    'ai-content-creation-busy-founders': '3x Your Content Output Without Hiring a Team',
    'ai-for-data-analysis': 'Unlock Insights From Your Data Without Excel Skills',
    'ai-for-hr-and-recruiting': 'Hire 2x Faster + Save 15 Hours/Week on Admin',
    'ai-for-personal-finance': 'Let AI Manage Your Budget, Investments & Tax Strategy',
    'ai-for-social-media-management': 'Schedule a Month of High-Engagement Posts in 1 Hour',
    'ai-personal-assistant-setup': 'Your Own AI Butler — Email, Calendar, Tasks, All Automated',
    'ai-for-ecommerce': 'Boost Your Store Revenue by 30% With These AI Tools',
    'ai-for-marketing-automation': 'Run Enterprise-Grade Campaigns on a Freelancer Budget',
    'ai-sales-funnel-builder': 'Turn Cold Traffic Into Paying Customers on Autopilot',
    'ai-marketing-for-asia': 'Dominate Asian Markets With Localized AI Campaigns',
  }
  return hooks[slug] || 'Master AI Tools That Actually Move the Needle'
}

// Generate a signed download URL (simple token-based, not crypto)
export function generateDownloadToken(sessionId: string, email: string, productSlug: string): string {
  const payload = `${sessionId}:${email}:${productSlug}:${Date.now()}`
  // Base64 encode — not cryptographically secure but enough for MVP
  return Buffer.from(payload).toString('base64url')
}

export function decodeDownloadToken(token: string): { sessionId: string; email: string; productSlug: string; issuedAt: number } | null {
  try {
    const decoded = Buffer.from(token, 'base64url').toString('utf-8')
    const [sessionId, email, productSlug, issuedAtStr] = decoded.split(':')
    return { sessionId, email, productSlug, issuedAt: parseInt(issuedAtStr, 10) }
  } catch {
    return null
  }
}
