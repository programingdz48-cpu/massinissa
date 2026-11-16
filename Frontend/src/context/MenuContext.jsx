import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { initialMenuItems } from '../data/initialMenu';
import { initialCategories } from '../data/initialCategories';

const MenuContext = createContext();

export const MenuProvider = ({ children }) => {
  const [menuItems, setMenuItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // دالة جلب البيانات من Supabase
  const fetchData = async () => {
    try {
      setLoading(true);

      // 1. جلب الفئات
      const { data: catsData, error: catsError } = await supabase
        .from('categories')
        .select('*')
        .order('created_at', { ascending: true });

      if (catsError) {
        console.error('Error fetching categories:', catsError);
      }

      // إذا كانت الفئات فارغة، نقوم بتهيئة الفئات الافتراضية في Supabase
      let currentCats = catsData;
      if (!catsData || catsData.length === 0) {
        const rowsToInsert = initialCategories.map((c) => ({
          id: c.id,
          name_ar: c.nameAr,
          name_fr: c.nameFr,
          name_en: c.nameEn,
          color: c.color,
        }));
        await supabase.from('categories').upsert(rowsToInsert);
        currentCats = rowsToInsert;
      }

      const formattedCategories = (currentCats || []).map((c) => ({
        id: c.id,
        nameAr: c.name_ar,
        nameFr: c.name_fr,
        nameEn: c.name_en,
        color: c.color,
      }));
      setCategories(formattedCategories);

      // 2. جلب الأطباق
      const { data: itemsData, error: itemsError } = await supabase
        .from('menu_items')
        .select('*')
        .order('created_at', { ascending: false });

      if (itemsError) {
        console.error('Error fetching menu items:', itemsError);
      }

      // إذا كانت الأطباق فارغة، نقوم بإدخال الأطباق الأولية في Supabase
      let currentItems = itemsData;
      if (!itemsData || itemsData.length === 0) {
        const itemsToInsert = initialMenuItems.map((item) => ({
          id: item.id,
          category: item.category,
          name_ar: item.nameAr,
          name_fr: item.nameFr,
          name_en: item.nameEn,
          desc_ar: item.descAr,
          desc_fr: item.descFr,
          desc_en: item.descEn,
          price: item.price,
          image: item.image,
        }));
        await supabase.from('menu_items').upsert(itemsToInsert);
        currentItems = itemsToInsert;
      }

      const formattedItems = (currentItems || []).map((item) => ({
        id: item.id,
        category: item.category,
        nameAr: item.name_ar,
        nameFr: item.name_fr,
        nameEn: item.name_en,
        descAr: item.desc_ar,
        descFr: item.desc_fr,
        descEn: item.desc_en,
        price: Number(item.price),
        image: item.image,
      }));
      setMenuItems(formattedItems);
    } catch (err) {
      console.error('Database connection error:', err);
      // في حالة وجود خطأ نستخدم البيانات الأولية كخطة احتياطية
      setCategories(initialCategories);
      setMenuItems(initialMenuItems);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // دالة تصغير وضغط الصورة قبل الرفع
  const compressImage = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target.result;
        img.onload = () => {
          const maxWidth = 800; // أقصى عرض مناسب جداً لسرعة الموقع وجودة العرض
          let width = img.width;
          let height = img.height;

          if (width > maxWidth) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          }

          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;

          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);

          // تحويل وضغط الصورة بصيغة WebP الحديثة والخفيفة جداً بجودة 80%
          canvas.toBlob(
            (blob) => {
              if (blob) {
                resolve(blob);
              } else {
                resolve(file); // احتياطاً إذا لم يدعم المتصفح
              }
            },
            'image/webp',
            0.8
          );
        };
        img.onerror = (err) => reject(err);
      };
      reader.onerror = (err) => reject(err);
    });
  };

  // دالة رفع الصور إلى Supabase Storage Bucket بعد الضغط التلقائي
  const uploadImage = async (file) => {
    try {
      // 1. ضغط الصورة وتصغير حجمها
      const compressedBlob = await compressImage(file);

      // 2. تجهيز اسم فريد بصيغة .webp
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.webp`;
      const filePath = `uploads/${fileName}`;

      const { data, error } = await supabase.storage
        .from('menu-images')
        .upload(filePath, compressedBlob, {
          contentType: 'image/webp',
          cacheControl: '31536000', // تخزين مؤقت لسنة كاملة لسرعة البرق
          upsert: false,
        });

      if (error) {
        console.error('Storage upload error:', error);
        throw error;
      }

      // 3. الحصول على الرابط العام المباشر للصورة
      const { data: publicUrlData } = supabase.storage
        .from('menu-images')
        .getPublicUrl(filePath);

      return publicUrlData.publicUrl;
    } catch (err) {
      console.error('Failed to upload image:', err);
      throw err;
    }
  };

  // دوال إدارة الأطباق
  const addItem = async (item) => {
    const itemId = item.id || `item-${Date.now()}`;
    const row = {
      id: itemId,
      category: item.category,
      name_ar: item.nameAr,
      name_fr: item.nameFr,
      name_en: item.nameEn,
      desc_ar: item.descAr,
      desc_fr: item.descFr,
      desc_en: item.descEn,
      price: Number(item.price) || 0,
      image: item.image,
    };

    // تحديث الحالة المحلية فوراً لتجربة سريعة
    const newItem = {
      id: itemId,
      category: item.category,
      nameAr: item.nameAr,
      nameFr: item.nameFr,
      nameEn: item.nameEn,
      descAr: item.descAr,
      descFr: item.descFr,
      descEn: item.descEn,
      price: Number(item.price) || 0,
      image: item.image,
    };
    setMenuItems((prev) => [newItem, ...prev]);

    // الإدخال في Supabase
    const { error } = await supabase.from('menu_items').insert([row]);
    if (error) {
      console.error('Error inserting item in Supabase:', error);
      fetchData(); // إعادة المزامنة في حال وجود خطأ
    }
  };

  const updateItem = async (id, updatedFields) => {
    setMenuItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, ...updatedFields, price: Number(updatedFields.price ?? item.price) } : item
      )
    );

    const updatePayload = {};
    if (updatedFields.price !== undefined) updatePayload.price = Number(updatedFields.price);
    if (updatedFields.nameAr !== undefined) updatePayload.name_ar = updatedFields.nameAr;
    if (updatedFields.nameFr !== undefined) updatePayload.name_fr = updatedFields.nameFr;
    if (updatedFields.nameEn !== undefined) updatePayload.name_en = updatedFields.nameEn;
    if (updatedFields.category !== undefined) updatePayload.category = updatedFields.category;
    if (updatedFields.image !== undefined) updatePayload.image = updatedFields.image;

    const { error } = await supabase.from('menu_items').update(updatePayload).eq('id', id);
    if (error) {
      console.error('Error updating item in Supabase:', error);
    }
  };

  const deleteItem = async (id) => {
    setMenuItems((prev) => prev.filter((item) => item.id !== id));
    const { error } = await supabase.from('menu_items').delete().eq('id', id);
    if (error) {
      console.error('Error deleting item from Supabase:', error);
    }
  };

  // دوال إدارة الفئات
  const addCategory = async (newCat) => {
    const catId = newCat.id ? newCat.id.toLowerCase().trim().replace(/\s+/g, '-') : `cat-${Date.now()}`;
    const row = {
      id: catId,
      name_ar: newCat.nameAr,
      name_fr: newCat.nameFr,
      name_en: newCat.nameEn,
      color: newCat.color || '#E85D2A',
    };

    setCategories((prev) => [
      ...prev,
      {
        id: catId,
        nameAr: newCat.nameAr,
        nameFr: newCat.nameFr,
        nameEn: newCat.nameEn,
        color: newCat.color || '#E85D2A',
      },
    ]);

    const { error } = await supabase.from('categories').insert([row]);
    if (error) {
      console.error('Error inserting category in Supabase:', error);
    }
  };

  const updateCategory = async (id, updatedFields) => {
    setCategories((prev) =>
      prev.map((cat) => (cat.id === id ? { ...cat, ...updatedFields } : cat))
    );

    const payload = {};
    if (updatedFields.nameAr !== undefined) payload.name_ar = updatedFields.nameAr;
    if (updatedFields.nameFr !== undefined) payload.name_fr = updatedFields.nameFr;
    if (updatedFields.nameEn !== undefined) payload.name_en = updatedFields.nameEn;
    if (updatedFields.color !== undefined) payload.color = updatedFields.color;

    const { error } = await supabase.from('categories').update(payload).eq('id', id);
    if (error) {
      console.error('Error updating category in Supabase:', error);
    }
  };

  const deleteCategory = async (id) => {
    setCategories((prev) => prev.filter((cat) => cat.id !== id));
    const { error } = await supabase.from('categories').delete().eq('id', id);
    if (error) {
      console.error('Error deleting category from Supabase:', error);
    }
  };

  const resetToDefault = async () => {
    setLoading(true);
    try {
      await supabase.from('menu_items').delete().neq('id', '___non_existent___');
      await supabase.from('categories').delete().neq('id', '___non_existent___');
      await fetchData();
    } catch (e) {
      console.error('Reset error:', e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <MenuContext.Provider
      value={{
        menuItems,
        addItem,
        updateItem,
        deleteItem,
        categories,
        addCategory,
        updateCategory,
        deleteCategory,
        resetToDefault,
        uploadImage,
        loading,
      }}
    >
      {children}
    </MenuContext.Provider>
  );
};

export const useMenu = () => useContext(MenuContext);
