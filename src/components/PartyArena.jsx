import React from 'react';
import { User, Bot, Zap, Heart } from 'lucide-react';

export default function PartyArena({ players, currentPlayerIndex, isMultiplayerMode }) {
  if (!isMultiplayerMode || !players || players.length === 0) return null;

  return (
    <div style={{
      display: 'flex',
      gap: '1rem',
      width: '100%',
      maxWidth: '750px',
      justifyContent: 'center',
      flexWrap: 'wrap',
      marginBottom: '1rem'
    }}>
      {players.map((p, idx) => {
        const isActive = idx === currentPlayerIndex;
        return (
          <div
            key={p.id}
            className="glass-panel"
            style={{
              flex: '1 1 180px',
              maxWidth: '220px',
              padding: '0.8rem 1rem',
              borderRadius: '12px',
              border: isActive ? '2px solid #06b6d4' : '1px solid var(--border-glass)',
              background: isActive ? 'rgba(6, 182, 212, 0.15)' : 'var(--bg-card)',
              boxShadow: isActive ? '0 0 20px rgba(6, 182, 212, 0.4)' : 'none',
              transform: isActive ? 'scale(1.03)' : 'scale(1)',
              transition: 'all 0.3s ease',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.4rem',
              position: 'relative'
            }}
          >
            {isActive && (
              <span style={{
                position: 'absolute',
                top: '-10px',
                background: '#06b6d4',
                color: '#060913',
                fontSize: '0.65rem',
                fontWeight: '900',
                padding: '2px 8px',
                borderRadius: '999px',
                letterSpacing: '0.05em'
              }}>
                💣 ACTIVE TURN
              </span>
            )}

            <div style={{
              width: '42px',
              height: '42px',
              borderRadius: '50%',
              background: isActive ? '#06b6d4' : 'rgba(255, 255, 255, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.2rem'
            }}>
              {p.isAi ? <Bot size={22} color={isActive ? '#060913' : '#a855f7'} /> : <User size={22} color={isActive ? '#060913' : '#38bdf8'} />}
            </div>

            <div style={{ fontWeight: '800', fontSize: '0.95rem' }}>{p.name}</div>

            <div style={{ display: 'flex', gap: '0.6rem', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              <span>🏆 {p.score}</span>
              <span>🔥 x{p.streak}</span>
            </div>

            <div style={{ display: 'flex', gap: '3px', marginTop: '2px' }}>
              {Array.from({ length: 3 }).map((_, hIdx) => (
                <Heart
                  key={hIdx}
                  size={14}
                  fill={hIdx < p.health ? '#ef4444' : 'transparent'}
                  color="#ef4444"
                />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
