const express = require('express');
const session = require('express-session');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const cors = require('cors');


const app = express();
const PORT = 9778;

// Configurar CORS
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));

// Configuración de sesión 
app.use(session({
    secret: process.env.SESSION_SECRET || 'fallback-secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false, // ← AÑADIR: Para desarrollo en HTTP
        httpOnly: false, // ← AÑADIR: Permitir acceso desde JS
        sameSite: 'lax', // ← AÑADIR
        maxAge: 24 * 60 * 60 * 1000 // ← AÑADIR: 1 día
    }
}));


// Inicializar passport (NUEVO)
app.use(passport.initialize());
app.use(passport.session());

// Configurar estrategia de Google
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "https://localhost/auth/google/callback"
}, async (accessToken, refreshToken, profile, done) => {
    try {
        const userData = {
            ...profile,
            refreshToken: refreshToken
        };
        return done(null, userData);
    } catch (error) {
        return done(error, null);
    }
}
));

// Serializar usuario (guardar en sesión)
passport.serializeUser((user, done) => {
    done(null, user);
});

// Deserializar usuario (obtener de sesión)
passport.deserializeUser((user, done) => {
    done(null, user);
});

// Ruta para iniciar login con Google
app.get('/auth/google',
    passport.authenticate('google', { scope: ['profile', 'email'] })
);

// Ruta de callback 
app.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: 'https://localhost' }),
    (req, res) => {
        res.redirect('https://localhost');
    }
);

// Ruta protegida para ver el perfil del usuario
app.get('/profile', (req, res) => {
    if (!req.isAuthenticated()) {
        return res.status(401).json({ error: 'Usuario no autenticado' });
    }
    res.json({
        message: '¡Bienvenido!',
        user: req.user
    });
});

// Refrescar la sesión automaticamente
app.get('/auth/refresh', async (req, res) => {
    if (!req.isAuthenticated()) {
        return res.status(401).json({ error: 'No autenticado' });
    }

    try {
        req.session.touch(); // Actualiza la sesión
        res.json({
            success: true,
            message: 'Sesión renovada',
            user: req.user
        });
    } catch (error) {
        res.status(500).json({ error: 'Error al renovar la sesión' });
    }
})

// Ruta para logout
app.get('/logout', (req, res) => {
    req.logout(() => {
        res.redirect('http://localhost:3000');
    });
});

// Tus rutas existentes (MANTENER)
app.get('/', (req, res) => {
    res.json({ message: '¡Prodigioso Volcan funciona!' });
});

app.listen(PORT, () => {
    console.log(`Servidor en puerto ${PORT}`);
});