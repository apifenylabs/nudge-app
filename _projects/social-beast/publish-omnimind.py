#!/usr/bin/env python3
"""
OmniMind Launch — Auto-Publisher
Publishes to all 5 distribution channels using configured API keys.

Usage:
    python3 publish-omnimind.py              # Publish all channels
    python3 publish-omnimind.py --dry-run     # Preview only
    python3 publish-omnimind.py --channel devto   # Single channel

Requires env vars (set in .env or export):
    DEV_TO_API_KEY
    REDDIT_CLIENT_ID, REDDIT_CLIENT_SECRET, REDDIT_USERNAME, REDDIT_PASSWORD
    CLAWHUB_TOKEN
    TWITTER_API_KEY, TWITTER_API_SECRET, TWITTER_ACCESS_TOKEN, TWITTER_ACCESS_TOKEN_SECRET
"""

import os
import sys
import json
import argparse
from datetime import datetime

# ───── Paths ────────────────────────────────────────────────────────────────

BASE = os.path.dirname(os.path.abspath(__file__))
CONTENT_DIR = os.path.join(BASE, "generated-content", "omnimind-launch")
LOG_PATH = os.path.join(BASE, "publish-log.txt")

# ───── Helpers ──────────────────────────────────────────────────────────────

def log(platform, status, message=""):
    ts = datetime.utcnow().isoformat()
    line = f"[{ts}] [{platform}] [{status}] {message}"
    print(line)
    try:
        with open(LOG_PATH, "a") as f:
            f.write(line + "\n")
    except:
        pass

def read_content(path):
    full = os.path.join(CONTENT_DIR, path)
    if not os.path.exists(full):
        return None
    with open(full) as f:
        return f.read()

def env_or_raise(key):
    val = os.environ.get(key)
    if not val:
        raise ValueError(f"Missing required env var: {key}")
    return val

# ───── 1. dev.to ────────────────────────────────────────────────────────────

def publish_devto(dry_run=False):
    print("\n━━━ 1. dev.to Blog Post ━━━")
    
    content = read_content("blog/why-i-built-sovereign-memory-control-plane.md")
    if not content:
        return log("devto", "FAIL", "Content file not found")
    
    # Build front matter + body
    article = {
        "article": {
            "title": "Why I Built a Sovereign Memory Control Plane for OpenClaw",
            "published": True,
            "description": "How I replaced cloud memory APIs with a 100% local, three-database memory layer for AI agents — using LanceDB, Kuzu, SQLite, and a nightly self-evolution worker.",
            "tags": ["openclaw", "ai", "memory", "selfhosted", "opensource"],
            "body_markdown": content,
            "canonical_url": "https://github.com/apifenylabs/omnimind",
            "series": "OmniMind",
        }
    }
    
    if dry_run:
        print(f"✅ [DRY RUN] Would post to dev.to")
        print(f"   Title: {article['article']['title']}")
        print(f"   Tags: {', '.join(article['article']['tags'])}")
        return log("devto", "DRY_RUN")
    
    api_key = os.environ.get("DEV_TO_API_KEY")
    if not api_key:
        return log("devto", "SKIP", "No DEV_TO_API_KEY env var")
    
    import requests
    resp = requests.post(
        "https://dev.to/api/articles",
        headers={
            "api-key": api_key,
            "Content-Type": "application/json",
        },
        json=article,
    )
    if resp.status_code in (200, 201):
        data = resp.json()
        url = data.get("url", "unknown")
        log("devto", "PUBLISHED", url)
        return url
    else:
        log("devto", "FAIL", f"HTTP {resp.status_code}: {resp.text[:200]}")
        return None

# ───── 2 & 4. Reddit ───────────────────────────────────────────────────────

