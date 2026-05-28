#!/usr/bin/env python3
"""
Generate 16 missing country AI tools pages using the Canada template.
Each country data is generated via Ollama API (not subprocess).
"""
import os, re, json, sys, requests

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
    comp = name.replace("-","").replace(" ","")
    p = p.replace('ai-tools-canada', f'ai-tools-{slug}')
    p = p.replace('AIToolsCanadaPage', f'AITools{comp}Page')
    p = p.replace("Best AI Tools in Canada (2026) \u2014 Curated for Canadian Teams & Startups", title)
    p = replace_meta(p, 'description', meta_desc)
    p = p.replace("Best AI Tools in Canada (2026) \u2014 Apifeny AI", f"Best AI Tools in {name} (2026) \u2014 Apifeny AI")
    p = replace_meta(p, 'ogDescription', og_desc)
    p = p.replace('countryName="Canada"', f'countryName="{name}"')
    p = p.replace('countryCode="ca"', f'countryCode="{code}"')
    p = p.replace('capital="Ottawa"', f'capital="{capital}"')
    p = p.replace('currency="CAD"', f'currency="{currency}"')
    p = p.replace('language="English / French"', f'language="{lang}"')
    p = p.replace('languageCode="en"', f'languageCode="{langCode}"')
    market_old = ('$2.2T economy, 40M population, world-leading AI research ecosystem '
                  '(Vector Institute, CIFAR, MILA), G7 member with strong tech immigration '
                  'pipelines, rapidly growing VC scene')
    p = p.replace(market_old, market_desc)
    p = p.replace("'AI Tools Canada'", f"'AI Tools {name}'")
    p = p.replace('from-red-400 via-white to-red-300', f'{g1} {g2} {g3}')
    p = p.replace('bg-red-500/10', bg)
    p = p.replace('border-red-500/20', bd)
    p = p.replace('text-red-300', bt)
    p = p.replace('from-red-400 to-white', rc)
    p = p.replace('from-red-500/20 to-rose-900/10', sc)
    p = p.replace('text-red-400', f'text-{tc}-400')
    p = p.replace('English / Fran\u00e7ais', hl)
    p = p.replace('CAD Pricing', hp)
    p = p.replace('PIPEDA & Law 25', hc)
    p = p.replace('AI Research-Ready', hr)
    p = p.replace('CA-Ready Filters', f'{sf} Filters')
    p = p.replace('CA-Ready', sf)
    p = p.replace('Canada-Focused \u00b7 Updated Daily', f'{name}-Focused \u00b7 Updated Daily')
    p = p.replace('actually work for Canada', f'actually work for {name}')
    cta_old_start = 'We rank every tool on PIPEDA compliance, CAD pricing, bilingual (EN/FR) support,'
    cta_old_end = "for Canada's unique market."
    if cta_old_start in p:
        s = p.find(cta_old_start)
        e = p.find(cta_old_end, s) + len(cta_old_end)
        safe_cta = cta_line.replace("'", "\\'")
        p = p[:s] + f"{safe_cta}\n              and {name} AI ecosystem readiness \u2014 so you find tools built for {name}'s unique market." + p[e:]
    p = p.replace('Top AI Tools in Canada', top_h)
    p = p.replace('Canada-market readiness', f'{name}-market readiness')
    p = p.replace("for Canada</h2>", f"for {name}</h2>")
    p = p.replace('Why Canada Needs Its Own AI Tool Directory', why_h)
    p = p.replace("Canada's AI ecosystem is unique \u2014 world-leading research meets a distinct regulatory and cultural landscape.", why_text)
    p = replace_trust(p, 'Bilingual by Law (EN/FR)', t1_t, t1_d)
    p = replace_trust(p, 'PIPEDA, AIDA & Law 25', t2_t, t2_d)
    p = replace_trust(p, 'Vector Institute & CIFAR Ecosystem', t3_t, t3_d)
    old_sub = "Top picks for Canadian teams \u2014 rated for PIPEDA compliance, CAD pricing, and bilingual support."
    p = p.replace(old_sub, top_sub)
    p = p.replace('built for Canadian teams and startups', f'built for {name.lower()} teams and startups')
    p = p.replace("Canada's AI Ecosystem Is a Global Research Powerhouse", eco_h)
    eco_sub_old = ("From Toronto's Vector Institute to Montreal's Mila, Canada produces foundational AI research\n"
                   "              that powers the world's most advanced systems \u2014 with a distinctly Canadian approach to responsible AI.")
    p = p.replace(eco_sub_old, eco_sub)
    p = replace_eco(p, "Toronto \u2014 Vector Institute & AI Hub", e1t, e1d)
    p = replace_eco(p, "Montreal \u2014 Mila & Deep Learning", e2t, e2d)
    p = replace_eco(p, "Vancouver & Waterloo \u2014 Tech & Autonomy", e3t, e3d)
    p = replace_eco(p, "\U0001f52c Pan-Canadian AI Strategy & CIFAR", e4t, e4d)
    p = replace_faq(p, 0, faq1_q, faq1_a)
    p = replace_faq(p, 1, faq2_q, faq2_a)
    p = replace_faq(p, 2, faq3_q, faq3_a)
    p = replace_faq(p, 3, faq4_q, faq4_a)
    p = replace_faq(p, 4, faq5_q, faq5_a)
    p = p.replace('Find the Right AI Tool for Your Canadian Business', f'Find the Right AI Tool for Your {name} Business')
    p = p.replace('Built for Canadian Founders, Researchers & Enterprises', f'Built for {name} Founders, Teams & Innovators')
    cta_old = ("No more guessing if a tool complies with PIPEDA, supports French, or works for Canadian teams. "
               "Every tool on Apifeny AI is rated for Canadian data compliance, CAD pricing, and bilingual readiness. "
               "Start exploring \u2014 no account needed.")
    cta_new = (f"No more guessing if a tool works for {name}'s market, or respects local data laws. "
               f"Every tool on Apifeny AI is rated for {name} data compliance, local pricing, and relevance. "
               "Start exploring \u2014 no account needed.")
    p = p.replace(cta_old, cta_new)
    kw_old = ('best AI tools in Canada 2026 \u00b7 AI tools for Canadian businesses \u00b7 Canada AI software \u00b7 '
              'AI writing tools Canada \u00b7 AI coding tools Canada \u00b7 AI marketing Canada \u00b7 '
              'Canada AI directory \u00b7 AI tools for Canadian startups \u00b7 enterprise AI tools Canada \u00b7 '
              'free AI tools Canada \u00b7 AI productivity Canada \u00b7 Canadian tech stack \u00b7 '
              'AI tools Toronto \u00b7 AI tools Montreal \u00b7 AI tools Vancouver')
    p = p.replace(kw_old, kw)
    p = p.replace('Canada AI tools:', f'{name} AI tools:')
    p = p.replace('Canada-Focused AI Guides', guide_heading)

    # Post-processing: replace any remaining bare "Canada" references with {name}
    # This catches gradient spans, category links, keywords that weren't exact-matched
    p = re.sub(r'(?<![a-zA-Z])Canada(?![a-zA-Z])', name, p)
    # Also replace "Canadian" -> "{name}" (in context like "Canadian tech stack")
    p = re.sub(r'(?<![a-zA-Z])Canadian(?![a-zA-Z])', name, p)
    
    outdir = os.path.join(APP, f'ai-tools-{slug}')
    os.makedirs(outdir, exist_ok=True)
    with open(os.path.join(outdir, 'page.tsx'), 'w') as f:
        f.write(p)

    # Verify no Canada references
    terms = ['Canada', 'Canadian']
    remaining = {t: len(re.findall(rf'\b{re.escape(t)}\b', p)) for t in terms}
    remaining = {k: v for k, v in remaining.items() if v > 0}
    if remaining:
        print(f'  \u2717 {slug}: {sum(remaining.values())} Canada refs remain: {remaining}')
    else:
        print(f'  \u2713 {slug}: ALL CLEAN')


