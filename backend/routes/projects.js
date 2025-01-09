const express = require('express');
const Project = require('../models/project'); // Asegúrate de que este modelo exista
const router = express.Router(); // Declaración de router

// Ruta para agregar un proyecto
router.post('/add', async (req, res) => {
    const { nombre, descripcion, cliente, estado } = req.body;

    try {
        const nuevoProyecto = new Project({ nombre, descripcion, cliente, estado });
        const resultado = await nuevoProyecto.save();
        console.log('Proyecto guardado:', resultado); // Log para confirmar que se guardó
        res.status(201).json({ message: 'Proyecto guardado exitosamente' });
    } catch (error) {
        console.error('Error al guardar proyecto:', error.message); // Log para capturar errores
        res.status(500).json({ message: 'Error al guardar el proyecto', error: error.message });
    }
});

module.exports = router; // Exporta el router
