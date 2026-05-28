#!/usr/bin/env python3
"""Generate 21 geo landing pages from Canada template using block-level string replacement."""
import os

APP = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'app')

# Read the Canada template once
with open(os.path.join(APP, 'ai-tools-canada', 'page.tsx')) as f:
    CANADA = f.read()

# Exact FAQ search strings from Canada template (lines 79-83 of page.tsx)
# Build them from the CANADA template itself so they always match
def _extract_faq_search(canada, n):
    """Extract the nth FAQ entry (1-indexed) from the Canada template as a search string."""
    marker = 'faqs={['
    start = canada.find(marker) + len(marker)
    # skip to the nth entry
    brace_count = 0
    found = 0
    entry_start = None
    i = start
    while i < len(canada):
        if canada[i] == '{':
            brace_count += 1
            if brace_count == 1 and entry_start is None:
                entry_start = i
        elif canada[i] == '}':
            brace_count -= 1
            if brace_count == 0 and entry_start is not None:
                found += 1
                if found == n:
                    # Return from entry_start through the closing }, (or })
                    end = canada.find('},', i) + 2
                    return canada[entry_start:end]
                entry_start = None
        i += 1
    return None

FAQ1_SEARCH = _extract_faq_search(CANADA, 1)
FAQ2_SEARCH = _extract_faq_search(CANADA, 2)
FAQ3_SEARCH = _extract_faq_search(CANADA, 3)
FAQ4_SEARCH = _extract_faq_search(CANADA, 4)
FAQ5_SEARCH = _extract_faq_search(CANADA, 5)

# Verify extraction
assert FAQ1_SEARCH is not None, "Failed to extract FAQ1"
assert FAQ2_SEARCH is not None, "Failed to extract FAQ2"
assert FAQ3_SEARCH is not None, "Failed to extract FAQ3"
assert FAQ4_SEARCH is not None, "Failed to extract FAQ4"
assert FAQ5_SEARCH is not None, "Failed to extract FAQ5"

