#!/usr/bin/env python3
"""Generate blog posts - aggressive ANSI cleaning."""
import json, subprocess, os, sys, re, shutil

BLOG = "/home/captain/.openclaw/workspace/kids-activities-asia/data/blog"
os.makedirs(BLOG, exist_ok=True)

def clean_ollama_output(text):
    """Remove ALL ANSI escape sequences, cursor movements, etc."""
    # Remove ESC[ sequences - cursor movement, SGR codes
    text = re.sub(r'\x1B\[[\d;]*[A-Za-z]', '', text)
    # Remove ESC sequences without [
    text = re.sub(r'\x1B[\x40-\x5F]', '', text)
    # Remove any \x1B bytes
    text = text.replace('\x1B', '')
    # Remove bare CSI sequences
    text = re.sub(r'\[\d+[ABCDEFGHJKST]', '', text)
    text = re.sub(r'\[\d+;\d+[Hf]', '', text)
    text = re.sub(r'\[\??\d+[hl]', '', text)
    # Remove OSC sequences
    text = re.sub(r'\](?:[\d;]*(?:\x07|\x1B\\)|)', '', text)
    # Remove remaining escape byte artifacts
    text = re.sub(r'[\x00-\x08\x0E-\x1F\x7F]', '', text)
    # Fix duplicate words caused by cursor-back-then-rewrite artifacts
    # Pattern: word + remaining cursor artifacts + same word
    text = re.sub(r'(\w{2,})\s*\n\s*\1\b', r'\1', text)
    text = re.sub(r'(\w{2,})\s{2,}\1\b', r'\1', text)
    return text.strip()

def extract_json(raw_text):
    """Extract valid JSON from text that may have artifacts."""
    # Crude but effective: find the outermost { ... } matching brace
    # that contains "slug" and "content"
    cleaned = clean_ollama_output(raw_text)
    
    # Try direct parse first
    try:
        return json.loads(cleaned)
    except json.JSONDecodeError:
        pass
    
    # Find JSON structure: look for first { and then find matching }
    start = cleaned.find('{')
    if start < 0:
        return None
    
    depth = 0
    for i in range(start, len(cleaned)):
        if cleaned[i] == '{':
            depth += 1
        elif cleaned[i] == '}':
            depth -= 1
            if depth == 0:
                candidate = cleaned[start:i+1]
                try:
                    return json.loads(candidate)
                except json.JSONDecodeError:
                    # Continue searching deeper
                    pass
    
    return None

def gen(slug, title, excerpt, tags, reading_time, content_prompt):
    output_example = json.dumps({
        "slug": slug,
        "title": title,
        "excerpt": excerpt,
        "date": "May 13, 2026",
        "content": "<p>Full HTML content here...</p>",
        "tags": tags,
        "author": "Kids Activities Asia Team",
        "readingTime": reading_time,
        "imageUrl": None
    })
    
    prompt = content_prompt + "\n\nOUTPUT FORMAT - Return ONLY valid JSON, no markdown or code fences. Make sure there are NO duplicate words or missing spaces:\n" + output_example

    prompt_file = f"/tmp/prompt_{slug}.txt"
    with open(prompt_file, "w") as f:
        f.write(prompt)
    
    result = subprocess.run(
        ["ollama", "run", "llama3.2"],
        stdin=open(prompt_file),
        capture_output=True,
        timeout=300
    )
    raw = result.stdout.decode("utf-8", errors="replace")
    
    # Log raw
    with open(f"/tmp/ollama_{slug}.txt", "w") as f:
        f.write(repr(raw))
    
    data = extract_json(raw)
    
    if data and data.get("content"):
        # Clean the content to fix any remaining artifacts
        content = data["content"]
        content = re.sub(r'[\x00-\x08\x0E-\x1F\x7F]', '', content)
        
        output = {
            "slug": slug,
            "title": data.get("title", title),
            "excerpt": data.get("excerpt", excerpt),
            "date": "May 13, 2026",
            "content": content,
            "tags": data.get("tags", tags),
            "author": "Kids Activities Asia Team",
            "readingTime": data.get("readingTime", reading_time),
            "imageUrl": None
        }
        filepath = f"{BLOG}/{slug}.json"
        with open(filepath, "w") as f:
            json.dump(output, f, indent=2, ensure_ascii=False)
        print(f"OK: {slug} ({len(content)} chars) -> {filepath}")
        return True
    else:
        print(f"FAIL: {slug}")
        print(f"Cleaned text first 1500 chars:")
        print(clean_ollama_output(raw)[:1500])
        return False

# Post 1: Tokyo
t1 = """You are a professional travel writer. Write a detailed 1800-word HTML blog post about Tokyo with kids.

Use these h2 sections:
<h2>Getting Around Tokyo with a Stroller</h2>
<h2>Top Kid-Friendly Attractions</h2>
<h2>Kid-Friendly Restaurants in Tokyo</h2>
<h2>Best Family Hotels in Tokyo</h2>
<h2>Practical Tips for Parents</h2>
<h2>Sample 5-Day Family Itinerary</h2>

Include specific details: Shibuya station elevators, Shinjuku station maps, teamLab Planets (¥3,200 adult/¥1,000 child), Tokyo Disneyland (¥7,900), Ueno Zoo (¥600/free under 12), Pokemon Cafe, Ninja Akasaka, Hotel Gracery Shinjuku, Suica cards, convenience stores, Yoyogi Park playground.

Include affiliate links: teamLab Planets on Klook, Disneyland on Klook, Narita Express on Klook.

Output ONLY valid JSON. Do not duplicate words."""

print("Running post 1: Tokyo with Kids")
if not gen("tokyo-with-kids-complete-family-guide", "Tokyo with Kids: The Complete Family Travel Guide — 2026", "Planning a family trip to Tokyo? From navigating the world-famous train system with a stroller to discovering the city's best kid-approved attractions, restaurants, and parks — this is everything you need to know for an unforgettable family adventure in Japan's capital.", ["tokyo","japan","family-travel-guide","kids-activities","stroller-travel"], 12, t1):
    sys.exit(1)
