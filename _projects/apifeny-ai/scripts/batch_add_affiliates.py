#!/usr/bin/env python3
"""
Batch add affiliate link CTAs to blog posts that don't have them.
Uses local Ollama (llama3.2) to analyze each post and match with affiliate tools.
"""

import json, os, re, subprocess, sys, time
from collections import defaultdict

BLOG_DIR = os.path.join(os.path.dirname(os.path.dirname(__file__)), "data/blog")
AFFILIATE_FILE = os.path.join(os.path.dirname(os.path.dirname(__file__)), "data/affiliate-links.json")
STATE_FILE = os.path.join(os.path.dirname(os.path.dirname(__file__)), "scripts/.affiliate_batch_state.json")

# Load affiliate links
with open(AFFILIATE_FILE) as f:
    af_data = json.load(f)

affiliate_links = af_data.get("links", [])
# Build lookup by id and name (lowercase)
affiliate_by_id = {l["id"]: l for l in affiliate_links}
affiliate_by_name_lower = {l["name"].lower(): l for l in affiliate_links}

# Also index by category
affiliates_by_category = defaultdict(list)
for l in affiliate_links:
    affiliates_by_category[l.get("category", "Other")].append(l)

def get_affiliate_slug(tool_id):
    """Get the URL slug for an affiliate tool."""
    l = affiliate_by_id.get(tool_id)
    if not l:
        return None
    url = l.get("url", "")
    if "/api/redirect?tool=" in url:
        return url.split("tool=")[-1]
    # Some have direct URLs - we still want to use them
    if url.startswith("http"):
        return url
    return None

def call_ollama(prompt, model="llama3.2", max_tokens=512):
    """Call local Ollama model."""
    try:
        result = subprocess.run(
            ["ollama", "run", model],
            input=prompt.encode(),
            capture_output=True,
            timeout=120,
        )
        output = result.stdout.decode().strip()
        return output
    except subprocess.TimeoutExpired:
        print("  [Ollama timeout]")
        return None
    except Exception as e:
        print(f"  [Ollama error: {e}]")
        return None

def extract_tools_from_post(content, title, tags):
    """Use Ollama to identify which affiliate tools match this post."""
    # Build a condensed list of available affiliate tools
    tool_list = "\n".join([
        f"- {l['id']}: {l['name']} ({l.get('category','')}) - {l.get('description','')[:80]}"
        for l in affiliate_links
    ])
    
    prompt = f"""You are an AI tools affiliate matcher. Given a blog post, identify which of the available affiliate tools are most relevant.

BLOG POST TITLE: {title}
BLOG POST TAGS: {', '.join(tags)}
BLOG POST SNIPPET: {content[:500]}

AVAILABLE AFFILIATE TOOLS:
{tool_list[:2000]}

TASK: Return ONLY a comma-separated list of tool IDs (like "runway,heygen,canva") for the 2-6 most relevant tools. Return nothing else. If no tools match, return "NONE"."""
    
    result = call_ollama(prompt, max_tokens=128)
    if not result:
        return []
    
    # Parse the result
    result = result.strip()
    if result.upper() == "NONE":
        return []
    
    # Split by comma and clean
    tools = [t.strip().lower() for t in result.replace("\n", ",").split(",")]
    tools = [t for t in tools if t in affiliate_by_id]
    
    # Limit to 6 max
    return tools[:6]

def append_affiliate_ctas(content, tool_ids):
    """Append affiliate link CTAs to blog post content."""
    # Build the CTA buttons HTML
    buttons = []
    for tid in tool_ids:
        l = affiliate_by_id.get(tid)
        if not l:
            continue
        
        name = l["name"]
        url = l["url"]
        
        # Use the redirect URL if available, otherwise direct URL
        if "/api/redirect?tool=" in url:
            href = url
        elif url.startswith("http"):
            href = url
        else:
            href = f"/api/redirect?tool={tid}"
        
        buttons.append(f'<a href="{href}" rel="noopener noreferrer sponsored" target="_blank"><strong>Try {name} free →</strong></a>')
    
    if not buttons:
        return content
    
    # Join with separator
    cta_html = " &nbsp;|&nbsp; ".join(buttons)
    
    # Check if already has affiliate section
    if "/api/redirect?tool=" in content:
        # Already has affiliates - skip
        return content
    
    # Check if it has the closing signature
    closing = '<p><em>— The Apifeny AI Team</em></p>'
    if closing in content:
        # Insert after the closing
        insert_pos = content.rfind(closing) + len(closing)
        new_content = content[:insert_pos] + f'\n\n<p>{cta_html}</p>' + content[insert_pos:]
    else:
        # Append at the end
        new_content = content.rstrip() + f'\n\n{closing}\n<p>{cta_html}</p>'
    
    return new_content

