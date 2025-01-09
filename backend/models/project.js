const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    nombre: String,
    descripcion: String,
    cliente: String,
    estado: String,
});

// Conexión explícita a la colección 'projects' en 'archviz_db'
const Project = mongoose.model('Project', projectSchema, 'projects');

module.exports = Project;
