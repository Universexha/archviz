const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const projectRoutes = require('./routes/projects'); // Asegúrate de que la ruta sea correcta

// Cargar variables de entorno
dotenv.config();

// Inicializar la aplicación
const app = express();

// Middlewares
app.use(cors()); // Permitir solicitudes de otros orígenes
app.use(bodyParser.json()); // Analizar JSON en las solicitudes
app.use(bodyParser.urlencoded({ extended: true })); // Analizar datos en formularios

// Conexión a la base de datos
mongoose
  .connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Conectado a MongoDB'))
  .catch((error) => console.error('Error al conectar a MongoDB:', error));

// Rutas
app.use('/uploads', express.static('uploads')); // Servir archivos estáticos de la carpeta uploads
app.use('/projects', projectRoutes); // Rutas para proyectos

// Ruta por defecto
app.get('/', (req, res) => {
  res.send('Bienvenido al servidor de ARCHVIZ');
});

// Puerto y servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
