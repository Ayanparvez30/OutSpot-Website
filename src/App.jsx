import { useState } from 'react';

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
    </div>
  );
}
