import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

// Supabase config desde variables de entorno
const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL!,
  import.meta.env.VITE_SUPABASE_ANON_KEY!
);

interface Proyecto {
  id: string;
  nombre: string;
  descripcion_corta: string;
  descripcion_completa: string;
  imagen_url: string;
  seccion: string;
  created_at: string;
}

const Projects = () => {
  const [proyectos, setProyectos] = useState<Proyecto[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProyectos = async () => {
      setLoading(true);

      const { data, error } = await supabase
        .from("uploads")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("❌ Error al obtener proyectos:", error);
      } else {
        console.log("📦 Proyectos obtenidos (sin filtro):", data);
        const filtrados = (data || []).filter(
          (p) => p.seccion === "Proyectos"
        );
        console.log("🎯 Filtrados:", filtrados);
        setProyectos(filtrados);
      }

      setLoading(false);
    };

    fetchProyectos();
  }, []);

  return (
    <section className="py-20 bg-gray-800 text-white">
      <div className="max-w-5xl mx-auto px-6">
        <h2 className="text-3xl font-bold mb-8 text-center">Nuestros Proyectos</h2>

        {loading ? (
          <p className="text-center">Cargando proyectos...</p>
        ) : proyectos.length === 0 ? (
          <p className="text-center">No hay proyectos disponibles.</p>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {proyectos.map((proyecto) => (
              <div key={proyecto.id} className="bg-gray-700 p-6 rounded-lg">
                <img
                  src={proyecto.imagen_url}
                  alt={proyecto.nombre}
                  className="w-full h-48 object-cover mb-4 rounded"
                />
                <h3 className="text-xl font-semibold">{proyecto.nombre}</h3>
                <p className="text-gray-300 mt-2">{proyecto.descripcion_corta}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;
