'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Shield, Download, Upload, FileKey, Fingerprint, Building2, Lock, Globe } from 'lucide-react';

export default function BYOEnterprisePage() {
  const [step, setStep] = useState<'welcome' | 'upload' | 'scanning' | 'ready'>('welcome');
  const [progress, setProgress] = useState(0);

  const handleUpload = () => {
    setStep('scanning');
    // Simulate compliance scan
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          setStep('ready');
          return 100;
        }
        return p + 5;
      });
    }, 200);
  };

  return (
    <div className="min-h-screen titan-gradient titan-grid-bg">
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-titan-cyan/10 border border-titan-cyan/30 flex items-center justify-center">
            <Building2 className="h-5 w-5 text-titan-cyan" />
          </div>
          <div>
            <h1 className="text-lg font-bold titan-text-gradient tracking-tight">BYO Enterprise</h1>
            <p className="text-xs font-mono text-titan-muted">Bring Your Own Agent to any organization</p>
          </div>
        </div>

        {/* State: Welcome */}
        {step === 'welcome' && (
          <Card className="p-8 bg-titan-card/60 border-titan-border/50 text-center space-y-6">
            <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-titan-cyan/20 via-titan-card to-titan-violet/10 border border-titan-border/40 flex items-center justify-center mx-auto">
              <Download className="h-8 w-8 text-titan-cyan" />
            </div>
            <h2 className="font-mono text-sm text-titan-text">Export Your Agent Manifest</h2>
            <p className="text-xs font-mono text-titan-muted/80 max-w-md mx-auto leading-relaxed">
              Generate an encrypted, OWASP-scanned manifest of your agent's skills, memory graph, and certification.
              Enterprises use this to onboard you securely with a one-click compliance check.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-lg mx-auto">
              {[
                { icon: FileKey, label: 'Encrypted', desc: '256-bit RSA' },
                { icon: Fingerprint, label: 'Immutable', desc: 'SHA-256 hashed' },
                { icon: Shield, label: 'Compliant', desc: 'OWASP + TDAD' },
              ].map((f) => (
                <div key={f.label} className="p-3 rounded-xl bg-titan-bg/50 border border-titan-border/30">
                  <f.icon className="h-4 w-4 text-titan-cyan mb-1" />
                  <p className="text-xs font-mono text-titan-text/80">{f.label}</p>
                  <p className="text-[10px] font-mono text-titan-muted">{f.desc}</p>
                </div>
              ))}
            </div>
            <Button onClick={() => setStep('upload')}
              className="bg-titan-cyan/15 text-titan-cyan border border-titan-cyan/30 hover:bg-titan-cyan/25 font-mono text-xs">
              <Download className="h-3.5 w-3.5 mr-1.5" />Generate Manifest
            </Button>
          </Card>
        )}

        {/* State: Upload / Enterprise Onboarding */}
        {step === 'upload' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left: Import existing manifest */}
            <Card className="p-6 bg-titan-card/60 border-titan-border/50 space-y-4">
              <div className="flex items-center gap-2">
                <Upload className="h-4 w-4 text-titan-cyan" />
                <h3 className="text-xs font-mono text-titan-cyan tracking-widest uppercase">Import Manifest</h3>
              </div>
              <p className="text-[11px] font-mono text-titan-muted/80">
                Upload a previously exported .titan-manifest file
              </p>
              <div className="border-2 border-dashed border-titan-border/40 rounded-xl p-8 text-center">
                <Upload className="h-8 w-8 mx-auto mb-2 text-titan-muted" />
                <p className="text-xs font-mono text-titan-muted/60">Drop file or click to browse</p>
              </div>
              <Button variant="outline" className="w-full border-titan-border/50 text-xs font-mono text-titan-muted hover:text-titan-cyan h-8">
                Select .titan-manifest
              </Button>
            </Card>

            {/* Right: License selector */}
            <Card className="p-6 bg-titan-card/60 border-titan-border/50 space-y-4">
              <div className="flex items-center gap-2">
                <Lock className="h-4 w-4 text-titan-cyan" />
                <h3 className="text-xs font-mono text-titan-cyan tracking-widest uppercase">License</h3>
              </div>
              <div className="space-y-2">
                {[
                  { type: 'Creator Owned + Royalty', icon: Globe, desc: 'Public marketplace, 5-15% royalty to Titan' },
                  { type: 'Private Encrypted', icon: Lock, desc: 'Only you can access. No royalties.' },
                  { type: 'Enterprise Commercial', icon: Building2, desc: 'Full enterprise license, compliance gates' },
                ].map((l) => (
                  <label key={l.type} className="flex items-start gap-3 p-3 rounded-xl bg-titan-bg/50 border border-titan-border/30 cursor-pointer hover:border-titan-cyan/30 transition-colors">
                    <input type="radio" name="license" className="mt-1 accent-titan-cyan" />
                    <div>
                      <div className="flex items-center gap-2">
                        <l.icon className="h-3 w-3 text-titan-cyan" />
                        <span className="text-xs font-mono text-titan-text">{l.type}</span>
                      </div>
                      <p className="text-[10px] font-mono text-titan-muted mt-0.5">{l.desc}</p>
                    </div>
                  </label>
                ))}
              </div>
              <Button onClick={handleUpload}
                className="w-full bg-titan-cyan/15 text-titan-cyan border border-titan-cyan/30 hover:bg-titan-cyan/25 font-mono text-xs">
                <Shield className="h-3.5 w-3.5 mr-1.5" />Start Compliance Scan
              </Button>
            </Card>
          </div>
        )}

        {/* State: Scanning */}
        {step === 'scanning' && (
          <Card className="p-8 bg-titan-card/60 border-titan-border/50 text-center space-y-6">
            <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-titan-cyan/20 to-titan-violet/10 border border-titan-border/40 flex items-center justify-center mx-auto">
              <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}>
                <Shield className="h-8 w-8 text-titan-cyan" />
              </motion.div>
            </div>
            <h2 className="font-mono text-sm text-titan-text">Compliance Scan in Progress</h2>
            <p className="text-xs font-mono text-titan-muted/60">OWASP Agentic + TDAD + IP leak detection</p>

            {/* Progress bar */}
            <div className="w-full max-w-md mx-auto">
              <div className="h-2 bg-titan-bg rounded-full overflow-hidden border border-titan-border/30">
                <motion.div
                  className="h-full bg-gradient-to-r from-titan-cyan to-titan-emerald rounded-full"
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
              <p className="text-[10px] font-mono text-titan-cyan/60 mt-2">{progress}% complete</p>
            </div>

            {/* Scan stages */}
            <div className="space-y-2 max-w-sm mx-auto text-left">
              {[
                { label: 'OWASP Agentic Top 10', done: progress > 30 },
                { label: 'TDAD Impact Analysis', done: progress > 55 },
                { label: 'IP Fingerprint Check', done: progress > 80 },
                { label: 'Encryption & Key Generation', done: progress > 95 },
              ].map((s) => (
                <div key={s.label} className="flex items-center gap-2 text-xs font-mono">
                  <div className={`w-2 h-2 rounded-full ${s.done ? 'bg-titan-emerald' : 'bg-titan-muted/30'}`} />
                  <span className={s.done ? 'text-titan-emerald/80' : 'text-titan-muted/50'}>{s.label}</span>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* State: Ready */}
        {step === 'ready' && (
          <Card className="p-8 bg-titan-card/60 border-titan-border/50 text-center space-y-6">
            <div className="w-20 h-20 rounded-3xl bg-titan-emerald/10 border border-titan-emerald/30 flex items-center justify-center mx-auto">
              <Shield className="h-8 w-8 text-titan-emerald" />
            </div>
            <h2 className="font-mono text-sm titan-text-gradient">Manifest Ready</h2>
            <p className="text-xs font-mono text-titan-muted/80 max-w-md mx-auto">
              Your agent manifest is encrypted, signed, and compliant.
              Share it with any enterprise to onboard in one click.
            </p>
            <div className="grid grid-cols-3 gap-3 max-w-sm mx-auto">
              {[
                { label: 'Score', value: '97/100' },
                { label: 'License', value: 'Creator Royalty' },
                { label: 'Size', value: '2.4 KB' },
              ].map((m) => (
                <div key={m.label} className="p-3 rounded-xl bg-titan-bg/50 border border-titan-border/30">
                  <p className="text-lg font-mono font-bold titan-text-gradient">{m.value}</p>
                  <p className="text-[10px] font-mono text-titan-muted">{m.label}</p>
                </div>
              ))}
            </div>
            <div className="flex gap-3 justify-center">
              <Button className="bg-titan-cyan/15 text-titan-cyan border border-titan-cyan/30 hover:bg-titan-cyan/25 font-mono text-xs">
                <Download className="h-3.5 w-3.5 mr-1.5" />Download .titan-manifest
              </Button>
              <Button variant="outline" className="border-titan-border/50 text-xs font-mono text-titan-muted">
                Copy Share Link
              </Button>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
