"use client";

import { useState, useEffect } from "react";
import AppShell from "@/components/AppShell";
import PlatformBadge from "@/components/PlatformBadge";
import type { Platform, PlatformConnection, ContentSource, Settings as SettingsType } from "@/lib/types";
import { getStoredConnections, saveConnections, defaultConnections } from "@/lib/platforms";
import { getDefaultSources, saveSources, getEnabledSources } from "@/lib/content-sources";
import { Save, RefreshCw } from "lucide-react";

export default function SettingsPage() {
  const [connections, setConnections] = useState<PlatformConnection[]>(defaultConnections());
  const [sources, setSources] = useState<ContentSource[]>(getDefaultSources());
  const [brandVoice, setBrandVoice] = useState("Professional, family-friendly, helpful");
  const [defaultSchedule, setDefaultSchedule] = useState("09:00");
  const [timezone, setTimezone] = useState("Asia/Hong_Kong");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setConnections(getStoredConnections());
    setSources(getEnabledSources());
  }, []);

  const toggleConnection = (id: Platform) => {
    setConnections((prev) =>
      prev.map((c) =>
        c.id === id ? { ...c, connected: !c.connected } : c
      )
    );
  };

  const toggleSource = (id: string) => {
    setSources((prev) =>
      prev.map((s) =>
        s.id === id ? { ...s, enabled: !s.enabled } : s
      )
    );
  };

  const handleSave = () => {
    saveConnections(connections);
    saveSources(sources);
    localStorage.setItem("social-beast-brand-voice", brandVoice);
    localStorage.setItem("social-beast-default-schedule", defaultSchedule);
    localStorage.setItem("social-beast-timezone", timezone);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <AppShell>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-ink dark:text-cream">Settings</h1>
        <p className="text-sm text-muted mt-1">
          Configure your platforms and preferences
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Platform Connections */}
        <div className="card p-4 md:p-6">
          <h2 className="text-lg font-semibold text-ink dark:text-cream mb-4">
            Platform Connections
          </h2>
          <div className="space-y-3">
            {connections.map((conn) => (
              <div
                key={conn.id}
                className="flex items-center justify-between py-3 border-b border-border dark:border-dark-border last:border-0"
              >
                <div className="flex items-center gap-3">
                  <PlatformBadge platform={conn.id} showLabel={true} />
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={conn.connected}
                    onChange={() => toggleConnection(conn.id)}
                    className="sr-only peer"
                  />
                  <div className="w-9 h-5 bg-muted/30 rounded-full peer peer-checked:bg-accent peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all" />
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Content Sources */}
        <div className="card p-4 md:p-6">
          <h2 className="text-lg font-semibold text-ink dark:text-cream mb-4">
            Content Sources
          </h2>
          <p className="text-xs text-muted mb-4">
            Choose which directories to pull content from
          </p>
          <div className="space-y-3">
            {sources.map((source) => (
              <div
                key={source.id}
                className="flex items-center justify-between py-3 border-b border-border dark:border-dark-border last:border-0"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center">
                    <RefreshCw size={14} className="text-accent" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-ink dark:text-cream">
                      {source.name}
                    </p>
                    <p className="text-xs text-muted capitalize">{source.type}</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={source.enabled}
                    onChange={() => toggleSource(source.id)}
                    className="sr-only peer"
                  />
                  <div className="w-9 h-5 bg-muted/30 rounded-full peer peer-checked:bg-accent peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all" />
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Preferences */}
        <div className="card p-4 md:p-6">
          <h2 className="text-lg font-semibold text-ink dark:text-cream mb-4">
            Preferences
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-ink dark:text-cream mb-2">
                Brand Voice / Tone
              </label>
              <textarea
                value={brandVoice}
                onChange={(e) => setBrandVoice(e.target.value)}
                rows={3}
                className="input-field resize-none text-sm"
                placeholder="Describe your brand voice..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-ink dark:text-cream mb-2">
                Default Posting Time
              </label>
              <input
                type="time"
                value={defaultSchedule}
                onChange={(e) => setDefaultSchedule(e.target.value)}
                className="input-field text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-ink dark:text-cream mb-2">
                Timezone
              </label>
              <select
                value={timezone}
                onChange={(e) => setTimezone(e.target.value)}
                className="input-field text-sm"
              >
                <option value="Asia/Hong_Kong">Asia/Hong Kong (HKT)</option>
                <option value="Asia/Singapore">Asia/Singapore (SGT)</option>
                <option value="America/New_York">America/New York (EST)</option>
                <option value="America/Los_Angeles">America/Los Angeles (PST)</option>
                <option value="Europe/London">Europe/London (GMT)</option>
                <option value="Australia/Sydney">Australia/Sydney (AEDT)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Save */}
        <div className="card p-4 md:p-6 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-ink dark:text-cream">Save Changes</h2>
            <p className="text-xs text-muted mt-1">
              All data is stored locally
            </p>
          </div>
          <button onClick={handleSave} className="btn-primary">
            <Save size={16} />
            {saved ? "Saved!" : "Save Settings"}
          </button>
        </div>
      </div>
    </AppShell>
  );
}
