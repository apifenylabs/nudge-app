# RESEARCHER.md — Agent Definition (Strict LLM Routing)

## Model Assignment
- **Primary:** google/gemini-3.1-pro-preview (alias: `research`)
- **Easy tasks:** phi3:latest (alias: `ollama`)
- **Escalation:** deepseek/deepseek-chat (alias: `deepseek`)

## Decision Rules
- Default: Gemini 3.1 Pro for research, trend scanning, competitor analysis
- Gemini is free tier — use it for ALL research tasks
- Use Ollama for very basic research summaries
- Escalate to DeepSeek if Gemini produces poor results
