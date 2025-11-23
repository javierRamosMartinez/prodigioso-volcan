import React from 'react';
import './Login.css';

const Login = ({ onGoogleLogin }) => {
    return (
        <div className="login-container">
            <div className="login-card">
                <div className="login-logo">
                    <img
                        src="https://media.licdn.com/dms/image/v2/C4E0BAQGgVettHTy7mw/company-logo_200_200/company-logo_200_200/0/1630574524141/prodigioso_volcan_logo?e=2147483647&v=beta&t=o_AcofhxVeufzgLNYBPc5QU40zCXBpO35oCjZPPbD0E"
                        alt="Prodigioso Volcán Logo"
                        className="login-logo-image"
                    />
                    <h1 className="login-title">Prodigioso Volcán</h1>
                </div>

                <div className="login-content">
                    <p className="login-subtitle">Inicia sesión para acceder a tu cuenta</p>

                    <button
                        onClick={onGoogleLogin}
                        className="google-login-button"
                    >
                        <span className="google-icon">
                            <img
                                src="https://www.google.com/favicon.ico"
                                alt="Google"
                                className="google-logo"
                            />
                        </span>
                        Continuar con Google
                    </button>
                </div>

                <div className="login-footer">
                    <p className="footer-text">Tu seguridad es nuestra prioridad</p>
                </div>
            </div>
        </div>
    );
};

export default Login;