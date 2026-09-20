import React from 'react';
import { Calendar, Zap, CheckCircle, Trophy, Sparkles, X, ArrowRight } from 'lucide-react';
import { soundEngine } from '../../services/soundEngine.js';

export default function DailyChallengeModal({ isOpen, onClose, isCompleted, dailyInfo, onStartDaily }) {
  if (!isOpen) return null;

  const todayStr = new Date().toLocaleDateString(undefined, {
    weekday: 'long',
    month: 'short',
    day: 'numeric'
  });

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content glass-panel"
        style={{ maxWidth: '540px', width: '92%', padding: '1.8rem', textAlign: 'center' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
          borderBottom: '1px solid var(--border-glass)',
          paddingBottom: '0.8rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <Calendar size={22} color="#ec4899" />
            <h2 style={{ fontSize: '1.4rem', fontWeight: 900 }}>DAILY CHAOS RUN</h2>
          </div>
          <button
            onClick={() => { soundEngine.playClick(); onClose(); }}
            style={{ background: 'transparent', color: 'var(--text-muted)' }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Date & Subtitle */}
        <div style={{ margin: '1rem 0 0.5rem' }}>
          <div style={{
            display: 'inline-block',
            padding: '4px 12px',
            borderRadius: '999px',
            background: 'rgba(236, 72, 153, 0.15)',
            border: '1px solid rgba(236, 72, 153, 0.4)',
            color: '#ec4899',
            fontWeight: 800,
            fontSize: '0.8rem',
            letterSpacing: '0.04em'
          }}>
            📅 {todayStr.toUpperCase()}
          </div>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.6rem' }}>
            Defuse 3 consecutive stages across all difficulties in one survival run.
          </p>
        </div>

        {/* Stages Checklist */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '0.6rem',
          margin: '1.2rem 0',
          textAlign: 'left'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0.75rem 1rem',
            borderRadius: '8px',
            background: 'rgba(16, 185, 129, 0.08)',
            border: '1px solid rgba(16, 185, 129, 0.3)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <span style={{ fontSize: '1.2rem' }}>📖</span>
              <div>
                <div style={{ fontWeight: 800, fontSize: '0.9rem', color: '#10b981' }}>STAGE 1: WORD BLAST</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>Rapid letter constraint defusal</div>
              </div>
            </div>
            <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#10b981' }}>EASY</span>
          </div>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0.75rem 1rem',
            borderRadius: '8px',
            background: 'rgba(245, 158, 11, 0.08)',
            border: '1px solid rgba(245, 158, 11, 0.3)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <span style={{ fontSize: '1.2rem' }}>🔬</span>
              <div>
                <div style={{ fontWeight: 800, fontSize: '0.9rem', color: '#f59e0b' }}>STAGE 2: PUZZLE BLAST</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>Tricky lateral sequence / logic test</div>
              </div>
            </div>
            <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#f59e0b' }}>MEDIUM</span>
          </div>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0.75rem 1rem',
            borderRadius: '8px',
            background: 'rgba(239, 68, 68, 0.08)',
            border: '1px solid rgba(239, 68, 68, 0.3)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <span style={{ fontSize: '1.2rem' }}>👑</span>
              <div>
                <div style={{ fontWeight: 800, fontSize: '0.9rem', color: '#ef4444' }}>STAGE 3: RIDDLE BLAST</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>High-stakes mind-bending riddle</div>
              </div>
            </div>
            <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#ef4444' }}>HARD</span>
          </div>
        </div>

        {/* Reward Box */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-around',
          padding: '0.8rem',
          borderRadius: '10px',
          background: 'rgba(255, 255, 255, 0.03)',
          border: '1px solid var(--border-glass)',
          marginBottom: '1.2rem'
        }}>
          <div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>REWARD</span>
            <div style={{ fontWeight: 900, color: '#fbbf24', fontSize: '1.1rem' }}>🪙 +150 INK</div>
          </div>
          <div style={{ width: '1px', height: '28px', background: 'var(--border-glass)' }} />
          <div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>SCORE BONUS</span>
            <div style={{ fontWeight: 900, color: '#38bdf8', fontSize: '1.1rem' }}>🏆 +500 PTS</div>
          </div>
        </div>

        {/* Action Button / Completed State */}
        {isCompleted ? (
          <div style={{
            padding: '1rem',
            borderRadius: '10px',
            background: 'rgba(16, 185, 129, 0.15)',
            border: '1.5px solid #10b981',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.6rem',
            color: '#10b981',
            fontWeight: 800
          }}>
            <CheckCircle size={22} />
            <span>DAILY MISSION COMPLETED! (Score: {dailyInfo?.score || '500'})</span>
          </div>
        ) : (
          <button
            onClick={() => { soundEngine.playClick(); onStartDaily(); }}
            className="home-play-btn"
            style={{ width: '100%', padding: '0.9rem', fontSize: '1.05rem', margin: 0 }}
          >
            <span>START DAILY CHAOS</span>
            <ArrowRight size={20} />
          </button>
        )}
      </div>
    </div>
  );
}
