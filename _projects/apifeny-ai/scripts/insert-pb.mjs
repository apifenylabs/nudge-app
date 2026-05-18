import { readFileSync, writeFileSync } from 'fs';

const content = readFileSync('lib/playbooks.ts', 'utf-8');
function p(s) { return JSON.stringify(s); }

function makePlaybook(slug, title, subtitle, desc, metaTitle, metaDesc, tools, difficulty, minutes, icon, gradient, stage, revenue, steps, tips, mistakes, results) {
  const stepsStr = steps.map(s => {
    let str = `    { title: ${p(s.title)}, description: ${p(s.desc)}`;
    if (s.tip) str += `, tip: ${p(s.tip)}`;
    return str + ' }';
  }).join(',\n');
  const tipsStr = tips.map(t => `    ${p(t)}`).join(',\n');
  const mistakesStr = (mistakes || []).map(m => `    { mistake: ${p(m.mistake)}, fix: ${p(m.fix)} }`).join(',\n');
  const resultsStr = (results || []).map(r => `    { metric: ${p(r.metric)}, value: ${p(r.value)}, description: ${p(r.desc)} }`).join(',\n');

  return `{
    slug: ${p(slug)},
    title: ${p(title)},
    subtitle: ${p(subtitle)},
    description: ${p(desc)},
    meta_title: ${p(metaTitle)},
    meta_description: ${p(metaDesc)},
    related_tool_slugs: [${tools.map(t => `'${t}'`).join(', ')}],
    difficulty: ${p(difficulty)},
    read_time_minutes: ${minutes},
    icon: ${p(icon)},
    gradient: ${p(gradient)},
    steps: [
${stepsStr}
    ],
    pro_tips: [
${tipsStr}
    ],
    common_mistakes: [
${mistakesStr}
    ],
    pipeline_stage: ${p(stage)},
    revenue_impact: ${p(revenue)},
    real_results: [
${resultsStr}
    ],
  }`;
}

