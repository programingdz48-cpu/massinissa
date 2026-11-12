import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { ProtectedRoute } from './components/ProtectedRoute';

export const App = () => {
  return (
    <Routes>
      {/* صفحة الزبائن العامة */}
      <Route path="/" element={<Home />} />

      {/* الرابط السري لتسجيل دخول المدير - لا يوجد رابط له في واجهة الزبائن */}
      <Route path="/manager" element={<Login />} />

      {/* لوحة التحكم المحمية للمدير */}
      <Route
        path="/manager/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      {/* إعادة توجيه أي مسار آخر إلى الصفحة الرئيسية */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default App;