def publish_reddit(subreddit, content_file, title, dry_run=False):
    print(f"\n━━━ {'2' if 'selfhosted' in subreddit else '4'}. r/{subreddit} ━━━")
    
    content = read_content(content_file)
    if not content:
        return log(f"reddit/{subreddit}", "FAIL", "Content file not found")
    
    if dry_run:
        print(f"✅ [DRY RUN] Would post to r/{subreddit}")
        print(f"   Title: {title}")
        print(f"   Content preview: {content[:100]}...")
        return log(f"reddit/{subreddit}", "DRY_RUN")
    
    client_id = os.environ.get("REDDIT_CLIENT_ID")
    client_secret = os.environ.get("REDDIT_CLIENT_SECRET")
    username = os.environ.get("REDDIT_USERNAME")
    password = os.environ.get("REDDIT_PASSWORD")
    
    if not all([client_id, client_secret, username, password]):
        return log(f"reddit/{subreddit}", "SKIP", "Missing Reddit credentials")
    
    import requests
    
    # Get access token
    auth = requests.auth.HTTPBasicAuth(client_id, client_secret)
    data = {"grant_type": "password", "username": username, "password": password}
    headers = {"User-Agent": "OmniMind-Launch/1.0"}
    resp = requests.post("https://www.reddit.com/api/v1/access_token",
                         auth=auth, data=data, headers=headers)
    if resp.status_code != 200:
        return log(f"reddit/{subreddit}", "FAIL", f"Auth: {resp.status_code}")
    
    token = resp.json().get("access_token")
    headers["Authorization"] = f"bearer {token}"
    
    # Submit post
    post_data = {
        "title": title,
        "kind": "self",
        "sr": subreddit,
        "text": content,
        "api_type": "json",
    }
    resp = requests.post("https://oauth.reddit.com/api/submit",
                         data=post_data, headers=headers)
    if resp.status_code == 200:
        result = resp.json()
        if result.get("json", {}).get("errors"):
            log(f"reddit/{subreddit}", "FAIL", str(result["json"]["errors"]))
        else:
            url = result["json"]["data"]["url"]
            log(f"reddit/{subreddit}", "PUBLISHED", url)
            return url
    else:
        log(f"reddit/{subreddit}", "FAIL", f"HTTP {resp.status_code}: {resp.text[:200]}")
    return None

# ───── 3. OpenClaw Plugins Directory (ClawHub) ──────────────────────────

def publish_clawhub(dry_run=False):
    print("\n━━━ 3. OpenClaw Plugins Directory (ClawHub) ━━━")
    
    if dry_run:
        print("✅ [DRY RUN] Would publish to ClawHub")
        return log("clawhub", "DRY_RUN")
    
    token = os.environ.get("CLAWHUB_TOKEN")
    if not token:
        return log("clawhub", "SKIP", "No CLAWHUB_TOKEN env var")
    
    import subprocess
    result = subprocess.run(
        ["clawhub", "auth", "login", "--token", token, "--no-browser"],
        capture_output=True, text=True
    )
    if result.returncode != 0:
        log("clawhub", "FAIL", f"Login: {result.stderr[:200]}")
        return None
    
    # Publish the plugin from its repo directory
    repo_dir = os.path.expanduser("~/workspaces/omnimind")
    if not os.path.exists(repo_dir):
        return log("clawhub", "FAIL", f"Repo not found at {repo_dir}")
    
    result = subprocess.run(
        ["clawhub", "package", "publish", repo_dir],
        capture_output=True, text=True, cwd=repo_dir
    )
    if result.returncode == 0:
        log("clawhub", "PUBLISHED", result.stdout[:200])
        return "Published"
    else:
        log("clawhub", "FAIL", result.stderr[:200])
        return None

# ───── 5. Twitter/X ─────────────────────────────────────────────────────