def replace_meta(text, key, val):
    """Replace the quoted value after 'key:\n    '"""
    safe_val = (val or '').replace("'", "\\'")
    idx = text.find(f"{key}:")
    if idx < 0:
        return text
    # Find the opening quote on the line after key:
    after_key = text[idx:]
    lines = after_key.split('\n')
    # First line is the 'key:' part, look for quote on subsequent lines
    open_quote_pos = -1
    for li in range(1, len(lines)):
        q = lines[li].find("'")
        if q >= 0:
            # Calculate absolute position
            before_chars = sum(len(lines[l]) + 1 for l in range(li))
            open_quote_pos = idx + before_chars + q
            break
    if open_quote_pos < 0:
        return text
    # Find matching closing quote (not preceded by backslash)
    i = open_quote_pos + 1
    while i < len(text):
        if text[i] == "'" and text[i-1] != '\\':
            # Build replacement
            return text[:open_quote_pos] + "'" + safe_val + "'" + text[i+1:]
        i += 1
    return text


def replace_trust(text, old_title, new_title, new_desc):
    """
    Replace an entire trust card block ({ icon: ..., title: '...', description: '...', gradient: '...' })
    using atomic regex on the original title to avoid cross-contamination.
    """
    import re
    safe_old = re.escape(old_title.strip("'"))
    # Match: { icon: IconName, title: 'OldTitle', description: '...', gradient: '...' }
    pat = re.compile(
        r'(\{\s*icon:\s*\w+,\s*title:\s*\')' + safe_old +
        r"('\s*,\s*description:\s*')((?:[^'\\]|\\.)*)('\s*,\s*gradient:\s*')((?:[^'\\]|\\.)*)'\s*\}"
    )
    m = pat.search(text)
    if not m:
        # Fallback: try old method
        text = text.replace(old_title, new_title, 1)
        idx = text.find(new_title)
        if idx < 0: return text
        ds = text.find("description: '", idx)
        if ds < 0: return text
        de = text.find("', gradient: '", ds)
        if de < 0: return text
        safe_desc = new_desc.replace(chr(39), chr(92)+chr(39))
        return text[:ds] + f"description: '{safe_desc}'" + text[de:]
    # Build replacement with new title and description; keep old gradient
    safe_new_t = new_title.replace("'", "\\'").strip("'")
    safe_new_d = new_desc.replace("'", "\\'")
    return text[:m.start()] + m.group(1) + safe_new_t + m.group(2) + safe_new_d + m.group(4) + m.group(5) + "'" + text[m.end():]


