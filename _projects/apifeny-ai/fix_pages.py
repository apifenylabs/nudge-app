#!/usr/bin/env python3
"""Fix remaining Canada-specific content in all 4 generated geo pages."""
import os, re

APP = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'app')

COUNTRIES = {
    'austria': {
        'adj': 'Austrian', 'name': 'Austria',
        'privacy_law': 'DSGVO',
        'privacy_full': 'Datenschutzgesetz (DSGVO)',
        'regulator': 'Austrian Data Protection Authority (DSB)',
        'reg1': 'FMA', 'reg2': 'AGES', 'reg3': 'BMK',
        'eco_text': "Austria's AI ecosystem is unique \u2014 world-leading research meets a distinct regulatory and cultural landscape at the heart of Europe.",
        'cta_line_suffix': 'GDPR/DSGVO compliance, EUR pricing, and German/English support',
        'funding_text': 'FFG (Austrian Research Promotion Agency), aws (Austria Wirtschaftsservice), Austria\u2019s 14% R&D tax credit, and EU Horizon Europe programmes',
    },
    'belgium': {
        'adj': 'Belgian', 'name': 'Belgium',
        'privacy_law': 'GDPR',
        'privacy_full': 'EU GDPR (enforced by the GBA/APD)',
        'regulator': 'Belgian Data Protection Authority (GBA/APD)',
        'reg1': 'FSMA', 'reg2': 'FAMHP', 'reg3': 'FPS Mobility',
        'eco_text': "Belgium's AI ecosystem is unique \u2014 multilingual by law, at the heart of EU AI governance, and home to world-class deep tech R&D.",
        'cta_line_suffix': 'GDPR compliance, EUR pricing, and multilingual (NL/FR/DE/EN) support',
        'funding_text': 'VLAIO, hub.brussels, DigitalWallonia4.ai, AI4Belgium, and EU Horizon Europe programmes',
    },
    'chile': {
        'adj': 'Chilean', 'name': 'Chile',
        'privacy_law': 'Law 19.628',
        'privacy_full': 'Law No. 19.628 (Ley de Protección de la Vida Privada)',
        'regulator': 'Council for Transparency (CPLT)',
        'reg1': 'CMF', 'reg2': 'ISP', 'reg3': 'SERNAGEOMIN',
        'eco_text': "Chile's AI ecosystem is unique \u2014 Latin America's most competitive startup environment meets a resource-driven economy and evolving regulatory landscape.",
        'cta_line_suffix': 'Chilean data compliance, CLP/USD pricing, and Spanish/English support',
        'funding_text': 'CORFO (Start-Up Chile grants, up to $100K equity-free, 35% R&D tax credits) and ProChile',
    },
    'colombia': {
        'adj': 'Colombian', 'name': 'Colombia',
        'privacy_law': 'Law 1581',
        'privacy_full': 'Statutory Law 1581 of 2012 (Ley de Protección de Datos Personales)',
        'regulator': 'SIC (Superintendencia de Industria y Comercio)',
        'reg1': 'SFC', 'reg2': 'Invima', 'reg3': 'MinTransporte',
        'eco_text': "Colombia's AI ecosystem is unique \u2014 Latin America's fastest-growing startup scene meets a rich cultural landscape and rapidly modernising regulatory framework.",
        'cta_line_suffix': 'Colombian data compliance, COP/USD pricing, and Spanish/English support',
        'funding_text': 'iNNpulsa Colombia grants, Fondo Emprender (SENA), and the $111.5M National AI Policy',
    },
}

