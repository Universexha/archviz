const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

// Middleware para parsear JSON
app.use(express.json());

// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Conectado a MongoDB'))
.catch(err => console.error('Error al conectar a MongoDB:', err));

// Rutas
const projectsRoutes = require('./routes/projects');
app.use('/projects', projectsRoutes);

// Iniciar servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
