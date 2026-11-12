import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('massinissa_admin_auth') === 'true';
  });

  const [adminUser, setAdminUser] = useState(() => {
    return localStorage.getItem('massinissa_admin_user') || 'admin';
  });

  const login = (username, password) => {
    // يمكنك تعديل بيانات الدخول هنا أو جعلها متوافقة مع المتطلبات
    // اسم المستخدم الافتراضي: admin
    // كلمة المرور الافتراضية: admin123 أو massinissa
    const validUsers = [
      { user: 'admin', pass: 'admin123' },
      { user: 'manager', pass: 'massinissa' },
      { user: 'djous', pass: '123456' },
    ];

    const match = validUsers.find(
      (u) => u.user.toLowerCase() === username.trim().toLowerCase() && u.pass === password
    );

    if (match) {
      setIsAuthenticated(true);
      setAdminUser(match.user);
      localStorage.setItem('massinissa_admin_auth', 'true');
      localStorage.setItem('massinissa_admin_user', match.user);
      return { success: true };
    } else {
      return { success: false, message: 'Invalid username or password' };
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('massinissa_admin_auth');
    localStorage.removeItem('massinissa_admin_user');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, adminUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

