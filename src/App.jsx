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
            Out<span className="brand-accent">Spot</span>
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

          <a className="btn btn-gradient btn-lg" id="download" href="#">
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
    </div>
  );
}