// --- Playbook 1: A/B Testing & Experiments ---
const pb1 = `  // ══════════════════════════════════════════════════════════════════════════
  // PLAYBOOK 59.5: AI for A/B Testing & Experiments
  // ══════════════════════════════════════════════════════════════════════════
  ${makePlaybook(
  'ai-for-ab-testing-experiments',
  'AI for A/B Testing & Experiments',
  'Design, run and analyze experiments with AI',
  'Run data-driven A/B tests and experiments with AI assistance: formulate testable hypotheses, calculate required sample sizes, design experiment variants, analyze results with statistical rigor, and automate experiment documentation. Built for product managers, growth marketers, and data analysts who want to make confident, evidence-based decisions.',
  'AI for A/B Testing & Experiments \u2014 Design & Analyze Tests | Apifeny AI',
  'Design and analyze A/B tests with AI. Formulate hypotheses, calculate sample sizes, analyze results statistically, and automate experiment documentation.',
  ['chatgpt', 'claude', 'google-analytics', 'hotjar', 'optimizely'],
  'Intermediate', 10, '\uD83E\uDDEA', 'from-purple-500/30 to-pink-500/30',
  'marketing', 'Typical A/B testing program with AI optimization drives 15-30% conversion improvement over 6-12 months',
  [
    { title: 'Formulate testable hypotheses with Claude', desc: 'Describe your conversion problem and ask Claude to generate structured hypotheses: "Our checkout page has a 45% drop-off at the payment step. Generate 5 testable hypotheses with rationale, predicted impact, and success metrics for each." Claude uses behavioral science principles to suggest meaningful variations.', tip: 'Prompt: "Based on this Hotjar session recording transcript: [paste key observations]. Generate 3 A/B test hypotheses with the reason behind each, minimum detectable effect, primary and secondary metrics, and segment to target."' },
    { title: 'Calculate sample size and test duration with ChatGPT', desc: 'Use ChatGPT to determine how long your test needs to run: "I get 2,000 visitors/day to my pricing page with a current 3.2% conversion rate. I want to detect a 15% relative improvement with 80% power and 95% confidence. What sample size do I need and how many days should I run the test?"', tip: 'Always calculate for at least 1-2 full business cycles. B2B SaaS needs 2-4 weeks minimum. B2C ecommerce can run 7-14 days.' },
    { title: 'Design experiment variants with ChatGPT + Claude', desc: 'Describe your control page/email/ad and ask both ChatGPT and Claude to propose variants. Each AI suggests different approaches: ChatGPT focuses on copy and value props, Claude on structure and psychology. Combine the best elements from both.', tip: 'Create a variant matrix: ask Claude to generate minimum viable change variants and moonshot variants. This gives you both safe and ambitious tests to run.' },
    { title: 'Set up tracking and implement the test', desc: 'Use ChatGPT to generate the tracking implementation code: "I need to track variant assignment, page views, button clicks, form submissions, and revenue per user in Google Analytics 4. Generate the dataLayer push events and GA4 event configuration for an A/B test on the pricing page."' },
    { title: 'Analyze results with statistical rigor', desc: 'When the test concludes, paste the raw data into Claude: "Here are the results of a 14-day A/B test: Variant A (control): 14,230 visitors, 455 conversions (3.20%). Variant B: 14,185 visitors, 521 conversions (3.67%). Calculate: statistical significance using Bayesian and frequentist methods, confidence intervals, practical significance, segment-level effects."', tip: 'Ask for a peeking correction: "Adjust the p-value for continuous monitoring. I checked results on days 3, 7, 10, and 14. Apply sequential testing correction."' },
    { title: 'Document learnings and plan next tests', desc: 'Use AI to create a structured experiment report: "Turn these A/B test results into a one-page executive summary with: headline result, key learnings, segment breakdowns, revenue impact estimate, and 3 follow-up experiments to run next." Save all reports in a shared Experiment Library.', tip: 'Create a Notion database for experiments. Ask ChatGPT to auto-populate: experiment name, hypothesis, test design, results, statistical significance, learnings, and next steps.' },
  ],
  [
    'Run ghost tests first: split traffic 50/50 with NO changes to each variant. If you get a significant result, your methodology is flawed',
    'For sequential testing, use Always Valid Inference (AVI) instead of traditional p-values. ChatGPT can recommend the right method for your test',
    'Build a test idea backlog in Notion: ask AI to generate 50 experiment ideas from your analytics data, then prioritize by expected impact and effort',
  ],
  [
    { mistake: 'Ending tests too early when results look significant', fix: 'Never peek at results. If you must monitor, use sequential testing. Ask ChatGPT how many false positives you would get if you check p-values daily.' },
    { mistake: 'Running too many concurrent tests that interfere with each other', fix: 'Limit overlapping tests to 2-3 max on the same page/funnel. Ask Claude which experiments can run simultaneously without interference.' },
    { mistake: 'Not segmenting results before declaring a winner', fix: 'Always ask AI to check Simpson Paradox: segment A/B test results by device type, traffic source, and new vs returning users before concluding.' },
  ],
  [
    { metric: 'Test Velocity', value: '4x faster', desc: 'AI handles hypothesis generation, sample size calc, variant design, and analysis' },
    { metric: 'Winner Confidence', value: '95% Bayesian CI', desc: 'AI-powered Bayesian analysis provides intuitive confidence estimates' },
    { metric: 'Documentation Time', value: '90% reduction', desc: 'AI generates structured experiment reports automatically from raw data' },
  ]
)}`;