def process_post(filename):
    """Process a single blog post."""
    filepath = os.path.join(BLOG_DIR, filename)
    with open(filepath) as f:
        post = json.load(f)
    
    content = post.get("content", "")
    title = post.get("title", "")
    tags = post.get("tags", [])
    
    # Skip if already has affiliate links
    if "/api/redirect?tool=" in content:
        print(f"  ⏭️ Already has affiliate links")
        return False
    
    print(f"  Analyzing...", end=" ", flush=True)
    tool_ids = extract_tools_from_post(content, title, tags)
    
    if not tool_ids:
        print(f"No relevant tools found")
        return False
    
    print(f"Matching: {', '.join(tool_ids)}")
    
    new_content = append_affiliate_ctas(content, tool_ids)
    if new_content == content:
        print(f"  No change needed")
        return False
    
    post["content"] = new_content
    
    with open(filepath, "w") as f:
        json.dump(post, f, indent=2, ensure_ascii=False)
    
    print(f"  ✅ Added affiliates for: {', '.join(tool_ids)}")
    return True

def main():
    """Main entry point."""
    # Load state
    state = {}
    if os.path.exists(STATE_FILE):
        with open(STATE_FILE) as f:
            state = json.load(f)
    
    # Get all blog posts
    all_posts = sorted([f for f in os.listdir(BLOG_DIR) if f.endswith('.json')])
    
    # Get posts without affiliate links
    to_process = []
    for fname in all_posts:
        filepath = os.path.join(BLOG_DIR, fname)
        with open(filepath) as f:
            content = f.read()
        if "/api/redirect?tool=" not in content:
            to_process.append(fname)
    
    # Check cursor
    cursor = state.get("cursor", "")
    processed_count = state.get("processed", 0)
    skipped_count = state.get("skipped", 0)
    failed_count = state.get("failed", 0)
    
    # Find starting index
    start_idx = None
    for i, fname in enumerate(to_process):
        if fname >= cursor:
            start_idx = i
            break
    if start_idx is None:
        start_idx = 0
    
    print(f"Total blog posts: {len(all_posts)}")
    print(f"Posts needing affiliates: {len(to_process)}")
    print(f"Already processed: {processed_count}")
    print(f"Cursor at: {cursor}")
    print(f"Starting from index: {start_idx} ('{to_process[start_idx] if start_idx < len(to_process) else 'DONE'}')")
    print()
    
    # Process up to 20 posts per run (to stay within timeout)
    batch_size = 20
    end_idx = min(start_idx + batch_size, len(to_process))
    
    updated = 0
    for i in range(start_idx, end_idx):
        fname = to_process[i]
        print(f"[{i+1}/{len(to_process)}] {fname}")
        try:
            result = process_post(fname)
            if result:
                updated += 1
                processed_count += 1
            else:
                skipped_count += 1
        except Exception as e:
            print(f"  ❌ Error: {e}")
            failed_count += 1
        print()
        
        # Update state after each
        state["cursor"] = fname
        state["processed"] = processed_count
        state["skipped"] = skipped_count
        state["failed"] = failed_count
        os.makedirs(os.path.dirname(STATE_FILE), exist_ok=True)
        with open(STATE_FILE, "w") as f:
            json.dump(state, f, indent=2)
    
    print(f"Batch complete! Updated: {updated}")
    print(f"Total processed: {processed_count}, Skipped: {skipped_count}, Failed: {failed_count}")
    
    if end_idx >= len(to_process):
        print("🎉 ALL POSTS DONE!")
        state["cursor"] = "DONE"
        with open(STATE_FILE, "w") as f:
            json.dump(state, f, indent=2)
    else:
        print(f"Next: index {end_idx} → '{to_process[end_idx]}'")

if __name__ == "__main__":
    main()
