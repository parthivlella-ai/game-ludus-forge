import React from 'react';
import { X, Award } from 'lucide-react';

export default function AchievementsModal({ isOpen, onClose, achievements }) {
  if (!isOpen) return null;

  const unlockedCount = achievements.filter(a => a.unlocked).length;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content glass-panel"
        style={{ maxWidth: '600px', padding: '1.8rem' }}
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
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <Award size={22} color="#fbbf24" />
            <h2 style={{ fontSize: '1.5rem', fontWeight: 900 }}>ACHIEVEMENTS</h2>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span style={{ color: '#fbbf24', fontWeight: 800 }}>
              {unlockedCount} / {achievements.length}
            </span>
            <button
              onClick={onClose}
              style={{ background: 'transparent', color: 'var(--text-muted)' }}
            >
              <X size={20} />
            </button>
          </div>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
          gap: '0.8rem',
          width: '100%',
          marginTop: '0.5rem',
          maxHeight: '60vh',
          overflowY: 'auto'
        }}>
          {achievements.map((ach) => (
            <div
              key={ach.id}
              style={{
                background: ach.unlocked ? 'rgba(16, 185, 129, 0.1)' : 'rgba(15, 23, 42, 0.5)',
                border: ach.unlocked ? '1px solid #10b981' : '1px solid var(--border-glass)',
                borderRadius: '10px',
                padding: '0.8rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.8rem',
                textAlign: 'left',
                opacity: ach.unlocked ? 1 : 0.55
              }}
            >
              <div style={{ fontSize: '2rem' }}>{ach.icon}</div>
              <div style={{ flex: 1 }}>
                <div style={{
                  fontWeight: 800,
                  fontSize: '0.9rem',
                  color: ach.unlocked ? '#34d399' : '#e2e8f0'
                }}>
                  {ach.name}
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  {ach.desc}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
