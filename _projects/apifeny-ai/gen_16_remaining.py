#!/usr/bin/env python3
"""
Generate the remaining 16 geo pages for apifeny-ai.
Extends the gen_everything.py pattern with hardcoded country data
rather than relying on Ollama for structured JSON output.
"""
import os, re, sys

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
    comp = name.replace("-","").replace(" ","")
    p = p.replace('AIToolsCanadaPage', f'AITools{comp}Page')

    # ─── 2. Title ───
    p = p.replace(
        "Best AI Tools in Canada (2026) — Curated for Canadian Teams & Startups",
        title
    )

    # ─── 3. Meta description ───
    p = replace_meta_block(p, 'description',
        f"description:\n    '{meta_desc.replace(chr(39), chr(92)+chr(39))}'")

    # ─── 4. OG title ───
    p = p.replace("Best AI Tools in Canada (2026) — Apifeny AI",
                  f"Best AI Tools in {name} (2026) — Apifeny AI")

    # ─── 5. OG description ───
    p = replace_meta_block(p, 'ogDescription',
        f"ogDescription:\n    '{og_desc.replace(chr(39), chr(92)+chr(39))}'")

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

    # ─── 14. Hero CTA ───
    cta_old_start = 'We rank every tool on PIPEDA compliance, CAD pricing, bilingual (EN/FR) support,'
    cta_old_end = "for Canada's unique market."
    if cta_old_start in p and cta_old_end in p:
        s = p.find(cta_old_start)
        e = p.find(cta_old_end, s) + len(cta_old_end)
        old_cta_block = p[s:e]
        safe_cta = cta_line.replace("'", "\\'")
        new_cta_block = f"{safe_cta}\n              and {name} AI ecosystem readiness \u2014 so you find tools built for {name}'s unique market."
        p = p.replace(old_cta_block, new_cta_block)

    # ─── 15. Top Tools heading ───
    p = p.replace('Top AI Tools in Canada', top_h)

    # ─── 16. Canada-market readiness ───
    p = p.replace('Canada-market readiness', f'{name}-market readiness')

    # ─── 17. Category links ───
    p = p.replace("for Canada</h2>", f"for {name}</h2>")

    # ─── 18. Why section ───
    p = p.replace('Why Canada Needs Its Own AI Tool Directory', why_h)
    p = p.replace(
        "Canada's AI ecosystem is unique \u2014 world-leading research meets a distinct regulatory and cultural landscape.",
        why_text
    )

    # ─── 19. Trust indicator blocks ───
    p = replace_trust_block(p, 'Bilingual by Law (EN/FR)', t1_t, t1_d)
    p = replace_trust_block(p, 'PIPEDA, AIDA & Law 25', t2_t, t2_d)
    p = replace_trust_block(p, 'Vector Institute & CIFAR Ecosystem', t3_t, t3_d)

    # ─── 20. Top picks subtitle ───
    old = "Top picks for Canadian teams \u2014 rated for PIPEDA compliance, CAD pricing, and bilingual support."
    p = p.replace(old, top_sub)

    # ─── 21. Playbooks ───
    p = p.replace('built for Canadian teams and startups',
                  f'built for {name.lower()} teams and startups')

    # ─── 22. Ecosystem heading + sub ───
    p = p.replace(
        "Canada's AI Ecosystem Is a Global Research Powerhouse", eco_h)
    eco_sub_old = (
        "From Toronto's Vector Institute to Montreal's Mila, Canada produces foundational AI research\n"
        "              that powers the world's most advanced systems \u2014 with a distinctly Canadian approach to responsible AI."
    )
    p = p.replace(eco_sub_old, eco_sub)

    # ─── 23. Ecosystem blocks ───
    p = replace_eco_block(p, "Toronto \u2014 Vector Institute & AI Hub", e1t, e1d)
    p = replace_eco_block(p, "Montreal \u2014 Mila & Deep Learning", e2t, e2d)
    p = replace_eco_block(p, "Vancouver & Waterloo \u2014 Tech & Autonomy", e3t, e3d)
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
        "Start exploring \u2014 no account needed."
    )
    cta_new = (
        f"No more guessing if a tool works for {name}'s market, or respects local data laws. "
        f"Every tool on Apifeny AI is rated for {name} data compliance, local pricing, and relevance. "
        "Start exploring \u2014 no account needed."
    )
    p = p.replace(cta_old, cta_new)

    # ─── 26. Keywords ───
    kw_old = (
        'best AI tools in Canada 2026 \u00b7 AI tools for Canadian businesses \u00b7 Canada AI software \u00b7 '
        'AI writing tools Canada \u00b7 AI coding tools Canada \u00b7 AI marketing Canada \u00b7 '
        'Canada AI directory \u00b7 AI tools for Canadian startups \u00b7 enterprise AI tools Canada \u00b7 '
        'free AI tools Canada \u00b7 AI productivity Canada \u00b7 Canadian tech stack \u00b7 '
        'AI tools Toronto \u00b7 AI tools Montreal \u00b7 AI tools Vancouver'
    )
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
        print(f'  \u2717 {slug}: REMAINING CANADA REFERENCES: {sum(remaining.values())}: {remaining}')
    else:
        print(f'  \u2713 {slug}: ALL CLEAN')

