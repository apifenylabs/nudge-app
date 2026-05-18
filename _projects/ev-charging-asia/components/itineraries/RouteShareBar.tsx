'use client';

import { Share2, ExternalLink, Check, Copy } from 'lucide-react';
import { useState } from 'react';

interface RouteShareBarProps {
  title: string;
  slug: string;
}

export default function RouteShareBar({ title, slug }: RouteShareBarProps) {
  const [copied, setCopied] = useState(false);
  const url = `https://ev-charging-asia.vercel.app/routes/${slug}`;
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(`EV Road Trip: ${title}`);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const textArea = document.createElement('textarea');
      textArea.value = url;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const shareViaWebShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `EV Road Trip: ${title}`,
          text: `Check out this EV road trip: ${title}`,
          url,
        });
      } catch {
        // User cancelled
      }
    } else {
      handleCopyLink();
    }
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={shareViaWebShare}
        className="flex items-center gap-1.5 px-3 py-2 bg-white border border-gray-200 rounded-lg text-xs font-medium text-gray-600 hover:bg-gray-50 hover:border-gray-300 transition-all"
        aria-label="Share this route"
      >
        <Share2 size={14} />
        <span>Share</span>
      </button>
      <a
        href={`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-1.5 px-3 py-2 bg-white border border-gray-200 rounded-lg text-xs font-medium text-[#1DA1F2] hover:bg-[#F5F8FA] hover:border-[#1DA1F2]/30 transition-all"
        aria-label="Share on Twitter/X"
      >
        <span className="text-sm leading-none">𝕏</span>
      </a>
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-1.5 px-3 py-2 bg-white border border-gray-200 rounded-lg text-xs font-medium text-[#1877F2] hover:bg-[#F0F2F5] hover:border-[#1877F2]/30 transition-all"
        aria-label="Share on Facebook"
      >
        <span className="text-sm leading-none font-bold">f</span>
      </a>
      <a
        href={`mailto:?subject=${encodedTitle}&body=Check out this EV road trip: ${encodedUrl}`}
        className="flex items-center gap-1.5 px-3 py-2 bg-white border border-gray-200 rounded-lg text-xs font-medium text-gray-500 hover:bg-gray-50 hover:border-gray-300 transition-all"
        aria-label="Share via email"
      >
        <ExternalLink size={14} />
      </a>
      <button
        onClick={handleCopyLink}
        className={`flex items-center gap-1.5 px-3 py-2 border rounded-lg text-xs font-medium transition-all ${
          copied
            ? 'bg-emerald-50 border-emerald-200 text-emerald-600'
            : 'bg-white border-gray-200 text-gray-500 hover:bg-gray-50 hover:border-gray-300'
        }`}
        aria-label="Copy link"
      >
        {copied ? <Check size={14} /> : <Copy size={14} />}
        <span>{copied ? 'Copied!' : 'Copy link'}</span>
      </button>
    </div>
  );
}
