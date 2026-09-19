// Web Audio API Procedural Synthesizer for WordBlast: Chaos Edition
class SoundEngine {
  constructor() {
    this.ctx = null;
    this.muted = localStorage.getItem('wb_muted') === 'true';
    this.volume = parseFloat(localStorage.getItem('wb_volume') || '0.7');
    this.initialized = false;
  }

  init() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
        this.initialized = true;
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  setMuted(muted) {
    this.muted = muted;
    localStorage.setItem('wb_muted', String(muted));
  }

  setVolume(vol) {
    this.volume = Math.max(0, Math.min(1, vol));
    localStorage.setItem('wb_volume', String(this.volume));
  }

  // Helper to create a gain node with volume scaling
  getMasterGain() {
    if (!this.ctx) return null;
    const gain = this.ctx.createGain();
    gain.gain.value = this.muted ? 0 : this.volume;
    gain.connect(this.ctx.destination);
    return gain;
  }

  // Metronome / standard ticking sound
  playTick() {
    this.init();
    if (this.muted || !this.ctx) return;
    try {
      const master = this.getMasterGain();
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(1200, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(300, this.ctx.currentTime + 0.04);

      gain.gain.setValueAtTime(0.2, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.04);

      osc.connect(gain);
      gain.connect(master);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.05);
    } catch (e) {
      console.warn('Audio playTick error', e);
    }
  }

  // Critical warning pulse beep (<20% timer)
  playCriticalTick() {
    this.init();
    if (this.muted || !this.ctx) return;
    try {
      const master = this.getMasterGain();
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(880, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(440, this.ctx.currentTime + 0.08);

      gain.gain.setValueAtTime(0.4, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.08);

      osc.connect(gain);
      gain.connect(master);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.09);
    } catch (e) {
      console.warn('Audio playCriticalTick error', e);
    }
  }

  // Deep procedural explosion
  playExplosion() {
    this.init();
    if (this.muted || !this.ctx) return;
    try {
      const master = this.getMasterGain();
      const now = this.ctx.currentTime;
      const duration = 1.2;

      // 1. Noise burst
      const bufferSize = this.ctx.sampleRate * duration;
      const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }

      const whiteNoise = this.ctx.createBufferSource();
      whiteNoise.buffer = noiseBuffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(900, now);
      filter.frequency.exponentialRampToValueAtTime(40, now + duration);

      const noiseGain = this.ctx.createGain();
      noiseGain.gain.setValueAtTime(0.8, now);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, now + duration);

      whiteNoise.connect(filter);
      filter.connect(noiseGain);
      noiseGain.connect(master);

      // 2. Sub bass drop punch
      const subOsc = this.ctx.createOscillator();
      const subGain = this.ctx.createGain();
      subOsc.type = 'sine';
      subOsc.frequency.setValueAtTime(150, now);
      subOsc.frequency.exponentialRampToValueAtTime(25, now + 0.5);

      subGain.gain.setValueAtTime(0.9, now);
      subGain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);

      subOsc.connect(subGain);
      subGain.connect(master);

      whiteNoise.start(now);
      subOsc.start(now);
      whiteNoise.stop(now + duration);
      subOsc.stop(now + 0.6);
    } catch (e) {
      console.warn('Audio playExplosion error', e);
    }
  }

  // Ascending cheerful major chime
  playCorrect() {
    this.init();
    if (this.muted || !this.ctx) return;
    try {
      const master = this.getMasterGain();
      const now = this.ctx.currentTime;
      const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6

      notes.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const startTime = now + idx * 0.07;

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, startTime);

        gain.gain.setValueAtTime(0, startTime);
        gain.gain.linearRampToValueAtTime(0.35, startTime + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.25);

        osc.connect(gain);
        gain.connect(master);

        osc.start(startTime);
        osc.stop(startTime + 0.26);
      });
    } catch (e) {
      console.warn('Audio playCorrect error', e);
    }
  }

  // Dissonant descending buzzer
  playWrong() {
    this.init();
    if (this.muted || !this.ctx) return;
    try {
      const master = this.getMasterGain();
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(240, now);
      osc.frequency.linearRampToValueAtTime(130, now + 0.25);

      gain.gain.setValueAtTime(0.4, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

      osc.connect(gain);
      gain.connect(master);

      osc.start(now);
      osc.stop(now + 0.26);
    } catch (e) {
      console.warn('Audio playWrong error', e);
    }
  }

  // Sparkly high-pitched token coin sound
  playToken() {
    this.init();
    if (this.muted || !this.ctx) return;
    try {
      const master = this.getMasterGain();
      const now = this.ctx.currentTime;
      const notes = [987.77, 1318.51]; // B5, E6

      notes.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const startTime = now + idx * 0.06;

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, startTime);

        gain.gain.setValueAtTime(0.3, startTime);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.18);

        osc.connect(gain);
        gain.connect(master);

        osc.start(startTime);
        osc.stop(startTime + 0.2);
      });
    } catch (e) {
      console.warn('Audio playToken error', e);
    }
  }

  // Crystal Freeze sound
  playFreeze() {
    this.init();
    if (this.muted || !this.ctx) return;
    try {
      const master = this.getMasterGain();
      const now = this.ctx.currentTime;
      const freqs = [1760, 2200, 2637];

      freqs.forEach((f, i) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(f, now);
        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.6 + i * 0.1);

        osc.connect(gain);
        gain.connect(master);
        osc.start(now);
        osc.stop(now + 0.8);
      });
    } catch (e) {
      console.warn('Audio playFreeze error', e);
    }
  }

  // Power-up activation zap / laser
  playPowerup() {
    this.init();
    if (this.muted || !this.ctx) return;
    try {
      const master = this.getMasterGain();
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(300, now);
      osc.frequency.exponentialRampToValueAtTime(1400, now + 0.3);

      gain.gain.setValueAtTime(0.35, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

      osc.connect(gain);
      gain.connect(master);

      osc.start(now);
      osc.stop(now + 0.36);
    } catch (e) {
      console.warn('Audio playPowerup error', e);
    }
  }

  // Level Complete Fanfare
  playFanfare() {
    this.init();
    if (this.muted || !this.ctx) return;
    try {
      const master = this.getMasterGain();
      const now = this.ctx.currentTime;
      const chords = [
        { freqs: [523.25, 659.25, 783.99], time: 0.0, dur: 0.2 }, // C
        { freqs: [587.33, 739.99, 880.00], time: 0.22, dur: 0.2 }, // D
        { freqs: [659.25, 830.61, 987.77], time: 0.44, dur: 0.25 }, // E
        { freqs: [783.99, 1046.50, 1318.51], time: 0.72, dur: 0.6 } // G - C - E high
      ];

      chords.forEach(chord => {
        chord.freqs.forEach(freq => {
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          const start = now + chord.time;

          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, start);

          gain.gain.setValueAtTime(0, start);
          gain.gain.linearRampToValueAtTime(0.2, start + 0.03);
          gain.gain.exponentialRampToValueAtTime(0.001, start + chord.dur);

          osc.connect(gain);
          gain.connect(master);

          osc.start(start);
          osc.stop(start + chord.dur + 0.05);
        });
      });
    } catch (e) {
      console.warn('Audio playFanfare error', e);
    }
  }

  // Button click tap
  playClick() {
    this.init();
    if (this.muted || !this.ctx) return;
    try {
      const master = this.getMasterGain();
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, this.ctx.currentTime);
      gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.03);

      osc.connect(gain);
      gain.connect(master);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.04);
    } catch (e) {
      console.warn('Audio playClick error', e);
    }
  }
}

export const soundEngine = new SoundEngine();