# ====== HELPERS ======

def replace_meta_block(text, key, replacement):
    pattern = re.compile(rf"(?:{key}:)(?:\s*\n\s+)'(?:[^'\\]|\\.)*'")
    match = pattern.search(text)
    if match:
        return text.replace(match.group(0), replacement, 1)
    # Fallback: search manually
    idx = text.find(f"{key}:")
    if idx >= 0:
        start = text.find("'", idx)
        end = text.find("'", start + 1)
        if end > start:
            before = text[:start]
            after = text[end+1:]
            # Find if there's a comma after meta value
            if after.startswith(','):
                return before + replacement[replacement.find("'") : replacement.rfind("'")+1] + after
            return before + replacement[replacement.find("'") : replacement.rfind("'")+1] + after
    return text


def replace_trust_block(text, old_title, new_title, new_desc):
    text = text.replace(old_title, new_title, 1)
    idx = text.find(new_title)
    if idx < 0:
        return text
    desc_start = text.find("description: '", idx)
    if desc_start < 0:
        return text
    desc_end = text.find("', gradient: '", desc_start)
    if desc_end < 0:
        return text
    old_desc_full = text[desc_start:desc_end]
    new_desc_full = f"description: '{new_desc.replace(chr(39), chr(92)+chr(39))}"
    return text.replace(old_desc_full, new_desc_full, 1)


def replace_eco_block(text, old_title, new_title, new_desc):
    text = text.replace(old_title, new_title, 1)
    idx = text.find(new_title)
    if idx < 0:
        return text
    desc_prefix = "description: '"
    desc_start = text.find(desc_prefix, idx)
    if desc_start < 0:
        return text
    desc_end = text.find("' }", desc_start)
    if desc_end < 0:
        desc_end = text.find("'", desc_start + len(desc_prefix) + 1)
        if desc_end < 0:
            return text
        desc_end += 1
    else:
        desc_end += 2
    old_desc_full = text[desc_start:desc_end]
    new_desc_full = f"description: '{new_desc.replace(chr(39), chr(92)+chr(39))}'"
    return text.replace(old_desc_full, new_desc_full, 1)


def replace_faq_block(text, index, new_q, new_a):
    faq_pattern = re.compile(r'\{\s*question:\s*"([^"]*)",\s*answer:\s*"((?:[^"\\]|\\.)*)"\s*\}')
    matches = list(faq_pattern.finditer(text))
    if index >= len(matches):
        return text
    m = matches[index]
    old_faq = m.group(0)
    safe_q = new_q.replace('"', '\\"')
    safe_a = new_a.replace('"', '\\"')
    new_faq = f'{{ question: "{safe_q}", answer: "{safe_a}" }}'
    return text.replace(old_faq, new_faq, 1)


# ====== COUNTRY DATA ======

