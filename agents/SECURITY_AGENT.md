# SECURITY_AGENT.md — Agent Definition (Strict LLM Routing)

## Model Assignment
- **Primary:** deepseek/deepseek-chat (alias: `deepseek`)
- **Escalation:** anthropic/claude-sonnet-4-6 (alias: `sonnet`)

## Decision Rules
- Default: DeepSeek-chat for routine security checks
- Use Sonnet for vulnerability analysis, critical findings, auth audits
- Security findings always go through at minimum Sonnet-level review
