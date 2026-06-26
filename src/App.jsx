import { useState } from 'react';

// Top-nav items use the app's own tab icons (copied into /public/icons).
const NAV = [
  { label: 'Explore', icon: '/icons/explore.svg' },
  { label: 'Map', icon: '/icons/map.svg' },
  { label: 'Camera', icon: '/icons/camera.svg' },
  { label: 'Challenges', icon: '/icons/challenges.svg' },
  { label: 'Chat', icon: '/icons/chat.svg' },
];

// Hero image slots — drop your artwork into /public/images with these names and
// they appear automatically. Missing ones are hidden gracefully.
function HeroImg({ src, className, alt }) {
  const [hidden, setHidden] = useState(false);
  if (hidden) return null;
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading="eager"
      onError={() => setHidden(true)}
    />
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
            <a key={item.label} className="nav-link" href="#">
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

        {/* Right-side artwork. Replace the files in /public/images/ with your
            real mockups & characters — these slots position them like the
            design. */}
        <div className="hero-visual">
          <HeroImg src="/images/character-1.png" alt="" className="art art-char-left" />
          <HeroImg src="/images/character-2.png" alt="" className="art art-char-right" />
          <HeroImg src="/images/phone-1.png" alt="OutSpot app" className="art art-phone-back" />
          <HeroImg src="/images/phone-2.png" alt="OutSpot map" className="art art-phone-front" />
        </div>
      </main>
    </div>
  );
}
