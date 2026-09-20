import React from 'react';
import { X, Snowflake, Rewind, Eye, Shield, Wind, Flame, ShoppingBag } from 'lucide-react';
import { soundEngine } from '../../services/soundEngine';

export default function ShopModal({ isOpen, onClose, inkTokens, inventory, onBuyPowerUp }) {
  if (!isOpen) return null;

  const items = [
    {
      id: 'freeze',
      name: 'FREEZE FRAME',
      cost: 1500,
      icon: <Snowflake size={24} color="#38bdf8" />,
      desc: 'Freezes the ticking bomb for 3 seconds.',
      owned: inventory.freeze || 0
    },
    {
      id: 'rewind',
      name: 'TIME REWIND',
      cost: 2000,
      icon: <Rewind size={24} color="#a855f7" />,
      desc: 'Instantly restores +3 seconds to your timer.',
      owned: inventory.rewind || 0
    },
    {
      id: 'lens',
      name: 'TRUTH LENS',
      cost: 1200,
      icon: <Eye size={24} color="#34d399" />,
      desc: 'Reveals a vital hint or bypasses sensory blackout.',
      owned: inventory.lens || 0
    },
    {
      id: 'shield',
      name: 'BLAST SHIELD',
      cost: 2500,
      icon: <Shield size={24} color="#f59e0b" />,
      desc: 'Absorbs one full bomb explosion without failing.',
      owned: inventory.shield || 0
    },
    {
      id: 'potato',
      name: 'HOT POTATO',
      cost: 1800,
      icon: <Flame size={24} color="#f97316" />,
      desc: 'Swaps the active bomb or passes it to another player.',
      owned: inventory.potato || 0
    },
    {
      id: 'smoke',
      name: 'TYPO SMOKE',
      cost: 1000,
      icon: <Wind size={24} color="#ec4899" />,
      desc: 'Disorients opponent arena in multiplayer mode.',
      owned: inventory.smoke || 0
    }
  ];

  const handleBuy = (id, cost) => {
    if (inkTokens >= cost) {
      soundEngine.playToken();
      onBuyPowerUp(id, cost);
    } else {
      soundEngine.playWrong();
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content glass-panel"
        style={{ maxWidth: '650px', padding: '1.8rem' }}
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
            <ShoppingBag size={22} color="#ec4899" />
            <h2 style={{ fontSize: '1.5rem', fontWeight: 900 }}>CHAOS SHOP</h2>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span style={{ color: '#fbbf24', fontWeight: 800 }}>🪙 {inkTokens} INK</span>
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
          gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
          gap: '1rem',
          width: '100%',
          marginTop: '0.5rem'
        }}>
          {items.map((item) => {
            const canAfford = inkTokens >= item.cost;
            return (
              <div
                key={item.id}
                style={{
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border-glass)',
                  borderRadius: '12px',
                  padding: '1rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.6rem',
                  textAlign: 'left'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    {item.icon}
                    <span style={{ fontWeight: 800, fontSize: '0.95rem' }}>{item.name}</span>
                  </div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>
                    Owned: {item.owned}
                  </span>
                </div>

                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', flex: 1 }}>
                  {item.desc}
                </p>

                <button
                  onClick={() => handleBuy(item.id, item.cost)}
                  disabled={!canAfford}
                  style={{
                    background: canAfford ? 'linear-gradient(135deg, #06b6d4, #3b82f6)' : '#334155',
                    color: '#fff',
                    borderRadius: '8px',
                    padding: '0.5rem',
                    fontWeight: 800,
                    fontSize: '0.85rem',
                    opacity: canAfford ? 1 : 0.5
                  }}
                >
                  BUY ({item.cost} INK)
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
