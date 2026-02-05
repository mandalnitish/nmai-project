import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiFacebook, FiTwitter, FiInstagram, FiYoutube, FiMail, FiArrowUp, FiCheck } from 'react-icons/fi';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      // Add your subscription logic here
      setSubscribed(true);
      setTimeout(() => {
        setSubscribed(false);
        setEmail('');
      }, 3000);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer">
      {/* Scroll to Top Button */}
      <button className="scroll-to-top" onClick={scrollToTop} aria-label="Scroll to top">
        <FiArrowUp />
      </button>

      <div className="footer-container">
        {/* Main Footer Content */}
        <div className="footer-grid">
          {/* Brand Section */}
          <div className="footer-section footer-brand">
            <div className="brand-logo">
              <div className="logo-icon">NMAI</div>
            </div>
            <h3 className="footer-heading">NMAI Current Affairs</h3>
            <p className="footer-description">
              Empowering competitive exam aspirants with comprehensive study materials, 
              daily current affairs, and expert guidance. Your success is our mission.
            </p>
            <div className="social-links">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="social-link facebook">
                <FiFacebook />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="social-link twitter">
                <FiTwitter />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="social-link instagram">
                <FiInstagram />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="social-link youtube">
                <FiYoutube />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-section">
            <h3 className="footer-heading">Quick Links</h3>
            <ul className="footer-links">
              <li><Link to="/"><span className="link-arrow">→</span> Home</Link></li>
              <li><Link to="/current-affairs"><span className="link-arrow">→</span> Current Affairs</Link></li>
              <li><Link to="/mcq-practice"><span className="link-arrow">→</span> MCQ Practice</Link></li>
              <li><Link to="/daily-quiz"><span className="link-arrow">→</span> Daily Quiz</Link></li>
              <li><Link to="/about-us"><span className="link-arrow">→</span> About Us</Link></li>
            </ul>
          </div>

          {/* Exam Categories */}
          <div className="footer-section">
            <h3 className="footer-heading">Exam Categories</h3>
            <ul className="footer-links">
              <li><Link to="/category/upsc"><span className="link-arrow">→</span> UPSC CSE</Link></li>
              <li><Link to="/category/ssc"><span className="link-arrow">→</span> SSC CGL/CHSL</Link></li>
              <li><Link to="/category/banking"><span className="link-arrow">→</span> Banking (IBPS/SBI)</Link></li>
              <li><Link to="/category/railway"><span className="link-arrow">→</span> Railway RRB</Link></li>
              <li><Link to="/category/state-psc"><span className="link-arrow">→</span> State PSC</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div className="footer-section">
            <h3 className="footer-heading">Resources</h3>
            <ul className="footer-links">
              <li><Link to="/privacy-policy"><span className="link-arrow">→</span> Privacy Policy</Link></li>
              <li><Link to="/terms-of-service"><span className="link-arrow">→</span> Terms of Service</Link></li>
              <li><Link to="/disclaimer"><span className="link-arrow">→</span> Disclaimer</Link></li>
              <li><Link to="/contact-us"><span className="link-arrow">→</span> Contact Us</Link></li>
              <li><Link to="/faq"><span className="link-arrow">→</span> FAQ</Link></li>
            </ul>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="newsletter-section">
          <div className="newsletter-content">
            <div className="newsletter-text">
              <h3 className="footer-heading">Stay Updated</h3>
              <p>Subscribe to receive daily current affairs and exam updates directly in your inbox</p>
            </div>
            <form className="newsletter-form" onSubmit={handleSubscribe}>
              <div className="input-group">
                <FiMail className="input-icon" />
                <input 
                  type="email" 
                  placeholder="Enter your email address" 
                  className="newsletter-input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={subscribed}
                />
              </div>
              <button type="submit" className={`newsletter-btn ${subscribed ? 'subscribed' : ''}`} disabled={subscribed}>
                {subscribed ? (
                  <>
                    <FiCheck /> Subscribed!
                  </>
                ) : (
                  'Subscribe Now'
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <p className="copyright">
              © {currentYear} <span className="brand-name">NMAI Current Affairs</span>. All rights reserved.
            </p>
          </div>
          <p className="tagline">
            Crafted with <span className="heart">❤️</span> for India's Future Aspirants
          </p>
        </div>
      </div>

      {/* Decorative Wave */}
      <div className="footer-wave">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
        </svg>
      </div>
    </footer>
  );
};

export default Footer;