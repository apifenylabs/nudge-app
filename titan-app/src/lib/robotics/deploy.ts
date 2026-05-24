// Titan Phase 6c — Robotics deployment logic
// Uses Supabase when env vars are set, falls back to in-memory mock data

import { supabase } from '@/lib/db/supabase-client';
import type { RobotDeployment, PlatformType, DeploymentStatus } from '@/types';

// ─── In-memory mock store ───────────────────────────────────────────────

let mockStore: RobotDeployment[] = [
  {
    id: 'mock-dep-001',
    platform: 'ros2',
    agentId: 'agent-a1',
    agentName: 'Scout Alpha',
    status: 'active',
    endpoint: 'http://192.168.1.42:9090',
    deployedAt: new Date(Date.now() - 127 * 3600_000).toISOString(),
    lastHeartbeat: new Date(Date.now() - 2 * 60_000).toISOString(),
    config: { rosVersion: 'humble', namespace: '/warehouse' },
  },
  {
    id: 'mock-dep-002',
    platform: 'raspberry-pi',
    agentId: 'agent-b2',
    agentName: 'Sensor Sentinel',
    status: 'active',
    endpoint: 'http://192.168.1.105:8080',
    deployedAt: new Date(Date.now() - 812 * 3600_000).toISOString(),
    lastHeartbeat: new Date(Date.now() - 30_000).toISOString(),
    config: { pythonVersion: '3.11', i2cEnabled: true },
  },
  {
    id: 'mock-dep-003',
    platform: 'arduino',
    agentId: 'agent-c3',
    agentName: 'Gripper Ghost',
    status: 'disconnected',
    endpoint: 'http://192.168.1.77:3030',
    deployedAt: new Date(Date.now() - 45 * 3600_000).toISOString(),
    lastHeartbeat: new Date(Date.now() - 3 * 3600_000).toISOString(),
    config: { board: 'ESP32', servoPins: [9, 10] },
  },
  {
    id: 'mock-dep-004',
    platform: 'custom',
    agentId: 'agent-d4',
    agentName: 'Pipe Phoenix',
    status: 'error',
    endpoint: 'http://10.0.0.88:5000',
    deployedAt: new Date(Date.now() - 200 * 3600_000).toISOString(),
    lastHeartbeat: new Date(Date.now() - 24 * 3600_000).toISOString(),
    config: { protocol: 'modbus', baudRate: 115200 },
  },
  {
    id: 'mock-dep-005',
    platform: 'ros2',
    agentId: 'agent-e5',
    agentName: 'Sky Marshal',
    status: 'pending',
    deployedAt: new Date().toISOString(),
    lastHeartbeat: new Date().toISOString(),
    config: { drones: 4, rosVersion: 'jazzy' },
  },
];

let mockIdCounter = 5;

// ─── Helper: are Supabase env vars set? ─────────────────────────────────

function hasSupabase(): boolean {
  return !!(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_URL !== '' &&
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY !== ''
  );
}

function mapRowToDeployment(row: Record<string, unknown>): RobotDeployment {
  return {
    id: row.id as string,
    platform: row.platform as PlatformType,
    agentId: row.agent_id as string,
    agentName: (row.agent_name as string) ?? '',
    status: row.status as DeploymentStatus,
    endpoint: (row.endpoint as string) ?? undefined,
    deployedAt: row.deployed_at as string,
    lastHeartbeat: row.last_heartbeat as string,
    config: (row.config as Record<string, unknown>) ?? {},
  };
}

function mapDeploymentToRow(d: Partial<RobotDeployment>): Record<string, unknown> {
  return {
    platform: d.platform,
    agent_id: d.agentId,
    agent_name: d.agentName,
    status: d.status,
    endpoint: d.endpoint,
    deployed_at: d.deployedAt ?? new Date().toISOString(),
    last_heartbeat: d.lastHeartbeat ?? new Date().toISOString(),
    config: d.config ?? {},
  };
}

// ─── Public API ─────────────────────────────────────────────────────────

export async function createDeployment(data: {
  agentId: string;
  agentName?: string;
  platform: PlatformType;
  endpoint?: string;
  config?: Record<string, unknown>;
}): Promise<{ data: RobotDeployment | null; error: string | null }> {
  const payload: Record<string, unknown> = {
    ...mapDeploymentToRow({
      platform: data.platform,
      agentId: data.agentId,
      agentName: data.agentName ?? data.agentId,
      status: 'pending' as DeploymentStatus,
      endpoint: data.endpoint,
      config: data.config ?? {},
    }),
    deployed_at: new Date().toISOString(),
    last_heartbeat: new Date().toISOString(),
  };

  if (hasSupabase()) {
    const { data: row, error } = await supabase
      .from('robots_deployments')
      .insert(payload)
      .select()
      .single();

    if (error) return { data: null, error: error.message };
    return { data: mapRowToDeployment(row), error: null };
  }

  // Mock fallback
  const id = `mock-dep-${String(++mockIdCounter).padStart(3, '0')}`;
  const deployment: RobotDeployment = {
    id,
    platform: data.platform,
    agentId: data.agentId,
    agentName: data.agentName ?? data.agentId,
    status: 'pending',
    endpoint: data.endpoint,
    deployedAt: payload.deployed_at as string,
    lastHeartbeat: payload.last_heartbeat as string,
    config: (data.config ?? {}) as Record<string, unknown>,
  };
  mockStore.push(deployment);
  return { data: deployment, error: null };
}

