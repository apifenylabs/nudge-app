#!/usr/bin/env python3
"""Generate geo landing pages from Canada template using block-level string replacement.

All search strings are extracted from the Canada template at import time so they
always match — even when the template content is updated.
"""
import os

APP = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'app')

# Read the Canada template once
with open(os.path.join(APP, 'ai-tools-canada', 'page.tsx')) as f:
    _CANADA = f.read()


# ── Helper: extract a string substring between two markers ──────────────
def _extract(text, start_marker, end_marker, label='', inclusive=True):
    """Extract text from `text` starting at start_marker up to end_marker.
    
    If inclusive=True (default), includes start_marker in the result.
    """
    start = text.find(start_marker)
    if start < 0:
        raise ValueError(f"Cannot find start_marker for '{label}': {start_marker!r}")
    if inclusive:
        content_start = start
    else:
        content_start = start + len(start_marker)
    end = text.find(end_marker, content_start + 1)
    if end < 0:
        raise ValueError(f"Cannot find end_marker for '{label}': {end_marker!r}")
    return text[content_start:end]


def _extract_faq(text, n):
    """Extract the nth FAQ entry (1-indexed) from the Canada template."""
    marker = 'faqs={['
    start = text.find(marker) + len(marker)
    brace_count = 0
    found = 0
    entry_start = None
    i = start
    while i < len(text):
        if text[i] == '{':
            brace_count += 1
            if brace_count == 1 and entry_start is None:
                entry_start = i
        elif text[i] == '}':
            brace_count -= 1
            if brace_count == 0 and entry_start is not None:
                found += 1
                if found == n:
                    end = text.find('},', i) + 2
                    return text[entry_start:end]
                entry_start = None
        i += 1
    raise ValueError(f"FAQ{n} not found")


def _extract_desc(text, title_marker):
    """Extract the full `description: '...'` string following a given title marker (inclusive)."""
    t = text.find(title_marker)
    if t < 0:
        raise ValueError(f"Cannot find title marker: {title_marker!r}")
    ds = text.find("description: '", t)
    if ds < 0:
        raise ValueError(f"Cannot find 'description: ' after title: {title_marker!r}")
    # Find the closing quote of the description value
    end_patterns = ["', gradient:", "' },", "' }\n"]
    for pat in end_patterns:
        de = text.find(pat, ds)
        if de >= 0 and de < ds + 500:  # Must be reasonably close
            return text[ds:de + 1]  # Include the closing quote
    raise ValueError(f"Cannot find closing quote after description for: {title_marker!r}")


# ── Extract all search strings from the Canada template ─────────────────
_CANADA_META = _CANADA

_SEARCH = {}

# Titles / headings
_SEARCH['title_og']        = "Best AI Tools in Canada (2026) \u2014 Apifeny AI"
_SEARCH['title_main']      = "Best AI Tools in Canada (2026) \u2014 Curated for Canadian Teams & Startups"
_SEARCH['top_heading']     = "Top AI Tools in Canada"
_SEARCH['why_heading']     = "Why Canada Needs Its Own AI Tool Directory"
_SEARCH['eco_heading']     = "Canada's AI Ecosystem Is a Global Research Powerhouse"
_SEARCH['guide_heading']   = "Canada-Focused AI Guides"
_SEARCH['tools_for_canada'] = "tools for Canada"
_SEARCH['hero_badge']      = "Canada-Focused \u00b7 Updated Daily"
_SEARCH['canada_ai_tools'] = "Canada AI tools:"

# Meta descriptions — extract from the META constant block
_SEARCH['meta_desc'] = _extract(_CANADA,
    "Discover the best AI tools for Canadian",
    "',\n  ogTitle:", 'meta_desc')

_SEARCH['og_desc'] = _extract(_CANADA,
    "Find AI tools built for Canada:",
    "',\n  ogImage:", 'og_desc')

# Market string (in GeoSeoSchema) — full content between marketSize={" and "}
# Market string (in GeoSeoSchema) — content between marketSize={" and "}
# Search includes everything up to (but not including) the closing "}
_market_start = _CANADA.find("$2.2T economy,")
_market_end = _CANADA.find('rapidly growing VC scene', _market_start) + len('rapidly growing VC scene')
_SEARCH['market'] = _CANADA[_market_start:_market_end]

