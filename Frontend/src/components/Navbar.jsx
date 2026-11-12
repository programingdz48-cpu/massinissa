import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

export const Navbar = () => {
  const { lang, setLang, t } = useLanguage();
  const { isAuthenticated } = useAuth();

  return (
    <header className="navbar" role="banner">
      <div className="navbar__logo">
        <svg className="navbar__logo-icon" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <circle cx="20" cy="20" r="18" stroke="#E85D2A" stroke-width="1.5"/>
          <path d="M14 28 C14 28 14 18 20 12 C26 18 26 28 26 28Z" fill="#E85D2A" opacity="0.3"/>
          <path d="M14 28 C14 28 14 18 20 12 C26 18 26 28 26 28Z" stroke="#E85D2A" stroke-width="1.5" fill="none"/>
          <line x1="20" y1="12" x2="20" y2="8" stroke="#E85D2A" stroke-width="1.5" stroke-linecap="round"/>
          <path d="M17 16 Q13 14 12 10" stroke="#E85D2A" stroke-width="1.2" stroke-linecap="round" fill="none"/>
          <path d="M23 16 Q27 14 28 10" stroke="#E85D2A" stroke-width="1.2" stroke-linecap="round" fill="none"/>
        </svg>
        <span className="navbar__logo-text">MASSI<span>NISSA</span></span>
      </div>

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