for slug, info in COUNTRIES.items():
    path = os.path.join(APP, f'ai-tools-{slug}', 'page.tsx')
    with open(path, 'r') as f:
        content = f.read()
    
    adj = info['adj']
    name = info['name']
    privacy = info['privacy_law']
    
    # ====== FAQ2 fix ======
    # Question
    old_q2 = '{ question: "How does Canadian privacy law (PIPEDA) affect AI tool selection?"'
    new_q2 = '{ question: "How does ' + adj + ' data protection law (' + privacy + ') affect AI tool selection?"'
    if old_q2 in content:
        content = content.replace(old_q2, new_q2)
    else:
        print(f'  [WARN] FAQ2 question not found for {slug}')
    
    # Answer - remove PIPEDA/AIDA/Quebec references
    old_a2_1 = "answer: \\\"" + name + "'s Personal Information Protection and Electronic Documents Act (PIPEDA) and Quebec's Law 25"
    new_a2_1 = "answer: \\\"" + name + "'s " + info['privacy_full']
    if old_a2_1 in content:
        content = content.replace(old_a2_1, new_a2_1)
    
    content = content.replace(
        ' The proposed Artificial Intelligence and Data Act (AIDA) will further regulate high-impact AI systems.',
        ''
    )
    
    # Fix remaining OPC reference
    content = content.replace(
        'and alignment with OPC guidance on AI and automated decision-making.',
        'and alignment with ' + info['regulator'] + ' guidance on AI and automated decision-making.'
    )
    
    # ====== FAQ3 fix ======
    content = content.replace(
        'question: "What AI tools are best for Canada\'s key industries?"',
        'question: "What AI tools are best for " + name + "'s key industries?"'
    )
    
    # Fix answer - remove Toronto/Montreal/Vector etc.
    a3_parts = content.split('answer: "')
    # Find FAQ3 answer (3rd answer block after FAQ blocks start)
    faq_start = content.find('faqs={[')
    if faq_start > 0:
        faq_section = content[faq_start:]
        # Count answer blocks before the FAQ3 block
        count = 0
        idx = 0
        while count < 3:
            pos = faq_section.find('answer: "', idx)
            if pos < 0:
                break
            count += 1
            if count == 3:
                # Find end of this answer
                end_pos = faq_section.find('" },', pos)
                if end_pos > 0:
                    old_a3 = faq_section[pos:end_pos+4]
                    new_a3 = 'answer: "' + name + "'s economy has diverse AI priorities across multiple sectors. AI tools are being adopted in industries like finance, healthcare, retail, logistics, and education \u2014 tailored to " + name + "'s specific economic landscape and business environment." },'
                    content = content.replace(old_a3, new_a3)
                    break
            idx = pos + 1
    
    # ====== FAQ4 fix ======
    content = content.replace(
        'question: "How can Canadian startups access AI funding and support?"',
        'question: "How can ' + adj + ' startups access AI funding and support?"'
    )
    
    # Fix answer - remove SR&ED, IRAP, BDC etc.
    old_a4 = "answer: \\\"" + name + " offers extensive AI innovation support. The Pan-Canadian AI Strategy (CIFAR) funds research and commercialization. The Scientific Research and Experimental Development (SR&ED) tax credit provides 35-45% cash refunds on qualifying AI R&D costs for Canadian companies. IRAP (National Research Council) provides grants for AI technology adoption. BDC Capital and federal/provincial VC programs support AI startups. The Global Talent Stream fast-tracks AI talent visas. Programs like NextAI, Creative Destruction Lab (CDL), and BC Tech\\'s AI initiatives provide mentorship and funding."
    new_a4 = "answer: \\\"" + name + " offers extensive AI innovation support. " + info['funding_text'] + ". Combined with a growing pool of VC funding, angel investors, and incubation programmes, " + name + " provides a supportive environment for AI startups to grow and scale."
    if old_a4 in content:
        content = content.replace(old_a4, new_a4)
    
    # ====== FAQ5 fix ======
    content = content.replace(
        'question: "What AI regulations exist in Canada?"',
        'question: "What AI regulations exist in ' + name + '?"'
    )
    
    old_a5 = "answer: \\\"" + name + "'s AI regulatory framework is evolving. The proposed Artificial Intelligence and Data Act (AIDA), part of Bill C-27, will establish requirements for high-impact AI systems including risk assessments, transparency, and accountability. PIPEDA governs data used in AI training. Quebec\\'s Law 25 sets additional privacy requirements. Specific sectors have regulations: Health Canada for medical AI, OSFI for financial AI, and Transport Canada for autonomous vehicles. " + name + "'s Voluntary AI Code of Conduct sets early standards for responsible AI development."
    new_a5 = "answer: \\\"" + name + "'s AI regulatory framework is evolving. The government is working towards comprehensive AI regulation aligned with international best practices. Sector-specific regulations apply: " + info['reg1'] + " for financial AI, " + info['reg2'] + " for health AI, and " + info['reg3'] + " for relevant sectors. " + name + " is actively participating in international discussions on AI ethics, governance, and responsible AI development."
    if old_a5 in content:
        content = content.replace(old_a5, new_a5)
    
    # ====== Hero text ======
    # "and Canadian AI ecosystem readiness"
    target = 'and Canadian AI ecosystem readiness \u2014 so you find tools built for ' + name + "'s unique market."
    replacement = 'and ' + adj + ' AI ecosystem readiness \u2014 so you find tools built for ' + name + "'s unique market."
    content = content.replace(target, replacement)
    
    # ====== CTA section ======
    content = content.replace(
        "No more guessing if a tool works for Canada\\'s market, supports French, or respects local data laws. Every tool on Apifeny AI is rated for Canadian data compliance, CAD pricing, and bilingual readiness.",
        "No more guessing if a tool works for " + name + "'s market, or respects local data laws. Every tool on Apifeny AI is rated for " + adj + " data compliance, " + adj.lower() + " pricing, and local relevance."
    )
    
    # ====== "Why X Matters" section text ======
    # Already partially fixed by gen_lib, but "Canada's AI ecosystem is unique" may remain
    old_why = "<p class=\"text-sm sm:text-base text-tech-200 max-w-xl mx-auto\">Canada's AI ecosystem is unique \u2014 world-leading research meets a distinct regulatory and cultural landscape.</p>"
    new_why = "<p class=\"text-sm sm:text-base text-tech-200 max-w-xl mx-auto\">" + info['eco_text'] + "</p>"
    if old_why in content:
        content = content.replace(old_why, new_why)
    
    # ====== Ecosystem heading ======
    old_eco_heading = name + "'s AI Ecosystem Is a Global Research Powerhouse"
    new_eco_heading = content  # this should already be replaced by gen_lib
    # Check if old is present (it shouldn't be if gen_lib worked)
    if old_eco_heading in content:
        print(f'  [WARN] Stale eco heading found for {slug}')
    
    # ====== Ecosystem intro sentence ======
    old_eco_sub = "From Toronto's Vector Institute to Montreal's Mila, Canada produces foundational AI research that powers the world's most advanced systems \u2014 with a distinctly Canadian approach to responsible AI."
    new_eco_sub = name + "'s AI innovation landscape is rapidly evolving, with growing research centres, startup communities, and digital transformation across all sectors."
    content = content.replace(old_eco_sub, new_eco_sub)
    
    # ====== CTA badge text ======
    content = content.replace(
        'Built for Canadian Founders, Researchers & Enterprises',
        'Built for ' + adj + ' Founders, Teams & Innovators'
    )
    
    # ====== Stats filter ======
    content = content.replace(
        'Canada-Ready Filters',
        name + '-Ready Filters'
    )
    
    # ====== "for Canada's unique market" in hero CTA ======
    content = content.replace(
        "actually work for Canada</strong>. \n              We rank every tool on PIPEDA compliance, CAD pricing, bilingual (EN/FR) support,",
        "actually work for " + name + "</strong>. \n              We rank every tool on " + info['cta_line_suffix'] + ","
    )
    
    with open(path, 'w') as f:
        f.write(content)
    
    print('✓ ' + slug + ' page.tsx fixed')

print('\n=== All pages fixed ===')
