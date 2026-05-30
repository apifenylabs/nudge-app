'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, CheckCircle, Download, FileText, Sparkles } from 'lucide-react';

// ── Modal mode (used by FreeTemplateSection) ──────────────
interface ModalProps {
 isOpen: boolean;
 onClose: () => void;
 prompt: string;
 playbookTitle: string;
}

// ── Inline mode (used by ai-solopreneur-toolkit etc.) ────
interface InlineProps {
 templateContent: string;
 templateTitle?: string;
 playbookSlug: string;
 playbookTitle?: string;
 gradient?: string;
}

type EmailCaptureProps = ModalProps | InlineProps;

const LS_KEY = 'apifeny-emails';

function isModalProps(props: EmailCaptureProps): props is ModalProps {
 return 'isOpen' in props && 'onClose' in props;
}

function isInlineProps(props: EmailCaptureProps): props is InlineProps {
 return 'templateContent' in props && 'playbookSlug' in props;
}

// ── Modal variant ─────────────────────────────────────────

function ModalEmailCapture({ isOpen, onClose, prompt, playbookTitle }: ModalProps) {
 const [email, setEmail] = useState('');
 const [submitted, setSubmitted] = useState(false);
 const [error, setError] = useState('');

 const handleSubmit = useCallback(
 (e: React.FormEvent) => {
 e.preventDefault();
 setError('');

 const trimmed = email.trim().toLowerCase();
 const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

 if (!trimmed) {
 setError('Please enter your email address.');
 return;
 }
 if (!emailRegex.test(trimmed)) {
 setError('Please enter a valid email address.');
 return;
 }

 try {
 const existing = JSON.parse(localStorage.getItem(LS_KEY) || '[]');
 if (!existing.includes(trimmed)) {
 existing.push(trimmed);
 localStorage.setItem(LS_KEY, JSON.stringify(existing));
 }
 } catch {
 // localStorage unavailable
 }

 setSubmitted(true);
 },
 [email]
 );

 useEffect(() => {
 const handleEsc = (e: KeyboardEvent) => {
 if (e.key === 'Escape') onClose();
 };
 if (isOpen) {
 document.addEventListener('keydown', handleEsc);
 document.body.style.overflow = 'hidden';
 }
 return () => {
 document.removeEventListener('keydown', handleEsc);
 document.body.style.overflow = '';
 };
 }, [isOpen, onClose]);

 return (
 <AnimatePresence>
 {isOpen && (
 <motion.div
 className="fixed inset-0 z-50 flex items-center justify-center p-4"
 initial={{ opacity: 0 }}
 animate={{ opacity: 1 }}
 exit={{ opacity: 0 }}
 transition={{ duration: 0.2 }}
 >
 <motion.div
 className="absolute inset-0 bg-black/60 backdrop-blur-sm"
 initial={{ opacity: 0 }}
 animate={{ opacity: 1 }}
 exit={{ opacity: 0 }}
 onClick={onClose}
 />

 <motion.div
 className="relative w-full max-w-md rounded-2xl bg-gradient-to-br from-gray-900 via-tech-800 to-gray-900 border border-tech-500/30 shadow-2xl overflow-hidden"
 initial={{ opacity: 0, scale: 0.9, y: 20 }}
 animate={{ opacity: 1, scale: 1, y: 0 }}
 exit={{ opacity: 0, scale: 0.95, y: 10 }}
 transition={{ type: 'spring', damping: 25, stiffness: 300 }}
 >
 <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-neon/10 blur-3xl" />
 <div className="absolute -bottom-20 -left-20 w-40 h-40 rounded-full bg-aqua/10 blur-3xl" />

 <button
 onClick={onClose}
 className="absolute top-4 right-4 z-10 p-1.5 rounded-lg bg-tech-600/50 text-tech-300 hover:bg-tech-500 hover:text-white transition-colors"
 >
 <X className="w-4 h-4" />
 </button>

 <div className="relative p-6 sm:p-8">
 {!submitted ? (
 <>
 <div className="w-12 h-12 rounded-xl bg-neon/20 border border-neon/30 flex items-center justify-center mb-4">
 <Download className="w-6 h-6 text-neon-light" />
 </div>

 <h3 className="text-lg font-bold text-white mb-1">
 Get Your Free Template
 </h3>
 <p className="text-sm text-tech-200 mb-5">
 Enter your email and we&apos;ll send you the exact ChatGPT prompt to kickstart{' '}
 <span className="text-neon-light font-semibold">{playbookTitle}</span>.
 </p>

 <div className="mb-5 p-3 rounded-lg bg-tech-700/50 border border-tech-500/20">
 <p className="text-[11px] text-tech-300 font-medium mb-1.5 flex items-center gap-1">
 <Mail className="w-3 h-3" />
 Your prompt preview:
 </p>
 <p className="text-xs text-tech-100 leading-relaxed line-clamp-4">
 {prompt}
 </p>
 </div>

 <form onSubmit={handleSubmit} className="space-y-3">
 <div>
 <input
 type="email"
 value={email}
 onChange={(e) => {
 setEmail(e.target.value);
 if (error) setError('');
 }}
 placeholder="you@email.com"
 className="w-full px-4 py-3 rounded-xl bg-tech-700/60 border border-tech-500/30 text-white text-sm placeholder-tech-400 focus:outline-none focus:border-neon/50 focus:ring-2 focus:ring-neon/20 transition-all"
 />
 {error && (
 <p className="text-xs text-rose-400 mt-1.5">{error}</p>
 )}
 </div>
 <button
 type="submit"
 className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-neon to-aqua text-white text-sm font-semibold hover:shadow-lg hover:shadow-neon/20 transition-all hover:-translate-y-0.5"
 >
 <Download className="w-4 h-4" />
 Send Me My Free Template
 </button>
 </form>

 <p className="text-[10px] text-tech-500 text-center mt-3">
 No spam. Unsubscribe anytime.
 </p>
 </>
 ) : (
 <motion.div
 className="text-center py-4"
 initial={{ opacity: 0, y: 10 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ delay: 0.1 }}
 >
 <motion.div
 className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center mx-auto mb-4"
 initial={{ scale: 0 }}
 animate={{ scale: 1 }}
 transition={{ type: 'spring', damping: 15, stiffness: 200 }}
 >
 <CheckCircle className="w-8 h-8 text-emerald-400" />
 </motion.div>
 <h3 className="text-lg font-bold text-white mb-1">
 ✅ Check your email!
 </h3>
 <p className="text-sm text-tech-200 mb-2">
 Here&apos;s your free template for{' '}
 <span className="text-neon-light font-semibold">{playbookTitle}</span>.
 </p>
 <p className="text-xs text-tech-300">
 Copy-paste the prompt into ChatGPT to get started right now.
 </p>
 </motion.div>
 )}
 </div>
 </motion.div>
 </motion.div>
 )}
 </AnimatePresence>
 );
}

