/* ============================================================
   Massinissa - script.js
   i18n: English, French, Arabic (RTL)
   ============================================================ */

const translations = {
  en: {
    'nav.home'     : 'Home',
    'nav.menu'     : 'Menu',
    'nav.location' : 'Location',
    'hero.eyebrow' : 'THE BEST BURGERS, SANDWICHES & TACOS IN TOWN',
    'hero.title'   : 'Massinissa',
    'hero.desc'    : 'Discover the finest burgers, loaded sandwiches, crispy tacos and authentic Lebanese wraps — crafted fresh with bold spices and premium ingredients.<br><br>A taste journey inspired by tradition, made for today.',
    'location.eyebrow'      : 'VISIT US',
    'location.title1'       : 'Where to',
    'location.title2'       : 'Find Us',
    'location.addressLabel' : 'Address',
    'location.addressValue' : 'Massinissa — Main Branch<br>Tap the map to get directions',
    'location.hoursLabel'   : 'Opening Hours',
    'location.hoursValue'   : 'Every Day except Friday — 8:00 AM – 10:00 PM',
    'location.hotlineLabel' : 'Hotline',
    'location.hotlineValue' : 'Call us anytime',
    'location.directions'   : 'Get Directions',
    'menu.eyebrow'   : 'WHAT WE SERVE',
    'menu.titleOur'  : 'Our',
    'menu.titleMenu' : 'Menu',
    'menu.sub'       : 'Fresh ingredients & bold flavours — all priced in Algerian Dinar',
    'cat.burger'   : 'Burger',
    'cat.sandwich' : 'Sandwich',
    'cat.tacos'    : 'Tacos',
    'badge.burger'   : 'Burger',
    'badge.sandwich' : 'Sandwich',
    'badge.tacos'    : 'Tacos',
    'items.burgerPouletHache.name' : 'Chicken Burger',
    'items.burgerPouletHache.desc' : 'Juicy minced chicken patty with fresh vegetables and sauce',
    'items.burgerViandeHache.name' : 'Beef Burger',
    'items.burgerViandeHache.desc' : 'Classic beef patty grilled to perfection with all the toppings',
    'items.doubleBurger.name'      : 'Double Beef Burger',
    'items.doubleBurger.desc'      : 'Double stacked beef patties for the ultimate burger experience',
    'items.burgerComplete.name'    : 'Complete Burger',
    'items.burgerComplete.desc'    : 'Fully loaded burger with cheese, egg, and all the extras',
    'items.fritOmelette.name'      : 'Fries & Omelette',
    'items.fritOmelette.desc'      : 'Crispy fries and fluffy omelette in a warm baguette',
    'items.sandPouletHache.name'   : 'Minced Chicken',
    'items.sandPouletHache.desc'   : 'Minced chicken sandwich with fresh salad and house sauce',
    'items.sandSpecial.name'       : 'Special',
    'items.sandSpecial.desc'       : "Our chef's special blend with premium toppings and sauces",
    'items.pouletMarine.name'      : 'Marinated Chicken',
    'items.pouletMarine.desc'      : 'Tender marinated chicken grilled and served in fresh bread',
    'items.tacosViande.name'       : 'Beef Tacos',
    'items.tacosViande.desc'       : 'French tacos stuffed with seasoned minced beef and melted cheese',
    'items.tacosMix.name'          : 'Mix Tacos',
    'items.tacosMix.desc'          : 'The ultimate mix of chicken and beef with special sauce',
    'items.tacosPoulet.name'       : 'Chicken Tacos',
    'items.tacosPoulet.desc'       : 'Grilled chicken strips wrapped with fries and cheese sauce',
  },
  fr: {
    'nav.home'     : 'Accueil',
    'nav.menu'     : 'Menu',
    'nav.location' : 'Localisation',
    'hero.eyebrow' : 'LES MEILLEURS BURGERS, SANDWICHES & TACOS EN VILLE',
    'hero.title'   : 'Massinissa',
    'hero.desc'    : 'Découvrez les meilleurs burgers, sandwiches garnis, tacos croustillants et wraps libanais authentiques — préparés frais avec des épices audacieuses et des ingrédients premium.<br><br>Un voyage gustatif inspiré par la tradition, fait pour aujourd\'hui.',
    'location.eyebrow'      : 'NOUS RENDRE VISITE',
    'location.title1'       : 'Où nous',
    'location.title2'       : 'Trouver',
    'location.addressLabel' : 'Adresse',
    'location.addressValue' : "Massinissa — Branche Principale<br>Appuyez sur la carte pour l'itinéraire",
    'location.hoursLabel'   : "Horaires d'ouverture",
    'location.hoursValue'   : 'Tous les jours sauf vendredi — 8h00 – 22h00',
    'location.hotlineLabel' : 'Hotline',
    'location.hotlineValue' : 'Appelez-nous à tout moment',
    'location.directions'   : "Obtenir l'itinéraire",
    'menu.eyebrow'   : 'CE QUE NOUS SERVONS',
    'menu.titleOur'  : 'Notre',
    'menu.titleMenu' : 'Menu',
    'menu.sub'       : 'Ingrédients frais & saveurs audacieuses — prix en Dinar Algérien',
    'cat.burger'   : 'Burger',
    'cat.sandwich' : 'Sandwich',
    'cat.tacos'    : 'Tacos',
    'badge.burger'   : 'Burger',
    'badge.sandwich' : 'Sandwich',
    'badge.tacos'    : 'Tacos',
    'items.burgerPouletHache.name' : 'Burger Poulet Haché',
    'items.burgerPouletHache.desc' : 'Galette de poulet haché juteuse avec légumes frais et sauce',
    'items.burgerViandeHache.name' : 'Burger Viande Hachée',
    'items.burgerViandeHache.desc' : 'Galette de bœuf classique grillée à la perfection',
    'items.doubleBurger.name'      : 'Double Viande Hachée',
    'items.doubleBurger.desc'      : 'Double galette de bœuf pour une expérience burger ultime',
    'items.burgerComplete.name'    : 'Hamburger Complète',
    'items.burgerComplete.desc'    : 'Burger complet avec fromage, œuf et tous les extras',
    'items.fritOmelette.name'      : 'Frit Omelette',
    'items.fritOmelette.desc'      : 'Frites croustillantes et omelette moelleuse dans une baguette chaude',
    'items.sandPouletHache.name'   : 'Poulet Haché',
    'items.sandPouletHache.desc'   : 'Sandwich poulet haché avec salade fraîche et sauce maison',
    'items.sandSpecial.name'       : 'Spécial',
    'items.sandSpecial.desc'       : 'Le mélange spécial du chef avec garnitures et sauces premium',
    'items.pouletMarine.name'      : 'Poulet Mariné',
    'items.pouletMarine.desc'      : 'Poulet mariné tendre grillé et servi dans du pain frais',
    'items.tacosViande.name'       : 'Tacos Viande Hachée',
    'items.tacosViande.desc'       : 'Tacos français garnis de bœuf haché assaisonné et fromage fondu',
    'items.tacosMix.name'          : 'Tacos Mix',
    'items.tacosMix.desc'          : 'Le mix ultime de poulet et bœuf avec sauce spéciale',
    'items.tacosPoulet.name'       : 'Tacos Poulet',
    'items.tacosPoulet.desc'       : 'Lamelles de poulet grillé avec frites et sauce fromagère',
  },
  ar: {
    'nav.home'     : 'الرئيسية',
    'nav.menu'     : 'القائمة',
    'nav.location' : 'الموقع',
    'hero.eyebrow' : 'أفضل البرغر والساندويتشات والتاكوس في المدينة',
    'hero.title'   : 'ماسينيسا',
    'hero.desc'    : 'اكتشف أفضل البرغر، الساندويتشات المحشوّة، التاكوس المقرمشة واللفائف اللبنانية الأصيلة — محضّرة طازجة بتوابل جريئة ومكونات فاخرة.<br><br>رحلة نكهات مستوحاة من التراث، صُنعت لليوم.',
    'location.eyebrow'      : 'زورونا',
    'location.title1'       : 'أين',
    'location.title2'       : 'تجدنا',
    'location.addressLabel' : 'العنوان',
    'location.addressValue' : 'ماسينيسا — الفرع الرئيسي<br>اضغط على الخريطة للاتجاهات',
    'location.hoursLabel'   : 'أوقات العمل',
    'location.hoursValue'   : 'كل يوم ما عدا الجمعة — 8:00 صباحاً – 10:00 مساءً',
    'location.hotlineLabel' : 'خط ساخن',
    'location.hotlineValue' : 'اتصل بنا في أي وقت',
    'location.directions'   : 'احصل على الاتجاهات',
    'menu.eyebrow'   : 'ما نقدّمه',
    'menu.titleOur'  : 'قائمة',
    'menu.titleMenu' : 'طعامنا',
    'menu.sub'       : 'مكونات طازجة ونكهات جريئة — جميع الأسعار بالدينار الجزائري',
    'cat.burger'   : 'برغر',
    'cat.sandwich' : 'ساندويتش',
    'cat.tacos'    : 'تاكوس',
    'badge.burger'   : 'برغر',
    'badge.sandwich' : 'ساندويتش',
    'badge.tacos'    : 'تاكوس',
    'items.burgerPouletHache.name' : 'برغر دجاج مفروم',
    'items.burgerPouletHache.desc' : 'قطعة دجاج مفروم طرية مع خضروات طازجة وصلصة',
    'items.burgerViandeHache.name' : 'برغر لحم مفروم',
    'items.burgerViandeHache.desc' : 'قطعة لحم بقري كلاسيكية مشوية بإتقان مع كل الإضافات',
    'items.doubleBurger.name'      : 'برغر دوبل لحم',
    'items.doubleBurger.desc'      : 'طبقتان من اللحم البقري لتجربة برغر لا تُنسى',
    'items.burgerComplete.name'    : 'هامبرغر كاملة',
    'items.burgerComplete.desc'    : 'برغر محشو بالكامل مع الجبن والبيض وكل الإضافات',
    'items.fritOmelette.name'      : 'فريت أومليت',
    'items.fritOmelette.desc'      : 'بطاطس مقلية مقرمشة وأومليت هشة في خبز باغيت دافئ',
    'items.sandPouletHache.name'   : 'دجاج مفروم',
    'items.sandPouletHache.desc'   : 'ساندويتش دجاج مفروم مع سلطة طازجة وصلصة المنزل',
    'items.sandSpecial.name'       : 'سبيسيال',
    'items.sandSpecial.desc'       : 'خلطة الشيف الخاصة مع إضافات وصلصات فاخرة',
    'items.pouletMarine.name'      : 'دجاج متبّل',
    'items.pouletMarine.desc'      : 'دجاج متبّل طري مشوي ومقدّم في خبز طازج',
    'items.tacosViande.name'       : 'تاكوس لحم مفروم',
    'items.tacosViande.desc'       : 'تاكوس فرنسي محشو بلحم بقري متبّل وجبن ذائب',
    'items.tacosMix.name'          : 'تاكوس ميكس',
    'items.tacosMix.desc'          : 'المزيج المثالي من الدجاج واللحم مع صلصة خاصة',
    'items.tacosPoulet.name'       : 'تاكوس دجاج',
    'items.tacosPoulet.desc'       : 'شرائح دجاج مشوية ملفوفة مع البطاطس وصلصة الجبن',
  }
};

