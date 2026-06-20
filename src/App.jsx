@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;700&display=swap');

:root {
  --bg-primary: #030305;
  --bg-secondary: #0a0b10;
  --bg-card: rgba(15, 17, 25, 0.8);
  --border-color: rgba(0, 243, 255, 0.15);
  --accent-cyan: #00f3ff;
  --accent-green: #00ff9d;
  --accent-red: #ff003c;
  --text-primary: #e2e8f0;
  --text-secondary: #94a3b8;
  --font-mono: 'JetBrains Mono', monospace;
  --font-sans: 'Inter', system-ui, sans-serif;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  background-color: var(--bg-primary);
  background-image: 
    linear-gradient(rgba(0, 243, 255, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0, 243, 255, 0.03) 1px, transparent 1px);
  background-size: 40px 40px;
  color: var(--text-primary);
  font-family: var(--font-sans);
  line-height: 1.6;
  overflow-x: hidden;
}

.app-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
}

/* TYPOGRAPHY */
h1, h2, h3, h4 {
  font-family: var(--font-sans);
  text-transform: uppercase;
  letter-spacing: 1.5px;
  color: var(--text-primary);
}

h1 { font-size: 3.5rem; line-height: 1.1; margin-bottom: 1.5rem; }
h2 { font-size: 2rem; margin-bottom: 1rem; }
h3 { font-size: 1.25rem; }

.gradient-text {
  background: linear-gradient(90deg, var(--accent-cyan), var(--accent-green));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 0 30px rgba(0, 243, 255, 0.3);
}

/* BUTTONS */
.btn-terminal {
  background: transparent;
  border: 1px solid var(--border-color);
  color: var(--text-secondary);
  padding: 0.75rem 1.5rem;
  font-family: var(--font-mono);
  font-size: 0.85rem;
  letter-spacing: 1px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  position: relative;
  overflow: hidden;
}

.btn-terminal:hover:not(:disabled) {
  border-color: var(--accent-cyan);
  color: var(--accent-cyan);
  box-shadow: 0 0 15px rgba(0, 243, 255, 0.2);
}

.btn-terminal.primary {
  background: var(--accent-cyan);
  color: var(--bg-primary);
  border-color: var(--accent-cyan);
  font-weight: 700;
}

.btn-terminal.primary:hover {
  background: transparent;
  color: var(--accent-cyan);
  box-shadow: 0 0 20px rgba(0, 243, 255, 0.4);
}

.btn-terminal:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* NAVBAR */
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 0;
  border-bottom: 1px solid var(--border-color);
  position: sticky;
  top: 0;
  z-index: 100;
  background: rgba(3, 3, 5, 0.8);
  backdrop-filter: blur(10px);
}

.logo {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.logo-img { height: 32px; width: auto; }

.logo-text {
  font-family: var(--font-mono);
  font-weight: 700;
  letter-spacing: 2px;
  font-size: 1.2rem;
}

.highlight {
  color: var(--accent-cyan);
  text-shadow: 0 0 10px var(--accent-cyan);
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 2rem;
}

.nav-links a {
  color: var(--text-secondary);
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 500;
  transition: color 0.3s;
  font-family: var(--font-mono);
  letter-spacing: 1px;
}

.nav-links a:hover { color: var(--accent-cyan); }

/* HERO */
.hero {
  display: flex;
  min-height: 85vh;
  padding: 4rem 0;
  gap: 4rem;
  align-items: center;
  position: relative;
}

.hero-bg-matrix {
  position: absolute;
  top: 0; left: 0; width: 100%; height: 100%;
  font-family: var(--font-mono);
  font-size: 10px;
  color: rgba(0, 243, 255, 0.05);
  line-height: 1.2;
  word-break: break-all;
  overflow: hidden;
  pointer-events: none;
  z-index: 0;
}

.hero-left, .hero-right {
  position: relative;
  z-index: 1;
  flex: 1;
}

.hero-left { max-width: 600px; }

.status-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(0, 255, 157, 0.1);
  border: 1px solid rgba(0, 255, 157, 0.3);
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-family: var(--font-mono);
  font-size: 0.75rem;
  color: var(--accent-green);
  margin-bottom: 2rem;
  letter-spacing: 1px;
}

.pulse-dot {
  width: 8px; height: 8px;
  background: var(--accent-green);
  border-radius: 50%;
  box-shadow: 0 0 10px var(--accent-green);
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.5; transform: scale(1.2); }
  100% { opacity: 1; transform: scale(1); }
}

