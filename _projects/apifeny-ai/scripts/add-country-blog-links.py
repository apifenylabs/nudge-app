#!/usr/bin/env python3
"""
Add CountryBlogPosts component to country pages.

For each country page that has a matching blog post, adds:
1. import CountryBlogPosts from '@/components/CountryBlogPosts'
2. <CountryBlogPosts countryName="..." countrySlug="..." /> section

Usage: cd /home/captain/.openclaw/workspace/apifeny-ai && python3 scripts/add-country-blog-links.py
"""

import os, re

PROJECT_DIR = os.path.dirname(os.path.dirname(__file__))

# Mapping: country_slug -> country_name
COUNTRY_MAP = {
    'singapore': 'Singapore',
    'indonesia': 'Indonesia',
    'vietnam': 'Vietnam',
    'thailand': 'Thailand',
    'malaysia': 'Malaysia',
    'philippines': 'Philippines',
    'hong-kong': 'Hong Kong',
    'south-korea': 'South Korea',
    'india': 'India',
    'taiwan': 'Taiwan',
    'bangladesh': 'Bangladesh',
    'cambodia': 'Cambodia',
    'myanmar': 'Myanmar',
    'nepal': 'Nepal',
    'pakistan': 'Pakistan',
    'sri-lanka': 'Sri Lanka',
}

IMPORT_LINE = "import CountryBlogPosts from '@/components/CountryBlogPosts';"

BLOG_SECTION = """\
      <CountryBlogPosts
        countryName="{country_name}"
        countrySlug="{country_slug}"
      />"""


def modify_country_page(slug, country_name):
    """Add CountryBlogPosts import and component to a country page."""
    fpath = os.path.join(PROJECT_DIR, 'app', f'ai-tools-{slug}', 'page.tsx')
    
    if not os.path.exists(fpath):
        print(f"  ⚠️  {slug}: page not found at {fpath}")
        return False
    
    with open(fpath) as f:
        content = f.read()
    
    # Check if already present
    if 'CountryBlogPosts' in content:
        print(f"  ⏭️  {slug}: already has CountryBlogPosts")
        return False
    
    # 1. Add import after BlogCategoryLinks import
    import_pattern = r"(import BlogCategoryLinks from '@components/BlogCategoryLinks';)"
    if not re.search(import_pattern, content):
        # Try @/components pattern
        import_pattern = r"(import BlogCategoryLinks from '@/components/BlogCategoryLinks';)"
    
    replacement = f"\\1\n{IMPORT_LINE}"
    content = re.sub(import_pattern, replacement, content)
    
    # 2. Add component section after the BlogCategoryLinks section
    # Find the BlogCategoryLinks section and add after it
    blog_section_pattern = r"(<BlogCategoryLinks\s*/>)"
    blog_section_output = BLOG_SECTION.format(country_name=country_name, country_slug=slug)
    
    content = re.sub(blog_section_pattern, f"\\1\n{blog_section_output}", content)
    
    with open(fpath, 'w') as f:
        f.write(content)
    
    return True


def main():
    print("📝 Adding CountryBlogPosts to country pages...")
    modified = 0
    
    for slug, name in sorted(COUNTRY_MAP.items()):
        result = modify_country_page(slug, name)
        if result:
            print(f"  ✅ {slug} ({name})")
            modified += 1
        elif result is False:
            print(f"  ❌ {slug} ({name}): failed")
    
    print(f"\nSummary: {modified} pages modified")


if __name__ == '__main__':
    main()
