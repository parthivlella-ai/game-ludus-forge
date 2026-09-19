import React, { useEffect, useRef } from 'react';
import { soundEngine } from '../services/soundEngine.js';

export default function Bomb3D({
  timeLeft,
  maxTime,
  isFrozen,
  difficulty = 'easy',
  isExploding = false
}) {
  const ratio = Math.max(0, Math.min(1, timeLeft / maxTime));
  const lastSecondRef = useRef(Math.ceil(timeLeft));

  // Determine state
  // Hard mode has specific thresholds: 20s warning, 10s danger, 5s critical, 3s heavy pulse, 1s extreme
  let isFinalSecond = timeLeft <= 1.2 && timeLeft > 0;
  let isCritical = false;
  let isWarning = false;

  if (difficulty === 'hard') {
    if (timeLeft <= 1.0) isFinalSecond = true;
    else if (timeLeft <= 5.0) isCritical = true;
    else if (timeLeft <= 10.0) isCritical = true;
    else if (timeLeft <= 20.0) isWarning = true;
  } else {
    isCritical = ratio < 0.25;
    isWarning = ratio >= 0.25 && ratio < 0.5;
  }

  // Audio & tick effect
  useEffect(() => {
    const currentSec = Math.ceil(timeLeft);
    if (currentSec !== lastSecondRef.current && timeLeft > 0 && !isFrozen && !isExploding) {
      lastSecondRef.current = currentSec;
      if (isCritical || isFinalSecond) {
        soundEngine.playCriticalTick();
      } else {
        soundEngine.playTick();
      }
    }
  }, [timeLeft, isCritical, isFinalSecond, isFrozen, isExploding]);

  // Color theme per difficulty
  const themeColors = {
    easy: { primary: '#10b981', glow: 'rgba(16, 185, 129, 0.6)', core: '#34d399' },
    medium: { primary: '#f59e0b', glow: 'rgba(245, 158, 11, 0.6)', core: '#fbbf24' },
    hard: { primary: '#ef4444', glow: 'rgba(239, 68, 68, 0.7)', core: '#f87171' }
  };
  const activeColor = (isCritical || isFinalSecond) 
    ? { primary: '#ef4444', glow: 'rgba(239, 68, 68, 0.9)', core: '#ff2a2a' } 
    : isWarning 
    ? { primary: '#f59e0b', glow: 'rgba(245, 158, 11, 0.7)', core: '#fbbf24' } 
    : (themeColors[difficulty] || themeColors.easy);

  // State class
  const bombStateClass = isExploding
    ? 'bomb3d-exploding'
    : isFrozen
    ? 'bomb3d-frozen'
    : isFinalSecond
    ? 'bomb3d-final'
    : isCritical
    ? 'bomb3d-critical'
    : isWarning
    ? 'bomb3d-warning'
    : 'bomb3d-normal';

  const circumference = 2 * Math.PI * 72;
  const strokeOffset = circumference - ratio * circumference;

  return (
    <div className={`bomb3d-container ${bombStateClass}`}>
      {/* 3D Core Sphere with Gyro Rings */}
      <div className="bomb3d-stage">
        {/* Outer Orbit Gyro Ring 1 */}
        <div
          className="bomb3d-ring ring-outer"
          style={{ borderColor: activeColor.primary }}
        />

        {/* Middle Orbit Gyro Ring 2 */}
        <div
          className="bomb3d-ring ring-middle"
          style={{ borderColor: activeColor.primary }}
        />

        {/* Inner Gyro Ring 3 */}
        <div
          className="bomb3d-ring ring-inner"
          style={{ borderColor: activeColor.primary }}
        />

        {/* Fuse Spark Core on Top */}
        <div className="bomb3d-fuse">
          <div className="fuse-neck" />
          <div
            className="fuse-spark"
            style={{
              boxShadow: `0 0 15px ${activeColor.glow}, 0 0 30px #ffffff`,
              background: isFinalSecond ? '#ff0055' : '#ffea00'
            }}
          />
        </div>

        {/* Central Glowing Energy Orb */}
        <div
          className="bomb3d-core"
          style={{
            background: `radial-gradient(circle at 35% 35%, #ffffff 0%, ${activeColor.core} 40%, #090d16 90%)`,
            boxShadow: `0 0 35px ${activeColor.glow}, inset 0 0 20px rgba(255,255,255,0.4)`
          }}
        >
          {/* Circular Countdown Progress SVG */}
          <svg className="bomb3d-progress-svg" viewBox="0 0 160 160">
            <circle
              className="bomb3d-progress-bg"
              cx="80"
              cy="80"
              r="72"
            />
            <circle
              className="bomb3d-progress-bar"
              cx="80"
              cy="80"
              r="72"
              stroke={activeColor.primary}
              strokeDasharray={circumference}
              strokeDashoffset={strokeOffset}
            />
          </svg>

          {/* Digital Countdown Timer */}
          <div className="bomb3d-timer-readout">
            <span className="timer-seconds">
              {timeLeft.toFixed(1)}
            </span>
            <span className="timer-unit">SEC</span>
          </div>
        </div>
      </div>

      {/* Danger Aura Glow Base */}
      <div
        className="bomb3d-aura"
        style={{
          background: `radial-gradient(circle, ${activeColor.glow} 0%, transparent 70%)`
        }}
      />
    </div>
  );
}
