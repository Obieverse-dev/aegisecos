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
 
// Hero rail. Each item should describe something the product really does.
const CAPABILITIES = [
  { icon: 'zero', title: 'Zero trust', detail: 'No unauthorized access.' },
  { icon: 'lock', title: 'Encryption', detail: 'Data stays yours.' },
  { icon: 'eye', title: 'Anonymity', detail: 'Your identity. Hidden.' },
  { icon: 'device', title: 'Device bound', detail: 'Protection that travels with you.' },
];
 
// Hero side panel, taken from the overview copy further down the page.
const ASSURANCES = [
  'Authenticated on every request',
  'Authorized by context',
  'Encrypted, continuously',
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
 
/* Real people and real customers build trust. These sections only render
   once you add entries, so nothing placeholder ever ships.
   TEAM:          { name, role, bio?, photo?, linkedin? }
   CASE_STUDIES:  { client, title, summary, href } */
const TEAM = [];
const CASE_STUDIES = [];
 
const NAV_LINKS = [
  { label: 'Home', href: '#top' },
  { label: 'Platform', href: '#platform' },
  { label: 'About', href: '#about' },
  ...(TEAM.length ? [{ label: 'Team', href: '#team' }] : []),
  ...(CASE_STUDIES.length ? [{ label: 'Case studies', href: '#case-studies' }] : []),
  { label: 'Access', href: '#access' },
  { label: 'Contact', href: '#contact' },
];
 
/* ------------------------------------------------------------------
   Small presentational pieces
------------------------------------------------------------------- */
const ICON_PATHS = {
  zero: (
    <>
      <path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6z" />
      <path d="M9 12l2 2 4-4" />
    </>
  ),
  lock: (
    <>
      <rect x="5" y="11" width="14" height="9" rx="2" />
      <path d="M8 11V8a4 4 0 0 1 8 0v3" />
    </>
  ),
  eye: (
    <>
      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z" />
      <circle cx="12" cy="12" r="3" />
      <path d="M4 20L20 4" />
    </>
  ),
  device: (
    <>
      <rect x="7" y="3" width="10" height="18" rx="2" />
      <path d="M11 18h2" />
    </>
  ),
  check: <path d="M5 12l5 5 9-10" />,
};
 
function Icon({ name }) {
  return (
    <svg
      className="icon"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {ICON_PATHS[name]}
    </svg>
  );
}
 
function Brand({ tagline = false }) {
  return (
    <a className="brand" href="#top" aria-label="AegisecOS home">
      <img src={logo} alt="" width="36" height="36" />
      <span className="brand-text">
        <strong>AegisecOS</strong>
        {tagline && <small>Watchful eye, reimagined.</small>}
      </span>
    </a>
  );
}
 
/* Hero artwork: the AegisecOS mark in a medallion, inside a protective
   dome and an orbital ring. Static and decorative. */
function Emblem() {
  return (
    <div className="emblem" aria-hidden="true">
      <svg viewBox="0 0 640 380" focusable="false">
        <defs>
          <radialGradient id="glowFill" cx="50%" cy="50%" r="50%">
            <stop offset="0" stopColor="#27e481" stopOpacity="0.35" />
            <stop offset="1" stopColor="#27e481" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="domeFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#27e481" stopOpacity="0.02" />
            <stop offset="1" stopColor="#27e481" stopOpacity="0.14" />
          </linearGradient>
          <radialGradient id="coreFill" cx="50%" cy="40%" r="65%">
            <stop offset="0" stopColor="#0f4a2d" />
            <stop offset="1" stopColor="#051610" />
          </radialGradient>
          <radialGradient id="groundFill" cx="50%" cy="50%" r="50%">
            <stop offset="0" stopColor="#27e481" stopOpacity="0.28" />
            <stop offset="1" stopColor="#27e481" stopOpacity="0" />
          </radialGradient>
        </defs>
 
        {/* Ground */}
        <ellipse cx="320" cy="338" rx="300" ry="34" fill="url(#groundFill)" />
        <ellipse cx="320" cy="338" rx="230" ry="20" fill="none" stroke="#27e481" strokeOpacity="0.28" />
        <ellipse cx="320" cy="338" rx="160" ry="13" fill="none" stroke="#27e481" strokeOpacity="0.22" />
 
        {/* Dome */}
        <path
          d="M100 338A220 250 0 0 1 540 338Z"
          fill="url(#domeFill)"
          stroke="#27e481"
          strokeOpacity="0.4"
          strokeWidth="1.5"
        />
        <path d="M130 338A190 215 0 0 1 510 338" fill="none" stroke="#27e481" strokeOpacity="0.2" />
 
        {/* Glow and ring (back half) */}
        <circle cx="320" cy="215" r="150" fill="url(#glowFill)" />
        <ellipse cx="320" cy="215" rx="190" ry="42" fill="none" stroke="#27e481" strokeOpacity="0.25" />
        <ellipse cx="320" cy="215" rx="175" ry="36" fill="none" stroke="#27e481" strokeOpacity="0.75" strokeWidth="3" />
 
        {/* Stem to the ground */}
        <path d="M320 299V332" stroke="#27e481" strokeOpacity="0.35" />
 
        {/* Medallion and mark */}
        <circle cx="320" cy="215" r="84" fill="url(#coreFill)" stroke="#27e481" strokeOpacity="0.6" strokeWidth="1.5" />
        <circle cx="320" cy="215" r="68" fill="none" stroke="#27e481" strokeOpacity="0.25" />
        <image href={logo} x="268" y="163" width="104" height="104" preserveAspectRatio="xMidYMid meet" />
 
        {/* Ring (front half) and nodes */}
        <path d="M145 215A175 36 0 0 0 495 215" fill="none" stroke="#27e481" strokeOpacity="0.95" strokeWidth="3" />
        <circle cx="145" cy="215" r="4" fill="#27e481" />
        <circle cx="495" cy="215" r="4" fill="#27e481" />
        <circle cx="320" cy="251" r="4" fill="#27e481" />
      </svg>
    </div>
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
          <Brand tagline />
 
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
            Get started
          </a>
        </div>
      </header>
 
      <main id="main">
        <section className="hero">
          <div className="container">
            <div className="hero-copy">
              <p className="badge">Next-gen security OS</p>
              <h1>
                <span>More than security.</span>
                <span className="accent">Total control.</span>
              </h1>
              <p className="lead">
                AegisecOS blends zero trust, advanced encryption and intelligent privacy layers —
                giving you the freedom to move, work and explore without limits.
              </p>
              <div className="hero-actions">
                <a className="btn btn-primary" href="#platform">
                  Explore AegisecOS
                </a>
                <a className="btn btn-secondary" href="#about">
                  Read the overview
                </a>
              </div>
            </div>
 
            <div className="stage">
              <aside className="panel rail" aria-label="Core capabilities">
                <ul>
                  {CAPABILITIES.map((item) => (
                    <li key={item.title}>
                      <a className="rail-item" href="#platform">
                        <span className="rail-icon">
                          <Icon name={item.icon} />
                        </span>
                        <span>
                          <strong>{item.title}</strong>
                          <span className="rail-detail">{item.detail}</span>
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </aside>
 
              <Emblem />
 
              <aside className="panel assurances" aria-label="Built into every connection">
                <p className="panel-title">Built into every connection</p>
                <ul>
                  {ASSURANCES.map((line) => (
                    <li key={line}>
                      <Icon name="check" />
                      {line}
                    </li>
                  ))}
                </ul>
              </aside>
            </div>
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
 
        <section id="about" className="section">
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
              <ul className="card-grid">
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
              <ul className="card-grid">
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
            <Brand />
            <p className="muted">Watchful eye, reimagined.</p>
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
 
