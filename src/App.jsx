import React, { useState } from 'react';
import './App.css';
import logo from './assets/logo.svg';

const App = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  // Scrolls to the waitlist card smoothly
  const scrollToWaitlist = () => {
    const card = document.querySelector('.waitlist-card');
    if (card) card.scrollIntoView({ behavior: 'smooth' });
  };

  // Opens the user’s email client, or shows an alert if that fails
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
          <a href="#about">About</a>
          <a href="#platform">Platform</a>
          <a href="#pricing">Pricing</a>
          <button className="btn-secondary" onClick={() => alert('Login coming soon')}>Login</button>
          {/* Removed the “Get Access” nav button – now a hero CTA */}
        </div>
      </nav>

      <header className="hero">
        <div className="hero-content">
          <div className="status-badge">v0.1.0 Early Access Phase</div>
          <h1>Trust Nothing. <br /><span className="gradient-text">Secure Everything.</span></h1>
          <p className="hero-subtitle">
            The Zero Trust orchestration platform providing unified visibility and continuous 
            verification. Inspired by total awareness, built for ethical security.
          </p>

          {/* Prominent centred CTA */}
          <button className="btn-primary hero-cta" onClick={scrollToWaitlist}>
            Get Access
          </button>

          <div className="waitlist-card">
            <h3>Join the Waitlist</h3>
            <form className="waitlist-form" onSubmit={handleSubmit}>
              {submitted ? (
                <div className="success-message">You're on the list.</div>
              ) : (
                <>
                  <div className="input-group">
                    <label>Work Email *</label>
                    <input 
                      type="email" 
                      placeholder="name@company.com" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required 
                    />
                  </div>
                  <button type="submit" className="btn-primary full-width">Request Early Access</button>
                </>
              )}
            </form>
          </div>
        </div>
      </header>

      {/* About section with real content */}
      <section id="about" className="content-section">
        <h2>About AegisecOS</h2>
        <p>
          AegisecOS is a zero‑trust orchestration platform designed for organisations 
          that demand continuous verification and unified visibility. We replace implicit 
          trust with strict, context‑aware access policies, ensuring every connection is 
          authenticated, authorised, and encrypted.
        </p>
        <p>
          Born from the philosophy of “trust nothing, secure everything,” our platform 
          empowers security teams to detect, respond, and adapt in real time — without 
          sacrificing speed or user experience.
        </p>
      </section>

      {/* Platform section with real content */}
      <section id="platform" className="content-section">
        <h2>Platform Features</h2>
        <div className="feature-grid">
          <div className="feature">
            <h3>Continuous Verification</h3>
            <p>Every request is verified — no standing privileges, no assumed trust.</p>
          </div>
          <div className="feature">
            <h3>Unified Visibility</h3>
            <p>Gain a single‑pane‑of‑glass view across all users, devices, and workloads.</p>
          </div>
          <div className="feature">
            <h3>Adaptive Policies</h3>
            <p>Context‑based access that adjusts automatically to risk levels.</p>
          </div>
        </div>
      </section>

      <section id="pricing" className="pricing-section">
        <h2>Pricing Plans</h2>
        <div className="pricing-grid">
          <div className="price-card">
            <h3>Early Access</h3>
            <div className="price">Invite Only</div>
            <ul>
              <li>Core Zero Trust Engine</li>
              <li>Unified Visibility</li>
            </ul>
            <button className="btn-secondary" disabled>Coming Soon</button>
          </div>
          <div className="price-card featured">
            <h3>Enterprise</h3>
            <div className="price">Custom</div>
            <ul>
              <li>Advanced Threat Detection</li>
              <li>24/7 Support</li>
            </ul>
            <button className="btn-primary" onClick={handleContactSales}>
              Contact Sales
            </button>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-links">
          <a href="https://github.com">GitHub</a>
          <a href="https://www.linkedin.com/in/aegisecos-undefined-b420b5376/" target="_blank" rel="noreferrer">LinkedIn</a>
          <a href="mailto:contact@aegisecos.com">Contact</a>
        </div>
        <p>&copy; 2026 AegisecOS. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default App;