COUNTRIES = [
    {
        'slug': 'denmark', 'name': 'Denmark', 'code': 'dk', 'capital': 'Copenhagen', 'currency': 'DKK', 'lang': 'Danish / English', 'langCode': 'da',
        'g1': 'from-blue-400', 'g2': 'via-white', 'g3': 'to-blue-300', 'bg': 'bg-blue-500/10', 'bd': 'border-blue-500/20', 'bt': 'text-blue-300', 'rc': 'from-blue-400 to-white', 'sc': 'from-blue-500/20 to-cyan-900/10', 'tc': 'blue',
        'hl': 'Danish / English', 'hp': 'DKK Pricing', 'hc': 'GDPR Ready', 'hr': 'Nordic Digital Leader', 'sf': 'DK-Ready',
    },
    {
        'slug': 'finland', 'name': 'Finland', 'code': 'fi', 'capital': 'Helsinki', 'currency': 'EUR', 'lang': 'Finnish / Swedish / English', 'langCode': 'fi',
        'g1': 'from-cyan-400', 'g2': 'via-white', 'g3': 'to-cyan-300', 'bg': 'bg-cyan-500/10', 'bd': 'border-cyan-500/20', 'bt': 'text-cyan-300', 'rc': 'from-cyan-400 to-white', 'sc': 'from-cyan-500/20 to-indigo-900/10', 'tc': 'cyan',
        'hl': 'Suomi / English', 'hp': 'EUR Pricing', 'hc': 'GDPR & Tietosuojalaki', 'hr': 'Nordic Digital Leader', 'sf': 'FI-Ready',
    },
    {
        'slug': 'ireland', 'name': 'Ireland', 'code': 'ie', 'capital': 'Dublin', 'currency': 'EUR', 'lang': 'English / Irish', 'langCode': 'en',
        'g1': 'from-green-400', 'g2': 'via-white', 'g3': 'to-green-300', 'bg': 'bg-green-500/10', 'bd': 'border-green-500/20', 'bt': 'text-green-300', 'rc': 'from-green-400 to-white', 'sc': 'from-green-500/20 to-emerald-900/10', 'tc': 'green',
        'hl': 'English / Gaeilge', 'hp': 'EUR Pricing', 'hc': 'GDPR & DPC', 'hr': 'EU Tech Hub', 'sf': 'IE-Ready',
    },
    {
        'slug': 'israel', 'name': 'Israel', 'code': 'il', 'capital': 'Jerusalem', 'currency': 'ILS', 'lang': 'Hebrew / English', 'langCode': 'he',
        'g1': 'from-sky-400', 'g2': 'via-white', 'g3': 'to-sky-300', 'bg': 'bg-sky-500/10', 'bd': 'border-sky-500/20', 'bt': 'text-sky-300', 'rc': 'from-sky-400 to-white', 'sc': 'from-sky-500/20 to-indigo-900/10', 'tc': 'sky',
        'hl': 'עברית / English', 'hp': 'ILS/USD Pricing', 'hc': 'Privacy Protection Law', 'hr': 'Startup Nation Ready', 'sf': 'IL-Ready',
    },
    {
        'slug': 'italy', 'name': 'Italy', 'code': 'it', 'capital': 'Rome', 'currency': 'EUR', 'lang': 'Italian / English', 'langCode': 'it',
        'g1': 'from-emerald-400', 'g2': 'via-white', 'g3': 'to-emerald-300', 'bg': 'bg-emerald-500/10', 'bd': 'border-emerald-500/20', 'bt': 'text-emerald-300', 'rc': 'from-emerald-400 to-white', 'sc': 'from-emerald-500/20 to-teal-900/10', 'tc': 'emerald',
        'hl': 'Italiano / English', 'hp': 'EUR Pricing', 'hc': 'GDPR & Garante Privacy', 'hr': 'European Innovation Hub', 'sf': 'IT-Ready',
    },
    {
        'slug': 'mexico', 'name': 'Mexico', 'code': 'mx', 'capital': 'Mexico City', 'currency': 'MXN', 'lang': 'Spanish / English', 'langCode': 'es',
        'g1': 'from-red-400', 'g2': 'via-white', 'g3': 'to-red-300', 'bg': 'bg-red-500/10', 'bd': 'border-red-500/20', 'bt': 'text-red-300', 'rc': 'from-red-400 to-white', 'sc': 'from-red-500/20 to-rose-900/10', 'tc': 'red',
        'hl': 'Español / English', 'hp': 'MXN/USD Pricing', 'hc': 'LFPDPPP Compliance', 'hr': 'LatAm Tech Leader', 'sf': 'MX-Ready',
    },
    {
        'slug': 'netherlands', 'name': 'Netherlands', 'code': 'nl', 'capital': 'Amsterdam', 'currency': 'EUR', 'lang': 'Dutch / English', 'langCode': 'nl',
        'g1': 'from-amber-400', 'g2': 'via-white', 'g3': 'to-amber-300', 'bg': 'bg-amber-500/10', 'bd': 'border-amber-500/20', 'bt': 'text-amber-300', 'rc': 'from-amber-400 to-white', 'sc': 'from-amber-500/20 to-yellow-900/10', 'tc': 'amber',
        'hl': 'Nederlands / English', 'hp': 'EUR Pricing', 'hc': 'GDPR & AVG', 'hr': 'European Digital Hub', 'sf': 'NL-Ready',
    },
    {
        'slug': 'new-zealand', 'name': 'New Zealand', 'code': 'nz', 'capital': 'Wellington', 'currency': 'NZD', 'lang': 'English / Māori', 'langCode': 'en',
        'g1': 'from-teal-400', 'g2': 'via-white', 'g3': 'to-teal-300', 'bg': 'bg-teal-500/10', 'bd': 'border-teal-500/20', 'bt': 'text-teal-300', 'rc': 'from-teal-400 to-white', 'sc': 'from-teal-500/20 to-emerald-900/10', 'tc': 'teal',
        'hl': 'English / Māori', 'hp': 'NZD Pricing', 'hc': 'Privacy Act 2020', 'hr': 'Pacific Digital Hub', 'sf': 'NZ-Ready',
    },
    {
        'slug': 'norway', 'name': 'Norway', 'code': 'no', 'capital': 'Oslo', 'currency': 'NOK', 'lang': 'Norwegian / English', 'langCode': 'no',
        'g1': 'from-indigo-400', 'g2': 'via-white', 'g3': 'to-indigo-300', 'bg': 'bg-indigo-500/10', 'bd': 'border-indigo-500/20', 'bt': 'text-indigo-300', 'rc': 'from-indigo-400 to-white', 'sc': 'from-indigo-500/20 to-violet-900/10', 'tc': 'indigo',
        'hl': 'Norsk / English', 'hp': 'NOK Pricing', 'hc': 'GDPR & Personvern', 'hr': 'Nordic Digital Hub', 'sf': 'NO-Ready',
    },
    {
        'slug': 'poland', 'name': 'Poland', 'code': 'pl', 'capital': 'Warsaw', 'currency': 'PLN', 'lang': 'Polish / English', 'langCode': 'pl',
        'g1': 'from-purple-400', 'g2': 'via-white', 'g3': 'to-purple-300', 'bg': 'bg-purple-500/10', 'bd': 'border-purple-500/20', 'bt': 'text-purple-300', 'rc': 'from-purple-400 to-white', 'sc': 'from-purple-500/20 to-pink-900/10', 'tc': 'purple',
        'hl': 'Polski / English', 'hp': 'PLN/EUR Pricing', 'hc': 'GDPR & RODO', 'hr': 'Central European Tech Hub', 'sf': 'PL-Ready',
    },
    {
        'slug': 'portugal', 'name': 'Portugal', 'code': 'pt', 'capital': 'Lisbon', 'currency': 'EUR', 'lang': 'Portuguese / English', 'langCode': 'pt',
        'g1': 'from-rose-400', 'g2': 'via-white', 'g3': 'to-rose-300', 'bg': 'bg-rose-500/10', 'bd': 'border-rose-500/20', 'bt': 'text-rose-300', 'rc': 'from-rose-400 to-white', 'sc': 'from-rose-500/20 to-pink-900/10', 'tc': 'rose',
        'hl': 'Português / English', 'hp': 'EUR Pricing', 'hc': 'GDPR & CNPD', 'hr': 'Iberian Digital Leader', 'sf': 'PT-Ready',
    },
    {
        'slug': 'russia', 'name': 'Russia', 'code': 'ru', 'capital': 'Moscow', 'currency': 'RUB', 'lang': 'Russian / English', 'langCode': 'ru',
        'g1': 'from-slate-400', 'g2': 'via-white', 'g3': 'to-slate-300', 'bg': 'bg-slate-500/10', 'bd': 'border-slate-500/20', 'bt': 'text-slate-300', 'rc': 'from-slate-400 to-white', 'sc': 'from-slate-500/20 to-zinc-900/10', 'tc': 'slate',
        'hl': 'Русский / English', 'hp': 'RUB/USD Pricing', 'hc': '152-FZ Compliance', 'hr': 'Eurasian Tech Hub', 'sf': 'RU-Ready',
    },
    {
        'slug': 'south-africa', 'name': 'South Africa', 'code': 'za', 'capital': 'Pretoria / Cape Town / Bloemfontein', 'currency': 'ZAR', 'lang': 'English / Afrikaans', 'langCode': 'en',
        'g1': 'from-yellow-400', 'g2': 'via-white', 'g3': 'to-yellow-300', 'bg': 'bg-yellow-500/10', 'bd': 'border-yellow-500/20', 'bt': 'text-yellow-300', 'rc': 'from-yellow-400 to-white', 'sc': 'from-yellow-500/20 to-orange-900/10', 'tc': 'yellow',
        'hl': 'English / Afrikaans', 'hp': 'ZAR Pricing', 'hc': 'POPIA Compliant', 'hr': 'African Digital Leader', 'sf': 'ZA-Ready',
    },
    {
        'slug': 'spain', 'name': 'Spain', 'code': 'es', 'capital': 'Madrid', 'currency': 'EUR', 'lang': 'Spanish / English', 'langCode': 'es',
        'g1': 'from-orange-400', 'g2': 'via-white', 'g3': 'to-orange-300', 'bg': 'bg-orange-500/10', 'bd': 'border-orange-500/20', 'bt': 'text-orange-300', 'rc': 'from-orange-400 to-white', 'sc': 'from-orange-500/20 to-rose-900/10', 'tc': 'orange',
        'hl': 'Español / English', 'hp': 'EUR Pricing', 'hc': 'GDPR & AEPD', 'hr': 'Southern European Tech Hub', 'sf': 'ES-Ready',
    },
    {
        'slug': 'sweden', 'name': 'Sweden', 'code': 'se', 'capital': 'Stockholm', 'currency': 'SEK', 'lang': 'Swedish / English', 'langCode': 'sv',
        'g1': 'from-blue-400', 'g2': 'via-white', 'g3': 'to-blue-300', 'bg': 'bg-blue-500/10', 'bd': 'border-blue-500/20', 'bt': 'text-blue-300', 'rc': 'from-blue-400 to-white', 'sc': 'from-blue-500/20 to-cyan-900/10', 'tc': 'blue',
        'hl': 'Svenska / English', 'hp': 'SEK Pricing', 'hc': 'GDPR & IMY', 'hr': 'Nordic Digital Hub', 'sf': 'SE-Ready',
    },
    {
        'slug': 'switzerland', 'name': 'Switzerland', 'code': 'ch', 'capital': 'Bern', 'currency': 'CHF', 'lang': 'German / French / Italian / English', 'langCode': 'de',
        'g1': 'from-violet-400', 'g2': 'via-white', 'g3': 'to-violet-300', 'bg': 'bg-violet-500/10', 'bd': 'border-violet-500/20', 'bt': 'text-violet-300', 'rc': 'from-violet-400 to-white', 'sc': 'from-violet-500/20 to-purple-900/10', 'tc': 'violet',
        'hl': 'Deutsch / Français / Italiano / English', 'hp': 'CHF Pricing', 'hc': 'FADP & revFADP', 'hr': 'European AI Hub', 'sf': 'CH-Ready',
    },
]

