"use client";

import type { Platform } from "@/lib/types";
import { PLATFORM_INFO } from "@/lib/platforms";
import { MessageCircle, Linkedin, Camera, FileText, Twitter } from "lucide-react";

const ICON_MAP: Record<Platform, any> = {
  twitter: Twitter,
  telegram: MessageCircle,
  linkedin: Linkedin,
  instagram: Camera,
  blog: FileText,
};

interface PlatformBadgeProps {
  platform: Platform;
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
}

export default function PlatformBadge({
  platform,
  size = "sm",
  showLabel = true,
}: PlatformBadgeProps) {
  const Icon = ICON_MAP[platform];
  const info = PLATFORM_INFO[platform];

  const sizeClasses = {
    sm: "px-2 py-1 text-xs",
    md: "px-2.5 py-1.5 text-sm",
    lg: "px-3 py-2 text-sm",
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-lg font-medium border border-border dark:border-dark-border bg-surface dark:bg-dark-surface-2 text-muted ${sizeClasses[size]}`}
    >
      <Icon size={size === "sm" ? 12 : 14} className="text-accent" />
      {showLabel && info.name}
    </span>
  );
}
