import React, { useState } from 'react';
import './App.css';
import logo from './assets/logo_minimised-removebg-preview.svg';
 
/* ------------------------------------------------------------------
   Site configuration. Edit content here rather than in the markup.
------------------------------------------------------------------- */
const CONTACT_EMAIL = 'contact@aegisecos.tech';
 
// Same-origin endpoint (no cross-origin / wildcard CORS needed).
// The server must validate and sanitise the email, rate-limit requests,
// and treat repeat submissions of the same address as idempotent.
const WAITLIST_ENDPOINT = '/api/waitlist';
 
const SOCIAL_LINKS = [
  { label: 'Facebook', href: 'https://www.facebook.com/profile.php?id=61578836390458' },
  { label: 'TikTok', href: 'https://www.tiktok.com/@aegisecos' },
  { label: 'Instagram', href: 'https://www.instagram.com/aegisecos' },
  { label: 'X', href: 'https://x.com/AegisecOS' },
  { label: 'YouTube', href: 'https://www.youtube.com/channel/UCCV_Erh1bLxW15oLE67xl_g' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/aegisecos-undefined-b420b5376/' },
];
 
const MODULES = [
  {
    title: 'Continuous verification',
    copy: 'Every request is verified with context-aware policy checks across device health, identity, and network location.',
  },
  {
    title: 'Unified visibility',
    copy: 'Correlate users, devices, and workloads in one operational view to surface anomalies before they spread.',
  },
  {
    title: 'Adaptive policies',
    copy: 'Risk-aware access adjusts in real time, tightening controls without slowing down the people doing the work.',
  },
];
 
const STATS = [
  ['99.99%', 'Uptime SLA'],
  ['<10 ms', 'Verification latency'],
  ['0 days', 'Standing privileges'],
];
 
const TIERS = [
  {
    meta: 'Invite only',
    title: 'Early access',
    price: 'Private beta',
    features: ['Core zero-trust engine', 'Unified visibility dashboard', 'Community support'],
    cta: { label: 'Join the waitlist', href: '#contact' },
  },
  {
    meta: 'Custom deployment',
    title: 'Enterprise',
    price: 'Built to scale',
    featured: true,
    features: [
      'Advanced threat detection',
      'Adaptive policy engine',
      '24/7 dedicated SOC support',
      'On-premise deployment',
    ],
    cta: {
      label: 'Contact sales',
      href: `mailto:${CONTACT_EMAIL}?subject=Enterprise%20Inquiry`,
      primary: true,
    },
  },
];
 
// Illustration only. It shows how one access decision is made and is
// labelled as an example on the page, so it is never mistaken for live data.
const DECISION_EXAMPLE = {
  request: [
    ['Subject', 'analyst-014'],
    ['Resource', 'finance-db'],
    ['Action', 'Read'],
  ],
  checks: [
    { name: 'Identity', detail: 'Signed in with MFA', result: 'pass' },
    { name: 'Device', detail: 'Patched and disk-encrypted', result: 'pass' },
    { name: 'Network', detail: 'First sign-in from this location', result: 'review' },
  ],
  outcome: {
    title: 'Step-up required',
    detail: 'The user re-authenticates before access is granted.',
  },
};
 
/* Real people and real customers build trust. These sections only render
   once you add entries, so nothing placeholder ever ships.
   TEAM:          { name, role, bio?, photo?, linkedin? }
   CASE_STUDIES:  { client, title, summary, href } */
const TEAM = [];
const CASE_STUDIES = [];
 
const NAV_LINKS = [
  { label: 'Overview', href: '#overview' },
  { label: 'Platform', href: '#platform' },
  ...(TEAM.length ? [{ label: 'Team', href: '#team' }] : []),
  ...(CASE_STUDIES.length ? [{ label: 'Case studies', href: '#case-studies' }] : []),
  { label: 'Access', href: '#access' },
  { label: 'Contact', href: '#contact' },
];
 
/* ------------------------------------------------------------------
   Small presentational pieces
------------------------------------------------------------------- */
const ICON_PATHS = {
  check: <path d="M5 12l5 5 9-10" />,
  review: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7.5v5.5" />
      <path d="M12 16.5v.01" />
    </>
  ),
};
 
function Icon({ name }) {
  return (
    <svg
      className="icon"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {ICON_PATHS[name]}
    </svg>
  );
}
 
