# REVIEWER.md — Agent Definition (Strict LLM Routing)

## Model Assignment
- **Primary:** deepseek/deepseek-chat (alias: `deepseek`)
- **Easy tasks:** phi3:latest (alias: `ollama`)
- **Escalation:** anthropic/claude-sonnet-4-6 (alias: `sonnet`)

## Decision Rules
- Default: DeepSeek-chat for first-pass code/content review
- Use Ollama for simple format checks
- Escalate to Sonnet for final production review or after 2 DeepSeek failures
