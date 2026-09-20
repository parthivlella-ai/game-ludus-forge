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
import { ArrowLeft, Pause, Play, Flame, Shield, CheckCircle, Sparkles } from 'lucide-react';

export default function GameArena({
  level,
  onExitToLevels,
  onOpenShop,
  onNextLevel
}) {
  // Number of questions required for this level:
  // Easy (1-20): 3 questions
  // Medium (21-40): 2 questions
  // Hard (41-60): 1 question
  const targetQuestions = level <= 20 ? 3 : level <= 40 ? 2 : 1;
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
    loadNextChallenge(false);
  }, [level]);

  // Load next challenge guaranteed not repeated
  const loadNextChallenge = (isRetry = false) => {
    const next = challengeEngine.getNextChallenge(level);
    setChallenge(next);
    setTimeLeft(next.baseTime || 15);
    setMaxTime(next.baseTime || 15);
    setIsFrozen(false);
    setShowHint(false);
    setInputFeedback(null);
    setFailureReason(null);
    setIsExploding(false);
    setShowFailureModal(false);
    setShowCompleteModal(false);
    setIsTransitioningPhase(false);
  };

  // Timer Tick Engine (High precision delta time)
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

    const timeBonus = Math.round((timeLeft / maxTime) * 100);
    const streakMultiplier = 1 + streak * 0.2;
    const points = Math.round(((challenge.reward || 30) + timeBonus) * streakMultiplier);
    const ink = 15 + Math.floor(streak * 2);

    const newStreak = streak + 1;
    const newScore = levelScore + points;
    const newInk = levelInk + ink;

    setStreak(newStreak);
    setLevelScore(newScore);
    setLevelInk(newInk);

    progressionManager.recordAnswer(true, newStreak, timeLeft / maxTime);
    progressionManager.addInk(ink);

    // Visual celebration sparks safely
    try {
      if (typeof window !== 'undefined' && particleEngine) {
        particleEngine.createSparkBurst(window.innerWidth / 2, window.innerHeight / 2 - 80, 40);
      }
    } catch (e) {
      console.warn(e);
    }

    // Check if more questions remain for this level
    if (currentQuestionIndex < targetQuestions) {
      // Step to next question in level!
      setIsTransitioningPhase(true);
      setFloatingAlert(`✨ LOCK ${currentQuestionIndex} DISARMED! +${points} PTS`);
      setTimeout(() => setFloatingAlert(null), 1400);

      setTimeout(() => {
        setCurrentQuestionIndex((prev) => prev + 1);
        loadNextChallenge(false);
      }, 750);
    } else {
      // All questions cleared for this level!
      setFloatingAlert(`🏆 LEVEL ${level} CLEARED! +${newScore} PTS`);
      setTimeout(() => setFloatingAlert(null), 2000);

      const timeRatio = timeLeft / maxTime;
      let stars = 1;
      if (!hadFailuresInLevel) {
        stars = timeRatio >= 0.3 ? 3 : 2;
      }

      progressionManager.completeLevel(level, newScore, stars);

      setTimeout(() => {
        setShowCompleteModal(true);
      }, 900);
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
    // Check if player has an active shield
    if (shieldActive) {
      setShieldActive(false);
      soundEngine.playShieldAbsorb();
      setTimeLeft(maxTime * 0.5); // restore half time
      setFloatingAlert('🛡️ SHIELD ABSORBED BLAST!');
      setTimeout(() => setFloatingAlert(null), 2000);
      return;
    }

    // Explosion sequence!
    setIsExploding(true);
    soundEngine.playExplosion();
    try {
      if (typeof window !== 'undefined' && particleEngine) {
        particleEngine.createExplosion(window.innerWidth / 2, window.innerHeight / 2 - 40, 90);
        particleEngine.triggerScreenShake('heavy');
      }
    } catch (e) {
      console.warn(e);
    }

    setHadFailuresInLevel(true);
    setStreak(0);
    progressionManager.recordAnswer(false, 0, 0);
    progressionManager.recordFailure();

    // Mark challenge as failed in engine so it is NEVER repeated on retry
    challengeEngine.markChallengeFailed(level, challenge.id);
    setFailedChallengeRecap(challenge);

    setTimeout(() => {
      setShowFailureModal(true);
      setIsExploding(false);
    }, 1200);
  };

  // Power-up Usage Handler
  const handleUsePowerUp = (id) => {
    if (isPaused || showCompleteModal || showFailureModal) return;

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
      setFloatingAlert('🛡️ SHIELD EQUIPPED!');
      setTimeout(() => setFloatingAlert(null), 1500);
    } else if (id === 'potato') {
      // Pass/Swap danger: re-rolls challenge immediately without penalty
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
    loadNextChallenge(true); // Loads guaranteed DIFFERENT challenge!
  };

  const handleNextLevel = () => {
    soundEngine.playClick();
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
    if (onExitToLevels) {
      onExitToLevels(level);
    }
  };

  const difficulty = challenge ? challenge.difficulty : (level <= 20 ? 'easy' : level <= 40 ? 'medium' : 'hard');

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

        {/* Center: Question Progress Tracker */}
        <div className="hud-question-tracker">
          <div className="tracker-label">
            LEVEL {level} • {difficulty.toUpperCase()} ({targetQuestions} {targetQuestions === 1 ? 'QUESTION' : 'QUESTIONS'})
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
                      <span>LOCK {qNum} DEFUSED</span>
                    </>
                  ) : isCurrent ? (
                    <>
                      <span className="hud-dot-pulse" />
                      <span>LOCK {qNum} (ACTIVE)</span>
                    </>
                  ) : (
                    <span>LOCK {qNum}</span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right HUD Stats */}
        <div className="hud-stats-group">
          <div className="hud-pill streak" title="Current Streak">
            <Flame size={14} />
            <span>x{streak}</span>
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

      {/* Floating Alert Popups */}
      {floatingAlert && (
        <div className="arena-floating-alert">
          <Sparkles size={16} />
          <span>{floatingAlert}</span>
        </div>
      )}

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
        level={level}
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
          loadNextChallenge(false);
        }}
        onLevelSelect={handleExit}
      />

      <FailureModal
        isOpen={showFailureModal}
        level={level}
        failedChallenge={failedChallengeRecap}
        onRetry={handleRetry}
        onLevelSelect={handleExit}
      />
    </div>
  );
}
