import React, { useEffect, useState } from 'react';
import { Send } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`nav-premium ${scrolled ? 'nav-scrolled' : ''}`}>
      <div className="nav-wrapper">
        <a href="#home" className="nav-logo">
          <span className="logo-dot"></span>
          LEDEL
        </a>

        <ul className={`nav-menu ${mobileMenuOpen ? 'active' : ''}`}>
          <li><a href="#home" onClick={() => setMobileMenuOpen(false)}>Genesis</a></li>
          <li><a href="#products" onClick={() => setMobileMenuOpen(false)}>Hardware</a></li>
          <li><a href="#services" onClick={() => setMobileMenuOpen(false)}>Solutions</a></li>
          <li><a href="#industries" onClick={() => setMobileMenuOpen(false)}>Sectors</a></li>
        </ul>

        <div className="nav-actions">
          <button className="btn-contact">
            Connect
            <Send size={16} />
            <div className="btn-glow"></div>
          </button>

          <button
            className={`mobile-toggle ${mobileMenuOpen ? 'open' : ''}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
