const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: {
    type: String,
    enum: ["Administrador", "Supervisor", "Trabajador", "Usuario"],
    required: true,
  },
  authCode: { type: Number }, // Código de autenticación
  authCodeExpiration: { type: Date }, // Expiración del código
});

module.exports = mongoose.model("User", userSchema);