# Why section text
_SEARCH['why_text']  = _extract(_CANADA,
    "Canada's AI ecosystem is unique",
    "regulatory and cultural landscape.", 'why_text')

_SEARCH['hero_text']  = "actually work for Canada"
_SEARCH['unique_market'] = "for Canada's unique market"
_SEARCH['market_ready']  = "Canada-market readiness"
_SEARCH['cta_line'] = _extract(_CANADA,
    "actually work for Canada</strong>. \n              We rank every tool on PIPEDA compliance,",
    "Canada's unique market.", 'cta_line')

# Geo props
_SEARCH['country_name']  = 'countryName="Canada"'
_SEARCH['country_code']  = 'countryCode="ca"'
_SEARCH['capital']       = 'capital="Ottawa"'
_SEARCH['currency']      = 'currency="CAD"'
_SEARCH['language']      = 'language="English / French"'
_SEARCH['lang_code']     = 'languageCode="en"'
_SEARCH['breadcrumb']    = "'AI Tools Canada'"

# Hero badge items
_SEARCH['hero_lang']    = 'English / Fran\u00e7ais'
_SEARCH['hero_price']   = 'CAD Pricing'
_SEARCH['hero_comply']  = 'PIPEDA & Law 25'
_SEARCH['hero_ready']   = 'AI Research-Ready'

# Gradients & CSS
_SEARCH['hero_grad']    = 'from-red-400 via-white to-red-300'
_SEARCH['badge_bg']     = 'bg-red-500/10'
_SEARCH['badge_border'] = 'border-red-500/20'
_SEARCH['badge_text_cls'] = 'text-red-300'  # CSS class for badge text color
_SEARCH['rank_col']     = 'from-red-400 to-white'
# section_col was per-item gradient in old template; now each trust block has its own, skip it
_SEARCH['trust_col']    = 'text-red-400'

# Stats filter
_SEARCH['stats_filter']     = 'CA-Ready Filters'
_SEARCH['stats_filter_solo'] = 'CA-Ready'

# FAQ blocks
_SEARCH['faq1'] = _extract_faq(_CANADA, 1)
_SEARCH['faq2'] = _extract_faq(_CANADA, 2)
_SEARCH['faq3'] = _extract_faq(_CANADA, 3)
_SEARCH['faq4'] = _extract_faq(_CANADA, 4)
_SEARCH['faq5'] = _extract_faq(_CANADA, 5)

# Trust indicator blocks (titles + descriptions)
_SEARCH['trust1_t'] = "Bilingual by Law (EN/FR)"
_SEARCH['trust2_t'] = "PIPEDA, AIDA & Law 25"
_SEARCH['trust3_t'] = "Vector Institute & CIFAR Ecosystem"

_SEARCH['trust1_d'] = _extract_desc(_CANADA, _SEARCH['trust1_t'])
_SEARCH['trust2_d'] = _extract_desc(_CANADA, _SEARCH['trust2_t'])
_SEARCH['trust3_d'] = _extract_desc(_CANADA, _SEARCH['trust3_t'])

# Ecosystem blocks (titles + descriptions)
_SEARCH['eco1_t'] = "\U0001f1e8\U0001f1e6 Toronto \u2014 Vector Institute & AI Hub"
_SEARCH['eco2_t'] = "\U0001f393 Montreal \u2014 Mila & Deep Learning"
_SEARCH['eco3_t'] = "\U0001f3e2 Vancouver & Waterloo \u2014 Tech & Autonomy"
_SEARCH['eco4_t'] = "\U0001f52c Pan-Canadian AI Strategy & CIFAR"

_SEARCH['eco1_d'] = _extract_desc(_CANADA, _SEARCH['eco1_t'].replace('\u2014', '—'))
_SEARCH['eco2_d'] = _extract_desc(_CANADA, _SEARCH['eco2_t'])
_SEARCH['eco3_d'] = _extract_desc(_CANADA, _SEARCH['eco3_t'])
_SEARCH['eco4_d'] = _extract_desc(_CANADA, _SEARCH['eco4_t'])

