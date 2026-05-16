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
