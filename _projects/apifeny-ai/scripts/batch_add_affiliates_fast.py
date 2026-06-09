#!/usr/bin/env python3
"""
Fast batch affiliate link inserter — keyword-matching approach.
No LLM calls needed. Maps blog post categories/tools → affiliate tools.
"""

import json, os, re, sys
from collections import defaultdict

BLOG_DIR = os.path.join(os.path.dirname(os.path.dirname(__file__)), "data/blog")
AFFILIATE_FILE = os.path.join(os.path.dirname(os.path.dirname(__file__)), "data/affiliate-links.json")

# Load affiliate links
with open(AFFILIATE_FILE) as f:
    af_data = json.load(f)
affiliate_links = af_data.get("links", [])

# Build comprehensive keyword → tool_id mapping
KEYWORD_TO_TOOL = {
    # AI Chatbots & Assistants
    "chatgpt": ["chatgpt"],
    "chatbot": ["chatgpt", "tidio", "intercom-ai"],
    "gpt": ["chatgpt"],
    "openai": ["chatgpt"],
    "assistant": ["chatgpt", "jasper", "copy-ai"],
    
    # Writing & Content
    "writing": ["jasper", "copy-ai", "writesonic", "rytr"],
    "content": ["jasper", "copy-ai", "writesonic"],
    "copywriting": ["jasper", "copy-ai"],
    "blog": ["jasper", "writesonic"],
    "seo": ["surferseo", "semrush"],
    "email": ["jasper", "writesonic", "mailchimp"],
    
    # Design & Image
    "design": ["canva-ai", "midjourney", "leonardo-ai"],
    "image": ["midjourney", "leonardo-ai", "canva-ai"],
    "photo": ["midjourney", "leonardo-ai", "canva-ai"],
    "graphic": ["canva-ai", "midjourney"],
    "illustration": ["midjourney", "leonardo-ai"],
    "branding": ["canva-ai", "midjourney"],
    "logo": ["canva-ai"],
    "midjourney": ["midjourney"],
    "canva": ["canva-ai"],
    "dalle": ["openai"],
    
    # Video & Animation
    "video": ["runway", "synthesia", "heygen", "pictory-ai", "invideo-ai", "capcut", "pika"],
    "animation": ["runway", "pictory-ai"],
    "edit": ["runway", "capcut"],
    "youtube": ["runway", "pictory-ai", "descript"],
    "tiktok": ["capcut", "runway"],
    "avatar": ["synthesia", "heygen"],
    "presentation": ["synthesia", "gamma"],
    "voiceover": ["elevenlabs", "murf-ai", "wellsaid-labs"],
    "subtitle": ["descript"],
    "screen": ["descript", "runway"],
    
    # Audio & Music
    "audio": ["elevenlabs", "murf-ai", "wellsaid-labs"],
    "voice": ["elevenlabs", "murf-ai", "play-ht", "wellsaid-labs"],
    "music": ["suno-ai", "udio"],
    "podcast": ["elevenlabs", "descript", "murf-ai"],
    "speech": ["elevenlabs", "murf-ai", "play-ht"],
    "text-to-speech": ["elevenlabs", "murf-ai"],
    "tts": ["elevenlabs", "murf-ai", "play-ht"],
    "elevenlabs": ["elevenlabs"],
    
    # Productivity
    "productivity": ["notion-ai", "motion-app", "timely"],
    "note": ["notion-ai"],
    "document": ["notion-ai"],
    "wiki": ["notion-ai"],
    "knowledge": ["notion-ai"],
    "meeting": ["notion-ai", "motion-app", "otter-ai"],
    "calendar": ["motion-app", "timely"],
    "schedule": ["motion-app", "timely"],
    "task": ["motion-app", "notion-ai", "timely"],
    "project": ["notion-ai", "motion-app"],
    "notion": ["notion-ai"],
    
    # No-Code & Automation
    "automation": ["zapier", "make", "n8n"],
    "workflow": ["zapier", "make", "n8n"],
    "no-code": ["bubble", "airtable", "zapier"],
    "low-code": ["bubble", "airtable", "zapier"],
    "app builder": ["bubble", "airtable"],
    "database": ["airtable", "notion-ai"],
    "form": ["airtable", "typeform", "paperform"],
    "zapier": ["zapier"],
    "make": ["make"],
    "n8n": ["n8n"],
    "bubble": ["bubble"],
    "airtable": ["airtable"],
    
    # Code & Development
    "coding": ["github-copilot", "cursor", "devin", "replit-agent"],
    "code": ["github-copilot", "cursor", "devin", "replit-agent"],
    "programming": ["github-copilot", "cursor", "devin"],
    "developer": ["github-copilot", "cursor", "devin", "replit-agent"],
    "ide": ["cursor", "github-copilot"],
    "github": ["github-copilot"],
    "deployment": ["vercel-ai", "devin"],
    "replit": ["replit-agent"],
    "cursor": ["cursor"],
    "copilot": ["github-copilot"],
    "devin": ["devin"],
    
    # Customer Support
    "customer support": ["intercom-ai", "tidio", "zendesk-ai"],
    "customer service": ["intercom-ai", "tidio", "zendesk-ai"],
    "help desk": ["intercom-ai", "zendesk-ai", "tidio"],
    "ticket": ["zendesk-ai", "intercom-ai"],
    "live chat": ["tidio", "intercom-ai"],
    "intercom": ["intercom-ai"],
    "zendesk": ["zendesk-ai"],
    "tidio": ["tidio"],
    
    # Marketing & SEO
    "marketing": ["semrush", "surferseo", "mailchimp"],
    "seo": ["semrush", "surferseo"],
    "analytics": ["semrush", "google-analytics"],
    "email marketing": ["mailchimp"],
    "newsletter": ["mailchimp"],
    "semrush": ["semrush"],
    "surferseo": ["surferseo"],
    "mailchimp": ["mailchimp"],
    
    # Research & Analysis
    "research": ["perplexity", "notion-ai"],
    "perplexity": ["perplexity"],
    "data analysis": ["notion-ai", "airtable", "google-analytics"],
    
    # Language & Translation
    "translation": ["deepl"],
    "language": ["deepl"],
    "deepl": ["deepl"],
    "multilingual": ["deepl"],
    
    # Education & Learning
    "education": ["khanmigo", "duolingo", "quizlet"],
    "learning": ["khanmigo", "duolingo", "quizlet"],
    "student": ["khanmigo", "quizlet"],
    "tutor": ["khanmigo"],
    "duolingo": ["duolingo"],
    "quizlet": ["quizlet"],
    
    # AI Agents / LLM Platforms
    "agent": ["langchain", "hugging-face", "crewai"],
    "llm": ["langchain", "hugging-face", "deepseek"],
    "model": ["hugging-face", "deepseek"],
    "framework": ["langchain", "crewai"],
    "langchain": ["langchain"],
    "hugging face": ["hugging-face"],
    "deepseek": ["deepseek"],
    "open source": ["hugging-face", "deepseek", "langchain"],
    
    # Data & BI
    "data": ["tableau", "airtable", "notion-ai"],
    "dashboard": ["tableau", "google-analytics"],
    "tableau": ["tableau"],
    
    # Specific platforms
    "shopee": ["zapier", "make"],
    "lazada": ["zapier", "make"],
    "whatsapp": ["twilio", "zapier"],
    "line": ["zapier"],
}