def replace_eco(text, old_title, new_title, new_desc):
    """
    Replace an entire eco card block ({ title: '...', description: '...' })
    using atomic regex on the original title to avoid cross-contamination.
    """
    import re
    safe_old = re.escape(old_title)
    # Match: { title: 'OldTitle', description: '...' }
    pat = re.compile(
        r'(\{\s*title:\s*\')' + safe_old +
        r"('\s*,\s*description:\s*')((?:[^'\\]|\\.)*)('\s*\})"
    )
    m = pat.search(text)
    if not m:
        # Fallback: old method
        text = text.replace(old_title, new_title, 1)
        idx = text.find(new_title)
        if idx < 0: return text
        ds = text.find("description: '", idx)
        if ds < 0: return text
        i = ds + len("description: '")
        while i < len(text):
            if text[i] == "'" and (i == 0 or text[i-1] != '\\'):
                de = i + 1
                break
            i += 1
        else:
            return text
        safe_desc = new_desc.replace(chr(39), chr(92)+chr(39))
        return text[:ds] + f"description: '{safe_desc}'" + text[de:]
    safe_new_t = new_title.replace("'", "\\'")
    safe_new_d = new_desc.replace("'", "\\'")
    return text[:m.start()] + m.group(1) + safe_new_t + m.group(2) + safe_new_d + m.group(3) + text[m.end():]


def replace_faq(text, index, new_q, new_a):
    pattern = re.compile(r'\{\s*question:\s*"([^"]*)",\s*answer:\s*"((?:[^"\\]|\\.)*)"\s*\}')
    matches = list(pattern.finditer(text))
    if index >= len(matches): return text
    m = matches[index]
    safe_q = new_q.replace('"', '\\"')
    safe_a = new_a.replace('"', '\\"')
    return text[:m.start()] + f'{{ question: "{safe_q}", answer: "{safe_a}" }}' + text[m.end():]


