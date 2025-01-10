const Project = require('../models/project');

// Controlador para añadir un nuevo proyecto
const addProject = async (req, res) => {
    try {
        const { nombre, descripcion, cliente, estado } = req.body;
        const image = req.file ? req.file.path : null;

        const newProject = new Project({
            nombre,
            descripcion,
            cliente,
            estado,
            image,
        });

        const savedProject = await newProject.save();

        res.status(201).json({
            message: 'Proyecto guardado exitosamente',
            resultado: savedProject,
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error al guardar el proyecto',
            error: error.message,
        });
    }
};

// Controlador para obtener todos los proyectos
const getProjects = async (req, res) => {
    try {
        const projects = await Project.find();
        res.status(200).json(projects);
    } catch (error) {
        res.status(500).json({
            message: 'Error al obtener los proyectos',
            error: error.message,
        });
    }
};

module.exports = {
    addProject,
    getProjects,
};
