import { useEffect, useState } from "react";

// Definir la interfaz para los proyectos
interface Proyecto {
  id: number;
  nombre: string;
  descripcionCorta: string;
}

const Proyectos = () => {
  const [proyectos, setProyectos] = useState<Proyecto[]>([]); // Definir el tipo de estado

  useEffect(() => {
    fetch("http://localhost:3001/proyectos")
      .then((res) => res.json())
      .then((data: Proyecto[]) => { // Tipamos la respuesta como un array de proyectos
        console.log("📌 Proyectos recibidos:", data);
        setProyectos(data);
      })
      .catch((error) => console.error("❌ Error al obtener proyectos:", error));
  }, []);

  return (
    <div>
      <h2>Lista de Proyectos</h2>
      {proyectos.length === 0 ? (
        <p>No hay proyectos disponibles</p>
      ) : (
        <ul>
          {proyectos.map((proyecto: Proyecto) => ( // Especificamos que cada item es un Proyecto
            <li key={proyecto.id}>
              <h3>{proyecto.nombre}</h3>
              <p>{proyecto.descripcionCorta}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Proyectos;
