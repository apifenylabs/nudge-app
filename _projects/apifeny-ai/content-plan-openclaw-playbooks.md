# Apifeny — OpenClaw/Self-Hosted Agent Playbook Line

Target: Devs & founders running OpenClaw, Hermes, or self-hosted agents who want to cut API costs without cutting intelligence.
Tone: Honest, technical-but-readable, no fluff. "I run this stack. Here are the real costs."
Reference: HowToGeek article structure (pain → solution → playbook → tradeoffs).
Anchor: **"Run your AI agents for $0/mo in inference costs"**

---

## Product Line Architecture

```
FREE BLOG POST → FREE LEAD MAGNET ($0) → $19 PLAYBOOK → $49 BUNDLE → $199 ENTERPRISE

Sticky mechanism:
- Playbook includes update alerts (model costs change monthly)
- Bundle includes community access
- Enterprise includes quarterly refactor sessions
```

---

## FREE — Blog Post: "How I Cut My API Costs 80% With a Local LLM Router"

### Structure (follows HowToGeek template):

1. **Pain point** (opening 2 paragraphs)
   - "I was spending $200/mo on OpenAI API calls for my agent. Most of those calls were simple — summarization, classification, draft generation. Why was I paying $0.01/1K tokens for work a local model could do in 3 seconds for free?"
   
2. **The "before" state**
   - "I had one OpenClaw agent running everything through GPT-4o. Content drafting, email triage, log analysis, strategy calls. The bill kept climbing and the latency was annoying for simple tasks."

3. **The breakthrough**
   - "Then I found the LM Studio + Hermes combo. A 7B Qwen running locally handles 80% of my agent's daily work. The agent itself routes intelligently — it knows when to use the free local model and when to call GPT-4o for the hard stuff."

4. **Step-by-step setup**
   - Install LM Studio
   - Download a 7B-14B local model (Qwen 2.5, DeepSeek Coder, Llama 3.1)
   - Expose as OpenAI-compatible endpoint
   - Configure your agent to use local endpoint as default, cloud as fallback
   - Set routing rules: "if task is classification/summarization/draft → local. If task is strategy/reasoning/code review → cloud"

5. **The results (with numbers)**
   - Before: $208/mo API costs
   - After: $34/mo (only cloud calls for strategic tasks)
   - Latency: 1.2s average for local, 3.8s for cloud (local faster for 80% of tasks)
   - Quality: Blind test showed local model equal or better for summarization, draft generation, classification

6. **Tradeoffs (honest — builds trust)**
   - "Local models hallucinate more on complex reasoning. That's why you route, not replace."
   - "You need ~8GB VRAM for a decent 7B model. A used RTX 3060 is $200."
   - "Maintenance: keep models updated every 2-3 months as new quantized versions release."

7. **Links to full playbook + lead magnet**

---

## FREE — Lead Magnet: "Local Agent Router Starter Kit"

Deliverable: 3 files + 1 email sequence

### File 1: `router-config.md` — OpenClaw routing config
```yaml
# agent-local-cloud-router.yaml
# Drop this into your OpenClaw skills/ directory

models:
  local:
    endpoint: http://localhost:1234/v1
    model: qwen2.5-7b-instruct
    max_tokens: 4096
    cost_per_1k: 0
    routes:
      - classification
      - summarization
      - draft_generation
      - log_analysis
      - content_categorization
      - simple_qa
      
  cloud:
    endpoint: https://api.openai.com/v1
    model: gpt-4o-mini
    max_tokens: 8192
    cost_per_1k: 0.00015
    routes:
      - complex_reasoning
      - code_generation
      - strategic_planning
      - error_diagnosis
      - customer_facing_content
      
  cloud_premium:
    endpoint: https://api.openai.com/v1
    model: gpt-4o
    max_tokens: 16384
    cost_per_1k: 0.015
    routes:
      - deep_analysis
      - audit_review
      - critical_decisions

routing_logic:
  default: local
  fallback: cloud
  escalate_after_retries: 2
  min_confidence_for_local: 0.7
```

### File 2: `lm-studio-setup.md` — 10-minute local LLM setup
- Download LM Studio
- Recommended models with links (quantized 4-8 bit)
- Configuration file to expose OpenAI-compatible endpoint
- Test command to verify

### File 3: `decision-tree.md` — Visual routing guide
ASCII/diagram showing the decision flow:
```
Incoming task
    ↓
Classify by type
    ↓
Is it in LOCAL routes?
    ├── YES → Send to local model (free)
    │         ↓
    │         Quality check passed?
    │         ├── YES → Return result
    │         └── NO → Fallback to cloud
    │
    └── NO → Is it in CLOUD routes?
              ├── YES → Send to cloud model ($0.00015/1K)
              └── NO → Escalate to premium ($0.015/1K)
```

### Email sequence (3 emails, 1/week):
- Email 1: "Your agent is overpaying" — the case for local routing
- Email 2: "The 3 configs that cut my costs 80%" — your decision tree + router
- Email 3: "Real numbers from 90 days of hybrid routing" — graphs, before/after

---

## $19 — "Local/Cloud Hybrid Agent Blueprint"