// ── Inline variant ────────────────────────────────────────

function InlineEmailCapture({
 templateContent,
 templateTitle,
 playbookSlug,
 playbookTitle,
 gradient,
}: InlineProps) {
 const [email, setEmail] = useState('');
 const [submitted, setSubmitted] = useState(false);
 const [error, setError] = useState('');

 const handleSubmit = (e: React.FormEvent) => {
 e.preventDefault();
 setError('');

 const trimmed = email.trim().toLowerCase();
 const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

 if (!trimmed) {
 setError('Please enter your email address.');
 return;
 }
 if (!emailRegex.test(trimmed)) {
 setError('Please enter a valid email address.');
 return;
 }

 try {
 const existing = JSON.parse(localStorage.getItem(LS_KEY) || '[]');
 if (!existing.includes(trimmed)) {
 existing.push(trimmed);
 localStorage.setItem(LS_KEY, JSON.stringify(existing));
 }
 } catch {
 // localStorage unavailable
 }

 setSubmitted(true);
 };

 return (
 <div
 className={`rounded-xl border border-amber-500/20 bg-gradient-to-r ${gradient || 'from-amber-500/10 to-orange-500/10'} relative overflow-hidden`}
 >
 <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,183,77,0.08),transparent_50%)]" />
 <div className="relative p-5 sm:p-6">
 <div className="flex items-center gap-2 mb-3">
 <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-400 text-[10px] font-semibold border border-amber-500/25">
 <FileText className="w-3 h-3" />
 Free Template
 </span>
 </div>

 <h3 className="text-sm font-semibold text-white mb-1">
 {templateTitle || 'Free ChatGPT Prompt Template'}
 </h3>
 <p className="text-xs text-tech-200 mb-3">
 Copy-paste this prompt into ChatGPT to get started right now.{' '}
 {playbookTitle && (
 <span className="text-neon-light">Part of the {playbookTitle} playbook.</span>
 )}
 </p>

 <div className="mb-4 p-3 rounded-lg bg-tech-700/50 border border-tech-500/20">
 <pre className="text-[11px] text-tech-100 leading-relaxed whitespace-pre-wrap font-sans">
 {templateContent}
 </pre>
 </div>

 {!submitted ? (
 <form onSubmit={handleSubmit} className="space-y-3">
 <p className="text-xs text-tech-300 font-medium flex items-center gap-1">
 <Mail className="w-3.5 h-3.5" />
 Want this sent to your email?
 </p>
 <div className="flex flex-col sm:flex-row gap-2">
 <input
 type="email"
 value={email}
 onChange={(e) => {
 setEmail(e.target.value);
 if (error) setError('');
 }}
 placeholder="you@email.com"
 className="flex-1 px-3 py-2 rounded-lg bg-tech-700/60 border border-tech-500/30 text-white text-xs placeholder-tech-400 focus:outline-none focus:border-amber-500/50 focus:ring-2 focus:ring-amber-500/20 transition-all"
 />
 <button
 type="submit"
 className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-semibold hover:shadow-lg hover:shadow-amber-500/20 transition-all hover:-translate-y-0.5 shrink-0"
 >
 <Download className="w-3.5 h-3.5" />
 Send Free Template
 </button>
 </div>
 {error && <p className="text-xs text-rose-400">{error}</p>}
 <p className="text-[10px] text-tech-500">No spam. Unsubscribe anytime.</p>
 </form>
 ) : (
 <motion.div
 initial={{ opacity: 0, y: 5 }}
 animate={{ opacity: 1, y: 0 }}
 className="flex items-center gap-2 p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20"
 >
 <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
 <div>
 <p className="text-sm font-semibold text-emerald-300">
 ✅ Check your email!
 </p>
 <p className="text-xs text-tech-200">
 Here&apos;s your free template. Copy-paste it into ChatGPT to get started now.
 </p>
 </div>
 </motion.div>
 )}
 </div>
 </div>
 );
}

// ── Component ─────────────────────────────────────────────

export default function EmailCapture(props: EmailCaptureProps) {
 if (isInlineProps(props)) {
 return <InlineEmailCapture {...props} />;
 }
 // Default to modal
 return <ModalEmailCapture {...(props as ModalProps)} />;
}
