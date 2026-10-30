import React, { useState, useEffect } from 'react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle('dark-mode');
  };

  const navLinks = [
    { label: 'Home', href: '#' },
    { label: 'About', href: '#about' },
    { label: "HOD's Desk", href: '#hod' },
    { label: 'Programs', href: '#programs' },
    { label: 'Faculty', href: '#faculty' },
    { label: 'Laboratories', href: '#labs' },
    { label: 'Research', href: '#research' },
    { label: 'Placements', href: '#placements' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Events', href: '#events' },
    { label: 'Downloads', href: '#downloads' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header>
      <nav className={`navbar navbar-expand-lg fixed-top glass-navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
        <div className="container">
          {/* Logo */}
          <a className="navbar-brand d-flex align-items-center" href="#">
            <img src="/assets/icons/RVU-logo.svg" className="logo" alt="University Logo" />
            <div className="ms-3">
              <h5 className="mb-0">Department of</h5>
              <small>Computer Applications</small>
            </div>
          </a>

          {/* Mobile Toggle */}
          <button
            className="navbar-toggler"
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Menu */}
          <div className={`collapse navbar-collapse ${mobileOpen ? 'show' : ''}`} id="mainNav">
            <ul className="navbar-nav ms-auto">
              {navLinks.map((link, idx) => (
                <li className="nav-item" key={idx}>
                  <a
                    className={`nav-link ${link.href === '#' ? 'active' : ''}`}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>

            {/* Dark Mode Toggle */}
            <button
              className="btn btn-warning ms-lg-3"
              id="themeToggle"
              onClick={toggleDarkMode}
              aria-label="Toggle theme"
            >
              <i className={`fa-solid ${darkMode ? 'fa-sun' : 'fa-moon'}`}></i>
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}
