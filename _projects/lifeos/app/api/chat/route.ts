/**
 * LifeOS Chat API — AI Copilot Conversation Engine
 *
 * POST /api/chat — Send a message, get AI response. Persists to Supabase.
 * GET  /api/chat — List or load chat sessions.
 * DELETE /api/chat — Delete a chat session.
 *
 * Uses DeepSeek Chat (hosted, OpenAI-compatible API).
 * v2: Plugin-aware — uses Plugin Registry system prompts with phase routing.
 */

import { NextRequest, NextResponse } from 'next/server';
import {
  createSession,
  saveMessage,
  saveCanvasSections,
  loadMessages,
  updateSessionTitle,
  deleteSession,
  listSessions,
  countTotalMessages,
  type ConversationMode,
} from '../../lib/chat-persistence';
import { getPlugin, getInitialPhase } from '../../lib/plugin-registry';
import crypto from 'crypto';

const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY || '';
const DEEPSEEK_URL = 'https://api.deepseek.com/v1/chat/completions';

// ─── Global Personality Engine Prompt ──────────────────────────────

const PERSONALITY_PROMPT = `
GLOBAL PERSONALITY INSTRUCTIONS (applies to all plugins):
- You are NOT a yes-man. Challenge assumptions with data and evidence.
- NEVER say "Great question!" or "I'd be happy to help!" — just help.
- Keep paragraphs short (2-3 sentences max). Use bold **sparingly**.
- End EVERY response with a question that drives the conversation forward.
- When citing sources, do it naturally ("Reddit users in r/travel suggest...", "Weather data shows...").
- Build canvas content as the conversation progresses — capture decisions, research, plans.
- Adapt to the user's depth preference: if they give short answers, go shallower. If they engage deeply, go deeper.
- If the user says something incomplete or vague, ask for specifics — don't guess.

CANVAS FORMAT:
When you want to add something to the canvas, use this format at the end of your message:
## Canvas:
**Section Title**: Content here
**Another Section**: More content here

The canvas is where the user's plan, research, and decisions live. Add to it whenever you gather concrete information.`;

// ─── Plugin-derived System Prompt ──────────────────────────────────

function buildPluginSystemPrompt(pluginId: string, currentPhase?: string): string {
  const plugin = getPlugin(pluginId);
  
  // ─── Life / Free Chat Mode ─────────────────────────────────
  if (!plugin || pluginId === 'life') {
    return `You are LifeOS — a personality-aware AI copilot.
${PERSONALITY_PROMPT}

CONVERSATION PHASES (guide the user through these naturally):
1. Understand the situation — ask focused questions
2. Research what they need to know — cite real sources
3. Build a concrete plan together
4. Help them execute
5. Review and iterate

TONE: Direct, strategic, data-backed. CEO-level advisor.`;
  }

  const currentPhaseObj = plugin.phases.find(p => p.id === currentPhase);
  const phaseIndex = currentPhaseObj ? plugin.phases.indexOf(currentPhaseObj) : 0;
  const remainingPhases = plugin.phases.slice(phaseIndex);
  const completedPhases = plugin.phases.slice(0, phaseIndex);

  const phaseGuide = remainingPhases.map((p, i) => {
    const phaseNum = phaseIndex + i + 1;
    const status = i === 0 ? '⬅️ CURRENT — focus here' : '➡️ Next';
    return `Phase ${phaseNum} (${p.name}): ${p.description} — ${status}`;
  }).join('\n');

  const completedPhaseNames = completedPhases.length > 0
    ? `✅ Completed: ${completedPhases.map(p => p.name).join(' → ')}`
    : '';

  return `${plugin.systemPrompt}

${PERSONALITY_PROMPT}

CURRENT PHASE GUIDE:
${completedPhaseNames ? completedPhaseNames + '\n' : ''}
${phaseGuide}

IMPORTANT:
- You are in the "${currentPhaseObj?.name || plugin.phases[0]?.name}" phase.
- Open with a question or observation that advances THIS phase.
- Don't rush to the next phase until the user has what they need from this one.
- When a phase feels complete, ask: "Ready to move to the next phase, or dig deeper?"`;
}

