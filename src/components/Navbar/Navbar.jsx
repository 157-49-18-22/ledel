import React, { useEffect, useState } from 'react';
import { Send } from 'lucide-react';
import './Navbar.css';

import { useContent } from '../../hooks/useContent';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { data, loading, getImageUrl } = useContent('navbar');

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (loading) return null;

  const logo = getImageUrl(data?.image) || '/logo.png';
  const menuItems = (data?.cards || []).length > 0 ? data.cards : [
    { title: 'Genesis', link: '#home' },
    { title: 'Hardware', link: '#products' },
    { title: 'Solutions', link: '#services' },
    { title: 'Sectors', link: '#industries' }
  ];

  return (
    <nav className={`nav-premium ${scrolled ? 'nav-scrolled' : ''}`}>
      <div className="nav-wrapper">
        <a href="#home" className="nav-logo">
          <img src={logo} alt="LEDEL" className="logo-img" />
        </a>

        <ul className={`nav-menu ${mobileMenuOpen ? 'active' : ''}`}>
          {menuItems.map((item, i) => (
            <li key={i}>
              <a href={item.link || '#'} onClick={() => setMobileMenuOpen(false)}>
                {item.title}
              </a>
            </li>
          ))}
          {/* Mobile only action */}
          <li className="mobile-only-action">
            <button className="btn-contact mobile-nav-btn">
              {data?.buttonText || 'Connect'}
              <Send size={16} />
            </button>
          </li>
        </ul>

        <div className="nav-actions">
          <button className="btn-contact">
            {data?.buttonText || 'Connect'}
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