# Tag-based matching - map common blog tags to tools
TAG_TO_TOOLS = {
    "writing": ["jasper", "copy-ai", "writesonic", "rytr"],
    "copywriting": ["jasper", "copy-ai"],
    "content-creation": ["jasper", "canva-ai", "runway", "descript"],
    "image-generation": ["midjourney", "leonardo-ai", "canva-ai"],
    "video-editing": ["runway", "capcut", "pictory-ai"],
    "video-generation": ["runway", "synthesia", "heygen", "pika"],
    "video-creation": ["runway", "synthesia", "heygen", "pictory-ai"],
    "text-to-video": ["runway", "synthesia", "pika"],
    "voice-cloning": ["elevenlabs", "murf-ai", "play-ht"],
    "translation": ["deepl"],
    "language-tools": ["deepl"],
    "seo": ["semrush", "surferseo"],
    "email-marketing": ["mailchimp"],
    "marketing": ["semrush", "mailchimp", "canva-ai"],
    "social-media": ["canva-ai", "buffer", "hypefury"],
    "productivity": ["notion-ai", "motion-app", "timely"],
    "automation": ["zapier", "make", "n8n"],
    "no-code": ["bubble", "airtable", "zapier", "make"],
    "coding": ["github-copilot", "cursor", "devin", "replit-agent"],
    "development": ["github-copilot", "cursor", "devin", "replit-agent"],
    "programming": ["github-copilot", "cursor", "devin"],
    "ai-agents": ["langchain", "hugging-face", "crewai", "replit-agent"],
    "agentic-workflows": ["langchain", "crewai", "n8n"],
    "chatbots": ["chatgpt", "intercom-ai", "tidio"],
    "customer-support": ["intercom-ai", "tidio", "zendesk-ai"],
    "customer-service": ["intercom-ai", "tidio", "zendesk-ai"],
    "design": ["canva-ai", "midjourney", "leonardo-ai"],
    "ai-design": ["canva-ai", "midjourney", "leonardo-ai"],
    "education": ["khanmigo", "duolingo", "quizlet"],
    "edtech": ["khanmigo", "duolingo", "quizlet"],
    "note-taking": ["notion-ai", "otter-ai"],
    "project-management": ["notion-ai", "motion-app"],
    "voice-ai": ["elevenlabs", "murf-ai"],
    "audio": ["elevenlabs", "murf-ai", "suno-ai"],
    "podcasting": ["descript", "elevenlabs", "murf-ai"],
    "data-analysis": ["tableau", "notion-ai", "airtable"],
    "database": ["airtable", "notion-ai"],
    "analytics": ["semrush", "google-analytics", "tableau"],
    "startup": ["bubble", "zapier", "notion-ai"],
    "solopreneur": ["zapier", "notion-ai", "canva-ai", "jasper"],
    "small-business": ["zapier", "notion-ai", "canva-ai", "mailchimp"],
    "freelance": ["notion-ai", "canva-ai", "zapier", "descript"],
    "scheduling": ["motion-app", "timely"],
    "comparison": ["chatgpt", "claude", "gemini", "perplexity"],
    "ai-tools": ["chatgpt", "perplexity", "notion-ai"],
    "deepseek": ["deepseek"],
    "claude": ["anthropic"],
    "gemini": ["gemini"],
    "canva": ["canva-ai"],
    "elevenlabs": ["elevenlabs"],
    "midjourney": ["midjourney"],
    "runway": ["runway"],
    "transcription": ["descript", "otter-ai", "elevenlabs"],
    "market-research": ["perplexity", "semrush"],
    "accounting": ["deel", "gusto", "xero"],
    "finance": ["deel", "gusto"],
}

