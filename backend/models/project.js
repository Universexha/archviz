const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true,
    },
    descripcion: {
        type: String,
        required: true,
    },
    cliente: {
        type: String,
        required: true,
    },
    estado: {
        type: String,
        required: true,
        enum: ['Activo', 'Inactivo'], // Puedes definir los valores permitidos
    },
    image: {
        type: String,
        default: null, // Si no se proporciona una imagen, será null
    },
}, {
    timestamps: true, // Agrega automáticamente `createdAt` y `updatedAt`
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
