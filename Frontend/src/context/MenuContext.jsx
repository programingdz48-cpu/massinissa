import React, { createContext, useContext, useState, useEffect } from 'react';
import { initialMenuItems } from '../data/initialMenu';
import { initialCategories } from '../data/initialCategories';

const MenuContext = createContext();

export const MenuProvider = ({ children }) => {
  // إدارة الأصناف
  const [menuItems, setMenuItems] = useState(() => {
    try {
      const saved = localStorage.getItem('massinissa_menu_items');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Error loading menu from localStorage', e);
    }
    return initialMenuItems;
  });

  // إدارة التصنيفات
  const [categories, setCategories] = useState(() => {
    try {
      const savedCats = localStorage.getItem('massinissa_categories');
      if (savedCats) {
        return JSON.parse(savedCats);
      }
    } catch (e) {
      console.error('Error loading categories from localStorage', e);
    }
    return initialCategories;
  });

  // حفظ الأصناف
  useEffect(() => {
    try {
      localStorage.setItem('massinissa_menu_items', JSON.stringify(menuItems));
    } catch (e) {
      console.error('Error saving menu to localStorage', e);
    }
  }, [menuItems]);

  // حفظ التصنيفات
  useEffect(() => {
    try {
      localStorage.setItem('massinissa_categories', JSON.stringify(categories));
    } catch (e) {
      console.error('Error saving categories to localStorage', e);
    }
  }, [categories]);

  // دوال الأصناف
  const addItem = (item) => {
    const newItem = {
      ...item,
      id: item.id || `item-${Date.now()}`,
      price: Number(item.price) || 0,
    };
    setMenuItems((prev) => [newItem, ...prev]);
  };

  const updateItem = (id, updatedFields) => {
    setMenuItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, ...updatedFields, price: Number(updatedFields.price ?? item.price) } : item
      )
    );
  };

  const deleteItem = (id) => {
    setMenuItems((prev) => prev.filter((item) => item.id !== id));
  };

  // دوال الفئات
  const addCategory = (newCat) => {
    const catId = newCat.id ? newCat.id.toLowerCase().trim().replace(/\s+/g, '-') : `cat-${Date.now()}`;
    const formattedCat = {
      ...newCat,
      id: catId,
      color: newCat.color || '#E85D2A',
    };
    setCategories((prev) => [...prev, formattedCat]);
  };

  const updateCategory = (id, updatedFields) => {
    setCategories((prev) =>
      prev.map((cat) => (cat.id === id ? { ...cat, ...updatedFields } : cat))
    );
  };

  const deleteCategory = (id) => {
    setCategories((prev) => prev.filter((cat) => cat.id !== id));
  };

  const resetToDefault = () => {
    setMenuItems(initialMenuItems);
    setCategories(initialCategories);
    localStorage.removeItem('massinissa_menu_items');
    localStorage.removeItem('massinissa_categories');
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
      }}
    >
      {children}
    </MenuContext.Provider>
  );
};

export const useMenu = () => useContext(MenuContext);
