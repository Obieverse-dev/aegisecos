import React, { useState } from 'react';
import './App.css';
import logo from './assets/logo.svg';

const modules = [
  { icon: '◈', title: 'Continuous verification', copy: 'Every request is verified with context-aware policy checks across device health, identity, and network location.', value: '100%' },
  { icon: '⌁', title: 'Unified visibility', copy: 'Correlate users, devices, and workloads in one operational view to surface anomalies before they spread.', value: '85%' },
  { icon: '△', title: 'Adaptive policies', copy: 'Risk-aware access adjusts in real time, tightening controls without slowing down the people doing the work.', value: '92%' },
];

const logs = [
  ['14:02:01', 'INFO', 'Node 44-A authenticated via MFA.'],
  ['14:02:04', 'WARN', 'Anomalous traffic detected on port 8080.'],
  ['14:02:08', 'INFO', 'Zero-trust handshake completed.'],
];

function Button({ children, primary = false, onClick, disabled = false }) {
  return <button className={`button ${primary ? 'button-primary' : ''}`} onClick={onClick} disabled={disabled}>{children}<span aria-hidden="true">↗</span></button>;
}

function TelemetryPanel() {
  return (
    <aside className="telemetry-panel" aria-label="Live security telemetry">
      <div className="panel-header"><span className="live-dot" /> LIVE TELEMETRY <span className="panel-status">SECURE / 24.7</span></div>
      <div className="metrics-grid">
        <div><span className="metric-label">THREAT LEVEL</span><strong className="metric-value success-text">LOW</strong></div>
        <div><span className="metric-label">ACTIVE NODES</span><strong className="metric-value">14,092</strong></div>
        <div><span className="metric-label">PACKETS / SEC</span><strong className="metric-value cyan-text">8.4M</strong></div>
      </div>
      <div className="network-graph">
        <div className="graph-label"><span>NETWORK ACTIVITY</span><span>LAST 60 MIN</span></div>
        <svg viewBox="0 0 400 140" preserveAspectRatio="none" role="img" aria-label="Network activity graph"><defs><linearGradient id="area" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#b7f34a" stopOpacity=".35" /><stop offset="1" stopColor="#b7f34a" stopOpacity="0" /></linearGradient></defs><path d="M0 108 L38 96 L76 112 L112 62 L150 74 L188 40 L226 57 L264 22 L302 65 L340 42 L400 75 V140 H0Z" fill="url(#area)" /><polyline points="0,108 38,96 76,112 112,62 150,74 188,40 226,57 264,22 302,65 340,42 400,75" fill="none" stroke="#a78bfa" strokeWidth="2.5" /></svg>
      </div>
      <div className="live-logs"><div className="log-header">SYSTEM LOGS <span>STREAMING</span></div>{logs.map(([time, type, message]) => <div className="log-entry" key={time}><span className="log-time">{time}</span><span className={`log-type ${type.toLowerCase()}`}>[{type}]</span><span>{message}</span></div>)}</div>
    </aside>
  );
}