// --- Playbook 2: Compliance & Regulatory Monitoring ---
const pb2 = `  // ══════════════════════════════════════════════════════════════════════════
  // PLAYBOOK 60.5: AI for Compliance & Regulatory Monitoring
  // ══════════════════════════════════════════════════════════════════════════
  ${makePlaybook(
  'ai-for-compliance-regulatory-monitoring',
  'AI for Compliance & Regulatory Monitoring',
  'Track regulations, automate compliance checks, and reduce risk with AI',
  'Use AI to stay compliant across multiple jurisdictions: monitor regulatory changes in real-time, automate compliance document reviews, generate policy documentation, conduct risk assessments, and prepare for audits. Built for compliance officers, legal teams, risk managers, and startup founders who need cost-effective compliance programs.',
  'AI for Compliance & Regulatory Monitoring \u2014 Automate Compliance | Apifeny AI',
  'Stay compliant across jurisdictions with AI. Monitor regulatory changes, automate compliance reviews, generate policies, assess risks, and prepare for audits.',
  ['chatgpt', 'claude', 'gemini', 'perplexity', 'exa'],
  'Advanced', 11, '\uD83D\uDEE1\uFE0F', 'from-slate-700/30 to-blue-800/30',
  'operations', 'Avoid regulatory fines averaging $4-20M for GDPR violations and maintain revenue by passing customer security reviews',
  [
    { title: 'Monitor regulatory changes with Perplexity + Exa', desc: 'Set up automated monitoring: ask Perplexity to track specific regulatory bodies (SEC, GDPR, CCPA, MAS, HKMA) and Exa to search for recent regulatory announcements, enforcement actions, and proposed rule changes. Create a weekly regulatory digest for your industry and jurisdictions.', tip: 'Prompt for Perplexity: "Create a weekly regulatory monitoring brief for a SaaS company operating in the US and EU. Track: SEC cybersecurity rules, GDPR enforcement actions, CCPA amendments, and any AI-specific regulations. Include links to primary sources."' },
    { title: 'Review documents for compliance gaps with Claude', desc: 'Upload contracts, privacy policies, terms of service, and marketing materials to Claude. Ask it to review against specific regulatory requirements: "Review this privacy policy against GDPR Articles 12-22 (data subject rights), CCPA consumer rights, and our jurisdiction requirements. Flag: missing disclosures, insufficient consent mechanisms, data retention gaps, and cross-border transfer issues."', tip: 'Create a compliance review prompt template with your specific regulatory requirements. Claude can process 100+ page documents and flag issues with specific clause references.' },
    { title: 'Generate compliance policies with ChatGPT', desc: 'Create complete compliance documentation: "Generate a data protection policy for a B2B SaaS company that processes customer data, uses subprocessors (Stripe, AWS, SendGrid), and collects billing and usage data. Cover: GDPR Art 28 (data processing), CCPA compliance, breach notification procedures, data retention schedule, and employee training requirements."', tip: 'Always have a compliance lawyer review AI-generated policies before adoption. Use AI as a drafting tool, not a final authority.' },
    { title: 'Perform risk assessments with Gemini', desc: 'Use Gemini large context to process your entire compliance landscape: "Perform a comprehensive risk assessment: identify high-risk data flows, vendor compliance gaps, policy-to-practice mismatches, and prioritize remediation actions by risk level."', tip: 'Upload a data flow diagram as an image and ask Gemini to analyze it for privacy risks.' },
    { title: 'Prepare for audits with AI-powered documentation', desc: 'Use ChatGPT to organize and generate audit evidence: "Generate a complete control evidence inventory, a timeline of evidence collection activities, interview question banks for each control, and a gap analysis against the Trust Services Criteria. Also draft the management assertion letter."', tip: 'Create an Audit Readiness checklist in Notion with AI-generated tasks. Claude can review against your specific audit framework.' },
    { title: 'Automate ongoing compliance monitoring', desc: 'Set up recurring compliance workflows: "Design a weekly compliance monitoring system. Perplexity fetches regulatory updates. Claude reviews them against our current policies. ChatGPT drafts policy update recommendations. Notion AI creates a compliance status report with actionable items."', tip: 'Create a compliance dashboard in Notion: track regulatory changes, policy review status, audit readiness score, and remediation deadlines.' },
  ],
  [
    'Create a Regulatory Compass document in Notion: ChatGPT maintains a living document tracking all applicable regulations, enforcement trends, and compliance deadlines',
    'Set up automated regulatory radar alerts: use Exa to monitor regulatory websites. Claude analyzes each alert for materiality and urgency',
    'Use AI to train your team: generate role-specific compliance training modules, quiz questions, and simulated breach scenarios for incident response drills',
  ],
  [
    { mistake: 'Trusting AI for compliance without human verification', fix: 'Always use a three-layer review: AI draft, compliance team review, external counsel sign-off for critical documents.' },
    { mistake: 'Not tracking regulatory changes across all operating jurisdictions', fix: 'Set up Perplexity and Exa monitors for EVERY jurisdiction you operate in. Missing a regional privacy law can be as costly as missing GDPR.' },
  ],
  [
    { metric: 'Policy Drafting Time', value: '80% faster', desc: 'AI drafts complete compliance policies in hours instead of weeks' },
    { metric: 'Regulatory Monitoring', value: '24/7 coverage', desc: 'AI monitors 15+ regulatory bodies continuously, catching changes within 24 hours' },
    { metric: 'Audit Prep Time', value: '60% reduction', desc: 'AI organizes evidence, generates docs, and identifies gaps 2.5x faster' },
  ]
)}`;

