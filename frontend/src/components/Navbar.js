import React, { useState, useEffect } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import DarkModeToggle from "./DarkModeToggle";
import logo from "../assets/logo.png";
import "./Navbar.css";

export default function Navbar() {
  const [leftOpen, setLeftOpen]   = useState(false); // categories drawer
  const [rightOpen, setRightOpen] = useState(false); // nav + auth drawer
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const isHome   = location.pathname === "/";

  /* close both on route change */
  useEffect(() => {
    setLeftOpen(false);
    setRightOpen(false);
  }, [location.pathname]);

  /* body scroll lock */
  useEffect(() => {
    document.body.style.overflow = (leftOpen || rightOpen) ? "hidden" : "unset";
    return () => { document.body.style.overflow = "unset"; };
  }, [leftOpen, rightOpen]);

  /* close on desktop resize */
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 920) { setLeftOpen(false); setRightOpen(false); }
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  /* tell Home page to open/close its category sidebar */
  useEffect(() => {
    window.dispatchEvent(
      new CustomEvent("navCategoryToggle", { detail: { open: leftOpen } })
    );
  }, [leftOpen]);

  /* sync if Home page closes its own sidebar (overlay click) */
  useEffect(() => {
    const handler = (e) => setLeftOpen(e.detail?.open ?? false);
    window.addEventListener("categoryStateChange", handler);
    return () => window.removeEventListener("categoryStateChange", handler);
  }, []);

  const handleLogoClick = (e) => {
    e.preventDefault();
    setLeftOpen(false); setRightOpen(false);
    if (isHome && location.search.length > 0) {
      navigate("/", { replace: true });
      window.scrollTo({ top: 0, behavior: "smooth" });
      window.dispatchEvent(new CustomEvent("homeReset"));
    } else if (isHome) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      navigate("/");
    }
  };

  const handleLogout = () => {
    logout(); navigate("/"); setRightOpen(false);
  };

  const closeAll = () => { setLeftOpen(false); setRightOpen(false); };

  return (
    <>
      {/* Overlay */}
      {(leftOpen || rightOpen) && (
        <div className="nav-overlay" onClick={closeAll} />
      )}

      <header className="navbar">
        <div className="navbar-wrap">

          {/* ═══ LEFT — left hamburger (mobile) / logo (desktop) ═══ */}
          <div className="nav-left">
            <a href="/" className="navbar-logo desktop-only" onClick={handleLogoClick}>
              <img src={logo} alt="NMAI Current Affairs" className="logo-img" />
            </a>
            <button
              className={`nav-toggle mobile-only-flex ${leftOpen ? "is-open" : ""}`}
              onClick={() => { setLeftOpen(!leftOpen); setRightOpen(false); }}
              aria-label="Open categories"
            >
              <span /><span /><span />
            </button>
          </div>

          {/* ═══ CENTER — desktop nav / mobile centered logo ═══ */}
          <div className="nav-center">
            <nav className="desktop-only desktop-nav">
              <NavLink to="/" end>Home</NavLink>
              <NavLink to="/current-affairs">Current Affairs</NavLink>
              <NavLink to="/mcq-practice">MCQs</NavLink>
              <NavLink to="/daily-quiz">Daily Quiz</NavLink>
              <NavLink to="/about-us">About Us</NavLink>
              <NavLink to="/contact-us">Contact</NavLink>
            </nav>
            <a href="/" className="navbar-logo mobile-only-flex" onClick={handleLogoClick}>
              <img src={logo} alt="NMAI Current Affairs" className="logo-img" />
            </a>
          </div>

          {/* ═══ RIGHT — desktop auth / right hamburger (mobile) ═══ */}
          <div className="nav-right">
            <div className="desktop-only desktop-auth">
              <DarkModeToggle />
              {!isAuthenticated ? (
                <>
                  <NavLink to="/login"    className="nav-login-btn">Login</NavLink>
                  <NavLink to="/register" className="nav-register-btn">Register</NavLink>
                </>
              ) : (
                <div className="nav-user">
                  <NavLink to="/profile" className="nav-username">👤 {user?.name}</NavLink>
                  <button onClick={handleLogout} className="logout-btn">Logout</button>
                </div>
              )}
            </div>
            <button
              className={`nav-toggle mobile-only-flex ${rightOpen ? "is-open" : ""}`}
              onClick={() => { setRightOpen(!rightOpen); setLeftOpen(false); }}
              aria-label="Open menu"
            >
              <span /><span /><span />
            </button>
          </div>

        </div>
      </header>

      {/* ═══════════════════════════════════
          LEFT DRAWER — Categories, E-Books, Exams
      ════════════════════════════════════ */}
      <div className={`mobile-drawer drawer-left ${leftOpen ? "open" : ""}`}>
        <div className="drawer-header">
          <span className="drawer-title">Categories</span>
          <button className="drawer-close" onClick={() => setLeftOpen(false)}>✕</button>
        </div>

        <nav className="drawer-cat-list">
          {["All","National","International","Economy","Polity","Science","Technology","Environment","Defence","Sports"].map((cat) => (
            <button key={cat} className="drawer-cat-item"
              onClick={() => {
                window.dispatchEvent(new CustomEvent("drawerCategorySelect", { detail: { cat } }));
                setLeftOpen(false);
              }}
            >{cat}</button>
          ))}
        </nav>

        <div className="drawer-section-title">E-Books</div>
        <nav className="drawer-link-list">
          <NavLink to="/ebooks/monthly-mcqs"    onClick={() => setLeftOpen(false)}>📄 Monthly MCQs</NavLink>
          <NavLink to="/ebooks/ca-articles-mcqs" onClick={() => setLeftOpen(false)}>📝 Articles + MCQs</NavLink>
          <NavLink to="/ebooks/yearly-pdf"      onClick={() => setLeftOpen(false)}>📅 Yearly PDF</NavLink>
        </nav>

        <div className="drawer-section-title">Exams</div>
        <nav className="drawer-link-list">
          <NavLink to="/exams/upsc"      onClick={() => setLeftOpen(false)}>🏛️ UPSC</NavLink>
          <NavLink to="/exams/ssc"       onClick={() => setLeftOpen(false)}>📋 SSC</NavLink>
          <NavLink to="/exams/banking"   onClick={() => setLeftOpen(false)}>🏦 Banking</NavLink>
          <NavLink to="/exams/railway"   onClick={() => setLeftOpen(false)}>🚂 Railway</NavLink>
          <NavLink to="/exams/state-psc" onClick={() => setLeftOpen(false)}>🗺️ State PSC</NavLink>
        </nav>
      </div>

      {/* ═══════════════════════════════════
          RIGHT DRAWER — Nav links, Auth, Dark Mode
      ════════════════════════════════════ */}
      <div className={`mobile-drawer drawer-right ${rightOpen ? "open" : ""}`}>
        <div className="drawer-header drawer-header-right">
          <button className="drawer-close" onClick={() => setRightOpen(false)}>✕</button>
          <span className="drawer-title">Menu</span>
        </div>

        {/* Auth */}
        <div className="drawer-auth">
          {!isAuthenticated ? (
            <div className="drawer-auth-buttons">
              <NavLink to="/login"    className="mobile-login-btn"    onClick={() => setRightOpen(false)}>Login</NavLink>
              <NavLink to="/register" className="mobile-register-btn" onClick={() => setRightOpen(false)}>Register</NavLink>
            </div>
          ) : (
            <div className="mobile-user-card">
              <NavLink to="/profile" className="mobile-user-info" onClick={() => setRightOpen(false)}>
                <div className="user-avatar">👤</div>
                <div className="user-details">
                  <span className="user-name">{user?.name}</span>
                  <span className="user-email">{user?.email}</span>
                </div>
              </NavLink>
            </div>
          )}
        </div>

        {/* Dark mode toggle */}
        <div className="mobile-dark-mode-section">
          <DarkModeToggle showLabel={true} />
        </div>

        {/* Nav links */}
        <nav className="mobile-nav-links">
          <NavLink to="/"                end onClick={() => setRightOpen(false)}><span className="nav-icon">🏠</span><span>Home</span></NavLink>
          <NavLink to="/current-affairs"     onClick={() => setRightOpen(false)}><span className="nav-icon">📰</span><span>Current Affairs</span></NavLink>
          <NavLink to="/mcq-practice"        onClick={() => setRightOpen(false)}><span className="nav-icon">📝</span><span>MCQs</span></NavLink>
          <NavLink to="/daily-quiz"          onClick={() => setRightOpen(false)}><span className="nav-icon">🎯</span><span>Daily Quiz</span></NavLink>
          <NavLink to="/about-us"            onClick={() => setRightOpen(false)}><span className="nav-icon">ℹ️</span><span>About Us</span></NavLink>
          <NavLink to="/contact-us"          onClick={() => setRightOpen(false)}><span className="nav-icon">📧</span><span>Contact</span></NavLink>
        </nav>

        {isAuthenticated && (
          <div className="mobile-menu-footer">
            <button onClick={handleLogout} className="mobile-logout-btn">
              <span>🚪</span><span>Logout</span>
            </button>
          </div>
        )}
      </div>
    </>
  );
}