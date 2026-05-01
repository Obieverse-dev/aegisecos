import React, { useState } from 'react';
import './App.css';
// Ensure this filename matches exactly what is in your src/assets folder
import logo from './assets/logo.svg'; 

const App = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
    }
  };

  return (
    <div className="app-container">
      {/* Navigation */}
      <nav className="navbar">
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
        <div className="hero-content">
          <div className="status-badge">
            <span className="pulse"></span> v0.1.0 Early Access Phase
          </div>
          <h1>Trust Nothing. <br /><span className="gradient-text">Secure Everything.</span></h1>
          <p className="hero-subtitle">
            The Zero Trust orchestration platform providing unified visibility and continuous 
            verification. Inspired by total awareness, built for ethical security.
          </p>
          
          <div className="waitlist-card">
            <h3>Join the Waitlist</h3>
            <form className="waitlist-form" onSubmit={handleSubmit}>
              {submitted ? (
                <div className="success-message">You're on the list. Welcome to the breach-less future.</div>
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

      {/* Pricing Section */}
      <section id="pricing" className="pricing-section">
        <div className="section-header">
          <h2>Pricing Plans</h2>
          <p>Simple, scalable security for every stage of growth.</p>
        </div>
        <div className="pricing-grid">
          <div className="price-card">
            <h3>Early Access</h3>
            <div className="price">Invite Only</div>
            <ul>
              <li>Core Zero Trust Engine</li>
              <li>Unified Visibility</li>
              <li>Standard Analytics</li>
            </ul>
            <button className="btn-secondary">Coming Soon</button>
          </div>
          <div className="price-card featured">
            <div className="badge">Recommended</div>
            <h3>Enterprise</h3>
            <div className="price">Custom</div>
            <ul>
              <li>Advanced Threat Detection</li>
              <li>Custom Integrations</li>
              <li>24/7 Security Support</li>
            </ul>
            <button className="btn-primary">Contact Sales</button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-links">
          <a href="https://github.com">GitHub</a>
          <a href="https://www.linkedin.com/in/aegisecos-undefined-b420b5376/" target="_blank" rel="noreferrer">LinkedIn</a>
          <a href="mailto:contact@aegisecos.com">Contact</a>
        </div>
        <p>&copy; 2026 AegisecOS. All rights reserved. / Awareness Without Assumption.</p>
      </footer>
    </div>
  );
};

export default App;
