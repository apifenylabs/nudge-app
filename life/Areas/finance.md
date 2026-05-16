# Finance — Chris's Budget & Risk Profile

## Budget Constraints
- **Daily max:** $0.50 USD
- **Monthly max:** $30 USD (default; may increase with revenue)
- **Default model:** DeepSeek-chat (~$0.01/100K tokens)
- **Until first revenue:** Minimum spend on everything

## Risk Tolerance
- **Before any revenue:** Extremely conservative. No real-money spending without approval.
- **After first $1:** Slightly more room, but still cost-conscious.
- **Primary concern:** Waste — spending on things that don't produce results.

## What's Auto-Approved
- DeepSeek-chat API calls (under daily cap)
- Ollama local model inference (free — electricity only)
- Gemini Flash research (free tier)
- Vercel free tier hosting

## Needs Approval
- Any single action > $10 estimated cost
- Claude Opus usage
- Paid API keys or subscriptions
- Domain purchases above standard registration

## Revenue First Mentality
- Cost is only justified if it directly produces or unblocks revenue.
- Polish is deferred until traffic proves the concept works.
- Over-engineering before traffic is the #1 money-waster.

### Historical Backfill (May 16 2026)

## Actual Cost Data (From Memory Files)

### Daily Costs Recorded
| Date | Cost | Work Done | Notes |
|------|------|-----------|-------|
| May 5 | Near-zero | Overnight strategy, Ollama default | Budget tight, llama3.2 for basic tasks |
| May 7 | ~$1.00 | BUILD-OR-DIE — blog posts, schema, links | Over cap but produced massive output |
| May 12 | ~$0.008 | EV blog gen + deploy + fix | DeepSeek-chat only, very efficient |
| May 13 | ~$0.025 | Senior-friendly + EV blog expansion | Under $0.05 threshold |
| May 13 (night) | ~$0.50 | Apifeny blog affiliate monetization | Main session + build |
| May 13 (23:18) | ~$0.05 | Senior-friendly deploy | Vercel deploy |
| May 13 (23:38) | ~$0.02 | EV blog SEO enhancement | One-shot Python script |
| May 16 | ~$0.40 | OmniMind launch prep + content gen | Under $0.50 cap |
| May 16 (night) | ~$0.12 | Apifeny improvements + EV deploy | Well under cap |

### Model Cost Breakdown
| Model | Cost | Usage |
|-------|------|-------|
| **DeepSeek-chat** | ~$0.01/100K tokens | 80%+ of all work |
| **Ollama Qwen3-Coder (local)** | Free (electricity) | Simple coding, formatting |
| **Ollama llama3.2 (local)** | Free (electricity) | Basic transforms, status checks |
| **Ollama Gemma4 (local)** | Free (electricity) | Research fallback |
| **Gemini 2.5 Flash** | Free (free tier) | Research, data gathering |
| **Claude Sonnet** | ~$15/M tokens | Rare — only after 2 failures |
| **Claude Opus** | ~$30/M tokens | Never used (never approved) |

### The Ollama Local Experiment
Chris wanted to minimize API costs. The system experimented with running local models via Ollama:
- **Success:** Basic tasks, formatting, simple code → works fine locally
- **Failure:** Complex reasoning, code generation → local models produce lower quality output
- **Lesson learned:** Use local for easy tasks (step 1 of routing ladder), cloud DeepSeek for everything important
- **Cost savings:** Estimated $2-3 saved by running local vs sending everything to API

### PaperclipAI Cost-Control Attempts
- Paperclip adapter was designed as a cost-control middleware between agents and the gateway
- Had authentication issues (April 27 — client mode vs operator mode, V3 payload format mismatch)
- Was intended to rate-limit, batch, and prioritize API calls
- Never fully deployed — the deepseek-chat + Ollama hybrid was simpler and worked

### Monthly Estimate (May 2026)
- DeepSeek-chat API: ~$5-8
- Ollama local: $0 (electricity negligible)
- Gemini research: $0 (free tier)
- Vercel: $0 (free tier)
- Supabase: $0 (free tier)
- **Total estimated: $5-8/month** — well under $30 max

### Token Efficiency Practices
- Summarize context before responding
- Compact memory every 4k tokens
- Sub-agents for parallel work (one DeepSeek main + local sub-agents)
- One-shot Python scripts over multi-step agent loops when possible (saves tokens)
