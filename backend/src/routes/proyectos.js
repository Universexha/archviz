  const express = require("express");
  const { PrismaClient } = require("@prisma/client");
  const multer = require("multer");
  const { createClient } = require("@supabase/supabase-js");
  require("dotenv").config();

  const router = express.Router();
  const prisma = new PrismaClient();

  // 🔹 Conectar con Supabase Storage
  const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

  // 🔹 Configurar Multer para manejar archivos en memoria
  const storage = multer.memoryStorage();
  const upload = multer({ storage: storage });

  // 🔹 **Ruta para Crear un Nuevo Proyecto con imágenes**
  router.post("/crear", upload.fields([{ name: "imagenPrincipal", maxCount: 1 }, { name: "galeria" }]), async (req, res) => {
    try {
      console.log("Datos recibidos en backend:", req.body);
      console.log("Archivos recibidos en backend:", req.files);    

      const {
        nombre,
        descripcionCorta,
        descripcionCompleta,
        categoria,
        otraCategoria,
        areaProyecto,
        materiales,
        colaboradores,
        estado,
        recorridoVirtual,
        hostspots,
      } = req.body;

      if (!nombre) {
        return res.status(400).json({ error: "El campo 'nombre' es obligatorio." });
      }

      let imagenPrincipalUrl = "";
      let galeriaUrls = [];

      // 🔹 **Subir la Imagen Principal a Supabase Storage**
      if (req.files["imagenPrincipal"] && req.files["imagenPrincipal"][0]) {
        const imagenPrincipal = req.files["imagenPrincipal"][0];
  
        console.log("Subiendo imagen principal:", imagenPrincipal.originalname);
  
        const { data, error } = await supabase.storage
          .from("imagenes-proyectos")
          .upload(`proyectos/${Date.now()}_${imagenPrincipal.originalname}`, imagenPrincipal.buffer, {
            contentType: imagenPrincipal.mimetype,
          });
  
        if (error) {
          console.error("❌ Error al subir imagen principal:", error);
        } else {
          console.log("✅ Imagen principal subida correctamente:", data);
          imagenPrincipalUrl = `${process.env.SUPABASE_URL}/storage/v1/object/public/imagenes-proyectos/${data.path}`;
        }
      }
      

      // 🔹 **Subir Imágenes de Galería a Supabase Storage**
      if (req.files && req.files["galeria"]) {
        for (const file of req.files["galeria"]) {
          const filePath = `proyectos/${Date.now()}_${file.originalname}`;
          const { data, error } = await supabase.storage
            .from(process.env.SUPABASE_STORAGE_BUCKET)
            .upload(filePath, file.buffer, {
              contentType: file.mimetype,
              upsert: true // Asegura que los archivos se sobrescriban si ya existen
            });
      
          if (error) {
            console.error("❌ Error al subir imagen de galería:", error);
          } else {
            galeriaUrls.push(`${process.env.SUPABASE_URL}/storage/v1/object/public/imagenes-proyectos/${data.path}`);            
          }
        }
      }
      

      // 🔹 **Guardar en la Base de Datos**
      const nuevoProyecto = await prisma.proyecto.create({
        data: {
          nombre,
          descripcionCorta,
          descripcionCompleta,
          imagenPrincipal: imagenPrincipalUrl,
          galeria: galeriaUrls,
          categoria,
          otraCategoria,
          areaProyecto: Number(areaProyecto) || 0,
          materiales: JSON.parse(materiales || "[]"),
          colaboradores: JSON.parse(colaboradores || "[]"),
          estado,
          recorridoVirtual: JSON.parse(recorridoVirtual || "[]"),
          hostspots: JSON.parse(hostspots || "{}"),
        },
      });

      res.json(nuevoProyecto);
    } catch (error) {
      console.error("❌ Error al guardar el proyecto:", error);
      res.status(500).json({ error: "No se pudo guardar el proyecto." });
    }
  });

  // 🔹 **Obtener Todos los Proyectos**
  router.get("/", async (req, res) => {
    try {
      const proyectos = await prisma.proyecto.findMany();
      res.json(proyectos);
    } catch (error) {
      console.error(" Error al obtener los proyectos:", error);
      res.status(500).json({ error: "No se pudieron obtener los proyectos." });
    }
  });

  // 🔹 **Obtener un Proyecto por ID**
  router.get("/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const proyecto = await prisma.proyecto.findUnique({
        where: { id: parseInt(id) },
      });

      if (!proyecto) {
        return res.status(404).json({ error: "Proyecto no encontrado" });
      }

      res.json(proyecto);
    } catch (error) {
      console.error(" Error al obtener el proyecto:", error);
      res.status(500).json({ error: "No se pudo obtener el proyecto." });
    }
  });

  // 🔹 **Eliminar un Proyecto**
  router.delete("/:id", async (req, res) => {
    try {
      const { id } = req.params;

      // 🔹 Eliminar proyecto en la base de datos
      await prisma.proyecto.delete({
        where: { id: parseInt(id) },
      });

      res.json({ message: " Proyecto eliminado correctamente" });
    } catch (error) {
      console.error(" Error al eliminar el proyecto:", error);
      res.status(500).json({ error: "No se pudo eliminar el proyecto." });
    }
  });

  module.exports = router;
