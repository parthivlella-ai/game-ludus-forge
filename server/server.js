import express from 'express';
import cors from 'cors';
import crypto from 'crypto';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { db } from './database.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Security & Middleware
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json({ limit: '5mb' }));

// Password hashing utility with salt
function hashPassword(password) {
  if (!password) return '';
  return crypto.createHash('sha256').update(password + '_wordblast_salt_2026').digest('hex');
}

// ================= API ROUTES =================

// Health check for Render
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString(), service: 'WordBlast Backend' });
});

// Register
app.post('/api/auth/register', (req, res) => {
  try {
    const { username, password, confirmPassword, displayName } = req.body || {};
    const cleanUsername = (username || '').trim();
    const cleanDisplayName = (displayName || '').trim() || cleanUsername;

    if (!cleanUsername || cleanUsername.length < 3) {
      return res.status(400).json({ success: false, error: 'Username must be at least 3 characters long' });
    }
    if (!/^[a-zA-Z0-9_-]+$/.test(cleanUsername)) {
      return res.status(400).json({ success: false, error: 'Username can only contain letters, numbers, dashes and underscores' });
    }
    if (!password || password.length < 6) {
      return res.status(400).json({ success: false, error: 'Password must be at least 6 characters long' });
    }
    if (confirmPassword && password !== confirmPassword) {
      return res.status(400).json({ success: false, error: 'Passwords do not match' });
    }

    const existing = db.getUser(cleanUsername);
    if (existing) {
      return res.status(409).json({ success: false, error: 'Username is already taken. Please choose another.' });
    }

    const passwordHash = hashPassword(password);
    const user = db.createUser({
      username: cleanUsername,
      displayName: cleanDisplayName,
      passwordHash
    });

    return res.status(201).json({
      success: true,
      user: {
        username: user.username,
        displayName: user.displayName,
        createdAt: user.createdAt
      }
    });
  } catch (err) {
    console.error('Register error:', err);
    return res.status(500).json({ success: false, error: 'Internal server error during registration' });
  }
});

// Login
app.post('/api/auth/login', (req, res) => {
  try {
    const { username, password } = req.body || {};
    const cleanUsername = (username || '').trim();

    if (!cleanUsername || !password) {
      return res.status(400).json({ success: false, error: 'Please enter both username and password' });
    }

    const user = db.getUser(cleanUsername);
    if (!user) {
      return res.status(404).json({ success: false, error: 'Account not found. Please check your username or register.' });
    }

    const hash = hashPassword(password);
    if (hash !== user.passwordHash) {
      return res.status(401).json({ success: false, error: 'Incorrect password. Please try again.' });
    }

    return res.json({
      success: true,
      user: {
        username: user.username,
        displayName: user.displayName,
        createdAt: user.createdAt
      }
    });
  } catch (err) {
    console.error('Login error:', err);
    return res.status(500).json({ success: false, error: 'Internal server error during login' });
  }
});

// Load Gameplay Data
app.get('/api/gameplay/:username', (req, res) => {
  try {
    const { username } = req.params;
    const gameplay = db.getGameplay(username);
    if (!gameplay) {
      return res.status(404).json({ success: false, error: 'Gameplay profile not found' });
    }
    return res.json({ success: true, gameplay });
  } catch (err) {
    console.error('Fetch gameplay error:', err);
    return res.status(500).json({ success: false, error: 'Failed to fetch gameplay data' });
  }
});

// Save Gameplay Data
app.post('/api/gameplay/:username', (req, res) => {
  try {
    const { username } = req.params;
    const state = req.body;
    if (!state || typeof state !== 'object') {
      return res.status(400).json({ success: false, error: 'Invalid gameplay data payload' });
    }

    const saved = db.saveGameplay(username, state);
    return res.json({ success: true, gameplay: saved });
  } catch (err) {
    console.error('Save gameplay error:', err);
    return res.status(500).json({ success: false, error: 'Failed to save gameplay data' });
  }
});

// Record Question as Seen
app.post('/api/gameplay/:username/seen', (req, res) => {
  try {
    const { username } = req.params;
    const { questionId } = req.body || {};
    if (questionId) {
      db.recordSeenQuestion(username, questionId);
    }
    return res.json({ success: true });
  } catch (err) {
    console.error('Seen question error:', err);
    return res.status(500).json({ success: false, error: 'Failed to record seen question' });
  }
});

// Real Player Leaderboard (Authentic accounts only, no fake data)
app.get('/api/leaderboard', (req, res) => {
  try {
    const leaderboard = db.getLeaderboard();
    return res.json({ success: true, leaderboard });
  } catch (err) {
    console.error('Leaderboard error:', err);
    return res.status(500).json({ success: false, error: 'Failed to load leaderboard' });
  }
});

// Daily Challenge Completion
app.post('/api/daily-challenge/:username/complete', (req, res) => {
  try {
    const { username } = req.params;
    const { dateStr, score, reward } = req.body || {};
    const date = dateStr || new Date().toISOString().slice(0, 10);
    const updated = db.saveDailyCompletion(username, date, score, reward || 150);
    return res.json({ success: true, gameplay: updated });
  } catch (err) {
    console.error('Daily challenge complete error:', err);
    return res.status(500).json({ success: false, error: 'Failed to save daily challenge' });
  }
});

// ================= STATIC FRONTEND SERVING (PRODUCTION) =================
const distPath = path.join(__dirname, '../dist');
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));
  app.use((req, res, next) => {
    if (!req.path.startsWith('/api')) {
      return res.sendFile(path.join(distPath, 'index.html'));
    }
    next();
  });
}

// Start Server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`WordBlast backend server running on port ${PORT} (0.0.0.0)`);
});
