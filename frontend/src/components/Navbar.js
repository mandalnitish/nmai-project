import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import logo from "../assets/logo.png";
import "./Navbar.css";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="navbar">
      <div className="navbar-wrap">
        {/* LOGO */}
        <div className="nav-left">
          <Link to="/" className="navbar-logo" onClick={closeMenu}>
            <img
              src={logo}
              alt="NMAI Current Affairs"
              className="logo-img"
            />
          </Link>
        </div>

        {/* MENU */}
        <nav className={`nav-center ${menuOpen ? "open" : ""}`}>
          <NavLink to="/" end onClick={closeMenu}>Home</NavLink>
          <NavLink to="/current-affairs" onClick={closeMenu}>Current Affairs</NavLink>
          <NavLink to="/mcq-practice" onClick={closeMenu}>MCQs</NavLink>
          <NavLink to="/daily-quiz" onClick={closeMenu}>Daily Quiz</NavLink>
          <NavLink to="/about-us" onClick={closeMenu}>About Us</NavLink>
          <NavLink to="/contact-us" onClick={closeMenu}>Contact</NavLink>
        </nav>

        {/* AUTH */}
        <div className="nav-right">
          {!isAuthenticated ? (
            <>
              <NavLink to="/login">Login</NavLink>
              <NavLink to="/register" className="register-link">
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

        {/* MOBILE TOGGLE */}
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
  );
}
