#!/usr/bin/env python3
"""
Regenerate ALL 4 geo pages from the Canada template, with ALL replacements.
Uses the actual template text (reads from disk) rather than hardcoded strings.
"""
import os, re

APP = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'app')

def load_template():
    with open(os.path.join(APP, 'ai-tools-canada', 'page.tsx')) as f:
        return f.read()

def generate(slug, name, code, capital, currency, lang, langCode,
             title, meta_desc, og_desc, market_desc,
             g1, g2, g3, bg, bd, bt, rc, sc, tc,
             hl, hp, hc, hr, sf,
             faq1_q, faq1_a, faq2_q, faq2_a, faq3_q, faq3_a,
             faq4_q, faq4_a, faq5_q, faq5_a,
             t1_t, t1_d, t2_t, t2_d, t3_t, t3_d,
             e1t, e1d, e2t, e2d, e3t, e3d, e4t, e4d,
             eco_h, eco_sub, cta_line,
             kw, guide_heading,
             why_h, why_text, top_h, top_sub):
    p = load_template()

    # ─── 1. Slug + component ───
    p = p.replace('ai-tools-canada', f'ai-tools-{slug}')
    p = p.replace('AIToolsCanadaPage', f'AITools{name}Page')

    # ─── 2. Title ───
    old = "Best AI Tools in Canada (2026) — Curated for Canadian Teams & Startups"
    p = p.replace(old, title)

    # ─── 3. Meta description (multiline) ───
    meta_desc_esc = meta_desc.replace("'", "\\'")
    p = replace_meta_block(p, 'description', f"description:\n    '{meta_desc_esc}'")

    # ─── 4. OG title ───
    old = "Best AI Tools in Canada (2026) — Apifeny AI"
    p = p.replace(old, f"Best AI Tools in {name} (2026) — Apifeny AI")

    # ─── 5. OG description ───
    og_desc_esc = og_desc.replace("'", "\\'")
    p = replace_meta_block(p, 'ogDescription', f"ogDescription:\n    '{og_desc_esc}'")

    # ─── 6. GeoSeoSchema ───
    p = p.replace('countryName="Canada"', f'countryName="{name}"')
    p = p.replace('countryCode="ca"', f'countryCode="{code}"')
    p = p.replace('capital="Ottawa"', f'capital="{capital}"')
    p = p.replace('currency="CAD"', f'currency="{currency}"')
    p = p.replace('language="English / French"', f'language="{lang}"')
    p = p.replace('languageCode="en"', f'languageCode="{langCode}"')

    # ─── 7. Market description ───
    market_old = (
        '$2.2T economy, 40M population, world-leading AI research ecosystem '
        '(Vector Institute, CIFAR, MILA), G7 member with strong tech immigration '
        'pipelines, rapidly growing VC scene'
    )
    p = p.replace(market_old, market_desc)

    # ─── 8. Breadcrumb ───
    p = p.replace("'AI Tools Canada'", f"'AI Tools {name}'")

    # ─── 9. Colors + gradients ───
    p = p.replace('from-red-400 via-white to-red-300', f'{g1} {g2} {g3}')
    p = p.replace('bg-red-500/10', bg)
    p = p.replace('border-red-500/20', bd)
    p = p.replace('text-red-300', bt)
    p = p.replace('from-red-400 to-white', rc)
    p = p.replace('from-red-500/20 to-rose-900/10', sc)
    p = p.replace('text-red-400', f'text-{tc}-400')

    # ─── 10. Hero badges ───
    p = p.replace('English / Français', hl)
    p = p.replace('CAD Pricing', hp)
    p = p.replace('PIPEDA & Law 25', hc)
    p = p.replace('AI Research-Ready', hr)

    # ─── 11. Stats filter ───
    p = p.replace('CA-Ready Filters', f'{sf} Filters')
    p = p.replace('CA-Ready', sf)

    # ─── 12. Badge ───
    p = p.replace('Canada-Focused · Updated Daily', f'{name}-Focused · Updated Daily')

    # ─── 13. Hero text ───
    p = p.replace('actually work for Canada', f'actually work for {name}')
        # Bare Canada in hero heading span — uses regex for cross-line <span>Canada</span>
    p = re.sub(r'<span[^>]*>\s*Canada\s*</span>', lambda m: m.group(0).replace('Canada', name), p)

    # ─── 14. Hero CTA ───
    cta_old_start = 'We rank every tool on PIPEDA compliance, CAD pricing, bilingual (EN/FR) support,'
    cta_old_end = "for Canada's unique market."
    if cta_old_start in p and cta_old_end in p:
        # Replace everything between them
        s = p.find(cta_old_start)
        e = p.find(cta_old_end, s) + len(cta_old_end)
        old_cta_block = p[s:e]
        new_cta_block = f"{cta_line}\n              and {name} AI ecosystem readiness — so you find tools built for {name}'s unique market."
        p = p.replace(old_cta_block, new_cta_block)

    # ─── 15. Top Tools heading ───
    p = p.replace('Top AI Tools in Canada', top_h)

    # ─── 16. Canada-market readiness ───
    p = p.replace('Canada-market readiness', f'{name}-market readiness')

    # ─── 17. Category links ───
    p = p.replace("for Canada</h2>", f"for {name}</h2>")
    # Section category links 'for Canada<ArrowRight'
    p = p.replace("tools for Canada<ArrowRight", f"tools for {name}<ArrowRight")

    # ─── 18. Why section ───
    p = p.replace('Why Canada Needs Its Own AI Tool Directory', why_h)
    p = p.replace(
        "Canada's AI ecosystem is unique — world-leading research meets a distinct regulatory and cultural landscape.",
        why_text
    )

    # ─── 19. Trust indicator blocks ───
    p = replace_trust_block(p, 'Bilingual by Law (EN/FR)', t1_t, t1_d)
    p = replace_trust_block(p, 'PIPEDA, AIDA & Law 25', t2_t, t2_d)
    p = replace_trust_block(p, 'Vector Institute & CIFAR Ecosystem', t3_t, t3_d)

    # ─── 20. Top picks subtitle ───
    old = "Top picks for Canadian teams — rated for PIPEDA compliance, CAD pricing, and bilingual support."
    p = p.replace(old, top_sub)

    # ─── 21. Playbooks ───
    p = p.replace('built for Canadian teams and startups', f'built for {name.lower()} teams and startups')

    # ─── 22. Ecosystem heading + sub ───
    p = p.replace("Canada's AI Ecosystem Is a Global Research Powerhouse", eco_h)
    eco_sub_old = (
        "From Toronto's Vector Institute to Montreal's Mila, Canada produces foundational AI research\n"
        "              that powers the world's most advanced systems — with a distinctly Canadian approach to responsible AI."
    )
    p = p.replace(eco_sub_old, eco_sub)

    # ─── 23. Ecosystem blocks ───
    p = replace_eco_block(p, "Toronto — Vector Institute & AI Hub", e1t, e1d)
    p = replace_eco_block(p, "Montreal — Mila & Deep Learning", e2t, e2d)
    p = replace_eco_block(p, "Vancouver & Waterloo — Tech & Autonomy", e3t, e3d)
    p = replace_eco_block(p, "\U0001f52c Pan-Canadian AI Strategy & CIFAR", e4t, e4d)

    # ─── 24. FAQ blocks ───
    p = replace_faq_block(p, 0, faq1_q, faq1_a)
    p = replace_faq_block(p, 1, faq2_q, faq2_a)
    p = replace_faq_block(p, 2, faq3_q, faq3_a)
    p = replace_faq_block(p, 3, faq4_q, faq4_a)
    p = replace_faq_block(p, 4, faq5_q, faq5_a)

    # ─── 25. CTA section ───
    p = p.replace('Find the Right AI Tool for Your Canadian Business',
                  f'Find the Right AI Tool for Your {name} Business')
    p = p.replace('Built for Canadian Founders, Researchers & Enterprises',
                  f'Built for {name} Founders, Teams & Innovators')

    cta_old = (
        "No more guessing if a tool complies with PIPEDA, supports French, or works for Canadian teams. "
        "Every tool on Apifeny AI is rated for Canadian data compliance, CAD pricing, and bilingual readiness. "
        "Start exploring — no account needed."
    )
    cta_new = (
        f"No more guessing if a tool works for {name}'s market, or respects local data laws. "
        f"Every tool on Apifeny AI is rated for {name} data compliance, local pricing, and relevance. "
        "Start exploring — no account needed."
    )
    p = p.replace(cta_old, cta_new)

    # ─── 26. Keywords ───
    kw_old = ('best AI tools in Canada 2026 · AI tools for Canadian businesses · Canada AI software · \n'
              '              AI writing tools Canada · AI coding tools Canada · AI marketing Canada · \n'
              '              Canada AI directory · AI tools for Canadian startups · enterprise AI tools Canada · \n'
              '              free AI tools Canada · AI productivity Canada · Canadian tech stack · \n'
              '              AI tools Toronto · AI tools Montreal · AI tools Vancouver')
    p = p.replace(kw_old, kw)

    # ─── 27. Canada AI tools label ───
    p = p.replace('Canada AI tools:', f'{name} AI tools:')

    # ─── 28. Guide heading ───
    p = p.replace('Canada-Focused AI Guides', guide_heading)

    # ─── Write ───
    outdir = os.path.join(APP, f'ai-tools-{slug}')
    os.makedirs(outdir, exist_ok=True)
    with open(os.path.join(outdir, 'page.tsx'), 'w') as f:
        f.write(p)

    # ─── Verify ───
    terms = ['Canada', 'Canadian', 'PIPEDA', 'CIFAR', 'Montreal', 'Toronto',
             'Waterloo', 'Vancouver', 'Mila', 'Vector', 'SR&ED', 'IRAP',
             'BDC', 'OSFI', 'AIDA', 'Amii']
    remaining = {t: len(re.findall(rf'\b{re.escape(t)}\b', p)) for t in terms}
    remaining = {k: v for k, v in remaining.items() if v > 0}
    if remaining:
        print(f'  ✗ {slug}: REMAINING {sum(remaining.values())}: {remaining}')
    else:
        print(f'  ✓ {slug}: ALL CLEAN')


