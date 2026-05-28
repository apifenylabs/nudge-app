#!/usr/bin/env python3
"""Generate Colombia geo page."""
import os, sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from gen_lib import make

APP = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'app')

colombia = make(
    slug='colombia',
    name='Colombia',
    code='co',
    capital='Bogotá',
    currency='COP',
    lang='Spanish / English',
    langCode='es',
    title='Best AI Tools in Colombia (2026) — Curated for Colombian Teams & Startups',
    meta_desc=('Discover the best AI tools for Colombian businesses and founders. Curated directory of 85+ tools ranked by trending score, '
               'Colombia-market readiness, and local relevance. Updated daily. Built for Bogotá, Medellín, Cali, and Colombia\'s thriving AI ecosystem.'),
    og_desc=('Find AI tools built for Colombia: iNNpulsa ecosystem, Latin America\'s fastest-growing startup scene, COP/USD pricing, and '
             'Spanish/English support. 85+ tools, expert ranked.'),
    market=('$400B economy, 52M population, Latin America\'s fastest-growing startup ecosystem — 2,126 startups, 3 unicorns, '
            '$668M raised in 2025, strong fintech, logistics, and edtech sectors, and a world-class innovation culture'),
    grad1='from-amber-400', grad2='via-white', grad3='to-yellow-400',
    badge_bg='bg-amber-500/10', badge_border='border-amber-500/20', badge_text='text-amber-300',
    rank_col='from-amber-400 to-white', section_col='from-amber-500/20 to-rose-900/10',
    trust_col='amber',
    stats_filter='CO-Ready',
    hero_lang='Español / English',
    hero_price='COP/USD Pricing',
    hero_comply='Ley de Protección de Datos',
    hero_ready='Colombia Tech-Ready',
    trust1_t='Bilingual Ecosystem (ES/EN)',
    trust1_d=('Colombia is a Spanish-speaking nation with rapidly growing English proficiency in its tech sector — Medellín and Bogotá are '
              'becoming nearshore tech talent hubs. We flag every tool for Spanish-language support, Colombian localization, and bilingual '
              'readiness — critical for serving markets from Bogotá to Medellín and the growing remote-first startup community.'),
    trust2_t='Colombian Data Protection Law',
    trust2_d=('Colombia\'s Statutory Law 1581 of 2012 (Ley de Protección de Datos Personales) and Decree 1377/2013 regulate personal data '
              'processing, enforced by the SIC (Superintendencia de Industria y Comercio). The law requires explicit consent for data collection '
              'and restricts cross-border data transfers. We verify every tool\'s compliance with Colombian data protection law and data '
              'residency options.'),
    trust3_t='iNNpulsa & Colombia\'s Startup Ecosystem',
    trust3_d=('iNNpulsa Colombia, the national entrepreneurship and innovation agency, provides grants, co-investment, and support for tech '
              'startups. Fondo Emprender (SENA) offers seed funding. Colombia ranks #2 in South America with 2,126 startups, $24.2B cumulative '
              'funding, and ecosystem growth of 24% in 2025 — 3x the LatAm average. We highlight tools aligned with Colombia\'s innovation priorities.'),
    eco1_t='🇨🇴 Bogotá — Capital & Fintech Powerhouse',
    eco1_d=('Bogotá is Colombia\'s largest startup hub, home to 29 data centres, the country\'s fintech epicentre, and major universities '
             '(Universidad de los Andes, UNAL, Javeriana). The city hosts 60%+ of Colombia\'s startups, including the unicorn Rappi ($5.25B). '
             'Bogotá\'s startup scene raised over $400M in 2025, driven by fintech, proptech, and logistics innovation.'),
    eco2_t='🎓 Medellín — Innovation & Tech Talent Hub',
    eco2_d=('Medellín has transformed into one of Latin America\'s most innovative cities. Home to Ruta N (innovation agency), Universidad '
             'EAFIT, and Universidad de Antioquia. Medellín excels in AI for transportation, logistics, and social impact. The city\'s '
             'startup ecosystem grew 30%+ in 2025, with strong education, health, and creative industry AI clusters.'),
    eco3_t='🏢 Cali & Barranquilla — Emerging Tech Hubs',
    eco3_d=('Cali, Colombia\'s third-largest city, has a growing tech scene focused on logistics (given its port proximity), software development, '
             'and creative industries. Barranquilla is emerging as a data centre and cloud computing hub. Both cities benefit from lower '
             'operating costs and growing digital talent pools.'),
    eco4_t='🔬 National AI Policy & Rapid Ecosystem Growth',
    eco4_d=('Colombia launched a $111.5M National AI Policy in February 2025, catalysing AI adoption across all sectors. The data centre market '
             'is valued at $442M (2024) and projected to nearly triple to $1.16B by 2030. Colombia has 25+ Y Combinator-backed startups — '
             'among the most in LatAm — and benefits from iNNpulsa grants, Fondo Emprender seed funding, and a 24% ecosystem growth rate.'),
    faq1_q='What are the best AI tools in Colombia?',
    faq1_a=('The best AI tools in Colombia include ChatGPT for content and productivity, GitHub Copilot for development, Claude for advanced '
             'reasoning, Canva AI for design, and Jasper for marketing. Colombia is Latin America\'s fastest-growing startup ecosystem — 2,126 '
             'startups, 3 unicorns (Rappi, Habi, Truora), and a 24% growth rate in 2025. These tools work well for Colombian businesses because '
             'they offer Spanish/English support, COP/USD flexibility, and strong data protection practices.'),
    faq2_q='How does Colombian data privacy law affect AI tool selection?',
    faq2_a=('Colombia\'s Statutory Law 1581 of 2012 (Ley de Protección de Datos Personales) and its regulatory decrees impose strict requirements '
             'on how AI tools collect, use, and store personal data. The law is enforced by the SIC (Superintendencia de Industria y Comercio). '
             'Cross-border data transfers require adequate protections. We evaluate every tool for Colombian data protection compliance and '
             'LatAm data residency options.'),
    faq3_q='What AI tools are best for Colombia\'s key industries?',
    faq3_a=('Colombia\'s economy has distinct AI priorities: fintech AI in Bogotá and Medellín\'s booming financial ecosystem; logistics and '
             'mobility AI for Colombia\'s transportation and delivery sector (led by Rappi); edtech AI for Colombia\'s education technology '
             'scene; healthtech AI for Colombia\'s healthcare system; and creative AI for the country\'s growing digital media industry. '
             'AI is also transforming Colombia\'s agriculture (coffee, flowers, bananas), energy, and manufacturing sectors.'),
    faq4_q='How can Colombian startups access AI funding and support?',
    faq4_a=('Colombia offers extensive AI innovation support. iNNpulsa Colombia provides grants, co-investment, and acceleration programmes. '
             'Fondo Emprender (SENA) offers seed funding for early-stage ventures. The government\'s $111.5M National AI Policy funds AI '
             'adoption across sectors. Rockstart, Polymath Ventures, and K50 Ventures back Colombian startups. Bancoldex provides innovation '
             'financing. Universities (Los Andes, EAFIT, UNAL, Javeriana) offer research partnerships and talent pipelines. Colombia\'s '
             'startup ecosystem grew 24% in 2025, making it one of LatAm\'s most dynamic tech environments.'),
    faq5_q='What AI regulations exist in Colombia?',
    faq5_a=('Colombia\'s AI regulatory framework is developing rapidly. The $111.5M National AI Policy (CONPES 4080) sets strategic direction. '
             'Law 1581 of 2012 governs personal data used in AI training, enforced by the SIC. The government is advancing a comprehensive '
             'AI law that will establish guidelines for high-impact AI systems. Sector-specific regulations apply: SFC for fintech AI, '
             'Invima for health AI, and MinTransporte for mobility AI. Colombia is a leader in LatAm AI governance and actively participates '
             'in the OECD AI Policy Observatory and UNESCO AI ethics discussions.'),
    cta_line='We rank every tool on Colombian data compliance, COP/USD pricing, and Spanish/English support,',
    keywords=('best AI tools in Colombia 2026 · AI tools for Colombian businesses · Colombia AI software · '
              'AI writing tools Colombia · AI coding tools Colombia · AI marketing Colombia · '
              'Colombia AI directory · AI tools for Colombian startups · enterprise AI tools Colombia · '
              'free AI tools Colombia · AI productivity Colombia · Colombian tech stack · '
              'AI tools Bogotá · AI tools Medellín · AI tools Cali · AI tools Barranquilla'),
    eco_heading="Colombia's AI Ecosystem Is Latin America's Fastest Growing",
    eco_sub="From Bogotá's fintech powerhouse to Medellín's innovation district, Colombia is redefining LatAm tech with 24% ecosystem growth and three unicorns. These four pillars power",
    why_heading="Why Colombia Needs Its Own AI Tool Directory",
    why_text="Colombia's AI ecosystem is unique — Latin America's fastest-growing startup scene meets a rich cultural landscape and rapidly modernising regulatory framework.",
    top_heading='Top AI Tools in Colombia',
    top_sub='Highest-rated tools across all categories — ranked by trending score and Colombia-market readiness',
    guide_heading='Colombia-Focused AI Guides',
    breadcrumb_name="AI Tools Colombia",
)

with open(os.path.join(APP, 'ai-tools-colombia', 'page.tsx'), 'w') as f:
    f.write(colombia)
print('✓ Colombia page.tsx written')
