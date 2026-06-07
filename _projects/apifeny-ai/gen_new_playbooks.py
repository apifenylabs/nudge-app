import json, os, requests, re

# SECURITY: Secret read from environment ONLY — NEVER hardcode here.
# Set DEEPSEEK_API_KEY in .env.local (gitignored) or environment.
DEEPSEEK_KEY = os.environ.get("DEEPSEEK_API_KEY", "")

def ask_deepseek(prompt, model="deepseek-chat", max_tokens=4096):
    headers = {"Content-Type": "application/json", "Authorization": "Bearer " + DEEPSEEK_KEY}
    payload = {"model": model, "messages": [{"role": "user", "content": prompt}], "max_tokens": max_tokens, "temperature": 0.7}
    r = requests.post("https://api.deepseek.com/chat/completions", headers=headers, json=payload, timeout=120)
    r.raise_for_status()
    return r.json()["choices"][0]["message"]["content"]

def extract_json(text):
    text = re.sub(r'```(?:typescript|javascript|ts|js)?\s*', '', text)
    start = text.find('{')
    end = text.rfind('}')
    if start < 0 or end < start:
        return None
    json_str = text[start:end+1]
    json_str = re.sub(r',\s*}', '}', json_str)
    json_str = re.sub(r',\s*]', ']', json_str)
    try:
        return json.loads(json_str)
    except json.JSONDecodeError as e:
        print("JSON error:", e)
        return None

# Read existing playbooks
with open("/home/captain/.openclaw/workspace/apifeny-ai/lib/playbooks.ts") as f:
    existing = f.read()

insert_point = existing.rfind("];")
print(f"Insert point: char {insert_point}")
print(f"Existing playbooks count: {existing.count('slug:')}")

# Generate 3 playbooks via DeepSeek
prompts = [
    # Playbook 1: AI Image Generation
    """You are generating a TypeScript playbook entry for apifeny.ai, an AI tools directory.

Generate ONLY the playbook object. No TypeScript type, no const declaration. Just the object.

Topics: AI Image Generation for Marketing - using DALL-E, Midjourney, Stable Diffusion for marketing visuals.

Required interface:
```
{
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  related_tool_slugs: string[];
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  read_time_minutes: number;
  icon: string (emoji);
  gradient: string (Tailwind gradient like 'from-pink-500/30 to-purple-500/20');
  steps: { title: string; description: string; tip?: string }[];
  pro_tips: string[];
  common_mistakes?: { mistake: string; fix: string }[];
  pipeline_stage: string (one of: 'idea' | 'research' | 'coding' | 'content' | 'marketing' | 'deployment' | 'planning' | 'review');
  revenue_impact?: string;
  real_results?: { metric: string; value: string; description: string }[];
}
```

Output ONLY the object. Use TypeScript format (single quotes). slug: 'ai-image-generation-marketing'. Include 5 steps.""",

    # Playbook 2: AI Customer Support
    """Generate ONLY a TypeScript playbook object (no declaration, no type):

slug: 'ai-customer-support-automation'
title: 'AI Customer Support Automation'
description: about building AI chatbots and ticket routing
difficulty: 'Intermediate'
pipeline_stage: 'deployment'
icon: '🤖'

Format exactly as TypeScript object with single quotes. Include 5 steps, 3 pro_tips, common_mistakes, real_results.""",

    # Playbook 3: AI Email Marketing
    """Generate ONLY a TypeScript playbook object:

slug: 'ai-email-marketing-campaign'
title: 'AI Email Marketing Campaigns'
subtitle: 'Write, segment, and optimize email campaigns with AI'
difficulty: 'Beginner'
pipeline_stage: 'marketing'
icon: '📧'

TypeScript format with single quotes. Include 5 steps, 3 pro_tips, revenue_impact."""
]

new_entries = []
for i, prompt in enumerate(prompts):
    print(f"\n--- Generating playbook {i+1} ---")
    resp = ask_deepseek(prompt, max_tokens=3000)
    print(f"Response: {len(resp)} chars")
    entry_text = resp.strip()
    entry_text = re.sub(r'^```.*?\n', '', entry_text)
    entry_text = re.sub(r'\n```$', '', entry_text)
    new_entries.append(entry_text)

# Build new file
before = existing[:insert_point]
after = existing[insert_point:]

new_playbooks_section = "\n" + "\n".join(new_entries) + "\n"

new_content = before + new_playbooks_section + after

with open("/home/captain/.openclaw/workspace/apifeny-ai/lib/playbooks.ts", "w") as f:
    f.write(new_content)

print(f"\nWritten! New playbook count: {new_content.count('slug:')}")
print("SUCCESS")