.hero-subtitle {
  color: var(--text-secondary);
  font-size: 1.1rem;
  margin-bottom: 2rem;
  max-width: 500px;
}

.hero-cta { margin-bottom: 3rem; }

/* TERMINAL WAITLIST */
.terminal-card {
  background: rgba(0, 0, 0, 0.6);
  border: 1px solid var(--border-color);
  border-radius: 6px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
  max-width: 500px;
}

.terminal-header {
  background: rgba(255, 255, 255, 0.05);
  padding: 0.75rem 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border-bottom: 1px solid var(--border-color);
}

.terminal-dot { width: 10px; height: 10px; border-radius: 50%; }
.terminal-dot.red { background: #ff5f56; }
.terminal-dot.yellow { background: #ffbd2e; }
.terminal-dot.green { background: #27c93f; }

.terminal-title {
  margin-left: 1rem;
  font-family: var(--font-mono);
  font-size: 0.8rem;
  color: var(--text-secondary);
}

.terminal-body {
  padding: 1.5rem;
  font-family: var(--font-mono);
  font-size: 0.9rem;
}

.terminal-line {
  margin-bottom: 0.75rem;
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  align-items: center;
}

.prompt { color: var(--accent-green); user-select: none; }

.terminal-form { display: flex; flex-direction: column; gap: 0.75rem; }

.terminal-input-group {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid var(--border-color);
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: border-color 0.3s;
}

.terminal-input-group:focus-within {
  border-color: var(--accent-cyan);
  box-shadow: 0 0 10px rgba(0, 243, 255, 0.1);
}

.terminal-input {
  background: transparent;
  border: none;
  color: var(--text-primary);
  font-family: var(--font-mono);
  font-size: 0.9rem;
  flex: 1;
  outline: none;
}

.terminal-input::placeholder { color: var(--text-secondary); opacity: 0.5; }
.success { color: var(--accent-green); }

/* TELEMETRY PANEL */
.telemetry-panel {
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: 4px;
  width: 100%;
  max-width: 450px;
  padding: 1.5rem;
  position: relative;
  box-shadow: 0 0 30px rgba(0, 243, 255, 0.05);
  margin-left: auto;
}

.panel-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-family: var(--font-mono);
  font-size: 0.8rem;
  color: var(--text-secondary);
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--border-color);
}

.panel-status {
  margin-left: auto;
  color: var(--accent-green);
  font-weight: 700;
}

.metrics-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.metric { text-align: center; }

.metric-label {
  display: block;
  font-size: 0.65rem;
  color: var(--text-secondary);
  letter-spacing: 1px;
  margin-bottom: 0.25rem;
}

.metric-value {
  font-family: var(--font-mono);
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--text-primary);
}

.metric-value.green { color: var(--accent-green); }
.metric-value.cyan { color: var(--accent-cyan); }

.network-graph {
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid var(--border-color);
  border-radius: 4px;
  padding: 1rem;
  margin-bottom: 1.5rem;
}

.graph-svg { width: 100%; height: 80px; }

.live-logs { font-family: var(--font-mono); font-size: 0.75rem; }

.log-header {
  color: var(--text-secondary);
  margin-bottom: 0.5rem;
  font-size: 0.7rem;
  letter-spacing: 1px;
}

.log-entry {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 0.25rem;
  color: var(--text-secondary);
}

.log-time { color: var(--text-secondary); }
.log-type.info { color: var(--accent-cyan); }
.log-type.warn { color: #f59e0b; }
.log-type.err { color: var(--accent-red); }
.log-msg { color: var(--text-primary); }

/* SECTIONS */
.section {
  padding: 6rem 0;
  border-top: 1px solid var(--border-color);
}

.section-header {
  margin-bottom: 3rem;
}

.section-tag {
  font-family: var(--font-mono);
  color: var(--accent-cyan);
  font-size: 0.8rem;
  letter-spacing: 2px;
  display: block;
  margin-bottom: 0.5rem;
}

/* ABOUT */
.about-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
}

.about-text p {
  color: var(--text-secondary);
  margin-bottom: 1.5rem;
  font-size: 1.05rem;
}

.system-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}

.stat-item {
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  padding: 1.5rem;
  text-align: center;
  position: relative;
  overflow: hidden;
}

.stat-number {
  font-family: var(--font-mono);
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--accent-cyan);
  display: block;
}