# Ecosystem sub
_SEARCH['eco_sub'] = _extract(_CANADA,
    "From Toronto", "to responsible AI.", 'eco_sub')

# Section heading template
_sec_full = "Best AI {section.name.replace('Writing & Content', 'Writing Tools').replace('Code & Development', 'Coding Tools').replace('Design & Creative', 'Design Tools').replace('Marketing & SEO', 'Marketing Tools')} for Canada</h2>"
_SEARCH['section_heading'] = _sec_full

# Keywords line
_SEARCH['keywords'] = _extract(_CANADA,
    "best AI tools in Canada 2026",
    "Canadian tech stack \u00b7", 'keywords')

# Badge text
# badge_text_already defined as 'text-red-300' CSS class at the top
_SEARCH['hero_badge_str'] = "Canada-Focused \u00b7 Updated Daily"

# Slugs
_SEARCH['slug']   = 'ai-tools-canada'
_SEARCH['comp']   = 'AIToolsCanadaPage'

# ── H1 heading Canada string (inside <span>) ──
_h1_span_start = _CANADA.find('text-transparent">', _CANADA.find('Best AI Tools for'))
_h1_content_start = _h1_span_start + len('text-transparent">')
_h1_span_end = _CANADA.find('</span>', _h1_content_start)
_SEARCH['h1_canada'] = _CANADA[_h1_content_start:_h1_span_end]

# ── Verify all extracted ────────────────────────────────────────────────
for k, v in _SEARCH.items():
    if v is None or (isinstance(v, str) and v not in _CANADA and k not in ('none',)):
        print(f"⚠️  Search string '{k}' NOT FOUND in template")

