/**
 * LifeOS — Chat Persistence
 *
 * Handles saving/loading chat sessions and messages to/from Supabase.
 * Falls back gracefully when Supabase is not configured (local mode).
 */

import supabase, { isSupabaseConfigured } from './supabase-client';

export type ConversationMode = 'life' | 'work' | 'health' | 'finance' | 'travel' | 'home';

export interface CanvasSection {
  id: string;
  title: string;
  content: string;
  color: string;
}

export interface ChatMessage {
  id?: string;
  role: 'user' | 'assistant';
  content: string;
  created_at?: string;
  token_count?: number;
}

export interface ChatSession {
  id: string;
  title: string;
  mode: ConversationMode;
  is_active: boolean;
  message_count: number;
  canvas_sections: CanvasSection[];
  created_at: string;
  updated_at: string;
}

// ─── In-Memory Fallback (when Supabase is not configured) ──────────

let memoryFallback: ChatSession[] = [];
let memoryMessages: Record<string, ChatMessage[]> = {};
let memoryCounter = 0;

function generateId(): string {
  memoryCounter++;
  return `local-${Date.now()}-${memoryCounter}`;
}

// Helper to safely access Supabase chat table (bypasses strict typing)
function chatTable() {
  return (supabase as any)?.from('lifeos_chats');
}
function msgTable() {
  return (supabase as any)?.from('lifeos_messages');
}

// ─── API ───────────────────────────────────────────────────────────

export function isPersistent(): boolean {
  return isSupabaseConfigured();
}

/**
 * List all chat sessions for a user, most recent first.
 */
export async function listSessions(userId = 'anonymous'): Promise<ChatSession[]> {
  if (isSupabaseConfigured() && supabase) {
    const { data, error } = await chatTable()
      .select('*')
      .eq('user_id', userId)
      .order('updated_at', { ascending: false })
      .limit(50);

    if (error) {
      console.error('Failed to list sessions:', error);
      return [];
    }
    return (data || []) as ChatSession[];
  }

  // In-memory fallback
  return memoryFallback.sort((a, b) =>
    new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
  );
}

/**
 * Load full message history for a chat session.
 */
export async function loadMessages(chatId: string): Promise<ChatMessage[]> {
  if (chatId.startsWith('local-')) {
    return memoryMessages[chatId] || [];
  }

  if (isSupabaseConfigured() && supabase) {
    const { data, error } = await msgTable()
      .select('*')
      .eq('chat_id', chatId)
      .order('created_at', { ascending: true });

    if (error) {
      console.error('Failed to load messages:', error);
      return [];
    }
    return (data || []) as ChatMessage[];
  }

  return [];
}

/**
 * Create a new chat session. Returns the session ID.
 */
export async function createSession(
  mode: ConversationMode = 'life',
  title = 'New Conversation',
  userId = 'anonymous'
): Promise<string> {
  const now = new Date().toISOString();

  if (isSupabaseConfigured() && supabase) {
    const { data, error } = await chatTable()
      .insert({
        user_id: userId,
        title,
        mode,
        is_active: true,
        message_count: 0,
        canvas_sections: [],
        created_at: now,
        updated_at: now,
      })
      .select('id')
      .single();

    if (error) {
      console.error('Failed to create session:', error);
      return generateId();
    }
    return data?.id || generateId();
  }

  const id = generateId();
  memoryFallback.push({
    id,
    title,
    mode,
    is_active: true,
    message_count: 0,
    canvas_sections: [],
    created_at: now,
    updated_at: now,
  });
  memoryMessages[id] = [];
  return id;
}

/**
 * Save a message to a chat session.
 */
export async function saveMessage(
  chatId: string,
  role: 'user' | 'assistant',
  content: string,
  tokenCount = 0
): Promise<void> {
  if (chatId.startsWith('local-')) {
    if (!memoryMessages[chatId]) memoryMessages[chatId] = [];
    memoryMessages[chatId].push({
      role,
      content,
      created_at: new Date().toISOString(),
      token_count: tokenCount,
    });
    // Update session metadata
    const session = memoryFallback.find(s => s.id === chatId);
    if (session) {
      session.message_count = memoryMessages[chatId].length;
      session.updated_at = new Date().toISOString();
    }
    return;
  }

  if (isSupabaseConfigured() && supabase) {
    const { error: msgError } = await msgTable().insert({
      chat_id: chatId,
      role,
      content,
      token_count: tokenCount,
    });

    if (msgError) {
      console.error('Failed to save message:', msgError);
      return;
    }

    // Update message count and timestamp on the chat
    await chatTable()
      .update({ updated_at: new Date().toISOString() })
      .eq('id', chatId);
  }
}

/**
 * Save canvas sections to a chat session.
 */
export async function saveCanvasSections(
  chatId: string,
  sections: CanvasSection[]
): Promise<void> {
  if (chatId.startsWith('local-')) {
    const session = memoryFallback.find(s => s.id === chatId);
    if (session) {
      session.canvas_sections = sections;
      session.updated_at = new Date().toISOString();
    }
    return;
  }

  if (isSupabaseConfigured() && supabase) {
    await chatTable()
      .update({ canvas_sections: sections, updated_at: new Date().toISOString() })
      .eq('id', chatId);
  }
}

/**
 * Update a chat session's title (auto-generated from first user message).
 */
export async function updateSessionTitle(
  chatId: string,
  title: string
): Promise<void> {
  if (chatId.startsWith('local-')) {
    const session = memoryFallback.find(s => s.id === chatId);
    if (session) {
      session.title = title;
    }
    return;
  }

  if (isSupabaseConfigured() && supabase) {
    await chatTable()
      .update({ title, updated_at: new Date().toISOString() })
      .eq('id', chatId);
  }
}

/**
 * Delete a chat session and all its messages.
 */
export async function deleteSession(chatId: string): Promise<void> {
  if (chatId.startsWith('local-')) {
    memoryFallback = memoryFallback.filter(s => s.id !== chatId);
    delete memoryMessages[chatId];
    return;
  }

  if (isSupabaseConfigured() && supabase) {
    await chatTable().delete().eq('id', chatId);
  }
}

/**
 * Count total user messages (for a simple usage metric).
 */
export async function countTotalMessages(userId = 'anonymous'): Promise<number> {
  if (isSupabaseConfigured() && supabase) {
    const { count, error } = await msgTable()
      .select('id', { count: 'exact', head: true })
      .eq('role', 'user');

    if (!error && count !== null) {
      return count;
    }
  }

  // Fallback: count from memory
  let total = 0;
  for (const msgs of Object.values(memoryMessages)) {
    total += msgs.filter(m => m.role === 'user').length;
  }
  return total;
}
