#!/usr/bin/env python3
"""Generate 5 luxury family travel blog posts using Ollama's llama3.2."""

import json
import subprocess
import re
import os

BLOG_DIR = "/home/captain/.openclaw/workspace/luxury-family-travel/data/blog"

POSTS = [
    {
        "slug": "hong-kong-luxury-family-weekend",
        "title": "Hong Kong Luxury Family Weekend: Peninsula Stay, Peak Tram, and Michelin Dining",
        "excerpt": "Plan the ultimate luxury family weekend in Hong Kong with a Peninsula Hotel stay, Peak Tram adventures, and Michelin-starred dining that delights parents and children alike.",
        "tags": ["Hong Kong", "luxury family weekend", "Michelin dining", "Peninsula Hotel", "Asia luxury travel"],
        "relatedDestinations": ["hong-kong-new-1", "hong-kong-new-2", "hong-kong-new-3", "hongkong-001", "hongkong-002", "hongkong-009"],
        "prompt": """Write a detailed luxury family travel blog article about a weekend in Hong Kong for families with children aged 5-16. 

Focus on:
- Staying at The Peninsula Hong Kong (mention afternoon tea, pool, kids programs)
- Taking the Peak Tram to Victoria Peak
- Michelin-starred dining suitable for families (Lung King Heen, Amber, 8 1/2 Otto e Mezzo)
- Hong Kong Disneyland
- Ngong Ping 360 cable car to see Big Buddha
- Star Ferry across Victoria Harbour
- Klook-bookable experiences (Priority Peak Tram tickets, Disneyland packages)
- Suggestions for tweens and teens (shopping at Harbour City, Nathan Road)

Tone: Premium, aspirational, Cosme-style curation. 
Format: Use <h2> for section headings and <p> for paragraphs. Write 2500-4000 characters of HTML content. No markdown in the output, pure HTML.""",
        "readingTime": "7 min read"
    },
    {
        "slug": "singapore-luxury-family-guide-marina-bay-sands",
        "title": "Singapore Luxury Family Guide: Marina Bay Sands, Gardens by the Bay, and Sentosa Premium Experiences",
        "excerpt": "Discover Singapore's finest luxury family experiences from Marina Bay Sands' infinity pool to Gardens by the Bay's Supertree Grove and Sentosa's most exclusive attractions.",
        "tags": ["Singapore", "Marina Bay Sands", "Gardens by the Bay", "Sentosa", "luxury family travel", "Asia travel"],
        "relatedDestinations": ["singapore-new-1", "singapore-new-2", "singapore-new-3", "singapore-new-4", "singapore-new-5", "singapore-011"],
        "prompt": """Write a detailed luxury family travel blog article about Singapore for families with children aged 4-17.

Focus on:
- Staying at Marina Bay Sands (infinity pool access, family suites, SkyPark views)
- Gardens by the Bay (Supertree Grove light show, Cloud Forest, Flower Dome)
- Sentosa premium experiences (S.E.A. Aquarium, Universal Studios Singapore Express Passes)
- Luxury shopping at Orchard Road with teen-friendly stores
- Singapore Zoo and Night Safari private guided tours
- Jewel Changi Airport (Rain Vortex, Canopy Park)
- Klook-bookable experiences (Universal Studios Express Passes, Night Safari tram rides)
- Dining recommendations (Odette, Burnt Ends, CUT by Wolfgang Puck — mention kid-friendly options)
- Tips for families with teens vs. younger children

Tone: Premium, aspirational, Cosme-style curation.
Format: Use <h2> for section headings and <p> for paragraphs. Write 2500-4000 characters of HTML content. No markdown in the output, pure HTML.""",
        "readingTime": "8 min read"
    },
    {
        "slug": "top-10-luxury-resorts-bali-families-teens-2026",
        "title": "Top 10 Luxury Resorts in Bali for Families with Teens 2026",
        "excerpt": "The definitive guide to Bali's best luxury resorts for families traveling with teenagers in 2026, from private pool villas at Four Seasons to surf camps at COMO Uma Canggu.",
        "tags": ["Bali", "luxury resorts", "family travel with teens", "Bali 2026", "Asia luxury resorts"],
        "relatedDestinations": ["bali-new-1", "bali-new-2", "bali-new-3", "bali-new-4", "bali-new-5", "bali-001", "bali-008"],
        "prompt": """Write a detailed luxury family travel blog article about the Top 10 luxury resorts in Bali specifically for families traveling with teenagers (ages 13-19) in 2026.

Include these 10 resorts with specific details:
1. Four Seasons Resort Bali at Sayan (Ubud — teen yoga, rice terrace treks, river rafting)
2. COMO Uma Canggu (surfing, beach club vibe, wellness programs for teens)
3. Bulgari Resort Bali (cliff-top infinity pool, private beach, teen spa treatments)
4. The St. Regis Bali Resort (butler service, lagoon pool, afternoon tea, watersports)
5. Mandapa, a Ritz-Carlton Reserve (Ubud — whitewater rafting, cycling tours, cooking classes)
6. Alila Villas Uluwatu (architectural wonder, sunset cabanas, surf lessons)
7. Capella Ubud (glamping meets luxury, jungle treks, stargazing)
8. Soori Bali (private villas, rice terrace views, teen-friendly bike tours)
9. Amandari (cultural immersion, silver-making classes, temple visits)
10. W Bali – Seminyak (vibrant, beach club, teen dance workshops, surf)

For each: mention teen-focused amenities, activities bookable via Klook or booking.com experiences, dining options, and why teens love it.

Tone: Premium, aspirational, Cosme-style curation with practical detail.
Format: Use <h2> for section headings and <p> for paragraphs. Write 2500-4000 characters of HTML content. No markdown in the output, pure HTML.""",
        "readingTime": "10 min read"
    },
    {
        "slug": "seoul-luxury-family-guide-k-culture",
        "title": "Seoul Luxury Family Guide: 5-Star Hotels, K-Culture Experiences, and Premium Shopping for Families",
        "excerpt": "Experience Seoul in style with your family — from palatial 5-star hotels and K-pop dance workshops to Gangnam luxury shopping and royal palace tours designed for kids and teens.",
        "tags": ["Seoul", "South Korea", "K-culture", "luxury family travel", "Seoul shopping", "Asia travel"],
        "relatedDestinations": ["seoul-new-1", "seoul-new-2", "seoul-new-3", "seoul-new-4", "seoul-new-5", "seoul-011"],
        "prompt": """Write a detailed luxury family travel blog article about Seoul, South Korea for families with children aged 6-18.

Focus on:
- 5-star hotel recommendations (Signiel Seoul, Four Seasons Hotel Seoul, The Shilla Seoul — mention family suites, kids clubs, pools)
- K-culture experiences (K-pop dance workshops, private K-beauty classes for teens, Hanbok rental at Gyeongbokgung Palace)
- Premium shopping (Gangnam's COEX Mall, luxury department stores Shinsegae and Lotte, K-pop merchandise at SM Town)
- Kid and teen-friendly activities (Lotte World, Everland, COEX Aquarium)
- Food (tasting menus at Jungsik and La Yeon, Korean BBQ with kids, street food tours via Klook)
- Royal palace tours with private child-friendly guides
- DMZ tour for older teens
- Bookable experiences via Klook (Everland shuttle tickets, palace tour guides, cooking classes)

Tone: Premium, aspirational, Cosme-style curation.
Format: Use <h2> for section headings and <p> for paragraphs. Write 2500-4000 characters of HTML content. No markdown in the output, pure HTML.""",
        "readingTime": "8 min read"
    },
    {
        "slug": "phuket-5-most-exclusive-family-friendly-resorts-2026",
        "title": "Phuket's 5 Most Exclusive Family-Friendly Resorts 2026",
        "excerpt": "Phuket's crème de la crème of family luxury: five ultra-exclusive resorts where privacy, world-class amenities, and unforgettable experiences await discerning families in 2026.",
        "tags": ["Phuket", "Thailand", "luxury resorts", "exclusive family resorts", "Phuket 2026", "beach resorts"],
        "relatedDestinations": ["phuket-001", "phuket-002", "phuket-005", "phuket-006", "phuket-003"],
        "prompt": """Write a detailed luxury family travel blog article about Phuket's 5 most exclusive family-friendly resorts in 2026. These should be ultra-luxury properties perfect for families with children aged 2-17.

Include these 5 resorts:
1. Amanpuri (Phuket's original ultra-luxury resort — private pool pavilions, world-class service, private beach, teen programs, Thai cooking classes, beach club)
2. Trisara (private pool villas, six-sensory spa, private dining on the pier, kids cooking classes, dive center for teens, spectacular sunset views)
3. Rosewood Phuket (mountainside enclave, three-bedroom residences, kids club with Thai crafts, multi-generational suites, incredible dining)
4. InterContinental Phuket Resort (beachfront luxury, planet trekkers kids club, family pool, multiple dining venues, close to Patong for teen excursions)
5. Banyan Tree Phuket (lagoon pool villas, spa sanctuary, family activities including snorkeling, kayaking, teen adventure programs, fine dining)

For each: describe the property, specific family amenities, dining for kids/teens, activities bookable via Klook (elephant sanctuaries, Phang Nga Bay tours, island hopping), and why they stand out for multi-generational or nuclear families.

Tone: Premium, exclusive, aspirational — think Condé Nast Traveller meets Cosme.
Format: Use <h2> for section headings and <p> for paragraphs. Write 2500-4000 characters of HTML content. No markdown in the output, pure HTML.""",
        "readingTime": "9 min read"
    }
]


