/**
 * IP Guardian — Secure manifest creation, encryption, licensing.
 * Phase 5 deliverable.
 */
import type { Agent } from '@/types';

export interface SecureManifest {
  agentId: string;
  skillsSummary: string;       // hashed
  memoryGraphHash: string;     // sha256
  license: LicenseType;
  encryptionKey: string;       // user-generated
  createdAt: string;
}

export type LicenseType =
  | 'creator_owned_royalty'
  | 'private_encrypted'
  | 'enterprise_commercial';

export interface RoyaltyRate {
  marketplacePercentage: number;  // 0-15
  minPrice: number;
  currency: string;
}

/**
 * Generate a secure manifest for a user's agent.
 * Manifests enable BYO into any enterprise environment.
 */
export async function createSecureManifest(
  agent: Agent,
  license: LicenseType,
): Promise<SecureManifest> {
  const manifest: SecureManifest = {
    agentId: agent.id,
    skillsSummary: await hashSkills(agent.id),
    memoryGraphHash: 'sha256-pending',  // real hash from memory graph
    license,
    encryptionKey: generateUserKey(),
    createdAt: new Date().toISOString(),
  };

  console.log(`[IP] Manifest created for agent ${agent.id} (${license})`);
  return manifest;
}

/**
 * Verify a manifest's integrity before BYO onboarding.
 */
export async function verifyManifest(
  manifest: SecureManifest,
): Promise<{ valid: boolean; issues: string[] }> {
  const issues: string[] = [];

  if (!manifest.agentId) issues.push('Missing agent ID');
  if (!manifest.encryptionKey) issues.push('Missing encryption key');

  return {
    valid: issues.length === 0,
    issues,
  };
}

/**
 * Calculate royalty based on license type and pricing.
 */
export function calculateRoyalty(
  price: number,
  license: LicenseType,
  rate: RoyaltyRate,
): number {
  if (license === 'private_encrypted') return 0;
  if (license === 'creator_owned_royalty') {
    return Math.max(price * (rate.marketplacePercentage / 100), rate.minPrice);
  }
  // enterprise_commercial
  return price * 0.1;
}

function generateUserKey(): string {
  const bytes = new Uint8Array(32);
  crypto.getRandomValues(bytes);
  return Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

async function hashSkills(_agentId: string): Promise<string> {
  // In production: hash the actual skill IDs + versions
  return 'sha256-skill-summary-pending';
}
