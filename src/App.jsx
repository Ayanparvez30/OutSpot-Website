import { useState, useEffect } from 'react';

// Top-nav items use the app's own tab icons (copied into /public/icons).
const NAV = [
  { label: 'Explore', icon: '/icons/explore.svg' },
  { label: 'Map', icon: '/icons/map.svg' },
  { label: 'Camera', icon: '/icons/camera.svg' },
  { label: 'Challenges', icon: '/icons/challenges.svg' },
  { label: 'Chat', icon: '/icons/chat.svg' },
];

// Feature sections (alternating image / text), text taken from the design.
// `image` is a per-section placeholder for now — swap each with the client's
// Lottie / artwork when it arrives. PLACEHOLDER below is the single temp image.
const PLACEHOLDER = '/images/testimages.png';
const FEATURES = [
  {
    key: 'explore',
    icon: '/icons/explore.svg',
    label: 'Explore',
    title: "Explore the places everyone's talking about",
    desc:
      'Discover trending restaurants, bars, cafés, and hidden gems across your city. See where your friends are going through their stories and find your next favorite spot before everyone else does.',
    image: PLACEHOLDER,
  },
  {
    key: 'map',
    icon: '/icons/map.svg',
    label: 'Map',
    title: "Spot what's trending around you",
    desc:
      "Explore your city through an interactive map that shows trending spots nearby and the places your friends are visiting right now. Find where the energy is, see what's happening around you, and decide where to go next.",
    image: PLACEHOLDER,
  },
  {
    key: 'camera',
    icon: '/icons/camera.svg',
    label: 'Camera',
    title: 'Get spotted where it matters',
    desc:
      "Snap the moment, share it to your story, and be spotted at the places everyone wants to be. From trending hotspots to hidden gems, let your friends see you in the city's most happening spots.",
    image: PLACEHOLDER,
  },
  {
    key: 'challenges',
    icon: '/icons/challenges.svg',
    label: 'Challenges',
    title: 'Climb the leaderboard',
    desc:
      'Post stories from the city’s go-to spots, complete daily challenges, and earn points every time you show up. Compete with friends and other Outspot members as you rise through the leaderboard and prove you know where to be.',
    image: PLACEHOLDER,
  },
  {
    key: 'chat',
    icon: '/icons/chat.svg',
    label: 'Chat',
    title: 'Chat about the spots worth knowing',
    desc:
      "Chat with friends about the places they’re into, the spots they keep going back to, and where everyone should show up next. Turn every conversation into your next move.",
    image: PLACEHOLDER,
  },
];

const LEADERBOARD = [
  { rank: 1, name: 'Alex', pts: '2,480' },
  { rank: 2, name: 'Sam', pts: '2,105' },
  { rank: 3, name: 'Jordan', pts: '1,890' },
  { rank: 4, name: 'You', pts: '1,720' },
];

// Left column then right column, filling the 2-col grid row by row.
const LAUNCH_FEATURES = [
  'Nationwide challenges',
  'College-friendly experiences',
  'Local food spots everywhere',
  'Friend group competitions',
  'Weekend missions',
  'Hidden gems & viewpoints',
];

// Real launch target — the countdown below ticks down to this every second.
const LAUNCH_DATE = new Date('2026-09-01T00:00:00');

// Small location-pin used in the launch feature pills (purple, self-contained).
function PinIcon() {
  return (
    <svg className="launch-pin" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M12 2a7 7 0 0 0-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 0 0-7-7zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z"
      />
    </svg>
  );
}

// Live countdown to LAUNCH_DATE — re-renders every second.
function Countdown() {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const diff = Math.max(0, LAUNCH_DATE.getTime() - now);
  const units = [
    { v: Math.floor(diff / 86400000), l: 'Days' },
    { v: Math.floor((diff / 3600000) % 24), l: 'Hours' },
    { v: Math.floor((diff / 60000) % 60), l: 'Minutes' },
    { v: Math.floor((diff / 1000) % 60), l: 'Seconds' },
  ];

  return (
    <div className="countdown">
      {units.map((u) => (
        <div className="cd-box" key={u.l}>
          <div className="cd-num">{String(u.v).padStart(2, '0')}</div>
          <div className="cd-label">{u.l}</div>
        </div>
      ))}
    </div>
  );
}

