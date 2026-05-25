// ─── Robotics Types ─────────────────────────────────────────────────────
// Shared types for the Titan robotics deployment system.
// Supports ROS2, Arduino/ESP32, Raspberry Pi, and custom hardware.

/** Supported robot hardware platforms. */
export type RobotPlatform = 'ros2' | 'arduino' | 'raspberry-pi' | 'custom';

/** Deployment lifecycle status. */
export type DeploymentStatus = 'pending' | 'active' | 'error' | 'disconnected';

/** A single robot deployment record. */
export interface RobotDeployment {
  id: string;
  platform: RobotPlatform;
  agentId: string;
  agentName: string;
  status: DeploymentStatus;
  /** Hardware URL (e.g., ROS2 bridge) or serial port path. */
  endpoint?: string;
  deployedAt: string;       // ISO 8601
  lastHeartbeat: string;    // ISO 8601
  config: Record<string, unknown>;
}

/** Payload for initiating a deployment. */
export interface DeployRequest {
  agentId: string;
  platform: RobotPlatform;
  /** Optional endpoint override. If omitted, a mock default is used. */
  endpoint?: string;
  /** Optional platform-specific configuration. */
  config?: Record<string, unknown>;
}

/** Response returned by the deploy endpoint. */
export interface DeployResponse {
  deploymentId: string;
  status: DeploymentStatus;
  message: string;
}

/** Health / status summary of a single deployment. */
export interface DeploymentHealth {
  id: string;
  platform: RobotPlatform;
  agentId: string;
  agentName: string;
  status: DeploymentStatus;
  endpoint?: string;
  deployedAt: string;
  lastHeartbeat: string;
  /** Human-readable health detail. */
  detail: string;
}

/** Query parameters for the status endpoint. */
export interface StatusQuery {
  platform?: RobotPlatform;
  agentId?: string;
}

// ─── Platform metadata (display helpers) ────────────────────────────────

export interface PlatformMeta {
  id: RobotPlatform;
  name: string;
  description: string;
  icon: string;           // Lucide icon name
  color: string;          // Hex accent
  docsUrl?: string;       // Optional external docs
}

export const PLATFORMS: PlatformMeta[] = [
  {
    id: 'ros2',
    name: 'ROS2',
    description: 'Deploy your agent as a ROS2 node for advanced robotics.',
    icon: 'Cpu',
    color: '#14B8A6',
  },
  {
    id: 'arduino',
    name: 'Arduino / ESP32',
    description: 'Flash skill logic to microcontrollers for IoT and embedded.',
    icon: 'CircuitBoard',
    color: '#F59E0B',
  },
  {
    id: 'raspberry-pi',
    name: 'Raspberry Pi',
    description: 'Run your agent as a systemd service on a Raspberry Pi.',
    icon: 'Radio',
    color: '#8B5CF6',
  },
  {
    id: 'custom',
    name: 'Custom Hardware',
    description: 'Use the webhook/gRPC bridge for any robot or device.',
    icon: 'Settings',
    color: '#6366F1',
  },
] as const;
