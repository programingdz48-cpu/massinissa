import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useMenu } from '../context/MenuContext';

export const MenuItemCard = ({ item }) => {
  const { lang } = useLanguage();
  const { categories } = useMenu();

  // الحصول على الاسم المناسب للغة
  const name =
    lang === 'ar' ? (item.nameAr || item.nameEn) :
    lang === 'fr' ? (item.nameFr || item.nameEn) :
    item.nameEn;

  // الحصول على الوصف المناسب للغة
  const desc =
    lang === 'ar' ? (item.descAr || item.descEn) :
    lang === 'fr' ? (item.descFr || item.descEn) :
    item.descEn;

  // البحث عن الفئة المطابقة لاستخراج اللون والاسم
  const matchedCategory = categories.find(
    (c) => c.id.toLowerCase() === item.category?.toLowerCase()
  );

  const categoryName = matchedCategory
    ? (lang === 'ar' ? matchedCategory.nameAr : lang === 'fr' ? matchedCategory.nameFr : matchedCategory.nameEn)
    : item.category;

  const categoryColor = matchedCategory?.color || '#E85D2A';

  return (
    <article className="menu-item">
      <div className="menu-item__img-wrap">
        <img
          src={item.image || '/Assets/Pictures/Burger/Burger.jpg'}
          alt={name}
          className="menu-item__img"
          loading="lazy"
          onError={(e) => {
            e.target.src = '/Assets/Pictures/Burger/Burger.jpg';
          }}
        />
        <span
          className="menu-item__badge"
          style={{
            backgroundColor: categoryColor,
            color: '#fff',
            boxShadow: `0 2px 10px ${categoryColor}66`,
          }}
        >
          {categoryName}
        </span>
      </div>
      <div className="menu-item__body">
        <h3 className="menu-item__name">{name}</h3>
        <p className="menu-item__desc">{desc}</p>
        <div className="menu-item__footer">
          <span className="menu-item__price" style={{ color: categoryColor }}>
            {item.price} <small style={{ color: `${categoryColor}bb` }}>DA</small>
          </span>
        </div>
      </div>
    </article>
  );
};