function applyLang(lang) {
  const t = translations[lang];
  if (!t) return;
  const isRTL = (lang === 'ar');
  document.documentElement.lang = lang;
  document.documentElement.dir  = isRTL ? 'rtl' : 'ltr';
  document.body.classList.toggle('lang-ar', isRTL);
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (t[key] !== undefined) el.innerHTML = t[key];
  });
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('lang-btn--active', btn.dataset.lang === lang);
  });
  localStorage.setItem('massinissaLang', lang);
}

document.querySelectorAll('.lang-btn').forEach(btn => {
  btn.addEventListener('click', () => applyLang(btn.dataset.lang));
});

document.addEventListener('DOMContentLoaded', () => {
  const saved = localStorage.getItem('massinissaLang') || 'en';
  applyLang(saved);

  const els = document.querySelectorAll('.hero__content, .hero__cup-wrap');
  els.forEach((el, i) => {
    el.style.opacity    = '0';
    el.style.transform  = 'translateY(24px)';
    el.style.transition = 'opacity .6s ease, transform .6s ease';
    el.style.transitionDelay = (i * 0.15) + 's';
    requestAnimationFrame(() => {
      el.style.opacity   = '1';
      el.style.transform = 'translateY(0)';
    });
  });

  // Intersection Observer for menu items
  const menuItems = document.querySelectorAll('.menu-item');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  menuItems.forEach((item, i) => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(30px)';
    item.style.transition = `opacity .5s ease ${i * 0.08}s, transform .5s ease ${i * 0.08}s`;
    observer.observe(item);
  });

  // Active nav link on scroll
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY + 100;
    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');
      const link = document.querySelector(`.navbar__link[href="#${id}"]`);
      if (link) {
        if (scrollY >= top && scrollY < top + height) {
          document.querySelectorAll('.navbar__link').forEach(l => l.classList.remove('navbar__link--active'));
          link.classList.add('navbar__link--active');
        }
      }
    });
  });
});

