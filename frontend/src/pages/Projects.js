import React, { useEffect, useState } from "react";
import "./Projects.css";
import axios from "axios";
import ProjectCard from "../components/ProjectCard";

function Projects() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/projects")
      .then((response) => setProjects(response.data))
      .catch((error) => console.error("Error al cargar proyectos:", error));
  }, []);

  return (
    <div className="projects-page">
      <h1 className="projects-title">Proyectos</h1>
      <div className="projects-grid">
        {projects.map((project) => (
          <ProjectCard key={project._id} project={project} />
        ))}
      </div>
    </div>
  );
}

export default Projects;
