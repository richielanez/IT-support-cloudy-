import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path) => location.pathname === path;

  return (
    <header className="header">
      <div className="container">
        <nav className="nav" aria-label="Main navigation">
          <div className="brand" onClick={() => navigate("/")} style={{ cursor: "pointer" }}>
            <div className="brand-logo"><img src="/logo-cloudy.svg" alt="Cloudy IT Support logo" className="brand-logo-img" /></div>
            <div className="brand-text">
              <div className="brand-text-title">Cloudy IT Support</div>
              <div className="brand-text-sub">
                Fast &amp; Reliable IT Support for Home &amp; Business
              </div>
            </div>
          </div>
          <div className="nav-links">
            <Link to="/" className={`nav-link ${isActive("/") ? "active" : ""}`}>
              <span className="icon">🏠</span>Home
            </Link>
            <a href="/#services" className="nav-link">
              <span className="icon">💼</span>Services
            </a>
            <a href="/#contact" className="nav-link">
              <span className="icon">📞</span>Contact
            </a>
            <a href="/#about" className="nav-link">
              <span className="icon">👤</span>About Us
            </a>
            <Link to="/ticket" className={`nav-link ${isActive("/ticket") ? "active" : ""}`}>
              <span className="icon">🎫</span>Ticket Form
            </Link>
            <Link
              to="/admin"
              className={`nav-link primary ${
                location.pathname.startsWith("/admin") ? "active" : ""
              }`}
            >
              <span className="icon">🔐</span>Admin Dashboard
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
