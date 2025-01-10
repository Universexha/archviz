const express = require('express');
const router = express.Router();
const Project = require('../models/project');

// Ruta para obtener todos los proyectos
router.get('/', async (req, res) => {
    try {
        const projects = await Project.find(); // Busca todos los proyectos
        res.status(200).json(projects); // Devuelve los proyectos en formato JSON
    } catch (error) {
        res.status(500).json({
            message: 'Error al obtener los proyectos',
            error: error.message,
        });
    }
});

// Ruta para agregar un nuevo proyecto
router.post('/add', async (req, res) => {
    try {
        const { nombre, descripcion, cliente, estado, imagen } = req.body;

        const newProject = new Project({
            nombre,
            descripcion,
            cliente,
            estado,
            imagen,
        });

        await newProject.save(); // Guarda el proyecto en la base de datos

        res.status(201).json({
            message: 'Proyecto guardado exitosamente',
            resultado: newProject,
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error al guardar el proyecto',
            error: error.message,
        });
    }
});

module.exports = router;
