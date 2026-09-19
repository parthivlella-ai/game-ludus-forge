// Canvas particle explosion & visual effects engine

class ParticleEngine {
  constructor() {
    this.canvas = null;
    this.ctx = null;
    this.particles = [];
    this.animId = null;
    this.isRendering = false;
  }

  init(canvas) {
    if (!canvas) return;
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.resize();
    window.addEventListener('resize', () => this.resize());
  }

  resize() {
    if (!this.canvas) return;
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  createExplosion(x, y, count = 80) {
    if (!this.canvas) return;
    const colors = ['#f43f5e', '#fb923c', '#facc15', '#a855f7', '#38bdf8', '#ffffff'];
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 9 + 3;
      const size = Math.random() * 6 + 2;
      const life = Math.random() * 40 + 30;

      this.particles.push({
        x: x || this.canvas.width / 2,
        y: y || this.canvas.height / 2,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size,
        color: colors[Math.floor(Math.random() * colors.length)],
        life,
        maxLife: life,
        alpha: 1,
        gravity: 0.18,
        drag: 0.96
      });
    }

    if (!this.isRendering) {
      this.isRendering = true;
      this.render();
    }
  }

  createSparkles(x, y, count = 25) {
    if (!this.canvas) return;
    const colors = ['#22c55e', '#a855f7', '#38bdf8', '#fbbf24'];
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 4 + 1.5;
      const size = Math.random() * 3 + 1.5;
      const life = Math.random() * 30 + 20;

      this.particles.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 1.5,
        size,
        color: colors[Math.floor(Math.random() * colors.length)],
        life,
        maxLife: life,
        alpha: 1,
        gravity: 0.05,
        drag: 0.98
      });
    }

    if (!this.isRendering) {
      this.isRendering = true;
      this.render();
    }
  }

  createSparkBurst(x, y, count = 30) {
    this.createSparkles(x, y, count);
  }

  render() {
    if (!this.ctx || !this.canvas) return;

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.vy += p.gravity;
      p.vx *= p.drag;
      p.vy *= p.drag;
      p.life--;
      p.alpha = Math.max(0, p.life / p.maxLife);

      this.ctx.save();
      this.ctx.globalAlpha = p.alpha;
      this.ctx.shadowBlur = 12;
      this.ctx.shadowColor = p.color;
      this.ctx.fillStyle = p.color;
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      this.ctx.fill();
      this.ctx.restore();

      if (p.life <= 0) {
        this.particles.splice(i, 1);
      }
    }

    if (this.particles.length > 0) {
      this.animId = requestAnimationFrame(() => this.render());
    } else {
      this.isRendering = false;
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
  }

  triggerScreenShake(intensity = 'medium') {
    const root = document.getElementById('root');
    if (!root) return;
    const className = intensity === 'heavy' ? 'shake-heavy' : 'shake-medium';
    root.classList.remove('shake-heavy', 'shake-medium');
    // Force reflow
    void root.offsetWidth;
    root.classList.add(className);
    setTimeout(() => {
      root.classList.remove(className);
    }, 450);
  }

  cleanup() {
    if (this.animId) {
      cancelAnimationFrame(this.animId);
    }
    this.particles = [];
    this.isRendering = false;
  }
}

export const particleEngine = new ParticleEngine();