### What's inside (50+ page PDF + config files):

**Chapter 1: The Architecture (8 pages)**
- Why single-model agents bleed money
- The tiered routing model (Local → Cloud Mini → Cloud Premium)
- Network topology diagram (ship with mermaid source)
- Hardware requirements (budget to premium)

**Chapter 2: Model Selection Guide (12 pages)**
- 15 tested model combos with benchmarks:
  - Qwen 2.5 7B vs 14B vs 32B
  - DeepSeek Coder vs DeepSeek V2 Lite
  - Llama 3.1 8B vs 70B (quantized)
  - Hermes 3 vs Mixtral vs Phi-3
- Task-by-task performance matrix
  - Summarization accuracy
  - Classification precision
  - Code generation quality  
  - Reasoning capability
  - Latency benchmarks
- VRAM cost table (used GPU pricing, cloud alternatives)
- When to use each model for each agent platform

**Chapter 3: Platform-Specific Configs (15 pages)**
- OpenClaw config (YAML + SKILL.md)
- Hermes Agent config (skills directory setup)
- n8n workflow for auto-routing
- Make.com scenario templates
- Claude Code SKILL.md adaptation
- Cursor/Codex CLI integration

**Chapter 4: Cost Tracking & Optimization (8 pages)**
- Before/after templates (Google Sheet linked)
- Alert thresholds (when cloud spend spikes)
- Monthly optimization checklist
- Model update cadence (when to re-benchmark)

**Chapter 5: Kitchen-Tested Case Studies (7 pages)**
- Case 1: Content creator — $312/mo → $38/mo
- Case 2: Trading bot analyst — $0 (was free but slow) → 3x faster with local + cloud for strategy
- Case 3: Customer support agent — 85% local, 15% cloud, $245 saved/mo
- Each case includes their exact config files

**Included assets:**
- 5 pre-built SKILL.md files for OpenClaw
- 3 n8n workflow JSON exports
- 1 Make.com blueprint
- Price-update script (checks model pricing weekly)
- Decision tree PDF for wall/desktop

---

## $49 — "Full Agent Stack" Template Bundle

Everything in $19, plus:

- ClawHub skill pack: install-and-run collection (Publish this ON ClawHub for organic discovery)
- 5 n8n workflow templates for:
  - Social listening + content repurposing
  - CRM sync + lead enrichment
  - Email triage + auto-response drafting
  - Log analysis + alerting
  - Competitor monitoring
- OpenClaw persona profiles:
  - Trading agent profile
  - Content creator profile
  - Customer support profile
  - Personal assistant profile
- 30-day email course (delivered daily, each email = 1 config tweak or task you didn't know your agent could do)
- Private community access (Telegram/Discord)
- Quarterly updates for 6 months

**Sticky mechanism:** The drip email course and quarterly updates give repeat reasons to open your emails and revisit the product.

---

## $199 — "Enterprise Agent Stack"

Everything in $49, plus:

- Custom deployment guide (Docker + VPS + Kubernetes)
- Security hardening guide (addressing the "Zapier warned 1000s of exposed instances" problem)
- Multi-instance orchestration (agent mesh)
- Slack/Telegram/WhatsApp integration templates
- Audit logging + compliance configs
- Monthly skill updates for 12 months
- 1-hour onboarding call
- White-label version (for agencies)

---

## Distribution Strategy

### Free funnel
1. Blog post on apifeny.ai → drives to lead magnet
2. Cross-post on Dev.to, Medium, Hacker News, Reddit (r/selfhosted, r/openclaw, r/hermesagent, r/LocalLLaMA)
3. Twitter/X thread with key hook + reply with config files

### Paid funnel (Phase 2)
4. Google Ads on "OpenClaw setup", "self-hosted AI agent", "local LLM agent"
5. Affiliate program: 30% commission for ClawHub skill creators promoting playbooks

### Retention
6. Email sequence → playbook purchase → community invite → quarterly update → upsell to bundle
7. Public changelog on apifeny.ai/blog (every time model costs shift, publish "Updated routing config for Q3 2026")
8. User-generated configs: featured customer setups become case studies → social proof loop

---

## Quick Reference: Benchmark Pricing vs. Competitor Gaps

| What Sells | Price | Revenue Proof | Competition in Niche |
|---|---|---|---|
| Notion templates (generic) | $5-79 | $2.5M (Thomas Frank) | Saturated |
| Automation workflows (Make/n8n) | $19-79 | $3.2K/mo passive | Growing, medium competition |
| **OpenClaw skill packs** | **$19-199** | **$112K/30d (ClawMart), $100-1K/mo per skill** | **LOW — massive gap** |
| Local/cloud hybrid guides | None exist | Nobody doing this | **GREENFIELD** |

The local/cloud hybrid playbook for OpenClaw is currently **an empty niche with a proven revenue model**. The ClawMart numbers prove the distribution channel works. The HowToGeek article proves the content hook works. The only missing piece is the product itself.

---

**Next action:** Write the free blog post → build lead magnet → launch → measure email capture → build $19 playbook based on what questions people ask in replies.
