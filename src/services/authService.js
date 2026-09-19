// Authentication Service with SHA-256 Password Hashing & Per-User Isolation

const ACCOUNTS_STORAGE_KEY = 'wordblast_accounts_v1';
const SESSION_STORAGE_KEY = 'wordblast_current_user_v1';

class AuthService {
  constructor() {
    this.currentUser = this.loadCurrentSession();
    this.listeners = new Set();
  }

  // SHA-256 Hash implementation using browser Web Crypto API
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
    // Fallback hash for test/node environments
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
      console.warn('Failed to load accounts', e);
      return {};
    }
  }

  saveAccounts(accounts) {
    try {
      localStorage.setItem(ACCOUNTS_STORAGE_KEY, JSON.stringify(accounts));
    } catch (e) {
      console.warn('Failed to save accounts', e);
    }
  }

  loadCurrentSession() {
    try {
      const raw = localStorage.getItem(SESSION_STORAGE_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      return null;
    }
  }

  saveCurrentSession(user) {
    this.currentUser = user;
    try {
      if (user) {
        localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(user));
      } else {
        localStorage.removeItem(SESSION_STORAGE_KEY);
      }
    } catch (e) {
      console.warn('Failed to update session', e);
    }
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

    // Auto-login newly registered user
    const sessionUser = { username: cleanUsername, displayName: cleanDisplayName };
    this.saveCurrentSession(sessionUser);

    return { success: true, user: sessionUser };
  }

  async login({ username, password }) {
    const cleanUsername = (username || '').trim();
    if (!cleanUsername || !password) {
      return { success: false, error: 'Please enter both username and password' };
    }

    const accounts = this.getAccounts();
    const account = accounts[cleanUsername.toLowerCase()];
    if (!account) {
      return { success: false, error: 'Account not found. Please check your username or register.' };
    }

    const hash = await this.hashPassword(password);
    if (hash !== account.passwordHash) {
      return { success: false, error: 'Incorrect password. Please try again.' };
    }

    const sessionUser = { username: account.username, displayName: account.displayName };
    this.saveCurrentSession(sessionUser);

    return { success: true, user: sessionUser };
  }

  logout() {
    this.saveCurrentSession(null);
  }
}

export const authService = new AuthService();
