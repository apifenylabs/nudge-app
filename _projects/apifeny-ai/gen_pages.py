#!/usr/bin/env python3
"""Generate 4 missing geo landing pages using gen_lib.make()."""
import os, sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from gen_lib import make

APP = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'app')

# ──────────────────────────────────────────────
# Austria
# ──────────────────────────────────────────────
austria = make(
    slug='austria',
    name='Austria',
    code='at',
    capital='Vienna',
    currency='EUR',
    lang='German / English',
    langCode='de',
    title='Best AI Tools in Austria (2026) — Curated for Austrian Teams & Startups',
    meta_desc=('Discover the best AI tools for Austrian businesses and founders. Curated directory of 85+ tools ranked by trending score, '
               'Austria-market readiness, and local relevance. Updated daily. Built for Vienna, Graz, Linz, and Austria\'s thriving AI ecosystem.'),
    og_desc=('Find AI tools built for Austria: FFG-funded ecosystem, GDPR compliance, EUR pricing, and German/English support. '
             '85+ tools, expert ranked.'),
    market=('€500B economy, 9.1M population, Central Europe\'s innovation leader — home to the Vienna AI hub, TU Wien, '
            'JKU Linz (LIT AI Lab), generous 14% R&D tax credits, and a €15B+ tech ecosystem'),
    grad1='from-orange-400', grad2='via-white', grad3='to-orange-300',
    badge_bg='bg-orange-500/10', badge_border='border-orange-500/20', badge_text='text-orange-300',
    rank_col='from-orange-400 to-white', section_col='from-orange-500/20 to-rose-900/10',
    trust_col='orange',
    stats_filter='AT-Ready',
    hero_lang='Deutsch / English',
    hero_price='EUR Pricing',
    hero_comply='GDPR & DSGVO',
    hero_ready='AI Research-Ready',
    trust1_t='Bilingual by Default (DE/EN)',
    trust1_d=('Austria is a German-speaking nation with a highly internationalised tech sector. The DSGVO (Austrian Data Protection Act) '
              'implements strict GDPR requirements, and many business tools require English support for Vienna\'s multinational workforce. '
              'We flag every tool for German-language support, Austrian localization, and bilingual readiness.'),
    trust2_t='GDPR & DSGVO — Austrian Privacy Framework',
    trust2_d=('Austria follows the EU GDPR with national supplementation via the DSGVO (Datenschutzgesetz). The Austrian Data Protection '
              'Authority (DSB) is one of Europe\'s most active regulators. We verify every tool\'s data residency options within the EU, '
              'GDPR compliance posture, and alignment with DSB guidance on AI and automated decision-making.'),
    trust3_t='FFG, aws & the AI Austria Ecosystem',
    trust3_d=('Austria offers Europe\'s most generous R&D tax credit at 14% alongside the Austrian Research Promotion Agency (FFG) and '
              'aws (Austria Wirtschaftsservice) startup programs. The Vienna AI Hub, LIT AI Lab at JKU Linz, and TU Wien produce '
              'world-class AI research. We highlight tools aligned with Austria\'s innovation priorities.'),
    eco1_t='🇦🇹 Vienna — AI Hub & Innovation Capital',
    eco1_d=('Vienna accounts for ~65% of all Austrian AI startups and companies. The city is home to TU Wien\'s AI research, the Vienna '
             'BioCenter for health AI, and a thriving startup scene anchored by the Vienna Business Agency. ViennaUP draws global '
             'investors and founders annually, with €250M+ invested in Austrian startups in Q1 2026 alone.'),
    eco2_t='🎓 Linz — LIT AI Lab & Deep Learning',
    eco2_d=('JKU Linz hosts the LIT AI Lab (Linz Institute of Technology), a powerhouse for deep learning and machine learning research. '
             'Upper Austria is also a leading hub for HealthTech AI. The region\'s strong industrial base drives AI innovation in manufacturing, '
             'automotive, and medical technology.'),
    eco3_t='🏢 Graz & Styria — Industrial AI & Manufacturing',
    eco3_d=('Graz, Austria\'s second-largest city, is a centre for industrial AI, automotive engineering (AVL, Magna), and environmental '
             'technology. TU Graz produces top engineering talent. The Styrian ecosystem excels in AI for smart manufacturing, energy, '
             'and sustainable mobility solutions.'),
    eco4_t='🔬 Pan-Austrian Innovation & EU Funding',
    eco4_d=('Austria benefits from EU Horizon Europe and Digital Europe programmes for AI R&D. The FFG (Austrian Research Promotion Agency) '
             'provides targeted AI funding, while aws offers startup financing and guarantees. Combined with 14% R&D tax credits, a skilled '
             'workforce, and strong university-industry partnerships, Austria offers one of Europe\'s best environments for AI startups.'),
    faq1_q='What are the best AI tools in Austria?',
    faq1_a=('The best AI tools in Austria include ChatGPT for content and productivity, GitHub Copilot for development, Claude for advanced '
             'reasoning, Canva AI for design, and Jasper for marketing. Austria is a rising Central European AI hub — home to the LIT AI Lab '
             'at JKU Linz, TU Wien\'s AI research, and a growing startup ecosystem in Vienna. These tools are particularly well-suited for '
             'Austrian businesses because they offer EUR pricing, German/English support, and strong GDPR-compliant data handling.'),
    faq2_q='How does Austrian data protection law (DSGVO) affect AI tool selection?',
    faq2_a=('Austria\'s DSGVO implements the EU GDPR with national-specific provisions enforced by the Austrian Data Protection Authority (DSB). '
             'The DSB is known for its active enforcement, including landmark rulings on cookie consent and data transfers. AI tools processing '
             'Austrian customer data must support EU data residency, provide transparency in automated decision-making, and enable consent '
             'management under Art. 22 GDPR. We evaluate every tool for DSGVO readiness and EU data protection compliance.'),
    faq3_q='What AI tools are best for Austria\'s key industries?',
    faq3_a=('Austria\'s economy has distinct AI priorities: manufacturing and industrial AI for Styria\'s automotive and machinery sector; '
             'HealthTech AI in Upper Austria and Vienna; fintech AI in Vienna\'s growing financial ecosystem; energy AI for Austria\'s renewable '
             'energy sector (hydropower, wind, solar); and tourism AI for Vienna, Salzburg, and Tyrol\'s world-famous travel industry. '
             'AI is also transforming Austria\'s logistics, environmental technology, and life sciences sectors.'),
    faq4_q='How can Austrian startups access AI funding and support?',
    faq4_a=('Austria offers extensive AI innovation support. The FFG (Austrian Research Promotion Agency) provides targeted funding for AI R&D '
             'projects. aws (Austria Wirtschaftsservice) offers startup financing, guarantees, and venture capital. Austria\'s 14% R&D tax credit '
             'is one of Europe\'s most generous — providing direct cash refunds on qualifying AI research costs. EU Horizon Europe and Digital '
             'Europe programmes supplement national funding. Vienna Business Agency, Startup.Tirol, and Tech2b support regional startup ecosystems. '
             'Programs like ViennaUP, Pioneers, and AustrianStartups provide mentorship, networking, and investor access.'),
    faq5_q='What AI regulations exist in Austria?',
    faq5_a=('Austria\'s AI regulatory framework is shaped by the EU AI Act, the world\'s first comprehensive AI regulation. National implementation '
             'is coordinated by the Austrian AI Strategy (AIS Austria) and the Federal Ministry for Climate Action (BMK). The DSGVO/DSB governs '
             'data used in AI training. Sector-specific regulators apply: FMA for fintech AI, AGES for health AI, and BMK for autonomous '
             'vehicles. Austria\'s AI ethics guidelines (AI Ethics Austria) provide additional guidance for responsible AI development.'),
    cta_line='We rank every tool on GDPR/DSGVO compliance, EUR pricing, and German/English support,',
    keywords=('best AI tools in Austria 2026 · AI tools for Austrian businesses · Austria AI software · '
              'AI writing tools Austria · AI coding tools Austria · AI marketing Austria · '
              'Austria AI directory · AI tools for Austrian startups · enterprise AI tools Austria · '
              'free AI tools Austria · AI productivity Austria · Austrian tech stack · '
              'AI tools Vienna · AI tools Graz · AI tools Linz · AI tools Salzburg'),
    eco_heading="Austria's AI Ecosystem Is a Central European Powerhouse",
    eco_sub="From Vienna's thriving AI hub to JKU Linz's LIT AI Lab, Austria produces world-class AI research and top-tier engineering talent. These four pillars power",
    why_heading="Why Austria Needs Its Own AI Tool Directory",
    why_text="Austria's AI ecosystem is unique — world-leading research meets a distinct regulatory and cultural landscape at the heart of Europe.",
    top_heading='Top AI Tools in Austria',
    top_sub='Highest-rated tools across all categories — ranked by trending score and Austria-market readiness',
    guide_heading='Austria-Focused AI Guides',
    breadcrumb_name="AI Tools Austria",
)

os.makedirs(os.path.join(APP, 'ai-tools-austria'), exist_ok=True)
with open(os.path.join(APP, 'ai-tools-austria', 'page.tsx'), 'w') as f:
    f.write(austria)
print('✓ Austria page.tsx written')
