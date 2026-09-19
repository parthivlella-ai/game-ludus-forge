import React, { useState } from 'react';
import { X, Volume2, VolumeX, EyeOff, RotateCcw } from 'lucide-react';
import { soundEngine } from '../../services/soundEngine';

export default function SettingsModal({ isOpen, onClose, onResetProgress }) {
  if (!isOpen) return null;

  const [muted, setMuted] = useState(soundEngine.muted);
  const [reducedMotion, setReducedMotion] = useState(
    localStorage.getItem('wb_reduced_motion') === 'true'
  );
  const [confirmReset, setConfirmReset] = useState(false);

  const toggleSound = () => {
    const next = !muted;
    setMuted(next);
    soundEngine.setMuted(next);
  };

  const toggleMotion = () => {
    const next = !reducedMotion;
    setReducedMotion(next);
    localStorage.setItem('wb_reduced_motion', String(next));
    if (next) {
      document.body.classList.add('reduced-motion');
    } else {
      document.body.classList.remove('reduced-motion');
    }
  };

  const handleReset = () => {
    if (!confirmReset) {
      setConfirmReset(true);
      return;
    }
    onResetProgress();
    setConfirmReset(false);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content glass-panel"
        style={{ maxWidth: '480px', padding: '1.8rem' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
          borderBottom: '1px solid var(--border-glass)',
          paddingBottom: '0.8rem'
        }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 900 }}>SETTINGS</h2>
          <button
            onClick={onClose}
            style={{ background: 'transparent', color: 'var(--text-muted)' }}
          >
            <X size={20} />
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', width: '100%' }}>
          {/* Sound Toggle */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '0.8rem 1rem',
            background: 'var(--bg-card)',
            borderRadius: '10px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              {muted ? <VolumeX size={20} color="#f87171" /> : <Volume2 size={20} color="#34d399" />}
              <span style={{ fontWeight: 700 }}>Game Sound</span>
            </div>
            <button
              onClick={toggleSound}
              style={{
                background: muted ? '#ef4444' : '#10b981',
                color: '#fff',
                padding: '0.4rem 1rem',
                borderRadius: '8px',
                fontWeight: 800,
                fontSize: '0.85rem'
              }}
            >
              {muted ? 'MUTED' : 'ON'}
            </button>
          </div>

          {/* Reduced Motion */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '0.8rem 1rem',
            background: 'var(--bg-card)',
            borderRadius: '10px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <EyeOff size={20} color="#38bdf8" />
              <span style={{ fontWeight: 700 }}>Reduced Motion</span>
            </div>
            <button
              onClick={toggleMotion}
              style={{
                background: reducedMotion ? '#06b6d4' : '#334155',
                color: '#fff',
                padding: '0.4rem 1rem',
                borderRadius: '8px',
                fontWeight: 800,
                fontSize: '0.85rem'
              }}
            >
              {reducedMotion ? 'ENABLED' : 'OFF'}
            </button>
          </div>

          {/* Reset Progress */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.6rem',
            padding: '1rem',
            background: 'rgba(239, 68, 68, 0.1)',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            borderRadius: '10px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: '#f87171' }}>
              <RotateCcw size={18} />
              <span style={{ fontWeight: 800 }}>Reset Progress</span>
            </div>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              Clears all unlocked levels, best scores, tokens, and achievements.
            </p>
            <button
              onClick={handleReset}
              style={{
                background: confirmReset ? '#dc2626' : '#ef4444',
                color: '#fff',
                padding: '0.6rem',
                borderRadius: '8px',
                fontWeight: 800,
                fontSize: '0.85rem'
              }}
            >
              {confirmReset ? 'CONFIRM RESET ALL?' : 'RESET PROGRESS'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