def ollama_json(slug, display):
    """Get country data via Ollama API with explicit template."""
    prompt = (
        f'Generate a JSON object for the AI tools SEO landing page for {display}. '
        f'Return ONLY valid JSON. No markdown, no code fences, no extra text. '
        f'Use these exact keys:\n'
        f'title, meta_desc, og_desc, market_desc, faq1_q, faq1_a, faq2_q, faq2_a, faq3_q, faq3_a, faq4_q, faq4_a, faq5_q, faq5_a, t1_t, t1_d, t2_t, t2_d, t3_t, t3_d, e1t, e1d, e2t, e2d, e3t, e3d, e4t, e4d, eco_h, eco_sub, cta_line, kw, guide_heading, why_h, why_text, top_h, top_sub. '
        f'Values should be short (1-2 sentences) about {display} AI ecosystem and tools. '
        f'Example title: "Best AI Tools in {display} (2026) - Curated for {display} Teams"'
    )
    try:
        r = requests.post('http://localhost:11434/api/generate',
            json={'model': 'llama3.2', 'prompt': prompt, 'stream': False,
                  'keep_alive': '5m', 'options': {'num_predict': 4096, 'temperature': 0.3}},
            timeout=120)
        raw = r.json().get('response', '').strip()
        s = raw.find('{')
        e = raw.rfind('}')
        if s < 0 or e <= s:
            print(f'  No JSON in response')
            return None
        j = raw[s:e+1]
        j = j.replace('\\n', ' ').replace('\\r', ' ')
        j = re.sub(r',\s*}', '}', j)
        j = re.sub(r',\s*]', ']', j)
        return json.loads(j)
    except Exception as ex:
        print(f'  API error: {ex}')
        return None


