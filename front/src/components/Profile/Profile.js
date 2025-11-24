import React, { useEffect, useState } from "react";
import './Profile.css';

function Profile() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        fetch('/profile', {
            credentials: 'include'
        })
            .then(response => response.json())
            .then(data => {
                console.log('Datos completos del usuario:', data.user);
                if (data.user) {
                    setUser(data.user);
                }
            })
            .catch(error => {
                console.log('Usuario no autenticado');
                window.location.href = '/';
            });
    }, []);

    const handleLogout = () => {
        window.location.href = '/logout';
    };

    if (!user) {
        return (
            <div className="profile-loading-container">
                <div className="profile-spinner"></div>
                <p className="profile-loading-text">Cargando tu perfil...</p>
            </div>
        );
    }

    return (
        <div className="profile-container">
            <div className="profile-card">
                <div className="profile-header">
                    <div className="avatar-section">
                        {user.photos && user.photos[0]?.value ? (
                            <img
                                src={user.photos[0].value}
                                alt="Avatar"
                                className="profile-avatar"
                                onError={(e) => {
                                    e.target.style.display = 'none';
                                    e.target.nextSibling.style.display = 'flex';
                                }}
                            />
                        ) : null}
                        <div className="avatar-fallback">
                            {user.displayName?.charAt(0)?.toUpperCase() || 'U'}
                        </div>
                    </div>
                    <h1 className="welcome-title">
                        ¡Bienvenido de vuelta!
                    </h1>
                    <p className="welcome-subtitle">
                        Es genial verte de nuevo
                    </p>
                </div>

                <div className="info-card">
                    <h2 className="info-title">Tu información</h2>
                    <div className="info-grid">
                        <div className="info-item">
                            <span className="info-label">Nombre completo</span>
                            <span className="info-value">{user.displayName}</span>
                        </div>
                        <div className="info-item">
                            <span className="info-label">Correo electrónico</span>
                            <span className="info-value">{user.emails && user.emails[0]?.value}</span>
                        </div>
                        <div className="info-item">
                            <span className="info-label">Proveedor</span>
                            <span className="info-value">
                                <span className="google-badge">Google</span>
                            </span>
                        </div>
                    </div>
                </div>

                <button
                    onClick={handleLogout}
                    className="logout-button"
                >
                    <span className="logout-icon">🚪</span>
                    Cerrar sesión
                </button>
            </div>
        </div>
    );
}

export default Profile;