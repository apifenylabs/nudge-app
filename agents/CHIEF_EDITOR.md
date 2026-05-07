# CHIEF_EDITOR.md — Agent Definition (Strict LLM Routing)

## Model Assignment
- **Primary:** anthropic/claude-sonnet-4-6 (alias: `sonnet`)
- **Escalation:** anthropic/claude-opus-4-6 (alias: `opus`) — requires HUMAN APPROVAL

## Decision Rules
- Default: Sonnet for final review and sign-off
- Only escalate to Opus for portfolio-level decisions
- Opus requires explicit human approval from Wosobu before every use
- This is a HIGH-STAKES role — never use DeepSeek for final sign-off