// --- Playbook 3: Copywriting & Conversion ---
const pb3 = `  // ══════════════════════════════════════════════════════════════════════════
  // PLAYBOOK 67.5: AI for Copywriting & Conversion
  // ══════════════════════════════════════════════════════════════════════════
  ${makePlaybook(
  'ai-for-copywriting-conversion',
  'AI for Copywriting & Conversion',
  'Write persuasive copy that converts browsers into buyers',
  'Master AI-powered copywriting for high-conversion marketing: craft landing page copy, ad headlines, email sequences, product descriptions, and CTAs that drive action. Learn proven frameworks (AIDA, PAS, BAB), tone calibration, and how to test and iterate with AI. Designed for marketers, founders, and content creators.',
  'AI for Copywriting & Conversion \u2014 Write High-Converting Copy | Apifeny AI',
  'Write persuasive marketing copy with AI. Use AIDA, PAS, and BAB frameworks, craft landing pages, ads, emails, and CTAs that convert. Test and iterate with ChatGPT and Claude.',
  ['chatgpt', 'claude', 'gemini', 'canva-ai', 'perplexity', 'hotjar'],
  'Intermediate', 10, '\u2712\uFE0F', 'from-rose-500/30 to-orange-500/30',
  'marketing', 'Well-optimized AI copywriting typically improves conversion rates by 25-60% across landing pages, emails, and ads',
  [
    { title: 'Audience research with Perplexity', desc: 'Before writing a single word, research your audience: "Find the top 10 pain points, objections, desires, and buying triggers for [target audience] purchasing [product]. Include verbatim quotes from reviews, forums, and social media." Feed these insights into your copy as the foundation.', tip: 'Create an Audience Insights document in Notion: paste Perplexity findings and ask ChatGPT to extract top pain points, emotional triggers, decision criteria, and common objections.' },
    { title: 'Choose and apply a proven copy framework', desc: 'Ask ChatGPT to write copy using specific frameworks. Prompt: "Write a landing page headline and subheadline for [product] targeting [audience] using the PAS framework (Problem-Agitate-Solution). Also generate an alternative using BAB (Before-After-Bridge). Keep each under 60 characters."', tip: 'Create a Framework Library: save versions of your copy written with AIDA, PAS, BAB, FAB, and 4 Ps. Claude can analyze which framework performs best for different audience segments.' },
    { title: 'Craft magnetic headlines and CTAs with ChatGPT', desc: 'Generate 20 headline and CTA variations per page: "Write 20 headline variations for a landing page selling [product] to [audience]. Include: benefit-driven, curiosity-gap, how-to, question-based, statistic-driven, and objection-busting angles."', tip: 'Prompt for CTAs: "Generate 5 low-friction and 5 high-commitment CTAs. Low-friction = See Plans or Calculate Your Savings. High-commitment = Start My Free Trial or Book a Demo."' },
    { title: 'Calibrate tone and voice with Claude', desc: 'Upload 3-5 existing brand content samples to Claude. Ask: "Analyze these pieces of brand content. Extract tone descriptors, sentence length patterns, vocabulary preferences, and emotional register. Then rewrite this piece of copy to match this brand voice exactly."', tip: 'Save a Brand Voice Brief generated by Claude: a complete voice and tone guide with examples. Use this brief for every AI copy generation request.' },
    { title: 'Optimize for conversions with AI analysis', desc: 'Paste your current page/ad/email copy into Claude and ask: "Analyze this copy for conversion optimization. Identify clarity issues, friction points, missing elements (social proof, risk reversal, scarcity), and emotional disconnect. Suggest specific rewrites for each issue."', tip: 'Combine AI copy analysis with real user data: feed Hotjar session recordings into ChatGPT and ask it to rewrite copy based on actual user behavior.' },
    { title: 'Iterate with AI-powered A/B copy variants', desc: 'Ask ChatGPT to generate optimized variants based on test data: "Variant A has 3.8% CTR. Variant B has 4.2% CTR but 2.5% lower conversion. Generate 5 new headline + subheadline combinations that combine the emotional appeal of B with the clarity of A."', tip: 'Build a Winning Copy Archive: every time an A/B test produces a winner, paste both variants into Claude and ask what patterns it sees across winning vs losing variations.' },
  ],
  [
    'Use the tell-me-why technique: after ChatGPT generates copy, ask "Why did you write it this way? What psychological principle did you use?" The explanation teaches you more than the copy itself',
    'For long-form sales pages, use the ladder approach: ask ChatGPT to write each section separately, then ask Claude to stitch them with smooth transitions',
    'Create a CRO Copy Review checklist in Notion: AI checks each piece against 10-15 conversion principles including clarity over persuasion, one CTA per section, and social proof above the fold',
  ],
  [
    { mistake: 'Using AI to write copy that sounds like AI', fix: 'After AI generates copy, run a humanization pass: "Rewrite this to sound like a real person. Remove perfect grammar, unnatural transitions, and corporate jargon. Add sentence fragments and personality."' },
    { mistake: 'Writing for everyone equals converting no one', fix: 'Define a single reader persona before every prompt. Include: "Write this for [name], a [role] at a [company type] who struggles with [specific pain] and wants [specific outcome]."' },
  ],
  [
    { metric: 'Copy Production Speed', value: '10x faster', desc: 'From brief to first draft in 5 minutes vs 45 minutes writing from scratch' },
    { metric: 'Headline CTR Improvement', value: '+45% average', desc: 'AI-generated headline variations outperform author-written headlines in controlled A/B tests' },
    { metric: 'CPA Reduction', value: '-35%', desc: 'AI-optimized ad copy reduces cost per acquisition by testing more variants faster' },
  ]
)}`;

