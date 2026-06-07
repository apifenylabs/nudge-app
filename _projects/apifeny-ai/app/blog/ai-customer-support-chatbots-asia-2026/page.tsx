import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Calendar, Clock, Users, BookOpen, CheckCircle } from 'lucide-react';
import BreadcrumbSchema from '@/components/BreadcrumbSchema';
import { getRelatedPosts, getRelatedPostsByCategory } from '@/lib/blog-data';

const BASE_URL = 'https://apifeny-ai.vercel.app';

const POST = {
  slug: 'ai-customer-support-chatbots-asia-2026',
  title: `AI Customer Support & Chatbots for Asian Businesses (2026): 15+ Tools for 24/7 Service in English, Mandarin, Japanese, Korean & SEA Languages`,
  excerpt: `From multilingual AI chatbots handling Cantonese-English code-switching to voice agents that understand Singlish — the definitive guide to 15+ AI customer support tools for Asian businesses in 2026.`,
  date: '2026-06-01',
  author: 'Apifeny AI Team',
  tags: ["customer-support", "chatbots", "ai-agents", "asia", "multilingual", "customer-service", "automation", "singapore", "japan", "india", "china", "ecommerce", "zendesk", "intercom", "tidio", "freshdesk"],
  readingTime: '12 min read',
};

