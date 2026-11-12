import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { LanguageProvider } from './context/LanguageContext';
import { MenuProvider } from './context/MenuContext';
import { AuthProvider } from './context/AuthContext';
import './style.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <MenuProvider>
          <LanguageProvider>
            <App />
          </LanguageProvider>
        </MenuProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
