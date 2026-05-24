"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { Card } from "@/components/ui/card";
import { loadFeed, saveFeed } from "@/lib/persistence";
import type { FeedEntry } from "@/lib/persistence";

const LifeOSTab = dynamic(() => import("@/components/LifeOSTab"), { ssr: false });

export default function LifeOSPage() {
  const [bauEntries, setBauEntries] = useState<FeedEntry[]>(() => {
    const saved = loadFeed();
    return saved.length > 0 ? saved : [];
  });

  const feedTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => {
    if (feedTimerRef.current) clearTimeout(feedTimerRef.current);
    feedTimerRef.current = setTimeout(() => saveFeed(bauEntries), 300);
    return () => { if (feedTimerRef.current) clearTimeout(feedTimerRef.current); };
  }, [bauEntries]);

  const handleFeedAdd = useCallback((entry: { avatar: string; name: string; text: string }) => {
    setBauEntries(prev => [{
      id: `lifeos-${Date.now()}`,
      avatar: entry.avatar,
      name: entry.name,
      text: entry.text,
      time: 'Just now',
      type: 'task' as const,
    }, ...prev]);
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-2 h-2 rounded-full" style={{ background: '#0EA5A5' }} />
        <h2 className="text-sm font-mono font-semibold tracking-wider" style={{ color: '#0EA5A5' }}>LIFEOS</h2>
        <span className="text-[10px] font-mono" style={{ color: '#666666' }}>// plugin ecosystem</span>
      </div>

      <Card className="p-4 sm:p-6" style={{
        background: '#FFFFFF',
        border: '1px solid #E5E0D8',
        borderRadius: '20px',
        boxShadow: '0 10px 30px -10px rgba(31,31,31,0.08)',
      }}>
        <LifeOSTab onFeedAdd={handleFeedAdd} />
      </Card>
    </div>
  );
}
