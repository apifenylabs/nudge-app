#!/usr/bin/env python3
"""Generate 4 geo pages from Canada template using exact string matching."""
import os

APP = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'app')

with open(os.path.join(APP, 'ai-tools-canada', 'page.tsx')) as f:
    CANADA = f.read()

# =========================================
# Helper: replace key text blocks in CANADA
# =========================================

def generate(slug, name, code, capital, currency, lang, langCode,
             title, meta_desc, og_desc, market,
             g1, g2, g3, bg, bd, bt, rc, sc, tc,
             hl, hp, hc, hr, sf,
             faq1_q, faq1_a, faq2_q, faq2_a, faq3_q, faq3_a,
             faq4_q, faq4_a, faq5_q, faq5_a,
             t1_t, t1_d, t2_t, t2_d, t3_t, t3_d,
             e1t, e1d, e2t, e2d, e3t, e3d, e4t, e4d,
             eh, es, cta_line,
             kw, guide_heading,
             why_h, why_text, top_h, top_sub):
    p = CANADA

    # 1. Slug + component
    p = p.replace('ai-tools-canada', f'ai-tools-{slug}')
    p = p.replace('AIToolsCanadaPage', f'AITools{name}Page')

    # 2. Title
    old = "Best AI Tools in Canada (2026) \u2014 Curated for Canadian Teams & Startups"
    p = p.replace(old, title)

    # 3. Meta description (multiline with escaped apostrophe)
    old = ("description:\n"
           "    'Discover the best AI tools for Canadian businesses and founders. "
           "Curated directory of 85+ tools ranked by trending score, "
           "Canada-market readiness, and local relevance. Updated daily. "
           "Built for Toronto, Montreal, Vancouver, and Canada\\'s thriving AI ecosystem.',")
    p = p.replace(old, f"description:\n    '{meta_desc}',")

    # 4. OG title
    old = "Best AI Tools in Canada (2026) \u2014 Apifeny AI"
    p = p.replace(old, f"Best AI Tools in {name} (2026) \u2014 Apifeny AI")

    # 5. OG description
    old = ("ogDescription:\n"
           "    'Find AI tools built for Canada: CIFAR-aligned research, Vector Institute ecosystem, "
           "CAD pricing, bilingual (EN/FR) support, and Canadian data compliance. 85+ tools, expert ranked.',")
    p = p.replace(old, f"ogDescription:\n    '{og_desc}',")

    # 6. GeoSeoSchema
    p = p.replace('countryName="Canada"', f'countryName="{name}"')
    p = p.replace('countryCode="ca"', f'countryCode="{code}"')
    p = p.replace('capital="Ottawa"', f'capital="{capital}"')
    p = p.replace('currency="CAD"', f'currency="{currency}"')
    p = p.replace('language="English / French"', f'language="{lang}"')
    p = p.replace('languageCode="en"', f'languageCode="{langCode}"')

    # 7. Market description
    old = ('$2.2T economy, 40M population, world-leading AI research ecosystem '
           '(Vector Institute, CIFAR, MILA), G7 member with strong tech immigration '
           'pipelines, rapidly growing VC scene')
    p = p.replace(old, market)

    # 8. Breadcrumb
    p = p.replace("'AI Tools Canada'", f"'AI Tools {name}'")

    # 9. Colors and gradients
    p = p.replace('from-red-400 via-white to-red-300', f'{g1} {g2} {g3}')
    p = p.replace('bg-red-500/10', bg)
    p = p.replace('border-red-500/20', bd)
    p = p.replace('text-red-300', bt)
    p = p.replace('from-red-400 to-white', rc)
    p = p.replace('from-red-500/20 to-rose-900/10', sc)
    p = p.replace('text-red-400', f'text-{tc}-400')

    # 10. Hero badges
    p = p.replace('English / Fran\\u00e7ais', hl)
    p = p.replace('CAD Pricing', hp)
    p = p.replace('PIPEDA & Law 25', hc)
    p = p.replace('AI Research-Ready', hr)

    # 11. Stats filter
    p = p.replace('CA-Ready Filters', f'{sf} Filters')
    p = p.replace('CA-Ready', sf)

    # 12. Hero badge text
    p = p.replace('Canada-Focused \\u00b7 Updated Daily', f'{name}-Focused \\u00b7 Updated Daily')

    # 13. Hero "actually work for"
    p = p.replace('actually work for Canada', f'actually work for {name}')

    # 14. Hero CTA line (the "We rank every tool on PIPEDA compliance..." part)
    old_cta = ("We rank every tool on PIPEDA compliance, CAD pricing, bilingual (EN/FR) support,\n"
               "              and Canadian AI ecosystem readiness \\u2014 so you find tools built for Canada's unique market.")
    new_cta = (f"{cta_line}\n"
               f"              and {name} AI ecosystem readiness \\u2014 so you find tools built for {name}'s unique market.")
    p = p.replace(old_cta, new_cta)

    # 15. Top Tools heading
    p = p.replace('Top AI Tools in Canada', top_h)

    # 16. Canada-market readiness
    p = p.replace('Canada-market readiness', f'{name}-market readiness')

    # 17. Category links "for Canada"
    p = p.replace("for Canada</h2>", f"for {name}</h2>")
    p = p.replace("for Canada<ArrowRight", f"for {name}<ArrowRight")

    # 18. Why section
    p = p.replace('Why Canada Needs Its Own AI Tool Directory', why_h)
    p = p.replace("Canada's AI ecosystem is unique \\u2014 world-leading research meets a distinct regulatory and cultural landscape.", why_text)

    # 19. Trust indicator blocks - exact descriptions from template
    old_t1d = ("Canada is officially bilingual and Quebec\\'s Law 25 and Charter of the French Language "
               "require business operations in French. We flag every tool for French-language support, "
               "Quebec compliance, and Canadian English/French localization \\u2014 critical for serving "
               "markets from Vancouver to Montreal.")
    old_t2d = ("Canada\\'s privacy landscape includes federal PIPEDA, Quebec\\'s Law 25 "
               "(the strictest in North America), and the upcoming Artificial Intelligence and Data Act (AIDA). "
               "We evaluate tools for Canadian data residency, consent management, AI transparency obligations, "
               "and OPC guidance alignment.")
    old_t3d = ("Canada\\'s $125M+ Pan-Canadian AI Strategy (CIFAR, Vector, Mila, Amii) produces world-leading "
               "AI research. We prioritize tools that integrate with academic licensing, research workflows, "
               "and Canada\\'s unique commercialization pipeline from discovery to startup spinout.")

    p = p.replace('Bilingual by Law (EN/FR)', t1_t)
    p = p.replace(old_t1d, t1_d)
    p = p.replace('PIPEDA, AIDA & Law 25', t2_t)
    p = p.replace(old_t2d, t2_d)
    p = p.replace('Vector Institute & CIFAR Ecosystem', t3_t)
    p = p.replace(old_t3d, t3_d)

    # 20. Top picks subtitle
    old = "Top picks for Canadian teams \\u2014 rated for PIPEDA compliance, CAD pricing, and bilingual support."
    p = p.replace(old, top_sub)

    # 21. Playbooks
    p = p.replace('built for Canadian teams and startups', f'built for {name.lower()} teams and startups')

    # 22. Ecosystem heading + sub
    p = p.replace("Canada\\'s AI Ecosystem Is a Global Research Powerhouse", eh)
    old_es = ("From Toronto\\'s Vector Institute to Montreal\\'s Mila, Canada produces foundational AI research\n"
              "              that powers the world\\'s most advanced systems \\u2014 with a distinctly Canadian approach to responsible AI.")
    p = p.replace(old_es, es)

    # 23. Ecosystem blocks - exact titles/descriptions from ACTUAL template
    old_e1t = "Toronto \\u2014 Vector Institute & AI Hub"
    old_e1d = ("Toronto is one of the world\\'s top three AI research cities, anchored by the Vector Institute, "
               "the Schwartz Reisman Innovation Centre, and U of T\\'s world-leading ML faculty. The ecosystem spans "
               "deep learning, NLP, computer vision, and health AI \\u2014 driving spinouts like Cohere, Waabi, and Layer 6.")
    old_e2t = "Montreal \\u2014 Mila & Deep Learning"
    old_e2d = ("Montreal\\'s Mila (Quebec AI Institute), founded by Yoshua Bengio, is a global epicentre of deep learning research. "
               "Quebec\\'s unique AI talent pipeline feeds into a booming startup ecosystem. Bilingual (French/English) tools "
               "are essential \\u2014 we flag every tool for Qu\\u00e9bec compliance and French-language support.")
    old_e3t = "Vancouver & Waterloo \\u2014 Tech & Autonomy"
    old_e3d = ("Vancouver\\'s growing AI scene spans fintech (Wealthsimple, PayByPhone), gaming AI, and cleantech. "
               "Waterloo\\'s Velocity incubator and autonomous vehicle ecosystem (BlackBerry QNX, Darwin AI) produce "
               "cutting-edge AI for transportation, manufacturing, and enterprise SaaS.")
    old_e4t = "\\U0001f52c Pan-Canadian AI Strategy & CIFAR"
    old_e4d = ("Canada\\'s $125M+ Pan-Canadian AI Strategy, coordinated by CIFAR, funds the Vector Institute, Mila, "
               "Amii (Alberta), and dozens of AI chairs nationally. Combined with SR&ED tax credits (up to 45% R&D cash "
               "refunds), Global Talent Stream visas, and active angel/VC networks, Canada offers one of the best "
               "environments for AI startups globally.")

    p = p.replace(old_e1t, e1t)
    p = p.replace(old_e1d, e1d)
    p = p.replace(old_e2t, e2t)
    p = p.replace(old_e2d, e2d)
    p = p.replace(old_e3t, e3t)
    p = p.replace(old_e3d, e3d)
    p = p.replace(old_e4t, e4t)
    p = p.replace(old_e4d, e4d)

    # 24. FAQ blocks - exact from template (careful with apostrophes)
    old_faq1 = ('{ question: "What are the best AI tools in Canada?", answer: "The best AI tools in Canada include '
                'ChatGPT for content and productivity, GitHub Copilot for development, Claude for advanced reasoning, '
                'Canva AI for design, and Jasper for marketing. Canada is a global AI powerhouse \\u2014 home to the '
                'Vector Institute in Toronto, Mila in Montreal, and the Alberta Machine Intelligence Institute (Amii). '
                'The country\\\'s AI research ecosystem (CIFAR, Pan-Canadian AI Strategy) has produced foundational AI '
                'breakthroughs and top talent from U of T, McGill, UBC, and Waterloo." }')
    old_faq2 = ('{ question: "How does Canadian privacy law (PIPEDA) affect AI tool selection?", answer: '
                '"Canada\\\'s Personal Information Protection and Electronic Documents Act (PIPEDA) and Quebec\\\'s '
                'Law 25 impose strict requirements on how AI tools collect, use, and disclose personal information. '
                'The proposed Artificial Intelligence and Data Act (AIDA) will further regulate high-impact AI '
                'systems. We flag every tool for PIPEDA compliance, provincial privacy law readiness (especially '
                'Quebec\\\'s Law 25), data residency options within Canada, and alignment with OPC guidance on AI '
                'and automated decision-making." }')
    old_faq3 = ('{ question: "What AI tools are best for Canada\\\'s key industries?", answer: "Canada\\\'s economy '
                'has distinct AI priorities: AI research and deep learning tools for Toronto\\\'s Vector Institute '
                'and Montreal\\\'s Mila ecosystem, fintech AI in Vancouver and Toronto (wealth management, payments), '
                'cleantech and energy AI in Alberta and BC, healthcare AI for Canada\\\'s public health system, '
                'natural language tools for French and English bilingual requirements, and autonomous vehicle AI in '
                'Waterloo and Toronto. Canadian businesses also lead in AI for mining, forestry, and agricultural '
                'technology." }')
    old_faq4 = ('{ question: "How can Canadian startups access AI funding and support?", answer: "Canada offers '
                'extensive AI innovation support. The Pan-Canadian AI Strategy (CIFAR) funds research and '
                'commercialization. The Scientific Research and Experimental Development (SR&ED) tax credit '
                'provides 35-45% cash refunds on qualifying AI R&D costs for Canadian companies. IRAP (National '
                'Research Council) provides grants for AI technology adoption. BDC Capital and federal/provincial '
                'VC programs support AI startups. The Global Talent Stream fast-tracks AI talent visas. Programs '
                'like NextAI, Creative Destruction Lab (CDL), and BC Tech\\\'s AI initiatives provide mentorship '
                'and funding." }')
    old_faq5 = ('{ question: "What AI regulations exist in Canada?", answer: "Canada\\\'s AI regulatory framework '
                'is evolving. The proposed Artificial Intelligence and Data Act (AIDA), part of Bill C-27, will '
                'establish requirements for high-impact AI systems including risk assessments, transparency, and '
                'accountability. PIPEDA governs data used in AI training. Quebec\\\'s Law 25 sets additional '
                'privacy requirements. Specific sectors have regulations: Health Canada for medical AI, OSFI for '
                'financial AI, and Transport Canada for autonomous vehicles. Canada\\\'s Voluntary AI Code of '
                'Conduct sets early standards for responsible AI development." }')

    new_faq1 = f'{{ question: "{faq1_q}", answer: "{faq1_a}" }}'
    new_faq2 = f'{{ question: "{faq2_q}", answer: "{faq2_a}" }}'
    new_faq3 = f'{{ question: "{faq3_q}", answer: "{faq3_a}" }}'
    new_faq4 = f'{{ question: "{faq4_q}", answer: "{faq4_a}" }}'
    new_faq5 = f'{{ question: "{faq5_q}", answer: "{faq5_a}" }}'

    p = p.replace(old_faq1, new_faq1)
    p = p.replace(old_faq2, new_faq2)
    p = p.replace(old_faq3, new_faq3)
    p = p.replace(old_faq4, new_faq4)
    p = p.replace(old_faq5, new_faq5)

    # 25. CTA section
    p = p.replace('Find the Right AI Tool for Your Canadian Business', f'Find the Right AI Tool for Your {name} Business')
    p = p.replace('Built for Canadian Founders, Researchers & Enterprises', f'Built for {name} Founders, Teams & Innovators')

    old_cta = ("No more guessing if a tool complies with PIPEDA, supports French, or works for Canadian teams. "
               "Every tool on Apifeny AI is rated for Canadian data compliance, CAD pricing, and bilingual readiness. "
               "Start exploring \\u2014 no account needed.")
    new_cta = (f"No more guessing if a tool works for {name}'s market, or respects local data laws. "
               f"Every tool on Apifeny AI is rated for {name} data compliance, local pricing, and relevance. "
               "Start exploring \\u2014 no account needed.")
    p = p.replace(old_cta, new_cta)

    # 26. Keywords
    p = p.replace('best AI tools in Canada 2026 \\u00b7 AI tools for Canadian businesses \\u00b7 Canada AI software \\u00b7 '
                  'AI writing tools Canada \\u00b7 AI coding tools Canada \\u00b7 AI marketing Canada \\u00b7 '
                  'Canada AI directory \\u00b7 AI tools for Canadian startups \\u00b7 enterprise AI tools Canada \\u00b7 '
                  'free AI tools Canada \\u00b7 AI productivity Canada \\u00b7 Canadian tech stack \\u00b7 '
                  'AI tools Toronto \\u00b7 AI tools Montreal \\u00b7 AI tools Vancouver', kw)

    # 27. Canada AI tools label
    p = p.replace('Canada AI tools:', f'{name} AI tools:')

    # 28. Guide heading
    p = p.replace('Canada-Focused AI Guides', guide_heading)

    # Write file
    outdir = os.path.join(APP, f'ai-tools-{slug}')
    os.makedirs(outdir, exist_ok=True)
    path = os.path.join(outdir, 'page.tsx')
    with open(path, 'w') as f:
        f.write(p)

    # Verify
    import re as re2
    terms = ['Canada', 'Canadian', 'PIPEDA', 'CIFAR', 'Montreal', 'Toronto', 'Waterloo', 'Vancouver', 'Mila', 'Vector']
    remaining = {t: len(re2.findall(t, p)) for t in terms}
    remaining = {k: v for k, v in remaining.items() if v > 0}
    if remaining:
        print(f'  \\u2717 {slug}: REMAINING: {remaining}')
        print(f'  Total remaining refs: {sum(remaining.values())}')
    else:
        print(f'  \\u2713 {slug}: ALL CLEAN')


