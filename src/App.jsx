import React, { useState, useEffect, useRef } from 'react';
import AuthScreen from './components/Auth/AuthScreen.jsx';
import HomeScreen from './components/Screens/HomeScreen.jsx';
import LevelSelectScreen from './components/Screens/LevelSelectScreen.jsx';
import GameArena from './components/Screens/GameArena.jsx';
import ProfileModal from './components/Modals/ProfileModal.jsx';
import ShopModal from './components/Modals/ShopModal.jsx';
import AchievementsModal from './components/Modals/AchievementsModal.jsx';
import SettingsModal from './components/Modals/SettingsModal.jsx';
import HowToPlayModal from './components/Modals/HowToPlayModal.jsx';
import LeaderboardModal from './components/Modals/LeaderboardModal.jsx';
import DailyChallengeModal from './components/Modals/DailyChallengeModal.jsx';
import { authService } from './services/authService.js';
import { progressionManager } from './services/progressionManager.js';
import { particleEngine } from './services/particleEngine.js';
import { soundEngine } from './services/soundEngine.js';
import { User, LogOut } from 'lucide-react';
import './styles/index.css';
import './styles/game.css';
import './styles/auth.css';

export default function App() {
  // Current logged in user
  const [currentUser, setCurrentUser] = useState(authService.getCurrentUser());

  const getZoneForLevel = (lvl) => (lvl <= 20 ? 'easy' : lvl <= 40 ? 'medium' : 'hard');

  // Screen router: 'AUTH' | 'HOME' | 'LEVEL_SELECT' | 'GAME_ARENA'
  const [screen, setScreen] = useState('AUTH');
  const [selectedLevel, setSelectedLevel] = useState(1);
  const [targetZone, setTargetZone] = useState(() => getZoneForLevel(1));
  const [isDailyActive, setIsDailyActive] = useState(false);

  // Player progression state
  const [playerState, setPlayerState] = useState(progressionManager.getState());

  // Modals
  const [showProfile, setShowProfile] = useState(false);
  const [showShop, setShowShop] = useState(false);
  const [showAchievements, setShowAchievements] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showHowToPlay, setShowHowToPlay] = useState(false);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [showDailyModal, setShowDailyModal] = useState(false);

  // Canvas ref for particle visual engine
  const canvasRef = useRef(null);

  useEffect(() => {
    if (canvasRef.current) {
      particleEngine.init(canvasRef.current);
    }

    const unsubAuth = authService.subscribe((user) => {
      setCurrentUser(user);
      if (!user) {
        setScreen('AUTH');
      } else {
        setScreen((prev) => (prev === 'AUTH' ? 'HOME' : prev));
      }
    });

    const unsubProgression = progressionManager.subscribe((newState) => {
      setPlayerState({ ...newState });
    });

    return () => {
      unsubAuth();
      unsubProgression();
    };
  }, []);

  const handleAuthenticated = (user) => {
    setCurrentUser(user);
    setScreen('HOME');
  };

  const handleLogout = () => {
    authService.logout();
    setShowProfile(false);
    setScreen('AUTH');
  };

  const handleStartLevel = (lvl) => {
    setSelectedLevel(lvl);
    setIsDailyActive(false);
    setTargetZone(getZoneForLevel(lvl));
    setScreen('GAME_ARENA');
  };

  const handleNextLevel = (nextLvl) => {
    setSelectedLevel(nextLvl);
    setIsDailyActive(false);
    setTargetZone(getZoneForLevel(nextLvl));
    setScreen('GAME_ARENA');
  };

  const handleExitToLevels = (lvl) => {
    const activeLvl = lvl || selectedLevel;
    setIsDailyActive(false);
    setTargetZone(getZoneForLevel(activeLvl));
    setScreen('LEVEL_SELECT');
  };

  const handleStartDailyChallenge = () => {
    setShowDailyModal(false);
    setIsDailyActive(true);
    setScreen('GAME_ARENA');
  };

  // If user not authenticated, display the Auth / Welcome screen
  if (!currentUser || screen === 'AUTH') {
    return (
      <div className="app-container">
        <canvas id="fx-canvas" ref={canvasRef} />
        <AuthScreen onAuthenticated={handleAuthenticated} />
      </div>
    );
  }

  return (
    <div className="app-container">
      {/* Visual FX Canvas for explosions, sparks, shockwaves */}
      <canvas id="fx-canvas" ref={canvasRef} />

      {/* Top Navigation HUD */}
      <header className="top-nav">
        <div
          className="brand-badge"
          onClick={() => { soundEngine.playClick(); setIsDailyActive(false); setScreen('HOME'); }}
        >
          <span>💣 WORDBLAST</span>
        </div>

        <div className="user-stats-bar">
          <div className="stat-pill tokens">
            <span>🪙 {playerState.inkTokens}</span>
          </div>
          <div className="stat-pill score">
            <span>🏆 {playerState.totalScore.toLocaleString()}</span>
          </div>
          <div className="stat-pill">
            <span>LVL {playerState.unlockedLevel}</span>
          </div>

          {/* User Profile Avatar Pill */}
          <button
            className="user-profile-btn"
            onClick={() => { soundEngine.playClick(); setShowProfile(true); }}
            title="Open Profile Dossier"
          >
            <User size={16} />
            <span>{currentUser.displayName || currentUser.username}</span>
          </button>
        </div>
      </header>

      {/* Main Screen Router */}
      <main className="main-viewport">
        {screen === 'HOME' && (
          <HomeScreen
            playerState={playerState}
            onPlay={() => setScreen('LEVEL_SELECT')}
            onQuickPlay={handleStartLevel}
            onOpenHowToPlay={() => setShowHowToPlay(true)}
            onOpenRewards={() => setShowAchievements(true)}
            onOpenShop={() => setShowShop(true)}
            onOpenSettings={() => setShowSettings(true)}
            onOpenProfile={() => setShowProfile(true)}
            onOpenLeaderboard={() => setShowLeaderboard(true)}
            onOpenDailyChallenge={() => setShowDailyModal(true)}
            isDailyCompleted={progressionManager.isDailyCompleted()}
          />
        )}

        {screen === 'LEVEL_SELECT' && (
          <LevelSelectScreen
            unlockedLevel={playerState.unlockedLevel}
            completedLevels={playerState.completedLevels}
            initialZone={targetZone}
            currentLevel={selectedLevel}
            onSelectLevel={handleStartLevel}
            onBack={() => setScreen('HOME')}
          />
        )}

        {screen === 'GAME_ARENA' && (
          <GameArena
            level={selectedLevel}
            isDailyChallenge={isDailyActive}
            onDailyComplete={(score) => {
              setShowDailyModal(true);
            }}
            onExitToLevels={handleExitToLevels}
            onNextLevel={handleNextLevel}
            onOpenShop={() => setShowShop(true)}
          />
        )}
      </main>

      {/* Modals */}
      <ProfileModal
        isOpen={showProfile}
        onClose={() => setShowProfile(false)}
        onLogout={handleLogout}
      />

      <ShopModal
        isOpen={showShop}
        onClose={() => setShowShop(false)}
        inkTokens={playerState.inkTokens}
        inventory={playerState.inventory}
        onBuyPowerUp={(id, cost) => progressionManager.buyPowerUp(id, cost)}
      />

      <AchievementsModal
        isOpen={showAchievements}
        onClose={() => setShowAchievements(false)}
        achievements={playerState.achievements}
      />

      <SettingsModal
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
        onResetProgress={() => progressionManager.resetAllProgress()}
      />

      <HowToPlayModal
        isOpen={showHowToPlay}
        onClose={() => setShowHowToPlay(false)}
      />

      <LeaderboardModal
        isOpen={showLeaderboard}
        onClose={() => setShowLeaderboard(false)}
        currentUsername={currentUser?.username}
      />

      <DailyChallengeModal
        isOpen={showDailyModal}
        onClose={() => setShowDailyModal(false)}
        isCompleted={progressionManager.isDailyCompleted()}
        dailyInfo={progressionManager.getDailyInfo()}
        onStartDaily={handleStartDailyChallenge}
      />
    </div>
  );
}
