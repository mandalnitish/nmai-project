// components/DarkModeToggle.js
import React from 'react';
import { FiSun, FiMoon } from 'react-icons/fi';
import { useDarkMode } from '../context/DarkModeContext';
import './DarkModeToggle.css';

const DarkModeToggle = ({ showLabel = false, className = '' }) => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  return (
    <button
      onClick={toggleDarkMode}
      className={`dark-mode-toggle ${className}`}
      aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <div className="toggle-icon-wrapper">
        {isDarkMode ? (
          <FiSun className="toggle-icon sun-icon" />
        ) : (
          <FiMoon className="toggle-icon moon-icon" />
        )}
      </div>
      {showLabel && (
        <span className="toggle-label">
          {isDarkMode ? 'Light' : 'Dark'}
        </span>
      )}
    </button>
  );
};

export default DarkModeToggle;