export async function getDeployments(
  agentId?: string
): Promise<{ data: RobotDeployment[]; error: string | null }> {
  if (hasSupabase()) {
    let query = supabase.from('robots_deployments').select('*').order('created_at', { ascending: false });
    if (agentId) query = query.eq('agent_id', agentId);

    const { data: rows, error } = await query;
    if (error) return { data: [], error: error.message };
    return { data: (rows ?? []).map(mapRowToDeployment), error: null };
  }

  // Mock fallback
  const results = agentId
    ? mockStore.filter((d) => d.agentId === agentId)
    : [...mockStore];
  return { data: results, error: null };
}

export async function getDeploymentById(
  id: string
): Promise<{ data: RobotDeployment | null; error: string | null }> {
  if (hasSupabase()) {
    const { data: row, error } = await supabase
      .from('robots_deployments')
      .select('*')
      .eq('id', id)
      .single();

    if (error) return { data: null, error: error.message };
    return { data: mapRowToDeployment(row), error: null };
  }

  // Mock fallback
  const dep = mockStore.find((d) => d.id === id);
  if (!dep) return { data: null, error: 'Deployment not found' };
  return { data: dep, error: null };
}

export async function deleteDeployment(
  id: string
): Promise<{ success: boolean; error: string | null }> {
  if (hasSupabase()) {
    const { error } = await supabase.from('robots_deployments').delete().eq('id', id);
    if (error) return { success: false, error: error.message };
    return { success: true, error: null };
  }

  // Mock fallback
  const idx = mockStore.findIndex((d) => d.id === id);
  if (idx === -1) return { success: false, error: 'Deployment not found' };
  mockStore.splice(idx, 1);
  return { success: true, error: null };
}

export async function updateDeploymentStatus(
  id: string,
  status: DeploymentStatus
): Promise<{ data: RobotDeployment | null; error: string | null }> {
  const updates = {
    status,
    last_heartbeat: new Date().toISOString(),
  };

  if (hasSupabase()) {
    const { data: row, error } = await supabase
      .from('robots_deployments')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) return { data: null, error: error.message };
    return { data: mapRowToDeployment(row), error: null };
  }

  // Mock fallback
  const dep = mockStore.find((d) => d.id === id);
  if (!dep) return { data: null, error: 'Deployment not found' };
  dep.status = status;
  dep.lastHeartbeat = updates.last_heartbeat;
  return { data: dep, error: null };
}

export async function sendCommand(
  deploymentId: string,
  command: string,
  params?: Record<string, unknown>
): Promise<{ success: boolean; output: string; error: string | null }> {
  // In a real system, this would route via MQTT / gRPC / websocket to the robot.
  // For now, return a simulated response.
  const dep = mockStore.find((d) => d.id === deploymentId);
  if (!dep) return { success: false, output: '', error: 'Deployment not found' };
  if (dep.status !== 'active') {
    return { success: false, output: '', error: `Cannot send command to deployment with status "${dep.status}"` };
  }

  const simulatedOutput = `[${dep.platform.toUpperCase()}] "${command}" executed on ${dep.agentName} (${dep.id})${
    params ? ` with params ${JSON.stringify(params)}` : ''
  } — OK`;

  return { success: true, output: simulatedOutput, error: null };
}

export async function fetchLogs(
  deploymentId: string,
  since?: string
): Promise<{ data: { timestamp: string; level: string; message: string }[]; error: string | null }> {
  // Simulated logs
  const dep = mockStore.find((d) => d.id === deploymentId);
  if (!dep) return { data: [], error: 'Deployment not found' };

  const now = Date.now();
  const sinceMs = since ? new Date(since).getTime() : now - 3600_000;

  const logEntries = [
    { timestamp: new Date(now - 5000).toISOString(), level: 'INFO', message: `Heartbeat received from ${dep.agentName}` },
    { timestamp: new Date(now - 15000).toISOString(), level: 'DEBUG', message: `Status check: ${dep.status}` },
    { timestamp: new Date(now - 60000).toISOString(), level: 'INFO', message: `Platform ${dep.platform} connection OK` },
    { timestamp: new Date(now - 120000).toISOString(), level: 'WARN', message: `Latency spike detected (230ms)` },
    { timestamp: new Date(now - 300000).toISOString(), level: 'INFO', message: `Deployment ${dep.id} initialized` },
  ];

  const filtered = logEntries.filter((e) => new Date(e.timestamp).getTime() >= sinceMs);
  return { data: filtered, error: null };
}