COLORS = {
    'denmark':  dict(g1='from-blue-400',g2='via-white',g3='to-blue-300',bg='bg-blue-500/10',bd='border-blue-500/20',bt='text-blue-300',rc='from-blue-400 to-white',sc='from-blue-500/20 to-cyan-900/10',tc='blue',hl='Danish/English',hp='DKK Pricing',hc='GDPR Ready',hr='Nordic Digital Leader',sf='DK-Ready'),
    'finland': dict(g1='from-cyan-400',g2='via-white',g3='to-cyan-300',bg='bg-cyan-500/10',bd='border-cyan-500/20',bt='text-cyan-300',rc='from-cyan-400 to-white',sc='from-cyan-500/20 to-indigo-900/10',tc='cyan',hl='Suomi/English',hp='EUR Pricing',hc='GDPR & Tietosuojalaki',hr='Nordic Digital Leader',sf='FI-Ready'),
    'ireland': dict(g1='from-green-400',g2='via-white',g3='to-green-300',bg='bg-green-500/10',bd='border-green-500/20',bt='text-green-300',rc='from-green-400 to-white',sc='from-green-500/20 to-emerald-900/10',tc='green',hl='English/Gaeilge',hp='EUR Pricing',hc='GDPR & DPC',hr='EU Tech Hub',sf='IE-Ready'),
    'israel': dict(g1='from-sky-400',g2='via-white',g3='to-sky-300',bg='bg-sky-500/10',bd='border-sky-500/20',bt='text-sky-300',rc='from-sky-400 to-white',sc='from-sky-500/20 to-indigo-900/10',tc='sky',hl='Hebrew/English',hp='ILS/USD Pricing',hc='Privacy Protection Law',hr='Startup Nation Ready',sf='IL-Ready'),
    'italy': dict(g1='from-emerald-400',g2='via-white',g3='to-emerald-300',bg='bg-emerald-500/10',bd='border-emerald-500/20',bt='text-emerald-300',rc='from-emerald-400 to-white',sc='from-emerald-500/20 to-teal-900/10',tc='emerald',hl='Italiano/English',hp='EUR Pricing',hc='GDPR & Garante Privacy',hr='European Innovation Hub',sf='IT-Ready'),
    'mexico': dict(g1='from-red-400',g2='via-white',g3='to-red-300',bg='bg-red-500/10',bd='border-red-500/20',bt='text-red-300',rc='from-red-400 to-white',sc='from-red-500/20 to-rose-900/10',tc='red',hl='Espanol/English',hp='MXN/USD Pricing',hc='LFPDPPP Compliance',hr='LatAm Tech Leader',sf='MX-Ready'),
    'netherlands': dict(g1='from-amber-400',g2='via-white',g3='to-amber-300',bg='bg-amber-500/10',bd='border-amber-500/20',bt='text-amber-300',rc='from-amber-400 to-white',sc='from-amber-500/20 to-yellow-900/10',tc='amber',hl='Nederlands/English',hp='EUR Pricing',hc='GDPR & AVG',hr='European Digital Hub',sf='NL-Ready'),
    'new-zealand': dict(g1='from-teal-400',g2='via-white',g3='to-teal-300',bg='bg-teal-500/10',bd='border-teal-500/20',bt='text-teal-300',rc='from-teal-400 to-white',sc='from-teal-500/20 to-emerald-900/10',tc='teal',hl='English/Maori',hp='NZD Pricing',hc='Privacy Act 2020',hr='Pacific Digital Hub',sf='NZ-Ready'),
    'norway': dict(g1='from-indigo-400',g2='via-white',g3='to-indigo-300',bg='bg-indigo-500/10',bd='border-indigo-500/20',bt='text-indigo-300',rc='from-indigo-400 to-white',sc='from-indigo-500/20 to-violet-900/10',tc='indigo',hl='Norsk/English',hp='NOK Pricing',hc='GDPR & Personvern',hr='Nordic Digital Hub',sf='NO-Ready'),
    'poland': dict(g1='from-purple-400',g2='via-white',g3='to-purple-300',bg='bg-purple-500/10',bd='border-purple-500/20',bt='text-purple-300',rc='from-purple-400 to-white',sc='from-purple-500/20 to-pink-900/10',tc='purple',hl='Polski/English',hp='PLN/EUR Pricing',hc='GDPR & RODO',hr='Central European Tech Hub',sf='PL-Ready'),
    'portugal': dict(g1='from-rose-400',g2='via-white',g3='to-rose-300',bg='bg-rose-500/10',bd='border-rose-500/20',bt='text-rose-300',rc='from-rose-400 to-white',sc='from-rose-500/20 to-pink-900/10',tc='rose',hl='Portugues/English',hp='EUR Pricing',hc='GDPR & CNPD',hr='Iberian Digital Leader',sf='PT-Ready'),
    'russia': dict(g1='from-slate-400',g2='via-white',g3='to-slate-300',bg='bg-slate-500/10',bd='border-slate-500/20',bt='text-slate-300',rc='from-slate-400 to-white',sc='from-slate-500/20 to-zinc-900/10',tc='slate',hl='Russian/English',hp='RUB/USD Pricing',hc='152-FZ Compliance',hr='Eurasian Tech Hub',sf='RU-Ready'),
    'south-africa': dict(g1='from-yellow-400',g2='via-white',g3='to-yellow-300',bg='bg-yellow-500/10',bd='border-yellow-500/20',bt='text-yellow-300',rc='from-yellow-400 to-white',sc='from-yellow-500/20 to-orange-900/10',tc='yellow',hl='English/Afrikaans',hp='ZAR Pricing',hc='POPIA Compliant',hr='African Digital Leader',sf='ZA-Ready'),
    'spain': dict(g1='from-orange-400',g2='via-white',g3='to-orange-300',bg='bg-orange-500/10',bd='border-orange-500/20',bt='text-orange-300',rc='from-orange-400 to-white',sc='from-orange-500/20 to-rose-900/10',tc='orange',hl='Espanol/English',hp='EUR Pricing',hc='GDPR & AEPD',hr='Southern European Tech Hub',sf='ES-Ready'),
    'sweden': dict(g1='from-blue-400',g2='via-white',g3='to-blue-300',bg='bg-blue-500/10',bd='border-blue-500/20',bt='text-blue-300',rc='from-blue-400 to-white',sc='from-blue-500/20 to-cyan-900/10',tc='blue',hl='Svenska/English',hp='SEK Pricing',hc='GDPR & IMY',hr='Nordic Digital Hub',sf='SE-Ready'),
    'switzerland': dict(g1='from-violet-400',g2='via-white',g3='to-violet-300',bg='bg-violet-500/10',bd='border-violet-500/20',bt='text-violet-300',rc='from-violet-400 to-white',sc='from-violet-500/20 to-purple-900/10',tc='violet',hl='DE/FR/IT/EN',hp='CHF Pricing',hc='FADP & revFADP',hr='European AI Hub',sf='CH-Ready'),
}