# ====== HELPER FUNCTIONS ======

def replace_meta_block(text, key, replacement):
    """Replace a multiline meta block like 'description:\n    '...'' or 'ogDescription:\n    '...''.
    The replacement should be a string ending with the closing quote (') but NOT the comma.
    The existing comma/newline after the match will be preserved.
    """
    pattern = re.compile(
        rf"({key}:\s*\n\s+'(?:[^'\\]|\\.)*')"
    )
    match = pattern.search(text)
    if match:
        return text.replace(match.group(1), replacement, 1)
    # Fallback: try finding the block content directly
    idx = text.find(f"{key}:\n")
    if idx >= 0:
        start = text.find("'", idx)
        end = text.find("',\n", start) + 2
        return text[:idx] + replacement + text[end:]
    return text


def replace_trust_block(text, old_title, new_title, new_desc):
    """Replace a trust indicator block's title and description."""
    # Find the block by old title
    idx = text.find(old_title)
    if idx < 0:
        print(f'    WARN: Could not find trust block with title "{old_title}"')
        return text
    
    # Find the description span
    desc_prefix = "description: '"
    desc_start = text.find(desc_prefix, idx)
    if desc_start < 0:
        return text
    
    # Description ends at the next ', gradient: ' pattern
    desc_end_marker = "', gradient: '"
    desc_end = text.find(desc_end_marker, desc_start)
    if desc_end < 0:
        desc_end = text.find("'", desc_start + len(desc_prefix) + 1)
        desc_end += 1  # include closing quote
    else:
        desc_end += len(desc_end_marker) - len("'")  # keep the comma space
    
    old_full = text[idx:desc_end]
    # Build new
    suffix = text[desc_end:desc_end+len("', gradient: '")]
    if suffix.startswith(", gradient"):
        # keep gradient part
        suffix_start = desc_end + 0
    else:
        suffix_start = desc_end
    new_title_desc = f"{new_title}', description: '{new_desc}"
    new_full = text[idx:idx + len(old_title)] + new_title_desc[len(new_title):]
    
    # Actually simpler: just replace title, then description
    text = text.replace(old_title, new_title, 1)
    # Get the description between the old description start and the gradient marker
    old_desc_start = text.find("description: '", text.find(new_title))
    old_desc_end = text.find("', gradient: '", old_desc_start)
    if old_desc_end > 0:
        old_desc_full = text[old_desc_start:old_desc_end]
        new_desc_full = f"description: '{new_desc.replace(chr(39), chr(92)+chr(39))}"
        text = text.replace(old_desc_full, new_desc_full, 1)
    return text