def extract_keywords_from_content(content, title, tags):
    """Extract keywords from post content for matching."""
    text = (title + " " + " ".join(tags) + " " + content[:3000]).lower()
    # Clean HTML
    text = re.sub(r'<[^>]+>', ' ', text)
    text = re.sub(r'[^a-z0-9\s-]', ' ', text)
    return text

def match_tools(title, tags, content):
    """Match blog post to affiliate tools using keyword/tag matching."""
    matched_ids = set()
    text = extract_keywords_from_content(content, title, tags)
    
    # 1. Match by tags first (highest confidence)
    for tag in tags:
        tag_lower = tag.lower()
        if tag_lower in TAG_TO_TOOLS:
            for tid in TAG_TO_TOOLS[tag_lower]:
                matched_ids.add(tid)
    
    # 2. Match by keywords in title
    title_lower = title.lower()
    for keyword, tool_ids in KEYWORD_TO_TOOL.items():
        if keyword in title_lower:
            for tid in tool_ids:
                matched_ids.add(tid)
    
    # 3. Match by keywords in content (sample first 3000 chars)
    for keyword, tool_ids in KEYWORD_TO_TOOL.items():
        if keyword in text and keyword not in title_lower:
            for tid in tool_ids:
                matched_ids.add(tid)
    
    # 4. Check for specific tool names in content
    for af in affiliate_links:
        name_lower = af["name"].lower()
        tool_id = af["id"]
        if name_lower in text:
            matched_ids.add(tool_id)
        # Also check tool id
        if tool_id.replace("-", " ") in text:
            matched_ids.add(tool_id)
    
    # Limit to 6 max, prioritize those in the affiliate file
    valid = [tid for tid in matched_ids if tid in {l["id"] for l in affiliate_links}]
    return valid[:6]

