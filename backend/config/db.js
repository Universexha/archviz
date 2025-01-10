const mongoose = require('mongoose');
require('dotenv').config(); // Para cargar las variables de entorno del archivo .env

const connectDB = async () => {
    try {
        // Cadena de conexión desde el archivo .env
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log(`MongoDB conectado: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error al conectar a MongoDB: ${error.message}`);
        process.exit(1); // Finaliza el proceso si no puede conectar
    }
};

module.exports = connectDB;
