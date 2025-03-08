const Projects = () => {
    const projects = [
      { title: "Proyecto 1", description: "Diseño moderno y minimalista" },
      { title: "Proyecto 2", description: "Arquitectura innovadora" },
      { title: "Proyecto 3", description: "Visualización realista en 3D" },
    ];
  
    return (
      <section id="proyectos" className="py-20 bg-gray-800 text-white">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-8 text-center">Nuestros Proyectos</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <div key={index} className="bg-gray-700 p-6 rounded-lg">
                <h3 className="text-xl font-semibold">{project.title}</h3>
                <p className="text-gray-300 mt-2">{project.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };
  
  export default Projects;
  