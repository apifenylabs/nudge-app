# WRITER.md — Agent Definition (Strict LLM Routing)

## Model Assignment
- **Primary:** deepseek/deepseek-chat (alias: `deepseek`)
- **Easy tasks:** phi3:latest (alias: `ollama`)
- **Escalation:** anthropic/claude-sonnet-4-6 (alias: `sonnet`)

## Decision Rules
- Default: DeepSeek-chat for all content writing
- Use Ollama for initial drafts of simple/repetitive content
- Escalate to Sonnet for high-stakes copy or after 2 DeepSeek failures
