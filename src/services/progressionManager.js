// Progression, Storage, Economy, and Achievements Manager
// Synchronized with dedicated backend database per user account
import { authService } from './authService.js';

const API_BASE = (typeof window !== 'undefined' && window.location.port === '5173')
  ? 'http://localhost:5000/api'
  : '/api';

const INITIAL_ACHIEVEMENTS = [
  { id: 'first_boom', name: 'First Explosion', desc: 'Survive your first challenge or explosion', icon: '💣', unlocked: false },
  { id: 'speed_demon', name: 'Speed Demon', desc: 'Answer with more than 70% time remaining', icon: '⚡', unlocked: false },
  { id: 'streak_fire', name: 'On Fire', desc: 'Achieve a 5-answer winning streak', icon: '🔥', unlocked: false },
  { id: 'brain_burner', name: 'Brain Burner', desc: 'Complete a Hard level challenge', icon: '🧠', unlocked: false },
  { id: 'ink_collector', name: 'Ink Collector', desc: 'Accumulate 1,000 total Ink Tokens', icon: '🪙', unlocked: false },
  { id: 'puzzle_master', name: 'Puzzle Master', desc: 'Complete 20 total levels', icon: '🧩', unlocked: false },
  { id: 'shopaholic', name: 'Gadget Freak', desc: 'Purchase any power-up from the shop', icon: '🛍️', unlocked: false },
  { id: 'time_bender', name: 'Time Bender', desc: 'Use Freeze Frame or Time Rewind power-up', icon: '⏳', unlocked: false },
  { id: 'chaos_survivor', name: 'Chaos Survivor', desc: 'Complete all 60 progression levels', icon: '🏆', unlocked: false },
  { id: 'word_wizard', name: 'Word Wizard', desc: 'Complete all 20 Easy Word Blast levels', icon: '📖', unlocked: false },
  { id: 'logic_legend', name: 'Logic Legend', desc: 'Complete all 20 Medium Puzzle Blast levels', icon: '🔬', unlocked: false },
  { id: 'riddle_king', name: 'Riddle Master', desc: 'Complete all 20 Hard Riddle levels', icon: '👑', unlocked: false }
];

const DEFAULT_STATE = {
  unlockedLevel: 1,
  completedLevels: {}, // { [levelNum]: { stars: 3, bestScore: 1200 } }
  totalScore: 0,
  bestScore: 0,
  inkTokens: 50, // Fair starter ink
  inventory: {
    freeze: 0,
    rewind: 0,
    shield: 0,
    lens: 0,
    potato: 0,
    smoke: 0
  },
  achievements: INITIAL_ACHIEVEMENTS,
  stats: {
    totalAnswered: 0,
    totalCorrect: 0,
    totalExplosions: 0,
    highestStreak: 0,
    powerupsUsed: 0,
    totalWins: 0,
    totalAttempts: 0
  },
  seenQuestionIds: []
};

class ProgressionManager {
  constructor() {
    this.currentUsername = this.getActiveUsername();
    this.state = this.loadLocalForUser(this.currentUsername);
    this.listeners = new Set();
    this.syncTimeout = null;

    // Listen to user authentication changes
    authService.subscribe((user) => {
      const newUsername = user ? user.username : null;
      if (newUsername !== this.currentUsername) {
        this.currentUsername = newUsername;
        if (newUsername) {
          this.fetchFromBackend(newUsername);
        } else {
          this.state = JSON.parse(JSON.stringify(DEFAULT_STATE));
          this.notify();
        }
      }
    });

    if (this.currentUsername) {
      this.fetchFromBackend(this.currentUsername);
    }
  }

  getActiveUsername() {
    const user = authService.getCurrentUser();
    return user ? user.username : null;
  }

  getStorageKey(username) {
    const userKey = username ? username.toLowerCase() : 'guest';
    return `wordblast_progression_user_${userKey}`;
  }