// ─── GET: List sessions or load one session ────────────────────────

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const sessionId = searchParams.get('sessionId');
  const action = searchParams.get('action');
  const plugin = searchParams.get('plugin');

  try {
    if (sessionId && action === 'messages') {
      const messages = await loadMessages(sessionId);
      return NextResponse.json({ messages });
    }

    if (action === 'plugin') {
      const pluginDef = getPlugin(plugin || 'travel');
      if (!pluginDef) return NextResponse.json({ error: 'Plugin not found' }, { status: 404 });
      return NextResponse.json({
        plugin: pluginDef,
        initialPhase: getInitialPhase(pluginDef.id),
      });
    }

    if (action === 'count') {
      const count = await countTotalMessages();
      return NextResponse.json({ count });
    }

    const sessions = await listSessions();
    return NextResponse.json({ sessions });
  } catch (error) {
    console.error('GET error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// ─── DELETE: Delete a chat session ─────────────────────────────────

export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const sessionId = searchParams.get('sessionId');

  if (!sessionId) {
    return NextResponse.json({ error: 'sessionId is required' }, { status: 400 });
  }

  try {
    await deleteSession(sessionId);
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('DELETE error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// ─── POST: Send a message ──────────────────────────────────────────

export async function POST(request: NextRequest) {
  if (!DEEPSEEK_API_KEY) {
    return NextResponse.json(
      { error: 'DeepSeek API key not configured. Set DEEPSEEK_API_KEY in environment.' },
      { status: 500 }
    );
  }

  try {
    const { message, sessionId, history, isFirst, mode, phase } = await request.json();

    if (!message || typeof message !== 'string' || !message.trim()) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    // Resolve plugin — mode is now the plugin ID (e.g., 'travel', 'finance')
    // If mode is 'life' or unknown, use a general LifeOS prompt (no plugin)
    const isLifeMode = (typeof mode === 'string' && (mode === 'life' || !getPlugin(mode)));
    const pluginId = isLifeMode ? 'life' : ((typeof mode === 'string' && getPlugin(mode)) ? mode : 'life');
    const currentPhase = typeof phase === 'string' ? phase : undefined;
    const validMode = pluginId as ConversationMode;

    // ─── Create or reuse session ────────────────────────────────
    let currentSessionId = sessionId;
    if (!currentSessionId || isFirst) {
      const title = isFirst ? (message.length > 60 ? message.slice(0, 60) + '…' : message) : 'New Conversation';
      currentSessionId = await createSession(validMode, title);
    }

    // ─── Save user message ──────────────────────────────────────
    await saveMessage(currentSessionId, 'user', message);

    // ─── Build plugin-aware system prompt ───────────────────────
    const systemPrompt = buildPluginSystemPrompt(pluginId, currentPhase);

    const deepseekMessages: { role: string; content: string }[] = [
      { role: 'system', content: systemPrompt },
    ];

    if (history && Array.isArray(history)) {
      deepseekMessages.push(...history);
    }

    deepseekMessages.push({ role: 'user', content: message });

    // ─── Call DeepSeek ──────────────────────────────────────────
    const response = await fetch(DEEPSEEK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${DEEPSEEK_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: deepseekMessages,
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

    // ─── Save assistant reply ───────────────────────────────────
    const inputTokens = data.usage?.prompt_tokens || 0;
    await saveMessage(currentSessionId, 'assistant', reply, inputTokens);

    // ─── Auto-generate title from first exchange ────────────────
    if (isFirst && message.length <= 100) {
      await updateSessionTitle(currentSessionId, message.slice(0, 80));
    }

    // ─── Extract canvas sections from reply ─────────────────────
    const canvasSections: Array<{ id: string; title: string; content: string; color: string }> = [];
    const canvasRegex = /## Canvas:\s*([\s\S]*?)(?=\n## |$)/g;
    const canvasMatch = canvasRegex.exec(reply);
    if (canvasMatch) {
      const lines = canvasMatch[1].split('\n').filter(l => l.trim());
      for (const line of lines) {
        const sectionMatch = line.match(/\*\*(.*?)\*\*:\s*(.*)/);
        if (sectionMatch) {
          canvasSections.push({
            id: crypto.randomUUID?.() || Math.random().toString(36).slice(2),
            title: sectionMatch[1],
            content: sectionMatch[2],
            color: ['green', 'teal', 'blue', 'indigo', 'purple', 'pink', 'amber', 'orange', 'red'][canvasSections.length % 9],
          });
        }
      }
      if (canvasSections.length > 0) {
        await saveCanvasSections(currentSessionId, canvasSections);
      }
    }

    return NextResponse.json({
      reply,
      sessionId: currentSessionId,
      canvasSections,
      mode: pluginId,
      phase: currentPhase || getInitialPhase(pluginId)?.id,
      plugin: getPlugin(pluginId)?.name || 'LifeOS',
    });
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
