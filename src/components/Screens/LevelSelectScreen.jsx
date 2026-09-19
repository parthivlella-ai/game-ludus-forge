import React, { useState } from 'react';
import { ArrowLeft, Lock, Star, Sparkles, Zap, Brain, HelpCircle } from 'lucide-react';
import { soundEngine } from '../../services/soundEngine.js';

export default function LevelSelectScreen({
  unlockedLevel,
  completedLevels,
  onSelectLevel,
  onBack
}) {
  const [activeZone, setActiveZone] = useState('easy'); // 'easy' | 'medium' | 'hard'

  const zoneMetadata = {
    easy: {
      start: 1,
      end: 20,
      title: '🟢 EASY: WORD BLAST',
      desc: '3 Words per Level • Pure Word Constraints • 10–15s Timers',
      themeClass: 'zone-easy',
      accentColor: '#10b981',
      icon: <Zap size={18} />
    },
    medium: {
      start: 21,
      end: 40,
      title: '🟡 MEDIUM: PUZZLE BLAST',
      desc: '2 Puzzles per Level • Math & Logic Deduction • 15–20s Timers',
      themeClass: 'zone-medium',
      accentColor: '#f59e0b',
      icon: <Brain size={18} />
    },
    hard: {
      start: 41,
      end: 60,
      title: '🔴 HARD: RIDDLE / TRICK CHAMBER',
      desc: '1 Riddle per Level • Lateral Brain Teasers • 30s Fixed Timer',
      themeClass: 'zone-hard',
      accentColor: '#ef4444',
      icon: <HelpCircle size={18} />
    }
  };

  const currentZone = zoneMetadata[activeZone];
  const levelsInZone = Array.from(
    { length: currentZone.end - currentZone.start + 1 },
    (_, i) => currentZone.start + i
  );

  const handleLevelClick = (lvl) => {
    if (lvl <= unlockedLevel) {
      soundEngine.playClick();
      onSelectLevel(lvl);
    } else {
      soundEngine.playWrong();
    }
  };

  return (
    <div className={`level-select-container ${currentZone.themeClass}`}>
      {/* Top Header */}
      <div className="level-select-header">
        <button
          className="btn-secondary"
          onClick={() => { soundEngine.playClick(); onBack(); }}
          style={{ padding: '0.6rem 1rem' }}
        >
          <ArrowLeft size={18} />
          <span>HOME</span>
        </button>

        <div style={{ textAlign: 'center' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 900, letterSpacing: '0.04em' }}>
            MISSION CAMPAIGN
          </h2>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            CHOOSE YOUR INFILTRATION POINT
          </p>
        </div>

        <div className="level-progress-badge">
          <span>CLEARED: </span>
          <strong style={{ color: '#38bdf8' }}>{Math.min(unlockedLevel, 60)} / 60</strong>
        </div>
      </div>

      {/* Zone Switcher Tabs */}
      <div className="zone-tabs">
        <button
          className={`zone-tab-btn ${activeZone === 'easy' ? 'active easy' : ''}`}
          onClick={() => { soundEngine.playClick(); setActiveZone('easy'); }}
        >
          <Zap size={16} />
          <span>🟢 EASY (1–20)</span>
        </button>

        <button
          className={`zone-tab-btn ${activeZone === 'medium' ? 'active medium' : ''}`}
          onClick={() => { soundEngine.playClick(); setActiveZone('medium'); }}
        >
          <Brain size={16} />
          <span>🟡 MEDIUM (21–40)</span>
        </button>

        <button
          className={`zone-tab-btn ${activeZone === 'hard' ? 'active hard' : ''}`}
          onClick={() => { soundEngine.playClick(); setActiveZone('hard'); }}
        >
          <HelpCircle size={16} />
          <span>🔴 HARD (41–60)</span>
        </button>
      </div>

      {/* Active Zone Description Banner */}
      <div className="zone-identity-banner" style={{ borderColor: currentZone.accentColor }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: currentZone.accentColor }}>
          {currentZone.icon}
          <h3 style={{ fontSize: '1.1rem', fontWeight: 900 }}>{currentZone.title}</h3>
        </div>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
          {currentZone.desc}
        </p>
      </div>

      {/* 3D Floating Node Progression Path */}
      <div className="levels-path-grid">
        {levelsInZone.map((lvl) => {
          const isUnlocked = lvl <= unlockedLevel;
          const isCurrentActive = lvl === unlockedLevel;
          const completion = completedLevels[lvl];
          const stars = completion ? completion.stars : 0;
          const bestScore = completion ? completion.bestScore : 0;

          return (
            <div
              key={lvl}
              className={`path-node-card ${isUnlocked ? 'unlocked' : 'locked'} ${isCurrentActive ? 'current-active' : ''}`}
              onClick={() => handleLevelClick(lvl)}
            >
              {isCurrentActive && (
                <div className="current-pulse-ring" />
              )}

              <div className="node-num">
                {lvl < 10 ? `0${lvl}` : lvl}
              </div>

              {isUnlocked ? (
                <>
                  <div className="node-stars">
                    {[1, 2, 3].map((sIdx) => (
                      <span
                        key={sIdx}
                        className={sIdx <= stars ? 'star-filled' : 'star-empty'}
                      >
                        ★
                      </span>
                    ))}
                  </div>

                  <div className="node-score">
                    {bestScore > 0 ? `${bestScore} pts` : isCurrentActive ? 'PLAY' : 'OPEN'}
                  </div>
                </>
              ) : (
                <div className="node-locked-label">
                  <Lock size={14} />
                  <span>LOCKED</span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