def append_affiliate_ctas(content, tool_ids):
    """Append affiliate link CTAs to blog post content."""
    if not tool_ids:
        return content
    
    # Check if already has affiliate section
    if "/api/redirect?tool=" in content:
        return content
    
    # Build lookup
    af_map = {l["id"]: l for l in affiliate_links}
    
    buttons = []
    for tid in tool_ids:
        l = af_map.get(tid)
        if not l:
            continue
        
        name = l["name"]
        url = l["url"]
        
        if "/api/redirect?tool=" in url:
            href = url
        elif url.startswith("http"):
            href = url
        else:
            href = f"/api/redirect?tool={tid}"
        
        buttons.append(f'<a href="{href}" rel="noopener noreferrer sponsored" target="_blank"><strong>Try {name} free →</strong></a>')
    
    if not buttons:
        return content
    
    cta_html = " &nbsp;|&nbsp; ".join(buttons)
    
    # Check if it has the closing signature
    closing = '<p><em>— The Apifeny AI Team</em></p>'
    closing_variants = [
        '<p><em>— The Apifeny AI Team</em></p>',
        '<p><em>— Apifeny AI Team</em></p>',
        '<p><em>- The Apifeny AI Team</em></p>',
    ]
    
    insert_pos = -1
    for variant in closing_variants:
        idx = content.rfind(variant)
        if idx >= 0:
            insert_pos = idx + len(variant)
            break
    
    if insert_pos >= 0:
        new_content = content[:insert_pos] + f'\n\n<p>{cta_html}</p>' + content[insert_pos:]
    else:
        # Append at the end
        new_content = content.rstrip() + f'\n\n<p><em>— The Apifeny AI Team</em></p>\n<p>{cta_html}</p>'
    
    return new_content

def main():
    all_posts = sorted([f for f in os.listdir(BLOG_DIR) if f.endswith('.json')])
    
    # Separate posts with and without affiliates
    needs_affiliates = []
    for fname in all_posts:
        filepath = os.path.join(BLOG_DIR, fname)
        with open(filepath) as f:
            content = f.read()
        if "/api/redirect?tool=" not in content:
            needs_affiliates.append(fname)
    
    print(f"Total blog posts: {len(all_posts)}")
    print(f"Posts needing affiliates: {len(needs_affiliates)}")
    print(f"Available affiliate tools: {len(affiliate_links)}")
    print()
    
    updated = 0
    no_match = 0
    
    for fname in needs_affiliates:
        filepath = os.path.join(BLOG_DIR, fname)
        with open(filepath) as f:
            post = json.load(f)
        
        title = post.get("title", "")
        tags = post.get("tags", [])
        content = post.get("content", "")
        
        print(f"  {fname[:45]:45s}", end=" ", flush=True)
        
        tool_ids = match_tools(title, tags, content)
        
        if not tool_ids:
            print("— no match")
            no_match += 1
            continue
        
        new_content = append_affiliate_ctas(content, tool_ids)
        if new_content == content:
            print("— no change")
            continue
        
        post["content"] = new_content
        with open(filepath, "w") as f:
            json.dump(post, f, indent=2, ensure_ascii=False)
        
        print(f"✅ {', '.join(tool_ids)}")
        updated += 1
    
    print()
    print(f"Results: {updated} updated, {no_match} no match")
    print(f"Remaining without affiliates: {len(needs_affiliates) - updated}")

if __name__ == "__main__":
    main()