# Also export for direct use


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
    page = _CANADA

    # ── URL slugs and component names (always first) ──
    page = page.replace(_SEARCH['slug'], 'ai-tools-' + slug)
    page = page.replace(_SEARCH['comp'], 'AITools' + name.replace(' ', '') + 'Page')

    # ── Meta ──
    page = page.replace(_SEARCH['title_main'], title)
    page = page.replace(_SEARCH['title_og'],
                        "Best AI Tools in " + name + " (2026) \u2014 Apifeny AI")
    page = page.replace(_SEARCH['meta_desc'], meta_desc.replace("'", "\\'"))
    page = page.replace(_SEARCH['og_desc'], og_desc.replace("'", "\\'"))

    # ── GeoSeoSchema props ──
    page = page.replace(_SEARCH['country_name'], 'countryName="' + name + '"')
    page = page.replace(_SEARCH['country_code'], 'countryCode="' + code + '"')
    page = page.replace(_SEARCH['capital'], 'capital="' + capital + '"')
    page = page.replace(_SEARCH['currency'], 'currency="' + currency + '"')
    page = page.replace(_SEARCH['language'], 'language="' + lang + '"')
    page = page.replace(_SEARCH['lang_code'], 'languageCode="' + langCode + '"')
    page = page.replace(_SEARCH['market'], market)
    page = page.replace(_SEARCH['breadcrumb'], "'AI Tools " + name + "'")

    # ── Visual gradients and class names ──
    page = page.replace(_SEARCH['hero_grad'], grad1 + ' ' + grad2 + ' ' + grad3)
    page = page.replace(_SEARCH['badge_bg'], badge_bg)
    page = page.replace(_SEARCH['badge_border'], badge_border)
    page = page.replace(_SEARCH['badge_text_cls'], badge_text)
    page = page.replace(_SEARCH['rank_col'], rank_col)
    page = page.replace(_SEARCH['trust_col'], 'text-' + trust_col + '-400')

    # ── Hero subtitle badge ──
    page = page.replace(_SEARCH['hero_lang'], hero_lang)
    page = page.replace(_SEARCH['hero_price'], hero_price)
    page = page.replace(_SEARCH['hero_comply'], hero_comply)
    page = page.replace(_SEARCH['hero_ready'], hero_ready)

    # ── Stats filter ──
    page = page.replace(_SEARCH['stats_filter'], stats_filter + ' Filters')
    page = page.replace(_SEARCH['stats_filter_solo'], stats_filter)

    # ── FAQ blocks ──
    page = page.replace(_SEARCH['faq1'],
        '{ question: "' + faq1_q + '", answer: "' + faq1_a + '" },')
    page = page.replace(_SEARCH['faq2'],
        '{ question: "' + faq2_q + '", answer: "' + faq2_a + '" },')
    page = page.replace(_SEARCH['faq3'],
        '{ question: "' + faq3_q + '", answer: "' + faq3_a + '" },')
    page = page.replace(_SEARCH['faq4'],
        '{ question: "' + faq4_q + '", answer: "' + faq4_a + '" },')
    page = page.replace(_SEARCH['faq5'],
        '{ question: "' + faq5_q + '", answer: "' + faq5_a + '" },')

    # ── Hero badge ──
    page = page.replace(_SEARCH['hero_badge_str'], name + '-Focused \u00b7 Updated Daily')

    # ── CTA section (MUST be before Canada→name replaces to keep search string intact) ──
    page = page.replace(_SEARCH['cta_line'],
                        'actually work for ' + name + '</strong>. \n              ' + cta_line)

    # ── Hero text mentions ──
    page = page.replace(_SEARCH['hero_text'], 'actually work for ' + name)
    page = page.replace(_SEARCH['unique_market'], "for " + name + "'s unique market")
    # H1 heading: the Canada text inside the <span> (with whitespace)
    page = page.replace(_SEARCH['h1_canada'], '\n                ' + name + '\n              ')

    # ── Top Tools ──
    page = page.replace(_SEARCH['top_heading'], 'Top AI Tools in ' + name)
    page = page.replace(_SEARCH['market_ready'], name + '-market readiness')
    page = page.replace("Top picks for Canadian teams \u2014 rated for PIPEDA compliance, CAD pricing, and bilingual support.", top_sub)

    # ── Why section ──
    page = page.replace(_SEARCH['why_heading'], why_heading)
    page = page.replace(_SEARCH['why_text'], why_text)

    # ── Trust indicator blocks ──
    page = page.replace(_SEARCH['trust1_t'], trust1_t)
    page = page.replace(_SEARCH['trust2_t'], trust2_t)
    page = page.replace(_SEARCH['trust3_t'], trust3_t)
    page = page.replace(_SEARCH['trust1_d'], "description: '" + trust1_d.replace("'", "\\'") + "'")
    page = page.replace(_SEARCH['trust2_d'], "description: '" + trust2_d.replace("'", "\\'") + "'")
    page = page.replace(_SEARCH['trust3_d'], "description: '" + trust3_d.replace("'", "\\'") + "'")

    # ── Section headings for category links ──
    page = page.replace(_SEARCH['section_heading'],
                        "Best AI {section.name.replace('Writing & Content', 'Writing Tools').replace('Code & Development', 'Coding Tools')"
                        ".replace('Marketing & SEO', 'Marketing Tools')} for " + name + "</h2>")

    # ── Tools link text ──
    page = page.replace(_SEARCH['tools_for_canada'], 'tools for ' + name)

    # ── Ecosystem ──
    page = page.replace(_SEARCH['eco_heading'], eco_heading)
    page = page.replace(_SEARCH['eco_sub'], eco_sub)

    page = page.replace(_SEARCH['eco1_t'], eco1_t)
    page = page.replace(_SEARCH['eco1_d'], "description: '" + eco1_d.replace("'", "\\'") + "'")
    page = page.replace(_SEARCH['eco2_t'], eco2_t)
    page = page.replace(_SEARCH['eco2_d'], "description: '" + eco2_d.replace("'", "\\'") + "'")
    page = page.replace(_SEARCH['eco3_t'], eco3_t)
    page = page.replace(_SEARCH['eco3_d'], "description: '" + eco3_d.replace("'", "\\'") + "'")
    page = page.replace(_SEARCH['eco4_t'], eco4_t)
    page = page.replace(_SEARCH['eco4_d'], "description: '" + eco4_d.replace("'", "\\'") + "'")

    # (CTA moved above hero_text section to preserve search string)

    # ── Keywords ──
    page = page.replace(_SEARCH['canada_ai_tools'], name + ' AI tools:')
    page = page.replace(_SEARCH['keywords'], keywords)

    # ── Guide heading ──
    page = page.replace(_SEARCH['guide_heading'], guide_heading)

    return page