def call_ollama(prompt):
    """Call llama3.2 via Ollama and return the response text."""
    full_prompt = f"""You are a luxury family travel writer for Cosme-style content. Write a premium travel blog article.

{prompt}

ONLY output the HTML content inside <article> tags. No preamble, no "here is your article", no markdown inside the HTML."""
    
    result = subprocess.run(
        ["ollama", "run", "llama3.2", full_prompt],
        capture_output=True,
        text=True,
        timeout=120
    )
    text = result.stdout.strip()
    if not text:
        text = result.stderr.strip()
    return text


def clean_html(text):
    """Extract clean HTML from response, fall back to wrapping raw text."""
    # Remove any markdown code fences
    text = re.sub(r'```(?:html)?\s*', '', text)
    text = re.sub(r'\s*```', '', text)
    
    # Try to extract content between <article> tags
    m = re.search(r'<article>(.*?)</article>', text, re.DOTALL)
    if m:
        return m.group(1).strip()
    
    # Try to extract anything that looks like HTML with h2 and p tags
    m = re.search(r'(<h2>.*</h2>.*)', text, re.DOTALL)
    if m:
        return m.group(1).strip()
    
    # Fallback: wrap paragraphs properly
    lines = text.strip().split('\n')
    html_parts = []
    current_section = None
    for line in lines:
        line = line.strip()
        if not line:
            continue
        if line.startswith('<'):
            html_parts.append(line)
        elif line.startswith('#'):
            title = line.lstrip('#').strip()
            html_parts.append(f'<h2>{title}</h2>')
        else:
            # Check if this looks like a heading (bold text)
            if line.startswith('**') and line.endswith('**'):
                title = line.strip('*')
                html_parts.append(f'<h2>{title}</h2>')
            else:
                html_parts.append(f'<p>{line}</p>')
    
    return '\n'.join(html_parts)


