import React from 'react';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row g-4">
          <div className="col-lg-4">
            <h4>Department of Computer Applications</h4>
            <p>Creating future-ready professionals through technology, innovation and research.</p>
            <div className="social-icons">
              <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook">
                <i className="fab fa-facebook"></i>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn">
                <i className="fab fa-linkedin"></i>
              </a>
              <a href="https://youtube.com" target="_blank" rel="noreferrer" aria-label="YouTube">
                <i className="fab fa-youtube"></i>
              </a>
            </div>
          </div>

          <div className="col-lg-4">
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li>
                <a href="#about">About</a>
              </li>
              <li>
                <a href="#faculty">Faculty</a>
              </li>
              <li>
                <a href="#placements">Placements</a>
              </li>
              <li>
                <a href="#contact">Contact</a>
              </li>
            </ul>
          </div>

          <div className="col-lg-4">
            <h5>Policies</h5>
            <ul className="list-unstyled">
              <li>
                <a href="#privacy">Privacy Policy</a>
              </li>
              <li>
                <a href="#terms">Terms &amp; Conditions</a>
              </li>
              <li>
                <a href="#accessibility">Accessibility</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom text-center mt-5 pt-4">
          <p>© 2026 Department of Computer Applications, RV University. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
