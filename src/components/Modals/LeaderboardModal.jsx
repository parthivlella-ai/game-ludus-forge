import React, { useState, useEffect } from 'react';
import { Trophy, Medal, X, Flame, Shield, Award, User } from 'lucide-react';
import { progressionManager } from '../../services/progressionManager.js';
import { soundEngine } from '../../services/soundEngine.js';

export default function LeaderboardModal({ isOpen, onClose, currentUsername }) {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isOpen) {
      setLoading(true);
      progressionManager.fetchLeaderboard().then((data) => {
        setLeaderboard(data || []);
        setLoading(false);
      });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content glass-panel"
        style={{ maxWidth: '600px', width: '92%', padding: '1.8rem' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
          borderBottom: '1px solid var(--border-glass)',
          paddingBottom: '0.8rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <Trophy size={24} color="#f59e0b" />
            <h2 style={{ fontSize: '1.4rem', fontWeight: 900, letterSpacing: '0.02em' }}>
              GLOBAL CHAOS LEADERBOARD
            </h2>
          </div>
          <button
            onClick={() => { soundEngine.playClick(); onClose(); }}
            style={{ background: 'transparent', color: 'var(--text-muted)' }}
          >
            <X size={20} />
          </button>
        </div>

        <p style={{ fontSize: '0.8rem', color: 'var(--text-dim)', margin: '0.6rem 0 1rem', textAlign: 'left' }}>
          Real defusers ranked by total score and sector clearance. Authentic operatives only.
        </p>

        {loading ? (
          <div style={{ padding: '2rem', color: 'var(--text-muted)' }}>
            <span>ACCESSING SATELLITE RELAY...</span>
          </div>
        ) : leaderboard.length === 0 ? (
          <div style={{ padding: '2rem', color: 'var(--text-muted)' }}>
            <span>No defusers registered yet. Complete a level to claim #1!</span>
          </div>
        ) : (
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem',
            maxHeight: '380px',
            overflowY: 'auto',
            paddingRight: '0.4rem'
          }}>
            {leaderboard.map((player, idx) => {
              const isCurrent = currentUsername && player.username.toLowerCase() === currentUsername.toLowerCase();
              const rankColor = idx === 0 ? '#f59e0b' : idx === 1 ? '#94a3b8' : idx === 2 ? '#b45309' : 'var(--text-dim)';
              const rankIcon = idx === 0 ? '🥇' : idx === 1 ? '🥈' : idx === 2 ? '🥉' : `#${idx + 1}`;

              return (
                <div
                  key={player.username}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.75rem 1rem',
                    borderRadius: '10px',
                    background: isCurrent ? 'rgba(6, 182, 212, 0.15)' : 'rgba(255, 255, 255, 0.03)',
                    border: isCurrent ? '1.5px solid #06b6d4' : '1px solid var(--border-glass)',
                    boxShadow: isCurrent ? '0 0 15px rgba(6, 182, 212, 0.25)' : 'none',
                    transition: 'all 0.2s ease'
                  }}
                >
                  {/* Rank & Name */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                    <div style={{
                      width: '32px',
                      fontSize: idx < 3 ? '1.2rem' : '0.9rem',
                      fontWeight: 900,
                      color: rankColor,
                      textAlign: 'center'
                    }}>
                      {rankIcon}
                    </div>

                    <div style={{ textAlign: 'left' }}>
                      <div style={{
                        fontWeight: 800,
                        fontSize: '0.95rem',
                        color: isCurrent ? '#00f59b' : '#ffffff',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.4rem'
                      }}>
                        <span>{player.displayName || player.username}</span>
                        {isCurrent && (
                          <span style={{
                            fontSize: '0.65rem',
                            background: '#00f59b',
                            color: '#060913',
                            padding: '1px 6px',
                            borderRadius: '4px',
                            fontWeight: 900
                          }}>YOU</span>
                        )}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', display: 'flex', gap: '0.6rem' }}>
                        <span>Lvl {player.unlockedLevel}</span>
                        <span>•</span>
                        <span>🔥 Streak {player.highestStreak || 0}</span>
                      </div>
                    </div>
                  </div>

                  {/* Score */}
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontWeight: 900, fontSize: '1.05rem', color: '#f59e0b' }}>
                      {(player.totalScore || 0).toLocaleString()}
                    </div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)' }}>PTS</div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <div style={{ marginTop: '1.2rem', display: 'flex', justifyContent: 'center' }}>
          <button
            onClick={() => { soundEngine.playClick(); onClose(); }}
            style={{
              padding: '0.6rem 2rem',
              borderRadius: '8px',
              background: 'var(--border-glass)',
              color: '#ffffff',
              fontWeight: 800,
              fontSize: '0.9rem'
            }}
          >
            DISMISS
          </button>
        </div>
      </div>
    </div>
  );
}