def replace_eco_block(text, old_title, new_title, new_desc):
    """Replace an ecosystem block's title and description."""
    text = text.replace(old_title, new_title, 1)
    # Find description after the new title
    idx = text.find(new_title)
    if idx < 0:
        return text
    desc_prefix = "description: '"
    desc_start = text.find(desc_prefix, idx)
    if desc_start < 0:
        return text
    desc_end_marker = "' },\n"
    desc_end = text.find(desc_end_marker, desc_start)
    if desc_end < 0:
        desc_end = text.find("' },", desc_start)
    if desc_end < 0:
        # Try next single quote
        desc_end = text.find("'", desc_start + len(desc_prefix) + 1)
    if desc_end < 0:
        return text
    desc_end += 1
    old_desc_full = text[desc_start:desc_end]
    new_desc_full = f"description: '{new_desc.replace(chr(39), chr(92)+chr(39))}'"
    text = text.replace(old_desc_full, new_desc_full, 1)
    return text


def replace_faq_block(text, index, new_q, new_a):
    """Replace the Nth FAQ block (0-indexed)."""
    # Find all FAQ blocks
    faq_pattern = re.compile(r'\{ question: "([^"]+)",\s*answer: "((?:[^"\\]|\\.)*)"\s*\}')
    matches = list(faq_pattern.finditer(text))
    if index >= len(matches):
        print(f'    WARN: FAQ index {index} not found (only {len(matches)} FAQs)')
        return text
    m = matches[index]
    old_faq = m.group(0)
    # Escape any double quotes in new_q and new_a
    safe_q = new_q.replace('"', '\\"')
    safe_a = new_a.replace('"', '\\"')
    new_faq = f'{{ question: "{safe_q}", answer: "{safe_a}" }}'
    text = text.replace(old_faq, new_faq, 1)
    return text


# ====== COUNTRY DATA ======