// --- Playbook 4: Landing Page Optimization ---
const pb4 = `  // ══════════════════════════════════════════════════════════════════════════
  // PLAYBOOK 30.5: AI for Landing Page Optimization
  // ══════════════════════════════════════════════════════════════════════════
  ${makePlaybook(
  'ai-for-landing-page-optimization',
  'AI for Landing Page Optimization',
  'Build and optimize landing pages that convert more visitors',
  'Design, build, and continuously improve high-converting landing pages with AI: from wireframing and copywriting to heatmap analysis and variant generation. Use ChatGPT for copy and structure, Claude for visual design feedback, Canva AI for assets, and Hotjar for user behavior insights. Perfect for marketers, founders, and growth teams.',
  'AI for Landing Page Optimization \u2014 Build High-Converting Pages | Apifeny AI',
  'Build and optimize landing pages with AI. Generate wireframes, write converting copy, analyze heatmaps, and run A/B tests with ChatGPT, Claude, Canva AI, and Hotjar.',
  ['chatgpt', 'claude', 'canva-ai', 'hotjar', 'google-analytics', 'optimizely'],
  'Intermediate', 10, '\uD83D\uDCC4', 'from-green-500/30 to-teal-500/30',
  'marketing', 'Well-optimized landing pages convert 2-5x better than average, directly increasing revenue from every traffic source',
  [
    { title: 'Wireframe your landing page with Claude', desc: 'Describe your offer and audience: "I need a landing page for [product/service] targeting [audience]. The goal is [primary conversion]. Design a wireframe with: hero section, social proof bar, problem/solution, feature highlights (3-column), testimonials, FAQ accordion, and final CTA. Describe the layout, hierarchy, and psychology for each section."', tip: 'Ask Claude to generate the wireframe in ASCII or Mermaid format for a visual layout you can iterate on before building.' },
    { title: 'Generate page copy with ChatGPT using AIDA', desc: 'Write complete page copy section by section using AIDA: "Attention: hook headline + subheadline. Interest: problem-describe section with specific pain points. Desire: feature-benefit table, social proof with metrics. Action: clear CTA with urgency and risk reversal."', tip: 'Prompt for risk reversal: "Generate 5 risk reversal options: money-back guarantee, free trial, no-commitment demo, performance guarantee, and satisfaction promise."' },
    { title: 'Design visual assets with Canva AI', desc: 'Use Canva Magic Studio to generate hero images, product mockups, testimonial card templates, icon sets, and CTA button styles. Canva AI generates on-brand visuals from text descriptions.', tip: 'Create a Canva brand kit first: upload your logo, brand colors, and fonts. Canva AI generates matching assets automatically.' },
    { title: 'Build the page with low or no code', desc: 'Use ChatGPT to generate complete HTML/CSS: "Generate a responsive landing page with Tailwind CSS: hero with gradient background, CTA with hover animation, 3-column feature grid, testimonial carousel, FAQ accordion, sticky conversion bar, and mobile-first design."', tip: 'For A/B testing, build 2-3 variants at once. Ask ChatGPT to generate variant A (benefit-driven), variant B (curiosity-gap), and variant C (social-proof heavy).' },
    { title: 'Add conversion elements: trust signals, urgency, CTAs', desc: 'Use AI to identify missing conversion elements: "Review this landing page draft. Add: trust badges, social proof counters, scarcity indicators, guarantee badges, live chat preview, and exit-intent popup."', tip: 'Ask Claude to role-play as a skeptical buyer: "Read each section and tell me: what would make me bounce? What questions are unanswered?"' },
    { title: 'Analyze behavior and optimize continuously', desc: 'Feed Hotjar and Google Analytics data into AI: "I have 30 days of Hotjar data showing 58% scroll depth and 23% CTA click rate. Analyze and recommend specific sections to restructure, CTA placement optimization, and 3 A/B tests to run next."', tip: 'Create an Optimization Loop: AI uses Hotjar data, recommends tests, you implement, 2 weeks of data, AI analyzes, recommends next iteration. Run every 2 weeks.' },
  ],
  [
    'Build a Landing Page Template Library: have ChatGPT generate 5-10 templates for different purposes (SaaS trial, ebook download, webinar, product launch, waitlist)',
    'For SEO landing pages, first ask Perplexity: "What keywords does a landing page for [product] need to rank for?" Include those keywords in AI-generated copy',
    'Use Claude to review your page against 20 cognitive biases: social proof, loss aversion, scarcity, authority, reciprocity. Each section should leverage at least one',
  ],
  [
    { mistake: 'Too many CTAs competing for attention', fix: 'One page = one primary CTA. Ask ChatGPT: "If this page can only have one button, what should it say?" Everything else supports that action.' },
    { mistake: 'Launching without mobile optimization', fix: 'Generate the mobile version alongside desktop: "Same page optimized for mobile. Different layout, stacked, thumb-friendly CTA, shorter copy." Test on a real phone before launch.' },
  ],
  [
    { metric: 'Conversion Rate Lift', value: '+35-200%', desc: 'AI-optimized landing pages outperform manually-designed pages' },
    { metric: 'Time to Launch', value: '4 hours', desc: 'From wireframe to published page using AI for copy, design, and code' },
    { metric: 'A/B Test Win Rate', value: '72%', desc: 'AI-generated variants win 72% of tests against human-designed originals' },
  ]
)}`;

