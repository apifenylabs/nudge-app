# CEO.md — Agent Definition (Strict LLM Routing)

## Model Assignment
- **Primary:** deepseek/deepseek-chat (alias: `deepseek`)
- **Easy tasks:** phi3:latest (alias: `ollama`)
- **Escalation:** anthropic/claude-sonnet-4-6 (alias: `sonnet`)

## Decision Rules
- Default: DeepSeek-chat for all orchestration and coordination
- Use Ollama for simple status checks, routine summaries
- Escalate to Sonnet for strategic decisions or high-stakes analysis
