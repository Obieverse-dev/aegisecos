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

  // Scrolls to the waitlist card when "Get Access" is clicked
  const scrollToWaitlist = () => {
    const card = document.querySelector('.waitlist-card');
    if (card) card.scrollIntoView({ behavior: 'smooth' });
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
          <button className="btn-primary" onClick={scrollToWaitlist}>Get Access</button>
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

      {/* Added sections with matching ids for nav links */}
      <section id="about" className="placeholder-section">
        <h2>About AegisecOS</h2>
        <p>Detailed information about the platform will appear here.</p>
      </section>

      <section id="platform" className="placeholder-section">
        <h2>Platform Features</h2>
        <p>Explore the core capabilities of AegisecOS.</p>
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
            <button 
              className="btn-primary" 
              onClick={() => window.location.href = 'mailto:sales@aegisecos.com'}
            >
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
