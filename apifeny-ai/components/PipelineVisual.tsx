'use client';

import { useEffect, useRef } from 'react';

const stages = [
  { label: 'Idea', emoji: '💡', color: '#7C3AED' },
  { label: 'Research', emoji: '🔍', color: '#06B6D4' },
  { label: 'Build', emoji: '⚡', color: '#8B5CF6' },
  { label: 'Market', emoji: '🚀', color: '#FFD700' },
  { label: 'Scale', emoji: '📈', color: '#22D3EE' },
];

export default function PipelineVisual() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const w = canvas.width = canvas.clientWidth * 2;
    const h = canvas.height = canvas.clientHeight * 2;
    ctx.scale(2, 2);
    const cw = canvas.clientWidth;
    const ch = canvas.clientHeight;

    let frame = 0;
    const particles: { x: number; y: number; vx: number; vy: number; life: number; maxLife: number; size: number; color: string }[] = [];

    const spawnParticle = () => {
      if (particles.length > 80) return;
      const stageIdx = Math.floor(Math.random() * (stages.length - 1));
      const t = stageIdx / (stages.length - 1);
      const nextT = (stageIdx + 1) / (stages.length - 1);
      const x = 60 + t * (cw - 120);
      const y = ch / 2;
      particles.push({
        x, y,
        vx: ((nextT - t) * (cw - 120)) / 60,
        vy: (Math.random() - 0.5) * 0.5,
        life: 0,
        maxLife: 60 + Math.random() * 30,
        size: 1.5 + Math.random() * 2,
        color: stages[stageIdx].color,
      });
    };

    const animate = () => {
      frame++;
      if (frame % 8 === 0) spawnParticle();

      ctx.clearRect(0, 0, cw, ch);

      // Draw glow dots at each stage
      stages.forEach((stage, i) => {
        const x = 60 + (i / (stages.length - 1)) * (cw - 120);
        const y = ch / 2;

        // Outer glow
        const glow = ctx.createRadialGradient(x, y, 0, x, y, 14);
        glow.addColorStop(0, stage.color + '60');
        glow.addColorStop(1, stage.color + '00');
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(x, y, 14, 0, Math.PI * 2);
        ctx.fill();

        // Core dot
        ctx.fillStyle = stage.color;
        ctx.beginPath();
        ctx.arc(x, y, 3, 0, Math.PI * 2);
        ctx.fill();

        // Label
        ctx.fillStyle = 'rgba(255,255,255,0.6)';
        ctx.font = '10px system-ui';
        ctx.textAlign = 'center';
        ctx.fillText(stage.emoji + ' ' + stage.label, x, y + 22);
      });

      // Draw connecting line
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(124,58,237,0.15)';
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 4]);
      ctx.moveTo(60, ch / 2);
      ctx.lineTo(cw - 60, ch / 2);
      ctx.stroke();
      ctx.setLineDash([]);

      // Update & draw particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life++;

        if (p.life > p.maxLife) {
          particles.splice(i, 1);
          continue;
        }

        const alpha = 1 - p.life / p.maxLife;
        ctx.fillStyle = p.color + Math.floor(alpha * 180).toString(16).padStart(2, '0');
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * alpha, 0, Math.PI * 2);
        ctx.fill();
      }

      requestAnimationFrame(animate);
    };

    animate();
    return () => { particles.length = 0; };
  }, []);

  return (
    <div className="relative w-full h-40 sm:h-48">
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
}