COUNTRIES = [
    ('denmark','Denmark','dk','Copenhagen','DKK','Danish / English','da'),
    ('finland','Finland','fi','Helsinki','EUR','Finnish / Swedish / English','fi'),
    ('ireland','Ireland','ie','Dublin','EUR','English / Irish','en'),
    ('israel','Israel','il','Jerusalem','ILS','Hebrew / English','he'),
    ('italy','Italy','it','Rome','EUR','Italian / English','it'),
    ('mexico','Mexico','mx','Mexico City','MXN','Spanish / English','es'),
    ('netherlands','Netherlands','nl','Amsterdam','EUR','Dutch / English','nl'),
    ('new-zealand','New Zealand','nz','Wellington','NZD','English / Maori','en'),
    ('norway','Norway','no','Oslo','NOK','Norwegian / English','no'),
    ('poland','Poland','pl','Warsaw','PLN','Polish / English','pl'),
    ('portugal','Portugal','pt','Lisbon','EUR','Portuguese / English','pt'),
    ('russia','Russia','ru','Moscow','RUB','Russian / English','ru'),
    ('south-africa','South Africa','za','Pretoria/Cape Town/Bloemfontein','ZAR','English / Afrikaans','en'),
    ('spain','Spain','es','Madrid','EUR','Spanish / English','es'),
    ('sweden','Sweden','se','Stockholm','SEK','Swedish / English','sv'),
    ('switzerland','Switzerland','ch','Bern','CHF','German/French/Italian/English','de'),
]


def do_country(slug, display, code, capital, currency, lang, lang_code):
    print(f'\n=== Generating {display} ({slug}) ===')
    data = ollama_json(slug, display)
    if not data:
        print(f'  \u2717 Failed to get data for {slug}')
        return False

    required = ['faq1_q','faq1_a','faq2_q','faq2_a','faq3_q','faq3_a',
                'faq4_q','faq4_a','faq5_q','faq5_a',
                't1_t','t1_d','t2_t','t2_d','t3_t','t3_d',
                'e1t','e1d','e2t','e2d','e3t','e3d','e4t','e4d',
                'eco_h','eco_sub','cta_line','market_desc','meta_desc','og_desc',
                'kw','guide_heading','why_h','why_text','top_h','top_sub']
    missing = [k for k in required if k not in data]
    if missing:
        print(f'  \u2717 Missing: {missing}')
        return False

    # Default None values to empty string
    for k in list(data.keys()):
        if data[k] is None:
            data[k] = ''

    c = COLORS[slug]
    generate(
        slug=slug,name=display,code=code,capital=capital,currency=currency,
        lang=lang,langCode=lang_code,
        title=f'Best AI Tools in {display} (2026) \u2014 Curated for {display} Teams & Startups',
        meta_desc=data.get('meta_desc',''), og_desc=data.get('og_desc',''),
        market_desc=data.get('market_desc',''),
        g1=c['g1'],g2=c['g2'],g3=c['g3'],bg=c['bg'],bd=c['bd'],
        bt=c['bt'],rc=c['rc'],sc=c['sc'],tc=c['tc'],
        hl=c['hl'],hp=c['hp'],hc=c['hc'],hr=c['hr'],sf=c['sf'],
        faq1_q=data['faq1_q'],faq1_a=data['faq1_a'],
        faq2_q=data['faq2_q'],faq2_a=data['faq2_a'],
        faq3_q=data['faq3_q'],faq3_a=data['faq3_a'],
        faq4_q=data['faq4_q'],faq4_a=data['faq4_a'],
        faq5_q=data['faq5_q'],faq5_a=data['faq5_a'],
        t1_t=data['t1_t'],t1_d=data['t1_d'],
        t2_t=data['t2_t'],t2_d=data['t2_d'],
        t3_t=data['t3_t'],t3_d=data['t3_d'],
        e1t=data['e1t'],e1d=data['e1d'],
        e2t=data['e2t'],e2d=data['e2d'],
        e3t=data['e3t'],e3d=data['e3d'],
        e4t=data['e4t'],e4d=data['e4d'],
        eco_h=data['eco_h'],eco_sub=data['eco_sub'],
        cta_line=data['cta_line'],
        kw=data['kw'],
        guide_heading=data['guide_heading'],
        why_h=data['why_h'],why_text=data['why_text'],
        top_h=data['top_h'],top_sub=data['top_sub'],
    )
    print(f'  \u2713 {slug}: DONE')
    return True


if __name__ == '__main__':
    target = sys.argv[1] if len(sys.argv) > 1 else None

    if target and target != 'all':
        for slug, display, code, capital, currency, lang, lang_code in COUNTRIES:
            if slug == target or display.lower() == target.lower():
                do_country(slug, display, code, capital, currency, lang, lang_code)
                break
    else:
        ok = 0
        fail = 0
        for slug, display, code, capital, currency, lang, lang_code in COUNTRIES:
            if do_country(slug, display, code, capital, currency, lang, lang_code):
                ok += 1
            else:
                fail += 1
        print(f'\n=== Complete: {ok} succeeded, {fail} failed ===')
