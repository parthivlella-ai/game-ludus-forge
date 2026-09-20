import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_DIR = path.join(__dirname, 'data');
const DB_FILE = path.join(DATA_DIR, 'wordblast_db.json');

class Database {
  constructor() {
    this.memory = {
      users: {},       // username (lowercase) -> { username, displayName, passwordHash, createdAt }
      gameplay: {},    // username (lowercase) -> { unlockedLevel, completedLevels, totalScore, bestScore, inkTokens, inventory, achievements, stats, seenQuestionIds, updatedAt }
    };
    this.init();
  }

  init() {
    try {
      if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR, { recursive: true });
      }

      if (fs.existsSync(DB_FILE)) {
        const raw = fs.readFileSync(DB_FILE, 'utf-8');
        const parsed = JSON.parse(raw);
        this.memory.users = parsed.users || {};
        this.memory.gameplay = parsed.gameplay || {};
      } else {
        this.persist();
      }
    } catch (err) {
      console.error('Failed to initialize database file, using in-memory store:', err);
    }
  }

  persist() {
    try {
      if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR, { recursive: true });
      }
      const tmpFile = `${DB_FILE}.tmp.${Date.now()}`;
      fs.writeFileSync(tmpFile, JSON.stringify(this.memory, null, 2), 'utf-8');
      fs.renameSync(tmpFile, DB_FILE);
    } catch (err) {
      console.error('Failed to persist database to disk:', err);
    }
  }

  // ================= User Operations =================

  getUser(username) {
    if (!username) return null;
    const key = username.toLowerCase().trim();
    return this.memory.users[key] || null;
  }

  createUser({ username, displayName, passwordHash }) {
    const key = username.toLowerCase().trim();
    if (this.memory.users[key]) {
      throw new Error('User already exists');
    }

    const user = {
      username: username.trim(),
      displayName: (displayName || username).trim(),
      passwordHash,
      createdAt: new Date().toISOString()
    };

    this.memory.users[key] = user;

    // Initialize default gameplay
    if (!this.memory.gameplay[key]) {
      this.memory.gameplay[key] = this.getDefaultGameplay(user.username);
    }

    this.persist();
    return user;
  }

  // ================= Gameplay Operations =================

  getDefaultGameplay(username) {
    return {
      username,
      unlockedLevel: 1,
      completedLevels: {},
      totalScore: 0,
      bestScore: 0,
      inkTokens: 50, // Starter ink
      inventory: {
        freeze: 0,
        rewind: 0,
        shield: 0,
        lens: 0,
        potato: 0,
        smoke: 0
      },
      achievements: [],
      stats: {
        totalAnswered: 0,
        totalCorrect: 0,
        totalExplosions: 0,
        highestStreak: 0,
        powerupsUsed: 0,
        totalWins: 0,
        totalAttempts: 0
      },
      seenQuestionIds: [],
      updatedAt: new Date().toISOString()
    };
  }

  getGameplay(username) {
    if (!username) return null;
    const key = username.toLowerCase().trim();
    if (!this.memory.gameplay[key]) {
      this.memory.gameplay[key] = this.getDefaultGameplay(username);
      this.persist();
    }
    return this.memory.gameplay[key];
  }

  saveGameplay(username, state) {
    if (!username) return null;
    const key = username.toLowerCase().trim();
    const existing = this.getGameplay(username);

    const merged = {
      ...existing,
      ...state,
      inventory: { ...existing.inventory, ...(state.inventory || {}) },
      stats: { ...existing.stats, ...(state.stats || {}) },
      seenQuestionIds: Array.from(new Set([
        ...(existing.seenQuestionIds || []),
        ...(state.seenQuestionIds || [])
      ])),
      updatedAt: new Date().toISOString()
    };

    this.memory.gameplay[key] = merged;
    this.persist();
    return merged;
  }

  recordSeenQuestion(username, questionId) {
    if (!username || !questionId) return;
    const key = username.toLowerCase().trim();
    const gameplay = this.getGameplay(username);
    if (!gameplay.seenQuestionIds) gameplay.seenQuestionIds = [];
    if (!gameplay.seenQuestionIds.includes(questionId)) {
      gameplay.seenQuestionIds.push(questionId);
      gameplay.updatedAt = new Date().toISOString();
      this.persist();
    }
  }

  getSeenQuestions(username) {
    if (!username) return [];
    const gameplay = this.getGameplay(username);
    return gameplay.seenQuestionIds || [];
  }
}

export const db = new Database();