function App() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const handleSubmit = (event) => { event.preventDefault(); if (email.trim()) setSubmitted(true); };
  const scrollToWaitlist = () => document.querySelector('.terminal-card')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  const handleContactSales = () => { window.location.href = 'mailto:sales@aegisecos.com?subject=Enterprise%20Inquiry'; };

  return <div className="app-container">
    <nav className="navbar"><a className="brand" href="#top" aria-label="AegisecOS home"><img src={logo} alt="" /><span>AEGIS<span>ECOS</span></span></a><div className="nav-links"><a href="#about">Overview</a><a href="#platform">Architecture</a><a href="#pricing">Access tiers</a><button className="login-button" onClick={() => alert('Login coming soon')}>Login <span>↗</span></button></div></nav>
    <main id="top">
      <section className="hero"><div className="hero-copy"><div className="eyebrow"><span className="live-dot" /> v0.1.0 / EARLY ACCESS PHASE</div><h1>Trust nothing.<br /><em>Secure everything.</em></h1><p className="hero-subtitle">A zero-trust orchestration layer for teams that need total awareness, continuous verification, and security that moves at the speed of their business.</p><div className="hero-actions"><Button primary onClick={scrollToWaitlist}>Request access</Button><a className="text-link" href="#platform">Explore the platform <span>↓</span></a></div><div className="terminal-card"><div className="terminal-header"><span className="window-dots"><i /><i /><i /></span><span>access_request.sh</span><span className="terminal-lock">ENCRYPTED</span></div><div className="terminal-body"><div><span className="prompt">root@aegisecos:~$</span> request_early_access</div>{submitted ? <div className="terminal-success"><span className="prompt">&gt;</span> Access granted. You are on the waitlist.</div> : <form onSubmit={handleSubmit}><div><span className="prompt">&gt;</span> Enter work email:</div><div className="input-row"><span className="prompt">&gt;</span><input type="email" placeholder="name@company.com" value={email} onChange={(event) => setEmail(event.target.value)} required aria-label="Work email" /><button type="submit">Execute <span>↗</span></button></div></form>}</div></div></div><TelemetryPanel /></section>
      <section id="about" className="section overview"><div className="section-heading"><span className="section-tag">01 / SYSTEM OVERVIEW</span><h2>Security without<br /><span>blind spots.</span></h2></div><div className="overview-content"><div><p>AegisecOS replaces implicit trust with strict, context-aware access policies. Every connection is authenticated, authorized, and encrypted — continuously.</p><p>Built for modern environments, our platform gives security teams a clear signal through the noise, so they can detect, respond, and adapt in real time.</p></div><div className="stats"><div><strong>99.99<small>%</small></strong><span>UPTIME SLA</span></div><div><strong>&lt;10<small>ms</small></strong><span>VERIFICATION LATENCY</span></div><div><strong>0<small>days</small></strong><span>STANDING PRIVILEGES</span></div></div></div></section>
      <section id="platform" className="section"><div className="section-heading split-heading"><div><span className="section-tag">02 / CORE MODULES</span><h2>One control plane.<br /><span>Every signal.</span></h2></div><p>Three primitives for a security posture that stays ahead of risk.</p></div><div className="module-grid">{modules.map((module, index) => <article className="module-card" key={module.title}><div className="module-top"><span className="module-icon">{module.icon}</span><span className="module-index">0{index + 1}</span></div><h3>{module.title}</h3><p>{module.copy}</p><div className="module-footer"><span>OPERATIONAL</span><div className="progress"><i style={{ width: module.value }} /></div><b>{module.value}</b></div></article>)}</div></section>
      <section id="pricing" className="section pricing"><div className="section-heading"><span className="section-tag">03 / ACCESS TIERS</span><h2>Deploy on<br /><span>your terms.</span></h2></div><div className="tier-grid"><article className="tier-card"><span className="tier-level">TIER 01 / INVITE ONLY</span><h3>Early access</h3><strong>Private beta</strong><ul><li>Core zero-trust engine</li><li>Unified visibility dashboard</li><li>Community support</li></ul><Button disabled>Awaiting clearance</Button></article><article className="tier-card featured"><span className="featured-label">RECOMMENDED</span><span className="tier-level">TIER 02 / CUSTOM DEPLOYMENT</span><h3>Enterprise</h3><strong>Built to scale</strong><ul><li>Advanced threat detection</li><li>Adaptive policy engine</li><li>24/7 dedicated SOC support</li><li>On-premise deployment</li></ul><Button primary onClick={handleContactSales}>Initiate contact</Button></article></div></section>
    </main>
    <footer className="footer"><div className="footer-grid"><div><a className="brand" href="#top"><img src={logo} alt="" /><span>AEGIS<span>ECOS</span></span></a><p>Trust nothing. Secure everything.</p></div><div><h4>Protocols</h4><a href="#about">System overview</a><a href="#platform">Architecture</a><a href="#pricing">Access tiers</a></div><div><h4>Comms</h4><a href="https://github.com" target="_blank" rel="noreferrer">GitHub</a><a href="https://www.linkedin.com/in/aegisecos-undefined-b420b5376/" target="_blank" rel="noreferrer">LinkedIn</a><a href="mailto:contact@aegisecos.com">contact@aegisecos.com</a></div></div><div className="footer-bottom"><span>© 2026 AegisecOS. All rights reserved.</span><span>SYSTEM STATUS: <b>ONLINE</b></span></div></footer>
  </div>;
}

export default App;
