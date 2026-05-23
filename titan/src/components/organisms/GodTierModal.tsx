import React, { useEffect, useState } from 'react';

interface GodTierModalProps {
  open: boolean;
  onClose: () => void;
  level: number;
}

/** Random particle burst effect for the celebration screen */
function ParticleBurst({ count = 20 }: { count?: number }) {
  const particles = Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: 4 + Math.random() * 8,
    color: ['#F59E0B', '#14B8A6', '#FCD34D', '#FDE68A', '#fff'][Math.floor(Math.random() * 5)],
    delay: Math.random() * 0.5,
    duration: 1 + Math.random() * 2,
  }));

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
      {particles.map((p) => (
        <div
          key={p.id}
          style={{
            position: 'absolute',
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            borderRadius: '50%',
            background: p.color,
            animation: `godTierParticle ${p.duration}s ${p.delay}s ease-out forwards`,
            opacity: 0,
          }}
        />
      ))}
      <style>{`
        @keyframes godTierParticle {
          0% {
            opacity: 1;
            transform: translate(0, 0) scale(1);
          }
          100% {
            opacity: 0;
            transform: translate(var(--dx, ${Math.random() > 0.5 ? '' : '-'}50px), var(--dy, ${Math.random() > 0.5 ? '' : '-'}50px)) scale(0);
          }
        }
      `}</style>
    </div>
  );
}

export default function GodTierModal({ open, onClose, level }: GodTierModalProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (open) {
      setVisible(true);
    } else {
      const id = setTimeout(() => setVisible(false), 300);
      return () => clearTimeout(id);
    }
  }, [open]);

  if (!visible) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        animation: `godTierFadeIn 0.3s ease-out`,
      }}
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(0,0,0,0.7)',
          backdropFilter: 'blur(4px)',
        }}
      />

      {/* Card */}
      <div
        style={{
          position: 'relative',
          background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
          borderRadius: 24,
          padding: '40px 32px 32px',
          maxWidth: 380,
          width: '90%',
          textAlign: 'center',
          border: '2px solid rgba(245, 158, 11, 0.4)',
          boxShadow: '0 0 60px rgba(245, 158, 11, 0.2), 0 0 120px rgba(20, 184, 166, 0.1)',
          animation: `godTierScaleIn 0.4s ease-out`,
          overflow: 'hidden',
        }}
      >
        <ParticleBurst count={24} />

        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ fontSize: 64, marginBottom: 8, animation: 'godTierBounce 0.6s ease-out' }}>
            👑
          </div>
          <div style={{
            fontSize: 14,
            color: '#F59E0B',
            fontWeight: 600,
            letterSpacing: 2,
            textTransform: 'uppercase',
            marginBottom: 4,
          }}>
            Ascension Complete
          </div>
          <div style={{
            fontSize: 32,
            fontWeight: 800,
            background: 'linear-gradient(135deg, #F59E0B, #14B8A6)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: 8,
          }}>
            GOD-TIER
          </div>
          <div style={{
            fontSize: 16,
            fontWeight: 700,
            color: '#FCD34D',
            marginBottom: 12,
          }}>
            Level {level}
          </div>
          <div style={{
            fontSize: 13,
            color: '#94a3b8',
            lineHeight: 1.6,
            marginBottom: 20,
          }}>
            You have transcended mortal limits. The crown is yours — wear it with glory.
            Your mascot now emanates god-tier power.
          </div>

          <button
            onClick={onClose}
            style={{
              background: 'linear-gradient(135deg, #F59E0B, #D97706)',
              border: 'none',
              borderRadius: 12,
              padding: '12px 32px',
              fontSize: 14,
              fontWeight: 700,
              color: '#1a1a2e',
              cursor: 'pointer',
              transition: 'transform 0.15s, box-shadow 0.15s',
              boxShadow: '0 4px 20px rgba(245, 158, 11, 0.3)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)';
              e.currentTarget.style.boxShadow = '0 6px 30px rgba(245, 158, 11, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = '0 4px 20px rgba(245, 158, 11, 0.3)';
            }}
          >
            RISE 👑
          </button>
        </div>
      </div>

      <style>{`
        @keyframes godTierFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes godTierScaleIn {
          from { transform: scale(0.8); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        @keyframes godTierBounce {
          0% { transform: scale(0.3); opacity: 0; }
          50% { transform: scale(1.15); }
          100% { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
