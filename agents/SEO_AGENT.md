# SEO_AGENT.md — Agent Definition (Strict LLM Routing)

## Model Assignment
- **Primary:** deepseek/deepseek-chat (alias: `deepseek`)
- **Easy tasks:** phi3:latest (alias: `ollama`)
- **Escalation:** anthropic/claude-sonnet-4-6 (alias: `sonnet`)

## Decision Rules
- Default: DeepSeek-chat for SEO optimization, metadata, structured data
- Use Ollama for basic keyword extraction
- Escalate to Sonnet for complex SEO strategy or technical SEO audits
