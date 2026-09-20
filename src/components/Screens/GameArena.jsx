import React, { useState, useEffect, useRef } from 'react';
import Bomb3D from '../Bomb3D.jsx';
import ChallengeCard from '../ChallengeCard.jsx';
import AnswerInput from '../AnswerInput.jsx';
import PowerUpBar from '../PowerUpBar.jsx';
import LevelCompleteModal from '../Modals/LevelCompleteModal.jsx';
import FailureModal from '../Modals/FailureModal.jsx';
import { challengeEngine } from '../../services/challengeEngine.js';
import { soundEngine } from '../../services/soundEngine.js';
import { particleEngine } from '../../services/particleEngine.js';
import { progressionManager } from '../../services/progressionManager.js';
import { ArrowLeft, Pause, Play, Flame, Shield, CheckCircle, Sparkles, Zap, AlertTriangle } from 'lucide-react';

export default function GameArena({
  level = 1,
  isDailyChallenge = false,
  onDailyComplete,
  onExitToLevels,
  onOpenShop,
  onNextLevel
}) {
  // Number of questions required:
  // Daily Challenge: exactly 3 (Easy -> Medium -> Hard)
  // Normal Levels: Easy (1-20): 3 questions, Medium (21-40): 2 questions, Hard (41-60): 1 question
  const targetQuestions = isDailyChallenge ? 3 : (level <= 20 ? 3 : level <= 40 ? 2 : 1);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(1);

  // Game session states
  const [challenge, setChallenge] = useState(null);
  const [timeLeft, setTimeLeft] = useState(15);
  const [maxTime, setMaxTime] = useState(15);
  const [isPaused, setIsPaused] = useState(false);
  const [isFrozen, setIsFrozen] = useState(false);
  const [shieldActive, setShieldActive] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [inputFeedback, setInputFeedback] = useState(null); // 'correct' | 'incorrect' | null
  const [failureReason, setFailureReason] = useState(null);
  const [isExploding, setIsExploding] = useState(false);
  const [isTransitioningPhase, setIsTransitioningPhase] = useState(false);

  // Chaos Event Modifier
  const [activeChaosEvent, setActiveChaosEvent] = useState(null); // null | 'DOUBLE_SCORE' | 'TIME_CRUNCH' | 'SPEED_BLAST' | 'NO_POWERUPS'

  // Score & Round Tracking
  const [streak, setStreak] = useState(0);
  const [levelScore, setLevelScore] = useState(0);
  const [levelInk, setLevelInk] = useState(0);
  const [hadFailuresInLevel, setHadFailuresInLevel] = useState(false);

  // Modals
  const [showCompleteModal, setShowCompleteModal] = useState(false);
  const [showFailureModal, setShowFailureModal] = useState(false);
  const [failedChallengeRecap, setFailedChallengeRecap] = useState(null);

  // Floating text feedback (e.g. +250 PTS, +25 INK)
  const [floatingAlert, setFloatingAlert] = useState(null);

  // Player inventory
  const [inventory, setInventory] = useState(progressionManager.getState().inventory);

  // Ref to track last countdown second beeped
  const lastBeepSec = useRef(null);

  useEffect(() => {
    const unsub = progressionManager.subscribe((state) => {
      setInventory(state.inventory);
    });
    return unsub;
  }, []);

  // Initialize fresh level run
  useEffect(() => {
    challengeEngine.resetLevelSession(level);
    setCurrentQuestionIndex(1);
    setLevelScore(0);
    setLevelInk(0);
    setHadFailuresInLevel(false);
    lastBeepSec.current = null;
    loadNextChallenge(false, 1);
  }, [level, isDailyChallenge]);

  // Load next challenge guaranteed not repeated
  const loadNextChallenge = (isRetry = false, qIndex = currentQuestionIndex) => {
    let targetLvl = level;
    if (isDailyChallenge) {
      // Stage 1: Easy (L5), Stage 2: Medium (L25), Stage 3: Hard (L45)
      targetLvl = qIndex === 1 ? 5 : qIndex === 2 ? 25 : 45;
    }

    const next = challengeEngine.getNextChallenge(targetLvl);
    setChallenge(next);

    // Occasional Chaos Event Trigger (25% chance on level >= 5 or in Daily mode)
    let chaos = null;
    if (Math.random() < 0.25 || (level % 5 === 0 && !isDailyChallenge)) {
      const events = ['DOUBLE_SCORE', 'TIME_CRUNCH', 'SPEED_BLAST', 'NO_POWERUPS'];
      chaos = events[Math.floor(Math.random() * events.length)];
      setActiveChaosEvent(chaos);
      soundEngine.playChaosAlert();
    } else {
      setActiveChaosEvent(null);
    }

    let allocatedTime = next.baseTime || 15;
    if (chaos === 'TIME_CRUNCH') {
      allocatedTime = Math.max(8, allocatedTime - 4);
    } else if (chaos === 'SPEED_BLAST') {
      allocatedTime = 10;
    }

    setTimeLeft(allocatedTime);
    setMaxTime(allocatedTime);
    lastBeepSec.current = null;
    setIsFrozen(false);
    setShowHint(false);
    setInputFeedback(null);
    setFailureReason(null);
    setIsExploding(false);
    setShowFailureModal(false);
    setShowCompleteModal(false);
    setIsTransitioningPhase(false);
  };

  // Timer Tick Engine with Escalating Audio & Tension Beeps
  useEffect(() => {
    if (isPaused || isFrozen || showCompleteModal || showFailureModal || !challenge || isExploding || isTransitioningPhase) {
      return;
    }

    let lastTime = performance.now();
    const interval = setInterval(() => {
      const now = performance.now();
      const delta = (now - lastTime) / 1000;
      lastTime = now;

      setTimeLeft((prev) => {
        const next = prev - delta;

        // Urgent Countdown Beeps at 3, 2, 1
        const wholeSec = Math.ceil(next);
        if (wholeSec <= 3 && wholeSec >= 1 && lastBeepSec.current !== wholeSec) {
          lastBeepSec.current = wholeSec;
          soundEngine.playWarningBeep(wholeSec);
          if (particleEngine) {
            particleEngine.triggerScreenShake('light');
          }
        }

        if (next <= 0) {
          clearInterval(interval);
          handleTimeout();
          return 0;
        }
        return next;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [isPaused, isFrozen, showCompleteModal, showFailureModal, challenge, isExploding, isTransitioningPhase]);

  // Answer Submission Handler
  const handleSubmitAnswer = (input) => {
    if (showCompleteModal || showFailureModal || !challenge || isExploding || isTransitioningPhase) return;

    const result = challengeEngine.validateAnswer(input, challenge);

    if (result.isValid) {
      handleCorrectAnswer();
    } else {
      handleIncorrectAnswer(result.reason);
    }
  };

  const handleCorrectAnswer = () => {
    soundEngine.playCorrect();
    setInputFeedback('correct');
    setFailureReason(null);

    const newStreak = streak + 1;
    soundEngine.playStreakCombo(newStreak);

    // Near-Miss Clutch Defusal Check
    const isNearMiss = timeLeft <= 1.0;
    const isClutch = timeLeft <= 0.5;
    let nearMissBonus = 0;
    if (isClutch) {
      nearMissBonus = 50;
      soundEngine.playClutchDefuse();
      setFloatingAlert(`🔥 ${timeLeft.toFixed(1)}s CLUTCH DEFUSE! (+50 Bonus)`);
    } else if (isNearMiss) {
      nearMissBonus = 25;
      soundEngine.playClutchDefuse();
      setFloatingAlert(`😱 THAT WAS CLOSE! (+25 Near Miss Bonus)`);
    }

    // Score Calculations
    const timeBonus = Math.round((timeLeft / maxTime) * 100);
    let streakMultiplier = 1 + streak * 0.2;
    // Chaos Overdrive milestone (streak >= 5)
    const isChaosOverdrive = newStreak >= 5;
    if (isChaosOverdrive) {
      streakMultiplier *= 2;
    }
    if (activeChaosEvent === 'DOUBLE_SCORE') {
      streakMultiplier *= 2;
    }

    let points = Math.round(((challenge.reward || 30) + timeBonus + nearMissBonus) * streakMultiplier);
    let ink = 15 + Math.floor(streak * 2);
    if (activeChaosEvent === 'SPEED_BLAST') {
      ink += 25;
    }

    const newScore = levelScore + points;
    const newInk = levelInk + ink;

    setStreak(newStreak);
    setLevelScore(newScore);
    setLevelInk(newInk);

    progressionManager.recordAnswer(true, newStreak, timeLeft / maxTime);
    progressionManager.addInk(ink);

    // Visual celebration sparks
    try {
      if (typeof window !== 'undefined' && particleEngine) {
        particleEngine.createSparkBurst(window.innerWidth / 2, window.innerHeight / 2 - 80, 45);
      }
    } catch (e) {
      console.warn(e);
    }

    // Check progression to next question in level or complete
    if (currentQuestionIndex < targetQuestions) {
      setIsTransitioningPhase(true);
      if (!isNearMiss && !isClutch) {
        setFloatingAlert(`✨ LOCK ${currentQuestionIndex} DEFUSED! +${points} PTS`);
      }
      setTimeout(() => setFloatingAlert(null), 1400);

      setTimeout(() => {
        const nextQ = currentQuestionIndex + 1;
        setCurrentQuestionIndex(nextQ);
        loadNextChallenge(false, nextQ);
      }, 750);
    } else {
      // Level or Daily Challenge completed!
      if (isDailyChallenge) {
        setFloatingAlert(`🏆 DAILY CHAOS DEFUSED! +${newScore} PTS`);
        progressionManager.completeDailyChallenge(null, newScore, 150);
        if (onDailyComplete) onDailyComplete(newScore);
        setTimeout(() => setShowCompleteModal(true), 900);
      } else {
        setFloatingAlert(`🏆 LEVEL ${level} CLEARED! +${newScore} PTS`);
        setTimeout(() => setFloatingAlert(null), 2000);

        const timeRatio = timeLeft / maxTime;
        let stars = 1;
        if (!hadFailuresInLevel) {
          stars = timeRatio >= 0.3 ? 3 : 2;
        }

        progressionManager.completeLevel(level, newScore, stars);
        setTimeout(() => setShowCompleteModal(true), 900);
      }
    }
  };

  const handleIncorrectAnswer = (reason) => {
    soundEngine.playWrong();
    setInputFeedback('incorrect');
    setFailureReason(reason || 'Incorrect answer');

    // Time penalty: subtract 2 seconds on wrong answer
    setTimeLeft((prev) => Math.max(0.1, prev - 2));

    setTimeout(() => {
      setInputFeedback(null);
    }, 1500);
  };

  const handleTimeout = () => {
    if (shieldActive) {
      setShieldActive(false);
      soundEngine.playShieldAbsorb();
      setTimeLeft(maxTime * 0.5);
      setFloatingAlert('🛡️ BLAST SHIELD ABSORBED EXPLOSION!');
      setTimeout(() => setFloatingAlert(null), 2000);
      return;
    }

    setIsExploding(true);
    soundEngine.playExplosion();
    try {
      if (typeof window !== 'undefined' && particleEngine) {
        particleEngine.createExplosion(window.innerWidth / 2, window.innerHeight / 2 - 40, 95);
        particleEngine.triggerScreenShake('heavy');
      }
    } catch (e) {
      console.warn(e);
    }

    setHadFailuresInLevel(true);
    setStreak(0);
    progressionManager.recordAnswer(false, 0, 0);
    progressionManager.recordFailure();

    if (challenge) {
      challengeEngine.markChallengeFailed(level, challenge.id);
    }
    setFailedChallengeRecap(challenge);

    setTimeout(() => {
      setShowFailureModal(true);
      setIsExploding(false);
    }, 1200);
  };

  // Power-up Usage Handler
  const handleUsePowerUp = (id) => {
    if (isPaused || showCompleteModal || showFailureModal || isExploding || isTransitioningPhase) return;

    if (activeChaosEvent === 'NO_POWERUPS') {
      soundEngine.playWrong();
      setFloatingAlert('🚫 CHAOS EVENT: POWER-UPS DISABLED!');
      setTimeout(() => setFloatingAlert(null), 1500);
      return;
    }

    if (!progressionManager.consumePowerUp(id)) return;

    if (id === 'freeze') {
      setIsFrozen(true);
      setFloatingAlert('❄️ TIME FROZEN (3s)!');
      setTimeout(() => {
        setIsFrozen(false);
        setFloatingAlert(null);
      }, 3000);
    } else if (id === 'rewind') {
      setTimeLeft((prev) => Math.min(maxTime, prev + 3));
      setFloatingAlert('⏳ +3 SECONDS RESTORED!');
      setTimeout(() => setFloatingAlert(null), 1500);
    } else if (id === 'lens') {
      setShowHint(true);
      setFloatingAlert('👁️ TRUTH LENS ACTIVE!');
      setTimeout(() => setFloatingAlert(null), 1500);
    } else if (id === 'shield') {
      setShieldActive(true);
      setFloatingAlert('🛡️ BLAST SHIELD EQUIPPED!');
      setTimeout(() => setFloatingAlert(null), 1500);
    } else if (id === 'potato') {
      setFloatingAlert('🔥 HOT POTATO: BOMB SWAPPED!');
      loadNextChallenge(false);
      setTimeout(() => setFloatingAlert(null), 1500);
    }
  };

  const handleRetry = () => {
    soundEngine.playClick();
    setCurrentQuestionIndex(1);
    setLevelScore(0);
    setLevelInk(0);
    loadNextChallenge(true, 1);
  };

  const handleNextLevel = () => {
    soundEngine.playClick();
    if (isDailyChallenge) {
      if (onExitToLevels) onExitToLevels(level);
      return;
    }
    if (level < 60) {
      const nextLvl = level + 1;
      challengeEngine.resetLevelSession(nextLvl);
      if (onNextLevel) {
        onNextLevel(nextLvl);
      } else if (onExitToLevels) {
        onExitToLevels(nextLvl);
      }
    } else {
      if (onExitToLevels) onExitToLevels(level);
    }
  };

  const handleExit = () => {
    soundEngine.playClick();
    challengeEngine.resetLevelSession(level);
    if (onExitToLevels) onExitToLevels(level);
  };

  const difficulty = challenge ? challenge.difficulty : (level <= 20 ? 'easy' : level <= 40 ? 'medium' : 'hard');

  // Bomb Tension Level
  const getTensionState = () => {
    if (timeLeft <= 1.0) return { icon: '💣🔥🔥🔥', text: 'EXPLOSION IMMINENT!', color: '#ef4444' };
    if (timeLeft <= 3.0) return { icon: '💣🔥🔥', text: 'CRITICAL DANGER', color: '#f97316' };
    if (timeLeft <= 5.0) return { icon: '💣🔥', text: 'FUSE BURNING', color: '#f59e0b' };
    return { icon: '💣', text: 'STABLE CORE', color: '#00f59b' };
  };

  const tension = getTensionState();

  return (
    <div className={`game-arena arena-${difficulty}`}>
      {/* Top HUD */}
      <header className="arena-hud">
        <button
          className="hud-back-btn"
          onClick={handleExit}
          title="Exit to Mission Map"
        >
          <ArrowLeft size={16} />
          <span>MAP</span>
        </button>

        {/* Center: Stage Progress Tracker */}
        <div className="hud-question-tracker">
          <div className="tracker-label">
            {isDailyChallenge ? '🔥 DAILY CHAOS' : `LEVEL ${level} • ${difficulty.toUpperCase()}`}
          </div>
          <div className="tracker-dots">
            {Array.from({ length: targetQuestions }).map((_, qIdx) => {
              const qNum = qIdx + 1;
              const isCleared = qNum < currentQuestionIndex;
              const isCurrent = qNum === currentQuestionIndex;
              return (
                <div
                  key={qIdx}
                  className={`tracker-pill ${isCleared ? 'cleared' : isCurrent ? 'current' : 'pending'}`}
                >
                  {isCleared ? (
                    <>
                      <CheckCircle size={12} />
                      <span>{isDailyChallenge ? `STAGE ${qNum} DEFUSED` : `LOCK ${qNum} DEFUSED`}</span>
                    </>
                  ) : isCurrent ? (
                    <>
                      <span className="hud-dot-pulse" />
                      <span>{isDailyChallenge ? `STAGE ${qNum} (ACTIVE)` : `LOCK ${qNum} (ACTIVE)`}</span>
                    </>
                  ) : (
                    <span>{isDailyChallenge ? `STAGE ${qNum}` : `LOCK ${qNum}`}</span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right HUD Stats */}
        <div className="hud-stats-group">
          {/* Streak Indicator with Chaos Overdrive badge */}
          <div className={`hud-pill streak ${streak >= 5 ? 'chaos-overdrive' : ''}`} title="Current Streak Multiplier">
            <Flame size={14} color={streak >= 5 ? '#ec4899' : '#f97316'} />
            <span>x{streak} {streak >= 5 ? '⚡2X' : ''}</span>
          </div>
          <div className="hud-pill score" title="Score Earned">
            <span>🏆 {levelScore}</span>
          </div>
          <div className="hud-pill ink" title="Ink Tokens">
            <span>🪙 {levelInk}</span>
          </div>
          <button
            className="hud-action-btn"
            onClick={() => { soundEngine.playClick(); setIsPaused(!isPaused); }}
            title={isPaused ? 'Resume Game' : 'Pause Game'}
          >
            {isPaused ? <Play size={16} /> : <Pause size={16} />}
          </button>
        </div>
      </header>

      {/* Chaos Event Active Alert Banner */}
      {activeChaosEvent && (
        <div style={{
          background: 'linear-gradient(90deg, rgba(236, 72, 153, 0.25), rgba(239, 68, 68, 0.25))',
          border: '1px solid #ec4899',
          borderRadius: '8px',
          padding: '4px 12px',
          margin: '0.4rem auto',
          maxWidth: '500px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.5rem',
          color: '#ffffff',
          fontWeight: 800,
          fontSize: '0.8rem',
          letterSpacing: '0.04em',
          animation: 'pulse 1.5s infinite'
        }}>
          <AlertTriangle size={15} color="#ec4899" />
          <span>
            ⚠️ CHAOS EVENT:{' '}
            {activeChaosEvent === 'DOUBLE_SCORE' && 'DOUBLE SCORE (POINTS × 2)'}
            {activeChaosEvent === 'TIME_CRUNCH' && 'TIME CRUNCH (-4s CLOCK)'}
            {activeChaosEvent === 'SPEED_BLAST' && 'SPEED BLAST (+25 EXTRA INK)'}
            {activeChaosEvent === 'NO_POWERUPS' && 'PURIST MODE (POWER-UPS DISABLED)'}
          </span>
        </div>
      )}

      {/* Floating Alert Popups */}
      {floatingAlert && (
        <div className="arena-floating-alert">
          <Sparkles size={16} />
          <span>{floatingAlert}</span>
        </div>
      )}

      {/* Tension Meter Pill */}
      <div style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.4rem',
        padding: '3px 12px',
        borderRadius: '999px',
        background: 'rgba(0, 0, 0, 0.4)',
        border: `1px solid ${tension.color}`,
        color: tension.color,
        fontWeight: 800,
        fontSize: '0.75rem',
        margin: '0.2rem auto'
      }}>
        <span>{tension.icon}</span>
        <span>{tension.text} ({timeLeft.toFixed(1)}s)</span>
      </div>

      {/* Main Interactive Stage */}
      <main className="arena-stage">
        {/* 3D Central Bomb */}
        <Bomb3D
          timeLeft={timeLeft}
          maxTime={maxTime}
          isFrozen={isFrozen}
          difficulty={difficulty}
          isExploding={isExploding}
        />

        {/* Challenge Prompt Card */}
        <ChallengeCard
          challenge={challenge}
          showHint={showHint}
          currentQuestionIndex={currentQuestionIndex}
          targetQuestions={targetQuestions}
          isTransitioningPhase={isTransitioningPhase}
        />

        {/* Answer Input Bar */}
        <AnswerInput
          onSubmit={handleSubmitAnswer}
          disabled={isPaused || showCompleteModal || showFailureModal || isExploding || isTransitioningPhase}
          statusFeedback={inputFeedback}
          failureReason={failureReason}
        />

        {/* Power-Up Action Bar */}
        <PowerUpBar
          inventory={inventory}
          onUsePowerUp={handleUsePowerUp}
          disabled={isPaused || showCompleteModal || showFailureModal || isExploding || isTransitioningPhase}
          shieldActive={shieldActive}
        />
      </main>

      {/* Modals */}
      <LevelCompleteModal
        isOpen={showCompleteModal}
        level={isDailyChallenge ? 'DAILY' : level}
        scoreEarned={levelScore}
        inkEarned={levelInk}
        streak={streak}
        stars={hadFailuresInLevel ? 1 : 3}
        isPerfect={!hadFailuresInLevel}
        onNextLevel={handleNextLevel}
        onReplay={() => {
          setCurrentQuestionIndex(1);
          setLevelScore(0);
          setLevelInk(0);
          setStreak(0);
          setHadFailuresInLevel(false);
          loadNextChallenge(false, 1);
        }}
        onLevelSelect={handleExit}
      />

      <FailureModal
        isOpen={showFailureModal}
        level={level}
        failedChallenge={failedChallengeRecap}
        runStats={{
          score: levelScore,
          questionsCompleted: currentQuestionIndex - 1,
          bestStreak: streak,
          inkEarned: levelInk
        }}
        onRetry={handleRetry}
        onLevelSelect={handleExit}
      />
    </div>
  );
}
