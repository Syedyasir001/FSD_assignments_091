import "./App.css";

function App() {
  return (
    <>
      {/* ================= HEADER ================= */}
      <header className="header">
        <div className="logo">
          <svg className="spotify-logo-svg" viewBox="0 0 168 168" width="30" height="30" style={{ fill: '#1DB954' }}>
            <path d="M83.996.002C37.607.002 0 37.612 0 84.002s37.607 84 83.996 84c46.398 0 84.004-37.61 84.004-84S130.394.002 83.996.002zm38.403 121.27c-1.5 2.46-4.72 3.24-7.18 1.73-19.64-12.01-44.36-14.73-73.47-8.07-2.82.64-5.63-1.12-6.27-3.94-.64-2.82 1.11-5.63 3.93-6.27 31.9-7.3 59.27-4.22 81.26 9.22 2.45 1.5 3.2 4.74 1.73 7.17v.16zm10.28-22.86c-1.9 3.07-5.91 4.04-8.98 2.15-22.48-13.83-56.77-17.83-83.33-9.78-3.46 1.05-7.09-1.07-8.14-4.52-1.05-3.46 1.07-7.09 4.52-8.14 30.34-9.21 68.22-4.73 93.98 11.13 3.06 1.89 4.03 5.92 2.14 8.98l-.19.18zm.88-23.73c-26.96-16.01-71.42-17.5-97.13-9.69-4.13 1.25-8.52-1.08-9.77-5.21-1.25-4.13 1.08-8.52 5.21-9.77 29.56-8.98 78.69-7.23 110 11.37 3.73 2.21 4.95 7.03 2.74 10.77-2.2 3.74-7.02 4.94-10.76 2.74-2.29-1.37-2.29-1.37-2.29-1.37z"/>
          </svg>
          <h2>Spotify</h2>
        </div>

        <nav className="nav-links">
          <a href="/">Premium</a>
          <a href="/">Support</a>
          <a href="/">Download</a>
        </nav>

        <div className="divider"></div>

        <div className="auth-links">
          <a href="/">Sign up</a>
          <button>Log in</button>
        </div>
      </header>

      {/* Main Content */}
      <main className="main">
        <h1>Spotify </h1>
        <p>Play your music

        </p>
      </main>

      {/* ================= FOOTER ================= */}
      <footer className="footer">

        <div className="footer-top">

          <div className="footer-column">
            <h3>Company</h3>
            <a href="/">About</a>
            <a href="/">Jobs</a>
            <a href="/">For the Record</a>
          </div>

          <div className="footer-column">
            <h3>Communities</h3>
            <a href="/">For Artists</a>
            <a href="/">Developers</a>
            <a href="/">Advertising</a>
            <a href="/">Investors</a>
          </div>

          <div className="footer-column">
            <h3>Useful Links</h3>
            <a href="/">Support</a>
            <a href="/">Free Mobile App</a>
            <a href="/">Popular by Country</a>
          </div>

          <div className="social-icons">
            <span>📷</span>
            <span>🐦</span>
            <span>📘</span>
          </div>

        </div>

        <hr />

        <div className="footer-bottom">
          <div className="footer-links">
            <a href="/">Legal</a>
            <a href="/">Privacy Center</a>
            <a href="/">Privacy Policy</a>
            <a href="/">Cookies</a>
            <a href="/">Accessibility</a>
          </div>

          <p>© 2026 Spotify AB</p>
        </div>

      </footer>
    </>
  );
}

export default App;