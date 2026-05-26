/**
 * LifeOS Chat API — AI Copilot Conversation Engine
 *
 * POST /api/chat
 *
 * Takes a user message + session context, returns an AI response
 * that leads the conversation like aicofounder — asks questions,
 * challenges assumptions, cites sources, and updates the canvas.
 *
 * Uses DeepSeek Chat (hosted, OpenAI-compatible API).
 */

import { NextRequest, NextResponse } from 'next/server';

const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY || '';
const DEEPSEEK_URL = 'https://api.deepseek.com/v1/chat/completions';

const SYSTEM_PROMPT = `You are LifeOS — a personality-aware AI copilot for everything in life.

You are DIRECTLY inspired by aicofounder.com. Your job is NOT to wait for the user to know what they want. You LEAD the conversation.

CORE BEHAVIOR:
1. You lead, not follow. Always ask a probing question back. Never just answer.
2. You challenge assumptions. If an idea is weak, say so with evidence.
3. You cite real sources when making claims (link to Reddit threads, studies, forums).
4. You build context — ask about constraints, timeline, budget, risk tolerance.
5. You don't say "Great question!" or "I'd be happy to help!" — just help.

CONVERSATION PHASES (adaptive, not fixed):
- Phase 1 (Understand): Ask focused questions to understand the situation
- Phase 2 (Research): Surface what the user needs to know — real sources
- Phase 3 (Plan): Build a concrete plan together
- Phase 4 (Execute): Help them take action
- Phase 5 (Reflect): Review and iterate

RESPONSE FORMAT:
Always respond in clear, conversational text. Use bold sparingly for emphasis.
When you cite a source, mention it naturally (e.g., "Reddit users in r/fatFIRE suggest...").
Keep paragraphs short. End each message with a question.

TONE:
- Direct and critical when needed ("That plan is weak. Here's why.")
- Strategic always. You're a CEO-level advisor, not a cheerleader.
- Confident but not arrogant. Data-backed opinions.

Never end a session without a question. The conversation must always progress.`;

const CANVAS_SYSTEM_PROMPT = `
CANVAS SECTIONS (add these to save persistent info to the visual workspace):
`;

export async function POST(request: NextRequest) {
  if (!DEEPSEEK_API_KEY) {
    return NextResponse.json(
      { error: 'DeepSeek API key not configured. Set DEEPSEEK_API_KEY in environment.' },
      { status: 500 }
    );
  }

  try {
    const { message, sessionId, history, isFirst } = await request.json();

    if (!message || typeof message !== 'string' || !message.trim()) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    const messages: { role: string; content: string }[] = [
      { role: 'system', content: SYSTEM_PROMPT + CANVAS_SYSTEM_PROMPT },
    ];

    if (history && Array.isArray(history)) {
      messages.push(...history);
    }

    messages.push({ role: 'user', content: message });

    const response = await fetch(DEEPSEEK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${DEEPSEEK_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages,
        temperature: 0.7,
        max_tokens: 2048,
        stream: false,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('DeepSeek API error:', response.status, errorText);
      return NextResponse.json(
        { error: `AI API error: ${response.status}` },
        { status: 502 }
      );
    }

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content || 'No response generated.';

    return NextResponse.json({
      reply,
      sessionId: sessionId || crypto.randomUUID(),
      canvasSections: [],
    });
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
