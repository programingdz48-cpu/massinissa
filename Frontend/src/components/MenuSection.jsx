import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useMenu } from '../context/MenuContext';
import { MenuItemCard } from './MenuItemCard';

export const MenuSection = () => {
  const { t } = useLanguage();
  const { menuItems } = useMenu();

  // تجميع الأصناف حسب الفئات
  const burgers = menuItems.filter((i) => i.category?.toLowerCase() === 'burger');
  const sandwiches = menuItems.filter((i) => i.category?.toLowerCase() === 'sandwich');
  const tacos = menuItems.filter((i) => i.category?.toLowerCase() === 'tacos');
  const others = menuItems.filter(
    (i) => !['burger', 'sandwich', 'tacos'].includes(i.category?.toLowerCase())
  );

  return (
    <section className="menu-section" id="menu" aria-label="Our Menu">
      <div className="menu-section__header">
        <p className="menu-section__eyebrow">{t('menu.eyebrow')}</p>
        <h2 className="menu-section__title">
          <span>{t('menu.titleOur')}</span> <span className="menu-accent">{t('menu.titleMenu')}</span>
        </h2>
        <p className="menu-section__sub">{t('menu.sub')}</p>
      </div>

      {/* Burgers */}
      {burgers.length > 0 && (
        <>
          <div className="menu-category-header">
            <div className="menu-category-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 18h16"/><path d="M4 18c0 1 1 2 2 2h12c1 0 2-1 2-2"/><path d="M4 18l-1-4h18l-1 4"/><path d="M3 14c0-5 4-8 9-8s9 3 9 8"/><line x1="8" y1="14" x2="8" y2="14.01"/><line x1="12" y1="14" x2="12" y2="14.01"/><line x1="16" y1="14" x2="16" y2="14.01"/>
              </svg>
            </div>
            <h3 className="menu-category-title">{t('cat.burger')}</h3>
          </div>
          <div className="menu-grid">
            {burgers.map((item) => (
              <MenuItemCard key={item.id} item={item} />
            ))}
          </div>
        </>
      )}

      {/* Sandwiches */}
      {sandwiches.length > 0 && (
        <>
          <div className="menu-category-header">
            <div className="menu-category-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 11h18"/><path d="M5 11V8a7 7 0 0 1 14 0v3"/><path d="M3 11c0 3 2 5 4 6h10c2-1 4-3 4-6"/><path d="M3 17h18"/>
              </svg>
            </div>
            <h3 className="menu-category-title">{t('cat.sandwich')}</h3>
          </div>
          <div className="menu-grid">
            {sandwiches.map((item) => (
              <MenuItemCard key={item.id} item={item} />
            ))}
          </div>
        </>
      )}

      {/* Tacos */}
      {tacos.length > 0 && (
        <>
          <div className="menu-category-header">
            <div className="menu-category-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 20C4 20 4 12 12 8C20 12 20 20 20 20Z"/><path d="M7 17h10"/><circle cx="10" cy="14" r="1"/><circle cx="14" cy="14" r="1"/>
              </svg>
            </div>
            <h3 className="menu-category-title">{t('cat.tacos')}</h3>
          </div>
          <div className="menu-grid menu-grid--three">
            {tacos.map((item) => (
              <MenuItemCard key={item.id} item={item} />
            ))}
          </div>
        </>
      )}

      {/* Other newly added categories */}
      {others.length > 0 && (
        <>
          <div className="menu-category-header">
            <div className="menu-category-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>
              </svg>
            </div>
            <h3 className="menu-category-title">{t('cat.other')}</h3>
          </div>
          <div className="menu-grid">
            {others.map((item) => (
              <MenuItemCard key={item.id} item={item} />
            ))}
          </div>
        </>
      )}
    </section>
  );
};
