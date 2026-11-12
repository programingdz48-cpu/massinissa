import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useMenu } from '../context/MenuContext';
import { useNavigate, Link } from 'react-router-dom';
import {
  PlusCircle,
  Trash2,
  LogOut,
  ExternalLink,
  RefreshCw,
  Layers,
  CheckCircle,
  Tag,
  UtensilsCrossed,
} from 'lucide-react';

export const Dashboard = () => {
  const { adminUser, logout } = useAuth();
  const {
    menuItems,
    addItem,
    updateItem,
    deleteItem,
    categories,
    addCategory,
    updateCategory,
    deleteCategory,
    resetToDefault,
  } = useMenu();

  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('items'); // 'items' | 'categories'

  // نموذج إضافة صنف
  const [formData, setFormData] = useState({
    nameAr: '',
    nameFr: '',
    nameEn: '',
    descAr: '',
    descFr: '',
    descEn: '',
    category: categories[0]?.id || 'burger',
    price: '',
    image: '/Assets/Pictures/Burger/Burger.jpg',
  });

  // نموذج إضافة تصنيف جديد
  const [categoryForm, setCategoryForm] = useState({
    id: '',
    nameAr: '',
    nameFr: '',
    nameEn: '',
    color: '#E85D2A',
  });

  const [successMsg, setSuccessMsg] = useState('');

  // إحصائيات
  const totalItems = menuItems.length;

  const handleLogout = () => {
    logout();
    navigate('/manager');
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddItem = (e) => {
    e.preventDefault();
    if (!formData.nameAr && !formData.nameEn && !formData.nameFr) {
      alert('يرجى إدخال اسم الصنف على الأقل بلغة واحدة');
      return;
    }
    if (!formData.price || Number(formData.price) <= 0) {
      alert('يرجى تحديد سعر صالح بالدينار الجزائري');
      return;
    }

    addItem({
      ...formData,
      nameEn: formData.nameEn || formData.nameAr || formData.nameFr,
      nameFr: formData.nameFr || formData.nameEn,
      nameAr: formData.nameAr || formData.nameEn,
      descEn: formData.descEn || formData.descAr || '',
      descFr: formData.descFr || formData.descEn || '',
      descAr: formData.descAr || formData.descEn || '',
      price: Number(formData.price),
    });

    setSuccessMsg('تمت إضافة الصنف بنجاح إلى القائمة!');
    setTimeout(() => setSuccessMsg(''), 4000);

    setFormData({
      nameAr: '',
      nameFr: '',
      nameEn: '',
      descAr: '',
      descFr: '',
      descEn: '',
      category: categories[0]?.id || 'burger',
      price: '',
      image: '/Assets/Pictures/Burger/Burger.jpg',
    });
  };

  // معالجة إضافة فئة جديدة
  const handleAddCategory = (e) => {
    e.preventDefault();
    if (!categoryForm.nameAr && !categoryForm.nameEn && !categoryForm.nameFr) {
      alert('يرجى إدخال اسم الفئة على الأقل بلغة واحدة');
      return;
    }

    const generatedId =
      categoryForm.id.trim() ||
      (categoryForm.nameEn || categoryForm.nameFr || categoryForm.nameAr)
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-');

    if (categories.some((c) => c.id.toLowerCase() === generatedId.toLowerCase())) {
      alert('هذا المعرّف موجود مسبقاً، يرجى اختيار اسم أو معرّف آخر');
      return;
    }

    addCategory({
      id: generatedId,
      nameAr: categoryForm.nameAr || categoryForm.nameEn,
      nameFr: categoryForm.nameFr || categoryForm.nameEn,
      nameEn: categoryForm.nameEn || categoryForm.nameAr,
      color: categoryForm.color || '#E85D2A',
    });

    setSuccessMsg('تمت إضافة التصنيف بنجاح!');
    setTimeout(() => setSuccessMsg(''), 4000);

    setCategoryForm({
      id: '',
      nameAr: '',
      nameFr: '',
      nameEn: '',
      color: '#E85D2A',
    });
  };

  return (
    <div className="dashboard-wrapper">
      {/* Navbar Dashboard */}
      <header className="dashboard-navbar">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
          <img
            src="/Assets/Pictures/massinissa logo/massinissa Logo.jpg"
            alt="Massinissa Logo"
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              objectFit: 'cover',
              border: '1.5px solid #E85D2A',
            }}
          />
          <span style={{ fontFamily: 'Playfair Display SC', fontSize: '1.25rem', color: '#fff', letterSpacing: '0.1em' }}>
            MASSI<span style={{ color: '#E85D2A' }}>NISSA</span> <small style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)', fontFamily: 'sans-serif' }}>| لوحة الإدارة</small>
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <Link
            to="/"
            target="_blank"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              background: 'rgba(255,255,255,0.08)',
              padding: '0.45rem 0.9rem',
              borderRadius: '6px',
              fontSize: '0.85rem',
              color: '#fff',
              border: '1px solid rgba(255,255,255,0.15)',
              textDecoration: 'none',
            }}
          >
            <ExternalLink size={15} /> معاينة الموقع
          </Link>
          <button
            onClick={handleLogout}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              background: 'rgba(185,28,28,0.2)',
              border: '1px solid rgba(185,28,28,0.5)',
              padding: '0.45rem 0.9rem',
              borderRadius: '6px',
              fontSize: '0.85rem',
              color: '#f87171',
              cursor: 'pointer',
            }}
          >
            <LogOut size={15} /> خروج ({adminUser})
          </button>
        </div>
      </header>

      <div className="dashboard-container">
        {/* Stats */}
        <div className="dashboard-stats">
          <div className="dashboard-stat-card">
            <div className="stat-icon"><Layers size={24} /></div>
            <div>
              <div className="stat-num">{totalItems}</div>
              <div className="stat-label">إجمالي الأطباق</div>
            </div>
          </div>
          <div className="dashboard-stat-card">
            <div className="stat-icon"><Tag size={24} /></div>
            <div>
              <div className="stat-num">{categories.length}</div>
              <div className="stat-label">التصنيفات المتاحة</div>
            </div>
          </div>
          {categories.slice(0, 2).map((cat) => {
            const count = menuItems.filter((i) => i.category?.toLowerCase() === cat.id.toLowerCase()).length;
            return (
              <div key={cat.id} className="dashboard-stat-card">
                <div
                  className="stat-icon"
                  style={{
                    backgroundColor: `${cat.color}22`,
                    color: cat.color,
                    borderColor: `${cat.color}44`,
                  }}
                >
                  ●
                </div>
                <div>
                  <div className="stat-num">{count}</div>
                  <div className="stat-label">{cat.nameAr || cat.nameEn}</div>
                </div>
              </div>
            );
          })}
        </div>

        {successMsg && (
          <div style={{
            background: 'rgba(16, 185, 129, 0.2)',
            border: '1px solid rgba(16, 185, 129, 0.6)',
            color: '#6ee7b7',
            padding: '1rem',
            borderRadius: '10px',
            marginBottom: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
          }}>
            <CheckCircle size={20} /> {successMsg}
          </div>
        )}

        {/* Tabs switcher */}
        <div className="dashboard-tabs">
          <button
            className={`dashboard-tab-btn ${activeTab === 'items' ? 'dashboard-tab-btn--active' : ''}`}
            onClick={() => setActiveTab('items')}
          >
            <UtensilsCrossed size={16} style={{ verticalAlign: 'middle', marginLeft: '6px' }} />
            إدارة الأطباق والمنيو
          </button>
          <button
            className={`dashboard-tab-btn ${activeTab === 'categories' ? 'dashboard-tab-btn--active' : ''}`}
            onClick={() => setActiveTab('categories')}
          >
            <Tag size={16} style={{ verticalAlign: 'middle', marginLeft: '6px' }} />
            إدارة التصنيفات والألوان
          </button>
        </div>

        {/* TAB 1: ITEMS MANAGEMENT */}
        {activeTab === 'items' && (
          <>
            {/* Add Item Form */}
            <div className="admin-card">
              <h3 className="admin-card-title">
                <PlusCircle size={20} color="#E85D2A" /> إضافة طبق جديد إلى المنيو
              </h3>
              <form onSubmit={handleAddItem}>
                <div className="admin-form-grid">
                  <div className="admin-form-group">
                    <label>الاسم بالعربية (مطلوب)</label>
                    <input
                      type="text"
                      name="nameAr"
                      className="admin-input"
                      placeholder="مثال: برغر باربيكيو خاص"
                      value={formData.nameAr}
                      onChange={handleFormChange}
                    />
                  </div>

                  <div className="admin-form-group">
                    <label>Nom en Français</label>
                    <input
                      type="text"
                      name="nameFr"
                      className="admin-input"
                      placeholder="Ex: Burger Spécial BBQ"
                      value={formData.nameFr}
                      onChange={handleFormChange}
                    />
                  </div>

                  <div className="admin-form-group">
                    <label>Name in English</label>
                    <input
                      type="text"
                      name="nameEn"
                      className="admin-input"
                      placeholder="Ex: Special BBQ Burger"
                      value={formData.nameEn}
                      onChange={handleFormChange}
                    />
                  </div>

                  <div className="admin-form-group">
                    <label>التصنيف / Category</label>
                    <select
                      name="category"
                      className="admin-input"
                      value={formData.category}
                      onChange={handleFormChange}
                      style={{ background: '#1A1A2E' }}
                    >
                      {categories.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.nameAr} / {c.nameFr || c.nameEn}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="admin-form-group">
                    <label>السعر بالدينار الجزائري (DA)</label>
                    <input
                      type="number"
                      name="price"
                      className="admin-input"
                      placeholder="مثال: 350"
                      value={formData.price}
                      onChange={handleFormChange}
                      min="0"
                      required
                    />
                  </div>

                  <div className="admin-form-group">
                    <label>الصورة (اختر أو ارفع من جهازك)</label>
                    <select
                      name="image"
                      className="admin-input"
                      value={formData.image}
                      onChange={handleFormChange}
                      style={{ background: '#1A1A2E', marginBottom: '0.5rem' }}
                    >
                      <option value="/Assets/Pictures/Burger/Burger.jpg">برغر كاملة (Burger Complete)</option>
                      <option value="/Assets/Pictures/Burger/Burger_Chicken.jpg">برغر دجاج (Chicken)</option>
                      <option value="/Assets/Pictures/Burger/Burger_viande_Hache.jpg">برغر لحم (Beef)</option>
                      <option value="/Assets/Pictures/Burger/Double_viande_Hache.jpg">دوبل لحم (Double Beef)</option>
                      <option value="/Assets/Pictures/Sandwich/Frite omlete.jpg">ساندويتش فريت أومليت</option>
                      <option value="/Assets/Pictures/Sandwich/Poulet_Hache.jpg">ساندويتش دجاج مفروم</option>
                      <option value="/Assets/Pictures/Sandwich/poulet Marine.jpg">ساندويتش دجاج متبل</option>
                      <option value="/Assets/Pictures/Sandwich/speciale.jpg">ساندويتش سبيسيال</option>
                      <option value="/Assets/Pictures/Tacos/Viande Ache.jpg">تاكوس لحم مفروم</option>
                      <option value="/Assets/Pictures/Tacos/Mix.jpg">تاكوس ميكس</option>
                      <option value="/Assets/Pictures/Tacos/Poulet.jpg">تاكوس دجاج</option>
                    </select>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageFile}
                      style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.7)' }}
                    />
                  </div>
                </div>

                <div className="admin-form-group" style={{ marginTop: '0.5rem' }}>
                  <label>الوصف بالعربية</label>
                  <input
                    type="text"
                    name="descAr"
                    className="admin-input"
                    placeholder="وصف مختصر لمكونات الطبق"
                    value={formData.descAr}
                    onChange={handleFormChange}
                  />
                </div>

                <button type="submit" className="admin-btn-primary" style={{ maxWidth: '280px', marginTop: '1rem' }}>
                  + حفظ وإضافة إلى المنيو
                </button>
              </form>
            </div>

            {/* Existing Items Table */}
            <div className="admin-card">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.2rem' }}>
                <h3 className="admin-card-title" style={{ margin: 0, border: 'none' }}>
                  قائمة أطباق ماسينيسا الحالية ({menuItems.length})
                </h3>
                <button
                  onClick={() => {
                    if (window.confirm('هل أنت متأكد من استرجاع القائمة والتصنيفات الافتراضية؟')) {
                      resetToDefault();
                    }
                  }}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    background: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(255,255,255,0.15)',
                    color: 'rgba(255,255,255,0.7)',
                    padding: '0.4rem 0.8rem',
                    borderRadius: '6px',
                    fontSize: '0.8rem',
                    cursor: 'pointer',
                  }}
                >
                  <RefreshCw size={14} /> استرجاع القائمة الافتراضية
                </button>
              </div>

              <div className="admin-table-wrap">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>الصورة</th>
                      <th>الاسم بالعربية</th>
                      <th>الاسم بالفرنسية / الإنجليزية</th>
                      <th>التصنيف</th>
                      <th>السعر (DA)</th>
                      <th>إجراءات</th>
                    </tr>
                  </thead>
                  <tbody>
                    {menuItems.map((item) => {
                      const cat = categories.find((c) => c.id.toLowerCase() === item.category?.toLowerCase());
                      const catColor = cat?.color || '#E85D2A';
                      const catTitle = cat?.nameAr || item.category;

                      return (
                        <tr key={item.id}>
                          <td>
                            <img src={item.image} alt={item.nameAr || item.nameEn} className="table-img" />
                          </td>
                          <td style={{ fontWeight: 600 }}>{item.nameAr || '—'}</td>
                          <td>{item.nameFr || item.nameEn}</td>
                          <td>
                            <span style={{
                              padding: '0.25rem 0.65rem',
                              borderRadius: '999px',
                              fontSize: '0.75rem',
                              backgroundColor: `${catColor}22`,
                              color: catColor,
                              border: `1px solid ${catColor}55`,
                              textTransform: 'uppercase',
                              fontWeight: 'bold',
                            }}>
                              {catTitle}
                            </span>
                          </td>
                          <td>
                            <input
                              type="number"
                              defaultValue={item.price}
                              onBlur={(e) => {
                                const val = Number(e.target.value);
                                if (val > 0 && val !== item.price) {
                                  updateItem(item.id, { price: val });
                                }
                              }}
                              style={{
                                width: '90px',
                                padding: '0.3rem 0.5rem',
                                background: 'rgba(255,255,255,0.08)',
                                border: `1px solid ${catColor}66`,
                                borderRadius: '6px',
                                color: catColor,
                                fontWeight: 'bold',
                              }}
                            />
                          </td>
                          <td>
                            <button
                              className="btn-delete"
                              onClick={() => {
                                if (window.confirm(`هل أنت متأكد من حذف ${item.nameAr || item.nameEn}؟`)) {
                                  deleteItem(item.id);
                                }
                              }}
                            >
                              <Trash2 size={15} style={{ verticalAlign: 'middle', marginLeft: '4px' }} /> حذف
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {/* TAB 2: CATEGORIES MANAGEMENT */}
        {activeTab === 'categories' && (
          <>
            {/* Add Category Form */}
            <div className="admin-card">
              <h3 className="admin-card-title">
                <Tag size={20} color="#E85D2A" /> إضافة تصنيف جديد مع اللون الخاص به
              </h3>
              <form onSubmit={handleAddCategory}>
                <div className="admin-form-grid">
                  <div className="admin-form-group">
                    <label>الاسم بالعربية (مثل: مشويات)</label>
                    <input
                      type="text"
                      className="admin-input"
                      placeholder="مثال: بيتزا، مشويات، مشروبات"
                      value={categoryForm.nameAr}
                      onChange={(e) => setCategoryForm({ ...categoryForm, nameAr: e.target.value })}
                      required
                    />
                  </div>

                  <div className="admin-form-group">
                    <label>Nom en Français</label>
                    <input
                      type="text"
                      className="admin-input"
                      placeholder="Ex: Grillades, Boissons"
                      value={categoryForm.nameFr}
                      onChange={(e) => setCategoryForm({ ...categoryForm, nameFr: e.target.value })}
                    />
                  </div>

                  <div className="admin-form-group">
                    <label>Name in English</label>
                    <input
                      type="text"
                      className="admin-input"
                      placeholder="Ex: Grills, Drinks"
                      value={categoryForm.nameEn}
                      onChange={(e) => setCategoryForm({ ...categoryForm, nameEn: e.target.value })}
                    />
                  </div>

                  <div className="admin-form-group">
                    <label>لون التصنيف والبادج / Category Color</label>
                    <div className="color-picker-row">
                      <input
                        type="color"
                        className="color-input-preview"
                        value={categoryForm.color}
                        onChange={(e) => setCategoryForm({ ...categoryForm, color: e.target.value })}
                      />
                      <input
                        type="text"
                        className="admin-input"
                        value={categoryForm.color}
                        onChange={(e) => setCategoryForm({ ...categoryForm, color: e.target.value })}
                        style={{ maxWidth: '140px' }}
                      />
                      <span
                        style={{
                          padding: '0.4rem 1rem',
                          borderRadius: '999px',
                          backgroundColor: categoryForm.color,
                          color: '#fff',
                          fontWeight: 'bold',
                          fontSize: '0.8rem',
                        }}
                      >
                        معاينة البادج
                      </span>
                    </div>
                  </div>
                </div>

                <button type="submit" className="admin-btn-primary" style={{ maxWidth: '280px', marginTop: '1rem' }}>
                  + إضافة التصنيف
                </button>
              </form>
            </div>

            {/* Existing Categories Table */}
            <div className="admin-card">
              <h3 className="admin-card-title">التصنيفات الحالية ({categories.length})</h3>
              <div className="admin-table-wrap">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>اللون</th>
                      <th>الاسم بالعربية</th>
                      <th>Nom Français</th>
                      <th>English Name</th>
                      <th>عدد الأطباق</th>
                      <th>إجراءات</th>
                    </tr>
                  </thead>
                  <tbody>
                    {categories.map((cat) => {
                      const count = menuItems.filter((i) => i.category?.toLowerCase() === cat.id.toLowerCase()).length;

                      return (
                        <tr key={cat.id}>
                          <td>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                              <input
                                type="color"
                                value={cat.color || '#E85D2A'}
                                onChange={(e) => updateCategory(cat.id, { color: e.target.value })}
                                style={{
                                  width: '32px',
                                  height: '32px',
                                  borderRadius: '6px',
                                  border: 'none',
                                  cursor: 'pointer',
                                }}
                              />
                              <span style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.7)' }}>{cat.color}</span>
                            </div>
                          </td>
                          <td>
                            <input
                              type="text"
                              defaultValue={cat.nameAr}
                              onBlur={(e) => updateCategory(cat.id, { nameAr: e.target.value })}
                              style={{
                                background: 'rgba(255,255,255,0.06)',
                                border: '1px solid rgba(255,255,255,0.15)',
                                color: '#fff',
                                padding: '0.3rem 0.6rem',
                                borderRadius: '6px',
                                fontWeight: 'bold',
                              }}
                            />
                          </td>
                          <td>
                            <input
                              type="text"
                              defaultValue={cat.nameFr}
                              onBlur={(e) => updateCategory(cat.id, { nameFr: e.target.value })}
                              style={{
                                background: 'rgba(255,255,255,0.06)',
                                border: '1px solid rgba(255,255,255,0.15)',
                                color: '#fff',
                                padding: '0.3rem 0.6rem',
                                borderRadius: '6px',
                              }}
                            />
                          </td>
                          <td>
                            <input
                              type="text"
                              defaultValue={cat.nameEn}
                              onBlur={(e) => updateCategory(cat.id, { nameEn: e.target.value })}
                              style={{
                                background: 'rgba(255,255,255,0.06)',
                                border: '1px solid rgba(255,255,255,0.15)',
                                color: '#fff',
                                padding: '0.3rem 0.6rem',
                                borderRadius: '6px',
                              }}
                            />
                          </td>
                          <td>
                            <span style={{
                              padding: '0.2rem 0.6rem',
                              borderRadius: '999px',
                              background: 'rgba(255,255,255,0.08)',
                              color: '#fff',
                              fontWeight: 'bold',
                            }}>
                              {count}
                            </span>
                          </td>
                          <td>
                            <button
                              className="btn-delete"
                              onClick={() => {
                                if (window.confirm(`هل أنت متأكد من حذف تصنيف "${cat.nameAr || cat.nameEn}"؟`)) {
                                  deleteCategory(cat.id);
                                }
                              }}
                            >
                              <Trash2 size={15} style={{ verticalAlign: 'middle', marginLeft: '4px' }} /> حذف
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
