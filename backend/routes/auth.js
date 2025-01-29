const express = require("express");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const router = express.Router();

// Almacenamiento temporal de códigos (opcional si no se guarda en la base de datos)
const verificationCodes = new Map();

// Configuración de nodemailer
const transporter = nodemailer.createTransport({
  service: "gmail", // Cambia según tu servicio de correo
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Endpoint para solicitar el código de verificación
router.post("/request-code", async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "El correo electrónico es obligatorio." });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado." });
    }

    // Generar un código de 6 dígitos y guardarlo con una expiración
    const code = crypto.randomInt(100000, 999999); // Código de 6 dígitos
    const expiration = Date.now() + 10 * 60 * 1000; // Expira en 10 minutos

    // Guardar el código en la base de datos
    user.authCode = code;
    user.authCodeExpiration = expiration;
    await user.save();

    // Configuración del correo
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Tu código de acceso - ARCHVIZ",
      html: `
        <p>Hola,</p>
        <p>Tu código de acceso es:</p>
        <h2>${code}</h2>
        <p>Este código es válido por 10 minutos.</p>
        <p>Si no solicitaste este código, por favor ignora este mensaje.</p>
      `,
    };

    // Enviar el correo
    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "El código ha sido enviado a tu correo." });
  } catch (error) {
    console.error("Error al enviar el código:", error);
    res.status(500).json({ message: "Error al enviar el código. Por favor, inténtalo nuevamente." });
  }
});

// Endpoint para verificar el código de acceso
router.post("/verify-code", async (req, res) => {
  const { email, code } = req.body;

  if (!email || !code) {
    return res.status(400).json({ message: "El correo y el código son obligatorios." });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado." });
    }

    // Verificar si el código es válido y no ha expirado
    if (user.authCode !== parseInt(code)) {
      return res.status(401).json({ message: "Código inválido." });
    }

    if (user.authCodeExpiration < Date.now()) {
      return res.status(401).json({ message: "El código ha expirado." });
    }

    // Limpiar el código y generar un token JWT
    user.authCode = null;
    user.authCodeExpiration = null;
    await user.save();

    const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({
      message: "Inicio de sesión exitoso.",
      token,
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Error al verificar el código:", error);
    res.status(500).json({ message: "Error al verificar el código. Por favor, inténtalo nuevamente." });
  }
});

module.exports = router;