  loadLocalForUser(username) {
    try {
      const key = this.getStorageKey(username);
      const data = localStorage.getItem(key);
      if (data) {
        const parsed = JSON.parse(data);
        return {
          ...DEFAULT_STATE,
          ...parsed,
          inventory: { ...DEFAULT_STATE.inventory, ...(parsed.inventory || {}) },
          stats: { ...DEFAULT_STATE.stats, ...(parsed.stats || {}) },
          seenQuestionIds: Array.isArray(parsed.seenQuestionIds) ? parsed.seenQuestionIds : [],
          achievements: INITIAL_ACHIEVEMENTS.map(ach => {
            const existing = (parsed.achievements || []).find(a => a.id === ach.id);
            return existing ? { ...ach, unlocked: existing.unlocked } : ach;
          })
        };
      }
    } catch (e) {
      console.warn('Local load failed, using default state', e);
    }
    return JSON.parse(JSON.stringify(DEFAULT_STATE));
  }

  async fetchFromBackend(username) {
    if (!username) return;
    try {
      const res = await fetch(`${API_BASE}/gameplay/${username}`);
      if (res.ok) {
        const json = await res.json();
        if (json.success && json.gameplay) {
          const remote = json.gameplay;
          this.state = {
            ...DEFAULT_STATE,
            ...remote,
            inventory: { ...DEFAULT_STATE.inventory, ...(remote.inventory || {}) },
            stats: { ...DEFAULT_STATE.stats, ...(remote.stats || {}) },
            seenQuestionIds: Array.isArray(remote.seenQuestionIds) ? remote.seenQuestionIds : [],
            achievements: INITIAL_ACHIEVEMENTS.map(ach => {
              const existing = (remote.achievements || []).find(a => a.id === ach.id);
              return existing ? { ...ach, unlocked: existing.unlocked } : ach;
            })
          };
          // Cache locally
          const key = this.getStorageKey(username);
          localStorage.setItem(key, JSON.stringify(this.state));
          this.notify();
          return;
        }
      }
    } catch (err) {
      console.warn('Could not sync with backend on load, using local cache:', err);
    }
    this.state = this.loadLocalForUser(username);
    this.notify();
  }

