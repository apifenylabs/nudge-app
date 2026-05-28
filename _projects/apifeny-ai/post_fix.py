#!/usr/bin/env python3
import os, re, json

# Load data from JSON
with open(os.path.join(os.path.dirname(__file__), 'fix_data.json')) as f:
    DATA = json.load(f)

APP = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'app')

for item in DATA:
    slug = item['slug']
    name = item['name']
    adj = item['adj']
    
    path = os.path.join(APP, f'ai-tools-{slug}', 'page.tsx')
    with open(path) as f:
        content = f.read()
    
    # H1 gradient span
    content = re.sub(
        r'(<span[^>]*bg-clip-text[^>]*>\s*
\s*)Canada(\s*
\s*</span>)',
        f'\1{name}\2', content
    )
    
    # Category links
    content = re.sub(r'for Canada<ArrowRight', f'for {name}<ArrowRight', content)
    
    # Keywords
    content = re.sub(
        r'best AI tools in Canada 2026 · AI tools for Canadian businesses · Canada AI software ·[\s\S]*?AI tools Toronto · AI tools Montreal · AI tools Vancouver',
        item['keywords'], content
    )
    
    # Stats filter
    sf = item['stats_filter']
    content = re.sub(r'CA-Ready Filters', f'{sf}-Ready Filters', content)
    content = content.replace('CA-Ready', sf)
    
    # Flag emoji in ecosystem titles
    content = re.sub(r'\ud83c\udde8\ud83c\udde6 ', '', content)
    
    # Comments
    content = content.replace('WHY CANADA MATTERS', f'WHY {name.upper()} MATTERS')
    content = content.replace('CANADA ECOSYSTEM', f'{name.upper()} ECOSYSTEM')
    
    # Trust block fixes: handle escape sequences for JS
    # ... more targeted replacements
    
    with open(path, 'w') as f:
        f.write(content)
    
    print(f'{slug}: DONE')
