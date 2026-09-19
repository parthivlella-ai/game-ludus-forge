import React, { useEffect, useRef } from 'react';
import { soundEngine } from '../services/soundEngine';

export default function BombTimer({ timeLeft, maxTime, isFrozen }) {
  const radius = 80;
  const circumference = 2 * Math.PI * radius;
  const ratio = Math.max(0, Math.min(1, timeLeft / maxTime));
  const strokeDashoffset = circumference - ratio * circumference;

  const lastSecondRef = useRef(Math.ceil(timeLeft));

  // Determine state
  const isCritical = ratio < 0.25;
  const isWarning = ratio >= 0.25 && ratio < 0.5;
  const isFinalSecond = timeLeft <= 1.2 && timeLeft > 0;

  // Sound triggers
  useEffect(() => {
    const currentSec = Math.ceil(timeLeft);
    if (currentSec !== lastSecondRef.current && timeLeft > 0 && !isFrozen) {
      lastSecondRef.current = currentSec;
      if (isCritical) {
        soundEngine.playCriticalTick();
      } else {
        soundEngine.playTick();
      }
    }
  }, [timeLeft, isCritical, isFrozen]);

  const timerClass = isFrozen
    ? 'timer-frozen'
    : isCritical
    ? 'timer-critical'
    : isWarning
    ? 'timer-warning'
    : 'timer-normal';

  return (
    <div className={`bomb-stage ${timerClass}`}>
      <svg className="radial-svg" viewBox="0 0 190 190">
        <circle
          className="radial-bg"
          cx="95"
          cy="95"
          r={radius}
        />
        <circle
          className="radial-progress"
          cx="95"
          cy="95"
          r={radius}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
        />
      </svg>

      <div className="bomb-center">
        <span className="bomb-icon">💣</span>
        <span className="bomb-timer-text">
          {timeLeft.toFixed(1)}s
        </span>
      </div>
    </div>
  );
}
