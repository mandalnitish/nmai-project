import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Navbar.css";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="navbar">
      <div className="navbar-wrap">

        {/* LOGO */}
        <div className="nav-left">
          <Link to="/" className="navbar-logo">NMAI</Link>
        </div>

        {/* MENU */}
        <nav className={`nav-center ${menuOpen ? "open" : ""}`}>
          <NavLink to="/" end>Home</NavLink>
          <NavLink to="/current-affairs">Current Affairs</NavLink>
          <NavLink to="/mcq-practice">MCQs</NavLink>
          <NavLink to="/daily-quiz">Daily Quiz</NavLink>
          <NavLink to="/about-us">About Us</NavLink>
          <NavLink to="/contact-us">Contact</NavLink>
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

        {/* MOBILE */}
        <button
          className="nav-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

      </div>
    </header>
  );
}
