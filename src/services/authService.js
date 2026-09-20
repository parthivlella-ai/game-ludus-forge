// Authentication Service with Dedicated Backend Database Integration
// Supports REST API /api/auth with graceful offline localStorage fallback
// Guarantees that opening the link requires login or account creation

const ACCOUNTS_STORAGE_KEY = 'wordblast_accounts_v1';
const API_BASE = (typeof window !== 'undefined' && window.location.port === '5173')
  ? 'http://localhost:5000/api'
  : '/api';

class AuthService {
  constructor() {
    // Intentionally start with null so whenever the user opens the link,
    // they get the login or create account interface as requested.
    this.currentUser = null;
    this.listeners = new Set();
  }

  // SHA-256 Hash fallback for offline mode
  async hashPassword(password) {
    if (!password) return '';
    try {
      if (typeof window !== 'undefined' && window.crypto && window.crypto.subtle) {
        const msgUint8 = new TextEncoder().encode(password + '_wordblast_salt_2026');
        const hashBuffer = await window.crypto.subtle.digest('SHA-256', msgUint8);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
      }
    } catch (e) {
      console.warn('Web Crypto digest failed, using fallback', e);
    }
    let hash = 5381;
    for (let i = 0; i < password.length; i++) {
      hash = ((hash << 5) + hash) + password.charCodeAt(i);
    }
    return 'h_' + (hash >>> 0).toString(16);
  }

  getAccounts() {
    try {
      const raw = localStorage.getItem(ACCOUNTS_STORAGE_KEY);
      return raw ? JSON.parse(raw) : {};
    } catch (e) {
      return {};
    }
  }

  saveAccounts(accounts) {
    try {
      localStorage.setItem(ACCOUNTS_STORAGE_KEY, JSON.stringify(accounts));
    } catch (e) {
      console.warn('Failed to save accounts locally', e);
    }
  }

  setCurrentUser(user) {
    this.currentUser = user;
    this.notify();
  }

  subscribe(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  notify() {
    this.listeners.forEach(fn => fn(this.currentUser));
  }

  getCurrentUser() {
    return this.currentUser;
  }

  async register({ username, password, confirmPassword, displayName }) {
    const cleanUsername = (username || '').trim();
    const cleanDisplayName = (displayName || '').trim() || cleanUsername;

    // Validation rules
    if (!cleanUsername || cleanUsername.length < 3) {
      return { success: false, error: 'Username must be at least 3 characters long' };
    }
    if (!/^[a-zA-Z0-9_-]+$/.test(cleanUsername)) {
      return { success: false, error: 'Username can only contain letters, numbers, dashes and underscores' };
    }
    if (!password || password.length < 6) {
      return { success: false, error: 'Password must be at least 6 characters long' };
    }
    if (password !== confirmPassword) {
      return { success: false, error: 'Passwords do not match' };
    }

    // Try backend registration first
    try {
      const res = await fetch(`${API_BASE}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: cleanUsername,
          password,
          confirmPassword,
          displayName: cleanDisplayName
        })
      });

      const data = await res.json();
      if (res.ok && data.success) {
        this.setCurrentUser(data.user);
        // Also mirror in local cache for offline backup
        const accounts = this.getAccounts();
        accounts[cleanUsername.toLowerCase()] = {
          username: cleanUsername,
          displayName: cleanDisplayName,
          createdAt: new Date().toISOString()
        };
        this.saveAccounts(accounts);
        return { success: true, user: data.user };
      } else {
        return { success: false, error: data.error || 'Registration failed' };
      }
    } catch (netErr) {
      console.warn('Backend unavailable, falling back to local storage:', netErr);
      // Fallback local registration
      const accounts = this.getAccounts();
      const lowerKey = cleanUsername.toLowerCase();
      if (accounts[lowerKey]) {
        return { success: false, error: 'Username is already taken. Please choose another.' };
      }

      const passwordHash = await this.hashPassword(password);
      const newAccount = {
        username: cleanUsername,
        displayName: cleanDisplayName,
        passwordHash,
        createdAt: new Date().toISOString()
      };

      accounts[lowerKey] = newAccount;
      this.saveAccounts(accounts);

      const sessionUser = { username: cleanUsername, displayName: cleanDisplayName };
      this.setCurrentUser(sessionUser);
      return { success: true, user: sessionUser };
    }
  }

  async login({ username, password }) {
    const cleanUsername = (username || '').trim();
    if (!cleanUsername || !password) {
      return { success: false, error: 'Please enter both username and password' };
    }

    // Try backend login first
    try {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: cleanUsername, password })
      });

      const data = await res.json();
      if (res.ok && data.success) {
        this.setCurrentUser(data.user);
        return { success: true, user: data.user };
      } else {
        return { success: false, error: data.error || 'Invalid credentials' };
      }
    } catch (netErr) {
      console.warn('Backend unavailable, falling back to local validation:', netErr);
      const accounts = this.getAccounts();
      const account = accounts[cleanUsername.toLowerCase()];
      if (!account) {
        return { success: false, error: 'Account not found. Please check your username or register.' };
      }

      const hash = await this.hashPassword(password);
      if (account.passwordHash && hash !== account.passwordHash) {
        return { success: false, error: 'Incorrect password. Please try again.' };
      }

      const sessionUser = { username: account.username, displayName: account.displayName || account.username };
      this.setCurrentUser(sessionUser);
      return { success: true, user: sessionUser };
    }
  }

  logout() {
    this.setCurrentUser(null);
  }
}

export const authService = new AuthService();