def austria():
    adj = 'Austrian'
    generate(
        slug='austria', name='Austria', code='at', capital='Vienna', currency='EUR',
        lang='German / English', langCode='de',
        title='Best AI Tools in Austria (2026) — Curated for Austrian Teams & Startups',
        meta_desc="Discover the best AI tools for Austrian businesses and founders. Curated directory of 85+ tools ranked by "
                  "trending score, Austria-market readiness, and local relevance. Updated daily. Built for Vienna, Graz, Linz, "
                  "and Austria's thriving AI ecosystem.",
        og_desc="Find AI tools built for Austria: FFG-funded ecosystem, GDPR compliance, EUR pricing, and German/English "
                "support. 85+ tools, expert ranked.",
        market_desc='€500B economy, 9.1M population, Central Europe\'s innovation leader — home to the Vienna AI hub, TU Wien, '
                     'JKU Linz (LIT AI Lab), generous 14% R&D tax credits, and a €15B+ tech ecosystem',
        g1='from-orange-400', g2='via-white', g3='to-orange-300',
        bg='bg-orange-500/10', bd='border-orange-500/20', bt='text-orange-300',
        rc='from-orange-400 to-white', sc='from-orange-500/20 to-rose-900/10', tc='orange',
        hl='Deutsch / English', hp='EUR Pricing', hc='GDPR & DSGVO', hr='AI Research-Ready',
        sf='AT-Ready',
        faq1_q='What are the best AI tools in Austria?',
        faq1_a="The best AI tools in Austria include ChatGPT for content and productivity, GitHub Copilot for development, "
               "Claude for advanced reasoning, Canva AI for design, and Jasper for marketing. Austria is a rising Central "
               "European AI hub — home to the LIT AI Lab at JKU Linz, TU Wien's AI research, and a growing startup ecosystem "
               "in Vienna. These tools are particularly well-suited for Austrian businesses because they offer EUR pricing, "
               "German/English support, and strong GDPR-compliant data handling.",
        faq2_q='How does Austrian data protection law (DSGVO) affect AI tool selection?',
        faq2_a="Austria's DSGVO implements the EU GDPR with national-specific provisions enforced by the Austrian Data "
               "Protection Authority (DSB). AI tools processing Austrian customer data must support EU data residency, "
               "provide transparency in automated decision-making, and enable consent management under Art. 22 GDPR. "
               "We evaluate every tool for DSGVO readiness and EU data protection compliance.",
        faq3_q="What AI tools are best for Austria's key industries?",
        faq3_a="Austria's economy has distinct AI priorities: manufacturing and industrial AI for Styria's automotive "
               "sector, HealthTech AI in Upper Austria and Vienna, fintech AI in Vienna's growing financial ecosystem, "
               "energy AI for renewable energy (hydropower, wind, solar), and tourism AI for Vienna, Salzburg, and "
               "Tyrol's travel industry. AI also transforms logistics, environmental tech, and life sciences.",
        faq4_q='How can Austrian startups access AI funding and support?',
        faq4_a="Austria offers extensive AI innovation support. The FFG (Austrian Research Promotion Agency) provides "
               "targeted funding for AI R&D projects. aws (Austria Wirtschaftsservice) offers startup financing and "
               "venture capital. Austria's 14% R&D tax credit is one of Europe's most generous. EU Horizon Europe and "
               "Digital Europe programmes supplement national funding. Vienna Business Agency, Startup.Tirol, and Tech2b "
               "support regional startup ecosystems.",
        faq5_q='What AI regulations exist in Austria?',
        faq5_a="Austria's AI regulatory framework is shaped by the EU AI Act, the world's first comprehensive AI "
               "regulation. National implementation is coordinated by the Austrian AI Strategy (AIS Austria). The DSGVO "
               "governs data used in AI training. Sector-specific regulators apply: FMA for fintech AI, AGES for health "
               "AI, and BMK for autonomous vehicles.",
        t1_t='Bilingual by Default (DE/EN)',
        t1_d="Austria is a German-speaking nation with a highly internationalised tech sector. The DSGVO (Austrian Data "
             "Protection Act) implements strict GDPR requirements, and many business tools require English support for "
             "Vienna's multinational workforce. We flag every tool for German-language support and bilingual readiness.",
        t2_t='GDPR & DSGVO — Austrian Privacy Framework',
        t2_d="Austria follows the EU GDPR with national supplementation via the DSGVO (Datenschutzgesetz). The Austrian "
             "Data Protection Authority (DSB) is one of Europe's most active regulators. We verify every tool's data "
             "residency options within the EU, GDPR compliance posture, and alignment with DSB guidance on AI and "
             "automated decision-making.",
        t3_t='FFG, aws & the AI Austria Ecosystem',
        t3_d="Austria offers Europe's most generous R&D tax credit at 14% alongside the Austrian Research Promotion "
             "Agency (FFG) and aws (Austria Wirtschaftsservice) startup programs. The Vienna AI Hub, LIT AI Lab at "
             "JKU Linz, and TU Wien produce world-class AI research. We highlight tools aligned with Austria's "
             "innovation priorities.",
        e1t='🇦🇹 Vienna — AI Hub & Innovation Capital',
        e1d="Vienna accounts for most Austrian AI startups and companies. The city is home to TU Wien's AI research, "
            "the Vienna BioCenter for health AI, and a thriving startup scene. ViennaUP draws global investors and "
            "founders annually.",
        e2t='🎓 Linz — LIT AI Lab & Deep Learning',
        e2d="JKU Linz hosts the LIT AI Lab (Linz Institute of Technology), a powerhouse for deep learning and machine "
            "learning research. Upper Austria drives AI innovation in manufacturing, automotive, and medical technology.",
        e3t='🏢 Graz & Styria — Industrial AI & Manufacturing',
        e3d="Graz, Austria's second-largest city, is a centre for industrial AI, automotive engineering (AVL, Magna), "
            "and environmental technology. TU Graz produces top engineering talent for AI in smart manufacturing, "
            "energy, and sustainable mobility.",
        e4t='🔬 Pan-Austrian Innovation & EU Funding',
        e4d="Austria benefits from EU Horizon Europe programmes for AI R&D. The FFG provides targeted AI funding and "
            "aws offers startup financing. Combined with 14% R&D tax credits, a skilled workforce, and strong "
            "university-industry partnerships, Austria offers one of Europe's best environments for AI startups.",
        eco_h="Austria's AI Ecosystem Is a Central European Powerhouse",
        eco_sub="From Vienna's thriving AI hub to JKU Linz's LIT AI Lab, Austria produces world-class AI research\n"
                "              and top-tier engineering talent. These four pillars power",
        cta_line='We rank every tool on GDPR/DSGVO compliance, EUR pricing, and German/English support,',
        kw='best AI tools in Austria 2026 · AI tools for Austrian businesses · Austria AI software · '
           'AI writing tools Austria · AI coding tools Austria · AI marketing Austria · '
           'Austria AI directory · AI tools for Austrian startups · enterprise AI tools Austria · '
           'free AI tools Austria · AI productivity Austria · Austrian tech stack · '
           'AI tools Vienna · AI tools Graz · AI tools Linz · AI tools Salzburg',
        guide_heading='Austria-Focused AI Guides',
        why_h='Why Austria Needs Its Own AI Tool Directory',
        why_text="Austria's AI ecosystem is unique — a distinct market, regulatory landscape, and growing innovation "
                 "culture at the heart of Europe.",
        top_h='Top AI Tools in Austria',
        top_sub='Top picks for Austrian teams — rated for local relevance and EUR pricing.',
    )


