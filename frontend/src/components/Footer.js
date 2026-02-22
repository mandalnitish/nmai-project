import React from 'react';
import { Link } from 'react-router-dom';
import {
  FiFacebook,
  FiTwitter,
  FiInstagram,
  FiYoutube,
  FiArrowUp,
} from 'react-icons/fi';

import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  // Scroll to top on any link click
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Helper: internal link that scrolls to top
  const ScrollLink = ({ to, children }) => (
    <Link to={to} onClick={scrollToTop}>
      <span className="link-arrow">→</span> {children}
    </Link>
  );

  return (
    <footer className="footer">

      {/* Scroll To Top Button */}
      <button
        className="scroll-to-top"
        onClick={scrollToTop}
        aria-label="Scroll to top"
      >
        <FiArrowUp />
      </button>

      <div className="footer-container">
        <div className="footer-grid">

          {/* ── Brand Section ── */}
          <div className="footer-section footer-brand">
            <div className="brand-logo">
              <div className="logo-icon">NMAI</div>
            </div>

            <h3 className="footer-heading">NMAI Current Affairs</h3>

            <p className="footer-description">
              Empowering competitive exam aspirants with comprehensive study materials,
              daily current affairs, and expert guidance. Your success is our mission.
            </p>

            {/* Social Links */}
            <div className="social-links">
              <a href="https://www.facebook.com/imandalnitish" target="_blank" rel="noopener noreferrer" className="social-link facebook">
                <FiFacebook />
              </a>
              <a href="https://x.com/nitishm11391299" target="_blank" rel="noopener noreferrer" className="social-link twitter">
                <FiTwitter />
              </a>
              <a href="https://instagram.com/nitishhmandal" target="_blank" rel="noopener noreferrer" className="social-link instagram">
                <FiInstagram />
              </a>
              <a href="https://youtube.com/@nitishmandalx" target="_blank" rel="noopener noreferrer" className="social-link youtube">
                <FiYoutube />
              </a>
            </div>
          </div>

          {/* ── Quick Links ── */}
          <div className="footer-section">
            <h3 className="footer-heading">Quick Links</h3>
            <ul className="footer-links">
              <li><ScrollLink to="/">Home</ScrollLink></li>
              <li><ScrollLink to="/current-affairs">Current Affairs</ScrollLink></li>
              <li><ScrollLink to="/mcq-practice">MCQ Practice</ScrollLink></li>
              <li><ScrollLink to="/daily-quiz">Daily Quiz</ScrollLink></li>
              <li><ScrollLink to="/about-us">About Us</ScrollLink></li>
            </ul>
          </div>

          {/* ── Exam Categories — linked to /exams/:slug ── */}
          <div className="footer-section">
            <h3 className="footer-heading">Exam Categories</h3>
            <ul className="footer-links">
              <li><ScrollLink to="/exams/upsc">UPSC CSE</ScrollLink></li>
              <li><ScrollLink to="/exams/ssc">SSC CGL / CHSL</ScrollLink></li>
              <li><ScrollLink to="/exams/banking">Banking (IBPS / SBI)</ScrollLink></li>
              <li><ScrollLink to="/exams/railway">Railway RRB</ScrollLink></li>
              <li><ScrollLink to="/exams/state-psc">State PSC</ScrollLink></li>
            </ul>
          </div>

          {/* ── Resources ── */}
          <div className="footer-section">
            <h3 className="footer-heading">Resources</h3>
            <ul className="footer-links">
              <li><ScrollLink to="/privacy-policy">Privacy Policy</ScrollLink></li>
              <li><ScrollLink to="/terms-of-service">Terms of Service</ScrollLink></li>
              <li><ScrollLink to="/disclaimer">Disclaimer</ScrollLink></li>
              <li><ScrollLink to="/contact-us">Contact Us</ScrollLink></li>
              <li><ScrollLink to="/faq">FAQ</ScrollLink></li>
            </ul>
          </div>

        </div>

        {/* ── Footer Bottom ── */}
        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <p className="copyright">
              © {currentYear}
              <span className="brand-name"> NMAI Current Affairs</span>.
              All rights reserved.
            </p>
          </div>
          <p className="tagline">
            Crafted with <span className="heart">❤️</span> for India's Future Aspirants
          </p>
        </div>

      </div>

      {/* ── Decorative Wave ── */}
      <div className="footer-wave">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
        </svg>
      </div>

    </footer>
  );
};

export default Footer;