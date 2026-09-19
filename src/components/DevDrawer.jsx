import React, { useState } from 'react';
import { Terminal, ShieldAlert, CheckCircle, XCircle, Coins, Flame, ChevronUp, ChevronDown } from 'lucide-react';
import { progressionManager } from '../services/progressionManager';
import { challengeEngine } from '../services/challengeEngine';

export default function DevDrawer({
  currentLevel,
  onJumpToLevel,
  onTriggerWin,
  onTriggerFail,
  onForceModifier,
  activeChallenge
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [targetLevel, setTargetLevel] = useState(currentLevel || 1);

  const handleUnlockAll = () => {
    progressionManager.unlockAllLevels();
    alert('Dev Mode: All 60 levels unlocked!');
  };

  const handleAddInk = () => {
    progressionManager.addInk(250);
  };

  const handleJump = () => {
    const lvl = parseInt(targetLevel, 10);
    if (lvl >= 1 && lvl <= 60) {
      onJumpToLevel(lvl);
    }
  };

  // Inspect used IDs for current level to verify anti-repetition
  const usedIds = Array.from(challengeEngine.getUsedIdsForLevel(currentLevel || 1));

  return (
    <div className="dev-drawer">
      <button className="dev-toggle-btn" onClick={() => setIsOpen(!isOpen)}>
        <Terminal size={14} />
        <span>DEV DEMO</span>
        {isOpen ? <ChevronDown size={14} /> : <ChevronUp size={14} />}
      </button>

      {isOpen && (
        <div className="dev-panel">
          <div style={{ fontWeight: '800', color: '#38bdf8', display: 'flex', justifyContent: 'space-between' }}>
            <span>🛠️ HACKATHON DEV PANEL</span>
            <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>LVL {currentLevel}</span>
          </div>

          {/* Jump to Level */}
          <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'center' }}>
            <span style={{ fontSize: '0.8rem' }}>Jump Lvl:</span>
            <input
              type="number"
              min="1"
              max="60"
              value={targetLevel}
              onChange={(e) => setTargetLevel(e.target.value)}
              style={{
                width: '55px',
                background: '#090d1f',
                color: '#fff',
                border: '1px solid #334155',
                borderRadius: '4px',
                padding: '2px 6px',
                fontSize: '0.8rem'
              }}
            />
            <button
              onClick={handleJump}
              style={{
                background: '#0284c7',
                color: '#fff',
                borderRadius: '4px',
                padding: '3px 8px',
                fontSize: '0.75rem',
                fontWeight: '700'
              }}
            >
              Go
            </button>
          </div>

          {/* Quick Actions */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.4rem' }}>
            <button
              onClick={handleUnlockAll}
              style={{
                background: 'rgba(16, 185, 129, 0.2)',
                border: '1px solid #10b981',
                color: '#34d399',
                borderRadius: '4px',
                padding: '4px',
                fontSize: '0.75rem',
                fontWeight: '700'
              }}
            >
              Unlock 60 Lvls
            </button>

            <button
              onClick={handleAddInk}
              style={{
                background: 'rgba(245, 158, 11, 0.2)',
                border: '1px solid #f59e0b',
                color: '#fbbf24',
                borderRadius: '4px',
                padding: '4px',
                fontSize: '0.75rem',
                fontWeight: '700'
              }}
            >
              +250 Ink
            </button>
          </div>

          {/* Force States */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.4rem' }}>
            <button
              onClick={onTriggerWin}
              style={{
                background: 'rgba(59, 130, 246, 0.2)',
                border: '1px solid #3b82f6',
                color: '#60a5fa',
                borderRadius: '4px',
                padding: '4px',
                fontSize: '0.75rem',
                fontWeight: '700'
              }}
            >
              Force Win
            </button>

            <button
              onClick={onTriggerFail}
              style={{
                background: 'rgba(239, 68, 68, 0.2)',
                border: '1px solid #ef4444',
                color: '#f87171',
                borderRadius: '4px',
                padding: '4px',
                fontSize: '0.75rem',
                fontWeight: '700'
              }}
            >
              Force Boom
            </button>
          </div>

          {/* Modifiers */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
            <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Force Test Modifier:</span>
            <div style={{ display: 'flex', gap: '0.3rem' }}>
              <button
                onClick={() => onForceModifier('ANARCHY')}
                style={{ flex: 1, background: '#334155', color: '#fff', borderRadius: '4px', padding: '3px', fontSize: '0.7rem' }}
              >
                Anarchy
              </button>
              <button
                onClick={() => onForceModifier('VOWEL_SHORTAGE')}
                style={{ flex: 1, background: '#334155', color: '#fff', borderRadius: '4px', padding: '3px', fontSize: '0.7rem' }}
              >
                Vowels
              </button>
              <button
                onClick={() => onForceModifier('BLACKOUT')}
                style={{ flex: 1, background: '#334155', color: '#fff', borderRadius: '4px', padding: '3px', fontSize: '0.7rem' }}
              >
                Blackout
              </button>
            </div>
          </div>

          {/* Anti-Repetition Live Inspector */}
          <div style={{
            background: 'rgba(0, 0, 0, 0.4)',
            padding: '0.5rem',
            borderRadius: '4px',
            fontSize: '0.7rem',
            color: '#cbd5e1'
          }}>
            <div style={{ fontWeight: '700', color: '#38bdf8', marginBottom: '2px' }}>
              Anti-Repetition Audit:
            </div>
            <div>Current ID: <code style={{ color: '#a78bfa' }}>{activeChallenge?.id || 'none'}</code></div>
            <div>Used this session ({usedIds.length}):</div>
            <div style={{ maxHeight: '40px', overflowY: 'auto', color: '#64748b' }}>
              {usedIds.join(', ') || 'none yet'}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
