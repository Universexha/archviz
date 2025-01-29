const express = require('express');
const cookieParser = require('cookie-parser'); // Para manejar cookies
const dotenv = require('dotenv'); // Para manejar variables de entorno
const mongoose = require('mongoose'); // Para conectarte a MongoDB
const authRoutes = require('./routes/auth'); // Importar las rutas de autenticación
const authenticate = require('./middlewares/authenticate'); // Importar middleware de autenticación

dotenv.config(); // Cargar variables de entorno desde .env

const app = express();

// Configuración de middlewares globales
app.use(express.json()); // Permite parsear JSON en las solicitudes
app.use(cookieParser()); // Habilita el manejo de cookies
app.use(express.urlencoded({ extended: true }));

// Conexión a la base de datos MongoDB
mongoose
    .connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Conectado a MongoDB'))
    .catch((error) => console.error('Error al conectar a MongoDB:', error));

// Registro de rutas públicas
app.use('/auth', authRoutes); // Rutas relacionadas con autenticación

// Ejemplo de ruta protegida
app.get('/dashboard', authenticate, (req, res) => {
    res.json({ message: `Bienvenido ${req.user.role}.` });
});

// Ruta inicial (de prueba)
app.get('/', (req, res) => {
    res.send('Bienvenido al servidor de ARCHVIZ');
});

// Configuración e inicio del servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));
