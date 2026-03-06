import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../store';

export default function Navbar() {
  const { user, logout } = useAuthStore();

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          CareerForge Pro
        </Link>

        <div className="nav-menu">
          {user ? (
            <>
              <Link to="/dashboard" className="nav-link">
                Dashboard
              </Link>
              <Link to="/resume-builder" className="nav-link">
                Resume Builder
              </Link>
              <Link to="/job-matcher" className="nav-link">
                Job Matcher
              </Link>
              <Link to="/profile" className="nav-link">
                Profile
              </Link>
              <button className="nav-btn logout-btn" onClick={logout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/pricing" className="nav-link">
                Pricing
              </Link>
              <Link to="/login" className="nav-link">
                Login
              </Link>
              <Link to="/register" className="nav-link">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
