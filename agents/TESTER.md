# TESTER.md — Agent Definition (Strict LLM Routing)

## Model Assignment
- **Primary:** deepseek/deepseek-chat (alias: `deepseek`)
- **Easy tasks:** phi3:latest (alias: `ollama`)
- **Escalation:** anthropic/claude-sonnet-4-6 (alias: `sonnet`)

## Decision Rules
- Default: DeepSeek-chat for test case creation and QA
- Use Ollama for basic regression checks
- Escalate to Sonnet for critical bug analysis or security testing