/* Hero artwork: a record of one access decision, read top to bottom as
   request, checks, decision. Plain HTML so it stays sharp and readable. */
function DecisionRecord() {
  const { request, checks, outcome } = DECISION_EXAMPLE;
  return (
    <figure className="record" aria-label="Example of one access decision">
      <figcaption className="record-head">
        <span>Example access decision</span>
        <span className="tag">Illustration</span>
      </figcaption>
 
      <div className="record-block">
        <p className="record-label">Request</p>
        <dl className="record-request">
          {request.map(([term, value]) => (
            <div key={term}>
              <dt>{term}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>
      </div>
 
      <div className="record-block">
        <p className="record-label">Checks</p>
        <ul className="record-checks">
          {checks.map((check) => (
            <li className={`check check-${check.result}`} key={check.name}>
              <Icon name={check.result === 'pass' ? 'check' : 'review'} />
              <div>
                <strong>{check.name}</strong>
                <span>{check.detail}</span>
              </div>
              <span className="check-result">{check.result === 'pass' ? 'Passed' : 'Needs review'}</span>
            </li>
          ))}
        </ul>
      </div>
 
      <div className="record-block record-outcome">
        <p className="record-label">Decision</p>
        <strong>{outcome.title}</strong>
        <p>{outcome.detail}</p>
      </div>
    </figure>
  );
}
 
/* ------------------------------------------------------------------
   App
------------------------------------------------------------------- */
function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle | submitting | success | error
 
  const handleSubmit = async (event) => {
    event.preventDefault();
    const value = email.trim();
    if (!value || status === 'submitting') return;
 
    setStatus('submitting');
    try {
      const response = await fetch(WAITLIST_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: value }),
      });
      if (!response.ok) throw new Error(`Request failed (${response.status})`);
      setStatus('success');
    } catch {
      setStatus('error');
    }
  };
 
  return (
    <div className="app" id="top">
      <a className="skip-link" href="#main">
        Skip to main content
      </a>
 
      <header className="site-header">
        <div className="container header-inner">
          <a className="brand" href="#top" aria-label="AegisecOS home">
            <img src={logo} alt="" width="28" height="28" />
            <span>AegisecOS</span>
          </a>
 
          <button
            type="button"
            className="menu-toggle"
            aria-expanded={menuOpen}
            aria-controls="site-nav"
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? 'Close' : 'Menu'}
          </button>
 
          <nav id="site-nav" className={`site-nav${menuOpen ? ' open' : ''}`} aria-label="Primary">
            <ul>
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a href={link.href} onClick={() => setMenuOpen(false)}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
 
          <a className="btn btn-primary btn-sm header-cta" href="#contact">
            Request access
          </a>
        </div>
      </header>
 
      <main id="main">
        <section className="hero">
          <div className="container hero-grid">
            <div className="hero-copy">
              <h1>Trust nothing. Secure everything.</h1>
              <p className="lead">
                A zero-trust orchestration layer for teams that need total awareness, continuous
                verification, and security that moves at the speed of their business.
              </p>
              <div className="hero-actions">
                <a className="btn btn-primary" href="#contact">
                  Request access
                </a>
                <a className="btn btn-secondary" href="#platform">
                  See how it works
                </a>
              </div>
              <p className="hero-note">Private beta, version 0.1.0.</p>
            </div>
            <DecisionRecord />
          </div>
        </section>
 
        <section className="strip" aria-label="Key figures">
          <dl className="container strip-grid">
            {STATS.map(([value, label]) => (
              <div className="stat" key={label}>
                <dt>{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
        </section>
 
        <section id="overview" className="section">
          <div className="container split">
            <h2>Security without blind spots.</h2>
            <div className="prose">
              <p>
                AegisecOS replaces implicit trust with strict, context-aware access policies. Every
                connection is authenticated, authorized, and encrypted — continuously.
              </p>
              <p>
                Built for modern environments, our platform gives security teams a clear signal
                through the noise, so they can detect, respond, and adapt in real time.
              </p>
            </div>
          </div>
        </section>
 
        <section id="platform" className="section">
          <div className="container">
            <div className="split split-head">
              <h2>One control plane. Every signal.</h2>
              <p className="muted">Three primitives for a security posture that stays ahead of risk.</p>
            </div>
            <dl className="defs">
              {MODULES.map((module) => (
                <div className="def" key={module.title}>
                  <dt>{module.title}</dt>
                  <dd>{module.copy}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>
 
        {TEAM.length > 0 && (
          <section id="team" className="section">
            <div className="container">
              <div className="split split-head">
                <h2>The people behind AegisecOS.</h2>
              </div>
              <ul className="team-grid">
                {TEAM.map((member) => (
                  <li className="panel" key={member.name}>
                    {member.photo && (
                      <img className="team-photo" src={member.photo} alt={`Portrait of ${member.name}`} />
                    )}
                    <h3>{member.name}</h3>
                    <p className="muted">{member.role}</p>
                    {member.bio && <p className="muted">{member.bio}</p>}
                    {member.linkedin && (
                      <a href={member.linkedin} target="_blank" rel="noopener noreferrer">
                        LinkedIn
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}
 
        {CASE_STUDIES.length > 0 && (
          <section id="case-studies" className="section">
            <div className="container">
              <div className="split split-head">
                <h2>Results from real deployments.</h2>
              </div>
              <ul className="team-grid">
                {CASE_STUDIES.map((study) => (
                  <li className="panel" key={study.title}>
                    <p className="muted">{study.client}</p>
                    <h3>{study.title}</h3>
                    <p className="muted">{study.summary}</p>
                    <a href={study.href}>Read the case study</a>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}
 
        <section id="access" className="section">
          <div className="container">
            <div className="split split-head">
              <h2>Deploy on your terms.</h2>
            </div>
            <div className="tiers">
              {TIERS.map((tier) => (
                <article className={`panel tier${tier.featured ? ' featured' : ''}`} key={tier.title}>
                  <p className="tier-meta">
                    <span>{tier.meta}</span>
                    {tier.featured && <span className="tag">Recommended</span>}
                  </p>
                  <h3>{tier.title}</h3>
                  <p className="muted">{tier.price}</p>
                  <ul className="feature-list">
                    {tier.features.map((feature) => (
                      <li key={feature}>
                        <Icon name="check" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <a
                    className={`btn ${tier.cta.primary ? 'btn-primary' : 'btn-secondary'}`}
                    href={tier.cta.href}
                  >
                    {tier.cta.label}
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>
 
        <section id="contact" className="section">
          <div className="container split">
            <div>
              <h2>Request early access.</h2>
              <p className="muted contact-copy">
                Leave your work email and we will follow up as access opens. For enterprise or
                security questions, email us directly.
              </p>
              <p>
                <a className="contact-email" href={`mailto:${CONTACT_EMAIL}`}>
                  {CONTACT_EMAIL}
                </a>
              </p>
            </div>
 
            <div className="panel form-panel">
              {status === 'success' ? (
                <div role="status">
                  <h3>Access requested</h3>
                  <p className="muted">
                    We will contact you at <strong>{email.trim()}</strong> when early access opens.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <label htmlFor="work-email">Work email</label>
                  <input
                    id="work-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="name@company.com"
                    maxLength={254}
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    required
                  />
                  <button className="btn btn-primary" type="submit" disabled={status === 'submitting'}>
                    {status === 'submitting' ? 'Sending…' : 'Request access'}
                  </button>
                  {status === 'error' && (
                    <p className="form-error" role="alert">
                      Your request did not send. Check your connection and try again, or email{' '}
                      <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
                    </p>
                  )}
                </form>
              )}
            </div>
          </div>
        </section>
      </main>
 
      <footer className="site-footer">
        <div className="container footer-grid">
          <div>
            <a className="brand" href="#top" aria-label="AegisecOS home">
              <img src={logo} alt="" width="28" height="28" />
              <span>AegisecOS</span>
            </a>
            <p className="muted">Trust nothing. Secure everything.</p>
          </div>
 
          <div>
            <h4>Navigate</h4>
            <ul>
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
          </div>
 
          <div>
            <h4>Contact</h4>
            <ul>
              <li>
                <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
              </li>
            </ul>
          </div>
 
          <div>
            <h4>Follow</h4>
            <ul>
              {SOCIAL_LINKS.map((link) => (
                <li key={link.label}>
                  <a href={link.href} target="_blank" rel="noopener noreferrer">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
 
        <div className="container footer-bottom">
          <span>© {new Date().getFullYear()} AegisecOS. All rights reserved.</span>
        </div>
      </footer>
    </div>
  );
}
 
export default App;
 