// --- Playbook 5: Pricing Strategy & Optimization ---
const pb5 = `  // ══════════════════════════════════════════════════════════════════════════
  // PLAYBOOK 67.8: AI for Pricing Strategy & Optimization
  // ══════════════════════════════════════════════════════════════════════════
  ${makePlaybook(
  'ai-for-pricing-strategy-optimization',
  'AI for Pricing Strategy & Optimization',
  'Set and optimize prices that maximize revenue with AI',
  'Use AI to develop data-driven pricing strategies: analyze market pricing, evaluate willingness-to-pay, design pricing tiers, model revenue scenarios, and run price optimization experiments. Built for SaaS founders, product managers, ecommerce owners, and consultants who want evidence-based pricing decisions.',
  'AI for Pricing Strategy & Optimization \u2014 Maximize Revenue | Apifeny AI',
  'Develop data-driven pricing with AI. Analyze markets, model willingness-to-pay, design tiers, optimize prices, and run revenue experiments.',
  ['chatgpt', 'claude', 'gemini', 'perplexity', 'exa', 'google-analytics'],
  'Advanced', 12, '\uD83D\uDCB0', 'from-emerald-600/30 to-yellow-500/30',
  'strategy', 'Strategic pricing optimization typically increases revenue by 15-35% with no changes to the product or marketing spend',
  [
    { title: 'Analyze competitor pricing with Exa + Perplexity', desc: 'Use Exa to scan competitor pricing pages: "Find pricing pages for top 20 competitors in [market]. Extract: pricing model (per-seat, usage-based, tiered), exact pricing per tier, feature differentiation, recent price changes." Use Perplexity for industry pricing benchmarks.', tip: 'Set up weekly Exa monitoring for competitor pricing changes. When a competitor changes price, ask AI: "What does this signal about market conditions? Should we follow, hold, or undercut?"' },
    { title: 'Estimate willingness-to-pay with Claude + surveys', desc: 'Analyze pricing survey data with Claude: "I have 200 responses from a Van Westendorp Price Sensitivity survey. Calculate: points of marginal cheapness/expensiveness, optimal price point, and indifference price point. Also run Gabor-Granger demand analysis. Recommend 3 pricing tiers."', tip: 'Combine methods: Van Westendorp for acceptable range, Gabor-Granger for demand curve, conjoint for feature valuation. ChatGPT can design the conjoint survey.' },
    { title: 'Design pricing tiers with ChatGPT', desc: 'Design feature-differentiated tiers: "Design a 3-tier SaaS pricing model. Specify for each tier: price, feature set, restrictions, and the good-better-best psychology behind the layout. Apply decoy effect, anchoring, and charm pricing."', tip: 'Ask ChatGPT: "Apply these pricing psychology principles: decoy effect, anchoring (show expensive first), charm pricing ($99 vs $100), and flat-rate bias."' },
    { title: 'Model revenue scenarios with Gemini', desc: 'Build financial models: "Model 5 pricing scenarios: (1) 20% price increase with -10% conversion impact, (2) lower-priced tier introduction, (3) annual-only with 15% discount, (4) usage-based component, (5) freemium tier. Project revenue, ARPU, churn, and LTV over 12 months for each."', tip: 'Ask Gemini for a Monte Carlo simulation: "Run 10,000 simulations with randomized inputs. Show expected revenue range, 80% confidence interval, and worst-case scenario."' },
    { title: 'Design and run pricing experiments', desc: 'Set up controlled experiments: "Design a pricing A/B test. Current price $X. Test 15% price increase vs control. Define: minimum detectable effect, sample size, duration, success metrics (conversion rate, revenue per visitor, churn), and guardrail metrics."', tip: 'For B2B, use vanity pricing tests: show different prices to different leads during demos. Ask Claude to design the experiment with statistical rigor.' },
    { title: 'Analyze post-change metrics and iterate', desc: 'After implementing a price change, feed post-launch data into AI: "It has been 30 days since our 15% price increase. Compare conversion rate before/after, revenue per visitor, churn rate by segment, and support ticket volume. Is this a success? What should we do next?"', tip: 'Ask AI for a price elasticity calculation: "Based on our before/after data, what is our price elasticity of demand? At what price point would revenue be maximized?"' },
  ],
  [
    'Create a Pricing Playbook in Notion: document every pricing decision, experiment result, and market data point. AI maintains it and surfaces patterns over time',
    'Use the price ladder test: show 5 different prices to 5 random groups for 48 hours. AI analyzes which price maximizes revenue without killing conversion',
    'Monitor price anchoring in your sales conversations: ask ChatGPT to analyze sales call transcripts for how price objections are raised and overcome',
  ],
  [
    { mistake: 'Setting price based solely on cost-plus without considering willingness-to-pay', fix: 'Always triangulate: competitor pricing analysis + willingness-to-pay survey + revenue modeling. AI can run all three analyses from your inputs.' },
    { mistake: 'Changing prices without measuring all downstream effects', fix: 'Track 10+ metrics before and after a price change: conversion rate, ARPU, churn rate by segment, support volume, feature adoption, NPS, revenue churn vs logo churn.' },
    { mistake: 'Pricing too low because of fear', fix: 'Ask Claude to play devils advocate for higher prices: "Argue why we should raise prices by 30%. The more persuasive, the better. Then counter-argue for not raising."' },
  ],
  [
    { metric: 'Revenue Lift', value: '+15-35%', desc: 'AI-optimized pricing strategies increase revenue independent of product or marketing changes' },
    { metric: 'Pricing Research Time', value: '90% faster', desc: 'Competitive analysis, survey analysis, and revenue modeling that took weeks now takes hours with AI' },
    { metric: 'Confidence Level', value: 'Statistically robust', desc: 'AI ensures pricing experiments have proper sample sizes, segmentation, and statistical rigor' },
  ]
)}`;

