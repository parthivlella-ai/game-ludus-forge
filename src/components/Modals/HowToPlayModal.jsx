import React from 'react';
import { X, HelpCircle, Bomb, Flame, Zap, Shield, AlertTriangle } from 'lucide-react';

export default function HowToPlayModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content glass-panel"
        style={{ maxWidth: '620px', padding: '1.8rem', textAlign: 'left' }}
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
            <HelpCircle size={22} color="#06b6d4" />
            <h2 style={{ fontSize: '1.5rem', fontWeight: 900 }}>HOW TO PLAY</h2>
          </div>
          <button
            onClick={onClose}
            style={{ background: 'transparent', color: 'var(--text-muted)' }}
          >
            <X size={20} />
          </button>
        </div>

        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          maxHeight: '65vh',
          overflowY: 'auto',
          paddingRight: '0.5rem'
        }}>
          {/* Rule 1 */}
          <div style={{ display: 'flex', gap: '0.8rem' }}>
            <Bomb size={24} color="#ef4444" style={{ flexShrink: 0, marginTop: '2px' }} />
            <div>
              <h4 style={{ color: '#f87171', fontWeight: 800 }}>THE TICKING BOMB</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                Every challenge has an active countdown. Solve the challenge before the timer hits 0. If the timer runs out, the bomb explodes!
              </p>
            </div>
          </div>

          {/* Rule 2 */}
          <div style={{ display: 'flex', gap: '0.8rem' }}>
            <Zap size={24} color="#38bdf8" style={{ flexShrink: 0, marginTop: '2px' }} />
            <div>
              <h4 style={{ color: '#38bdf8', fontWeight: 800 }}>ANTI-REPETITION GUARANTEE</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                If you fail a question and hit RETRY, you will NEVER see that same question again! The system immediately removes it and serves a fresh challenge.
              </p>
            </div>
          </div>

          {/* Rule 3 */}
          <div style={{ display: 'flex', gap: '0.8rem' }}>
            <Flame size={24} color="#f59e0b" style={{ flexShrink: 0, marginTop: '2px' }} />
            <div>
              <h4 style={{ color: '#fbbf24', fontWeight: 800 }}>STREAKS & INK TOKENS</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                Consecutive correct answers build a Streak multiplier. Faster answers earn bonus Ink Tokens to purchase power-ups in the Chaos Shop.
              </p>
            </div>
          </div>

          {/* Rule 4 */}
          <div style={{ display: 'flex', gap: '0.8rem' }}>
            <AlertTriangle size={24} color="#ec4899" style={{ flexShrink: 0, marginTop: '2px' }} />
            <div>
              <h4 style={{ color: '#f472b6', fontWeight: 800 }}>ENVIRONMENTAL MODIFIERS</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                Watch out for Anarchy Mode (prompts switch if you hesitate), Vowel Shortage (vowels incur penalties), and Blackout (text hidden, rely on deduction).
              </p>
            </div>
          </div>

          {/* Rule 5 */}
          <div style={{ display: 'flex', gap: '0.8rem' }}>
            <Shield size={24} color="#10b981" style={{ flexShrink: 0, marginTop: '2px' }} />
            <div>
              <h4 style={{ color: '#34d399', fontWeight: 800 }}>SURVIVE ALL 60 LEVELS</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                Advance through 🟢 Easy (1-20), 🟡 Medium (21-40), and 🔴 Hard (41-60). The final 10 levels are the ultimate Chaos Arena!
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={onClose}
          className="btn-primary"
          style={{ width: '100%', marginTop: '0.5rem', padding: '0.8rem' }}
        >
          READY FOR CHAOS!
        </button>
      </div>
    </div>
  );
}
