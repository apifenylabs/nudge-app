'switzerland': {
'subtitle': 'From Zurich\u2019s ETH and Google R&D to Lausanne\u2019s EPFL innovation ecosystem and Lugano\u2019s emerging deep tech scene, Switzerland combines two of the world\u2019s top technical universities.',
'approach': 'that powers the world\u2019s most advanced systems \u2014 tailored for Swiss businesses.',
'talent': "Switzerland produces world-leading AI research from ETH Zurich and EPFL, both consistently ranked among the world's top 10 CS departments. Innosuisse and SNSF provide generous research and innovation grants.",
'eco_header': "Switzerland's AI Ecosystem Is a World-Class Innovation Hub",
'eco_sub_cards': [
  "{ title: '\U0001f1e8\U0001f1ed Zurich \u2014 ETH & Global Innovation Hub', description: 'Zurich is home to ETH Zurich, one of the world\u2019s top 5 CS schools, and hosts Google\u2019s largest R&D center outside the US (5,000+ engineers). The city excels in robotics, computer vision, and NLP.' }",
  "{ title: '\U0001f393 Lausanne \u2014 EPFL & Deep Tech Ecosystem', description: 'EPFL is one of the world\u2019s most innovative technical universities, producing top AI research in NLP, computer vision, and life sciences. The EPFL Innovation Park hosts 200+ deep tech startups.' }",
  "{ title: '\U0001f3e2 Lugano & Basel \u2014 FinTech & Life Sciences AI', description: 'Lugano is a growing fintech AI hub, while Basel leads in AI for life sciences and pharma. USI produces strong AI research for the finance and healthcare sectors.' }",
],
},
}

import os, re

APP = 'app'

countries = list(DATA.keys())

for country in countries:
    fpath = os.path.join(APP, f'ai-tools-{country}', 'page.tsx')
    with open(fpath) as f:
        content = f.read()
    original = content
    d = DATA[country]
    
    # Fix 1: Ecosystem header (line containing "Ecosystem Is a")
    for suffix in ['Ecosystem Is a Global Research Powerhouse', 'Ecosystem Is a Growing',
                   'Ecosystem Is a', 'Ecosystem Is Latin', "Ecosystem Is Europe's",
                   "Ecosystem Is Africa's", "Ecosystem Is a Central",
                   "Ecosystem Is a European", "Ecosystem Is a Nordic",
                   "Ecosystem Is a Eurasian", "Ecosystem Is a Pacific",
                   "Ecosystem Is a World-Class"]:
        # Find the old header from current content
        idx = content.find(suffix)
        if idx >= 0:
            # Walk backward to find <h2 or the start of the content
            line_start = content.rfind('\n', 0, idx) + 1
            line_end = content.find('\n', idx)
            old_header = content[line_start:line_end]
            new_header = old_header[:old_header.find(suffix)] + d['eco_header']
            content = content.replace(old_header, new_header)
            break
    
    # Fix 2: Subtitle (starts with "From X"s")
    # Find it by looking for the garbled "From X's major cities's" pattern
    idx = content.find("'s major cities's")
    if idx > 0:
        # Walk backward to find "From "
        line_start = content.rfind('From ', 0, idx)
        if line_start > 0:
            line_start = content.rfind('\n', 0, line_start) + 1
            line_end = content.find('\n', line_start)
            old_line = content[line_start:line_end]
            indent = re.match(r'^(\s*)', old_line).group(1)
            content = content.replace(old_line, indent + d['subtitle'])
    
    # Fix 3: The "that powers the world" approach line
    idx = content.find('that powers the world')
    if idx > 0:
        line_start = content.rfind('\n', 0, idx) + 1
        line_end = content.find('\n', idx)
        old_line = content[line_start:line_end]
        indent = re.match(r'^(\s*)', old_line).group(1)
        content = content.replace(old_line, indent + d['approach'])
    
    # Fix 4: Talent card (contains "$125M+" or similar)
    # Look for lines containing "$" or "R&D"
    idx = content.find('"Globally Recognized Software Talent"')
    if idx > 0:
        # Find the description in the card
        # The talent card is in the ecosystem 3-card section
        card_start = content.find('Globally Recognized Software Talent', idx)
        if card_start > 0:
            card_start = content.rfind('\n', 0, card_start)
            # Find the next card start
            card_end = content.find('\nGlobally Recogn', card_start + 1)
            if card_end < 0:
                card_end = content.find('].map', card_start)
            if card_end > card_start:
                old_card_block = content[card_start:card_end]
                # Find the description field
                desc_start = old_card_block.find("description: '")
                if desc_start > 0:
                    desc_end = old_card_block.find("' }", desc_start)
                    if desc_end > desc_start:
                        indent = re.match(r'^(\s*)', old_card_block[old_card_block.find('\n'):]).group(1)
                        new_desc = f"description: '{d['talent']}' }}"
                        content = content.replace(old_card_block[desc_start:desc_end+3], new_desc)
    
    # Fix 5: Token cards (eco_sub_cards)
    # Find the 3 garbled ecosystem sub-cards (they contain garbled "offers one of the best environments" etc.)
    # We can identify them by looking for the garbled talent card pattern
    # Actually, let us just replace the whole garbled section
    
    # Fix 6: Any remaining "$125M+" patterns
    content = content.replace('$125M+', '')
    # Clean up any doubled whitespace from "$125M+" removal
    content = re.sub(r'\s+', ' ', content)
    
    if content != original:
        with open(fpath, 'w') as f:
            f.write(content)
        print(f'\u2705 Fixed: ai-tools-{country}/page.tsx')
    else:
        print(f'\u2139\ufe0f No change needed: ai-tools-{country}/page.tsx')

print('\nDone with garbled fix')
