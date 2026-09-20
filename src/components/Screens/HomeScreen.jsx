import React from 'react';
import { Play, Map, Calendar, Trophy, ShoppingBag, Award, User, HelpCircle, Settings, Flame, Sparkles, CheckCircle } from 'lucide-react';
import { soundEngine } from '../../services/soundEngine.js';
import { authService } from '../../services/authService.js';
import { progressionManager } from '../../services/progressionManager.js';

export default function HomeScreen({
  playerState,
  onPlay,
  onQuickPlay,
  onOpenHowToPlay,
  onOpenRewards,
  onOpenShop,
  onOpenSettings,
  onOpenProfile,
  onOpenLeaderboard,
  onOpenDailyChallenge,
  isDailyCompleted
}) {
  const currentUser = authService.getCurrentUser();
  const displayName = currentUser ? (currentUser.displayName || currentUser.username) : 'Player';

  // Calculate player rank based on unlocked level
  const getPlayerRank = () => {
    const lvl = playerState.unlockedLevel || 1;
    if (lvl >= 50) return { title: 'APEX MASTER', color: '#ec4899', badge: '💎 TIER 5' };
    if (lvl >= 41) return { title: 'VOID DEFUSER', color: '#ef4444', badge: '🔴 TIER 4' };
    if (lvl >= 21) return { title: 'LOGIC CIPHER', color: '#f59e0b', badge: '🟡 TIER 3' };
    if (lvl >= 11) return { title: 'TACTICAL DEFUSER', color: '#06b6d4', badge: '🔵 TIER 2' };
    return { title: 'RECRUIT DEFUSER', color: '#10b981', badge: '🟢 TIER 1' };
  };

  const rank = getPlayerRank();

  return (
    <div className="home-hero">
      {/* Live Cyber Ticker */}
      <div className="home-cyber-ticker">
        <div className="ticker-status-dot" />
        <span className="ticker-text">
          SYSTEM ONLINE // LEVEL {playerState.unlockedLevel} CLEARANCE // BOMB DISARM PROTOCOL ENGAGED // THINK FAST
        </span>
      </div>

      {/* Player Dossier Banner */}
      <div className="home-user-welcome glass-panel">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
          <div className="avatar-circle" style={{ borderColor: rank.color, boxShadow: `0 0 16px ${rank.color}66` }}>
            <span>👤</span>
          </div>
          <div style={{ textAlign: 'left' }}>
            <span className="operative-rank-badge" style={{ borderColor: rank.color, color: rank.color }}>
              {rank.badge} • {rank.title}
            </span>
            <div style={{ fontSize: '1.25rem', fontWeight: 900, color: '#ffffff' }}>
              {displayName}
            </div>
          </div>
        </div>

        <button
          className="profile-shortcut-btn"
          onClick={() => { soundEngine.playClick(); onOpenProfile(); }}
          title="Open Player Dossier"
        >
          <User size={15} />
          <span>PROFILE</span>
        </button>
      </div>

      {/* Main Game Title */}
      <div className="hero-branding">
        <h1 className="hero-title">WORDBLAST</h1>
        <div className="hero-chaos-tag">💣 CHAOS EDITION 💣</div>
        <p className="hero-tagline">
          THINK FAST • TYPE FASTER • DON'T EXPLODE
        </p>
      </div>

      {/* Animated Gyro Bomb Core */}
      <div className="hero-core-container">
        <div className="hero-orbit-ring ring-1" />
        <div className="hero-orbit-ring ring-2" />
        <div className="hero-core-circle">
          <span className="hero-bomb-emoji">💣</span>
          <div className="hero-core-pulse-glow" />
        </div>
      </div>

      {/* Useful Player Stats Matrix */}
      <div className="home-snapshot-bar glass-panel">
        <div className="snapshot-stat">
          <span className="stat-label">LEVEL</span>
          <span className="stat-val" style={{ color: '#06b6d4' }}>{playerState.unlockedLevel} / 60</span>
        </div>
        <div className="snapshot-divider" />
        <div className="snapshot-stat">
          <span className="stat-label">TOTAL SCORE</span>
          <span className="stat-val" style={{ color: '#38bdf8' }}>{playerState.totalScore.toLocaleString()}</span>
        </div>
        <div className="snapshot-divider" />
        <div className="snapshot-stat">
          <span className="stat-label">INK TOKENS</span>
          <span className="stat-val" style={{ color: '#fbbf24' }}>🪙 {playerState.inkTokens}</span>
        </div>
        <div className="snapshot-divider" />
        <div className="snapshot-stat">
          <span className="stat-label">BEST STREAK</span>
          <span className="stat-val" style={{ color: '#f97316' }}>🔥 x{playerState.stats.highestStreak || 0}</span>
        </div>
      </div>

      {/* PRIMARY ACTION: THE BIG "PLAY" BUTTON */}
      <div className="hero-actions" style={{ maxWidth: '520px', width: '100%', gap: '0.85rem' }}>
        <button
          className="btn-primary hero-play-btn"
          onClick={() => {
            soundEngine.playClick();
            onQuickPlay ? onQuickPlay(playerState.unlockedLevel) : onPlay();
          }}
          style={{
            padding: '1.2rem 2rem',
            fontSize: '1.3rem',
            letterSpacing: '0.05em',
            boxShadow: '0 0 35px rgba(0, 245, 155, 0.45)',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          <div className="btn-laser-glare" />
          <Play size={28} fill="currentColor" />
          <span>PLAY LEVEL {playerState.unlockedLevel}</span>
        </button>

        {/* SECONDARY CLEAN GRID OPTIONS */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', width: '100%' }}>
          {/* Level Select */}
          <button
            className="btn-secondary cyber-tile-btn"
            onClick={() => { soundEngine.playClick(); onPlay(); }}
          >
            <Map size={18} color="#38bdf8" />
            <span>ALL LEVELS (60)</span>
          </button>

          {/* Daily Challenge with Status Pill */}
          <button
            className="btn-secondary cyber-tile-btn"
            onClick={() => { soundEngine.playClick(); onOpenDailyChallenge(); }}
            style={{ position: 'relative' }}
          >
            <Calendar size={18} color="#ec4899" />
            <span>DAILY CHAOS</span>
            {isDailyCompleted ? (
              <span style={{
                position: 'absolute',
                top: '-6px',
                right: '-6px',
                background: '#10b981',
                color: '#060913',
                fontSize: '0.65rem',
                fontWeight: 900,
                padding: '1px 6px',
                borderRadius: '999px'
              }}>✓ DONE</span>
            ) : (
              <span style={{
                position: 'absolute',
                top: '-6px',
                right: '-6px',
                background: '#ec4899',
                color: '#ffffff',
                fontSize: '0.65rem',
                fontWeight: 900,
                padding: '1px 6px',
                borderRadius: '999px'
              }}>🔥 READY</span>
            )}
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', width: '100%' }}>
          {/* Real Leaderboard */}
          <button
            className="btn-secondary cyber-tile-btn"
            onClick={() => { soundEngine.playClick(); onOpenLeaderboard(); }}
          >
            <Trophy size={18} color="#f59e0b" />
            <span>LEADERBOARD</span>
          </button>

          {/* Shop */}
          <button
            className="btn-secondary cyber-tile-btn"
            onClick={() => { soundEngine.playClick(); onOpenShop(); }}
          >
            <ShoppingBag size={18} color="#a855f7" />
            <span>CHAOS SHOP</span>
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', width: '100%' }}>
          {/* Achievements */}
          <button
            className="btn-secondary cyber-tile-btn"
            onClick={() => { soundEngine.playClick(); onOpenRewards(); }}
          >
            <Award size={18} color="#fbbf24" />
            <span>ACHIEVEMENTS</span>
          </button>

          {/* How to Play */}
          <button
            className="btn-secondary cyber-tile-btn"
            onClick={() => { soundEngine.playClick(); onOpenHowToPlay(); }}
          >
            <HelpCircle size={18} color="#38bdf8" />
            <span>HOW TO PLAY</span>
          </button>
        </div>
      </div>
    </div>
  );
}