.stat-number span {
  font-size: 1rem;
  color: var(--text-secondary);
}

.stat-label {
  font-size: 0.75rem;
  color: var(--text-secondary);
  letter-spacing: 1px;
  margin-top: 0.5rem;
}

/* PLATFORM MODULES */
.module-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
}

.module-card {
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  padding: 2rem;
  transition: all 0.3s ease;
  position: relative;
}

.module-card:hover {
  border-color: var(--accent-cyan);
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(0, 243, 255, 0.1);
}

.module-card::before {
  content: '';
  position: absolute;
  top: 0; left: 0; width: 100%; height: 2px;
  background: var(--accent-cyan);
  transform: scaleX(0);
  transition: transform 0.3s ease;
}

.module-card:hover::before { transform: scaleX(1); }

.module-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.module-icon {
  font-size: 1.5rem;
  color: var(--accent-cyan);
}

.module-card p {
  color: var(--text-secondary);
  margin-bottom: 2rem;
  font-size: 0.95rem;
}

.module-footer {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.status-indicator {
  font-family: var(--font-mono);
  font-size: 0.7rem;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  background: rgba(0, 255, 157, 0.1);
  color: var(--accent-green);
  border: 1px solid rgba(0, 255, 157, 0.3);
}

.progress-bar {
  flex: 1;
  height: 4px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 2px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: var(--accent-cyan);
  box-shadow: 0 0 10px var(--accent-cyan);
}

/* PRICING TIERS */
.tier-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  max-width: 900px;
  margin: 0 auto;
}

.tier-card {
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  padding: 2.5rem;
  position: relative;
}

.tier-card.featured {
  border-color: var(--accent-cyan);
  box-shadow: 0 0 30px rgba(0, 243, 255, 0.1);
  overflow: hidden;
}

.scan-line {
  position: absolute;
  top: 0; left: 0; width: 100%; height: 2px;
  background: linear-gradient(90deg, transparent, var(--accent-cyan), transparent);
  animation: scan 3s linear infinite;
}

@keyframes scan {
  0% { top: 0; }
  100% { top: 100%; }
}

.tier-header { margin-bottom: 1.5rem; }

.tier-level {
  font-family: var(--font-mono);
  font-size: 0.8rem;
  color: var(--accent-cyan);
  letter-spacing: 2px;
  display: block;
  margin-bottom: 0.5rem;
}

.tier-price {
  font-family: var(--font-mono);
  font-size: 2rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 2rem;
}

.tier-features {
  list-style: none;
  margin-bottom: 2.5rem;
}

.tier-features li {
  color: var(--text-secondary);
  margin-bottom: 0.75rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.check { color: var(--accent-green); }

/* FOOTER */
.footer {
  border-top: 1px solid var(--border-color);
  padding: 4rem 0 2rem;
  margin-top: 4rem;
}

.footer-grid {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  gap: 4rem;
  margin-bottom: 3rem;
}

.footer-col h4 {
  font-size: 0.9rem;
  margin-bottom: 1rem;
  color: var(--accent-cyan);
}

.footer-col p { color: var(--text-secondary); }

.footer-col a {
  display: block;
  color: var(--text-secondary);
  text-decoration: none;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
  transition: color 0.3s;
}

.footer-col a:hover { color: var(--accent-cyan); }

.footer-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 2rem;
  border-top: 1px solid var(--border-color);
  font-size: 0.8rem;
  color: var(--text-secondary);
  font-family: var(--font-mono);
}

.system-status .green { color: var(--accent-green); }

/* RESPONSIVE */
@media (max-width: 900px) {
  .hero {
    flex-direction: column;
    text-align: center;
  }
  .hero-left { max-width: 100%; }
  .hero-right { width: 100%; }
  .telemetry-panel { max-width: 100%; margin: 0 auto; }
  .terminal-card { margin: 2rem auto 0; }
  .about-grid { grid-template-columns: 1fr; }
  .system-stats { grid-template-columns: 1fr; }
  .module-grid { grid-template-columns: 1fr; }
  .tier-grid { grid-template-columns: 1fr; }
  .footer-grid { grid-template-columns: 1fr; text-align: center; }
  .footer-bottom { flex-direction: column; gap: 1rem; }
  .nav-links { display: none; } /* Simplified for mobile, add a hamburger menu if needed */
  h1 { font-size: 2.5rem; }
}
