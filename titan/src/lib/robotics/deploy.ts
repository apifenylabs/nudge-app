// ─── Robotics Deploy Logic ─────────────────────────────────────────────
// Deployment primitives for the Titan robotics system.
// Exposes deploy(), getStatus(), listDeployments(), and a mock store.

import type {
  RobotPlatform,
  DeploymentStatus,
  RobotDeployment,
  DeployRequest,
  DeployResponse,
  DeploymentHealth,
} from './types';

// ─── In-memory store (dev/mock only; swap for DB in production) ─────────

const deployments = new Map<string, RobotDeployment>();

function generateId(): string {
  return `dep_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

// ─── Mock heartbeat flipper ─────────────────────────────────────────────
// Simulates random disconnections so the UI isn't always "active".

const heartbeatTimers = new Map<string, ReturnType<typeof setTimeout>>();

function startMockHeartbeat(id: string) {
  const tick = () => {
    const dep = deployments.get(id);
    if (!dep) return;

    dep.lastHeartbeat = new Date().toISOString();

    // ~15% chance to flip to disconnected, ~5% to error
    const roll = Math.random();
    if (roll < 0.05) {
      dep.status = 'error';
    } else if (roll < 0.15) {
      dep.status = 'disconnected';
    } else {
      dep.status = 'active';
    }

    heartbeatTimers.set(
      id,
      setTimeout(tick, 10_000 + Math.random() * 20_000)
    );
  };

  const timer = setTimeout(tick, 8_000 + Math.random() * 12_000);
  heartbeatTimers.set(id, timer);
}

function stopMockHeartbeat(id: string) {
  const timer = heartbeatTimers.get(id);
  if (timer) {
    clearTimeout(timer);
    heartbeatTimers.delete(id);
  }
}

// ─── Public API ─────────────────────────────────────────────────────────

/**
 * Deploy an agent to a target hardware platform.
 *
 * In mock mode, creates a local deployment record with a simulated
 * heartbeat cycle. Production implementations would talk to:
 *   - ROS2: REST bridge or rosbridge WebSocket
 *   - Arduino: serial-over-USB with esptool/avrdude
 *   - Raspberry Pi: SSH + systemd unit file
 *   - Custom: configured webhook or gRPC endpoint
 */
export async function deploy(request: DeployRequest): Promise<DeployResponse> {
  const id = generateId();

  const deployment: RobotDeployment = {
    id,
    platform: request.platform,
    agentId: request.agentId,
    agentName: `Agent ${request.agentId.slice(0, 6)}`, // derived name
    status: 'pending',
    endpoint: request.endpoint ?? getDefaultEndpoint(request.platform),
    deployedAt: new Date().toISOString(),
    lastHeartbeat: new Date().toISOString(),
    config: request.config ?? {},
  };

  deployments.set(id, deployment);

  // Simulate deployment delay, then go active
  setTimeout(() => {
    const dep = deployments.get(id);
    if (dep) {
      dep.status = 'active';
      startMockHeartbeat(id);
    }
  }, 1_500 + Math.random() * 1_500);

  return {
    deploymentId: id,
    status: 'pending',
    message: getDeployMessage(request.platform),
  };
}

/**
 * Get health/detail for a specific deployment.
 */
export async function getStatus(id: string): Promise<DeploymentHealth | null> {
  const dep = deployments.get(id);
  if (!dep) return null;

  return {
    ...dep,
    detail: getStatusDetail(dep.status, dep.platform),
  };
}

/**
 * List all deployments, optionally filtered.
 */
export async function listDeployments(
  filter?: { platform?: RobotPlatform; agentId?: string }
): Promise<DeploymentHealth[]> {
  const all = Array.from(deployments.values());

  const filtered = all.filter((d) => {
    if (filter?.platform && d.platform !== filter.platform) return false;
    if (filter?.agentId && d.agentId !== filter.agentId) return false;
    return true;
  });

  return filtered.map((dep) => ({
    ...dep,
    detail: getStatusDetail(dep.status, dep.platform),
  }));
}

/**
 * Remove a deployment (e.g., user undeploys).
 */
export async function removeDeployment(id: string): Promise<boolean> {
  const existed = deployments.delete(id);
  if (existed) stopMockHeartbeat(id);
  return existed;
}

// ─── Internal helpers ───────────────────────────────────────────────────

function getDefaultEndpoint(platform: RobotPlatform): string {
  switch (platform) {
    case 'ros2':
      return 'ws://localhost:9090';
    case 'arduino':
      return '/dev/ttyUSB0';
    case 'raspberry-pi':
      return 'ssh://pi@raspberrypi.local';
    case 'custom':
      return 'http://localhost:8080/webhook';
  }
}

function getDeployMessage(platform: RobotPlatform): string {
  switch (platform) {
    case 'ros2':
      return 'Deploying ROS2 node to robot bridge…';
    case 'arduino':
      return 'Flashing firmware to microcontroller…';
    case 'raspberry-pi':
      return 'Installing systemd service on Raspberry Pi…';
    case 'custom':
      return 'Connecting to custom hardware bridge…';
  }
}

function getStatusDetail(
  status: DeploymentStatus,
  platform: RobotPlatform
): string {
  switch (status) {
    case 'pending':
      return 'Deployment in progress…';
    case 'active':
      return `Agent running on ${platform} — heartbeat OK`;
    case 'error':
      return `Agent on ${platform} encountered an error — check logs`;
    case 'disconnected':
      return `Agent on ${platform} is unreachable — check connection`;
  }
}
