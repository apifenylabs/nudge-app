"use client";

import { Post, Platform } from "@/lib/types";
import { PLATFORM_INFO } from "@/lib/platforms";
import {
  CheckCircle2,
  Clock,
  FileEdit,
  Archive,
  Share2,
  MessageCircle,
  Linkedin,
  Camera,
  FileText,
  Twitter,
} from "lucide-react";
import { format } from "date-fns";

const PLATFORM_ICONS: Record<Platform, any> = {
  twitter: Twitter,
  telegram: MessageCircle,
  linkedin: Linkedin,
  instagram: Camera,
  blog: FileText,
};

const STATUS_CONFIG = {
  posted: { icon: CheckCircle2, className: "badge-green", label: "Posted" },
  scheduled: { icon: Clock, className: "badge-amber", label: "Scheduled" },
  draft: { icon: FileEdit, className: "badge-gray", label: "Draft" },
  archived: { icon: Archive, className: "badge-gray", label: "Archived" },
};

interface PostCardProps {
  post: Post;
  onClick?: () => void;
}

export default function PostCard({ post, onClick }: PostCardProps) {
  const PlatformIcon = PLATFORM_ICONS[post.platform];
  const statusConfig = STATUS_CONFIG[post.status];
  const StatusIcon = statusConfig.icon;
  const platformInfo = PLATFORM_INFO[post.platform];

  return (
    <div
      onClick={onClick}
      className="card p-4 hover:shadow-md transition-all duration-200 cursor-pointer animate-fade-in group"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-md bg-accent/10 flex items-center justify-center">
            <PlatformIcon size={14} className="text-accent" />
          </div>
          <span className="text-sm font-medium text-muted">
            {platformInfo.name}
          </span>
        </div>
        <span className={statusConfig.className}>
          <StatusIcon size={12} />
          {statusConfig.label}
        </span>
      </div>

      <p className="text-sm text-ink dark:text-cream line-clamp-3 mb-3 leading-relaxed">
        {post.content}
      </p>

      <div className="flex items-center justify-between text-xs text-muted">
        <span>{format(new Date(post.createdAt), "MMM d, yyyy")}</span>
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1">
            <Share2 size={12} />
            {post.engagement?.shares || 0}
          </span>
          <span className="flex items-center gap-1">
            <CheckCircle2 size={12} />
            {post.engagement?.clicks || 0}
          </span>
        </div>
      </div>
    </div>
  );
}
