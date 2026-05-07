import type { ContentSource } from "./types";

// ───── Content Sources ─────────────────────────────────────────────────────

export function getDefaultSources(): ContentSource[] {
  return [
    {
      id: "family-travel",
      name: "Family Travel Directory",
      type: "family-travel",
      path: "../family-travel-directory/public/data/destinations.json",
      enabled: true,
    },
    {
      id: "luxury",
      name: "Luxury Travel",
      type: "luxury",
      path: "",
      enabled: false,
    },
    {
      id: "ev",
      name: "EV Directory",
      type: "ev",
      path: "",
      enabled: false,
    },
  ];
}

export function getEnabledSources(): ContentSource[] {
  if (typeof window === "undefined") return getDefaultSources();
  try {
    const raw = localStorage.getItem("social-beast-sources");
    const sources = raw ? JSON.parse(raw) : getDefaultSources();
    return sources;
  } catch {
    return getDefaultSources();
  }
}

export function saveSources(sources: ContentSource[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem("social-beast-sources", JSON.stringify(sources));
}

// ───── Content Generation Templates ────────────────────────────────────────

interface Suggestion {
  platform: string;
  content: string;
}

export function generateSuggestions(sourceType: string, data: any): Suggestion[] {
  const suggestions: Suggestion[] = [];

  if (sourceType === "family-travel" && data?.name) {
    suggestions.push({
      platform: "twitter",
      content: `🏖️ ${data.name} — ${data.city}, ${data.country}\n\n${data.description?.slice(0, 100)}...\n\nRead the full review ➡️`,
    });
    suggestions.push({
      platform: "telegram",
      content: `🏖️ <b>${data.name}</b> — ${data.city}, ${data.country}\n\n${data.description?.slice(0, 150)}...\n\n📖 <a href="#">Read the full parent review →</a>`,
    });
  }

  return suggestions;
}
