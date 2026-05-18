const fs = require('fs');

// Read the reference
let ref = fs.readFileSync('app/playbooks/ai-personal-assistant-setup/page.tsx', 'utf8');

// Fix the duplicate export bug in ref by removing the duplicate
const lines = ref.split('\n');
// Remove lines 839-842 (0-indexed 838-841)
const cleanLines = [...lines.slice(0, 838), ...lines.slice(842)];
ref = cleanLines.join('\n');
console.log('Reference cleaned, ' + cleanLines.length + ' lines');

// Helper to write a slug variation
function writeForSlug(slug, data) {
  let text = ref;
  
  // Replace function names
  text = text.replace(/AiPersonalAssistantSetupInner/g, data.fnInner);
  text = text.replace(/AiPersonalAssistantSetupPage/g, data.fnPage);
  
  // Replace seo
  text = text.replace('AI Personal Assistant Setup — Automated Scheduling & Workflow Management', data.seoTitle);
  text = text.replace('Build your own AI-powered personal assistant that handles scheduling, email triage, research, and task management across ChatGPT, Claude, Gemini, and Notion AI.', data.seoDesc);
  
  // Replace hero block
  text = text.replace('🧘', data.emoji);
  text = text.replace('from-emerald-500/25 via-teal-500/15 to-tech-800', data.gradient);
  text = text.replace('from-emerald-500 to-teal-500', data.iconBg);
  text = text.replace('Settings', data.heroIcon);
  text = text.replace('AI Personal Assistant Setup', data.title);
  
  // Replace subtitle
  text = text.replace('Scheduling, email & workflow automation', data.subtitle);
  
  // Replace hero description
  text = text.replace('Build your own AI-powered personal assistant that handles scheduling, email triage, research, and task management across ChatGPT, Claude, Gemini, and Notion AI. Designed for busy professionals, entrepreneurs, and anyone overwhelmed by daily admin tasks.', data.heroDesc);
  
  // Replace hero trust lines
  text = text.replace('Trusted by 500+ professionals', data.heroTrust1);
  text = text.replace('30-Day Money-Back Guarantee — save 10 hours/week or get refunded', data.heroTrust2);
  
  // Replace product ID in checkout  
  text = text.replace(/ai-personal-assistant-setup/g, data.productId);
  
  // Replace prices  
  text = text.replace('$12', data.price);
  
  // Write output
  const outDir = 'app/playbooks/' + slug;
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(outDir + '/page.tsx', text);
  console.log('Wrote ' + slug + ' (' + (text.length / 1024).toFixed(1) + ' KB)');
  return text;
}

// DATA for each slug
writeForSlug('ai-for-hr-and-recruiting', {
  fnInner: 'AiForHrAndRecruitingInner',
  fnPage: 'AiForHrAndRecruitingPage',
  seoTitle: 'AI for HR &amp; Recruiting Automated Scheduling &amp; Workflow Management',
  seoDesc: 'Revolutionize your HR workflows with AI: automated resume screening, structured interview guides, personalized onboarding, and employee sentiment analysis.',
  emoji: '\u{1F465}',
  gradient: 'from-violet-500/25 via-purple-500/15 to-tech-800',
  iconBg: 'from-violet-500 to-purple-500',
  heroIcon: 'Users',
  title: 'AI for HR &amp; Recruiting',
  subtitle: 'Resume screening, interview prep &amp; onboarding automation',
  heroDesc: 'Revolutionize your HR workflows with AI: automated resume screening, structured interview guides, personalized onboarding, performance review drafting, and employee sentiment analysis. Designed for HR professionals, recruiters, and team leads at growing companies.',
  heroTrust1: 'Used by 100+ HR teams',
  heroTrust2: '30-Day Money-Back Guarantee - save 10x or get refunded',
  productId: 'ai-for-hr-and-recruiting',
  price: '$9',
});

writeForSlug('ai-for-social-media-management', {
  fnInner: 'AiForSocialMediaManagementInner',
  fnPage: 'AiForSocialMediaManagementPage',
  seoTitle: 'AI for Social Media Management Content Growth Automation',
  seoDesc: 'Manage social media with AI: content calendars, captions, visuals, scheduling, and analytics across platforms using ChatGPT and Canva AI.',
  emoji: '\u{1F4F1}',
  gradient: 'from-pink-500/25 via-rose-500/15 to-tech-800',
  iconBg: 'from-pink-500 to-rose-500',
  heroIcon: 'Globe',
  title: 'AI for Social Media Management',
  subtitle: 'Content calendars, captions &amp; growth with AI',
  heroDesc: 'Manage your entire social media presence with AI: content strategy, post generation, scheduling, analytics, and audience engagement across platforms. From solo creators to brand teams, AI handles the heavy lifting while you focus on community.',
  heroTrust1: 'Used by 200+ content creators',
  heroTrust2: '30-Day Money-Back Guarantee - grow your audience or get refunded',
  productId: 'ai-for-social-media-management',
  price: '$7',
});

writeForSlug('ai-for-personal-finance', {
  fnInner: 'AiForPersonalFinanceInner',
  fnPage: 'AiForPersonalFinancePage',
  seoTitle: 'AI for Personal Finance Budgeting Investment Playbook',
  seoDesc: 'Take control of your finances with AI. Track spending, optimize budgets, analyze investments using QuickBooks, ChatGPT, and Notion AI.',
  emoji: '\u{1F4B0}',
  gradient: 'from-emerald-500/25 via-green-500/15 to-tech-800',
  iconBg: 'from-emerald-500 to-green-500',
  heroIcon: 'DollarSign',
  title: 'AI for Personal Finance &amp; Budgeting',
  subtitle: 'Manage money smarter with AI-powered tracking and analysis',
  heroDesc: 'Use AI to track spending, optimize budgets, analyze investments, and reduce financial stress. Combines QuickBooks Intuit Assist for accounting, ChatGPT for personalized advice, and Notion AI for goal tracking. No finance degree required.',
  heroTrust1: 'Save $200-500/month with AI-identified optimizations',
  heroTrust2: '30-Day Money-Back Guarantee - save money or get refunded',
  productId: 'ai-for-personal-finance',
  price: '$9',
});

console.log('\nAll 3 files written successfully.');
