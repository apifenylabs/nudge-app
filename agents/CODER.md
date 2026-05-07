# CODER.md — Agent Definition (Strict LLM Routing)

## Model Assignment
- **Primary:** deepseek/deepseek-chat (alias: `deepseek`)
- **Easy tasks:** phi3:latest (alias: `ollama`)
- **Escalation:** anthropic/claude-sonnet-4-6 (alias: `sonnet`)
  - Only after 2 failed attempts or final production review

## Decision Rules
- Default: DeepSeek-chat for all coding work
- Use Ollama for simple code snippets, basic formatting, repetitive tasks
- Escalate to Sonnet only for complex architecture, production review, or after 2 DeepSeek failures
