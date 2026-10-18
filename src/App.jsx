

App · JSX
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
    icon: 'verify',
    title: 'Continuous verification',
    copy: 'Every request is verified with context-aware policy checks across device health, identity, and network location.',
  },
  {
    icon: 'visibility',
    title: 'Unified visibility',
    copy: 'Correlate users, devices, and workloads in one operational view to surface anomalies before they spread.',
  },
  {
    icon: 'policy',
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
  verify: (
    <>
      <path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6z" />
      <path d="M9 12l2 2 4-4" />
    </>
  ),
  visibility: (
    <>
      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z" />
      <circle cx="12" cy="12" r="3" />
    </>
  ),
  policy: (
    <>
      <path d="M4 7h10M18 7h2M4 17h2M10 17h10" />
      <circle cx="16" cy="7" r="2" />
      <circle cx="8" cy="17" r="2" />
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
 
function Arrow() {
  return (
    <svg className="btn-arrow" viewBox="0 0 16 16" aria-hidden="true" focusable="false">
      <path d="M3 8h10M9 4l4 4-4 4" />
    </svg>
  );
}
 
/* Static, decorative hero graphic: a shield inside a dial, with circuit
   traces and four labelled nodes. No animation. */
function HeroVisual() {
  const cx = 600;
  const cy = 190;
  const ticks = Array.from({ length: 48 }, (_, i) => {
    const angle = (i / 48) * Math.PI * 2;
    const innerRadius = i % 4 === 0 ? 108 : 112;
    return {
      x1: (cx + Math.cos(angle) * 120).toFixed(2),
      y1: (cy + Math.sin(angle) * 120).toFixed(2),
      x2: (cx + Math.cos(angle) * innerRadius).toFixed(2),
      y2: (cy + Math.sin(angle) * innerRadius).toFixed(2),
    };
  });
 
  const nodes = [
    [330, 120, 'Identity'],
    [360, 270, 'Device'],
    [870, 120, 'Network'],
    [840, 270, 'Data'],
  ];
 
  return (
    <div className="hero-visual" aria-hidden="true">
      <svg viewBox="0 0 1200 320" focusable="false">
        <defs>
          <linearGradient id="traceFade" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="470" y2="0">
            <stop offset="0" stopColor="#10c46a" stopOpacity="0" />
            <stop offset="1" stopColor="#10c46a" stopOpacity="0.55" />
          </linearGradient>
          <linearGradient id="shieldFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#f1f6f2" />
            <stop offset="1" stopColor="#8fa296" />
          </linearGradient>
          <radialGradient id="coreFill" cx="50%" cy="40%" r="60%">
            <stop offset="0" stopColor="#15402a" />
            <stop offset="1" stopColor="#071510" />
          </radialGradient>
 
          {/* Left-hand traces; the right side is a mirrored copy. */}
          <g id="hero-traces">
            <g fill="none" stroke="url(#traceFade)" strokeWidth="1.5">
              <path d="M0 190H470" />
              <path d="M0 120H80L120 160H250L280 190" />
              <path d="M0 250H100L140 220H260L290 190" />
              <path d="M0 70H150L200 120H316" />
              <path d="M0 300H150L180 270H346" />
              <path d="M344 120H400L440 160L470 190" />
              <path d="M374 270H390L470 190" />
            </g>
            <g fill="#10c46a" fillOpacity="0.7" stroke="none">
              <circle cx="120" cy="160" r="2.5" />
              <circle cx="140" cy="220" r="2.5" />
              <circle cx="250" cy="160" r="2.5" />
              <circle cx="260" cy="220" r="2.5" />
              <circle cx="80" cy="120" r="2.5" />
              <circle cx="100" cy="250" r="2.5" />
            </g>
          </g>
        </defs>
 
        <use href="#hero-traces" />
        <use href="#hero-traces" transform="translate(1200 0) scale(-1 1)" />
 
        <circle cx={cx} cy={cy} r="130" fill="#050b08" stroke="#10c46a" strokeOpacity="0.25" />
        <circle cx={cx} cy={cy} r="100" fill="#08130e" stroke="#10c46a" strokeOpacity="0.3" />
        {ticks.map((t, i) => (
          <line key={i} {...t} stroke="#10c46a" strokeOpacity="0.45" strokeWidth="1.5" />
        ))}
        <circle cx={cx} cy={cy} r="74" fill="url(#coreFill)" stroke="#10c46a" strokeOpacity="0.5" />
 
        <path
          d="M600 150L636 162V190C636 214 620 228 600 236C580 228 564 214 564 190V162Z"
          fill="url(#shieldFill)"
        />
        <path
          d="M586 192l10 10 20-22"
          fill="none"
          stroke="#0b2a1a"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
 
        {nodes.map(([x, y, label]) => (
          <g key={label}>
            <circle cx={x} cy={y} r="14" fill="#0b1511" stroke="#10c46a" strokeOpacity="0.45" />
            <circle cx={x} cy={y} r="3" fill="#10c46a" />
            <text x={x} y={y + 34} textAnchor="middle">
              {label}
            </text>
          </g>
        ))}
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
          <div className="container">
            <p className="badge">Zero-trust security · Early access</p>
            <h1>Trust nothing. Secure everything.</h1>
            <p className="lead">
              A zero-trust orchestration layer for teams that need total awareness, continuous
              verification, and security that moves at the speed of their business.
            </p>
            <div className="hero-actions">
              <a className="btn btn-primary" href="#contact">
                Request access <Arrow />
              </a>
              <a className="btn btn-secondary" href="#platform">
                Explore the platform
              </a>
            </div>
          </div>
          <HeroVisual />
        </section>
 
        <section id="overview" className="section">
          <div className="container overview-grid">
            <div>
              <p className="eyebrow">Overview</p>
              <h2>Security without blind spots.</h2>
              <p className="muted">
                AegisecOS replaces implicit trust with strict, context-aware access policies. Every
                connection is authenticated, authorized, and encrypted — continuously.
              </p>
              <p className="muted">
                Built for modern environments, our platform gives security teams a clear signal
                through the noise, so they can detect, respond, and adapt in real time.
              </p>
            </div>
            <dl className="stats">
              {STATS.map(([value, label]) => (
                <div className="stat" key={label}>
                  <dt>{label}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>
 
        <section id="platform" className="section">
          <div className="container">
            <div className="section-head">
              <p className="eyebrow">Platform</p>
              <h2>One control plane. Every signal.</h2>
              <p className="muted">Three primitives for a security posture that stays ahead of risk.</p>
            </div>
            <div className="module-grid">
              {MODULES.map((module) => (
                <article className="card" key={module.title}>
                  <div className="icon-box">
                    <Icon name={module.icon} />
                  </div>
                  <h3>{module.title}</h3>
                  <p className="muted">{module.copy}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
 
        {TEAM.length > 0 && (
          <section id="team" className="section">
            <div className="container">
              <div className="section-head">
                <p className="eyebrow">Team</p>
                <h2>The people behind AegisecOS.</h2>
              </div>
              <ul className="team-grid">
                {TEAM.map((member) => (
                  <li className="card" key={member.name}>
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
              <div className="section-head">
                <p className="eyebrow">Case studies</p>
                <h2>Results from real deployments.</h2>
              </div>
              <ul className="module-grid">
                {CASE_STUDIES.map((study) => (
                  <li className="card" key={study.title}>
                    <p className="eyebrow">{study.client}</p>
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
            <div className="section-head">
              <p className="eyebrow">Access</p>
              <h2>Deploy on your terms.</h2>
            </div>
            <div className="tier-grid">
              {TIERS.map((tier) => (
                <article className={`card tier${tier.featured ? ' featured' : ''}`} key={tier.title}>
                  {tier.featured && <span className="tier-badge">Recommended</span>}
                  <p className="tier-meta">{tier.meta}</p>
                  <h3>{tier.title}</h3>
                  <p className="tier-price">{tier.price}</p>
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
          <div className="container contact-grid">
            <div>
              <p className="eyebrow">Contact</p>
              <h2>Request early access.</h2>
              <p className="muted">
                Leave your work email and we will follow up as access opens. For enterprise or
                security questions, email us directly.
              </p>
              <p>
                <a className="contact-email" href={`mailto:${CONTACT_EMAIL}`}>
                  {CONTACT_EMAIL}
                </a>
              </p>
            </div>
 
            <div className="card form-card">
              {status === 'success' ? (
                <div role="status">
                  <h3>Request received</h3>
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
                      We could not submit your request. Please try again, or email{' '}
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
 
Claude finished the response
