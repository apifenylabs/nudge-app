const fs = require('fs');
const path = require('path');

// ====== CONFIGURATIONS ======
const configs = {
  'ai-for-hr-and-recruiting': {
    prefix: 'AIHRRecruiting',
    filePrefix: 'ai-for-hr-and-recruiting',
    title: 'AI for HR & Recruiting',
    subtitle: 'Resume screening, interview prep & onboarding automation',
    heroDesc: "Revolutionize your HR workflows with AI: automated resume screening, structured interview guides, personalized onboarding, performance review drafting, and employee sentiment analysis. Designed for HR professionals, recruiters, and team leads at growing companies.",
    seoTitle: 'AI for HR & Recruiting — Resume Screening & Hiring Automation',
    seoDesc: "Revolutionize your HR workflows with AI: automated resume screening, structured interview guides, personalized onboarding, and employee sentiment analysis.",
    emoji: '👥',
    gradient: 'from-violet-500/25 via-purple-500/15 to-tech-800',
    iconBg: 'from-violet-500 to-purple-500',
    icon: 'Users',
    productId: 'ai-for-hr-and-recruiting',
    price: '$9',
    heroTags: [
      { icon: 'FileText', text: '40+ pages' },
      { icon: 'Clock', text: '8 chapters' },
      { icon: 'Sparkles', text: '5+ AI prompts' },
      { icon: 'Globe', text: 'Updated June 2026' },
    ],
    heroTrust1: 'Used by 100+ HR teams',
    heroTrust2: '30-Day Money-Back Guarantee — save 10x or get refunded',
    stats: [
      { icon: 'SearchIcon', value: '85%', label: 'Faster resume screening', color: 'text-violet-400', bg: 'bg-violet-500/10', border: 'border-violet-500/20' },
      { icon: 'Target', value: '45%', label: 'Reduced time-to-hire', color: 'text-violet-400', bg: 'bg-violet-500/10', border: 'border-violet-500/20' },
      { icon: 'Users', value: '40%', label: 'Better onboarding completion', color: 'text-violet-400', bg: 'bg-violet-500/10', border: 'border-violet-500/20' },
      { icon: 'DollarSign', value: '$10K+', label: 'Saved per hire', color: 'text-violet-400', bg: 'bg-violet-500/10', border: 'border-violet-500/20' },
    ],
    whatYoullLearn: [
      { icon: 'Bot', text: 'Screen resumes at scale', subtext: 'AI-powered candidate ranking' },
      { icon: 'Zap', text: 'Conduct better interviews', subtext: 'AI-generated question banks' },
      { icon: 'Layers', text: 'Automate onboarding', subtext: 'Personalized day-1 workflows' },
      { icon: 'Clock', text: 'Track employee sentiment', subtext: 'AI analysis of feedback data' },
    ],
    sections: [
      { id: 'screening', icon: 'SearchIcon', color: 'text-violet-400', title: 'Automate Resume Screening with ChatGPT', desc: 'Upload batches of resumes and get AI-powered candidate ranking, skill gap analysis, and interview recommendations.', items: ['Uploading anonymized resumes for bias-free screening', 'Ranking candidates against job requirements with match scores', 'Identifying skill gaps, experience levels, and culture-fit indicators', 'Structured output for ATS integration', 'Best practices for fair and effective AI screening'] },
      { id: 'jd', icon: 'FileText', color: 'text-cyan-400', title: 'Generate Job Descriptions with Gemini', desc: 'Create compelling, inclusive job descriptions that attract the right candidates using AI.', items: ['Crafting role-specific job descriptions from a few keywords', 'Using inclusive language to attract diverse candidates', 'Structuring JDs for maximum search visibility', 'Generating multiple versions for different platforms', 'Keeping JD content fresh with AI-powered rewrites'] },
      { id: 'interviews', icon: 'MessageSquare', color: 'text-fuchsia-400', title: 'Prepare Interview Guides with Claude', desc: 'Generate structured interview guides with role-specific questions, scoring rubrics, and candidate-tailored prompts.', items: ['Generating behavioral questions using the STAR method', 'Creating role-specific technical assessment prompts', 'Building scoring rubrics for objective evaluation', 'Tailoring questions to each candidate&#39;s experience', 'Structuring interview kits for consistent hiring'] },
      { id: 'skills', icon: 'Brain', color: 'text-amber-400', title: 'Design Skills Assessments with ChatGPT', desc: 'Create AI-powered skills assessments that accurately evaluate candidate capabilities.', items: ['Designing role-relevant technical challenges', 'Creating take-home assignments with clear rubrics', 'Using AI to evaluate assessment submissions', 'Generating soft-skill scenario questions', 'Balancing depth with candidate time investment'] },
      { id: 'matching', icon: 'Target', color: 'text-emerald-400', title: 'Match Candidates to Roles with Exa + Gemini', desc: 'Use AI to match candidate profiles to open positions with precision and speed.', items: ['Building candidate profiles from resumes and interviews', 'Cross-referencing skills against role requirements', 'Gemini long-context analysis for best-fit matching', 'Handling internal mobility and lateral moves', 'Tracking candidate pipelines with AI insights'] },
      { id: 'onboarding', icon: 'Rocket', color: 'text-green-400', title: 'Create Personalized Onboarding with Notion AI', desc: 'Build automated onboarding workflows that make every new hire feel prepared and welcome from day one.', items: ['Building Notion onboarding templates with role-specific content', 'Auto-filling templates with hire details via Notion AI', 'Creating day-1 checklists and first-week schedules', 'Setting up learning paths and team introductions', 'Linking tool access setup and policy documents'] },
      { id: 'reviews', icon: 'BarChart3', color: 'text-sky-400', title: 'Draft Performance Reviews with ChatGPT', desc: 'Generate balanced performance reviews from accomplishments, feedback, and OKR data.', items: ['Feeding employee data: accomplishments, peer feedback, OKRs', 'Generating balanced reviews with strengths and growth areas', 'Creating SMART goals for the next quarter', 'Drafting development plans and training recommendations', 'Maintaining consistency across the organization'] },
      { id: 'sentiment', icon: 'BarChart3', color: 'text-rose-400', title: 'Analyze Employee Sentiment with Exa + Gemini', desc: 'Monitor and improve employee satisfaction using AI-powered sentiment analysis.', items: ['Gathering data from Glassdoor, Indeed, and internal surveys', 'Running sentiment analysis on employee feedback', 'Identifying trends before they become problems', 'Generating actionable recommendations for leadership', 'Tracking sentiment changes over time'] },
    ],
    includedItems: [
      { icon: 'BookOpen', text: '8 comprehensive chapters', subtext: '40+ pages of actionable content' },
      { icon: 'FileText', text: 'Ready-to-use interview guides', subtext: 'Role-specific question banks' },
      { icon: 'Zap', text: 'AI screening prompt templates', subtext: '5 recruiter-optimized prompts' },
      { icon: 'Layers', text: 'Notion onboarding template pack', subtext: 'Role-specific day-1 plans' },
      { icon: 'DollarSign', text: 'Cost-effective HR tech stack', subtext: 'Full HR setup under $100/mo' },
      { icon: 'Calendar', text: 'Performance review templates', subtext: 'Quarterly review automation' },
    ],
    whoItsFor: [
      { icon: 'Users', text: 'HR professionals', subtext: 'Screen 100+ resumes in 30 minutes instead of 8 hours' },
      { icon: 'Target', text: 'Recruiters & hiring managers', subtext: 'Reduce time-to-hire by 45% with AI matching' },
      { icon: 'Star', text: 'Team leads & managers', subtext: 'Conduct better interviews with AI-generated guides' },
      { icon: 'Lightbulb', text: 'Startup founders', subtext: 'Build your entire hiring pipeline without an HR team' },
    ],
    testimonials: [
      { name: 'Sarah M.', title: 'HR Director', quote: 'We reduced our screening time from 8 hours to 30 minutes per batch of 100 resumes. The AI matching actually surfaces better candidates than our manual process.', stars: 5 },
      { name: 'Alex T.', title: 'Tech Recruiter', quote: 'The interview guides are incredible. I just paste the JD and candidate profile, and Claude generates 10 relevant questions with scoring rubrics. Saves me hours every week.', stars: 5 },
      { name: 'Maya L.', title: 'Startup Founder', quote: 'As a founder with no HR team, this playbook was a lifesaver. I onboarded 5 hires in one week using the Notion AI templates. Everything just works.', stars: 5 },
    ],
    bonuses: [
      { name: 'Notion HR Hub Template', value: '$19', desc: 'Complete workspace with job descriptions, candidate tracker, onboarding plans, and review templates' },
      { name: '5 Recruiter Prompt Templates', value: '$15', desc: 'Pre-built ChatGPT prompts for resume screening, JD writing, interview prep, performance reviews, and sentiment analysis' },
      { name: 'ATS Integration Guide', value: '$13', desc: 'Step-by-step guide to connect AI screening with popular ATS platforms like Lever, Greenhouse, and BambooHR' },
    ],
    faqItems: [
      { q: 'Is this a digital download?', a: 'Yes! The AI for HR &amp; Recruiting playbook is a digital PDF delivered instantly after purchase.' },
      { q: 'Do I need to be technical?', a: 'Not at all. This playbook is designed for HR professionals and recruiters of all technical backgrounds.' },
      { q: 'What tools do I need?', a: 'The core stack uses ChatGPT, Claude, Gemini, Notion AI, Exa, and Perplexity.' },
      { q: 'Can I get a refund?', a: 'Absolutely. 30-day money-back guarantee, no questions asked.' },
      { q: 'Does AI screening introduce bias?', a: 'We cover bias mitigation strategies in detail, including anonymization techniques and regular audit processes.' },
      { q: 'Can I use this with my existing ATS?', a: 'Yes! The bonus ATS integration guide covers connecting AI workflows with Lever, Greenhouse, BambooHR, and more.' },
    ],
  },

  'ai-for-social-media-management': {
    prefix: 'AISocialMediaPage',
    filePrefix: 'ai-for-social-media-management',
    title: 'AI for Social Media Management',
    subtitle: 'Content calendars, captions & growth with AI',
    heroDesc: "Manage your entire social media presence with AI: content strategy, post generation, scheduling, analytics, and audience engagement across platforms. From solo creators to brand teams, AI handles the heavy lifting while you focus on community.",
    seoTitle: 'AI for Social Media Management — Content & Growth Automation',
    seoDesc: "Manage social media with AI: content calendars, captions, visuals, scheduling, and analytics across platforms using ChatGPT and Canva AI.",
    emoji: '📱',
    gradient: 'from-pink-500/25 via-rose-500/15 to-tech-800',
    iconBg: 'from-pink-500 to-rose-500',
    icon: 'Globe',
    productId: 'ai-for-social-media-management',
    price: '$7',
    heroTags: [
      { icon: 'FileText', text: '35+ pages' },
      { icon: 'Clock', text: '8 chapters' },
      { icon: 'Sparkles', text: '30+ caption templates' },
      { icon: 'Globe', text: 'Updated June 2026' },
    ],
    heroTrust1: 'Used by 200+ content creators',
    heroTrust2: '30-Day Money-Back Guarantee — grow your audience or get refunded',
    stats: [
      { icon: 'Zap', value: '5x', label: 'More posts per month', color: 'text-pink-400', bg: 'bg-pink-500/10', border: 'border-pink-500/20' },
      { icon: 'Clock', value: '80%', label: 'Less time spent', color: 'text-pink-400', bg: 'bg-pink-500/10', border: 'border-pink-500/20' },
      { icon: 'TrendingUp', value: '+35%', label: 'Higher engagement', color: 'text-pink-400', bg: 'bg-pink-500/10', border: 'border-pink-500/20' },
      { icon: 'DollarSign', value: '$3K/mo', label: 'Replaced SMM cost', color: 'text-pink-400', bg: 'bg-pink-500/10', border: 'border-pink-500/20' },
    ],
    whatYoullLearn: [
      { icon: 'Bot', text: 'Build content strategy', subtext: 'AI-generated content calendars' },
      { icon: 'Zap', text: 'Write platform captions', subtext: 'Tailored for every network' },
      { icon: 'Layers', text: 'Design visuals at scale', subtext: 'Canva AI batch creation' },
      { icon: 'Clock', text: 'Analyze performance', subtext: 'AI-powered analytics reviews' },
    ],
    sections: [
      { id: 'strategy', icon: 'Target', color: 'text-pink-400', title: 'Define Your Social Media Strategy with ChatGPT', desc: 'Describe your brand, target audience, platforms, and goals. ChatGPT creates platform-specific strategies.', items: ['Creating platform-specific content strategies with AI', 'Building a 30-day posting calendar with content pillars', 'Defining hashtag strategies per platform', 'Setting engagement tactics and KPIs', 'Adapting strategy based on performance data'] },
      { id: 'calendar', icon: 'Calendar', color: 'text-cyan-400', title: 'Build a Monthly Content Calendar with Notion AI', desc: 'Create a Notion-based content calendar that auto-generates post ideas, captions, and scheduling.', items: ['Setting up a Notion database for content planning', 'Using Notion AI to generate monthly post ideas', 'Aligning content with marketing campaigns and events', 'Auto-populating captions and visual notes', 'Tracking post status: draft, reviewed, scheduled, published'] },
      { id: 'captions', icon: 'MessageSquare', color: 'text-fuchsia-400', title: 'Generate Platform-Optimized Captions with ChatGPT', desc: 'Write one key message and adapt it for LinkedIn, X, Instagram, and TikTok with AI.', items: ['Writing short punchy captions for X', 'Crafting professional thought leadership for LinkedIn', 'Creating visual-first stories for Instagram', 'Producing trending content for TikTok', 'Including emojis and hashtags where appropriate'] },
      { id: 'visuals', icon: 'Rocket', color: 'text-amber-400', title: 'Design Visual Content with Canva AI', desc: 'Use Canva Magic Design to generate complete social media posts from text descriptions.', items: ['Generating Instagram posts, LinkedIn banners, and X headers', 'Creating story templates and Reels covers', 'Using Canva Brand Kit for consistent branding', 'Batch-producing 30 visuals in one session', 'Resizing one design for all platforms'] },
      { id: 'scheduling', icon: 'Clock', color: 'text-emerald-400', title: 'Automate Post Scheduling with AI Tools', desc: 'Use scheduling tools to plan and automate your entire month of content in one sitting.', items: ['Setting up Buffer or Hootsuite for scheduling', 'Batch-creating and scheduling a month of content', 'Setting optimal posting times per platform', 'Auto-scheduling from your Notion calendar', 'Managing multiple accounts and time zones'] },
      { id: 'analytics', icon: 'BarChart3', color: 'text-green-400', title: 'Analyze Performance with Gemini', desc: 'Upload your social media analytics and get AI-powered insights and optimization recommendations.', items: ['Exporting analytics: engagement, reach, followers, clicks', 'Uploading to Gemini for performance trend analysis', 'Identifying best-performing content patterns', 'Getting audience insights and demographics', 'Receiving AI-driven optimization recommendations'] },
      { id: 'engagement', icon: 'Users', color: 'text-sky-400', title: 'Boost Audience Engagement with ChatGPT', desc: 'Use AI to craft engaging responses, conversation starters, and community-building content.', items: ['Drafting engaging replies to comments and DMs', 'Creating conversation-starting polls and questions', 'Building community with AI-generated discussion topics', 'Handling negative comments with professional responses', 'Setting up engagement tracking and reporting'] },
      { id: 'growth', icon: 'TrendingUp', color: 'text-rose-400', title: 'Scale Growth with Trend Research & Repurposing', desc: 'Stay ahead of trends and repurpose content across platforms for maximum reach.', items: ['Researching trends with Perplexity for timely content', 'Repurposing one blog post into 5+ social posts', 'Cross-promoting content across all platforms', 'Leveraging viral formats and audio trends', 'Tracking growth metrics and adjusting strategy'] },
    ],
    includedItems: [
      { icon: 'BookOpen', text: '8 comprehensive chapters', subtext: '35+ pages of actionable content' },
      { icon: 'FileText', text: '30+ caption templates', subtext: 'Platform-optimized for each network' },
      { icon: 'Zap', text: 'Canva design templates', subtext: 'Pre-built social media templates' },
      { icon: 'Layers', text: 'Notion content calendar', subtext: 'Monthly planning database' },
      { icon: 'DollarSign', text: 'Cost-effective SMM stack', subtext: 'Full setup under $50/mo' },
      { icon: 'Calendar', text: 'Batch production guide', subtext: 'Create 30 posts in 4 hours' },
    ],
    whoItsFor: [
      { icon: 'Users', text: 'Content creators', subtext: 'Post 30+ times/month without burnout' },
      { icon: 'Target', text: 'Social media managers', subtext: 'Manage 5+ accounts in half the time' },
      { icon: 'Star', text: 'Small business owners', subtext: 'Build brand presence without hiring an SMM' },
      { icon: 'Lightbulb', text: 'Marketing teams', subtext: 'Scale content production 5x with AI' },
    ],
    testimonials: [
      { name: 'Priya K.', title: 'Content Creator', quote: 'I went from posting twice a week to daily across 4 platforms. The batch production system alone saved me 15 hours a week.', stars: 5 },
      { name: 'Marcus J.', title: 'Social Media Manager', quote: 'Managing 6 client accounts used to take 40 hours a week. Now I do it in 10. The content calendar template is pure gold.', stars: 5 },
      { name: 'Emma L.', title: 'Startup Founder', quote: 'Our engagement went up 40% in the first month. The AI caption generator writes better copy than I ever could.', stars: 5 },
    ],
    bonuses: [
      { name: 'Notion Content Calendar Template', value: '$19', desc: 'Complete database with monthly planner, post tracker, platform columns, and auto-generated ideas' },
      { name: 'Canva Brand Kit + Templates', value: '$15', desc: 'Pre-built social media templates for Instagram, LinkedIn, X, and TikTok with brand kit setup' },
      { name: '50 Platform-Specific Caption Prompts', value: '$13', desc: 'Optimized ChatGPT prompts for every platform: LinkedIn thought leadership, X threads, Instagram stories, and more' },
    ],
    faqItems: [
      { q: 'Is this a digital download?', a: 'Yes! The AI for Social Media Management playbook is a digital PDF delivered instantly after purchase.' },
      { q: 'Do I need to be technical?', a: 'Not at all. Designed for content creators, marketers, and business owners of all skill levels.' },
      { q: 'What tools do I need?', a: 'Core stack: ChatGPT, Canva AI, Notion AI, Perplexity, and Gemini. Free tiers available for most.' },
      { q: 'Can I get a refund?', a: 'Absolutely. 30-day money-back guarantee, no questions asked.' },
      { q: 'Is this for one platform or all?', a: 'All major platforms: LinkedIn, X, Instagram, TikTok, Facebook, and YouTube Shorts.' },
      { q: 'How long does it take to implement?', a: 'Most people set up the system in 2-3 hours and create their first month of content in one afternoon.' },
    ],
  },

  'ai-for-personal-finance': {
    prefix: 'AIPersonalFinancePage',
    filePrefix: 'ai-for-personal-finance',
    title: 'AI for Personal Finance & Budgeting',
    subtitle: 'Manage money smarter with AI-powered tracking and analysis',
    heroDesc: "Use AI to track spending, optimize budgets, analyze investments, and reduce financial stress. Combines QuickBooks Intuit Assist for accounting, ChatGPT for personalized advice, and Notion AI for goal tracking. No finance degree required.",
    seoTitle: 'AI for Personal Finance — Budgeting & Investment Playbook',
    seoDesc: "Take control of your finances with AI. Track spending, optimize budgets, analyze investments using QuickBooks, ChatGPT, and Notion AI.",
    emoji: '💰',
    gradient: 'from-emerald-500/25 via-green-500/15 to-tech-800',
    iconBg: 'from-emerald-500 to-green-500',
    icon: 'DollarSign',
    productId: 'ai-for-personal-finance',
    price: '$9',
    heroTags: [
      { icon: 'FileText', text: '35+ pages' },
      { icon: 'Clock', text: '8 chapters' },
      { icon: 'Sparkles', text: '10+ budget prompts' },
      { icon: 'Globe', text: 'Updated June 2026' },
    ],
    heroTrust1: 'Save $200-500/month with AI-identified optimizations',
    heroTrust2: '30-Day Money-Back Guarantee — save money or get refunded',
    stats: [
      { icon: 'DollarSign', value: '$340/mo', label: 'Average savings found', color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' },
      { icon: 'Clock', value: '80%', label: 'Faster budget review', color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' },
      { icon: 'BarChart3', value: '3x', label: 'Efficient research', color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' },
      { icon: 'Target', value: '$6K/yr', label: 'Annual savings potential', color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' },
    ],
    whatYoullLearn: [
      { icon: 'Bot', text: 'Analyze your spending', subtext: 'AI-powered expense categorization' },
      { icon: 'Zap', text: 'Build an AI budget', subtext: 'Personalized to your patterns' },
      { icon: 'Layers', text: 'Research investments', subtext: 'AI with cited sources' },
      { icon: 'Clock', text: 'Track financial goals', subtext: 'Notion AI weekly reviews' },
    ],
    sections: [
      { id: 'accounts', icon: 'Globe', color: 'text-emerald-400', title: 'Connect Your Financial Accounts', desc: 'Link bank accounts, credit cards, and investments to QuickBooks Intuit Assist for automated tracking.', items: ['Linking bank accounts, credit cards, and investment accounts', 'Automated transaction categorization with AI', 'Detecting duplicates and identifying recurring charges', 'Setting up spending personality analysis', 'Creating a complete financial dashboard'] },
      { id: 'budget', icon: 'Target', color: 'text-cyan-400', title: 'Create an AI-Powered Budget', desc: 'Use ChatGPT to analyze your last 3 months of spending and create a personalized budget.', items: ['Analyzing 3 months of transaction data with ChatGPT', 'Setting up the 50/30/20 rule as a starting point', 'Customizing budget categories to your patterns', 'Setting savings targets and debt payoff goals', 'Generating monthly budget vs actual reports'] },
      { id: 'spending', icon: 'BarChart3', color: 'text-fuchsia-400', title: 'Analyze Your Spending with ChatGPT', desc: 'Upload bank statements and get detailed spending analysis, anomaly detection, and actionable recommendations.', items: ['Uploading CSV transactions to ChatGPT Code Interpreter', 'Getting spending categorization and monthly trends', 'Identifying top expenses and savings opportunities', 'Detecting unusual expenses and subscriptions', 'Receiving actionable recommendations to save money'] },
      { id: 'bills', icon: 'MessageSquare', color: 'text-amber-400', title: 'Negotiate Bills & Optimize Subscriptions', desc: 'Use AI to draft negotiation letters, find unused subscriptions, and lower monthly bills.', items: ['Identifying unused subscriptions with AI analysis', 'Drafting negotiation letters for insurance and internet', 'Calling providers with an AI-generated script', 'Negotiating loyalty discounts and better rates', 'Tracking savings from negotiations'] },
      { id: 'investments', icon: 'TrendingUp', color: 'text-emerald-400', title: 'Research Investments with Perplexity', desc: 'Use Perplexity to research stocks, ETFs, and crypto with cited sources and multiple perspectives.', items: ['Researching stocks and ETFs with cited sources', 'Comparing fund performance and fees', 'Getting contrarian views and bear cases', 'Analyzing sector outlook and risk factors', 'Building an investment research routine'] },
      { id: 'goals', icon: 'Target', color: 'text-green-400', title: 'Plan Financial Goals & What-If Scenarios', desc: 'Use Gemini to process your entire financial picture and create comprehensive financial plans.', items: ['Processing full financial picture: accounts, debts, income', 'Creating comprehensive financial plans with Gemini', 'Running what-if scenarios: invest vs pay off debt', 'Building retirement projections and savings plans', 'Setting up quarterly financial audits'] },
      { id: 'taxes', icon: 'FileText', color: 'text-sky-400', title: 'Prepare for Tax Season with ChatGPT', desc: 'Organize tax documents, categorize deductions, and generate preparation checklists with AI.', items: ['Organizing tax documents and deductible expenses', 'Categorizing deductions with ChatGPT analysis', 'Calculating estimated tax liability', 'Generating a tax preparation checklist', 'Identifying potential deductions and credits'] },
      { id: 'reports', icon: 'BarChart3', color: 'text-rose-400', title: 'Generate Financial Reports & Weekly Reviews', desc: 'Set up automated weekly and monthly financial reviews with AI-powered insights.', items: ['Setting up a weekly money review routine', 'Generating automated financial health summaries', 'Tracking net worth changes over time', 'Creating monthly budget vs actual variance reports', 'Receiving AI-driven financial recommendations'] },
    ],
    includedItems: [
      { icon: 'BookOpen', text: '8 comprehensive chapters', subtext: '35+ pages of actionable content' },
      { icon: 'FileText', text: 'Budget prompt templates', subtext: '10+ ChatGPT budget prompts' },
      { icon: 'Zap', text: 'Negotiation letter scripts', subtext: 'AI-generated bill negotiation templates' },
      { icon: 'Layers', text: 'Notion finance dashboard', subtext: 'Goal tracker + net worth calculator' },
      { icon: 'DollarSign', text: 'Cost-effective finance stack', subtext: 'Full setup under $30/mo' },
      { icon: 'Calendar', text: 'Weekly money review routine', subtext: '30-minute Sunday review system' },
    ],
    whoItsFor: [
      { icon: 'Users', text: 'Busy professionals', subtext: 'Track finances without spreadsheets or manual work' },
      { icon: 'Target', text: 'Budget-conscious families', subtext: 'Save $200-500/month with AI-identified optimizations' },
      { icon: 'Star', text: 'New investors', subtext: 'Research stocks and ETFs with AI and cited sources' },
      { icon: 'Lightbulb', text: 'Side hustlers & freelancers', subtext: 'Manage irregular income and tax prep with AI' },
    ],
    testimonials: [
      { name: 'David C.', title: 'Software Engineer', quote: 'The AI found $340/month in savings in the first week. Three unused subscriptions, a cheaper internet plan, and optimized grocery spending. Paid for itself immediately.', stars: 5 },
      { name: 'Lisa W.', title: 'Freelance Designer', quote: 'My Sunday money review went from 1 hour to 15 minutes. ChatGPT categorizes everything and gives me actionable suggestions. My savings rate doubled.', stars: 5 },
      { name: 'Tom H.', title: 'Small Business Owner', quote: 'Investment research that used to take me 45 minutes per stock now takes 8 minutes with Perplexity. Cited sources give me confidence in my decisions.', stars: 5 },
    ],
    bonuses: [
      { name: 'Notion Finance Dashboard Template', value: '$19', desc: 'Complete workspace with goal tracker, net worth calculator, budget vs actual tracker, and weekly review template' },
      { name: '10 ChatGPT Budget Prompts', value: '$15', desc: 'Pre-built prompts for spending analysis, budget creation, subscription audit, bill negotiation, and investment research' },
      { name: 'Investment Research Checklist', value: '$13', desc: 'Step-by-step checklist for researching stocks and ETFs with Perplexity, including source verification and risk assessment' },
    ],
    faqItems: [
      { q: 'Is this a digital download?', a: 'Yes! The AI for Personal Finance &amp; Budgeting playbook is a digital PDF delivered instantly after purchase.' },
      { q: 'Do I need to be technical?', a: 'Not at all. Designed for anyone who wants to take control of their finances with AI assistance.' },
      { q: 'What tools do I need?', a: 'Core stack: QuickBooks Intuit Assist (free tier), ChatGPT, Notion AI, and Perplexity. Most have free tiers.' },
      { q: 'Can I get a refund?', a: 'Absolutely. 30-day money-back guarantee, no questions asked.' },
      { q: 'Is my financial data secure?', a: 'Yes. We cover data privacy best practices including anonymization before uploading to AI tools.' },
      { q: 'Do I need QuickBooks?', a: 'No. Alternative tools and manual approaches are noted throughout the playbook.' },
    ],
  },
};

// ====== TEMPLATE RENDERING ======

function genPage(config) {
  const P = config.prefix;
  const T = config.title;
  const S = config.subtitle;
  
  const sectionItems = JSON.stringify(config.sections.map(s => ({
    id: s.id,
    icon: s.icon,
    color: s.color,
    title: s.title,
    desc: s.desc,
    items: s.items
  })));
  
  const includedItemsJson = JSON.stringify(config.includedItems);
  const whoItsForJson = JSON.stringify(config.whoItsFor);
  const whatYoullLearnJson = JSON.stringify(config.whatYoullLearn);
  const statsJson = JSON.stringify(config.stats);
  const testimonialsJson = JSON.stringify(config.testimonials);
  const bonusesJson = JSON.stringify(config.bonuses);
  const faqItemsJson = JSON.stringify(config.faqItems);
  const heroTagsJson = JSON.stringify(config.heroTags);

  let src = `'use client';

// OG tags handled by parent layout.

import SeoMetadata from '@/components/SeoMetadata';
import { useState, Suspense } from 'react';
import Link from 'next/link';
import {
  ArrowLeft, BarChart3, BookOpen, Bot, Brain, Calendar, CheckCircle, ChevronRight, Clock, DollarSign, Download, FileText, Globe, Layers, Lightbulb, MessageSquare, Rocket, Search as SearchIcon, Shield, ShoppingCart, Sparkles, Star, Target, TrendingUp, Users, Zap
} from 'lucide-react';

// ─── Section Breakdown ──────────────────────────────────────

interface Section {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  items: string[];
}

const sections: Section[] = ${sectionItems.replace(/"icon":/g, '"iconName":').replace(/"color":/g, '"colorName":').replace(/"desc":/g, '"description":')};

// ─── What is Included ───────────────────────────────────────

const includedItems = ${includedItemsJson};

const whoItsFor = ${whoItsForJson};

const whatYoullLearn = ${whatYoullLearnJson};

// ─── Social Proof Stats ────────────────────────────────────

const socialProofStats = ${statsJson};

// ─── Testimonials ──────────────────────────────────────────

const testimonials = ${testimonialsJson};

// ─── Bonuses ───────────────────────────────────────────────

const bonuses = ${bonusesJson};

// ─── FAQ Items ─────────────────────────────────────────────

const faqItems = ${faqItemsJson};

// ─── Checkout Overlay ───────────────────────────────────────

function CheckoutOverlay({ onBack }: { onBack: () => void }) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handlePurchase = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    setStatus('idle');

    try {
      const res = await fetch('/api/create-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, product: '${config.productId}' }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to create checkout');

      window.location.href = data.url;
    } catch (err) {
      setStatus('error');
      setMessage(err instanceof Error ? err.message : 'Something went wrong. Please try again or contact support.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="relative max-w-md w-full bg-tech-800 border border-tech-500/30 rounded-2xl p-6 sm:p-8 shadow-2xl shadow-neon/10">
        <button
          onClick={onBack}
          className="absolute top-4 right-4 text-tech-300 hover:text-white transition"
          aria-label="Close"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="text-center mb-6">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br ${config.iconBg} flex items-center justify-center mb-4">
            <${config.icon} className="w-8 h-8 text-white" />
