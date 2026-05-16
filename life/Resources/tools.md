# Tools — LLM & Infrastructure Evaluations

## Primary Model Stack

| Level | Model | Cost | When to Use |
|-------|-------|------|-------------|
| **Default** | DeepSeek-chat | ~$0.01/100K tokens | 80%+ of work — coding, writing, SEO, product, testing |
| **Research** | Gemini 2.5 Flash | Free tier | Trend scanning, competitor analysis, data gathering |
| **Simple** | Ollama local (Qwen3-Coder) | Free (electricity) | Easy tasks, formatting, simple transforms |
| **Review** | Claude Sonnet | ~$15/M tokens | Only after 2 DeepSeek failures + step 4 condition |
| **Sign-off** | Claude Opus | ~$30/M tokens | Never without explicit Chris approval |

## Critical Rules
- **Ollama models MUST use "ollama:" prefix** — never send local models to cloud APIs
- **If Gemini errors (429/quota)** → skip immediately to Ollama + web_search, no retries
- **DeepSeek-chat is the safe default** — never default to any other model
- **Opus requires explicit human approval** every single time

## Infrastructure
- **Hosting:** Vercel (all sites on free tier)
- **Database:** Supabase (free tier — schema deployment blocked)
- **Version Control:** GitHub (apifenylabs org)
- **OS:** WSL2 on Windows (6.6 kernel)
- **Node:** v22.22.2

## Daily Budget
- Target: $0.50/day max (preferably under)
- Monthly: $30 max
- Default to DeepSeek-chat for everything non-trivial

### Historical Backfill (May 16 2026)

## Complete Model History & Cost Data

### DeepSeek-chat (Workhorse)
- **Provider:** DeepSeek (API)
- **Cost:** ~$0.01/100K tokens input, ~$0.02/100K tokens output (estimated)
- **Used for:** 80%+ of all coding, content generation, product work, SEO, testing
- **Monthly usage:** ~500K-1M tokens = $5-10/month
- **Reliability:** High — very few failures or errors
- **Quality:** Good enough for production code, blog posts, affiliate infrastructure
- **When NOT used:** Simple transforms (Ollama), research (Gemini), complex reasoning (Sonnet)

### Ollama Local Models
- **Provider:** Local (localhost:11434)
- **Cost:** $0 (electricity only)
- **Models used:**
  - **Qwen3-Coder (primary local):** Simple code generation, formatting, transforms. Step 1 in routing ladder.
  - **Gemma4 (research fallback):** When Gemini errors (429/quota). Second local option.
  - **DeepSeek-R1 (local):** Alternative local model for reasoning. Third in routing ladder.
  - **Llama3.2 (basic):** Simple transforms, text processing. Fourth in routing ladder. Was the default in overnight-0505.md.
  - **Phi3:** Referenced in agent definitions for "easy tasks" — not as commonly used.
- **Lessons learned:**
  - Local models are NOT smart enough for complex code generation (tried, reverted)
  - Ollama latency on WSL2 = 2-5x slower than API calls
  - Best for: Regex replacements, text transforms, simple data formatting
  - Worst for: Architecture decisions, debugging complex issues, creative content

### Gemini 2.5 Flash (Research)
- **Provider:** Google (API, free tier)
- **Cost:** $0 (within free quota)
- **Used for:** Trend scanning, competitor research, data gathering, niche validation
- **Quota issues:** 429 errors common — fallback to Ollama Gemma4 + web_search
- **Best for:** One-shot research queries

### Claude Sonnet (Rare Escalation)
- **Provider:** Anthropic (API)
- **Cost:** ~$15/M tokens (vs DeepSeek ~$0.10/M)
- **Used for:** Only after 2 DeepSeek failures AND step 4 condition met
- **Actual usage:** Rarely used — DeepSeek handles most failures on retry
- **Rule:** Never used for routine work or simple escalations

### Claude Opus (Never Used)
- **Provider:** Anthropic (API)
- **Cost:** ~$30/M tokens
- **Used for:** Production deployment signoff only
- **Actual usage:** Zero — requires explicit human approval from Chris
- **Rule:** If Opus is the answer, something went wrong earlier

### Model Routing Lesson from History
- Original plan (April 10): Claude Opus as orchestrator, Claude Sonnet for reviews, Gemini for dev
- Current (May 16): DeepSeek-chat for everything, Ollama for simple tasks, Gemini for research
- Lesson: DeepSeek quality : cost ratio was too good to justify expensive models
- Exception: OmniMind Phase 1+2 used more complex reasoning (still DeepSeek, not Opus)

## Other Tools & Services

### PM2 Process Management
- **directory-beast** (port 3000): Family Travel Asia local dev server
- **nudge-beast** (port 3001): Nudge local dev server
- **habit-tracker** (port 3003): Habit Tracker app (AppFactory)
- Uptime: 5+ days on some processes (directory-beast had 5D uptime by May 5)
- PM2 clean restart May 15 (old PIDs 9753/570 with 2D uptime replaced)

### GitHub
- **Org:** apifenylabs (all project repos)
- **PAT:** Has token but workflow scope may be missing
- **Push method:** `git push origin master` works, auto-deploys to Vercel for linked projects

### Python
- **Used for:** Data processing scripts (cross-link analysis, SEO enhancement, content generation)
- **Scripts built:** analyze-cross-links.py, inject-cross-links.py, merge-new-posts.py
- **Key technique:** Brace-depth counting Python for parsing TypeScript arrays (faq/imageUrl injection)

### Telegram
- **Channel:** Alpha Orchestras HQ (group)
- **Bot framework:** grammY (TypeScript) for Nudge
- **Bot token:** Partially found in env files

### Web Search
- **Provider:** DuckDuckGo (via web_search tool)
- **Cost:** $0
- **Used for:** Research validation, fact-checking, affiliate program URLs
