const express = require('express');
const router = express.Router();

// Importar rutas específicas
const projectRoutes = require('./projects');

// Usar las rutas
router.use('/projects', projectRoutes);

// Agrega aquí otras rutas en el futuro
// router.use('/users', userRoutes);
// router.use('/tasks', taskRoutes);

module.exports = router;
