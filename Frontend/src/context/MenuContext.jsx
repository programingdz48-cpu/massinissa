import React, { createContext, useContext, useState, useEffect } from 'react';
import { initialMenuItems } from '../data/initialMenu';

const MenuContext = createContext();

export const MenuProvider = ({ children }) => {
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

  useEffect(() => {
    try {
      localStorage.setItem('massinissa_menu_items', JSON.stringify(menuItems));
    } catch (e) {
      console.error('Error saving menu to localStorage', e);
    }
  }, [menuItems]);

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

  const resetToDefault = () => {
    setMenuItems(initialMenuItems);
    localStorage.removeItem('massinissa_menu_items');
  };

  return (
    <MenuContext.Provider value={{ menuItems, addItem, updateItem, deleteItem, resetToDefault }}>
      {children}
    </MenuContext.Provider>
  );
};

export const useMenu = () => useContext(MenuContext);