// Map insertion markers (in order they appear in file) to the playbook to insert BEFORE that marker
const insertions = [
  // 1. ai-for-ab-testing-experiments before ai-for-api-integration (PLAYBOOK 59)
  { marker: '  // PLAYBOOK 59: AI for API Integration & Backend Automation', pb: pb1 },
  // 2. ai-for-compliance-regulatory-monitoring before ai-for-contract-review (PLAYBOOK 61)
  { marker: '  // PLAYBOOK 61: AI for Contract Review & Legal Analysis', pb: pb2 },
  // 3. ai-for-copywriting-conversion before NEW PLAYBOOK: AI for Corporate Training
  { marker: '  // NEW PLAYBOOK: AI for Corporate Training', pb: pb3 },
  // 4. ai-for-landing-page-optimization before ai-for-language-learning
  { marker: "    slug: 'ai-for-language-learning',\n    title: 'AI for Language Learning", pb: pb4 },
  // 5. ai-for-pricing-strategy-optimization before ai-for-product-roadmap-strategy (PLAYBOOK 68)
  { marker: '  // PLAYBOOK 68: AI for Product Roadmap & Strategy', pb: pb5 },
];

// Verify all markers exist
for (const ins of insertions) {
  if (!content.includes(ins.marker)) {
    console.error(`ERROR: Marker not found: ${ins.marker}`);
    process.exit(1);
  }
}

// Process from end to beginning to avoid position shifts
let result = content;
for (let i = insertions.length - 1; i >= 0; i--) {
  const { marker, pb } = insertions[i];
  const pos = result.lastIndexOf(marker);
  result = result.slice(0, pos) + pb + '\n\n  ' + result.slice(pos);
}

writeFileSync('lib/playbooks.ts', result);
console.log('Done. Inserted 5 playbooks.');
const slugCount = (result.match(/slug: '/g) || []).length;
console.log(`Total slug count: ${slugCount}`);
