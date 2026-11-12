import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Lock, User, ArrowLeft } from 'lucide-react';

export const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // إذا كان مسجل دخول بالفعل، نوجهه فوراً للداشبورد
  React.useEffect(() => {
    if (isAuthenticated) {
      navigate('/manager/dashboard', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!username.trim() || !password) {
      setError('يرجى ملء جميع الحقول المطلوبة');
      return;
    }

    const res = login(username, password);
    if (res.success) {
      navigate('/manager/dashboard');
    } else {
      setError('اسم المستخدم أو كلمة المرور غير صحيحة');
    }
  };

  return (
    <div className="admin-login-wrapper">
      <div className="admin-login-card">
        <div className="admin-login-header">
          <div className="admin-login-icon">
            <Lock size={28} />
          </div>
          <h2 className="admin-login-title">لوحة إدارة ماسينيسا</h2>
          <p className="admin-login-subtitle">Massinissa Manager Portal</p>
        </div>

        {error && <div className="admin-error-box">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="admin-form-group">
            <label>اسم المستخدم / Username</label>
            <div style={{ position: 'relative' }}>
              <input
                type="text"
                className="admin-input"
                placeholder="أدخل اسم المستخدم"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoFocus
              />
            </div>
          </div>

          <div className="admin-form-group">
            <label>كلمة المرور / Password</label>
            <input
              type="password"
              className="admin-input"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit" className="admin-btn-primary">
            تسجيل الدخول / Login
          </button>
        </form>

        <div style={{ marginTop: '1.8rem', textAlign: 'center' }}>
          <Link
            to="/"
            style={{
              color: 'rgba(255,255,255,0.5)',
              fontSize: '0.85rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              textDecoration: 'none',
              transition: 'color 0.2s',
            }}
            onMouseOver={(e) => (e.target.style.color = '#E85D2A')}
            onMouseOut={(e) => (e.target.style.color = 'rgba(255,255,255,0.5)')}
          >
            <ArrowLeft size={16} /> العودة إلى الموقع الرئيسي
          </Link>
        </div>
      </div>
    </div>
  );
};