def count_content_chars(html):
    """Count characters excluding HTML tags."""
    text = re.sub(r'<[^>]+>', '', html)
    return len(text)


def generate_post(post_spec):
    """Generate a single blog post using Ollama and save it."""
    slug = post_spec["slug"]
    filepath = os.path.join(BLOG_DIR, f"{slug}.json")
    
    print(f"\n{'='*60}")
    print(f"Generating: {post_spec['title']}")
    print(f"{'='*60}")
    
    raw = call_ollama(post_spec["prompt"])
    
    content = clean_html(raw)
    char_count = count_content_chars(content)
    print(f"Content length: {char_count} chars (content only)")
    
    # If too short, try regenerating
    if char_count < 2000:
        print(f"Content too short ({char_count}), retrying...")
        raw2 = call_ollama(post_spec["prompt"] + "\n\nIMPORTANT: Write at least 2500 characters of actual content. Be very detailed.")
        content2 = clean_html(raw2)
        char_count2 = count_content_chars(content2)
        print(f"Retry content length: {char_count2} chars")
        if char_count2 > char_count:
            content = content2
            char_count = char_count2
    
    # Build the post JSON
    post = {
        "slug": slug,
        "title": post_spec["title"],
        "excerpt": post_spec["excerpt"],
        "date": "2026-05-16",
        "author": "The Luxury Explorer",
        "tags": post_spec["tags"],
        "readingTime": post_spec["readingTime"],
        "content": content,
        "relatedDestinations": post_spec["relatedDestinations"]
    }
    
    with open(filepath, 'w', encoding='utf-8') as f:
        json.dump(post, f, indent=2, ensure_ascii=False)
    
    print(f"✓ Saved: {filepath} ({char_count} content chars)")
    return True


if __name__ == "__main__":
    for post in POSTS:
        try:
            generate_post(post)
        except Exception as e:
            print(f"✗ Error generating {post['slug']}: {e}")
    
    print("\n\nDone! All posts generated.")
