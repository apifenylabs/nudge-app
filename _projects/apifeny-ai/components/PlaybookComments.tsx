'use client';

import { useState, useEffect } from 'react';
import { MessageSquare, Send, Reply, ChevronDown, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

// ─── Types ───

interface ReplyComment {
 id: string;
 name: string;
 text: string;
 createdAt: string;
}

interface PlaybookComment {
 id: string;
 name: string;
 text: string;
 createdAt: string;
 replies: ReplyComment[];
}

interface PlaybookCommentsProps {
 playbookId: string;
 playbookTitle: string;
}

// ─── Helpers ───

function getStorageKey(id: string) {
 return `apifeny_cp_comments_${id}`;
}

function loadComments(id: string): PlaybookComment[] {
 if (typeof window === 'undefined') return [];
 try {
 const data = localStorage.getItem(getStorageKey(id));
 return data ? JSON.parse(data) : [];
 } catch {
 return [];
 }
}

function saveComments(id: string, comments: PlaybookComment[]) {
 try {
 localStorage.setItem(getStorageKey(id), JSON.stringify(comments));
 } catch {
 // Silently fail
 }
}

// ─── Component ───

export default function PlaybookComments({ playbookId, playbookTitle }: PlaybookCommentsProps) {
 const [comments, setComments] = useState<PlaybookComment[]>([]);
 const [name, setName] = useState('');
 const [text, setText] = useState('');
 const [replyTo, setReplyTo] = useState<string | null>(null);
 const [replyText, setReplyText] = useState('');
 const [replyName, setReplyName] = useState('');
 const [expandedReplies, setExpandedReplies] = useState<Record<string, boolean>>({});

 // Load comments on mount
 useEffect(() => {
 setComments(loadComments(playbookId));
 }, [playbookId]);

 const handleSubmit = (e: React.FormEvent) => {
 e.preventDefault();
 if (!name.trim() || !text.trim()) return;

 const newComment: PlaybookComment = {
 id: Date.now().toString(),
 name: name.trim(),
 text: text.trim(),
 createdAt: new Date().toISOString(),
 replies: [],
 };

 const updated = [newComment, ...comments];
 setComments(updated);
 saveComments(playbookId, updated);

 setName('');
 setText('');
 };

 const handleReply = (parentId: string) => {
 if (!replyName.trim() || !replyText.trim()) return;

 const newReply: ReplyComment = {
 id: `reply-${Date.now()}`,
 name: replyName.trim(),
 text: replyText.trim(),
 createdAt: new Date().toISOString(),
 };

 const updated = comments.map((c) =>
 c.id === parentId
 ? { ...c, replies: [...c.replies, newReply] }
 : c
 );
 setComments(updated);
 saveComments(playbookId, updated);

 setReplyTo(null);
 setReplyText('');
 setReplyName('');
 setExpandedReplies((prev) => ({ ...prev, [parentId]: true }));
 };

 const totalComments = comments.reduce((sum, c) => sum + 1 + c.replies.length, 0);

 return (
 <div className="rounded-xl border border-tech-500/30 bg-tech-700/80 p-4 sm:p-6">
 {/* Header */}
 <div className="flex items-center justify-between mb-4">
 <div className="flex items-center gap-2">
 <MessageSquare className="w-4 h-4 text-neon-light" />
 <h3 className="text-sm font-semibold text-white">Discussion</h3>
 <span className="text-xs text-tech-300 bg-tech-800 px-2 py-0.5 rounded-full">
 {totalComments} comment{totalComments !== 1 ? 's' : ''}
 </span>
 </div>
 </div>

 {/* Form */}
 <div className="mb-4 p-3 rounded-lg bg-tech-800/60 border border-tech-500/20">
 <form onSubmit={handleSubmit} className="space-y-2">
 <input
 type="text"
 value={name}
 onChange={(e) => setName(e.target.value)}
 placeholder="Your name"
 className="w-full bg-tech-900 border border-tech-500/30 rounded-lg px-3 py-2 text-xs text-white placeholder:text-tech-300 focus:outline-none focus:border-neon/50"
 required
 />
 <textarea
 value={text}
 onChange={(e) => setText(e.target.value)}
 placeholder={`Share your thoughts about "${playbookTitle}"…`}
 rows={2}
 className="w-full bg-tech-900 border border-tech-500/30 rounded-lg px-3 py-2 text-xs text-white placeholder:text-tech-300 focus:outline-none focus:border-neon/50 resize-none"
 required
 />
 <div className="flex items-center justify-between">
 <p className="text-[9px] text-tech-300">
 Comments are saved locally (cloud sync coming soon).
 </p>
 <button
 type="submit"
 disabled={!name.trim() || !text.trim()}
 className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neon hover:bg-neon-dark text-white text-xs font-medium transition disabled:opacity-30 disabled:pointer-events-none"
 >
 <Send className="w-3 h-3" />
 Post Comment
 </button>
 </div>
 </form>
 </div>

 {/* Comments list */}
 {comments.length > 0 ? (
 <div className="space-y-3">
 {comments.map((c) => (
 <div
 key={c.id}
 className="p-3 rounded-lg bg-tech-800/40 border border-tech-500/10 transition hover:border-tech-500/30"
 >
 <div className="flex items-start justify-between gap-2 mb-1">
 <div className="flex items-center gap-2">
 <div className="w-6 h-6 rounded-full bg-gradient-to-br from-tech-500 to-tech-600 flex items-center justify-center text-[9px] font-bold text-white shrink-0">
 {c.name[0].toUpperCase()}
 </div>
 <span className="text-xs font-medium text-white">{c.name}</span>
 <span className="text-[10px] text-tech-300">
 {new Date(c.createdAt).toLocaleDateString()}
 </span>
 </div>
 </div>
 <p className="text-xs text-tech-100 leading-relaxed ml-8 mb-2">{c.text}</p>

 {/* Reply button */}
 {replyTo !== c.id && (
 <button
 onClick={() => {
 setReplyTo(c.id);
 setReplyName('');
 setReplyText('');
 }}
 className="ml-8 inline-flex items-center gap-1 text-[10px] text-tech-300 hover:text-neon-light transition"
 >
 <Reply className="w-3 h-3" />
 Reply
 </button>
 )}

 {/* Reply form */}
 {replyTo === c.id && (
 <div className="ml-8 mt-2 p-2 rounded-lg bg-tech-900/60 border border-tech-500/20">
 <div className="space-y-1.5">
 <input
 type="text"
 value={replyName}
 onChange={(e) => setReplyName(e.target.value)}
 placeholder="Your name"
 className="w-full bg-tech-800 border border-tech-500/30 rounded px-2 py-1 text-[11px] text-white placeholder:text-tech-300 focus:outline-none focus:border-neon/50"
 autoFocus
 />
 <textarea
 value={replyText}
 onChange={(e) => setReplyText(e.target.value)}
 placeholder="Write a reply…"
 rows={1}
 className="w-full bg-tech-800 border border-tech-500/30 rounded px-2 py-1 text-[11px] text-white placeholder:text-tech-300 focus:outline-none focus:border-neon/50 resize-none"
 />
 <div className="flex items-center gap-1.5 justify-end">
 <button
 onClick={() => setReplyTo(null)}
 className="text-[10px] text-tech-300 hover:text-white transition px-2 py-1"
 >
 Cancel
 </button>
 <button
 onClick={() => handleReply(c.id)}
 disabled={!replyName.trim() || !replyText.trim()}
 className="inline-flex items-center gap-1 px-2 py-1 rounded bg-neon hover:bg-neon-dark text-white text-[10px] font-medium transition disabled:opacity-30 disabled:pointer-events-none"
 >
 <Send className="w-2.5 h-2.5" />
 Reply
 </button>
 </div>
 </div>
 </div>
 )}

 {/* Replies */}
 {c.replies.length > 0 && (
 <div className="ml-8 mt-2">
 <button
 onClick={() =>
 setExpandedReplies((prev) => ({
 ...prev,
 [c.id]: !prev[c.id],
 }))
 }
 className="inline-flex items-center gap-1 text-[10px] text-tech-300 hover:text-neon-light transition mb-1"
 >
 {expandedReplies[c.id] !== false ? (
 <ChevronDown className="w-3 h-3" />
 ) : (
 <ChevronRight className="w-3 h-3" />
 )}
 {c.replies.length} repl{c.replies.length !== 1 ? 'ies' : 'y'}
 </button>
 {(expandedReplies[c.id] !== false) && (
 <div className="space-y-1.5 mt-1">
 {c.replies.map((r) => (
 <div
 key={r.id}
 className="p-2 rounded-lg bg-tech-900/40 border border-tech-500/10"
 >
 <div className="flex items-center gap-1.5 mb-0.5">
 <div className="w-4 h-4 rounded-full bg-gradient-to-br from-tech-400 to-tech-500 flex items-center justify-center text-[7px] font-bold text-white shrink-0">
 {r.name[0].toUpperCase()}
 </div>
 <span className="text-[10px] font-medium text-tech-50">{r.name}</span>
 <span className="text-[9px] text-tech-300">
 {new Date(r.createdAt).toLocaleDateString()}
 </span>
 </div>
 <p className="text-[10px] text-tech-100 leading-relaxed ml-5.5">{r.text}</p>
 </div>
 ))}
 </div>
 )}
 </div>
 )}
 </div>
 ))}
 </div>
 ) : (
 <div className="text-center py-6">
 <MessageSquare className="w-8 h-8 text-tech-400 mx-auto mb-2" />
 <p className="text-xs text-tech-200">
 No comments yet. Start the discussion!
 </p>
 </div>
 )}
 </div>
 );
}