// Waitlist signups are delivered straight to this inbox via FormSubmit.co
// (no backend needed). NOTE: the FIRST submission triggers a one-time
// "Activate Form" email to this address — click it once and every later
// signup lands in the inbox automatically.
const WAITLIST_EMAIL = 'ayanparvez30@gmail.com';

// Placeholder link the QR encodes / the store badges point to. Swap for the
// real App Store + Google Play URLs (and a deep link in the QR) once live.
const APP_URL = 'https://outspot.app';

function Waitlist() {
  const [data, setData] = useState({ email: '', phone: '', college: '' });
  const [status, setStatus] = useState('idle'); // idle | sending | done | error

  const set = (k) => (e) => setData((d) => ({ ...d, [k]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch(`https://formsubmit.co/ajax/${WAITLIST_EMAIL}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          email: data.email,
          phone: data.phone || '—',
          'college / city': data.college || '—',
          _subject: 'New OutSpot waitlist signup 🎉',
          _template: 'table',
          _captcha: 'false',
        }),
      });
      if (res.ok) {
        setStatus('done');
        setData({ email: '', phone: '', college: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <form className="waitlist-card" onSubmit={submit}>
      <input
        className="wl-input"
        type="email"
        required
        placeholder="Email address"
        value={data.email}
        onChange={set('email')}
      />
      <input
        className="wl-input"
        type="tel"
        placeholder="Phone (optional)"
        value={data.phone}
        onChange={set('phone')}
      />
      <input
        className="wl-input"
        type="text"
        placeholder="College / city (optional)"
        value={data.college}
        onChange={set('college')}
      />
      <button className="btn btn-gradient wl-btn" type="submit" disabled={status === 'sending'}>
        {status === 'sending'
          ? 'Joining…'
          : status === 'done'
          ? 'You’re on the list! 🎉'
          : 'Join the Waitlist'}
      </button>
      {status === 'done' && (
        <p className="wl-msg wl-ok">Thanks! We’ll be in touch soon.</p>
      )}
      {status === 'error' && (
        <p className="wl-msg wl-err">Something went wrong — please try again.</p>
      )}

      <div className="wl-socials">
        <a href="#" className="wl-social" aria-label="Instagram">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="3" width="18" height="18" rx="5" />
            <circle cx="12" cy="12" r="4" />
            <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
          </svg>
        </a>
        <a href="#" className="wl-social" aria-label="More">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
            <path d="M12 2l1.8 5.2L19 9l-5.2 1.8L12 16l-1.8-5.2L5 9l5.2-1.8z" />
          </svg>
        </a>
      </div>
    </form>
  );
}

const FAQS = [
  {
    q: 'What is OutSpot?',
    a: 'OutSpot is a social discovery app where users visit places, complete challenges, snap photos, earn points, and compete.',
  },
  { q: 'Is OutSpot free?', a: 'Yes, the app is free to download.' },
  { q: 'Where is OutSpot launching?', a: 'OutSpot is launching all across the USA.' },
  {
    q: 'How do I earn points?',
    a: 'You earn points by visiting places, completing challenges, and submitting approved photos.',
  },
  {
    q: 'Can I play with friends?',
    a: 'Yes, OutSpot is designed for friend challenges and leaderboards.',
  },
  {
    q: 'Can businesses join OutSpot?',
    a: 'Yes, local businesses can partner with OutSpot to create sponsored challenges and drive foot traffic.',
  },
];

// FAQ accordion — one item open at a time (first open by default).
function Faq() {
  const [open, setOpen] = useState(0);
  return (
    <div className="faq-list">
      {FAQS.map((item, i) => {
        const isOpen = open === i;
        return (
          <div className={`faq-item ${isOpen ? 'open' : ''}`} key={item.q}>
            <button
              className="faq-q"
              onClick={() => setOpen(isOpen ? -1 : i)}
              aria-expanded={isOpen}
            >
              <span>{item.q}</span>
              <svg className="faq-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>
            {isOpen && <p className="faq-a">{item.a}</p>}
          </div>
        );
      })}
    </div>
  );
}

// Image that hides itself gracefully if the file is missing, so the layout
// never breaks before artwork is added.
function SafeImg({ src, className, alt }) {
  const [hidden, setHidden] = useState(false);
  if (hidden) return null;
  return (
    <img src={src} alt={alt} className={className} onError={() => setHidden(true)} />
  );
}

export default function App() {
  return (
    <div className="page">
      {/* ---------------- Navbar ---------------- */}
      <header className="nav">
        <a className="brand" href="#">
          <img src="/icons/logo.svg" alt="OutSpot" className="brand-logo" />
          <span className="brand-name">
            <span className="brand-out">Out</span>
            <span className="brand-accent">Spot</span>
          </span>
        </a>

        <nav className="nav-links">
          {NAV.map((item) => (
            <a key={item.label} className="nav-link" href={`#${item.label.toLowerCase()}`}>
              <img src={item.icon} alt="" className="nav-icon" />
              <span>{item.label}</span>
            </a>
          ))}
        </nav>

        <a className="btn btn-gradient nav-download" href="#download">
          Download
          <img src="/icons/download.svg" alt="" className="btn-icon" />
        </a>
      </header>

      {/* ---------------- Hero ---------------- */}
      <main className="hero">
        <div className="hero-copy">
          <h1 className="hero-title">
            Spot and
            <br />
            be spotted
          </h1>
          <p className="hero-sub">
            Discover your city&rsquo;s best restaurants, bars, and cafés.
            Outspot rivals, rack up points, level up. Be everywhere they
            aren&rsquo;t.
          </p>

          <a className="btn btn-gradient btn-lg" href="#download">
            Download Free
            <img src="/icons/download.svg" alt="" className="btn-icon" />
          </a>

          <p className="hero-availability">Available on iOS and Android</p>
        </div>

        <div className="hero-visual">
          <SafeImg src={PLACEHOLDER} alt="OutSpot app" className="hero-art" />
        </div>
      </main>

      {/* ---------------- Feature sections ---------------- */}
      <div className="features">
        {FEATURES.map((f, i) => (
          <section
            id={f.key}
            key={f.key}
            className={`feature ${i % 2 === 1 ? 'feature-reverse' : ''}`}
          >
            <div className="feature-visual">
              <SafeImg src={f.image} alt={`${f.label} preview`} className="feature-img" />
            </div>
            <div className="feature-copy">
              <div className="feature-eyebrow">
                <span
                  className="feature-eyebrow-icon"
                  style={{
                    maskImage: `url(${f.icon})`,
                    WebkitMaskImage: `url(${f.icon})`,
                  }}
                />
                <span>{f.label}</span>
              </div>
              <h2 className="feature-title">{f.title}</h2>
              <p className="feature-desc">{f.desc}</p>
            </div>
          </section>
        ))}
      </div>

      {/* ---------------- Weekly prize pool ---------------- */}
      <section className="band">
        <span className="pill-badge">Win Big</span>
        <h2 className="band-title">$1,000 Weekly Prize Pool</h2>
        <div className="prize-card">
          <div className="prize-icon">$</div>
          <p className="prize-text">
            Every week, the highest scorers on the leaderboard split a cash
            prize pool of <strong>$1,000</strong>. Rack up points, top the
            charts, and get paid to explore.
          </p>
          <p className="prize-note">
            Prizes distributed every Sunday at midnight ET.
          </p>
        </div>
      </section>

      {/* ---------------- Leaderboard ---------------- */}
      <section className="band">
        <span className="pill-badge">Compete</span>
        <h2 className="band-title">Out-snap your friends</h2>
        <div className="lb-card">
          {LEADERBOARD.map((r) => (
            <div className="lb-row" key={r.rank}>
              <span className={`lb-rank lb-rank-${r.rank}`}>{r.rank}</span>
              <span className="lb-name">{r.name}</span>
              <span className="lb-pts">{r.pts} pts</span>
            </div>
          ))}
        </div>
      </section>

      {/* ---------------- Launch countdown ---------------- */}
      <section className="band">
        <span className="pill-badge">Coming soon</span>
        <h2 className="band-title">Launching September 1, 2026</h2>
        <p className="band-sub">
          OutSpot is launching all across the USA — local food, coffee, parks,
          murals, sunset spots, college areas, and hidden gems in every city.
        </p>
        <Countdown />
        <div className="launch-grid">
          {LAUNCH_FEATURES.map((f) => (
            <div className="launch-pill" key={f}>
              <PinIcon />
              {f}
            </div>
          ))}
        </div>
      </section>

      {/* ---------------- Waitlist ---------------- */}
      <section className="band">
        <span className="pill-badge">Be first</span>
        <h2 className="band-title">Join the first OutSpot explorers</h2>
        <p className="band-sub">
          Be among the first to compete, discover spots, and earn rewards.
        </p>
        <Waitlist />
      </section>

      {/* ---------------- FAQ ---------------- */}
      <section className="band">
        <span className="pill-badge">FAQ</span>
        <h2 className="band-title">Frequently Asked Questions</h2>
        <Faq />
      </section>

      {/* ---------------- Final CTA ---------------- */}
      <section className="cta-band" id="download">
        <div className="cta-inner">
          <h2 className="cta-title">Ready to rule your city?</h2>
          <p className="band-sub">
            Download the app to join thousands of explorers competing for glory,
            prizes, and bragging rights. Your urban adventure starts now.
          </p>

          <div className="cta-row">
            <div className="cta-qr-wrap">
              <div className="cta-qr-frame">
                <div className="cta-qr">
                  <img
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=300x300&margin=0&data=${encodeURIComponent(
                      APP_URL
                    )}`}
                    alt="Scan to download OutSpot"
                  />
                </div>
              </div>
              <span className="cta-qr-label">Scan to download</span>
            </div>

            <div className="cta-or">
              <span className="cta-or-line" />
              <span>or</span>
              <span className="cta-or-line" />
            </div>

            <div className="cta-badges">
              <a href={APP_URL} className="store-badge" aria-label="Download on the App Store">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M16.36 1.43c.05 1.02-.36 2.01-1.02 2.73-.69.76-1.84 1.35-2.86 1.27-.07-1 .42-2.04 1.04-2.71.7-.76 1.91-1.32 2.84-1.29zM20.5 17.3c-.5 1.16-.74 1.67-1.39 2.69-.9 1.42-2.18 3.19-3.76 3.2-1.4.02-1.76-.91-3.66-.9-1.9.01-2.29.92-3.69.9-1.58-.01-2.79-1.61-3.69-3.03C1.8 16.06 1.53 11.5 3.06 9.07c.99-1.55 2.55-2.45 4.02-2.45 1.5 0 2.44.92 3.68.92 1.2 0 1.93-.92 3.66-.92 1.31 0 2.7.71 3.69 1.94-3.24 1.77-2.71 6.39.39 8.74z" />
                </svg>
                <span className="sb-text">
                  <span className="sb-small">Download on the</span>
                  <span className="sb-big">App Store</span>
                </span>
              </a>

              <a href={APP_URL} className="store-badge" aria-label="Get it on Google Play">
                <svg viewBox="0 0 24 24">
                  <path d="M3.6 2.3 13 11.7l-9.4 9.4c-.3-.2-.5-.6-.5-1.1V3.4c0-.5.2-.9.5-1.1z" fill="#00c3ff" />
                  <path d="M16.8 8.6 13 11.7 3.6 2.3c.34-.2.74-.2 1.12.02z" fill="#00e676" />
                  <path d="M16.8 14.8 4.72 21.68c-.38.22-.78.22-1.12.02L13 11.7z" fill="#ff3d47" />
                  <path d="M20.4 10.55c.9.5.9 1.85 0 2.35l-3.6 2.05-3.8-3.25 3.8-3.2z" fill="#ffce00" />
                </svg>
                <span className="sb-text">
                  <span className="sb-small">GET IT ON</span>
                  <span className="sb-big">Google Play</span>
                </span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- Brand footer ---------------- */}
      <footer className="brand-footer">
        <div className="bf-mark">
          <img src="/icons/logo.svg" alt="" className="bf-watermark" />
          <h2 className="bf-word">
            <span className="bf-out">Out</span>
            <span className="bf-spot">Spot</span>
          </h2>
        </div>
      </footer>
    </div>
  );
}
