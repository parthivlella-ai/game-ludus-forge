import React, { useState } from 'react';
import { authService } from '../../services/authService.js';
import { soundEngine } from '../../services/soundEngine.js';
import { particleEngine } from '../../services/particleEngine.js';
import { LogIn, UserPlus, Sparkles, Zap, ArrowRight, ShieldCheck } from 'lucide-react';
import '../../styles/auth.css';

export default function AuthScreen({ onAuthenticated }) {
  const [mode, setMode] = useState('LOGIN'); // 'LOGIN' | 'REGISTER'
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Transition animation state
  const [transitioningUser, setTransitioningUser] = useState(null);

  const completeAuth = (user) => {
    onAuthenticated(user);
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    setError('');
    setLoading(true);
    soundEngine.playClick();

    try {
      let result;
      if (mode === 'REGISTER') {
        result = await authService.register({
          username,
          password,
          confirmPassword,
          displayName
        });
      } else {
        result = await authService.login({
          username,
          password
        });
      }

      if (result.success) {
        soundEngine.playFanfare();
        setTransitioningUser(result.user);

        // Visual spark effect safely
        try {
          if (typeof window !== 'undefined' && particleEngine) {
            particleEngine.createSparkBurst(window.innerWidth / 2, window.innerHeight / 2, 30);
          }
        } catch (fxErr) {
          console.warn('FX Error ignored:', fxErr);
        }

        // Swift 450ms transition so user is NEVER stuck waiting
        setTimeout(() => {
          completeAuth(result.user);
        }, 450);
      } else {
        soundEngine.playWrong();
        setError(result.error || 'Authentication failed');
        setLoading(false);
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
      setLoading(false);
    }
  };

  // One-click quick demo login
  const handleQuickDemo = async () => {
    setError('');
    setLoading(true);
    soundEngine.playClick();

    const demoUser = 'Operative_' + Math.floor(100 + Math.random() * 900);
    const result = await authService.register({
      username: demoUser,
      password: 'demopassword123',
      confirmPassword: 'demopassword123',
      displayName: demoUser
    });

    if (result.success) {
      soundEngine.playFanfare();
      setTransitioningUser(result.user);
      setTimeout(() => {
        completeAuth(result.user);
      }, 400);
    } else {
      // If already registered, login
      const logRes = await authService.login({
        username: demoUser,
        password: 'demopassword123'
      });
      if (logRes.success) {
        completeAuth(logRes.user);
      } else {
        setError('Quick launch failed. Please create an account.');
        setLoading(false);
      }
    }
  };

  return (
    <div className="auth-viewport">
      {/* Background Cyber Grid & Glow Orbs */}
      <div className="auth-bg-grid" />
      <div className="auth-glow-orb orb-1" />
      <div className="auth-glow-orb orb-2" />

      <div className="auth-card">
        {/* Terminal Header Badge */}
        <div className="auth-status-badge">
          <span className="status-dot pulse" />
          <span>CYBER ARENA SECURITY GATEWAY</span>
        </div>

        <div className="auth-brand">
          <div className="auth-bomb-icon">💣</div>
          <h1 className="auth-title">WORDBLAST</h1>
          <div className="auth-subtitle">ARCADE BRAIN BATTLE</div>
          <p className="auth-tagline">"THINK FAST. TYPE FASTER. DON'T EXPLODE."</p>
        </div>

        {/* Mode Switcher Tabs */}
        <div className="auth-tabs">
          <button
            type="button"
            className={`auth-tab ${mode === 'LOGIN' ? 'active' : ''}`}
            onClick={() => { soundEngine.playClick(); setMode('LOGIN'); setError(''); }}
          >
            <LogIn size={15} />
            <span>LOGIN</span>
          </button>
          <button
            type="button"
            className={`auth-tab ${mode === 'REGISTER' ? 'active' : ''}`}
            onClick={() => { soundEngine.playClick(); setMode('REGISTER'); setError(''); }}
          >
            <UserPlus size={15} />
            <span>CREATE ACCOUNT</span>
          </button>
        </div>

        {/* Error message */}
        {error && <div className="auth-error">{error}</div>}

        {/* Form */}
        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="auth-field">
            <label className="auth-label">CALLSIGN / USERNAME</label>
            <input
              type="text"
              className="auth-input"
              placeholder="e.g. CyberNinja"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              autoComplete="username"
              autoFocus
            />
          </div>

          {mode === 'REGISTER' && (
            <div className="auth-field">
              <label className="auth-label">DISPLAY ALIAS (OPTIONAL)</label>
              <input
                type="text"
                className="auth-input"
                placeholder="e.g. Commander Rex"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
              />
            </div>
          )}

          <div className="auth-field">
            <label className="auth-label">SECURITY PASSCODE</label>
            <input
              type="password"
              className="auth-input"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete={mode === 'REGISTER' ? 'new-password' : 'current-password'}
            />
          </div>

          {mode === 'REGISTER' && (
            <div className="auth-field">
              <label className="auth-label">CONFIRM PASSCODE</label>
              <input
                type="password"
                className="auth-input"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                autoComplete="new-password"
              />
            </div>
          )}

          <button
            type="submit"
            className="auth-submit-btn"
            disabled={loading}
          >
            {loading ? (
              <span>ACCESSING GRID...</span>
            ) : mode === 'LOGIN' ? (
              <>
                <LogIn size={18} />
                <span>INFILTRATE ARENA</span>
              </>
            ) : (
              <>
                <UserPlus size={18} />
                <span>INITIALIZE OPERATIVE</span>
              </>
            )}
          </button>
        </form>

        {/* Quick Launch Button */}
        <div style={{ width: '100%', margin: '0.9rem 0 0.4rem' }}>
          <button
            type="button"
            className="quick-demo-btn"
            onClick={handleQuickDemo}
            disabled={loading}
          >
            <Zap size={16} color="#00f59b" />
            <span>INSTANT DEMO ACCESS (ONE-CLICK)</span>
          </button>
        </div>

        <p style={{ marginTop: '0.8rem', fontSize: '0.8rem', color: 'var(--text-dim)' }}>
          {mode === 'LOGIN' ? (
            <>
              New Operative?{' '}
              <span
                style={{ color: '#00f59b', cursor: 'pointer', fontWeight: 800 }}
                onClick={() => { setMode('REGISTER'); setError(''); }}
              >
                Create Account
              </span>
            </>
          ) : (
            <>
              Existing Agent?{' '}
              <span
                style={{ color: '#00f59b', cursor: 'pointer', fontWeight: 800 }}
                onClick={() => { setMode('LOGIN'); setError(''); }}
              >
                Login here
              </span>
            </>
          )}
        </p>
      </div>

      {/* Futuristic Transition Screen on Login Success */}
      {transitioningUser && (
        <div
          className="auth-transition-overlay"
          onClick={() => completeAuth(transitioningUser)}
          title="Click to continue immediately"
        >
          <div className="auth-transition-core">💣</div>
          <h2 className="auth-welcome-text">
            ACCESS GRANTED
          </h2>
          <div className="auth-welcome-user">
            Welcome, {transitioningUser.displayName || transitioningUser.username}
          </div>
          <div className="auth-sync-bar">
            <div className="auth-sync-progress" />
          </div>
          <button
            className="auth-continue-btn"
            onClick={() => completeAuth(transitioningUser)}
          >
            <span>ENTER ARENA</span>
            <ArrowRight size={16} />
          </button>
        </div>
      )}
    </div>
  );
}
