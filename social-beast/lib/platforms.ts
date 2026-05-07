import type { Platform, PlatformConnection } from "./types";

// ───── Platform Config ─────────────────────────────────────────────────────

export const PLATFORM_INFO: Record<Platform, { name: string; icon: string; maxChars: number }> = {
  twitter: { name: "Twitter / X", icon: "twitter", maxChars: 280 },
  telegram: { name: "Telegram", icon: "send", maxChars: 4096 },
  linkedin: { name: "LinkedIn", icon: "linkedin", maxChars: 3000 },
  instagram: { name: "Instagram", icon: "camera", maxChars: 2200 },
  blog: { name: "Blog", icon: "file-text", maxChars: 10000 },
};

// ───── Platform API Abstractions ───────────────────────────────────────────

export async function postToPlatform(
  platform: Platform,
  content: string,
  mediaUrls: string[] = []
): Promise<{ success: boolean; platform: string; message: string }> {
  const { name } = PLATFORM_INFO[platform];

  // Simulate posting — in production, swap with real API calls
  console.log(`[${name}] Posting: ${content.slice(0, 60)}...`);

  // Placeholder: simulate success
  await new Promise((r) => setTimeout(r, 300));

  return {
    success: true,
    platform,
    message: `Posted to ${name} successfully`,
  };
}

export async function verifyConnection(
  platform: Platform
): Promise<boolean> {
  // Placeholder: check stored credentials are valid
  const connections = getStoredConnections();
  const conn = connections.find((c) => c.id === platform);
  return conn?.connected ?? false;
}

export function getStoredConnections(): PlatformConnection[] {
  if (typeof window === "undefined") return defaultConnections();
  try {
    const raw = localStorage.getItem("social-beast-platforms");
    return raw ? JSON.parse(raw) : defaultConnections();
  } catch {
    return defaultConnections();
  }
}

export function saveConnections(connections: PlatformConnection[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem("social-beast-platforms", JSON.stringify(connections));
}

export function defaultConnections(): PlatformConnection[] {
  return [
    { id: "twitter", name: "Twitter / X", connected: false },
    { id: "telegram", name: "Telegram", connected: false },
    { id: "linkedin", name: "LinkedIn", connected: false },
    { id: "instagram", name: "Instagram", connected: false },
    { id: "blog", name: "Blog", connected: false },
  ];
}
