import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useMenu } from '../context/MenuContext';
import { MenuItemCard } from './MenuItemCard';

export const MenuSection = () => {
  const { lang, t } = useLanguage();
  const { menuItems, categories } = useMenu();
  const [selectedCategory, setSelectedCategory] = useState('all');

  // نص زر "الكل"
  const allLabel = lang === 'ar' ? 'الكل' : lang === 'fr' ? 'Tous' : 'All';

  // تصفية الأطباق حسب الفئة المختارة
  const filteredItems = selectedCategory === 'all'
    ? menuItems
    : menuItems.filter((item) => item.category?.toLowerCase() === selectedCategory.toLowerCase());

  // تجميع الأطباق المصفاة حسب الفئات لعرض العناوين
  const activeCategories = selectedCategory === 'all'
    ? categories.filter((cat) => menuItems.some((item) => item.category?.toLowerCase() === cat.id.toLowerCase()))
    : categories.filter((cat) => cat.id.toLowerCase() === selectedCategory.toLowerCase());

  // الأطباق التي تنتمي إلى فئات غير مسجلة أو محذوفة
  const uncategorizedItems = selectedCategory === 'all'
    ? menuItems.filter((item) => !categories.some((cat) => cat.id.toLowerCase() === item.category?.toLowerCase()))
    : [];

  return (
    <section className="menu-section" id="menu" aria-label="Our Menu">
      {/* رأس قسم المنيو */}
      <div className="menu-section__header">
        <p className="menu-section__eyebrow">{t('menu.eyebrow')}</p>
        <h2 className="menu-section__title">
          <span>{t('menu.titleOur')}</span> <span className="menu-accent">{t('menu.titleMenu')}</span>
        </h2>
        <p className="menu-section__sub">{t('menu.sub')}</p>
      </div>

      {/* ═══ شريط تصفح الفئات لتسهيل التصفح (Categories Navigation Bar) ═══ */}
      <div className="menu-categories-nav" role="tablist" aria-label="Categories navigation">
        <button
          className={`category-nav-pill ${selectedCategory === 'all' ? 'category-nav-pill--active' : ''}`}
          onClick={() => setSelectedCategory('all')}
          style={{
            borderColor: selectedCategory === 'all' ? 'var(--color-accent)' : 'rgba(255,255,255,0.15)',
            backgroundColor: selectedCategory === 'all' ? 'var(--color-accent)' : 'rgba(255,255,255,0.05)',
          }}
        >
          <span>🔥</span>
          <span>{allLabel}</span>
          <span className="category-pill-count">{menuItems.length}</span>
        </button>

        {categories.map((cat) => {
          const catName = lang === 'ar' ? cat.nameAr : lang === 'fr' ? cat.nameFr : cat.nameEn;
          const count = menuItems.filter((i) => i.category?.toLowerCase() === cat.id.toLowerCase()).length;
          const isSelected = selectedCategory === cat.id;

          return (
            <button
              key={cat.id}
              className={`category-nav-pill ${isSelected ? 'category-nav-pill--active' : ''}`}
              onClick={() => setSelectedCategory(cat.id)}
              style={{
                borderColor: isSelected ? cat.color : 'rgba(255,255,255,0.15)',
                backgroundColor: isSelected ? cat.color : 'rgba(255,255,255,0.05)',
                boxShadow: isSelected ? `0 4px 18px ${cat.color}66` : 'none',
              }}
            >
              <span
                style={{
                  display: 'inline-block',
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  backgroundColor: cat.color,
                }}
              />
              <span>{catName}</span>
              <span className="category-pill-count">{count}</span>
            </button>
          );
        })}
      </div>

      {/* عرض الأطباق حسب الفئات المحددة */}
      {activeCategories.map((cat) => {
        const itemsInCat = menuItems.filter(
          (item) => item.category?.toLowerCase() === cat.id.toLowerCase()
        );
        if (itemsInCat.length === 0) return null;

        const catName = lang === 'ar' ? cat.nameAr : lang === 'fr' ? cat.nameFr : cat.nameEn;

        return (
          <div key={cat.id} style={{ marginBottom: '3rem' }}>
            <div className="menu-category-header" style={{ borderBottomColor: `${cat.color}44` }}>
              <div
                className="menu-category-icon"
                style={{
                  backgroundColor: `${cat.color}22`,
                  borderColor: `${cat.color}66`,
                  color: cat.color,
                }}
              >
                <span style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>✦</span>
              </div>
              <h3 className="menu-category-title" style={{ color: '#fff' }}>
                {catName}
              </h3>
            </div>
            <div className="menu-grid">
              {itemsInCat.map((item) => (
                <MenuItemCard key={item.id} item={item} />
              ))}
            </div>
          </div>
        );
      })}

      {/* في حال وجود أطباق بفئات أخرى غير مخصصة */}
      {uncategorizedItems.length > 0 && (
        <div style={{ marginBottom: '3rem' }}>
          <div className="menu-category-header">
            <div className="menu-category-icon">
              <span style={{ fontSize: '1.2rem' }}>🍽️</span>
            </div>
            <h3 className="menu-category-title">
              {lang === 'ar' ? 'أطباق أخرى' : lang === 'fr' ? 'Autres Plats' : 'Other Dishes'}
            </h3>
          </div>
          <div className="menu-grid">
            {uncategorizedItems.map((item) => (
              <MenuItemCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      )}

      {filteredItems.length === 0 && (
        <div style={{ textAlign: 'center', padding: '4rem 1rem', color: 'rgba(255,255,255,0.6)' }}>
          <p style={{ fontSize: '1.1rem' }}>
            {lang === 'ar' ? 'لا توجد أطباق في هذا التصنيف حالياً' : 'No items found in this category'}
          </p>
        </div>
      )}
    </section>
  );
};