def generate_html(slug, name):
    """Generate page.tsx for one country using inline data."""
    c = next((x for x in COUNTRIES if x['slug'] == slug), None)
    if not c:
        print(f'Unknown country: {slug}')
        return False

    # Generate country-specific FAQs, ecosystem, etc. using Ollama's text output
    # For content that varies, we use Ollama in text mode and parse aggressively
    print(f'  Generating content for {name}...')
    
    # Construct the prompt for Ollama — ask for simple pipe-delimited output
    prompt = (
        f'Generate SEO content for an AI tools landing page for {name} ({c["code"].upper()}). '
        f'Respond with EXACTLY these pipe-delimited fields, one per line, no JSON:\n'
        f'TITLE::Best AI tools in {name} (2026) — Curated for {name} Teams & Startups\n'
        f'META::Discover the best AI tools for {name} businesses and founders. Curated directory of 85+ tools ranked by trending score, {c["code"].upper()}-market readiness, and local relevance. Updated daily.\n'
        f'OG::Find AI tools built for {name}: {c["capital"]}, {c["currency"]} pricing, and {c["lang"]} support. 85+ tools, expert ranked.\n'
        f'MARKET::{c["capital"]}-based economy\n'
        f'FAQ1::What are the best AI tools in {name}?::The best AI tools in {name} include ChatGPT for productivity, GitHub Copilot for development, Claude for reasoning, Canva AI for design, and Jasper for marketing. {name} is a growing AI ecosystem with strong tech talent and innovation hubs.\n'
        f'FAQ2::How does {name} data protection law affect AI tool selection?::{name}\'s data protection framework ensures AI tools meet strict privacy standards for handling user data.\n'
        f'FAQ3::What AI tools are best for {name}\'s key industries?::{name}\'s economy benefits from AI across multiple sectors.\n'
        f'FAQ4::How can {name} startups access AI funding and support?::{name} offers various innovation support programmes for AI startups.\n'
        f'FAQ5::What AI regulations exist in {name}?::AI regulation in {name} follows EU frameworks with national implementation.\n'
        f'TRUST1::{name} Digital Ecosystem::{name} has a thriving digital ecosystem with strong tech adoption and innovation.\n'
        f'TRUST2::Data Protection & Privacy::{name}\'s data protection regulations ensure robust privacy safeguards for AI tools.\n'
        f'TRUST3::Local Tech Community::{name} has a growing community of AI researchers, developers, and startups.\n'
        f'ECO1::{c["capital"]} — Innovation Hub::{c["capital"]} is {name}\'s leading tech and innovation hub, home to startups, R&D centers, and a growing AI community.\n'
        f'ECO2::Tech Ecosystem::{name}\'s tech ecosystem spans fintech, healthtech, and enterprise AI, with strong government support.\n'
        f'ECO3::Research & Academia::{name}\'s universities produce world-class AI research and talent.\n'
        f'ECO4::National AI Strategy::{name} has a national strategy for AI development and adoption across industries.\n'
        f'ECO_H::{name}\'s AI Ecosystem\n'
        f'ECO_SUB::From {c["capital"]} to innovation hubs across the country, {name} is building a distinctive approach to AI.\n'
        f'CTA::We rank every tool on {c["hc"]}, {c["hp"]}, and local ecosystem readiness\n'
        f'KW::best AI tools in {name} 2026 · AI tools for {name} businesses · {name} AI software · AI tools {c["capital"]} · AI directory {name}\n'
        f'GUIDE::{name}-Focused AI Guides\n'
        f'WHY_H::Why {name} Needs Its Own AI Tool Directory\n'
        f'WHY_T::{name}\'s AI ecosystem is unique — blending local innovation with global AI trends.\n'
        f'TOP_H::Top AI Tools in {name}\n'
        f'TOP_SUB::Top picks for {name} teams — rated for {c["hc"]}, {c["hp"]}, and local relevance.\n\n'
        f'For each field starting with FAQ, TRUST, or ECO, write 1-2 actual sentences with realistic {name}-specific details about AI ecosystem, companies, institutions, and use cases. Make every field unique and country-specific. Use proper English.'
    )

    import subprocess
    try:
        result = subprocess.run(
            ['ollama', 'run', 'llama3.2'],
            input=prompt,
            capture_output=True,
            text=True,
            timeout=120
        )
    except subprocess.TimeoutExpired:
        print(f'  \u2717 Ollama timeout for {slug}')
        return False

    # Parse the pipe-delimited output
    lines = result.stdout.strip().split('\n')
    data = {}
    for line in lines:
        line = line.strip()
        if '::' in line:
            key, _, val = line.partition('::')
            key = key.strip()
            val = val.strip()
            # Handle multiline values