if __name__ == '__main__':
    import sys
    sys.path.insert(0, '.')
    from gen_lib import make
    
    # Import from countries_data
    from countries_data import COUNTRIES
    
    for i, c in enumerate(COUNTRIES, 1):
        c = dict(c)
        slug = c.pop('slug')
        name = c.pop('name')
        code = c.pop('code')
        capital = c.pop('capital')
        currency = c.pop('currency')
        lang = c.pop('lang')
        langCode = c.pop('langCode')
        title = c.pop('title')
        meta_desc = c.pop('meta_desc')
        og_desc = c.pop('og_desc')
        market = c.pop('market')
        g1 = c.pop('grad1')
        g2 = c.pop('grad2')
        g3 = c.pop('grad3')
        bb = c.pop('badge_bg')
        bd_ = c.pop('badge_border')
        bt = c.pop('badge_text')
        rc = c.pop('rank_col')
        sc = c.pop('section_col')
        tc = c.pop('trust_col')
        sf = c.pop('stats_filter')
        hl = c.pop('hero_lang')
        hp = c.pop('hero_price')
        hc = c.pop('hero_comply')
        hr = c.pop('hero_ready')
        t1t = c.pop('trust1_t')
        t1d = c.pop('trust1_d')
        t2t = c.pop('trust2_t')
        t2d = c.pop('trust2_d')
        t3t = c.pop('trust3_t')
        t3d = c.pop('trust3_d')
        e1t = c.pop('eco1_t')
        e1d = c.pop('eco1_d')
        e2t = c.pop('eco2_t')
        e2d = c.pop('eco2_d')
        e3t = c.pop('eco3_t')
        e3d = c.pop('eco3_d')
        e4t = c.pop('eco4_t')
        e4d = c.pop('eco4_d')
        f1q = c.pop('faq1_q')
        f1a = c.pop('faq1_a')
        f2q = c.pop('faq2_q')
        f2a = c.pop('faq2_a')
        f3q = c.pop('faq3_q')
        f3a = c.pop('faq3_a')
        f4q = c.pop('faq4_q')
        f4a = c.pop('faq4_a')
        f5q = c.pop('faq5_q')
        f5a = c.pop('faq5_a')
        cta = c.pop('cta_line')
        kw = c.pop('keywords')
        eh = c.pop('eco_heading')
        es = c.pop('eco_sub')
        wh = c.pop('why_heading')
        wt = c.pop('why_text')
        th = c.pop('top_heading')
        ts = c.pop('top_sub')
        gh = c.pop('guide_heading')
        bn = c.pop('breadcrumb_name')
        
        page = make(
            slug=slug, name=name, code=code, capital=capital, currency=currency,
            lang=lang, langCode=langCode,
            title=title, meta_desc=meta_desc, og_desc=og_desc, market=market,
            grad1=g1, grad2=g2, grad3=g3,
            badge_bg=bb, badge_border=bd_, badge_text=bt,
            rank_col=rc, section_col=sc, trust_col=tc, stats_filter=sf,
            hero_lang=hl, hero_price=hp, hero_comply=hc, hero_ready=hr,
            trust1_t=t1t, trust1_d=t1d, trust2_t=t2t, trust2_d=t2d,
            trust3_t=t3t, trust3_d=t3d,
            eco1_t=e1t, eco1_d=e1d, eco2_t=e2t, eco2_d=e2d,
            eco3_t=e3t, eco3_d=e3d, eco4_t=e4t, eco4_d=e4d,
            faq1_q=f1q, faq1_a=f1a, faq2_q=f2q, faq2_a=f2a,
            faq3_q=f3q, faq3_a=f3a, faq4_q=f4q, faq4_a=f4a,
            faq5_q=f5q, faq5_a=f5a,
            cta_line=cta, keywords=kw,
            eco_heading=eh, eco_sub=es,
            why_heading=wh, why_text=wt,
            top_heading=th, top_sub=ts,
            guide_heading=gh, breadcrumb_name=bn
        )
        
        outdir = os.path.join(APP, f'ai-tools-{slug}')
        os.makedirs(outdir, exist_ok=True)
        path = os.path.join(outdir, 'page.tsx')
        with open(path, 'w') as f:
            f.write(page)
        print(f'OK ({i}): {slug}')
