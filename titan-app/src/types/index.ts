// Titan — Type definitions for agents, skills, swarm, certification
// Sources: Phase 1-4 research artifacts

/** Base agent model */
export interface Agent {
  id: string;
  userId: string;
  name: string;
  baseModel: BaseModelType;
  skinData: SkinData | null;
  level: number;
  xp: number;
  createdAt: string;
}

export type BaseModelType = 'cute-robot' | 'anime-guardian' | 'realistic-human' | 'abstract-orb' | 'future-robot-brain';

export interface SkinData {
  skinId: string;
  name: string;
  outfit?: string;
  accessories?: string[];
  particleEffect?: string;
  animationSet: string;
}

/** Skill (follows agentskills.io SKILL.md spec) */
export interface Skill {
  id: string;
  agentId: string;
  name: string;
  description: string;
  skillMd: string;           // Full SKILL.md content
  certified: boolean;
  auditScore: number | null;
  auditTier: CertTier | null;
  auditReport: AuditReport | null;
  createdAt: string;
}

export type CertTier = 'gold' | 'silver' | 'bronze' | 'uncertified';

export interface AuditReport {
  overallScore: number;
  categories: AuditCategory[];
  violations: string[];
  summary: string;
  reviewedBy?: string; // human reviewer id
  reviewedAt?: string;
}

export interface AuditCategory {
  name: string;
  score: number;
  maxScore: number;
  passed: boolean;
}

/** Swarm orchestration */
export interface Orchestration {
  id: string;
  userId: string;
  name: string;
  agentIds: string[];
  connectionMap: Connection[];
  active: boolean;
  createdAt: string;
}

export interface Connection {
  sourceAgentId: string;
  targetAgentId: string;
  relationship: 'negotiates_with' | 'depends_on' | 'reports_to';
}

/** Memory graph */
export interface MemoryEntry {
  id: string;
  agentId: string;
  entity: string;
  value: Record<string, unknown>;
  lastUpdated: string;
}

/** Interaction / task log */
export interface Interaction {
  id: string;
  agentId: string;
  skillId?: string;
  taskDescription: string;
  resultSummary: Record<string, unknown>;
  success: boolean;
  costCredits?: number;
  createdAt: string;
}

/** BAU heartbeat */
export interface Heartbeat {
  id: string;
  agentId: string;
  status: 'healthy' | 'degraded' | 'dead';
  lastPing: string;
  failCount: number;
}

/** ROI summary */
export interface ROISummary {
  hoursSaved: number;
  moneySaved: number;
  tasksCompleted: number;
  periodStart: string;
  periodEnd: string;
}

/** Audit log entry */
export interface AuditLog {
  id: string;
  skillId: string;
  auditorVersion: string;
  scanResults: AuditReport;
  humanReviewer?: string;
  humanNotes?: string;
  createdAt: string;
}
