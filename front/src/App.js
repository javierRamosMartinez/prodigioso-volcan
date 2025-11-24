import React, { useState, useEffect } from 'react';
import Profile from './components/Profile/Profile';
import Login from './components/Login/Login';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('login');

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('/profile', {
          credentials: 'include'
        });

        if (response.ok) {
          const data = await response.json();
          if (data.user) {
            setCurrentPage('profile');
            return;
          }
        }

        console.log('Intentando refrescar la sesión...');
        const refreshResponse = await fetch('/auth/refresh', {
          credentials: 'include',
          method: 'GET'
        });

        if (refreshResponse.ok) {
          console.log('Sesión refrescada exitosamente');
          setCurrentPage('profile');
        } else {
          console.log('No se pudo refrescar la sesión');
        }
      } catch (error) {
        console.log('Usuario no autenticado:', error);
      }
    };

    checkAuth();
  }, []);

  const handleGoogleLogin = () => {
    window.location.href = 'https://localhost/auth/google';
  };

  if (currentPage === 'profile') {
    return <Profile />;
  }

  return <Login onGoogleLogin={handleGoogleLogin} />;
}

export default App;