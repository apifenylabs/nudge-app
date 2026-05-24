"use client";

import { useState, useCallback, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Save, Star, Bot, Shield, Download, ChevronRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { runMockAudit, type AuditResult } from "@/lib/certification";
import type { Skill } from "@/types";
import { loadSkills, saveSkills, loadFeed, saveFeed, loadAudits, saveAudits } from "@/lib/persistence";
import type { FeedEntry, AuditRecord } from "@/lib/persistence";

import {
  useProgressionGame,
  getAchievementById,
  checkAchievements,
  SKILL_TEMPLATES,
} from "@/lib/dashboard-store";
import type { ProgressionState } from "@/lib/dashboard-store";

export default function ForgePage() {
  const [progression, setProgression] = useProgressionGame();
  const [editorCode, setEditorCode] = useState<string>(SKILL_TEMPLATES[0].code);
  const [savedSkills, setSavedSkills] = useState<Skill[]>(() => loadSkills());
  const [skillName, setSkillName] = useState('');
  const [skillSaving, setSkillSaving] = useState(false);
  const [skillsLoaded, setSkillsLoaded] = useState(false);
  const [runningSkill, setRunningSkill] = useState(false);
  const [bauEntries, setBauEntries] = useState<FeedEntry[]>(() => {
    const saved = loadFeed();
    return saved.length > 0 ? saved : [];
  });

  // Certification modal
  const [auditResult, setAuditResult] = useState<AuditResult | null>(null);
  const [showAuditModal, setShowAuditModal] = useState(false);
  const [certifiedSkill, setCertifiedSkill] = useState<string | null>(null);
  const [certifiedTier, setCertifiedTier] = useState<AuditResult['auditTier'] | null>(null);
  const [certifiedScore, setCertifiedScore] = useState<number>(0);
  const [auditHistory, setAuditHistory] = useState<AuditRecord[]>(() => loadAudits());

  // Persistence
  useEffect(() => { if (savedSkills.length > 0 || skillsLoaded) saveSkills(savedSkills); }, [savedSkills, skillsLoaded]);
  useEffect(() => { setSkillsLoaded(true); }, []);
  useEffect(() => { saveAudits(auditHistory); }, [auditHistory]);

  const feedTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => {
    if (feedTimerRef.current) clearTimeout(feedTimerRef.current);
    feedTimerRef.current = setTimeout(() => saveFeed(bauEntries), 300);
    return () => { if (feedTimerRef.current) clearTimeout(feedTimerRef.current); };
  }, [bauEntries]);

  const addFeedEntry = useCallback((entry: FeedEntry) => {
    setBauEntries(prev => [entry, ...prev].slice(0, 50));
  }, []);

  const grantXp = useCallback((xp: number, extras?: any) => {
    setProgression((prev: ProgressionState) => ({
      totalXp: prev.totalXp + xp,
      achievements: checkAchievements({ ...prev, totalXp: prev.totalXp + xp }, extras),
    }));
  }, [setProgression]);

  const grantCertXp = useCallback((tier: string) => {
    const xpMap: Record<string, number> = { gold: 200, silver: 100, bronze: 50 };
    const xp = xpMap[tier] || 0;
    setProgression((prev: ProgressionState) => {
      const newXp = prev.totalXp + xp;
      const newCert = prev.skillsCertified + (tier !== 'uncertified' ? 1 : 0);
      const newGold = prev.goldSkills + (tier === 'gold' ? 1 : 0);
      return {
        totalXp: newXp,
        totalTasksRun: prev.totalTasksRun,
        skillsCertified: newCert,
        goldSkills: newGold,
        achievements: checkAchievements({ ...prev, totalXp: newXp, skillsCertified: newCert, goldSkills: newGold }),
        lastSavedAt: new Date().toISOString(),
      };
    });
  }, [setProgression]);

  const handleRunSkill = useCallback(async (name: string, code: string) => {
    setRunningSkill(true);
    const mockResults = [
      'Completed deep research analysis',
      'Generated comprehensive report with 12 sources',
      'Sent notification to all subscribed agents',
      `Successfully executed ${name} — ${code.split('\n').length} lines parsed`,
      `Output saved to BAU feed (${Date.now()})`,
    ];
    const resultSnippet = mockResults[Math.floor(Math.random() * mockResults.length)];
    addFeedEntry({
      id: `run-${Date.now()}`, avatar: '⚡', name: name,
      text: resultSnippet, time: 'Just now', type: 'task',
    });
    setProgression((prev: ProgressionState) => {
      const newXp = prev.totalXp + 25;
      const newTasks = prev.totalTasksRun + 1;
      return {
        totalXp: newXp,
        totalTasksRun: newTasks,
        skillsCertified: prev.skillsCertified,
        goldSkills: prev.goldSkills,
        achievements: checkAchievements({ ...prev, totalXp: newXp, totalTasksRun: newTasks }),
        lastSavedAt: new Date().toISOString(),
      };
    });
    setRunningSkill(false);
  }, [addFeedEntry, setProgression]);

  const handleSaveSkill = useCallback(async () => {
    if (!skillName.trim()) return;
    setSkillSaving(true);
    const localSkill: Skill = {
      id: `local-${Date.now()}`,
      agentId: 'forge',
      name: skillName.trim(),
      description: `Skill: ${skillName.trim()}`,
      skillMd: editorCode,
      certified: false,
      auditScore: null,
      auditTier: null,
      auditReport: null,
      createdAt: new Date().toISOString(),
    };
    setSavedSkills(prev => [...prev, localSkill]);
    const newSkillCount = savedSkills.length + 1;
    grantXp(25, { skillCount: newSkillCount });
    addFeedEntry({
      id: `save-${Date.now()}`, avatar: '⚡', name: 'Forge',
      text: `Created skill: "${skillName.trim()}"`,
      time: 'Just now', type: 'task',
    });
    setSkillSaving(false);
    setSkillName('');
  }, [skillName, editorCode, savedSkills.length, addFeedEntry, grantXp]);

  const handleAuditSkill = useCallback(() => {
    const currentName = skillName.trim() || 'Untitled Skill';
    const result = runMockAudit(currentName, editorCode);
    setAuditResult(result);
    setShowAuditModal(true);
    setCertifiedSkill(currentName);
    setCertifiedTier(result.auditTier);
    setCertifiedScore(result.overallScore);

    const auditRec: AuditRecord = {
      skillId: `audit-${Date.now()}`,
      skillName: currentName,
      score: result.overallScore,
      tier: result.auditTier,
      timestamp: new Date().toISOString(),
      violations: result.violations,
    };
    setAuditHistory(prev => [auditRec, ...prev]);
    grantCertXp(result.auditTier);

    setSavedSkills(prev => prev.map(s =>
      s.name === currentName
        ? { ...s, certified: result.auditTier !== 'uncertified', auditScore: result.overallScore, auditTier: result.auditTier }
        : s
    ));

    const tierEmoji = result.auditTier === 'gold' ? '🌟' : result.auditTier === 'silver' ? '🥈' : result.auditTier === 'bronze' ? '🥉' : '⚠️';
    addFeedEntry({
      id: `audit-${Date.now()}`, avatar: tierEmoji, name: currentName,
      text: `Certified ${result.auditTier.toUpperCase()} (${result.overallScore}%)`,
      time: 'Just now', type: 'achievement',
    });
  }, [skillName, editorCode, grantCertXp, addFeedEntry]);

  const handleCloseAuditModal = useCallback(() => {
    setShowAuditModal(false);
    setAuditResult(null);
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-2 h-2 rounded-full" style={{ background: '#D4A017' }} />
        <h2 className="text-sm font-mono font-semibold tracking-wider" style={{ color: '#D4A017' }}>SKILL WORKSHOP</h2>
        <span className="text-[10px] font-mono" style={{ color: '#666666' }}>// craft, compile, certify</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Templates */}
        <Card className="p-4" style={{
          background: '#FFFFFF',
          border: '1px solid #E5E0D8',
          borderLeft: '3px solid #D4A017',
          borderRadius: '20px',
          boxShadow: '0 10px 30px -10px rgba(31,31,31,0.08)',
        }}>
          <h3 className="text-sm font-semibold mb-3 flex items-center gap-2" style={{ color: '#D4A017' }}>
            <Star className="h-3.5 w-3.5" />Templates
          </h3>
          <div className="space-y-2">
            {SKILL_TEMPLATES.map((t, i) => (
              <motion.div
                key={i}
                className="p-2.5 rounded-lg cursor-pointer transition-all"
                style={{
                  background: '#F8F6F3',
                  border: '1px solid #E5E0D8',
                }}
                whileHover={{ x: 3 }}
                onClick={() => { setEditorCode(t.code); setSkillName(t.name); }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-medium" style={{ color: '#1F1F1F' }}>{t.name}</p>
                    <p className="text-[10px]" style={{ color: '#666666' }}>{t.desc}</p>
                  </div>
                  <Badge className="text-[9px]" style={{
                    background: 'rgba(212,160,23,0.15)',
                    color: '#D4A017',
                    borderColor: 'rgba(212,160,23,0.3)'
                  }}>{t.level}</Badge>
                </div>
              </motion.div>
            ))}
            {skillsLoaded && savedSkills.length > 0 && (
              <>
                <div className="border-t pt-3 mt-3" style={{ borderColor: '#E5E0D8' }}>
                  <h4 className="text-[10px] font-mono mb-2 uppercase tracking-wider" style={{ color: '#666666' }}>
                    <Download className="h-2.5 w-2.5 inline mr-1" />
                    Saved Skills ({savedSkills.length})
                  </h4>
                  {savedSkills.map((s) => (
                    <motion.div key={s.id} className="p-2 rounded-lg cursor-pointer transition-all mb-1.5"
                      style={{ background: '#F8F6F3', border: '1px solid #E5E0D8' }}
                      whileHover={{ x: 2 }}
                      onClick={() => { setEditorCode(s.skillMd); setSkillName(s.name); }}>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-[11px] font-medium" style={{ color: '#1F1F1F' }}>{s.name}</p>
                          <p className="text-[9px] font-mono" style={{ color: '#666666' }}>
                            {s.auditTier ? (
                              <span style={{
                                color: s.auditTier === 'gold' ? '#D4A017' : s.auditTier === 'silver' ? '#94A3B8' : s.auditTier === 'bronze' ? '#D97706' : '#EF4444'
                              }}>
                                {s.auditTier.toUpperCase()} · {s.auditScore}%
                              </span>
                            ) : 'Not certified'}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </>
            )}
          </div>
        </Card>

        {/* Code Editor */}
        <Card className="p-4" style={{
          background: '#FFFFFF',
          border: '1px solid #E5E0D8',
          borderTop: '3px solid #D4A017',
          borderRadius: '20px',
          boxShadow: '0 10px 30px -10px rgba(31,31,31,0.08)',
        }}>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2 flex-1">
              <h3 className="text-sm font-semibold" style={{ color: '#D4A017' }}>SKILL EDITOR</h3>
              <input
                value={skillName}
                onChange={(e) => setSkillName(e.target.value)}
                placeholder="Skill name..."
                className="bg-transparent border-b text-xs font-mono outline-none px-1 py-0.5 max-w-[140px]"
                style={{
                  borderColor: '#E5E0D8',
                  color: '#1F1F1F',
                }}
              />
            </div>
            <Badge className="text-[9px] font-mono" style={{
              background: 'rgba(212,160,23,0.15)',
              color: '#D4A017',
              borderColor: 'rgba(212,160,23,0.3)',
            }}>v1 · Draft</Badge>
          </div>
          <textarea
            value={editorCode}
            onChange={(e) => setEditorCode(e.target.value)}
            className="rounded-lg p-3 font-mono text-[11px] leading-relaxed border min-h-[240px] w-full resize-y outline-none"
            style={{
              background: '#F8F6F3',
              borderColor: '#E5E0D8',
              color: '#1F1F1F',
            }}
            spellCheck={false}
            placeholder="// Write your skill code here..."
          />
          <div className="flex gap-2 mt-3">
            <Button
              className="flex-1 font-semibold text-xs border-0 gap-1"
              style={{
                background: 'linear-gradient(135deg, #0EA5A5, #0D9488)',
                color: '#FFFFFF',
                height: '56px',
                borderRadius: '16px',
              }}
              onClick={() => handleRunSkill(skillName.trim() || 'Untitled Skill', editorCode)}
              disabled={runningSkill}
            >
              <Play className="h-3 w-3" />
              {runningSkill ? 'Running...' : 'Run Skill'}
            </Button>
            <Button
              className="flex-1 font-semibold text-xs border-0"
              style={{
                background: 'linear-gradient(135deg, #D4A017, #D97706)',
                color: '#FFFFFF',
                height: '56px',
                borderRadius: '16px',
              }}
              onClick={handleAuditSkill}
            >
              Audit &amp; Certify
            </Button>
            <Button
              variant="outline"
              className="text-xs gap-1 shrink-0"
              style={{
                borderColor: 'rgba(212,160,23,0.3)',
                color: '#D4A017',
                height: '56px',
                borderRadius: '16px',
              }}
              onClick={handleSaveSkill}
              disabled={skillSaving || !skillName.trim()}
            >
              <Save className="h-3 w-3" />
              {skillSaving ? 'Saving...' : 'Save Skill'}
            </Button>
          </div>
        </Card>

        {/* Preview */}
        <Card className="p-4" style={{
          background: '#FFFFFF',
          border: '1px solid #E5E0D8',
          borderRight: '3px solid #D4A017',
          borderRadius: '20px',
          boxShadow: '0 10px 30px -10px rgba(31,31,31,0.08)',
        }}>
          <h3 className="text-sm font-semibold mb-3 flex items-center gap-2" style={{ color: '#D4A017' }}>
            <Bot className="h-3.5 w-3.5" />Preview
          </h3>
          <div className="flex flex-col items-center py-6">
            <motion.div className="w-24 h-24 rounded-2xl flex items-center justify-center text-3xl border mb-3"
              style={{
                background: 'linear-gradient(135deg, rgba(212,160,23,0.2), rgba(14,165,165,0.1))',
                borderColor: 'rgba(212,160,23,0.2)',
              }}
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 3, repeat: Infinity }}>
              {skillName ? '🌍' : '🌍'}
            </motion.div>
            <p className="font-mono text-sm font-medium" style={{ color: '#1F1F1F' }}>{skillName || 'Travel Guide v2'}</p>
            {certifiedTier && certifiedSkill === (skillName || 'Untitled Skill') && (
              <Badge className="mt-1 text-[9px] font-mono" style={{
                background: certifiedTier === 'gold' ? 'rgba(212,160,23,0.2)' : certifiedTier === 'silver' ? 'rgba(148,163,184,0.2)' : certifiedTier === 'bronze' ? 'rgba(217,119,6,0.2)' : 'rgba(239,68,68,0.2)',
                color: certifiedTier === 'gold' ? '#D4A017' : certifiedTier === 'silver' ? '#94A3B8' : certifiedTier === 'bronze' ? '#D97706' : '#EF4444',
                borderColor: 'currentColor',
              }}>
                {certifiedTier.toUpperCase()} · {certifiedScore}%
              </Badge>
            )}
            <div className="flex gap-1 mt-2">
              {['Research', 'Summarize', 'Notify'].map(s => (
                <Badge key={s} className="text-[8px]" style={{
                  background: 'rgba(212,160,23,0.1)',
                  color: 'rgba(212,160,23,0.8)',
                  borderColor: 'rgba(212,160,23,0.2)',
                }}>{s}</Badge>
              ))}
            </div>
          </div>
        </Card>
      </div>

      {/* Audit result modal */}
      <AnimatePresence>
        {showAuditModal && auditResult && (
          <motion.div className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={handleCloseAuditModal} />
            <motion.div
              className="relative z-10 w-full max-w-lg rounded-2xl border p-6 shadow-2xl"
              style={{
                background: 'linear-gradient(135deg, #0F172A, #1E2937)',
                borderColor: auditResult.auditTier === 'gold'
                  ? 'rgba(245,158,11,0.4)' : auditResult.auditTier === 'silver'
                    ? 'rgba(148,163,184,0.4)' : auditResult.auditTier === 'bronze'
                      ? 'rgba(217,119,6,0.4)' : 'rgba(239,68,68,0.4)',
              }}
              initial={{ scale: 0.9, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 250, damping: 20 }}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Shield className="h-5 w-5" style={{
                    color: auditResult.auditTier === 'gold' ? '#F59E0B' : auditResult.auditTier === 'silver' ? '#94A3B8' : auditResult.auditTier === 'bronze' ? '#D97706' : '#EF4444'
                  }} />
                  <h3 className="text-base font-bold text-titan-text">Audit Results</h3>
                </div>
                <Badge className="text-[10px] font-mono border-0"
                  style={{
                    background: auditResult.auditTier === 'gold' ? 'linear-gradient(135deg, #F59E0B, #D97706)' : auditResult.auditTier === 'silver' ? 'linear-gradient(135deg, #94A3B8, #64748B)' : auditResult.auditTier === 'bronze' ? 'linear-gradient(135deg, #D97706, #B45309)' : 'linear-gradient(135deg, #EF4444, #DC2626)',
                    color: auditResult.auditTier === 'gold' ? '#0A0E17' : '#fff',
                  }}>
                  {auditResult.auditTier.toUpperCase()}
                </Badge>
              </div>
              <div className="flex flex-col items-center mb-4">
                <div className="relative w-24 h-24 flex items-center justify-center">
                  <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="6" />
                    <motion.circle cx="50" cy="50" r="42" fill="none"
                      stroke={auditResult.auditTier === 'gold' ? '#F59E0B' : auditResult.auditTier === 'silver' ? '#94A3B8' : auditResult.auditTier === 'bronze' ? '#D97706' : '#EF4444'}
                      strokeWidth="6" strokeLinecap="round"
                      strokeDasharray={`${2 * Math.PI * 42}`}
                      initial={{ strokeDashoffset: 2 * Math.PI * 42 }}
                      animate={{ strokeDashoffset: 2 * Math.PI * 42 * (1 - auditResult.overallScore / 100) }}
                      transition={{ duration: 1.5, ease: 'easeOut' }} />
                  </svg>
                  <span className="text-2xl font-bold font-mono" style={{
                    color: auditResult.auditTier === 'gold' ? '#F59E0B' : auditResult.auditTier === 'silver' ? '#94A3B8' : auditResult.auditTier === 'bronze' ? '#D97706' : '#EF4444'
                  }}>{auditResult.overallScore}%</span>
                </div>
              </div>
              <p className="text-xs text-titan-muted/80 mb-4 leading-relaxed text-center">{auditResult.summary}</p>
              <div className="space-y-2 mb-4">
                {auditResult.categories.map((cat, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <span className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 ${cat.passed ? 'bg-emerald-500/20' : 'bg-red-500/20'}`}>
                      <span className={`text-[8px] ${cat.passed ? 'text-emerald-400' : 'text-red-400'}`}>{cat.passed ? '✓' : '✗'}</span>
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between text-[11px] text-titan-text">
                        <span className="font-medium truncate">{cat.name}</span>
                        <span style={{ color: cat.passed ? '#10B981' : '#EF4444' }} className="font-mono">{cat.score}/{cat.maxScore}</span>
                      </div>
                      <div className="h-1 bg-titan-border/20 rounded-full overflow-hidden mt-0.5">
                        <motion.div className="h-full rounded-full"
                          style={{ background: cat.passed ? '#10B981' : '#EF4444' }}
                          initial={{ width: 0 }} animate={{ width: `${(cat.score / cat.maxScore) * 100}%` }}
                          transition={{ duration: 1, delay: 0.3 + i * 0.1 }} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {auditResult.violations.length > 0 && (
                <div className="mb-4">
                  <p className="text-[10px] font-mono text-red-400/80 mb-1.5 uppercase tracking-wider">
                    ⚠ {auditResult.violations.length} Violation{auditResult.violations.length > 1 ? 's' : ''}
                  </p>
                  <div className="space-y-1">
                    {auditResult.violations.map((v, i) => (
                      <div key={i} className="text-[10px] font-mono text-red-400/60 bg-red-500/5 rounded px-2 py-1">{v}</div>
                    ))}
                  </div>
                </div>
              )}
              <Button className="w-full text-xs font-semibold" onClick={handleCloseAuditModal}
                style={{
                  background: auditResult.auditTier === 'gold' ? 'linear-gradient(135deg, #F59E0B, #D97706)' : 'linear-gradient(135deg, #14B8A6, #0D9488)',
                  color: auditResult.auditTier === 'gold' ? '#0A0E17' : '#fff',
                  height: '56px',
                  borderRadius: '16px',
                }}>
                {auditResult.auditTier === 'gold' ? '✦ Certified!' : 'Close'}
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
