import React, { useState } from 'react';
import './App.css';
// PLACE YOUR LOGO IMAGE (e.g., logo.svg or logo.png with background removed)
// IN AN ASSETS FOLDER AND IMPORT IT HERE:
import logo from './assets/logo.svg'; // Example path

const App = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      // Integration logic for Mailchimp/Resend would go here
    }
  };

  return (
    <div className="app-container">
      {/* Navigation */}
      <nav className="navbar">
        {/* NEW LOGO INTEGRATION */}
        <div className="logo">
          <img src={logo} alt="AegisecOS Logo" className="logo-img" />
          <span className="logo-text">AEGISEC<span className="highlight">OS</span></span>
        </div>
        
        <div className="nav-links">
          <a href="#about">About</a>
          <a href="#platform">Platform</a>
          <a href="#pricing">Pricing</a>
          <button className="btn-secondary">Login</button>
          <button className="btn-primary">Get Access</button>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="hero">
        <div className="status-badge">
          <span className="pulse"></span> v0.1.0 Early Access Phase
        </div>
        <h1>Trust Nothing. <br /><span className="gradient-text">Secure Everything.</span></h1>
        <p className="hero-subtitle">
          The Zero Trust orchestration platform providing unified visibility and continuous 
          verification. Inspired by total awareness, built for ethical security.
        </p>
        
        <form className="waitlist-form" onSubmit={handleSubmit}>
          {submitted ? (
            <div className="success-message">You're on the list. Welcome to the breach-less future.</div>
          ) : (
            <>
              <input 
                type="email" 
                placeholder="Enter your work email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required 
              />
              <button type="submit" className="btn-primary">Request Early Access</button>
            </>
          )}
        </form>
      </header>

      {/* Features Section */}
      <section id="platform" className="features">
        <div className="section-header">
          <h2>System Awareness Without Assumption</h2>
          <p>Moving beyond fragmented tools into a unified security layer.</p>
        </div>
        
        <div className="feature-grid">
          <div className="feature-card lime-border">
            <div className="icon violet-text">◈</div>
            <h3>Continuous Verification</h3>
            <p>Never trust, always verify. Every request is authenticated and authorized in real-time.</p>
          </div>
          <div className="feature-card fuchsia-border">
            <div className="icon orange-text">◎</div>
            <h3>Total Visibility</h3>
            <p>Real-time system awareness across your entire stack. No blind spots, no surprises.</p>
          </div>
          <div className="feature-card orange-border">
            <div className="icon lime-text">⧉</div>
            <h3>Adaptive Control</h3>
            <p>Security that scales with your team, from seed-stage startups to growing SMEs.</p>
          </div>
        </div>
      </section>

      {/* About/CTA Section */}
      <section id="about" className="cta-section">
        <div className="glass-panel">
          <h2>The Ethical ctOS</h2>
          <p>
            AegisecOS replaces blind control with security-first design. 
            We provide the "God view" of your infrastructure, but with the 
            guardrails needed to keep data private and systems resilient.
          </p>
          <div className="social-links">
            <a href="https://github.com">GitHub</a>
            <a href="https://linkedin.com">LinkedIn</a>
            <a href="mailto:contact@aegisecos.com">Contact</a>
          </div>
        </div>
      </section>

      <footer className="footer">
        <p>&copy; 2026 AegisecOS. All rights reserved. / Security That Verifies, Not Assumes.</p>
      </footer>
    </div>
  );
};

export default App;
