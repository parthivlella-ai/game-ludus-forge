import React from 'react';
import { RotateCcw, List, Trophy, Flame, Coins, Award, CheckCircle } from 'lucide-react';
import { soundEngine } from '../../services/soundEngine.js';

export default function FailureModal({
  isOpen,
  level,
  failedChallenge,
  runStats = {},
  onRetry,
  onLevelSelect
}) {
  if (!isOpen) return null;

  const score = runStats.score || 0;
  const questionsCompleted = runStats.questionsCompleted || 0;
  const bestStreak = runStats.bestStreak || 0;
  const inkEarned = runStats.inkEarned || 0;

  return (
    <div className="modal-overlay">
      <div
        className="modal-content glass-panel glow-danger"
        style={{ maxWidth: '480px', width: '92%', padding: '1.8rem', textAlign: 'center' }}
      >
        {/* Animated Explosion Emoji Icon */}
        <div style={{
          width: '76px',
          height: '76px',
          borderRadius: '50%',
          background: 'rgba(239, 68, 68, 0.2)',
          border: '2px solid #ef4444',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '2.8rem',
          margin: '0 auto',
          boxShadow: '0 0 35px rgba(239, 68, 68, 0.6)'
        }}>
          💥
        </div>

        <div style={{ marginTop: '0.6rem' }}>
          <h2 style={{ fontSize: '2.2rem', fontWeight: 900, color: '#ef4444', letterSpacing: '0.04em', margin: 0 }}>
            BOOM!
          </h2>
          <div style={{
            fontSize: '1rem',
            fontWeight: 800,
            color: '#fbbf24',
            letterSpacing: '0.08em',
            marginTop: '2px'
          }}>
            RUN SUMMARY
          </div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', margin: '4px 0 0' }}>
            The fuse reached the core, but your combat data was logged!
          </p>
        </div>

        {/* Failed challenge answer & explanation */}
        {failedChallenge && (
          <div style={{
            background: 'rgba(0, 0, 0, 0.4)',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            borderRadius: '10px',
            padding: '0.75rem 1rem',
            width: '100%',
            textAlign: 'left',
            margin: '0.9rem 0 0.6rem',
            fontSize: '0.85rem'
          }}>
            <div style={{ color: '#f87171', fontWeight: 700 }}>
              Correct Solution: <strong style={{ color: '#00f59b' }}>{failedChallenge.answer}</strong>
            </div>
            {failedChallenge.explanation && (
              <p style={{ color: 'var(--text-dim)', fontSize: '0.78rem', marginTop: '3px' }}>
                💡 {failedChallenge.explanation}
              </p>
            )}
          </div>
        )}

        {/* Run Performance Stats Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '0.6rem',
          width: '100%',
          margin: '0.6rem 0 1rem'
        }}>
          <div style={{
            background: 'rgba(255, 255, 255, 0.04)',
            border: '1px solid var(--border-glass)',
            borderRadius: '8px',
            padding: '0.6rem',
            textAlign: 'center'
          }}>
            <span style={{ fontSize: '0.7rem', color: 'var(--text-dim)' }}>SCORE THIS RUN</span>
            <div style={{ fontWeight: 900, fontSize: '1.2rem', color: '#38bdf8' }}>
              +{score.toLocaleString()}
            </div>
          </div>

          <div style={{
            background: 'rgba(255, 255, 255, 0.04)',
            border: '1px solid var(--border-glass)',
            borderRadius: '8px',
            padding: '0.6rem',
            textAlign: 'center'
          }}>
            <span style={{ fontSize: '0.7rem', color: 'var(--text-dim)' }}>QUESTIONS DEFUSED</span>
            <div style={{ fontWeight: 900, fontSize: '1.2rem', color: '#10b981' }}>
              {questionsCompleted}
            </div>
          </div>

          <div style={{
            background: 'rgba(255, 255, 255, 0.04)',
            border: '1px solid var(--border-glass)',
            borderRadius: '8px',
            padding: '0.6rem',
            textAlign: 'center'
          }}>
            <span style={{ fontSize: '0.7rem', color: 'var(--text-dim)' }}>BEST STREAK</span>
            <div style={{ fontWeight: 900, fontSize: '1.2rem', color: '#f97316' }}>
              🔥 x{bestStreak}
            </div>
          </div>

          <div style={{
            background: 'rgba(255, 255, 255, 0.04)',
            border: '1px solid var(--border-glass)',
            borderRadius: '8px',
            padding: '0.6rem',
            textAlign: 'center'
          }}>
            <span style={{ fontSize: '0.7rem', color: 'var(--text-dim)' }}>INK EARNED</span>
            <div style={{ fontWeight: 900, fontSize: '1.2rem', color: '#fbbf24' }}>
              🪙 +{inkEarned}
            </div>
          </div>
        </div>

        {/* Anti-Repetition Assurance */}
        <p style={{ fontSize: '0.78rem', color: '#06b6d4', marginBottom: '1.1rem', fontWeight: 600 }}>
          ⚡ Ready for another attempt? A completely new challenge awaits!
        </p>

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '0.8rem', width: '100%' }}>
          <button
            className="btn-primary"
            style={{
              flex: 1.6,
              background: 'linear-gradient(135deg, #0284c7, #06b6d4)',
              boxShadow: '0 8px 20px rgba(6, 182, 212, 0.4)',
              padding: '0.85rem'
            }}
            onClick={() => { soundEngine.playClick(); onRetry(); }}
          >
            <RotateCcw size={18} />
            <span>TRY AGAIN</span>
          </button>

          <button
            className="btn-secondary"
            style={{ flex: 1, padding: '0.85rem' }}
            onClick={() => { soundEngine.playClick(); onLevelSelect(); }}
          >
            <List size={18} />
            <span>LEVELS</span>
          </button>
        </div>
      </div>
    </div>
  );
}
