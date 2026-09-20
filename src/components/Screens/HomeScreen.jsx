import React from 'react';
import { Play, HelpCircle, Award, ShoppingBag, Settings, User, MapPin, Flame } from 'lucide-react';
import { soundEngine } from '../../services/soundEngine.js';
import { authService } from '../../services/authService.js';

export default function HomeScreen({
  playerState,
  onPlay,
  onQuickPlay,
  onOpenHowToPlay,
  onOpenRewards,
  onOpenShop,
  onOpenSettings,
  onOpenProfile
}) {
  const currentUser = authService.getCurrentUser();
  const displayName = currentUser ? (currentUser.displayName || currentUser.username) : 'Player';

  // Calculate player rank based on unlocked level and score
  const getOperativeRank = () => {
    const lvl = playerState.unlockedLevel || 1;
    if (lvl >= 50) return { title: 'APEX ARCHITECT', color: '#ec4899', badge: '💎 TIER 5' };
    if (lvl >= 41) return { title: 'VOID SPECIALIST', color: '#ef4444', badge: '🔴 TIER 4' };
    if (lvl >= 21) return { title: 'LOGIC CIPHER', color: '#f59e0b', badge: '🟡 TIER 3' };
    if (lvl >= 11) return { title: 'TACTICAL DEFUSER', color: '#06b6d4', badge: '🔵 TIER 2' };
    return { title: 'RECRUIT DEFUSER', color: '#10b981', badge: '🟢 TIER 1' };
  };

  const rank = getOperativeRank();

  const handlePlayClick = () => {
    soundEngine.playClick();
    onPlay();
  };

  return (
    <div className="home-hero">
      {/* Sci-Fi Live Cyber Ticker */}
      <div className="home-cyber-ticker">
        <div className="ticker-status-dot" />
        <span className="ticker-text">
          SYSTEM ACTIVE // MISSION CLEARANCE 60/60 // SECTOR PROTOCOL ENGAGED // BOMBS ARMED
        </span>
      </div>

      {/* Personalized Player Banner & Dossier */}
      <div className="home-user-welcome glass-panel">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
          <div className="avatar-circle" style={{ borderColor: rank.color, boxShadow: `0 0 16px ${rank.color}66` }}>
            <span>👤</span>
          </div>
          <div style={{ textAlign: 'left' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span className="operative-rank-badge" style={{ borderColor: rank.color, color: rank.color }}>
                {rank.badge} • {rank.title}
              </span>
            </div>
            <div style={{ fontSize: '1.35rem', fontWeight: 900, color: '#ffffff', letterSpacing: '0.02em' }}>
              Player {displayName}
            </div>
          </div>
        </div>

        <button
          className="profile-shortcut-btn"
          onClick={() => { soundEngine.playClick(); onOpenProfile(); }}
          title="View Operative Dossier"
        >
          <User size={15} />
          <span>DOSSIER</span>
        </button>
      </div>

      {/* Main Game Title with Hologram Shimmer */}
      <div className="hero-branding">
        <h1 className="hero-title">WORDBLAST</h1>
        <div className="hero-chaos-tag">CYBERNETIC ARCADE ARENA</div>
        <p className="hero-tagline">
          THINK FAST • DECRYPT CODE • DISARM THE CORE
        </p>
      </div>

      {/* Animated 3D Hero Gyro Reactor Core */}
      <div className="hero-core-container">
        <div className="hero-orbit-ring ring-1" />
        <div className="hero-orbit-ring ring-2" />
        <div className="hero-core-circle">
          <span className="hero-bomb-emoji">💣</span>
          <div className="hero-core-pulse-glow" />
        </div>
      </div>

      {/* Player Snapshot Matrix */}
      <div className="home-snapshot-bar glass-panel">
        <div className="snapshot-stat">
          <span className="stat-label">SECTOR MISSION</span>
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
          <span className="stat-label">MAX STREAK</span>
          <span className="stat-val" style={{ color: '#f97316' }}>🔥 x{playerState.stats.highestStreak || 0}</span>
        </div>
      </div>

      {/* Primary Actions */}
      <div className="hero-actions">
        <button
          className="btn-primary hero-play-btn"
          onClick={() => {
            soundEngine.playClick();
            onQuickPlay ? onQuickPlay(playerState.unlockedLevel) : onPlay();
          }}
        >
          <div className="btn-laser-glare" />
          <Play size={24} fill="currentColor" />
          <span>INFILTRATE LEVEL {playerState.unlockedLevel}</span>
        </button>

        <button
          className="btn-secondary hero-campaign-btn"
          onClick={handlePlayClick}
        >
          <MapPin size={18} color="#38bdf8" />
          <span>MISSION CAMPAIGN MAP</span>
        </button>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', width: '100%' }}>
          <button
            className="btn-secondary cyber-tile-btn"
            onClick={() => { soundEngine.playClick(); onOpenShop(); }}
          >
            <ShoppingBag size={18} color="#ec4899" />
            <span>CYBER SHOP</span>
          </button>

          <button
            className="btn-secondary cyber-tile-btn"
            onClick={() => { soundEngine.playClick(); onOpenRewards(); }}
          >
            <Award size={18} color="#fbbf24" />
            <span>ACHIEVEMENTS</span>
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', width: '100%' }}>
          <button
            className="btn-secondary cyber-tile-btn"
            onClick={() => { soundEngine.playClick(); onOpenHowToPlay(); }}
          >
            <HelpCircle size={18} color="#38bdf8" />
            <span>FIELD MANUAL</span>
          </button>

          <button
            className="btn-secondary cyber-tile-btn"
            onClick={() => { soundEngine.playClick(); onOpenSettings(); }}
          >
            <Settings size={18} color="#94a3b8" />
            <span>CONFIG</span>
          </button>
        </div>
      </div>
    </div>
  );
}
