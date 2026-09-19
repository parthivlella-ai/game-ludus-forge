import React from 'react';
import { User, Trophy, Flame, Coins, Award, LogOut, X, Star, Crosshair, Zap } from 'lucide-react';
import { progressionManager } from '../../services/progressionManager.js';
import { soundEngine } from '../../services/soundEngine.js';

export default function ProfileModal({ isOpen, onClose, onLogout }) {
  if (!isOpen) return null;

  const stats = progressionManager.getProfileStats();
  const winRate = stats.totalAttempts > 0 
    ? Math.round((stats.totalWins / stats.totalAttempts) * 100) 
    : 0;

  return (
    <div className="modal-overlay">
      <div className="modal-content glass-panel glow-purple" style={{ maxWidth: '520px' }}>
        {/* Header with Close */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <div style={{
              width: '42px',
              height: '42px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #0284c7, #8b5cf6)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff'
            }}>
              <User size={22} />
            </div>
            <div style={{ textAlign: 'left' }}>
              <h2 style={{ fontSize: '1.3rem', fontWeight: 900, lineHeight: 1.1 }}>
                {stats.username}
              </h2>
              <span style={{ fontSize: '0.75rem', color: '#38bdf8', fontWeight: 700 }}>
                OPERATIVE DOSSIER
              </span>
            </div>
          </div>

          <button
            className="modal-close-btn"
            onClick={() => { soundEngine.playClick(); onClose(); }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Level Progression Bar */}
        <div style={{
          width: '100%',
          background: 'rgba(255, 255, 255, 0.05)',
          borderRadius: '12px',
          padding: '0.8rem 1rem',
          margin: '0.8rem 0 0.2rem',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          textAlign: 'left'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', fontWeight: 700 }}>
            <span>PROGRESSION TIER</span>
            <span style={{ color: '#06b6d4' }}>LEVEL {stats.unlockedLevel} / 60</span>
          </div>
          <div style={{
            width: '100%',
            height: '8px',
            background: 'rgba(0, 0, 0, 0.4)',
            borderRadius: '999px',
            marginTop: '0.5rem',
            overflow: 'hidden'
          }}>
            <div style={{
              width: `${(stats.unlockedLevel / 60) * 100}%`,
              height: '100%',
              background: 'linear-gradient(90deg, #10b981, #06b6d4, #a855f7)',
              borderRadius: '999px'
            }} />
          </div>
        </div>

        {/* Stats Grid */}
        <div className="profile-stats-grid">
          <div className="profile-stat-box">
            <span className="profile-stat-label">TOTAL SCORE</span>
            <span className="profile-stat-value" style={{ color: '#38bdf8' }}>
              {stats.totalScore.toLocaleString()}
            </span>
          </div>

          <div className="profile-stat-box">
            <span className="profile-stat-label">INK TOKENS</span>
            <span className="profile-stat-value" style={{ color: '#fbbf24' }}>
              🪙 {stats.inkTokens}
            </span>
          </div>

          <div className="profile-stat-box">
            <span className="profile-stat-label">STARS EARNED</span>
            <span className="profile-stat-value" style={{ color: '#f59e0b' }}>
              ⭐ {stats.totalStars} / 180
            </span>
          </div>

          <div className="profile-stat-box">
            <span className="profile-stat-label">LEVELS CLEARED</span>
            <span className="profile-stat-value" style={{ color: '#10b981' }}>
              {stats.completedCount} / 60
            </span>
          </div>

          <div className="profile-stat-box">
            <span className="profile-stat-label">HIGHEST STREAK</span>
            <span className="profile-stat-value" style={{ color: '#f97316' }}>
              🔥 x{stats.highestStreak}
            </span>
          </div>

          <div className="profile-stat-box">
            <span className="profile-stat-label">SUCCESS RATE</span>
            <span className="profile-stat-value" style={{ color: '#a855f7' }}>
              {winRate}% ({stats.totalWins}W / {stats.totalAttempts}A)
            </span>
          </div>

          <div className="profile-stat-box">
            <span className="profile-stat-label">EXPLOSIONS</span>
            <span className="profile-stat-value" style={{ color: '#ef4444' }}>
              💥 {stats.totalExplosions}
            </span>
          </div>

          <div className="profile-stat-box">
            <span className="profile-stat-label">ACHIEVEMENTS</span>
            <span className="profile-stat-value" style={{ color: '#ec4899' }}>
              🏆 {stats.achievementsCount} / {stats.totalAchievements}
            </span>
          </div>
        </div>

        {/* Account Switch / Logout Action */}
        <button
          className="btn-secondary"
          style={{
            width: '100%',
            borderColor: 'rgba(239, 68, 68, 0.4)',
            color: '#f87171',
            background: 'rgba(239, 68, 68, 0.1)',
            padding: '0.75rem',
            marginTop: '0.5rem'
          }}
          onClick={() => {
            soundEngine.playClick();
            onLogout();
          }}
        >
          <LogOut size={16} />
          <span>SWITCH ACCOUNT / LOG OUT</span>
        </button>
      </div>
    </div>
  );
}
