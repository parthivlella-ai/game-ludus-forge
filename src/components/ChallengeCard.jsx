import React from 'react';
import { Eye, BookOpen, Brain, HelpCircle, Check, Lock, ShieldAlert, Sparkles, Loader2 } from 'lucide-react';

export default function ChallengeCard({
  challenge,
  showHint,
  currentQuestionIndex = 1,
  targetQuestions = 1,
  isTransitioningPhase = false
}) {
  if (!challenge) return null;

  const difficultyMeta = {
    easy: { name: 'EASY: WORD BLAST', color: '#10b981', glow: 'rgba(16, 185, 129, 0.4)', icon: <BookOpen size={14} /> },
    medium: { name: 'MEDIUM: PUZZLE BLAST', color: '#f59e0b', glow: 'rgba(245, 158, 11, 0.4)', icon: <Brain size={14} /> },
    hard: { name: 'HARD: RIDDLE / TRICK', color: '#ef4444', glow: 'rgba(239, 68, 68, 0.4)', icon: <HelpCircle size={14} /> }
  };

  const diffInfo = difficultyMeta[challenge.difficulty] || difficultyMeta.easy;

  return (
    <div className={`challenge-card glass-panel theme-${challenge.difficulty} ${isTransitioningPhase ? 'phase-switching' : ''}`}>
      {/* Top Defusal Lock Sequence Tracker */}
      <div className="defuse-phase-bar">
        <div className="phase-bar-header">
          <div className="phase-counter-badge">
            <span className="pulse-dot" style={{ background: diffInfo.color }} />
            <span>
              {targetQuestions > 1
                ? `LOCK ${currentQuestionIndex} OF ${targetQuestions}`
                : 'CRITICAL CORE LOCK'}
            </span>
          </div>
          <div className="phase-objective-text">
            {targetQuestions === 3 && (
              <span>DEFUSE 3 WORDS TO SECURE LEVEL {challenge.level}</span>
            )}
            {targetQuestions === 2 && (
              <span>SOLVE 2 PUZZLES TO SECURE LEVEL {challenge.level}</span>
            )}
            {targetQuestions === 1 && (
              <span>SOLVE 1 LETHAL RIDDLE TO SECURE LEVEL {challenge.level}</span>
            )}
          </div>
        </div>

        {/* Visual Multi-Step Lock Pills */}
        <div className="phase-step-pills">
          {Array.from({ length: targetQuestions }).map((_, idx) => {
            const stepNum = idx + 1;
            const isCleared = stepNum < currentQuestionIndex;
            const isCurrent = stepNum === currentQuestionIndex;
            return (
              <div
                key={idx}
                className={`step-pill ${isCleared ? 'cleared' : isCurrent ? 'current' : 'pending'}`}
                style={{
                  '--theme-color': diffInfo.color
                }}
              >
                {isCleared ? (
                  <>
                    <Check size={13} className="step-icon cleared-icon" />
                    <span>LOCK {stepNum} DISARMED</span>
                  </>
                ) : isCurrent ? (
                  <>
                    <span className="step-current-ping" style={{ background: diffInfo.color }} />
                    <span>LOCK {stepNum} (ACTIVE)</span>
                  </>
                ) : (
                  <>
                    <Lock size={12} className="step-icon" />
                    <span>LOCK {stepNum}</span>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Card Header: Category & Level */}
      <div className="challenge-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
          <span
            className="difficulty-badge"
            style={{
              borderColor: diffInfo.color,
              color: diffInfo.color,
              background: 'rgba(255, 255, 255, 0.05)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.35rem',
              padding: '0.3rem 0.7rem',
              borderRadius: '999px',
              fontSize: '0.78rem',
              fontWeight: 800,
              boxShadow: `0 0 12px ${diffInfo.glow}`
            }}
          >
            {diffInfo.icon}
            <span>{diffInfo.name}</span>
          </span>
          <span className="category-tag">{challenge.category || 'WORD CHALLENGE'}</span>
        </div>

        <span className="level-tag">LEVEL {challenge.level}</span>
      </div>

      {/* Main Challenge Prompt */}
      <div className="challenge-body">
        {isTransitioningPhase ? (
          <div className="phase-transition-overlay">
            <Loader2 size={32} className="spinning-loader" color={diffInfo.color} />
            <div className="transition-text">
              <strong>LOCK {currentQuestionIndex - 1} DISARMED!</strong>
              <span>INITIALIZING LOCK {currentQuestionIndex} OF {targetQuestions}...</span>
            </div>
          </div>
        ) : (
          <>
            <h2 className="challenge-prompt" style={{ whiteSpace: 'pre-line', lineHeight: 1.35 }}>
              {challenge.prompt}
            </h2>

            {challenge.subPrompt && (
              <p className="challenge-subprompt">{challenge.subPrompt}</p>
            )}
          </>
        )}
      </div>

      {/* Truth Lens Hint banner */}
      {showHint && challenge.hint && !isTransitioningPhase && (
        <div className="challenge-hint-banner">
          <Eye size={16} />
          <span>HINT REVEAL: {challenge.hint}</span>
        </div>
      )}
    </div>
  );
}
