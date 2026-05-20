'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Sparkles, Paintbrush, RotateCcw } from 'lucide-react';
import type { BaseModelType, SkinData } from '@/types';

const BASE_MODELS: { type: BaseModelType; label: string; emoji: string }[] = [
  { type: 'cute-robot', label: 'Cute Robot', emoji: '🤖' },
  { type: 'anime-guardian', label: 'Anime Guardian', emoji: '🗡️' },
  { type: 'realistic-human', label: 'Realistic Human', emoji: '👤' },
  { type: 'abstract-orb', label: 'Abstract Orb', emoji: '🌀' },
  { type: 'future-robot-brain', label: 'Future Robot', emoji: '🧠' },
];

const SKIN_OPTIONS = [
  { id: 'cyber-ninja', name: 'Cyber Ninja', emoji: '⚡' },
  { id: 'neon-guardian', name: 'Neon Guardian', emoji: '💠' },
  { id: 'classic-orb', name: 'Classic Orb', emoji: '🌐' },
  { id: 'steel-samurai', name: 'Steel Samurai', emoji: '🗡️' },
];

interface VisualAtelierProps {
  onSave?: (baseModel: BaseModelType, skin: SkinData | null) => void;
}

export default function VisualAtelier({ onSave }: VisualAtelierProps) {
  const [baseModel, setBaseModel] = useState<BaseModelType>('cute-robot');
  const [selectedSkin, setSelectedSkin] = useState<string | null>(null);
  const [artifyPrompt, setArtifyPrompt] = useState('');

  const handleSave = () => {
    if (!onSave) return;
    onSave(baseModel, selectedSkin ? { skinId: selectedSkin, name: selectedSkin, animationSet: 'default' } : null);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Left: Base Model Selection */}
      <Card className="p-4 space-y-4">
        <h2 className="font-semibold flex items-center gap-2">
          <Paintbrush className="h-4 w-4" />
          Base Models
        </h2>
        <div className="space-y-2">
          {BASE_MODELS.map((model) => (
            <Button
              key={model.type}
              variant={baseModel === model.type ? 'default' : 'outline'}
              className="w-full justify-start gap-3"
              onClick={() => setBaseModel(model.type)}
            >
              <span className="text-xl">{model.emoji}</span>
              {model.label}
            </Button>
          ))}
        </div>
      </Card>

      {/* Center: Live Preview */}
      <Card className="p-8 flex items-center justify-center min-h-[400px]">
        <motion.div
          animate={{
            rotate: [0, 5, -5, 0],
            scale: [1, 1.02, 1],
          }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="w-48 h-48 rounded-3xl bg-gradient-to-br from-primary/30 to-primary/10 flex items-center justify-center text-6xl shadow-xl"
        >
          {BASE_MODELS.find((m) => m.type === baseModel)?.emoji || '🤖'}
          {selectedSkin && (
            <motion.span
              className="absolute text-2xl"
              animate={{ opacity: [0, 1, 0], scale: [0.5, 1.2, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              ✦
            </motion.span>
          )}
        </motion.div>
      </Card>

      {/* Right: Skins & Artify */}
      <Card className="p-4 space-y-4">
        <h2 className="font-semibold flex items-center gap-2">
          <Sparkles className="h-4 w-4" />
          Skins & Artify
        </h2>

        {/* Skin Grid */}
        <div className="grid grid-cols-2 gap-2">
          {SKIN_OPTIONS.map((skin) => (
            <Button
              key={skin.id}
              variant={selectedSkin === skin.id ? 'default' : 'outline'}
              className="h-16 flex-col gap-0"
              onClick={() => setSelectedSkin(skin.id)}
            >
              <span className="text-lg">{skin.emoji}</span>
              <span className="text-[10px]">{skin.name}</span>
            </Button>
          ))}
        </div>

        {/* Artify */}
        <div className="space-y-2">
          <label className="text-xs text-muted-foreground">
            AI Artify — describe a custom skin
          </label>
          <div className="flex gap-2">
            <Input
              placeholder="cyber-ninja with blue runes..."
              value={artifyPrompt}
              onChange={(e) => setArtifyPrompt(e.target.value)}
              className="text-sm"
            />
            <Button variant="outline" size="icon">
              <Sparkles className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="flex gap-2 pt-2">
          <Button className="flex-1" onClick={handleSave}>
            Save Agent
          </Button>
          <Button variant="ghost" size="icon">
            <RotateCcw className="h-4 w-4" />
          </Button>
        </div>
      </Card>
    </div>
  );
}
