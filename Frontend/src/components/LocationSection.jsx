import React from 'react';
import { useLanguage } from '../context/LanguageContext';

export const LocationSection = () => {
  const { t } = useLanguage();

  return (
    <section className="location" id="shops" aria-label="Where to find us">
      <div className="location__info">
        <p className="location__eyebrow">{t('location.eyebrow')}</p>
        <h2 className="location__title">
          <span>{t('location.title1')}</span><br />
          <span>{t('location.title2')}</span>
        </h2>
        <div className="location__details">
          <div className="location__item">
            <div className="location__icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
              </svg>
            </div>
            <div>
              <p className="location__item-label">{t('location.addressLabel')}</p>
              <p
                className="location__item-value"
                dangerouslySetInnerHTML={{ __html: t('location.addressValue') }}
              />
            </div>
          </div>
          <div className="location__item">
            <div className="location__icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
              </svg>
            </div>
            <div>
              <p className="location__item-label">{t('location.hoursLabel')}</p>
              <p className="location__item-value">{t('location.hoursValue')}</p>
            </div>
          </div>
          <div className="location__item">
            <div className="location__icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.49 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.4 1.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.6a16 16 0 0 0 6 6l.79-.79a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.28 16z"/>
              </svg>
            </div>
            <div>
              <p className="location__item-label">{t('location.hotlineLabel')}</p>
              <p className="location__item-value">{t('location.hotlineValue')}</p>
            </div>
          </div>
        </div>
        <a
          href="https://maps.app.goo.gl/sQdbKLuzD1HCdJMe9"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-directions"
          id="get-directions-btn"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polygon points="3 11 22 2 13 21 11 13 3 11"/>
          </svg>
          <span>{t('location.directions')}</span>
        </a>
      </div>
      <div className="location__map-wrap">
        <iframe
          id="store-map"
          title="Massinissa location on Google Maps"
          src="https://maps.google.com/maps?q=36.189706,5.413961&z=16&output=embed"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
        <div className="location__map-overlay" aria-hidden="true"></div>
      </div>
    </section>
  );
};