def belgium():
    generate(
        slug='belgium', name='Belgium', code='be', capital='Brussels', currency='EUR',
        lang='Dutch / French / German / English', langCode='en',
        title='Best AI Tools in Belgium (2026) — Curated for Belgian Teams & Startups',
        meta_desc="Discover the best AI tools for Belgian businesses and founders. Curated directory of 85+ tools ranked by "
                  "trending score, Belgium-market readiness, and local relevance. Updated daily. Built for Brussels, Antwerp, "
                  "Ghent, and Belgium's thriving AI ecosystem.",
        og_desc="Find AI tools built for Belgium: imec ecosystem, multilingual (NL/FR/DE/EN) support, GDPR compliance, "
                "and EUR pricing. 85+ tools, expert ranked.",
        market_desc='€600B economy, 11.7M population, EU capital — home to imec (world-leading nanoelectronics), a '
                     'multilingual workforce, strong fintech and healthtech sectors, and one of Europe\'s highest '
                     'startup density rates',
        g1='from-yellow-400', g2='via-white', g3='to-yellow-300',
        bg='bg-yellow-500/10', bd='border-yellow-500/20', bt='text-yellow-300',
        rc='from-yellow-400 to-white', sc='from-yellow-500/20 to-rose-900/10', tc='yellow',
        hl='Nederlands / Français / Deutsch / English', hp='EUR Pricing',
        hc='GDPR & AI4Belgium Charter', hr='EU AI-Ready',
        sf='BE-Ready',
        faq1_q='What are the best AI tools in Belgium?',
        faq1_a="The best AI tools in Belgium include ChatGPT for content and productivity, GitHub Copilot for development, "
               "Claude for advanced reasoning, Canva AI for design, and Jasper for marketing. Belgium is a European AI "
               "hub — home to imec in Leuven, the Ghent AI Lab (GAIL), and a growing startup ecosystem across Brussels, "
               "Antwerp, and Ghent. These tools are well-suited for Belgian businesses because they offer EUR pricing, "
               "multilingual (NL/FR/DE/EN) support, and strong GDPR-compliant data handling.",
        faq2_q='How does Belgian data protection law (GDPR) affect AI tool selection?',
        faq2_a="Belgium follows the EU GDPR, enforced by the Belgian Data Protection Authority (GBA/APD). As home to the "
               "EU institutions, Belgium has particularly high data compliance standards. The AI4Belgium Charter for "
               "Responsible AI Use sets additional ethical guidelines. We evaluate every tool for GDPR compliance, "
               "EU data residency, and alignment with GBA/APD guidance on AI and automated decision-making.",
        faq3_q="What AI tools are best for Belgium's key industries?",
        faq3_a="Belgium's economy has distinct AI priorities: logistics and port AI in Antwerp (Europe's second-largest "
               "port), deep tech and chip design AI with imec in Leuven, fintech AI in Brussels' financial district, "
               "health AI leveraging Belgium's world-class pharma sector (UCB, Janssen), and creative AI in Ghent's "
               "digital media ecosystem.",
        faq4_q='How can Belgian startups access AI funding and support?',
        faq4_a="Belgium offers extensive AI innovation support. VLAIO (Flanders) provides R&D grants. hub.brussels "
               "supports Brussels startups. DigitalWallonia4.ai drives AI adoption in Wallonia. The federal AI4Belgium "
               "programme coordinates national AI strategy. EU Horizon Europe programmes supplement funding. Belgium "
               "also benefits from generous R&D tax credits.",
        faq5_q='What AI regulations exist in Belgium?',
        faq5_a="Belgium's AI regulatory framework is shaped by the EU AI Act, with national coordination via the "
               "AI4Belgium programme. The Belgian Data Protection Authority (GBA/APD) enforces GDPR for AI training "
               "data. The AI4Belgium Charter sets voluntary standards for responsible AI use. Sector-specific "
               "regulations apply: FSMA for fintech AI, FAMHP for health AI, and the FPS Mobility for transport AI.",
        t1_t='Multilingual by Law (NL/FR/DE/EN)',
        t1_d="Belgium has three official languages (Dutch, French, German) plus English widely used in business. "
             "Many AI tools require multilingual support for Belgian teams. We flag every tool for Belgian language "
             "readiness.",
        t2_t='GDPR & AI4Belgium Charter',
        t2_d="Belgium follows the EU GDPR, enforced by the GBA/APD. As home to the EU capital, Belgium has high "
             "data compliance standards. The AI4Belgium Charter sets ethical AI guidelines. We verify every tool's "
             "data residency within the EU.",
        t3_t='imec & AI Belgium Ecosystem',
        t3_d="imec in Leuven is one of the world's leading nanoelectronics and AI chip research centres. The Ghent "
             "AI Lab (GAIL) and AI4Belgium coordinate the national AI ecosystem. We highlight tools aligned with "
             "Belgium's innovation priorities.",
        e1t='🇧🇪 Brussels — EU Capital & Fintech Hub',
        e1d="Brussels is the capital of the European Union, home to EU institutions, a thriving fintech scene, and "
            "the AI4Belgium coordination. The city hosts major AI conferences and policy discussions shaping "
            "Europe's AI future.",
        e2t='🔬 Leuven — imec & Deep Tech',
        e2d="Leuven is home to imec, one of the world's leading nanoelectronics and digital technology research "
            "centres. imec's AI chip design and edge AI research attract top global talent and partnerships with "
            "companies like Intel, ASML, and Samsung.",
        e3t='🏭 Antwerp — Logistics & Port AI',
        e3d="Antwerp is Europe's second-largest port and a centre for logistics AI. The city's port uses AI for "
            "predictive maintenance, route optimisation, and supply chain management. Antwerp also has a growing "
            "diamond-tech and creative AI scene.",
        e4t='🎨 Ghent — Creative & Digital AI',
        e4d="Ghent is a hub for creative AI, digital media, and gaming. The Ghent AI Lab (GAIL) produces "
            "cutting-edge research. Ghent's vibrant startup scene spans edtech, health AI, and digital marketing "
            "with strong university-industry collaboration.",
        eco_h="Belgium's AI Ecosystem Is a European Powerhouse",
        eco_sub="From imec in Leuven to the Brussels EU institutions, Belgium produces world-class AI research\n"
                "              and multilingual, multi-sector innovation. These four pillars power",
        cta_line='We rank every tool on GDPR compliance, EUR pricing, and multilingual (NL/FR/DE/EN) support,',
        kw='best AI tools in Belgium 2026 · AI tools for Belgian businesses · Belgium AI software · '
           'AI writing tools Belgium · AI coding tools Belgium · AI marketing Belgium · '
           'Belgium AI directory · AI tools for Belgian startups · enterprise AI tools Belgium · '
           'free AI tools Belgium · AI productivity Belgium · Belgian tech stack · '
           'AI tools Brussels · AI tools Antwerp · AI tools Ghent · AI tools Leuven',
        guide_heading='Belgium-Focused AI Guides',
        why_h='Why Belgium Needs Its Own AI Tool Directory',
        why_text="Belgium's AI ecosystem is unique — a multilingual, multi-regulatory landscape at the heart of "
                 "Europe with world-leading deep tech research.",
        top_h='Top AI Tools in Belgium',
        top_sub='Top picks for belgian teams — rated for local relevance and EUR pricing.',
    )


