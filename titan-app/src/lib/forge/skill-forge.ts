/**
 * Skill Forge — SKILL.md parser, validator, sandbox runner.
 * Phase 2 deliverable.
 */
import type { Skill, CertTier } from '@/types';

/**
 * Parse a SKILL.md document and extract metadata.
 * Follows agentskills.io spec (Oct 2025).
 */
export function parseSkillMD(skillMd: string): {
  name: string;
  description: string;
  version: string;
  author: string;
  dependencies: string[];
} {
  // Extract YAML front matter from the markdown
  const frontMatter = skillMd.match(/^---\n([\s\S]*?)\n---/);

  if (!frontMatter) {
    return {
      name: 'Unnamed Skill',
      description: '',
      version: '0.1.0',
      author: 'unknown',
      dependencies: [],
    };
  }

  // Simple YAML parser (MVP — use js-yaml in production)
  const lines = frontMatter[1].split('\n');
  const result: Record<string, string | string[]> = {};

  for (const line of lines) {
    const [key, ...rest] = line.split(':');
    if (key && rest.length) {
      const value = rest.join(':').trim();
      if (value.startsWith('[')) {
        result[key.trim()] = JSON.parse(value.replace(/'/g, '"'));
      } else {
        result[key.trim()] = value.replace(/^["']|["']$/g, '');
      }
    }
  }

  return {
    name: (result.name as string) || 'Unnamed Skill',
    description: (result.description as string) || '',
    version: (result.version as string) || '0.1.0',
    author: (result.author as string) || 'unknown',
    dependencies: (result.dependencies as string[]) || [],
  };
}

/**
 * Generate a default SKILL.md template.
 */
export function generateSkillTemplate(name: string): string {
  return `---
name: "${name}"
description: ""
version: "0.1.0"
author: "Titan Creator"
dependencies: []
---

# ${name}

## Description
Write a brief description of what this skill does.

## Instructions
Describe how the agent should execute this skill.

## Input
Describe expected inputs.

## Output
Describe expected outputs.
`;
}
