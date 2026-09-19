import React from 'react';
import { RotateCcw, List, AlertOctagon } from 'lucide-react';

export default function FailureModal({
  isOpen,
  level,
  failedChallenge,
  onRetry,
  onLevelSelect
}) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content glass-panel glow-danger" style={{ maxWidth: '460px' }}>
        <div style={{
          width: '70px',
          height: '70px',
          borderRadius: '50%',
          background: 'rgba(239, 68, 68, 0.2)',
          border: '2px solid #ef4444',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '2.5rem',
          boxShadow: '0 0 30px rgba(239, 68, 68, 0.5)'
        }}>
          💥
        </div>

        <div>
          <h2 style={{ fontSize: '2.2rem', fontWeight: 900, color: '#ef4444', letterSpacing: '0.02em' }}>
            BOOM!
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1rem', marginTop: '4px' }}>
            The bomb got you. Challenge failed!
          </p>
        </div>

        {/* Failed challenge recap & explanation */}
        {failedChallenge && (
          <div style={{
            background: 'var(--bg-card)',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            borderRadius: '10px',
            padding: '0.8rem 1rem',
            width: '100%',
            textAlign: 'left',
            fontSize: '0.85rem'
          }}>
            <div style={{ color: '#f87171', fontWeight: 700, marginBottom: '2px' }}>
              Answer was: <strong style={{ color: '#fff' }}>{failedChallenge.answer}</strong>
            </div>
            {failedChallenge.explanation && (
              <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>
                {failedChallenge.explanation}
              </p>
            )}
          </div>
        )}

        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          width: '100%',
          background: 'rgba(255, 255, 255, 0.05)',
          padding: '0.6rem 1rem',
          borderRadius: '8px',
          fontSize: '0.85rem',
          color: 'var(--text-muted)'
        }}>
          <span>Score Earned: +0</span>
          <span style={{ color: '#f87171' }}>Streak Reset</span>
        </div>

        {/* Notice on anti-repetition */}
        <p style={{ fontSize: '0.75rem', color: '#38bdf8' }}>
          💡 RETRY guarantees a brand new, different challenge!
        </p>

        {/* Buttons */}
        <div style={{ display: 'flex', gap: '0.8rem', width: '100%' }}>
          <button
            className="btn-primary"
            style={{
              flex: 1.5,
              background: 'linear-gradient(135deg, #0284c7, #06b6d4)',
              boxShadow: '0 8px 20px rgba(6, 182, 212, 0.4)'
            }}
            onClick={onRetry}
          >
            <RotateCcw size={18} />
            <span>RETRY NEW</span>
          </button>
          <button
            className="btn-secondary"
            style={{ flex: 1 }}
            onClick={onLevelSelect}
          >
            <List size={18} />
            <span>LEVELS</span>
          </button>
        </div>
      </div>
    </div>
  );
}
