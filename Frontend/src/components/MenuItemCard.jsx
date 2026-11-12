import React from 'react';
import { useLanguage } from '../context/LanguageContext';

export const MenuItemCard = ({ item }) => {
  const { lang, t } = useLanguage();

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

  const category = (item.category || 'dish').toLowerCase();
  const badgeClass =
    category === 'burger' ? 'menu-item__badge--burger' :
    category === 'sandwich' ? 'menu-item__badge--sandwich' :
    category === 'tacos' ? 'menu-item__badge--tacos' : '';

  const badgeText =
    category === 'burger' ? t('badge.burger') :
    category === 'sandwich' ? t('badge.sandwich') :
    category === 'tacos' ? t('badge.tacos') :
    t('badge.dish');

  return (
    <article className="menu-item">
      <div className="menu-item__img-wrap">
        <img
          src={item.image || '/Assets/Pictures/Burger/Burger.jpg'}
          alt={name}
          className="menu-item__img"
          loading="lazy"
          onError={(e) => {
            // صورة احتياطية إذا كان الرابط غير صالح
            e.target.src = '/Assets/Pictures/Burger/Burger.jpg';
          }}
        />
        <span className={`menu-item__badge ${badgeClass}`}>{badgeText}</span>
      </div>
      <div className="menu-item__body">
        <h3 className="menu-item__name">{name}</h3>
        <p className="menu-item__desc">{desc}</p>
        <div className="menu-item__footer">
          <span className="menu-item__price">
            {item.price} <small>DA</small>
          </span>
        </div>
      </div>
    </article>
  );
};
