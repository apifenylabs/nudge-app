import { createClient } from '@supabase/supabase-js';
import type { Agent, Skill, Orchestration, MemoryEntry, Heartbeat, AuditLog } from '@/types';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Agent CRUD
export async function getAgents(userId: string) {
  return supabase.from('agents').select('*').eq('user_id', userId);
}

export async function createAgent(agent: Partial<Agent>) {
  return supabase.from('agents').insert(agent).select().single();
}

export async function updateAgent(id: string, updates: Partial<Agent>) {
  return supabase.from('agents').update(updates).eq('id', id).select().single();
}

export async function deleteAgent(id: string) {
  return supabase.from('agents').delete().eq('id', id);
}

// Skills CRUD
export async function getSkills(agentId: string) {
  return supabase.from('skills').select('*').eq('agent_id', agentId);
}

export async function createSkill(skill: Partial<Skill>) {
  return supabase.from('skills').insert(skill).select().single();
}

export async function updateSkill(id: string, updates: Partial<Skill>) {
  return supabase.from('skills').update(updates).eq('id', id).select().single();
}

// Orchestrations
export async function getOrchestrations(userId: string) {
  return supabase.from('orchestrations').select('*').eq('user_id', userId);
}

export async function saveOrchestration(orch: Partial<Orchestration>) {
  return supabase.from('orchestrations').upsert(orch).select().single();
}

// Memory graph
export async function getMemory(agentId: string, entity?: string) {
  let query = supabase.from('memory_graph').select('*').eq('agent_id', agentId);
  if (entity) query = query.eq('entity', entity);
  return query;
}

export async function upsertMemory(entry: Partial<MemoryEntry>) {
  return supabase.from('memory_graph').upsert(entry).select().single();
}

// Heartbeats
export async function getHeartbeats(agentId: string) {
  return supabase.from('heartbeats').select('*').eq('agent_id', agentId);
}

export async function updateHeartbeat(id: string, status: Heartbeat['status']) {
  return supabase.from('heartbeats').update({ status, last_ping: new Date().toISOString() }).eq('id', id);
}

// Audit logs
export async function getAuditLogs(skillId: string) {
  return supabase.from('audit_logs').select('*').eq('skill_id', skillId);
}

export async function createAuditLog(log: Partial<AuditLog>) {
  return supabase.from('audit_logs').insert(log).select().single();
}