def chile():
    generate(
        slug='chile', name='Chile', code='cl', capital='Santiago', currency='CLP',
        lang='Spanish / English', langCode='es',
        title='Best AI Tools in Chile (2026) — Curated for Chilean Teams & Startups',
        meta_desc="Discover the best AI tools for Chilean businesses and founders. Curated directory of 85+ tools ranked by "
                  "trending score, Chile-market readiness, and local relevance. Updated daily. Built for Santiago, "
                  "Valparaíso, Concepción, and Chile's thriving AI ecosystem.",
        og_desc="Find AI tools built for Chile: CORFO ecosystem, Latin America's most competitive economy, CLP/USD "
                "pricing, and Spanish/English support. 85+ tools, expert ranked.",
        market_desc='$340B economy, 19.5M population, Latin America\'s most competitive startup ecosystem — home to '
                     'CORFO, two unicorns, strong mining AI, fintech, and agtech sectors, and a growing Santiago '
                     'innovation hub',
        g1='from-red-500', g2='via-white', g3='to-red-400',
        bg='bg-red-500/10', bd='border-red-500/20', bt='text-red-300',
        rc='from-red-500 to-white', sc='from-red-500/20 to-rose-900/10', tc='red',
        hl='Español / English', hp='CLP/USD Pricing', hc='Ley de Protección de Datos', hr='Chile Tech-Ready',
        sf='CL-Ready',
        faq1_q='What are the best AI tools in Chile?',
        faq1_a="The best AI tools in Chile include ChatGPT for content and productivity, GitHub Copilot for development, "
               "Claude for advanced reasoning, Canva AI for design, and Jasper for marketing. Chile is Latin America's "
               "most competitive startup ecosystem — home to CORFO, two unicorns (Buk, Xepelin), and a growing tech "
               "scene in Santiago. These tools work well for Chilean businesses because they offer Spanish/English "
               "support, CLP/USD flexibility, and strong data protection practices.",
        faq2_q='How does Chilean data privacy law (Law 19.628) affect AI tool selection?',
        faq2_a="Chile's Law No. 19.628 (Ley de Protección de la Vida Privada) governs personal data processing, "
               "enforced by the Council for Transparency (CPLT). A comprehensive new Data Protection Bill is advancing "
               "through Congress, inspired by the GDPR, introducing stronger requirements for AI training data. We "
               "evaluate every tool for Chilean data protection compliance and LatAm data residency options.",
        faq3_q="What AI tools are best for Chile's key industries?",
        faq3_a="Chile's economy has distinct AI priorities: mining AI for the world's largest copper and second-largest "
               "lithium producer, agtech AI for Chile's wine, salmon, and fruit exports, fintech AI in Santiago's "
               "financial ecosystem, and renewable energy AI for Chile's world-leading solar and wind sectors. AI "
               "also transforms Chile's retail, logistics, and healthcare sectors.",
        faq4_q='How can Chilean startups access AI funding and support?',
        faq4_a="Chile offers extensive AI innovation support. CORFO provides equity-free grants up to $100K and 35% "
               "R&D tax credits through programmes like Start-Up Chile. ProChile supports international expansion. "
               "Universities (PUC, UChile, USM, UAI) offer research partnerships. Angel networks like ChileGlobal "
               "Angels and VC funds like FEN Ventures back Chilean AI startups.",
        faq5_q='What AI regulations exist in Chile?',
        faq5_a="Chile's AI regulatory framework is evolving. The National AI Policy sets strategic direction for "
               "responsible AI development. A new Data Protection Bill inspired by the GDPR is advancing through "
               "Congress. Sector-specific regulations apply: CMF for fintech AI, SERNAGEOMIN for mining AI, and ISP "
               "for health AI. Chile aligns with OECD AI Principles.",
        t1_t='Español/English Ready',
        t1_d="Chile is a Spanish-speaking nation with strong English proficiency in the tech sector. We flag every "
             "tool for Spanish-language support and bilingual readiness — critical for serving markets across "
             "Latin America.",
        t2_t='Law 19.628 — Chilean Privacy Framework',
        t2_d="Chile's data protection law (Law 19.628) is enforced by the Council for Transparency (CPLT). A new "
             "comprehensive Data Protection Bill inspired by GDPR is advancing through Congress, introducing "
             "stronger requirements for AI training data and cross-border transfers.",
        t3_t='CORFO & Start-Up Chile Ecosystem',
        t3_d="CORFO provides equity-free grants up to $100K and 35% R&D tax credits through Start-Up Chile and "
             "other innovation programmes. Chile's two unicorns (Buk, Xepelin) and growing VC ecosystem make it "
             "Latin America's most attractive AI startup destination.",
        e1t='🇨🇱 Santiago — CORFO & Innovation Hub',
        e1d="Santiago is the heart of Chile's AI ecosystem, home to CORFO, Start-Up Chile, and a growing "
            "concentration of AI startups, accelerators, and VC firms. The city's innovation district hosts "
            "coworking spaces, university labs, and corporate innovation centres.",
        e2t='⛏️ Antofagasta — Mining AI & Resources',
        e2d="Antofagasta is the world's copper mining capital and a leader in mining AI. Companies use AI for "
            "predictive maintenance, autonomous haulage, and mineral processing optimisation. Chile's copper "
            "mines are among the most technologically advanced globally.",
        e3t='🌱 Valparaíso — Agtech & Biotech AI',
        e3d="Valparaíso and the Central Valley drive Chile's agtech AI revolution. From precision agriculture "
            "in vineyards to AI-powered salmon farming, Chile's agricultural sector leverages AI for global "
            "export competitiveness in wine, fruit, and seafood.",
        e4t='🔬 Concepción — Energy & Green Tech AI',
        e4d="Concepción and the Bio-Bío region lead Chile's renewable energy AI transformation. Chile has the "
            "world's highest solar radiation levels in the Atacama Desert and massive wind potential — AI "
            "optimises grid integration, battery storage, and green hydrogen production.",
        eco_h="Chile's AI Ecosystem Is Latin America's Most Competitive",
        eco_sub="From Santiago's innovation hub to the Atacama Desert's solar AI, Chile produces world-class "
                "AI research\n              and Latin America's most competitive tech ecosystem. These four pillars power",
        cta_line='We rank every tool on Chilean data compliance, CLP/USD pricing, and Spanish/English support,',
        kw='best AI tools in Chile 2026 · AI tools for Chilean businesses · Chile AI software · '
           'AI writing tools Chile · AI coding tools Chile · AI marketing Chile · '
           'Chile AI directory · AI tools for Chilean startups · enterprise AI tools Chile · '
           'free AI tools Chile · AI productivity Chile · Chilean tech stack · '
           'AI tools Santiago · AI tools Valparaíso · AI tools Concepción',
        guide_heading='Chile-Focused AI Guides',
        why_h='Why Chile Needs Its Own AI Tool Directory',
        why_text="Chile's AI ecosystem is unique — Latin America's most competitive economy with world-leading "
                 "mining AI, agtech innovation, and a rapidly growing startup scene backed by CORFO and "
                 "Start-Up Chile.",
        top_h='Top AI Tools in Chile',
        top_sub='Top picks for chilean teams — rated for local relevance and CLP/USD pricing.',
    )