def make(slug, name, code, capital, currency, lang, langCode,
         title, meta_desc, og_desc, market,
         grad1, grad2, grad3, badge_bg, badge_border, badge_text,
         rank_col, section_col, trust_col, stats_filter,
         hero_lang, hero_price, hero_comply, hero_ready,
         trust1_t, trust1_d, trust2_t, trust2_d, trust3_t, trust3_d,
         eco1_t, eco1_d, eco2_t, eco2_d, eco3_t, eco3_d, eco4_t, eco4_d,
         faq1_q, faq1_a, faq2_q, faq2_a, faq3_q, faq3_a, faq4_q, faq4_a, faq5_q, faq5_a,
         cta_line, keywords,
         eco_heading, eco_sub, why_heading, why_text, top_heading, top_sub,
         guide_heading, breadcrumb_name):
    """
    Replace all Canada-specific content blocks in the template.
    Each parameter replaces an exact Canada text block.
    """
    page = CANADA

    # URL slugs and component names (always first)
    page = page.replace('ai-tools-canada', 'ai-tools-' + slug)
    page = page.replace('AIToolsCanadaPage', 'AITools' + name.replace(' ', '') + 'Page')

    # Meta
    page = page.replace("Best AI Tools in Canada (2026) \u2014 Curated for Canadian Teams & Startups", title)
    page = page.replace("Best AI Tools in Canada (2026) \u2014 Apifeny AI", "Best AI Tools in " + name + " (2026) \u2014 Apifeny AI")

    old_desc = ("Discover the best AI tools for Canadian businesses and founders. Curated directory of 85+ tools ranked by trending score, "
                "Canada-market readiness, and local relevance. Updated daily. Built for Toronto, Montreal, Vancouver, and Canada's thriving AI ecosystem.")
    page = page.replace(old_desc, meta_desc)

    old_og = ("Find AI tools built for Canada: CIFAR-aligned research, Vector Institute ecosystem, CAD pricing, bilingual (EN/FR) support, "
              "and Canadian data compliance. 85+ tools, expert ranked.")
    page = page.replace(old_og, og_desc)

    # GeoSeoSchema props
    page = page.replace('countryName="Canada"', 'countryName="' + name + '"')
    page = page.replace('countryCode="ca"', 'countryCode="' + code + '"')
    page = page.replace('capital="Ottawa"', 'capital="' + capital + '"')
    page = page.replace('currency="CAD"', 'currency="' + currency + '"')
    page = page.replace('language="English / French"', 'language="' + lang + '"')
    page = page.replace('languageCode="en"', 'languageCode="' + langCode + '"')

    # Market description
    old_market = ("$2.2T economy, 40M population, world-leading AI research ecosystem (Vector Institute, CIFAR, MILA), "
                  "G7 member with strong tech immigration pipelines, rapidly growing VC scene")
    page = page.replace(old_market, market)

    # Breadcrumb
    page = page.replace("'AI Tools Canada'", "'AI Tools " + name + "'")

    # Visual gradients and class names
    page = page.replace('from-red-400 via-white to-red-300', grad1 + ' ' + grad2 + ' ' + grad3)
    page = page.replace('bg-red-500/10', badge_bg)
    page = page.replace('border-red-500/20', badge_border)
    page = page.replace('text-red-300', badge_text)
    page = page.replace('from-red-400 to-white', rank_col)
    page = page.replace('from-red-500/20 to-rose-900/10', section_col)
    page = page.replace('text-red-400', 'text-' + trust_col + '-400')

    # Hero subtitle badge
    page = page.replace('English / Fran\u00e7ais', hero_lang)
    page = page.replace('CAD Pricing', hero_price)
    page = page.replace('PIPEDA & Law 25', hero_comply)
    page = page.replace('AI Research-Ready', hero_ready)

    # Stats filter
    page = page.replace('CA-Ready Filters', stats_filter + ' Filters')
    page = page.replace('CA-Ready', stats_filter)

    # FAQ blocks — replace BEFORE generic 'Canada' -> name to avoid corrupting search strings
    page = page.replace(FAQ1_SEARCH,
        '{ question: "' + faq1_q + '", answer: "' + faq1_a + '" },')
    page = page.replace(FAQ2_SEARCH,
        '{ question: "' + faq2_q + '", answer: "' + faq2_a + '" },')
    page = page.replace(FAQ3_SEARCH,
        '{ question: "' + faq3_q + '", answer: "' + faq3_a + '" },')
    page = page.replace(FAQ4_SEARCH,
        '{ question: "' + faq4_q + '", answer: "' + faq4_a + '" },')
    page = page.replace(FAQ5_SEARCH,
        '{ question: "' + faq5_q + '", answer: "' + faq5_a + '" },')

    # Badge on hero
    page = page.replace('Canada-Focused \u00b7 Updated Daily', name + '-Focused \u00b7 Updated Daily')

    # Hero text
    page = page.replace('Canada', name)  # The standalone Canada in hero

    # "actually work for Canada"
    page = page.replace('actually work for Canada', 'actually work for ' + name)

    # "for Canada's unique market"
    page = page.replace("for Canada's unique market", "for " + name + "'s unique market")

    # Top Tools heading
    page = page.replace('Top AI Tools in Canada', 'Top AI Tools in ' + name)

    # "ranked by trending score and Canada-market readiness"
    page = page.replace('Canada-market readiness', name + '-market readiness')

    # Why heading + text
    page = page.replace("Why Canada Needs Its Own AI Tool Directory", why_heading)
    page = page.replace("Canada's AI ecosystem is unique \u2014 world-leading research meets a distinct regulatory and cultural landscape.", why_text)

    # Trust indicator blocks
    page = page.replace("Bilingual by Law (EN/FR)", trust1_t)
    page = page.replace("Canada is officially bilingual and Quebec's Law 25 and Charter of the French Language require French-language interfaces and French support for AI tools used in Quebec. We flag every tool for EN/FR readiness.", trust1_d)
    page = page.replace("PIPEDA, AIDA & Law 25", trust2_t)
    page = page.replace("Canada's privacy landscape includes federal PIPEDA, Quebec's Law 25 (Bill 64), and the proposed AIDA. We verify every tool's data residency options within Canada, and alignment with OPC guidelines.", trust2_d)
    page = page.replace("Vector Institute & CIFAR Ecosystem", trust3_t)
    page = page.replace("Canada's $125M+ Pan-Canadian AI Strategy (CIFAR, Vector, Mila, Amii) funds foundational AI research, talent development, and commercialization. We highlight tools aligned with Canada's innovation priorities.", trust3_d)

    # Section headings for category links
    old_sec = 'Best AI {section.name.replace(\'Writing & Content\', \'Writing Tools\').replace(\'Code & Development\', \'Coding Tools\').replace(\'SEO\', \'Marketing Tools\')} for Canada</h2>'
    new_sec = ('Best AI {section.name.replace(\'Writing & Content\', \'Writing Tools\').replace(\'Code & Development\', \'Coding Tools\').replace(\'SEO\', \'Marketing Tools\')} '
               'for ' + name + '</h2>')
    page = page.replace(old_sec, new_sec)

    # Ecosystem heading + sub
    page = page.replace("Canada's AI Ecosystem Is a Global Research Powerhouse", eco_heading)
    page = page.replace("From Toronto's Vector Institute to Montreal's Mila, Canada produces foundational AI research\n              and produces top-tier AI talent. These four pillars power", eco_sub)

    # Ecosystem blocks
    page = page.replace("Toronto \u2014 Vector Institute & AI Hub", eco1_t)
    page = page.replace("Toronto is one of the world\u2019s top AI research cities. The Vector Institute, University of Toronto\u2019s Schwartz Reisman Innovation Centre, and the MaRS Discovery District form the core of Canada\u2019s AI engine.", eco1_d)

    page = page.replace("Pan-Canadian AI Strategy & CIFAR", eco2_t)
    page = page.replace("Canada\u2019s $125M+ Pan-Canadian AI Strategy, coordinated by CIFAR, funds the country\u2019s three national AI institutes. It\u2019s the backbone of Canada\u2019s AI research and talent pipeline.", eco2_d)

    page = page.replace("Montreal \u2014 Mila & Deep Learning Hub", eco3_t)
    page = page.replace("Montreal\u2019s Mila (Quebec AI Institute), founded by Yoshua Bengio, is one of the world\u2019s largest deep learning research labs. Montreal also has a thriving AI startup scene.", eco3_d)

    page = page.replace("Vancouver & Toronto \u2014 AI Commercialization", eco4_t)
    page = page.replace("Vancouver (Amii, Microsoft Research) and Toronto (Creative Destruction Lab, CDL) offer strong commercialization ecosystems. Combined with active angel/VC networks, Canada offers one of the best environments for AI startups globally.", eco4_d)

    # CTA section
    page = page.replace('actually work for Canada</strong>. \n              We rank every tool on PIPEDA compliance, CAD pricing, bilingual (EN/FR) support,',
                        'actually work for ' + name + '</strong>. \n              ' + cta_line)

    # Canada AI tools keyword label
    page = page.replace('Canada AI tools:', name + ' AI tools:')

    # Keywords line
    page = page.replace('best AI tools in Canada 2026 \u00b7 AI tools for Canadian businesses \u00b7 Canada AI software \u00b7 '
                        'AI writing tools Canada \u00b7 AI coding tools Canada \u00b7 AI marketing Canada \u00b7 '
                        'Canada AI directory \u00b7 AI tools for Canadian startups \u00b7 enterprise AI tools Canada \u00b7 '
                        'free AI tools Canada \u00b7 AI productivity Canada \u00b7 Canadian tech stack \u00b7',
                        keywords)

    # BlogCategoryLinks heading
    page = page.replace('Canada-Focused AI Guides', guide_heading)

    return page
