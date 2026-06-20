import React, { useState } from 'react';
import './App.css';
import logo from './assets/logo.svg';

const App = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const generateMatrix = () => {
    let str = '';
    for (let i = 0; i < 2000; i++) {
      str += Math.random().toString(16)[2].toUpperCase();
      if (i % 80 === 0) str += ' ';
    }
    return str;
  };
  const [matrix] = useState(generateMatrix());

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  const scrollToWaitlist = () => {
    const card = document.querySelector('.terminal-card');
    if (card) card.scrollIntoView({ behavior: 'smooth' });
  };

  const handleContactSales = () => {
    const mailto = 'mailto:sales@aegisecos.com?subject=Enterprise%20Inquiry';
    try {
      window.location.href = mailto;
    } catch {
      alert('Please email us at sales@aegisecos.com');
    }
  };

  return (
    <div className="app-container">
      <nav className="navbar">
        <div className="logo">
          <img src={logo} alt="AegisecOS Logo" className="logo-img" />
          <span className="logo-text">AEGISEC<span className="highlight">OS</span></span>
        </div>
        <div className="nav-links">
          <a href="#about">System Overview</a>
          <a href="#platform">Architecture</a>
          <a href="#pricing">Access Tiers</a>
          <button className="btn-terminal" onClick={() => alert('Login coming soon')}>LOGIN</button>
        </div>
      </nav>

      <header className="hero">
        <div className="hero-bg-matrix">{matrix}</div>
        
        <div className="hero-left">
          <div className="status-badge">
            <span className="pulse-dot"></span> v0.1.0 EARLY ACCESS PHASE
          </div>
          <h1>
            Trust Nothing. <br />
            <span className="gradient-text">Secure Everything.</span>
          </h1>
          <p className="hero-subtitle">
            The Zero Trust orchestration platform providing unified visibility and continuous 
            verification. Engineered for total awareness, built for ethical security.
          </p>

          <button className="btn-terminal primary hero-cta" onClick={scrollToWaitlist}>
            REQUEST ACCESS
          </button>

          <div className="terminal-card">
            <div className="terminal-header">
              <span className="terminal-dot red"></span>
              <span className="terminal-dot yellow"></span>
              <span className="terminal-dot green"></span>
              <span className="terminal-title">access_request.sh</span>
            </div>
            <div className="terminal-body">
              <div className="terminal-line">
                <span className="prompt">root@aegisecos:~$</span> request_early_access
              </div>
              {submitted ? (
                <div className="terminal-line success">
                  <span className="prompt">></span> Access granted. You are on the waitlist.
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="terminal-form">
                  <div className="terminal-line">
                    <span className="prompt">></span> Enter work email:
                  </div>
                  <div className="terminal-input-group">
                    <span className="prompt">></span>
                    <input 
                      type="email" 
                      placeholder="name@company.com" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required 
                      className="terminal-input"
                    />
                    <button type="submit" className="btn-terminal">EXECUTE</button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>

        <div className="hero-right">
          <div className="telemetry-panel">
            <div className="panel-header">
              <span className="pulse-dot"></span> LIVE TELEMETRY
              <span className="panel-status">SECURE</span>
            </div>
            
            <div className="metrics-grid">
              <div className="metric">
                <span className="metric-label">THREAT LEVEL</span>
                <span className="metric-value green">LOW</span>
              </div>
              <div className="metric">
                <span className="metric-label">ACTIVE NODES</span>
                <span className="metric-value">14,092</span>
              </div>
              <div className="metric">
                <span className="metric-label">PACKETS / SEC</span>
                <span className="metric-value cyan">8.4M</span>
              </div>
            </div>

            <div className="network-graph">
              <svg viewBox="0 0 300 100" className="graph-svg" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--accent-lime)" stopOpacity="0.3"/>
                    <stop offset="100%" stopColor="var(--accent-lime)" stopOpacity="0"/>
                  </linearGradient>
                </defs>
                <polyline points="0,80 30,70 60,85 90,40 120,50 150,20 180,30 210,10 240,40 270,25 300,50" fill="none" stroke="var(--accent-lime)" strokeWidth="2" />
                <polygon points="0,80 30,70 60,85 90,40 120,50 150,20 180,30 210,10 240,40 270,25 300,50 300,100 0,100" fill="url(#gradient)" />
              </svg>
            </div>

            <div className="live-logs">
              <div className="log-header">SYSTEM LOGS</div>
              <div className="log-entry">
                <span className="log-time">14:02:01</span>
                <span className="log-type info">[INFO]</span>
                <span className="log-msg">Node 44-A authenticated via MFA.</span>
              </div>
              <div className="log-entry">
                <span className="log-time">14:02:04</span>
                <span className="log-type warn">[WARN]</span>
                <span className="log-msg">Anomalous traffic detected on port 8080.</span>
              </div>
              <div className="log-entry">
                <span className="log-time">14:02:08</span>
                <span className="log-type info">[INFO]</span>
                <span className="log-msg">Zero-trust handshake completed.</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <section id="about" className="section">
        <div className="section-header">
          <span className="section-tag">// SYSTEM_OVERVIEW</span>
          <h2>About AegisecOS</h2>
        </div>
        <div className="about-grid">
          <div className="about-text">
            <p>
              AegisecOS is a zero‑trust orchestration platform engineered for environments 
              that demand continuous verification and unified visibility. We replace implicit 
              trust with strict, context‑aware access policies, ensuring every connection is 
              authenticated, authorised, and encrypted.
            </p>
            <p>
              Born from the philosophy of “trust nothing, secure everything,” our platform 
              empowers security teams to detect, respond, and adapt in real time — without 
              sacrificing speed or user experience.
            </p>
          </div>
          <div className="system-stats">
            <div className="stat-item">
              <div className="stat-number">99.99<span>%</span></div>
              <div className="stat-label">UPTIME SLA</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">&lt;10<span>ms</span></div>
              <div className="stat-label">VERIFICATION LATENCY</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">0<span>days</span></div>
              <div className="stat-label">STANDING PRIVILEGES</div>
            </div>
          </div>
        </div>
      </section>

      <section id="platform" className="section">
        <div className="section-header">
          <span className="section-tag">// CORE_MODULES</span>
          <h2>Platform Architecture</h2>
        </div>
        <div className="module-grid">
          <div className="module-card">
            <div className="module-header">
              <div className="module-icon">◆</div>
              <h3>Continuous Verification</h3>
            </div>
            <p>Every request is verified — no standing privileges, no assumed trust. Context-aware policies evaluate device health and network location in real-time.</p>
            <div className="module-footer">
              <span className="status-indicator active">ACTIVE</span>
              <div className="progress-bar">
                <div className="progress-fill" style={{width: '100%'}}></div>
              </div>
            </div>
          </div>
          <div className="module-card">
            <div className="module-header">
              <div className="module-icon">⬢</div>
              <h3>Unified Visibility</h3>
            </div>
            <p>Gain a single‑pane‑of‑glass view across all users, devices, and workloads. Correlate telemetry data instantly to identify and isolate anomalies.</p>
            <div className="module-footer">
              <span className="status-indicator active">ACTIVE</span>
              <div className="progress-bar">
                <div className="progress-fill" style={{width: '85%'}}></div>
              </div>
            </div>
          </div>
          <div className="module-card">
            <div className="module-header">
              <div className="module-icon">▲</div>
              <h3>Adaptive Policies</h3>
            </div>
            <p>Context‑based access that adjusts automatically to risk levels. Machine learning models dynamically tighten or relax access based on behavioral baselines.</p>
            <div className="module-footer">
              <span className="status-indicator active">ACTIVE</span>
              <div className="progress-bar">
                <div className="progress-fill" style={{width: '92%'}}></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="pricing" className="section">
        <div className="section-header">
          <span className="section-tag">// ACCESS_TIERS</span>
          <h2>Deployment Models</h2>
        </div>
        <div className="tier-grid">
          <div className="tier-card">
            <div className="tier-header">
              <span className="tier-level">TIER 01</span>
              <h3>Early Access</h3>
            </div>
            <div className="tier-price">INVITE ONLY</div>
            <ul className="tier-features">
              <li><span className="check">✓</span> Core Zero Trust Engine</li>
              <li><span className="check">✓</span> Unified Visibility Dashboard</li>
              <li><span className="check">✓</span> Community Support</li>
            </ul>
            <button className="btn-terminal" disabled>AWAITING CLEARANCE</button>
          </div>
          <div className="tier-card featured">
            <div className="scan-line"></div>
            <div className="tier-header">
              <span className="tier-level">TIER 02</span>
              <h3>Enterprise</h3>
            </div>
            <div className="tier-price">CUSTOM</div>
            <ul className="tier-features">
              <li><span className="check">✓</span> Advanced Threat Detection</li>
              <li><span className="check">✓</span> Adaptive Policy Engine</li>
              <li><span className="check">✓</span> 24/7 Dedicated SOC Support</li>
              <li><span className="check">✓</span> On-Premise Deployment</li>
            </ul>
            <button className="btn-terminal primary" onClick={handleContactSales}>INITIATE CONTACT</button>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-grid">
          <div className="footer-col">
            <h4>AEGISECOS</h4>
            <p>Trust Nothing. Secure Everything.</p>
          </div>
          <div className="footer-col">
            <h4>PROTOCOLS</h4>
            <a href="#about">System Overview</a>
            <a href="#platform">Architecture</a>
            <a href="#pricing">Access Tiers</a>
          </div>
          <div className="footer-col">
            <h4>COMMS</h4>
            <a href="https://github.com" target="_blank" rel="noreferrer">GitHub</a>
            <a href="https://www.linkedin.com/in/aegisecos-undefined-b420b5376/" target="_blank" rel="noreferrer">LinkedIn</a>
            <a href="mailto:contact@aegisecos.com">contact@aegisecos.com</a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>&copy; 2026 AegisecOS. All rights reserved.</span>
          <span className="system-status">SYSTEM STATUS: <span className="green">ONLINE</span></span>
        </div>
      </footer>
    </div>
  );
};

export default App;
