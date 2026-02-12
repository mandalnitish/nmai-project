import React, { useState, useEffect } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import DarkModeToggle from "./DarkModeToggle";
import logo from "../assets/logo.png";
import "./Navbar.css";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  /* ==============================
     LOGO CLICK HANDLER (FIXED)
  ============================== */
  const handleLogoClick = (e) => {
    e.preventDefault();
    closeMenu();

    const isHome = location.pathname === "/";
    const hasQuery = location.search.length > 0;

    if (isHome && hasQuery) {
      // Reset URL to clean home
      navigate("/", { replace: true });

      // Scroll to top
      window.scrollTo({ top: 0, behavior: "smooth" });

      // Notify Home page to reset state
      window.dispatchEvent(new CustomEvent("homeReset"));
    } else if (isHome) {
      // Already on home page 1 → just scroll
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      // Navigate from other page to home
      navigate("/");
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/");
    setMenuOpen(false);
  };

  const closeMenu = () => setMenuOpen(false);

  /* ==============================
     LOCK BODY SCROLL (MOBILE)
  ============================== */
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [menuOpen]);

  /* ==============================
     CLOSE MENU ON RESIZE
  ============================== */
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 920 && menuOpen) {
        setMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [menuOpen]);

  return (
    <>
      {/* Mobile overlay */}
      {menuOpen && <div className="nav-overlay" onClick={closeMenu} />}

      <header className="navbar">
        <div className="navbar-wrap">
          {/* ================= LOGO ================= */}
          <div className="nav-left">
            <a
              href="/"
              className="navbar-logo"
              onClick={handleLogoClick}
            >
              <img
                src={logo}
                alt="NMAI Current Affairs"
                className="logo-img"
              />
            </a>
          </div>

          {/* ================= DESKTOP MENU ================= */}
          <nav className="nav-center desktop-menu">
            <NavLink to="/" end>Home</NavLink>
            <NavLink to="/current-affairs">Current Affairs</NavLink>
            <NavLink to="/mcq-practice">MCQs</NavLink>
            <NavLink to="/daily-quiz">Daily Quiz</NavLink>
            <NavLink to="/about-us">About Us</NavLink>
            <NavLink to="/contact-us">Contact</NavLink>
          </nav>

          {/* ================= DESKTOP RIGHT ================= */}
          <div className="nav-right desktop-menu">
            <DarkModeToggle />

            {!isAuthenticated ? (
              <>
                <NavLink to="/login" className="nav-login-btn">Login</NavLink>
                <NavLink to="/register" className="nav-register-btn">
                  Register
                </NavLink>
              </>
            ) : (
              <div className="nav-user">
                <NavLink to="/profile" className="nav-username">
                  👤 {user?.name}
                </NavLink>
                <button onClick={handleLogout} className="logout-btn">
                  Logout
                </button>
              </div>
            )}
          </div>

          {/* ================= MOBILE TOGGLE ================= */}
          <button
            className={`nav-toggle ${menuOpen ? "open" : ""}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </header>

      {/* ================= MOBILE MENU ================= */}
      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        <div className="mobile-menu-header">
          <a href="/" className="mobile-logo" onClick={handleLogoClick}>
            <img src={logo} alt="NMAI" className="mobile-logo-img" />
          </a>
        </div>

        {/* Mobile Auth */}
        <div className="mobile-auth-top">
          {!isAuthenticated ? (
            <div className="mobile-auth-buttons">
              <NavLink to="/login" className="mobile-login-btn" onClick={closeMenu}>
                Login
              </NavLink>
              <NavLink to="/register" className="mobile-register-btn" onClick={closeMenu}>
                Register
              </NavLink>
            </div>
          ) : (
            <div className="mobile-user-card">
              <NavLink to="/profile" className="mobile-user-info" onClick={closeMenu}>
                <div className="user-avatar">👤</div>
                <div className="user-details">
                  <span className="user-name">{user?.name}</span>
                  <span className="user-email">{user?.email}</span>
                </div>
              </NavLink>
            </div>
          )}
        </div>

        {/* Dark Mode - Mobile */}
        <div className="mobile-dark-mode-section">
          <DarkModeToggle showLabel={true} />
        </div>

        {/* Mobile Links */}
        <nav className="mobile-nav-links">
          <NavLink to="/" end onClick={closeMenu}>
            <span className="nav-icon">🏠</span>
            <span>Home</span>
          </NavLink>
          <NavLink to="/current-affairs" onClick={closeMenu}>
            <span className="nav-icon">📰</span>
            <span>Current Affairs</span>
          </NavLink>
          <NavLink to="/mcq-practice" onClick={closeMenu}>
            <span className="nav-icon">📝</span>
            <span>MCQs</span>
          </NavLink>
          <NavLink to="/daily-quiz" onClick={closeMenu}>
            <span className="nav-icon">🎯</span>
            <span>Daily Quiz</span>
          </NavLink>
          <NavLink to="/about-us" onClick={closeMenu}>
            <span className="nav-icon">ℹ️</span>
            <span>About Us</span>
          </NavLink>
          <NavLink to="/contact-us" onClick={closeMenu}>
            <span className="nav-icon">📧</span>
            <span>Contact</span>
          </NavLink>
        </nav>

        {/* Mobile Logout */}
        {isAuthenticated && (
          <div className="mobile-menu-footer">
            <button onClick={handleLogout} className="mobile-logout-btn">
              <span>🚪</span>
              <span>Logout</span>
            </button>
          </div>
        )}
      </div>
    </>
  );
}
