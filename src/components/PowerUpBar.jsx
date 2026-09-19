import React from 'react';
import { Snowflake, Rewind, Eye, Shield, Wind, Flame } from 'lucide-react';
import { soundEngine } from '../services/soundEngine';

export default function PowerUpBar({ inventory, onUsePowerUp, disabled, shieldActive }) {
  const handleUse = (id) => {
    if (disabled || (inventory[id] || 0) <= 0) return;
    soundEngine.playPowerup();
    onUsePowerUp(id);
  };

  return (
    <div className="powerups-bar">
      <button
        className="powerup-btn"
        onClick={() => handleUse('freeze')}
        disabled={disabled || (inventory.freeze || 0) <= 0}
        title="Freeze bomb timer for 3 seconds"
      >
        <Snowflake size={16} color="#38bdf8" />
        <span>Freeze</span>
        <span className="powerup-badge">{inventory.freeze || 0}</span>
      </button>

      <button
        className="powerup-btn"
        onClick={() => handleUse('rewind')}
        disabled={disabled || (inventory.rewind || 0) <= 0}
        title="Restore +3 seconds to the timer"
      >
        <Rewind size={16} color="#a855f7" />
        <span>+3s</span>
        <span className="powerup-badge">{inventory.rewind || 0}</span>
      </button>

      <button
        className="powerup-btn"
        onClick={() => handleUse('lens')}
        disabled={disabled || (inventory.lens || 0) <= 0}
        title="Reveal a strategic hint"
      >
        <Eye size={16} color="#34d399" />
        <span>Lens</span>
        <span className="powerup-badge">{inventory.lens || 0}</span>
      </button>

      <button
        className="powerup-btn"
        onClick={() => handleUse('shield')}
        disabled={disabled || (inventory.shield || 0) <= 0 || shieldActive}
        title="Absorb one bomb explosion"
        style={shieldActive ? { borderColor: '#10b981', background: 'rgba(16, 185, 129, 0.2)' } : {}}
      >
        <Shield size={16} color={shieldActive ? '#34d399' : '#f59e0b'} />
        <span>{shieldActive ? 'Shielded' : 'Shield'}</span>
        <span className="powerup-badge">{inventory.shield || 0}</span>
      </button>

      <button
        className="powerup-btn"
        onClick={() => handleUse('potato')}
        disabled={disabled || (inventory.potato || 0) <= 0}
        title="Hot Potato: Swap or pass dangerous bomb"
      >
        <Flame size={16} color="#f97316" />
        <span>Pass</span>
        <span className="powerup-badge">{inventory.potato || 0}</span>
      </button>
    </div>
  );
}