def publish_twitter(dry_run=False):
    print("\n━━━ 5. Twitter/X Launch Thread ━━━")
    
    content = read_content("twitter/launch-thread.txt")
    if not content:
        return log("twitter", "FAIL", "Content file not found")
    
    # Parse thread (each section separated by blank lines or numbered 1/, 2/, etc.)
    tweets = []
    for line in content.split("\n"):
        if line.strip().startswith(("1/", "2/", "3/", "4/", "5/", "6/", "7/", "8/", "9/", "10/")):
            if tweets:
                tweets.append(current.strip())
            current = line
        elif "=== MAIN LAUNCH THREAD" in line or "=== Post on day" in line or "=== Format" in line:
            continue
        else:
            current = (current + "\n" + line) if 'current' in dir() else line
    
    if 'current' in dir() and current.strip():
        tweets.append(current.strip())
    
    # Actually this parsing is fragile. Use the thread structure directly.
    # Simpler: split by numbered newlines
    import re
    sections = re.split(r'\n\d+/\s*\n', content)
    # Filter out header lines
    tweets = [s.strip() for s in sections if len(s.strip()) > 10 and "=== MAIN" not in s]
    
    if dry_run:
        print(f"✅ [DRY RUN] Would post thread with {len(tweets)} tweets")
        for i, t in enumerate(tweets[:3]):
            print(f"   Tweet {i+1}: {t[:80]}...")
        if len(tweets) > 3:
            print(f"   ... and {len(tweets)-3} more")
        log("twitter", "DRY_RUN", f"{len(tweets)} tweets")
        return
    
    api_key = os.environ.get("TWITTER_API_KEY")
    api_secret = os.environ.get("TWITTER_API_SECRET")
    access_token = os.environ.get("TWITTER_ACCESS_TOKEN")
    access_secret = os.environ.get("TWITTER_ACCESS_TOKEN_SECRET")
    
    if not all([api_key, api_secret, access_token, access_secret]):
        return log("twitter", "SKIP", "Missing Twitter credentials")
    
    import tweepy
    client = tweepy.Client(
        consumer_key=api_key,
        consumer_secret=api_secret,
        access_token=access_token,
        access_token_secret=access_secret,
    )
    
    # Post as a thread
    previous_id = None
    for i, tweet_text in enumerate(tweets):
        try:
            if previous_id:
                response = client.create_tweet(text=tweet_text[:280],
                                               in_reply_to_tweet_id=previous_id)
            else:
                response = client.create_tweet(text=tweet_text[:280])
            
            if response.data:
                previous_id = response.data["id"]
                log("twitter", "TWEET", f"{i+1}/{len(tweets)}: {response.data['id']}")
        except Exception as e:
            log("twitter", "FAIL", f"Tweet {i+1}: {e}")
            return None
    
    log("twitter", "THREAD_DONE", f"{len(tweets)} tweets posted")
    return "Thread posted"

# ───── Main ─────────────────────────────────────────────────────────────────

def main():
    parser = argparse.ArgumentParser(description="OmniMind Launch Auto-Publisher")
    parser.add_argument("--dry-run", action="store_true", help="Preview only, no actual posting")
    parser.add_argument("--channel", choices=["devto", "reddit-selfhosted", "reddit-openclaw", "clawhub", "twitter", "all"],
                       default="all", help="Specific channel to publish")
    args = parser.parse_args()
    
    print(f"{'='*60}")
    print(f"OmniMind Launch Distribution — {'DRY RUN' if args.dry_run else 'LIVE PUBLISH'}")
    print(f"Date: {datetime.utcnow().isoformat()}")
    print(f"{'='*60}")
    
    results = {}
    
    if args.channel in ("all", "devto"):
        results["devto"] = publish_devto(args.dry_run)
    
    if args.channel in ("all", "reddit-selfhosted"):
        results["reddit/selfhosted"] = publish_reddit(
            "selfhosted",
            "reddit/r-selfhosted.txt",
            "I got tired of my AI agents forgetting everything, so I built a memory layer that runs entirely on my server",
            args.dry_run,
        )
    
    if args.channel in ("all", "clawhub"):
        results["clawhub"] = publish_clawhub(args.dry_run)
    
    if args.channel in ("all", "reddit-openclaw"):
        results["reddit/openclaw"] = publish_reddit(
            "openclaw",
            "reddit/r-openclaw.txt", 
            "I built a memory layer for OpenClaw agents that stores conversations in 3 databases and evolves overnight",
            args.dry_run,
        )
    
    if args.channel in ("all", "twitter"):
        results["twitter"] = publish_twitter(args.dry_run)
    
    # Summary
    print(f"\n{'='*60}")
    print("SUMMARY")
    print(f"{'='*60}")
    for channel, result in results.items():
        status = "✅" if result and "SKIP" not in str(result) else "⏳"
        print(f"  {status} {channel}: {result or 'Not published'}")

if __name__ == "__main__":
    main()
