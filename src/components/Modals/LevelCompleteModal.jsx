import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Trophy, Star, ArrowRight, RotateCcw, List, Sparkles } from 'lucide-react';
import { soundEngine } from '../../services/soundEngine';

export default function LevelCompleteModal({
  isOpen,
  level,
  scoreEarned,
  inkEarned,
  streak,
  stars,
  isPerfect,
  onNextLevel,
  onReplay,
  onLevelSelect
}) {
  useEffect(() => {
    if (isOpen) {
      soundEngine.playFanfare();
      confetti({
        particleCount: 70,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content glass-panel glow-purple" style={{ maxWidth: '480px' }}>
        <div style={{
          width: '70px',
          height: '70px',
          borderRadius: '50%',
          background: 'rgba(234, 179, 8, 0.2)',
          border: '2px solid #eab308',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 0 25px rgba(234, 179, 8, 0.4)'
        }}>
          <Trophy size={36} color="#fbbf24" />
        </div>

        <div>
          <h2 style={{ fontSize: '2rem', fontWeight: 900, letterSpacing: '0.02em' }}>
            LEVEL {level} COMPLETE!
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
            You survived the chaos.
          </p>
        </div>

        {/* Stars */}
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {[1, 2, 3].map((starIdx) => (
            <Star
              key={starIdx}
              size={32}
              fill={starIdx <= stars ? '#fbbf24' : 'transparent'}
              color="#fbbf24"
              style={{
                filter: starIdx <= stars ? 'drop-shadow(0 0 10px #fbbf24)' : 'none',
                transform: starIdx <= stars ? 'scale(1.1)' : 'scale(0.9)',
                transition: 'all 0.3s ease'
              }}
            />
          ))}
        </div>

        {/* Perfect Run Badge */}
        {isPerfect && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
            background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.3), rgba(236, 72, 153, 0.3))',
            border: '1px solid #c084fc',
            borderRadius: '999px',
            padding: '0.3rem 0.9rem',
            color: '#f0abfc',
            fontWeight: 800,
            fontSize: '0.85rem'
          }}>
            <Sparkles size={16} />
            <span>✨ PERFECT RUN BONUS</span>
          </div>
        )}

        {/* Stats breakdown */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '0.8rem',
          width: '100%',
          background: 'var(--bg-card)',
          borderRadius: '12px',
          padding: '1rem'
        }}>
          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>SCORE EARNED</div>
            <div style={{ fontSize: '1.4rem', fontWeight: 900, color: '#38bdf8' }}>
              +{scoreEarned}
            </div>
          </div>
          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>INK TOKENS</div>
            <div style={{ fontSize: '1.4rem', fontWeight: 900, color: '#fbbf24' }}>
              +{inkEarned} 🪙
            </div>
          </div>
          <div style={{ gridColumn: 'span 2', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Best Streak: <strong style={{ color: '#f97316' }}>x{streak}</strong>
          </div>
        </div>

        {/* Buttons */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', width: '100%' }}>
          {level < 60 && (
            <button className="btn-primary" onClick={onNextLevel}>
              <span>NEXT LEVEL</span>
              <ArrowRight size={18} />
            </button>
          )}

          <div style={{ display: 'flex', gap: '0.6rem' }}>
            <button
              className="btn-secondary"
              style={{ flex: 1 }}
              onClick={onReplay}
            >
              <RotateCcw size={16} />
              <span>REPLAY</span>
            </button>
            <button
              className="btn-secondary"
              style={{ flex: 1 }}
              onClick={onLevelSelect}
            >
              <List size={16} />
              <span>LEVELS</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
