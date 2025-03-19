import { useState } from "react";
import FormularioGeneral from "./FormularioGeneral";
import GaleriaImagenes from "./GaleriaImagenes";
import RecorridoVirtual from "./RecorridoVirtual";
import ListaDinamica from "./ListaDinamica";
import EstadoProyecto from "./EstadoProyecto";
import CategoriaProyecto from "./CategoriaProyecto";
import { createClient } from "@supabase/supabase-js";

// Configuración de Supabase
const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL!,
  import.meta.env.VITE_SUPABASE_ANON_KEY!
);

interface Hotspots {
  [key: number]: { x: number; y: number; target: number | null }[];
}

interface FormDataState {
  nombre: string;
  descripcionCorta: string;
  descripcionCompleta: string;
  imagenPrincipal: File | null;
  previewImagenPrincipal: string;
  galeria: File[];
  previewGaleria: string[];
  categoria: string;
  otraCategoria: string;
  areaProyecto: number;
  materiales: string[];
  colaboradores: string[];
  estado: string;
  visibilidad: string;
  recorridoVirtual: File[];
  previewRecorrido: string[];
  hostspots: Hotspots;
}

const AdminPanel = () => {
  const [tipo, setTipo] = useState<"proyecto" | "recurso" | "curso">("proyecto");
  const [formData, setFormData] = useState<FormDataState>({
    nombre: "",
    descripcionCorta: "",
    descripcionCompleta: "",
    imagenPrincipal: null,
    previewImagenPrincipal: "",
    galeria: [],
    previewGaleria: [],
    categoria: "",
    otraCategoria: "",
    areaProyecto: 0,
    materiales: [],
    colaboradores: [],
    estado: "",
    visibilidad: "publico",
    recorridoVirtual: [],
    previewRecorrido: [],
    hostspots: {},
  });

  // Función para subir imágenes a Supabase Storage
  const uploadImageToSupabase = async (file: File, folder: string): Promise<string | null> => {
    const filePath = `${folder}/${Date.now()}-${file.name}`;
    const { error } = await supabase.storage
      .from(import.meta.env.VITE_SUPABASE_STORAGE_BUCKET!)
      .upload(filePath, file);

    if (error) {
      console.error("Error subiendo imagen:", error);
      return null;
    }

    return `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/${import.meta.env.VITE_SUPABASE_STORAGE_BUCKET}/${filePath}`;
  };

  const handleSubmit = async () => {
    console.log("Datos a enviar:", formData);

    // Validación de campos obligatorios
    if (!formData.nombre || !formData.descripcionCorta || !formData.descripcionCompleta || !formData.categoria || !formData.estado) {
      alert("Por favor, completa todos los campos obligatorios.");
      return;
    }

    let imagenPrincipalUrl = "";
    let galeriaUrls: string[] = [];
    let recorridoVirtualUrls: string[] = [];

    // Subir imagen principal a Supabase
    if (formData.imagenPrincipal) {
      const url = await uploadImageToSupabase(formData.imagenPrincipal, "imagenes-principales");
      if (url) imagenPrincipalUrl = url;
    }

    // Subir galería de imágenes a Supabase
    for (const file of formData.galeria) {
      const url = await uploadImageToSupabase(file, "galeria");
      if (url) galeriaUrls.push(url);
    }

    // Subir imágenes de recorrido virtual (si aplica)
    for (const file of formData.recorridoVirtual) {
      const url = await uploadImageToSupabase(file, "recorrido-virtual");
      if (url) recorridoVirtualUrls.push(url);
    }

    // Crear objeto FormData para enviar archivos
    const formDataToSend = {
      nombre: formData.nombre,
      descripcionCorta: formData.descripcionCorta,
      descripcionCompleta: formData.descripcionCompleta,
      categoria: formData.categoria,
      otraCategoria: formData.otraCategoria,
      areaProyecto: formData.areaProyecto,
      estado: formData.estado,
      imagenPrincipal: imagenPrincipalUrl, // URL de la imagen subida
      galeria: galeriaUrls, // URLs de imágenes de la galería
      materiales: formData.materiales,
      colaboradores: formData.colaboradores,
      recorridoVirtual: recorridoVirtualUrls,
      hostspots: formData.hostspots,
    };

    try {
      const response = await fetch("http://localhost:3001/proyectos/crear", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formDataToSend),
      });

      if (!response.ok) {
        throw new Error("Error al subir el proyecto");
      }

      const data = await response.json();
      console.log("Proyecto subido con éxito:", data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded mt-10 text-black">
      <h2 className="text-3xl font-bold mb-4">Panel de Control</h2>

      {/* Selección del tipo de contenido */}
      <label className="font-semibold">Selecciona qué deseas subir:</label>
      <select
        value={tipo}
        onChange={(e) => setTipo(e.target.value as "proyecto" | "recurso" | "curso")}
        className="border p-2 rounded mb-4 w-full"
      >
        <option value="proyecto">Proyecto</option>
        <option value="recurso">Recurso</option>
        <option value="curso">Curso</option>
      </select>

      {/* Sección General */}
      <FormularioGeneral tipo={tipo} formData={formData} setFormData={setFormData} />

      {/* Galería de imágenes */}
      <GaleriaImagenes
        galeria={formData.galeria}
        previewGaleria={formData.previewGaleria}
        setGaleria={(galeria) => setFormData({ ...formData, galeria })}
        setPreviewGaleria={(previewGaleria) => setFormData({ ...formData, previewGaleria })}
      />

      {/* Secciones adicionales solo para proyectos */}
      {tipo === "proyecto" && (
        <>
          <CategoriaProyecto
            categoria={formData.categoria}
            otraCategoria={formData.otraCategoria}
            setCategoria={(categoria) => setFormData({ ...formData, categoria })}
            setOtraCategoria={(otraCategoria) => setFormData({ ...formData, otraCategoria })}
          />

          <label className="font-semibold">Área del Proyecto (m²):</label>
          <input
            type="number"
            name="areaProyecto"
            value={formData.areaProyecto}
            onChange={(e) => {
              const value = Number(e.target.value);
              if (value >= 0) setFormData({ ...formData, areaProyecto: value });
            }}
            className="border p-2 rounded"
            required
          />

          <ListaDinamica
            titulo="Materiales destacados"
            items={formData.materiales}
            setItems={(items) => setFormData({ ...formData, materiales: items })}
          />

          <ListaDinamica
            titulo="Colaboradores o equipos"
            items={formData.colaboradores}
            setItems={(items) => setFormData({ ...formData, colaboradores: items })}
          />

          <EstadoProyecto estado={formData.estado} setEstado={(estado) => setFormData({ ...formData, estado })} />
        </>
      )}

      <button type="button" onClick={handleSubmit} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
        Subir {tipo}
      </button>
    </div>
  );
};

export default AdminPanel;
