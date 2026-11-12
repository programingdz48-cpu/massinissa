import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

export const Navbar = () => {
  const { lang, setLang, t } = useLanguage();
  const { isAuthenticated } = useAuth();

  return (
    <header className="navbar" role="banner">
      <Link to="/" className="navbar__logo" style={{ textDecoration: 'none' }}>
        <img
          src="/Assets/Pictures/massinissa logo/massinissa Logo.jpg"
          alt="Massinissa Logo"
          className="navbar__logo-img"
        />
        <span className="navbar__logo-text">MASSI<span>NISSA</span></span>
      </Link>

      <nav className="navbar__nav" aria-label="Main navigation">
        <a href="#hero" className="navbar__link navbar__link--active">{t('nav.home')}</a>
        <a href="#menu" className="navbar__link">{t('nav.menu')}</a>
        <a href="#shops" className="navbar__link">{t('nav.location')}</a>
        {isAuthenticated && (
          <Link to="/manager/dashboard" className="navbar__link" style={{ color: '#E85D2A', fontWeight: 'bold' }}>
            ⚙️ Dashboard
          </Link>
        )}
      </nav>

      {/* Language switcher */}
      <div className="lang-switcher" id="lang-switcher" role="group" aria-label="Language selector">
        <button
          className={`lang-btn ${lang === 'en' ? 'lang-btn--active' : ''}`}
          onClick={() => setLang('en')}
        >
          EN
        </button>
        <button
          className={`lang-btn ${lang === 'fr' ? 'lang-btn--active' : ''}`}
          onClick={() => setLang('fr')}
        >
          FR
        </button>
        <button
          className={`lang-btn ${lang === 'ar' ? 'lang-btn--active' : ''}`}
          onClick={() => setLang('ar')}
        >
          ع
        </button>
      </div>
    </header>
  );
};