  save() {
    // 1. Save locally immediately
    try {
      const key = this.getStorageKey(this.currentUsername);
      localStorage.setItem(key, JSON.stringify(this.state));
    } catch (e) {
      console.warn('LocalStorage save failed', e);
    }
    this.notify();

    // 2. Debounced save to backend database
    if (this.currentUsername) {
      if (this.syncTimeout) clearTimeout(this.syncTimeout);
      this.syncTimeout = setTimeout(async () => {
        try {
          await fetch(`${API_BASE}/gameplay/${this.currentUsername}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(this.state)
          });
        } catch (err) {
          console.warn('Backend sync failed, saved in local cache:', err);
        }
      }, 500);
    }
  }

  recordSeenQuestion(questionId) {
    if (!questionId) return;
    if (!this.state.seenQuestionIds) {
      this.state.seenQuestionIds = [];
    }
    if (!this.state.seenQuestionIds.includes(questionId)) {
      this.state.seenQuestionIds.push(questionId);
      this.save();
    }
  }

  isQuestionSeen(questionId) {
    if (!this.state.seenQuestionIds) return false;
    return this.state.seenQuestionIds.includes(questionId);
  }

  subscribe(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  notify() {
    this.listeners.forEach(fn => fn(this.state));
  }

  getState() {
    return this.state;
  }

  isLevelUnlocked(level) {
    return level <= this.state.unlockedLevel;
  }

  completeLevel(level, score, stars) {
    const prev = this.state.completedLevels[level] || { stars: 0, bestScore: 0 };
    const newStars = Math.max(prev.stars, stars);
    const newBest = Math.max(prev.bestScore, score);

    this.state.completedLevels[level] = {
      stars: newStars,
      bestScore: newBest
    };

    if (level >= this.state.unlockedLevel && level < 60) {
      this.state.unlockedLevel = level + 1;
    }

    this.state.totalScore += score;
    if (score > (this.state.bestScore || 0)) {
      this.state.bestScore = score;
    }

    this.state.stats.totalWins = (this.state.stats.totalWins || 0) + 1;
    this.state.stats.totalAttempts = (this.state.stats.totalAttempts || 0) + 1;

    // Check achievements
    const completedCount = Object.keys(this.state.completedLevels).length;
    if (completedCount >= 20) this.unlockAchievement('puzzle_master');
    if (completedCount >= 60) this.unlockAchievement('chaos_survivor');
    if (level >= 41) this.unlockAchievement('brain_burner');

    // Zone achievements
    const easyDone = Array.from({ length: 20 }, (_, i) => i + 1).every(l => this.state.completedLevels[l]);
    if (easyDone) this.unlockAchievement('word_wizard');
    const medDone = Array.from({ length: 20 }, (_, i) => i + 21).every(l => this.state.completedLevels[l]);
    if (medDone) this.unlockAchievement('logic_legend');
    const hardDone = Array.from({ length: 20 }, (_, i) => i + 41).every(l => this.state.completedLevels[l]);
    if (hardDone) this.unlockAchievement('riddle_king');

    this.save();
  }

  recordFailure() {
    this.state.stats.totalExplosions = (this.state.stats.totalExplosions || 0) + 1;
    this.state.stats.totalAttempts = (this.state.stats.totalAttempts || 0) + 1;
    this.unlockAchievement('first_boom');
    this.save();
  }

  addInk(amount) {
    this.state.inkTokens = Math.max(0, this.state.inkTokens + amount);
    if (this.state.inkTokens >= 1000) {
      this.unlockAchievement('ink_collector');
    }
    this.save();
  }

  consumePowerUp(id) {
    if ((this.state.inventory[id] || 0) > 0) {
      this.state.inventory[id]--;
      this.state.stats.powerupsUsed = (this.state.stats.powerupsUsed || 0) + 1;
      if (id === 'freeze' || id === 'rewind') {
        this.unlockAchievement('time_bender');
      }
      this.save();
      return true;
    }
    return false;
  }

  buyPowerUp(id, cost, quantity = 1) {
    if (this.state.inkTokens >= cost) {
      this.state.inkTokens -= cost;
      this.state.inventory[id] = (this.state.inventory[id] || 0) + quantity;
      this.unlockAchievement('shopaholic');
      this.save();
      return true;
    }
    return false;
  }

  recordAnswer(isCorrect, streak, timeRatio) {
    this.state.stats.totalAnswered = (this.state.stats.totalAnswered || 0) + 1;
    if (isCorrect) {
      this.state.stats.totalCorrect = (this.state.stats.totalCorrect || 0) + 1;
      if (streak > (this.state.stats.highestStreak || 0)) {
        this.state.stats.highestStreak = streak;
      }
      if (streak >= 5) {
        this.unlockAchievement('streak_fire');
      }
      if (timeRatio >= 0.7) {
        this.unlockAchievement('speed_demon');
      }
    }
    this.save();
  }

  unlockAchievement(id) {
    const ach = this.state.achievements.find(a => a.id === id);
    if (ach && !ach.unlocked) {
      ach.unlocked = true;
      this.addInk(100); // Achievement reward
      this.save();
      return true;
    }
    return false;
  }

  getTotalStars() {
    return Object.values(this.state.completedLevels).reduce((acc, curr) => acc + (curr.stars || 0), 0);
  }

  getCompletedLevelsCount() {
    return Object.keys(this.state.completedLevels).length;
  }

  resetAllProgress() {
    this.state = JSON.parse(JSON.stringify(DEFAULT_STATE));
    this.save();
  }

  getProfileStats() {
    const totalStars = this.getTotalStars();
    const completedCount = this.getCompletedLevelsCount();
    return {
      username: this.currentUsername || 'Guest',
      unlockedLevel: this.state.unlockedLevel,
      totalScore: this.state.totalScore,
      bestScore: this.state.bestScore,
      inkTokens: this.state.inkTokens,
      totalWins: this.state.stats.totalWins || 0,
      totalAttempts: this.state.stats.totalAttempts || 0,
      highestStreak: this.state.stats.highestStreak || 0,
      totalExplosions: this.state.stats.totalExplosions || 0,
      completedCount,
      totalStars,
      achievementsCount: this.state.achievements.filter(a => a.unlocked).length,
      totalAchievements: this.state.achievements.length
    };
  }
}

export const progressionManager = new ProgressionManager();