def colombia():
    generate(
        slug='colombia', name='Colombia', code='co', capital='Bogotá', currency='COP',
        lang='Spanish / English', langCode='es',
        title='Best AI Tools in Colombia (2026) — Curated for Colombian Teams & Startups',
        meta_desc="Discover the best AI tools for Colombian businesses and founders. Curated directory of 85+ tools ranked by "
                  "trending score, Colombia-market readiness, and local relevance. Updated daily. Built for Bogotá, "
                  "Medellín, Cali, and Colombia's thriving AI ecosystem.",
        og_desc="Find AI tools built for Colombia: iNNpulsa ecosystem, Latin America's fastest-growing startup scene, "
                "COP/USD pricing, and Spanish/English support. 85+ tools, expert ranked.",
        market_desc='$400B economy, 52M population, Latin America\'s fastest-growing startup ecosystem — 2,126 startups, '
                     '3 unicorns (Rappi, Habi, Truora), 24% growth rate in 2025, and a $111.5M National AI Policy',
        g1='from-cyan-400', g2='via-white', g3='to-cyan-300',
        bg='bg-cyan-500/10', bd='border-cyan-500/20', bt='text-cyan-300',
        rc='from-cyan-400 to-white', sc='from-cyan-500/20 to-rose-900/10', tc='cyan',
        hl='Español / English', hp='COP/USD Pricing', hc='Ley 1581 de Protección de Datos', hr='Colombia Startup-Ready',
        sf='CO-Ready',
        faq1_q='What are the best AI tools in Colombia?',
        faq1_a="The best AI tools in Colombia include ChatGPT for content and productivity, GitHub Copilot for "
               "development, Claude for advanced reasoning, Canva AI for design, and Jasper for marketing. Colombia "
               "is Latin America's fastest-growing startup ecosystem — 2,126 startups, 3 unicorns (Rappi, Habi, "
               "Truora), and a 24% growth rate in 2025. These tools work well for Colombian businesses because "
               "they offer Spanish/English support, COP/USD flexibility, and strong data protection practices.",
        faq2_q='How does Colombian data privacy law (Law 1581) affect AI tool selection?',
        faq2_a="Colombia's Statutory Law 1581 of 2012 (Ley de Protección de Datos Personales) and its regulatory "
               "decrees impose strict requirements on how AI tools collect, use, and store personal data. The law "
               "is enforced by the SIC (Superintendencia de Industria y Comercio). Cross-border data transfers "
               "require adequate protections. We evaluate every tool for Colombian data protection compliance "
               "and LatAm data residency options.",
        faq3_q="What AI tools are best for Colombia's key industries?",
        faq3_a="Colombia's economy has distinct AI priorities: fintech AI in Bogotá and Medellín's booming "
               "financial ecosystem, logistics and mobility AI led by Rappi, edtech AI in Colombia's education "
               "technology scene, healthtech AI for healthcare, and creative AI in digital media. AI also "
               "transforms agriculture (coffee, flowers, bananas), energy, and manufacturing.",
        faq4_q='How can Colombian startups access AI funding and support?',
        faq4_a="Colombia offers extensive AI innovation support. iNNpulsa Colombia provides grants, co-investment, "
               "and acceleration programmes. Fondo Emprender (SENA) offers seed funding. The $111.5M National "
               "AI Policy funds AI adoption across sectors. Rockstart, Polymath Ventures, and K50 Ventures back "
               "Colombian AI startups. The ecosystem grew 24% in 2025.",
        faq5_q='What AI regulations exist in Colombia?',
        faq5_a="Colombia's AI regulatory framework is developing rapidly. The $111.5M National AI Policy "
               "(CONPES 4080) sets strategic direction. Law 1581 of 2012 governs personal data used in AI "
               "training, enforced by the SIC. The government is advancing a comprehensive AI law for "
               "high-impact AI systems. Sector-specific regulations apply: SFC for fintech AI, Invima for "
               "health AI, and MinTransporte for mobility AI. Colombia is a leader in LatAm AI governance.",
        t1_t='Español/English Ready',
        t1_d="Colombia is a Spanish-speaking nation with growing English proficiency in the tech sector. "
             "We flag every tool for Spanish-language support and bilingual readiness — critical for "
             "serving markets across Latin America.",
        t2_t='Law 1581 — Colombian Privacy Framework',
        t2_d="Colombia's Statutory Law 1581 of 2012 (Ley de Protección de Datos Personales) governs "
             "personal data processing, enforced by the SIC. Organizations must register their databases "
             "with the National Data Protection Registry. We evaluate every tool for Colombian data "
             "protection compliance and LatAm data residency.",
        t3_t='iNNpulsa & the Colombia Startup Ecosystem',
        t3_d="iNNpulsa Colombia provides grants, co-investment, and acceleration for AI startups. "
             "Colombia has 2,126 startups, 3 unicorns (Rappi, Habi, Truora), and a 24% growth rate. "
             "The $111.5M National AI Policy (CONPES 4080) drives AI adoption across all sectors.",
        e1t='🇨🇴 Bogotá — Fintech & Innovation Capital',
        e1d="Bogotá is Colombia's largest city and startup hub, home to Rappi's global HQ, a thriving "
            "fintech ecosystem, iNNpulsa Colombia, and major universities driving AI research. The city's "
            "innovation district attracts VC firms and accelerators.",
        e2t='💡 Medellín — Startup City & Edtech Hub',
        e2d="Medellín has transformed into Latin America's most innovative city. Home to Ruta N, "
            "the city's innovation centre, and a thriving edtech scene, Medellín produces AI startups "
            "focusing on education, health, and mobility.",
        e3t='🌊 Cali — Logistics & Healthtech AI',
        e3d="Cali, Colombia's third-largest city, is a growing centre for logistics AI, healthtech, "
            "and creative industries. The Pacific port of Buenaventura connects Colombian businesses "
            "to Asia-Pacific markets, driving supply chain AI innovation.",
        e4t='☕ Eje Cafetero — Agtech & Green AI',
        e4d="Colombia's Coffee Region (Eje Cafetero) is at the forefront of agtech AI. From precision "
            "agriculture for coffee, flowers, and avocados to AI-powered supply chain optimisation, "
            "Colombia's agricultural sector uses AI for global export competitiveness and sustainability.",
        eco_h="Colombia's AI Ecosystem Is Latin America's Fastest Growing",
        eco_sub="From Bogotá's fintech unicorns to Medellín's innovation district, Colombia produces "
                "world-class AI startups\n              and Latin America's fastest-growing tech ecosystem. "
                "These four pillars power",
        cta_line='We rank every tool on Colombian data compliance (Law 1581), COP/USD pricing, and Spanish/English support,',
        kw='best AI tools in Colombia 2026 · AI tools for Colombian businesses · Colombia AI software · '
           'AI writing tools Colombia · AI coding tools Colombia · AI marketing Colombia · '
           'Colombia AI directory · AI tools for Colombian startups · enterprise AI tools Colombia · '
           'free AI tools Colombia · AI productivity Colombia · Colombian tech stack · '
           'AI tools Bogotá · AI tools Medellín · AI tools Cali',
        guide_heading='Colombia-Focused AI Guides',
        why_h='Why Colombia Needs Its Own AI Tool Directory',
        why_text="Colombia's AI ecosystem is unique — Latin America's fastest-growing startup scene with "
                 "3 unicorns, 2,126 startups, and a $111.5M National AI Policy driving innovation across "
                 "fintech, logistics, and agtech.",
        top_h='Top AI Tools in Colombia',
        top_sub='Top picks for colombian teams — rated for local relevance and COP/USD pricing.',
    )


# ====== MAIN ======
if __name__ == '__main__':
    import sys
    country = sys.argv[1] if len(sys.argv) > 1 else 'all'
    if country == 'all' or country == 'austria':
        print('Generating Austria...')
        austria()
    if country == 'all' or country == 'belgium':
        print('Generating Belgium...')
        belgium()
    if country == 'all' or country == 'chile':
        print('Generating Chile...')
        chile()
    if country == 'all' or country == 'colombia':
        print('Generating Colombia...')
        colombia()
    print('\nAll done.')