export const metadata: Metadata = {
  title: POST.title,
  description: POST.excerpt,
  keywords: [...POST.tags, 'AI customer support', 'chatbots Asia', 'customer service AI', 'Apifeny AI', 'Asian business AI'],
  alternates: { canonical: `${BASE_URL}/blog/${POST.slug}` },
  openGraph: {
    title: POST.title,
    description: POST.excerpt,
    url: `${BASE_URL}/blog/${POST.slug}`,
    type: 'article',
    siteName: 'Apifeny AI',
    images: [{ url: '/og', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: POST.title,
    description: POST.excerpt,
    images: ['/og'],
  },
};

export default function BlogPost() {
  const relatedPosts = (getRelatedPosts as (slug: string, limit: number) => any[])(POST.slug, 3);
  const categoryRelated = getRelatedPostsByCategory(POST.slug, 4);

  const keyTakeaways = [
    "The Asian conversational AI market is projected at $14.2B in 2026 \u2014 31% of the global total",
    "Best platforms for Asia by use case: Zendesk AI (enterprise), Intercom Fin (conversational), Yellow.ai (deepest Asian-language support)",
    "China, Japan, and Korea have indigenous AI chatbot ecosystems requiring local platforms",
    "AI chatbots now handle 75-85% of Asian customer inquiries in local languages",
    "Data privacy compliance varies dramatically: PIPL, PIPA, DPDP Act, and PDPA impose different restrictions"
  ];

  return (
    <div className="min-h-screen bg-white">
      <BreadcrumbSchema
        items={[
          { name: 'Home', item: '/' },
          { name: 'Blog', item: '/blog' },
          { name: POST.title, item: `/blog/${POST.slug}` },
        ]}
      />
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <Link href="/blog" className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-blue-700 transition mb-8">
          <ArrowLeft className="w-4 h-4" />
          Back to Blog
        </Link>
        <header className="mb-10">
          <div className="flex flex-wrap gap-2 mb-4">
            {POST.tags.map((tag: string) => (
              <span key={tag} className="text-xs font-medium px-2.5 py-1 rounded-full border border-blue-200 text-blue-700 bg-blue-50">
                {tag.replace(/-/g, ' ')}
              </span>
            ))}
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">{POST.title}</h1>
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-sm text-gray-500 mb-6">
            <span className="flex items-center gap-1.5"><Users className="w-4 h-4" />{POST.author}</span>
            <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" />{new Date(POST.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
            <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" />{POST.readingTime}</span>
          </div>
          <div className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
            <h2 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2"><BookOpen className="w-5 h-5 text-blue-600" /> Key Takeaways</h2>
            <ul className="space-y-2 text-gray-700">
              {keyTakeaways.map((t: string, i: number) => (
                <li key={i} className="flex gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>
        </header>

        <div
          className="blog-content prose prose-lg max-w-none text-gray-700"
          dangerouslySetInnerHTML={{ __html: `<h2>The Asia Customer Support Challenge</h2>

<p>If you run an ecommerce brand in Singapore, your customers speak English, Mandarin, and probably some Singlish ("Can or not?"). If you sell to Japan, you need keigo (honorific speech) and response times measured in minutes — Japanese customers expect same-hour replies. In Thailand, your support team needs Thai with Romanized slang mixed in. In India, you're juggling Hindi, English, Tamil, and Bengali across 28 states.</p>

<p>Traditional chatbot platforms built for Western markets fail in Asia. They can't handle:</p>

<ul><li><strong>Code-switching</strong>: "This item arrived late ah, can change size or not?"</li>
<li><strong>Language mixing</strong>: "这个 product 有 discount 吗?" (Cantonese + English)</li>
<li><strong>Keigo</strong>: Japanese honorific speech is a completely different grammar register</li>
<li><strong>LINE integration</strong>: 96 million Japanese users — your chatbot MUST live in LINE, not just your website</li>
<li><strong>WhatsApp Business API</strong>: Southeast Asia runs on WhatsApp — 100M+ users in Indonesia alone</li>
<li><strong>Tone nuances</strong>: Filipino indirectness, Korean hierarchy-aware language, Thai polite particles (ครับ/ค่ะ)</li>
</ul>
<p>This guide covers 15+ AI customer support tools that genuinely work across Asia's diverse language and communication landscape.</p>

<h2>Top AI Chatbot Platforms for Asia</h2>

<h3>1. Intercom — Best Overall for Multilingual Asian Support</h3>

<p>Intercom's AI Fin chatbot has evolved significantly for 2026. It now supports 45+ languages natively, including Chinese (Simplified and Traditional), Japanese, Korean, Thai, Vietnamese, and Bahasa.</p>

<p><strong>Key AI features:</strong></p>
<ul><li><strong>Fin AI Agent</strong> — Handles 60-80% of queries autonomously, learns from your knowledge base</li>
<li><strong>Multilingual resolution</strong> — Single bot can detect and respond in 45+ languages</li>
<li><strong>Workflows</strong> — Visual builder for complex Asian customer journeys (e.g., Chinese New Year return policies, Songkran holiday schedules)</li>
<li><strong>Proactive messaging</strong> — Trigger based on user behavior, geo-location, or browsing patterns</li>
<li><strong>Tone customization</strong> — Can be configured for keigo (Japanese) or polite-formal for Korean</li>
</ul>
<p><strong>Asia-Specific Wins:</strong></p>
<ul><li>LINE integration (Japan, Taiwan, Thailand) — customers can get support without leaving LINE</li>
<li>WhatsApp Business API integration — dominant messaging channel in SEA (Indonesia, Philippines, Malaysia, Thailand)</li>
<li>WeChat Official Account integration — essential for China-facing businesses</li>
<li>Razer Pay, GrabPay payment links directly in chat for Singapore, Malaysia, Philippines</li>
<li>Asian hosting regions (Singapore, Tokyo) for data residency compliance</li>
<li>Custom time zone workflows — support hours in one TZ, escalation in another</li>
</ul>
<p><strong>Pricing:</strong> Essential at $39/seat/month. Advanced at $99/seat/month. Fin AI add-on from $99/month.</p>

<p><strong>Best For:</strong> Mid-market and enterprise businesses serving multiple Asian markets</p>

<h3>2. Tidio — Best for Ecommerce & Small Business</h3>

<p>Tidio combines live chat with AI-powered chatbots, and it's particularly strong for Shopify ecommerce stores selling across Asia.</p>

<p><strong>Key AI features:</strong></p>
<ul><li><strong>Lyro AI agent</strong> — Auto-responds to common questions in 10+ Asian languages</li>
<li><strong>Pre-built ecommerce flows</strong> — Order tracking, returns, shipping queries</li>
<li><strong>Product recommendation bot</strong> — AI-powered cross-sell and upsell based on browsing behavior</li>
<li><strong>Email integration</strong> — Converts chat conversations to email threads seamlessly</li>
</ul>
<p><strong>Asia-Specific Wins:</strong></p>
<ul><li>Multi-language auto-detection — bot switches between English, Chinese, Japanese, Korean based on user language</li>
<li>Shopify integration with Asian payment gateways (Shopee Pay, GrabPay, PayNow)</li>
<li>Affordable for small Asian ecommerce brands (starting at $29/month)</li>
<li>Easy setup — no coding needed for basic bot</li>
<li>Supports right-to-left scripts and Asian character rendering in chat UI</li>
</ul>
<p><strong>Pricing:</strong> Starter at $29/month. Growth at $59/month. Lyro AI included in higher tiers.</p>

<p><strong>Best For:</strong> Shopify ecommerce stores selling across SE Asia, Taiwan, Hong Kong</p>

<h3>3. Freshdesk (Freshworks) — Best for India & SEA</h3>

<p>Freshdesk is an Indian company that deeply understands Asian customer support needs. Their Freddy AI is built specifically for the Asian context.</p>

<p><strong>Key AI features:</strong></p>
<ul><li><strong>Freddy AI Copilot</strong> — Auto-suggests responses based on ticket context</li>
<li><strong>AI Ticket Categorization</strong> — Learns your Asian support categories (GST queries, COD issues, local shipping problems)</li>
<li><strong>Sentiment Analysis</strong> — Trained on Asian communication patterns (indirect refusal in Japanese, high-context frustration in Chinese, hierarchical politeness in Korean)</li>
<li><strong>Auto-assignment</strong> — Route tickets based on language, region, and product category</li>
<li><strong>Multilingual Knowledge Base</strong> — Create one base article, auto-translate to 40+ languages</li>
</ul>
<p><strong>Asia-Specific Wins:</strong></p>
<ul><li>Built in India — understands Indian GST queries, Jio/ Airtel payment issues, COD logistics</li>
<li>Free tier available (10 agents) — excellent for bootstrapped Asian startups</li>
<li>Strong WhatsApp Business API integration</li>
<li>Localized for Hindi, Tamil, Telugu, Bahasa Indonesia, Thai, Vietnamese</li>
<li>Pricing is very competitive for Asian markets (starting at $15/agent/month)</li>
</ul>
<p><strong>Pricing:</strong> Free (10 agents). Growth at $18/agent/month. Pro at $59/agent/month.</p>

<p><strong>Best For:</strong> Indian businesses, SEA startups, and any team operating across multiple Asian countries on a budget</p>

<h3>4. Zendesk — Best for Enterprise Scale</h3>

<p>Zendesk's AI agent (Zendesk AI) is trained on billions of support interactions and now supports 50+ languages including full Asian language coverage.</p>

<p><strong>Key AI features:</strong></p>
<ul><li><strong>Zendek AI</strong> — Intent detection and sentiment analysis in Asian languages</li>
<li><strong>Intelligent Triage</strong> — Auto-categorize and route Asian-language tickets</li>
<li><strong>Macro & Side Conversation</strong> — AI-suggested macros trained on your Asian support history</li>
<li><strong>Answer Bot</strong> — Knowledge base recommendations in Chinese, Japanese, Korean, Thai</li>
<li><strong>Workforce Management</strong> — AI-predicted volume for Asian holiday spikes (CNY, Songkran, Diwali, Golden Week)</li>
</ul>
<p><strong>Asia-Specific Wins:</strong></p>
<ul><li>LINE integration (Japan, Taiwan)</li>
<li>WeChat integration (China)</li>
<li>WhatsApp Business API (SEA)</li>
<li>Enterprise-grade data residency (local servers in Singapore, Tokyo, Sydney)</li>
<li>Compliance with PDPA (Singapore), PIPA (Korea), APPI (Japan), China's Personal Information Protection Law</li>
<li>Asian holiday calendar intelligence — auto-adjust staffing for Golden Week, Lunar New Year, Hari Raya, Diwali</li>
</ul>
<p><strong>Pricing:</strong> Team at $55/agent/month. Growth at $89/agent/month. Enterprise custom.</p>

<p><strong>Best For:</strong> Large enterprises serving 5+ Asian markets with high support volume</p>

<h3>5. Tawk.to — Best Free Option for Asia</h3>

<p>Tawk.to is 100% free for unlimited agents, unlimited chats. It's the default choice for budget-conscious Asian businesses.</p>

<p><strong>Key features:</strong></p>
<ul><li><strong>Unlimited free</strong> — Free live chat for unlimited agents</li>
<li><strong>AI chatbot</strong> — Basic trigger-based chatbot included free</li>
<li><strong>Ticketing system</strong> — Built-in ticket management</li>
<li><strong>Multilingual</strong> — 45+ language UI for both agents and customers</li>
<li><strong>Mobile apps</strong> — iOS, Android, and web</li>
</ul>
<p><strong>Asia Limitations:</strong></p>
<ul><li>AI capabilities are basic compared to Intercom/Tidio</li>
<li>No Asian-language-specific NLP — relies on generic translation</li>
<li>WhatsApp/LINE integration requires third-party middleware</li>
<li>Best for: Initial support setup before scaling to paid AI solutions</li>
</ul>
<p><strong>Pricing:</strong> Free (core). Pro from $19/month. Enterprise at $99/month.</p>

<p><strong>Best For:</strong> Early-stage startups, microbusinesses, and side projects bootstrapping across Asia</p>

<h2>Voice AI for Asian Contact Centers</h2>

<p>Asian customers increasingly prefer voice support — especially in markets with lower digital literacy. Voice AI agents that handle Asian languages are the next frontier.</p>

<h3>6. ElevenLabs — Best for Asian Voice Agents</h3>

<p>ElevenLabs now supports Cantonese, Mandarin, Japanese, Korean, Hindi, and Bahasa Indonesia — with voice cloning for consistent brand voices across Asian markets.</p>

<p><strong>Key features:</strong></p>
<ul><li><strong>Voice agent API</strong> — Build voicebots that speak Cantonese, Mandarin, Japanese, Korean, Hindi</li>
<li><strong>Multi-speaker</strong> — Different voices for sales vs support vs escalation</li>
<li><strong>Emotion control</strong> — Adjust tone for complaint handling vs customer delight</li>
<li><strong>Language detection</strong> — Auto-detect caller language and route to appropriate voice agent</li>
</ul>
<p><strong>Pricing:</strong> Pay-as-you-go from $5/month. Voice agent pricing on request.</p>

<h3>7. PolyAI — Best for Enterprise Contact Centers</h3>

<p>PolyAI specializes in conversational voice AI for customer service. Their Asian language support is best-in-class for enterprise.</p>

<p><strong>Key features:</strong></p>
<ul><li><strong>Conversational AI</strong> — Customers speak naturally, no forced "say 1 for sales" menus</li>
<li><strong>Asian language models</strong> — Specifically trained on Mandarin, Japanese, Korean, Thai, Vietnamese call center data</li>
<li><strong>Integration</strong> — Connects to Zendesk, Salesforce, and 50+ CRM platforms</li>
<li><strong>Analytics</strong> — Call sentiment, intent tracking, and agent assist features</li>
</ul>
<p><strong>Pricing:</strong> Custom enterprise pricing (typically $5,000+/month)</p>

<p><strong>Best For:</strong> Regional contact centers handling 10,000+ calls/month</p>

<h2>Country-by-Country Stack Recommendations</h2>

<h3>🇸🇬 Singapore</h3>
<p><strong>Stack:</strong> Intercom (primary) + Tidio (ecommerce) + WhatsApp Business</p>
<p><strong>Why:</strong> Singaporeans expect fast, professional support. Intercom's Fin handles English and Mandarin seamlessly. Tidio adds ecommerce-specific flows. WhatsApp is essential for the 5.7M users.</p>
<p><strong>Budget:</strong> Intercom Essential ~$39/agent/month</p>

<h3>🇯🇵 Japan</h3>
<p><strong>Stack:</strong> Zendesk (primary) + LINE integration + ElevenLabs (voice)</p>
<p><strong>Why:</strong> Japanese customers demand keigo, fast response times, and LINE-based communication. Zendesk's LINE integration is mature. Voice AI for elderly customer segments.</p>
<p><strong>Critical:</strong> Your bot MUST speak keigo — non-honorific Japanese is perceived as rude.</p>
<p><strong>Budget:</strong> Zendesk Team ~$55/agent/month</p>

<h3>🇮🇳 India</h3>
<p><strong>Stack:</strong> Freshdesk (primary) + Tawk.to (tier 2) + WhatsApp Business</p>
<p><strong>Why:</strong> Freshdesk is built for India — understands GST queries, COD payments, Jio/Airtel issues. WhatsApp Business is the dominant support channel (487M users). Tawk.to free for smaller operations.</p>
<p><strong>Budget:</strong> Freshdesk Free (10 agents) — $0</p>

<h3>🇨🇳 China</h3>
<p><strong>Stack:</strong> Zendesk (WeChat integration) + local CCPaaS providers</p>
<p><strong>Why:</strong> WeChat Official Account is mandatory for customer support in China. Zendesk's WeChat integration works well. For voice: local providers like Alibaba Cloud's Smart Robot often required.</p>
<p><strong>Critical:</strong> Data residency required — all customer data must stay in mainland China.</p>
<p><strong>Budget:</strong> Enterprise custom pricing</p>

<h3>🇮🇩 Indonesia</h3>
<p><strong>Stack:</strong> Intercom + WhatsApp Business API + Tokopedia/Shopee chat integration</p>
<p><strong>Why:</strong> WhatsApp is THE support channel (100M+ users). Intercom handles WhatsApp + web + email triage. Native Shopee/Tokopedia integration for marketplace sellers.</p>
<p><strong>Budget:</strong> Intercom Essential ~$39/agent/month</p>

<h3>🇹🇭 Thailand</h3>
<p><strong>Stack:</strong> Tidio (Shopify ecommerce) + LINE + WhatsApp</p>
<p><strong>Why:</strong> Thai customers use LINE for everything. Tidio supports LINE integration. WhatsApp secondary. Voice remains important for older demographics.</p>
<p><strong>Cultural note:</strong> Thai polite particles (ครับ/ค่ะ) in bot responses improve customer satisfaction significantly.</p>
<p><strong>Budget:</strong> Tidio Growth ~$59/month</p>

<h3>🇰🇷 South Korea</h3>
<p><strong>Stack:</strong> Zendesk (Enterprise) + KakaoTalk integration + Naver TalkTalk</p>
<p><strong>Why:</strong> KakaoTalk is essential (95% penetration). Zendesk's KakaoTalk integration is the most mature. Naver TalkTalk for B2B/enterprise clients.</p>
<p><strong>Critical:</strong> Korean hierarchy language (존댓말 vs 반말) — bot must use polite form by default.</p>
<p><strong>Budget:</strong> Zendesk Growth ~$89/agent/month</p>

<h3>🇻🇳 Vietnam</h3>
<p><strong>Stack:</strong> Freshdesk + Zalo integration + Facebook Messenger</p>
<p><strong>Why:</strong> Zalo dominates messaging in Vietnam (~75M users). Facebook Messenger is secondary for ecommerce support. Freshdesk provides affordable multilingual support.</p>
<p><strong>Budget:</strong> Freshdesk Growth ~$18/agent/month</p>

<h2>Deployment Checklist for Asian Markets</h2>

<h3>Week 1: Foundation</h3>
<ul><li>[ ] Select primary platform based on country(s) above</li>
<li>[ ] Integrate local messaging channels (LINE, WhatsApp, WeChat, KakaoTalk, Zalo)</li>
<li>[ ] Set up multilingual knowledge base in </li>
</ul>  - English (primary)
<p>- Local language(s) for your market(s)</p>
<p>- Chinese (Traditional + Simplified) — even if not primary, many Asian customers prefer it</p>
<ul><li>[ ] Configure time zone routing (e.g., morning queries → Japan, evening → Philippines)</li>
</ul>
<h3>Week 2: AI Training</h3>
<ul><li>[ ] Feed AI agent 50+ historical support tickets per language</li>
<li>[ ] Set up sentiment thresholds — Asian markets have different tolerance levels</li>
</ul>  - Japan: escalate at "slightly annoyed"
<p>- Thailand: escalate at "angry" (customers are very polite)</p>
<p>- India: escalate at "persistent" (direct communication is normal)</p>
<ul><li>[ ] Test code-switching scenarios ("the delivery is late ah, how?")</li>
<li>[ ] Configure holiday schedule (CNY, Diwali, Songkran, Golden Week, Hari Raya)</li>
</ul>
<h3>Week 3: Voice Setup (if applicable)</h3>
<ul><li>[ ] Record brand voice for each Asian language (not just text-to-speech)</li>
<li>[ ] Set up keigo/matching for Japanese voice agent</li>
<li>[ ] Test with 10 real customer calls per language</li>
<li>[ ] Tune escalation thresholds for voice sentiment</li>
</ul>
<h3>Week 4: Launch & Optimize</h3>
<ul><li>[ ] A/B test bot greeting style (polite vs direct per market)</li>
<li>[ ] Track deflection rate per language — target >60%</li>
<li>[ ] Monitor CSAT per country — adjust bot responses</li>
<li>[ ] Review AI learning reports — fix common misclassifications</li>
</ul>
<h2>The Bottom Line</h2>

<p>Asian customer support is fundamentally different from Western support. The multi-language, multi-channel, and culturally nuanced demands require tools built for the challenge — not generic solutions retrofitted with translation layers.</p>

<p><strong>For most Asian businesses in 2026, the winning stack is:</strong></p>

<ul><li><strong>Intercom or Zendesk</strong> for primary AI chatbot (choose based on budget: Intercom for mid-market, Zendesk for enterprise)</li>
<li><strong>LINE + WhatsApp</strong> integration mandatory — not optional</li>
<li><strong>Voice AI</strong> (ElevenLabs or PolyAI) for high-value customer segments</li>
<li><strong>Freshdesk</strong> as budget alternative for India and SEA early-stage companies</li>
</ul>
<p><strong>The ROI is clear:</strong> A $200/month AI support stack can handle 70% of queries, freeing your human team to focus on complex issues. For an Asian business with 3 support agents averaging $1,500/month each, that's $45,000/year in reclaimed capacity for $2,400/year in tools.</p>



<p>📖 <strong>See also:</strong> [Claude vs DeepSeek vs Gemini 2026: Best AI Model for D…](/blog/claude-vs-deepseek-vs-gemini-developers-asia-2026)<em>Start with the free tiers of Freshdesk or Tawk.to, validate your Asian language coverage in 30 days, then scale to Intercom or Zendesk when you need enterprise features. And never forget: in Asian customer support, language isn't just words — it's relationship. Get the tone right, and your customers will reward you with loyalty.</em></p>

<p>📖 <strong>See also:</strong> [AI Tools for Manufacturing in Asia : Predictive Mainte…](/blog/ai-manufacturing-tools-asia-2026)</p>` }}
        />

        <div className="mt-16 pt-10 border-t border-gray-200">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Related Articles</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {relatedPosts.map((p: any) => (
              <Link
                key={p.slug}
                href={`/blog/${p.slug}`}
                className="group block p-6 rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all"
              >
                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-700 transition mb-2">{p.title}</h3>
                <p className="text-sm text-gray-600">{p.excerpt}</p>
              </Link>
            ))}
          </div>
          {categoryRelated.length > 0 && (
            <>
              <h3 className="text-xl font-bold text-gray-900 mb-6">More from AI Tools</h3>
              <div className="grid md:grid-cols-2 gap-6">
                {categoryRelated.map((p: any) => (
                  <Link
                    key={p.slug}
                    href={`/blog/${p.slug}`}
                    className="group block p-6 rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all"
                  >
                    <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-700 transition mb-2">{p.title}</h3>
                    <p className="text-sm text-gray-600">{p.excerpt}</p>
                  </Link>
                ))}
              </div>
            </>
          )}
        </div>
      </article>
    </div>
  );
}
