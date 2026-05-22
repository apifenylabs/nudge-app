/**
 * Mock Certification Engine
 * Simulates skill auditing with score tiers, category breakdowns, and violations.
 * No real analysis — generates synthetic but realistic results.
 */

export interface AuditResult {
  overallScore: number;
  categories: AuditCategory[];
  violations: string[];
  summary: string;
  auditTier: 'gold' | 'silver' | 'bronze' | 'uncertified';
}

export interface AuditCategory {
  name: string;
  score: number;
  maxScore: number;
  passed: boolean;
}

/**
 * Runs a mock certification audit on a skill.
 *
 * The result is deterministic-ish — based on skill name length + code length
 * to give consistent but varied results.
 */
export function runMockAudit(skillName: string, skillCode: string): AuditResult {
  // Seed a simple hash from name + code for reproducible results
  const seed = hashSimple(`${skillName}::${skillCode}`);
  const rand = (min: number, max: number) => {
    const r = ((seed * 9301 + 49297) % 233280) / 233280;
    return min + r * (max - min);
  };

  // Score each category independently
  const categories: AuditCategory[] = [
    {
      name: 'Security & Permissions',
      score: Math.round(rand(50, 100)),
      maxScore: 100,
      passed: false,
    },
    {
      name: 'Code Quality & Structure',
      score: Math.round(rand(55, 100)),
      maxScore: 100,
      passed: false,
    },
    {
      name: 'Documentation & Clarity',
      score: Math.round(rand(40, 100)),
      maxScore: 100,
      passed: false,
    },
    {
      name: 'Agent Compliance',
      score: Math.round(rand(60, 100)),
      maxScore: 100,
      passed: false,
    },
    {
      name: 'Performance & Efficiency',
      score: Math.round(rand(45, 100)),
      maxScore: 100,
      passed: false,
    },
    {
      name: 'Error Handling & Robustness',
      score: Math.round(rand(50, 100)),
      maxScore: 100,
      passed: false,
    },
  ];

  // Mark passed
  categories.forEach((c) => {
    c.passed = c.score >= 70;
  });

  const overallScore = Math.round(
    categories.reduce((sum, c) => sum + c.score, 0) / categories.length
  );

  // Generate violations based on weak categories
  const violations: string[] = [];
  categories.forEach((c) => {
    if (c.score < 70) {
      violations.push(`${c.name}: score ${c.score}/100 — below threshold`);
    }
  });

  // Add some random violations for realism
  if (overallScore < 90) {
    if (seed % 3 === 0) violations.push('Deprecated agent API call detected (v1 syntax)');
    if (seed % 5 === 0) violations.push('Missing error boundary on external service calls');
    if (seed % 7 === 0) violations.push('Sensitive data may be logged in debug mode');
  }

  // Determine tier
  let auditTier: AuditResult['auditTier'];
  let summary: string;

  if (overallScore >= 90) {
    auditTier = 'gold';
    summary = `Exceptional! "${skillName}" passes all checks with flying colors. Ready for production deployment.`;
  } else if (overallScore >= 75) {
    auditTier = 'silver';
    summary = `Good work on "${skillName}". Minor improvements needed before production — address the flagged violations.`;
  } else if (overallScore >= 50) {
    auditTier = 'bronze';
    summary = `"${skillName}" has some gaps. Review the violations and re-audit after fixes.`;
  } else {
    auditTier = 'uncertified';
    summary = `"${skillName}" needs significant rework. Major violations found in core areas.`;
  }

  return {
    overallScore,
    categories,
    violations,
    summary,
    auditTier,
  };
}

/**
 * Simple string hash for pseudo-random seeding
 */
function hashSimple(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash);
}
