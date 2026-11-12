import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useMenu } from '../context/MenuContext';
import { useNavigate, Link } from 'react-router-dom';
import { PlusCircle, Trash2, LogOut, ExternalLink, RefreshCw, Layers, CheckCircle } from 'lucide-react';

export const Dashboard = () => {
  const { adminUser, logout } = useAuth();
  const { menuItems, addItem, updateItem, deleteItem, resetToDefault } = useMenu();
  const navigate = useNavigate();

  // نموذج إضافة صنف
  const [formData, setFormData] = useState({
    nameAr: '',
    nameFr: '',
    nameEn: '',
    descAr: '',
    descFr: '',
    descEn: '',
    category: 'burger',
    price: '',
    image: '/Assets/Pictures/Burger/Burger.jpg',
  });

  const [customImage, setCustomImage] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // إحصائيات
  const totalItems = menuItems.length;
  const burgerCount = menuItems.filter((i) => i.category?.toLowerCase() === 'burger').length;
  const sandwichCount = menuItems.filter((i) => i.category?.toLowerCase() === 'sandwich').length;
  const tacosCount = menuItems.filter((i) => i.category?.toLowerCase() === 'tacos').length;

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
        setCustomImage(reader.result);
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

    // إعادة تعيين النموذج
    setFormData({
      nameAr: '',
      nameFr: '',
      nameEn: '',
      descAr: '',
      descFr: '',
      descEn: '',
      category: 'burger',
      price: '',
      image: '/Assets/Pictures/Burger/Burger.jpg',
    });
    setCustomImage('');
  };

  return (
    <div className="dashboard-wrapper">
      {/* Navbar Dashboard */}
      <header className="dashboard-navbar">
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
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
              <div className="stat-label">إجمالي الأصناف</div>
            </div>
          </div>
          <div className="dashboard-stat-card">
            <div className="stat-icon">🍔</div>
            <div>
              <div className="stat-num">{burgerCount}</div>
              <div className="stat-label">أصناف البرغر</div>
            </div>
          </div>
          <div className="dashboard-stat-card">
            <div className="stat-icon">🥖</div>
            <div>
              <div className="stat-num">{sandwichCount}</div>
              <div className="stat-label">أصناف الساندويتش</div>
            </div>
          </div>
          <div className="dashboard-stat-card">
            <div className="stat-icon">🌮</div>
            <div>
              <div className="stat-num">{tacosCount}</div>
              <div className="stat-label">أصناف التاكوس</div>
            </div>
          </div>
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

        {/* Add Item Form */}
        <div className="admin-card">
          <h3 className="admin-card-title">
            <PlusCircle size={20} color="#E85D2A" /> إضافة صنف جديد إلى المنيو
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
                  <option value="burger">برغر / Burger</option>
                  <option value="sandwich">ساندويتش / Sandwich</option>
                  <option value="tacos">تاكوس / Tacos</option>
                  <option value="libanais">لبناني / Libanais</option>
                  <option value="pizza">بيتزا / Pizza</option>
                  <option value="other">أطباق أخرى / Other</option>
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
                <label>الصورة الافتراضية أو رفع صورة</label>
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
                if (window.confirm('هل أنت متأكد من استرجاع القائمة الأولية الأصلية؟')) {
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
                {menuItems.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <img src={item.image} alt={item.nameAr || item.nameEn} className="table-img" />
                    </td>
                    <td style={{ fontWeight: 600 }}>{item.nameAr || '—'}</td>
                    <td>{item.nameFr || item.nameEn}</td>
                    <td>
                      <span style={{
                        padding: '0.2rem 0.6rem',
                        borderRadius: '999px',
                        fontSize: '0.75rem',
                        background: 'rgba(232,93,42,0.15)',
                        color: '#E85D2A',
                        textTransform: 'uppercase',
                        fontWeight: 'bold',
                      }}>
                        {item.category}
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
                          border: '1px solid rgba(232,93,42,0.4)',
                          borderRadius: '6px',
                          color: '#E85D2A',
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
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
