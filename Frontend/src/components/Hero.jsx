import React from 'react';
import { useLanguage } from '../context/LanguageContext';

export const Hero = () => {
  const { t } = useLanguage();

  return (
    <main>
      <section className="hero" id="hero" aria-label="Welcome">
        <div className="hero__content">
          <p className="hero__eyebrow">{t('hero.eyebrow')}</p>
          <h1 className="hero__title">
            <span>{t('hero.title')}</span>
          </h1>
          <p
            className="hero__desc"
            dangerouslySetInnerHTML={{ __html: t('hero.desc') }}
          />
        </div>
        <div className="hero__cup-wrap" aria-hidden="true">
          <div className="hero__glow"></div>
          <img
            src="/Assets/Pictures/massinissa logo/massinissa Logo.jpg"
            alt="Massinissa Official Logo"
            className="hero__cup-img hero__logo-hero"
            draggable="false"
          />
        </div>
      </section>
    </main>
  );
};
