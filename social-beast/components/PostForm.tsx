"use client";

import { useState, useCallback } from "react";
import type { Platform } from "@/lib/types";
import { PLATFORM_INFO } from "@/lib/platforms";
import PlatformBadge from "./PlatformBadge";
import { Calendar, Clock, Send, Link2 } from "lucide-react";
import { getAffiliatePresets, generateAffiliateLink } from "@/lib/affiliate-links";

interface PostFormProps {
  onSubmit: (data: {
    content: string;
    platforms: Platform[];
    scheduleFor?: string;
    mediaUrls: string[];
  }) => void;
  initialContent?: string;
}

export default function PostForm({ onSubmit, initialContent = "" }: PostFormProps) {
  const [content, setContent] = useState(initialContent);
  const [selectedPlatforms, setSelectedPlatforms] = useState<Platform[]>([]);
  const [scheduleMode, setScheduleMode] = useState<"now" | "later">("now");
  const [scheduleDate, setScheduleDate] = useState("");
  const [scheduleTime, setScheduleTime] = useState("");
  const [mediaUrls, setMediaUrls] = useState<string[]>([]);
  const [showAffiliates, setShowAffiliates] = useState(false);

  const platforms: Platform[] = ["twitter", "telegram", "linkedin", "instagram", "blog"];

  const togglePlatform = (p: Platform) => {
    setSelectedPlatforms((prev) =>
      prev.includes(p) ? prev.filter((x) => x !== p) : [...prev, p]
    );
  };

  const insertAffiliate = useCallback((provider: "booking" | "klook" | "viator") => {
    const link = generateAffiliateLink(provider, "travel deals");
    setContent((prev) => `${prev}\n${link.label}: ${link.url}`);
    setShowAffiliates(false);
  }, []);

  const handleSubmit = () => {
    if (!content.trim() || selectedPlatforms.length === 0) return;
    const scheduleFor =
      scheduleMode === "later" && scheduleDate && scheduleTime
        ? `${scheduleDate}T${scheduleTime}:00`
        : undefined;
    onSubmit({
      content,
      platforms: selectedPlatforms,
      scheduleFor,
      mediaUrls,
    });
    setContent("");
    setSelectedPlatforms([]);
    setScheduleMode("now");
    setScheduleDate("");
    setScheduleTime("");
    setMediaUrls([]);
  };

  const maxChars = selectedPlatforms.length > 0
    ? Math.min(...selectedPlatforms.map((p) => PLATFORM_INFO[p].maxChars))
    : 10000;

  return (
    <div className="card p-4 md:p-6 space-y-5">
      {/* Content */}
      <div>
        <label className="block text-sm font-medium text-ink dark:text-cream mb-2">
          What do you want to share?
        </label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write your post content here..."
          rows={6}
          className="input-field resize-none font-sans leading-relaxed"
          maxLength={maxChars}
        />
        <div className="flex items-center justify-between mt-2">
          <span className="text-xs text-muted">
            {content.length}/{maxChars} chars
          </span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setShowAffiliates(!showAffiliates)}
              className="btn-ghost text-xs"
            >
              <Link2 size={14} /> Affiliate Links
            </button>
          </div>
        </div>
      </div>

      {/* Affiliate Links */}
      {showAffiliates && (
        <div className="card p-3 space-y-2 animate-slide-up">
          <p className="text-xs font-medium text-muted">Insert Affiliate Link</p>
          <div className="flex flex-wrap gap-2">
            {getAffiliatePresets().map((preset) => (
              <button
                key={preset.provider}
                onClick={() => insertAffiliate(preset.provider)}
                className="btn-secondary text-xs"
              >
                {preset.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Platform Selector */}
      <div>
        <label className="block text-sm font-medium text-ink dark:text-cream mb-2">
          Platforms
        </label>
        <div className="flex flex-wrap gap-2">
          {platforms.map((p) => (
            <button
              key={p}
              onClick={() => togglePlatform(p)}
              className={`px-3 py-2 rounded-lg border text-sm font-medium transition-all duration-150 ${
                selectedPlatforms.includes(p)
                  ? "border-accent bg-accent/10 text-accent"
                  : "border-border dark:border-dark-border text-muted hover:border-muted"
              }`}
            >
              {PLATFORM_INFO[p].name}
            </button>
          ))}
        </div>
      </div>

      {/* Media */}
      <div>
        <label className="block text-sm font-medium text-ink dark:text-cream mb-2">
          Media URLs (optional)
        </label>
        <input
          type="text"
          value={mediaUrls[0] || ""}
          onChange={(e) => setMediaUrls(e.target.value ? [e.target.value] : [])}
          placeholder="https://example.com/image.jpg"
          className="input-field text-sm"
        />
      </div>

      {/* Schedule */}
      <div>
        <div className="flex items-center gap-4 mb-3">
          <button
            onClick={() => setScheduleMode("now")}
            className={`flex items-center gap-2 text-sm font-medium px-3 py-2 rounded-lg transition-all ${
              scheduleMode === "now"
                ? "bg-accent/10 text-accent"
                : "text-muted"
            }`}
          >
            <Send size={14} /> Post Now
          </button>
          <button
            onClick={() => setScheduleMode("later")}
            className={`flex items-center gap-2 text-sm font-medium px-3 py-2 rounded-lg transition-all ${
              scheduleMode === "later"
                ? "bg-accent/10 text-accent"
                : "text-muted"
            }`}
          >
            <Calendar size={14} /> Schedule
          </button>
        </div>
        {scheduleMode === "later" && (
          <div className="flex flex-col sm:flex-row gap-3 animate-slide-up">
            <input
              type="date"
              value={scheduleDate}
              onChange={(e) => setScheduleDate(e.target.value)}
              className="input-field text-sm flex-1"
            />
            <input
              type="time"
              value={scheduleTime}
              onChange={(e) => setScheduleTime(e.target.value)}
              className="input-field text-sm flex-1"
            />
          </div>
        )}
      </div>

      {/* Preview (simple) */}
      {content.trim() && selectedPlatforms.length > 0 && (
        <div className="card p-4 space-y-2 animate-fade-in">
          <p className="text-xs font-medium text-muted">Preview</p>
          <div className="flex flex-wrap gap-2 mb-2">
            {selectedPlatforms.map((p) => (
              <PlatformBadge key={p} platform={p} />
            ))}
          </div>
          <p className="text-sm text-ink dark:text-cream whitespace-pre-wrap line-clamp-4">
            {content}
          </p>
        </div>
      )}

      {/* Submit */}
      <button
        onClick={handleSubmit}
        disabled={!content.trim() || selectedPlatforms.length === 0}
        className="btn-primary w-full"
      >
        {scheduleMode === "now" ? (
          <><Send size={16} /> Publish Now</>
        ) : (
          <><Clock size={16} /> Schedule Post</>
        )}
      </button>
    </div>
  );
}
