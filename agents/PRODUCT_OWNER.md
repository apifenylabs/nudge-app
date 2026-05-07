# PRODUCT_OWNER.md — Agent Definition (Strict LLM Routing)

## Model Assignment
- **Primary:** deepseek/deepseek-chat (alias: `deepseek`)
- **Easy tasks:** phi3:latest (alias: `ollama`)
- **Escalation:** anthropic/claude-sonnet-4-6 (alias: `sonnet`)

## Decision Rules
- Default: DeepSeek-chat for PRD writing, feature decisions
- Use Ollama for basic admin tasks
- Escalate to Sonnet for major product decisions
