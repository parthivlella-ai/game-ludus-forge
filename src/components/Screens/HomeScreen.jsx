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
  const displayName = currentUser ? (currentUser.displayName || currentUser.username) : 'Operative';

  const handlePlayClick = () => {
    soundEngine.playClick();
    onPlay();
  };

  return (
    <div className="home-hero">
      {/* Personalized Player Banner */}
      <div className="home-user-welcome">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div className="avatar-circle">
            <span>👤</span>
          </div>
          <div style={{ textAlign: 'left' }}>
            <div style={{ fontSize: '0.8rem', color: '#38bdf8', fontWeight: 800, letterSpacing: '0.1em' }}>
              LOGGED IN AS
            </div>
            <div style={{ fontSize: '1.25rem', fontWeight: 900, color: '#ffffff' }}>
              Welcome back, {displayName}
            </div>
          </div>
        </div>

        <button
          className="profile-shortcut-btn"
          onClick={() => { soundEngine.playClick(); onOpenProfile(); }}
          title="View Operative Profile"
        >
          <User size={16} />
          <span>PROFILE</span>
        </button>
      </div>

      {/* Main Title */}
      <div style={{ marginTop: '0.5rem' }}>
        <h1 className="hero-title">WORDBLAST</h1>
        <div className="hero-chaos-tag">3D ARCADE ARENA</div>
      </div>

      <p className="hero-tagline">
        "THINK FAST. TYPE FASTER. DON'T EXPLODE."
      </p>

      {/* Animated 3D Hero Core */}
      <div className="hero-core-container">
        <div className="hero-core-circle">
          <span>💣</span>
        </div>
      </div>

      {/* Player Snapshot Bar */}
      <div className="home-snapshot-bar">
        <div className="snapshot-stat">
          <span className="stat-label">MISSION LEVEL</span>
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

      {/* Primary Actions */}
      <div className="hero-actions">
        <button
          className="btn-primary hero-play-btn"
          onClick={() => {
            soundEngine.playClick();
            onQuickPlay ? onQuickPlay(playerState.unlockedLevel) : onPlay();
          }}
        >
          <Play size={24} fill="white" />
          <span>DEPLOY LEVEL {playerState.unlockedLevel}</span>
        </button>

        <button
          className="btn-secondary"
          onClick={handlePlayClick}
          style={{
            borderColor: 'rgba(56, 189, 248, 0.4)',
            background: 'rgba(56, 189, 248, 0.1)',
            color: '#38bdf8'
          }}
        >
          <MapPin size={18} />
          <span>MISSION CAMPAIGN MAP</span>
        </button>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', width: '100%' }}>
          <button
            className="btn-secondary"
            onClick={() => { soundEngine.playClick(); onOpenShop(); }}
          >
            <ShoppingBag size={18} color="#ec4899" />
            <span>GADGET SHOP</span>
          </button>

          <button
            className="btn-secondary"
            onClick={() => { soundEngine.playClick(); onOpenRewards(); }}
          >
            <Award size={18} color="#fbbf24" />
            <span>ACHIEVEMENTS</span>
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', width: '100%' }}>
          <button
            className="btn-secondary"
            onClick={() => { soundEngine.playClick(); onOpenHowToPlay(); }}
          >
            <HelpCircle size={18} color="#38bdf8" />
            <span>HOW TO PLAY</span>
          </button>

          <button
            className="btn-secondary"
            onClick={() => { soundEngine.playClick(); onOpenSettings(); }}
          >
            <Settings size={18} color="#94a3b8" />
            <span>SETTINGS</span>
          </button>
        </div>
      </div>
    </div>
  );
}
