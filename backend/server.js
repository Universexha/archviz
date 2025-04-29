const express = require("express");
const cors = require("cors");
const proyectosRouter = require("./src/routes/proyectos.js");
const { PrismaClient } = require("@prisma/client");

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // <---- Permite datos de formularios
app.use("/proyectos", proyectosRouter);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
